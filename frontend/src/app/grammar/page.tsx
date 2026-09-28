"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Filter,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import AnimatedTabs from "@/components/AnimatedTabs";
import SpotlightCard from "@/components/SpotlightCard";

interface GrammarItem {
  id: string;
  title: string;
  explanation: string;
  ruleSummary: string;
  examples: Array<{ target: string; transliteration?: string; native: string; explanation?: string }>;
  commonMistakes: Array<{ mistake?: string; incorrect?: string; correction?: string; correct?: string; explanation: string }>;
  lessonTitle?: string;
  moduleTitle?: string;
  moduleCategory?: string;
  moduleIcon?: string;
}

export default function GrammarPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<GrammarItem[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<GrammarItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function loadGrammar() {
      setLoading(true);
      try {
        const res = await fetch(`/api/grammar?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.topics && data.topics.length > 0) {
          setTopics(data.topics);
          setSelectedTopic(data.topics[0] || null);
        } else {
          // Fallback to learning-path fetch
          const lpRes = await fetch(`/api/learning-path?native=${nativeLanguage}&target=${targetLanguage}`);
          const lpData = await lpRes.json();
          if (lpRes.ok && lpData.modules) {
            const firstLesson = lpData.modules[0]?.lessons[0];
            if (firstLesson) {
              const lRes = await fetch(`/api/lessons/${firstLesson.id}`);
              const lData = await lRes.json();
              if (lData.lesson?.grammarTopics) {
                setTopics(lData.lesson.grammarTopics);
                setSelectedTopic(lData.lesson.grammarTopics[0] || null);
              }
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

  const categories = ["all", ...Array.from(new Set(topics.map((t) => t.moduleCategory).filter(Boolean)))];

  const categoryTabs = categories.map((cat) => ({
    id: cat as string,
    label: cat === "all" ? "All Modules" : (cat as string).replace(/_/g, " "),
  }));

  const filteredTopics = selectedCategory === "all"
    ? topics
    : topics.filter((t) => t.moduleCategory === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const matching = cat === "all" ? topics : topics.filter((t) => t.moduleCategory === cat);
    if (matching.length > 0 && (!selectedTopic || selectedTopic.moduleCategory !== cat)) {
      setSelectedTopic(matching[0]);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 page-enter">
        {/* Header */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <Sparkles size={13} className="text-indigo-400" />
              <span>Linguistic Architecture & Grammar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.nav.grammar}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed font-normal">
              Grammar mechanics explained directly in your native language with target language demonstrations across all 5 curriculum modules.
            </p>
          </div>
          <div className="relative z-10 p-2.5 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-card-elevated shrink-0 animate-float-slow">
            <KlausAvatar mood="explaining" size="lg" />
          </div>
        </div>

        {/* Category Filters Animated Tabs */}
        {categories.length > 1 && (
          <div className="overflow-x-auto pb-1 scrollbar-none stagger-2">
            <AnimatedTabs
              tabs={categoryTabs}
              activeTab={selectedCategory}
              onChange={handleCategoryChange}
              size="sm"
            />
          </div>
        )}

        {loading ? (
          <div className="p-16 text-center stagger-3">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">{t.common.loading}</p>
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="card-elevated rounded-3xl p-12 text-center border border-white/[0.08] shadow-xl stagger-3">
            <p className="text-slate-400 text-xs">No grammar topics loaded for this pair.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-3">
            {/* Sidebar Topic List */}
            <div className="space-y-2.5">
              {filteredTopics.map((tItem) => {
                const isSelected = selectedTopic?.id === tItem.id;
                return (
                  <button
                    key={tItem.id}
                    onClick={() => setSelectedTopic(tItem)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all duration-300 flex items-center justify-between active:scale-95 ${
                      isSelected
                        ? "card-elevated border-indigo-500/80 text-white ring-2 ring-indigo-500/30 shadow-glow-indigo translate-x-1"
                        : "card-interactive border-white/[0.08] text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate text-sm font-extrabold">{tItem.title}</div>
                      {tItem.moduleTitle && (
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                          {tItem.moduleIcon ? `${tItem.moduleIcon} ` : ""}{tItem.moduleTitle}
                        </div>
                      )}
                    </div>
                    <BookOpen size={14} className={isSelected ? "text-indigo-400" : "text-slate-500"} />
                  </button>
                );
              })}
            </div>

            {/* Selected Grammar Topic Deep Dive */}
            {selectedTopic && (
              <SpotlightCard
                spotlightColor="rgba(20, 184, 166, 0.14)"
                className="md:col-span-2 card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6"
              >
                <div>
                  {selectedTopic.moduleTitle && (
                    <span className="text-[11px] font-bold px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 rounded-full inline-block mb-3 shadow-sm">
                      {selectedTopic.moduleIcon ? `${selectedTopic.moduleIcon} ` : ""}{selectedTopic.moduleTitle} • {selectedTopic.lessonTitle || "Lesson Topic"}
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedTopic.explanation}
                  </p>
                </div>

                {/* Rule summary banner */}
                <div className="p-4 bg-teal-950/60 border border-teal-500/30 rounded-2xl text-xs font-bold text-teal-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />
                  <span className="relative z-10">Core Rule: {selectedTopic.ruleSummary}</span>
                </div>

                {/* Examples */}
                {selectedTopic.examples && selectedTopic.examples.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Real-World Demonstrations:
                    </h4>
                    <div className="space-y-2">
                      {selectedTopic.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3.5 card-interactive rounded-2xl border border-white/[0.08] flex items-center justify-between text-xs group"
                        >
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-teal-300 transition-colors">{ex.target}</div>
                            {transliterationEnabled && ex.transliteration && (
                              <div className="text-teal-400 font-mono text-[11px]">
                                [{ex.transliteration}]
                              </div>
                            )}
                            <div className="text-slate-300 mt-0.5">{ex.native}</div>
                          </div>
                          <AudioPlayerButton
                            text={ex.target}
                            transliteration={ex.transliteration}
                            langCode={targetLanguage}
                            size="sm"
                            isKlaus={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistakes */}
                {selectedTopic.commonMistakes && selectedTopic.commonMistakes.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Common Pitfalls & Fixes:
                    </h4>
                    <div className="space-y-2">
                      {selectedTopic.commonMistakes.map((m, i) => {
                        const mistakeText = m.mistake || m.incorrect || "";
                        const correctionText = m.correction || m.correct || "";
                        return (
                          <div
                            key={i}
                            className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-xs space-y-1.5 text-rose-200 shadow-sm relative overflow-hidden"
                          >
                            <div className="flex items-center gap-1.5 font-bold text-rose-400">
                              <AlertTriangle size={14} />
                              <span>Mistake: &quot;{mistakeText}&quot;</span>
                            </div>
                            <div className="font-bold text-teal-300">
                              Correction: &quot;{correctionText}&quot;
                            </div>
                            <div className="text-slate-300 font-normal">{m.explanation}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
