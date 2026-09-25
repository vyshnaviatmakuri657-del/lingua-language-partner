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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold mb-2">
              <HelpCircle size={14} className="text-teal-600" />
              <span>AI Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.nav.klausHelp}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{g.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-indigo-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl shadow-indigo-100">
          <h2 className="text-2xl font-black">Ready to chat with Klaus?</h2>
          <p className="text-xs text-indigo-100 max-w-md mx-auto">
            Ask any question about grammar, translation, cultural customs, or practice sentence construction.
          </p>
          <Link
            href="/klaus/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-xs shadow-md transition"
          >
            <span>Open Klaus Chat</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
