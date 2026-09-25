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
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold mb-2">
              <Settings size={14} />
              <span>Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.settings.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure instructional language, learning target, goals, and sensory settings.
            </p>
          </div>
          <KlausAvatar mood="idle" size="lg" />
        </div>

        {statusMessage && (
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-2 text-teal-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-rose-800 text-xs font-bold animate-in fade-in">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Language Architecture Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Languages size={18} className="text-indigo-600" />
              <span>{t.settings.languagePreferences}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Native Language Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.settings.nativeLanguageLabel}
                </label>
                <select
                  value={selectedNative}
                  onChange={(e) => setSelectedNative(e.target.value as NativeLanguageCode)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-3.5 rounded-2xl outline-none focus:border-indigo-500 transition"
                >
                  {SUPPORTED_NATIVE_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  All instructions, feedback, and Klaus tutor explanations appear in this language.
                </p>
              </div>

              {/* Target Language Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.settings.targetLanguageLabel}
                </label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value as TargetLanguageCode)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold p-3.5 rounded-2xl outline-none focus:border-indigo-500 transition"
                >
                  {SUPPORTED_TARGET_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} disabled={l.code === selectedNative}>
                      {l.flag} {l.name} ({l.nativeName}) {l.code === selectedNative ? "(Instructional)" : ""}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  The language you are studying. Cannot be identical to your instructional language.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Learning Goals & Study Speed */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Target size={18} className="text-teal-600" />
              <span>{t.settings.learningGoals}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.settings.dailyGoalLabel}: {dailyGoal} minutes / day
              </label>
              <div className="flex items-center gap-2">
                {[5, 10, 15, 20, 30].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDailyGoal(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                      dailyGoal === m
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Audio & Transliteration Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Volume2 size={18} className="text-indigo-600" />
              <span>Sensory & Display Controls</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {t.settings.soundEffectsLabel}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Enable native speech synthesis audio for target vocabulary.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {t.settings.transliterationLabel}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Display phonetics and romanized guides beneath target scripts.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={transliterationEnabled}
                  onChange={(e) => setTransliterationEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded"
                />
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1.5"
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
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-indigo-200 transition flex items-center gap-2 active:scale-95 ml-auto"
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
