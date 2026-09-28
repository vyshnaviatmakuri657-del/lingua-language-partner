"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const qEmail = searchParams?.get("email");
    if (qEmail) setEmail(qEmail);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update password.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block p-2 bg-slate-850/80 border border-slate-700/60 rounded-2xl mb-1 shadow-inner animate-float">
          <KlausAvatar mood="idle" size="md" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">{t.auth.resetPassword}</h1>
        <p className="text-xs text-slate-400">Create a new secure password for your account.</p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-2xl flex items-center gap-2.5 text-rose-300 text-xs font-semibold animate-in fade-in">
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="p-5 bg-teal-950/40 border border-teal-800/60 rounded-2xl text-center space-y-2 animate-in fade-in">
          <CheckCircle2 size={32} className="text-teal-400 mx-auto" />
          <div className="font-bold text-sm text-teal-300">Password successfully updated!</div>
          <p className="text-xs text-teal-200/80">Redirecting to login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Account Email
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
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="••••••••"
              className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01]"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Update Password</span>}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full mx-auto py-2 relative z-10">
        <Link href="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition">
          <ArrowLeft size={16} />
          <span>Back to Login</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>

      <div className="text-center text-xs text-slate-500 py-2 relative z-10">
        Lingua Account Security • Real Password Encryption
      </div>
    </div>
  );
}
