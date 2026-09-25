"use client";

import React from "react";
import Link from "next/link";
import { Flame, Diamond, Sparkles, User, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "./KlausAvatar";

interface HeaderProps {
  onOpenKlaus?: () => void;
}

export function Header({ onOpenKlaus }: HeaderProps) {
  const { nativeLanguage, targetLanguage } = useLanguage();
  const { user } = useAuth();

  const targetLangInfo = SUPPORTED_TARGET_LANGUAGES.find((l) => l.code === targetLanguage);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 flex items-center justify-between transition-all">
      {/* Mobile Brand icon */}
      <div className="flex items-center gap-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow">
            L
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            LINGUA
          </span>
        </Link>
      </div>

      {/* Language Pair Selector / Badge */}
      <Link
        href="/settings"
        title="Active Language Configuration (Click to modify)"
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full text-xs font-semibold text-slate-700 transition"
      >
        <Globe size={14} className="text-indigo-600" />
        <span className="uppercase text-indigo-700 font-bold">{nativeLanguage}</span>
        <span className="text-slate-400">➔</span>
        <span className="flex items-center gap-1 font-bold text-teal-700">
          <span>{targetLangInfo?.flag || "🌍"}</span>
          <span>{targetLangInfo?.name || targetLanguage.toUpperCase()}</span>
        </span>
      </Link>

      {/* Gamification Stats & Klaus Summon */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Streak */}
        <Link
          href="/progress"
          title="Daily Study Streak"
          className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 text-amber-700 rounded-full font-bold text-xs hover:bg-amber-100 transition"
        >
          <Flame size={15} className="text-amber-500 fill-amber-500 animate-pulse" />
          <span>{user?.streak?.currentStreak || 0}</span>
        </Link>

        {/* XP */}
        <Link
          href="/progress"
          title="Total Experience Points (XP)"
          className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200/80 text-indigo-700 rounded-full font-bold text-xs hover:bg-indigo-100 transition"
        >
          <Diamond size={14} className="text-indigo-600 fill-indigo-400" />
          <span>{user?.progress?.totalXp || 0} XP</span>
        </Link>

        {/* Quick Klaus Summon Button */}
        {onOpenKlaus && (
          <button
            onClick={onOpenKlaus}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white rounded-full text-xs font-bold shadow-sm shadow-teal-200 hover:shadow-md transition active:scale-95"
          >
            <KlausAvatar mood="happy" size="sm" />
            <span className="hidden md:inline">Klaus</span>
            <Sparkles size={12} className="text-teal-200" />
          </button>
        )}

        {/* Profile Avatar / Login */}
        {user ? (
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center text-slate-600 hover:ring-2 hover:ring-indigo-400 transition"
          >
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={16} />
            )}
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
