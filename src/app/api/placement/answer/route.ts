import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { awardUserXpAndRecordActivity } from "@/lib/gamification/engine";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { testId, answers } = await req.json(); // answers: { [questionId: string]: string }

    if (!testId || !answers) {
      return NextResponse.json(
        { error: "testId and answers dictionary are required." },
        { status: 400 }
      );
    }

    const test = await prisma.placementTest.findUnique({
      where: { id: testId },
      include: {
        questions: { orderBy: { orderIndex: "asc" } },
        languagePair: true,
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Placement test not found." }, { status: 404 });
    }

    let correctCount = 0;
    const totalQuestions = test.questions.length;
    const detailedResults = [];

    for (const q of test.questions) {
      const submittedAnswer = (answers[q.id] || "").trim();
      const isCorrect = submittedAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
      if (isCorrect) correctCount++;

      detailedResults.push({
        questionId: q.id,
        instruction: q.instruction,
        question: q.question,
        submittedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      });
    }

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    let recommendedLevel = "A1";
    if (scorePercentage >= 80) recommendedLevel = "B1";
    else if (scorePercentage >= 50) recommendedLevel = "A2";

    let attemptId = "guest";
    let progressUpdate = null;

    if (user) {
      const attempt = await prisma.placementAttempt.create({
        data: {
          userId: user.id,
          placementTestId: test.id,
          score: scorePercentage,
          recommendedLevel,
          answers: JSON.stringify(answers),
        },
      });
      attemptId = attempt.id;

      // Update user learning path with assessed level
      await prisma.learningPath.updateMany({
        where: {
          userId: user.id,
          languagePairId: test.languagePairId,
        },
        data: {
          level: recommendedLevel,
        },
      });

      // Award XP for completing placement test
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "PLACEMENT_TEST",
        minutes: 5,
      });
    }

    return NextResponse.json({
      success: true,
      attemptId,
      score: scorePercentage,
      correctCount,
      totalQuestions,
      recommendedLevel,
      detailedResults,
      progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/placement/answer error:", error);
    return NextResponse.json(
      { error: "Failed to grade placement test." },
      { status: 500 }
    );
  }
}
