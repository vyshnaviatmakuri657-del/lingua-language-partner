import { prisma } from "../prisma";

export const XP_VALUES = {
  VOCABULARY_REVIEW: 5,
  GRAMMAR_PRACTICE: 10,
  EXERCISE_CORRECT: 10,
  LESSON_COMPLETE: 30,
  CONVERSATION_TURN: 15,
  DAILY_GOAL_MET: 20,
  PLACEMENT_TEST: 50,
};

export const SPNotificationIntervals = [1, 3, 7, 14, 30]; // Days corresponding to Leitner box 1, 2, 3, 4, 5

export function calculateLevelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  // Level progression formula: Level 1 = 0-100 XP, Level 2 = 100-300 XP, Level 3 = 300-600 XP, etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getTodayDateString(timezone: string = "UTC"): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(new Date());
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

export function getYesterdayDateString(today: string): string {
  const date = new Date(today);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}

export interface ProgressUpdateResult {
  xpAwarded: number;
  totalXp: number;
  currentLevel: number;
  leveledUp: boolean;
  streakUpdated: boolean;
  currentStreak: number;
  newAchievements: string[];
}

export async function awardUserXpAndRecordActivity({
  userId,
  xpType,
  customXp,
  minutes = 5,
  lessonCompleted = false,
  exerciseCompleted = false,
}: {
  userId: string;
  xpType: keyof typeof XP_VALUES | "CUSTOM";
  customXp?: number;
  minutes?: number;
  lessonCompleted?: boolean;
  exerciseCompleted?: boolean;
}): Promise<ProgressUpdateResult> {
  const xpAmount = customXp !== undefined ? customXp : XP_VALUES[xpType as keyof typeof XP_VALUES] || 10;

  // 1. Fetch user with profile, progress, streak, and achievements
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      progress: true,
      streak: true,
      achievements: { include: { achievement: true } },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const timezone = user.profile?.timezone || "UTC";
  const today = getTodayDateString(timezone);
  const yesterday = getYesterdayDateString(today);

  // 2. Update or initialize UserProgress
  const currentTotalXp = (user.progress?.totalXp || 0) + xpAmount;
  const oldLevel = user.progress?.currentLevel || 1;
  const newLevel = calculateLevelFromXp(currentTotalXp);
  const leveledUp = newLevel > oldLevel;

  await prisma.userProgress.upsert({
    where: { userId },
    create: {
      userId,
      totalXp: currentTotalXp,
      currentLevel: newLevel,
      lessonsCompleted: lessonCompleted ? 1 : 0,
      exercisesCompleted: exerciseCompleted ? 1 : 0,
      totalPracticeMinutes: minutes,
    },
    update: {
      totalXp: currentTotalXp,
      currentLevel: newLevel,
      lessonsCompleted: lessonCompleted ? { increment: 1 } : undefined,
      exercisesCompleted: exerciseCompleted ? { increment: 1 } : undefined,
      totalPracticeMinutes: { increment: minutes },
    },
  });

  // 3. Update DailyActivity
  const dailyGoalMinutes = user.profile?.dailyGoalMinutes || 15;
  const dailyActivity = await prisma.dailyActivity.upsert({
    where: {
      userId_date: { userId, date: today },
    },
    create: {
      userId,
      date: today,
      xpEarned: xpAmount,
      minutesSpent: minutes,
      lessonsCompleted: lessonCompleted ? 1 : 0,
      exercisesCompleted: exerciseCompleted ? 1 : 0,
      goalMet: minutes >= dailyGoalMinutes,
    },
    update: {
      xpEarned: { increment: xpAmount },
      minutesSpent: { increment: minutes },
      lessonsCompleted: lessonCompleted ? { increment: 1 } : undefined,
      exercisesCompleted: exerciseCompleted ? { increment: 1 } : undefined,
    },
  });

  // Check if daily goal was just met in this update
  if (!dailyActivity.goalMet && dailyActivity.minutesSpent >= dailyGoalMinutes) {
    await prisma.dailyActivity.update({
      where: { id: dailyActivity.id },
      data: { goalMet: true, xpEarned: { increment: XP_VALUES.DAILY_GOAL_MET } },
    });
  }

  // 4. Update Streak logic
  let currentStreak = user.streak?.currentStreak || 0;
  let longestStreak = user.streak?.longestStreak || 0;
  const lastActive = user.streak?.lastActiveDate;
  let streakUpdated = false;

  if (!lastActive) {
    currentStreak = 1;
    longestStreak = 1;
    streakUpdated = true;
  } else if (lastActive === today) {
    // Already active today, streak remains same
  } else if (lastActive === yesterday) {
    // Active yesterday, extend streak
    currentStreak += 1;
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
    streakUpdated = true;
  } else {
    // Missed a day or more, reset streak to 1
    currentStreak = 1;
    streakUpdated = true;
  }

  await prisma.streak.upsert({
    where: { userId },
    create: {
      userId,
      currentStreak,
      longestStreak,
      lastActiveDate: today,
    },
    update: {
      currentStreak,
      longestStreak,
      lastActiveDate: today,
    },
  });

  // 5. Evaluate Achievements
  const newAchievements: string[] = [];
  const existingCodes = new Set(user.achievements.map((ua) => ua.achievement.code));

  const allAchievements = await prisma.achievement.findMany();

  for (const ach of allAchievements) {
    if (existingCodes.has(ach.code)) continue;

    let qualifies = false;
    if (ach.code === "first_step" && (lessonCompleted || exerciseCompleted)) {
      qualifies = true;
    } else if (ach.code === "streak_3" && currentStreak >= 3) {
      qualifies = true;
    } else if (ach.code === "streak_7" && currentStreak >= 7) {
      qualifies = true;
    } else if (ach.code === "xp_100" && currentTotalXp >= 100) {
      qualifies = true;
    } else if (ach.code === "xp_500" && currentTotalXp >= 500) {
      qualifies = true;
    } else if (ach.code === "level_5" && newLevel >= 5) {
      qualifies = true;
    }

    if (qualifies) {
      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: ach.id,
        },
      });
      newAchievements.push(ach.code);
    }
  }

  return {
    xpAwarded: xpAmount,
    totalXp: currentTotalXp,
    currentLevel: newLevel,
    leveledUp,
    streakUpdated,
    currentStreak,
    newAchievements,
  };
}

