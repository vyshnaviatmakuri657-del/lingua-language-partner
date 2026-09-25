"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle2,
  Volume2,
  ArrowLeft,
  RotateCcw,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";

interface DialogueMessage {
  id: string;
  sender: "user" | "klaus";
  targetText: string;
  transliteration?: string | null;
  nativeTranslation?: string | null;
  nativeExplanation?: string | null;
  correction?: {
    correctedSentence: string;
    explanationInNative: string;
  } | null;
}

export default function RoleplayPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const { refreshUser } = useAuth();

  const [selectedScenario, setSelectedScenario] = useState<string>("restaurant");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("beginner");
  const [inConversation, setInConversation] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [dialogue, setDialogue] = useState<DialogueMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const scenarioKeys: Array<keyof typeof t.roleplay.scenarios> = [
    "restaurant",
    "airport",
    "hotel",
    "shopping",
    "interview",
    "workplace",
    "doctor",
    "social",
  ];

  const handleStartRoleplay = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/conversation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: selectedScenario,
          difficulty: selectedDifficulty,
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.initialMessage) {
        setConversationId(data.conversationId);
        setDialogue([data.initialMessage]);
        setInConversation(true);
      }
    } catch (err) {
      console.error("Start roleplay error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    const trimmed = userInput.trim();
    if (!trimmed || isProcessing) return;

    const userTurn: DialogueMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      targetText: trimmed,
    };

    setDialogue((prev) => [...prev, userTurn]);
    setUserInput("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/conversation/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          message: trimmed,
          scenario: selectedScenario,
          difficulty: selectedDifficulty,
          dialogueHistory: dialogue.map((d) => ({ sender: d.sender, targetText: d.targetText })),
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.klausReply) {
        setDialogue((prev) => [...prev, data.klausReply]);
        await refreshUser();
      }
    } catch (err) {
      console.error("Roleplay turn error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold mb-2">
              <MessageSquare size={14} />
              <span>Real-Life Immersion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.roleplay.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              {t.roleplay.pageSubtitle}
            </p>
          </div>
          <KlausAvatar mood={inConversation ? "explaining" : "idle"} size="lg" />
        </div>

        {/* SCENARIO SELECTION SCREEN */}
        {!inConversation ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Difficulty Tabs */}
            <div className="flex items-center gap-2">
              {["beginner", "intermediate", "advanced"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                    selectedDifficulty === diff
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {scenarioKeys.map((key) => {
                const sc = t.roleplay.scenarios[key];
                const isSelected = selectedScenario === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedScenario(key)}
                    className={`p-5 rounded-3xl border text-left transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200 shadow-sm"
                        : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 text-slate-800"
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm mb-1">{sc.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {sc.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Select</span>
                      <Sparkles size={13} />
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              disabled={isProcessing}
              onClick={handleStartRoleplay}
              className="w-full py-4 bg-gradient-to-r from-rose-500 via-indigo-600 to-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:opacity-95 transition flex items-center justify-center gap-2 active:scale-95"
            >
              {isProcessing ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <MessageSquare size={16} />
                  <span>{t.roleplay.startChat}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* ACTIVE ROLEPLAY DIALOGUE VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[75vh] max-h-[640px] overflow-hidden">
            {/* Roleplay Header */}
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <button
                onClick={() => setInConversation(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              >
                <ArrowLeft size={16} />
                <span>Switch Scenario</span>
              </button>

              <div className="text-xs font-bold text-slate-700 capitalize">
                Scenario: <span className="text-indigo-600">{selectedScenario}</span> ({selectedDifficulty})
              </div>

              <button
                onClick={handleStartRoleplay}
                title="Restart roleplay"
                className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {dialogue.map((msg) => {
                const isKlaus = msg.sender === "klaus";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isKlaus ? "items-start" : "items-end"} space-y-1.5`}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed shadow-sm ${
                        isKlaus
                          ? "bg-slate-100/90 text-slate-900 border border-slate-200/80 rounded-tl-sm"
                          : "bg-indigo-600 text-white rounded-tr-sm"
                      }`}
                    >
                      <div className="text-base font-bold mb-1">{msg.targetText}</div>

                      {isKlaus && (
                        <>
                          {transliterationEnabled && msg.transliteration && (
                            <div className="text-xs font-mono text-teal-700 mb-1">
                              [{msg.transliteration}]
                            </div>
                          )}
                          {msg.nativeTranslation && (
                            <div className="text-xs text-slate-600 font-medium pt-1.5 border-t border-slate-200">
                              {msg.nativeTranslation}
                            </div>
                          )}
                          <div className="pt-2 flex items-center justify-between">
                            <AudioPlayerButton text={msg.targetText} langCode={targetLanguage} size="sm" />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Pedagogical Correction from Klaus in Native Language */}
                    {msg.correction && (
                      <div className="max-w-[85%] p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-1 animate-in fade-in">
                        <div className="flex items-center gap-1.5 font-bold text-amber-800">
                          <AlertCircle size={14} className="text-amber-600 shrink-0" />
                          <span>{t.roleplay.klausCorrectionTitle}</span>
                        </div>
                        <div className="text-slate-900 font-semibold">
                          &quot;{msg.correction.correctedSentence}&quot;
                        </div>
                        <div className="text-slate-600 leading-relaxed">
                          {msg.correction.explanationInNative}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <KlausAvatar mood="thinking" size="sm" />
                  <span>Klaus is formulating reply...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t.roleplay.speakOrType}
                className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 text-sm px-4 py-3 rounded-full outline-none border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isProcessing}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full transition shadow-md flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
