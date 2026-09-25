import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { awardUserXpAndRecordActivity } from "@/lib/gamification/engine";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: { vocabularies: true },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    let progressUpdate = null;

    if (user) {
      // Award XP & advance daily progress
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "LESSON_COMPLETE",
        customXp: lesson.xpReward,
        minutes: lesson.estimatedMinutes || 10,
        lessonCompleted: true,
      });

      // Enroll lesson vocabularies into Spaced Repetition Box 1
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

    return NextResponse.json({
      success: true,
      lessonId: lesson.id,
      xpAwarded: lesson.xpReward,
      progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/lessons/[id]/complete error:", error);
    return NextResponse.json(
      { error: "Failed to mark lesson complete." },
      { status: 500 }
    );
  }
}
