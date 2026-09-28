import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { validateLanguagePair, NativeLanguageCode, TargetLanguageCode } from "../lib/i18n";
import { evaluateUserAnswer } from "../lib/nlp/evaluator";
import { awardUserXpAndRecordActivity } from "../lib/gamification/engine";

const router = Router();

// GET /api/practice
router.get("/practice", async (req: Request, res: Response) => {
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

    const rawExercises = await prisma.exercise.findMany({
      where: {
        lesson: {
          languagePair: {
            nativeLanguageCode: native,
            targetLanguageCode: target,
          },
        },
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
      take: 20,
    });

    const exercises = rawExercises.map((ex) => ({
      id: ex.id,
      type: ex.type,
      instruction: ex.instruction,
      prompt: ex.prompt,
      promptTransliteration: ex.promptTransliteration,
      audioText: ex.audioText,
      correctAnswer: ex.correctAnswer,
      options: typeof ex.options === "string" ? JSON.parse(ex.options) : ex.options || [],
      lessonTitle: ex.lesson.title,
      moduleTitle: ex.lesson.module.title,
    }));

    return res.json({ exercises });
  } catch (error) {
    console.error("GET /api/practice error:", error);
    return res.status(500).json({ error: "Failed to load practice exercises." });
  }
});

// POST /api/practice/:id/answer
router.post("/practice/:id/answer", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const id = req.params.id as string;
    const { userAnswer, hintsUsed = 0, timeSpentSeconds = 5, isLessonRunner = false } = req.body;

    if (userAnswer === undefined || userAnswer === null) {
      return res.status(400).json({ error: "userAnswer is required." });
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
      return res.status(404).json({ error: "Exercise not found." });
    }

    const nativeCode = (exercise.lesson.languagePair.nativeLanguageCode || "en") as NativeLanguageCode;
    const targetCode = (exercise.lesson.languagePair.targetLanguageCode || "es") as TargetLanguageCode;

    const acceptable = typeof exercise.acceptableAnswers === "string"
      ? JSON.parse(exercise.acceptableAnswers)
      : exercise.acceptableAnswers;

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

      if (evaluation.isCorrect && !isLessonRunner) {
        progressUpdate = await awardUserXpAndRecordActivity({
          userId: user.id,
          xpType: "EXERCISE_CORRECT",
          minutes: Math.ceil(timeSpentSeconds / 60) || 1,
          exerciseCompleted: true,
        });
      }
    }

    return res.json({
      evaluation,
      exercise: {
        id: exercise.id,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
      },
      progress: progressUpdate,
      xpAwarded: isLessonRunner ? 0 : (evaluation.isCorrect ? (progressUpdate?.xpAwarded || 10) : 0),
    });
  } catch (error) {
    console.error("POST /api/practice/:id/answer error:", error);
    return res.status(500).json({ error: "Failed to evaluate exercise answer." });
  }
});

// POST /api/placement/start
router.post("/placement/start", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = req.body || {};

    let nativeLanguageCode = body.nativeLanguageCode;
    let targetLanguageCode = body.targetLanguageCode;

    if (!nativeLanguageCode || !targetLanguageCode) {
      if (user?.preferences) {
        nativeLanguageCode = user.preferences.nativeLanguageCode;
        targetLanguageCode = user.preferences.targetLanguageCode;
      } else {
        nativeLanguageCode = "en";
        targetLanguageCode = "es";
      }
    }

    const validation = validateLanguagePair(nativeLanguageCode, targetLanguageCode);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode,
          targetLanguageCode,
        },
      },
      include: {
        placementTests: {
          include: {
            questions: {
              orderBy: { orderIndex: "asc" },
            },
          },
        },
      },
    });

    if (!pair) {
      return res.status(404).json({ error: "Language pair not found" });
    }

    const placementTest = pair.placementTests?.[0];

    if (!placementTest || placementTest.questions.length === 0) {
      return res.status(404).json({ error: "No placement diagnostic questions found for this language pair." });
    }

    const safeQuestions = placementTest.questions.map((q) => ({
      id: q.id,
      orderIndex: q.orderIndex,
      difficulty: q.difficulty,
      instruction: q.instruction,
      question: q.question,
      options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
    }));

    return res.json({
      testId: placementTest.id,
      languagePairId: pair.id,
      nativeLanguageCode,
      targetLanguageCode,
      title: placementTest.title,
      description: placementTest.description,
      totalQuestions: safeQuestions.length,
      questions: safeQuestions,
    });
  } catch (error) {
    console.error("Placement start error:", error);
    return res.status(500).json({ error: "Internal server error while starting diagnostic test." });
  }
});

