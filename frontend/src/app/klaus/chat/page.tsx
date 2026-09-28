"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  Lightbulb,
  HelpCircle,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar, { KlausMood } from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import VoiceInputButton from "@/components/VoiceInputButton";

interface ChatMessage {
  id: string;
  sender: "user" | "klaus";
  text: string;
  timestamp: Date;
}

export default function KlausChatPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [voiceLang, setVoiceLang] = useState<string>(nativeLanguage);
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<KlausMood>("idle");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVoiceLang(nativeLanguage);
  }, [nativeLanguage]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "init",
          sender: "klaus",
          text: t.klaus.greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, t.klaus.greeting]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isThinking) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);
    setMood("thinking");

    try {
      const res = await fetch("/api/klaus/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          context: {
            nativeLanguage,
            targetLanguage,
          },
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: "k-" + Date.now(),
            sender: "klaus",
            text: data.reply,
            timestamp: new Date(),
          },
        ]);
        setMood("explaining");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "klaus",
          text: t.klaus.errorReplying,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
      setTimeout(() => setMood("idle"), 3000);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/90 shadow-xl flex items-center justify-between transition-colors relative overflow-hidden group">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <KlausAvatar mood={mood} size="lg" showBadge />
              {isThinking && (
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{t.klaus.name}</h1>
                <span className="px-2.5 py-0.5 bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-bold rounded-full shadow-sm shadow-teal-950">
                  AI Language Tutor
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Instruction Language: <span className="uppercase font-bold text-indigo-400">{nativeLanguage}</span> • Learning: <span className="uppercase font-bold text-teal-400">{targetLanguage}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition active:scale-95 shadow-sm"
            title={t.klaus.clearChat}
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Suggestion Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {t.klaus.suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isThinking}
              className="px-3.5 py-2 bg-slate-900/70 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 text-xs font-semibold rounded-2xl shrink-0 shadow-sm transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Stream Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/90 shadow-2xl flex flex-col h-[65vh] max-h-[600px] overflow-hidden transition-colors">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isKlaus = m.sender === "klaus";
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isKlaus ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  {isKlaus && (
                    <div className="shrink-0 mt-1">
                      <KlausAvatar mood="idle" size="sm" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed shadow-lg transition-all ${
                      isKlaus
                        ? "bg-slate-850/90 text-slate-100 border border-slate-700/60 rounded-tl-sm shadow-slate-950/50"
                        : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-sm shadow-indigo-950/50 ring-1 ring-indigo-400/20"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    {isKlaus && (
                      <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        <AudioPlayerButton text={m.text} langCode={targetLanguage} size="sm" isKlaus={true} label="Klaus Voice" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex gap-3 items-center text-xs text-slate-400 p-2 animate-in fade-in">
                <KlausAvatar mood="thinking" size="sm" />
                <span className="flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-full border border-slate-800">
                  <Loader2 size={13} className="animate-spin text-indigo-400" />
                  <span className="text-slate-300 font-medium">{t.klaus.klausThinking}</span>
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2.5"
          >
            {/* Language toggle for speech */}
            <button
              type="button"
              onClick={() => setVoiceLang((prev) => (prev === nativeLanguage ? targetLanguage : nativeLanguage))}
              title={`Speech Recognition Language: ${voiceLang.toUpperCase()} (Click to toggle)`}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl shrink-0 transition flex items-center gap-1.5 border border-slate-700 shadow-sm active:scale-95"
            >
              <span>🎙️</span>
              <span className="uppercase text-indigo-300 font-mono">{voiceLang}</span>
            </button>

            <VoiceInputButton
              langCode={voiceLang}
              onTranscript={(transcript) => {
                setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
              }}
              disabled={isThinking}
              size="md"
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.klaus.askPlaceholder}
              className="flex-1 bg-slate-850 text-white placeholder-slate-500 px-4 py-3 rounded-2xl border border-slate-700/80 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl transition shadow-lg shadow-indigo-950 flex items-center justify-center shrink-0 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
