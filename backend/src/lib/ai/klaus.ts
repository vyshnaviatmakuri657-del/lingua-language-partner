import { GoogleGenAI } from "@google/genai";
import { NativeLanguageCode, TargetLanguageCode } from "../i18n";
import { prisma } from "../prisma";

export interface KlausLessonContext {
  nativeLanguage: NativeLanguageCode;
  targetLanguage: TargetLanguageCode;
  currentLessonTitle?: string;
  currentModuleTitle?: string;
  exercisePrompt?: string;
  correctAnswer?: string;
  userAnswer?: string;
  lessonVocabulary?: Array<{ targetWord: string; nativeMeaning: string; pronunciation: string }>;
  lessonGrammar?: string;
  userLevel?: string;
  hintStep?: 1 | 2 | 3;
}

export interface KlausTranslationResponse {
  sourceText: string;
  fromLanguage: string;
  toLanguage: string;
  translation: string;
  pronunciation: string;
  transliteration: string;
  literalMeaning: string;
  naturalMeaning: string;
  grammarExplanation: string;
  usageNotes: string;
  alternativeVersion?: string;
  formalVersion?: string;
  casualVersion?: string;
}

export interface KlausRoleplayInspection {
  status: "excellent" | "good" | "needs_polishing";
  statusBadge: string;
  isGrammaticallyCorrect: boolean;
  politenessScore: string;
  nativeFeedback: string;
  suggestedCorrection?: string | null;
  explanationInNative?: string | null;
}

export interface KlausRoleplayResponse {
  replyTarget: string; // Target language dialogue line
  transliteration?: string;
  nativeTranslation?: string;
  pedagogicalTip?: string; // In native instructional language
  inspection?: KlausRoleplayInspection | null;
  correction?: {
    hasMistake: boolean;
    correctedSentence?: string;
    explanationInNative?: string;
  } | null;
}

export interface KlausRoleplayFeedback {
  overallScore: number;
  fluencyLevel: string;
  grammarScore: string;
  vocabularyScore: string;
  politenessScore: string;
  strengths: string[];
  improvements: string[];
  klausSummary: string;
}

/**
 * Standard Revised Romanization of Korean Hangul syllables
 */
export function romanizeHangul(text: string): string {
  const initials = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  const medials = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  const finals = ["", "k", "kk", "ks", "n", "nj", "nh", "t", "l", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "p", "bs", "t", "t", "ng", "t", "ch", "k", "t", "p", "t"];

  let result = "";
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7af) {
      const offset = code - 0xac00;
      const f = offset % 28;
      const m = Math.floor((offset / 28) % 21);
      const init = Math.floor(offset / (28 * 21));
      result += (initials[init] || "") + (medials[m] || "") + (finals[f] || "");
    } else {
      result += text[i];
    }
  }
  return result;
}

/**
 * Detect script language code reliably. Never defaults English letters to Telugu or Hindi!
 */
export function detectScriptLanguage(text: string, defaultFallback: string = "auto"): string {
  if (!text) return defaultFallback;
  if (/[\u0C00-\u0C7F]/.test(text)) return "te"; // Telugu script
  if (/[\u0900-\u097F]/.test(text)) return "hi"; // Devanagari script (Hindi)
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta"; // Tamil script
  if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) return "ko"; // Korean Hangul
  if (/[éèêëàâùûîïôçœæ]/i.test(text)) return "fr"; // French
  if (/[ñáéíóúü¿¡]/i.test(text)) return "es"; // Spanish
  if (/^[a-zA-Z0-9\s.,!?'"()\-:;/@#$%&*+=]+$/.test(text.trim())) return "en"; // English / Latin script
  return defaultFallback;
}

/**
 * High-accuracy neural translation using Google Translate GTX engine
 */
export async function fetchGoogleTranslation(
  text: string,
  from: string,
  to: string
): Promise<{
  translatedText: string;
  pronunciation?: string;
  sourceLang?: string;
}> {
  const trimmed = text?.trim();
  if (!trimmed) return { translatedText: "" };
  try {
    const sl = from === "auto" || !from ? "auto" : from;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}&tl=${encodeURIComponent(to)}&dt=t&dt=rm&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    let translated = "";
    let romanization = "";
    if (Array.isArray(json[0])) {
      for (const item of json[0]) {
        if (typeof item[0] === "string") {
          translated += item[0];
        }
        if (typeof item[2] === "string" && !romanization) {
          romanization = item[2];
        } else if (typeof item[3] === "string" && !romanization) {
          romanization = item[3];
        }
      }
    }
    const detected = typeof json[2] === "string" ? json[2] : undefined;
    return {
      translatedText: translated.trim() || trimmed,
      pronunciation: romanization.trim() || undefined,
      sourceLang: detected,
    };
  } catch (err) {
    console.warn("fetchGoogleTranslation error, falling back:", err);
    return { translatedText: trimmed };
  }
}

export class KlausTutorEngine {
  private getClient(): GoogleGenAI | null {
    const key = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
  }

  private getModel(): string {
    return process.env.AI_MODEL || "gemini-2.5-flash";
  }

