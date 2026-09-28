import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { updateVocabularyReviewProgress, awardUserXpAndRecordActivity } from "../lib/gamification/engine";

const router = Router();

// GET /api/review
router.get("/review", async (req: Request, res: Response) => {
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

    if (user) {
      const now = new Date();
      const progressCards = await prisma.vocabularyProgress.findMany({
        where: {
          userId: user.id,
          nextReviewAt: { lte: now },
        },
        include: {
          vocabulary: {
            include: { languagePair: true },
          },
        },
        take: 20,
      });

      if (progressCards.length > 0) {
        const cards = progressCards.map((p) => ({
          progressId: p.id,
          vocabularyId: p.vocabulary.id,
          targetWord: p.vocabulary.targetWord,
          nativeMeaning: p.vocabulary.nativeMeaning,
          pronunciation: p.vocabulary.pronunciation,
          transliteration: p.vocabulary.transliteration,
          partOfSpeech: p.vocabulary.partOfSpeech,
          exampleTarget: p.vocabulary.exampleTarget,
          exampleNative: p.vocabulary.exampleNative,
          box: p.box,
          mastery: p.mastery,
          due: true,
        }));
        return res.json({ cards });
      }
    }

    const userProgressList = user
      ? await prisma.vocabularyProgress.findMany({
          where: { userId: user.id },
        })
      : [];
    const progressMap = new Map<string, (typeof userProgressList)[number]>();
    userProgressList.forEach((p) => progressMap.set(p.vocabularyId, p));

    const pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        vocabularies: {
          take: 15,
        },
      },
    });

    if (!pair || pair.vocabularies.length === 0) {
      return res.json({ cards: [] });
    }

    const cards = pair.vocabularies.map((v) => {
      const p = progressMap.get(v.id);
      return {
        vocabularyId: v.id,
        targetWord: v.targetWord,
        nativeMeaning: v.nativeMeaning,
        pronunciation: v.pronunciation,
        transliteration: v.transliteration,
        partOfSpeech: v.partOfSpeech,
        exampleTarget: v.exampleTarget,
        exampleNative: v.exampleNative,
        box: p?.box || 1,
        mastery: p?.mastery || 0,
        due: p ? p.nextReviewAt <= new Date() : true,
      };
    });

    return res.json({ cards });
  } catch (error) {
    console.error("GET /api/review error:", error);
    return res.status(500).json({ error: "Failed to load review items." });
  }
});

// POST /api/review/:id
router.post("/review/:id", async (req: Request, res: Response) => {
  try {
    const user = await getAuthUserFromRequest(req);
    const id = req.params.id as string;
    const { remembered } = req.body;

    if (user) {
      const updatedProgress = await updateVocabularyReviewProgress({
        userId: user.id,
        vocabularyId: id,
        remembered: Boolean(remembered),
      });

      const progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "VOCABULARY_REVIEW",
        minutes: 1,
      });

      return res.json({
        success: true,
        updatedProgress,
        progressUpdate,
        xpAwarded: 5,
      });
    }

    return res.json({
      success: true,
      xpAwarded: 5,
      message: "Guest review recorded.",
    });
  } catch (error) {
    console.error("POST /api/review/:id error:", error);
    return res.status(500).json({ error: "Failed to record card review." });
  }
});

export default router;
