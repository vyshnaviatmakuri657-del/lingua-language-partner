import { PrismaClient } from "@prisma/client";
import { generate5ExercisesForLesson } from "../src/lib/curriculum/exerciseGenerator";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting CEFR & 5-Exercise Upgrade for all lessons in Lingua Database...");

  const lessons = await prisma.lesson.findMany({
    include: {
      vocabularies: {
        orderBy: { id: "asc" },
      },
      module: true,
      languagePair: true,
      exercises: true,
    },
  });

  console.log(`Found ${lessons.length} lessons across all language pairs.`);

  let updatedCount = 0;
  let exercisesCreated = 0;

  for (const lesson of lessons) {
    if (!lesson.vocabularies || lesson.vocabularies.length === 0) {
      continue;
    }

    const generatedExercises = generate5ExercisesForLesson({
      vocabularies: lesson.vocabularies,
      nativeCode: lesson.languagePair.nativeLanguageCode,
      targetCode: lesson.languagePair.targetLanguageCode,
      lessonTitle: lesson.title,
    });

    if (generatedExercises.length < 5) {
      continue;
    }

    // Delete existing exercises for this lesson to ensure clean 1-5 order without stale duplicates
    await prisma.exercise.deleteMany({
      where: { lessonId: lesson.id },
    });

    for (const ex of generatedExercises) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson.id,
          orderIndex: ex.orderIndex,
          type: ex.type,
          instruction: ex.instruction,
          prompt: ex.prompt,
          promptTransliteration: ex.promptTransliteration,
          audioText: ex.audioText,
          correctAnswer: ex.correctAnswer,
          acceptableAnswers: JSON.stringify(ex.acceptableAnswers),
          options: JSON.stringify(ex.options),
          explanation: ex.explanation,
          hintLevel1: ex.hintLevel1,
          hintLevel2: ex.hintLevel2,
          hintLevel3: ex.hintLevel3,
        },
      });
      exercisesCreated++;
    }

    updatedCount++;
    if (updatedCount % 50 === 0) {
      console.log(`  ✓ Updated ${updatedCount}/${lessons.length} lessons (${exercisesCreated} exercises created)...`);
    }
  }

  console.log(`\n🎉 Success! Successfully upgraded ${updatedCount} lessons with ${exercisesCreated} rich CEFR interactive exercises!`);
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
