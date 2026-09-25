import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayDateString } from "@/lib/gamification/engine";

export async function GET(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const timezone = user.profile?.timezone || "UTC";
    const today = getTodayDateString(timezone);

    // Fetch user progress, daily activity, streak, vocabulary progress
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
        include: { languagePair: true },
      }),
    ]);

    // Calculate accuracy
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter((a) => a.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;

    // Detect weak areas (exercises with isCorrect = false multiple times)
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

    // Spaced repetition due count
    const now = new Date();
    const wordsDue = vocabProgress.filter((vp) => vp.nextReviewAt <= now).length;
    const wordsMastered = vocabProgress.filter((vp) => vp.mastery >= 80).length;

    return NextResponse.json({
      totalXp: progress?.totalXp || 0,
      currentLevel: progress?.currentLevel || 1,
      lessonsCompleted: progress?.lessonsCompleted || 0,
      exercisesCompleted: progress?.exercisesCompleted || 0,
      accuracyRate: accuracy,
      practiceMinutes: progress?.totalPracticeMinutes || 0,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      todayXp: todayActivity?.xpEarned || 0,
      todayMinutes: todayActivity?.minutesSpent || 0,
      dailyGoalMinutes: user.profile?.dailyGoalMinutes || 15,
      goalMet: todayActivity?.goalMet || false,
      wordsDue,
      wordsMastered,
      weakAreas,
      activePath: activePath
        ? {
            level: activePath.level,
            nativeCode: activePath.languagePair.nativeLanguageCode,
            targetCode: activePath.languagePair.targetLanguageCode,
          }
        : null,
    });
  } catch (error) {
    console.error("GET /api/progress error:", error);
    return NextResponse.json(
      { error: "Failed to load user progress." },
      { status: 500 }
    );
  }
}
