"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "./LanguageContext";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  profile?: {
    bio?: string | null;
    motivation?: string | null;
    dailyGoalMinutes: number;
    experienceLevel?: string | null;
    timezone: string;
    notifications: boolean;
    soundEnabled: boolean;
    transliterationEnabled: boolean;
    theme: string;
  } | null;
  preferences?: {
    nativeLanguageCode: string;
    targetLanguageCode: string;
    instructionLanguageCode: string;
    learningLanguageCode: string;
  } | null;
  progress?: {
    totalXp: number;
    currentLevel: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    totalAccuracy: number;
    totalPracticeMinutes: number;
    conversationsCount: number;
  } | null;
  streak?: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate?: string | null;
  } | null;
}

export interface UserProgressSummary {
  totalXp: number;
  currentLevel: number;
  lessonsCompleted: number;
  completedLessonIds: string[];
  exercisesCompleted: number;
  accuracyRate: number;
  currentStreak: number;
  longestStreak: number;
  todayMinutes: number;
  dailyGoalMinutes: number;
  goalMet: boolean;
  wordsLearned: number;
  wordsDue: number;
  wordsMastered: number;
  weakAreas: Array<{ prompt: string; count: number }>;
  recentActivities: Array<{ id: string; title: string; xp: number; timestamp: string }>;
  isGuest: boolean;
}

export function calculateLevelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export interface GuestVocabCard {
  box: number;
  mastery: number;
  consecutiveCorrect: number;
  totalAttempts: number;
  lastReviewedAt: string;
  nextReviewAt: string;
}

interface GuestStore {
  totalXp: number;
  currentLevel: number;
  lessonsCompleted: number;
  completedLessons: string[];
  exercisesCompleted: number;
  totalAttempts: number;
  correctAttempts: number;
  accuracyRate: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  todayMinutes: number;
  lastMinutesDate: string;
  dailyGoalMinutes: number;
  weakAreas: Array<{ prompt: string; count: number }>;
  vocabProgress: Record<string, GuestVocabCard>;
  recentActivities: Array<{ id: string; title: string; xp: number; timestamp: string }>;
}

const DEFAULT_GUEST_STORE: GuestStore = {
  totalXp: 0,
  currentLevel: 1,
  lessonsCompleted: 0,
  completedLessons: [],
  exercisesCompleted: 0,
  totalAttempts: 0,
  correctAttempts: 0,
  accuracyRate: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  todayMinutes: 0,
  lastMinutesDate: "",
  dailyGoalMinutes: 15,
  weakAreas: [],
  vocabProgress: {},
  recentActivities: [],
};

