"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  MessageSquare,
  ShieldCheck,
  Flame,
  Brain,
  Headphones,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_NATIVE_LANGUAGES, SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";

export default function LandingPage() {
  const { nativeLanguage, setNativeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-indigo-50/30 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200">
            L
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
            LINGUA
          </span>
        </Link>

        {/* Quick Native Language Preview Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-semibold">
            {SUPPORTED_NATIVE_LANGUAGES.map((nl) => (
              <button
                key={nl.code}
                onClick={() => setNativeLanguage(nl.code as "en" | "te" | "hi")}
                className={`px-3 py-1 rounded-full transition ${
                  nativeLanguage === nl.code
                    ? "bg-white text-indigo-700 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {nl.flag} {nl.nativeName}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
          >
            {t.common.start === "Start Learning" ? "Log In" : t.nav.login}
          </Link>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition shadow-md shadow-indigo-200 active:scale-95"
          >
            {t.common.start}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        {/* Tutor Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold mb-6 shadow-sm">
          <KlausAvatar mood="happy" size="sm" />
          <span>Meet Klaus — Your Personal Multilingual AI Tutor</span>
          <Sparkles size={13} className="text-teal-600" />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
          {t.common.tagline}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Lingua combines structured lessons, intelligent practice, and Klaus — your personal AI language tutor instructing you directly through your native tongue.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl font-bold text-base shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>{t.common.start}</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl font-bold text-base shadow-sm flex items-center justify-center gap-2 transition"
          >
            <span>Explore Lingua</span>
            <Compass size={18} className="text-indigo-600" />
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full text-left">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <Globe2 className="text-indigo-600 mb-2" size={24} />
            <h4 className="font-bold text-sm text-slate-800">Native Instruction</h4>
            <p className="text-xs text-slate-500 mt-1">
              Explanations in Telugu, Hindi, or English.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <Brain className="text-teal-600 mb-2" size={24} />
            <h4 className="font-bold text-sm text-slate-800">Klaus AI Tutor</h4>
            <p className="text-xs text-slate-500 mt-1">
              Progressive hints, error corrections & advice.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <MessageSquare className="text-rose-500 mb-2" size={24} />
            <h4 className="font-bold text-sm text-slate-800">Real Scenarios</h4>
            <p className="text-xs text-slate-500 mt-1">
              Airport, dining, hotels, and office speech.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <Flame className="text-amber-500 mb-2" size={24} />
            <h4 className="font-bold text-sm text-slate-800">Spaced Review</h4>
            <p className="text-xs text-slate-500 mt-1">
              Leitner box memory repetition system.
            </p>
          </div>
        </div>
      </section>

      {/* Language Pairs Matrix Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200/60">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Learn Any Target Language Through Your Native Language
          </h2>
          <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
            Lingua treats each native and target language combination as a unique pedagogical pair with specialized grammar analogies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Telugu -> Korean */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-bold text-xs">
                Featured Pair
              </span>
              <span className="text-sm font-semibold text-slate-400">తెలుగు ➔ 한국어</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Telugu ➔ Korean</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Korean SOV sentence syntax matches Telugu naturally. Learn honorifics, daily greetings (안녕하세요), and travel dialogue with fluent Telugu explanations.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
              <div className="text-slate-800 font-bold">안녕하세요 (Annyeonghaseyo)</div>
              <div className="text-indigo-600">తెలుగు అర్థం: నమస్కారం / బాగున్నారా</div>
            </div>
          </div>

          {/* Card 2: Hindi -> French */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-bold text-xs">
                Popular Track
              </span>
              <span className="text-sm font-semibold text-slate-400">हिन्दी ➔ Français</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Hindi ➔ French</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Explore French gender agreement, cafe culture (Bonjour, s&apos;il vous plaît), and Paris transit explained smoothly through Hindi grammatical analogies.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
              <div className="text-slate-800 font-bold">Bonjour (Bon-zhoor)</div>
              <div className="text-teal-600">हिंदी अर्थ: नमस्ते / शुभ दिन</div>
            </div>
          </div>

          {/* Card 3: English -> Spanish */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold text-xs">
                Global Favorite
              </span>
              <span className="text-sm font-semibold text-slate-400">English ➔ Español</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">English ➔ Spanish</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Master asking directions (¿Dónde está la estación?), ordering tapas, and conversational fluencies with Klaus guiding every grammatical step.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
              <div className="text-slate-800 font-bold">¿Dónde está la estación?</div>
              <div className="text-amber-700">English: Where is the station?</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Languages Carousel / Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
          Supported Target Languages
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SUPPORTED_TARGET_LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="px-4 py-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-2 text-sm font-bold text-slate-700"
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              <span className="text-xs font-normal text-slate-400">({lang.nativeName})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
              L
            </span>
            <span>Lingua Language Technologies</span>
          </div>
          <p>© {new Date().getFullYear()} Lingua. All rights reserved. Powered by Klaus AI Tutor.</p>
        </div>
      </footer>
    </div>
  );
}
