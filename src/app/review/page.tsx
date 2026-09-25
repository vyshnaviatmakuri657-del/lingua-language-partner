"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Flame,
  Diamond,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";

interface ReviewCard {
  vocabularyId: string;
  targetWord: string;
  nativeMeaning: string;
  pronunciation: string;
  transliteration?: string | null;
  partOfSpeech: string;
  exampleTarget: string;
  exampleNative: string;
  box: number;
  mastery: number;
}

export default function ReviewPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const res = await fetch(`/api/review?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.cards) {
          setCards(data.cards);
        }
      } catch (err) {
        console.error("Review fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, [nativeLanguage, targetLanguage]);

  const currentCard = cards[currentIndex];

  const handleRate = async (remembered: boolean) => {
    if (!currentCard || submitting) return;
    setSubmitting(true);

    try {
      await fetch(`/api/review/${currentCard.vocabularyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remembered }),
      });
      await refreshUser();
      setReviewedCount((c) => c + 1);
    } catch (err) {
      console.warn("Rating error:", err);
    } finally {
      setSubmitting(false);
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-2">
              <RotateCcw size={14} />
              <span>{t.review.boxLevel} 1 - 5</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{t.review.pageTitle}</h1>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              {t.review.spacedRepetitionInfo}
            </p>
          </div>
          <KlausAvatar mood="idle" size="lg" />
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : currentIndex >= cards.length ? (
          /* Finished Reviewing Cards */
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-teal-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={32} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{t.review.noCardsDue}</h3>
            <p className="text-xs text-slate-500">
              You reviewed {reviewedCount} cards in this session! Spaced repetition intervals have been refreshed.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/learning-path"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                {t.nav.learningPath}
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                {t.nav.dashboard}
              </Link>
            </div>
          </div>
        ) : (
          /* Active Flashcard */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
              <span>
                {currentIndex + 1} / {cards.length} {t.review.cardsDue}
              </span>
              <span>Box {currentCard.box} / 5</span>
            </div>

            {/* Interactive Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-72 cursor-pointer bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-400 p-8 shadow-sm flex flex-col justify-between text-center transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Target: {targetLanguage.toUpperCase()}
                </span>
                <AudioPlayerButton text={currentCard.targetWord} langCode={targetLanguage} size="sm" />
              </div>

              <div className="my-auto py-6">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
                  {currentCard.targetWord}
                </h2>
                {transliterationEnabled && (
                  <p className="text-sm font-mono text-indigo-600 font-semibold mb-3">
                    [{currentCard.pronunciation}]
                  </p>
                )}

                {isFlipped ? (
                  <div className="animate-in fade-in zoom-in-95 duration-200 space-y-2 mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xl font-bold text-teal-700">
                      {currentCard.nativeMeaning}
                    </div>
                    {currentCard.exampleTarget && (
                      <div className="text-xs text-slate-600 italic">
                        &quot;{currentCard.exampleTarget}&quot;
                      </div>
                    )}
                    {currentCard.exampleNative && (
                      <div className="text-xs text-slate-500">
                        {currentCard.exampleNative}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="inline-block mt-4 text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition">
                    {t.review.flipCard}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <span>Mastery: {currentCard.mastery}%</span>
              </div>
            </div>

            {/* Rating Buttons */}
            {isFlipped && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  disabled={submitting}
                  onClick={() => handleRate(false)}
                  className="p-4 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-700 rounded-2xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  <AlertCircle size={16} />
                  <span>{t.review.hardToRemember}</span>
                </button>

                <button
                  disabled={submitting}
                  onClick={() => handleRate(true)}
                  className="p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-teal-200 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>{t.review.gotItRight}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
