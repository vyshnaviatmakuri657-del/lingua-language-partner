"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Lightbulb, BookOpen, BrainCircuit } from "lucide-react";

export type KlausMood = "idle" | "thinking" | "happy" | "explaining" | "hinting";

interface KlausAvatarProps {
  mood?: KlausMood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export function KlausAvatar({
  mood = "idle",
  size = "md",
  className = "",
  showBadge = false,
}: KlausAvatarProps) {
  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-28 h-28",
  };

  const ringStyles: Record<KlausMood, string> = {
    idle: "ring-2 ring-slate-700/80 hover:ring-teal-400/80 shadow-md shadow-slate-950/40 transition-all",
    thinking: "ring-2 ring-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.5)] animate-pulse",
    happy: "ring-2 ring-teal-400 shadow-[0_0_18px_rgba(45,212,191,0.5)]",
    explaining: "ring-2 ring-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.5)]",
    hinting: "ring-2 ring-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.5)]",
  };

  const getMoodBadge = () => {
    switch (mood) {
      case "thinking":
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-sky-500 text-white rounded-full shadow-md animate-bounce">
            <BrainCircuit size={size === "sm" ? 10 : size === "xl" ? 16 : 12} />
          </span>
        );
      case "happy":
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-teal-500 text-white rounded-full shadow-md">
            <Sparkles size={size === "sm" ? 10 : size === "xl" ? 16 : 12} />
          </span>
        );
      case "explaining":
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-indigo-600 text-white rounded-full shadow-md">
            <BookOpen size={size === "sm" ? 10 : size === "xl" ? 16 : 12} />
          </span>
        );
      case "hinting":
        return (
          <span className="absolute -bottom-1 -right-1 p-0.5 bg-amber-500 text-white rounded-full shadow-md">
            <Lightbulb size={size === "sm" ? 10 : size === "xl" ? 16 : 12} />
          </span>
        );
      case "idle":
      default:
        return showBadge ? (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500 border-2 border-white dark:border-slate-900"></span>
          </span>
        ) : null;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full transition-transform duration-200 hover:scale-105 ${sizeMap[size]} ${ringStyles[mood]} ${className}`}
    >
      {/* Anime Mentor Klaus Character Portrait */}
      <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/klaus-avatar.png"
          alt="Klaus AI Language Mentor"
          className="w-full h-full object-cover object-[center_15%] select-none pointer-events-none"
        />
      </div>

      {/* Mood or Status Indicator Badge */}
      {getMoodBadge()}
    </div>
  );
}

export default KlausAvatar;
