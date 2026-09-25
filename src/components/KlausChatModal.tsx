"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, HelpCircle, BookOpen, Lightbulb, RotateCcw } from "lucide-react";
import { KlausAvatar, KlausMood } from "./KlausAvatar";
import { useLanguage } from "@/context/LanguageContext";
import AudioPlayerButton from "./AudioPlayerButton";

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
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<KlausMood>("idle");
  const [currentHintStep, setCurrentHintStep] = useState<1 | 2 | 3>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col h-[85vh] max-h-[720px] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-indigo-700 text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white/10 rounded-2xl backdrop-blur-md">
              <KlausAvatar mood={mood} size="md" showBadge={isThinking} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{t.klaus.name}</h3>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Sparkles size={12} /> {t.klaus.role}
                </span>
              </div>
              <p className="text-xs text-teal-100">
                {context?.currentLessonTitle ? (
                  <span>
                    {t.lessons.lessonTitle}: {context.currentLessonTitle}
                  </span>
                ) : (
                  <span>
                    {nativeLanguage.toUpperCase()} ➔ {targetLanguage.toUpperCase()}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages([])}
              title={t.klaus.clearChat}
              className="p-2 hover:bg-white/10 rounded-full transition text-teal-100 hover:text-white"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition text-teal-100 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={handleRequestHint}
            disabled={isThinking}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-full font-medium border border-amber-200 transition shrink-0"
          >
            <Lightbulb size={13} className="text-amber-600" />
            {currentHintStep === 1
              ? t.klaus.hintButton
              : currentHintStep === 2
              ? t.klaus.moreHelpButton
              : t.klaus.showAnswerButton}
          </button>

          <button
            onClick={() => handleSendMessage(nativeLanguage === "te" ? "ఈ వాక్యంలోని వ్యాకరణ నియమాలను వివరంగా వివరించండి." : nativeLanguage === "hi" ? "इस वाक्य के व्याकरण के नियम समझाइए।" : "Explain the grammar of this structure.")}
            disabled={isThinking}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full font-medium border border-indigo-200 transition shrink-0"
          >
            <BookOpen size={13} className="text-indigo-600" />
            {t.klaus.explainGrammarButton}
          </button>

          <button
            onClick={() => handleSendMessage(nativeLanguage === "te" ? "నేను సాధన చేయడానికి మరొక ఉదాహరణ వాక్యాన్ని ఇవ్వండి." : nativeLanguage === "hi" ? "अभ्यास के लिए एक और उदाहरण वाक्य दीजिए।" : "Give me another practice example.")}
            disabled={isThinking}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-full font-medium border border-teal-200 transition shrink-0"
          >
            <HelpCircle size={13} className="text-teal-600" />
            {t.klaus.practiceSentenceButton}
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  className={`max-w-[82%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                    isKlaus
                      ? "bg-slate-100/90 text-slate-800 border border-slate-200/80 rounded-tl-sm"
                      : "bg-indigo-600 text-white rounded-tr-sm font-normal"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {isKlaus && (
                    <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 pt-1.5 text-[11px] text-slate-500">
                      <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <AudioPlayerButton text={m.text} langCode={targetLanguage} size="sm" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 justify-start">
              <KlausAvatar mood="thinking" size="sm" />
              <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-tl-sm p-3.5 text-xs flex items-center gap-2 border border-slate-200">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.klaus.askPlaceholder}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 px-4 py-3 rounded-full text-sm outline-none border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full transition shadow-md shadow-indigo-200 flex items-center justify-center shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
export default KlausChatModal;
