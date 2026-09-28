"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Check,
  RotateCcw,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import SpotlightCard from "@/components/SpotlightCard";

interface PracticeExercise {
  id: string;
  lessonId: string;
  lessonTitle: string;
  type: string;
  instruction: string;
  prompt: string;
  promptTransliteration?: string | null;
  options?: string[];
}

function PracticeContent() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const { recordActivity } = useAuth();
  const searchParams = useSearchParams();
  const focusParam = searchParams.get("focus");

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    isCorrect: boolean;
    score: number;
    feedback: string;
    explanation: string;
  } | null>(null);

  const [hintText, setHintText] = useState("");

  useEffect(() => {
    async function loadPractice() {
      setLoading(true);
      try {
        const res = await fetch(`/api/practice?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.exercises) {
          const list: PracticeExercise[] = data.exercises;
          if (focusParam && list.length > 0) {
            const cleanFocus = focusParam.toLowerCase().trim();
            const idx = list.findIndex(
              (ex) =>
                ex.prompt.toLowerCase().includes(cleanFocus) ||
                cleanFocus.includes(ex.prompt.toLowerCase())
            );
            if (idx > 0) {
              const prioritized = [list[idx], ...list.slice(0, idx), ...list.slice(idx + 1)];
              setExercises(prioritized);
              return;
            }
          }
          setExercises(list);
        }
      } catch (err) {
        console.error("Practice loading error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPractice();
  }, [nativeLanguage, targetLanguage, focusParam]);

  const currentEx = exercises[currentIndex];

  const handleCheck = async () => {
    if (!currentEx || !userAnswer.trim() || evaluating) return;
    setEvaluating(true);

    try {
      const res = await fetch(`/api/practice/${currentEx.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswer: userAnswer.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.evaluation) {
        setEvaluation(data.evaluation);
        const earnedXp = data.xpAwarded ?? (data.evaluation.isCorrect ? 10 : 0);
        await recordActivity({
          xpAwarded: earnedXp,
          isCorrect: data.evaluation.isCorrect,
          prompt: currentEx.prompt,
          exerciseCompleted: true,
          minutes: 1,
          activityTitle: `Practice: "${currentEx.prompt.length > 25 ? currentEx.prompt.slice(0, 25) + '...' : currentEx.prompt}"`,
        });
      }
    } catch (err) {
      console.error("Failed to evaluate practice answer:", err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    setEvaluation(null);
    setUserAnswer("");
    setHintText("");
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header */}
        <div className="card-elevated rounded-3xl p-6 sm:p-7 flex items-center justify-between relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 rounded-full text-xs font-bold mb-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <GraduationCap size={14} className="text-indigo-400" />
              <span>Target Practice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.nav.practice}</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm leading-relaxed font-normal">
              Reinforce target phrases with immediate NLP answer feedback and phonetic guidance.
            </p>
          </div>
          <div className="animate-float-slow shrink-0 p-1">
            <KlausAvatar mood="explaining" size="lg" />
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center stagger-2">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : exercises.length === 0 ? (
          <div className="card-elevated rounded-3xl p-12 text-center stagger-2">
            <p className="text-xs text-slate-400">No practice exercises available for this pair.</p>
          </div>
        ) : (
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.14)"
            className="card-elevated rounded-3xl p-6 sm:p-8 space-y-6 stagger-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 rounded-full shadow-sm flex items-center gap-1.5">
                <Sparkles size={12} className="text-indigo-400" />
                <span>{currentEx.instruction}</span>
              </span>
              <span className="text-xs font-semibold text-slate-400 font-mono">
                {currentIndex + 1} / {exercises.length}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {currentEx.prompt}
                </h2>
                {transliterationEnabled && currentEx.promptTransliteration && (
                  <div className="text-xs font-mono text-indigo-400 mt-1 font-medium">
                    [{currentEx.promptTransliteration}]
                  </div>
                )}
              </div>
              <AudioPlayerButton
                text={currentEx.prompt}
                transliteration={currentEx.promptTransliteration || undefined}
                langCode={targetLanguage}
                size="md"
                isKlaus={true}
              />
            </div>

            {/* MCQ Options */}
            {currentEx.type === "multiple_choice" && currentEx.options && (
              <div className="space-y-3">
                {currentEx.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={Boolean(evaluation)}
                    onClick={() => setUserAnswer(opt)}
                    className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-300 flex items-center justify-between active:scale-[0.98] ${
                      userAnswer === opt
                        ? "bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/50 scale-[1.01]"
                        : "card-interactive border-white/[0.08] text-slate-200"
                    }`}
                  >
                    <span>{opt}</span>
                    {userAnswer === opt && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-md">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Text Input */}
            {currentEx.type !== "multiple_choice" && (
              <textarea
                rows={3}
                disabled={Boolean(evaluation)}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={t.exercises.typeYourAnswer}
                className="w-full p-4 rounded-2xl border border-white/[0.08] bg-slate-900/80 text-white text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none placeholder-slate-500 shadow-inner"
              />
            )}

            {/* Feedback Panel */}
            {evaluation && (
              <div
                className={`p-4 rounded-2xl border text-xs shadow-xl animate-in fade-in duration-200 ${
                  evaluation.isCorrect
                    ? "bg-teal-950/70 border-teal-500/50 text-teal-200 shadow-teal-950/30"
                    : "bg-rose-950/70 border-rose-500/50 text-rose-200 shadow-rose-950/30"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {evaluation.isCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-teal-400" />
                      <span>{evaluation.feedback}</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-rose-400" />
                      <span>{evaluation.feedback}</span>
                    </>
                  )}
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">{evaluation.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">{currentEx.lessonTitle}</span>

              {!evaluation ? (
                <button
                  onClick={handleCheck}
                  disabled={!userAnswer.trim() || evaluating}
                  className="btn-tactile px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-600 text-white rounded-2xl font-bold text-xs shadow-xl shadow-indigo-600/30"
                >
                  {evaluating ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <span>{t.common.check}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-tactile px-8 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-xs shadow-xl shadow-indigo-950 flex items-center gap-1.5"
                >
                  <span>{t.common.next}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </SpotlightCard>
        )}
      </div>
    </AppLayout>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <AppLayout>
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
          </div>
        </AppLayout>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
