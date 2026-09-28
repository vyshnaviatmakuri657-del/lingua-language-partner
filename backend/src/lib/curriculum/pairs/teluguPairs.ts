import { PairCurriculumData } from "../types";

export const teluguNativePairs: PairCurriculumData[] = [
  // 1. TELUGU -> KOREAN
  {
    nativeCode: "te",
    targetCode: "ko",
    description: "తెలుగు మాట్లాడేవారికి సులభంగా కొరియన్ భాష నేర్పే ప్రత్యేక అభ్యసన కోర్సు.",
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
        difficulty: "intermediate",
        instruction: "సరైన వాక్యాన్ని ఎంచుకోండి.",
        question: "'నేను నీరు తాగుతాను' అనే భావానికి సరైన కొరియన్ వాక్యం ఏది?",
        options: ["저는 물을 마셔요 (Jeoneun muleul masyeoyo)", "저는 밥을 먹어요 (Jeoneun babeul meogeoyo)", "저는 학교에 가요 (Jeoneun hakgyoe gayo)", "저는 책을 읽어요 (Jeoneun chaegeul ilgeoyo)"],
        correctAnswer: "저는 물을 마셔요 (Jeoneun muleul masyeoyo)",
        explanation: "저(నేను) + 물(నీరు) + 을(ద్వితీయా విభక్తి) + 마셔요(తాగుతాను). తెలుగులాగే SOV క్రమం ఉంటుంది.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "ప్రాథమిక పరిచయాలు & శుభాకాంక్షలు",
        description: "కొరియన్ భాషలో ప్రాథమిక శుభాకాంక్షలు మరియు మర్యాదపూర్వక సంభాషణలు.",
        icon: "🇰🇷",
        lessons: [
          {
            title: "శుభాకాంక్షలు (Greetings)",
            objective: "కొరియన్ భాషలో నమస్కారం మరియు ధన్యవాదాలు చెప్పడం నేర్చుకోండి.",
            culturalTip: "కొరియాలో నమస్కరించేటప్పుడు తల కొద్దిగా వంచి మర్యాద చూపించడం ఆచారం.",
            vocabulary: [
              {
                targetWord: "안녕하세요",
                nativeMeaning: "నమస్కారం / హలో",
                pronunciation: "ఆన్-న్యాంగ్-హా-సే-యో",
                transliteration: "Annyeonghaseyo",
                partOfSpeech: "శుభాకాంక్ష",
                exampleTarget: "안녕하세요! 만나서 반갑습니다.",
                exampleTransliteration: "Annyeonghaseyo! Mannaseo bangapsumnida.",
                exampleNative: "నమస్కారం! మిమ్మల్ని కలవడం సంతోషంగా ఉంది.",
              },
              {
                targetWord: "감사합니다",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "కమ్-సా-హమ్-ని-దా",
                transliteration: "Gamsahamnida",
                partOfSpeech: "ధన్యవాదం",
                exampleTarget: "도와주셔서 감사합니다.",
                exampleTransliteration: "Dowajusyeoseo gamsahamnida.",
                exampleNative: "సహాయం చేసినందుకు ధన్యవాదాలు.",
              },
            ],
            grammar: {
              title: "మర్యాదపూర్వక అంత్యాలు (-요 / -습니다)",
              explanation: "కొరియన్ భాషలో ఎదుటివారిని గౌరవించడానికి క్రియల చివర -요 లేదా -습니다 కలుపుతారు.",
              ruleSummary: "క్రియా రూపం + -아요 / -어요 / -습니다 = మర్యాదపూర్వక వాక్యం",
              examples: [
                { target: "감사합니다", transliteration: "Gamsahamnida", native: "ధన్యవాదాలు (అత్యంత మర్యాదపూర్వకం)" },
                { target: "고마워요", transliteration: "Gomawoyo", native: "ధన్యవాదాలు (సాధారణ మర్యాద)" },
              ],
              commonMistakes: [
                { incorrect: "안녕", correct: "안녕하세요", explanation: "పెద్దవారితో మాట్లాడేటప్పుడు ఎల్లప్పుడూ '안녕하세요' ఉపయోగించాలి." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన సమాధానాన్ని ఎంచుకోండి.",
                prompt: "కొరియన్‌లో 'ధన్యవాదాలు' అని దేనిని అంటారు?",
                correctAnswer: "감사합니다",
                options: ["감사합니다", "안녕하세요", "죄송합니다", "네"],
                explanation: "'감사합니다' అంటే కొరియన్ భాషలో ధన్యవాదాలు.",
                hintLevel1: "ఆలోచించండి: ఇతరులు మీకు సహాయం చేసినప్పుడు కృతజ్ఞతగా చెప్పే పదం.",
                hintLevel2: "మరింత సహాయం: ఈ పదం 'గమ్' తో మొదలవుతుంది మరియు 4 అక్షరాలు కలిగి ఉంది.",
                hintLevel3: "సమాధానం: '감사합니다'.",
              },
              {
                type: "translation",
                instruction: "ఈ వాక్యాన్ని కొరియన్‌లోకి అనువదించండి.",
                prompt: "నమస్కారం",
                promptTransliteration: "Namaskaram",
                correctAnswer: "안녕하세요",
                acceptableAnswers: ["안녕하세요", "안녕하세요!"],
                explanation: "తెలుగులో 'నమస్కారం' కొరియన్‌లో '안녕하세요' అవుతుంది.",
                hintLevel1: "ఇది రోజూ ఎదురైనప్పుడు చెప్పే సాధారణ గౌరవప్రదమైన మాట.",
                hintLevel2: "ఇది 'అన్' తో ప్రారంభమై 'యో' తో ముగుస్తుంది.",
                hintLevel3: "సమాధానం: '안녕하세요'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. TELUGU -> HINDI
  {
    nativeCode: "te",
    targetCode: "hi",
    description: "తెలుగు ద్వారా హిందీ భాషను సులభంగా మరియు వేగంగా నేర్చుకోండి.",
    culturalNotes: "హిందీ మరియు తెలుగు రెండూ భారతీయ భాషలు కావడం వల్ల అనేక సంస్కృత సమాన పదాలు మరియు ఒకేరకమైన వాక్య నిర్మాణం (SOV) కలిగి ఉంటాయి.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన హిందీ పదాన్ని ఎంచుకోండి.",
        question: "తెలుగులో 'నమస్కారం' కు సమానమైన హిందీ పదం ఏది?",
        options: ["नमस्ते (Namaste)", "धन्यवाद (Dhanyavaad)", "हाँ (Haan)", "नहीं (Nahin)"],
        correctAnswer: "नमस्ते (Namaste)",
        explanation: "హిందీలో సాధారణ అభివాదానికి 'नमस्ते' లేదా 'नमस्कार' ఉపయోగిస్తారు.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "హిందీ ప్రాథమిక పరిచయాలు & శుభాకాంక్షలు",
        description: "హిందీలో ప్రాథమిక సంభాషణలు, అభివాదాలు మరియు నిత్య జీవిత పదాలు.",
        icon: "🇮🇳",
        lessons: [
          {
            title: "అభివాదాలు & మర్యాద (Greetings & Courtesy)",
            objective: "హిందీలో నమస్తే, ధన్యవాదాలు మరియు పరిచయాలు చెప్పడం నేర్చుకోండి.",
            culturalTip: "హిందీలో ఎదుటివారిని గౌరవించేందుకు 'ఆప్' (आप) అని సంబోధిస్తారు.",
            vocabulary: [
              {
                targetWord: "नमस्ते",
                nativeMeaning: "నమస్కారం",
                pronunciation: "నమస్తే",
                transliteration: "Namaste",
                partOfSpeech: "అభివాదం",
                exampleTarget: "नमस्ते! आप कैसे हैं?",
                exampleTransliteration: "Namaste! Aap kaise hain?",
                exampleNative: "నమస్కారం! మీరు ఎలా ఉన్నారు?",
              },
              {
                targetWord: "धन्यवाद",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "ధన్యవాద్",
                transliteration: "Dhanyavaad",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "आपकी मदद के लिए धन्यवाद।",
                exampleTransliteration: "Aapki madad ke liye dhanyavaad.",
                exampleNative: "మీ సహాయానికి ధన్యవాదాలు.",
              },
              {
                targetWord: "हाँ",
                nativeMeaning: "అవును",
                pronunciation: "హాఁ",
                transliteration: "Haan",
                partOfSpeech: "అంగీకారం",
                exampleTarget: "हाँ, मैं तैयार हूँ।",
                exampleTransliteration: "Haan, main taiyaar hoon.",
                exampleNative: "అవును, నేను సిద్ధంగా ఉన్నాను.",
              },
            ],
            grammar: {
              title: "హిందీ వాక్య నిర్మాణం మరియు సహాయక క్రియ 'హై' (है / हैं)",
              explanation: "తెలుగులాగే హిందీలో కూడా కర్త ముందు వచ్చి క్రియ చివర వస్తుంది. ఏకవచనానికి 'है' (ఉంది/ఉన్నాడు), బహువచనం/గౌరవానికి 'हैं' ఉపయోగిస్తారు.",
              ruleSummary: "కర్త + కర్మ + సహాయక క్రియ (है / हैं)",
              examples: [
                { target: "यह एक किताब है।", transliteration: "Yeh ek kitaab hai.", native: "ఇది ఒక పుస్తకం." },
                { target: "वे अध्यापक हैं।", transliteration: "Ve adhyaapak hain.", native: "వారు ఉపాధ్యాయులు." },
              ],
              commonMistakes: [
                { incorrect: "आप कैसे है?", correct: "आप कैसे हैं?", explanation: "గౌరవార్థక సంబోధన 'आप' ఉన్నప్పుడు 'हैं' (బిందువుతో) ఉపయోగించాలి." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన హిందీ పదాన్ని గుర్తించండి.",
                prompt: "తెలుగులో 'ధన్యవాదాలు' కు హిందీ పదం ఏమిటి?",
                correctAnswer: "धन्यवाद",
                options: ["धन्यवाद", "नमस्ते", "कृपया", "अलविदा"],
                explanation: "'धन्यवाद' అంటే తెలుగులో ధన్యవాదాలు.",
                hintLevel1: "కృతజ్ఞత తెలిపే సంస్కృత సమాన పదం.",
                hintLevel2: "ఇది 'ధ' తో ప్రారంభమవుతుంది.",
                hintLevel3: "సమాధానం: 'धन्यवाद'.",
              },
              {
                type: "translation",
                instruction: "ఈ వాక్యాన్ని హిందీలోకి అనువదించండి.",
                prompt: "నమస్కారం",
                correctAnswer: "नमस्ते",
                acceptableAnswers: ["नमस्ते", "नमस्कार"],
                explanation: "తెలుగులో 'నమస్కారం' కు హిందీలో 'नमस्ते' సరైనది.",
                hintLevel1: "సాధారణ భారతీయ అభివాదం.",
                hintLevel2: "రెండు చేతులు జోడించి చెప్పే పదం: న-మ-స్తే.",
                hintLevel3: "సమాధానం: 'नमस्ते'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. TELUGU -> ENGLISH
  {
    nativeCode: "te",
    targetCode: "en",
    description: "తెలుగు ద్వారా ఆంగ్ల భాషను సులభంగా మరియు ఆత్మవిశ్వాసంతో నేర్చుకోండి.",
    culturalNotes: "తెలుగులో వాక్య నిర్మాణం SOV (కర్త-కర్మ-క్రియ) కాగా, ఆంగ్లంలో SVO (Subject-Verb-Object). ఈ తేడాను అర్థం చేసుకోవడం ఆంగ్ల అభ్యాసంలో కీలకం!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన ఆంగ్ల పదాన్ని ఎంచుకోండి.",
        question: "తెలుగులో 'ధన్యవాదాలు' కు సమానమైన ఆంగ్ల పదం ఏది?",
        options: ["Thank you", "Hello", "Sorry", "Please"],
        correctAnswer: "Thank you",
        explanation: "కృతజ్ఞత తెలపడానికి ఆంగ్లంలో 'Thank you' ఉపయోగిస్తారు.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "ఆంగ్ల ప్రాథమిక సంభాషణలు (English Essentials)",
        description: "నిత్య జీవితంలో ఆంగ్లంలో మాట్లాడటానికి అవసరమైన ప్రాథమిక పదాలు మరియు వాక్యాలు.",
        icon: "🇬🇧",
        lessons: [
          {
            title: "శుభాకాంక్షలు & మర్యాదపూర్వక పదాలు (Greetings & Courtesy)",
            objective: "ఆంగ్లంలో పరిచయాలు, శుభాకాంక్షలు మరియు మర్యాదగా మాట్లాడటం నేర్చుకోండి.",
            culturalTip: "ఆంగ్ల సంస్కృతిలో 'Please' మరియు 'Thank you' తరచుగా వాడటం మంచి మర్యాదగా భావిస్తారు.",
            vocabulary: [
              {
                targetWord: "Hello",
                nativeMeaning: "నమస్కారం / హలో",
                pronunciation: "హె-లో",
                partOfSpeech: "అభివాదం",
                exampleTarget: "Hello, how are you?",
                exampleNative: "హలో, మీరు ఎలా ఉన్నారు?",
              },
              {
                targetWord: "Thank you",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "థాంక్ యూ",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "Thank you very much!",
                exampleNative: "చాలా ధన్యవాదాలు!",
              },
              {
                targetWord: "Please",
                nativeMeaning: "దయచేసి",
                pronunciation: "ప్లీజ్",
                partOfSpeech: "వినతి",
                exampleTarget: "Please come in.",
                exampleNative: "దయచేసి లోపలికి రండి.",
              },
            ],
            grammar: {
              title: "ఆంగ్లంలో వాక్య క్రమం (Subject + Verb + Object)",
              explanation: "తెలుగులో క్రియ వాక్యం చివర వస్తుంది (నేను నీరు తాగుతాను). కానీ ఆంగ్లంలో క్రియ మధ్యలో వస్తుంది (I drink water).",
              ruleSummary: "Subject (కర్త) + Verb (క్రియ) + Object (కర్మ)",
              examples: [
                { target: "I read books.", native: "నేను పుస్తకాలు చదువుతాను." },
                { target: "She drinks coffee.", native: "ఆమె కాఫీ తాగుతుంది." },
              ],
              commonMistakes: [
                { incorrect: "I water drink.", correct: "I drink water.", explanation: "ఆంగ్లంలో క్రియ (drink) కర్మ (water) కంటే ముందు రావాలి." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన ఆంగ్ల పదాన్ని ఎంచుకోండి.",
                prompt: "తెలుగులో 'దయచేసి' కు సరిపోయే ఆంగ్ల పదం ఏది?",
                correctAnswer: "Please",
                options: ["Please", "Thank you", "Sorry", "Welcome"],
                explanation: "'Please' అంటే తెలుగులో దయచేసి అని అర్థం.",
                hintLevel1: "ఎదుటివారిని ఏదైనా కోరినప్పుడు వాడే మర్యాదపూర్వక పదం.",
                hintLevel2: "ఇది 'P' తో ప్రారంభమవుతుంది.",
                hintLevel3: "సమాధానం: 'Please'.",
              },
              {
                type: "translation",
                instruction: "ఈ పదాన్ని ఆంగ్లంలోకి అనువదించండి.",
                prompt: "ధన్యవాదాలు",
                correctAnswer: "Thank you",
                acceptableAnswers: ["Thank you", "Thanks"],
                explanation: "'ధన్యవాదాలు' కు సరైన ఆంగ్ల పదం 'Thank you'.",
                hintLevel1: "కృతజ్ఞత తెలియజేసే పదం.",
                hintLevel2: "'T' తో మొదలై 'u' తో ముగుస్తుంది.",
                hintLevel3: "సమాధానం: 'Thank you'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. TELUGU -> TAMIL
  {
    nativeCode: "te",
    targetCode: "ta",
    description: "తెలుగు ద్వారా తమిళ భాషను సులభంగా నేర్చుకోండి.",
    culturalNotes: "తెలుగు మరియు తమిళం రెండూ ద్రావిడ భాషా కుటుంబానికి చెందినవి. వ్యాకరణం మరియు అనేక ప్రాచీన మూల పదాలు రెండు భాషల్లో సమానంగా ఉంటాయి.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన తమిళ పదాన్ని గుర్తించండి.",
        question: "తెలుగులో 'నమస్కారం' కు సమానమైన తమిళ పదం ఏది?",
        options: ["வணக்கம் (Vanakkam)", "நன்றி (Nandri)", "ஆம் (Aam)", "இல்லை (Illai)"],
        correctAnswer: "வணக்கம் (Vanakkam)",
        explanation: "తమిళంలో సాధారణ శుభాకాంక్షను 'வணக்கம்' (వణక్కం) అంటారు.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "తమిళ ప్రాథమిక సంభాషణలు (Tamil Essentials)",
        description: "తమిళంలో ప్రాథమిక పదాలు, శుభాకాంక్షలు మరియు మర్యాదలు.",
        icon: "🇮🇳",
        lessons: [
          {
            title: "శుభాకాంక్షలు & పరిచయాలు (Greetings & Introductions)",
            objective: "తమిళంలో నమస్కారం, ధన్యవాదాలు మరియు సాధారణ ప్రశ్నలు వేయడం నేర్చుకోండి.",
            culturalTip: "తమిళంలో నమస్కరించేటప్పుడు రెండు చేతులు జోడించి 'వణక్కం' చెబుతారు.",
            vocabulary: [
              {
                targetWord: "வணக்கம்",
                nativeMeaning: "నమస్కారం",
                pronunciation: "వణక్కం",
                transliteration: "Vanakkam",
                partOfSpeech: "అభివాదం",
                exampleTarget: "வணக்கம்! எப்படி இருக்கிறீர்கள்?",
                exampleTransliteration: "Vanakkam! Eppadi irukkireergal?",
                exampleNative: "నమస్కారం! మీరు ఎలా ఉన్నారు?",
              },
              {
                targetWord: "நன்றி",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "నన్ఱి",
                transliteration: "Nandri",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "உங்கள் உதவிக்கு மிக்க நன்றி.",
                exampleTransliteration: "Ungal udhavikku mikka nandri.",
                exampleNative: "మీ సహాయానికి చాలా ధన్యవాదాలు.",
              },
            ],
            grammar: {
              title: "ద్రావిడ వాక్య నిర్మాణం మరియు సర్వనామాలు",
              explanation: "తెలుగులో 'నేను, నువ్వు, మీరు' తమిళంలో 'నాన్ (நான்), నీ (நீ), నీంగళ్ (நீங்கள்)' గా ఉంటాయి.",
              ruleSummary: "తెలుగులాగే తమిళంలో కూడా SOV (కర్త, కర్మ, క్రియ) అమరిక ఉంటుంది.",
              examples: [
                { target: "நான் வருகிறேன்.", transliteration: "Naan varugiren.", native: "నేను వస్తున్నాను." },
                { target: "நீங்கள் யார்?", transliteration: "Neengal yaar?", native: "మీరు ఎవరు?" },
              ],
              commonMistakes: [
                { incorrect: "நீ வாருங்கள்", correct: "நீங்கள் வாருங்கள்", explanation: "మర్యాదపూర్వక క్రియకు 'நீங்கள்' వాడాలి." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన తమిళ పదాన్ని ఎంచుకోండి.",
                prompt: "తెలుగులో 'ధన్యవాదాలు' కు తమిళ సమాన పదం ఏది?",
                correctAnswer: "நன்றி",
                options: ["நன்றி", "வணக்கம்", "ஆம்", "இல்லை"],
                explanation: "'நன்றி' (నన్ఱి) అంటే తమిళంలో ధన్యవాదాలు.",
                hintLevel1: "కృతజ్ఞత తెలిపే పదం.",
                hintLevel2: "ఇది 'న' ధ్వనితో మొదలవుతుంది.",
                hintLevel3: "సమాధానం: 'நன்றி'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. TELUGU -> FRENCH
  {
    nativeCode: "te",
    targetCode: "fr",
    description: "తెలుగు ద్వారా ఫ్రెంచ్ భాషను చక్కని ఉచ్ఛారణతో మరియు సరళంగా నేర్చుకోండి.",
    culturalNotes: "ఫ్రెంచ్ సంస్కృతిలో ప్రతి సంభాషణ 'Bonjour' (నమస్కారం) లేదా 'Bonsoir' (శుభ సాయంత్రం) తో ప్రారంభమవుతుంది.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన ఫ్రెంచ్ పదాన్ని గుర్తించండి.",
        question: "తెలుగులో 'నమస్కారం' కు ఫ్రెంచ్ పదం ఏది?",
        options: ["Bonjour", "Merci", "S'il vous plaît", "Au revoir"],
        correctAnswer: "Bonjour",
        explanation: "'Bonjour' అంటే ఫ్రెంచ్‌లో నమస్కారం లేదా శుభోదయం.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "ఫ్రెంచ్ ప్రాథమిక పరిచయాలు (French Essentials)",
        description: "ఫ్రెంచ్‌లో రోజూ వాడే శుభాకాంక్షలు మరియు సాధారణ వాక్యాలు.",
        icon: "🇫🇷",
        lessons: [
          {
            title: "శుభాకాంక్షలు & మర్యాద (Greetings & Courtesy)",
            objective: "ఫ్రెంచ్‌లో హలో, థాంక్యూ మరియు వీడ్కోలు చెప్పడం నేర్చుకోండి.",
            culturalTip: "ఫ్రెంచ్ ప్రజలు రోజులో పరిచయమైన ప్రతిసారీ 'Bonjour' తో మర్యాదగా పలుకరిస్తారు.",
            vocabulary: [
              {
                targetWord: "Bonjour",
                nativeMeaning: "నమస్కారం / శుభోదయం",
                pronunciation: "బోంజూర్",
                partOfSpeech: "అభివాదం",
                exampleTarget: "Bonjour, comment allez-vous ?",
                exampleNative: "నమస్కారం, మీరు ఎలా ఉన్నారు?",
              },
              {
                targetWord: "Merci",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "మెర్సీ",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "Merci beaucoup !",
                exampleNative: "చాలా ధన్యవాదాలు!",
              },
            ],
            grammar: {
              title: "ఫ్రెంచ్‌లో నామవాచక లింగాలు (Masculine / Feminine)",
              explanation: "ఫ్రెంచ్‌లో ప్రతి వస్తువుకు లింగం ఉంటుంది. పుల్లింగానికి 'le' (లే), స్త్రీలింగానికి 'la' (లా) వాడతారు.",
              ruleSummary: "le + పుల్లింగ పదం | la + స్త్రీలింగ పదం",
              examples: [
                { target: "le livre", native: "పుస్తకం (పుల్లింగం)" },
                { target: "la table", native: "బల్ల (స్త్రీలింగం)" },
              ],
              commonMistakes: [
                { incorrect: "la livre", correct: "le livre", explanation: "'పుస్తకం' ఫ్రెంచ్‌లో పుల్లింగ నామవాచకం." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన ఫ్రెంచ్ పదాన్ని ఎంచుకోండి.",
                prompt: "తెలుగులో 'ధన్యవాదాలు' కు ఫ్రెంచ్ పదం ఏమిటి?",
                correctAnswer: "Merci",
                options: ["Merci", "Bonjour", "Au revoir", "Oui"],
                explanation: "'Merci' అంటే ఫ్రెంచ్‌లో ధన్యవాదాలు.",
                hintLevel1: "కృతజ్ఞత తెలిపే అంతర్జాతీయంగా ప్రసిద్ధి చెందిన ఫ్రెంచ్ పదం.",
                hintLevel2: "ఇది 'M' తో మొదలవుతుంది.",
                hintLevel3: "సమాధానం: 'Merci'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 6. TELUGU -> SPANISH
  {
    nativeCode: "te",
    targetCode: "es",
    description: "తెలుగు ద్వారా ప్రపంచ ప్రసిద్ధ స్పానిష్ భాషను నేర్చుకోండి.",
    culturalNotes: "స్పానిష్‌లో పలకరింపులు ఎంతో ఆత్మీయంగా ఉంటాయి. ప్రశ్నలు మరియు ఆశ్చర్యార్థకాలు వాక్యం మొదట్లో తిరగబడిన గుర్తులతో (¿ ... ?, ¡ ... !) ఉంటాయి.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "సరైన స్పానిష్ పదాన్ని గుర్తించండి.",
        question: "తెలుగులో 'నమస్కారం' కు సమానమైన స్పానిష్ పదం ఏది?",
        options: ["¡Hola!", "Gracias", "Por favor", "Adiós"],
        correctAnswer: "¡Hola!",
        explanation: "'¡Hola!' అంటే స్పానిష్ భాషలో హలో లేదా నమస్కారం.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "స్పానిష్ ప్రాథమిక సంభాషణలు (Spanish Essentials)",
        description: "స్పానిష్‌లో ప్రాథమిక శుభాకాంక్షలు, పలకరింపులు మరియు మర్యాదపూర్వక పదాలు.",
        icon: "🇪🇸",
        lessons: [
          {
            title: "శుభాకాంక్షలు & మర్యాద (Greetings & Manners)",
            objective: "స్పానిష్‌లో హలో, థాంక్యూ మరియు పేరు చెప్పడం నేర్చుకోండి.",
            culturalTip: "స్పానిష్ మాట్లాడే దేశాలలో ఒకరినొకరు కలుసుకున్నప్పుడు ఆత్మీయంగా కౌగిలించుకోవడం లేదా చెంపపై ముద్దు పెట్టుకోవడం సంప్రదాయం.",
            vocabulary: [
              {
                targetWord: "Hola",
                nativeMeaning: "నమస్కారం / హలో",
                pronunciation: "ఓ-లా",
                partOfSpeech: "అభివాదం",
                exampleTarget: "¡Hola! ¿Cómo estás?",
                exampleNative: "హలో! ఎలా ఉన్నావు?",
              },
              {
                targetWord: "Gracias",
                nativeMeaning: "ధన్యవాదాలు",
                pronunciation: "గ్రా-సి-యాస్",
                partOfSpeech: "కృతజ్ఞత",
                exampleTarget: "Muchas gracias por tu ayuda.",
                exampleNative: "నీ సహాయానికి చాలా ధన్యవాదాలు.",
              },
            ],
            grammar: {
              title: "స్పానిష్‌లో 'H' నిశ్శబ్ద అక్షరం (Silent H)",
              explanation: "స్పానిష్‌లో 'H' అక్షరాన్ని పలకరు. ఉదాహరణకు 'Hola' ను 'హోలా' కాకుండా 'ఓలా' అని పలకాలి.",
              ruleSummary: "H తో ప్రారంభమయ్యే పదాలలో H శబ్దం ఉండదు.",
              examples: [
                { target: "Hola", native: "ఓలా (నమస్కారం)" },
                { target: "Hotel", native: "ఒటెల్ (హోటల్)" },
              ],
              commonMistakes: [
                { incorrect: "హోలా అని పలకడం", correct: "ఓలా అని పలకాలి", explanation: "స్పానిష్‌లో H శబ్దం నిశ్శబ్దం (silent)." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "సరైన స్పానిష్ పదాన్ని గుర్తించండి.",
                prompt: "స్పానిష్‌లో 'ధన్యవాదాలు' అని ఎలా చెబుతారు?",
                correctAnswer: "Gracias",
                options: ["Gracias", "Hola", "Por favor", "De nada"],
                explanation: "'Gracias' అంటే స్పానిష్‌లో ధన్యవాదాలు.",
                hintLevel1: "కృతజ్ఞత తెలిపే పదం.",
                hintLevel2: "ఇది 'G' తో మొదలవుతుంది.",
                hintLevel3: "సమాధానం: 'Gracias'.",
              },
            ],
          },
        ],
      },
    ],
  },
];
