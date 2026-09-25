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
      const res = await fetch("/api/placement/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      }
    } catch (e) {
      console.error("Failed to grade placement test:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <Loader2 size={36} className="animate-spin text-indigo-600 mb-4" />
        <p className="text-sm font-semibold text-slate-600">{t.common.loading}</p>
      </div>
    );
  }

  // Completed Results Screen
  if (results) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
        <ConfettiEffect trigger={true} />
        <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-teal-50 rounded-2xl flex items-center justify-center">
            <KlausAvatar mood="happy" size="lg" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            {t.placement.completeTitle}
          </h1>

          <div className="flex items-center justify-center gap-6 my-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <div className="text-xs text-slate-400 font-semibold">{t.placement.resultScore}</div>
              <div className="text-3xl font-black text-indigo-600">{results.score}%</div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="text-xs text-slate-400 font-semibold">{t.placement.resultLevel}</div>
              <div className="text-3xl font-black text-teal-600">{results.recommendedLevel}</div>
            </div>
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
                    ? "bg-teal-50/50 border-teal-200 text-teal-900"
                    : "bg-rose-50/50 border-rose-200 text-rose-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">
                    Q{i + 1}: {r.instruction}
                  </span>
                  {r.isCorrect ? (
                    <span className="flex items-center gap-1 text-teal-700 font-bold">
                      <CheckCircle2 size={14} /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-600 font-bold">
                      <XCircle size={14} /> Incorrect
                    </span>
                  )}
                </div>
                <div className="text-slate-800 font-medium mb-1">&quot;{r.question}&quot;</div>
                <div className="text-slate-500 font-normal">
                  <span className="font-semibold text-slate-700">{t.exercises.explanationTitle}</span>{" "}
                  {r.explanation}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/learning-path")}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition active:scale-95"
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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-600 mb-4">No diagnostic questions found for this language pair.</p>
        <button
          onClick={() => router.push("/learning-path")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm"
        >
          {t.common.continue}
        </button>
      </div>
    );
  }

  const selectedAnswer = selectedAnswers[currentQ.id];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between py-2">
        <button
          onClick={() => router.push("/onboarding")}
          className="text-xs font-semibold text-slate-400 hover:text-slate-700"
        >
          {t.common.cancel}
        </button>

        {/* Question Counter Bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="max-w-xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Native Language Instruction */}
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-4 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
            <Sparkles size={14} />
            <span>{currentQ.instruction}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
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
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50/80 text-slate-800"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
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
      <div className="max-w-xl w-full mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <KlausAvatar mood="idle" size="sm" />
          <span>Klaus Diagnostic</span>
        </div>

        <button
          disabled={!selectedAnswer || isSubmitting}
          onClick={handleNext}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition flex items-center gap-2"
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
