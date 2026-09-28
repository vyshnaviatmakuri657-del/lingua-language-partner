import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { klaus } from "../lib/ai/klaus";
import { awardUserXpAndRecordActivity } from "../lib/gamification/engine";
import { NativeLanguageCode, TargetLanguageCode } from "../lib/i18n";

const router = Router();

// POST /api/conversation/start
router.post("/conversation/start", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { scenario = "Restaurant", difficulty = "beginner", nativeLanguageCode, targetLanguageCode } = req.body;

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    let pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
    });

    if (!pair) {
      pair = await prisma.languagePair.create({
        data: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
          description: `${target} roleplay for ${native}`,
        },
      });
    }

    const initialTurn = await klaus.generateRoleplayTurn({
      scenario,
      difficulty,
      userMessage: `[Starting roleplay scenario: ${scenario}]`,
      dialogueHistory: [],
      nativeLanguage: native,
      targetLanguage: target,
    });

    let conversationId = "guest-" + Date.now();

    if (user) {
      const convo = await prisma.conversation.create({
        data: {
          userId: user.id,
          languagePairId: pair.id,
          scenario,
          difficulty,
          title: `${scenario} (${target.toUpperCase()})`,
          messages: {
            create: {
              sender: "klaus",
              targetText: initialTurn.replyTarget,
              transliteration: initialTurn.transliteration,
              nativeTranslation: initialTurn.nativeTranslation,
              nativeExplanation: initialTurn.pedagogicalTip,
            },
          },
        },
      });
      conversationId = convo.id;
    }

    return res.json({
      success: true,
      conversationId,
      scenario,
      difficulty,
      initialMessage: {
        id: "msg-0",
        sender: "klaus",
        targetText: initialTurn.replyTarget,
        transliteration: initialTurn.transliteration,
        nativeTranslation: initialTurn.nativeTranslation,
        nativeExplanation: initialTurn.pedagogicalTip,
        correction: null,
      },
    });
  } catch (error) {
    console.error("Start conversation error:", error);
    return res.status(500).json({ error: "Failed to initiate roleplay dialogue." });
  }
});

// POST /api/conversation/message
router.post("/conversation/message", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const {
      conversationId,
      message,
      scenario = "Restaurant",
      difficulty = "beginner",
      dialogueHistory = [],
      nativeLanguageCode,
      targetLanguageCode,
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    const turn = await klaus.generateRoleplayTurn({
      scenario,
      difficulty,
      userMessage: message.trim(),
      dialogueHistory,
      nativeLanguage: native,
      targetLanguage: target,
    });

    let progressUpdate = null;

    if (user && conversationId && !conversationId.startsWith("guest-")) {
      await prisma.conversationMessage.create({
        data: {
          conversationId,
          sender: "user",
          targetText: message.trim(),
        },
      });

      await prisma.conversationMessage.create({
        data: {
          conversationId,
          sender: "klaus",
          targetText: turn.replyTarget,
          transliteration: turn.transliteration,
          nativeTranslation: turn.nativeTranslation,
          nativeExplanation: turn.pedagogicalTip,
          correction: turn.correction?.hasMistake ? turn.correction.correctedSentence : null,
        },
      });

      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "CONVERSATION_TURN",
        minutes: 1,
      });
    }

    const replyPayload = {
      id: "msg-" + Date.now(),
      sender: "klaus" as const,
      targetText: turn.replyTarget,
      transliteration: turn.transliteration,
      nativeTranslation: turn.nativeTranslation,
      nativeExplanation: turn.pedagogicalTip,
      inspection: turn.inspection || null,
      correction: turn.correction?.hasMistake
        ? {
            correctedSentence: turn.correction.correctedSentence,
            explanationInNative: turn.correction.explanationInNative,
          }
        : null,
    };

    return res.json({
      success: true,
      klausReply: replyPayload,
      reply: replyPayload,
      progress: progressUpdate,
    });
  } catch (error) {
    console.error("Conversation turn error:", error);
    return res.status(500).json({ error: "Failed to generate conversation turn." });
  }
});

// POST /api/conversation/feedback
router.post("/conversation/feedback", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const {
      conversationId,
      scenario = "Restaurant",
      difficulty = "beginner",
      dialogueHistory = [],
      nativeLanguageCode,
      targetLanguageCode,
    } = req.body;

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    const feedback = await klaus.generateRoleplayFeedback({
      scenario,
      difficulty,
      dialogueHistory,
      nativeLanguage: native,
      targetLanguage: target,
    });

    let progressUpdate = null;
    if (user) {
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "LESSON_COMPLETE",
        minutes: 3,
      });
    }

    return res.json({
      success: true,
      feedback,
      xpAwarded: 30,
      progress: progressUpdate,
    });
  } catch (error) {
    console.error("Conversation feedback error:", error);
    return res.status(500).json({ error: "Failed to generate conversation feedback." });
  }
});

