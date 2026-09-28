import { NativeLanguageCode, TargetLanguageCode, getDictionary } from "../i18n";
import { GoogleGenAI } from "@google/genai";

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0.0 - 1.0
  userAnswer: string;
  correctAnswer: string;
  feedback: string;
  explanation: string;
  improvedVersion?: string;
  errorType?: "none" | "typo" | "grammar" | "vocabulary" | "incomplete" | "wrong_meaning";
}

// Levenshtein distance algorithm for robust typo and edit distance measurement
function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, () => new Array(an + 1).fill(0));
  for (let i = 0; i <= an; ++i) matrix[0][i] = i;
  for (let i = 0; i <= bn; ++i) matrix[i][0] = i;

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }
  return matrix[bn][an];
}

function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function evaluateUserAnswer({
  userAnswer,
  correctAnswer,
  acceptableAnswers = [],
  instructionLanguage,
  learningLanguage,
  promptQuestion,
}: {
  userAnswer: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  instructionLanguage: NativeLanguageCode;
  learningLanguage: TargetLanguageCode;
  promptQuestion?: string;
}): Promise<EvaluationResult> {
  const dict = getDictionary(instructionLanguage);
  const cleanUser = cleanText(userAnswer);
  const cleanCorrect = cleanText(correctAnswer);
  const cleanAcceptable = acceptableAnswers.map(cleanText);

  // 1. Direct exact or acceptable match
  if (cleanUser === cleanCorrect || cleanAcceptable.includes(cleanUser)) {
    return {
      isCorrect: true,
      score: 1.0,
      userAnswer,
      correctAnswer,
      feedback: dict.exercises.correctTitle,
      explanation: `${dict.exercises.explanationTitle} "${correctAnswer}"`,
      errorType: "none",
    };
  }

  // 2. Try Gemini AI Evaluation if API Key is present
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Klaus, the expert NLP language evaluation engine for Lingua.
Evaluate the learner's answer against the target language model answer.

Configuration:
- Instructional Language: ${instructionLanguage} (All explanations and feedback MUST be written in this language!)
- Learning Language: ${learningLanguage} (The target language being practiced)
- Exercise Prompt/Question: "${promptQuestion || ""}"
- Expected Correct Answer: "${correctAnswer}"
- Additional Acceptable Answers: ${JSON.stringify(acceptableAnswers)}
- Learner's Submitted Answer: "${userAnswer}"

Criteria:
1. Is it semantically valid, even if expressed with slight variation or synonym?
2. Are there minor typos (1-2 letters)? If so, forgive it with score >= 0.85 and note the spelling typo.
3. If completely wrong or misleading, mark isCorrect: false.
4. Output explanation in the learner's native instructional language (${instructionLanguage}).

Return STRICT JSON only (no markdown code blocks, just raw JSON):
{
  "isCorrect": boolean,
  "score": number, // 0.0 to 1.0
  "errorType": "none" | "typo" | "grammar" | "vocabulary" | "incomplete" | "wrong_meaning",
  "feedback": "short encouraging title in ${instructionLanguage}",
  "explanation": "clear pedagogical explanation in ${instructionLanguage} explaining why or correcting mistakes",
  "improvedVersion": "natural phrasing in ${learningLanguage}"
}`;

      const response = await ai.interactions.create({
        model: process.env.AI_MODEL || "gemini-3.8-flash",
        input: prompt,
      });

      const rawText = response.output_text?.trim() || "";
      const jsonStart = rawText.indexOf("{");
      const jsonEnd = rawText.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1));
        return {
          isCorrect: Boolean(parsed.isCorrect),
          score: typeof parsed.score === "number" ? parsed.score : parsed.isCorrect ? 1.0 : 0.0,
          userAnswer,
          correctAnswer,
          feedback: parsed.feedback || (parsed.isCorrect ? dict.exercises.correctTitle : dict.exercises.mistakeTitle),
          explanation: parsed.explanation || "",
          improvedVersion: parsed.improvedVersion || correctAnswer,
          errorType: parsed.errorType || (parsed.isCorrect ? "none" : "grammar"),
        };
      }
    } catch (aiError) {
      console.warn("AI evaluation fallback to algorithmic NLP evaluator:", aiError);
    }
  }

  // 3. Algorithmic NLP Evaluator (Levenshtein & Token Overlap Fallback)
  let bestDistance = levenshteinDistance(cleanUser, cleanCorrect);
  let bestMatch = cleanCorrect;

  for (const alt of cleanAcceptable) {
    const dist = levenshteinDistance(cleanUser, alt);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestMatch = alt;
    }
  }

  const maxLength = Math.max(cleanUser.length, bestMatch.length, 1);
  const similarity = 1 - bestDistance / maxLength;

  // Near-perfect typo tolerance (e.g. 1-2 char difference on words of length >= 5)
  if (similarity >= 0.85 || bestDistance <= 2 && cleanCorrect.length >= 6) {
    const isTypo = bestDistance > 0;
    return {
      isCorrect: true,
      score: isTypo ? 0.9 : 1.0,
      userAnswer,
      correctAnswer,
      feedback: isTypo
        ? `${dict.exercises.correctTitle} (${instructionLanguage === "te" ? "చిన్న అక్షర దోషం" : instructionLanguage === "hi" ? "छोटी वर्तनी त्रुटि" : "Minor spelling typo"})`
        : dict.exercises.correctTitle,
      explanation: isTypo
        ? `${dict.exercises.explanationTitle} "${correctAnswer}". ${dict.exercises.userAnswerTitle} "${userAnswer}".`
        : `${dict.exercises.explanationTitle} "${correctAnswer}".`,
      errorType: isTypo ? "typo" : "none",
      improvedVersion: correctAnswer,
    };
  }

  // Partial match or close attempt
  if (similarity >= 0.6) {
    return {
      isCorrect: false,
      score: 0.5,
      userAnswer,
      correctAnswer,
      feedback: dict.exercises.mistakeTitle,
      explanation: `${dict.exercises.solutionTitle} "${correctAnswer}". ${instructionLanguage === "te" ? "మీ సమాధానం దాదాపు సరైనదే అయినా వ్యాకరణం లేదా పద నిర్మాణంలో తేడా ఉంది." : instructionLanguage === "hi" ? "आपका उत्तर करीब था, लेकिन व्याकरण या शब्द विन्यास में अंतर है।" : "Your answer was close, but differs in grammar or word structure."}`,
      errorType: "grammar",
      improvedVersion: correctAnswer,
    };
  }

  // Incorrect answer
  return {
    isCorrect: false,
    score: 0.0,
    userAnswer,
    correctAnswer,
    feedback: dict.exercises.mistakeTitle,
    explanation: `${dict.exercises.solutionTitle} "${correctAnswer}".`,
    errorType: "wrong_meaning",
    improvedVersion: correctAnswer,
  };
}