/**
 * Spaced Repetition (Leitner Box) Update for Vocabulary Review
 */
export async function updateVocabularyReviewProgress({
  userId,
  vocabularyId,
  remembered,
}: {
  userId: string;
  vocabularyId: string;
  remembered: boolean;
}) {
  const existing = await prisma.vocabularyProgress.findUnique({
    where: {
      userId_vocabularyId: { userId, vocabularyId },
    },
  });

  let box = existing?.box || 1;
  let consecutiveCorrect = existing?.consecutiveCorrect || 0;
  let mastery = existing?.mastery || 0;

  if (remembered) {
    box = Math.min(box + 1, 5);
    consecutiveCorrect += 1;
    mastery = Math.min(mastery + 20, 100);
  } else {
    box = 1; // Return to Box 1 for reinforcement
    consecutiveCorrect = 0;
    mastery = Math.max(mastery - 15, 0);
  }

  const intervalDays = SPNotificationIntervals[box - 1] || 1;
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + intervalDays);

  return prisma.vocabularyProgress.upsert({
    where: {
      userId_vocabularyId: { userId, vocabularyId },
    },
    create: {
      userId,
      vocabularyId,
      box,
      intervalDays,
      consecutiveCorrect,
      totalAttempts: 1,
      lastReviewedAt: new Date(),
      nextReviewAt: nextReview,
      mastery,
    },
    update: {
      box,
      intervalDays,
      consecutiveCorrect,
      totalAttempts: { increment: 1 },
      lastReviewedAt: new Date(),
      nextReviewAt: nextReview,
      mastery,
    },
  });
}
