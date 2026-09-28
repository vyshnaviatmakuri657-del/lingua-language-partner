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
import SpotlightCard from "@/components/SpotlightCard";

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
  const { refreshUser, recordVocabularyReview } = useAuth();

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
          const guestSaved = typeof window !== "undefined" ? localStorage.getItem("lingua_guest_progress") : null;
          let guestVocabs: Record<string, any> = {};
          if (guestSaved) {
            try {
              guestVocabs = JSON.parse(guestSaved).vocabProgress || {};
            } catch {}
          }
          const mergedCards = data.cards.map((c: ReviewCard) => {
            const guestCard = guestVocabs[c.vocabularyId];
            if (guestCard) {
              return {
                ...c,
                box: guestCard.box || c.box,
                mastery: guestCard.mastery || c.mastery,
              };
            }
            return c;
          });
          setCards(mergedCards);
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
      await recordVocabularyReview(currentCard.vocabularyId, remembered);
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
      <div className="max-w-xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header Card */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 flex items-center justify-between relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold mb-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <RotateCcw size={14} className="text-amber-400" />
              <span>{t.review.boxLevel} 1 - 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.review.pageTitle}</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm leading-relaxed font-normal">
              {t.review.spacedRepetitionInfo}
            </p>
          </div>
          <div className="animate-float-slow shrink-0 p-1">
            <KlausAvatar mood="idle" size="lg" />
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center stagger-2">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : currentIndex >= cards.length ? (
          /* Finished Reviewing Cards */
          <div className="card-elevated rounded-3xl p-8 text-center space-y-4 shadow-xl relative overflow-hidden stagger-2">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 mx-auto bg-teal-950/70 border border-teal-500/40 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-950/50">
              <CheckCircle2 size={32} className="text-teal-400" />
            </div>
            <h3 className="text-xl font-black text-white">{t.review.noCardsDue}</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              You reviewed {reviewedCount} cards in this session! Spaced repetition intervals have been refreshed.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/learning-path"
                className="btn-tactile px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                {t.nav.learningPath}
              </Link>
              <Link
                href="/dashboard"
                className="btn-tactile px-6 py-3 bg-slate-900/80 hover:bg-slate-850 text-slate-200 rounded-2xl text-xs font-semibold border border-white/[0.08]"
              >
                {t.nav.dashboard}
              </Link>
            </div>
          </div>
        ) : (
          /* Active Flashcard */
          <div className="space-y-4 stagger-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>{currentIndex + 1} / {cards.length} {t.review.cardsDue}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-white/[0.08] text-amber-300 font-bold">
                Box {currentCard.box} / 5
              </span>
            </div>

            {/* Interactive Flip Card */}
            <SpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.16)"
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-72 cursor-pointer card-elevated rounded-3xl p-8 flex flex-col justify-between text-center transition-all duration-300 relative group hover:border-amber-500/50 hover:shadow-amber-500/10 hover:-translate-y-1 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Target: {targetLanguage.toUpperCase()}
                </span>
                <AudioPlayerButton
                  text={currentCard.targetWord}
                  transliteration={currentCard.pronunciation}
                  langCode={targetLanguage}
                  size="sm"
                  isKlaus={true}
                />
              </div>

              <div className="my-auto py-6">
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                  {currentCard.targetWord}
                </h2>
                {transliterationEnabled && (
                  <p className="text-sm font-mono text-indigo-400 font-semibold mb-3">
                    [{currentCard.pronunciation}]
                  </p>
                )}

                {isFlipped ? (
                  <div className="animate-in fade-in zoom-in-95 duration-200 space-y-2 mt-4 pt-4 border-t border-white/[0.08]">
                    <div className="text-2xl font-black text-teal-400">
                      {currentCard.nativeMeaning}
                    </div>
                    {currentCard.exampleTarget && (
                      <div className="text-xs text-slate-300 italic">
                        &quot;{currentCard.exampleTarget}&quot;
                      </div>
                    )}
                    {currentCard.exampleNative && (
                      <div className="text-xs text-slate-400">
                        {currentCard.exampleNative}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="inline-block mt-4 text-xs font-medium text-slate-400 group-hover:text-amber-300 transition">
                    {t.review.flipCard}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-mono">
                <span>Mastery: {currentCard.mastery}%</span>
              </div>
            </SpotlightCard>

            {/* Rating Buttons */}
            {isFlipped && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  disabled={submitting}
                  onClick={() => handleRate(false)}
                  className="btn-tactile p-4 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 hover:border-rose-500 text-rose-300 rounded-2xl font-bold text-xs shadow-lg shadow-rose-950/30 flex items-center justify-center gap-2"
                >
                  <AlertCircle size={16} />
                  <span>{t.review.hardToRemember}</span>
                </button>

                <button
                  disabled={submitting}
                  onClick={() => handleRate(true)}
                  className="btn-tactile p-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-2xl font-bold text-xs shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2"
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
