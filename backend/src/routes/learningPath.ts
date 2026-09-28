import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { validateLanguagePair } from "../lib/i18n";
import { awardUserXpAndRecordActivity } from "../lib/gamification/engine";

const router = Router();

// GET /api/learning-path
router.get("/learning-path", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);

    let native = (req.query.native as string) || "";
    let target = (req.query.target as string) || "";

    if (!native || !target) {
      if (user?.preferences) {
        native = user.preferences.nativeLanguageCode;
        target = user.preferences.targetLanguageCode;
      } else {
        native = "te";
        target = "ko";
      }
    }

    const validation = validateLanguagePair(native, target);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        nativeLanguage: true,
        targetLanguage: true,
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            lessons: {
              orderBy: { orderIndex: "asc" },
              include: {
                exercises: { select: { id: true } },
                vocabularies: { select: { id: true, targetWord: true, nativeMeaning: true } },
              },
            },
          },
        },
      },
    });

    if (!pair) {
      return res.status(404).json({
        error: `No curriculum found for language pair ${native} -> ${target}`,
        modules: [],
      });
    }

    const completedLessonIds = new Set<string>();
    if (user) {
      const attempts = await prisma.exerciseAttempt.findMany({
        where: { userId: user.id, isCorrect: true },
        select: { exercise: { select: { lessonId: true } } },
      });
      attempts.forEach((a) => {
        if (a.exercise?.lessonId) completedLessonIds.add(a.exercise.lessonId);
      });
    }

    const queryCompleted = (req.query.completedLessons as string) || (req.headers["x-completed-lessons"] as string) || "";
    if (queryCompleted) {
      queryCompleted.split(",").forEach((id) => {
        if (id.trim()) completedLessonIds.add(id.trim());
      });
    }

    const mode = (req.query.mode as string) || "standard";
    const isExploreMode = mode === "explore";

    const cefrLevels: Record<number, { level: string; stage: string; stageName: string }> = {
      1: { level: "A1", stage: "Breakthrough", stageName: "A1: Breakthrough (Beginner)" },
      2: { level: "A2", stage: "Waystage", stageName: "A2: Waystage (Everyday Essentials)" },
      3: { level: "A2", stage: "Waystage", stageName: "A2: Waystage (Practical Dining)" },
      4: { level: "B1", stage: "Threshold", stageName: "B1: Threshold (Transit & Travel)" },
      5: { level: "B2", stage: "Vantage", stageName: "B2: Vantage (Social & Advanced)" },
    };

    let latestPlacement = null;
    const masteredModules = new Set<number>();
    let placedLevel = "A1";

    if (user) {
      latestPlacement = await prisma.placementAttempt.findFirst({
        where: {
          userId: user.id,
          placementTest: { languagePairId: pair.id },
        },
        orderBy: { createdAt: "desc" },
      });

      if (latestPlacement) {
        placedLevel = latestPlacement.recommendedLevel || "A1";
        try {
          const parsedAnswers = JSON.parse(latestPlacement.answers);
          if (Array.isArray(parsedAnswers.masteredModuleIndices)) {
            parsedAnswers.masteredModuleIndices.forEach((idx: number) => masteredModules.add(idx));
          }
        } catch {
          // ignore JSON parse error
        }

        // Adaptive placement rules:
        if (placedLevel === "A2" || placedLevel === "B1" || placedLevel === "B2") {
          masteredModules.add(1);
        }
        if (placedLevel === "B1" || placedLevel === "B2") {
          masteredModules.add(2);
          masteredModules.add(3);
        }
        if (placedLevel === "B2") {
          masteredModules.add(4);
        }
      }
    }

    // Support query param or header fallback for guest or interactive testing
    const queryLevel = ((req.query.diagnosticLevel as string) || (req.headers["x-diagnostic-level"] as string) || "").toUpperCase();
    if (queryLevel && ["A1", "A2", "B1", "B2"].includes(queryLevel)) {
      placedLevel = queryLevel;
      if (placedLevel === "A2" || placedLevel === "B1" || placedLevel === "B2") masteredModules.add(1);
      if (placedLevel === "B1" || placedLevel === "B2") {
        masteredModules.add(2);
        masteredModules.add(3);
      }
      if (placedLevel === "B2") masteredModules.add(4);
    }

    const modulesWithStatus = pair.modules.map((mod) => {
      const cefrInfo = cefrLevels[mod.orderIndex] || { level: "A1", stage: "Breakthrough", stageName: "A1: Breakthrough" };
      const isModuleMastered = masteredModules.has(mod.orderIndex);

      const lessonsWithStatus = mod.lessons.map((lsn) => {
        const isCompleted = completedLessonIds.has(lsn.id);
        const adaptiveStatus: "refresher" | "focus" = isModuleMastered ? "refresher" : "focus";

        const prevLsn = mod.lessons.find((l) => l.orderIndex === lsn.orderIndex - 1);
        const isPrevLsnCompleted = prevLsn ? completedLessonIds.has(prevLsn.id) : false;

        const isPlacedActiveTarget = (placedLevel === "A2" && mod.orderIndex === 2 && lsn.orderIndex === 1) ||
                                    (placedLevel === "B1" && mod.orderIndex === 4 && lsn.orderIndex === 1) ||
                                    (placedLevel === "B2" && mod.orderIndex === 5 && lsn.orderIndex === 1);

        // Lesson 1 of any module is unlocked as an entry point.
        // Subsequent lessons in the module unlock when the previous lesson in that module is completed!
        const isUnlocked = isExploreMode ||
                           isCompleted ||
                           adaptiveStatus === "refresher" ||
                           (lsn.orderIndex === 1) ||
                           isPlacedActiveTarget ||
                           isPrevLsnCompleted;

        return {
          id: lsn.id,
          orderIndex: lsn.orderIndex,
          title: lsn.title,
          objective: lsn.objective,
          culturalTip: lsn.culturalTip,
          xpReward: lsn.xpReward,
          estimatedMinutes: lsn.estimatedMinutes,
          exerciseCount: lsn.exercises.length,
          vocabularyCount: lsn.vocabularies.length,
          cefrLevel: cefrInfo.level,
          cefrStage: cefrInfo.stage,
          adaptiveStatus,
          adaptiveBadge: adaptiveStatus === "refresher" ? "⚡ Refresher" : "🎯 High Priority Focus",
          isCompleted,
          isUnlocked,
        };
      });

      return {
        id: mod.id,
        orderIndex: mod.orderIndex,
        title: mod.title,
        description: mod.description,
        icon: mod.icon,
        category: mod.category,
        cefrLevel: cefrInfo.level,
        cefrStage: cefrInfo.stage,
        cefrStageName: cefrInfo.stageName,
        adaptiveStatus: isModuleMastered ? "refresher" : "focus",
        lessons: lessonsWithStatus,
      };
    });

    return res.json({
      languagePair: {
        id: pair.id,
        native: pair.nativeLanguageCode,
        target: pair.targetLanguageCode,
        nativeName: pair.nativeLanguage.name,
        targetName: pair.targetLanguage.name,
        targetFlag: pair.targetLanguage.flag,
      },
      placementDiagnostic: (latestPlacement || queryLevel) ? {
        hasPlacement: true,
        score: latestPlacement ? latestPlacement.score : (queryLevel === "B2" ? 95 : queryLevel === "B1" ? 85 : queryLevel === "A2" ? 65 : 30),
        recommendedLevel: placedLevel,
        refresherModulesCount: masteredModules.size,
        focusModulesCount: Math.max(0, 5 - masteredModules.size),
      } : null,
      modules: modulesWithStatus,
    });
  } catch (error) {
    console.error("GET /api/learning-path error:", error);
    return res.status(500).json({ error: "Failed to load learning path." });
  }
});