// POST /api/placement/answer
router.post("/placement/answer", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { testId, answers } = req.body;

    if (!testId || !answers) {
      return res.status(400).json({ error: "testId and answers dictionary are required." });
    }

    const test = await prisma.placementTest.findUnique({
      where: { id: testId },
      include: {
        questions: { orderBy: { orderIndex: "asc" } },
        languagePair: true,
      },
    });

    if (!test) {
      return res.status(404).json({ error: "Placement test not found." });
    }

    let correctCount = 0;
    const totalQuestions = test.questions.length;
    const detailedResults = [];

    const masteredModuleIndices: number[] = [];
    const focusModuleIndices: number[] = [];

    for (let idx = 0; idx < test.questions.length; idx++) {
      const q = test.questions[idx];
      const submittedAnswer = (answers[q.id] || "").trim();
      const isCorrect = submittedAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
      if (isCorrect) {
        correctCount++;
        masteredModuleIndices.push(idx + 1);
      } else {
        focusModuleIndices.push(idx + 1);
      }

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

    // Adaptive auto-inclusion of lower CEFR modules
    if (recommendedLevel === "A2" || recommendedLevel === "B1") {
      if (!masteredModuleIndices.includes(1)) masteredModuleIndices.push(1);
    }
    if (recommendedLevel === "B1") {
      if (!masteredModuleIndices.includes(2)) masteredModuleIndices.push(2);
      if (!masteredModuleIndices.includes(3)) masteredModuleIndices.push(3);
    }

    const payloadAnswers = {
      rawAnswers: answers,
      masteredModuleIndices,
      focusModuleIndices,
      score: scorePercentage,
      recommendedLevel,
    };

    let attemptId = "guest";
    let progressUpdate = null;

    if (user) {
      const attempt = await prisma.placementAttempt.create({
        data: {
          userId: user.id,
          placementTestId: test.id,
          score: scorePercentage,
          recommendedLevel,
          answers: JSON.stringify(payloadAnswers),
        },
      });
      attemptId = attempt.id;

      await prisma.learningPath.updateMany({
        where: {
          userId: user.id,
          languagePairId: test.languagePairId,
        },
        data: {
          level: recommendedLevel,
        },
      });

      // Seed vocabulary progress for mastered refresher modules into Leitner Box 2
      try {
        const masteredVocabs = await prisma.vocabulary.findMany({
          where: {
            languagePairId: test.languagePairId,
            lesson: {
              module: {
                orderIndex: { in: masteredModuleIndices },
              },
            },
          },
          select: { id: true },
        });

        for (const voc of masteredVocabs) {
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
              box: 2,
              intervalDays: 3,
              easeFactor: 2.6,
              mastery: 40,
            },
            update: {
              box: 2,
              easeFactor: 2.6,
              mastery: 40,
            },
          });
        }
      } catch (vocErr) {
        console.warn("Could not pre-seed SRS for mastered modules:", vocErr);
      }

      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "PLACEMENT_TEST",
        minutes: 5,
      });
    }

    return res.json({
      success: true,
      attemptId,
      score: scorePercentage,
      correctCount,
      totalQuestions,
      assignedLevel: recommendedLevel,
      recommendedLevel,
      masteredModuleCount: masteredModuleIndices.length,
      focusModuleCount: Math.max(0, 5 - masteredModuleIndices.length),
      detailedResults,
      progress: progressUpdate,
    });
  } catch (error) {
    console.error("Placement evaluate error:", error);
    return res.status(500).json({ error: "Failed to evaluate placement test." });
  }
});

export default router;
