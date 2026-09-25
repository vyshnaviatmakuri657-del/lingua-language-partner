"use client";

import React, { useState, useEffect } from "react";
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
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";

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

export default function PracticePage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
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
          setExercises(data.exercises);
        }
      } catch (err) {
        console.error("Practice loading error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPractice();
  }, [nativeLanguage, targetLanguage]);

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
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
              <GraduationCap size={14} />
              <span>Target Practice</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{t.nav.practice}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Reinforce target phrases with immediate NLP answer feedback.
            </p>
          </div>
          <KlausAvatar mood="explaining" size="lg" />
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : exercises.length === 0 ? (
          <div className="p-12 bg-white rounded-3xl text-center border border-slate-200">
            <p className="text-xs text-slate-500">No practice exercises available for this pair.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                {currentEx.instruction}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {currentIndex + 1} / {exercises.length}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentEx.prompt}
                </h2>
                {transliterationEnabled && currentEx.promptTransliteration && (
                  <div className="text-xs font-mono text-indigo-600 mt-1">
                    [{currentEx.promptTransliteration}]
                  </div>
                )}
              </div>
              <AudioPlayerButton text={currentEx.prompt} langCode={targetLanguage} size="md" />
            </div>

            {/* MCQ Options */}
            {currentEx.type === "multiple_choice" && currentEx.options && (
              <div className="space-y-3">
                {currentEx.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={Boolean(evaluation)}
                    onClick={() => setUserAnswer(opt)}
                    className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition flex items-center justify-between ${
                      userAnswer === opt
                        ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <span>{opt}</span>
                    {userAnswer === opt && (
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
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
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
              />
            )}

            {/* Feedback Panel */}
            {evaluation && (
              <div
                className={`p-4 rounded-2xl border text-xs ${
                  evaluation.isCorrect
                    ? "bg-teal-50 border-teal-200 text-teal-900"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {evaluation.isCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-teal-600" />
                      <span>{evaluation.feedback}</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-rose-600" />
                      <span>{evaluation.feedback}</span>
                    </>
                  )}
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">{evaluation.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">{currentEx.lessonTitle}</span>

              {!evaluation ? (
                <button
                  onClick={handleCheck}
                  disabled={!userAnswer.trim() || evaluating}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-95"
                >
                  {evaluating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span>{t.common.check}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
                >
                  <span>{t.common.next}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
