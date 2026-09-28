"use client";

import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, Lock, Sparkles, Diamond, Loader2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";
import SpotlightCard from "@/components/SpotlightCard";

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
      <div className="max-w-4xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/70 border border-amber-500/30 text-amber-300 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <Award size={13} className="text-amber-400" />
              <span>Milestone Badges</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.achievements.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md leading-relaxed font-normal">
              {t.achievements.pageSubtitle}
            </p>
          </div>
          <div className="relative z-10 p-2.5 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-card-elevated shrink-0 animate-float-slow">
            <KlausAvatar mood="happy" size="lg" />
          </div>
        </div>

        {/* Achievements Grid */}
        {loading ? (
          <div className="p-16 text-center stagger-2">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 stagger-2">
            {achievements.map((ach) => (
              <SpotlightCard
                key={ach.id}
                spotlightColor={ach.isUnlocked ? "rgba(245, 158, 11, 0.20)" : "rgba(255, 255, 255, 0.05)"}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  ach.isUnlocked
                    ? "card-elevated border-amber-500/50 shadow-glow-amber ring-1 ring-amber-500/30"
                    : "card-interactive border-white/[0.06] bg-slate-900/40 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl filter drop-shadow-md p-2 rounded-2xl bg-slate-800/80 border border-white/[0.08] shadow-inner">{ach.icon}</span>
                    {ach.isUnlocked ? (
                      <span className="px-3 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded-full font-bold text-[11px] flex items-center gap-1 shadow-sm">
                        <CheckCircle2 size={13} className="text-amber-400" /> {t.achievements.unlockedBadge}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-800/80 border border-white/[0.08] text-slate-400 rounded-full font-bold text-[11px] flex items-center gap-1">
                        <Lock size={12} /> {t.achievements.lockedBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-white mb-1.5">{ach.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{ach.description}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1">
                    <Diamond size={13} className="text-amber-400 fill-amber-400" />
                    <span>+{ach.xpReward} XP</span>
                  </span>
                  {ach.unlockedAt && (
                    <span className="text-[10px] text-slate-400 font-normal font-mono">
                      {new Date(ach.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
