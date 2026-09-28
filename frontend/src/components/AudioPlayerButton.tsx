"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerButtonProps {
  text: string;
  transliteration?: string;
  langCode?: string; // e.g. "ko", "fr", "es", "te", "hi", "en", "ta", "de", "ja"
  rate?: number;
  pitch?: number;
  isKlaus?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

// Global cached voices to ensure immediate availability across component instances
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const loadVoices = () => {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
      }
    } catch {
      // ignore
    }
  };

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Known female voice names to strictly exclude when a male voice is requested
 */
const FEMALE_VOICE_KEYWORDS = [
  "female", "woman", "girl",
  "helena", "hortense", "zira", "julie", "laura", "heami", "sunhi", "sun-hi",
  "denise", "swara", "shruti", "kalpana", "heera", "harita", "pallavi", "ananya",
  "ayumi", "haruka", "nanami", "elsa", "samantha", "victoria", "karen", "catherine",
  "fiona", "moira", "veena", "tessa", "hazel", "susan", "linda", "alice",
  "charlotte", "eva", "chiara", "lucia", "conchita", "penelope", "miren",
  "amalia", "maria", "carmen", "monica", "paulina", "brigitte", "hedda", "katja"
];

/**
 * Known male voice keywords
 */
const MALE_VOICE_KEYWORDS = [
  "male", "david", "mark", "guy", "george", "richard", "james", "stefan",
  "bernd", "klaus", "christoph", "henri", "paul", "maurice", "alain", "pablo",
  "jorge", "alvaro", "gonzalo", "alonso", "raul", "injoon", "in-joon", "minho",
  "min-ho", "mohan", "madhur", "hemant", "valluvar", "keita", "naoki", "diego",
  "giuseppe", "ryan", "eric", "christopher", "baritone"
];

export function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  if (!v) return false;
  const name = (v.name || "").toLowerCase();
  return FEMALE_VOICE_KEYWORDS.some((kw) => name.includes(kw));
}

export function isMaleVoice(v: SpeechSynthesisVoice): boolean {
  if (!v) return false;
  if (isFemaleVoice(v)) return false;
  const name = (v.name || "").toLowerCase();
  if (MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw))) return true;
  // If not explicitly identified as female, return true
  return true;
}

/**
 * Normalizes input language codes into standard BCP-47 tags
 */
export function normalizeLanguageCode(code?: string): string {
  if (!code) return "en-US";
  const clean = code.toLowerCase().trim();
  if (clean === "ko" || clean.startsWith("ko-") || clean.startsWith("ko_") || clean === "korean") return "ko-KR";
  if (clean === "te" || clean.startsWith("te-") || clean.startsWith("te_") || clean === "telugu") return "te-IN";
  if (clean === "hi" || clean.startsWith("hi-") || clean.startsWith("hi_") || clean === "hindi") return "hi-IN";
  if (clean === "ta" || clean.startsWith("ta-") || clean.startsWith("ta_") || clean === "tamil") return "ta-IN";
  if (clean === "fr" || clean.startsWith("fr-") || clean.startsWith("fr_") || clean === "french") return "fr-FR";
  if (clean === "es" || clean.startsWith("es-") || clean.startsWith("es_") || clean === "spanish") return "es-ES";
  if (clean === "de" || clean.startsWith("de-") || clean.startsWith("de_") || clean === "german") return "de-DE";
  if (clean === "ja" || clean.startsWith("ja-") || clean.startsWith("ja_") || clean === "japanese") return "ja-JP";
  if (clean === "it" || clean.startsWith("it-") || clean.startsWith("it_") || clean === "italian") return "it-IT";
  if (clean === "zh" || clean.startsWith("zh-") || clean.startsWith("zh_") || clean === "chinese") return "zh-CN";
  if (clean === "ru" || clean.startsWith("ru-") || clean.startsWith("ru_") || clean === "russian") return "ru-RU";
  if (clean === "en" || clean.startsWith("en-") || clean.startsWith("en_") || clean === "english") return "en-US";
  return code;
}

/**
 * High-accuracy language detector:
 * 1. Checks specific non-Latin script Unicode blocks.
 * 2. If Latin, prioritizes explicit target language hint (Spanish, French, German).
 */
