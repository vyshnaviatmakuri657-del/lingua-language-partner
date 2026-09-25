"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

interface AudioPlayerButtonProps {
  text: string;
  langCode: string; // e.g. "ko", "fr", "es", "te", "hi", "en", "ta"
  rate?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const LANGUAGE_VOICE_MAP: Record<string, string> = {
  ko: "ko-KR",
  fr: "fr-FR",
  es: "es-ES",
  te: "te-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  en: "en-US",
};

export function AudioPlayerButton({
  text,
  langCode,
  rate = 0.9,
  size = "md",
  className = "",
  label,
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const playAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setHasError(true);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANGUAGE_VOICE_MAP[langCode] || langCode;
      utterance.rate = rate;

      utterance.onstart = () => {
        setIsPlaying(true);
        setHasError(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("TTS invocation error:", err);
      setIsPlaying(false);
      setHasError(true);
    }
  };

  return (
    <button
      type="button"
      onClick={playAudio}
      disabled={isPlaying}
      title={`Listen to pronunciation (${langCode})`}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 ${
        isPlaying
          ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400 scale-105"
          : "bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 hover:shadow-sm"
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Loader2 size={iconSizes[size]} className="animate-spin text-indigo-600" />
      ) : hasError ? (
        <VolumeX size={iconSizes[size]} className="text-slate-400" />
      ) : (
        <Volume2 size={iconSizes[size]} className="transition-transform group-hover:scale-110" />
      )}
      {label && <span>{label}</span>}
    </button>
  );
}
export default AudioPlayerButton;