// GET /api/lessons/:id
router.get("/lessons/:id", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const id = req.params.id as string;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: true,
        languagePair: {
          include: {
            nativeLanguage: true,
            targetLanguage: true,
          },
        },
        contents: { orderBy: { orderIndex: "asc" } },
        vocabularies: true,
        grammarTopics: true,
        exercises: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const cefrLevels: Record<number, { level: string; stage: string; stageName: string }> = {
      1: { level: "A1", stage: "Breakthrough", stageName: "A1: Breakthrough" },
      2: { level: "A2", stage: "Waystage", stageName: "A2: Waystage (Everyday Essentials)" },
      3: { level: "A2", stage: "Waystage", stageName: "A2: Waystage (Practical Dining)" },
      4: { level: "B1", stage: "Threshold", stageName: "B1: Threshold (Transit & Travel)" },
      5: { level: "B2", stage: "Vantage", stageName: "B2: Vantage (Social & Advanced)" },
    };

    const modIndex = lesson.module.orderIndex;
    const cefrInfo = cefrLevels[modIndex] || { level: "A1", stage: "Breakthrough", stageName: "A1: Breakthrough" };

    let adaptiveStatus: "refresher" | "focus" = "focus";
    let adaptiveMessage = "";

    if (user) {
      const latestPlacement = await prisma.placementAttempt.findFirst({
        where: {
          userId: user.id,
          placementTest: { languagePairId: lesson.languagePairId },
        },
        orderBy: { createdAt: "desc" },
      });

      if (latestPlacement) {
        let isMastered = false;
        const placedLevel = latestPlacement.recommendedLevel || "A1";

        try {
          const parsed = JSON.parse(latestPlacement.answers);
          if (Array.isArray(parsed.masteredModuleIndices) && parsed.masteredModuleIndices.includes(modIndex)) {
            isMastered = true;
          }
        } catch {}

        if (placedLevel === "A2" && modIndex === 1) isMastered = true;
        if ((placedLevel === "B1" || placedLevel === "B2") && modIndex <= 3) isMastered = true;
        if (placedLevel === "B2" && modIndex <= 4) isMastered = true;

        if (isMastered) {
          adaptiveStatus = "refresher";
          adaptiveMessage = lesson.languagePair.nativeLanguageCode === "te"
            ? "⚡ క్లాస్ రీఫ్రెషర్ వేదిక: మీరు డయాగ్నోస్టిక్ పరీక్షలో ఈ అంశంపై ప్రావీణ్యతను నిరూపించుకున్నారు. వేగవంతమైన పునశ్చరణతో దీన్ని సమీక్షించండి!"
            : lesson.languagePair.nativeLanguageCode === "hi"
            ? "⚡ क्लाउस रिफ्रेशर स्टेज: आपने डायग्नोस्टिक टेस्ट में इस विषय पर बुनियादी दक्षता सिद्ध की है। त्वरित पुनरावृत्ति के साथ आगे बढ़ें!"
            : "⚡ Klaus Refresher: You proved competence on this topic in your diagnostic test! Use this accelerated review to cement your recall.";
        } else {
          adaptiveStatus = "focus";
          adaptiveMessage = lesson.languagePair.nativeLanguageCode === "te"
            ? "🎯 క్లాస్ ప్రాధాన్యతా లక్ష్యం: ఇది మీ లక్ష్య స్థాయికి అత్యంత కీలకమైన అంశం. మొత్తం 5 వ్యాయామాలను శ్రద్ధగా పూర్తి చేసి పట్టు సాధించండి!"
            : lesson.languagePair.nativeLanguageCode === "hi"
            ? "🎯 क्लाउस प्राथमिकता लक्ष्य: यह आपके लक्षित स्तर के लिए महत्वपूर्ण विषय है। सभी 5 अभ्यासों को ध्यान से पूरा करें!"
            : "🎯 Klaus Priority Focus: Key milestone for your target CEFR fluency. Master all 5 interactive drills!";
        }
      }
    }

    if (!user) {
      const qLevel = ((req.query.diagnosticLevel as string) || (req.headers["x-diagnostic-level"] as string) || "").toUpperCase();
      if (qLevel && ["A1", "A2", "B1", "B2"].includes(qLevel)) {
        let isMastered = false;
        if (qLevel === "A2" && modIndex === 1) isMastered = true;
        if ((qLevel === "B1" || qLevel === "B2") && modIndex <= 3) isMastered = true;
        if (qLevel === "B2" && modIndex <= 4) isMastered = true;

        if (isMastered) {
          adaptiveStatus = "refresher";
          adaptiveMessage = lesson.languagePair.nativeLanguageCode === "te"
            ? "⚡ క్లాస్ రీఫ్రెషర్ వేదిక: మీరు డయాగ్నోస్టిక్ పరీక్షలో ఈ అంశంపై ప్రావీణ్యతను నిరూపించుకున్నారు. వేగవంతమైన పునశ్చరణతో దీన్ని సమీక్షించండి!"
            : lesson.languagePair.nativeLanguageCode === "hi"
            ? "⚡ क्लाउस रिफ्रेशर स्टेज: आपने डायग्नोस्टिक टेस्ट में इस विषय पर बुनियादी दक्षता सिद्ध की है। त्वरित पुनरावृत्ति के साथ आगे बढ़ें!"
            : "⚡ Klaus Refresher: You proved competence on this topic in your diagnostic test! Use this accelerated review to cement your recall.";
        } else {
          adaptiveStatus = "focus";
          adaptiveMessage = lesson.languagePair.nativeLanguageCode === "te"
            ? "🎯 క్లాస్ ప్రాధాన్యతా లక్ష్యం: ఇది మీ లక్ష్య స్థాయికి అత్యంత కీలకమైన అంశం. మొత్తం 5 వ్యాయామాలను శ్రద్ధగా పూర్తి చేసి పట్టు సాధించండి!"
            : lesson.languagePair.nativeLanguageCode === "hi"
            ? "🎯 क्लाउस प्राथमिकता लक्ष्य: यह आपके लक्षित स्तर के लिए महत्वपूर्ण विषय है। सभी 5 अभ्यासों को ध्यान से पूरा करें!"
            : "🎯 Klaus Priority Focus: Key milestone for your target CEFR fluency. Master all 5 interactive drills!";
        }
      }
    }

    const parsedExercises = lesson.exercises.map((ex) => ({
      id: ex.id,
      orderIndex: ex.orderIndex,
      type: ex.type,
      instruction: ex.instruction,
      prompt: ex.prompt,
      promptTransliteration: ex.promptTransliteration,
      audioText: ex.audioText,
      correctAnswer: ex.correctAnswer,
      options: (() => {
        const rawOpts = typeof ex.options === "string" ? JSON.parse(ex.options) : ex.options;
        if (ex.type === "pictorial_identification" && Array.isArray(rawOpts)) {
          return rawOpts.map((opt: any) => {
            if (typeof opt === "object" && opt !== null) {
              let icon = opt.icon;
              if (icon === "✅") icon = "👍";
              if (icon === "❌") icon = "✋";
              return { ...opt, icon };
            }
            return opt;
          });
        }
        return rawOpts;
      })(),
      explanation: ex.explanation,
      hintLevel1: ex.hintLevel1,
      hintLevel2: ex.hintLevel2,
      hintLevel3: ex.hintLevel3,
    }));

    const parsedGrammar = lesson.grammarTopics.map((g) => ({
      id: g.id,
      title: g.title,
      explanation: g.explanation,
      ruleSummary: g.ruleSummary,
      examples: typeof g.examples === "string" ? JSON.parse(g.examples) : g.examples,
      commonMistakes: typeof g.commonMistakes === "string" ? JSON.parse(g.commonMistakes) : g.commonMistakes,
    }));

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        moduleId: lesson.moduleId,
        orderIndex: lesson.orderIndex + 1,
      },
      select: { id: true, title: true, orderIndex: true },
    });

    return res.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        objective: lesson.objective,
        culturalTip: lesson.culturalTip,
        xpReward: lesson.xpReward,
        estimatedMinutes: lesson.estimatedMinutes,
        orderIndex: lesson.orderIndex,
        cefrLevel: cefrInfo.level,
        cefrStage: cefrInfo.stage,
        cefrStageName: cefrInfo.stageName,
        adaptiveStatus,
        adaptiveMessage,
        nextLesson,
        module: {
          id: lesson.module.id,
          title: lesson.module.title,
          category: lesson.module.category,
          orderIndex: lesson.module.orderIndex,
          cefrLevel: cefrInfo.level,
          cefrStage: cefrInfo.stage,
        },
        languagePair: {
          nativeCode: lesson.languagePair.nativeLanguageCode,
          targetCode: lesson.languagePair.targetLanguageCode,
          nativeName: lesson.languagePair.nativeLanguage.name,
          targetName: lesson.languagePair.targetLanguage.name,
        },
        vocabularies: lesson.vocabularies,
        grammarTopics: parsedGrammar,
        exercises: parsedExercises,
      },
    });
  } catch (error) {
    console.error("GET /api/lessons/:id error:", error);
    return res.status(500).json({ error: "Failed to fetch lesson details." });
  }
});

