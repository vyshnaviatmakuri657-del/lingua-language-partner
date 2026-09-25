"use client";

import React from "react";

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
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const getEyeExpression = () => {
    switch (mood) {
      case "thinking":
        return (
          <>
            {/* Thinking pulsing pupil */}
            <circle cx="38" cy="48" r="5" fill="#38BDF8" className="animate-pulse" />
            <circle cx="62" cy="48" r="5" fill="#38BDF8" className="animate-pulse" />
            <line x1="33" y1="41" x2="43" y2="44" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="67" y1="41" x2="57" y2="44" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "happy":
        return (
          <>
            {/* Happy curved eyes */}
            <path d="M 33 49 Q 38 42 43 49" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 57 49 Q 62 42 67 49" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Rosy cheeks */}
            <circle cx="32" cy="54" r="3" fill="#F43F5E" opacity="0.6" />
            <circle cx="68" cy="54" r="3" fill="#F43F5E" opacity="0.6" />
          </>
        );
      case "hinting":
        return (
          <>
            {/* Winking eye */}
            <path d="M 33 48 Q 38 43 43 48" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="62" cy="48" r="5.5" fill="#38BDF8" />
            <circle cx="64" cy="46" r="2" fill="#FFFFFF" />
          </>
        );
      case "explaining":
        return (
          <>
            {/* Attentive wide eyes */}
            <circle cx="38" cy="48" r="6" fill="#38BDF8" />
            <circle cx="62" cy="48" r="6" fill="#38BDF8" />
            <circle cx="36" cy="46" r="2.5" fill="#FFFFFF" />
            <circle cx="60" cy="46" r="2.5" fill="#FFFFFF" />
          </>
        );
      case "idle":
      default:
        return (
          <>
            <circle cx="38" cy="48" r="5" fill="#38BDF8" />
            <circle cx="62" cy="48" r="5" fill="#38BDF8" />
            <circle cx="36.5" cy="46.5" r="1.5" fill="#FFFFFF" />
            <circle cx="60.5" cy="46.5" r="1.5" fill="#FFFFFF" />
          </>
        );
    }
  };

  const getMouthExpression = () => {
    switch (mood) {
      case "happy":
        return <path d="M 44 60 Q 50 67 56 60" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" fill="#38BDF8" />;
      case "explaining":
        return <ellipse cx="50" cy="62" rx="4" ry="3" fill="#0369A1" />;
      case "thinking":
        return <line x1="46" y1="62" x2="54" y2="62" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />;
      case "hinting":
        return <path d="M 45 61 Q 50 65 55 61" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case "idle":
      default:
        return <path d="M 45 61 Q 50 64 55 61" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none" />;
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="klausHeadGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0FDFA" />
            <stop offset="0.6" stopColor="#CCFBF1" />
            <stop offset="1" stopColor="#99F6E4" />
          </linearGradient>
          <linearGradient id="klausVisorGrad" x1="25" y1="36" x2="75" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F172A" />
            <stop offset="1" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="klausAntennaGrad" x1="50" y1="5" x2="50" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Antenna */}
        <line x1="50" y1="22" x2="50" y2="12" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="10" r="5" fill="url(#klausAntennaGrad)" className="animate-pulse" />
        <circle cx="50" cy="10" r="2" fill="#FFFFFF" />

        {/* Ear Sound Receivers */}
        <rect x="14" y="42" width="7" height="18" rx="3.5" fill="#0D9488" />
        <rect x="79" y="42" width="7" height="18" rx="3.5" fill="#0D9488" />

        {/* Head Shell */}
        <rect
          x="20"
          y="22"
          width="60"
          height="56"
          rx="22"
          fill="url(#klausHeadGrad)"
          stroke="#0D9488"
          strokeWidth="2.5"
        />

        {/* Digital Screen Visor */}
        <rect
          x="27"
          y="35"
          width="46"
          height="32"
          rx="12"
          fill="url(#klausVisorGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />

        {/* Interactive Eyes */}
        {getEyeExpression()}

        {/* Interactive Mouth */}
        {getMouthExpression()}

        {/* Subtle linguistic sound waves near antenna */}
        <path d="M 40 8 Q 44 4 48 8" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 60 8 Q 56 4 52 8" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>

      {/* Optional Active AI Status Indicator Badge */}
      {showBadge && (
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 border-2 border-white"></span>
        </span>
      )}
    </div>
  );
}
export default KlausAvatar;
