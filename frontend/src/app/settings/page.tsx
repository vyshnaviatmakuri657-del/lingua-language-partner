"use client";

import React, { useState } from "react";
import {
  Settings,
  Languages,
  Target,
  Bell,
  Volume2,
  Eye,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  SUPPORTED_NATIVE_LANGUAGES,
  SUPPORTED_TARGET_LANGUAGES,
  NativeLanguageCode,
  TargetLanguageCode,
} from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";
import AnimatedTabs from "@/components/AnimatedTabs";
import SpotlightCard from "@/components/SpotlightCard";

export default function SettingsPage() {
  const {
    nativeLanguage,
    targetLanguage,
    setLanguagePair,
    transliterationEnabled,
    setTransliterationEnabled,
    t,
  } = useLanguage();
  const { user, updateUserPreferences, logout } = useAuth();

  const [selectedNative, setSelectedNative] = useState<NativeLanguageCode>(nativeLanguage);
  const [selectedTarget, setSelectedTarget] = useState<TargetLanguageCode>(targetLanguage);
  const [dailyGoal, setDailyGoal] = useState<number>(user?.profile?.dailyGoalMinutes || 15);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(user?.profile?.soundEnabled ?? true);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const goalTabs = [
    { id: "5", label: "5m" },
    { id: "10", label: "10m" },
    { id: "15", label: "15m" },
    { id: "20", label: "20m" },
    { id: "30", label: "30m" },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    // Strict validation
    if (selectedNative === selectedTarget) {
      setErrorMessage(t.settings.targetLanguageWarning);
      return;
    }

    setIsSaving(true);
    try {
      setLanguagePair(selectedNative, selectedTarget);

      if (user) {
        await updateUserPreferences(selectedNative, selectedTarget);
        await fetch("/api/user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dailyGoalMinutes: dailyGoal,
            soundEnabled,
            transliterationEnabled,
          }),
        });
      }

      setStatusMessage(t.settings.changesSaved);
      setTimeout(() => setStatusMessage(""), 4000);
    } catch (err) {
      console.error("Settings save error:", err);
      setErrorMessage("Failed to update settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-12 page-enter">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex items-center justify-between relative overflow-hidden stagger-1">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 text-slate-300 rounded-full text-xs font-bold mb-3 border border-white/[0.08] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <Settings size={13} className="text-indigo-400" />
              <span>Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.settings.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">
              Configure instructional language, learning target, goals, and sensory settings.
            </p>
          </div>
          <div className="relative z-10 p-2.5 bg-slate-900/90 rounded-2xl border border-white/[0.08] shadow-card-elevated shrink-0 animate-float-slow">
            <KlausAvatar mood="idle" size="lg" />
          </div>
        </div>

        {statusMessage && (
          <div className="p-4 bg-teal-950/70 border border-teal-500/40 text-teal-200 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in shadow-glow-teal">
            <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-950/70 border border-rose-500/40 text-rose-200 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in shadow-sm">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 stagger-2">
          {/* Section 1: Language Architecture Preferences */}
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.14)"
            className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6"
          >
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Languages size={18} className="text-indigo-400" />
              <span>{t.settings.languagePreferences}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Native Language Select */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.settings.nativeLanguageLabel}
                </label>
                <select
                  value={selectedNative}
                  onChange={(e) => setSelectedNative(e.target.value as NativeLanguageCode)}
                  className="w-full bg-slate-800/90 border border-white/[0.08] text-white text-sm font-semibold p-3.5 rounded-2xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                >
                  {SUPPORTED_NATIVE_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                      {l.flag} {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  All instructions, feedback, and Klaus tutor explanations appear in this language.
                </p>
              </div>

              {/* Target Language Select */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.settings.targetLanguageLabel}
                </label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value as TargetLanguageCode)}
                  className="w-full bg-slate-800/90 border border-white/[0.08] text-white text-sm font-semibold p-3.5 rounded-2xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
                >
                  {SUPPORTED_TARGET_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} disabled={l.code === selectedNative} className="bg-slate-900 text-white">
                      {l.flag} {l.name} ({l.nativeName}) {l.code === selectedNative ? "(Instructional)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  The language you are studying. Cannot be identical to your instructional language.
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Section 2: Learning Goals & Study Speed */}
          <SpotlightCard
            spotlightColor="rgba(20, 184, 166, 0.14)"
            className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-4"
          >
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Target size={18} className="text-teal-400" />
              <span>{t.settings.learningGoals}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 font-mono">
                {t.settings.dailyGoalLabel}: {dailyGoal} minutes / day
              </label>
              <div className="w-full sm:w-80">
                <AnimatedTabs
                  tabs={goalTabs}
                  activeTab={String(dailyGoal)}
                  onChange={(id) => setDailyGoal(Number(id))}
                  size="sm"
                />
              </div>
            </div>
          </SpotlightCard>

          {/* Section 3: Audio & Transliteration Controls */}
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.14)"
            className="card-elevated rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-4"
          >
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Volume2 size={18} className="text-indigo-400" />
              <span>Sensory & Display Controls</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-2xl card-interactive border border-white/[0.08] cursor-pointer transition">
                <div>
                  <div className="text-xs font-bold text-white">
                    {t.settings.soundEffectsLabel}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Enable native speech synthesis audio for target vocabulary.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl card-interactive border border-white/[0.08] cursor-pointer transition">
                <div>
                  <div className="text-xs font-bold text-white">
                    {t.settings.transliterationLabel}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Display phonetics and romanized guides beneath target scripts.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={transliterationEnabled}
                  onChange={(e) => setTransliterationEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </SpotlightCard>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="btn-tactile px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl flex items-center gap-1.5 border border-rose-900/40"
              >
                <LogOut size={15} />
                <span>{t.nav.logout}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="btn-tactile px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-glow-indigo flex items-center gap-2 ml-auto"
            >
              <Save size={16} />
              <span>{t.settings.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
