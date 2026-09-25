"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Flame,
  Diamond,
  Compass,
  CheckCircle2,
  Calendar,
  Settings,
  Languages,
  LogOut,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import KlausAvatar from "@/components/KlausAvatar";

export default function ProfilePage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-teal-500 p-1 shadow-md shadow-indigo-100">
              <div className="w-full h-full bg-white rounded-[22px] overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={36} className="text-slate-400" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-black text-slate-900">{user?.name || "Guest Learner"}</h1>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full">
                  Level {user?.progress?.currentLevel || 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{user?.email || "guest@lingua.app"}</p>
              {user?.profile?.bio && (
                <p className="text-xs text-slate-600 mt-2 max-w-md">{user.profile.bio}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <Settings size={16} />
              <span>{t.nav.settings}</span>
            </Link>
            {user && (
              <button
                onClick={logout}
                title="Log out"
                className="p-2.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-black text-amber-500 mb-1 flex items-center justify-center gap-1">
              <Flame size={20} className="fill-amber-400 animate-pulse" />
              <span>{user?.streak?.currentStreak || 0}</span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">{t.profile.activeStreak}</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-black text-indigo-600 mb-1 flex items-center justify-center gap-1">
              <Diamond size={18} className="fill-indigo-300" />
              <span>{user?.progress?.totalXp || 0}</span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">{t.profile.totalXp}</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-black text-teal-600 mb-1">
              {user?.progress?.lessonsCompleted || 0}
            </div>
            <div className="text-xs text-slate-400 font-semibold">{t.profile.lessonsFinished}</div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="text-2xl font-black text-emerald-600 mb-1">
              {user?.progress?.totalAccuracy || 100}%
            </div>
            <div className="text-xs text-slate-400 font-semibold">{t.profile.accuracyRate}</div>
          </div>
        </div>

        {/* Language Track Active Configuration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Languages size={18} className="text-indigo-600" />
            <span>Active Language Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">
                Instructional Language (Native)
              </div>
              <div className="text-base font-bold text-slate-900 uppercase">
                {nativeLanguage}
              </div>
              <div className="text-slate-500 mt-1">
                All UI, lessons, feedback, hints, and Klaus AI respond in this language.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">
                Learning Language (Target)
              </div>
              <div className="text-base font-bold text-teal-600 uppercase">
                {targetLanguage}
              </div>
              <div className="text-slate-500 mt-1">
                The language you are actively mastering and practicing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
