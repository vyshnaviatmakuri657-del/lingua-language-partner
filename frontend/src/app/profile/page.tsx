"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Flame,
  Diamond,
  Compass,
  CheckCircle2,
  Calendar,
  Settings,
  Languages,
  LogOut,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import SpotlightCard from "@/components/SpotlightCard";

export default function ProfilePage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { user, progress, logout } = useAuth();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12 page-enter">
        {/* Profile Header Card */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-teal-400 to-indigo-600 p-1 shadow-glow-indigo animate-float-slow">
              <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={36} className="text-slate-400" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1">
                <h1 className="text-2xl font-black text-white tracking-tight">{user?.name || "Guest Learner"}</h1>
                <span className="px-3 py-0.5 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-bold text-xs rounded-full shadow-sm">
                  Level {progress.currentLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium font-mono">{user?.email || "guest@lingua.app"}</p>
              {user?.profile?.bio && (
                <p className="text-xs text-slate-300 mt-2 max-w-md leading-relaxed font-normal">{user.profile.bio}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <Link
              href="/settings"
              className="btn-tactile px-3.5 py-2.5 bg-slate-800/80 hover:bg-slate-750 border border-white/[0.08] text-slate-200 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              <Settings size={16} />
              <span>{t.nav.settings}</span>
            </Link>
            {user && (
              <button
                onClick={logout}
                title="Log out"
                className="btn-tactile p-2.5 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 rounded-2xl border border-white/[0.08] hover:border-rose-500/40"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 stagger-2">
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.18)"
            className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
          >
            <div className="text-2xl font-black text-amber-400 mb-1 flex items-center justify-center gap-1.5 font-mono">
              <Flame size={20} className="fill-amber-400 text-amber-400 animate-flame" />
              <span>{progress.currentStreak}</span>
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.profile.activeStreak}</div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.18)"
            className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
          >
            <div className="text-2xl font-black text-indigo-400 mb-1 flex items-center justify-center gap-1.5 font-mono">
              <Diamond size={18} className="fill-indigo-400 text-indigo-400" />
              <span>{progress.totalXp}</span>
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.profile.totalXp}</div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(20, 184, 166, 0.18)"
            className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
          >
            <div className="text-2xl font-black text-teal-400 mb-1 font-mono">
              {progress.lessonsCompleted}
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.profile.lessonsFinished}</div>
          </SpotlightCard>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.18)"
            className="p-5 card-interactive rounded-3xl border border-white/[0.08] shadow-card-elevated text-center"
          >
            <div className="text-2xl font-black text-emerald-400 mb-1 font-mono">
              {(progress.exercisesCompleted || 0) > 0 ? progress.accuracyRate : 0}%
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.profile.accuracyRate}</div>
          </SpotlightCard>
        </div>

        {/* Language Track Active Configuration */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Languages size={18} className="text-indigo-400" />
            <span>Active Language Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-sm">
              <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">
                Instructional Language (Native)
              </div>
              <div className="text-base font-black text-white uppercase font-mono">
                {nativeLanguage}
              </div>
              <div className="text-slate-300 mt-1 leading-relaxed font-normal">
                All UI, lessons, feedback, hints, and Klaus AI respond in this language.
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-sm">
              <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">
                Learning Language (Target)
              </div>
              <div className="text-base font-black text-teal-400 uppercase font-mono">
                {targetLanguage}
              </div>
              <div className="text-slate-300 mt-1 leading-relaxed font-normal">
                The language you are actively mastering and practicing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
