export interface CurriculumVocabulary {
  targetWord: string;
  nativeMeaning: string;
  pronunciation: string;
  transliteration?: string;
  partOfSpeech: string;
  exampleTarget: string;
  exampleTransliteration?: string;
  exampleNative: string;
  notes?: string;
}

export interface CurriculumGrammar {
  title: string;
  explanation: string;
  ruleSummary: string;
  examples: Array<{ target: string; transliteration?: string; native: string }>;
  commonMistakes: Array<{ incorrect: string; correct: string; explanation: string }>;
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2";
export type CEFRStage = "Breakthrough" | "Waystage" | "Threshold" | "Vantage";

export interface PictorialCardOption {
  id: string;
  label: string;
  targetWord: string;
  nativeMeaning: string;
  icon: string;
  transliteration?: string;
  audioText?: string;
}

export interface CurriculumExercise {
  type: "multiple_choice" | "translation" | "listening" | "word_bank" | "word_order" | "pictorial_identification";
  instruction: string;
  prompt: string;
  promptTransliteration?: string;
  audioText?: string;
  correctAnswer: string;
  acceptableAnswers?: string[];
  options?: any[];
  explanation: string;
  hintLevel1: string;
  hintLevel2: string;
  hintLevel3: string;
}

export interface CurriculumLesson {
  title: string;
  objective: string;
  culturalTip: string;
  vocabulary: CurriculumVocabulary[];
  grammar?: CurriculumGrammar;
  exercises: CurriculumExercise[];
}

export interface CurriculumModule {
  category: string;
  cefrLevel?: CEFRLevel;
  cefrStage?: CEFRStage;
  title: string;
  description: string;
  icon: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumPlacementQuestion {
  difficulty: "beginner" | "intermediate" | "advanced";
  instruction: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PairCurriculumData {
  nativeCode: string;
  targetCode: string;
  description: string;
  culturalNotes: string;
  placementQuestions: CurriculumPlacementQuestion[];
  modules: CurriculumModule[];
}
