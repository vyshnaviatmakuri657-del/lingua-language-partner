"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { KlausAvatar } from "@/components/KlausAvatar";
import { RotateCcw, Home, AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { nativeLanguage } = useLanguage();

  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  const titles: Record<string, string> = {
    en: "Something Went Wrong",
    te: "ఏదో పొరపాటు జరిగింది",
    hi: "कुछ गड़बड़ हो गई",
  };

  const descriptions: Record<string, string> = {
    en: "Klaus encountered an unexpected glitch. Don't worry, your progress and XP are safely saved!",
    te: "క్లాస్ ఒక ఊహించని సమస్యను ఎదుర్కొన్నాడు. చింతించకండి, మీ ప్రోగ్రెస్ మరియు XP సురక్షితంగా భద్రపరచబడ్డాయి!",
    hi: "क्लाउस को एक अप्रत्याशित समस्या का सामना करना पड़ा। चिंता न करें, आपकी प्रगति और XP सुरक्षित हैं!",
  };

  const retryText: Record<string, string> = {
    en: "Try Again",
    te: "మళ్ళీ ప్రయత్నించండి",
    hi: "पुनः प्रयास करें",
  };

  const homeText: Record<string, string> = {
    en: "Go to Home",
    te: "హోమ్ పేజీకి వెళ్లండి",
    hi: "होम पर जाएं",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-800/80 border border-rose-500/30 rounded-3xl p-8 backdrop-blur shadow-2xl">
        <div className="flex justify-center mb-6">
          <KlausAvatar mood="explaining" size="xl" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-sm font-bold mb-4 tracking-wider uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>Error</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {titles[nativeLanguage] || titles.en}
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          {descriptions[nativeLanguage] || descriptions.en}
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-rose-400 font-mono text-left overflow-x-auto mb-6 max-h-32">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            {retryText[nativeLanguage] || retryText.en}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-700/70 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-5 rounded-2xl transition-all"
          >
            <Home className="w-5 h-5" />
            {homeText[nativeLanguage] || homeText.en}
          </Link>
        </div>
      </div>
    </div>
  );
}
