import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        lessons: {
          include: {
            exercises: true,
          },
        },
      },
    });

    if (!pair) {
      return NextResponse.json({ exercises: [] });
    }

    // Collect all exercises in this pair
    const allExercises = pair.lessons.flatMap((lsn) =>
      lsn.exercises.map((ex) => ({
        id: ex.id,
        lessonId: lsn.id,
        lessonTitle: lsn.title,
        type: ex.type,
        instruction: ex.instruction,
        prompt: ex.prompt,
        promptTransliteration: ex.promptTransliteration,
        options: typeof ex.options === "string" ? JSON.parse(ex.options) : ex.options,
        // hide correctAnswer until submission
      }))
    );

    return NextResponse.json({
      exercises: allExercises,
      nativeLanguageCode: native,
      targetLanguageCode: target,
    });
  } catch (error) {
    console.error("GET /api/practice error:", error);
    return NextResponse.json(
      { error: "Failed to fetch practice exercises" },
      { status: 500 }
    );
  }
}
