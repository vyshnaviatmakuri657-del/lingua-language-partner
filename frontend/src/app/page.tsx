"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Globe2,
  MessageSquare,
  Flame,
  Brain,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_NATIVE_LANGUAGES, SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";
import SpotlightCard from "@/components/SpotlightCard";

export default function LandingPage() {
  const { nativeLanguage, setNativeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      {/* ================================================================= */}
      {/* 1. VISIBLE AMBIENT BACKGROUND CANVAS WITH COLOR ORBS              */}
      {/* ================================================================= */}
      <div className="bg-ambient-canvas -z-50">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-secondary" />
        <div className="ambient-orb orb-tertiary" />
        {/* Top radial spotlight illuminating the hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/25 via-teal-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-600/30 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
            L
          </div>
          <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-200 bg-clip-text text-transparent group-hover:text-indigo-300 transition-colors">
            LINGUA
          </span>
        </Link>

        {/* Quick Native Language Preview Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/85 backdrop-blur-2xl p-1.5 rounded-full border border-white/[0.1] text-xs font-semibold shadow-inner">
            {SUPPORTED_NATIVE_LANGUAGES.map((nl) => (
              <button
                key={nl.code}
                onClick={() => setNativeLanguage(nl.code as "en" | "te" | "hi")}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  nativeLanguage === nl.code
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 font-bold scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {nl.flag} {nl.nativeName}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            {t.common.start === "Start Learning" ? "Log In" : t.nav.login}
          </Link>
          <Link
            href="/onboarding"
            className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-full transition-all duration-200 shadow-lg shadow-indigo-600/35 btn-tactile"
          >
            {t.common.start}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center flex flex-col items-center relative z-10 page-enter">
        {/* Floating Tutor Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-teal-500/40 text-teal-300 text-xs font-bold mb-8 shadow-xl shadow-teal-950/50 animate-float-slow">
          <KlausAvatar mood="happy" size="sm" showBadge={true} />
          <span className="text-white">Meet Klaus — Your Multilingual Alpha AI Mentor</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
          <span className="gradient-text-hero">
            {t.common.tagline}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-normal">
          Lingua combines structured CEFR lessons, intelligent spaced repetition, and Klaus — your personal AI language mentor instructing you directly through your native tongue.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white rounded-2xl font-bold text-base shadow-xl shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all duration-200 btn-tactile hover:shadow-indigo-500/50"
          >
            <span>{t.common.start}</span>
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-850 border border-white/[0.12] hover:border-indigo-500/40 text-white rounded-2xl font-bold text-base shadow-xl shadow-black/60 flex items-center justify-center gap-2 transition-all duration-200 btn-tactile"
          >
            <span>Explore Dashboard</span>
            <Compass size={18} className="text-indigo-400" />
          </Link>
        </div>

        {/* Feature Highlights Grid with Spotlight Illumination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 w-full text-left">
          <SpotlightCard className="p-6 rounded-3xl" spotlightColor="rgba(99, 102, 241, 0.2)">
            <div className="w-11 h-11 rounded-2xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform shadow-md">
              <Globe2 size={22} />
            </div>
            <h4 className="font-black text-base text-white group-hover:text-indigo-200 transition-colors">
              Native Instruction
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Target grammar explained seamlessly in Telugu, Hindi, or English.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-3xl" spotlightColor="rgba(20, 184, 166, 0.2)">
            <div className="w-11 h-11 rounded-2xl bg-teal-950/70 border border-teal-500/40 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform shadow-md">
              <Brain size={22} />
            </div>
            <h4 className="font-black text-base text-white group-hover:text-teal-200 transition-colors">
              Klaus AI Mentor
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Strict male voice guidance with clear phonetic enunciation.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-3xl" spotlightColor="rgba(244, 63, 94, 0.2)">
            <div className="w-11 h-11 rounded-2xl bg-rose-950/70 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform shadow-md">
              <MessageSquare size={22} />
            </div>
            <h4 className="font-black text-base text-white group-hover:text-rose-200 transition-colors">
              Real Scenarios
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Interactive roleplay for dining, airports, hotels, and business.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-3xl" spotlightColor="rgba(245, 158, 11, 0.2)">
            <div className="w-11 h-11 rounded-2xl bg-amber-950/70 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform shadow-md">
              <Flame size={22} className="animate-flame" />
            </div>
            <h4 className="font-black text-base text-white group-hover:text-amber-200 transition-colors">
              Spaced Review
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Leitner box spaced repetition ensuring permanent long-term recall.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* Language Pairs Matrix Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/[0.08] relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950/70 text-indigo-300 rounded-full text-xs font-bold mb-3 border border-indigo-500/30">
            <Zap size={13} />
            <span>Cross-Linguistic Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Learn Any Target Language Through Your Native Language
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Lingua treats each native and target language combination as a unique pedagogical pair with specialized grammar analogies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Telugu -> Korean */}
          <SpotlightCard className="p-7 rounded-3xl" spotlightColor="rgba(99, 102, 241, 0.25)">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-950/90 border border-indigo-500/40 text-indigo-300 rounded-full font-bold text-xs shadow-sm">
                Featured Track
              </span>
              <span className="text-xs font-semibold text-slate-300 font-mono">తెలుగు ➔ 한국어</span>
            </div>
            <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-indigo-300 transition-colors">
              Telugu ➔ Korean
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Korean SOV sentence syntax matches Telugu naturally. Learn honorifics, daily greetings (안녕하세요), and travel dialogue with fluent Telugu explanations.
            </p>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] text-xs space-y-1.5 font-mono shadow-inner">
              <div className="text-white font-bold">안녕하세요 (Annyeonghaseyo)</div>
              <div className="text-indigo-400">తెలుగు అర్థం: నమస్కారం / బాగున్నారా</div>
            </div>
          </SpotlightCard>

          {/* Card 2: Hindi -> French */}
          <SpotlightCard className="p-7 rounded-3xl" spotlightColor="rgba(20, 184, 166, 0.25)">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-teal-950/90 border border-teal-500/40 text-teal-300 rounded-full font-bold text-xs shadow-sm">
                Popular Track
              </span>
              <span className="text-xs font-semibold text-slate-300 font-mono">हिन्दी ➔ Français</span>
            </div>
            <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-teal-300 transition-colors">
              Hindi ➔ French
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Explore French gender agreement, cafe culture (Bonjour, s&apos;il vous plaît), and Paris transit explained smoothly through Hindi grammatical analogies.
            </p>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] text-xs space-y-1.5 font-mono shadow-inner">
              <div className="text-white font-bold">Bonjour (Bon-zhoor)</div>
              <div className="text-teal-400">हिंदी अर्थ: नमस्ते / शुभ दिन</div>
            </div>
          </SpotlightCard>

          {/* Card 3: English -> Spanish */}
          <SpotlightCard className="p-7 rounded-3xl" spotlightColor="rgba(245, 158, 11, 0.25)">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-950/90 border border-amber-500/40 text-amber-300 rounded-full font-bold text-xs shadow-sm">
                Global Favorite
              </span>
              <span className="text-xs font-semibold text-slate-300 font-mono">English ➔ Español</span>
            </div>
            <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
              English ➔ Spanish
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Master asking directions (¿Dónde está la estación?), ordering tapas, and conversational fluencies with Klaus guiding every grammatical step.
            </p>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] text-xs space-y-1.5 font-mono shadow-inner">
              <div className="text-white font-bold">¿Dónde está la estación?</div>
              <div className="text-amber-400">English: Where is the station?</div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Target Languages Badges */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-8 font-mono">
          Supported Target Languages
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SUPPORTED_TARGET_LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="px-4 py-3 bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-white/[0.09] shadow-lg flex items-center gap-2.5 text-sm font-bold text-slate-200 card-interactive hover:scale-105"
            >
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">({lang.nativeName})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 bg-slate-950/80 backdrop-blur-xl text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold text-slate-300">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs shadow-sm">
              L
            </span>
            <span>Lingua Language Technologies</span>
          </div>
          <p>© {new Date().getFullYear()} Lingua. All rights reserved. Powered by Klaus AI Mentor.</p>
        </div>
      </footer>
    </div>
  );
}
