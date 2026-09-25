"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  Diamond,
  Loader2,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import KlausAvatar from "@/components/KlausAvatar";

interface LessonSummary {
  id: string;
  orderIndex: number;
  title: string;
  objective: string;
  culturalTip?: string | null;
  xpReward: number;
  estimatedMinutes: number;
  exerciseCount: number;
  vocabularyCount: number;
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface ModuleSummary {
  id: string;
  orderIndex: number;
  category: string;
  title: string;
  description: string;
  icon: string;
  lessons: LessonSummary[];
}

export default function LearningPathPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [pairInfo, setPairInfo] = useState<{
    nativeName: string;
    targetName: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    async function loadPath() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/learning-path?native=${nativeLanguage}&target=${targetLanguage}`
        );
        const data = await res.json();
        if (res.ok) {
          setModules(data.modules || []);
          setPairInfo(data.languagePair || null);
        }
      } catch (err) {
        console.error("Failed to load learning path:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPath();
  }, [nativeLanguage, targetLanguage]);

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Track Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700 mb-2">
              <Compass size={14} />
              <span className="uppercase">{nativeLanguage}</span>
              <span>➔</span>
              <span className="uppercase">{targetLanguage}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.nav.learningPath}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
              {pairInfo?.description ||
                `Personalized curriculum for learning ${targetLanguage.toUpperCase()} through ${nativeLanguage.toUpperCase()} instruction.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/placement"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-indigo-600" />
              <span>{t.placement.pageTitle}</span>
            </Link>
          </div>
        </div>

        {/* Modules & Lessons Trail */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={36} className="animate-spin text-indigo-600 mb-4" />
            <p className="text-xs font-semibold text-slate-400">{t.common.loading}</p>
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">
              No modules available for this language pair yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-4">
                {/* Module Banner */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shadow-sm">
                    {mod.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Module {mod.orderIndex}: {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500">{mod.description}</p>
                  </div>
                </div>

                {/* Lesson Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mod.lessons.map((lsn) => {
                    const isLocked = !lsn.isUnlocked;

                    return (
                      <div
                        key={lsn.id}
                        className={`rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                          lsn.isCompleted
                            ? "bg-white border-teal-200 shadow-sm"
                            : isLocked
                            ? "bg-slate-50/70 border-slate-200/80 opacity-70"
                            : "bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100 hover:shadow-lg"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                              {t.lessons.lessonTitle} {lsn.orderIndex}
                            </span>

                            {lsn.isCompleted ? (
                              <span className="flex items-center gap-1 text-xs font-bold text-teal-600">
                                <CheckCircle2 size={16} /> {t.common.completed}
                              </span>
                            ) : isLocked ? (
                              <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                                <Lock size={14} /> {t.common.locked}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 animate-pulse">
                                <Sparkles size={14} /> Available
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-base text-slate-900 mb-1">
                            {lsn.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            {lsn.objective}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 mb-4 border-t border-slate-100 pt-3">
                            <span className="flex items-center gap-1">
                              <Clock size={13} /> {lsn.estimatedMinutes} min
                            </span>
                            <span className="flex items-center gap-1">
                              <Diamond size={13} className="text-amber-500 fill-amber-500" /> +{lsn.xpReward} XP
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={13} /> {lsn.vocabularyCount} words
                            </span>
                          </div>

                          {isLocked ? (
                            <button
                              disabled
                              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5"
                            >
                              <Lock size={14} />
                              <span>{t.common.locked}</span>
                            </button>
                          ) : (
                            <Link
                              href={`/lessons/${lsn.id}`}
                              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm shadow-indigo-200 flex items-center justify-center gap-1.5 active:scale-95"
                            >
                              <Play size={14} className="fill-white" />
                              <span>{lsn.isCompleted ? t.common.retry : t.common.start}</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
