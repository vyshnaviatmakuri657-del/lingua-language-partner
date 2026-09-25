import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { klaus } from "@/lib/ai/klaus";
import { awardUserXpAndRecordActivity } from "@/lib/gamification/engine";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json();
    const {
      conversationId,
      message,
      scenario = "Restaurant",
      difficulty = "beginner",
      dialogueHistory = [],
      nativeLanguageCode,
      targetLanguageCode,
    } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    // Generate Klaus turn
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
      // Save user message
      await prisma.conversationMessage.create({
        data: {
          conversationId,
          sender: "user",
          targetText: message.trim(),
        },
      });

      // Save Klaus reply with native explanation and corrections
      await prisma.conversationMessage.create({
        data: {
          conversationId,
          sender: "klaus",
          targetText: turn.replyTarget,
          transliteration: turn.transliteration,
          nativeTranslation: turn.nativeTranslation,
          nativeExplanation: turn.pedagogicalTip,
          correction: turn.correction?.hasMistake ? turn.correction.correctedSentence : null,
          correctionExplanation: turn.correction?.hasMistake ? turn.correction.explanationInNative : null,
        },
      });

      // Award XP for conversation (+15 XP)
      progressUpdate = await awardUserXpAndRecordActivity({
        userId: user.id,
        xpType: "CONVERSATION_TURN",
        minutes: 2,
      });
    }

    return NextResponse.json({
      success: true,
      klausReply: {
        id: "msg-" + Date.now(),
        sender: "klaus",
        targetText: turn.replyTarget,
        transliteration: turn.transliteration,
        nativeTranslation: turn.nativeTranslation,
        nativeExplanation: turn.pedagogicalTip,
        correction: turn.correction?.hasMistake
          ? {
              correctedSentence: turn.correction.correctedSentence,
              explanationInNative: turn.correction.explanationInNative,
            }
          : null,
      },
      progressUpdate,
    });
  } catch (error) {
    console.error("POST /api/conversation/message error:", error);
    return NextResponse.json(
      { error: "Failed to process roleplay turn." },
      { status: 500 }
    );
  }
}
