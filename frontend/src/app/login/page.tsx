"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, Key, Eye, EyeOff, UserPlus, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import GoogleAuthButton from "@/components/GoogleAuthButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = searchParams?.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsNotFound(false);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        if (result.notFound) {
          setIsNotFound(true);
          setError(result.error || "No account found with this email.");
        } else {
          setError(result.error || t.auth.invalidCredentials);
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@lingua.app");
    setPassword("LinguaDemo2026!");
    setError("");
    setIsNotFound(false);
    setLoading(true);
    const result = await login("demo@lingua.app", "LinguaDemo2026!");
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || t.auth.invalidCredentials);
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block p-2 bg-slate-850/80 border border-slate-700/60 rounded-2xl mb-1 shadow-inner animate-float">
          <KlausAvatar mood="happy" size="md" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">{t.auth.loginTitle}</h1>
        <p className="text-xs text-slate-400">{t.auth.loginSubtitle}</p>
      </div>

      {/* Google Authentication Button */}
      <div className="space-y-3">
        <GoogleAuthButton label="Continue with Google" />

        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            or with email
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-rose-300 text-xs font-semibold animate-in fade-in space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>

          {/* Quick Sign-Up Suggestion if user doesn't exist yet */}
          {isNotFound && (
            <div className="pt-2 border-t border-rose-900/40 flex items-center justify-between gap-2">
              <span className="text-rose-200 text-[11px]">Would you like to register this email?</span>
              <button
                type="button"
                onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}`)}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0"
              >
                <UserPlus size={12} />
                <span>Create Account</span>
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.auth.emailLabel}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
              if (isNotFound) setIsNotFound(false);
            }}
            placeholder="name@example.com"
            className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-300">
              {t.auth.passwordLabel}
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              {t.auth.forgotPassword}
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="••••••••"
              className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm pl-4 pr-11 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01]"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span>{t.auth.loginButton}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Credentials Button */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-800/60 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition hover:scale-[1.01] active:scale-95"
        >
          <Key size={14} className="text-teal-400" />
          <span>1-Click Demo Account (Telugu ➔ Korean)</span>
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        {t.auth.noAccount}{" "}
        <Link href="/signup" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
          {t.auth.signupButton}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-md w-full mx-auto py-2 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="font-extrabold text-lg text-white tracking-wider">LINGUA</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>

      <div className="text-center text-xs text-slate-500 py-2 relative z-10">
        Lingua Secure Authentication • Google OAuth + bcrypt + JWT
      </div>
    </div>
  );
}
