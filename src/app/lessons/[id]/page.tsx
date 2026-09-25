"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
  Play,
  RotateCcw,
  Check,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import KlausChatModal from "@/components/KlausChatModal";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import ConfettiEffect from "@/components/ConfettiEffect";

interface VocabularyItem {
  id: string;
  targetWord: string;
  nativeMeaning: string;
  pronunciation: string;
  transliteration?: string | null;
  partOfSpeech: string;
  exampleTarget: string;
  exampleTransliteration?: string | null;
  exampleNative: string;
  notes?: string | null;
}

interface GrammarTopicItem {
  id: string;
  title: string;
  explanation: string;
  ruleSummary: string;
  examples: Array<{ target: string; transliteration?: string; native: string; explanation?: string }>;
  commonMistakes: Array<{ mistake: string; correction: string; explanation: string }>;
}

interface ExerciseItem {
  id: string;
  orderIndex: number;
  type: string;
  instruction: string;
  prompt: string;
  promptTransliteration?: string | null;
  audioText?: string | null;
  correctAnswer: string;
  acceptableAnswers?: string[];
  options?: string[];
  explanation: string;
  hintLevel1: string;
  hintLevel2: string;
  hintLevel3: string;
}

interface LessonData {
  id: string;
  title: string;
  objective: string;
  culturalTip?: string | null;
  xpReward: number;
  estimatedMinutes: number;
  module: { id: string; title: string; category: string };
  languagePair: {
    nativeCode: string;
    targetCode: string;
    nativeName: string;
    targetName: string;
  };
  vocabularies: VocabularyItem[];
  grammarTopics: GrammarTopicItem[];
  exercises: ExerciseItem[];
}

