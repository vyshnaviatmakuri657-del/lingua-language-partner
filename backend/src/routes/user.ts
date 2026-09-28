import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { getTodayDateString, awardUserXpAndRecordActivity } from "../lib/gamification/engine";
import { validateLanguagePair } from "../lib/i18n";

const router = Router();

// GET /api/user
router.get("/user", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.json({ user: null });
    }
    return res.json({ user });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return res.status(500).json({ error: "Failed to fetch user session" });
  }
});

// GET /api/progress
router.get("/progress", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.json({
        isGuest: true,
        totalXp: 0,
        currentLevel: 1,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        accuracyRate: 0,
        currentStreak: 0,
        longestStreak: 0,
        todayMinutes: 0,
        dailyGoalMinutes: 15,
        goalMet: false,
        wordsLearned: 0,
        wordsDue: 0,
        wordsMastered: 0,
        weakAreas: [],
        activeLanguagePair: null,
      });
    }

    const timezone = user.profile?.timezone || "UTC";
    const today = getTodayDateString(timezone);

    const [progress, streak, todayActivity, vocabProgress, attempts, activePath] = await Promise.all([
      prisma.userProgress.findUnique({ where: { userId: user.id } }),
      prisma.streak.findUnique({ where: { userId: user.id } }),
      prisma.dailyActivity.findUnique({ where: { userId_date: { userId: user.id, date: today } } }),
      prisma.vocabularyProgress.findMany({
        where: { userId: user.id },
        include: { vocabulary: true },
      }),
      prisma.exerciseAttempt.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 30,
        include: { exercise: true },
      }),
      prisma.learningPath.findFirst({
        where: { userId: user.id, isActive: true },
        include: {
          languagePair: true,
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        },
      }),
    ]);

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter((a) => a.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    const mistakeCounts: Record<string, { prompt: string; count: number }> = {};
    attempts.forEach((a) => {
      if (!a.isCorrect && a.exercise) {
        if (!mistakeCounts[a.exercise.prompt]) {
          mistakeCounts[a.exercise.prompt] = { prompt: a.exercise.prompt, count: 0 };
        }
        mistakeCounts[a.exercise.prompt].count++;
      }
    });

    const weakAreas = Object.values(mistakeCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const now = new Date();
    const wordsDue = vocabProgress.filter((vp) => vp.nextReviewAt <= now).length;
    const wordsMastered = vocabProgress.filter((vp) => vp.mastery >= 80).length;
    const wordsLearned = vocabProgress.length;

    const activePairId = activePath?.languagePairId;
    let totalPairVocabs = 15;
    if (activePairId) {
      try {
        const count = await prisma.vocabulary.count({ where: { languagePairId: activePairId } });
        if (count > 0) totalPairVocabs = count;
      } catch {}
    }
    const finalWordsDue = vocabProgress.length > 0 ? wordsDue : totalPairVocabs;

    let nextLesson: { id: string; title: string; orderIndex: number } | null = null;
    if (activePath && (activePath as any).modules) {
      const allLessons = (activePath as any).modules.flatMap((m: any) => m.lessons || []);
      const completedCount = progress?.lessonsCompleted || 0;
      const targetLesson = allLessons[completedCount] || allLessons[0];
      if (targetLesson) {
        nextLesson = {
          id: targetLesson.id,
          title: targetLesson.title,
          orderIndex: targetLesson.orderIndex,
        };
      }
    }

    return res.json({
      totalXp: progress?.totalXp || 0,
      currentLevel: progress?.currentLevel || 1,
      lessonsCompleted: progress?.lessonsCompleted || 0,
      exercisesCompleted: progress?.exercisesCompleted || 0,
      accuracyRate: accuracy,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      todayMinutes: todayActivity?.minutesSpent || 0,
      dailyGoalMinutes: user.profile?.dailyGoalMinutes || 15,
      goalMet: todayActivity?.goalMet || false,
      wordsLearned,
      wordsDue: finalWordsDue,
      wordsMastered,
      weakAreas,
      nextLesson,
      activeLanguagePair: activePath?.languagePair
        ? {
            native: activePath.languagePair.nativeLanguageCode,
            target: activePath.languagePair.targetLanguageCode,
          }
        : null,
    });
  } catch (error) {
    console.error("GET /api/progress error:", error);
    return res.status(500).json({ error: "Failed to fetch progress metrics." });
  }
});