export function detectLangFromText(text: string, fallbackLang?: string): string {
  if (!text) return fallbackLang ? normalizeLanguageCode(fallbackLang) : "en-US";

  // 1. Script-based exact detection
  if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) return "ko-KR";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text)) return "ja-JP";

  // 2. If fallback/target language hint is explicitly provided and valid, honor it!
  if (fallbackLang) {
    const normalized = normalizeLanguageCode(fallbackLang);
    if (normalized !== "en-US") {
      return normalized;
    }
  }

  // 3. European language diacritic patterns
  if (/[éèêëàâùûîïôçœæ]/i.test(text)) return "fr-FR";
  if (/[ñáéíóúü¿¡]/i.test(text)) return "es-ES";
  if (/[äöüß]/i.test(text)) return "de-DE";

  return fallbackLang ? normalizeLanguageCode(fallbackLang) : "en-US";
}

/**
 * Searches and selects the highest-clarity STRICTLY MALE voice on the device.
 * Filters out female voices with 100% strictness when isKlaus is true.
 */
export function getBestMaleVoice(
  voices: SpeechSynthesisVoice[],
  targetLang: string
): { voice: SpeechSynthesisVoice | null; isNative: boolean } {
  if (!voices || voices.length === 0) return { voice: null, isNative: false };

  const normalizedTarget = normalizeLanguageCode(targetLang);
  const langPrefix = normalizedTarget.split("-")[0].toLowerCase();
  const fullTarget = normalizedTarget.toLowerCase().replace("_", "-");

  // Step 1: Filter out all confirmed female voices
  const maleOnlyVoices = voices.filter((v) => !isFemaleVoice(v));

  // Step 2: Look for a native male voice matching the target language
  const nativeMaleCandidates = maleOnlyVoices.filter((v) => {
    const vLang = (v.lang || "").toLowerCase().replace("_", "-");
    return vLang === fullTarget || vLang.startsWith(langPrefix);
  });

  if (nativeMaleCandidates.length > 0) {
    // Score native male candidates by clarity & modern neural quality
    const scoreMale = (v: SpeechSynthesisVoice): number => {
      let score = 0;
      const name = (v.name || "").toLowerCase();
      const vLang = (v.lang || "").toLowerCase().replace("_", "-");

      if (vLang === fullTarget) score += 50;
      else if (vLang.startsWith(langPrefix)) score += 30;

      // Natural / Neural online voices have highest clarity
      if (name.includes("natural") || name.includes("online") || name.includes("neural")) score += 40;
      if (name.includes("google")) score += 35;
      if (name.includes("premium") || name.includes("enhanced")) score += 30;

      // Confirmed masculine names
      if (MALE_VOICE_KEYWORDS.some((k) => name.includes(k))) score += 20;

      return score;
    };

    const sorted = [...nativeMaleCandidates].sort((a, b) => scoreMale(b) - scoreMale(a));
    return { voice: sorted[0] || null, isNative: true };
  }

  // Step 3: No native male voice found on this device for this language (e.g. only female Helena/Hortense are installed).
  // Strictly avoid female voices! Pick the highest-clarity male voice on the machine (e.g. David, Mark, Christopher, Guy, Google UK Male)
  const generalMaleCandidates = maleOnlyVoices.filter((v) => {
    const vLang = (v.lang || "").toLowerCase();
    return vLang.startsWith("en") || MALE_VOICE_KEYWORDS.some((k) => (v.name || "").toLowerCase().includes(k));
  });

  if (generalMaleCandidates.length > 0) {
    const scoreGeneralMale = (v: SpeechSynthesisVoice): number => {
      let score = 0;
      const name = (v.name || "").toLowerCase();
      if (name.includes("natural") || name.includes("online")) score += 30;
      if (name.includes("david") || name.includes("mark") || name.includes("guy")) score += 25;
      if (name.includes("google") && name.includes("male")) score += 20;
      return score;
    };

    const sorted = [...generalMaleCandidates].sort((a, b) => scoreGeneralMale(b) - scoreGeneralMale(a));
    return { voice: sorted[0] || null, isNative: false };
  }

  // Fallback to any non-female voice
  return { voice: maleOnlyVoices[0] || null, isNative: false };
}

/**
 * Klaus signature voice finder for English mentorship
 */
