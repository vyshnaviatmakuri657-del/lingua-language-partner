import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateLanguagePair } from "@/lib/i18n";

export async function POST(req: Request) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json().catch(() => ({}));

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
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Find the placement test for this language pair
    let pair = await prisma.languagePair.findUnique({
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

    // If pair doesn't exist, create it
    if (!pair) {
      pair = await prisma.languagePair.create({
        data: {
          nativeLanguageCode,
          targetLanguageCode,
          description: `Diagnostic track for ${targetLanguageCode} via ${nativeLanguageCode}`,
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
    }

    let test = pair.placementTests[0];

    // If no test found, create standard questions for this pair
    if (!test || test.questions.length === 0) {
      test = await prisma.placementTest.create({
        data: {
          languagePairId: pair.id,
          title: `Diagnostic Placement (${nativeLanguageCode.toUpperCase()} -> ${targetLanguageCode.toUpperCase()})`,
          description: `Assess proficiency in ${targetLanguageCode} using ${nativeLanguageCode} instruction.`,
          questions: {
            create: [
              {
                orderIndex: 1,
                difficulty: "beginner",
                instruction: nativeLanguageCode === "te" ? "సరైన ప్రాథమిక పలకరింపును ఎంచుకోండి." : nativeLanguageCode === "hi" ? "सही बुनियादी अभिवादन चुनें।" : "Select the basic greeting in the learning language.",
                question: nativeLanguageCode === "te" ? "లక్ష్య భాషలో 'నమస్కారం' లేదా 'హలో' ఏది?" : nativeLanguageCode === "hi" ? "सीखी जा रही भाषा में 'नमस्ते' क्या है?" : "Which option means 'Hello'?",
                options: JSON.stringify(["Option A (Greeting)", "Option B (Thank you)", "Option C (Goodbye)", "Option D (Please)"]),
                correctAnswer: "Option A (Greeting)",
                explanation: nativeLanguageCode === "te" ? "ఇది లక్ష్య భాషలో ప్రాథమిక శుభాకాంక్ష." : nativeLanguageCode === "hi" ? "यह इस भाषा में बुनियादी अभिवादन है।" : "Standard greeting in the target language.",
              },
            ],
          },
        },
        include: {
          questions: { orderBy: { orderIndex: "asc" } },
        },
      });
    }

    // Hide correctAnswer from initial test payload for integrity
    const safeQuestions = test.questions.map((q) => ({
      id: q.id,
      orderIndex: q.orderIndex,
      difficulty: q.difficulty,
      instruction: q.instruction,
      question: q.question,
      options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
    }));

    return NextResponse.json({
      testId: test.id,
      languagePairId: pair.id,
      nativeLanguageCode,
      targetLanguageCode,
      questions: safeQuestions,
    });
  } catch (error) {
    console.error("POST /api/placement/start error:", error);
    return NextResponse.json(
      { error: "Failed to initialize placement test." },
      { status: 500 }
    );
  }
}
