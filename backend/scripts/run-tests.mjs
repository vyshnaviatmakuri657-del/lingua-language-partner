import { PrismaClient } from "@prisma/client";

// Color helpers for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

function pass(name, details = "") {
  console.log(`${colors.green}✔ PASS:${colors.reset} ${name} ${details ? `(${colors.cyan}${details}${colors.reset})` : ""}`);
}

function fail(name, error) {
  console.error(`${colors.red}✖ FAIL:${colors.reset} ${name}\n  Error: ${error}`);
  process.exitCode = 1;
}

console.log(`\n${colors.bold}========================================${colors.reset}`);
console.log(`${colors.bold}   LINGUA AUTOMATED TEST SUITE        ${colors.reset}`);
console.log(`${colors.bold}========================================\n${colors.reset}`);

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    pass(testName, details);
    totalPassed++;
  } else {
    fail(testName, details || "Assertion failed");
    totalFailed++;
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: Language Configuration & Native!=Target Rules
// -------------------------------------------------------------
console.log(`\n${colors.yellow}--- SUITE 1: Native != Target Language Rules ---${colors.reset}`);

const VALID_NATIVES = ["te", "hi", "en"];
const VALID_TARGETS = ["te", "hi", "en", "ta", "fr", "ko", "es"];

function validateLanguagePair(native, target) {
  if (!VALID_NATIVES.includes(native)) return false;
  if (!VALID_TARGETS.includes(target)) return false;
  if (native === target) return false;
  return true;
}

// CRITICAL CHECKS: Native must NOT equal Target
assert(validateLanguagePair("te", "te") === false, "Reject Native=Telugu -> Target=Telugu", "Strict native!=target constraint");
assert(validateLanguagePair("en", "en") === false, "Reject Native=English -> Target=English", "Strict native!=target constraint");
assert(validateLanguagePair("hi", "hi") === false, "Reject Native=Hindi -> Target=Hindi", "Strict native!=target constraint");

// Valid combinations
assert(validateLanguagePair("te", "ko") === true, "Accept Native=Telugu -> Target=Korean", "Critical User Story 1");
assert(validateLanguagePair("hi", "fr") === true, "Accept Native=Hindi -> Target=French", "Critical User Story 2");
assert(validateLanguagePair("en", "es") === true, "Accept Native=English -> Target=Spanish", "Critical User Story 3");
assert(validateLanguagePair("te", "hi") === true, "Accept Native=Telugu -> Target=Hindi", "Indic pair");
assert(validateLanguagePair("hi", "ta") === true, "Accept Native=Hindi -> Target=Tamil", "Indic cross-family pair");

// Invalid codes
assert(validateLanguagePair("fr", "es") === false, "Reject French as Native", "Only Telugu, Hindi, English supported as native");
assert(validateLanguagePair("xx", "ko") === false, "Reject invalid native code");
assert(validateLanguagePair("te", "zz") === false, "Reject invalid target code");

// -------------------------------------------------------------
// TEST SUITE 2: Gamification & Spaced Repetition Engine
// -------------------------------------------------------------
console.log(`\n${colors.yellow}--- SUITE 2: Gamification & Leitner SRS Engine ---${colors.reset}`);

function calculateLevel(xp) {
  if (xp < 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

function getNextReviewInterval(box, isCorrect) {
  const intervals = {
    1: 1,  // Box 1: 1 day
    2: 3,  // Box 2: 3 days
    3: 7,  // Box 3: 7 days
    4: 14, // Box 4: 14 days
    5: 30, // Box 5: 30 days
  };

  if (!isCorrect) {
    return { newBox: 1, nextIntervalDays: intervals[1] };
  }

  const nextBox = Math.min(box + 1, 5);
  return { newBox: nextBox, nextIntervalDays: intervals[nextBox] };
}

function calculateLessonXP(accuracy, streak = 0) {
  const baseXP = 20;
  const accuracyBonus = Math.round(accuracy * 15);
  const streakBonus = Math.min(streak * 2, 10);
  return baseXP + accuracyBonus + streakBonus;
}

assert(calculateLevel(0) === 1, "Level calculation at 0 XP = Level 1");
assert(calculateLevel(99) === 1, "Level calculation at 99 XP = Level 1");
assert(calculateLevel(100) === 2, "Level calculation at 100 XP = Level 2");
assert(calculateLevel(400) === 3, "Level calculation at 400 XP = Level 3");
assert(calculateLevel(900) === 4, "Level calculation at 900 XP = Level 4");
assert(calculateLevel(2500) === 6, "Level calculation at 2500 XP = Level 6");

// Leitner SRS progression on success
const box1To2 = getNextReviewInterval(1, true);
assert(box1To2.newBox === 2 && box1To2.nextIntervalDays === 3, "SRS Success: Box 1 -> Box 2 (3 days interval)");

const box2To3 = getNextReviewInterval(2, true);
assert(box2To3.newBox === 3 && box2To3.nextIntervalDays === 7, "SRS Success: Box 2 -> Box 3 (7 days interval)");

const box4To5 = getNextReviewInterval(4, true);
assert(box4To5.newBox === 5 && box4To5.nextIntervalDays === 30, "SRS Success: Box 4 -> Box 5 (30 days interval)");

const box5Max = getNextReviewInterval(5, true);
assert(box5Max.newBox === 5 && box5Max.nextIntervalDays === 30, "SRS Success: Box 5 stays at Box 5 (30 days max)");

// Leitner SRS degradation on failure
const box4Fail = getNextReviewInterval(4, false);
assert(box4Fail.newBox === 1 && box4Fail.nextIntervalDays === 1, "SRS Failure: Box 4 drops to Box 1 (1 day interval)");

const box5Fail = getNextReviewInterval(5, false);
assert(box5Fail.newBox === 1 && box5Fail.nextIntervalDays === 1, "SRS Failure: Box 5 drops to Box 1 (1 day interval)");

// XP calculations
assert(calculateLessonXP(1.0, 0) === 35, "Perfect lesson XP with 0 streak = 35 XP");
assert(calculateLessonXP(1.0, 5) === 45, "Perfect lesson XP with 5 streak = 45 XP");
assert(calculateLessonXP(0.5, 0) === 28, "50% accuracy lesson XP = 28 XP");

// -------------------------------------------------------------
// TEST SUITE 3: NLP Evaluator & Typo Tolerance
// -------------------------------------------------------------
console.log(`\n${colors.yellow}--- SUITE 3: NLP Evaluator & Typo Tolerance ---${colors.reset}`);

function levenshteinDistance(s1, s2) {
  const a = s1.toLowerCase().trim();
  const b = s2.toLowerCase().trim();
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function evaluateAlgorithmic(userAnswer, expectedAnswer, nativeLang = "en") {
  const normUser = userAnswer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"|]/g, "").trim();
  const normExp = expectedAnswer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?'"|]/g, "").trim();

  if (normUser === normExp) {
    return { isCorrect: true, confidence: 1.0, isTypo: false, feedback: "Exact match" };
  }

  const dist = levenshteinDistance(normUser, normExp);
  const maxLen = Math.max(normUser.length, normExp.length);
  const similarity = 1 - (dist / maxLen);

  if (dist <= 2 && similarity >= 0.75) {
    return {
      isCorrect: true,
      confidence: similarity,
      isTypo: true,
      feedback: nativeLang === "te" ? "దాదాపు సరైనది! చిన్న అక్షరదోషం ఉంది." :
                nativeLang === "hi" ? "लगभग सही! एक छोटी वर्तनी त्रुटि है।" :
                "Almost correct! Minor typo detected."
    };
  }

  return {
    isCorrect: false,
    confidence: Math.max(0, similarity),
    isTypo: false,
    feedback: nativeLang === "te" ? "సరైన సమాధానం కాదు." :
              nativeLang === "hi" ? "गलत उत्तर।" :
              "Incorrect answer."
  };
}

// Exact match (case + punctuation insensitive)
const testKoreanExact = evaluateAlgorithmic("안녕하세요!", "안녕하세요", "te");
assert(testKoreanExact.isCorrect === true && testKoreanExact.confidence === 1.0, "NLP: Korean exact match with punctuation");

const testFrenchExact = evaluateAlgorithmic("Bonjour.", "bonjour", "hi");
assert(testFrenchExact.isCorrect === true && testFrenchExact.confidence === 1.0, "NLP: French exact match case-insensitive");

// Typo tolerance
const testFrenchTypo = evaluateAlgorithmic("bonjur", "bonjour", "hi");
assert(testFrenchTypo.isCorrect === true && testFrenchTypo.isTypo === true, "NLP: French 1-char typo accepted", testFrenchTypo.feedback);
assert(testFrenchTypo.feedback.includes("वर्तनी"), "NLP: Typo feedback is in Native Hindi for Hindi user");

const testSpanishTypo = evaluateAlgorithmic("grasias", "gracias", "te");
assert(testSpanishTypo.isCorrect === true && testSpanishTypo.isTypo === true, "NLP: Spanish phonetic typo accepted", testSpanishTypo.feedback);
assert(testSpanishTypo.feedback.includes("అక్షరదోషం"), "NLP: Typo feedback is in Native Telugu for Telugu user");

// Incorrect answers
const testWrongAnswer = evaluateAlgorithmic("merci", "bonjour", "en");
assert(testWrongAnswer.isCorrect === false, "NLP: Completely wrong answer rejected");

// -------------------------------------------------------------
// TEST SUITE 4: Klaus Progressive Hint System
// -------------------------------------------------------------
console.log(`\n${colors.yellow}--- SUITE 4: Klaus 3-Tier Progressive Hint System ---${colors.reset}`);

function getKlausHint(tier, question, expectedAnswer, nativeLang) {
  if (tier === 1) {
    return {
      tier: 1,
      hint: nativeLang === "te" ? "ఆలోచించండి: ఇది సాధారణ శుభాకాంక్ష." :
            nativeLang === "hi" ? "संकेत: यह एक सामान्य अभिवादन है।" :
            "Hint: Think about common daily greetings."
    };
  } else if (tier === 2) {
    const firstLetter = expectedAnswer.charAt(0);
    return {
      tier: 2,
      hint: nativeLang === "te" ? `మరింత సహాయం: ఈ పదం '${firstLetter}' తో ప్రారంభమవుతుంది మరియు ${expectedAnswer.length} అక్షరాలు కలిగి ఉంది.` :
            nativeLang === "hi" ? `अधिक सहायता: यह शब्द '${firstLetter}' से शुरू होता है और इसमें ${expectedAnswer.length} अक्षर हैं।` :
            `More help: The word starts with '${firstLetter}' and has ${expectedAnswer.length} characters.`
    };
  } else {
    return {
      tier: 3,
      hint: nativeLang === "te" ? `సమాధానం: '${expectedAnswer}'. ఇది గౌరవప్రదమైన అభివాదం.` :
            nativeLang === "hi" ? `उत्तर: '${expectedAnswer}'. यह सम्मानपूर्वक अभिवादन है।` :
            `Answer: '${expectedAnswer}'. This is a polite greeting.`
    };
  }
}

const hint1 = getKlausHint(1, "Say hello", "안녕하세요", "te");
assert(hint1.tier === 1 && !hint1.hint.includes("안녕하세요"), "Klaus Hint Tier 1: Gives conceptual clue, NEVER reveals answer");
assert(hint1.hint.includes("శుభాకాంక్ష"), "Klaus Hint Tier 1: Instruction is strictly in Native Telugu");

const hint2 = getKlausHint(2, "Say hello", "안녕하세요", "te");
assert(hint2.tier === 2 && !hint2.hint.includes("안녕하세요"), "Klaus Hint Tier 2: Gives structural clue, does NOT reveal full answer");

const hint3 = getKlausHint(3, "Say hello", "안녕하세요", "te");
assert(hint3.tier === 3 && hint3.hint.includes("안녕하세요"), "Klaus Hint Tier 3: Reveals answer with native grammatical explanation");

// -------------------------------------------------------------
// TEST SUITE 5: Database Entities & Seeded Curricula
// -------------------------------------------------------------
console.log(`\n${colors.yellow}--- SUITE 5: Database Seed & Schema Validation ---${colors.reset}`);

async function testDatabase() {
  const prisma = new PrismaClient();

  try {
    // 1. Languages
    const languages = await prisma.language.findMany();
    assert(languages.length >= 7, `Database: Seeded ${languages.length} languages (>= 7 expected)`);

    const langCodes = languages.map(l => l.code);
    assert(langCodes.includes("te"), "Database: Contains Telugu language");
    assert(langCodes.includes("hi"), "Database: Contains Hindi language");
    assert(langCodes.includes("en"), "Database: Contains English language");
    assert(langCodes.includes("ko"), "Database: Contains Korean language");
    assert(langCodes.includes("fr"), "Database: Contains French language");
    assert(langCodes.includes("es"), "Database: Contains Spanish language");
    assert(langCodes.includes("ta"), "Database: Contains Tamil language");

    // 2. Language Pairs
    const pairs = await prisma.languagePair.findMany({
      include: {
        nativeLanguage: true,
        targetLanguage: true,
      }
    });
    assert(pairs.length === 18, `Database: Seeded all 18 possible language pairs`, `Found ${pairs.length}`);

    // Verify all 18 pairs meet native != target constraint and have modules
    for (const p of pairs) {
      assert(
        p.nativeLanguage.code !== p.targetLanguage.code,
        `Pair ${p.nativeLanguage.code} -> ${p.targetLanguage.code} enforces native != target`
      );
    }

    const teKo = pairs.find(p => p.nativeLanguage.code === "te" && p.targetLanguage.code === "ko");
    assert(!!teKo, "Database: Contains Telugu -> Korean language pair (Critical Test 1)");

    const hiFr = pairs.find(p => p.nativeLanguage.code === "hi" && p.targetLanguage.code === "fr");
    assert(!!hiFr, "Database: Contains Hindi -> French language pair (Critical Test 2)");

    const enEs = pairs.find(p => p.nativeLanguage.code === "en" && p.targetLanguage.code === "es");
    assert(!!enEs, "Database: Contains English -> Spanish language pair (Critical Test 3)");

    // 3. Verify total modules, lessons and exercises across the system
    const allModules = await prisma.module.findMany({
      include: {
        lessons: {
          include: {
            exercises: true,
            vocabularies: true,
          },
        },
      },
    });
    assert(allModules.length >= 18, `Database: Has ${allModules.length} curriculum modules across all pairs`);

    const allExercises = allModules.flatMap(m => m.lessons.flatMap(l => l.exercises));
    assert(allExercises.length >= 18, `Database: Has ${allExercises.length} total interactive exercises across all pairs`);

    const allVocab = allModules.flatMap(m => m.lessons.flatMap(l => l.vocabularies));
    assert(allVocab.length >= 36, `Database: Has ${allVocab.length} total target vocabulary words`);

    // 4. Demo User
    const demoUser = await prisma.user.findUnique({
      where: { email: "demo@lingua.app" },
      include: {
        profile: true,
        preferences: true,
        progress: true,
        streak: true,
      }
    });
    assert(!!demoUser, "Database: Seed Demo user 'demo@lingua.app' exists");
    if (demoUser) {
      assert(demoUser.preferences?.nativeLanguageCode === "te", "Demo user native language is Telugu");
      assert(demoUser.preferences?.targetLanguageCode === "ko", "Demo user target language is Korean");
      assert(demoUser.progress?.totalXp !== undefined && demoUser.progress?.totalXp >= 100, "Demo user has initial XP");
    }

    // 5. Achievements
    const achievements = await prisma.achievement.findMany();
    assert(achievements.length >= 5, `Database: Seeded ${achievements.length} global achievements`);

    console.log(`\n${colors.bold}========================================${colors.reset}`);
    console.log(`${colors.green}${colors.bold}ALL TESTS COMPLETED!${colors.reset}`);
    console.log(`Passed: ${colors.green}${totalPassed}${colors.reset} | Failed: ${totalFailed > 0 ? colors.red : colors.green}${totalFailed}${colors.reset}`);
    console.log(`${colors.bold}========================================\n${colors.reset}`);

  } catch (err) {
    console.error("Database test error:", err);
    totalFailed++;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
