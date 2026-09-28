"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";
import GoogleAuthButton from "@/components/GoogleAuthButton";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
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

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort);
      return;
    }

    setLoading(true);
    try {
      const result = await signup(name.trim(), email.trim(), password, nativeLanguage, targetLanguage);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Registration failed.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block p-2 bg-slate-850/80 border border-slate-700/60 rounded-2xl mb-1 shadow-inner animate-float">
          <KlausAvatar mood="happy" size="md" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">{t.auth.signupTitle}</h1>
        <p className="text-xs text-slate-400">{t.auth.signupSubtitle}</p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-850 border border-slate-700/60 rounded-full text-xs font-semibold text-slate-300 mt-2">
          <span className="uppercase text-indigo-400 font-bold">{nativeLanguage}</span>
          <span className="text-slate-500">➔</span>
          <span className="uppercase text-teal-400 font-bold">{targetLanguage}</span>
        </div>
      </div>

      {/* Google Authentication Button */}
      <div className="space-y-3">
        <GoogleAuthButton label="Sign up with Google" />

        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            or with email
          </span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-2xl flex items-center gap-2.5 text-rose-300 text-xs font-semibold animate-in fade-in">
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.auth.nameLabel}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="Jane Doe"
            className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
          />
        </div>

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
            }}
            placeholder="name@example.com"
            className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.auth.passwordLabel}
          </label>
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

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            {t.auth.confirmPasswordLabel}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="••••••••"
              className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm pl-4 pr-11 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg transition"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
              <span>{t.auth.signupButton}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
          {t.auth.loginButton}
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
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
          <SignupForm />
        </Suspense>
      </div>

      <div className="text-center text-xs text-slate-500 py-2 relative z-10">
        Lingua Secure Authentication • Google OAuth + bcrypt + JWT
      </div>
    </div>
  );
}
