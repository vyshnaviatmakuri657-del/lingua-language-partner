"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import ConfettiEffect from "@/components/ConfettiEffect";

interface PlacementQuestion {
  id: string;
  orderIndex: number;
  difficulty: string;
  instruction: string;
  question: string;
  options: string[];
}

interface QuestionResult {
  questionId: string;
  instruction: string;
  question: string;
  submittedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export default function PlacementTestPage() {
  const router = useRouter();
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { recordActivity, refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [testId, setTestId] = useState("");
  const [questions, setQuestions] = useState<PlacementQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    recommendedLevel: string;
    detailedResults: QuestionResult[];
  } | null>(null);

  // Load placement questions for this pair
  useEffect(() => {
    async function loadTest() {
      setLoading(true);
      try {
        const res = await fetch("/api/placement/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nativeLanguageCode: nativeLanguage,
            targetLanguageCode: targetLanguage,
          }),
        });
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setTestId(data.testId);
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error("Failed to load placement questions:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, [nativeLanguage, targetLanguage]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (!currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/placement/answer", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          testId,
          answers: selectedAnswers,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResults({
          score: data.score,
          recommendedLevel: data.recommendedLevel,
          detailedResults: data.detailedResults,
        });

        const diagnosticPayload = {
          hasPlacement: true,
          score: data.score,
          recommendedLevel: data.recommendedLevel,
          masteredModules: data.masteredModules || [],
          focusModules: data.focusModules || [],
          refresherModulesCount: (data.masteredModules || []).length,
          focusModulesCount: (data.focusModules || []).length,
          timestamp: Date.now(),
        };

        if (typeof window !== "undefined") {
          localStorage.setItem(
            `lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`,
            JSON.stringify(diagnosticPayload)
          );
          localStorage.setItem("lingua_placement_diagnostic", JSON.stringify(diagnosticPayload));
        }

        await recordActivity({
          xpAwarded: 50,
          minutes: 5,
          activityTitle: `Placement Test: ${data.recommendedLevel} Calibrated`,
        });
        await refreshUser();
      }
    } catch (e) {
      console.error("Failed to grade placement test:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <Loader2 size={36} className="animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-semibold text-slate-400">{t.common.loading}</p>
      </div>
    );
  }

  // Completed Results Screen
  if (results) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <ConfettiEffect trigger={true} />
        <div className="max-w-2xl w-full card-elevated rounded-3xl border border-white/[0.1] shadow-2xl p-6 sm:p-8 text-center relative z-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/80 border border-white/[0.1] rounded-2xl flex items-center justify-center shadow-card-elevated animate-float">
            <KlausAvatar mood="happy" size="lg" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
            {t.placement.completeTitle}
          </h1>

          <div className="flex items-center justify-center gap-6 my-6 p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-inner">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.placement.resultScore}</div>
              <div className="text-3xl font-black text-indigo-400">{results.score}%</div>
            </div>
            <div className="w-px h-10 bg-white/[0.08]" />
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.placement.resultLevel}</div>
              <div className="text-3xl font-black text-teal-400 font-mono">CEFR {results.recommendedLevel}</div>
            </div>
          </div>

          {/* Adaptive Weighting Breakdown */}
          <div className="p-4 mb-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-left space-y-2 shadow-inner">
            <div className="font-extrabold text-white flex items-center gap-2">
              <Sparkles size={15} className="text-indigo-400" />
              <span>Personalized CEFR Pathway Calibrated:</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              All curriculum stages are preserved in your roadmap. Concepts you answered accurately are unlocked as <strong className="text-cyan-300">⚡ Refresher modules</strong> (fast-tracked review with boosted Leitner SRS recall). Challenging areas are marked for <strong className="text-amber-300">🎯 High Priority Focus</strong> with all 5 interactive exercises.
            </p>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left space-y-3 mb-8 max-h-[40vh] overflow-y-auto pr-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.lessons.practiceTitle} Review:
            </h4>
            {results.detailedResults.map((r, i) => (
              <div
                key={r.questionId}
                className={`p-3.5 rounded-xl border text-xs ${
                  r.isCorrect
                    ? "bg-teal-950/40 border-teal-500/40 text-teal-200"
                    : "bg-rose-950/40 border-rose-500/40 text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">
                    Q{i + 1}: {r.instruction}
                  </span>
                  {r.isCorrect ? (
                    <span className="flex items-center gap-1 text-teal-400 font-bold">
                      <CheckCircle2 size={14} /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-400 font-bold">
                      <XCircle size={14} /> Incorrect
                    </span>
                  )}
                </div>
                <div className="text-slate-300 font-medium mb-1">&quot;{r.question}&quot;</div>
                <div className="text-slate-400 font-normal">
                  <span className="font-semibold text-slate-300">{t.exercises.explanationTitle}</span>{" "}
                  {r.explanation}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/learning-path")}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-glow-indigo flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:scale-[1.01]"
          >
            <span>{t.placement.startPersonalizedPath}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <p className="text-slate-400 mb-4">No diagnostic questions found for this language pair.</p>
        <button
          onClick={() => router.push("/learning-path")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-glow-indigo transition"
        >
          {t.common.continue}
        </button>
      </div>
    );
  }

  const selectedAnswer = selectedAnswers[currentQ.id];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between py-2 relative z-10">
        <button
          onClick={() => router.push("/learning-path")}
          className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/[0.05] transition"
        >
          {t.common.cancel}
        </button>

        {/* Question Counter Bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/[0.08]">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-300 shadow-glow-indigo shimmer-bar"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="max-w-xl w-full mx-auto my-auto py-8 relative z-10">
        <div className="card-elevated rounded-3xl border border-white/[0.1] p-6 sm:p-8 shadow-2xl">
          {/* Native Language Instruction */}
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-4 bg-indigo-950/70 border border-indigo-500/30 px-3 py-1.5 rounded-full w-fit shadow-sm">
            <Sparkles size={14} className="text-indigo-400" />
            <span>{currentQ.instruction}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between active:scale-95 ${
                    isSelected
                      ? "card-elevated border-indigo-500/80 text-white ring-2 ring-indigo-500/30 shadow-glow-indigo"
                      : "card-interactive border-white/[0.08] hover:border-white/[0.16] text-slate-200"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-glow-indigo">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="max-w-xl w-full mx-auto py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <KlausAvatar mood="idle" size="sm" />
          <span>Diagnostic Assessment</span>
        </div>

        <button
          disabled={!selectedAnswer || isSubmitting}
          onClick={handleNext}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold text-sm shadow-glow-indigo transition-all duration-200 flex items-center gap-2 active:scale-95 hover:scale-[1.02] disabled:shadow-none"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span>{currentIndex === questions.length - 1 ? t.common.submit : t.common.next}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
