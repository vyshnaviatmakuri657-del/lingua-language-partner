"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import { NativeLanguageCode, TargetLanguageCode } from "@/lib/i18n";

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

interface AuthContextType {
  user: SafeUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserPreferences: (native: NativeLanguageCode, target: TargetLanguageCode) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setNativeLanguage, setTargetLanguage } = useLanguage();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          // Sync language context with saved preferences if present
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

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      if (data.user.preferences) {
        setNativeLanguage(data.user.preferences.nativeLanguageCode);
        setTargetLanguage(data.user.preferences.targetLanguageCode);
      }
      return { success: true };
    } catch {
      return { success: false, error: "Network error during login" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during signup" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const updateUserPreferences = async (
    native: NativeLanguageCode,
    target: TargetLanguageCode
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/user/preferences", {
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
        isLoading,
        login,
        signup,
        logout,
        refreshUser: fetchCurrentUser,
        updateUserPreferences,
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
