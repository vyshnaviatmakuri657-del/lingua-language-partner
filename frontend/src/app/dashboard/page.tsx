"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Flame,
  Diamond,
  Compass,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Target,
  BookOpen,
  AlertTriangle,
  Play,
  CheckCircle2,
  MessageSquare,
  Clock,
  History,
  GraduationCap,
  Award,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import KlausChatModal from "@/components/KlausChatModal";
import SpotlightCard from "@/components/SpotlightCard";
import AnimatedTabs from "@/components/AnimatedTabs";

export default function DashboardPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { user, progress, updateDailyGoal } = useAuth();
  const [serverData, setServerData] = useState<any>({});
  const [isKlausModalOpen, setIsKlausModalOpen] = useState(false);
  const [goalUpdating, setGoalUpdating] = useState(false);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.ok) {
        const resData = await res.json();
        setServerData(resData);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard progress:", err);
    }
  }, []);

  // Fetch on mount and whenever user, language, or focus changes
  useEffect(() => {
    fetchProgress();

    const handleProgressUpdate = () => {
      fetchProgress();
    };

    const handleWindowFocus = () => {
      fetchProgress();
    };

    window.addEventListener("lingua_progress_updated", handleProgressUpdate);
    window.addEventListener("storage", handleProgressUpdate);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("lingua_progress_updated", handleProgressUpdate);
      window.removeEventListener("storage", handleProgressUpdate);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [user, nativeLanguage, targetLanguage, fetchProgress]);

  // Derived values combining live AuthContext and backend serverData
  const totalXp = user ? (serverData.totalXp ?? user.progress?.totalXp ?? progress.totalXp) : progress.totalXp;
  const currentLevel = user ? (serverData.currentLevel ?? user.progress?.currentLevel ?? progress.currentLevel) : progress.currentLevel;
  const lessonsCompleted = user
    ? (serverData.lessonsCompleted ?? user.progress?.lessonsCompleted ?? progress.lessonsCompleted)
    : progress.lessonsCompleted;
  const exercisesCompleted = user
    ? (serverData.exercisesCompleted ?? user.progress?.exercisesCompleted ?? progress.exercisesCompleted)
    : progress.exercisesCompleted;
  const rawAccuracy = user
    ? (serverData.accuracyRate ?? user.progress?.totalAccuracy ?? progress.accuracyRate)
    : progress.accuracyRate;
  const accuracyRate = exercisesCompleted > 0 ? rawAccuracy : 0;
  const currentStreak = user
    ? (serverData.currentStreak ?? user.streak?.currentStreak ?? progress.currentStreak)
    : progress.currentStreak;
  const todayMinutes = user ? (serverData.todayMinutes ?? progress.todayMinutes) : progress.todayMinutes;
  const dailyGoalMinutes = user
    ? (serverData.dailyGoalMinutes ?? user.profile?.dailyGoalMinutes ?? progress.dailyGoalMinutes)
    : progress.dailyGoalMinutes;
  const wordsLearned = user ? (serverData.wordsLearned ?? progress.wordsLearned) : progress.wordsLearned;
  const wordsDue = user ? (serverData.wordsDue ?? progress.wordsDue) : progress.wordsDue;
  const wordsMastered = user ? (serverData.wordsMastered ?? progress.wordsMastered) : progress.wordsMastered;
  const weakAreas = (user ? (serverData.weakAreas?.length ? serverData.weakAreas : progress.weakAreas) : progress.weakAreas) || [];
  const recentActivities = progress.recentActivities || [];

  const data = {
    totalXp,
    currentLevel,
    lessonsCompleted,
    accuracyRate,
    currentStreak,
    todayMinutes,
    dailyGoalMinutes,
    goalMet: todayMinutes >= dailyGoalMinutes,
    wordsLearned,
    wordsDue,
    wordsMastered,
    weakAreas,
  };

  const progressPercent = Math.min(
    100,
    Math.round(((todayMinutes || 0) / (dailyGoalMinutes || 15)) * 100)
  );

  const handleGoalSelect = async (mins: number) => {
    if (goalUpdating) return;
    setGoalUpdating(true);
    try {
      await updateDailyGoal(mins);
      setServerData((prev: any) => ({ ...prev, dailyGoalMinutes: mins }));
    } finally {
      setGoalUpdating(false);
    }
  };

  const nextLessonNumber = data.lessonsCompleted + 1;
  const nextLesson = serverData?.nextLesson;
  const continueHref = nextLesson?.id ? `/lessons/${nextLesson.id}` : "/learning-path";
  const continueLabel = nextLesson?.title
    ? `Continue: ${nextLesson.title}`
    : data.lessonsCompleted > 0
    ? `Continue: Lesson ${nextLessonNumber}`
    : t.dashboard.continueLearning;

  const goalTabs = [
    { id: "10", label: "10m" },
    { id: "15", label: "15m" },
    { id: "20", label: "20m" },
    { id: "30", label: "30m" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 page-enter">
        {/* =============================================================== */}
        {/* Welcome Hero Banner with Deep Lighting & Floating Tutor Card     */}
        {/* =============================================================== */}
        <div className="card-elevated border-indigo-500/35 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-indigo-950/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Luminous background glows */}
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3.5 z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950/80 border border-indigo-500/40 backdrop-blur-md rounded-full text-xs font-bold text-teal-300 shadow-sm">
              <Sparkles size={13} className="text-teal-400 animate-pulse" />
              <span>
                {nativeLanguage.toUpperCase()} ➔ {targetLanguage.toUpperCase()} Track • CEFR Calibrated
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {t.dashboard.greetingMorning},{" "}
              <span className="gradient-text-hero">{user?.name || "Commander"}</span>!
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {t.dashboard.streakDescription}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href={continueHref}
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-200 btn-tactile flex items-center gap-2.5"
              >
                <Play size={16} className="fill-slate-950" />
                <span>{continueLabel}</span>
              </Link>
              <Link
                href="/review"
                className="px-6 py-3.5 bg-slate-900/85 hover:bg-slate-850 text-slate-100 rounded-2xl font-bold text-sm border border-white/[0.1] hover:border-slate-600 transition-all duration-200 btn-tactile flex items-center gap-2"
              >
                <RotateCcw size={16} className="text-amber-400" />
                <span>
                  {t.dashboard.wordsToReview} ({data.wordsDue})
                </span>
              </Link>
            </div>
          </div>

          {/* Interactive Floating Klaus Online Card */}
          <div
            onClick={() => setIsKlausModalOpen(true)}
            className="z-10 flex flex-col items-center cursor-pointer group animate-float-slow select-none"
            title="Click to summon Klaus directly"
          >
            <div className="p-4 bg-slate-900/85 rounded-3xl backdrop-blur-2xl border border-teal-500/40 shadow-2xl shadow-teal-950/60 group-hover:border-teal-400 group-hover:scale-105 group-hover:shadow-glow-teal transition-all duration-300">
              <KlausAvatar mood="happy" size="xl" showBadge />
            </div>
            <span className="text-xs font-bold text-teal-300 mt-2.5 flex items-center gap-1.5 group-hover:text-cyan-200 transition-colors">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
              Klaus is online (Tap to chat)
            </span>
          </div>
        </div>

        {/* =============================================================== */}
        {/* Core Metrics Grid with Spotlight Illumination                    */}
        {/* =============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Day Streak */}
          <SpotlightCard
            className="p-5 rounded-3xl flex items-center gap-4 group"
            spotlightColor="rgba(245, 158, 11, 0.25)"
          >
            <div className="w-13 h-13 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner shrink-0 p-3">
              <Flame size={24} className="fill-amber-400 animate-flame" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{data.currentStreak} Days</div>
              <div className="text-xs font-semibold text-slate-400">{t.common.streak}</div>
            </div>
          </SpotlightCard>

          {/* Total XP */}
          <SpotlightCard
            className="p-5 rounded-3xl flex items-center gap-4 group"
            spotlightColor="rgba(99, 102, 241, 0.25)"
          >
            <div className="w-13 h-13 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-inner shrink-0 p-3">
              <Diamond size={24} className="fill-indigo-400/40" />
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono">{data.totalXp} XP</div>
              <div className="text-xs font-semibold text-slate-400">Total Experience</div>
            </div>
          </SpotlightCard>

          {/* Level */}
          <SpotlightCard
            className="p-5 rounded-3xl flex items-center gap-4 group"
            spotlightColor="rgba(20, 184, 166, 0.25)"
          >
            <div className="w-13 h-13 rounded-2xl bg-teal-950/60 border border-teal-500/40 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform shadow-inner shrink-0 p-3">
              <Compass size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">Level {data.currentLevel}</div>
              <div className="text-xs font-semibold text-slate-400">
                {data.currentLevel <= 2 ? "A1 Foundation" : data.currentLevel <= 4 ? "A2 Waystage" : "B1 Independent"}
              </div>
            </div>
          </SpotlightCard>

          {/* Accuracy */}
          <SpotlightCard
            className="p-5 rounded-3xl flex items-center gap-4 group"
            spotlightColor="rgba(16, 185, 129, 0.25)"
          >
            <div className="w-13 h-13 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner shrink-0 p-3">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{data.accuracyRate}%</div>
              <div className="text-xs font-semibold text-slate-400">{t.common.accuracy}</div>
            </div>
          </SpotlightCard>
        </div>

        {/* =============================================================== */}
        {/* Daily Goal & Spaced Repetition Summary                          */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Goal Progress Card */}
          <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl card-elevated flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-950/70 text-indigo-400 border border-indigo-500/40 rounded-2xl shadow-inner">
                    <Target size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">
                      {t.dashboard.dailyGoalProgress}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {data.todayMinutes} / {data.dailyGoalMinutes} min completed
                      {data.goalMet && (
                        <span className="ml-2 font-bold text-teal-400">🎉 Daily Goal Met!</span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="font-black text-2xl text-indigo-400 font-mono">{progressPercent}%</span>
              </div>

              {/* Progress Bar with Radiant Shimmer */}
              <div className="w-full bg-slate-900/90 h-4 rounded-full overflow-hidden p-0.5 border border-white/[0.1] shimmer-bar shadow-inner">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(45,212,191,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Interactive Quick Daily Goal Adjuster with Animated Tabs */}
              <div className="mt-6 p-4 bg-slate-900/70 border border-white/[0.08] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
                  <Clock size={15} className="text-indigo-400" />
                  <span>Adjust Focus Goal:</span>
                </div>
                <AnimatedTabs
                  tabs={goalTabs}
                  activeId={String(data.dailyGoalMinutes)}
                  onChange={(id) => handleGoalSelect(Number(id))}
                  size="sm"
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Goal: {data.dailyGoalMinutes} minutes daily focus</span>
              <Link
                href="/settings"
                className="font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
              >
                <span>Account settings</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Vocabulary Retention Status */}
          <div className="p-6 sm:p-7 rounded-3xl card-elevated flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-950/70 text-teal-400 border border-teal-500/40 rounded-2xl shadow-inner">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{t.nav.vocabulary}</h3>
                    <p className="text-[11px] text-slate-400">Leitner Spaced Repetition</p>
                  </div>
                </div>
                <Link
                  href="/vocabulary"
                  className="px-3.5 py-1 bg-teal-950/80 border border-teal-500/40 text-teal-300 hover:text-teal-100 rounded-full text-xs font-bold transition-all duration-200 btn-tactile"
                >
                  View All ({data.wordsLearned || 15})
                </Link>
              </div>

              <div className="space-y-3">
                <Link
                  href="/vocabulary"
                  className="flex items-center justify-between p-3.5 bg-slate-900/70 hover:bg-slate-850 border border-white/[0.08] hover:border-teal-500/40 rounded-2xl transition-all duration-200 group card-interactive"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-xs text-slate-300 group-hover:text-white font-medium transition">Words Practiced</span>
                  </div>
                  <span className="font-black text-teal-400 text-sm font-mono">{data.wordsLearned}</span>
                </Link>
                <div className="flex items-center justify-between p-3.5 bg-slate-900/70 border border-white/[0.08] rounded-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    <span className="text-xs text-slate-300 font-medium">{t.dashboard.vocabularyMastered}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-indigo-400 text-sm font-mono">{data.wordsMastered}</span>
                    <span className="text-[10px] text-slate-500 ml-1">(Box 4+)</span>
                  </div>
                </div>
                <Link
                  href="/review"
                  className="flex items-center justify-between p-3.5 bg-slate-900/70 hover:bg-slate-850 border border-white/[0.08] hover:border-amber-500/40 rounded-2xl transition-all duration-200 group card-interactive"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-xs text-slate-300 group-hover:text-white font-medium transition">{t.dashboard.wordsToReview}</span>
                  </div>
                  <span className="font-black text-amber-400 text-sm font-mono">{data.wordsDue}</span>
                </Link>
              </div>
            </div>

            <Link
              href="/review"
              className="mt-5 w-full py-3.5 bg-gradient-to-r from-slate-900 to-indigo-950/80 hover:from-slate-850 hover:to-indigo-900/90 text-slate-200 hover:text-white border border-white/[0.1] hover:border-indigo-500/50 font-bold text-xs rounded-2xl text-center transition-all duration-200 flex items-center justify-center gap-2 btn-tactile shadow-md"
            >
              <RotateCcw size={15} className="text-amber-400" />
              <span>{t.nav.review} Due Flashcards ({data.wordsDue})</span>
            </Link>
          </div>
        </div>

        {/* =============================================================== */}
        {/* Action Cards: Roleplay, Practice & Translator with Spotlight    */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversation Roleplay Quick Action */}
          <Link href="/roleplay">
            <SpotlightCard
              className="p-6 rounded-3xl flex items-start gap-4 group h-full"
              spotlightColor="rgba(244, 63, 94, 0.25)"
            >
              <div className="p-3.5 bg-rose-950/70 border border-rose-500/40 text-rose-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner shrink-0">
                <MessageSquare size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
                  <span>{t.dashboard.startRoleplayTitle}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-rose-400" />
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {t.dashboard.startRoleplayDesc}
                </p>
              </div>
            </SpotlightCard>
          </Link>

          {/* Target Practice Quick Action */}
          <Link href="/practice">
            <SpotlightCard
              className="p-6 rounded-3xl flex items-start gap-4 group h-full"
              spotlightColor="rgba(99, 102, 241, 0.25)"
            >
              <div className="p-3.5 bg-indigo-950/70 border border-indigo-500/40 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner shrink-0">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                  <span>Target Practice</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-indigo-400" />
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Rapid-fire exercises with immediate NLP evaluation and hint assistance.
                </p>
              </div>
            </SpotlightCard>
          </Link>

          {/* Klaus Translation Workbench Quick Action */}
          <Link href="/translator">
            <SpotlightCard
              className="p-6 rounded-3xl flex items-start gap-4 group h-full"
              spotlightColor="rgba(20, 184, 166, 0.25)"
            >
              <div className="p-3.5 bg-teal-950/70 border border-teal-500/40 text-teal-400 rounded-2xl group-hover:scale-110 transition-transform shadow-inner shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                  <span>{t.nav.klausTranslate}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-teal-400" />
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {t.translator.pageSubtitle}
                </p>
              </div>
            </SpotlightCard>
          </Link>
        </div>

        {/* =============================================================== */}
        {/* Live Activity & Weak Areas Row                                  */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weak Areas Section */}
          <div className="p-6 sm:p-7 rounded-3xl card-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={18} className="text-amber-400" />
                  <h3 className="font-extrabold text-base text-white">{t.dashboard.weakAreas}</h3>
                </div>
                <Link
                  href="/practice"
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Drill all
                </Link>
              </div>

              {data.weakAreas && data.weakAreas.length > 0 ? (
                <div className="space-y-2.5">
                  {data.weakAreas.map((w, i) => (
                    <Link
                      key={i}
                      href={`/practice?focus=${encodeURIComponent(w.prompt)}`}
                      className="p-3.5 bg-slate-900/70 hover:bg-slate-850 border border-white/[0.08] hover:border-amber-500/40 rounded-2xl text-xs transition-all duration-200 flex items-center justify-between group card-interactive"
                    >
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-amber-300 transition leading-snug">
                          &quot;{w.prompt}&quot;
                        </div>
                        <div className="text-slate-400 mt-0.5">{w.count} missed attempts</div>
                      </div>
                      <span className="px-3 py-1 bg-amber-950/70 border border-amber-500/40 text-amber-300 rounded-xl font-bold text-[11px] group-hover:scale-105 transition-transform flex items-center gap-1">
                        <span>Fix</span>
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-7 bg-slate-900/60 rounded-2xl border border-white/[0.08] text-center space-y-3.5">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-950/70 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-inner">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">Zero Weak Spots</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">{t.dashboard.noWeakAreas}</p>
                  </div>
                  <Link
                    href="/practice"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/35 btn-tactile"
                  >
                    <Play size={12} className="fill-white" />
                    <span>Start Practice Drill</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Live Recent Activity Feed */}
          <div className="p-6 sm:p-7 rounded-3xl card-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <History size={18} className="text-indigo-400" />
                  <h3 className="font-extrabold text-base text-white">Live Interaction Log</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                  Real-time
                </span>
              </div>

              {recentActivities && recentActivities.length > 0 ? (
                <div className="space-y-2.5">
                  {recentActivities.slice(0, 4).map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 bg-slate-900/70 border border-white/[0.08] rounded-2xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
                        <div>
                          <div className="font-bold text-slate-200">{act.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                      {act.xp > 0 && (
                        <span className="px-2.5 py-1 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-bold rounded-xl font-mono text-[11px]">
                          +{act.xp} XP
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-7 bg-slate-900/60 rounded-2xl border border-white/[0.08] text-center space-y-3.5">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-inner">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">Start Your First Interaction</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Your lessons, flashcard reviews, roleplay dialogues, and practice drills are recorded in real-time.
                    </p>
                  </div>
                  <Link
                    href="/learning-path"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold transition shadow-md btn-tactile"
                  >
                    <span>Launch Lesson 1</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-teal-400" />
                Adaptive CEFR Engine
              </span>
              <Link href="/placement" className="text-indigo-400 hover:text-indigo-300 transition font-bold">
                Diagnostic Placement
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Klaus Direct Chat Interactive Modal */}
      {isKlausModalOpen && (
        <KlausChatModal
          isOpen={isKlausModalOpen}
          onClose={() => setIsKlausModalOpen(false)}
        />
      )}
    </AppLayout>
  );
}
