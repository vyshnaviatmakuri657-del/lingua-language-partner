import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: true,
        languagePair: {
          include: {
            nativeLanguage: true,
            targetLanguage: true,
          },
        },
        contents: { orderBy: { orderIndex: "asc" } },
        vocabularies: true,
        grammarTopics: true,
        exercises: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Parse JSON fields in exercises and grammar topics
    const parsedExercises = lesson.exercises.map((ex) => ({
      id: ex.id,
      orderIndex: ex.orderIndex,
      type: ex.type,
      instruction: ex.instruction,
      prompt: ex.prompt,
      promptTransliteration: ex.promptTransliteration,
      audioText: ex.audioText,
      correctAnswer: ex.correctAnswer,
      acceptableAnswers: typeof ex.acceptableAnswers === "string" ? JSON.parse(ex.acceptableAnswers) : ex.acceptableAnswers,
      options: typeof ex.options === "string" ? JSON.parse(ex.options) : ex.options,
      explanation: ex.explanation,
      hintLevel1: ex.hintLevel1,
      hintLevel2: ex.hintLevel2,
      hintLevel3: ex.hintLevel3,
    }));

    const parsedGrammar = lesson.grammarTopics.map((g) => ({
      id: g.id,
      title: g.title,
      explanation: g.explanation,
      ruleSummary: g.ruleSummary,
      examples: typeof g.examples === "string" ? JSON.parse(g.examples) : g.examples,
      commonMistakes: typeof g.commonMistakes === "string" ? JSON.parse(g.commonMistakes) : g.commonMistakes,
    }));

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        objective: lesson.objective,
        culturalTip: lesson.culturalTip,
        xpReward: lesson.xpReward,
        estimatedMinutes: lesson.estimatedMinutes,
        module: {
          id: lesson.module.id,
          title: lesson.module.title,
          category: lesson.module.category,
        },
        languagePair: {
          nativeCode: lesson.languagePair.nativeLanguageCode,
          targetCode: lesson.languagePair.targetLanguageCode,
          nativeName: lesson.languagePair.nativeLanguage.name,
          targetName: lesson.languagePair.targetLanguage.name,
        },
        contents: lesson.contents,
        vocabularies: lesson.vocabularies,
        grammarTopics: parsedGrammar,
        exercises: parsedExercises,
      },
    });
  } catch (error) {
    console.error("GET /api/lessons/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to load lesson." },
      { status: 500 }
    );
  }
}
