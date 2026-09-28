"use client";

import React from "react";
import Link from "next/link";
import { Flame, Diamond, Sparkles, User, Globe, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "./KlausAvatar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onOpenKlaus?: () => void;
}

export function Header({ onOpenKlaus }: HeaderProps) {
  const { nativeLanguage, targetLanguage } = useLanguage();
  const { user, progress } = useAuth();

  const targetLangInfo = SUPPORTED_TARGET_LANGUAGES.find((l) => l.code === targetLanguage);

  return (
    <header className="sticky top-0 z-20 bg-slate-950/75 backdrop-blur-2xl border-b border-white/[0.07] px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all duration-200 shadow-sm">
      {/* Mobile Brand icon */}
      <div className="flex items-center gap-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="font-extrabold text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            LINGUA
          </span>
        </Link>
      </div>

      {/* Language Pair Selector / Badge */}
      <Link
        href="/settings"
        title="Active Language Pair (Click to switch)"
        className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-850/90 border border-white/[0.08] hover:border-indigo-500/40 rounded-full text-xs font-semibold text-slate-200 transition-all duration-200 shadow-inner group hover:scale-[1.02] active:scale-[0.98]"
      >
        <Globe size={13} className="text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className="uppercase text-indigo-400 font-bold tracking-wider">{nativeLanguage}</span>
        <span className="text-slate-600">➔</span>
        <span className="flex items-center gap-1.5 font-bold text-teal-400">
          <span>{targetLangInfo?.flag || "🌍"}</span>
          <span>{targetLangInfo?.name || targetLanguage.toUpperCase()}</span>
        </span>
        <ChevronRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Gamification Stats & Klaus Summon */}
      <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
        {/* Streak */}
        <Link
          href="/progress"
          title="Daily Study Streak"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 rounded-full font-bold text-xs shadow-md shadow-amber-950/20 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Flame size={15} className="text-amber-400 fill-amber-400 animate-flame shrink-0" />
          <span className="tracking-tight">{progress.currentStreak}d</span>
        </Link>

        {/* XP */}
        <Link
          href="/progress"
          title="Total Experience Points (XP)"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300 rounded-full font-bold text-xs shadow-md shadow-indigo-950/20 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Diamond size={13} className="text-indigo-400 fill-indigo-400/40 shrink-0" />
          <span className="tracking-tight font-mono">{progress.totalXp} XP</span>
        </Link>

        {/* Quick Klaus Summon Button */}
        {onOpenKlaus && (
          <button
            type="button"
            onClick={onOpenKlaus}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white rounded-full text-xs font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-teal-300/30"
          >
            <KlausAvatar mood="happy" size="sm" />
            <span className="hidden md:inline font-bold">Klaus</span>
            <Sparkles size={12} className="text-teal-200 animate-pulse" />
          </button>
        )}

        {/* Theme Toggle Button */}
        <ThemeToggle variant="icon-only" />

        {/* Profile Avatar / Login */}
        {user ? (
          <Link
            href="/profile"
            title={`${user.name || "Profile"} settings`}
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/[0.12] overflow-hidden flex items-center justify-center text-slate-300 hover:ring-2 hover:ring-indigo-400 hover:scale-105 active:scale-95 transition-all"
          >
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={15} />
            )}
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-xs font-bold text-indigo-300 hover:text-white px-3.5 py-1.5 rounded-full border border-indigo-500/40 hover:bg-indigo-600/30 transition-all duration-200 shadow-sm active:scale-95"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
