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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8">
      <div className="max-w-md w-full mx-auto py-2">
        <Link href="/login" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft size={16} />
          <span>{t.auth.loginButton}</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-2 bg-indigo-50 rounded-2xl mb-1">
              <KlausAvatar mood="idle" size="md" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">{t.auth.forgotPassword}</h1>
            <p className="text-xs text-slate-500">
              Enter your registered email address and we will send password recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-2 animate-in fade-in">
              <CheckCircle2 size={28} className="text-teal-600 mx-auto" />
              <div className="font-bold text-xs text-teal-900">Recovery instructions dispatched!</div>
              <p className="text-xs text-teal-700">
                Check your inbox at <strong>{email}</strong> for instructions.
              </p>
              <Link href="/reset-password" className="inline-block text-xs font-bold text-indigo-600 underline pt-2">
                Proceed to Reset Password
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.auth.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Send Reset Link</span>}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 py-2">
        Lingua Account Security
      </div>
    </div>
  );
}
