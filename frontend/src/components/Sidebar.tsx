"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  BookOpen,
  RotateCcw,
  Languages,
  MessageSquare,
  BarChart2,
  Award,
  Settings,
  User,
  GraduationCap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "./KlausAvatar";

interface SidebarProps {
  onOpenKlaus?: () => void;
}

export function Sidebar({ onOpenKlaus }: SidebarProps) {
  const pathname = usePathname();
  const { t, nativeLanguage, targetLanguage } = useLanguage();

  const navItems = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/learning-path", label: t.nav.learningPath, icon: Compass },
    { href: "/curriculum", label: "CEFR Curriculum", icon: BookOpen },
    { href: "/practice", label: t.nav.practice, icon: GraduationCap },
    { href: "/review", label: t.nav.review, icon: RotateCcw },
    { href: "/vocabulary", label: t.nav.vocabulary, icon: BookOpen },
    { href: "/grammar", label: t.nav.grammar, icon: BookOpen },
    { href: "/klaus", label: "Klaus AI Mentor", icon: Sparkles },
    { href: "/roleplay", label: t.nav.roleplay, icon: MessageSquare },
    { href: "/translator", label: t.nav.klausTranslate, icon: Languages },
    { href: "/progress", label: t.nav.progress, icon: BarChart2 },
    { href: "/achievements", label: t.nav.achievements, icon: Award },
    { href: "/profile", label: t.nav.profile, icon: User },
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-950/90 backdrop-blur-2xl border-r border-white/[0.07] min-h-screen fixed left-0 top-0 bottom-0 z-30 select-none shadow-2xl shadow-black/60">
      {/* Brand logo & Language pair badge */}
      <div className="p-5 border-b border-white/[0.07] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
            L
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-200 bg-clip-text text-transparent group-hover:text-indigo-300 transition-colors">
              LINGUA
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <span className="uppercase text-indigo-400 font-bold">{nativeLanguage}</span>
              <span className="text-slate-600">➔</span>
              <span className="uppercase text-teal-400 font-bold">{targetLanguage}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links with animated active pill & indicator */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 relative group ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600/20 via-indigo-600/10 to-transparent text-white font-bold border border-indigo-500/30 shadow-md shadow-indigo-950/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              }`}
            >
              {/* Glowing active edge indicator */}
              {isActive && (
                <span className="absolute left-1.5 w-1 h-4 bg-gradient-to-b from-indigo-400 to-teal-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
              <Icon
                size={18}
                className={`transition-all duration-200 ${
                  isActive
                    ? "text-indigo-400 stroke-[2.4] translate-x-1"
                    : "text-slate-500 group-hover:text-slate-300 group-hover:scale-110"
                }`}
              />
              <span className={`truncate transition-transform duration-200 ${isActive ? "translate-x-1" : "group-hover:translate-x-0.5"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Klaus AI Tutor Summon Widget at Sidebar Bottom */}
      <div className="p-3.5 border-t border-white/[0.07]">
        <div
          onClick={onOpenKlaus}
          className="cursor-pointer bg-gradient-to-br from-slate-900/90 to-slate-900/60 hover:from-slate-850 hover:to-slate-800 border border-teal-500/30 hover:border-teal-400/60 rounded-2xl p-3.5 transition-all duration-200 shadow-xl shadow-teal-950/20 group hover:-translate-y-1 active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <KlausAvatar mood="happy" size="sm" showBadge />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-white flex items-center gap-1 group-hover:text-teal-300 transition-colors">
                {t.klaus.name} <Sparkles size={11} className="text-teal-400 animate-pulse" />
              </h4>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {t.dashboard.askKlausTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