// POST /api/lessons/:id/complete
router.post("/lessons/:id/complete", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const id = req.params.id as string;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: { vocabularies: true },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const { earnedXp, accuracy, correctCount, totalExercises } = req.body || {};
    const xpToAward = earnedXp !== undefined ? Number(earnedXp) : (lesson.xpReward || 30);

    let progressUpdate = null;

    if (user) {
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "LESSON_COMPLETE",
        customXp: xpToAward,
        minutes: lesson.estimatedMinutes || 10,
        lessonCompleted: true,
      });

      const firstEx = await prisma.exercise.findFirst({ where: { lessonId: lesson.id } });
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
            timeSpentSeconds: (lesson.estimatedMinutes || 10) * 60,
          },
        });
      }

      for (const voc of lesson.vocabularies) {
        await prisma.vocabularyProgress.upsert({
          where: {
            userId_vocabularyId: {
              userId: user.id,
              vocabularyId: voc.id,
            },
          },
          create: {
            userId: user.id,
            vocabularyId: voc.id,
            box: 1,
            intervalDays: 1,
            easeFactor: 2.5,
            mastery: 10,
          },
          update: {},
        });
      }
    }

    const nextLesson = await prisma.lesson.findFirst({
      where: {
        moduleId: lesson.moduleId,
        orderIndex: lesson.orderIndex + 1,
      },
      select: { id: true, title: true, orderIndex: true },
    });

    return res.json({
      success: true,
      lessonId: lesson.id,
      xpAwarded: xpToAward,
      accuracy: accuracy !== undefined ? Number(accuracy) : 100,
      isCompleted: true,
      nextLesson,
      progress: progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/lessons/:id/complete error:", error);
    return res.status(500).json({ error: "Failed to complete lesson." });
  }
});

export default router;
