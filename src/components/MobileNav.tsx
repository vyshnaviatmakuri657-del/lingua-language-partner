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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 flex items-center justify-around safe-bottom">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
            <span className="text-[10px] mt-0.5 truncate max-w-[64px]">{link.label}</span>
          </Link>
        );
      })}

      {/* Center Klaus Trigger */}
      {onOpenKlaus && (
        <button
          onClick={onOpenKlaus}
          className="flex flex-col items-center justify-center p-1.5 text-teal-600 transition -mt-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-600 p-0.5 shadow-md shadow-teal-200 flex items-center justify-center text-white">
            <KlausAvatar mood="happy" size="sm" />
          </div>
          <span className="text-[10px] font-bold text-teal-700 mt-0.5">Klaus</span>
        </button>
      )}
    </div>
  );
}
export default MobileNav;
