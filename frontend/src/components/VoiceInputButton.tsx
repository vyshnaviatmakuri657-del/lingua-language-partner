"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  langCode: string; // e.g. "ko", "te", "hi", "fr", "es", "ta", "en"
  size?: "sm" | "md" | "lg";
  className?: string;
  title?: string;
  disabled?: boolean;
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

export function VoiceInputButton({
  onTranscript,
  langCode,
  size = "md",
  className = "",
  title,
  disabled = false,
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (disabled) return;
    if (!isSupported) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = LANGUAGE_VOICE_MAP[langCode] || langCode || "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Speech recognition start failed:", err);
      setIsListening(false);
    }
  };

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 22,
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      title={
        title ||
        (isListening
          ? `Listening in ${langCode.toUpperCase()}... Speak now!`
          : `Click to speak with microphone in ${langCode.toUpperCase()}`)
      }
      className={`inline-flex items-center justify-center rounded-2xl transition-all duration-200 relative group disabled:opacity-40 disabled:cursor-not-allowed ${
        isListening
          ? "bg-rose-600 text-white shadow-xl shadow-rose-600/40 scale-105 animate-pulse ring-2 ring-rose-400"
          : "bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-indigo-400 border border-slate-700 hover:border-indigo-500/40 shadow-sm hover:scale-105 active:scale-95"
      } ${sizeClasses[size]} ${className}`}
    >
      {isListening ? (
        <>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping" />
          <MicOff size={iconSizes[size]} />
        </>
      ) : (
        <Mic size={iconSizes[size]} />
      )}
    </button>
  );
}

export default VoiceInputButton;
