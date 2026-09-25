"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
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
            <h1 className="text-2xl font-black text-slate-900">{t.auth.resetPassword}</h1>
            <p className="text-xs text-slate-500">Create a new secure password for your account.</p>
          </div>

          {success ? (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-2 animate-in fade-in">
              <CheckCircle2 size={28} className="text-teal-600 mx-auto" />
              <div className="font-bold text-xs text-teal-900">Password successfully updated!</div>
              <p className="text-xs text-teal-700">Redirecting to login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.auth.passwordLabel}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.auth.confirmPasswordLabel}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading || password.length < 6 || password !== confirmPassword}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <span>Update Password</span>}
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
