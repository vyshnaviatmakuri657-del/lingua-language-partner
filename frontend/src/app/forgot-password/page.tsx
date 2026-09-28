"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full mx-auto py-2 relative z-10">
        <Link href="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition">
          <ArrowLeft size={16} />
          <span>{t.auth.loginButton}</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-2 bg-slate-850/80 border border-slate-700/60 rounded-2xl mb-1 shadow-inner animate-float">
              <KlausAvatar mood="idle" size="md" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">{t.auth.forgotPassword}</h1>
            <p className="text-xs text-slate-400">
              Enter your registered email address and we will send password recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-teal-950/40 border border-teal-800/60 rounded-2xl text-center space-y-2 animate-in fade-in">
              <CheckCircle2 size={28} className="text-teal-400 mx-auto" />
              <div className="font-bold text-xs text-teal-300">Recovery instructions dispatched!</div>
              <p className="text-xs text-teal-200/80">
                Check your inbox at <strong className="text-teal-100">{email}</strong> for instructions.
              </p>
              <Link
                href={`/reset-password?email=${encodeURIComponent(email)}`}
                className="inline-block text-xs font-bold text-indigo-400 hover:text-indigo-300 underline pt-2 transition"
              >
                Proceed to Reset Password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.auth.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-850 border border-slate-700/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01]"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Send Reset Link</span>}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 py-2 relative z-10">
        Lingua Account Security
      </div>
    </div>
  );
}
