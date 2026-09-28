import { PairCurriculumData } from "../types";

export const hindiNativePairs: PairCurriculumData[] = [
  // 1. HINDI -> FRENCH
  {
    nativeCode: "hi",
    targetCode: "fr",
    description: "हिन्दी भाषियों के लिए फ्रेंच सीखने का संरचित और सरल पाठ्यक्रम।",
    culturalNotes: "फ्रेंच और हिन्दी दोनों में संज्ञाओं के पुल्लिंग और स्त्रीलिंग रूप होते हैं। इस व्याकरणिक समानता से फ्रेंच सीखना बहुत आसान हो जाता है!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही फ्रेंच अभिवादन चुनें।",
        question: "हिन्दी में 'नमस्ते' के लिए फ्रेंच में क्या कहते हैं?",
        options: ["Bonjour", "Merci", "S'il vous plaît", "Au revoir"],
        correctAnswer: "Bonjour",
        explanation: "'Bonjour' का अर्थ फ्रेंच में 'नमस्ते' या 'शुभ दिन' होता है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "बुनियादी अभिवादन और शिष्टाचार",
        description: "फ्रेंच भाषा में दैनिक अभिवादन और विनम्र भाव प्रकट करना सीखें।",
        icon: "🇫🇷",
        lessons: [
          {
            title: "अभिवादन और शिष्टाचार (Salutations)",
            objective: "फ्रेंच में नमस्ते, धन्यवाद और अलविदा कहना सीखें।",
            culturalTip: "फ्रांस में किसी भी दुकान या कैफ़े में प्रवेश करते समय 'Bonjour' कहना आवश्यक शिष्टाचार माना जाता है।",
            vocabulary: [
              {
                targetWord: "Bonjour",
                nativeMeaning: "नमस्ते / शुभ दिन",
                pronunciation: "बोंजूर",
                partOfSpeech: "अभिवादन",
                exampleTarget: "Bonjour, comment allez-vous ?",
                exampleNative: "नमस्ते, आप कैसे हैं?",
              },
              {
                targetWord: "Merci",
                nativeMeaning: "धन्यवाद",
                pronunciation: "मेरसी",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "Merci beaucoup !",
                exampleNative: "बहुत-बहुत धन्यवाद!",
              },
            ],
            grammar: {
              title: "संज्ञा लिंग: पुल्लिंग और स्त्रीलिंग (Masculin et Féminin)",
              explanation: "हिन्दी की तरह ही फ्रेंच में प्रत्येक वस्तु का लिंग होता है। पुल्लिंग के लिए 'le' और स्त्रीलिंग के लिए 'la' का प्रयोग होता है।",
              ruleSummary: "le + पुल्लिंग संज्ञा | la + स्त्रीलिंग संज्ञा",
              examples: [
                { target: "le livre", native: "किताब (पुल्लिंग)" },
                { target: "la table", native: "मेज़ (स्त्रीलिंग)" },
              ],
              commonMistakes: [
                { incorrect: "la garçon", correct: "le garçon", explanation: "'लड़का' (garçon) पुल्लिंग है, अतः 'le' लगेगा।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही फ्रेंच शब्द चुनें।",
                prompt: "हिन्दी में 'धन्यवाद' के लिए कौन-सा फ्रेंच शब्द है?",
                correctAnswer: "Merci",
                options: ["Merci", "Bonjour", "Au revoir", "Oui"],
                explanation: "'Merci' का अर्थ धन्यवाद होता है।",
                hintLevel1: "आभार प्रकट करने वाला प्रसिद्ध फ्रेंच शब्द।",
                hintLevel2: "यह शब्द 'M' से शुरू होता है।",
                hintLevel3: "उत्तर: 'Merci'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. HINDI -> TELUGU
  {
    nativeCode: "hi",
    targetCode: "te",
    description: "हिन्दी के माध्यम से मधुर तेलुगु भाषा सरलता से सीखें।",
    culturalNotes: "तेलुगु को 'पूर्व का इतालवी' कहा जाता है क्योंकि इसके अधिकांश शब्द स्वरों पर समाप्त होते हैं। हिन्दी और तेलुगु में कई संस्कृत तत्सम शब्द समान हैं।",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही तेलुगु अभिवादन चुनें।",
        question: "हिन्दी में 'नमस्ते' को तेलुगु में क्या कहते हैं?",
        options: ["నమస్కారం (Namaskaram)", "ధన్యవాదాలు (Dhanyavaadalu)", "అవును (Avunu)", "కాదు (Kaadu)"],
        correctAnswer: "నమస్కారం (Namaskaram)",
        explanation: "तेलुगु में शिष्टाचार अभिवादन के लिए 'నమస్కారం' का प्रयोग किया जाता है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "तेलुगु बुनियादी अभिवादन (Telugu Essentials)",
        description: "तेलुगु भाषा में प्रारंभिक शब्द, अभिवादन और सामान्य बोलचाल।",
        icon: "🇮🇳",
        lessons: [
          {
            title: "अभिवादन और परिचय (Greetings & Courtesy)",
            objective: "तेलुगु में नमस्कार, धन्यवाद और हालचाल पूछना सीखें।",
            culturalTip: "तेलुगु संस्कृति में बड़ों का आदर करते हुए 'గారు' (गारू - जैसे जी) प्रत्यय लगाया जाता है।",
            vocabulary: [
              {
                targetWord: "నమస్కారం",
                nativeMeaning: "नमस्ते",
                pronunciation: "नमस्करम्",
                transliteration: "Namaskaram",
                partOfSpeech: "अभिवादन",
                exampleTarget: "నమస్కారం! మీరు ఎలా ఉన్నారు?",
                exampleTransliteration: "Namaskaram! Meeru ela unnaaru?",
                exampleNative: "नमस्ते! आप कैसे हैं?",
              },
              {
                targetWord: "ధన్యవాదాలు",
                nativeMeaning: "धन्यवाद",
                pronunciation: "धन्यवादाळु",
                transliteration: "Dhanyavaadalu",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "మీ సహాయానికి ధన్యవాదాలు.",
                exampleTransliteration: "Mee sahaayaaniki dhanyavaadalu.",
                exampleNative: "आपकी सहायता के लिए धन्यवाद।",
              },
            ],
            grammar: {
              title: "तेलुगु वाक्य संरचना (SOV)",
              explanation: "हिन्दी की तरह ही तेलुगु में भी कर्ता पहले, कर्म बीच में और क्रिया अंत में आती है।",
              ruleSummary: "कर्ता + कर्म + क्रिया",
              examples: [
                { target: "నేను నీరు తాగుతాను.", transliteration: "Nenu neeru thaaguthaanu.", native: "मैं पानी पीता हूँ।" },
              ],
              commonMistakes: [
                { incorrect: "నువ్వు ఎలా ఉన్నారు?", correct: "మీరు ఎలా ఉన్నారు?", explanation: "आदरसूचक क्रिया 'ఉన్నారు' के साथ 'మీరు' (आप) लगाना चाहिए।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही तेलुगु शब्द पहचानें।",
                prompt: "हिन्दी में 'धन्यवाद' के लिए तेलुगु शब्द क्या है?",
                correctAnswer: "ధన్యవాదాలు",
                options: ["ధన్యవాదాలు", "నమస్కారం", "అవును", "కాదు"],
                explanation: "'ధన్యవాదాలు' का अर्थ धन्यवाद होता है।",
                hintLevel1: "कृतज्ञता प्रकट करने वाला शब्द।",
                hintLevel2: "यह शब्द 'ధ' (ध) से शुरू होता है।",
                hintLevel3: "उत्तर: 'ధన్యవాదాలు'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. HINDI -> ENGLISH
  {
    nativeCode: "hi",
    targetCode: "en",
    description: "हिन्दी के माध्यम से फर्राटेदार अंग्रेजी बोलना और लिखना सीखें।",
    culturalNotes: "हिन्दी में वाक्य संरचना SOV (कर्ता-कर्म-क्रिया) होती है, जबकि अंग्रेजी में SVO (Subject-Verb-Object) होती है।",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही अंग्रेजी शब्द चुनें।",
        question: "हिन्दी में 'धन्यवाद' के लिए अंग्रेजी में क्या कहते हैं?",
        options: ["Thank you", "Hello", "Please", "Sorry"],
        correctAnswer: "Thank you",
        explanation: "अंग्रेजी में आभार प्रकट करने के लिए 'Thank you' का प्रयोग किया जाता है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "अंग्रेजी बोलचाल की शुरुआत (English Basics)",
        description: "दैनिक बातचीत के लिए आवश्यक अंग्रेजी शब्द और वाक्य।",
        icon: "🇬🇧",
        lessons: [
          {
            title: "अभिवादन और शिष्टाचार (Greetings & Manners)",
            objective: "अंग्रेजी में हैलो, शुक्रिया और बातचीत शुरू करना सीखें।",
            culturalTip: "अंग्रेजी संस्कृति में 'Please' और 'Thank you' का अत्यधिक प्रयोग विनम्रता का प्रतीक है।",
            vocabulary: [
              {
                targetWord: "Hello",
                nativeMeaning: "नमस्ते / हैलो",
                pronunciation: "हैलो",
                partOfSpeech: "अभिवादन",
                exampleTarget: "Hello, nice to meet you.",
                exampleNative: "नमस्ते, आपसे मिलकर खुशी हुई।",
              },
              {
                targetWord: "Thank you",
                nativeMeaning: "धन्यवाद",
                pronunciation: "थैंक यू",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "Thank you for your help.",
                exampleNative: "आपकी सहायता के लिए धन्यवाद।",
              },
            ],
            grammar: {
              title: "वाक्य क्रम का अंतर: SOV बनाम SVO",
              explanation: "हिन्दी में कहते हैं: 'मैं चाय पीता हूँ' (कर्ता + कर्म + क्रिया)। अंग्रेजी में कहते हैं: 'I drink tea' (Subject + Verb + Object).",
              ruleSummary: "Subject + Verb + Object",
              examples: [
                { target: "I eat an apple.", native: "मैं एक सेब खाता हूँ।" },
              ],
              commonMistakes: [
                { incorrect: "I apple eat.", correct: "I eat an apple.", explanation: "अंग्रेजी में क्रिया (eat) कर्म (apple) से पहले आती है।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही अंग्रेजी शब्द चुनें।",
                prompt: "हिन्दी में 'कृपया' के लिए अंग्रेजी में कौन-सा शब्द है?",
                correctAnswer: "Please",
                options: ["Please", "Thank you", "Welcome", "Excuse me"],
                explanation: "'Please' का अर्थ कृपया होता है।",
                hintLevel1: "अनुरोध करने वाला विनम्र शब्द।",
                hintLevel2: "यह शब्द 'P' से शुरू होता है।",
                hintLevel3: "उत्तर: 'Please'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. HINDI -> TAMIL
  {
    nativeCode: "hi",
    targetCode: "ta",
    description: "हिन्दी के माध्यम से समृद्ध और प्राचीन तमिल भाषा सीखें।",
    culturalNotes: "तमिल विश्व की प्राचीनतम जीवित भाषाओं में से एक है। इसकी वाक्य संरचना भी हिन्दी की तरह ही SOV (कर्ता-कर्म-क्रिया) होती है।",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही तमिल अभिवादन चुनें।",
        question: "हिन्दी में 'नमस्ते' के लिए तमिल शब्द कौन-सा है?",
        options: ["வணக்கம் (Vanakkam)", "நன்றி (Nandri)", "ஆம் (Aam)", "இல்லை (Illai)"],
        correctAnswer: "வணக்கம் (Vanakkam)",
        explanation: "तमिल में अभिवादन के लिए 'வணக்கம்' (वणक्कम) कहा जाता है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "तमिल बुनियादी बातचीत (Tamil Essentials)",
        description: "तमिल भाषा के आवश्यक शब्द, अभिवादन और सामान्य वाक्य।",
        icon: "🇮🇳",
        lessons: [
          {
            title: "अभिवादन और शिष्टाचार (Greetings & Courtesy)",
            objective: "तमिल में नमस्कार और धन्यवाद कहना सीखें।",
            culturalTip: "तमिलनाडु में हाथ जोड़कर 'வணக்கம்' (वणक्कम) कहकर अभिवादन किया जाता है।",
            vocabulary: [
              {
                targetWord: "வணக்கம்",
                nativeMeaning: "नमस्ते",
                pronunciation: "वणक्कम",
                transliteration: "Vanakkam",
                partOfSpeech: "अभिवादन",
                exampleTarget: "வணக்கம்! எப்படி இருக்கிறீர்கள்?",
                exampleTransliteration: "Vanakkam! Eppadi irukkireergal?",
                exampleNative: "नमस्ते! आप कैसे हैं?",
              },
              {
                targetWord: "நன்றி",
                nativeMeaning: "धन्यवाद",
                pronunciation: "नन्द्री",
                transliteration: "Nandri",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "மிக்க நன்றி.",
                exampleTransliteration: "Mikka nandri.",
                exampleNative: "बहुत धन्यवाद।",
              },
            ],
            grammar: {
              title: "तमिल सर्वनाम और आदरसूचक प्रयोग",
              explanation: "तमिल में तू के लिए 'नी' (நீ) और आप के लिए 'नींगल' (நீங்கள்) का प्रयोग होता है।",
              ruleSummary: "நீ (तू) | நீங்கள் (आप)",
              examples: [
                { target: "நீங்கள் யார்?", transliteration: "Neengal yaar?", native: "आप कौन हैं?" },
              ],
              commonMistakes: [
                { incorrect: "நீ வாருங்கள்", correct: "நீங்கள் வாருங்கள்", explanation: "बड़ों के साथ आदरपूर्वक 'நீங்கள்' का प्रयोग करें।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही तमिल शब्द चुनें।",
                prompt: "हिन्दी में 'धन्यवाद' के लिए तमिल शब्द क्या है?",
                correctAnswer: "நன்றி",
                options: ["நன்றி", "வணக்கம்", "ஆம்", "இல்லை"],
                explanation: "'நன்றி' (नन्द्री) का अर्थ धन्यवाद होता है।",
                hintLevel1: "आभार प्रकट करने वाला शब्द।",
                hintLevel2: "यह शब्द 'ந' से शुरू होता है।",
                hintLevel3: "उत्तर: 'நன்றி'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. HINDI -> KOREAN
  {
    nativeCode: "hi",
    targetCode: "ko",
    description: "हिन्दी के माध्यम से कोरियाई भाषा सीखें।",
    culturalNotes: "कोरियाई और हिन्दी दोनों में कर्ता-कर्म-क्रिया (SOV) वाक्य क्रम होता है और दोनों में ही बड़ों के लिए आदरसूचक प्रत्ययों का प्रयोग होता है!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही कोरियाई अभिवादन चुनें।",
        question: "हिन्दी में 'नमस्ते' के लिए कोरियाई शब्द क्या है?",
        options: ["안녕하세요 (Annyeonghaseyo)", "감사합니다 (Gamsahamnida)", "죄송합니다 (Joesonghamnida)", "네 (Ne)"],
        correctAnswer: "안녕하세요 (Annyeonghaseyo)",
        explanation: "'안녕하세요' कोरियाई भाषा का सर्वमान्य आदरणीय अभिवादन है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "कोरियाई बुनियादी अभिवादन (Korean Essentials)",
        description: "कोरियाई भाषा में दैनिक अभिवादन और बुनियादी शिष्टाचार।",
        icon: "🇰🇷",
        lessons: [
          {
            title: "अभिवादन और शिष्टाचार (Greetings & Manners)",
            objective: "कोरियाई में हैलो, धन्यवाद और हाँ/ना कहना सीखें।",
            culturalTip: "कोरिया में अभिवादन करते समय सिर झुकाकर सम्मान प्रकट किया जाता है।",
            vocabulary: [
              {
                targetWord: "안녕하세요",
                nativeMeaning: "नमस्ते",
                pronunciation: "आन्न्योंग-हासेयो",
                transliteration: "Annyeonghaseyo",
                partOfSpeech: "अभिवादन",
                exampleTarget: "안녕하세요! 반갑습니다.",
                exampleTransliteration: "Annyeonghaseyo! Bangapsumnida.",
                exampleNative: "नमस्ते! आपसे मिलकर खुशी हुई।",
              },
              {
                targetWord: "감사합니다",
                nativeMeaning: "धन्यवाद",
                pronunciation: "कम्सा-हम्निदा",
                transliteration: "Gamsahamnida",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "도와주셔서 감사합니다.",
                exampleTransliteration: "Dowajusyeoseo gamsahamnida.",
                exampleNative: "मदद के लिए धन्यवाद।",
              },
            ],
            grammar: {
              title: "आदरसूचक क्रिया अंत (-요)",
              explanation: "कोरियाई भाषा में किसी भी क्रिया के अंत में '-यो' (-요) जोड़कर उसे आदरणीय बनाया जाता है (जैसे हिन्दी में 'जी')।",
              ruleSummary: "क्रिया मूल + -아요 / -어요",
              examples: [
                { target: "고마워요", transliteration: "Gomawoyo", native: "धन्यवाद (विनम्र)" },
              ],
              commonMistakes: [
                { incorrect: "안녕", correct: "안녕하세요", explanation: "अजनबियों या बड़ों से केवल '안녕' न कहें, '안녕하세요' कहें।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही कोरियाई शब्द चुनें।",
                prompt: "कोरियाई में 'धन्यवाद' कैसे कहते हैं?",
                correctAnswer: "감사합니다",
                options: ["감사합니다", "안녕하세요", "죄송합니다", "아니요"],
                explanation: "'감사합니다' का अर्थ धन्यवाद होता है।",
                hintLevel1: "आभार प्रकट करने वाला शब्द।",
                hintLevel2: "यह शब्द 'कम्सा' से शुरू होता है।",
                hintLevel3: "उत्तर: '감사합니다'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 6. HINDI -> SPANISH
  {
    nativeCode: "hi",
    targetCode: "es",
    description: "हिन्दी के माध्यम से विश्व प्रसिद्ध स्पैनिश भाषा सीखें।",
    culturalNotes: "स्पैनिश में शब्दों का उच्चारण बिल्कुल वैसा ही होता है जैसा वे लिखे जाते हैं, ठीक देवनागरी लिपि की तरह!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "सही स्पैनिश शब्द चुनें।",
        question: "हिन्दी में 'नमस्ते' के लिए स्पैनिश शब्द कौन-सा है?",
        options: ["¡Hola!", "Gracias", "Por favor", "Adiós"],
        correctAnswer: "¡Hola!",
        explanation: "'¡Hola!' का अर्थ स्पैनिश में नमस्ते या हैलो होता है।",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "स्पैनिश बुनियादी बातचीत (Spanish Essentials)",
        description: "स्पैनिश भाषा में अभिवादन, शिष्टाचार और सामान्य बातचीत।",
        icon: "🇪🇸",
        lessons: [
          {
            title: "अभिवादन और शिष्टाचार (Greetings & Courtesy)",
            objective: "स्पैनिश में हैलो, शुक्रिया और अलविदा कहना सीखें।",
            culturalTip: "स्पैनिश में 'H' अक्षर हमेशा मूक (silent) रहता है, अतः 'Hola' का उच्चारण 'ओला' होता है।",
            vocabulary: [
              {
                targetWord: "Hola",
                nativeMeaning: "नमस्ते / हैलो",
                pronunciation: "ओला",
                partOfSpeech: "अभिवादन",
                exampleTarget: "¡Hola! ¿Cómo estás?",
                exampleNative: "नमस्ते! तुम कैसे हो?",
              },
              {
                targetWord: "Gracias",
                nativeMeaning: "धन्यवाद",
                pronunciation: "ग्रासियास",
                partOfSpeech: "कृतज्ञता",
                exampleTarget: "Muchas gracias.",
                exampleNative: "बहुत-बहुत धन्यवाद।",
              },
            ],
            grammar: {
              title: "मूक वर्ण 'H' का नियम",
              explanation: "स्पैनिश में 'H' का उच्चारण नहीं किया जाता। इसे बिना 'ह' की ध्वनि के पढ़ा जाता है।",
              ruleSummary: "H = मूक (Silent)",
              examples: [
                { target: "Hola", native: "ओला (नमस्ते)" },
              ],
              commonMistakes: [
                { incorrect: "होला बोलना", correct: "ओला बोलना", explanation: "स्पैनिश में H का उच्चारण नहीं होता।" },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "सही स्पैनिश शब्द चुनें।",
                prompt: "स्पैनिश में 'धन्यवाद' के लिए कौन-सा शब्द है?",
                correctAnswer: "Gracias",
                options: ["Gracias", "Hola", "Por favor", "De nada"],
                explanation: "'Gracias' का अर्थ धन्यवाद होता है।",
                hintLevel1: "आभार प्रकट करने वाला शब्द।",
                hintLevel2: "यह शब्द 'G' से शुरू होता है।",
                hintLevel3: "उत्तर: 'Gracias'.",
              },
            ],
          },
        ],
      },
    ],
  },
];
