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
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import KlausChatModal from "@/components/KlausChatModal";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import ConfettiEffect from "@/components/ConfettiEffect";
import SpotlightCard from "@/components/SpotlightCard";

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

export interface PictorialCardOption {
  id: string;
  label: string;
  targetWord: string;
  nativeMeaning: string;
  icon: string;
  transliteration?: string | null;
  audioText?: string | null;
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
  options?: any[];
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
  cefrLevel?: string;
  cefrStage?: string;
  cefrStageName?: string;
  adaptiveStatus?: "refresher" | "focus";
  adaptiveMessage?: string;
  module: {
    id: string;
    title: string;
    category: string;
    orderIndex?: number;
    cefrLevel?: string;
    cefrStage?: string;
  };
  languagePair: {
    nativeCode: string;
    targetCode: string;
    nativeName: string;
    targetName: string;
  };
  vocabularies: VocabularyItem[];
  grammarTopics: GrammarTopicItem[];
  exercises: ExerciseItem[];
  nextLesson?: {
    id: string;
    title: string;
    orderIndex: number;
  } | null;
}

export default function LessonRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const { nativeLanguage, targetLanguage, transliterationEnabled, setTransliterationEnabled, t } = useLanguage();
  const { refreshUser, recordActivity } = useAuth();

  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [completedNextLesson, setCompletedNextLesson] = useState<{
    id: string;
    title: string;
    orderIndex: number;
  } | null>(null);

  // Exercise attempt history for calculating real accuracy and XP
  const [exerciseHistory, setExerciseHistory] = useState<Array<{
    exerciseId: string;
    isCorrect: boolean;
    score: number;
  }>>([]);

  const [completedMetrics, setCompletedMetrics] = useState<{
    earnedXp: number;
    accuracy: number;
    correctCount: number;
    totalCount: number;
  }>({
    earnedXp: 30,
    accuracy: 100,
    correctCount: 5,
    totalCount: 5,
  });

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
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`/api/lessons/${lessonId}`, {
          headers,
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.lesson) {
          const loadedLesson: LessonData = data.lesson;

          // Check if local storage has placement diagnostic for refresher/focus calibration
          if (typeof window !== "undefined") {
            const storedRaw =
              localStorage.getItem(`lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`) ||
              localStorage.getItem("lingua_placement_diagnostic");
            if (storedRaw) {
              try {
                const parsed = JSON.parse(storedRaw);
                if (parsed && parsed.hasPlacement) {
                  const modIndex = loadedLesson.module.orderIndex || 1;
                  const placedLevel = parsed.recommendedLevel || "A1";
                  let isMastered = false;

                  if (Array.isArray(parsed.masteredModules) && parsed.masteredModules.includes(modIndex)) {
                    isMastered = true;
                  }
                  if (placedLevel === "A2" && modIndex === 1) isMastered = true;
                  if ((placedLevel === "B1" || placedLevel === "B2") && modIndex <= 3) isMastered = true;
                  if (placedLevel === "B2" && modIndex <= 4) isMastered = true;

                  if (isMastered) {
                    loadedLesson.adaptiveStatus = "refresher";
                    loadedLesson.adaptiveMessage =
                      nativeLanguage === "te"
                        ? "⚡ క్లాస్ రీఫ్రెషర్ వేదిక: మీరు డయాగ్నోస్టిక్ పరీక్షలో ఈ అంశంపై ప్రావీణ్యతను నిరూపించుకున్నారు. వేగవంతమైన పునశ్చరణతో దీన్ని సమీక్షించండి!"
                        : nativeLanguage === "hi"
                        ? "⚡ क्लाउस रिफ्रेशर स्टेज: आपने डायग्नोस्टिक टेस्ट में इस विषय पर बुनियादी दक्षता सिद्ध की है। त्वरित पुनरावृत्ति के साथ आगे बढ़ें!"
                        : "⚡ Klaus Refresher: You proved competence on this topic in your diagnostic test! Use this accelerated review to cement your recall.";
                  } else {
                    loadedLesson.adaptiveStatus = "focus";
                    loadedLesson.adaptiveMessage =
                      nativeLanguage === "te"
                        ? "🎯 క్లాస్ ప్రాధాన్యతా లక్ష్యం: ఇది మీ లక్ష్య స్థాయికి అత్యంత కీలకమైన అంశం. మొత్తం 5 వ్యాయామాలను శ్రద్ధగా పూర్తి చేసి పట్టు సాధించండి!"
                        : nativeLanguage === "hi"
                        ? "🎯 क्लाउस प्राथमिकता लक्ष्य: यह आपके लक्षित स्तर के लिए महत्वपूर्ण विषय है। सभी 5 अभ्यासों को ध्यान से पूरा करें!"
                        : "🎯 Klaus Priority Focus: Key milestone for your target CEFR fluency. Master all 5 interactive drills!";
                  }
                }
              } catch {}
            }
          }

          setLesson(loadedLesson);
        }
      } catch (err) {
        console.error("Failed to load lesson:", err);
      } finally {
        setLoading(false);
      }
    }
    if (lessonId) loadLesson();
  }, [lessonId, nativeLanguage, targetLanguage]);

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
          isLessonRunner: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.evaluation) {
        const isCorrect = Boolean(data.evaluation.isCorrect);
        const score = typeof data.evaluation.score === "number" ? data.evaluation.score : (isCorrect ? 1 : 0);

        setEvaluationResult({
          isCorrect,
          score,
          feedback: data.evaluation.feedback,
          explanation: data.explanation || data.evaluation.explanation,
          improvedVersion: data.evaluation.improvedVersion,
        });

        // Record attempt in exercise history for accurate end-of-lesson accuracy calculation
        setExerciseHistory((prev) => {
          const filtered = prev.filter((e) => e.exerciseId !== currentExercise.id);
          return [...filtered, { exerciseId: currentExercise.id, isCorrect, score }];
        });

        // Record attempt for stats/mistakes without awarding standalone per-exercise XP
        await recordActivity({
          xpAwarded: 0,
          skipXpAward: true,
          isCorrect,
          prompt: currentExercise.prompt,
          exerciseCompleted: true,
          exerciseId: currentExercise.id,
          lessonId: lesson.id,
          minutes: 1,
          activityTitle: `Exercise: ${currentExercise.prompt.slice(0, 32)}`,
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
      // Calculate real accuracy and XP earned
      const totalExercises = lesson.exercises.length || 5;
      const correctCount = exerciseHistory.filter((e) => e.isCorrect).length;
      const accuracy = totalExercises > 0 ? Math.round((correctCount / totalExercises) * 100) : 100;

      // Base lesson reward is 30 XP (proportional to accuracy, minimum 5 XP for effort)
      const baseLessonXp = lesson.xpReward || 30;
      const calculatedEarnedXp = Math.max(5, Math.round((correctCount / totalExercises) * baseLessonXp));

      setCompletedMetrics({
        earnedXp: calculatedEarnedXp,
        accuracy,
        correctCount,
        totalCount: totalExercises,
      });

      // Complete lesson
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch(`/api/lessons/${lesson.id}/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          body: JSON.stringify({
            earnedXp: calculatedEarnedXp,
            accuracy,
            correctCount,
            totalExercises,
          }),
        });
        const data = await res.json();
        const serverEarnedXp = data?.xpAwarded ?? calculatedEarnedXp;
        if (data?.nextLesson) {
          setCompletedNextLesson(data.nextLesson);
        }

        // Ensure localStorage immediately records this completed lesson
        if (typeof window !== "undefined") {
          try {
            const rawStored = localStorage.getItem("lingua_completed_lessons");
            const existing: string[] = rawStored ? JSON.parse(rawStored) : [];
            if (!existing.includes(lesson.id)) {
              existing.push(lesson.id);
              localStorage.setItem("lingua_completed_lessons", JSON.stringify(existing));
            }
          } catch {}
        }

        // Record lesson completion (skip double DB XP increment if user is authenticated)
        await recordActivity({
          xpAwarded: serverEarnedXp,
          skipXpAward: Boolean(token),
          lessonCompleted: true,
          lessonId: lesson.id,
          minutes: lesson.estimatedMinutes || 10,
          activityTitle: `Lesson Completed: ${lesson.title}`,
        });

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("lingua_progress_updated", {
              detail: { lessonCompleted: true, lessonId: lesson.id, earnedXp: serverEarnedXp },
            })
          );
        }

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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600/20 blur-xl absolute inset-0 animate-pulse" />
          <Loader2 size={36} className="animate-spin text-indigo-400 relative z-10" />
        </div>
        <p className="text-sm font-semibold text-slate-400">{t.common.loading}</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 transition-colors">
        <p className="text-slate-400 mb-4">{t.common.error}</p>
        <Link href="/learning-path" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-950">
          {t.lessons.backToPath}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between transition-colors relative overflow-x-hidden">
      {/* Ambient background depth & lighting */}
      <div className="fixed inset-0 bg-ambient-canvas pointer-events-none -z-20" />
      <div className="ambient-orb orb-primary w-[550px] h-[550px] -top-32 left-1/4 -z-10" />
      <div className="ambient-orb orb-secondary w-[500px] h-[500px] bottom-10 right-1/4 -z-10" />
      <div className="ambient-orb orb-tertiary w-[350px] h-[350px] top-1/2 left-8 -z-10" />

      {/* Top Runner Navigation */}
      <header className="sticky top-0 z-20 bg-slate-950/75 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors shadow-sm">
        <Link
          href="/learning-path"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.lessons.backToPath}</span>
        </Link>

        {stage === "exercise" && (
          <div className="flex-1 max-w-xs mx-6">
            <div className="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden border border-white/[0.08] shimmer-bar shadow-inner p-0.5">
              <div
                className="bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
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
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              transliterationEnabled
                ? "bg-teal-950/70 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-950"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700"
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
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-full text-xs font-bold shadow-lg shadow-indigo-950 transition active:scale-95"
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
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.22)"
              className="rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 rounded-full inline-block shadow-sm">
                    {lesson.module.title} • {t.lessons.lessonTitle}
                  </span>
                  <span className="text-xs font-black px-2.5 py-1 bg-purple-950/70 border border-purple-500/40 text-purple-300 rounded-full font-mono shadow-sm">
                    CEFR {lesson.cefrLevel || "A1"}
                  </span>
                  {lesson.adaptiveStatus === "refresher" ? (
                    <span className="text-xs font-bold px-2.5 py-1 bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 rounded-full shadow-sm flex items-center gap-1">
                      <span>⚡</span> <span>Refresher Stage</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 bg-amber-950/80 border border-amber-400/50 text-amber-300 rounded-full shadow-sm flex items-center gap-1">
                      <span>🎯</span> <span>High Priority Focus</span>
                    </span>
                  )}
                </div>

                {lesson.adaptiveMessage && (
                  <div
                    className={`mb-4 p-4 rounded-2xl border flex items-start gap-3 shadow-lg ${
                      lesson.adaptiveStatus === "refresher"
                        ? "bg-cyan-950/50 border-cyan-500/40 text-cyan-200 shadow-cyan-950/30"
                        : "bg-indigo-950/50 border-indigo-500/40 text-indigo-200 shadow-indigo-950/30"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                      {lesson.adaptiveStatus === "refresher" ? "⚡" : "🎯"}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-xs uppercase tracking-wider">
                        {lesson.adaptiveStatus === "refresher"
                          ? "Klaus Mentorship • Refresher Stage"
                          : "Klaus Mentorship • Core Mastery Milestone"}
                      </h5>
                      <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                        {lesson.adaptiveMessage}
                      </p>
                    </div>
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                  {lesson.title}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {lesson.objective}
                </p>

                {lesson.culturalTip && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 shadow-md shadow-amber-950/20">
                    <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-amber-200">{t.lessons.culturalTipTitle}</h5>
                      <p className="text-xs text-amber-300/90 mt-0.5 leading-relaxed">{lesson.culturalTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </SpotlightCard>

            {/* Key Vocabulary Cards */}
            {lesson.vocabularies.length > 0 && (
              <div className="card-elevated rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-400" />
                    <span>{t.lessons.vocabularyTitle}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold font-mono">
                    {lesson.vocabularies.length} words
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {lesson.vocabularies.map((v) => (
                    <SpotlightCard
                      key={v.id}
                      spotlightColor="rgba(99, 102, 241, 0.16)"
                      className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/40 transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl font-bold text-white">
                            {v.targetWord}
                          </span>
                          <AudioPlayerButton
                            text={v.targetWord}
                            transliteration={v.transliteration || v.pronunciation}
                            langCode={targetLanguage}
                            size="sm"
                            isKlaus={true}
                          />
                        </div>
                        {transliterationEnabled && (
                          <div className="text-xs font-mono text-indigo-400 font-medium mb-1">
                            [{v.pronunciation}]
                          </div>
                        )}
                        <div className="text-sm font-semibold text-slate-300">
                          {v.nativeMeaning}
                        </div>
                      </div>

                      {v.exampleTarget && (
                        <div className="mt-3 pt-2 border-t border-slate-700/60 text-xs">
                          <div className="text-slate-200 font-medium">{v.exampleTarget}</div>
                          <div className="text-slate-400 text-[11px] mt-0.5">{v.exampleNative}</div>
                        </div>
                      )}
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            )}

            {/* Grammar Section */}
            {lesson.grammarTopics.length > 0 && (
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/90 shadow-xl space-y-4 transition-colors">
                {lesson.grammarTopics.map((g) => (
                  <div key={g.id} className="space-y-3">
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <Sparkles size={18} className="text-teal-400" />
                      <span>{g.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {g.explanation}
                    </p>

                    <div className="p-3.5 bg-teal-950/60 rounded-xl border border-teal-500/30 text-xs font-bold text-teal-200 shadow-sm shadow-teal-950">
                      Rule: {g.ruleSummary}
                    </div>

                    {g.examples && g.examples.length > 0 && (
                      <div className="space-y-2">
                        {g.examples.map((ex, i) => (
                          <div key={i} className="p-3 bg-slate-850/80 border border-slate-700/70 rounded-xl text-xs flex items-center justify-between">
                            <div>
                              <div className="font-bold text-white">{ex.target}</div>
                              {transliterationEnabled && ex.transliteration && (
                                <div className="text-indigo-400 font-mono text-[11px]">{ex.transliteration}</div>
                              )}
                              <div className="text-slate-400">{ex.native}</div>
                            </div>
                            <AudioPlayerButton
                              text={ex.target}
                              transliteration={ex.transliteration}
                              langCode={targetLanguage}
                              size="sm"
                              isKlaus={true}
                            />
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
              className="btn-tactile w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl font-bold text-base shadow-xl shadow-indigo-950 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:shadow-indigo-500/20"
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
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.2)"
              className="rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl space-y-6"
            >
              {/* Native Instruction Banner */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles size={13} className="text-indigo-400" />
                  <span>{currentExercise.instruction}</span>
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  {exerciseIndex + 1} / {lesson.exercises.length}
                </span>
              </div>

              {/* Prompt / Question */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                    {currentExercise.prompt}
                  </h2>
                  {transliterationEnabled && currentExercise.promptTransliteration && (
                    <div className="text-xs font-mono text-indigo-400 mt-1">
                      [{currentExercise.promptTransliteration}]
                    </div>
                  )}
                </div>
                <AudioPlayerButton
                  text={currentExercise.prompt}
                  transliteration={currentExercise.promptTransliteration || undefined}
                  langCode={targetLanguage}
                  size="md"
                  isKlaus={true}
                />
              </div>

              {/* Progressive Hint Display */}
              {currentHintText && (
                <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs text-amber-200 leading-relaxed flex items-start gap-2.5 animate-in fade-in shadow-md shadow-amber-950/20">
                  <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="whitespace-pre-wrap">{currentHintText}</div>
                </div>
              )}

              {/* --- EXERCISE TYPE 1: PICTORIAL IDENTIFICATION --- */}
              {currentExercise.type === "pictorial_identification" && currentExercise.options && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(currentExercise.options as (PictorialCardOption | string)[]).map((cardItem, idx) => {
                      const isObj = typeof cardItem === "object" && cardItem !== null;
                      const cardTarget = isObj ? (cardItem as PictorialCardOption).targetWord : String(cardItem);
                      const cardNative = isObj ? (cardItem as PictorialCardOption).nativeMeaning : "";
                      const cardIcon = isObj ? (cardItem as PictorialCardOption).icon : "🖼️";
                      const cardTranslit = isObj ? (cardItem as PictorialCardOption).transliteration : "";
                      const cardAudio = isObj ? (cardItem as PictorialCardOption).audioText || cardTarget : cardTarget;
                      const cardId = isObj ? (cardItem as PictorialCardOption).id : cardTarget;

                      const isSelected = userAnswer === cardTarget || userAnswer === cardId;
                      const isCorrectCard = Boolean(
                        evaluationResult &&
                          (cardTarget === currentExercise.correctAnswer ||
                            cardId === currentExercise.correctAnswer ||
                            currentExercise.acceptableAnswers?.includes(cardTarget))
                      );
                      const isWrongSelected = Boolean(evaluationResult && isSelected && !evaluationResult.isCorrect);

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (!evaluationResult) {
                              setUserAnswer(cardTarget);
                            }
                          }}
                          className={`relative p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                            evaluationResult
                              ? isCorrectCard
                                ? "bg-teal-950/70 border-teal-500 shadow-xl shadow-teal-950/40 ring-2 ring-teal-500/50"
                                : isWrongSelected
                                ? "bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950/40 ring-2 ring-rose-500/50"
                                : "bg-slate-850/40 border-slate-800 opacity-50"
                              : isSelected
                              ? "bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/50 scale-[1.02]"
                              : "bg-slate-850/80 border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/30"
                          }`}
                        >
                          {/* Header: Visual Illustration Icon & Audio Preview */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                              <span>{cardIcon}</span>
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <AudioPlayerButton
                                text={cardAudio}
                                transliteration={cardTranslit}
                                langCode={targetLanguage}
                                size="sm"
                                isKlaus={true}
                              />
                              {isSelected && !evaluationResult && (
                                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md">
                                  <Check size={14} className="stroke-[3]" />
                                </div>
                              )}
                              {isCorrectCard && (
                                <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md">
                                  <Check size={14} className="stroke-[3]" />
                                </div>
                              )}
                              {isWrongSelected && (
                                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                                  <XCircle size={16} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Text Content */}
                          <div>
                            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                              {cardTarget}
                            </div>
                            {transliterationEnabled && cardTranslit && (
                              <div className="text-xs font-mono text-indigo-400 font-semibold mt-0.5">
                                [{cardTranslit}]
                              </div>
                            )}
                            {/* Reveal native meaning ONLY after answer evaluation so it doesn't give away the question */}
                            {evaluationResult && cardNative && (
                              <div className="text-xs font-semibold text-teal-300/90 mt-1 animate-in fade-in">
                                {cardNative}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* --- EXERCISE TYPE 2: MULTIPLE CHOICE --- */}
              {currentExercise.type === "multiple_choice" && currentExercise.options && (
                <div className="space-y-3">
                  {currentExercise.options.map((opt, idx) => {
                    const isSelected = userAnswer === opt;
                    return (
                      <button
                        key={idx}
                        disabled={Boolean(evaluationResult)}
                        onClick={() => setUserAnswer(opt)}
                        className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between active:scale-95 ${
                          isSelected
                            ? "bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-950/50"
                            : "bg-slate-850/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-sm">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- EXERCISE TYPE 3: LISTENING AUDITORY RECOGNITION --- */}
              {currentExercise.type === "listening" && (
                <div className="space-y-4">
                  {/* Spoken Audio Re-play Banner */}
                  <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-900/80 flex items-center justify-center text-indigo-300">
                        <Volume2 size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                          Klaus Audio Prompt
                        </div>
                        <div className="text-xs text-slate-300">Tap speaker to replay Klaus pronunciation</div>
                      </div>
                    </div>
                    <AudioPlayerButton
                      text={currentExercise.audioText || currentExercise.prompt}
                      transliteration={currentExercise.promptTransliteration || undefined}
                      langCode={targetLanguage}
                      size="md"
                      isKlaus={true}
                    />
                  </div>

                  {currentExercise.options && currentExercise.options.length > 0 ? (
                    <div className="space-y-3">
                      {currentExercise.options.map((opt, idx) => {
                        const isSelected = userAnswer === opt;
                        return (
                          <button
                            key={idx}
                            disabled={Boolean(evaluationResult)}
                            onClick={() => setUserAnswer(opt)}
                            className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between active:scale-95 ${
                              isSelected
                                ? "bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-950/50"
                                : "bg-slate-850/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200"
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-sm">
                                <Check size={12} className="stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <textarea
                      rows={3}
                      disabled={Boolean(evaluationResult)}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={t.exercises.typeYourAnswer}
                      className="w-full p-4 rounded-2xl border border-slate-700/80 bg-slate-850 text-white text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none placeholder-slate-500"
                    />
                  )}
                </div>
              )}

              {/* --- EXERCISE TYPE 4: TRANSLATION / WRITING / FILL BLANK --- */}
              {["translation", "reverse_translation", "fill_blank", "writing"].includes(
                currentExercise.type
              ) && (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    disabled={Boolean(evaluationResult)}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={t.exercises.typeYourAnswer}
                    className="w-full p-4 rounded-2xl border border-slate-700/80 bg-slate-850 text-white text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none placeholder-slate-500"
                  />
                </div>
              )}

              {/* --- EXERCISE TYPE 3: WORD ORDERING --- */}
              {currentExercise.type === "word_order" && (
                <div className="space-y-4">
                  {/* Selected Words Dropzone */}
                  <div className="min-h-16 p-4 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-indigo-950/20 flex flex-wrap gap-2 items-center">
                    {selectedWords.length === 0 ? (
                      <span className="text-xs text-slate-500 font-medium">
                        {t.exercises.tapWordsToOrder}
                      </span>
                    ) : (
                      selectedWords.map((word, i) => (
                        <button
                          key={i}
                          disabled={Boolean(evaluationResult)}
                          onClick={() => handleWordDeselect(word, i)}
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-950 transition active:scale-95"
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
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-slate-200 rounded-xl text-sm font-semibold shadow-sm transition active:scale-95"
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
                  className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-200 shadow-xl ${
                    evaluationResult.isCorrect
                      ? "bg-teal-950/60 border-teal-500/40 text-teal-200 shadow-teal-950/30"
                      : "bg-rose-950/60 border-rose-500/40 text-rose-200 shadow-rose-950/30"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {evaluationResult.isCorrect ? (
                      <>
                        <CheckCircle2 size={18} className="text-teal-400" />
                        <span>{evaluationResult.feedback}</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="text-rose-400" />
                        <span>{evaluationResult.feedback}</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs space-y-1 mt-2">
                    {!evaluationResult.isCorrect && (
                      <div className="font-semibold text-white">
                        {t.exercises.solutionTitle} {currentExercise.correctAnswer}
                      </div>
                    )}
                    <div className="text-slate-300 leading-relaxed">
                      {evaluationResult.explanation}
                    </div>

                    {!evaluationResult.isCorrect && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setKlausInitialQuery(
                              nativeLanguage === "te"
                                ? `ఈ ప్రశ్నలో నేను '${userAnswer}' అని సమాధానం ఇచ్చాను. కానీ సరైన సమాధానం '${currentExercise.correctAnswer}'. ఈ తప్పును వ్యాకరణపరంగా వివరంగా వివరించండి.`
                                : nativeLanguage === "hi"
                                ? `मैंने इस प्रश्न में '${userAnswer}' उत्तर दिया, लेकिन सही उत्तर '${currentExercise.correctAnswer}' है। मुझे इसका व्याकरण विस्तार से समझाइए।`
                                : `I answered '${userAnswer}', but the correct answer is '${currentExercise.correctAnswer}'. Please explain the grammar rule behind this.`
                            );
                            setIsKlausModalOpen(true);
                          }}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition shadow-sm active:scale-95"
                        >
                          <KlausAvatar mood="explaining" size="sm" />
                          <span>Ask Klaus to Explain Mistake</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </SpotlightCard>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-3">
              {/* Request Hint via Klaus */}
              {!evaluationResult && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleProgressiveHint}
                    className="btn-tactile flex items-center gap-1.5 px-4 py-2.5 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 rounded-2xl border border-amber-500/30 font-bold text-xs transition active:scale-95 shadow-sm"
                  >
                    <Lightbulb size={15} className="text-amber-400" />
                    <span>
                      {hintStep === 1
                        ? t.exercises.progressiveHint1
                        : hintStep === 2
                        ? t.exercises.progressiveHint2
                        : t.exercises.progressiveHint3}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setKlausInitialQuery(
                        nativeLanguage === "te"
                          ? `ఈ ప్రశ్నను ఎలా సాధించాలో నాకు ఒక సూచన ఇవ్వండి: '${currentExercise.prompt}'`
                          : nativeLanguage === "hi"
                          ? `इस प्रश्न को हल करने के लिए संकेत दीजिए: '${currentExercise.prompt}'`
                          : `Give me a hint for this question: '${currentExercise.prompt}'`
                      );
                      setIsKlausModalOpen(true);
                    }}
                    className="btn-tactile flex items-center gap-1.5 px-3.5 py-2.5 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 rounded-2xl border border-indigo-500/30 font-bold text-xs transition active:scale-95 shadow-sm"
                  >
                    <Sparkles size={14} className="text-indigo-400" />
                    <span>Ask Klaus</span>
                  </button>
                </div>
              )}

              {/* Submit or Next Button */}
              {!evaluationResult ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!userAnswer.trim() || evaluating}
                  className="btn-tactile ml-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-950 transition flex items-center gap-2 active:scale-95"
                >
                  {evaluating ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <span>{t.common.check}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextExercise}
                  className="btn-tactile ml-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-950 transition flex items-center gap-2 active:scale-95"
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
          <SpotlightCard
            spotlightColor="rgba(20, 184, 166, 0.25)"
            className="rounded-3xl p-8 border border-teal-500/30 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-lg mx-auto relative overflow-hidden shadow-glow-teal"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <ConfettiEffect trigger={true} />
            <div className="w-20 h-20 mx-auto bg-teal-950/60 border border-teal-500/30 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-950/50">
              <KlausAvatar mood="happy" size="lg" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                {t.lessons.lessonCompleted}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                You have successfully mastered {lesson.title}!
              </p>
            </div>

            <div className="p-4 bg-slate-850/80 border border-slate-700/80 rounded-2xl flex items-center justify-around shadow-inner">
              <div>
                <div className="text-xs text-slate-400 font-semibold">{t.common.xp}</div>
                <div className="text-2xl font-black text-indigo-400">+{completedMetrics.earnedXp} XP</div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div>
                <div className="text-xs text-slate-400 font-semibold">{t.common.accuracy}</div>
                <div
                  className={`text-2xl font-black ${
                    completedMetrics.accuracy >= 80
                      ? "text-teal-400"
                      : completedMetrics.accuracy >= 50
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {completedMetrics.accuracy}%
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300 bg-slate-800/60 border border-slate-700/60 rounded-xl py-2 px-3">
              {completedMetrics.accuracy === 100
                ? "🌟 Perfect score! All exercises answered correctly."
                : completedMetrics.accuracy >= 80
                ? `👏 Great job! You solved ${completedMetrics.correctCount} of ${completedMetrics.totalCount} exercises correctly.`
                : `💪 Keep practicing! You solved ${completedMetrics.correctCount} of ${completedMetrics.totalCount} exercises correctly.`}
            </div>

            <div className="space-y-3">
              {(completedNextLesson || lesson.nextLesson) ? (
                <Link
                  href={`/lessons/${(completedNextLesson || lesson.nextLesson)?.id}`}
                  className="btn-tactile w-full py-3.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-950/40 flex items-center justify-center gap-2 transition active:scale-95 hover:scale-[1.01]"
                >
                  <Play size={16} className="fill-white" />
                  <span>
                    Continue to Lesson {(completedNextLesson || lesson.nextLesson)?.orderIndex}: {(completedNextLesson || lesson.nextLesson)?.title}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ) : null}

              <Link
                href="/learning-path"
                className="btn-tactile w-full py-3.5 bg-slate-800 hover:bg-slate-750 text-white rounded-2xl font-bold text-sm shadow-lg border border-slate-700 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Compass size={16} className="text-indigo-400" />
                <span>Return to Learning Path Roadmap</span>
              </Link>

              <Link
                href="/review"
                className="btn-tactile w-full py-3 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-2 border border-slate-750 active:scale-95"
              >
                <RotateCcw size={14} className="text-amber-400" />
                <span>{t.nav.review} Due Vocabulary</span>
              </Link>
            </div>
          </SpotlightCard>
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
