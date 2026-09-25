import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { klaus } from "@/lib/ai/klaus";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json();
    const {
      message,
      context = {},
      chatHistory = [],
    } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
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

    // Record interaction in database if user is logged in
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

    return NextResponse.json({
      success: true,
      reply,
      nativeLanguage,
      targetLanguage,
    });
  } catch (error) {
    console.error("POST /api/klaus/chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate tutor response." },
      { status: 500 }
    );
  }
}
