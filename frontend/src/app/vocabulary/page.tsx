"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Volume2,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Loader2,
  Layers,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import SpotlightCard from "@/components/SpotlightCard";
import AnimatedTabs from "@/components/AnimatedTabs";

interface VocabItem {
  id: string;
  targetWord: string;
  nativeMeaning: string;
  pronunciation: string;
  transliteration?: string | null;
  partOfSpeech: string;
  exampleTarget: string;
  exampleTransliteration?: string | null;
  exampleNative: string;
  lessonTitle?: string;
  moduleCategory?: string;
  moduleIcon?: string;
  moduleTitle?: string;
  mastery?: number;
}

export default function VocabularyPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<VocabItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function loadVocab() {
      setLoading(true);
      try {
        const res = await fetch(`/api/vocabulary?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.vocabularies) {
          setWords(data.vocabularies);
        }
      } catch (err) {
        console.error("Failed to load vocabulary:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVocab();
  }, [nativeLanguage, targetLanguage]);

  const categories = [
    "all",
    ...Array.from(new Set(words.map((w) => w.moduleCategory).filter(Boolean) as string[])),
  ];

  const categoryTabs = categories.map((cat) => ({
    id: cat,
    label: cat === "all" ? "All Modules" : cat.replace(/_/g, " "),
    icon: <Layers size={13} />,
  }));

  const filtered = words.filter((w) => {
    const matchesCategory = selectedCategory === "all" || w.moduleCategory === selectedCategory;
    const matchesSearch =
      w.targetWord.toLowerCase().includes(search.toLowerCase()) ||
      w.nativeMeaning.toLowerCase().includes(search.toLowerCase()) ||
      (w.transliteration && w.transliteration.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="space-y-6 pb-12 page-enter">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/70 border border-teal-500/30 text-teal-300 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <BookOpen size={13} className="text-teal-400" />
              <span>Vocabulary Bank ({words.length} Words)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.nav.vocabulary}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed font-normal">
              Real-world vocabulary introduced across all 5 practical modules with pronunciation, native meanings, and contextual usage.
            </p>
          </div>

          <div className="w-full sm:w-72 relative z-10">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.common.search}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/[0.08] text-xs rounded-2xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Category Filter Sliding Tabs */}
        {categories.length > 1 && (
          <div className="overflow-x-auto pb-1 scrollbar-none stagger-2">
            <AnimatedTabs
              tabs={categoryTabs}
              activeTab={selectedCategory}
              onChange={(id) => setSelectedCategory(id)}
              size="sm"
            />
          </div>
        )}

        {/* Word Grid */}
        {loading ? (
          <div className="p-16 text-center stagger-3">
            <Loader2 size={32} className="animate-spin text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{t.common.loading}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-elevated rounded-3xl p-12 text-center border border-white/[0.08] shadow-xl stagger-3">
            <p className="text-slate-400 text-xs">No vocabulary words match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-3">
            {filtered.map((item) => (
              <SpotlightCard
                key={item.id}
                spotlightColor="rgba(99, 102, 241, 0.16)"
                className="card-interactive rounded-3xl p-5 border border-white/[0.08] shadow-card-elevated flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                        {item.targetWord}
                      </span>
                      {item.partOfSpeech && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-white/[0.08] font-mono">
                          {item.partOfSpeech}
                        </span>
                      )}
                    </div>
                    <AudioPlayerButton
                      text={item.targetWord}
                      transliteration={item.transliteration || item.pronunciation}
                      langCode={targetLanguage}
                      size="sm"
                      isKlaus={true}
                      label="Klaus"
                    />
                  </div>

                  {transliterationEnabled && item.transliteration && (
                    <div className="text-xs font-mono text-teal-400 mb-1 font-medium">
                      [{item.transliteration}]
                    </div>
                  )}

                  <div className="text-sm font-semibold text-slate-200">
                    {item.nativeMeaning}
                  </div>
                </div>

                {item.exampleTarget && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-slate-200 font-medium">{item.exampleTarget}</div>
                      <AudioPlayerButton
                        text={item.exampleTarget}
                        transliteration={item.exampleTransliteration || undefined}
                        langCode={targetLanguage}
                        size="sm"
                        isKlaus={true}
                      />
                    </div>
                    {transliterationEnabled && item.exampleTransliteration && (
                      <div className="text-[11px] font-mono text-indigo-400">
                        {item.exampleTransliteration}
                      </div>
                    )}
                    <div className="text-slate-400 text-[11px]">{item.exampleNative}</div>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
