"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, Sparkles, BookOpen, Lightbulb, MessageSquare, ArrowRight } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

export default function KlausHelpPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();

  const guides = [
    {
      title: "How Klaus Teaches in Your Native Tongue",
      description: `Klaus strictly uses your instructional language (${nativeLanguage.toUpperCase()}) to explain complex vocabulary, grammar, and corrections, while you produce and practice the target language (${targetLanguage.toUpperCase()}).`,
      icon: BookOpen,
    },
    {
      title: "Progressive Hint Architecture",
      description: "When you are stuck on an exercise, click 'Ask Klaus for a Hint'. Klaus gives progressive clues: first a gentle clue, then a structural clue, and finally reveals the answer with explanation.",
      icon: Lightbulb,
    },
    {
      title: "Conversational Mistake Corrections",
      description: "During real-life roleplays, Klaus stays in character in the target language. If you make a mistake, Klaus provides gentle corrections and explains why in your native language.",
      icon: MessageSquare,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950/70 border border-teal-500/30 text-teal-300 rounded-full text-xs font-bold mb-3 shadow-sm shadow-teal-950">
              <HelpCircle size={14} className="text-teal-400" />
              <span>AI Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.nav.klausHelp}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              Learn how to make the most of Klaus, your AI tutor in Lingua.
            </p>
          </div>
          <KlausAvatar mood="explaining" size="lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 shadow-sm shadow-indigo-950">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-base text-white mb-2">{g.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{g.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-8 text-white text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl font-black tracking-tight text-white relative z-10">Ready to chat with Klaus?</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed relative z-10">
            Ask any question about grammar, translation, cultural customs, or practice sentence construction.
          </p>
          <div className="relative z-10 pt-2">
            <Link
              href="/klaus/chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-2xl font-bold text-xs shadow-xl shadow-indigo-950 transition-all duration-200 active:scale-95"
            >
              <span>Open Klaus Chat</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
