import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateLanguagePair } from "@/lib/i18n";

export async function GET(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { searchParams } = new URL(req.url);

    let native = searchParams.get("native");
    let target = searchParams.get("target");

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
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Find the LanguagePair curriculum
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
      return NextResponse.json(
        {
          error: `No curriculum found for language pair ${native} -> ${target}`,
          modules: [],
        },
        { status: 404 }
      );
    }

    // Determine completed lessons if user is logged in
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

    // Add lock status and completion flags
    let isPreviousCompleted = true;
    const modulesWithStatus = pair.modules.map((mod) => {
      const lessonsWithStatus = mod.lessons.map((lsn) => {
        const isCompleted = completedLessonIds.has(lsn.id);
        const isUnlocked = isPreviousCompleted;
        if (!isCompleted) {
          isPreviousCompleted = false; // Next ones are locked
        }
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
          isCompleted,
          isUnlocked,
        };
      });

      return {
        id: mod.id,
        orderIndex: mod.orderIndex,
        category: mod.category,
        title: mod.title,
        description: mod.description,
        icon: mod.icon,
        lessons: lessonsWithStatus,
      };
    });

    return NextResponse.json({
      languagePair: {
        id: pair.id,
        nativeCode: pair.nativeLanguageCode,
        targetCode: pair.targetLanguageCode,
        nativeName: pair.nativeLanguage.name,
        targetName: pair.targetLanguage.name,
        description: pair.description,
        culturalNotes: pair.culturalNotes,
      },
      modules: modulesWithStatus,
    });
  } catch (error) {
    console.error("GET /api/learning-path error:", error);
    return NextResponse.json(
      { error: "Failed to load learning path." },
      { status: 500 }
    );
  }
}
