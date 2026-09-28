import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function inspect() {
  const pairs = await prisma.languagePair.count();
  const modules = await prisma.module.count();
  const lessons = await prisma.lesson.count();
  const vocab = await prisma.vocabulary.count();
  const grammar = await prisma.grammarTopic.count();
  const exercises = await prisma.exercise.count();
  const placementTests = await prisma.placementTest.count();
  const placementQuestions = await prisma.placementQuestion.count();

  console.log("=== Lingua Database Stats ===");
  console.log(`Language Pairs:       ${pairs} (Target: 18)`);
  console.log(`Curriculum Modules:   ${modules} (Target: 90)`);
  console.log(`Total Lessons:        ${lessons} (Target: 270)`);
  console.log(`Total Vocabulary:     ${vocab}`);
  console.log(`Grammar Topics:       ${grammar}`);
  console.log(`Practice Exercises:   ${exercises}`);
  console.log(`Placement Tests:      ${placementTests} (Target: 18)`);
  console.log(`Placement Questions:  ${placementQuestions} (Target: 90)`);
}

inspect()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