interface AuthContextType {
  user: SafeUser | null;
  progress: UserProgressSummary;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; notFound?: boolean }>;
  signup: (name: string, email: string, password: string, native?: string, target?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (payload: {
    credential?: string;
    email?: string;
    name?: string;
    avatar?: string;
    googleId?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserPreferences: (native: NativeLanguageCode, target: TargetLanguageCode) => Promise<boolean>;
  updateDailyGoal: (minutes: number) => Promise<void>;
  recordActivity: (options: {
    xpAwarded: number;
    isCorrect?: boolean;
    prompt?: string;
    exerciseCompleted?: boolean;
    lessonCompleted?: boolean;
    lessonId?: string;
    exerciseId?: string;
    minutes?: number;
    activityTitle?: string;
    skipXpAward?: boolean;
  }) => Promise<void>;
  recordVocabularyReview: (vocabularyId: string, remembered: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [guestStore, setGuestStore] = useState<GuestStore>(DEFAULT_GUEST_STORE);
  const { nativeLanguage, targetLanguage, setNativeLanguage, setTargetLanguage } = useLanguage();

  // Load guest progress safely from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lingua_guest_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        const attempts = Number(parsed.totalAttempts) || 0;
        const correct = Number(parsed.correctAttempts) || 0;
        const parsedAccuracy = typeof parsed.accuracyRate === "number" && !isNaN(parsed.accuracyRate) ? parsed.accuracyRate : 0;
        const validAccuracy = attempts > 0 ? (parsedAccuracy <= 100 ? parsedAccuracy : Math.round((correct / attempts) * 100)) : 0;

        let completed = Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
        if (completed.length === 0) {
          try {
            const rawStored = localStorage.getItem("lingua_completed_lessons");
            if (rawStored) completed = JSON.parse(rawStored);
          } catch {}
        }

        setGuestStore({
          totalXp: Number(parsed.totalXp) || 0,
          currentLevel: Number(parsed.currentLevel) || 1,
          lessonsCompleted: completed.length > 0 ? completed.length : (Number(parsed.lessonsCompleted) || 0),
          completedLessons: completed,
          exercisesCompleted: Number(parsed.exercisesCompleted) || 0,
          totalAttempts: attempts,
          correctAttempts: correct,
          accuracyRate: validAccuracy,
          currentStreak: Number(parsed.currentStreak) || 0,
          longestStreak: Number(parsed.longestStreak) || 0,
          lastActiveDate: String(parsed.lastActiveDate || ""),
          todayMinutes: Number(parsed.todayMinutes) || 0,
          lastMinutesDate: String(parsed.lastMinutesDate || ""),
          dailyGoalMinutes: Number(parsed.dailyGoalMinutes) || 15,
          weakAreas: Array.isArray(parsed.weakAreas) ? parsed.weakAreas : [],
          vocabProgress: typeof parsed.vocabProgress === "object" && parsed.vocabProgress !== null ? parsed.vocabProgress : {},
          recentActivities: Array.isArray(parsed.recentActivities) ? parsed.recentActivities : [],
        });
      }
    } catch (e) {
      console.warn("Failed to parse guest progress:", e);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_BASE_URL}/api/user`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          if (data.user.preferences) {
            const native = data.user.preferences.nativeLanguageCode as NativeLanguageCode;
            const target = data.user.preferences.targetLanguageCode as TargetLanguageCode;
            setNativeLanguage(native);
            setTargetLanguage(target);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to fetch current user:", e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [setNativeLanguage, setTargetLanguage]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Memoized unified progress to eliminate render loops
  const progress: UserProgressSummary = useMemo(() => {
    if (user) {
      const exercisesDone = user.progress?.exercisesCompleted || 0;
      let storedCompleted: string[] = [];
      try {
        if (typeof window !== "undefined") {
          storedCompleted = JSON.parse(localStorage.getItem("lingua_completed_lessons") || "[]");
        }
      } catch {}

      return {
        totalXp: user.progress?.totalXp || 0,
        currentLevel: user.progress?.currentLevel || 1,
        lessonsCompleted: Math.max(user.progress?.lessonsCompleted || 0, storedCompleted.length),
        completedLessonIds: storedCompleted,
        exercisesCompleted: exercisesDone,
        accuracyRate: exercisesDone > 0 ? (user.progress?.totalAccuracy ?? 0) : 0,
        currentStreak: user.streak?.currentStreak || 0,
        longestStreak: user.streak?.longestStreak || 0,
        todayMinutes: 0,
        dailyGoalMinutes: user.profile?.dailyGoalMinutes || 15,
        goalMet: false,
        wordsLearned: 0,
        wordsDue: 0,
        wordsMastered: 0,
        weakAreas: [],
        recentActivities: [],
        isGuest: false,
      };
    }

    const guestVocabs = Object.values(guestStore.vocabProgress || {});
    const nowIso = new Date().toISOString();
    const guestWordsDue = guestVocabs.length > 0
      ? guestVocabs.filter((v) => v.nextReviewAt <= nowIso).length
      : 15;
    const guestWordsMastered = guestVocabs.filter((v) => v.mastery >= 80).length;
    const guestWordsLearned = guestVocabs.length;

    const lessonsDone = (guestStore.completedLessons || []).length > 0
      ? guestStore.completedLessons.length
      : guestStore.lessonsCompleted;

    return {
      totalXp: guestStore.totalXp,
      currentLevel: guestStore.currentLevel,
      lessonsCompleted: lessonsDone,
      completedLessonIds: guestStore.completedLessons || [],
      exercisesCompleted: guestStore.exercisesCompleted,
      accuracyRate: guestStore.totalAttempts > 0 ? guestStore.accuracyRate : 0,
      currentStreak: guestStore.currentStreak,
      longestStreak: guestStore.longestStreak,
      todayMinutes: guestStore.todayMinutes,
      dailyGoalMinutes: guestStore.dailyGoalMinutes,
      goalMet: guestStore.todayMinutes >= guestStore.dailyGoalMinutes,
      wordsLearned: guestWordsLearned,
      wordsDue: guestWordsDue,
      wordsMastered: guestWordsMastered,
      weakAreas: guestStore.weakAreas || [],
      recentActivities: guestStore.recentActivities || [],
      isGuest: true,
    };
  }, [user, guestStore]);

  const updateDailyGoal = useCallback(
    async (minutes: number) => {
      const valid = Math.max(5, Math.min(120, minutes));
      if (user) {
        try {
          await fetch(`${API_BASE_URL}/api/user/goal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dailyGoalMinutes: valid }),
          });
          await fetchCurrentUser();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("lingua_progress_updated"));
          }
        } catch (e) {
          console.warn("Failed to update goal on server:", e);
        }
      } else {
        setGuestStore((prev) => {
          const updated: GuestStore = { ...prev, dailyGoalMinutes: valid };
          try {
            localStorage.setItem("lingua_guest_progress", JSON.stringify(updated));
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("lingua_progress_updated"));
            }
          } catch {}
          return updated;
        });
      }
    },
    [user, fetchCurrentUser]
  );

  const recordActivity = useCallback(
    async (options: {
      xpAwarded: number;
      isCorrect?: boolean;
      prompt?: string;
      exerciseCompleted?: boolean;
      lessonCompleted?: boolean;
      lessonId?: string;
      exerciseId?: string;
      minutes?: number;
      activityTitle?: string;
      skipXpAward?: boolean;
    }) => {
      if (user) {
        try {
          const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
          const headers: HeadersInit = { "Content-Type": "application/json" };
          if (token) headers["Authorization"] = `Bearer ${token}`;

          await fetch(`${API_BASE_URL}/api/user/record-activity`, {
            method: "POST",
            headers,
            body: JSON.stringify(options),
          });

          if (options.lessonCompleted && options.lessonId && typeof window !== "undefined") {
            try {
              const existing = JSON.parse(localStorage.getItem("lingua_completed_lessons") || "[]");
              if (!existing.includes(options.lessonId)) {
                existing.push(options.lessonId);
                localStorage.setItem("lingua_completed_lessons", JSON.stringify(existing));
              }
            } catch {}
          }

          await fetchCurrentUser();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("lingua_progress_updated", { detail: options }));
          }
        } catch (e) {
          console.warn("Failed to record activity on server:", e);
        }
        return;
      }

      setGuestStore((prev) => {
        const addedXp = options.skipXpAward ? 0 : (Number(options.xpAwarded) || 0);
        const newXp = (Number(prev.totalXp) || 0) + addedXp;
        const newLevel = calculateLevelFromXp(newXp);
        const newExercises = (Number(prev.exercisesCompleted) || 0) + (options.exerciseCompleted ? 1 : 0);

        let newCompletedLessons = Array.isArray(prev.completedLessons) ? [...prev.completedLessons] : [];
        if (options.lessonCompleted && options.lessonId && !newCompletedLessons.includes(options.lessonId)) {
          newCompletedLessons.push(options.lessonId);
        }
        const newLessons = newCompletedLessons.length > 0
          ? newCompletedLessons.length
          : ((Number(prev.lessonsCompleted) || 0) + (options.lessonCompleted ? 1 : 0));

        let newTotalAttempts = Number(prev.totalAttempts) || 0;
        let newCorrectAttempts = Number(prev.correctAttempts) || 0;
        if (options.isCorrect !== undefined) {
          newTotalAttempts += 1;
          if (options.isCorrect) newCorrectAttempts += 1;
        }
        const newAccuracy =
          newTotalAttempts > 0 ? Math.round((newCorrectAttempts / newTotalAttempts) * 100) : 0;

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = Number(prev.currentStreak) || 0;
        if (prev.lastActiveDate === today) {
          // already active today
        } else if (prev.lastActiveDate === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
        const newLongest = Math.max(Number(prev.longestStreak) || 0, newStreak);

        let newTodayMinutes = Number(prev.todayMinutes) || 0;
        if (prev.lastMinutesDate !== today) {
          newTodayMinutes = options.minutes || 1;
        } else {
          newTodayMinutes += options.minutes || 1;
        }

        let newWeakAreas = Array.isArray(prev.weakAreas) ? [...prev.weakAreas] : [];
        if (options.isCorrect === false && options.prompt) {
          const existing = newWeakAreas.find((w) => w.prompt === options.prompt);
          if (existing) {
            existing.count += 1;
          } else {
            newWeakAreas.push({ prompt: options.prompt, count: 1 });
          }
          newWeakAreas.sort((a, b) => b.count - a.count);
          newWeakAreas = newWeakAreas.slice(0, 5);
        }

        const newActivity = {
          id: String(Date.now()),
          title:
            options.activityTitle ||
            (options.lessonCompleted
              ? "Lesson Completed"
              : options.exerciseCompleted
              ? "Exercise Practice"
              : "Language Drill"),
          xp: Number(options.xpAwarded) || 0,
          timestamp: new Date().toISOString(),
        };

        const recentActivities = [
          newActivity,
          ...(Array.isArray(prev.recentActivities) ? prev.recentActivities : []),
        ].slice(0, 10);

        const updated: GuestStore = {
          totalXp: newXp,
          currentLevel: newLevel,
          lessonsCompleted: newLessons,
          completedLessons: newCompletedLessons,
          exercisesCompleted: newExercises,
          totalAttempts: newTotalAttempts,
          correctAttempts: newCorrectAttempts,
          accuracyRate: newAccuracy,
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActiveDate: today,
          todayMinutes: newTodayMinutes,
          lastMinutesDate: today,
          dailyGoalMinutes: prev.dailyGoalMinutes || 15,
          weakAreas: newWeakAreas,
          vocabProgress: prev.vocabProgress || {},
          recentActivities,
        };

        try {
          localStorage.setItem("lingua_guest_progress", JSON.stringify(updated));
          localStorage.setItem("lingua_completed_lessons", JSON.stringify(newCompletedLessons));
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("lingua_progress_updated", { detail: options }));
          }
        } catch (err) {
          console.warn("Failed to save guest progress:", err);
        }

        return updated;
      });
    },
    [user, fetchCurrentUser]
  );

  const recordVocabularyReview = useCallback(
    async (vocabularyId: string, remembered: boolean) => {
      if (user) {
        await fetchCurrentUser();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("lingua_progress_updated"));
        }
        return;
      }

      setGuestStore((prev) => {
        const current = prev.vocabProgress?.[vocabularyId];
        let box = current?.box || 1;
        let consecutiveCorrect = current?.consecutiveCorrect || 0;
        let mastery = current?.mastery || 0;

        if (remembered) {
          box = Math.min(box + 1, 5);
          consecutiveCorrect += 1;
          mastery = Math.min(mastery + 20, 100);
        } else {
          box = 1;
          consecutiveCorrect = 0;
          mastery = Math.max(mastery - 15, 0);
        }

        const intervals = [1, 3, 7, 14, 30];
        const intervalDays = intervals[box - 1] || 1;
        const nextReview = new Date(Date.now() + intervalDays * 86400000).toISOString();

        const updatedVocabProgress: Record<string, GuestVocabCard> = {
          ...(prev.vocabProgress || {}),
          [vocabularyId]: {
            box,
            mastery,
            consecutiveCorrect,
            totalAttempts: (current?.totalAttempts || 0) + 1,
            lastReviewedAt: new Date().toISOString(),
            nextReviewAt: nextReview,
          },
        };

        const newXp = (Number(prev.totalXp) || 0) + 5;
        const newLevel = calculateLevelFromXp(newXp);
        const newTotalAttempts = (Number(prev.totalAttempts) || 0) + 1;
        const newCorrectAttempts = (Number(prev.correctAttempts) || 0) + (remembered ? 1 : 0);
        const newAccuracy = Math.round((newCorrectAttempts / newTotalAttempts) * 100);

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = Number(prev.currentStreak) || 0;
        if (prev.lastActiveDate === today) {
          // already active today
        } else if (prev.lastActiveDate === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
        const newLongest = Math.max(Number(prev.longestStreak) || 0, newStreak);

        let newTodayMinutes = Number(prev.todayMinutes) || 0;
        if (prev.lastMinutesDate !== today) {
          newTodayMinutes = 1;
        } else {
          newTodayMinutes += 1;
        }

        const newActivity = {
          id: String(Date.now()),
          title: remembered ? "Flashcard Mastered" : "Flashcard Reviewed",
          xp: 5,
          timestamp: new Date().toISOString(),
        };

        const recentActivities = [
          newActivity,
          ...(Array.isArray(prev.recentActivities) ? prev.recentActivities : []),
        ].slice(0, 10);

        const updated: GuestStore = {
          ...prev,
          totalXp: newXp,
          currentLevel: newLevel,
          totalAttempts: newTotalAttempts,
          correctAttempts: newCorrectAttempts,
          accuracyRate: newAccuracy,
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActiveDate: today,
          todayMinutes: newTodayMinutes,
          lastMinutesDate: today,
          vocabProgress: updatedVocabProgress,
          recentActivities,
        };

        try {
          localStorage.setItem("lingua_guest_progress", JSON.stringify(updated));
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("lingua_progress_updated"));
          }
        } catch (err) {
          console.warn("Failed to save guest progress:", err);
        }

        return updated;
      });
    },
    [user, fetchCurrentUser]
  );

  const syncGuestProgressAfterAuth = async () => {
    try {
      const saved = localStorage.getItem("lingua_guest_progress");
      let completedLessons: string[] = [];
      try {
        const rawCompleted = localStorage.getItem("lingua_completed_lessons");
        if (rawCompleted) completedLessons = JSON.parse(rawCompleted);
      } catch {}

      if (saved) {
        const guestData: GuestStore = JSON.parse(saved);
        if (Array.isArray(guestData.completedLessons) && guestData.completedLessons.length > 0) {
          completedLessons = Array.from(new Set([...completedLessons, ...guestData.completedLessons]));
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        if (
          guestData.totalXp > 0 ||
          Object.keys(guestData.vocabProgress || {}).length > 0 ||
          completedLessons.length > 0
        ) {
          await fetch(`${API_BASE_URL}/api/user/sync-guest-progress`,  {
            method: "POST",
            headers,
            body: JSON.stringify({
              totalXp: guestData.totalXp,
              exercisesCompleted: guestData.exercisesCompleted,
              lessonsCompleted: Math.max(guestData.lessonsCompleted, completedLessons.length),
              completedLessons,
              minutes: guestData.todayMinutes,
              vocabProgress: guestData.vocabProgress,
            }),
          });
        }
        localStorage.removeItem("lingua_guest_progress");
        setGuestStore(DEFAULT_GUEST_STORE);
      }
    } catch (e) {
      console.warn("Failed to sync guest progress on auth:", e);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await fetch(`${API_BASE_URL}/api/auth/login`,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Login failed",
          notFound: Boolean(data.notFound),
        };
      }
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      if (data.user?.preferences) {
        setNativeLanguage(data.user.preferences.nativeLanguageCode);
        setTargetLanguage(data.user.preferences.targetLanguageCode);
      }
      await syncGuestProgressAfterAuth();
      await fetchCurrentUser();
      return { success: true };
    } catch {
      return { success: false, error: "Network error during login" };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    native?: string,
    target?: string
  ) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: normalizedEmail,
          password,
          nativeLanguageCode: native || nativeLanguage,
          targetLanguageCode: target || targetLanguage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      if (data.user?.preferences) {
        setNativeLanguage(data.user.preferences.nativeLanguageCode);
        setTargetLanguage(data.user.preferences.targetLanguageCode);
      }
      await syncGuestProgressAfterAuth();
      await fetchCurrentUser();
      return { success: true };
    } catch {
      return { success: false, error: "Network error during signup" };
    }
  };

  const loginWithGoogle = async (payload: {
    credential?: string;
    email?: string;
    name?: string;
    avatar?: string;
    googleId?: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          nativeLanguageCode: nativeLanguage,
          targetLanguageCode: targetLanguage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Google authentication failed" };
      }
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      if (data.user?.preferences) {
        setNativeLanguage(data.user.preferences.nativeLanguageCode);
        setTargetLanguage(data.user.preferences.targetLanguageCode);
      }
      await syncGuestProgressAfterAuth();
      await fetchCurrentUser();
      return { success: true };
    } catch {
      return { success: false, error: "Network error during Google authentication" };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { method: "POST" });
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      setUser(null);
      window.location.href = "/";
    }
  };

  const updateUserPreferences = async (
    native: NativeLanguageCode,
    target: TargetLanguageCode
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nativeLanguageCode: native,
          targetLanguageCode: target,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => (prev ? { ...prev, preferences: data.preferences } : null));
        setNativeLanguage(native);
        setTargetLanguage(target);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        refreshUser: fetchCurrentUser,
        updateUserPreferences,
        updateDailyGoal,
        recordActivity,
        recordVocabularyReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
