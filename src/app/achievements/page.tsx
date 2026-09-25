"use client";

import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, Lock, Sparkles, Diamond, Loader2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: string | null;
}

export default function AchievementsPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function loadAchievements() {
      setLoading(true);
      try {
        const res = await fetch("/api/achievements");
        const data = await res.json();
        if (res.ok && data.achievements) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAchievements();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-2">
              <Award size={14} />
              <span>Milestone Badges</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.achievements.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.achievements.pageSubtitle}
            </p>
          </div>
          <KlausAvatar mood="happy" size="lg" />
        </div>

        {/* Achievements Grid */}
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{t.common.loading}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  ach.isUnlocked
                    ? "bg-white border-amber-200 shadow-md ring-1 ring-amber-100"
                    : "bg-slate-50 border-slate-200/80 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{ach.icon}</span>
                    {ach.isUnlocked ? (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={13} /> {t.achievements.unlockedBadge}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-200 text-slate-500 rounded-full font-semibold text-[11px] flex items-center gap-1">
                        <Lock size={12} /> {t.achievements.lockedBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1">{ach.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{ach.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span className="flex items-center gap-1">
                    <Diamond size={13} className="text-amber-500 fill-amber-500" />
                    <span>+{ach.xpReward} XP</span>
                  </span>
                  {ach.unlockedAt && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      {new Date(ach.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
