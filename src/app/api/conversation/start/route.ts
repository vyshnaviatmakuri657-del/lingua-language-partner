import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { klaus } from "@/lib/ai/klaus";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { scenario = "Restaurant", difficulty = "beginner", nativeLanguageCode, targetLanguageCode } = await req.json();

    const native = (nativeLanguageCode || user?.preferences?.nativeLanguageCode || "te") as NativeLanguageCode;
    const target = (targetLanguageCode || user?.preferences?.targetLanguageCode || "ko") as TargetLanguageCode;

    // Get language pair
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

    // Generate initial Klaus greeting for this roleplay
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
        include: { messages: true },
      });
      conversationId = convo.id;
    }

    return NextResponse.json({
      success: true,
      conversationId,
      scenario,
      difficulty,
      initialMessage: {
        id: "msg-init",
        sender: "klaus",
        targetText: initialTurn.replyTarget,
        transliteration: initialTurn.transliteration,
        nativeTranslation: initialTurn.nativeTranslation,
        nativeExplanation: initialTurn.pedagogicalTip,
      },
    });
  } catch (error) {
    console.error("POST /api/conversation/start error:", error);
    return NextResponse.json(
      { error: "Failed to start roleplay conversation." },
      { status: 500 }
    );
  }
}
