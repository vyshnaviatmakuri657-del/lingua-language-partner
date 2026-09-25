"use client";

import React, { useState, useEffect } from "react";
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
import KlausAvatar from "@/components/KlausAvatar";

export default function ProgressPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const resData = await res.json();
          setData(resData);
        }
      } catch (err) {
        console.error("Failed to load progress:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
              <BarChart2 size={14} />
              <span>{t.profile.stats}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.nav.progress}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time analytics on your study time, accuracy, streak, and retention.
            </p>
          </div>
          <KlausAvatar mood="happy" size="lg" />
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{t.common.loading}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                  <Flame size={20} className="fill-amber-400" />
                </div>
                <div className="text-2xl font-black text-slate-900">{data?.currentStreak || 0}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{t.common.streak}</div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Diamond size={20} className="fill-indigo-300" />
                </div>
                <div className="text-2xl font-black text-slate-900">{data?.totalXp || 0}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{t.common.xp}</div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <Compass size={20} />
                </div>
                <div className="text-2xl font-black text-slate-900">{data?.currentLevel || 1}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{t.common.level}</div>
              </div>

              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-2xl font-black text-slate-900">{data?.accuracyRate || 100}%</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{t.common.accuracy}</div>
              </div>
            </div>

            {/* Detailed History & Time Spent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-600" />
                  <span>Study Dedication</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">Total Practice Minutes</span>
                    <span className="font-bold text-slate-900">{data?.practiceMinutes || 0} min</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">Lessons Completed</span>
                    <span className="font-bold text-slate-900">{data?.lessonsCompleted || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">Exercises Completed</span>
                    <span className="font-bold text-slate-900">{data?.exercisesCompleted || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-teal-600" />
                  <span>Vocabulary Long-Term Retention</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">{t.dashboard.vocabularyMastered}</span>
                    <span className="font-bold text-teal-600">{data?.wordsMastered || 0} words</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">{t.dashboard.wordsToReview}</span>
                    <span className="font-bold text-amber-600">{data?.wordsDue || 0} cards</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-600">Active Proficiency Track</span>
                    <span className="font-bold text-indigo-600 uppercase">
                      {nativeLanguage} ➔ {targetLanguage} ({data?.activePath?.level || "A1"})
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
