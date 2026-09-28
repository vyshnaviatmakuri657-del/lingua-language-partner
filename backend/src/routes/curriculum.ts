import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { getAuthUserFromRequest } from "../lib/auth";
import { validateLanguagePair, SUPPORTED_NATIVE_LANGUAGES, SUPPORTED_TARGET_LANGUAGES } from "../lib/i18n";

const router = Router();

// GET /api/vocabulary
router.get("/vocabulary", async (req: Request, res: Response) => {
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

    const rawVocabularies = await prisma.vocabulary.findMany({
      where: {
        languagePair: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
        progress: user ? { where: { userId: user.id } } : false,
      },
      orderBy: { targetWord: "asc" },
    });

    const vocabularies = rawVocabularies.map((v) => {
      const prog = v.progress && v.progress[0];
      return {
        id: v.id,
        targetWord: v.targetWord,
        nativeMeaning: v.nativeMeaning,
        pronunciation: v.pronunciation,
        partOfSpeech: v.partOfSpeech,
        transliteration: v.transliteration,
        exampleTarget: v.exampleTarget,
        exampleNative: v.exampleNative,
        moduleTitle: v.lesson?.module?.title,
        moduleCategory: v.lesson?.module?.category,
        moduleIcon: v.lesson?.module?.icon,
        lessonTitle: v.lesson?.title,
        box: prog?.box || 1,
        mastery: prog?.mastery || 0,
      };
    });

    return res.json({ vocabularies });
  } catch (error) {
    console.error("GET /api/vocabulary error:", error);
    return res.status(500).json({ error: "Failed to load vocabulary bank." });
  }
});

// GET /api/grammar
router.get("/grammar", async (req: Request, res: Response) => {
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

    const rawTopics = await prisma.grammarTopic.findMany({
      where: {
        languagePair: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const topics = rawTopics.map((t) => {
      let examples = [];
      let commonMistakes = [];

      try {
        examples = typeof t.examples === "string" ? JSON.parse(t.examples) : t.examples || [];
      } catch {
        examples = [];
      }

      try {
        commonMistakes = typeof t.commonMistakes === "string" ? JSON.parse(t.commonMistakes) : t.commonMistakes || [];
      } catch {
        commonMistakes = [];
      }

      return {
        id: t.id,
        title: t.title,
        explanation: t.explanation,
        ruleSummary: t.ruleSummary,
        examples,
        commonMistakes,
        lessonTitle: t.lesson?.title,
        moduleTitle: t.lesson?.module?.title,
        moduleCategory: t.lesson?.module?.category,
        moduleIcon: t.lesson?.module?.icon,
      };
    });

    return res.json({ topics });
  } catch (error) {
    console.error("GET /api/grammar error:", error);
    return res.status(500).json({ error: "Failed to load grammar topics." });
  }
});

// GET /api/languages
router.get("/languages", async (_req: Request, res: Response) => {
  try {
    return res.json({
      nativeLanguages: SUPPORTED_NATIVE_LANGUAGES,
      targetLanguages: SUPPORTED_TARGET_LANGUAGES,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load supported languages." });
  }
});

export default router;
