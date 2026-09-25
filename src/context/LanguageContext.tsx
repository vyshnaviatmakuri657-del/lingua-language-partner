"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  NativeLanguageCode,
  TargetLanguageCode,
  TranslationDictionary,
  getDictionary,
  validateLanguagePair,
  isValidNativeLanguage,
  isValidTargetLanguage,
} from "@/lib/i18n";

interface LanguageContextType {
  nativeLanguage: NativeLanguageCode;
  targetLanguage: TargetLanguageCode;
  instructionLanguage: NativeLanguageCode;
  learningLanguage: TargetLanguageCode;
  t: TranslationDictionary;
  setNativeLanguage: (lang: NativeLanguageCode) => void;
  setTargetLanguage: (lang: TargetLanguageCode) => boolean;
  setLanguagePair: (native: NativeLanguageCode, target: TargetLanguageCode) => boolean;
  transliterationEnabled: boolean;
  setTransliterationEnabled: (enabled: boolean) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_NATIVE_KEY = "lingua_native_lang";
const STORAGE_TARGET_KEY = "lingua_target_lang";
const STORAGE_TRANSLITERATION_KEY = "lingua_transliteration";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [nativeLanguage, setNativeState] = useState<NativeLanguageCode>("en");
  const [targetLanguage, setTargetState] = useState<TargetLanguageCode>("es");
  const [transliterationEnabled, setTransliterationEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local storage or server user on mount
  useEffect(() => {
    try {
      const storedNative = localStorage.getItem(STORAGE_NATIVE_KEY);
      const storedTarget = localStorage.getItem(STORAGE_TARGET_KEY);
      const storedTranslit = localStorage.getItem(STORAGE_TRANSLITERATION_KEY);

      if (storedNative && isValidNativeLanguage(storedNative)) {
        setNativeState(storedNative);
      }
      if (storedTarget && isValidTargetLanguage(storedTarget)) {
        // Guard against same-language
        if (storedTarget !== storedNative) {
          setTargetState(storedTarget);
        } else {
          // Fallback valid target
          const fallback = storedNative === "es" ? "fr" : "es";
          setTargetState(fallback);
        }
      }
      if (storedTranslit !== null) {
        setTransliterationEnabled(storedTranslit === "true");
      }
    } catch {
      // LocalStorage not available or errored
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setNativeLanguage = (lang: NativeLanguageCode) => {
    if (!isValidNativeLanguage(lang)) return;
    setNativeState(lang);
    try {
      localStorage.setItem(STORAGE_NATIVE_KEY, lang);
    } catch {}

    // If target happens to equal new native language, auto-shift target to prevent conflict
    if (targetLanguage === lang) {
      const alternativeTargets: TargetLanguageCode[] = ["ko", "es", "fr", "en", "hi", "te", "ta"];
      const newTarget = alternativeTargets.find((t) => t !== lang) || "es";
      setTargetState(newTarget);
      try {
        localStorage.setItem(STORAGE_TARGET_KEY, newTarget);
      } catch {}
    }
  };

  const setTargetLanguage = (lang: TargetLanguageCode): boolean => {
    if (!isValidTargetLanguage(lang)) return false;
    const validation = validateLanguagePair(nativeLanguage, lang);
    if (!validation.valid) {
      console.warn("Invalid language pair:", validation.error);
      return false;
    }
    setTargetState(lang);
    try {
      localStorage.setItem(STORAGE_TARGET_KEY, lang);
    } catch {}
    return true;
  };

  const setLanguagePair = (native: NativeLanguageCode, target: TargetLanguageCode): boolean => {
    const validation = validateLanguagePair(native, target);
    if (!validation.valid) {
      console.warn("Invalid language pair:", validation.error);
      return false;
    }
    setNativeState(native);
    setTargetState(target);
    try {
      localStorage.setItem(STORAGE_NATIVE_KEY, native);
      localStorage.setItem(STORAGE_TARGET_KEY, target);
    } catch {}
    return true;
  };

  const updateTransliteration = (val: boolean) => {
    setTransliterationEnabled(val);
    try {
      localStorage.setItem(STORAGE_TRANSLITERATION_KEY, String(val));
    } catch {}
  };

  // instructionLanguage is always nativeLanguage
  // learningLanguage is always targetLanguage
  const instructionLanguage = nativeLanguage;
  const learningLanguage = targetLanguage;
  const t = getDictionary(instructionLanguage);

  return (
    <LanguageContext.Provider
      value={{
        nativeLanguage,
        targetLanguage,
        instructionLanguage,
        learningLanguage,
        t,
        setNativeLanguage,
        setTargetLanguage,
        setLanguagePair,
        transliterationEnabled,
        setTransliterationEnabled: updateTransliteration,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
