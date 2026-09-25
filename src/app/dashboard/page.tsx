"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";

interface DashboardData {
  totalXp: number;
  currentLevel: number;
  lessonsCompleted: number;
  accuracyRate: number;
  currentStreak: number;
  todayMinutes: number;
  dailyGoalMinutes: number;
  goalMet: boolean;
  wordsDue: number;
  wordsMastered: number;
  weakAreas: Array<{ prompt: string; count: number }>;
}

export default function DashboardPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { user } = useAuth();

  const [data, setData] = useState<DashboardData>({
    totalXp: 120,
    currentLevel: 2,
    lessonsCompleted: 3,
    accuracyRate: 92,
    currentStreak: 4,
    todayMinutes: 10,
    dailyGoalMinutes: 15,
    goalMet: false,
    wordsDue: 3,
    wordsMastered: 14,
    weakAreas: [],
  });

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const resData = await res.json();
          setData(resData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard progress:", err);
      }
    }

    fetchProgress();
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round((data.todayMinutes / (data.dailyGoalMinutes || 15)) * 100)
  );

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-teal-100">
              <Sparkles size={13} />
              <span>
                {nativeLanguage.toUpperCase()} ➔ {targetLanguage.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              {t.dashboard.greetingMorning}, {user?.name || "Learner"}!
            </h1>
            <p className="text-indigo-100 text-sm leading-relaxed">
              {t.dashboard.streakDescription}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/learning-path"
                className="px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-sm shadow-md transition active:scale-95 flex items-center gap-2"
              >
                <Play size={16} className="fill-indigo-600" />
                <span>{t.dashboard.continueLearning}</span>
              </Link>
              <Link
                href="/review"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-sm border border-white/20 transition flex items-center gap-2"
              >
                <RotateCcw size={16} />
                <span>
                  {t.dashboard.wordsToReview} ({data.wordsDue})
                </span>
              </Link>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center">
            <div className="p-3 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-inner">
              <KlausAvatar mood="happy" size="xl" showBadge />
            </div>
            <span className="text-xs font-bold text-teal-200 mt-2">Klaus is online</span>
          </div>

          {/* Background decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Day Streak */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
              <Flame size={24} className="fill-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{data.currentStreak}</div>
              <div className="text-xs font-semibold text-slate-500">{t.common.streak}</div>
            </div>
          </div>

          {/* Total XP */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Diamond size={24} className="fill-indigo-300" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{data.totalXp}</div>
              <div className="text-xs font-semibold text-slate-500">{t.common.xp}</div>
            </div>
          </div>

          {/* Level */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <Compass size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{data.currentLevel}</div>
              <div className="text-xs font-semibold text-slate-500">{t.common.level}</div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{data.accuracyRate}%</div>
              <div className="text-xs font-semibold text-slate-500">{t.common.accuracy}</div>
            </div>
          </div>
        </div>

        {/* Daily Goal & Spaced Repetition Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Goal Progress Card */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Target size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {t.dashboard.dailyGoalProgress}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {data.todayMinutes} / {data.dailyGoalMinutes} min completed
                    </p>
                  </div>
                </div>
                <span className="font-black text-lg text-indigo-600">{progressPercent}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Goal: {data.dailyGoalMinutes} minutes daily focus</span>
              <Link
                href="/settings"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Change goal
              </Link>
            </div>
          </div>

          {/* Vocabulary Retention Status */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-base text-slate-900">{t.nav.vocabulary}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <span className="text-xs text-slate-600">{t.dashboard.vocabularyMastered}</span>
                  <span className="font-black text-teal-600 text-sm">{data.wordsMastered}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <span className="text-xs text-slate-600">{t.dashboard.wordsToReview}</span>
                  <span className="font-black text-amber-600 text-sm">{data.wordsDue}</span>
                </div>
              </div>
            </div>

            <Link
              href="/review"
              className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-xs rounded-xl text-center transition"
            >
              {t.nav.review}
            </Link>
          </div>
        </div>

        {/* Action Cards: Roleplay & Klaus Tutor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conversation Roleplay Quick Action */}
          <Link
            href="/roleplay"
            className="p-6 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition group flex items-start gap-4"
          >
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:scale-105 transition">
              <MessageSquare size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>{t.dashboard.startRoleplayTitle}</span>
                <ArrowRight size={16} />
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t.dashboard.startRoleplayDesc}
              </p>
            </div>
          </Link>

          {/* Klaus Translation Workbench Quick Action */}
          <Link
            href="/translator"
            className="p-6 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow transition group flex items-start gap-4"
          >
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:scale-105 transition">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>{t.nav.klausTranslate}</span>
                <ArrowRight size={16} />
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t.translator.pageSubtitle}
              </p>
            </div>
          </Link>
        </div>

        {/* Weak Areas Section */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className="font-bold text-base text-slate-900">{t.dashboard.weakAreas}</h3>
          </div>

          {data.weakAreas && data.weakAreas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.weakAreas.map((w, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-800">&quot;{w.prompt}&quot;</div>
                  <div className="text-slate-400 mt-0.5">{w.count} missed attempts</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">{t.dashboard.noWeakAreas}</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
