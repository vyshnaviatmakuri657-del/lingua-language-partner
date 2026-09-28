import { klaus, KlausLessonContext, KlausTranslationResponse, KlausRoleplayResponse } from "./klaus";
import { evaluateUserAnswer, EvaluationResult } from "../nlp/evaluator";
import { NativeLanguageCode, TargetLanguageCode } from "../i18n";

export interface AIServiceInterface {
  evaluateAnswer(params: {
    userAnswer: string;
    correctAnswer: string;
    acceptableAnswers?: string[];
    instructionLanguage: NativeLanguageCode;
    learningLanguage: TargetLanguageCode;
    promptQuestion?: string;
  }): Promise<EvaluationResult>;

  translate(params: {
    text: string;
    from: string;
    to: string;
    nativeLanguage: NativeLanguageCode;
  }): Promise<KlausTranslationResponse>;

  generateHint(context: KlausLessonContext): Promise<{ hint: string; step: 1 | 2 | 3 }>;

  chat(params: {
    userMessage: string;
    context: KlausLessonContext;
    chatHistory?: Array<{ sender: "user" | "klaus"; text: string }>;
  }): Promise<string>;

  generateConversationResponse(params: {
    scenario: string;
    difficulty: string;
    userMessage: string;
    dialogueHistory: Array<{ sender: string; targetText: string }>;
    nativeLanguage: NativeLanguageCode;
    targetLanguage: TargetLanguageCode;
  }): Promise<KlausRoleplayResponse>;

  explainGrammar(params: {
    topic: string;
    instructionLanguage: NativeLanguageCode;
    learningLanguage: TargetLanguageCode;
  }): Promise<string>;
}

export const AIService: AIServiceInterface = {
  evaluateAnswer: (params) => evaluateUserAnswer(params),
  translate: (params) => klaus.translateSentence(params),
  generateHint: (context) => klaus.generateHint(context),
  chat: (params) => klaus.chat(params),
  generateConversationResponse: (params) => klaus.generateRoleplayTurn(params),
  explainGrammar: async ({ topic, instructionLanguage, learningLanguage }) => {
    return klaus.chat({
      userMessage: `Please explain the grammar concept "${topic}" in detail.`,
      context: {
        nativeLanguage: instructionLanguage,
        targetLanguage: learningLanguage,
        lessonGrammar: topic,
      },
    });
  },
};

export default AIService;
