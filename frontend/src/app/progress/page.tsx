"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart2,
  Flame,
  Diamond,
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import SpotlightCard from "@/components/SpotlightCard";

export default function ProgressPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { user, progress } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverData, setServerData] = useState<any>(null);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.ok) {
        const resData = await res.json();
        setServerData(resData);
      }
    } catch (err) {
      console.error("Failed to load progress:", err);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const handleUpdate = () => {
      loadStats();
    };

    window.addEventListener("lingua_progress_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      window.removeEventListener("lingua_progress_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [user, nativeLanguage, targetLanguage, loadStats]);

  const lvlNum = user ? (serverData?.currentLevel ?? user.progress?.currentLevel ?? progress.currentLevel) : progress.currentLevel;
  const activeLevel = lvlNum > 4 ? "B1" : lvlNum > 2 ? "A2" : "A1";

  const data = {
    currentStreak: user ? (serverData?.currentStreak ?? user.streak?.currentStreak ?? progress.currentStreak) : progress.currentStreak,
    totalXp: user ? (serverData?.totalXp ?? user.progress?.totalXp ?? progress.totalXp) : progress.totalXp,
    currentLevel: lvlNum,
    activeLevel,
    exercisesCompleted: user ? (serverData?.exercisesCompleted ?? user.progress?.exercisesCompleted ?? progress.exercisesCompleted) : progress.exercisesCompleted,
    accuracyRate: user ? (serverData?.accuracyRate ?? user.progress?.totalAccuracy ?? progress.accuracyRate) : progress.accuracyRate,
    practiceMinutes: user ? (serverData?.todayMinutes ?? user.progress?.totalPracticeMinutes ?? progress.todayMinutes) : progress.todayMinutes,
    lessonsCompleted: user ? (serverData?.lessonsCompleted ?? user.progress?.lessonsCompleted ?? progress.lessonsCompleted) : progress.lessonsCompleted,
    wordsLearned: user ? (serverData?.wordsLearned ?? progress.wordsLearned) : progress.wordsLearned,
    wordsDue: user ? (serverData?.wordsDue ?? progress.wordsDue) : progress.wordsDue,
    wordsMastered: user ? (serverData?.wordsMastered ?? progress.wordsMastered) : progress.wordsMastered,
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex items-center justify-between relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <BarChart2 size={13} className="text-indigo-400" />
              <span>{t.profile.stats}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.nav.progress}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">
              Real-time analytics on your study time, accuracy, streak, and retention.
            </p>
          </div>
          <div className="relative z-10 p-2.5 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-card-elevated shrink-0 animate-float-slow">
            <KlausAvatar mood="happy" size="lg" />
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center stagger-2">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : (
          <div className="space-y-6 stagger-2">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SpotlightCard
                spotlightColor="rgba(245, 158, 11, 0.18)"
                className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2.5 bg-amber-950/70 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shadow-glow-amber">
                  <Flame size={20} className="fill-amber-400 animate-flame" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{data?.currentStreak || 0}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t.common.streak}</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.18)"
                className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2.5 bg-indigo-950/70 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 shadow-glow-indigo">
                  <Diamond size={20} className="fill-indigo-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{data?.totalXp || 0}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t.common.xp}</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(20, 184, 166, 0.18)"
                className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2.5 bg-teal-950/70 border border-teal-500/30 rounded-2xl flex items-center justify-center text-teal-400 shadow-glow-teal">
                  <Compass size={20} />
                </div>
                <div className="text-2xl font-black text-white font-mono">{data?.currentLevel || 1}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t.common.level}</div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.18)"
                className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2.5 bg-emerald-950/70 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 shadow-glow-teal">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {(data?.exercisesCompleted || 0) > 0 ? (data?.accuracyRate ?? 0) : 0}%
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{t.common.accuracy}</div>
              </SpotlightCard>
            </div>

            {/* Detailed History & Time Spent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-elevated rounded-3xl p-6 border border-white/[0.08] shadow-2xl space-y-4">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Clock size={18} className="text-indigo-400" />
                  <span>Study Dedication</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">Total Practice Minutes</span>
                    <span className="font-bold text-white font-mono">{data?.practiceMinutes || 0} min</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">Lessons Completed</span>
                    <span className="font-bold text-white font-mono">{data?.lessonsCompleted || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">Exercises Completed</span>
                    <span className="font-bold text-white font-mono">{data?.exercisesCompleted || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card-elevated rounded-3xl p-6 border border-white/[0.08] shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <BookOpen size={18} className="text-teal-400" />
                    <span>Vocabulary Long-Term Retention</span>
                  </h3>
                  <span className="text-xs font-bold text-teal-300 bg-teal-950/70 border border-teal-500/30 px-3 py-1 rounded-full shadow-sm">
                    {data?.wordsLearned || 0} active
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">Words Practiced</span>
                    <span className="font-bold text-teal-400 font-mono">{data?.wordsLearned || 0} words</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">{t.dashboard.vocabularyMastered}</span>
                    <span className="font-bold text-indigo-400 font-mono">{data?.wordsMastered || 0} words (Box 4+)</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">{t.dashboard.wordsToReview}</span>
                    <span className="font-bold text-amber-400 font-mono">{data?.wordsDue || 0} cards</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900/90 rounded-2xl border border-white/[0.06] shadow-sm">
                    <span className="text-slate-400 font-medium">Active Proficiency Track</span>
                    <span className="font-bold text-indigo-300 uppercase font-mono">
                      {nativeLanguage} ➔ {targetLanguage} ({data.activeLevel})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