// POST /api/user/record-activity
router.post("/user/record-activity", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      xpAwarded,
      isCorrect,
      prompt,
      exerciseCompleted = false,
      lessonCompleted = false,
      minutes = 1,
      lessonId,
      exerciseId,
      skipXpAward = false,
    } = req.body;

    const parsedXp = typeof xpAwarded === "number" 
      ? Math.max(0, xpAwarded) 
      : (xpAwarded !== undefined ? Math.max(0, Number(xpAwarded) || 0) : 10);

    let progressUpdate = null;
    if (!skipXpAward && parsedXp > 0) {
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "CUSTOM",
        customXp: parsedXp,
        minutes: Number(minutes) || 1,
        lessonCompleted: Boolean(lessonCompleted),
        exerciseCompleted: Boolean(exerciseCompleted),
      });
    }

    if (exerciseId && isCorrect !== undefined) {
      await prisma.exerciseAttempt.create({
        data: {
          userId: user.id,
          exerciseId,
          userAnswer: prompt || "Activity drill",
          isCorrect: Boolean(isCorrect),
          score: isCorrect ? 1.0 : 0.0,
          feedback: isCorrect ? "Correct" : "Incorrect",
          hintsUsed: 0,
          timeSpentSeconds: (Number(minutes) || 1) * 60,
        },
      });
    }

    if (lessonCompleted && lessonId) {
      const firstEx = await prisma.exercise.findFirst({ where: { lessonId } });
      if (firstEx) {
        await prisma.exerciseAttempt.create({
          data: {
            userId: user.id,
            exerciseId: firstEx.id,
            userAnswer: "LESSON_COMPLETED",
            isCorrect: true,
            score: 1.0,
            feedback: "Lesson Completed",
            hintsUsed: 0,
            timeSpentSeconds: (Number(minutes) || 5) * 60,
          },
        });
      }
    }

    return res.json({
      success: true,
      progress: progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/user/record-activity error:", error);
    return res.status(500).json({ error: "Failed to record activity" });
  }
});

// POST /api/user/goal
router.post("/user/goal", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { dailyGoalMinutes } = req.body;
    const goal = Math.max(5, Math.min(120, Number(dailyGoalMinutes) || 15));

    if (user) {
      await prisma.userProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          dailyGoalMinutes: goal,
        },
        update: {
          dailyGoalMinutes: goal,
        },
      });

      const timezone = user.profile?.timezone || "UTC";
      const today = getTodayDateString(timezone);
      const todayActivity = await prisma.dailyActivity.findUnique({
        where: { userId_date: { userId: user.id, date: today } },
      });
      if (todayActivity) {
        await prisma.dailyActivity.update({
          where: { id: todayActivity.id },
          data: { goalMet: todayActivity.minutesSpent >= goal },
        });
      }
    }

    return res.json({ success: true, dailyGoalMinutes: goal });
  } catch (error) {
    console.error("POST /api/user/goal error:", error);
    return res.status(500).json({ error: "Failed to update daily goal" });
  }
});

// POST /api/user/sync-guest-progress
router.post("/user/sync-guest-progress", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      totalXp = 0,
      exercisesCompleted = 0,
      lessonsCompleted = 0,
      completedLessons = [],
      minutes = 5,
      vocabProgress,
    } = req.body;

    if (totalXp > 0) {
      await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "CUSTOM",
        customXp: Number(totalXp) || 0,
        minutes: Number(minutes) || 5,
        lessonCompleted: Boolean(lessonsCompleted > 0 || (Array.isArray(completedLessons) && completedLessons.length > 0)),
        exerciseCompleted: Boolean(exercisesCompleted > 0),
      });
    }

    if (Array.isArray(completedLessons) && completedLessons.length > 0) {
      for (const lessonId of completedLessons) {
        if (!lessonId || typeof lessonId !== "string") continue;
        const firstEx = await prisma.exercise.findFirst({ where: { lessonId } });
        if (firstEx) {
          const existingAttempt = await prisma.exerciseAttempt.findFirst({
            where: { userId: user.id, exerciseId: firstEx.id, isCorrect: true },
          });
          if (!existingAttempt) {
            await prisma.exerciseAttempt.create({
              data: {
                userId: user.id,
                exerciseId: firstEx.id,
                userAnswer: "GUEST_SYNCED_LESSON",
                isCorrect: true,
                score: 1.0,
                feedback: "Lesson Completed as Guest",
                hintsUsed: 0,
                timeSpentSeconds: 300,
              },
            });
          }
        }
      }
    }

    if (vocabProgress && typeof vocabProgress === "object") {
      for (const [vocabularyId, card] of Object.entries(vocabProgress as Record<string, any>)) {
        if (!vocabularyId || !card) continue;
        await prisma.vocabularyProgress.upsert({
          where: { userId_vocabularyId: { userId: user.id, vocabularyId } },
          create: {
            userId: user.id,
            vocabularyId,
            box: Number(card.box) || 1,
            mastery: Number(card.mastery) || 0,
            consecutiveCorrect: Number(card.consecutiveCorrect) || 0,
            totalAttempts: Number(card.totalAttempts) || 1,
            lastReviewedAt: card.lastReviewedAt ? new Date(card.lastReviewedAt) : new Date(),
            nextReviewAt: card.nextReviewAt ? new Date(card.nextReviewAt) : new Date(),
          },
          update: {
            box: Number(card.box) || 1,
            mastery: Number(card.mastery) || 0,
            consecutiveCorrect: Number(card.consecutiveCorrect) || 0,
            totalAttempts: { increment: 1 },
          },
        });
      }
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("POST /api/user/sync-guest-progress error:", error);
    return res.status(500).json({ error: "Failed to sync guest progress" });
  }
});

