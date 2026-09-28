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
  Award,
  Search,
  Check,
  Lightbulb,
  X,
  TrendingUp,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import AudioPlayerButton from "@/components/AudioPlayerButton";
import VoiceInputButton from "@/components/VoiceInputButton";
import AnimatedTabs from "@/components/AnimatedTabs";
import SpotlightCard from "@/components/SpotlightCard";

interface RoleplayInspection {
  status: "excellent" | "good" | "needs_polishing";
  statusBadge: string;
  isGrammaticallyCorrect: boolean;
  politenessScore: string;
  nativeFeedback: string;
  suggestedCorrection?: string | null;
  explanationInNative?: string | null;
}

interface DialogueMessage {
  id: string;
  sender: "user" | "klaus";
  targetText: string;
  transliteration?: string | null;
  nativeTranslation?: string | null;
  nativeExplanation?: string | null;
  inspection?: RoleplayInspection | null;
  correction?: {
    correctedSentence: string;
    explanationInNative: string;
  } | null;
}

interface ConversationFeedback {
  overallScore: number;
  fluencyLevel: string;
  grammarScore: string;
  vocabularyScore: string;
  politenessScore: string;
  strengths: string[];
  improvements: string[];
  klausSummary: string;
}

export default function RoleplayPage() {
  const { nativeLanguage, targetLanguage, transliterationEnabled, t } = useLanguage();
  const { refreshUser, recordActivity } = useAuth();

  const [selectedScenario, setSelectedScenario] = useState<string>("restaurant");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("beginner");
  const [inConversation, setInConversation] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [dialogue, setDialogue] = useState<DialogueMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [voiceLang, setVoiceLang] = useState<string>(targetLanguage);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // End-of-conversation feedback state
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [conversationFeedback, setConversationFeedback] = useState<ConversationFeedback | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  React.useEffect(() => {
    setVoiceLang(targetLanguage);
  }, [targetLanguage]);

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
    setConversationFeedback(null);
    setShowFeedbackModal(false);
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
      const replyMsg = data.klausReply || data.reply;
      if (res.ok && replyMsg) {
        setDialogue((prev) => [...prev, replyMsg]);
        await recordActivity({
          xpAwarded: 15,
          minutes: 2,
          activityTitle: `Roleplay: ${selectedScenario}`,
        });
        await refreshUser();
      }
    } catch (err) {
      console.error("Roleplay turn error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinishConversation = async () => {
    const userTurns = dialogue.filter((d) => d.sender === "user");
    if (userTurns.length === 0 || isFinishing) return;

    setIsFinishing(true);
    try {
      const res = await fetch("/api/conversation/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          scenario: selectedScenario,
          difficulty: selectedDifficulty,
          dialogueHistory: dialogue.map((d) => ({ sender: d.sender, targetText: d.targetText })),
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.feedback) {
        setConversationFeedback(data.feedback);
        setShowFeedbackModal(true);
        await recordActivity({
          xpAwarded: 25,
          minutes: 3,
          activityTitle: `Roleplay Completed: ${selectedScenario}`,
        });
        await refreshUser();
      }
    } catch (err) {
      console.error("Failed to generate feedback:", err);
    } finally {
      setIsFinishing(false);
    }
  };

  const userTurnCount = dialogue.filter((d) => d.sender === "user").length;

  const scenarioIcons: Record<string, string> = {
    restaurant: "🍽️",
    airport: "✈️",
    hotel: "🏨",
    shopping: "🛍️",
    interview: "💼",
    workplace: "🏢",
    doctor: "🩺",
    social: "👥",
  };

  const difficultyTabs = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 stagger-1">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950/70 border border-rose-500/40 text-rose-300 rounded-full text-xs font-bold mb-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <MessageSquare size={13} className="text-rose-400" />
              <span>Real-Life Immersion & Inspection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.roleplay.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
              {t.roleplay.pageSubtitle}
            </p>
          </div>

          <div className="relative z-10 p-3 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-card-elevated shrink-0 animate-float-slow">
            <KlausAvatar mood={inConversation ? "explaining" : "idle"} size="lg" />
          </div>
        </div>

        {/* SCENARIO SELECTION SCREEN */}
        {!inConversation ? (
          <div className="space-y-6 stagger-2">
            {/* Difficulty Tabs */}
            <div className="w-fit">
              <AnimatedTabs
                tabs={difficultyTabs}
                activeTab={selectedDifficulty}
                onChange={(id) => setSelectedDifficulty(id)}
                size="md"
              />
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {scenarioKeys.map((key) => {
                const sc = t.roleplay.scenarios[key];
                const isSelected = selectedScenario === key;
                const icon = scenarioIcons[key] || "💬";

                return (
                  <SpotlightCard
                    key={key}
                    spotlightColor="rgba(244, 63, 94, 0.14)"
                    onClick={() => setSelectedScenario(key)}
                    className={`group p-5 rounded-3xl text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "card-elevated border-indigo-500/80 ring-2 ring-indigo-500/40 shadow-glow-indigo"
                        : "card-interactive border-white/[0.08] hover:border-white/[0.2]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl p-2 rounded-2xl bg-slate-800/80 border border-white/[0.08] shadow-inner group-hover:scale-110 transition-transform">
                          {icon}
                        </span>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-glow-indigo animate-pulse" />
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm mb-1 text-white group-hover:text-indigo-300 transition-colors">
                        {sc.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {sc.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold">
                      <span className={isSelected ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-200"}>
                        {isSelected ? "Selected" : "Select Scenario"}
                      </span>
                      <Sparkles size={13} className={isSelected ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400 transition-colors"} />
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

            <button
              disabled={isProcessing}
              onClick={handleStartRoleplay}
              className="btn-tactile w-full py-4 bg-gradient-to-r from-rose-600 via-indigo-600 to-teal-500 hover:from-rose-500 hover:to-teal-400 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
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
          <div className="card-elevated rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col h-[75vh] max-h-[660px] overflow-hidden">
            {/* Roleplay Header */}
            <div className="p-4 px-6 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/90 backdrop-blur-xl flex-wrap gap-2">
              <button
                onClick={() => setInConversation(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition px-2.5 py-1.5 rounded-xl hover:bg-white/[0.05]"
              >
                <ArrowLeft size={16} />
                <span>Switch Scenario</span>
              </button>

              <div className="text-xs font-bold text-slate-300 capitalize flex items-center gap-2">
                <span className="p-1 rounded-lg bg-slate-800 border border-white/[0.08]">{scenarioIcons[selectedScenario] || "💬"}</span>
                <span><strong className="text-indigo-300">{selectedScenario}</strong> ({selectedDifficulty})</span>
                <span className="px-2 py-0.5 bg-slate-800/90 border border-white/[0.08] rounded-full text-[10px] text-teal-300 font-mono shadow-sm">
                  {userTurnCount} turns
                </span>
              </div>

              <div className="flex items-center gap-2">
                {userTurnCount >= 1 && (
                  <button
                    onClick={handleFinishConversation}
                    disabled={isFinishing}
                    title="Complete dialogue and receive Klaus's comprehensive feedback"
                    className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30 flex items-center gap-1.5 transition-all duration-200 active:scale-95"
                  >
                    {isFinishing ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <>
                        <Award size={14} className="text-amber-300" />
                        <span>Finish & Feedback</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleStartRoleplay}
                  title="Restart roleplay"
                  className="p-2 hover:bg-white/[0.06] text-slate-400 hover:text-slate-200 rounded-xl transition"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {dialogue.map((msg) => {
                const isKlaus = msg.sender === "klaus";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isKlaus ? "items-start" : "items-end"} space-y-2`}
                  >
                    {/* 1. TURN-BY-TURN INSPECTION (Before Klaus continues dialogue) */}
                    {isKlaus && msg.inspection && (
                      <div className="w-full max-w-[90%] rounded-2xl p-4 bg-slate-900/95 border border-indigo-500/40 shadow-lg space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2 flex-wrap">
                          <div className="flex items-center gap-2 font-bold text-xs text-indigo-300">
                            <Search size={14} className="text-indigo-400 shrink-0" />
                            <span>Klaus&apos;s Inspection of Your Answer</span>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                              msg.inspection.status === "excellent"
                                ? "bg-emerald-950/70 border-emerald-500/60 text-emerald-300"
                                : msg.inspection.status === "good"
                                ? "bg-amber-950/70 border-amber-500/60 text-amber-300"
                                : "bg-rose-950/70 border-rose-500/60 text-rose-300"
                            }`}
                          >
                            {msg.inspection.statusBadge}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-200 leading-relaxed font-medium">
                          <span>{msg.inspection.nativeFeedback}</span>
                          <AudioPlayerButton text={msg.inspection.nativeFeedback} langCode={nativeLanguage} size="sm" isKlaus={true} label="Klaus" />
                        </div>

                        {msg.inspection.suggestedCorrection && (
                          <div className="p-3 bg-slate-950/80 border border-white/[0.08] rounded-xl space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="text-[11px] font-bold text-teal-300 flex items-center gap-1">
                                <Lightbulb size={12} className="text-amber-400" />
                                <span>Polished Alternative ({targetLanguage.toUpperCase()}):</span>
                              </div>
                              <AudioPlayerButton text={msg.inspection.suggestedCorrection} langCode={targetLanguage} size="sm" isKlaus={true} />
                            </div>
                            <div className="text-sm font-bold text-white">
                              &quot;{msg.inspection.suggestedCorrection}&quot;
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 2. CHARACTER LINE / SPOKEN DIALOGUE */}
                    <div
                      className={`max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed shadow-lg ${
                        isKlaus
                          ? "bg-slate-850/95 text-slate-100 border border-white/[0.08] rounded-tl-sm shadow-black/20"
                          : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-sm shadow-glow-indigo font-normal"
                      }`}
                    >
                      <div className="text-base font-bold mb-1 text-white">{msg.targetText}</div>

                      {isKlaus && (
                        <>
                          {transliterationEnabled &&
                            msg.transliteration &&
                            msg.transliteration.trim() !== msg.targetText.trim() &&
                            !/[\u0C00-\u0C7F\u0900-\u097F\uAC00-\uD7A3]/.test(msg.transliteration) && (
                            <div className="text-xs font-mono text-teal-400 mb-1">
                              [{msg.transliteration}]
                            </div>
                          )}
                          {msg.nativeTranslation && (
                            <div className="text-xs text-slate-300 font-medium pt-1.5 border-t border-white/[0.08]">
                              {msg.nativeTranslation}
                            </div>
                          )}
                          {msg.nativeExplanation && (
                            <div className="text-[11px] text-amber-300/90 pt-1.5 flex items-start gap-1 font-medium">
                              <span>💡</span>
                              <span>{msg.nativeExplanation}</span>
                            </div>
                          )}
                          <div className="pt-2 flex items-center justify-between">
                            <AudioPlayerButton
                              text={msg.targetText}
                              transliteration={msg.transliteration || undefined}
                              langCode={targetLanguage}
                              size="sm"
                              isKlaus={true}
                              label="Klaus Voice"
                            />
                          </div>
                        </>
                      )}
                      {!isKlaus && (
                        <div className="pt-1.5 flex justify-end">
                          <AudioPlayerButton
                            text={msg.targetText}
                            transliteration={msg.transliteration || undefined}
                            langCode={targetLanguage}
                            size="sm"
                            isKlaus={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isProcessing && (
                <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium p-2 animate-in fade-in">
                  <KlausAvatar mood="thinking" size="sm" />
                  <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/[0.08] text-slate-300">
                    Klaus is inspecting your reply and formulating response...
                  </span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900/95 border-t border-white/[0.08] flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setVoiceLang((prev) => (prev === targetLanguage ? nativeLanguage : targetLanguage))}
                title={`Speech Language: ${voiceLang.toUpperCase()} (Click to toggle)`}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl shrink-0 transition flex items-center gap-1 border border-white/[0.08] shadow-sm active:scale-95"
              >
                <span>🎙️</span>
                <span className="uppercase text-indigo-300 font-mono">{voiceLang}</span>
              </button>

              <VoiceInputButton
                langCode={voiceLang}
                onTranscript={(transcript) => {
                  setUserInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
                }}
                disabled={isProcessing}
                size="md"
              />

              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t.roleplay.speakOrType}
                className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 text-sm px-4 py-3 rounded-full outline-none border border-white/[0.08] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isProcessing}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-full transition-all duration-200 shadow-glow-indigo flex items-center justify-center shrink-0 active:scale-95"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        {/* =================================================================== */}
        {/*  END-OF-CONVERSATION FEEDBACK MODAL                                  */}
        {/* =================================================================== */}
        {showFeedbackModal && conversationFeedback && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="card-elevated rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto border border-white/[0.1]">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 border-b border-white/[0.08] pb-5">
                <div className="p-3 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-2xl shadow-glow-amber">
                  <Award size={32} className="text-white animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Conversation Feedback & Score
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scenario: <span className="capitalize font-bold text-indigo-400">{selectedScenario}</span> • {selectedDifficulty}
                  </p>
                </div>
              </div>

              {/* Score & Fluency Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] flex items-center gap-3.5">
                  <div className="text-3xl font-black text-emerald-400">
                    {conversationFeedback.overallScore}%
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Performance Score</div>
                    <div className="text-xs font-bold text-white">High Fluency & Accuracy</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] flex items-center gap-3.5">
                  <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-500/30">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fluency Assessment</div>
                    <div className="text-xs font-bold text-indigo-300">{conversationFeedback.fluencyLevel}</div>
                  </div>
                </div>
              </div>

              {/* Sub-Scores */}
              <div className="space-y-2.5 p-4 bg-slate-950/70 rounded-2xl border border-white/[0.08]">
                <div className="text-xs font-bold text-slate-300">Detailed Competency Breakdown:</div>
                <div className="text-xs text-slate-300 flex items-center justify-between">
                  <span>Grammar & Verb Endings:</span>
                  <strong className="text-emerald-400 font-mono">{conversationFeedback.grammarScore}</strong>
                </div>
                <div className="text-xs text-slate-300 flex items-center justify-between">
                  <span>Vocabulary Alignment:</span>
                  <strong className="text-teal-400 font-mono">{conversationFeedback.vocabularyScore}</strong>
                </div>
                <div className="text-xs text-slate-300 flex items-center justify-between">
                  <span>Social Politeness:</span>
                  <strong className="text-indigo-400 font-mono">{conversationFeedback.politenessScore}</strong>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Check size={14} />
                  <span>Key Strengths Identified:</span>
                </h4>
                <div className="space-y-1.5">
                  {conversationFeedback.strengths.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Lightbulb size={14} />
                  <span>Actionable Takeaways for Fluency:</span>
                </h4>
                <div className="space-y-1.5">
                  {conversationFeedback.improvements.map((imp, idx) => (
                    <div key={idx} className="p-2.5 bg-amber-950/30 border border-amber-900/50 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Klaus's Summary */}
              <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl flex items-start gap-3">
                <KlausAvatar mood="happy" size="sm" />
                <div className="text-xs text-slate-200 leading-relaxed font-medium">
                  {conversationFeedback.klausSummary}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    handleStartRoleplay();
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95 shadow-glow-indigo"
                >
                  <RotateCcw size={14} />
                  <span>Practice Scenario Again</span>
                </button>
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setInConversation(false);
                  }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-white/[0.08] rounded-xl text-xs font-bold transition active:scale-95"
                >
                  <span>Choose Another Scenario</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
