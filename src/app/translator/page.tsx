"use client";

import React, { useState } from "react";
import {
  Languages,
  Sparkles,
  ArrowRight,
  RotateCw,
  Copy,
  Check,
  BookOpen,
  Volume2,
  Lightbulb,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";

interface TranslationResult {
  sourceText: string;
  fromLanguage: string;
  toLanguage: string;
  translation: string;
  pronunciation: string;
  transliteration: string;
  literalMeaning: string;
  naturalMeaning: string;
  grammarExplanation: string;
  usageNotes: string;
  alternativeVersion?: string;
  formalVersion?: string;
  casualVersion?: string;
}

export default function TranslatorPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();

  const [fromLang, setFromLang] = useState<string>("auto");
  const [toLang, setToLang] = useState<string>(targetLanguage);
  const [inputText, setInputText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleTranslate = async (overrideText?: string, overrideModifier?: string) => {
    const textToRun = overrideText || inputText;
    if (!textToRun.trim() || isTranslating) return;

    setIsTranslating(true);
    try {
      const payloadText = overrideModifier ? `${textToRun} [Instruction: ${overrideModifier}]` : textToRun;
      const res = await fetch("/api/klaus/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: payloadText,
          from: fromLang,
          to: toLang,
          nativeLanguageCode: nativeLanguage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.result) {
        setResult(data.result);
      }
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold mb-2">
              <Sparkles size={14} className="text-teal-600" />
              <span>Pedagogical AI Translator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.translator.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              {t.translator.pageSubtitle}
            </p>
          </div>
          <KlausAvatar mood="explaining" size="lg" />
        </div>

        {/* Translation Workbench */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Selectors Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
            {/* From Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">{t.translator.fromLabel}:</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none focus:border-indigo-500"
              >
                <option value="auto">{t.translator.autoDetect}</option>
                {SUPPORTED_TARGET_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            <ArrowRight size={16} className="text-slate-400 hidden sm:block" />

            {/* To Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">{t.translator.toLabel}:</label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none focus:border-indigo-500"
              >
                {SUPPORTED_TARGET_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input & Translation Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Input Side */}
            <div className="p-6 flex flex-col justify-between">
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.translator.inputPlaceholder}
                className="w-full bg-transparent text-slate-900 text-base sm:text-lg placeholder-slate-400 outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400">{inputText.length} chars</span>
                <button
                  onClick={() => handleTranslate()}
                  disabled={!inputText.trim() || isTranslating}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-200 transition flex items-center gap-2 active:scale-95"
                >
                  {isTranslating ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>{t.translator.translateAction}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Side */}
            <div className="p-6 bg-slate-50/50 flex flex-col justify-between min-h-48">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-2xl font-black text-slate-900 leading-snug">
                        {result.translation}
                      </div>
                      {result.pronunciation && (
                        <div className="text-xs font-mono text-teal-700 mt-1">
                          [{result.pronunciation}]
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <AudioPlayerButton text={result.translation} langCode={toLang} size="sm" />
                      <button
                        onClick={() => handleCopy(result.translation)}
                        title="Copy translation"
                        className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition"
                      >
                        {copied ? <Check size={16} className="text-teal-600" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Native Language Meaning */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800">
                      {t.translator.naturalMeaning}:
                    </div>
                    <div className="text-indigo-700 font-semibold">{result.naturalMeaning}</div>
                    {result.literalMeaning && (
                      <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                        {t.translator.literalMeaning}: {result.literalMeaning}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="my-auto text-center text-slate-400 text-xs">
                  Translation with grammatical breakdown and native meanings will appear here.
                </div>
              )}
            </div>
          </div>

          {/* Extended Pedagogical Insights Panel */}
          {result && (
            <div className="p-6 border-t border-slate-200/80 bg-slate-50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grammar Notes */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-teal-700">
                    <BookOpen size={14} />
                    <span>{t.translator.grammarNotes}</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{result.grammarExplanation}</p>
                </div>

                {/* Usage & Etiquette */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-indigo-700">
                    <Lightbulb size={14} />
                    <span>{t.translator.usageNotes}</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{result.usageNotes}</p>
                </div>
              </div>

              {/* Action Buttons for Tuning */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400">Actions:</span>
                <button
                  onClick={() => handleTranslate(undefined, "make simpler for beginners")}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition"
                >
                  {t.translator.simplify}
                </button>
                <button
                  onClick={() => handleTranslate(undefined, "make polite and formal")}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition"
                >
                  {t.translator.makeFormal}
                </button>
                <button
                  onClick={() => handleTranslate(undefined, "make casual and spoken")}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition"
                >
                  {t.translator.makeCasual}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