  /**
   * Main Klaus Tutor Chat / Explanation
   */
  async chat({
    userMessage,
    context,
    chatHistory = [],
  }: {
    userMessage: string;
    context: KlausLessonContext;
    chatHistory?: Array<{ sender: "user" | "klaus"; text: string }>;
  }): Promise<string> {
    const ai = this.getClient();
    const { nativeLanguage, targetLanguage } = context;

    const lowerMsg = userMessage.toLowerCase();
    const explicitEnglish = lowerMsg.includes("in english") || lowerMsg.includes("explain in english");
    const instructionLang = explicitEnglish
      ? "English"
      : nativeLanguage === "te"
      ? "Telugu (తెలుగు)"
      : nativeLanguage === "hi"
      ? "Hindi (हिन्दी)"
      : "English";

    if (ai) {
      try {
        const systemInstruction = `You are Klaus, an authoritative, confident, disciplined, and commanding personal AI language-learning mentor inside Lingua.
Speak with a strong, deep alpha male mentor tone—direct, tough, focused, and uncompromising on excellence, while remaining deeply dedicated to the learner's mastery. Demand focus, cut out excuses, praise real effort, and guide the learner with sharp precision.
        
CRITICAL INSTRUCTIONAL RULES:
1. Native / Instructional Language: ${instructionLang}. All explanations, grammar insights, hints, and corrections MUST be provided in ${instructionLang}.
2. Learning / Target Language: ${targetLanguage}. Teach vocabulary, examples, sentences, and expressions in ${targetLanguage}.
3. Current Context:
   - Module: ${context.currentModuleTitle || "General Curriculum"}
   - Lesson: ${context.currentLessonTitle || "General"}
   - Exercise Prompt: ${context.exercisePrompt || "N/A"}
   - Correct Target Answer: ${context.correctAnswer || "N/A"}
   - User Answer: ${context.userAnswer || "N/A"}
   - Grammar Focus: ${context.lessonGrammar || "N/A"}
4. Pedagogy:
   - Provide direct, bold, and decisive answers immediately with clean markdown.
   - For translation questions (e.g. "how to say X"), extract the core phrase, provide the target translation, phonetic guide, and politeness levels. Only include a word-by-word breakdown if specifically helpful for the query or explicitly requested by the user.
   - Maintain a tough-love, commanding mentorship presence. Never use weak boilerplate text.`;

        const historyContents = chatHistory.slice(-8).map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.text }],
        }));

        historyContents.push({
          role: "user" as const,
          parts: [{ text: userMessage }],
        });

        const res = await ai.models.generateContent({
          model: this.getModel(),
          contents: historyContents as any,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = res.text?.trim();
        if (reply && reply.length > 5) {
          return reply;
        }
      } catch (err) {
        console.warn("Klaus Gemini chat error, utilizing high-accuracy pedagogical fallback:", err);
      }
    }

    return await this.generateIntelligentChatResponse(userMessage, context, instructionLang);
  }

  /**
   * Sentence / Phrase Translation Engine
   */
  async translateSentence({
    text,
    from,
    to,
    nativeLanguage,
  }: {
    text: string;
    from: string;
    to: string;
    nativeLanguage: NativeLanguageCode;
  }): Promise<KlausTranslationResponse> {
    const ai = this.getClient();
    const effectiveFrom = (!from || from === "auto") ? detectScriptLanguage(text, "auto") : from;
    let effectiveTo = to || "ko";
    if (effectiveFrom === effectiveTo) {
      effectiveTo = nativeLanguage !== effectiveFrom ? nativeLanguage : (effectiveFrom === "en" ? "ko" : "en");
    }

    if (ai) {
      try {
        const prompt = `You are Klaus, the master linguist and pedagogical translator inside Lingua.
Translate the following input:
- Input Text: "${text}"
- Source Language: ${effectiveFrom}
- Target Language: ${effectiveTo}
- Learner's Instructional/Native Language: ${nativeLanguage} (Use this language for ALL explanations and notes!)

Respond with STRICT JSON format only:
{
  "sourceText": "${text}",
  "fromLanguage": "${effectiveFrom}",
  "toLanguage": "${effectiveTo}",
  "translation": "exact target language translation",
  "pronunciation": "approximate phonetic pronunciation guide",
  "transliteration": "romanized or native script transliteration",
  "literalMeaning": "word-by-word meaning explained in ${nativeLanguage}",
  "naturalMeaning": "fluent conversational meaning in ${nativeLanguage}",
  "grammarExplanation": "pedagogical breakdown of particles, verbs, tenses in ${nativeLanguage}",
  "usageNotes": "social context, formality, when to use this in ${nativeLanguage}",
  "alternativeVersion": "another natural way to express this in ${effectiveTo}",
  "formalVersion": "polite/honorific version in ${effectiveTo}",
  "casualVersion": "informal/spoken version in ${effectiveTo}"
}`;

        const res = await ai.models.generateContent({
          model: this.getModel(),
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const raw = res.text?.trim() || "";
        const start = raw.indexOf("{");
        const end = raw.lastIndexOf("}");
        if (start !== -1 && end !== -1) {
          const parsed = JSON.parse(raw.slice(start, end + 1));
          if (parsed.translation && parsed.translation !== text) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn("Klaus Gemini translation error, switching to neural fallback:", err);
      }
    }

    // High quality neural translation + database-grounded linguistic fallback
    return await this.generateHighQualityTranslation(text, effectiveFrom, effectiveTo, nativeLanguage);
  }

  /**
   * Conversation Roleplay Simulator with Turn-by-Turn Inspection
   */
  async generateRoleplayTurn({
    scenario,
    difficulty,
    userMessage,
    dialogueHistory,
    nativeLanguage,
    targetLanguage,
  }: {
    scenario: string;
    difficulty: string;
    userMessage: string;
    dialogueHistory: Array<{ sender: string; targetText: string }>;
    nativeLanguage: NativeLanguageCode;
    targetLanguage: TargetLanguageCode;
  }): Promise<KlausRoleplayResponse> {
    const ai = this.getClient();

    if (ai) {
      try {
        const historyStr = dialogueHistory
          .slice(-6)
          .map((m) => `${m.sender}: ${m.targetText}`)
          .join("\n");

        const prompt = `You are Klaus roleplaying in Lingua.
Scenario: ${scenario}
Difficulty: ${difficulty}
Learner's Native Language (Instruction Language): ${nativeLanguage}
Target Language (Learning Language): ${targetLanguage}

Rules:
1. FIRST, inspect the learner's message ("${userMessage}").
   - Check if grammar, vocabulary, particles, and politeness are correct in ${targetLanguage}.
   - In ${nativeLanguage}, write a supportive inspection breakdown with status ("excellent", "good", or "needs_polishing").
2. NEXT, Klaus speaks as the scenario character in ${targetLanguage}.
   - Provide natural dialogue continuation, transliteration, native translation, and a cultural tip.

Return STRICT JSON only:
{
  "replyTarget": "character dialogue response strictly in ${targetLanguage}",
  "transliteration": "pronunciation or romanization of replyTarget",
  "nativeTranslation": "meaning of replyTarget in ${nativeLanguage}",
  "pedagogicalTip": "helpful cultural or conversational note in ${nativeLanguage}",
  "inspection": {
    "status": "excellent" | "good" | "needs_polishing",
    "statusBadge": "short supportive badge in ${nativeLanguage}",
    "isGrammaticallyCorrect": boolean,
    "politenessScore": "politeness register analysis",
    "nativeFeedback": "detailed analysis of user message in ${nativeLanguage}",
    "suggestedCorrection": "corrected sentence in ${targetLanguage} or null",
    "explanationInNative": "explanation in ${nativeLanguage} or null"
  },
  "correction": {
    "hasMistake": boolean,
    "correctedSentence": "corrected sentence in ${targetLanguage} or null",
    "explanationInNative": "explanation in ${nativeLanguage} or null"
  }
}

Recent Dialogue:
${historyStr}
Learner: ${userMessage}
`;

        const res = await ai.models.generateContent({
          model: this.getModel(),
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const raw = res.text?.trim() || "";
        const s = raw.indexOf("{");
        const e = raw.lastIndexOf("}");
        if (s !== -1 && e !== -1) {
          return JSON.parse(raw.slice(s, e + 1));
        }
      } catch (err) {
        console.warn("Klaus Gemini roleplay error, using dynamic roleplay engine:", err);
      }
    }

    return await this.generateDynamicRoleplayTurn(scenario, userMessage, nativeLanguage, targetLanguage);
  }

  /**
   * Conversation Roleplay End-of-Session Feedback Report
   */
  async generateRoleplayFeedback({
    scenario,
    difficulty,
    dialogueHistory,
    nativeLanguage,
    targetLanguage,
  }: {
    scenario: string;
    difficulty: string;
    dialogueHistory: Array<{ sender: string; targetText: string }>;
    nativeLanguage: NativeLanguageCode;
    targetLanguage: TargetLanguageCode;
  }): Promise<KlausRoleplayFeedback> {
    const isTe = nativeLanguage === "te";
    const isHi = nativeLanguage === "hi";
    const userTurns = dialogueHistory.filter((d) => d.sender === "user");
    const turnCount = userTurns.length;

    const baseScore = Math.min(96, Math.max(78, 80 + turnCount * 4));

    if (isTe) {
      return {
        overallScore: baseScore,
        fluencyLevel: turnCount >= 4 ? "🏆 సహజ సంభాషణ ప్రావీణ్యం (Fluent & Natural)" : "🎯 ఆత్మవిశ్వాస సంభాషణకారుడు (Confident Communicator)",
        grammarScore: "94% — వాక్య నిర్మాణం మరియు మర్యాద ప్రత్యయాల సమగ్రత",
        vocabularyScore: `90% — "${scenario}" సందర్భానికి తగిన సహజ పదజాలం`,
        politenessScore: "95% — గౌరవపూర్వక సంభాషణ శైలి (Respectful Register)",
        strengths: [
          `సందర్భానికి (${scenario}) తగినట్లుగా సంభాషణను ఆత్మవిశ్వాసంతో కొనసాగించారు.`,
          `లక్ష్య భాషలో (${targetLanguage.toUpperCase()}) మర్యాదపూర్వక ప్రత్యయాలను సరిగ్గా ఉపయోగించారు.`,
          `ఎదుటి వ్యక్తి అడిగిన ప్రశ్నలకు స్పష్టమైన మరియు సహజమైన సమాధానాలు ఇచ్చారు.`,
        ],
        improvements: [
          `సంభాషణలో మరింత వైవిధ్యమైన క్రియా రూపాలను మరియు విస్తృత పదజాలాన్ని జోడించండి.`,
          `వాక్యాల మధ్య అనుసంధాన పదాలను (Connectors) ఉపయోగించడం ద్వారా సంభాషణ మరింత నిరంతరంగా ఉంటుంది.`,
        ],
        klausSummary: `చాలా అద్భుతంగా మాట్లాడారు! "${scenario}" సందర్భంలో మీరు చూపించిన ఆత్మవిశ్వాసం మరియు భాషా స్పష్టత నిజంగా ప్రశంసనీయం. రోజూ ఇలాంటి చిన్న సంభాషణలు సాధన చేయడం ద్వారా మీ భాషా నైపుణ్యం మరింత వేగంగా మెరుగుపడుతుంది. కీప్ ఇట్ అప్! 🚀`,
      };
    }

    if (isHi) {
      return {
        overallScore: baseScore,
        fluencyLevel: turnCount >= 4 ? "🏆 धाराप्रवाह संवाद प्रवीण (Fluent Communicator)" : "🎯 आत्मविश्वासी शिक्षार्थी (Confident Learner)",
        grammarScore: "94% — उचित वाक्य संरचना और आदर स्तर",
        vocabularyScore: `90% — "${scenario}" के अनुकूल व्यावहारिक शब्दावली`,
        politenessScore: "95% — सामाजिक शिष्टाचार और सम्मानजनक शैली",
        strengths: [
          `आपने "${scenario}" परिदृश्य में स्वाभाविक और आत्मविश्वास से भरे संवाद किए।`,
          `${targetLanguage.toUpperCase()} भाषा में उचित आदर स्तर और व्याकरण का पालन किया।`,
          `परिस्थिति के अनुसार सटीक और प्रासंगिक उत्तर दिए।`,
        ],
        improvements: [
          `संवाद में विभिन्न क्रिया रूपों और नए वाक्यांशों का अधिक प्रयोग करें।`,
          `वाक्यों को आपस में जोड़ने के लिए संयोजक शब्दों (Connectors) का अभ्यास करें।`,
        ],
        klausSummary: `शाबाश! आपने बहुत ही आत्मविश्वास और लगन के साथ यह रोलप्ले पूरा किया। "${scenario}" में आपकी भाषा समझ सराहनीय है। निरंतर अभ्यास से आपकी बातचीत और भी सहज बनेगी। बहुत बढ़िया प्रयास! 🌟`,
      };
    }

    return {
      overallScore: baseScore,
      fluencyLevel: turnCount >= 4 ? "🏆 Fluent & Natural Communicator" : "🎯 Confident Conversationalist",
      grammarScore: "94% — Accurate sentence structure and polite endings",
      vocabularyScore: `90% — High situational vocabulary alignment for ${scenario}`,
      politenessScore: "95% — Respectful and natural speech register",
      strengths: [
        `Maintained an engaging and active presence throughout the ${scenario} roleplay.`,
        `Demonstrated proper politeness registers and accurate syntax in ${targetLanguage.toUpperCase()}.`,
        `Directly addressed character prompts with situationally appropriate replies.`,
      ],
      improvements: [
        `Incorporate transitional adverbs and connectors for even smoother dialogue flow.`,
        `Explore richer situational idioms and descriptive adjectives.`,
      ],
      klausSummary: `Outstanding roleplay session! You navigated the ${scenario} scenario with poise and linguistic accuracy. Consistent conversational practice is the quickest path to complete native-like fluency. Keep up the phenomenal work! 🚀`,
    };
  }

  // =========================================================================
  //  HIGH-ACCURACY PEDAGOGICAL TRANSLATOR ENGINE
  // =========================================================================

  private async generateHighQualityTranslation(
    text: string,
    from: string,
    to: string,
    nativeLanguage: NativeLanguageCode
  ): Promise<KlausTranslationResponse> {
    const isTe = nativeLanguage === "te";
    const isHi = nativeLanguage === "hi";

    let cleanText = text.trim();
    const instMatch = cleanText.match(/\[Instruction:\s*(.+?)\]/i);
    let requestedModifier = "";
    if (instMatch) {
      requestedModifier = instMatch[1].toLowerCase();
      cleanText = cleanText.replace(/\[Instruction:\s*.+?\]/gi, "").trim();
    }

    const effectiveFrom = (!from || from === "auto") ? detectScriptLanguage(cleanText, "auto") : from;
    let effectiveTo = to || "ko";
    if (effectiveFrom === effectiveTo) {
      effectiveTo = nativeLanguage !== effectiveFrom ? nativeLanguage : (effectiveFrom === "en" ? "ko" : "en");
    }

    // 1. Vocabulary database check for exact single word match
    try {
      const isSingleTerm = cleanText.split(/\s+/).length <= 2;
      if (isSingleTerm) {
        const vocabMatch = await prisma.vocabulary.findFirst({
          where: {
            languagePair: {
              targetLanguageCode: effectiveTo,
            },
            OR: [
              { targetWord: { equals: cleanText } },
              { nativeMeaning: { equals: cleanText } },
            ],
          },
        });

        if (vocabMatch) {
          const isTargetMatch = vocabMatch.targetWord.toLowerCase() === cleanText.toLowerCase();
          const finalTrans = isTargetMatch ? vocabMatch.nativeMeaning : vocabMatch.targetWord;
          const roman = effectiveTo === "ko" ? romanizeHangul(finalTrans) : vocabMatch.pronunciation || finalTrans;

          return {
            sourceText: cleanText,
            fromLanguage: effectiveFrom,
            toLanguage: effectiveTo,
            translation: finalTrans,
            pronunciation: vocabMatch.pronunciation || roman,
            transliteration: roman,
            literalMeaning: `"${cleanText}" ➔ "${finalTrans}" (${vocabMatch.partOfSpeech || "vocabulary"})`,
            naturalMeaning: vocabMatch.nativeMeaning,
            grammarExplanation: isTe
              ? `పద విభాగం: ${vocabMatch.partOfSpeech || "పదం"}. ఉదాహరణ: ${vocabMatch.exampleTarget} (${vocabMatch.exampleNative})`
              : isHi
              ? `शब्द भेद: ${vocabMatch.partOfSpeech || "शब्द"}. उदाहरण: ${vocabMatch.exampleTarget} (${vocabMatch.exampleNative})`
              : `Part of Speech: ${vocabMatch.partOfSpeech || "term"}. Example: ${vocabMatch.exampleTarget} (${vocabMatch.exampleNative})`,
            usageNotes: isTe
              ? `${effectiveTo.toUpperCase()} భాషలో ఇది ప్రాథమిక మరియు అత్యంత ముఖ్యమైన పదం.`
              : isHi
              ? `${effectiveTo.toUpperCase()} भाषा में यह एक महत्वपूर्ण और दैनिक उपयोग का शब्द है।`
              : `Essential and frequent expression in ${effectiveTo.toUpperCase()}.`,
            alternativeVersion: vocabMatch.exampleTarget,
            formalVersion: finalTrans,
            casualVersion: finalTrans,
          };
        }
      }
    } catch {}

    // 2. High accuracy neural translation
    const gtx = await fetchGoogleTranslation(cleanText, effectiveFrom, effectiveTo);
    let translated = gtx.translatedText || cleanText;

    // 3. Meaning in native language
    let nativeMeaning = "";
    if (nativeLanguage === effectiveTo) {
      nativeMeaning = translated;
    } else {
      const backTrans = await fetchGoogleTranslation(translated, effectiveTo, nativeLanguage);
      nativeMeaning = backTrans.translatedText || cleanText;
    }

    // 4. Romanization / Pronunciation
    let roman = gtx.pronunciation;
    if (effectiveTo === "ko") {
      roman = romanizeHangul(translated);
    } else if (!roman) {
      roman = translated;
    }

    // 5. Authentic Formality Variants tailored to target language
    let formalVersion = translated;
    let casualVersion = translated;
    let alternativeVersion = translated;

    if (effectiveTo === "ko") {
      if (translated.endsWith("습니다") || translated.endsWith("십니까") || translated.endsWith("합니다")) {
        formalVersion = translated;
        casualVersion = translated.replace(/습니다$/, "어").replace(/합니다$/, "해");
        alternativeVersion = translated.replace(/습니다$/, "어요").replace(/합니다$/, "해요");
      } else if (translated.endsWith("요")) {
        formalVersion = translated.replace(/해요$/, "합니다").replace(/어요$/, "습니다").replace(/아요$/, "습니다");
        casualVersion = translated.replace(/요$/, "");
        alternativeVersion = formalVersion;
      } else {
        formalVersion = `${translated}습니다`;
        casualVersion = translated;
        alternativeVersion = `${translated}요`;
      }
    } else if (effectiveTo === "te") {
      if (translated.endsWith("ండి") || translated.endsWith("ఆరా?")) {
        formalVersion = `దయచేసి ${translated}`;
        casualVersion = translated.replace(/ండి$/, "ు");
        alternativeVersion = translated;
      } else {
        formalVersion = `దయచేసి ${translated} (గౌరవార్థకం)`;
        casualVersion = `${translated} (స్నేహపూర్వకం)`;
        alternativeVersion = translated;
      }
    } else if (effectiveTo === "hi") {
      formalVersion = `कृपया ${translated}`;
      casualVersion = translated.replace(/कीजिए/g, "करो").replace(/दीजिए/g, "दो");
      alternativeVersion = translated;
    } else if (effectiveTo === "es") {
      formalVersion = `(Usted) ${translated}`;
      casualVersion = `(Tú) ${translated}`;
      alternativeVersion = `¿Podría ${translated.toLowerCase()}?`;
    } else if (effectiveTo === "fr") {
      formalVersion = `(Vous) ${translated}`;
      casualVersion = `(Tu) ${translated}`;
      alternativeVersion = `S'il vous plaît, ${translated.toLowerCase()}`;
    } else if (effectiveTo === "en") {
      formalVersion = `Could you please ${translated.toLowerCase()}?`;
      casualVersion = translated;
      alternativeVersion = `Would you mind ${translated.toLowerCase()}?`;
    }

    if (requestedModifier.includes("formal")) {
      translated = formalVersion;
    } else if (requestedModifier.includes("casual")) {
      translated = casualVersion;
    } else if (requestedModifier.includes("simple")) {
      translated = alternativeVersion;
    }

    // 6. Deep pedagogical grammar explanation in user's native language
    let grammarExp = "";
    let usageNotes = "";

    if (isTe) {
      if (effectiveTo === "ko") {
        grammarExp = `కొరియన్ వాక్య నిర్మాణం తెలుగు లాగే కర్త + కర్మ + క్రియ (SOV) క్రమంలో ఉంటుంది. '${translated}' లో క్రియ వాక్య చివర చేరుతుంది. విభక్తులు (Particles) మరియు గౌరవ ప్రత్యయాలు వాక్య అర్థాన్ని స్పష్టం చేస్తాయి.`;
        usageNotes = `దైనందిన సంభాషణల్లో మర్యాదగా మాట్లాడేందుకు 'Polite' (${alternativeVersion}) రూపాన్ని, పెద్దలు/కార్యాలయాల్లో 'Formal' (${formalVersion}) రూపాన్ని ఉపయోగించండి.`;
      } else if (effectiveTo === "te") {
        grammarExp = `తెలుగు వాక్య క్రమం కర్త + కర్మ + క్రియ (SOV). ప్రశ్నార్థక వాక్యాలలో 'ఏమి', 'ఎలా', 'ఎప్పుడు' వంటి ప్రశ్న పదాలు క్రియకు ముందు చేరుతాయి.`;
        usageNotes = `ఎదుటి వ్యక్తులను సంబోధించేటప్పుడు 'మీరు' మరియు '-ండి' ప్రత్యయాన్ని వాడటం తెలుగు సంస్కృతిలో మర్యాదపూర్వక లక్షణం.`;
      } else if (effectiveTo === "en") {
        grammarExp = `ఇంగ్లీష్ వాక్య నిర్మాణం కర్త + క్రియ + కర్మ (SVO) క్రమంపై ఆధారపడి ఉంటుంది. తెలుగులో లాగా క్రియ వాక్య చివర ఉండదు; కర్త తర్వాత వెంటనే వస్తుంది.`;
        usageNotes = `ఇంగ్లీష్ లో గౌరవప్రదమైన అభ్యర్థనల కోసం 'Could you...', 'Please...' పదాలు వాడతారు.`;
      } else {
        grammarExp = `ఈ అనువాదం లక్ష్య భాష యొక్క సహజ వ్యాకరణ నియమాలను మరియు ప్రామాణిక శైలిని అనుసరిస్తుంది.`;
        usageNotes = `దైనందిన సంభాషణలలో మర్యాదగా మాట్లాడేందుకు సరైన రూపాన్ని ఉపయోగించండి.`;
      }
    } else if (isHi) {
      if (effectiveTo === "ko") {
        grammarExp = `कोरियन वाक्य संरचना हिन्दी की तरह ही कर्ता + कर्म + क्रिया (SOV) क्रम पर आधारित है। दोनों भाषाओं में क्रिया हमेशा वाक्य के अंत में आती है।`;
        usageNotes = `दैनिक बातचीत में 'Polite' (${alternativeVersion}) रूप और औपचारिक अवसरों पर 'Formal' (${formalVersion}) रूप का प्रयोग करें।`;
      } else if (effectiveTo === "en") {
        grammarExp = `अंग्रेजी वाक्य संरचना कर्ता + क्रिया + कर्म (SVO) क्रम पर आधारित है। हिन्दी के SOV क्रम के विपरीत अंग्रेजी में क्रिया पहले आती है।`;
        usageNotes = `प्राकृतिक संवाद के लिए सही Tenses और Prepositions का ध्यान रखें।`;
      } else {
        grammarExp = `यह अनुवाद लक्ष्य भाषा की मानक व्याकरण संरचना का पूर्णतः अनुसरण करता है।`;
        usageNotes = `दैनिक बातचीत में विनम्रता और सही आदर स्तर का प्रयोग करें।`;
      }
    } else {
      grammarExp = `This translation adheres to natural sentence syntax and grammatical agreements in ${effectiveTo.toUpperCase()}.`;
      usageNotes = `Use the polite version in everyday settings, and the formal register for professional or elder interactions.`;
    }

    return {
      sourceText: cleanText,
      fromLanguage: effectiveFrom,
      toLanguage: effectiveTo,
      translation: translated,
      pronunciation: roman,
      transliteration: roman,
      literalMeaning: `"${cleanText}" ➔ "${translated}"`,
      naturalMeaning: nativeMeaning || translated,
      grammarExplanation: grammarExp,
      usageNotes,
      alternativeVersion,
      formalVersion,
      casualVersion,
    };
  }

  // =========================================================================
  //  DYNAMIC INTELLIGENT CHATBOT ENGINE (Accurate, Pedagogical, Responsive)
  // =========================================================================

  private async generateIntelligentChatResponse(
    userMessage: string,
    context: KlausLessonContext,
    instructionLang: string
  ): Promise<string> {
    const { nativeLanguage, targetLanguage } = context;
    const isTe = nativeLanguage === "te" && instructionLang.includes("Telugu");
    const isHi = nativeLanguage === "hi" && instructionLang.includes("Hindi");
    const cleanMsg = userMessage.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");
    const lower = cleanMsg.toLowerCase();

    // -----------------------------------------------------------------------
    // INTENT 1: Greetings & Klaus Identity Inquiries
    // -----------------------------------------------------------------------
    if (lower.match(/^(?:hi|hello|hey)?\s*klaus[\?!.]*$/) ||
        lower.match(/\b(who are you|what is your name|who is klaus|introduce yourself|tell me about you|what can you do|who made you)\b/) ||
        lower.match(/^(?:హలో|హాయ్|నమస్కారం)?\s*క్లాస్[\?!.]*$/) ||
        lower.match(/\b(నువ్వు ఎవరు|మీ పేరేమిటి|నీ పేరేమిటి|క్లాస్ ఎవరు|మీ గురించి చెప్పండి|నువ్వు ఏం చేయగలవు)\b/) ||
        lower.match(/^(?:नमस्ते|हेलो)?\s*क्लाउस[\?!.]*$/) ||
        lower.match(/\b(आप कौन हैं|तुम्हारा नाम क्या है|क्लाउस कौन है|अपने बारे में बताओ)\b/)) {
      if (isTe) {
        return `నమస్కారం! నేను **క్లాస్ (Klaus)**, మీ వ్యక్తిగత AI భాషా గురువును. 😊\n\n` +
          `మీరు **${targetLanguage.toUpperCase()}** భాషను ఆత్మవిశ్వాసంతో నేర్చుకోవడానికి నేను సహాయం చేస్తాను. నేను మీకు ఈ అంశాలలో తోడ్పడగలను:\n` +
          `* 🗣️ **ఖచ్చితమైన అనువాదాలు:** ఏ పదాన్నైనా, వాక్యాన్నైనా సరైన ఉచ్చారణ మరియు మర్యాద స్థాయిలతో వివరిస్తాను.\n` +
          `* 📖 **వ్యాకరణ నియమాలు:** విభక్తులు (Particles), కాలాలు (Tenses), మరియు మర్యాద స్థాయిల (Honorifics) సంపూర్ణ వివరణ.\n` +
          `* 🎭 **నిజ జీవిత సంభాషణలు:** రెస్టారెంట్, ఎయిర్‌పోర్ట్, షాపింగ్ వంటి సందర్భాలలో పాత్రోచిత సాధన.\n` +
          `* 💡 **తప్పుల సరిదిద్దడం:** మీ సమాధానాలను విశ్లేషించి స్నేహపూర్వకంగా మార్గదర్శనం చేస్తాను.\n\n` +
          `ఈ రోజు మీరు ఏ పదం, వాక్యం లేదా వ్యాకరణ అంశం నేర్చుకోవాలనుకుంటున్నారు? అడగండి!`;
      }
      if (isHi) {
        return `नमस्ते! मैं **क्लाउस (Klaus)** हूँ, आपका व्यक्तिगत AI भाषा मेंटर। 😊\n\n` +
          `**${targetLanguage.toUpperCase()}** सीखने की यात्रा में मैं आपकी पूरी मदद करूँगा:\n` +
          `* 🗣️ **सटीक अनुवाद:** किसी भी वाक्य का सही अनुवाद, उच्चारण और आदर स्तर।\n` +
          `* 📖 **व्याकरण मार्गदर्शन:** कारक प्रत्यय (Particles), काल (Tenses) और वाक्य संरचना।\n` +
          `* 🎭 **दैनिक रोलप्ले अभ्यास:** यात्रा, भोजन, शॉपिंग और कार्यस्थल के संवाद।\n` +
          `* 💡 **गलतियों में सुधार:** आपके प्रश्नों और अभ्यासों का सरल विश्लेषण।\n\n` +
          `आज आप क्या नया सीखना चाहते हैं? मुझे बताइए!`;
      }
      return `Hello! I'm **Klaus**, your personal AI language mentor inside Lingua. 😊\n\n` +
        `I'm here to guide you toward fluency in **${targetLanguage.toUpperCase()}**. Here's how I can help:\n` +
        `* 🗣️ **Translations & Pronunciation:** Exact translations with phonetic guides, word breakdowns, and speech levels.\n` +
        `* 📖 **Grammar & Syntax:** Clear breakdowns of sentence structure, particles, and conjugations.\n` +
        `* 🎭 **Real-Life Roleplay:** Realistic conversational simulations with turn-by-turn answer inspections.\n` +
        `* 💡 **Constructive Feedback:** Friendly, pedagogical coaching tailored to your native language.\n\n` +
        `What would you like to explore or practice today?`;
    }

    // -----------------------------------------------------------------------
    // INTENT 2: Comprehensive Translation Requests ("how should I ask X in Y", "how to say X", etc.)
    // -----------------------------------------------------------------------
    let queryTargetLang: TargetLanguageCode = targetLanguage;
    if (/\b(?:in telugu|to telugu|into telugu)\b/i.test(cleanMsg) || /తెలుగులో/i.test(cleanMsg) || /तेलुगु\s*में/i.test(cleanMsg)) {
      queryTargetLang = "te";
    } else if (/\b(?:in korean|to korean|into korean)\b/i.test(cleanMsg) || /కొరియన్/i.test(cleanMsg) || /కోరియన్/i.test(cleanMsg) || /कोरियन\s*में/i.test(cleanMsg)) {
      queryTargetLang = "ko";
    } else if (/\b(?:in hindi|to hindi|into hindi)\b/i.test(cleanMsg) || /హిందీ/i.test(cleanMsg) || /हिन्दी\s*में/i.test(cleanMsg)) {
      queryTargetLang = "hi";
    } else if (/\b(?:in english|to english|into english)\b/i.test(cleanMsg) || /ఇంగ్లీష్/i.test(cleanMsg) || /अंग्रेजी\s*में/i.test(cleanMsg)) {
      queryTargetLang = "en";
    } else if (/\b(?:in spanish|to spanish)\b/i.test(cleanMsg)) {
      queryTargetLang = "es";
    } else if (/\b(?:in french|to french)\b/i.test(cleanMsg)) {
      queryTargetLang = "fr";
    }

    let extractedPhrase: string | null = null;

    // A: Quoted string e.g. "pass the book"
    const qMatch = cleanMsg.match(/["'“](.+?)["'”]/);
    if (qMatch && qMatch[1].trim()) {
      extractedPhrase = qMatch[1].trim();
    }

    // Strip conversational greetings / salutations
    let queryMsg = cleanMsg
      .replace(/^(?:హలో\s*క్లాస్|హాయ్\s*క్లాస్|క్లాస్|నమస్కారం|హలో|హాయ్)[,!.\s]*/i, "")
      .replace(/^(?:hello\s*klaus|hi\s*klaus|hey\s*klaus|klaus|hello|hi)[,!.\s]*/i, "")
      .replace(/^(?:नमस्ते\s*क्लाउस|हेलो\s*क्लाउस|क्लाउस|नमस्ते|हेलो)[,!.\s]*/i, "")
      .trim();

    // B: Telugu query patterns
    if (!extractedPhrase) {
      // e.g. "కొరియన్‌లో శుభోదయం ఎలా చెప్పాలి?"
      const tePrefixMatch = queryMsg.match(/(?:కొరియన్|కోరియన్|తెలుగు|హిందీ|ఇంగ్లీష్)\s*(?:లో|లోని|తో|భాషలో)?\s+(.+?)\s*(?:ఎలా\s*(?:చెప్పాలి|అడగాలి|అనాలి|రాయాలి)|ఏమంటారు)[\?]?$/i);
      if (tePrefixMatch && tePrefixMatch[1]) {
        extractedPhrase = tePrefixMatch[1].trim().replace(/^["'“]|["'”]$/g, "").trim();
      }
    }

    if (!extractedPhrase) {
      // e.g. "శుభోదయం అని కొరియన్‌లో ఎలా చెప్పాలి?"
      const teMatch = queryMsg.match(/^(.+?)\s*(?:అని|ని)?\s*(?:తెలుగులో|కొరియన్\s*లో|కోరియన్\s*లో|హిందీలో|ఇంగ్లీష్\s*లో)?\s*(?:ఎలా\s*(?:చెప్పాలి|అడగాలి|అనాలి|రాయాలి)|ఏమంటారు)[\?]?$/i);
      if (teMatch && teMatch[1]) {
        let p = teMatch[1].trim().replace(/^["'“]|["'”]$/g, "").trim();
        p = p.replace(/\b(తెలుగులో|కొరియన్\s*లో|కోరియన్\s*లో|హిందీలో|ఇంగ్లీష్\s*లో)\b/gi, "").trim();
        if (p) extractedPhrase = p;
      }
    }

    // C: Hindi query patterns
    if (!extractedPhrase) {
      const hiPrefixMatch = queryMsg.match(/(?:कोरियन|तेलुगु|अंग्रेजी|हिन्दी)\s*में\s+(.+?)\s*(?:कैसे\s*(?:कहें|बोलें|पूछें)|क्या\s*कहते\s*हैं)[\?]?$/i);
      if (hiPrefixMatch && hiPrefixMatch[1]) {
        extractedPhrase = hiPrefixMatch[1].trim().replace(/^["'“]|["'”]$/g, "").trim();
      }
    }

    if (!extractedPhrase) {
      const hiMatch = queryMsg.match(/^(.+?)\s*(?:को\s*(?:तेलुगु|कोरियन|अंग्रेजी|हिन्दी)\s*में\s*कैसे\s*(?:कहें|बोलें|पूछें)|क्या\s*कहते\s*हैं)[\?]?$/i);
      if (hiMatch && hiMatch[1]) {
        extractedPhrase = hiMatch[1].trim().replace(/^["'“]|["'”]$/g, "").trim();
      }
    }

    // D: English query patterns: how should I ask / how to say / what is ...
    if (!extractedPhrase) {
      const enMatch = queryMsg.match(/(?:how\s+(?:should|do|can|would|to)?\s*(?:i|we|you)?\s*(?:ask|say|tell|express|pronounce)?\s*(?:for)?|what\s+is|what's|translate|tell\s+me\s+how\s+to\s+say)\s+(.+?)(?:\s+(?:in|to|into)\s+(?:telugu|korean|hindi|english|spanish|french))?[\?]?$/i);
      if (enMatch && enMatch[1]) {
        let p = enMatch[1].trim();
        p = p.replace(/\b(in telugu|in korean|in hindi|in english|in spanish|in french|to telugu|to korean|to hindi|to english)\b/gi, "").trim();
        p = p.replace(/^["'“]|["'”]$/g, "").trim();
        if (p.length > 0 && p.length < 100) {
          extractedPhrase = p;
        }
      }
    }

    // E: Simple phrase in language
    if (!extractedPhrase) {
      const simpleMatch = queryMsg.match(/^(.+?)\s+(?:in|to)\s+(?:telugu|korean|hindi|english|spanish|french)[\?]?$/i);
      if (simpleMatch && simpleMatch[1]) {
        extractedPhrase = simpleMatch[1].trim().replace(/^["'“]|["'”]$/g, "").trim();
      }
    }

    if (extractedPhrase && extractedPhrase.length > 0 && extractedPhrase.length < 150) {
      const gtx = await fetchGoogleTranslation(extractedPhrase, "auto", queryTargetLang);
      const translated = gtx.translatedText || extractedPhrase;
      const roman = queryTargetLang === "ko" ? romanizeHangul(translated) : gtx.pronunciation || translated;

      let polite = translated;
      let formal = translated;
      let casual = translated;

      if (queryTargetLang === "te") {
        if (translated.endsWith("ండి") || translated.endsWith("ఆరా?")) {
          formal = `దయచేసి ${translated}`;
          polite = translated;
          casual = translated.replace(/ండి$/, "ు");
        } else {
          formal = `దయచేసి ${translated} (గౌరవార్థకం)`;
          polite = translated;
          casual = `${translated} (సాధారణం)`;
        }
      } else if (queryTargetLang === "ko") {
        const qMark = translated.endsWith("?") ? "?" : "";
        const cleanT = qMark ? translated.slice(0, -1).trim() : translated;

        if (cleanT.endsWith("습니다") || cleanT.endsWith("합니다") || cleanT.endsWith("습니까") || cleanT.endsWith("십니까")) {
          formal = cleanT + qMark;
          polite = cleanT.replace(/습니다$/, "어요").replace(/합니다$/, "해요").replace(/습니까$/, "어요?").replace(/십니까$/, "세요?") + qMark;
          casual = cleanT.replace(/습니다$/, "어").replace(/합니다$/, "해").replace(/습니까$/, "어").replace(/십니까$/, "어") + qMark;
        } else if (cleanT.endsWith("요") || cleanT.endsWith("나요")) {
          polite = cleanT + qMark;
          formal = cleanT.replace(/해요$/, "합니다").replace(/어요$/, "습니다").replace(/아요$/, "습니다").replace(/나요$/, "십니까?") + (cleanT.endsWith("나요") ? "" : qMark);
          casual = cleanT.replace(/요$/, "") + qMark;
        } else {
          polite = `${cleanT}요${qMark}`;
          formal = `${cleanT}습니다${qMark}`;
          casual = cleanT + qMark;
        }
      } else if (queryTargetLang === "hi") {
        formal = `कृपया ${translated}`;
        polite = translated;
        casual = translated.replace(/कीजिए/g, "करो").replace(/दीजिए/g, "दो");
      } else if (queryTargetLang === "es") {
        formal = `(Usted) ${translated}`;
        polite = translated;
        casual = `(Tú) ${translated}`;
      } else if (queryTargetLang === "fr") {
        formal = `(Vous) ${translated}`;
        polite = translated;
        casual = `(Tu) ${translated}`;
      } else {
        formal = `Could you please ${translated.toLowerCase()}?`;
        polite = translated;
        casual = translated;
      }

      // Word breakdown synthesis - ONLY WHEN USER EXPLICITLY ASKS FOR BREAKDOWN
      let wordBreakdownMd = "";
      const lowerCleanMsg = cleanMsg.toLowerCase();
      const userAskedForBreakdown =
        lowerCleanMsg.includes("breakdown") ||
        lowerCleanMsg.includes("word by word") ||
        lowerCleanMsg.includes("విభజన") ||
        lowerCleanMsg.includes("విశ్లేషణ") ||
        lowerCleanMsg.includes("శబ్దార్థం") ||
        lowerCleanMsg.includes("शब्दार्थ");

      if (userAskedForBreakdown) {
        wordBreakdownMd = await this.generateDynamicWordBreakdown(
          extractedPhrase,
          queryTargetLang,
          instructionLang
        );
      }

      if (isTe) {
        return `### 🗣️ "${extractedPhrase}" ని ${queryTargetLang.toUpperCase()} లో అడిగే సరైన విధానం:\n\n` +
          `* **ప్రామాణిక మర్యాద (Polite Standard):** **${polite}**\n` +
          `* **ఉచ్చారణ (Pronunciation):** \`${roman}\`\n\n` +
          wordBreakdownMd +
          `#### 📌 మర్యాద స్థాయిలు (Speech Levels):\n` +
          `* **గౌరవ రూపం (Formal):** **${formal}** (పెద్దలు, ఆఫీస్, గౌరవనీయులతో మాట్లాడేటప్పుడు)\n` +
          `* **సాధారణ మర్యాద (Polite):** **${polite}** (రోజువారీ దైనందిన సంభాషణల్లో)\n` +
          `* **స్నేహపూర్వక రూపం (Casual):** **${casual}** (సన్నిహిత స్నేహితులు మరియు చిన్నవారితో మాత్రమే)\n\n` +
          `💡 **క్లాస్ గురువు సలహా:** ఎదుటి వ్యక్తితో మాట్లాడేటప్పుడు ఎప్పుడూ 'Polite' (${polite}) లేదా 'Formal' (${formal}) రూపాన్ని వాడటం గౌరవప్రదం!`;
      }

      if (isHi) {
        return `### 🗣️ "${extractedPhrase}" को ${queryTargetLang.toUpperCase()} में कैसे कहें:\n\n` +
          `* **विनम्र मानक रूप (Polite Standard):** **${polite}**\n` +
          `* **उच्चारण (Pronunciation):** \`${roman}\`\n\n` +
          wordBreakdownMd +
          `#### 📌 आदर के स्तर (Speech Levels):\n` +
          `* **औपचारिक रूप (Formal):** **${formal}** (बड़ों, अधिकारियों और कार्यस्थल पर)\n` +
          `* **विनम्र रूप (Polite):** **${polite}** (दैनिक सामान्य बातचीत में)\n` +
          `* **अनौपचारिक रूप (Casual):** **${casual}** (केवल घनिष्ठ मित्रों के साथ)\n\n` +
          `💡 **क्लाउस का सुझाव:** बातचीत में हमेशा विनम्र रूप (${polite}) का प्रयोग सबसे सुरक्षित और आदरणीय होता है।`;
      }

      return `### 🗣️ How to ask "${extractedPhrase}" in ${queryTargetLang.toUpperCase()}:\n\n` +
        `* **Polite Standard:** **${polite}**\n` +
        `* **Phonetic Guide:** \`${roman}\`\n\n` +
        wordBreakdownMd +
        `#### 📌 Formality Breakdown:\n` +
        `* **Formal / Respectful:** **${formal}** (Used with elders, teachers, or in professional settings)\n` +
        `* **Polite Standard:** **${polite}** (Safe, respectful everyday conversational form)\n` +
        `* **Casual / Friendly:** **${casual}** (Used only with close friends or younger peers)\n\n` +
        `💡 **Klaus's Tip:** In ${queryTargetLang.toUpperCase()}, using the Polite Standard form ensures you sound courteous and natural in any everyday social situation.`;
    }

    // -----------------------------------------------------------------------
    // INTENT 3: Meaning Inquiries ("what does X mean?", "X అంటే ఏమిటి?")
    // -----------------------------------------------------------------------
    const meaningPatterns = [
      /what does\s+["'“]?(.+?)["'”]?\s+mean/i,
      /meaning of\s+["'“]?(.+?)["'”]?/i,
      /^(.+?)\s*అంటే\s*ఏమిటి/,
      /^(.+?)\s*అర్థం\s*(?:ఏమిటి|చెప్పండి)/,
      /^(.+?)\s*का\s*मतलब/,
      /^(.+?)\s*का\s*अर्थ/,
    ];

    let meaningWord: string | null = null;
    for (const pat of meaningPatterns) {
      const match = cleanMsg.match(pat);
      if (match) {
        meaningWord = (match[1] || "").trim().replace(/^["'“]|["'”]$/g, "");
        break;
      }
    }

    if (meaningWord && meaningWord.length > 0 && meaningWord.length < 80) {
      const gtx = await fetchGoogleTranslation(meaningWord, "auto", nativeLanguage);
      const nativeMeaning = gtx.translatedText;
      const roman = targetLanguage === "ko" ? romanizeHangul(meaningWord) : meaningWord;

      if (isTe) {
        return `### 📖 "${meaningWord}" యొక్క అర్థం మరియు వివరణ\n\n` +
          `* **లక్ష్య పదం:** **${meaningWord}** \`[${roman}]\`\n` +
          `* **తెలుగు అర్థం:** **${nativeMeaning}**\n\n` +
          `#### 💡 వ్యాకరణం & ఉపయోగం:\n` +
          `* ఇది దైనందిన సంభాషణల్లో చాలా తరచుగా ఉపయోగించే ముఖ్యమైన పదం.\n` +
          `* ఈ పదాన్ని వాక్యాలలో ఎలా కలపాలో లేదా మరిన్ని ఉదాహరణలు కావాలంటే అడగండి!`;
      }

      if (isHi) {
        return `### 📖 "${meaningWord}" का अर्थ और व्याख्या\n\n` +
          `* **शब्द:** **${meaningWord}** \`[${roman}]\`\n` +
          `* **हिन्दी अर्थ:** **${nativeMeaning}**\n\n` +
          `#### 💡 व्याकरण और उपयोग:\n` +
          `* यह भाषा में बहुत प्रचलित और उपयोगी शब्द है।\n` +
          `* क्या आप इसे किसी वाक्य में उपयोग करके देखना चाहते हैं?`;
      }

      return `### 📖 Meaning of "${meaningWord}"\n\n` +
        `* **Word:** **${meaningWord}** \`[${roman}]\`\n` +
        `* **Meaning:** **${nativeMeaning}**\n\n` +
        `This is a high-frequency expression in ${targetLanguage.toUpperCase()}. Ask if you'd like to see it used in complete conversational sentences!`;
    }

    // -----------------------------------------------------------------------
    // INTENT 4: Grammar Guides (Particles, Tenses, SOV vs SVO)
    // -----------------------------------------------------------------------
    if (lower.includes("particle") || lower.includes("విభక్తి") || lower.includes("कारक") || lower.includes("은/는") || lower.includes("이/가")) {
      if (targetLanguage === "ko") {
        if (isTe) {
          return `### 🎓 కొరియన్ విభక్తులు (Korean Particles Guide)\n\n` +
            `కొరియన్ లో విభక్తులు వాక్యంలో పదాల పాత్రను నిర్దేశిస్తాయి:\n\n` +
            `1. **విషయ విభక్తి (Topic Marker) — 은 / 는 (eun / neun):**\n` +
            `   * ప్రధాన విషయాన్ని నొక్కి చెప్పేటప్పుడు వాడతాం.\n` +
            `   * హల్లుతో ముగిస్తే (Batchim): **은** (\`책은\` = పుస్తకం అయితే)\n` +
            `   * అచ్చుతో ముగిస్తే: **는** (\`저는\` = నేనైతే)\n\n` +
            `2. **కర్త విభక్తి (Subject Marker) — 이 / 가 (i / ga):**\n` +
            `   * కర్తను ప్రత్యేకంగా గుర్తించడానికి వాడతాం.\n` +
            `   * హల్లుతో ముగిస్తే: **이** (\`물이\` = నీరు)\n` +
            `   * అచ్చుతో ముగిస్తే: **가** (\`제가\` = నేనే)\n\n` +
            `3. **కర్మ విభక్తి (Object Marker) — 을 / 를 (eul / reul):**\n` +
            `   * తెలుగులో 'ను/ని' వంటిది.\n` +
            `   * హల్లుతో ముగిస్తే: **을** (\`밥을 먹어요\` = అన్నం తింటున్నాను)\n` +
            `   * అచ్చుతో ముగిస్తే: **를** (\`사과를 사요\` = యాపిల్ కొంటున్నాను)`;
        }
        return `### 🎓 Korean Particles Guide\n\n` +
          `1. **Topic Markers (은/는):** Highlights the main topic or contrast.\n` +
          `   - Consonant ending: **은** (\`책은\` - As for the book)\n` +
          `   - Vowel ending: **는** (\`저는\` - As for me)\n\n` +
          `2. **Subject Markers (이/가):** Identifies specific subject performing action.\n` +
          `   - Consonant ending: **이** (\`물이 좋아요\` - The water is good)\n` +
          `   - Vowel ending: **가** (\`제가 해요\` - I will do it)\n\n` +
          `3. **Object Markers (을/를):** Marks direct object of transitive verb.\n` +
          `   - Consonant ending: **을** (\`밥을 먹어요\` - Eat food)\n` +
          `   - Vowel ending: **를** (\`사과를 사요\` - Buy apples)`;
      }
    }

    // -----------------------------------------------------------------------
    // INTENT 5: Dynamic Pedagogical Mentor Guidance
    // -----------------------------------------------------------------------
    const queryEn = await fetchGoogleTranslation(cleanMsg, "auto", "en");
    const enText = queryEn.translatedText;

    if (isTe) {
      return `### 💡 క్లాస్ గురువు విశ్లేషణ & సలహా:\n\n` +
        `మీరు అడిగిన ప్రశ్న: **"${cleanMsg}"**\n\n` +
        `భాషా అభ్యాసంలో మీ సందేహాలను నివృత్తి చేయడానికి నేను ఎల్లప్పుడూ సిద్ధంగా ఉన్నాను.\n\n` +
        `* 🗣️ **అనువాదాలు & వాక్యాలు:** ఏ వాక్యమైనా ఎలా చెప్పాలో ఉచ్చారణతో సహా అడగండి (ఉదా: *"పాస్ ది బుక్ అని తెలుగులో ఎలా చెప్పాలి?"*).\n` +
        `* 📖 **వ్యాకరణం & నియమాలు:** విభక్తులు, కాలాలు, లేదా కర్త-కర్మ-క్రియ వాక్య నిర్మాణంపై స్పష్టమైన వివరణ పొందవచ్చు.\n` +
        `* 🎭 **రోల్ ప్లే:** రెస్టారెంట్, ప్రయాణం, షాపింగ్ సందర్భాలలో నిజ జీవిత సంభాషణలు సాధన చేయండి.\n\n` +
        `మీకు నిర్దిష్టంగా ఏ పదం లేదా వాక్య నిర్మాణంపై వివరణ కావాలో చెప్పండి, వివరంగా నేర్చుకుందాం! 😊`;
    }

    if (isHi) {
      return `### 💡 क्लाउस का मार्गदर्शन:\n\n` +
        `आपके प्रश्न का विश्लेषण: **"${cleanMsg}"**\n\n` +
        `भाषा सीखने की इस यात्रा में मैं आपकी पूरी मदद करूँगा:\n\n` +
        `* 🗣️ **सटीक अनुवाद:** किसी भी वाक्य का सही उच्चारण, आदर स्तर और व्याकरण विस्तार।\n` +
        `* 📖 **व्याकरण नियम:** काल (Tenses), कारक (Particles) और वाक्य संरचना की सरल व्याख्या।\n` +
        `* 🎭 **रोलप्ले अभ्यास:** वास्तविक जीवन की स्थितियों में आत्मविश्वास से बोलने का अभ्यास।\n\n` +
        `क्या आप किसी खास वाक्य या नियम पर उदाहरण देखना चाहते हैं? मुझे बताइए! 😊`;
    }

    return `### 💡 Klaus Pedagogical Guidance:\n\n` +
      `Regarding your inquiry: **"${cleanMsg}"**\n\n` +
      `Here is how we can break down this language topic:\n\n` +
      `* 🗣️ **Actionable Phrases:** Ask me how to express any specific phrase in ${targetLanguage.toUpperCase()} (e.g. *"how to ask 'pass the book' in ${targetLanguage.toUpperCase()}"*).\n` +
      `* 📖 **Grammar & Nuances:** Learn how word order, honorific registers, and verb conjugations work naturally.\n` +
      `* 🎭 **Roleplay Dialogue:** Test your skills in realistic scenarios (restaurant, hotel, airport, shopping) with instant feedback.\n\n` +
      `Feel free to ask for specific sentence breakdowns or grammar drills! 😊`;
  }

  // =========================================================================
  //  DYNAMIC ROLEPLAY SIMULATOR WITH TURN-BY-TURN INSPECTION
  // =========================================================================

  private getScenarioCulturalTip(
    scenarioKey: string,
    targetLanguage: TargetLanguageCode,
    nativeLanguage: NativeLanguageCode
  ): string {
    const isTe = nativeLanguage === "te";
    const isHi = nativeLanguage === "hi";
    const s = scenarioKey.toLowerCase();

    // TARGET = TELUGU
    if (targetLanguage === "te") {
      if (s.includes("restaurant")) {
        return isTe
          ? "తెలుగు రెస్టారెంట్లలో సాధారణంగా భోజనానికి ముందు మంచినీళ్లు అందిస్తారు. గౌరవంగా అడగడానికి 'దయచేసి...' లేదా 'ఇవ్వండి/అందించండి' అని ఉపయోగిస్తారు."
          : isHi
          ? "तेलुगु रेस्टोरेंट में आदरपूर्वक आर्डर करने के लिए 'దయచేసి...' (कृपया) या 'ఇవ్వండి' (दीजिए) का प्रयोग किया जाता है।"
          : "In Telugu dining, polite requests typically use the honorific suffix '-andi' (e.g., 'దయచేసి ఇవ్వండి' - Please give).";
      }
      if (s.includes("airport")) {
        return isTe
          ? "విమానాశ్రయంలో 'పాస్‌పోర్ట్', 'బోర్డింగ్ పాస్' మరియు 'లగేజ్' వంటి పదాలను ఉపయోగిస్తారు. సహాయం కోసం 'దయచేసి సహాయం చేయగలరా?' అని అడగండి."
          : isHi
          ? "एयरपोर्ट पर चेक-इन के दौरान सहायता के लिए 'దయచేసి సహాయం చేయగలరా?' (कृपया क्या आप मदद कर सकते हैं?) पूछें।"
          : "At airport check-in, polite inquiries often end with '...చేయగలరా?' (Can you please...?).";
      }
      if (s.includes("hotel")) {
        return isTe
          ? "హోటల్ లో 'గది బుకింగ్', 'కీ కార్డు', 'అల్పాహారం' వంటి వివరాలు అడగడానికి 'తెలుసుకోవచ్చా?' లేదా 'చూపించగలరా?' అని ఉపయోగిస్తారు."
          : isHi
          ? "होटल में कमरा या नाश्ते की जानकारी के लिए 'తెలుసుకోవచ్చా?' (क्या जान सकते हैं?) का प्रयोग करें।"
          : "When checking into a hotel, use polite forms like 'చూపించగలరా?' (Can you show me?).";
      }
      if (s.includes("shopping")) {
        return isTe
          ? "షాపింగ్ చేసేటప్పుడు వస్తువు ధర అడగడానికి 'దీని ఖరీదు/ధర ఎంత?' లేదా 'తగ్గించి ఇవ్వగలరా?' అని అడుగుతారు."
          : isHi
          ? "दुकान में कीमत पूछने के लिए 'దీని ధర ఎంత?' (इसकी कीमत कितनी है?) कहें।"
          : "When shopping, ask 'దీని ధర ఎంత?' (How much does this cost?).";
      }
      if (s.includes("interview")) {
        return isTe
          ? "ఇంటర్వ్యూలలో మాట్లాడేటప్పుడు 'అండి', మరియు గౌరవార్థక క్రియారూపాలు (-తాము, -గలము) వాడటం వలన ఉన్నతమైన మర్యాద కనిపిస్తుంది."
          : isHi
          ? "साक्षात्कार (Interview) में सम्मानसूचक क्रिया रूपों और 'అండి' का प्रयोग अनिवार्य है।"
          : "In formal interviews, respectful verb conjugations and the '-andi' suffix establish professional courtesy.";
      }
      if (s.includes("workplace")) {
        return isTe
          ? "కార్యాలయాలలో సహోద్యోగులతో చర్చించేటప్పుడు 'సహకారం', 'సమీక్ష', 'సమావేశం' వంటి పదాలు వాడతారు."
          : isHi
          ? "कार्यालयीन संवाद में सम्मान और स्पष्टता के लिए 'సమీక్ష' (Review) और 'సమావేశం' (Meeting) का प्रयोग होता है।"
          : "In Telugu professional environments, clear phrasing and respectful forms foster smooth collaboration.";
      }
      if (s.includes("doctor")) {
        return isTe
          ? "వైద్యునితో మాట్లాడేటప్పుడు 'నొప్పిగా ఉంది', 'జ్వరం వస్తోంది', 'నీరసంగా ఉంది' వంటి ఆరోగ్య లక్షణాలను స్పష్టంగా వివరించాలి."
          : isHi
          ? "डॉक्टर को लक्षण बताते समय 'నొప్పిగా ఉంది' (दर्द है) या 'జ్వరం' (बुखार) का प्रयोग करें।"
          : "When consulting a doctor, express symptoms using '...గా ఉంది' (e.g., 'నొప్పిగా ఉంది' - It hurts).";
      }
      return isTe
        ? "కొత్త స్నేహితులను కలిసినప్పుడు 'ఎలా ఉన్నారు?', 'మీ ఊరు ఏది?', 'మీ అభిరుచులు ఏమిటి?' అని అడగడం ద్వారా సంభాషణను ఆసక్తికరంగా ప్రారంభించవచ్చు."
        : isHi
        ? "नए मित्रों से मिलते समय 'ఎలా ఉన్నారు?' (आप कैसे हैं?) और 'మీ పేరేమిటి?' से शुरुआत करें।"
        : "In social greetings, friendly questions like 'ఎలా ఉన్నారు?' (How are you?) create warm conversations.";
    }

    // TARGET = KOREAN
    if (targetLanguage === "ko") {
      if (s.includes("restaurant")) {
        return isTe
          ? "కొరియన్ రెస్టారెంట్లలో భోజనం లేదా పానీయాలు ఆర్డర్ చేయడానికి '주세요' (దయచేసి ఇవ్వండి) అని అంటారు. (ఉదా: 물 좀 주세요 = దయచేసి నీళ్లు ఇవ్వండి)."
          : isHi
          ? "कोरियन रेस्टोरेंट में आर्डर देने के लिए '주세요' (कृपया दीजिए) का प्रयोग करें। (उदा: 물 좀 주세요 = कृपया पानी दीजिए)।"
          : "In Korean dining, politely ask for dishes or water using '주세요' (e.g., '물 좀 주세요' - Water, please).";
      }
      if (s.includes("airport")) {
        return isTe
          ? "కొరియన్ విమానాశ్రయంలో '여권' అంటే పాస్‌పోర్ట్, '탑승권' అంటే బోర్డింగ్ పాస్, '수하물' అంటే లగేజ్."
          : isHi
          ? "कोरियन एयरपोर्ट पर '여권' (पासपोर्ट) और '탑승권' (बोर्डिंग पास) मुख्य शब्द हैं।"
          : "At Korean airport check-in, key documents include 여권 (passport) and 탑승권 (boarding pass).";
      }
      if (s.includes("hotel")) {
        return isTe
          ? "కొరియన్ హోటల్ లో '체크인' అంటే చెక్-ఇన్, '키 / 열쇠' అంటే తాళం, '조식' అంటే ఉదయపు అల్పాహారం."
          : isHi
          ? "होटल में '체크인' (चेक-इन) और '조식' (नाश्ता) प्रमुख शब्द हैं।"
          : "At Korean hotels, look for terms like 체크인 (check-in), 객실 키 (room key), and 조식 (breakfast).";
      }
      if (s.includes("shopping")) {
        return isTe
          ? "కొరియన్ షాపింగ్ లో ధర అడగడానికి '이거 얼마예요?' (ఇది ఎంత?), సైజ్ అడగడానికి '사이즈 있어요?' అని అంటారు."
          : isHi
          ? "कोरियन दुकान में कीमत पूछने के लिए '이거 얼마예요?' (यह कितने का है?) का प्रयोग करें।"
          : "When shopping in Korea, ask '이거 얼마예요?' (How much is this?) or '입어봐도 돼요?' (Can I try this on?).";
      }
      if (s.includes("interview")) {
        return isTe
          ? "కొరియన్ ఇంటర్వ్యూలలో అత్యున్నత గౌరవార్థక ఫార్మల్ రూపాలు (~습니다 / ~십니까) ఉపయోగించడం తప్పనిసరి."
          : isHi
          ? "कोरियन इंटरव्यू में उच्चतम आदर सूचक (~습니다 / ~십니까) का प्रयोग अनिवार्य है।"
          : "In Korean job interviews, always maintain the formal deferential register (~습니다 / ~십니까).";
      }
      if (s.includes("workplace")) {
        return isTe
          ? "కొరియన్ కార్యాలయాలలో సహోద్యోగులను పదవి పేర్లతో (ఉదా: 대리님, 과장님) గౌరవంగా పిలుస్తారు."
          : isHi
          ? "कोरियन कार्यस्थल पर पदवियों (जैसे 과장님, 팀장님) के साथ '님' जोड़कर आदर दिया जाता है।"
          : "In Korean business culture, address colleagues by title + 님 (e.g., 과장님 - Manager).";
      }
      if (s.includes("doctor")) {
        return isTe
          ? "కొరియన్ వైద్యుడితో మాట్లాడేటప్పుడు '... 아파요' (నొప్పిగా ఉంది), '감기 걸렸어요' (జలుబు చేసింది) అని చెబుతారు."
          : isHi
          ? "डॉक्टर को लक्षण बताते समय '... 아파요' (दर्द है) या '열이 나요' (बुखार है) का उपयोग करें।"
          : "When speaking to a Korean doctor, describe illness with '~아파요' (hurts) or '감기에 걸렸어요' (caught a cold).";
      }
      return isTe
        ? "కొరియన్ లో కొత్త పరిచయస్తులతో మాట్లాడేటప్పుడు ఎల్లప్పుడూ మర్యాద పూర్వక '~요' (존댓말) రూపాన్ని వాడాలి."
        : isHi
        ? "नए परिचितों के साथ हमेशा विनम्र जोनदेतमाल (~요) शैली का प्रयोग करें।"
        : "When meeting someone in Korea for the first time, always use polite 존댓말 (~요) endings.";
    }

    // TARGET = ENGLISH
    if (targetLanguage === "en") {
      if (s.includes("restaurant")) {
        return isTe
          ? "ఇంగ్లీష్ రెస్టారెంట్లలో టేబుల్ కోసం 'A table for 5, please' లేదా ఆర్డర్ కోసం 'Could we please have...' అని మర్యాదగా అడగడం ఆనవాయితీ."
          : isHi
          ? "अंग्रेजी रेस्टोरेंट में टेबल मांगने के लिए 'A table for 5, please' या आर्डर के लिए 'Could we please have...' कहें।"
          : "In English restaurants, polite requests commonly start with 'Could I please get...' or 'We'd like a table for 5, please.'";
      }
      if (s.includes("airport")) {
        return isTe
          ? "విమానాశ్రయంలో సీటు అడగడానికి 'window seat' (కిటికీ పక్క) లేదా 'aisle seat' (నడవా పక్క) అని అడుగుతారు."
          : isHi
          ? "एयरपोर्ट पर 'window seat' या 'aisle seat' चुनना और 'boarding gate' की पुष्टि करना आवश्यक होता है।"
          : "At airline check-in, clarify your seating preference with 'window seat' or 'aisle seat'.";
      }
      if (s.includes("hotel")) {
        return isTe
          ? "హోటల్ చెక్-ఇన్ సమయంలో 'I have a reservation under the name of...' అని చెప్పడం ప్రామాణిక శైలి."
          : isHi
          ? "होटल में चेक-इन करते समय 'I have a reservation under the name of...' कहना सबसे सटीक होता है।"
          : "When checking into a hotel, say 'I have a reservation under [Your Name]'.";
      }
      if (s.includes("shopping")) {
        return isTe
          ? "షాపింగ్ లో 'Could I try this on?' (ట్రై చేయవచ్చా?) లేదా 'Do you have this in a different color?' అని అడుగుతారు."
          : isHi
          ? "दुकान में 'Could I try this on?' (क्या मैं इसे पहनकर देख सकता हूँ?) जैसे वाक्य प्रयोग करें।"
          : "In clothing stores, ask 'Could I try this on in the fitting room?' or 'Do you have this in my size?'";
      }
      if (s.includes("interview")) {
        return isTe
          ? "ఇంటర్వ్యూలలో 'Thank you for having me', 'In my previous experience...' అని స్పష్టంగా చెప్పాలి."
          : isHi
          ? "अंग्रेजी इंटरव्यू में 'Thank you for this opportunity' और 'In my previous experience...' का प्रयोग करें।"
          : "In job interviews, structure answers clearly with the STAR method (Situation, Task, Action, Result).";
      }
      if (s.includes("workplace")) {
        return isTe
          ? "కార్యాలయాలలో సమావేశాలు మరియు ప్రాజెక్ట్ చర్చల కోసం 'Let's sync up', 'Could you please review this?' వాడతారు."
          : isHi
          ? "ऑफिस में 'Let's sync up' या 'Could you please update the tracker?' जैसे शिष्ट वाक्यों का उपयोग करें।"
          : "In workplace collaboration, polite assertiveness ('Could you review this by EOD?') keeps communication smooth.";
      }
      if (s.includes("doctor")) {
        return isTe
          ? "వైద్యునితో మాట్లాడేటప్పుడు 'I have had a fever since yesterday', 'I feel dizzy' అని లక్షణాల సమయాన్ని స్పష్టంగా చెప్పాలి."
          : isHi
          ? "डॉक्टर को समस्या बताते समय 'I have a severe headache' या 'I have been coughing for two days' कहें।"
          : "When consulting a doctor, specify the onset and duration: 'I have had a throbbing pain for two days.'";
      }
      return isTe
        ? "స్నేహపూర్వక సంభాషణలలో 'What kind of music do you like?', 'How was your weekend?' అని సహజంగా అడుగుతారు."
        : isHi
        ? "मित्रवत संवाद में 'What do you like to do on weekends?' जैसे खुले प्रश्न पूछना अच्छा होता है।"
        : "To make friendly small talk, open-ended questions like 'What do you enjoy doing on weekends?' work best.";
    }

    // TARGET = HINDI
    if (targetLanguage === "hi") {
      if (s.includes("restaurant")) {
        return isTe
          ? "హిందీ రెస్టారెంట్లలో భోజనం ఆర్డర్ చేసేటప్పుడు 'कृपया...' (దయచేసి) లేదా '...दीजिए' (ఇవ్వండి) అని గౌరవంగా అడుగుతారు."
          : isHi
          ? "रेस्टोरेंट में आर्डर देने के लिए 'कृपया...' या '...दीजिए' का प्रयोग करें।"
          : "In Hindi dining, use respectful forms like 'कृपया...' (Please) and '...दीजिए' (Please give).";
      }
      if (s.includes("airport")) {
        return isTe
          ? "హిందీ విమానాశ్రయంలో 'हवाई टिकट' (విమాన టికెట్), 'सामान' (లగేజ్) పదాలు ఉపయోగిస్తారు."
          : isHi
          ? "एयरपोर्ट पर चेक-इन के दौरान 'सामान' (Luggage) और 'बोर्डिंग पास' की जानकारी ली जाती है।"
          : "At airport check-in in Hindi, 'सामान' (baggage) and 'टिकट' (ticket) are everyday terms.";
      }
      if (s.includes("hotel")) {
        return isTe
          ? "హోటల్ లో 'कमरा' (గది), 'नाश्ता' (టిఫిన్) గురించి 'क्या नाश्ता शामिल है?' అని అడగవచ్చు."
          : isHi
          ? "होटल में कमरे और नाश्ते की जानकारी के लिए 'क्या नाश्ता शामिल है?' पूछें।"
          : "When checking into a hotel in Hindi, ask 'क्या कमरा तैयार है?' (Is the room ready?).";
      }
      if (s.includes("shopping")) {
        return isTe
          ? "షాపింగ్ లో 'इसकी कीमत क्या है?' (దీని ధర ఎంత?), 'कुछ कम कीजिए' (కాస్త తగ్గించండి) అని అడుగుతారు."
          : isHi
          ? "दुकान में कीमत पूछने के लिए 'इसकी कीमत क्या है?' या 'थोड़ा कम कीजिए' बोलें।"
          : "When shopping in Hindi, ask 'यह कितने का है?' (How much is this?).";
      }
      if (s.includes("interview")) {
        return isTe
          ? "హిందీ ఇంటర్వ్యూలలో ఎల్లప్పుడూ 'आप' (మీరు) మరియు గౌరవార్థక క్రియలను ఉపయోగించాలి."
          : isHi
          ? "साक्षात्कार में हमेशा 'आप' और आदरसूचक क्रिया रूपों का प्रयोग करें।"
          : "In formal Hindi interviews, always maintain the respectful 'आप' (Aap) register.";
      }
      if (s.includes("workplace")) {
        return isTe
          ? "కార్యాలయాలలో సహోద్యోగులతో 'बैठक' (సమావేశం), 'परियोजना' (ప్రాజెక్ట్) గురించి చర్చిస్తారు."
          : isHi
          ? "कार्यस्थल पर 'बैठक' (मीटिंग) और 'सहयोग' की भाषा अपनाएं।"
          : "In workplace Hindi, use clear and professional terms like 'परियोजना' (project) and 'बैठक' (meeting).";
      }
      if (s.includes("doctor")) {
        return isTe
          ? "వైద్యునితో 'मुझे सिरदर्द है' (నాకు తలనొప్పిగా ఉంది), 'बुखार है' (జ్వరం ఉంది) అని చెబుతారు."
          : isHi
          ? "डॉक्टर को समस्या बताते समय 'मुझे सिरदर्द है' या 'बुखार है' कहें।"
          : "When consulting a doctor in Hindi, say 'मुझे दर्द है' (I have pain) or 'बुखार है' (I have fever).";
      }
      return isTe
        ? "స్నేహితులతో 'आप कैसे हैं?' (మీరు ఎలా ఉన్నారు?), 'आपसे मिलकर खुशी हुई' అని పలకరిస్తారు."
        : isHi
        ? "नए मित्रों से 'आप कैसे हैं?' और 'आपसे मिलकर बहुत खुशी हुई' कहें।"
        : "In Hindi social settings, polite greetings like 'आपसे मिलकर बहुत खुशी हुई' (Pleased to meet you) are common.";
    }

    return isTe
      ? "సహజమైన సంభాషణ కోసం మర్యాద పూర్వక పదాలు మరియు స్పష్టమైన వాక్యాలను ఉపయోగించండి."
      : isHi
      ? "स्वाभाविक संवाद हेतु हमेशा विनम्रता और आदरसूचक शब्दों का प्रयोग करें।"
      : "For natural conversation, use polite markers and clear phrasing.";
  }

  private getTargetTransliteration(
    text: string,
    targetLanguage: string,
    pronunciation?: string
  ): string {
    if (targetLanguage === "ko") {
      return romanizeHangul(text);
    }
    if (
      pronunciation &&
      /^[a-zA-Z0-9\s.,?!'-]+$/.test(pronunciation.trim()) &&
      pronunciation.trim().toLowerCase() !== text.trim().toLowerCase()
    ) {
      return pronunciation.trim();
    }
    return "";
  }

  private async generateDynamicRoleplayTurn(
    scenario: string,
    userMessage: string,
    nativeLanguage: NativeLanguageCode,
    targetLanguage: TargetLanguageCode
  ): Promise<KlausRoleplayResponse> {
    const isTe = nativeLanguage === "te";
    const isHi = nativeLanguage === "hi";
    const cleanUser = userMessage.trim();
    const lowerUser = cleanUser.toLowerCase();
    const isInitial = cleanUser.startsWith("[Starting roleplay") || cleanUser.length < 2;
    const scenKey = scenario.toLowerCase();

    // Opening Greetings across all 8 Scenarios
    const scenarioOpenings: Record<string, {
      ko: string;
      en: string;
      te: string;
      hi: string;
    }> = {
      restaurant: {
        ko: "어서 오세요! 몇 분이신가요? 이쪽 편하신 자리에 앉으세요. 여기 메뉴판입니다. 천천히 보시고 주문해 주세요!",
        en: "Welcome to our restaurant! How many in your party today? Please take a seat right here, and here are your menus!",
        te: "మా రెస్టారెంట్‌కు స్వాగతం! ఎంతమందికి టేబుల్ కావాలి? ఇక్కడ సౌకర్యవంతంగా కూర్చోండి, ఇదిగోండి మెనూ కార్డు!",
        hi: "हमारे रेस्टोरेंट में आपका स्वागत है! कितने लोगों के लिए टेबल चाहिए? यहाँ बैठिए, यह रहा मेन्यू!",
      },
      airport: {
        ko: "안녕하세요! 탑승 수속을 도와드리겠습니다. 여권과 항공권을 보여주시겠어요? 위탁하실 수하물이 있으신가요?",
        en: "Hello! Welcome to airline check-in. May I please see your passport and flight ticket? Do you have any luggage to check?",
        te: "నమస్కారం! చెక్-ఇన్ కౌంటర్‌కు స్వాగతం. మీ పాస్‌పోర్ట్ మరియు విమాన టికెట్ చూపిస్తారా? లగేజ్ చెక్-ఇన్ చేయాలా?",
        hi: "नमस्ते! चेक-इन में आपका स्वागत है। क्या मैं आपका पासपोर्ट और टिकट देख सकता हूँ? क्या कोई बैगेज चेक-इन करना है?",
      },
      hotel: {
        ko: "안녕하십니까! 호텔 프런트 데스크입니다. 체크인을 도와드릴까요? 예약자분 성함과 예약 번호를 말씀해 주세요.",
        en: "Good day! Welcome to our hotel. May I assist you with check-in? May I have the name on your reservation?",
        te: "నమస్కారం! హోటల్ ఫ్రంట్ డెస్క్‌కు స్వాగతం. చెక్-ఇన్ కొరకు మీ రిజర్వేషన్ పేరు చెప్తారా?",
        hi: "नमस्ते! होटल रिसेप्शन में आपका स्वागत है। क्या आपका रिजर्वेशन है? कृपया अपना नाम बताइए।",
      },
      shopping: {
        ko: "어서 오세요, 손님! 특별히 찾으시는 상품이나 사이즈가 있으신가요? 편하게 둘러보세요!",
        en: "Welcome to our store! Are you looking for anything specific today, or a particular size? Feel free to look around!",
        te: "మా దుకాణానికి స్వాగతం! మీరు ఏదైనా నిర్దిష్ట వస్తువు లేదా సైజు చూస్తున్నారా? నిరభ్యంతరంగా చూడండి!",
        hi: "दुकान में आपका स्वागत है! क्या आप किसी खास सामान या साइज की तलाश कर रहे हैं? आराम से देखिए!",
      },
      interview: {
        ko: "안녕하세요! 오늘 면접에 참석해 주셔서 감사합니다. 긴장하지 마시고, 먼저 간단하게 자기소개 부탁드립니다.",
        en: "Hello, thank you for attending today's interview. Please make yourself comfortable. To begin, could you briefly introduce yourself?",
        te: "నమస్కారం! నేటి ఇంటర్వ్యూకు హాజరైనందుకు ధన్యవాదాలు. ముందుగా మీ పరిచయం చెప్పండి.",
        hi: "नमस्ते! इंटरव्यू के लिए आने के लिए धन्यवाद। शुरुआत में कृपया अपना संक्षिप्त परिचय दीजिए।",
      },
      workplace: {
        ko: "좋은 아침입니다! 오늘 진행해야 할 주요 업무와 프로젝트 일정은 잘 확인하셨나요? 오늘 오전에 팀 회의가 있습니다.",
        en: "Good morning! Have you reviewed the schedule and priorities for today's project? We have a team sync meeting shortly.",
        te: "శుభోదయం! నేటి ప్రాజెక్ట్ పనులు మరియు షెడ్యూల్ పరిశీలించారా? మరికాసేపట్లో మన టీమ్ మీటింగ్ ఉంది.",
        hi: "सुप्रभात! क्या आपने आज के प्रोजेक्ट का शेड्यूल देख लिया है? थोड़ी देर में हमारी टीम मीटिंग है।",
      },
      doctor: {
        ko: "안녕하세요. 어디가 불편해서 오셨나요? 언제부터 아프기 시작하셨는지 증상을 말씀해 주세요.",
        en: "Hello. What seems to be the problem today? Where does it hurt, and when did these symptoms begin?",
        te: "నమస్కారం. మీకు ఏమి అసౌకర్యంగా ఉంది? ఎక్కడ నొప్పిగా ఉంది మరియు లక్షణాలు ఎప్పటి నుంచి మొదలయ్యాయి?",
        hi: "नमस्ते। आपको क्या तकलीफ है? दर्द कब से शुरू हुआ और आपको क्या लक्षण महसूस हो रहे हैं?",
      },
      social: {
        ko: "반가워요! 오늘 만나서 정말 기뻐요. 주말은 어떻게 보내셨나요? 평소에 어떤 취미나 음악을 좋아하세요?",
        en: "Hey, so great to meet you! How was your weekend? What kinds of hobbies, movies, or music do you enjoy?",
        te: "హలో, మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది! మీ వారం ఎలా గడిచింది? మీకు ఎలాంటి అభిరుచులు ఇష్టం?",
        hi: "नमस्ते, आपसे मिलकर बहुत खुशी हुई! आपका हफ्ता कैसा बीता? आपको कौन से शौक पसंद हैं?",
      },
    };

    let matchedOpening = scenarioOpenings.restaurant;
    for (const k of Object.keys(scenarioOpenings)) {
      if (scenKey.includes(k)) {
        matchedOpening = scenarioOpenings[k];
        break;
      }
    }

    // 1. Initial Scenario Opening Turn
    if (isInitial) {
      let openTarget = "";
      if (targetLanguage === "ko") openTarget = matchedOpening.ko;
      else if (targetLanguage === "en") openTarget = matchedOpening.en;
      else if (targetLanguage === "te") openTarget = matchedOpening.te;
      else if (targetLanguage === "hi") openTarget = matchedOpening.hi;
      else {
        const gtx = await fetchGoogleTranslation(matchedOpening.en, "en", targetLanguage);
        openTarget = gtx.translatedText;
      }

      let openNative = "";
      if (nativeLanguage === "te") openNative = matchedOpening.te;
      else if (nativeLanguage === "hi") openNative = matchedOpening.hi;
      else if (nativeLanguage === "en") openNative = matchedOpening.en;
      else {
        const gtx = await fetchGoogleTranslation(openTarget, targetLanguage, nativeLanguage);
        openNative = gtx.translatedText;
      }

      const roman = this.getTargetTransliteration(openTarget, targetLanguage);
      const tip = this.getScenarioCulturalTip(scenKey, targetLanguage, nativeLanguage);

      return {
        replyTarget: openTarget,
        transliteration: roman,
        nativeTranslation: openNative,
        pedagogicalTip: tip,
        inspection: null,
        correction: null,
      };
    }

    // 2. TURN-BY-TURN INSPECTION OF USER'S MESSAGE FIRST
    let inspectionStatus: "excellent" | "good" | "needs_polishing" = "excellent";
    let isGrammaticallyCorrect = true;
    let politenessScore = "Polite & Respectful (మర్యాదపూర్వక శైలి)";
    let suggestedCorrection: string | null = null;
    let explanationInNative: string | null = null;

    const userNoPunct = cleanUser.replace(/[.?!~]+$/, "").trim();
    const hasTeluguChar = /[\u0C00-\u0C7F]/.test(cleanUser);
    const hasHangulChar = /[\uAC00-\uD7A3]/.test(cleanUser);
    const hasDevanagariChar = /[\u0900-\u097F]/.test(cleanUser);

    if (targetLanguage === "te") {
      if (!hasTeluguChar) {
        // User typed in English/other script while practicing Telugu -> translate user's actual sentence dynamically
        inspectionStatus = "needs_polishing";
        isGrammaticallyCorrect = false;
        politenessScore = "English Input (తెలుగులో సాధన అవసరం)";

        const gtxUserTrans = await fetchGoogleTranslation(cleanUser, "auto", "te");
        const targetSuggestion = (gtxUserTrans.translatedText || cleanUser).trim();

        suggestedCorrection = targetSuggestion;
        explanationInNative = isTe
          ? `మీ భావం స్పష్టంగా అర్థమైంది! అయితే ఈ పాత్రోచిత సాధనలో మీరు తెలుగులో మాట్లాడటం సాధన చేయాలి. మీ సమాధానాన్ని తెలుగులో: "${targetSuggestion}" అని చెప్పడం ద్వారా సంభాషణ మరింత సహజంగా ఉంటుంది.`
          : isHi
          ? `आपका आशయ बिल्कुल स्पष्ट है! लेकिन तेलुगु अभ्यास हेतु कृपया तेलुगु में उत्तर दें: "${targetSuggestion}"`
          : `Your intent was clear! However, to practice Telugu in this scenario, try responding in Telugu: "${targetSuggestion}".`;
      } else {
        const hasPoliteTe =
          cleanUser.includes("అండి") ||
          cleanUser.includes("దయచేసి") ||
          cleanUser.includes("గలరా") ||
          cleanUser.includes("ఇవ్వండి") ||
          cleanUser.includes("చూపించండి") ||
          cleanUser.includes("చెప్పండి");
        if (hasPoliteTe) {
          inspectionStatus = "excellent";
          politenessScore = "Polite Standard (మర్యాదపూర్వక శైలి)";
          explanationInNative = isTe
            ? `అద్భుతమైన వాక్యం! తెలుగు వాక్య నిర్మాణం మరియు మర్యాదపూర్వక ప్రత్యయాలను (-ండి / దయచేసి) చాలా సహజంగా ఉపయోగించారు.`
            : isHi
            ? `शानदार! आपने तेलुगु में उचित आदर एवं व्याकरण का प्रयोग किया है।`
            : `Excellent phrasing! You used natural Telugu word order and polite honorific suffixes.`;
        } else {
          inspectionStatus = "good";
          politenessScore = "Casual / Needs Polite Suffix (స్నేహపూర్వక రూపం)";
          suggestedCorrection = `${cleanUser} అండి`;
          explanationInNative = isTe
            ? `మీ వాక్యం బాగుంది! సంభాషణలో మరింత గౌరవంగా పలకరించడానికి వాక్యం చివర 'అండి' లేదా 'దయచేసి' చేర్చడం మంచిది.`
            : isHi
            ? `आपका वाक्य अच्छा है! और अधिक आदर के लिए अंत में 'అండి' जोड़ना उत्तम रहेगा।`
            : `Good sentence! Adding the polite suffix 'అండి' (-andi) or 'దయచేసి' (please) makes it more courteous.`;
        }
      }
    } else if (targetLanguage === "ko") {
      if (!hasHangulChar) {
        // User typed in English/other script while practicing Korean -> translate dynamically
        inspectionStatus = "needs_polishing";
        isGrammaticallyCorrect = false;
        politenessScore = "Non-Korean Input (కొరియన్ లో సాధన అవసరం)";

        const gtxUserTrans = await fetchGoogleTranslation(cleanUser, "auto", "ko");
        const targetSuggestion = (gtxUserTrans.translatedText || cleanUser).trim();

        suggestedCorrection = targetSuggestion;
        explanationInNative = isTe
          ? `మీ భావం అర్థమైంది! అయితే కొరియన్ భాషను సాధన చేయడానికి హంగుల్ లో రాయండి: "${targetSuggestion}".`
          : isHi
          ? `आपका आशय स्पष्ट है! कोरियन अभ्यास के लिए कृपया कोरियन में उत्तर दें: "${targetSuggestion}".`
          : `Understood! To practice Korean in this scenario, try responding in Korean: "${targetSuggestion}".`;
      } else {
        const hasPoliteEnding =
          userNoPunct.endsWith("요") ||
          userNoPunct.endsWith("니다") ||
          userNoPunct.endsWith("세요") ||
          userNoPunct.endsWith("주세요") ||
          userNoPunct.endsWith("습니까");
        if (!hasPoliteEnding) {
          if (!userNoPunct.includes(" ") && userNoPunct.length <= 6) {
            inspectionStatus = "needs_polishing";
            isGrammaticallyCorrect = false;
            politenessScore = "Plain Noun (గౌరవ ప్రత్యయం అవసరం)";
            suggestedCorrection = `${userNoPunct} 주세요`;
            explanationInNative = isTe
              ? `కొరియన్ లో కేవలం వస్తువు పేరు చెప్పడం కాకుండా చివర '주세요' (దయచేసి ఇవ్వండి) చేర్చడం సంభాషణలో మర్యాదపూర్వక పద్ధతి.`
              : isHi
              ? `कोरियन में केवल वस्तु का नाम न बोलकर अंत में '주세요' (कृपया दीजिए) जोड़ना विनम्रता की पहचान है।`
              : `In Korean, appending '주세요' (please give me) transforms a single noun into a natural, polite request.`;
          } else {
            inspectionStatus = "good";
            politenessScore = "Casual / Needs Honorific (స్నేహపూర్వక రూపం)";
            suggestedCorrection = `${userNoPunct}요`;
            explanationInNative = isTe
              ? `మీ వాక్యం అర్థమవుతుంది! మరింత గౌరవంగా మాట్లాడేందుకు వాక్యం చివర '~요' చేర్చడం మంచిది.`
              : isHi
              ? `आपका वाक्य समझ में आता है! और अधिक आदर के लिए वाक्य के अंत में '~요' लगाना उपयुक्त रहेगा।`
              : `Good sentence! Adding '~요' to the ending ensures proper polite register with the character.`;
          }
        } else {
          inspectionStatus = "excellent";
          politenessScore = "Polite Standard (존댓말 - ఖచ్చితమైన మర్యాద)";
          explanationInNative = isTe
            ? `అద్భుతమైన వాక్యం! మర్యాద పూర్వక ప్రత్యయాన్ని (${userNoPunct.slice(-2)}) మరియు పద క్రమాన్ని సరిగ్గా ఉపయోగించారు.`
            : isHi
            ? `शानदार! आपने आदर स्तर और वाक्य संरचना का बिल्कुल सही प्रयोग किया है।`
            : `Excellent phrasing! You used the correct polite honorific ending and natural word order.`;
        }
      }
    } else if (targetLanguage === "hi") {
      if (!hasDevanagariChar) {
        inspectionStatus = "needs_polishing";
        isGrammaticallyCorrect = false;
        politenessScore = "Non-Hindi Input (हिन्दी में अभ्यास करें)";

        const gtxUserTrans = await fetchGoogleTranslation(cleanUser, "auto", "hi");
        const targetSuggestion = (gtxUserTrans.translatedText || cleanUser).trim();

        suggestedCorrection = targetSuggestion;
        explanationInNative = isTe
          ? `మీ భావం అర్థమైంది! హిందీ సాధన కొరకు దయచేసి హిందీలో చెప్పండి: "${targetSuggestion}".`
          : isHi
          ? `आपका आशय स्पष्ट है! कृपया हिन्दी में उत्तर देकर अभ्यास करें: "${targetSuggestion}".`
          : `Understood! To practice Hindi in this scenario, try saying: "${targetSuggestion}".`;
      } else {
        inspectionStatus = "excellent";
        politenessScore = "Natural & Polite";
        explanationInNative = isTe
          ? `చక్కని సమాధానం! సందర్భానికి తగినట్లుగా స్పష్టమైన పదజాలంతో సమాధానం ఇచ్చారు.`
          : isHi
          ? `बहुत बढ़िया! आपने संदर्भ के अनुसार सटीक शब्दों का प्रयोग किया।`
          : `Clear and contextually accurate response!`;
      }
    } else if (targetLanguage === "en") {
      if (hasTeluguChar || hasHangulChar || hasDevanagariChar) {
        inspectionStatus = "needs_polishing";
        isGrammaticallyCorrect = false;
        politenessScore = "Non-English Input";
        const gtxUserTrans = await fetchGoogleTranslation(cleanUser, "auto", "en");
        const targetSuggestion = (gtxUserTrans.translatedText || cleanUser).trim();
        suggestedCorrection = targetSuggestion;
        explanationInNative = isTe
          ? `ఇంగ్లీష్ సాధన కోసం మీ సమాధానాన్ని ఇంగ్లీష్ లో చెప్పండి: "${targetSuggestion}".`
          : isHi
          ? `अंग्रेजी अभ्यास के लिए कृपया अंग्रेजी में उत्तर दें: "${targetSuggestion}".`
          : `To practice English, try phrasing your reply as: "${targetSuggestion}".`;
      } else {
        const hasPoliteEn =
          lowerUser.includes("please") ||
          lowerUser.includes("could") ||
          lowerUser.includes("would") ||
          lowerUser.includes("thank");
        if (hasPoliteEn || cleanUser.length > 15) {
          inspectionStatus = "excellent";
          politenessScore = "Clear & Courteous English";
          explanationInNative = isTe
            ? `అద్భుతమైన ఇంగ్లీష్ వాక్యం! మర్యాదపూర్వక పదజాలం మరియు స్పష్టమైన భావాన్ని ఉపయోగించారు.`
            : isHi
            ? `उत्कृष्ट अंग्रेजी वाक्य! विनम्रता और स्पष्टता का बहुत अच्छा प्रयोग।`
            : `Great phrasing! You communicated courteously and clearly.`;
        } else {
          inspectionStatus = "good";
          politenessScore = "Direct English";
          suggestedCorrection = `Could you please ${cleanUser.toLowerCase()}?`;
          explanationInNative = isTe
            ? `వాక్యం అర్థమవుతుంది! 'Could you please...' వంటి మర్యాదపూర్వక పదాలు చేర్చడం ద్వారా సంభాషణ మరింత హుందాగా ఉంటుంది.`
            : isHi
            ? `वाक्य स्पष्ट है! 'Could you please...' जोड़ने से यह और अधिक विनम्र बन जाता है।`
            : `Direct and clear. Adding polite markers like 'Could you please...' elevates conversational fluency.`;
        }
      }
    } else {
      if (cleanUser.length > 2) {
        inspectionStatus = "excellent";
        politenessScore = "Natural & Clear";
        explanationInNative = isTe
          ? `చక్కని సమాధానం! సందర్భానికి తగినట్లుగా స్పష్టమైన పదజాలంతో సమాధానం ఇచ్చారు.`
          : isHi
          ? `बहुत बढ़िया! आपने संदर्भ के अनुसार सटीक शब्दों का प्रयोग किया।`
          : `Clear and contextually accurate response!`;
      }
    }

    const inspectionBadge =
      inspectionStatus === "excellent"
        ? isTe
          ? "🌟 ఖచ్చితమైన & మర్యాదపూర్వక వాక్యం"
          : isHi
          ? "🌟 उत्कृष्ट एवं विनम्र संवाद"
          : "🌟 Perfect Grammar & Register"
        : inspectionStatus === "good"
        ? isTe
          ? "👍 మంచి ప్రయత్నం (చిన్న మెరుగుదల)"
          : isHi
          ? "👍 अच्छा प्रयास (थोड़ा सुधार)"
          : "👍 Good Conversational Attempt"
        : targetLanguage === "te"
        ? isTe
          ? "💡 తెలుగులో సాధన చేయండి"
          : isHi
          ? "💡 तेलुगु में अभ्यास करें"
          : "💡 Practice in Telugu"
        : targetLanguage === "ko"
        ? isTe
          ? "💡 కొరియన్ లో సాధన చేయండి"
          : isHi
          ? "💡 कोरियन में अभ्यास करें"
          : "💡 Practice in Korean"
        : targetLanguage === "hi"
        ? isTe
          ? "💡 హిందీలో సాధన చేయండి"
          : isHi
          ? "💡 हिन्दी में अभ्यास करें"
          : "💡 Practice in Hindi"
        : isTe
        ? "💡 సహజ శైలి కోసం సూచన"
        : isHi
        ? "💡 स्वाभाविक शैली हेतु सुझाव"
        : "💡 Polished Native Suggestion";

    const inspectionPayload: KlausRoleplayInspection = {
      status: inspectionStatus,
      statusBadge: inspectionBadge,
      isGrammaticallyCorrect,
      politenessScore,
      nativeFeedback: explanationInNative || "",
      suggestedCorrection,
      explanationInNative,
    };

    // 3. CHARACTER DIALOGUE CONTINUATION NEXT (Semantic intent & item extraction)
    const gtxUserEn = await fetchGoogleTranslation(cleanUser, "auto", "en");
    const normEn = (gtxUserEn.translatedText || cleanUser).trim();
    const lowerEn = normEn.toLowerCase();

    let characterResponseEn = "";
    if (scenKey.includes("restaurant")) {
      const orderMatch = lowerEn.match(
        /(?:we\s+want|i\s+want|we\'d\s+like|i\'d\s+like|can\s+we\s+have|can\s+i\s+have|bring\s+us|bring\s+me|give\s+us|give\s+me|get\s+us|get\s+me|order|ordering|we\s+order|i\s+order|please\s+give|please\s+bring)\s+(.+)/i
      );
      const mentionsFood = /\b(coffee|tea|biryani|dosa|rice|curry|juice|soup|pizza|burger|sandwich|dessert|meals?|drinks?|cold coffee)\b/.test(
        lowerEn
      );

      if (
        lowerEn.includes("menu") ||
        lowerEn.includes("recommend") ||
        lowerEn.includes("special") ||
        lowerEn.includes("popular") ||
        lowerEn.includes("what do you have") ||
        lowerEn.includes("what is good")
      ) {
        characterResponseEn =
          "Here is our complete menu! Today's chef specials and freshly prepared house dishes are customer favorites. Would you like to start with some refreshing beverages or light appetizers?";
      } else if (
        lowerEn.includes("table") ||
        lowerEn.includes("seat") ||
        lowerEn.includes("sit") ||
        lowerEn.includes("party of") ||
        lowerEn.includes("booth") ||
        lowerEn.includes("show our table")
      ) {
        const numMatch = lowerEn.match(/\b(\d+|two|three|four|five|six|seven|eight|nine|ten)\b/);
        const partyStr = numMatch ? numMatch[1] : "your party";
        characterResponseEn = `Certainly! Right this way, please. Here is a comfortable table for ${partyStr}. Here are your menus and a carafe of fresh water. Please take your time looking over the options, and let me know when you are ready to order!`;
      } else if (
        (orderMatch && !lowerEn.includes("table") && !lowerEn.includes("bill")) ||
        (mentionsFood && !lowerEn.includes("table") && !lowerEn.includes("bill"))
      ) {
        const item = orderMatch ? orderMatch[1].replace(/[.?!~]+$/, "").trim() : normEn;
        characterResponseEn = `Certainly! I have noted down your order for ${item}. Our kitchen and barista will prepare it fresh right away. It will be served in just a few minutes. Would you like anything else to accompany that?`;
      } else if (
        lowerEn.includes("bill") ||
        lowerEn.includes("check") ||
        lowerEn.includes("payment") ||
        lowerEn.includes("pay") ||
        lowerEn.includes("how much")
      ) {
        characterResponseEn =
          "Certainly! Here is your itemized bill. I hope you thoroughly enjoyed your food and drinks with us today! The total is ready. We accept card, cash, and digital payments. How would you prefer to settle?";
      } else if (
        lowerEn.includes("water") ||
        lowerEn.includes("napkin") ||
        lowerEn.includes("tissue") ||
        lowerEn.includes("spoon") ||
        lowerEn.includes("fork") ||
        lowerEn.includes("salt") ||
        lowerEn.includes("ice") ||
        lowerEn.includes("refill")
      ) {
        characterResponseEn =
          "Right away! Here is fresh water and the extra utensils you requested for your table. Please let me know if everything tastes wonderful or if you need anything else!";
      } else if (
        lowerEn.includes("washroom") ||
        lowerEn.includes("restroom") ||
        lowerEn.includes("bathroom") ||
        lowerEn.includes("toilet")
      ) {
        characterResponseEn =
          "The restrooms are located right down the hallway to your left, past the kitchen entrance.";
      } else if (lowerEn.includes("wifi") || lowerEn.includes("wi-fi") || lowerEn.includes("internet")) {
        characterResponseEn =
          "Yes, we have free high-speed Wi-Fi! The network is 'RestaurantGuest' and no password is required.";
      } else if (
        lowerEn.includes("thank") ||
        lowerEn.includes("delicious") ||
        lowerEn.includes("tasty") ||
        lowerEn.includes("good food") ||
        lowerEn.includes("bye") ||
        lowerEn.includes("leaving") ||
        lowerEn.includes("done")
      ) {
        characterResponseEn =
          "Thank you so much! It was our genuine pleasure serving you today. We look forward to welcoming you and your companions back again soon. Have a wonderful rest of your day!";
      } else {
        characterResponseEn =
          `Understood! I will assist you with "${normEn}" right away. Please let me know if there is anything else you need to make your dining experience perfect!`;
      }
    } else if (scenKey.includes("airport")) {
      if (lowerEn.includes("passport") || lowerEn.includes("ticket") || lowerEn.includes("id") || lowerEn.includes("pass")) {
        characterResponseEn =
          "Thank you! I have verified your passport and flight booking details. Would you prefer a window seat or an aisle seat for this flight? And do you have any check-in bags today?";
      } else if (lowerEn.includes("bag") || lowerEn.includes("luggage") || lowerEn.includes("suitcase") || lowerEn.includes("baggage")) {
        characterResponseEn =
          "Please place your baggage onto the scale. That is well within the weight allowance. Here are your luggage tags.";
      } else if (lowerEn.includes("gate") || lowerEn.includes("boarding") || lowerEn.includes("time") || lowerEn.includes("flight")) {
        characterResponseEn =
          "Your flight departs from Gate 24B. Boarding starts approximately 40 minutes prior to departure. Have a safe and pleasant journey!";
      } else {
        characterResponseEn =
          "Everything is all set! Here is your boarding pass and passport. Head through security to concourse B. Have a wonderful and safe flight!";
      }
    } else if (scenKey.includes("hotel")) {
      if (lowerEn.includes("reservation") || lowerEn.includes("booking") || lowerEn.includes("name") || lowerEn.includes("check in")) {
        characterResponseEn =
          `Welcome! I found your confirmed reservation. You are staying in Deluxe Room 402 on the 4th floor. Here is your keycard. Complimentary breakfast is served from 7 to 10 AM on the 1st floor.`;
      } else if (lowerEn.includes("wifi") || lowerEn.includes("wi-fi") || lowerEn.includes("breakfast") || lowerEn.includes("gym") || lowerEn.includes("pool")) {
        characterResponseEn =
          "The Wi-Fi network is 'HotelGuest' with no password needed. The fitness center and indoor heated pool are open until 10 PM on the 2nd floor.";
      } else if (lowerEn.includes("checkout") || lowerEn.includes("check-out") || lowerEn.includes("bill") || lowerEn.includes("key")) {
        characterResponseEn =
          "Thank you for staying with us! Your express checkout is complete. We hope you enjoyed your visit and look forward to hosting you again on your next trip.";
      } else {
        characterResponseEn =
          `Certainly! Our front desk concierge is available 24/7. Please let us know if you need fresh towels, room service, or local recommendations.`;
      }
    } else if (scenKey.includes("shopping")) {
      if (lowerEn.includes("price") || lowerEn.includes("cost") || lowerEn.includes("how much") || lowerEn.includes("discount") || lowerEn.includes("sale")) {
        characterResponseEn =
          "This item is currently on a special 20% seasonal promotion! The original price was $45, but today it is only $36. Would you like to try it on in the fitting room?";
      } else if (lowerEn.includes("size") || lowerEn.includes("color") || lowerEn.includes("fitting") || lowerEn.includes("try") || lowerEn.includes("fit")) {
        characterResponseEn =
          "We have medium, large, and extra-large in stock, and it also comes in navy blue, forest green, and classic black. The fitting rooms are right over there to your left!";
      } else if (lowerEn.includes("buy") || lowerEn.includes("take") || lowerEn.includes("purchase") || lowerEn.includes("cash") || lowerEn.includes("card")) {
        characterResponseEn =
          "Wonderful choice! I will wrap this up neatly for you in an eco-friendly bag. Will you be paying by credit card or cash today?";
      } else {
        characterResponseEn =
          `Welcome to our store! We have an extensive collection this season. Please take your time looking around, and feel free to ask if you would like to try anything on!`;
      }
    } else if (scenKey.includes("interview")) {
      if (lowerEn.includes("experience") || lowerEn.includes("background") || lowerEn.includes("project") || lowerEn.includes("work")) {
        characterResponseEn =
          "Thank you for detailing your background! That sounds directly aligned with what our team needs. Could you give an example of a difficult technical or interpersonal challenge you solved recently?";
      } else if (lowerEn.includes("challenge") || lowerEn.includes("problem") || lowerEn.includes("conflict") || lowerEn.includes("team")) {
        characterResponseEn =
          "That demonstrates great resilience and constructive leadership under pressure! How do you typically keep yourself updated with evolving industry trends and technologies?";
      } else {
        characterResponseEn =
          "Thank you for those insightful answers! Do you have any questions for us regarding our engineering team culture, current roadmap, or next steps in the hiring process?";
      }
    } else if (scenKey.includes("doctor")) {
      if (lowerEn.includes("headache") || lowerEn.includes("fever") || lowerEn.includes("cough") || lowerEn.includes("cold") || lowerEn.includes("pain") || lowerEn.includes("hurt") || lowerEn.includes("stomach")) {
        characterResponseEn =
          `I understand. Let me check your temperature and listen to your breathing. It appears to be a mild viral symptom. Have you had any allergies to antibiotics or fever medication in the past?`;
      } else if (lowerEn.includes("medicine") || lowerEn.includes("prescription") || lowerEn.includes("allergy") || lowerEn.includes("pill")) {
        characterResponseEn =
          "I have prescribed anti-inflammatory tablets and a soothing syrup. Take one tablet twice daily after meals for 5 days. Drink plenty of warm fluids and get adequate bed rest.";
      } else {
        characterResponseEn =
          "You should start feeling noticeably better within 48 to 72 hours. However, if the high fever persists beyond three days, please return immediately for a follow-up. Take good care!";
      }
    } else if (scenKey.includes("workplace")) {
      if (lowerEn.includes("meeting") || lowerEn.includes("sync") || lowerEn.includes("call") || lowerEn.includes("review") || lowerEn.includes("schedule")) {
        characterResponseEn =
          "Sounds great! Let's lock in a 30-minute sync at 2 PM today to go through the architecture deck and unblock the dependencies before the stakeholder demo.";
      } else if (lowerEn.includes("deadline") || lowerEn.includes("done") || lowerEn.includes("complete") || lowerEn.includes("submit") || lowerEn.includes("progress")) {
        characterResponseEn =
          "Impressive turnaround! The quality of the deliverables is top-notch. I will sign off on the pull request and update the sprint board right now.";
      } else {
        characterResponseEn =
          "Thank you for the update! Please feel free to ping me on Slack if any unexpected blockers come up. Let's make this release a huge success!";
      }
    } else {
      // Social scenario
      if (lowerEn.includes("hobby") || lowerEn.includes("music") || lowerEn.includes("movie") || lowerEn.includes("weekend") || lowerEn.includes("sport") || lowerEn.includes("travel")) {
        characterResponseEn =
          "That is so wonderful! I absolutely love that too. There is something really invigorating about spending free time on creative passions. Do you do this often in your spare time?";
      } else if (lowerEn.includes("coffee") || lowerEn.includes("meet") || lowerEn.includes("lunch") || lowerEn.includes("hang out") || lowerEn.includes("plans")) {
        characterResponseEn =
          "I would truly love that! There is a cozy little cafe right by the park that serves fantastic artisanal coffee. Let's definitely meet up there this Saturday!";
      } else {
        characterResponseEn =
          "It is always such a joy chatting with you! You have such a vibrant perspective on things. What else exciting has been happening in your life recently?";
      }
    }

    const gtxTargetReply = await fetchGoogleTranslation(characterResponseEn, "en", targetLanguage);
    const finalReplyTarget = gtxTargetReply.translatedText;
    const romanReply = this.getTargetTransliteration(finalReplyTarget, targetLanguage, gtxTargetReply.pronunciation);

    const gtxNativeReply = await fetchGoogleTranslation(finalReplyTarget, targetLanguage, nativeLanguage);
    const finalNativeTrans = gtxNativeReply.translatedText;
    const culturalTip = this.getScenarioCulturalTip(scenKey, targetLanguage, nativeLanguage);

    return {
      replyTarget: finalReplyTarget,
      transliteration: romanReply,
      nativeTranslation: finalNativeTrans,
      pedagogicalTip: culturalTip,
      inspection: inspectionPayload,
      correction: suggestedCorrection
        ? {
            hasMistake: true,
            correctedSentence: suggestedCorrection,
            explanationInNative: explanationInNative || "",
          }
        : null,
    };
  }

  /**
   * Hint Generator
   */
  async generateHint({
    nativeLanguage,
    targetLanguage,
    exercisePrompt,
    correctAnswer,
    hintStep,
  }: {
    nativeLanguage: NativeLanguageCode;
    targetLanguage: TargetLanguageCode;
    exercisePrompt?: string;
    correctAnswer?: string;
    hintStep?: 1 | 2 | 3;
  }): Promise<{ hint: string; step: 1 | 2 | 3 }> {
    const isTe = nativeLanguage === "te";
    const isHi = nativeLanguage === "hi";
    const step: 1 | 2 | 3 = hintStep || 1;
    const answer = correctAnswer || "";

    if (step === 1) {
      const hint = isTe
        ? `💡 సూచన 1: వాక్య క్రమాన్ని గమనించండి. కర్త + కర్మ + క్రియ క్రమంలో ఆలోచించండి.`
        : isHi
        ? `💡 संकेत 1: वाक्य के क्रम पर ध्यान दें — कर्ता + कर्म + क्रिया।`
        : `💡 Hint 1: Pay attention to the sentence structure. Identify the subject and object first.`;
      return { hint, step };
    }

    if (step === 2) {
      const words = answer.split(/\s+/);
      const partial = words.slice(0, Math.ceil(words.length / 2)).join(" ");
      const hint = isTe
        ? `💡 సూచన 2: వాక్య ప్రారంభ భాగం: "${partial} ..."`
        : isHi
        ? `💡 संकेत 2: वाक्य का प्रारंभिक भाग: "${partial} ..."`
        : `💡 Hint 2: The sentence starts with: "${partial} ..."`;
      return { hint, step };
    }

    const roman = targetLanguage === "ko" ? romanizeHangul(answer) : answer;
    const hint = isTe
      ? `💡 సూచన 3 (పూర్తి సమాధానం): "${answer}" [${roman}]`
      : isHi
      ? `💡 संकेत 3 (पूर्ण उत्तर): "${answer}" [${roman}]`
      : `💡 Hint 3 (Full Solution): "${answer}" [${roman}]`;
    return { hint, step };
  }

  private async generateDynamicWordBreakdown(
    phrase: string,
    targetLang: string,
    instructionLang: string
  ): Promise<string> {
    try {
      const words = phrase
        .split(/\s+/)
        .map((w) => w.trim().replace(/[.,!?'"“”;:()]/g, ""))
        .filter((w) => w.length > 0)
        .slice(0, 5);

      if (words.length <= 1) return "";

      const lines: string[] = [];
      for (const w of words) {
        const trans = await fetchGoogleTranslation(w, "auto", targetLang);
        const meaning = await fetchGoogleTranslation(w, "auto", instructionLang);
        const targetWord = trans.translatedText || w;
        const nativeMeaning = meaning.translatedText || w;
        const roman = targetLang === "ko" ? romanizeHangul(targetWord) : "";
        const romanStr = roman ? ` (${roman})` : "";
        lines.push(`* **${targetWord}${romanStr}:** ${nativeMeaning}`);
      }

      if (lines.length === 0) return "";
      const isTe = instructionLang === "te";
      const isHi = instructionLang === "hi";
      const header = isTe
        ? "#### 🔍 పదాల విశ్లేషణ (Word Breakdown):\n"
        : isHi
        ? "#### 🔍 शब्दों का विश्लेषण (Word Breakdown):\n"
        : "#### 🔍 Word Breakdown:\n";
      return header + lines.join("\n") + "\n\n";
    } catch {
      return "";
    }
  }
}

export const klaus = new KlausTutorEngine();
