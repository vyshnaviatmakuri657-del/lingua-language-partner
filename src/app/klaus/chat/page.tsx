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
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<KlausMood>("idle");
  const endRef = useRef<HTMLDivElement>(null);

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
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KlausAvatar mood={mood} size="lg" showBadge />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{t.klaus.name}</h1>
                <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">
                  AI Language Tutor
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Instruction Language: <span className="uppercase font-bold text-indigo-600">{nativeLanguage}</span> | Learning: <span className="uppercase font-bold text-teal-600">{targetLanguage}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition"
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
              className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-800 text-xs font-semibold rounded-full shrink-0 shadow-sm transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Stream Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[65vh] max-h-[600px] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isKlaus = m.sender === "klaus";
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isKlaus ? "justify-start" : "justify-end"}`}
                >
                  {isKlaus && (
                    <div className="shrink-0 mt-1">
                      <KlausAvatar mood="idle" size="sm" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed shadow-sm ${
                      isKlaus
                        ? "bg-slate-100/90 text-slate-800 border border-slate-200 rounded-tl-sm"
                        : "bg-indigo-600 text-white rounded-tr-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    {isKlaus && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        <AudioPlayerButton text={m.text} langCode={targetLanguage} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex gap-3 items-center text-xs text-slate-400">
                <KlausAvatar mood="thinking" size="sm" />
                <span className="flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin" />
                  <span>{t.klaus.klausThinking}</span>
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
            className="p-3 bg-slate-50/70 border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.klaus.askPlaceholder}
              className="flex-1 bg-white text-slate-900 px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="p-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl transition shadow-md flex items-center justify-center shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
