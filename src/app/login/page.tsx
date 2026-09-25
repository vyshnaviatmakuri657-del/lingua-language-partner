"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, Sparkles, Key } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || t.auth.invalidCredentials);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@lingua.app");
    setPassword("LinguaDemo2026!");
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
            L
          </div>
          <span className="font-extrabold text-lg text-slate-900">LINGUA</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-2 bg-indigo-50 rounded-2xl mb-1">
              <KlausAvatar mood="happy" size="md" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">{t.auth.loginTitle}</h1>
            <p className="text-xs text-slate-500">{t.auth.loginSubtitle}</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.auth.passwordLabel}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-4 py-3 rounded-2xl outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition flex items-center justify-center gap-2 active:scale-95"
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
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Key size={14} className="text-teal-600" />
              <span>1-Click Demo Account (Telugu ➔ Korean)</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-500">
            {t.auth.noAccount}{" "}
            <Link href="/signup" className="font-bold text-indigo-600 hover:text-indigo-800">
              {t.auth.signupButton}
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 py-2">
        Lingua Secure Authentication • bcrypt + JWT
      </div>
    </div>
  );
}