export function getKlausSampleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;
  const maleOnly = voices.filter((v) => !isFemaleVoice(v));
  if (maleOnly.length === 0) return voices[0] || null;

  // 1. Prioritize natural English male voices
  const naturalEnMale = maleOnly.find((v) => {
    const n = (v.name || "").toLowerCase();
    const isEn = (v.lang || "").toLowerCase().startsWith("en");
    return isEn && (n.includes("natural") || n.includes("online")) && (n.includes("guy") || n.includes("male") || n.includes("ryan") || n.includes("christopher"));
  });
  if (naturalEnMale) return naturalEnMale;

  // 2. Google US/UK English Male
  const googleEn = maleOnly.find((v) => {
    const n = (v.name || "").toLowerCase();
    return n.includes("google") && (v.lang || "").toLowerCase().startsWith("en") && (n.includes("male") || !isFemaleVoice(v));
  });
  if (googleEn) return googleEn;

  // 3. Microsoft David Desktop / Mark (Standard Windows Male voices)
  const david = maleOnly.find((v) => {
    const n = (v.name || "").toLowerCase();
    return n.includes("david") || n.includes("mark");
  });
  if (david) return david;

  // 4. Any English male voice
  const enMale = maleOnly.find((v) => (v.lang || "").toLowerCase().startsWith("en"));
  if (enMale) return enMale;

  return maleOnly[0] || null;
}

/**
 * Cleans text for pristine, artifact-free speech synthesis
 */
function cleanTextForSpeech(text: string): string {
  if (!text) return "";
  return text
    // Remove emojis
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    // Remove markdown formatting
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/#+\s+/g, "")
    // Remove curriculum tags like [Box 1], [CEFR A1], (formal), etc.
    .replace(/\[\s*box\s*\d+[^\]]*\]/gi, "")
    .replace(/\[\s*cefr[^\]]*\]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function AudioPlayerButton({
  text,
  transliteration,
  langCode = "en",
  rate,
  pitch,
  isKlaus = true,
  size = "md",
  className = "",
  label,
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 22,
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) cachedVoices = v;
    }
    return () => {
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };
  }, []);

  const playAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setHasError(true);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const cleanText = cleanTextForSpeech(text);
      if (!cleanText) return;

      let voices = cachedVoices;
      if (!voices || voices.length === 0) {
        voices = window.speechSynthesis.getVoices() || [];
        if (voices.length > 0) cachedVoices = voices;
      }

      // Determine accurate language and STRICTLY MALE voice
      const targetLang = detectLangFromText(cleanText, langCode);
      const isEnglish = targetLang.startsWith("en");

      const { voice: maleVoice, isNative } = getBestMaleVoice(voices, targetLang);
      const englishKlausVoice = getKlausSampleVoice(voices);

      let chosenVoice: SpeechSynthesisVoice | null = maleVoice || englishKlausVoice;
      let textToSpeak = cleanText;
      let speechLang = targetLang;

      // TUNED FOR CRISP CLARITY (NO MUFFLING, NO ROBOTIC DISTORTION)
      // Native pitch 0.98 ensures deep male authority without ruining formants.
      // Rate 0.92 gives clear, distinct enunciation of every phoneme.
      let effectivePitch = pitch !== undefined ? pitch : 0.96;
      let effectiveRate = rate !== undefined ? rate : 0.92;

      if (isNative && maleVoice) {
        // Native male voice found! (e.g. Pablo, Paul, InJoon, Stefan, Mohan, Madhur, David)
        chosenVoice = maleVoice;
        speechLang = maleVoice.lang || targetLang;
        textToSpeak = cleanText;
      } else if (isEnglish) {
        chosenVoice = englishKlausVoice;
        speechLang = englishKlausVoice?.lang || "en-US";
        textToSpeak = cleanText;
      } else {
        // Non-Latin script or foreign language without local native male voice installed:
        // Use clean transliteration so the male voice speaks audibly and distinctly rather than remaining silent
        const hasNonLatin = /[\uAC00-\uD7AF\u0C00-\u0C7F\u0900-\u097F\u0B80-\u0BFF\u3040-\u30FF\u4E00-\u9FAF]/.test(cleanText);

        if (hasNonLatin) {
          // Speak phonetic romanization with clear male enunciation
          if (transliteration && transliteration.trim()) {
            textToSpeak = transliteration.trim();
          } else {
            const bracketMatch = cleanText.match(/\[([^\]]+)\]/) || cleanText.match(/\(([^)]+)\)/);
            if (bracketMatch && bracketMatch[1]) {
              textToSpeak = bracketMatch[1].trim();
            }
          }
          chosenVoice = englishKlausVoice || maleVoice;
          speechLang = "en-US";
          effectivePitch = 0.98;
          effectiveRate = 0.88;
        } else {
          // Latin text (e.g. Spanish, French): pass targetLang to male voice
          chosenVoice = maleVoice || englishKlausVoice;
          speechLang = targetLang;
          effectivePitch = 0.98;
        }
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      utterance.lang = speechLang;
      utterance.pitch = Math.max(0.88, Math.min(1.15, effectivePitch));
      utterance.rate = Math.max(0.75, Math.min(1.15, effectiveRate));
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
        setHasError(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        setIsPlaying(false);
      };

      // Safety timeout: reset state after 10s in case browser drops onend event
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, 10000);

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("TTS invocation error:", err);
      setIsPlaying(false);
      setHasError(true);
    }
  };

  return (
    <button
      type="button"
      onClick={playAudio}
      disabled={isPlaying}
      title={isKlaus ? `Listen to Klaus's clear male voice (${langCode})` : `Listen to clear male pronunciation (${langCode})`}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 select-none ${
        isPlaying
          ? isKlaus
            ? "bg-cyan-950/90 text-cyan-300 ring-2 ring-cyan-500 scale-105 shadow-lg shadow-cyan-500/30"
            : "bg-indigo-950/90 text-indigo-300 ring-2 ring-indigo-500 scale-105 shadow-lg shadow-indigo-500/30"
          : isKlaus
          ? "bg-slate-900/90 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700/70 hover:border-cyan-500/50 hover:scale-105 active:scale-95"
          : "bg-slate-800/80 hover:bg-indigo-950/60 text-slate-300 hover:text-indigo-300 border border-slate-700/60 hover:border-indigo-500/40 hover:scale-105 active:scale-95"
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <span className="flex items-center gap-0.5 h-3 px-0.5 text-cyan-400">
          <span className="sound-bar sound-bar-1 bg-cyan-400"></span>
          <span className="sound-bar sound-bar-2 bg-indigo-400"></span>
          <span className="sound-bar sound-bar-3 bg-cyan-300"></span>
          <span className="sound-bar sound-bar-4 bg-indigo-400"></span>
        </span>
      ) : hasError ? (
        <VolumeX size={iconSizes[size]} className="text-slate-500" />
      ) : (
        <Volume2 size={iconSizes[size]} className="transition-transform group-hover:scale-110" />
      )}
      {label && <span className="text-xs font-semibold">{label}</span>}
    </button>
  );
}

