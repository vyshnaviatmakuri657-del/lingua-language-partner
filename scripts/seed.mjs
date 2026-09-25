import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Lingua Database with Multilingual Curriculum...");

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

  // ==========================================
  // PAIR 1: TELUGU (te) -> KOREAN (ko)
  // Korean taught through Telugu!
  // ==========================================
  await seedPairCurriculum({
    nativeCode: "te",
    targetCode: "ko",
    description: "తెలుగు మాట్లాడేవారికి సులభంగా కొరియన్ భాష నేర్పే ప్రత్యేకం అభ్యసన కోర్సు.",
    culturalNotes: "కొరియన్ మరియు తెలుగు భాషలలో వాక్య నిర్మాణం (SOV - కర్త, కర్మ, క్రియ) ఒకేలా ఉంటుంది. ఇది తెలుగువారికి కొరియన్ నేర్చుకోవడం చాలా సులభం చేస్తుంది!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన కొరియన్ శుభాకాంక్షను ఎంచుకోండి.",
        question: "తెలుగులో 'నమస్కారం' లేదా 'హలో' ను కొరియన్‌లో ఎలా అంటారు?",
        options: ["안녕하세요 (Annyeonghaseyo)", "감사합니다 (Gamsahamnida)", "죄송합니다 (Joesonghamnida)", "안녕히 계세요 (Annyeonghi gyeseyo)"],
        correctAnswer: "안녕하세요 (Annyeonghaseyo)",
        explanation: "'안녕하세요' అనేది కొరియన్ భాషలో ప్రామాణికమైన మరియు గౌరవప్రదమైన నమస్కారం.",
      },
      {
        difficulty: "beginner",
        instruction: "ధన్యవాదాలు తెలిపే పదాన్ని గుర్తించండి.",
        question: "కొరియన్‌లో 'ధన్యవాదాలు' అని ఎలా చెబుతారు?",
        options: ["감사합니다 (Gamsahamnida)", "네 (Ne)", "아니요 (Aniyo)", "괜찮아요 (Gwaenchannayo)"],
        correctAnswer: "감사합니다 (Gamsahamnida)",
        explanation: "'감사합니다' అంటే తెలుగులో ధన్యవాదాలు అని అర్థం.",
      },
      {
        difficulty: "intermediate",
        instruction: "సరైన వాక్యాన్ని ఎంచుకోండి.",
        question: "'నేను నీరు తాగుతాను' అనే భావానికి సరైన కొరియన్ వాక్యం ఏది?",
        options: ["저는 물을 마셔요 (Jeoneun muleul masyeoyo)", "저는 밥을 먹어요 (Jeoneun babeul meogeoyo)", "저는 학교에 가요 (Jeoneun hakgyoe gayo)", "저는 책을 읽어요 (Jeoneun chaegeul阅读)"],
        correctAnswer: "저는 물을 마셔요 (Jeoneun muleul masyeoyo)",
        explanation: "저(నేను) + 물(నీరు) + 을(ద్వితీయా విభక్తి) + 마셔요(తాగుతాను). తెలుగులాగే SOV క్రమం ఉంటుంది.",
      },
      {
        difficulty: "intermediate",
        instruction: "సరైన ప్రశ్నార్థక పదాన్ని గుర్తించండి.",
        question: "'ఇది ఎక్కడ ఉంది?' అని అడగడానికి ఏది సరైనది?",
        options: ["어디에 있어요? (Eodie isseoyo?)", "얼마예요? (Eolmayeyo?)", "누구예요? (Nuguyeyo?)", "언제예요? (Eonjeyeyo?)"],
        correctAnswer: "어디에 있어요? (Eodie isseoyo?)",
        explanation: "어디(ఎక్కడ) + 에 있어요(ఉంది).",
      },
      {
        difficulty: "advanced",
        instruction: "గౌరవప్రదమైన వీడ్కోలు పదాన్ని ఎంచుకోండి.",
        question: "మనం ఒకరి ఇంటి నుండి బయలుదేరేటప్పుడు అక్కడ ఉండే వ్యక్తితో చెప్పే వీడ్కోలు ఏది?",
        options: ["안녕히 계세요 (Annyeonghi gyeseyo)", "안녕히 가세요 (Annyeonghi gaseyo)", "어서 오세요 (Eoseo oseyo)", "실례합니다 (Sillyehamnida)"],
        correctAnswer: "안녕히 계세요 (Annyeonghi gyeseyo)",
        explanation: "అక్కడ ఉన్నవారికి 'శాంతిగా ఉండండి' అని చెప్పే గౌరవార్థక వీడ్కోలు '안녕히 계세요'.",
      },
    ],
    modules: [
      {
        category: "Social",
        title: "మొదటి అడుగులు: పరిచయాలు & మర్యాదలు",
        description: "కొరియన్ వర్ణమాల ప్రాథమికాలు, శుభాకాంక్షలు మరియు రోజువారీ మర్యాదపూర్వక సంభాషణలు.",
        icon: "👋",
        lessons: [
          {
            title: "పాఠం 1: శుభాకాంక్షలు మరియు కృతజ్ఞతలు",
            objective: "ఎదుటివారిని మర్యాదగా పలకరించడం మరియు ధన్యవాదాలు చెప్పడం నేర్చుకోండి.",
            culturalTip: "కొరియాలో ఎదుటివారిని పలకరించేటప్పుడు కొద్దిగా వంగి నమస్కరించడం గౌరవ సూచకం.",
            vocabulary: [
              {
                targetWord: "안녕하세요",
                nativeMeaning: "నమస్కారం / బాగున్నారా",
                pronunciation: "అన్యోంగ్‌హసేయో (Annyeonghaseyo)",
                transliteration: "annyeonghaseyo",
                partOfSpeech: "శుభాకాంక్ష",
                exampleTarget: "안녕하세요! 만나서 반갑습니다.",
                exampleTransliteration: "Annyeonghaseyo! Mannaseo bangabseumnida.",
                exampleNative: "నమస్కారం! మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది.",
                notes: "మర్యాదపూర్వక దైనందిన శుభాకాంక్ష.",
              },
              {
                targetWord: "감사합니다",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "కమ్‌సాహమ్‌నిదా (Gamsahamnida)",
                transliteration: "gamsahamnida",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "도와주셔서 감사합니다.",
                exampleTransliteration: "Dowajusyeoseo gamsahamnida.",
                exampleNative: "సహాయం చేసినందుకు చాలా ధన్యవాదాలు.",
                notes: "అధికారిక మరియు గౌరవప్రదమైన కృతజ్ఞతా పదం.",
              },
              {
                targetWord: "죄송합니다",
                nativeMeaning: "నన్ను క్షమించండి",
                pronunciation: "జ్వేసోంగ్‌హమ్‌నిదా (Joesonghamnida)",
                transliteration: "joesonghamnida",
                partOfSpeech: "క్షమాపణ",
                exampleTarget: "늦어서 죄송합니다.",
                exampleTransliteration: "Neujeoseo joesonghamnida.",
                exampleNative: "ఆలస్యమైనందుకు నన్ను క్షమించండి.",
                notes: "మర్యాదపూర్వక క్షమాపణ.",
              },
              {
                targetWord: "네",
                nativeMeaning: "అవును",
                pronunciation: "నే (Ne)",
                transliteration: "ne",
                partOfSpeech: "సమ్మతి",
                exampleTarget: "네, 맞아요.",
                exampleTransliteration: "Ne, maj-ayo.",
                exampleNative: "అవును, అది సరైనదే.",
                notes: "మర్యాదపూర్వక అవును.",
              },
            ],
            grammar: {
              title: "గౌరవార్థక క్రియల ముగింపు (-이에요 / -예요)",
              explanation: "తెలుగులో 'నేను విద్యార్థిని' అన్నట్లే, కొరియన్‌లో నామవాచకం చివర హల్లు ఉంటే '-이에요' (ieyo), అచ్చు ఉంటే '-예요' (yeyo) కలుపుతారు.",
              ruleSummary: "హల్లు ముగింపు + 이에요 / అచ్చు ముగింపు + 예요",
              examples: [
                { target: "학생이에요", transliteration: "Haksaeng-ieyo", native: "నేను విద్యార్థిని", explanation: "학생 హల్లుతో ముగిసింది కాబట్టి 이에요 వచ్చింది." },
                { target: "의사예요", transliteration: "Uisa-yeyo", native: "నేను వైద్యుడిని", explanation: "의사 అచ్చుతో ముగిసింది కాబట్టి 예요 వచ్చింది." },
              ],
              commonMistakes: [
                { mistake: "저 학생이에요 (అచ్చు/హల్లు మార్పిడి)", correction: "저 학생이에요", explanation: "హల్లుతో ముగిసే పదాలకు 예요 రాయకూడదు." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన కొరియన్ వాక్యాన్ని ఎంచుకోండి.",
                prompt: "తెలుగులో 'నమస్కారం' ను కొరియన్‌లో ఏమంటారు?",
                options: ["안녕하세요", "감사합니다", "죄송합니다", "잘 가요"],
                correctAnswer: "안녕하세요",
                explanation: "'안녕하세요' అనేది కొరియన్ భాషలో ప్రామాణికమైన నమస్కారం.",
                hintLevel1: "ఈ పదం 'అన్...' తో మొదలవుతుంది.",
                hintLevel2: "చివరలో '...సేయో' ఉంటుంది.",
                hintLevel3: "సరైన పదం: 안녕하세요.",
              },
              {
                type: "translation",
                instruction: "ఈ వాక్యాన్ని కొరియన్‌లోకి అనువదించండి.",
                prompt: "ధన్యవాదాలు",
                correctAnswer: "감사합니다",
                acceptableAnswers: ["감사합니다", "고맙습니다"],
                explanation: "తెలుగులో ధన్యవాదాలు ను కొరియన్‌లో '감사합니다' (Gamsahamnida) అంటారు.",
                hintLevel1: "ఈ పదం 'కమ్...' తో మొదలవుతుంది.",
                hintLevel2: "చివరలో '...హమ్‌నిదా' ఉంటుంది.",
                hintLevel3: "సరైన కొరియన్ రూపం: 감사합니다.",
              },
              {
                type: "word_order",
                instruction: "పదాలను సరైన క్రమంలో అమర్చండి.",
                prompt: "నమస్కారం! కలవడం చాలా సంతోషం.",
                options: ["반갑습니다", "안녕하세요", "만나서"],
                correctAnswer: "안녕하세요 만나서 반갑습니다",
                acceptableAnswers: ["안녕하세요 만나서 반갑습니다"],
                explanation: "మొదట పలకరింపు (안녕하세요), తర్వాత కారణం (만나서), చివరన సంతోషం (반갑습니다) వస్తాయి.",
                hintLevel1: "మొదట నమస్కారం పదం ఉండాలి.",
                hintLevel2: "తర్వాత 'కలవడం' (만나서) పదం వస్తుంది.",
                hintLevel3: "పూర్తి వాక్యం: 안녕하세요 만나서 반갑습니다.",
              },
            ],
          },
        ],
      },
      {
        category: "Travel",
        title: "ప్రయాణం: విమానాశ్రయం & రవాణా",
        description: "విమానాశ్రయం, టికెట్లు కొనడం మరియు దారులు అడగడం.",
        icon: "✈️",
        lessons: [
          {
            title: "పాఠం 2: విమానాశ్రయానికి వెళ్ళడం",
            objective: "విమానాశ్రయం లేదా రైల్వే స్టేషన్‌కు ఎలా వెళ్ళాలో అడగడం నేర్చుకోండి.",
            culturalTip: "కొరియాలో మెట్రో మరియు బస్సులలో టికెట్ లేదా ట్రాన్స్‌పోర్ట్ కార్డ్ (T-money) ఉపయోగిస్తారు.",
            vocabulary: [
              {
                targetWord: "공항",
                nativeMeaning: "విమానాశ్రయం",
                pronunciation: "గోంగ్‌హాంగ్ (Gonghang)",
                transliteration: "gonghang",
                partOfSpeech: "నామవాచకం",
                exampleTarget: "공항에 가요.",
                exampleTransliteration: "Gonghang-e gayo.",
                exampleNative: "నేను విమానాశ్రయానికి వెళ్తున్నాను.",
                notes: "విమానాశ్రయ పదం.",
              },
              {
                targetWord: "어디",
                nativeMeaning: "ఎక్కడ",
                pronunciation: "ఓడి (Eodi)",
                transliteration: "eodi",
                partOfSpeech: "ప్రశ్నార్థకం",
                exampleTarget: "화장실이 어디예요?",
                exampleTransliteration: "Hwajangsil-i eodiyeyo?",
                exampleNative: "వాష్‌రూమ్ ఎక్కడ ఉంది?",
                notes: "స్థలాన్ని అడిగే పదం.",
              },
            ],
            grammar: {
              title: "దిశా నిర్దేశక విభక్తి (-에 가요)",
              explanation: "తెలుగులో 'కి/కు వెళ్తున్నాను' అని చెప్పినట్లే, కొరియన్‌లో స్థలం పేరు పక్కన '에 가요' (e gayo) చేరుస్తారు.",
              ruleSummary: "స్థలము + 에 가요 (కి వెళ్తున్నాను)",
              examples: [
                { target: "공항에 가요", transliteration: "Gonghang-e gayo", native: "విమానాశ్రయానికి వెళ్తున్నాను", explanation: "공항 (విమానాశ్రయం) + 에 (కి) + 가요 (వెళ్తున్నాను)" },
              ],
              commonMistakes: [
                { mistake: "공항 가요 (విభక్తి లోపించడం)", correction: "공항에 가요", explanation: "ఎక్కడికి వెళ్తున్నారో చెప్పేటప్పుడు '에' విభక్తి తప్పనిసరి." },
              ],
            },
            exercises: [
              {
                type: "translation",
                instruction: "ఈ తెలుగు వాక్యాన్ని కొరియన్‌లోకి మార్చండి.",
                prompt: "నేను రేపు విమానాశ్రయానికి వెళ్తున్నాను.",
                correctAnswer: "내일 공항에 가요",
                acceptableAnswers: ["내일 공항에 가요", "내일 공항에 가요."],
                explanation: "내일(రేపు) + 공항에(విమానాశ్రయానికి) + 가요(వెళ్తున్నాను).",
                hintLevel1: "వాక్యం '내일' (రేపు) తో మొదలవుతుంది.",
                hintLevel2: "విమానాశ్రయం పదం '공항에'.",
                hintLevel3: "పూర్తి సమాధానం: 내일 공항에 가요.",
              },
            ],
          },
        ],
      },
    ],
  });

  // ==========================================
  // PAIR 2: HINDI (hi) -> FRENCH (fr)
  // French taught through Hindi!
  // ==========================================
  await seedPairCurriculum({
    nativeCode: "hi",
    targetCode: "fr",
    description: "हिंदी भाषियों के लिए फ्रेंच सीखने का संपूर्ण, संवादात्मक पाठ्यक्रम।",
    culturalNotes: "फ्रेंच भाषा में हिंदी की तरह ही संज्ञाओं के लिंग (पुल्लिंग और स्त्रीलिंग) होते हैं, जिससे हिंदी भाषियों को नियमों को समझना बहुत स्वाभाविक लगता है।",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही फ्रेंच अभिवादन चुनें।",
        question: "हिंदी में 'नमस्ते' या 'शुभ दिन' को फ्रेंच में क्या कहते हैं?",
        options: ["Bonjour", "Merci", "Au revoir", "S'il vous plaît"],
        correctAnswer: "Bonjour",
        explanation: "'Bonjour' का अर्थ नमस्ते या हैलो होता है।",
      },
      {
        difficulty: "beginner",
        instruction: "धन्यवाद का फ्रेंच शब्द पहचानें।",
        question: "'बहुत-बहुत धन्यवाद' के लिए फ्रेंच में क्या कहते हैं?",
        options: ["Merci beaucoup", "De rien", "Bonne nuit", "Pardon"],
        correctAnswer: "Merci beaucoup",
        explanation: "Merci (धन्यवाद) + beaucoup (बहुत)।",
      },
      {
        difficulty: "intermediate",
        instruction: "सही क्रिया रूप चुनें।",
        question: "'मैं पेरिस में रहता हूँ' के लिए सही फ्रेंच वाक्य कौन सा है?",
        options: ["J'habite à Paris", "Je vais à Paris", "Je suis Paris", "J'aime Paris"],
        correctAnswer: "J'habite à Paris",
        explanation: "habiter (रहना) क्रिया का 'Je' के साथ 'J'habite' रूप होता है।",
      },
      {
        difficulty: "intermediate",
        instruction: "रेस्टोरेंट में पानी मांगने के लिए सही वाक्य चुनें।",
        question: "'कृपया पानी' कहने के लिए कौन सा विकल्प सही है?",
        options: ["De l'eau, s'il vous plaît", "Un café, s'il vous plaît", "L'addition, s'il vous plaît", "La carte, s'il vous plaît"],
        correctAnswer: "De l'eau, s'il vous plaît",
        explanation: "De l'eau (पानी) + s'il vous plaît (कृपया)।",
      },
      {
        difficulty: "advanced",
        instruction: "सही भूतकाल रूप चुनें।",
        question: "'मैंने खाना खाया' को फ्रेंच के passé composé में कैसे कहेंगे?",
        options: ["J'ai mangé", "Je mange", "Je vais manger", "Je mangeais"],
        correctAnswer: "J'ai mangé",
        explanation: "Passé composé में avoir + mangé का प्रयोग होता है।",
      },
    ],
    modules: [
      {
        category: "Social",
        title: "शुरुआती बातचीत: अभिवादन और शिष्टाचार",
        description: "फ्रेंच में लोगों से मिलना, अभिवादन करना और खुद का परिचय देना।",
        icon: "🥐",
        lessons: [
          {
            title: "पाठ 1: बुनियादी अभिवादन (Les Salutations)",
            objective: "फ्रेंच में औपचारिक और अनौपचारिक रूप से नमस्ते कहना सीखें।",
            culturalTip: "फ्रांस में किसी भी दुकान या कैफ़े में प्रवेश करते ही 'Bonjour' कहना अनिवार्य शिष्टाचार माना जाता है।",
            vocabulary: [
              {
                targetWord: "Bonjour",
                nativeMeaning: "नमस्ते / शुभ दिन",
                pronunciation: "बोंझूर (Bon-zhoor)",
                transliteration: "bonjour",
                partOfSpeech: "अभिवादन",
                exampleTarget: "Bonjour, comment allez-vous ?",
                exampleTransliteration: "Bonjour, komon talé-voo?",
                exampleNative: "नमस्ते, आप कैसे हैं?",
                notes: "दिन के समय का सबसे प्रचलित अभिवादन।",
              },
              {
                targetWord: "Merci",
                nativeMeaning: "धन्यवाद",
                pronunciation: "मेर्सी (Mair-see)",
                transliteration: "merci",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "Merci beaucoup pour votre aide.",
                exampleTransliteration: "Mair-see bo-koo poor votr ed.",
                exampleNative: "आपकी मदद के लिए बहुत-बहुत धन्यवाद।",
                notes: "आभार व्यक्त करने के लिए।",
              },
              {
                targetWord: "Au revoir",
                nativeMeaning: "अलविदा / फिर मिलेंगे",
                pronunciation: "ओ रव्वार (Oh ruh-vwahr)",
                transliteration: "au revoir",
                partOfSpeech: "विदाई",
                exampleTarget: "Au revoir et bonne journée !",
                exampleTransliteration: "Oh ruh-vwahr é bon zhoor-né!",
                exampleNative: "अलविदा और आपका दिन शुभ हो!",
                notes: "मानक विदाई शब्द।",
              },
            ],
            grammar: {
              title: "लिंग भेद: le (पुल्लिंग) और la (स्त्रीलिंग)",
              explanation: "हिंदी की तरह फ्रेंच में भी हर संज्ञा या तो पुल्लिंग (Masculine) होती है या स्त्रीलिंग (Feminine)। पुल्लिंग के लिए 'le' और स्त्रीलिंग के लिए 'la' का उपयोग करते हैं।",
              ruleSummary: "le + पुल्लिंग संज्ञा / la + स्त्रीलिंग संज्ञा / l' + स्वर से शुरू होने वाले शब्द",
              examples: [
                { target: "le café", transliteration: "luh ka-fay", native: "कॉफ़ी (पुल्लिंग)", explanation: "café पुल्लिंग है इसलिए le आया।" },
                { target: "la gare", transliteration: "la gar", native: "रेलवे स्टेशन (स्त्रीलिंग)", explanation: "gare स्त्रीलिंग है इसलिए la आया।" },
              ],
              commonMistakes: [
                { mistake: "la café", correction: "le café", explanation: "café पुल्लिंग संज्ञा है, इसके आगे la नहीं लग सकता।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही फ्रेंच शब्द चुनें।",
                prompt: "हिंदी में 'नमस्ते' को फ्रेंच में क्या कहते हैं?",
                options: ["Bonjour", "Merci", "Au revoir", "Pardon"],
                correctAnswer: "Bonjour",
                explanation: "'Bonjour' का अर्थ नमस्ते या हैलो होता है।",
                hintLevel1: "यह शब्द 'Bon...' से शुरू होता है।",
                hintLevel2: "इसका उच्चारण 'बोंझूर' जैसा होता है।",
                hintLevel3: "सही उत्तर: Bonjour.",
              },
              {
                type: "translation",
                instruction: "इस वाक्य का फ्रेंच में अनुवाद करें।",
                prompt: "बहुत-बहुत धन्यवाद",
                correctAnswer: "Merci beaucoup",
                acceptableAnswers: ["Merci beaucoup", "Merci beaucoup."],
                explanation: "Merci (धन्यवाद) + beaucoup (बहुत)।",
                hintLevel1: "पहला शब्द 'Merci' है।",
                hintLevel2: "दूसरा शब्द 'beaucoup' है।",
                hintLevel3: "सही उत्तर: Merci beaucoup.",
              },
            ],
          },
        ],
      },
    ],
  });

  // ==========================================
  // PAIR 3: ENGLISH (en) -> SPANISH (es)
  // Spanish taught through English!
  // ==========================================
  await seedPairCurriculum({
    nativeCode: "en",
    targetCode: "es",
    description: "Master conversational Spanish through structured lessons, grammar breakdowns, and real-world immersion.",
    culturalNotes: "In Spanish, punctuation for questions and exclamations begins with inverted marks (¿ and ¡) to prepare the speaker's vocal inflection in advance.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Spanish greeting.",
        question: "How do you say 'Hello, good morning' in Spanish?",
        options: ["Hola, buenos días", "Adiós, buenas noches", "Por favor", "De nada"],
        correctAnswer: "Hola, buenos días",
        explanation: "'Hola' means hello, and 'buenos días' means good morning.",
      },
      {
        difficulty: "beginner",
        instruction: "Choose the correct phrase for asking directions.",
        question: "How do you say 'Where is the train station?'",
        options: ["¿Dónde está la estación de tren?", "¿Cómo eres la estación?", "¿Qué hora es la estación?", "¿Quién tiene la estación?"],
        correctAnswer: "¿Dónde está la estación de tren?",
        explanation: "'¿Dónde está...?' is the standard phrase for inquiring about a physical location.",
      },
      {
        difficulty: "intermediate",
        instruction: "Select the appropriate verb conjugation.",
        question: "Choose the correct form of 'hablar' for 'We speak Spanish':",
        options: ["Hablamos español", "Hablan español", "Hablo español", "Hablas español"],
        correctAnswer: "Hablamos español",
        explanation: "'Nosotros hablamos' is the first-person plural conjugation of -ar verbs.",
      },
      {
        difficulty: "intermediate",
        instruction: "Choose the right polite request in a restaurant.",
        question: "How do you politely ask for the check at a restaurant?",
        options: ["La cuenta, por favor", "El menú, por favor", "La comida, gracias", "El baño, dónde"],
        correctAnswer: "La cuenta, por favor",
        explanation: "'La cuenta, por favor' translates directly to 'The bill/check, please'.",
      },
      {
        difficulty: "advanced",
        instruction: "Select the correct subjunctive usage.",
        question: "Complete the sentence expressing a wish: 'Espero que tú ______ bien.'",
        options: ["estés", "estás", "estar", "estuvo"],
        correctAnswer: "estés",
        explanation: "Verbs expressing hopes or wishes trigger the present subjunctive mood ('estés').",
      },
    ],
    modules: [
      {
        category: "Travel",
        title: "Travel & Exploration Essentials",
        description: "Navigating cities, finding transportation, and hotel communications in Spanish.",
        icon: "🧭",
        lessons: [
          {
            title: "Lesson 1: Asking for Directions & Locations",
            objective: "Confidently ask for and understand directions to landmarks, stations, and amenities.",
            culturalTip: "Addressing strangers politely using 'Disculpe' (excuse me) is standard practice before asking directions in Spanish-speaking countries.",
            vocabulary: [
              {
                targetWord: "¿Dónde está?",
                nativeMeaning: "Where is...?",
                pronunciation: "DON-deh es-TAH",
                transliteration: "donde esta",
                partOfSpeech: "phrase",
                exampleTarget: "¿Dónde está la estación?",
                exampleTransliteration: "donde esta la estacion",
                exampleNative: "Where is the station?",
                notes: "Uses 'estar' because location is being questioned.",
              },
              {
                targetWord: "la estación",
                nativeMeaning: "the station",
                pronunciation: "lah es-tah-SYOHN",
                transliteration: "la estacion",
                partOfSpeech: "noun",
                exampleTarget: "La estación está cerca.",
                exampleTransliteration: "la estacion esta cerca",
                exampleNative: "The station is nearby.",
                notes: "Feminine noun requiring 'la'.",
              },
              {
                targetWord: "por favor",
                nativeMeaning: "please",
                pronunciation: "por fah-VOR",
                transliteration: "por favor",
                partOfSpeech: "etiquette",
                exampleTarget: "Una mesa, por favor.",
                exampleTransliteration: "una mesa por favor",
                exampleNative: "A table, please.",
                notes: "Essential polite modifier.",
              },
            ],
            grammar: {
              title: "Ser vs. Estar: Expressing Location",
              explanation: "Spanish has two verbs for 'to be': 'ser' (for permanent characteristics and identity) and 'estar' (for temporary states and physical locations). Always use 'estar' when asking or stating where something is situated.",
              ruleSummary: "Location = Estar (está / están)",
              examples: [
                { target: "¿Dónde está el hotel?", transliteration: "donde esta el hotel", native: "Where is the hotel?", explanation: "Hotel location is physical position, hence 'está'." },
              ],
              commonMistakes: [
                { mistake: "¿Dónde es el hotel?", correction: "¿Dónde está el hotel?", explanation: "'Es' denotes definition or origin; 'está' denotes physical location." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Select the correct Spanish sentence.",
                prompt: "How do you say 'Where is the station?'",
                options: ["¿Dónde está la estación?", "¿Cómo eres la estación?", "¿Qué tienes la estación?", "¿Cuándo es la estación?"],
                correctAnswer: "¿Dónde está la estación?",
                explanation: "'¿Dónde está...?' is the grammatically correct question for physical location.",
                hintLevel1: "The question starts with '¿Dónde...'",
                hintLevel2: "Location uses the verb 'está', not 'es'.",
                hintLevel3: "The correct answer is: ¿Dónde está la estación?",
              },
              {
                type: "translation",
                instruction: "Translate this sentence into Spanish.",
                prompt: "Where is the airport, please?",
                correctAnswer: "¿Dónde está el aeropuerto, por favor?",
                acceptableAnswers: [
                  "¿Dónde está el aeropuerto, por favor?",
                  "Donde esta el aeropuerto, por favor?",
                  "¿Dónde está el aeropuerto por favor?",
                  "Donde esta el aeropuerto por favor",
                ],
                explanation: "Airport is 'el aeropuerto' (masculine). Location requires 'está'.",
                hintLevel1: "Begin with '¿Dónde está...'",
                hintLevel2: "The word for airport is 'el aeropuerto'.",
                hintLevel3: "Complete sentence: ¿Dónde está el aeropuerto, por favor?",
              },
            ],
          },
        ],
      },
    ],
  });

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
          bio: "Language enthusiast mastering Korean through Telugu and French through Hindi.",
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

  console.log(`✓ Seeded demo user: demo@lingua.app (Password: LinguaDemo2026!)`);
  console.log("🎉 Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
