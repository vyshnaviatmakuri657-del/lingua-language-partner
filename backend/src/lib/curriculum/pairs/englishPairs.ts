import { PairCurriculumData } from "../types";

export const englishNativePairs: PairCurriculumData[] = [
  // 1. ENGLISH -> SPANISH
  {
    nativeCode: "en",
    targetCode: "es",
    description: "Master Spanish through immersive step-by-step instruction in English.",
    culturalNotes: "Spanish is spoken by over 500 million people worldwide. In Spanish, inverted question marks (¿) and exclamation points (¡) are placed at the beginning of sentences to signal tone early.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Spanish greeting.",
        question: "Which of the following means 'Hello' in Spanish?",
        options: ["¡Hola!", "Gracias", "Por favor", "Adiós"],
        correctAnswer: "¡Hola!",
        explanation: "'¡Hola!' is the universal greeting for 'Hello' in Spanish.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "Spanish Essentials & Daily Courtesy",
        description: "Essential greetings, polite phrases, and conversation starters.",
        icon: "🇪🇸",
        lessons: [
          {
            title: "Greetings & Manners (Saludos)",
            objective: "Learn essential greetings and courtesy phrases in Spanish.",
            culturalTip: "The letter 'H' is always completely silent in Spanish. 'Hola' is pronounced 'OH-lah'.",
            vocabulary: [
              {
                targetWord: "Hola",
                nativeMeaning: "Hello / Hi",
                pronunciation: "OH-lah",
                partOfSpeech: "Greeting",
                exampleTarget: "¡Hola! ¿Cómo estás?",
                exampleNative: "Hello! How are you?",
              },
              {
                targetWord: "Gracias",
                nativeMeaning: "Thank you",
                pronunciation: "GRAH-see-ahs",
                partOfSpeech: "Courtesy",
                exampleTarget: "Muchas gracias por tu ayuda.",
                exampleNative: "Thank you very much for your help.",
              },
              {
                targetWord: "Por favor",
                nativeMeaning: "Please",
                pronunciation: "por fah-VOR",
                partOfSpeech: "Courtesy",
                exampleTarget: "Una mesa para dos, por favor.",
                exampleNative: "A table for two, please.",
              },
            ],
            grammar: {
              title: "Gender of Nouns (El vs La)",
              explanation: "In Spanish, nouns are either masculine or feminine. Generally, words ending in -o are masculine (el libro), and words ending in -a are feminine (la mesa).",
              ruleSummary: "el + masculine noun | la + feminine noun",
              examples: [
                { target: "el libro", native: "the book (masculine)" },
                { target: "la casa", native: "the house (feminine)" },
              ],
              commonMistakes: [
                { incorrect: "la libro", correct: "el libro", explanation: "'Libro' ends in -o and is masculine." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Choose the correct Spanish word.",
                prompt: "Which word means 'Thank you' in Spanish?",
                correctAnswer: "Gracias",
                options: ["Gracias", "Hola", "Por favor", "De nada"],
                explanation: "'Gracias' means thank you.",
                hintLevel1: "Think about expressing gratitude.",
                hintLevel2: "The word starts with 'G' and ends with 's'.",
                hintLevel3: "Answer: 'Gracias'.",
              },
              {
                type: "translation",
                instruction: "Translate this word into Spanish.",
                prompt: "Hello",
                correctAnswer: "Hola",
                acceptableAnswers: ["Hola", "¡Hola!"],
                explanation: "'Hello' translates to 'Hola' in Spanish.",
                hintLevel1: "Remember the first letter is silent.",
                hintLevel2: "It starts with an 'H'.",
                hintLevel3: "Answer: 'Hola'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. ENGLISH -> TELUGU
  {
    nativeCode: "en",
    targetCode: "te",
    description: "Learn melodic Telugu step-by-step with clear English explanations.",
    culturalNotes: "Telugu is a major classical language of India with a phonetic circular script. Telugu sentence structure follows Subject-Object-Verb (SOV), whereas English follows Subject-Verb-Object (SVO).",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Telugu greeting.",
        question: "What is the standard respectful greeting for 'Hello' in Telugu?",
        options: ["నమస్కారం (Namaskaram)", "ధన్యవాదాలు (Dhanyavaadalu)", "అవును (Avunu)", "కాదు (Kaadu)"],
        correctAnswer: "నమస్కారం (Namaskaram)",
        explanation: "'నమస్కారం' (Namaskaram) is the standard polite greeting across the Telugu-speaking world.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "Telugu Foundations & Polite Greetings",
        description: "Core greetings, polite expressions, and everyday conversational words.",
        icon: "🇮🇳",
        lessons: [
          {
            title: "Essential Greetings & Politeness",
            objective: "Learn to say Hello, Thank you, Yes, and No in Telugu.",
            culturalTip: "Adding 'గారు' (gaaru) after someone's name shows deep politeness and respect, equivalent to 'Sir/Madam'.",
            vocabulary: [
              {
                targetWord: "నమస్కారం",
                nativeMeaning: "Hello / Greetings",
                pronunciation: "nuh-muh-skah-ruhm",
                transliteration: "Namaskaram",
                partOfSpeech: "Greeting",
                exampleTarget: "నమస్కారం! మీరు ఎలా ఉన్నారు?",
                exampleTransliteration: "Namaskaram! Meeru ela unnaaru?",
                exampleNative: "Hello! How are you?",
              },
              {
                targetWord: "ధన్యవాదాలు",
                nativeMeaning: "Thank you",
                pronunciation: "dhun-yuh-vah-duh-loo",
                transliteration: "Dhanyavaadalu",
                partOfSpeech: "Courtesy",
                exampleTarget: "మీ సహాయానికి ధన్యవాదాలు.",
                exampleTransliteration: "Mee sahaayaaniki dhanyavaadalu.",
                exampleNative: "Thank you for your help.",
              },
              {
                targetWord: "అవును",
                nativeMeaning: "Yes",
                pronunciation: "uh-voo-noo",
                transliteration: "Avunu",
                partOfSpeech: "Affirmation",
                exampleTarget: "అవును, నేను వస్తాను.",
                exampleTransliteration: "Avunu, nenu vasthaanu.",
                exampleNative: "Yes, I will come.",
              },
            ],
            grammar: {
              title: "SOV Sentence Word Order",
              explanation: "Unlike English where the verb precedes the object ('I drink water'), in Telugu the verb comes at the end ('I water drink').",
              ruleSummary: "Subject + Object + Verb",
              examples: [
                { target: "నేను నీరు తాగుతాను.", transliteration: "Nenu neeru thaaguthaanu.", native: "I drink water. (Lit: I water drink)" },
              ],
              commonMistakes: [
                { incorrect: "నేను తాగుతాను నీరు", correct: "నేను నీరు తాగుతాను", explanation: "Telugu places the verb at the very end of the sentence." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Identify the correct Telugu phrase.",
                prompt: "Which word means 'Thank you' in Telugu?",
                correctAnswer: "ధన్యవాదాలు",
                options: ["ధన్యవాదాలు", "నమస్కారం", "అవును", "కాదు"],
                explanation: "'ధన్యవాదాలు' (Dhanyavaadalu) means 'Thank you'.",
                hintLevel1: "A formal phrase expressing gratitude.",
                hintLevel2: "Begins with the 'Dh' sound.",
                hintLevel3: "Answer: 'ధన్యవాదాలు' (Dhanyavaadalu).",
              },
              {
                type: "translation",
                instruction: "Translate into Telugu.",
                prompt: "Hello",
                correctAnswer: "నమస్కారం",
                acceptableAnswers: ["నమస్కారం", "నమస్తే"],
                explanation: "'Hello' translates to 'నమస్కారం' (Namaskaram).",
                hintLevel1: "The traditional respectful Indian greeting.",
                hintLevel2: "Na-ma-ska-ram.",
                hintLevel3: "Answer: 'నమస్కారం'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. ENGLISH -> HINDI
  {
    nativeCode: "en",
    targetCode: "hi",
    description: "Learn spoken and written Hindi through intuitive English guidance.",
    culturalNotes: "Hindi is written in the Devanagari script. In Hindi, verbs conjugate according to gender and number, and sentences follow the SOV (Subject-Object-Verb) structure.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Hindi word.",
        question: "How do you say 'Hello' or 'Greetings' in Hindi?",
        options: ["नमस्ते (Namaste)", "धन्यवाद (Dhanyavaad)", "कृपया (Kripaya)", "अलविदा (Alvida)"],
        correctAnswer: "नमस्ते (Namaste)",
        explanation: "'नमस्ते' (Namaste) is the quintessential Indian greeting.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "Hindi Foundations & Daily Greetings",
        description: "Essential greetings, polite expressions, and sentence basics.",
        icon: "🇮🇳",
        lessons: [
          {
            title: "Greetings & Courtesy (अभिवादन)",
            objective: "Learn to greet and express courtesy in Hindi.",
            culturalTip: "When saying 'नमस्ते' (Namaste), press your palms together near the chest with a slight bow.",
            vocabulary: [
              {
                targetWord: "नमस्ते",
                nativeMeaning: "Hello / Greetings",
                pronunciation: "nuh-muh-stay",
                transliteration: "Namaste",
                partOfSpeech: "Greeting",
                exampleTarget: "नमस्ते! आप कैसे हैं?",
                exampleTransliteration: "Namaste! Aap kaise hain?",
                exampleNative: "Hello! How are you?",
              },
              {
                targetWord: "धन्यवाद",
                nativeMeaning: "Thank you",
                pronunciation: "dhun-yuh-vaad",
                transliteration: "Dhanyavaad",
                partOfSpeech: "Courtesy",
                exampleTarget: "आपकी सहायता के लिए धन्यवाद।",
                exampleTransliteration: "Aapki sahaayata ke liye dhanyavaad.",
                exampleNative: "Thank you for your help.",
              },
              {
                targetWord: "कृपया",
                nativeMeaning: "Please",
                pronunciation: "kri-puh-yaa",
                transliteration: "Kripaya",
                partOfSpeech: "Courtesy",
                exampleTarget: "कृपया बैठिए।",
                exampleTransliteration: "Kripaya baithiye.",
                exampleNative: "Please have a seat.",
              },
            ],
            grammar: {
              title: "SOV Structure & The Verb 'Hona' (To Be)",
              explanation: "Hindi sentences end with the auxiliary verb. For singular 'is', use 'है' (hai); for plural or respectful 'are', use 'हैं' (hain).",
              ruleSummary: "Subject + Object + है / हैं",
              examples: [
                { target: "यह एक किताब है।", transliteration: "Yeh ek kitaab hai.", native: "This is a book." },
              ],
              commonMistakes: [
                { incorrect: "यह है एक किताब", correct: "यह एक किताब है", explanation: "In Hindi, the verb 'है' must come at the end." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Choose the correct Hindi word.",
                prompt: "Which word means 'Thank you' in Hindi?",
                correctAnswer: "धन्यवाद",
                options: ["धन्यवाद", "नमस्ते", "कृपया", "हाँ"],
                explanation: "'धन्यवाद' (Dhanyavaad) means 'Thank you'.",
                hintLevel1: "Expresses appreciation.",
                hintLevel2: "Starts with the 'Dh' letter: ध.",
                hintLevel3: "Answer: 'धन्यवाद'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. ENGLISH -> TAMIL
  {
    nativeCode: "en",
    targetCode: "ta",
    description: "Explore the ancient, rich classical Tamil language with structured English instruction.",
    culturalNotes: "Tamil is one of the world's longest-surviving classical languages, celebrated for over two millennia of literature.",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Tamil greeting.",
        question: "What is the standard Tamil word for 'Hello'?",
        options: ["வணக்கம் (Vanakkam)", "நன்றி (Nandri)", "ஆம் (Aam)", "இல்லை (Illai)"],
        correctAnswer: "வணக்கம் (Vanakkam)",
        explanation: "'வணக்கம்' (Vanakkam) is the traditional greeting in Tamil.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "Tamil Essentials & Daily Phrases",
        description: "Essential greetings, polite vocabulary, and core words.",
        icon: "🇮🇳",
        lessons: [
          {
            title: "Greetings & Polite Words",
            objective: "Learn Hello, Thank you, and how to introduce yourself in Tamil.",
            culturalTip: "Vanakkam is accompanied by folded hands to express honor to the person greeted.",
            vocabulary: [
              {
                targetWord: "வணக்கம்",
                nativeMeaning: "Hello / Greetings",
                pronunciation: "vah-nuhk-kuhm",
                transliteration: "Vanakkam",
                partOfSpeech: "Greeting",
                exampleTarget: "வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?",
                exampleTransliteration: "Vanakkam! Neengal eppadi irukkireergal?",
                exampleNative: "Hello! How are you?",
              },
              {
                targetWord: "நன்றி",
                nativeMeaning: "Thank you",
                pronunciation: "nuhn-dree",
                transliteration: "Nandri",
                partOfSpeech: "Courtesy",
                exampleTarget: "உங்கள் உதவிக்கு மிக்க நன்றி.",
                exampleTransliteration: "Ungal udhavikku mikka nandri.",
                exampleNative: "Thank you very much for your help.",
              },
            ],
            grammar: {
              title: "Tamil Pronouns (Informal vs Respectful)",
              explanation: "Use 'நீ' (nee) for 'you' informally (friends, younger people), and 'நீங்கள்' (neengal) respectfully (elders, strangers).",
              ruleSummary: "நீ (informal) | நீங்கள் (respectful / plural)",
              examples: [
                { target: "நீங்கள் யார்?", transliteration: "Neengal yaar?", native: "Who are you? (Polite)" },
              ],
              commonMistakes: [
                { incorrect: "Using நீ with teachers or elders", correct: "Always use நீங்கள் for respect", explanation: "Tamil values polite pronoun distinction." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Choose the correct Tamil word.",
                prompt: "What is the Tamil word for 'Thank you'?",
                correctAnswer: "நன்றி",
                options: ["நன்றி", "வணக்கம்", "ஆம்", "இல்லை"],
                explanation: "'நன்றி' (Nandri) means 'Thank you'.",
                hintLevel1: "Expresses gratitude.",
                hintLevel2: "Starts with the 'N' sound.",
                hintLevel3: "Answer: 'நன்றி' (Nandri).",
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. ENGLISH -> FRENCH
  {
    nativeCode: "en",
    targetCode: "fr",
    description: "Learn elegant, conversational French with clear English guidance.",
    culturalNotes: "French pronunciation features silent final consonants and liaisons (linking the final sound of one word to the starting vowel of the next).",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct French greeting.",
        question: "How do you say 'Good morning' or 'Hello' in French?",
        options: ["Bonjour", "Merci", "S'il vous plaît", "Au revoir"],
        correctAnswer: "Bonjour",
        explanation: "'Bonjour' is the standard polite daytime greeting in French.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "French Essentials & Daily Life",
        description: "Essential greetings, polite etiquette, and basic grammar.",
        icon: "🇫🇷",
        lessons: [
          {
            title: "Greetings & Manners (Salutations)",
            objective: "Learn to greet people, say please, thank you, and goodbye in French.",
            culturalTip: "Always greet shopkeepers with 'Bonjour Madame/Monsieur' when entering a shop in France.",
            vocabulary: [
              {
                targetWord: "Bonjour",
                nativeMeaning: "Hello / Good morning",
                pronunciation: "bohn-zhoor",
                partOfSpeech: "Greeting",
                exampleTarget: "Bonjour, comment allez-vous ?",
                exampleNative: "Hello, how are you?",
              },
              {
                targetWord: "Merci",
                nativeMeaning: "Thank you",
                pronunciation: "mair-see",
                partOfSpeech: "Courtesy",
                exampleTarget: "Merci beaucoup !",
                exampleNative: "Thank you very much!",
              },
              {
                targetWord: "S'il vous plaît",
                nativeMeaning: "Please (formal)",
                pronunciation: "seel voo pleh",
                partOfSpeech: "Courtesy",
                exampleTarget: "Un café, s'il vous plaît.",
                exampleNative: "A coffee, please.",
              },
            ],
            grammar: {
              title: "Definite Articles: Le, La, L', Les",
              explanation: "Unlike English which only has 'the', French uses 'le' for masculine singular, 'la' for feminine singular, and 'l'' before vowels.",
              ruleSummary: "le (masc) | la (fem) | les (plural)",
              examples: [
                { target: "le livre", native: "the book (masculine)" },
                { target: "la table", native: "the table (feminine)" },
              ],
              commonMistakes: [
                { incorrect: "la garçon", correct: "le garçon", explanation: "'Garçon' (boy) is masculine." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Choose the correct French phrase.",
                prompt: "Which word means 'Thank you' in French?",
                correctAnswer: "Merci",
                options: ["Merci", "Bonjour", "Au revoir", "Oui"],
                explanation: "'Merci' means 'Thank you'.",
                hintLevel1: "A world-famous French courtesy word.",
                hintLevel2: "Starts with the letter 'M'.",
                hintLevel3: "Answer: 'Merci'.",
              },
            ],
          },
        ],
      },
    ],
  },

  // 6. ENGLISH -> KOREAN
  {
    nativeCode: "en",
    targetCode: "ko",
    description: "Learn to read, speak, and write Korean (Hangul) through intuitive English instruction.",
    culturalNotes: "Hangul was created by King Sejong the Great in 1443 to make literacy accessible to all. Its characters visually reflect the shape of the mouth and tongue!",
    placementQuestions: [
      {
        difficulty: "beginner",
        instruction: "Select the correct Korean greeting.",
        question: "How do you say 'Hello' politely in Korean?",
        options: ["안녕하세요 (Annyeonghaseyo)", "감사합니다 (Gamsahamnida)", "죄송합니다 (Joesonghamnida)", "네 (Ne)"],
        correctAnswer: "안녕하세요 (Annyeonghaseyo)",
        explanation: "'안녕하세요' (Annyeonghaseyo) is the universal polite greeting.",
      },
    ],
    modules: [
      {
        category: "basics",
        title: "Korean Essentials & Hangul Basics",
        description: "Essential greetings, polite expressions, and everyday conversational phrases.",
        icon: "🇰🇷",
        lessons: [
          {
            title: "Greetings & Politeness",
            objective: "Learn to greet others and express gratitude in Korean.",
            culturalTip: "Bow slightly from the waist when greeting someone older or in formal situations.",
            vocabulary: [
              {
                targetWord: "안녕하세요",
                nativeMeaning: "Hello / Hi",
                pronunciation: "ahn-nyung-hah-seh-yoh",
                transliteration: "Annyeonghaseyo",
                partOfSpeech: "Greeting",
                exampleTarget: "안녕하세요! 만나서 반갑습니다.",
                exampleTransliteration: "Annyeonghaseyo! Mannaseo bangapsumnida.",
                exampleNative: "Hello! Nice to meet you.",
              },
              {
                targetWord: "감사합니다",
                nativeMeaning: "Thank you",
                pronunciation: "gahm-sah-hahm-nee-dah",
                transliteration: "Gamsahamnida",
                partOfSpeech: "Courtesy",
                exampleTarget: "도와주셔서 감사합니다.",
                exampleTransliteration: "Dowajusyeoseo gamsahamnida.",
                exampleNative: "Thank you for helping me.",
              },
            ],
            grammar: {
              title: "Polite Verb Endings (-요 / -습니다)",
              explanation: "Korean verbs change according to politeness levels. The -요 ending is polite yet friendly, suitable for everyday life.",
              ruleSummary: "Verb Stem + -아요 / -어요 / -여요",
              examples: [
                { target: "고마워요", transliteration: "Gomawoyo", native: "Thank you (polite-casual)" },
              ],
              commonMistakes: [
                { incorrect: "안녕 to elders", correct: "안녕하세요", explanation: "'안녕' is only for close friends or younger peers." },
              ],
            },
            exercises: [
              {
                type: "multiple_choice",
                instruction: "Choose the correct Korean word.",
                prompt: "Which word means 'Thank you' in Korean?",
                correctAnswer: "감사합니다",
                options: ["감사합니다", "안녕하세요", "죄송합니다", "아니요"],
                explanation: "'감사합니다' (Gamsahamnida) means 'Thank you'.",
                hintLevel1: "Expresses gratitude.",
                hintLevel2: "Starts with the 'Gam' block: 감.",
                hintLevel3: "Answer: '감사합니다'.",
              },
            ],
          },
        ],
      },
    ],
  },
];
