import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { evaluateUserAnswer } from "@/lib/nlp/evaluator";
import { awardUserXpAndRecordActivity } from "@/lib/gamification/engine";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { id } = await params;
    const { userAnswer, hintsUsed = 0, timeSpentSeconds = 5 } = await req.json();

    if (userAnswer === undefined || userAnswer === null) {
      return NextResponse.json(
        { error: "userAnswer is required." },
        { status: 400 }
      );
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        lesson: {
          include: {
            languagePair: true,
          },
        },
      },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found." }, { status: 404 });
    }

    const nativeCode = (exercise.lesson.languagePair.nativeLanguageCode || "en") as NativeLanguageCode;
    const targetCode = (exercise.lesson.languagePair.targetLanguageCode || "es") as TargetLanguageCode;

    const acceptable = typeof exercise.acceptableAnswers === "string"
      ? JSON.parse(exercise.acceptableAnswers)
      : exercise.acceptableAnswers;

    // Evaluate answer with NLP engine
    const evaluation = await evaluateUserAnswer({
      userAnswer: String(userAnswer),
      correctAnswer: exercise.correctAnswer,
      acceptableAnswers: Array.isArray(acceptable) ? acceptable : [exercise.correctAnswer],
      instructionLanguage: nativeCode,
      learningLanguage: targetCode,
      promptQuestion: exercise.prompt,
    });

    let progressUpdate = null;

    if (user) {
      // Save attempt
      await prisma.exerciseAttempt.create({
        data: {
          userId: user.id,
          exerciseId: exercise.id,
          userAnswer: String(userAnswer),
          isCorrect: evaluation.isCorrect,
          score: evaluation.score,
          feedback: evaluation.feedback,
          evaluationDetails: JSON.stringify(evaluation),
          hintsUsed: Number(hintsUsed) || 0,
          timeSpentSeconds: Number(timeSpentSeconds) || 5,
        },
      });

      // Award XP on correct attempt
      if (evaluation.isCorrect) {
        progressUpdate = await awardUserXpAndRecordActivity({
          userId: user.id,
          xpType: "EXERCISE_CORRECT",
          minutes: Math.ceil(timeSpentSeconds / 60) || 1,
          exerciseCompleted: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      evaluation,
      correctAnswer: exercise.correctAnswer,
      explanation: exercise.explanation || evaluation.explanation,
      progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/practice/[id]/answer error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer." },
      { status: 500 }
    );
  }
}
