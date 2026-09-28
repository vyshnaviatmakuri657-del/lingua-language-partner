import { PrismaClient } from "@prisma/client";
import { PairCurriculumData } from "./types";
import { teluguNativePairs } from "./pairs/teluguPairs";
import { hindiNativePairs } from "./pairs/hindiPairs";
import { englishNativePairs } from "./pairs/englishPairs";

export * from "./types";

// Combined dataset of ALL 18 VALID LANGUAGE PAIRS!
export const allLanguagePairsData: PairCurriculumData[] = [
  ...teluguNativePairs,
  ...hindiNativePairs,
  ...englishNativePairs,
];

export function getPairData(nativeCode: string, targetCode: string): PairCurriculumData | undefined {
  return allLanguagePairsData.find(
    (p) => p.nativeCode === nativeCode && p.targetCode === targetCode
  );
}

/**
 * Ensures that full pedagogical curriculum exists in the database for the given language pair.
 * If not present, automatically provisions modules, lessons, vocabulary, grammar topics,
 * exercises with 3-tier Klaus hints, and placement tests.
 */
export async function ensurePairCurriculum(
  prisma: PrismaClient,
  nativeCode: string,
  targetCode: string
) {
  // Check if pair already exists with modules
  const existingPair = await prisma.languagePair.findUnique({
    where: {
      nativeLanguageCode_targetLanguageCode: {
        nativeLanguageCode: nativeCode,
        targetLanguageCode: targetCode,
      },
    },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              exercises: true,
              vocabularies: true,
              grammarTopics: true,
            },
          },
        },
      },
    },
  });

  if (existingPair && existingPair.modules.length > 0) {
    return existingPair;
  }

  const pairData = getPairData(nativeCode, targetCode);
  if (!pairData) {
    return null;
  }

  // Create or update LanguagePair
  const pair = await prisma.languagePair.upsert({
    where: {
      nativeLanguageCode_targetLanguageCode: {
        nativeLanguageCode: nativeCode,
        targetLanguageCode: targetCode,
      },
    },
    update: {
      description: pairData.description,
      culturalNotes: pairData.culturalNotes,
    },
    create: {
      nativeLanguageCode: nativeCode,
      targetLanguageCode: targetCode,
      description: pairData.description,
      culturalNotes: pairData.culturalNotes,
    },
  });

  // Ensure placement test
  const existingTest = await prisma.placementTest.findFirst({
    where: { languagePairId: pair.id },
  });

  if (!existingTest && pairData.placementQuestions.length > 0) {
    const test = await prisma.placementTest.create({
      data: {
        languagePairId: pair.id,
        title: `Placement Diagnostic (${nativeCode.toUpperCase()} -> ${targetCode.toUpperCase()})`,
        description: `Assessment of target language proficiency instructed in your native tongue.`,
      },
    });

    for (let i = 0; i < pairData.placementQuestions.length; i++) {
      const q = pairData.placementQuestions[i];
      await prisma.placementQuestion.create({
        data: {
          placementTestId: test.id,
          orderIndex: i + 1,
          difficulty: q.difficulty,
          instruction: q.instruction,
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        },
      });
    }
  }

  // Seed modules, lessons, vocabulary, grammar, and exercises
  for (let mIdx = 0; mIdx < pairData.modules.length; mIdx++) {
    const mod = pairData.modules[mIdx];
    const createdModule = await prisma.module.create({
      data: {
        languagePairId: pair.id,
        orderIndex: mIdx + 1,
        category: mod.category,
        title: mod.title,
        description: mod.description,
        icon: mod.icon,
      },
    });

    for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
      const lsn = mod.lessons[lIdx];
      const createdLesson = await prisma.lesson.create({
        data: {
          languagePairId: pair.id,
          moduleId: createdModule.id,
          orderIndex: lIdx + 1,
          title: lsn.title,
          objective: lsn.objective,
          culturalTip: lsn.culturalTip,
          xpReward: 30,
          estimatedMinutes: 10,
        },
      });

      // Vocabulary
      for (const voc of lsn.vocabulary) {
        await prisma.vocabulary.create({
          data: {
            languagePairId: pair.id,
            lessonId: createdLesson.id,
            targetWord: voc.targetWord,
            nativeMeaning: voc.nativeMeaning,
            pronunciation: voc.pronunciation,
            transliteration: voc.transliteration || null,
            partOfSpeech: voc.partOfSpeech,
            exampleTarget: voc.exampleTarget,
            exampleTransliteration: voc.exampleTransliteration || null,
            exampleNative: voc.exampleNative,
            notes: voc.notes || null,
          },
        });
      }

      // Grammar Topic
      if (lsn.grammar) {
        await prisma.grammarTopic.create({
          data: {
            languagePairId: pair.id,
            lessonId: createdLesson.id,
            title: lsn.grammar.title,
            explanation: lsn.grammar.explanation,
            ruleSummary: lsn.grammar.ruleSummary,
            examples: JSON.stringify(lsn.grammar.examples),
            commonMistakes: JSON.stringify(lsn.grammar.commonMistakes),
          },
        });
      }

      // Exercises
      for (let eIdx = 0; eIdx < lsn.exercises.length; eIdx++) {
        const ex = lsn.exercises[eIdx];
        await prisma.exercise.create({
          data: {
            lessonId: createdLesson.id,
            orderIndex: eIdx + 1,
            type: ex.type,
            instruction: ex.instruction,
            prompt: ex.prompt,
            promptTransliteration: ex.promptTransliteration || null,
            correctAnswer: ex.correctAnswer,
            acceptableAnswers: JSON.stringify(ex.acceptableAnswers || [ex.correctAnswer]),
            options: JSON.stringify(ex.options || []),
            explanation: ex.explanation,
            hintLevel1: ex.hintLevel1,
            hintLevel2: ex.hintLevel2,
            hintLevel3: ex.hintLevel3,
          },
        });
      }
    }
  }

  // Refetch and return the newly provisioned pair
  return prisma.languagePair.findUnique({
    where: { id: pair.id },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              exercises: true,
              vocabularies: true,
              grammarTopics: true,
            },
          },
        },
      },
    },
  });
}
