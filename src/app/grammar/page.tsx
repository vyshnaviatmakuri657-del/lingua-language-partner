"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";

interface GrammarItem {
  id: string;
  title: string;
  explanation: string;
  ruleSummary: string;
  examples: Array<{ target: string; transliteration?: string; native: string; explanation?: string }>;
  commonMistakes: Array<{ mistake: string; correction: string; explanation: string }>;
}

export default function GrammarPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<GrammarItem[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<GrammarItem | null>(null);

  useEffect(() => {
    async function loadGrammar() {
      setLoading(true);
      try {
        const res = await fetch(`/api/learning-path?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.modules) {
          // Fetch first lesson details to get seeded grammar
          const firstLesson = data.modules[0]?.lessons[0];
          if (firstLesson) {
            const lRes = await fetch(`/api/lessons/${firstLesson.id}`);
            const lData = await lRes.json();
            if (lData.lesson?.grammarTopics) {
              setTopics(lData.lesson.grammarTopics);
              setSelectedTopic(lData.lesson.grammarTopics[0] || null);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load grammar:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGrammar();
  }, [nativeLanguage, targetLanguage]);

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
              <Sparkles size={14} />
              <span>Linguistic Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.nav.grammar}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Grammar mechanics explained directly in your native language with target language demonstrations.
            </p>
          </div>
          <KlausAvatar mood="explaining" size="lg" />
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{t.common.loading}</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-xs">No grammar topics loaded for this pair.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar Topic List */}
            <div className="space-y-2">
              {topics.map((tItem) => (
                <button
                  key={tItem.id}
                  onClick={() => setSelectedTopic(tItem)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition flex items-center justify-between ${
                    selectedTopic?.id === tItem.id
                      ? "bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-200"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span className="truncate">{tItem.title}</span>
                  <BookOpen size={14} className="text-indigo-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>

            {/* Selected Grammar Topic Deep Dive */}
            {selectedTopic && (
              <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedTopic.explanation}
                  </p>
                </div>

                {/* Rule summary banner */}
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs font-bold text-teal-900">
                  Core Rule: {selectedTopic.ruleSummary}
                </div>

                {/* Examples */}
                {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Real-World Examples:
                    </h4>
                    <div className="space-y-2">
                      {selectedTopic.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{ex.target}</div>
                            {transliterationEnabled && ex.transliteration && (
                              <div className="text-indigo-600 font-mono text-[11px]">
                                [{ex.transliteration}]
                              </div>
                            )}
                            <div className="text-slate-600 mt-0.5">{ex.native}</div>
                          </div>
                          <AudioPlayerButton text={ex.target} langCode={targetLanguage} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistakes */}
                {selectedTopic.commonMistakes && selectedTopic.commonMistakes.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Common Pitfalls & Fixes:
                    </h4>
                    <div className="space-y-2">
                      {selectedTopic.commonMistakes.map((m, i) => (
                        <div
                          key={i}
                          className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-2xl text-xs space-y-1 text-rose-950"
                        >
                          <div className="flex items-center gap-1.5 font-bold text-rose-600">
                            <AlertTriangle size={14} />
                            <span>Mistake: &quot;{m.mistake}&quot;</span>
                          </div>
                          <div className="font-bold text-teal-700">
                            Correction: &quot;{m.correction}&quot;
                          </div>
                          <div className="text-slate-600">{m.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