export default function LessonRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const { nativeLanguage, targetLanguage, transliterationEnabled, setTransliterationEnabled, t } = useLanguage();
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<LessonData | null>(null);

  // Stage: "intro" (vocab & grammar overview) | "exercise" (running interactive tasks) | "completed"
  const [stage, setStage] = useState<"intro" | "exercise" | "completed">("intro");
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Exercise interactive state
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    isCorrect: boolean;
    score: number;
    feedback: string;
    explanation: string;
    improvedVersion?: string;
  } | null>(null);

  // Hint & Klaus modal
  const [hintStep, setHintStep] = useState<1 | 2 | 3>(1);
  const [currentHintText, setCurrentHintText] = useState("");
  const [isKlausModalOpen, setIsKlausModalOpen] = useState(false);
  const [klausInitialQuery, setKlausInitialQuery] = useState("");

  // Fetch lesson data
  useEffect(() => {
    async function loadLesson() {
      setLoading(true);
      try {
        const res = await fetch(`/api/lessons/${lessonId}`);
        const data = await res.json();
        if (res.ok && data.lesson) {
          setLesson(data.lesson);
        }
      } catch (err) {
        console.error("Failed to load lesson:", err);
      } finally {
        setLoading(false);
      }
    }
    if (lessonId) loadLesson();
  }, [lessonId]);

  const currentExercise = lesson?.exercises[exerciseIndex];

  // Setup word bank when word_order exercise loads
  useEffect(() => {
    if (currentExercise && currentExercise.type === "word_order" && currentExercise.options) {
      setAvailableWords([...currentExercise.options]);
      setSelectedWords([]);
      setUserAnswer("");
    } else {
      setUserAnswer("");
    }
    setEvaluationResult(null);
    setCurrentHintText("");
    setHintStep(1);
  }, [currentExercise]);

  const handleWordBankTap = (word: string, indexInAvailable: number) => {
    setSelectedWords((prev) => {
      const updated = [...prev, word];
      setUserAnswer(updated.join(" "));
      return updated;
    });
    setAvailableWords((prev) => prev.filter((_, i) => i !== indexInAvailable));
  };

  const handleWordDeselect = (word: string, indexInSelected: number) => {
    setSelectedWords((prev) => {
      const updated = prev.filter((_, i) => i !== indexInSelected);
      setUserAnswer(updated.join(" "));
      return updated;
    });
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleCheckAnswer = async () => {
    if (!currentExercise || !userAnswer.trim() || evaluating) return;
    setEvaluating(true);

    try {
      const res = await fetch(`/api/practice/${currentExercise.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          hintsUsed: hintStep > 1 ? hintStep - 1 : 0,
          timeSpentSeconds: 15,
        }),
      });

      const data = await res.json();
      if (res.ok && data.evaluation) {
        setEvaluationResult({
          isCorrect: data.evaluation.isCorrect,
          score: data.evaluation.score,
          feedback: data.evaluation.feedback,
          explanation: data.explanation || data.evaluation.explanation,
          improvedVersion: data.evaluation.improvedVersion,
        });
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextExercise = async () => {
    if (!lesson) return;

    if (exerciseIndex < lesson.exercises.length - 1) {
      setExerciseIndex((i) => i + 1);
    } else {
      // Complete lesson
      try {
        await fetch(`/api/lessons/${lesson.id}/complete`, { method: "POST" });
        await refreshUser();
      } catch (err) {
        console.warn("Failed to record completion:", err);
      }
      setStage("completed");
    }
  };

  const handleProgressiveHint = async () => {
    if (!currentExercise) return;
    let hint = "";
    if (hintStep === 1) hint = currentExercise.hintLevel1;
    else if (hintStep === 2) hint = currentExercise.hintLevel2;
    else hint = currentExercise.hintLevel3;

    if (!hint) {
      // Ask Klaus directly
      try {
        const res = await fetch("/api/klaus/hint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseId: currentExercise.id,
            step: hintStep,
            nativeLanguageCode: nativeLanguage,
            targetLanguageCode: targetLanguage,
          }),
        });
        const data = await res.json();
        hint = data.hint || "Review the key keywords.";
      } catch {
        hint = "Remember word order in the target language.";
      }
    }

    setCurrentHintText(hint);
    setHintStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : 3));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <Loader2 size={36} className="animate-spin text-indigo-600 mb-4" />
        <p className="text-sm font-semibold text-slate-500">{t.common.loading}</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <p className="text-slate-600 mb-4">{t.common.error}</p>
        <Link href="/learning-path" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          {t.lessons.backToPath}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Runner Navigation */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link
          href="/learning-path"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          <span>{t.lessons.backToPath}</span>
        </Link>

        {stage === "exercise" && (
          <div className="flex-1 max-w-xs mx-6">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((exerciseIndex + 1) / lesson.exercises.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Transliteration Toggle */}
          <button
            onClick={() => setTransliterationEnabled(!transliterationEnabled)}
            title={t.lessons.transliterationToggle}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              transliterationEnabled
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {transliterationEnabled ? <Eye size={15} /> : <EyeOff size={15} />}
            <span className="hidden sm:inline">Phonetics</span>
          </button>

          {/* Ask Klaus Button */}
          <button
            onClick={() => {
              setKlausInitialQuery(
                currentExercise
                  ? `Can you help me understand this exercise: "${currentExercise.instruction} - ${currentExercise.prompt}"?`
                  : `Can you explain the main concepts of lesson "${lesson.title}"?`
              );
              setIsKlausModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white rounded-full text-xs font-bold shadow-sm transition"
          >
            <KlausAvatar mood="happy" size="sm" />
            <span>Klaus</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 my-auto">
        {/* ==================================================== */}
        {/* STAGE 1: INTRO (Objective, Vocabulary, Grammar Guide) */}
        {/* ==================================================== */}
        {stage === "intro" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full mb-3 inline-block">
                {lesson.module.title} • {t.lessons.lessonTitle}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                {lesson.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {lesson.objective}
              </p>

              {lesson.culturalTip && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
                  <Sparkles size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-amber-900">{t.lessons.culturalTipTitle}</h5>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">{lesson.culturalTip}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Key Vocabulary Cards */}
            {lesson.vocabularies.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-600" />
                    <span>{t.lessons.vocabularyTitle}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">
                    {lesson.vocabularies.length} words
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.vocabularies.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-indigo-50/40 transition"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl font-bold text-slate-900">
                            {v.targetWord}
                          </span>
                          <AudioPlayerButton text={v.targetWord} langCode={targetLanguage} size="sm" />
                        </div>
                        {transliterationEnabled && (
                          <div className="text-xs font-mono text-indigo-600 font-medium mb-1">
                            [{v.pronunciation}]
                          </div>
                        )}
                        <div className="text-sm font-semibold text-slate-700">
                          {v.nativeMeaning}
                        </div>
                      </div>

                      {v.exampleTarget && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs">
                          <div className="text-slate-800 font-medium">{v.exampleTarget}</div>
                          <div className="text-slate-500 text-[11px]">{v.exampleNative}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grammar Section */}
            {lesson.grammarTopics.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                {lesson.grammarTopics.map((g) => (
                  <div key={g.id} className="space-y-3">
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Sparkles size={18} className="text-teal-600" />
                      <span>{g.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {g.explanation}
                    </p>

                    <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs font-bold text-teal-900">
                      Rule: {g.ruleSummary}
                    </div>

                    {g.examples && g.examples.length > 0 && (
                      <div className="space-y-2">
                        {g.examples.map((ex, i) => (
                          <div key={i} className="p-3 bg-slate-50 rounded-xl text-xs flex items-center justify-between">
                            <div>
                              <div className="font-bold text-slate-800">{ex.target}</div>
                              {transliterationEnabled && ex.transliteration && (
                                <div className="text-indigo-600 font-mono text-[11px]">{ex.transliteration}</div>
                              )}
                              <div className="text-slate-600">{ex.native}</div>
                            </div>
                            <AudioPlayerButton text={ex.target} langCode={targetLanguage} size="sm" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Start Practice Session Button */}
            <button
              onClick={() => {
                setStage("exercise");
                setExerciseIndex(0);
              }}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-base shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>{t.lessons.startExercise}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* STAGE 2: INTERACTIVE EXERCISES RUNNER */}
        {/* ==================================================== */}
        {stage === "exercise" && currentExercise && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Native Instruction Banner */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>{currentExercise.instruction}</span>
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {exerciseIndex + 1} / {lesson.exercises.length}
                </span>
              </div>

              {/* Prompt / Question */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {currentExercise.prompt}
                  </h2>
                  {transliterationEnabled && currentExercise.promptTransliteration && (
                    <div className="text-xs font-mono text-indigo-600 mt-1">
                      [{currentExercise.promptTransliteration}]
                    </div>
                  )}
                </div>
                <AudioPlayerButton text={currentExercise.prompt} langCode={targetLanguage} size="md" />
              </div>

              {/* Progressive Hint Display */}
              {currentHintText && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-2.5 animate-in fade-in">
                  <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="whitespace-pre-wrap">{currentHintText}</div>
                </div>
              )}

              {/* --- EXERCISE TYPE 1: MULTIPLE CHOICE --- */}
              {currentExercise.type === "multiple_choice" && currentExercise.options && (
                <div className="space-y-3">
                  {currentExercise.options.map((opt, idx) => {
                    const isSelected = userAnswer === opt;
                    return (
                      <button
                        key={idx}
                        disabled={Boolean(evaluationResult)}
                        onClick={() => setUserAnswer(opt)}
                        className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition flex items-center justify-between ${
                          isSelected
                            ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200"
                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- EXERCISE TYPE 2: TRANSLATION / WRITING / FILL BLANK --- */}
              {["translation", "reverse_translation", "fill_blank", "writing", "listening"].includes(
                currentExercise.type
              ) && (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    disabled={Boolean(evaluationResult)}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={t.exercises.typeYourAnswer}
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
                  />
                </div>
              )}

              {/* --- EXERCISE TYPE 3: WORD ORDERING --- */}
              {currentExercise.type === "word_order" && (
                <div className="space-y-4">
                  {/* Selected Words Dropzone */}
                  <div className="min-h-16 p-4 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex flex-wrap gap-2 items-center">
                    {selectedWords.length === 0 ? (
                      <span className="text-xs text-slate-400 font-medium">
                        {t.exercises.tapWordsToOrder}
                      </span>
                    ) : (
                      selectedWords.map((word, i) => (
                        <button
                          key={i}
                          disabled={Boolean(evaluationResult)}
                          onClick={() => handleWordDeselect(word, i)}
                          className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Word Bank */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {availableWords.map((word, i) => (
                      <button
                        key={i}
                        disabled={Boolean(evaluationResult)}
                        onClick={() => handleWordBankTap(word, i)}
                        className="px-3.5 py-2 bg-white border border-slate-200 hover:border-indigo-400 text-slate-800 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition active:scale-95"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Evaluation Feedback Panel */}
              {evaluationResult && (
                <div
                  className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-200 ${
                    evaluationResult.isCorrect
                      ? "bg-teal-50 border-teal-200 text-teal-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {evaluationResult.isCorrect ? (
                      <>
                        <CheckCircle2 size={18} className="text-teal-600" />
                        <span>{evaluationResult.feedback}</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-rose-600" />
                        <span>{evaluationResult.feedback}</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs space-y-1 mt-2">
                    {!evaluationResult.isCorrect && (
                      <div className="font-semibold text-slate-800">
                        {t.exercises.solutionTitle} {currentExercise.correctAnswer}
                      </div>
                    )}
                    <div className="text-slate-600 leading-relaxed">
                      {evaluationResult.explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-3">
              {/* Request Hint via Klaus */}
              {!evaluationResult && (
                <button
                  type="button"
                  onClick={handleProgressiveHint}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl border border-amber-200 font-bold text-xs transition"
                >
                  <Lightbulb size={15} className="text-amber-600" />
                  <span>
                    {hintStep === 1
                      ? t.exercises.progressiveHint1
                      : hintStep === 2
                      ? t.exercises.progressiveHint2
                      : t.exercises.progressiveHint3}
                  </span>
                </button>
              )}

              {/* Submit or Next Button */}
              {!evaluationResult ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!userAnswer.trim() || evaluating}
                  className="ml-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition flex items-center gap-2 active:scale-95"
                >
                  {evaluating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span>{t.common.check}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextExercise}
                  className="ml-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-teal-200 transition flex items-center gap-2 active:scale-95"
                >
                  <span>
                    {exerciseIndex === lesson.exercises.length - 1
                      ? t.common.finish
                      : t.common.continue}
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STAGE 3: LESSON COMPLETED CELEBRATION */}
        {/* ==================================================== */}
        {stage === "completed" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-lg mx-auto">
            <ConfettiEffect trigger={true} />
            <div className="w-20 h-20 mx-auto bg-teal-50 rounded-3xl flex items-center justify-center">
              <KlausAvatar mood="happy" size="lg" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                {t.lessons.lessonCompleted}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                You have successfully mastered {lesson.title}!
              </p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-around">
              <div>
                <div className="text-xs text-slate-400 font-semibold">{t.common.xp}</div>
                <div className="text-2xl font-black text-indigo-600">+{lesson.xpReward} XP</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <div className="text-xs text-slate-400 font-semibold">{t.common.accuracy}</div>
                <div className="text-2xl font-black text-teal-600">100%</div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/learning-path"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition"
              >
                <span>{t.lessons.nextLesson}</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/review"
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                <span>{t.nav.review}</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Klaus Modal Drawer */}
      <KlausChatModal
        isOpen={isKlausModalOpen}
        onClose={() => setIsKlausModalOpen(false)}
        initialQuery={klausInitialQuery}
        context={{
          currentLessonTitle: lesson?.title,
          currentModuleTitle: lesson?.module.title,
          exercisePrompt: currentExercise?.prompt,
          correctAnswer: currentExercise?.correctAnswer,
          userAnswer,
          lessonVocabulary: lesson?.vocabularies.map((v) => ({
            targetWord: v.targetWord,
            nativeMeaning: v.nativeMeaning,
            pronunciation: v.pronunciation,
          })),
          hintStep,
        }}
      />
    </div>
  );
}
