"use client";

import React, { useState } from "react";
import {
  Languages,
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  RotateCw,
  Copy,
  Check,
  BookOpen,
  Volume2,
  Lightbulb,
  Loader2,
  X,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_TARGET_LANGUAGES } from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import VoiceInputButton from "@/components/VoiceInputButton";
import SpotlightCard from "@/components/SpotlightCard";

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

  const handleSwap = () => {
    const currentFrom = fromLang === "auto" ? nativeLanguage : fromLang;
    const currentTo = toLang;
    setFromLang(currentTo);
    setToLang(currentFrom);
    if (result) {
      setInputText(result.translation);
      setResult(null);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/70 border border-teal-500/40 text-teal-300 rounded-full text-xs font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <Sparkles size={14} className="text-teal-400" />
              <span>Pedagogical AI Translator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.translator.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed font-normal">
              {t.translator.pageSubtitle}
            </p>
          </div>
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-white/[0.1] shadow-xl relative z-10 animate-float-slow">
            <KlausAvatar mood="explaining" size="lg" />
          </div>
        </div>

        {/* Translation Workbench */}
        <div className="card-elevated rounded-3xl shadow-2xl overflow-hidden border border-white/[0.08] stagger-2">
          {/* Selectors Bar */}
          <div className="p-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-slate-900/80">
            {/* From Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-400">{t.translator.fromLabel}:</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="bg-slate-800/90 border border-white/[0.1] text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none focus:border-indigo-500 transition shadow-inner"
              >
                <option value="auto">{t.translator.autoDetect}</option>
                {SUPPORTED_TARGET_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              title="Swap languages"
              className="btn-tactile p-2 hover:bg-slate-800 text-slate-300 rounded-xl flex items-center gap-1.5 text-xs font-bold border border-white/[0.08] bg-slate-800/90 shadow-sm"
            >
              <ArrowLeftRight size={15} />
              <span className="hidden sm:inline">Swap</span>
            </button>

            {/* To Selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-400">{t.translator.toLabel}:</label>
              <select
                value={toLang}
                onChange={(e) => setToLang(e.target.value)}
                className="bg-slate-800/90 border border-white/[0.1] text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl outline-none focus:border-indigo-500 transition shadow-inner"
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
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {/* Input Side */}
            <div className="p-6 flex flex-col justify-between">
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.translator.inputPlaceholder}
                className="w-full bg-transparent text-slate-100 text-base sm:text-lg placeholder-slate-500 outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <VoiceInputButton
                    langCode={fromLang === "auto" ? nativeLanguage : fromLang}
                    onTranscript={(text) => setInputText((prev) => (prev ? `${prev} ${text}` : text))}
                    disabled={isTranslating}
                    size="sm"
                  />
                  {inputText.trim() && (
                    <>
                      <AudioPlayerButton
                        text={inputText}
                        langCode={fromLang === "auto" ? nativeLanguage : fromLang}
                        size="sm"
                      />
                      <button
                        onClick={() => setInputText("")}
                        title="Clear text"
                        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition"
                      >
                        <X size={15} />
                      </button>
                    </>
                  )}
                  <span className="text-xs text-slate-500 ml-1 font-mono">{inputText.length} chars</span>
                </div>

                <button
                  onClick={() => handleTranslate()}
                  disabled={!inputText.trim() || isTranslating}
                  className="btn-tactile px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 disabled:opacity-40 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
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
            <div className="p-6 bg-slate-950/40 flex flex-col justify-between min-h-48">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-2xl font-black text-white leading-snug">
                        {result.translation}
                      </div>
                      {result.pronunciation && (
                        <div className="text-xs font-mono text-teal-400 mt-1 font-medium">
                          [{result.pronunciation}]
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <AudioPlayerButton
                        text={result.translation}
                        transliteration={result.transliteration || result.pronunciation}
                        langCode={toLang}
                        size="sm"
                        isKlaus={true}
                        label="Klaus Voice"
                      />
                      <button
                        onClick={() => handleCopy(result.translation)}
                        title="Copy translation"
                        className="btn-tactile p-2 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-white/[0.08]"
                      >
                        {copied ? <Check size={16} className="text-teal-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Native Language Meaning */}
                  <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-white/[0.06] text-xs space-y-1 shadow-inner">
                    <div className="font-bold text-slate-300">
                      {t.translator.naturalMeaning}:
                    </div>
                    <div className="text-indigo-400 font-semibold">{result.naturalMeaning}</div>
                    {result.literalMeaning && (
                      <div className="text-slate-400 text-[11px] pt-1 border-t border-white/[0.06]">
                        {t.translator.literalMeaning}: {result.literalMeaning}
                      </div>
                    )}
                  </div>

                  {/* Formality Speech Registers */}
                  {(result.formalVersion || result.casualVersion) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      {result.formalVersion && (
                        <div className="p-3.5 card-interactive bg-slate-900/80 border border-white/[0.06] rounded-2xl space-y-1.5 group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 font-mono">Formal / Respectful</span>
                            <AudioPlayerButton text={result.formalVersion} langCode={toLang} size="sm" isKlaus={true} />
                          </div>
                          <div className="font-bold text-slate-100 group-hover:text-teal-300 transition-colors">{result.formalVersion}</div>
                        </div>
                      )}
                      {result.casualVersion && (
                        <div className="p-3.5 card-interactive bg-slate-900/80 border border-white/[0.06] rounded-2xl space-y-1.5 group">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">Casual / Friendly</span>
                            <AudioPlayerButton text={result.casualVersion} langCode={toLang} size="sm" isKlaus={true} />
                          </div>
                          <div className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{result.casualVersion}</div>
                        </div>
                      )}
                    </div>
                  )}
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
            <div className="p-6 border-t border-white/[0.08] bg-slate-950/60 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grammar Notes */}
                <SpotlightCard
                  spotlightColor="rgba(20, 184, 166, 0.12)"
                  className="p-5 bg-slate-900/80 rounded-2xl border border-white/[0.08] text-xs space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-teal-400 flex items-center gap-1.5">
                      <BookOpen size={14} />
                      <span>{t.translator.grammarNotes}</span>
                    </h4>
                    <AudioPlayerButton text={result.grammarExplanation} langCode={nativeLanguage} size="sm" isKlaus={true} label="Klaus" />
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">{result.grammarExplanation}</p>
                </SpotlightCard>

                {/* Usage & Etiquette */}
                <SpotlightCard
                  spotlightColor="rgba(99, 102, 241, 0.12)"
                  className="p-5 bg-slate-900/80 rounded-2xl border border-white/[0.08] text-xs space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <Lightbulb size={14} />
                      <span>{t.translator.usageNotes}</span>
                    </h4>
                    <AudioPlayerButton text={result.usageNotes} langCode={nativeLanguage} size="sm" isKlaus={true} label="Klaus" />
                  </div>
                  <p className="text-slate-300 leading-relaxed font-normal">{result.usageNotes}</p>
                </SpotlightCard>
              </div>

              {/* Action Buttons for Tuning */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
                <span className="text-xs font-bold text-slate-400">Actions:</span>
                <button
                  onClick={() => handleTranslate(undefined, "make simpler for beginners")}
                  className="btn-tactile px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-white/[0.08] hover:border-indigo-500/40 rounded-xl text-xs font-semibold"
                >
                  {t.translator.simplify}
                </button>
                <button
                  onClick={() => handleTranslate(undefined, "make polite and formal")}
                  className="btn-tactile px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-white/[0.08] hover:border-indigo-500/40 rounded-xl text-xs font-semibold"
                >
                  {t.translator.makeFormal}
                </button>
                <button
                  onClick={() => handleTranslate(undefined, "make casual and spoken")}
                  className="btn-tactile px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-white/[0.08] hover:border-indigo-500/40 rounded-xl text-xs font-semibold"
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
