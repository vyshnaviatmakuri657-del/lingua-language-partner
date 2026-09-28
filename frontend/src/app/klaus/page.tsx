"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Languages,
  BookOpen,
  Volume2,
  Mic,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar, { KlausMood } from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import VoiceInputButton from "@/components/VoiceInputButton";
import SpotlightCard from "@/components/SpotlightCard";

export default function KlausHubPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [testSpeechText, setTestSpeechText] = useState("Listen to me carefully. Discipline beats talent every single day. Let us master this language.");
  const [sandboxVoiceLang, setSandboxVoiceLang] = useState<string>(targetLanguage);
  const [mood, setMood] = useState<KlausMood>("happy");

  const features = [
    {
      title: "Interactive AI Tutor",
      description: "Ask questions about grammar, nuance, verb conjugations, and sentence construction. Klaus explains everything warmly in your native tongue.",
      icon: MessageSquare,
      href: "/klaus/chat",
      cta: "Open Klaus Chat",
      color: "from-indigo-500 to-indigo-700",
      badge: "Real-time AI",
      spotlight: "rgba(99, 102, 241, 0.16)",
    },
    {
      title: "Pedagogical Translator",
      description: "Instant translation paired with literal meanings, natural expressions, phonetic pronunciations, and in-depth grammatical breakdowns.",
      icon: Languages,
      href: "/translator",
      cta: "Go to Translator",
      color: "from-teal-500 to-teal-700",
      badge: "Grammar & Meaning",
      spotlight: "rgba(20, 184, 166, 0.16)",
    },
    {
      title: "Real-Life Roleplay",
      description: "Practice authentic dialogue in 8 realistic scenarios (airport, dining, hotel, workplace). Klaus responds in character and provides native corrections.",
      icon: Sparkles,
      href: "/roleplay",
      cta: "Start Roleplay",
      color: "from-rose-500 to-pink-700",
      badge: "8 Scenarios",
      spotlight: "rgba(244, 63, 94, 0.16)",
    },
    {
      title: "Grammar Rules & Patterns",
      description: "Master particles, sentence order (SOV vs SVO), honorific speech levels, and verb tenses with clear comparative explanations.",
      icon: BookOpen,
      href: "/grammar",
      cta: "Explore Grammar",
      color: "from-amber-500 to-orange-600",
      badge: "Core Rules",
      spotlight: "rgba(245, 158, 11, 0.16)",
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12 page-enter">
        {/* Hero Header */}
        <div className="card-elevated bg-gradient-to-r from-slate-900/95 via-indigo-950/80 to-slate-900/95 border border-teal-500/30 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden stagger-1">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/70 border border-teal-500/30 backdrop-blur-md rounded-full text-xs font-bold text-teal-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <Sparkles size={13} className="text-teal-400" />
                <span>Meet Klaus — Your Personal AI Language Mentor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Master Languages with Pedagogical AI
              </h1>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-normal">
                Klaus understands your native language (<span className="font-bold uppercase text-indigo-300">{nativeLanguage}</span>) and guides you step-by-step into fluency in <span className="font-bold uppercase text-teal-300">{targetLanguage}</span> with voice, grammar breakdowns, and real-time speech practice.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="/klaus/chat"
                  className="btn-tactile px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 rounded-2xl font-black text-xs shadow-glow-teal flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  <span>Start Chatting</span>
                </Link>
                <Link
                  href="/translator"
                  className="btn-tactile px-6 py-3 bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-white/[0.1] rounded-2xl font-bold text-xs flex items-center gap-2"
                >
                  <Languages size={16} />
                  <span>AI Translator</span>
                </Link>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-3xl backdrop-blur-xl border border-white/[0.1] shadow-2xl flex flex-col items-center animate-float-slow">
              <KlausAvatar mood={mood} size="xl" showBadge />
              <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center">
                {(["idle", "happy", "explaining", "thinking", "hinting"] as KlausMood[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold capitalize transition-all active:scale-95 ${
                      mood === m ? "bg-teal-400 text-slate-950 font-black shadow-glow-teal" : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-750"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative ambient glowing orbs */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-2">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor={f.spotlight}
                className="card-interactive rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-card-elevated transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={24} />
                    </div>
                    <span className="px-3 py-1 bg-slate-800/80 border border-white/[0.08] text-slate-300 text-xs font-bold rounded-full shadow-sm">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-end">
                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition"
                  >
                    <span>{f.cta}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Live Speech & Voice Practice Sandbox */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950/60 border border-teal-500/30 text-teal-300 rounded-full text-xs font-bold mb-1.5 shadow-sm">
                <Mic size={13} />
                <span>Speech & Voice Testbed</span>
              </div>
              <h2 className="text-xl font-black text-white">
                Try Speaking and Listening with Klaus
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Test your microphone speech recognition and Klaus&apos;s native script voice synthesis.
              </p>
            </div>

            {/* Language toggle for sandbox */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Language:</span>
              <button
                onClick={() => setSandboxVoiceLang((prev) => (prev === targetLanguage ? nativeLanguage : targetLanguage))}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl border border-white/[0.08] transition uppercase active:scale-95 shadow-sm"
              >
                🎙️ {sandboxVoiceLang} (Click to switch)
              </button>
              <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-1 rounded-full shadow-sm">
                Strict Male Voice • Pure Articulation
              </span>
            </div>
          </div>

          <div className="p-5 bg-slate-950/60 rounded-2xl border border-white/[0.06] flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTestSpeechText("Listen to me carefully. Discipline beats talent every single day. Let us master this language.")}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                💪 &quot;Discipline beats talent...&quot;
              </button>
              <button
                type="button"
                onClick={() => setTestSpeechText("Pay attention. That pronunciation was sloppy. Repeat after me with intent.")}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🎯 &quot;Repeat with intent...&quot;
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxVoiceLang("te");
                  setTestSpeechText("ఏకాగ్రతతో వినండి. వెనకడుగు వేయడానికి వీల్లేదు. మళ్ళీ ప్రాక్టీస్ చేద్దాం.");
                }}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🇮🇳 Telugu Phrase
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxVoiceLang("ko");
                  setTestSpeechText("정신 차려. 타협은 없다. 완벽할 때까지 다시 연습한다.");
                }}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🇰🇷 Korean Phrase
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxVoiceLang("es");
                  setTestSpeechText("¡Hola! Presta mucha atención. La pronunciación perfecta requiere disciplina.");
                }}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🇪🇸 Spanish Phrase
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxVoiceLang("fr");
                  setTestSpeechText("Bonjour ! Écoutez attentivement et répétez après moi avec précision.");
                }}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🇫🇷 French Phrase
              </button>
              <button
                type="button"
                onClick={() => {
                  setSandboxVoiceLang("hi");
                  setTestSpeechText("नमस्ते! ध्यान से सुनिए और मेरे बाद स्पष्ट रूप से दोहराइए।");
                }}
                className="text-[11px] bg-slate-850 hover:bg-indigo-950/60 border border-white/[0.08] hover:border-indigo-500/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl transition active:scale-95"
              >
                🇮🇳 Hindi Phrase
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <VoiceInputButton
                langCode={sandboxVoiceLang}
                onTranscript={(t) => setTestSpeechText(t)}
                size="lg"
              />
              <input
                type="text"
                value={testSpeechText}
                onChange={(e) => setTestSpeechText(e.target.value)}
                placeholder="Click the microphone to speak, or type any sentence here..."
                className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-sm px-4 py-3.5 rounded-2xl border border-white/[0.08] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
              {testSpeechText.trim() && (
                <div className="flex items-center gap-2 shrink-0">
                  <AudioPlayerButton text={testSpeechText} langCode={sandboxVoiceLang} size="md" isKlaus={true} />
                  <button
                    onClick={() => setTestSpeechText("")}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition active:scale-95 border border-white/[0.08]"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pedagogical Capabilities Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 card-interactive rounded-2xl border border-white/[0.08] flex items-start gap-3.5">
            <div className="p-2.5 bg-teal-950/70 border border-teal-500/30 text-teal-400 rounded-xl shrink-0 shadow-sm">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Unicode Script Voice</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Auto-detects Telugu, Korean, Hindi, Tamil, French, and Spanish scripts so the correct native voice speaks.
              </p>
            </div>
          </div>

          <div className="p-5 card-interactive rounded-2xl border border-white/[0.08] flex items-start gap-3.5">
            <div className="p-2.5 bg-indigo-950/70 border border-indigo-500/30 text-indigo-400 rounded-xl shrink-0 shadow-sm">
              <Lightbulb size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">3-Tier Hints</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Never gives away the answer immediately — gently scaffolds your thinking before revealing solutions.
              </p>
            </div>
          </div>

          <div className="p-5 card-interactive rounded-2xl border border-white/[0.08] flex items-start gap-3.5">
            <div className="p-2.5 bg-rose-950/70 border border-rose-500/30 text-rose-400 rounded-xl shrink-0 shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Zero-Error Fallback</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Powered by Gemini 2.5 Flash, with instant neural & mathematical offline fallbacks when offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
