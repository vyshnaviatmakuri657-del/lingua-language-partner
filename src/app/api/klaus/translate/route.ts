import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { klaus } from "@/lib/ai/klaus";
import { NativeLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { text, from = "auto", to = "ko", nativeLanguageCode } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Text to translate is required." }, { status: 400 });
    }

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;

    const result = await klaus.translateSentence({
      text: text.trim(),
      from,
      to,
      nativeLanguage: native,
    });

    // Save translation history in database
    await prisma.translationRequest.create({
      data: {
        userId: user?.id || null,
        sourceLanguage: result.fromLanguage,
        targetLanguage: result.toLanguage,
        sourceText: text.trim(),
        translatedText: result.translation,
        pronunciation: result.pronunciation,
        transliteration: result.transliteration,
        literalMeaning: result.literalMeaning,
        grammarExplanation: result.grammarExplanation,
        usageNotes: result.usageNotes,
      },
    });

    return NextResponse.json({
      success: true,
      result,
      nativeLanguageCode: native,
    });
  } catch (error) {
    console.error("POST /api/klaus/translate error:", error);
    return NextResponse.json(
      { error: "Translation failed." },
      { status: 500 }
    );
  }
}
