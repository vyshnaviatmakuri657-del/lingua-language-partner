"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  SUPPORTED_NATIVE_LANGUAGES,
  SUPPORTED_TARGET_LANGUAGES,
  NativeLanguageCode,
  TargetLanguageCode,
} from "@/lib/i18n";
import KlausAvatar from "@/components/KlausAvatar";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    nativeLanguage,
    targetLanguage,
    setNativeLanguage,
    setTargetLanguage,
    t,
  } = useLanguage();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [selectedMotivation, setSelectedMotivation] = useState<string>("travel");
  const [selectedDailyGoal, setSelectedDailyGoal] = useState<number>(15);
  const [selectedExperience, setSelectedExperience] = useState<string>("beginner");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle Step 1: Native Language Selection -> IMMEDIATE SWITCH
  const handleSelectNative = (code: NativeLanguageCode) => {
    setNativeLanguage(code);
    setErrorMessage("");
    // Move immediately to Step 2 with instructions switched to that language
    setStep(2);
  };

  // Handle Step 2: Target Language Selection with validation
  const handleSelectTarget = (code: TargetLanguageCode) => {
    if (code === nativeLanguage) {
      setErrorMessage(t.onboarding.nativeLanguageDisabledReason);
      return;
    }
    const success = setTargetLanguage(code);
    if (!success) {
      setErrorMessage(t.onboarding.nativeTargetConflictError);
      return;
    }
    setErrorMessage("");
    setStep(3);
  };

  // Finish onboarding & save
  const handleCompleteOnboarding = async (takePlacement: boolean) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
          motivation: selectedMotivation,
          dailyGoalMinutes: selectedDailyGoal,
          experienceLevel: selectedExperience,
        }),
      });

      if (takePlacement) {
        router.push("/placement");
      } else {
        router.push("/learning-path");
      }
    } catch (e) {
      console.error("Onboarding completion error:", e);
      if (takePlacement) {
        router.push("/placement");
      } else {
        router.push("/learning-path");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between py-2">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft size={16} />
            <span>{t.common.back}</span>
          </button>
        ) : (
          <div />
        )}

        {/* Progress Bar */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-indigo-600"
                  : s < step
                  ? "w-4 bg-teal-500"
                  : "w-4 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-bold text-slate-400">Step {step} of 5</span>
      </div>

      {/* Main Form Container */}
      <div className="max-w-xl w-full mx-auto my-auto py-8">
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-medium animate-in fade-in">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Select Native Language */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-3">
                <KlausAvatar mood="happy" size="md" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.onboarding.step1Title}
              </h1>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                {t.onboarding.step1Subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {SUPPORTED_NATIVE_LANGUAGES.map((lang) => {
                const isSelected = nativeLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectNative(lang.code as NativeLanguageCode)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-500 shadow-sm ring-2 ring-indigo-200"
                        : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{lang.flag}</span>
                      <div>
                        <div className="font-bold text-base text-slate-900">
                          {lang.nativeName}
                        </div>
                        <div className="text-xs text-slate-500">{lang.name}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Target Language (Strict Native != Target) */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-teal-50 rounded-2xl text-teal-600 mb-3">
                <KlausAvatar mood="explaining" size="md" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.onboarding.step2Title}
              </h1>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                {t.onboarding.step2Subtitle}
              </p>
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {SUPPORTED_TARGET_LANGUAGES.map((lang) => {
                const isNative = lang.code === nativeLanguage;
                const isSelected = targetLanguage === lang.code;

                return (
                  <button
                    key={lang.code}
                    disabled={isNative}
                    onClick={() => handleSelectTarget(lang.code as TargetLanguageCode)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 ${
                      isNative
                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-teal-50/80 border-teal-500 shadow-sm ring-2 ring-teal-200"
                        : "bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {lang.name}
                        </div>
                        <div className="text-xs text-slate-500">{lang.nativeName}</div>
                      </div>
                    </div>
                    {isNative ? (
                      <span className="text-[11px] font-medium text-slate-400">
                        {nativeLanguage === "te"
                          ? "మీ మాతృభాష"
                          : nativeLanguage === "hi"
                          ? "आपकी मातृभाषा"
                          : "Native Language"}
                      </span>
                    ) : isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Motivation */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.onboarding.step3Title}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                {t.onboarding.step3Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "travel", label: t.onboarding.motivations.travel, icon: "✈️" },
                { key: "career", label: t.onboarding.motivations.career, icon: "💼" },
                { key: "education", label: t.onboarding.motivations.education, icon: "🎓" },
                { key: "relocation", label: t.onboarding.motivations.relocation, icon: "🌍" },
                { key: "entertainment", label: t.onboarding.motivations.entertainment, icon: "🎬" },
                { key: "family", label: t.onboarding.motivations.family, icon: "❤️" },
                { key: "growth", label: t.onboarding.motivations.growth, icon: "🧠" },
                { key: "other", label: t.onboarding.motivations.other, icon: "✨" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedMotivation(item.key)}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition ${
                    selectedMotivation === item.key
                      ? "bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-200"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-bold leading-snug">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(4)}
              className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition"
            >
              <span>{t.common.continue}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 4: Daily Goal */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.onboarding.step4Title}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                {t.onboarding.step4Subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { min: 5, label: t.onboarding.dailyGoals.min5 },
                { min: 10, label: t.onboarding.dailyGoals.min10 },
                { min: 15, label: t.onboarding.dailyGoals.min15 },
                { min: 20, label: t.onboarding.dailyGoals.min20 },
                { min: 30, label: t.onboarding.dailyGoals.min30 },
              ].map((goal) => (
                <button
                  key={goal.min}
                  onClick={() => setSelectedDailyGoal(goal.min)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    selectedDailyGoal === goal.min
                      ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-200"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <span className="font-bold text-sm">{goal.label}</span>
                  {selectedDailyGoal === goal.min && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(5)}
              className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition"
            >
              <span>{t.common.continue}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 5: Experience Level & Choice */}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {t.onboarding.step5Title}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                {t.onboarding.step5Subtitle}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { key: "beginner", label: t.onboarding.experienceLevels.beginner },
                { key: "elementary", label: t.onboarding.experienceLevels.elementary },
                { key: "intermediate", label: t.onboarding.experienceLevels.intermediate },
                { key: "advanced", label: t.onboarding.experienceLevels.advanced },
              ].map((exp) => (
                <button
                  key={exp.key}
                  onClick={() => setSelectedExperience(exp.key)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    selectedExperience === exp.key
                      ? "bg-teal-50 border-teal-600 text-teal-950 ring-2 ring-teal-200"
                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                  }`}
                >
                  <span className="font-bold text-sm">{exp.label}</span>
                  {selectedExperience === exp.key && (
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Decisions: Take Placement Test OR Skip to curriculum */}
            <div className="space-y-3">
              <button
                disabled={isSubmitting}
                onClick={() => handleCompleteOnboarding(true)}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-teal-200 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Sparkles size={16} />
                <span>{t.onboarding.startPlacementTest}</span>
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => handleCompleteOnboarding(false)}
                className="w-full py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-semibold text-xs transition"
              >
                <span>{t.onboarding.skipPlacementTest}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Language Status */}
      <div className="text-center text-xs text-slate-400 py-2">
        <span>LINGUA • </span>
        <span className="font-semibold text-slate-500 uppercase">
          Instruction: {nativeLanguage} | Target: {targetLanguage}
        </span>
      </div>
    </div>
  );
}