// PATCH /api/user
router.patch("/user", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, dailyGoalMinutes, soundEnabled, transliterationEnabled, timezone } = req.body;

    if (name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: String(name).trim() },
      });
    }

    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        dailyGoalMinutes: dailyGoalMinutes ?? 15,
        soundEnabled: soundEnabled ?? true,
        transliterationEnabled: transliterationEnabled ?? true,
        timezone: timezone ?? "UTC",
      },
      update: {
        ...(dailyGoalMinutes !== undefined && { dailyGoalMinutes: Number(dailyGoalMinutes) }),
        ...(soundEnabled !== undefined && { soundEnabled: Boolean(soundEnabled) }),
        ...(transliterationEnabled !== undefined && { transliterationEnabled: Boolean(transliterationEnabled) }),
        ...(timezone !== undefined && { timezone: String(timezone) }),
      },
    });

    return res.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return res.status(500).json({ error: "Failed to update profile settings." });
  }
});

// PATCH /api/user/preferences
router.patch("/user/preferences", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { nativeLanguageCode, targetLanguageCode } = req.body;

    if (!nativeLanguageCode || !targetLanguageCode) {
      return res.status(400).json({ error: "Both nativeLanguageCode and targetLanguageCode are required." });
    }

    const validation = validateLanguagePair(nativeLanguageCode, targetLanguageCode);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const pair = await prisma.languagePair.upsert({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode,
          targetLanguageCode,
        },
      },
      update: {},
      create: {
        nativeLanguageCode,
        targetLanguageCode,
        description: `Track for learning ${targetLanguageCode.toUpperCase()} through ${nativeLanguageCode.toUpperCase()}`,
      },
    });

    const preferences = await prisma.userLanguagePreference.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        nativeLanguageCode,
        targetLanguageCode,
        instructionLanguageCode: nativeLanguageCode,
        learningLanguageCode: targetLanguageCode,
      },
      update: {
        nativeLanguageCode,
        targetLanguageCode,
        instructionLanguageCode: nativeLanguageCode,
        learningLanguageCode: targetLanguageCode,
      },
    });

    await prisma.learningPath.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });

    await prisma.learningPath.upsert({
      where: {
        userId_languagePairId: {
          userId: user.id,
          languagePairId: pair.id,
        },
      },
      create: {
        userId: user.id,
        languagePairId: pair.id,
        isActive: true,
      },
      update: {
        isActive: true,
      },
    });

    return res.json({ success: true, preferences });
  } catch (error) {
    console.error("PATCH /api/user/preferences error:", error);
    return res.status(500).json({ error: "Failed to update language preferences." });
  }
});

// GET /api/achievements
router.get("/achievements", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);

    const [allAchievements, userAchievements] = await Promise.all([
      prisma.achievement.findMany(),
      user ? prisma.userAchievement.findMany({ where: { userId: user.id } }) : [],
    ]);

    const unlockedMap = new Map<string, any>();
    userAchievements.forEach((ua: any) => {
      unlockedMap.set(ua.achievementId, ua.unlockedAt);
    });

    const result = allAchievements.map((ach) => ({
      id: ach.id,
      code: ach.code,
      title: ach.titleKey,
      description: ach.descriptionKey,
      icon: ach.icon,
      xpReward: ach.xpReward,
      category: ach.category,
      isUnlocked: unlockedMap.has(ach.id),
      unlockedAt: unlockedMap.get(ach.id) || null,
    }));

    return res.json({ achievements: result });
  } catch (error) {
    console.error("GET /api/achievements error:", error);
    return res.status(500).json({ error: "Failed to load achievements." });
  }
});

// POST /api/onboarding
router.post("/onboarding", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { nativeLanguageCode, targetLanguageCode, dailyGoalMinutes = 15 } = req.body;

    if (!nativeLanguageCode || !targetLanguageCode) {
      return res.status(400).json({ error: "Native and target language codes are required." });
    }

    const validation = validateLanguagePair(nativeLanguageCode, targetLanguageCode);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    if (user) {
      await prisma.userProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          dailyGoalMinutes: Number(dailyGoalMinutes),
        },
        update: {
          dailyGoalMinutes: Number(dailyGoalMinutes),
        },
      });

      await prisma.userLanguagePreference.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          nativeLanguageCode,
          targetLanguageCode,
          instructionLanguageCode: nativeLanguageCode,
          learningLanguageCode: targetLanguageCode,
        },
        update: {
          nativeLanguageCode,
          targetLanguageCode,
          instructionLanguageCode: nativeLanguageCode,
          learningLanguageCode: targetLanguageCode,
        },
      });
    }

    return res.json({
      success: true,
      nativeLanguageCode,
      targetLanguageCode,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return res.status(500).json({ error: "Failed to process onboarding." });
  }
});

export default router;
