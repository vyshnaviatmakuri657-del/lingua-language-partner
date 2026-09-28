"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, HelpCircle, BookOpen, Lightbulb, RotateCcw } from "lucide-react";
import { KlausAvatar, KlausMood } from "./KlausAvatar";
import { useLanguage } from "@/context/LanguageContext";
import AudioPlayerButton from "./AudioPlayerButton";
import VoiceInputButton from "./VoiceInputButton";

export interface KlausChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    currentLessonTitle?: string;
    currentModuleTitle?: string;
    exercisePrompt?: string;
    correctAnswer?: string;
    userAnswer?: string;
    lessonVocabulary?: Array<{ targetWord: string; nativeMeaning: string; pronunciation: string }>;
    lessonGrammar?: string;
    hintStep?: 1 | 2 | 3;
  };
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: "user" | "klaus";
  text: string;
  timestamp: Date;
}

export function KlausChatModal({
  isOpen,
  onClose,
  context,
  initialQuery,
}: KlausChatModalProps) {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [voiceLang, setVoiceLang] = useState<string>(nativeLanguage);
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<KlausMood>("idle");
  const [currentHintStep, setCurrentHintStep] = useState<1 | 2 | 3>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVoiceLang(nativeLanguage);
  }, [nativeLanguage]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "klaus",
          text: t.klaus.greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, t.klaus.greeting]);

  // Handle initialQuery if passed (e.g. from "Ask Klaus" button on exercise)
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isThinking) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: trimmed,
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
          message: trimmed,
          context: {
            ...context,
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
      } else {
        throw new Error(data.error || "Failed to get reply");
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
      setMood("idle");
    } finally {
      setIsThinking(false);
      setTimeout(() => setMood("idle"), 3000);
    }
  };

  const handleRequestHint = async () => {
    setIsThinking(true);
    setMood("hinting");
    try {
      const res = await fetch("/api/klaus/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: currentHintStep,
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
          exerciseId: undefined,
        }),
      });

      const data = await res.json();
      const hintText = data.hint || "Try breaking the sentence into subject, object, and verb!";

      setMessages((prev) => [
        ...prev,
        {
          id: "hint-" + Date.now(),
          sender: "klaus",
          text: `💡 **${t.exercises.askKlausHint} (${currentHintStep}/3)**\n\n${hintText}`,
          timestamp: new Date(),
        },
      ]);

      setCurrentHintStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : 3));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "hint-err",
          sender: "klaus",
          text: t.klaus.errorReplying,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsThinking(false);
      setTimeout(() => setMood("idle"), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="card-elevated relative w-full max-w-2xl rounded-3xl shadow-2xl shadow-indigo-950/70 flex flex-col h-[85vh] max-h-[720px] overflow-hidden border border-white/[0.1]">
        {/* Decorative background glow inside modal */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-teal-800/90 via-indigo-900/90 to-slate-900/95 backdrop-blur-xl text-white p-4 px-6 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="p-1 bg-white/10 rounded-2xl backdrop-blur-md border border-white/[0.1] shadow-inner">
              <KlausAvatar mood={mood} size="md" showBadge={isThinking} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white tracking-tight">{t.klaus.name}</h3>
                <span className="text-[11px] bg-white/15 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 border border-white/10 text-teal-200 shadow-sm">
                  <Sparkles size={11} className="text-teal-300" /> {t.klaus.role}
                </span>
              </div>
              <p className="text-xs text-teal-200/90 mt-0.5">
                {context?.currentLessonTitle ? (
                  <span>
                    {t.lessons.lessonTitle}: {context.currentLessonTitle}
                  </span>
                ) : (
                  <span>
                    <strong className="uppercase">{nativeLanguage}</strong> ➔ <strong className="uppercase">{targetLanguage}</strong>
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMessages([])}
              title={t.klaus.clearChat}
              className="p-2 hover:bg-white/10 rounded-xl transition text-slate-300 hover:text-white active:scale-95"
            >
              <RotateCcw size={17} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition text-slate-300 hover:text-white active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={handleRequestHint}
            disabled={isThinking}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 rounded-full font-bold border border-amber-500/40 transition shrink-0 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Lightbulb size={13} className="text-amber-400" />
            {currentHintStep === 1
              ? t.klaus.hintButton
              : currentHintStep === 2
              ? t.klaus.moreHelpButton
              : t.klaus.showAnswerButton}
          </button>

          <button
            onClick={() => handleSendMessage(nativeLanguage === "te" ? "ఈ వాక్యంలోని వ్యాకరణ నియమాలను వివరంగా వివరించండి." : nativeLanguage === "hi" ? "इस वाक्य के व्याकरण के नियम समझाइए।" : "Explain the grammar of this structure.")}
            disabled={isThinking}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 rounded-full font-bold border border-indigo-500/40 transition shrink-0 hover:scale-105 active:scale-95 shadow-sm"
          >
            <BookOpen size={13} className="text-indigo-400" />
            {t.klaus.explainGrammarButton}
          </button>

          <button
            onClick={() => handleSendMessage(nativeLanguage === "te" ? "మర్యాదపూర్వక మరియు సాధారణ సంభాషణల మధ్య తేడాను వివరించండి." : nativeLanguage === "hi" ? "औपचारिक और अनौपचारिक वार्तालाप में क्या अंतर है?" : "Explain formal vs casual expressions.")}
            disabled={isThinking}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 rounded-full font-bold border border-purple-500/40 transition shrink-0 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Sparkles size={13} className="text-purple-400" />
            <span>Formal vs Casual</span>
          </button>

          <button
            onClick={() => handleSendMessage(nativeLanguage === "te" ? "నేను సాధన చేయడానికి మరొక ఉదాహరణ వాక్యాన్ని ఇవ్వండి." : nativeLanguage === "hi" ? "अभ्यास के लिए एक और उदाहरण वाक्य दीजिए।" : "Give me another practice example.")}
            disabled={isThinking}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-950/50 hover:bg-teal-900/60 text-teal-300 rounded-full font-bold border border-teal-500/40 transition shrink-0 hover:scale-105 active:scale-95 shadow-sm"
          >
            <HelpCircle size={13} className="text-teal-400" />
            {t.klaus.practiceSentenceButton}
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isKlaus = m.sender === "klaus";
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isKlaus ? "justify-start" : "justify-end"} animate-in fade-in duration-200`}
              >
                {isKlaus && (
                  <div className="shrink-0 mt-1">
                    <KlausAvatar mood="idle" size="sm" />
                  </div>
                )}
                <div
                  className={`max-w-[84%] rounded-3xl p-4 text-sm leading-relaxed shadow-lg ${
                    isKlaus
                      ? "bg-slate-850/95 text-slate-100 border border-white/[0.08] rounded-tl-sm shadow-black/20"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-sm shadow-glow-indigo font-normal"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {isKlaus && (
                    <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.08] pt-2 text-[11px] text-slate-400">
                      <span className="font-mono">{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <AudioPlayerButton text={m.text} langCode={targetLanguage} size="sm" isKlaus={true} label="Klaus Voice" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 justify-start animate-in fade-in">
              <KlausAvatar mood="thinking" size="sm" />
              <div className="bg-slate-850/90 text-slate-300 rounded-2xl rounded-tl-sm p-3.5 text-xs flex items-center gap-2 border border-white/[0.08] shadow-sm">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span>{t.klaus.klausThinking}</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-3 bg-slate-900/95 border-t border-white/[0.08] flex items-center gap-2"
        >
          {/* Language selector toggle for speech input */}
          <button
            type="button"
            onClick={() => setVoiceLang((prev) => (prev === nativeLanguage ? targetLanguage : nativeLanguage))}
            title={`Speech Recognition Language: ${voiceLang.toUpperCase()} (Click to toggle)`}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl shrink-0 transition flex items-center gap-1 border border-white/[0.08] shadow-sm active:scale-95"
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
            className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-full text-sm outline-none border border-white/[0.08] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-full transition-all duration-200 shadow-glow-indigo flex items-center justify-center shrink-0 active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
export default KlausChatModal;
