import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { klaus } from "@/lib/ai/klaus";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json();
    const { exerciseId, step = 1, nativeLanguageCode, targetLanguageCode } = body;

    let exercise = null;
    if (exerciseId) {
      exercise = await prisma.exercise.findUnique({
        where: { id: exerciseId },
        include: { lesson: { include: { languagePair: true } } },
      });
    }

    const native = (nativeLanguageCode || exercise?.lesson.languagePair.nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || exercise?.lesson.languagePair.targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    // Check predefined progressive hints on exercise first
    let hintText = "";
    if (exercise) {
      if (step === 1 && exercise.hintLevel1) hintText = exercise.hintLevel1;
      else if (step === 2 && exercise.hintLevel2) hintText = exercise.hintLevel2;
      else if (step === 3 && exercise.hintLevel3) hintText = exercise.hintLevel3;
    }

    if (!hintText) {
      const hintResult = await klaus.generateHint({
        nativeLanguage: native,
        targetLanguage: target,
        exercisePrompt: exercise?.prompt || "",
        correctAnswer: exercise?.correctAnswer || "",
        hintStep: Number(step) as 1 | 2 | 3,
      });
      hintText = hintResult.hint;
    }

    if (user) {
      await prisma.aIInteraction.create({
        data: {
          userId: user.id,
          interactionType: "klaus_hint",
          promptContext: JSON.stringify({ exerciseId, step, native, target }),
          input: `Hint request step ${step}`,
          output: hintText,
        },
      });
    }

    return NextResponse.json({
      success: true,
      hint: hintText,
      step: Number(step),
      nativeLanguageCode: native,
    });
  } catch (error) {
    console.error("POST /api/klaus/hint error:", error);
    return NextResponse.json(
      { error: "Failed to generate hint." },
      { status: 500 }
    );
  }
}
