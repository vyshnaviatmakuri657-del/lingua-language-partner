import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { allLanguagePairsData } from "../src/lib/curriculum/pairsData.mjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Lingua Database with Multilingual Curriculum for ALL 18 Pairs...");

  // 1. Seed Supported Languages
  const languagesData = [
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", isNativeSupported: true, isTargetSupported: true, scriptCode: "Telu" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", isNativeSupported: true, isTargetSupported: true, scriptCode: "Deva" },
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", isNativeSupported: true, isTargetSupported: true, scriptCode: "Latn" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", isNativeSupported: false, isTargetSupported: true, scriptCode: "Taml" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", isNativeSupported: false, isTargetSupported: true, scriptCode: "Latn" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", isNativeSupported: false, isTargetSupported: true, scriptCode: "Hang" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", isNativeSupported: false, isTargetSupported: true, scriptCode: "Latn" },
  ];

  for (const lang of languagesData) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: lang,
      create: lang,
    });
  }
  console.log("✓ Languages seeded.");

  // 2. Seed Achievements
  const achievementsData = [
    { code: "first_step", titleKey: "First Step", descriptionKey: "Complete your first lesson or exercise.", icon: "🎯", xpReward: 50, category: "progression" },
    { code: "streak_3", titleKey: "Streak Starter", descriptionKey: "Maintain a 3-day learning streak.", icon: "🔥", xpReward: 75, category: "streak" },
    { code: "streak_7", titleKey: "Weekly Champion", descriptionKey: "Maintain a 7-day learning streak.", icon: "⚡", xpReward: 150, category: "streak" },
    { code: "xp_100", titleKey: "Centurion", descriptionKey: "Earn your first 100 XP points.", icon: "💎", xpReward: 50, category: "xp" },
    { code: "xp_500", titleKey: "Master Scholar", descriptionKey: "Accumulate 500 XP points across tracks.", icon: "👑", xpReward: 200, category: "xp" },
    { code: "level_5", titleKey: "Fluent Pioneer", descriptionKey: "Advance to Level 5.", icon: "🚀", xpReward: 250, category: "level" },
  ];

  for (const ach of achievementsData) {
    await prisma.achievement.upsert({
      where: { code: ach.code },
      update: ach,
      create: ach,
    });
  }
  console.log("✓ Achievements seeded.");

  // 3. Helper to create Language Pair with rich Curriculum
  async function seedPairCurriculum({
    nativeCode,
    targetCode,
    description,
    culturalNotes,
    modules,
    placementQuestions,
  }) {
    const pair = await prisma.languagePair.upsert({
      where: {
        nativeLanguageCode_targetLanguageCode: {
          nativeLanguageCode: nativeCode,
          targetLanguageCode: targetCode,
        },
      },
      update: { description, culturalNotes },
      create: {
        nativeLanguageCode: nativeCode,
        targetLanguageCode: targetCode,
        description,
        culturalNotes,
      },
    });

    // Check if modules already seeded for this pair
    const existingModules = await prisma.module.findMany({
      where: { languagePairId: pair.id },
    });

    if (existingModules.length > 0) {
      console.log(`✓ Curriculum already present for ${nativeCode} -> ${targetCode}`);
      return pair;
    }

    // Placement Test
    const placementTest = await prisma.placementTest.create({
      data: {
        languagePairId: pair.id,
        title: `Placement Diagnostic (${nativeCode.toUpperCase()} -> ${targetCode.toUpperCase()})`,
        description: `Assessment of target language proficiency instructed in your native tongue.`,
      },
    });

    for (let i = 0; i < placementQuestions.length; i++) {
      const q = placementQuestions[i];
      await prisma.placementQuestion.create({
        data: {
          placementTestId: placementTest.id,
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

    // Modules & Lessons
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      const mod = modules[mIdx];
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

        // Vocabularies
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

        // Grammar
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

    console.log(`✓ Seeded curriculum for ${nativeCode} -> ${targetCode}`);
    return pair;
  }

  // Seed ALL 18 Language Pairs
  console.log(`\n--- Seeding All ${allLanguagePairsData.length} Pedagogical Language Pairs ---`);
  for (const pairData of allLanguagePairsData) {
    await seedPairCurriculum(pairData);
  }

  // 4. Create Demo User with Seed Credentials
  const passwordHash = await bcrypt.hash("LinguaDemo2026!", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@lingua.app" },
    update: {},
    create: {
      email: "demo@lingua.app",
      password: passwordHash,
      name: "Sahasra",
      avatar: "https://avatar.vercel.sh/sahasra",
      profile: {
        create: {
          bio: "Language enthusiast mastering all 18 language pairs on Lingua.",
          motivation: "Travel & Exploration",
          dailyGoalMinutes: 15,
          experienceLevel: "beginner",
          timezone: "Asia/Kolkata",
          notifications: true,
          soundEnabled: true,
          transliterationEnabled: true,
        },
      },
      preferences: {
        create: {
          nativeLanguageCode: "te",
          targetLanguageCode: "ko",
          instructionLanguageCode: "te",
          learningLanguageCode: "ko",
        },
      },
      progress: {
        create: {
          totalXp: 120,
          currentLevel: 2,
          lessonsCompleted: 3,
          exercisesCompleted: 12,
          totalAccuracy: 92.5,
          totalPracticeMinutes: 45,
          conversationsCount: 2,
        },
      },
      streak: {
        create: {
          currentStreak: 4,
          longestStreak: 7,
          lastActiveDate: new Date().toISOString().split("T")[0],
        },
      },
    },
  });

  // Unlock First Step achievement for demo user
  const firstAch = await prisma.achievement.findUnique({ where: { code: "first_step" } });
  if (firstAch) {
    await prisma.userAchievement.upsert({
      where: {
        userId_achievementId: {
          userId: demoUser.id,
          achievementId: firstAch.id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        achievementId: firstAch.id,
      },
    });
  }

  console.log(`\n✓ Seeded demo user: demo@lingua.app (Password: LinguaDemo2026!)`);
  console.log("🎉 Seed finished successfully for all language pairs!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
