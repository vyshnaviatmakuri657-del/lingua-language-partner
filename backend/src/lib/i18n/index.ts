import { enDictionary } from "./dictionaries/en";
import { teDictionary } from "./dictionaries/te";
import { hiDictionary } from "./dictionaries/hi";
import { NativeLanguageCode, TargetLanguageCode, LanguageInfo, TranslationDictionary } from "./types";

export * from "./types";

export const SUPPORTED_NATIVE_LANGUAGES: LanguageInfo[] = [
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Telu",
    direction: "ltr",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Deva",
    direction: "ltr",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Latn",
    direction: "ltr",
  },
];

export const SUPPORTED_TARGET_LANGUAGES: LanguageInfo[] = [
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Telu",
    direction: "ltr",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Deva",
    direction: "ltr",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    isNativeSupported: true,
    isTargetSupported: true,
    scriptCode: "Latn",
    direction: "ltr",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    isNativeSupported: false,
    isTargetSupported: true,
    scriptCode: "Taml",
    direction: "ltr",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    isNativeSupported: false,
    isTargetSupported: true,
    scriptCode: "Latn",
    direction: "ltr",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    isNativeSupported: false,
    isTargetSupported: true,
    scriptCode: "Hang",
    direction: "ltr",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    isNativeSupported: false,
    isTargetSupported: true,
    scriptCode: "Latn",
    direction: "ltr",
  },
];

export const dictionaries: Record<NativeLanguageCode, TranslationDictionary> = {
  en: enDictionary,
  te: teDictionary,
  hi: hiDictionary,
};

export function getDictionary(lang: string | undefined | null): TranslationDictionary {
  if (lang === "te") return teDictionary;
  if (lang === "hi") return hiDictionary;
  return enDictionary;
}

export function isValidNativeLanguage(code: string): code is NativeLanguageCode {
  return ["en", "te", "hi"].includes(code);
}

export function isValidTargetLanguage(code: string): code is TargetLanguageCode {
  return ["en", "te", "hi", "ta", "fr", "ko", "es"].includes(code);
}

export function validateLanguagePair(
  nativeCode: string,
  targetCode: string
): { valid: boolean; error?: string } {
  if (!isValidNativeLanguage(nativeCode)) {
    return {
      valid: false,
      error: `Invalid native language: ${nativeCode}. Must be one of: en, te, hi.`,
    };
  }

  if (!isValidTargetLanguage(targetCode)) {
    return {
      valid: false,
      error: `Invalid target language: ${targetCode}. Must be one of: en, te, hi, ta, fr, ko, es.`,
    };
  }

  // CRITICAL VALIDATION: Native language MUST NOT equal target language
  if (nativeCode.toLowerCase() === targetCode.toLowerCase()) {
    return {
      valid: false,
      error: `Native instructional language (${nativeCode}) cannot be the same as the target learning language (${targetCode}).`,
    };
  }

  return { valid: true };
}

export function getLanguageName(code: string, nativeCode: NativeLanguageCode = "en"): string {
  const allLangs = [...SUPPORTED_NATIVE_LANGUAGES, ...SUPPORTED_TARGET_LANGUAGES];
  const found = allLangs.find((l) => l.code === code);
  if (!found) return code;
  return `${found.name} (${found.nativeName})`;
}
