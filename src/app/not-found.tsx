"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { KlausAvatar } from "@/components/KlausAvatar";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { nativeLanguage, t } = useLanguage();

  const titles: Record<string, string> = {
    en: "Page Not Found",
    te: "పేజీ కనుగొనబడలేదు",
    hi: "पृष्ठ नहीं मिला",
  };

  const descriptions: Record<string, string> = {
    en: "Klaus looked everywhere, but this path doesn't exist on Lingua. Let's get you back on your learning trail!",
    te: "క్లాస్ అన్నిచోట్లా వెతికాడు, కానీ లింగ్వాలో ఈ మార్గం లేదు. మీ అభ్యాస ప్రయాణానికి తిరిగి వెళ్దాం!",
    hi: "क्लाउस ने हर जगह खोजा, लेकिन यह पृष्ठ लिंग्वा पर मौजूद नहीं है। चलिए आपको अपनी सीखने की राह पर वापस लाते हैं!",
  };

  const backHomeText: Record<string, string> = {
    en: "Back to Home",
    te: "హోమ్ పేజీకి వెళ్లండి",
    hi: "होम पर वापस जाएं",
  };

  const dashboardText: Record<string, string> = {
    en: "Go to Dashboard",
    te: "డ్యాష్‌బోర్డ్‌కు వెళ్లండి",
    hi: "डैशबोर्ड पर जाएं",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700/60 rounded-3xl p-8 backdrop-blur shadow-2xl">
        <div className="flex justify-center mb-6">
          <KlausAvatar mood="thinking" size="xl" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-sm font-bold mb-4 tracking-wider uppercase">
          404 Error
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {titles[nativeLanguage] || titles.en}
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          {descriptions[nativeLanguage] || descriptions.en}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Compass className="w-5 h-5" />
            {dashboardText[nativeLanguage] || dashboardText.en}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-700/70 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-5 rounded-2xl transition-all"
          >
            <Home className="w-5 h-5" />
            {backHomeText[nativeLanguage] || backHomeText.en}
          </Link>
        </div>
      </div>
    </div>
  );
}
