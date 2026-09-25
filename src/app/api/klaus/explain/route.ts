import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { klaus } from "@/lib/ai/klaus";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const { topic, mistake, context = {} } = await req.json();

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

    return NextResponse.json({
      success: true,
      explanation,
      nativeLanguage: native,
      targetLanguage: target,
    });
  } catch (error) {
    console.error("POST /api/klaus/explain error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation." },
      { status: 500 }
    );
  }
}
