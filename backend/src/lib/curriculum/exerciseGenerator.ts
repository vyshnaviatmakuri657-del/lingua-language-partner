import { NativeLanguageCode, TargetLanguageCode } from "../i18n";

export interface PictorialCardOption {
  id: string;
  label: string;
  targetWord: string;
  nativeMeaning: string;
  icon: string;
  transliteration?: string;
  audioText?: string;
}

export interface GeneratedExerciseData {
  orderIndex: number;
  type: "pictorial_identification" | "multiple_choice" | "listening" | "word_order" | "translation";
  instruction: string;
  prompt: string;
  promptTransliteration?: string | null;
  audioText?: string | null;
  correctAnswer: string;
  acceptableAnswers: string[];
  options: any[]; // PictorialCardOption[] or string[]
  explanation: string;
  hintLevel1: string;
  hintLevel2: string;
  hintLevel3: string;
}

const iconKeywords: Array<{ keywords: string[]; icon: string }> = [
  { keywords: ["water", "నీరు", "నీళ్లు", "पानी", "eau", "agua", "물", "தண்ணீர்"], icon: "💧" },
  { keywords: ["tea", "coffee", "కాఫీ", "టీ", "चाय", "कॉफ़ी", "café", "thé", "커피", "తేనీరు"], icon: "☕" },
  { keywords: ["book", "పుస్తకం", "కితాబ్", "किताब", "livre", "libro", "책", "புத்தகம்"], icon: "📚" },
  { keywords: ["food", "rice", "meal", "అన్నం", "భోజనం", "తిండి", "खाना", "चावल", "riz", "arroz", "repas", "comida", "밥", "식사", "உணவு"], icon: "🍚" },
  { keywords: ["hello", "hi", "greeting", "నమస్కారం", "బాగున్నారా", "నమస్తే", "नमस्ते", "bonjour", "hola", "안녕", "வணக்கம்"], icon: "👋" },
  { keywords: ["thank", "ధన్యవాదాలు", "ధన్యవాదం", "కృతజ్ఞత", "धन्यवाद", "merci", "gracias", "감사", "고마", "நன்றி"], icon: "🙏" },
  { keywords: ["sorry", "excuse", "క్షమించండి", "క్షమాపణ", "माफ", "क्षमा", "pardon", "désolé", "disculpe", "perdón", "죄송", "실례", "மன்னிக்கவும்"], icon: "🙇" },
  { keywords: ["subway", "train", "మెట్రో", "రైలు", "ट्रेन", "मेट्रो", "métro", "train", "metro", "tren", "지하철", "기차", "ரயில்"], icon: "🚇" },
  { keywords: ["bus", "బస్సు", "बस", "bus", "autobús", "버스", "பேருந்து"], icon: "🚌" },
  { keywords: ["taxi", "టాక్సీ", "टैक्सी", "taxi", "택시", "டாக்ஸி"], icon: "🚕" },
  { keywords: ["hospital", "doctor", "ఆసుపత్రి", "వైద్యుడు", "अस्पताल", "डॉक्टर", "hôpital", "médecin", "hospital", "médico", "병원", "மருத்துவமனை"], icon: "🏥" },
  { keywords: ["store", "market", "shop", "దుకాణం", "షాపు", "दुकान", "बाजार", "magasin", "tienda", "편의점", "கடை"], icon: "🏪" },
  { keywords: ["money", "price", "card", "cash", "ధర", "డబ్బు", "నగదు", "కార్డు", "मूल्य", "पैसे", "कीमत", "argent", "carte", "dinero", "tarjeta", "얼마", "돈", "카드", "பணம்"], icon: "💳" },
  { keywords: ["time", "hour", "clock", "సమయం", "గంట", "समय", "घंटा", "heure", "temps", "hora", "tiempo", "시간", "시", "நேரம்"], icon: "⏰" },
  { keywords: ["where", "map", "direction", "ఎక్కడ", "దిశ", "मार्ग", "कहाँ", "रास्ता", "où", "dónde", "어디", "길", "எங்கே"], icon: "🗺️" },
  { keywords: ["friend", "స్నేహితుడు", "మిత్రుడు", "दोस्त", "मित्र", "ami", "amigo", "친구", "நண்பர்"], icon: "🤝" },
  { keywords: ["home", "house", "ఇల్లు", "घर", "maison", "casa", "집", "வீடு"], icon: "🏠" },
  { keywords: ["school", "university", "పాఠశాల", "బడి", "स्कूल", "विद्यालय", "école", "escuela", "학교", "பள்ளி"], icon: "🏫" },
  { keywords: ["apple", "fruit", "ఆపిల్", "పండు", "सेब", "फल", "pomme", "fruit", "manzana", "fruta", "사과", "과일", "ஆப்பிள்"], icon: "🍎" },
  { keywords: ["bread", "రొట్టె", "బ్రెడ్", "రోటీ", "ब्रेड", "pain", "pan", "빵", "ரொட்டி"], icon: "🍞" },
  { keywords: ["meat", "మాంసం", "మీట్", "मांस", "viande", "carne", "고기", "இறைச்சி"], icon: "🥩" },
  { keywords: ["delicious", "tasty", "రుచికరమైన", "బాగుంది", "రుచి", "स्वादिष्ट", "délicieux", "delicioso", "맛있", "சுவை"], icon: "😋" },
  { keywords: ["please", "దయచేసి", "कृपया", "s'il vous plaît", "por favor", "부탁", "దయ", "தயவுசெய்து"], icon: "🤲" },
  { keywords: ["yes", "okay", "అవును", "సరే", "హా", "हाँ", "ठीक", "oui", "sí", "네", "ஆம்"], icon: "👍" },
  { keywords: ["no", "not", "కాదు", "వద్దు", "లేదు", "नहीं", "non", "아니요", "இல்லை"], icon: "✋" },
  { keywords: ["no problem", "welcome", "you're welcome", "పర్వాలేదు", "స్వాగతం", "कोई बात नहीं", "de rien", "de nada", "괜찮"], icon: "👌" },
  { keywords: ["restroom", "toilet", "బాత్‌రూమ్", "శౌచాలయం", "शौचालय", "toilettes", "baño", "화장실", "கழிப்பறை"], icon: "🚻" },
  { keywords: ["phone", "call", "ఫోన్", "కాల్", "फोन", "téléphone", "teléfono", "전화", "தொலைபேசி"], icon: "📱" },
  { keywords: ["name", "పేరు", "नाम", "nom", "nombre", "이름", "பெயர்"], icon: "🏷️" },
  { keywords: ["help", "సహాయం", "మదద్", "मदद", "aide", "ayuda", "도움", "உதవి"], icon: "🆘" },
];

