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

    // 1. If user is logged in, find vocabularyProgress cards due
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
        return NextResponse.json({ cards });
      }
    }

    // 2. If no cards are overdue or user is guest, return words from the active language pair
    const pair = await prisma.languagePair.findUnique({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: native,
          targetLanguageCode: target,
        },
      },
      include: {
        vocabularies: { take: 15 },
      },
    });

    const fallbackVocabs = pair?.vocabularies || [];
    const cards = fallbackVocabs.map((v) => ({
      vocabularyId: v.id,
      targetWord: v.targetWord,
      nativeMeaning: v.nativeMeaning,
      pronunciation: v.pronunciation,
      transliteration: v.transliteration,
      partOfSpeech: v.partOfSpeech,
      exampleTarget: v.exampleTarget,
      exampleNative: v.exampleNative,
      box: 1,
      mastery: 0,
      due: true,
    }));

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("GET /api/review error:", error);
    return NextResponse.json(
      { error: "Failed to load review cards." },
      { status: 500 }
    );
  }
}