/**
 * Standalone programmatic helper to trigger clear male pronunciation via Klaus
 */
export function speakKlausAudio(text: string, langCode: string = "en-US", transliteration?: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) return;

    let voices = cachedVoices;
    if (!voices || voices.length === 0) {
      voices = window.speechSynthesis.getVoices() || [];
      if (voices.length > 0) cachedVoices = voices;
    }

    const targetLang = detectLangFromText(cleanText, langCode);
    const isEnglish = targetLang.startsWith("en");

    const { voice: maleVoice, isNative } = getBestMaleVoice(voices, targetLang);
    const englishVoice = getKlausSampleVoice(voices);

    let chosenVoice: SpeechSynthesisVoice | null = maleVoice || englishVoice;
    let textToSpeak = cleanText;
    let speechLang = targetLang;
    let effectivePitch = 0.96;
    let effectiveRate = 0.92;

    if (isNative && maleVoice) {
      chosenVoice = maleVoice;
      speechLang = maleVoice.lang || targetLang;
      textToSpeak = cleanText;
    } else if (isEnglish) {
      chosenVoice = englishVoice;
      speechLang = englishVoice?.lang || "en-US";
      textToSpeak = cleanText;
    } else {
      const hasNonLatin = /[\uAC00-\uD7AF\u0C00-\u0C7F\u0900-\u097F\u0B80-\u0BFF\u3040-\u30FF\u4E00-\u9FAF]/.test(cleanText);
      if (hasNonLatin) {
        if (transliteration && transliteration.trim()) {
          textToSpeak = transliteration.trim();
        } else {
          const bracketMatch = cleanText.match(/\[([^\]]+)\]/) || cleanText.match(/\(([^)]+)\)/);
          if (bracketMatch && bracketMatch[1]) {
            textToSpeak = bracketMatch[1].trim();
          }
        }
        chosenVoice = englishVoice || maleVoice;
        speechLang = "en-US";
        effectivePitch = 0.98;
        effectiveRate = 0.88;
      } else {
        chosenVoice = maleVoice || englishVoice;
        speechLang = targetLang;
        effectivePitch = 0.98;
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (chosenVoice) utterance.voice = chosenVoice;
    utterance.lang = speechLang;
    utterance.pitch = Math.max(0.88, Math.min(1.15, effectivePitch));
    utterance.rate = Math.max(0.75, Math.min(1.15, effectiveRate));
    utterance.volume = 1.0;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Klaus TTS error:", err);
  }
}

export default AudioPlayerButton;