// POST /api/klaus/chat
router.post("/klaus/chat", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { message, context = {}, chatHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const nativeLanguage = (context.nativeLanguage || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const targetLanguage = (context.targetLanguage || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    const fullContext = {
      ...context,
      nativeLanguage,
      targetLanguage,
    };

    const reply = await klaus.chat({
      userMessage: message,
      context: fullContext,
      chatHistory,
    });

    if (user) {
      await prisma.aIInteraction.create({
        data: {
          userId: user.id,
          interactionType: "klaus_chat",
          promptContext: JSON.stringify(fullContext),
          input: message,
          output: reply,
        },
      });
    }

    return res.json({
      success: true,
      reply,
      nativeLanguage,
      targetLanguage,
    });
  } catch (error) {
    console.error("POST /api/klaus/chat error:", error);
    return res.status(500).json({ error: "Failed to generate tutor response." });
  }
});

// POST /api/klaus/explain
router.post("/klaus/explain", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { topic, mistake, context = {} } = req.body;

    const native = (context.nativeLanguage || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (context.targetLanguage || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    const promptMessage = mistake
      ? `The learner made this mistake in ${target}: "${mistake}". Please explain in ${native} why it is incorrect, provide the correct version, and explain the grammatical rule warmly.`
      : `Please provide a clear and thorough pedagogical explanation in ${native} for the grammar topic: "${topic}". Include real-world conversational examples in ${target}.`;

    const explanation = await klaus.chat({
      userMessage: promptMessage,
      context: {
        nativeLanguage: native,
        targetLanguage: target,
        lessonGrammar: topic,
      },
    });

    return res.json({
      success: true,
      explanation,
      nativeLanguage: native,
      targetLanguage: target,
    });
  } catch (error) {
    console.error("POST /api/klaus/explain error:", error);
    return res.status(500).json({ error: "Failed to explain grammar concept." });
  }
});

// POST /api/klaus/hint
router.post("/klaus/hint", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { exerciseId, step = 1, nativeLanguageCode, targetLanguageCode } = req.body;

    let exercise = null;
    if (exerciseId) {
      exercise = await prisma.exercise.findUnique({
        where: { id: exerciseId },
        include: { lesson: { include: { languagePair: true } } },
      });
    }

    const native = (nativeLanguageCode || exercise?.lesson.languagePair.nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || exercise?.lesson.languagePair.targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

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

    return res.json({
      success: true,
      hint: hintText,
      step: Number(step),
      nativeLanguageCode: native,
    });
  } catch (error) {
    console.error("POST /api/klaus/hint error:", error);
    return res.status(500).json({ error: "Failed to generate hint." });
  }
});

// POST /api/klaus/translate
router.post("/klaus/translate", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const { text, from = "auto", to = "ko", nativeLanguageCode, nativeLanguage } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text to translate is required." });
    }

    const native = (nativeLanguageCode || nativeLanguage || user?.preferences?.nativeLanguageCode || "en") as NativeLanguageCode;

    const result = await klaus.translateSentence({
      text: text.trim(),
      from,
      to,
      nativeLanguage: native,
    });

    try {
      await prisma.translationRequest.create({
        data: {
          userId: user?.id || null,
          sourceLanguage: result.fromLanguage || from || "auto",
          targetLanguage: result.toLanguage || to || "ko",
          sourceText: text.trim(),
          translatedText: result.translation || text.trim(),
          pronunciation: result.pronunciation || "",
          transliteration: result.transliteration || "",
          literalMeaning: result.literalMeaning || "",
          grammarExplanation: result.grammarExplanation || "",
          usageNotes: result.usageNotes || "",
        },
      });
    } catch (dbErr) {
      console.warn("Failed to log translation request to database:", dbErr);
    }

    return res.json({
      success: true,
      result,
      nativeLanguageCode: native,
    });
  } catch (error) {
    console.error("POST /api/klaus/translate error:", error);
    return res.status(500).json({ error: "Translation failed." });
  }
});

// GET /api/klaus/history
router.get("/klaus/history", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const interactions = await prisma.aIInteraction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return res.json({ history: interactions });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch interaction history." });
  }
});

export default router;
