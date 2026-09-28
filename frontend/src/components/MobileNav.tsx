"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  RotateCcw,
  Languages,
  User,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "./KlausAvatar";

interface MobileNavProps {
  onOpenKlaus?: () => void;
}

export function MobileNav({ onOpenKlaus }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/learning-path", label: t.nav.learningPath, icon: Compass },
    { href: "/review", label: t.nav.review, icon: RotateCcw },
    { href: "/translator", label: t.nav.klausTranslate, icon: Languages },
    { href: "/profile", label: t.nav.profile, icon: User },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/85 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around safe-bottom shadow-2xl shadow-black/80">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 relative ${
              isActive
                ? "text-indigo-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon size={20} className={isActive ? "stroke-[2.5] scale-105" : "stroke-2"} />
            <span className="text-[10px] mt-0.5 truncate max-w-[64px]">{link.label}</span>
            {isActive && (
              <span className="w-1 h-1 bg-indigo-400 rounded-full mt-0.5 shadow-[0_0_6px_rgba(99,102,241,1)]" />
            )}
          </Link>
        );
      })}

      {/* Center Klaus Trigger */}
      {onOpenKlaus && (
        <button
          type="button"
          onClick={onOpenKlaus}
          className="flex flex-col items-center justify-center p-1.5 text-teal-400 transition -mt-4 group active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-600 p-0.5 shadow-xl shadow-teal-500/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <KlausAvatar mood="happy" size="sm" />
          </div>
          <span className="text-[10px] font-bold text-teal-300 mt-0.5">Klaus</span>
        </button>
      )}
    </nav>
  );
}

export default MobileNav;
