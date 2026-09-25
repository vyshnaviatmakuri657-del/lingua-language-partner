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
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import AudioPlayerButton from "@/components/AudioPlayerButton";

interface VocabItem {
  id: string;
  targetWord: string;
  nativeMeaning: string;
  pronunciation: string;
  transliteration?: string | null;
  partOfSpeech: string;
  exampleTarget: string;
  exampleNative: string;
  mastery?: number;
}

export default function VocabularyPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<VocabItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadVocab() {
      setLoading(true);
      try {
        const res = await fetch(`/api/review?native=${nativeLanguage}&target=${targetLanguage}`);
        const data = await res.json();
        if (res.ok && data.cards) {
          setWords(
            data.cards.map((c: any) => ({
              id: c.vocabularyId,
              targetWord: c.targetWord,
              nativeMeaning: c.nativeMeaning,
              pronunciation: c.pronunciation,
              transliteration: c.transliteration,
              partOfSpeech: c.partOfSpeech,
              exampleTarget: c.exampleTarget,
              exampleNative: c.exampleNative,
              mastery: c.mastery || 0,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load vocabulary:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVocab();
  }, [nativeLanguage, targetLanguage]);

  const filtered = words.filter(
    (w) =>
      w.targetWord.toLowerCase().includes(search.toLowerCase()) ||
      w.nativeMeaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold mb-2">
              <BookOpen size={14} className="text-teal-600" />
              <span>Vocabulary Bank</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.nav.vocabulary}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Words introduced in your lessons with target pronunciation, native meanings, and mastery tracking.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.common.search}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:border-indigo-500 text-slate-800"
            />
          </div>
        </div>

        {/* Word Grid */}
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">{t.common.loading}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-xs">No vocabulary words match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-slate-900">
                      {item.targetWord}
                    </span>
                    <AudioPlayerButton text={item.targetWord} langCode={targetLanguage} size="sm" />
                  </div>

                  {transliterationEnabled && (
                    <div className="text-xs font-mono text-indigo-600 mb-1">
                      [{item.pronunciation}]
                    </div>
                  )}

                  <div className="text-sm font-semibold text-slate-700">
                    {item.nativeMeaning}
                  </div>
                </div>

                {item.exampleTarget && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-0.5">
                    <div className="text-slate-800 font-medium">{item.exampleTarget}</div>
                    <div className="text-slate-500 text-[11px]">{item.exampleNative}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
