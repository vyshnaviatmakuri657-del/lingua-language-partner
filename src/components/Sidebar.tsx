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
    { href: "/practice", label: t.nav.practice, icon: GraduationCap },
    { href: "/review", label: t.nav.review, icon: RotateCcw },
    { href: "/vocabulary", label: t.nav.vocabulary, icon: BookOpen },
    { href: "/grammar", label: t.nav.grammar, icon: BookOpen },
    { href: "/roleplay", label: t.nav.roleplay, icon: MessageSquare },
    { href: "/translator", label: t.nav.klausTranslate, icon: Languages },
    { href: "/progress", label: t.nav.progress, icon: BarChart2 },
    { href: "/achievements", label: t.nav.achievements, icon: Award },
    { href: "/profile", label: t.nav.profile, icon: User },
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 min-h-screen fixed left-0 top-0 bottom-0 z-30 select-none">
      {/* Brand logo & Language pair badge */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200 transition-transform group-hover:scale-105">
            L
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
              LINGUA
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <span className="uppercase text-indigo-600 font-bold">{nativeLanguage}</span>
              <span>➔</span>
              <span className="uppercase text-teal-600 font-bold">{targetLanguage}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-indigo-600 stroke-[2.5]" : "text-slate-400"}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Klaus AI Tutor Summon Widget at Sidebar Bottom */}
      <div className="p-4 border-t border-slate-100">
        <div
          onClick={onOpenKlaus}
          className="cursor-pointer bg-gradient-to-br from-teal-50 to-indigo-50 hover:from-teal-100 hover:to-indigo-100 border border-teal-200/80 rounded-2xl p-3.5 transition-all duration-200 shadow-sm hover:shadow group"
        >
          <div className="flex items-center gap-3">
            <KlausAvatar mood="happy" size="sm" showBadge />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1">
                {t.klaus.name} <Sparkles size={11} className="text-teal-600" />
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
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