export function resolveIcon(targetWord: string, nativeMeaning: string): string {
  const combined = (targetWord + " " + nativeMeaning).toLowerCase();
  for (const entry of iconKeywords) {
    for (const kw of entry.keywords) {
      if (combined.includes(kw.toLowerCase())) {
        return entry.icon;
      }
    }
  }
  // Contextual fallback icons based on index/hashing
  const fallbackIcons = ["🌟", "🎯", "🗣️", "💡", "📘", "✨", "📌"];
  let hash = 0;
  for (let i = 0; i < targetWord.length; i++) {
    hash = (hash + targetWord.charCodeAt(i)) % fallbackIcons.length;
  }
  return fallbackIcons[hash];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cleanTokens(sentence: string): string[] {
  return sentence
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"¿¡]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function generate5ExercisesForLesson({
  vocabularies,
  nativeCode,
  targetCode,
  lessonTitle,
}: {
  vocabularies: Array<{
    targetWord: string;
    nativeMeaning: string;
    pronunciation: string;
    transliteration?: string | null;
    exampleTarget: string;
    exampleTransliteration?: string | null;
    exampleNative: string;
  }>;
  nativeCode: string;
  targetCode: string;
  lessonTitle: string;
}): GeneratedExerciseData[] {
  if (!vocabularies || vocabularies.length === 0) {
    return [];
  }

  const v0 = vocabularies[0];
  const v1 = vocabularies[1] || vocabularies[0];
  const v2 = vocabularies[2] || vocabularies[0];
  const v3 = vocabularies[3] || vocabularies[1] || vocabularies[0];

  const isTe = nativeCode === "te";
  const isHi = nativeCode === "hi";

  const exercises: GeneratedExerciseData[] = [];

  // ==========================================
  // EXERCISE 1: PICTORIAL IDENTIFICATION
  // ==========================================
  const pictorialTarget = v0;
  const rawCards: PictorialCardOption[] = [
    {
      id: "pic_opt_1",
      label: pictorialTarget.targetWord,
      targetWord: pictorialTarget.targetWord,
      nativeMeaning: pictorialTarget.nativeMeaning,
      icon: resolveIcon(pictorialTarget.targetWord, pictorialTarget.nativeMeaning),
      transliteration: pictorialTarget.transliteration || pictorialTarget.pronunciation,
      audioText: pictorialTarget.targetWord,
    },
    {
      id: "pic_opt_2",
      label: v1.targetWord,
      targetWord: v1.targetWord,
      nativeMeaning: v1.nativeMeaning,
      icon: resolveIcon(v1.targetWord, v1.nativeMeaning),
      transliteration: v1.transliteration || v1.pronunciation,
      audioText: v1.targetWord,
    },
    {
      id: "pic_opt_3",
      label: v2.targetWord,
      targetWord: v2.targetWord,
      nativeMeaning: v2.nativeMeaning,
      icon: resolveIcon(v2.targetWord, v2.nativeMeaning),
      transliteration: v2.transliteration || v2.pronunciation,
      audioText: v2.targetWord,
    },
    {
      id: "pic_opt_4",
      label: v3.targetWord,
      targetWord: v3.targetWord,
      nativeMeaning: v3.nativeMeaning,
      icon: resolveIcon(v3.targetWord, v3.nativeMeaning),
      transliteration: v3.transliteration || v3.pronunciation,
      audioText: v3.targetWord,
    },
  ];

  // Ensure unique targetWords among options
  const uniqueCards: PictorialCardOption[] = [];
  const seenWords = new Set<string>();
  for (const c of rawCards) {
    if (!seenWords.has(c.targetWord)) {
      seenWords.add(c.targetWord);
      uniqueCards.push(c);
    }
  }

  const pictorialOptions = shuffleArray(uniqueCards);
  const correctCard = pictorialOptions.find((c) => c.targetWord === pictorialTarget.targetWord) || pictorialOptions[0];

  exercises.push({
    orderIndex: 1,
    type: "pictorial_identification",
    instruction: isTe
      ? `'${pictorialTarget.nativeMeaning}' కి సరిపోయే సరైన చిత్రాన్ని ఎంచుకోండి.`
      : isHi
      ? `'${pictorialTarget.nativeMeaning}' के लिए सही चित्र चुनें।`
      : `Select the matching picture card for '${pictorialTarget.nativeMeaning}'.`,
    prompt: pictorialTarget.nativeMeaning,
    promptTransliteration: null,
    audioText: pictorialTarget.targetWord,
    correctAnswer: pictorialTarget.targetWord,
    acceptableAnswers: [
      pictorialTarget.targetWord,
      correctCard.id,
      correctCard.label,
      cleanTokens(pictorialTarget.targetWord).join(" "),
    ],
    options: pictorialOptions,
    explanation: isTe
      ? `'${pictorialTarget.targetWord}' అంటే '${pictorialTarget.nativeMeaning}'. ఉచ్చారణ: [${pictorialTarget.pronunciation}].`
      : isHi
      ? `'${pictorialTarget.targetWord}' का अर्थ है '${pictorialTarget.nativeMeaning}'। उच्चारण: [${pictorialTarget.pronunciation}]।`
      : `'${pictorialTarget.targetWord}' means '${pictorialTarget.nativeMeaning}'. Pronunciation: [${pictorialTarget.pronunciation}].`,
    hintLevel1: isTe
      ? `సూచన: ఇది '${pictorialTarget.nativeMeaning}' కి సంబంధించిన చిత్రం మరియు పదం.`
      : isHi
      ? `सुझाव: यह '${pictorialTarget.nativeMeaning}' से संबंधित चित्र है।`
      : `Hint: Look for the visual associated with '${pictorialTarget.nativeMeaning}'.`,
    hintLevel2: isTe
      ? `ఉచ్చారణ: [${pictorialTarget.pronunciation}]`
      : isHi
      ? `उच्चारण: [${pictorialTarget.pronunciation}]`
      : `Pronunciation clue: [${pictorialTarget.pronunciation}]`,
    hintLevel3: isTe
      ? `సరైన సమాధానం: '${pictorialTarget.targetWord}'`
      : isHi
      ? `सही उत्तर: '${pictorialTarget.targetWord}'`
      : `Correct card: '${pictorialTarget.targetWord}'`,
  });

  // ==========================================
  // EXERCISE 2: MULTIPLE CHOICE
  // ==========================================
  const mcTarget = v1;
  const rawMcOptions = [mcTarget.targetWord, v0.targetWord, v2.targetWord, v3.targetWord];
  const uniqueMc = Array.from(new Set(rawMcOptions));
  while (uniqueMc.length < 4) {
    uniqueMc.push(`[${uniqueMc.length + 1}]`);
  }
  const mcOptions = shuffleArray(uniqueMc);

  exercises.push({
    orderIndex: 2,
    type: "multiple_choice",
    instruction: isTe
      ? `'${mcTarget.nativeMeaning}' కి సరైన పదాన్ని ఎంచుకోండి.`
      : isHi
      ? `'${mcTarget.nativeMeaning}' के लिए सही शब्द चुनें।`
      : `Choose the correct word for '${mcTarget.nativeMeaning}'.`,
    prompt: mcTarget.nativeMeaning,
    promptTransliteration: null,
    audioText: mcTarget.targetWord,
    correctAnswer: mcTarget.targetWord,
    acceptableAnswers: [mcTarget.targetWord],
    options: mcOptions,
    explanation: isTe
      ? `'${mcTarget.targetWord}' అంటే '${mcTarget.nativeMeaning}'. ఉచ్చారణ: [${mcTarget.pronunciation}].`
      : isHi
      ? `'${mcTarget.targetWord}' का अर्थ है '${mcTarget.nativeMeaning}'। उच्चारण: [${mcTarget.pronunciation}]।`
      : `'${mcTarget.targetWord}' translates to '${mcTarget.nativeMeaning}'. [${mcTarget.pronunciation}].`,
    hintLevel1: isTe
      ? `ఆలోచించండి: ఇది పాఠంలో నేర్చుకున్న ముఖ్యమైన పదం.`
      : isHi
      ? `ध्यान दें: यह इस पाठ का महत्वपूर्ण शब्द है।`
      : `Focus on the core vocabulary taught in this lesson.`,
    hintLevel2: isTe
      ? `ఉచ్చారణ ధ్వని: [${mcTarget.pronunciation}]`
      : isHi
      ? `उच्चारण ध्वनि: [${mcTarget.pronunciation}]`
      : `Pronunciation: [${mcTarget.pronunciation}]`,
    hintLevel3: isTe
      ? `సరైన సమాధానం: '${mcTarget.targetWord}'`
      : isHi
      ? `सही उत्तर: '${mcTarget.targetWord}'`
      : `Correct answer: '${mcTarget.targetWord}'`,
  });

  // ==========================================
  // EXERCISE 3: LISTENING AUDITORY DRILL
  // ==========================================
  const listenTarget = v2;
  const rawListenOptions = [
    listenTarget.nativeMeaning,
    v0.nativeMeaning,
    v1.nativeMeaning,
    v3.nativeMeaning,
  ];
  const uniqueListen = Array.from(new Set(rawListenOptions));
  while (uniqueListen.length < 4) {
    uniqueListen.push(`Option ${uniqueListen.length + 1}`);
  }
  const listenOptions = shuffleArray(uniqueListen);

  exercises.push({
    orderIndex: 3,
    type: "listening",
    instruction: isTe
      ? `క్లాస్ పలికే ధ్వనిని శ్రద్ధగా విని సరైన అర్థాన్ని ఎంచుకోండి.`
      : isHi
      ? `क्लाउस का उच्चारण ध्यान से सुनें और सही अर्थ चुनें।`
      : `Listen carefully to Klaus's voice and select the matching meaning.`,
    prompt: listenTarget.targetWord,
    promptTransliteration: listenTarget.transliteration || listenTarget.pronunciation,
    audioText: listenTarget.targetWord,
    correctAnswer: listenTarget.nativeMeaning,
    acceptableAnswers: [listenTarget.nativeMeaning, listenTarget.targetWord],
    options: listenOptions,
    explanation: isTe
      ? `క్లాస్ ఉచ్చరించిన పదం '${listenTarget.targetWord}' [${listenTarget.pronunciation}]. దీని అర్థం: '${listenTarget.nativeMeaning}'.`
      : isHi
      ? `क्लाउस द्वारा उच्चारित शब्द '${listenTarget.targetWord}' [${listenTarget.pronunciation}] है। इसका अर्थ: '${listenTarget.nativeMeaning}'।`
      : `Klaus pronounced '${listenTarget.targetWord}' [${listenTarget.pronunciation}], meaning '${listenTarget.nativeMeaning}'.`,
    hintLevel1: isTe
      ? `ఆడియో బటన్ పై క్లిక్ చేసి మరోసారి వినండి.`
      : isHi
      ? `ऑडियो बटन दबाकर दोबारा ध्यान से सुनें।`
      : `Click the speaker button to re-listen to Klaus carefully.`,
    hintLevel2: isTe
      ? `ఇది [${listenTarget.pronunciation}] లాగా పలుకుతుంది.`
      : isHi
      ? `यह ध्वनि [${listenTarget.pronunciation}] जैसी है।`
      : `Phonetics: [${listenTarget.pronunciation}]`,
    hintLevel3: isTe
      ? `సరైన సమాధానం: '${listenTarget.nativeMeaning}'`
      : isHi
      ? `सही उत्तर: '${listenTarget.nativeMeaning}'`
      : `Correct answer: '${listenTarget.nativeMeaning}'`,
  });

  // ==========================================
  // EXERCISE 4: WORD ORDER SENTENCE BUILDING
  // ==========================================
  const orderTarget = v0.exampleTarget && v0.exampleNative ? v0 : v1;
  const sentenceText = orderTarget.exampleTarget || `${orderTarget.targetWord} 입니다`;
  const sentenceTokens = cleanTokens(sentenceText);
  // Ensure we have at least 2 tokens
  if (sentenceTokens.length < 2) {
    sentenceTokens.push(v1.targetWord);
  }
  const scrambledTokens = shuffleArray([...sentenceTokens]);
  // Make sure scrambled is not identical to original if > 1 tokens
  if (sentenceTokens.length > 1 && scrambledTokens.join(" ") === sentenceTokens.join(" ")) {
    scrambledTokens.reverse();
  }

  const cleanCorrectSentence = sentenceTokens.join(" ");

  exercises.push({
    orderIndex: 4,
    type: "word_order",
    instruction: isTe
      ? `సరైన క్రమంలో పదాలను అమర్చి వాక్యాన్ని పూర్తి చేయండి.`
      : isHi
      ? `शब्दों को सही क्रम में व्यवस्थित करके वाक्य पूरा करें।`
      : `Arrange the word tiles in the correct grammatical order.`,
    prompt: orderTarget.exampleNative || orderTarget.nativeMeaning,
    promptTransliteration: orderTarget.exampleTransliteration || null,
    audioText: sentenceText,
    correctAnswer: cleanCorrectSentence,
    acceptableAnswers: [
      cleanCorrectSentence,
      cleanTokens(sentenceText).join(" "),
      sentenceText.trim(),
    ],
    options: scrambledTokens,
    explanation: isTe
      ? `సరైన వాక్య క్రమం: '${cleanCorrectSentence}'. అర్థం: ${orderTarget.exampleNative || orderTarget.nativeMeaning}`
      : isHi
      ? `सही वाक्य क्रम: '${cleanCorrectSentence}'। अर्थ: ${orderTarget.exampleNative || orderTarget.nativeMeaning}`
      : `Correct grammatical structure: '${cleanCorrectSentence}'. Meaning: ${orderTarget.exampleNative || orderTarget.nativeMeaning}`,
    hintLevel1: isTe
      ? `వాక్యం మొదట '${sentenceTokens[0]}' తో ప్రారంభమవుతుంది.`
      : isHi
      ? `वाक्य '${sentenceTokens[0]}' से शुरू होता है।`
      : `The sentence starts with '${sentenceTokens[0]}'.`,
    hintLevel2: isTe
      ? `చివరి పదం '${sentenceTokens[sentenceTokens.length - 1]}' ఉండాలి.`
      : isHi
      ? `अंतिम शब्द '${sentenceTokens[sentenceTokens.length - 1]}' होना चाहिए।`
      : `The closing word should be '${sentenceTokens[sentenceTokens.length - 1]}'.`,
    hintLevel3: isTe
      ? `పూర్తి వాక్యం: '${cleanCorrectSentence}'`
      : isHi
      ? `पूरा वाक्य: '${cleanCorrectSentence}'`
      : `Complete sentence: '${cleanCorrectSentence}'`,
  });

  // ==========================================
  // EXERCISE 5: SENTENCE TRANSLATION (PRODUCTION)
  // ==========================================
  const transTarget = v1.exampleTarget && v1.exampleNative ? v1 : v0;
  const transPrompt = transTarget.exampleNative || transTarget.nativeMeaning;
  const transAnswer = transTarget.exampleTarget || transTarget.targetWord;

  exercises.push({
    orderIndex: 5,
    type: "translation",
    instruction: isTe
      ? `ఈ వాక్యాన్ని లక్ష్య భాషలోకి అనువదించండి.`
      : isHi
      ? `इस वाक्य का लक्षित भाषा में अनुवाद करें।`
      : `Translate this sentence into the target language.`,
    prompt: transPrompt,
    promptTransliteration: transTarget.exampleTransliteration || null,
    audioText: transAnswer,
    correctAnswer: transAnswer,
    acceptableAnswers: [
      transAnswer,
      transAnswer.replace(/[.?!]/g, "").trim(),
      cleanTokens(transAnswer).join(" "),
    ],
    options: [],
    explanation: isTe
      ? `'${transPrompt}' కి సరైన అనువాదం: '${transAnswer}'. [${transTarget.pronunciation}]`
      : isHi
      ? `'${transPrompt}' का सही अनुवाद: '${transAnswer}'। [${transTarget.pronunciation}]`
      : `'${transPrompt}' translates accurately to: '${transAnswer}'. [${transTarget.pronunciation}]`,
    hintLevel1: isTe
      ? `ఈ వాక్యంలో '${transTarget.targetWord}' అనే పదాన్ని ఉపయోగించండి.`
      : isHi
      ? `इस वाक्य में '${transTarget.targetWord}' का प्रयोग करें।`
      : `Incorporate the core word '${transTarget.targetWord}'.`,
    hintLevel2: isTe
      ? `ఉచ్చారణ: [${transTarget.pronunciation}]`
      : isHi
      ? `उच्चारण: [${transTarget.pronunciation}]`
      : `Pronunciation clue: [${transTarget.pronunciation}]`,
    hintLevel3: isTe
      ? `సరైన సమాధానం: '${transAnswer}'`
      : isHi
      ? `सही उत्तर: '${transAnswer}'`
      : `Solution: '${transAnswer}'`,
  });

  return exercises;
}
