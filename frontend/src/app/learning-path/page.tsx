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
  Unlock,
  GraduationCap,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedTabs from "@/components/AnimatedTabs";

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
  cefrLevel?: string;
  cefrStage?: string;
  adaptiveStatus?: "refresher" | "focus";
  adaptiveBadge?: string;
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface ModuleSummary {
  id: string;
  orderIndex: number;
  category: string;
  cefrLevel?: string;
  cefrStage?: string;
  cefrStageName?: string;
  adaptiveStatus?: "refresher" | "focus";
  title: string;
  description: string;
  icon: string;
  lessons: LessonSummary[];
}

interface PlacementDiagnosticInfo {
  hasPlacement: boolean;
  score: number;
  recommendedLevel: string;
  refresherModulesCount: number;
  focusModulesCount: number;
}

export default function LearningPathPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [exploreMode, setExploreMode] = useState(false);
  const [diagnostic, setDiagnostic] = useState<PlacementDiagnosticInfo | null>(null);
  const [pairInfo, setPairInfo] = useState<{
    nativeName: string;
    targetName: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    async function loadPath() {
      setLoading(true);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        let completedSet = new Set<string>();
        if (typeof window !== "undefined") {
          try {
            const rawCompleted = localStorage.getItem("lingua_completed_lessons");
            if (rawCompleted) {
              const parsed = JSON.parse(rawCompleted);
              if (Array.isArray(parsed)) {
                parsed.forEach((id: string) => completedSet.add(id));
              }
            }
          } catch {}
        }

        const modeParam = exploreMode ? "&mode=explore" : "";
        const completedParam = completedSet.size > 0 ? `&completedLessons=${Array.from(completedSet).join(",")}` : "";
        const res = await fetch(
          `/api/learning-path?native=${nativeLanguage}&target=${targetLanguage}${completedParam}${modeParam}`,
          { headers, credentials: "include", cache: "no-store" }
        );
        const data = await res.json();
        
        let activeDiagnostic: PlacementDiagnosticInfo | null = data.placementDiagnostic || null;

        // Check local storage for diagnostic calibration fallback
        if (typeof window !== "undefined") {
          const storedRaw =
            localStorage.getItem(`lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`) ||
            localStorage.getItem("lingua_placement_diagnostic");
          if (storedRaw) {
            try {
              const parsed = JSON.parse(storedRaw);
              if (parsed && parsed.hasPlacement) {
                if (!activeDiagnostic || !activeDiagnostic.hasPlacement) {
                  activeDiagnostic = parsed;
                }
              }
            } catch {}
          }
        }

        let loadedModules: ModuleSummary[] = data.modules || [];

        // Dynamically calibrate loadedModules if activeDiagnostic is present
        if (activeDiagnostic && activeDiagnostic.hasPlacement && loadedModules.length > 0) {
          const placedLevel = activeDiagnostic.recommendedLevel || "A1";
          const masteredSet = new Set<number>();

          if (placedLevel === "A2" || placedLevel === "B1" || placedLevel === "B2") masteredSet.add(1);
          if (placedLevel === "B1" || placedLevel === "B2") {
            masteredSet.add(2);
            masteredSet.add(3);
          }
          if (placedLevel === "B2") masteredSet.add(4);

          activeDiagnostic.refresherModulesCount = masteredSet.size;
          activeDiagnostic.focusModulesCount = loadedModules.length - masteredSet.size;

          loadedModules = loadedModules.map((mod) => {
            const isRefresher = masteredSet.has(mod.orderIndex);
            return {
              ...mod,
              adaptiveStatus: isRefresher ? ("refresher" as const) : ("focus" as const),
              lessons: mod.lessons.map((lsn) => ({
                ...lsn,
                isUnlocked: isRefresher || lsn.isUnlocked,
                adaptiveStatus: isRefresher ? ("refresher" as const) : ("focus" as const),
              })),
            };
          });
        }

        // Sequential unlocking within modules:
        // - Lesson 1 of any module is available as the module entry point.
        // - Lesson 2 unlocks as soon as Lesson 1 in that module is completed!
        // - Lesson 3 unlocks as soon as Lesson 2 in that module is completed!
        loadedModules = loadedModules.map((mod) => {
          const isRefresher = mod.adaptiveStatus === "refresher";
          return {
            ...mod,
            lessons: mod.lessons.map((lsn, idx) => {
              const isCompleted = lsn.isCompleted || completedSet.has(lsn.id);
              const prevLsn = idx > 0 ? mod.lessons[idx - 1] : null;
              const prevCompleted = prevLsn ? (prevLsn.isCompleted || completedSet.has(prevLsn.id)) : false;

              const isUnlocked =
                exploreMode ||
                isCompleted ||
                isRefresher ||
                idx === 0 ||
                prevCompleted ||
                lsn.isUnlocked;

              return {
                ...lsn,
                isCompleted,
                isUnlocked,
              };
            }),
          };
        });

        setModules(loadedModules);
        setPairInfo(data.languagePair || null);
        setDiagnostic(activeDiagnostic);
      } catch (err) {
        console.error("Failed to load learning path:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPath();

    window.addEventListener("lingua_progress_updated", loadPath);
    window.addEventListener("storage", loadPath);
    window.addEventListener("focus", loadPath);

    return () => {
      window.removeEventListener("lingua_progress_updated", loadPath);
      window.removeEventListener("storage", loadPath);
      window.removeEventListener("focus", loadPath);
    };
  }, [nativeLanguage, targetLanguage, exploreMode]);

  const applyManualCalibration = (level: "A1" | "A2" | "B1" | "B2" | "reset") => {
    if (level === "reset") {
      if (typeof window !== "undefined") {
        localStorage.removeItem(`lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`);
        localStorage.removeItem("lingua_placement_diagnostic");
      }
      setDiagnostic(null);
      // Reload path
      setModules((prev) =>
        prev.map((mod) => ({
          ...mod,
          adaptiveStatus: "focus" as const,
          lessons: mod.lessons.map((lsn) => ({
            ...lsn,
            isUnlocked: mod.orderIndex === 1 && lsn.orderIndex === 1,
            adaptiveStatus: "focus" as const,
          })),
        }))
      );
      return;
    }

    const levelScores: Record<string, number> = { A1: 30, A2: 65, B1: 85, B2: 95 };
    const levelMastered: Record<string, number[]> = {
      A1: [],
      A2: [1],
      B1: [1, 2, 3],
      B2: [1, 2, 3, 4],
    };

    const newDiagnostic: PlacementDiagnosticInfo = {
      hasPlacement: true,
      score: levelScores[level] || 50,
      recommendedLevel: level,
      refresherModulesCount: levelMastered[level].length,
      focusModulesCount: 5 - levelMastered[level].length,
    };

    if (typeof window !== "undefined") {
      const payload = {
        ...newDiagnostic,
        masteredModules: levelMastered[level],
        focusModules: [1, 2, 3, 4, 5].filter((n) => !levelMastered[level].includes(n)),
        timestamp: Date.now(),
      };
      localStorage.setItem(`lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`, JSON.stringify(payload));
      localStorage.setItem("lingua_placement_diagnostic", JSON.stringify(payload));
    }

    const masteredSet = new Set(levelMastered[level]);
    setModules((prev) =>
      prev.map((mod) => {
        const isRefresher = masteredSet.has(mod.orderIndex);
        return {
          ...mod,
          adaptiveStatus: isRefresher ? ("refresher" as const) : ("focus" as const),
          lessons: mod.lessons.map((lsn) => ({
            ...lsn,
            isUnlocked: isRefresher || (mod.orderIndex === 1 && lsn.orderIndex === 1),
            adaptiveStatus: isRefresher ? ("refresher" as const) : ("focus" as const),
          })),
        };
      })
    );
    setDiagnostic(newDiagnostic);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.isCompleted).length,
    0
  );

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Track Header Card */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950/70 border border-indigo-500/40 rounded-full text-xs font-bold text-indigo-300 mb-3.5 shadow-sm">
              <Compass size={14} className="text-indigo-400" />
              <span className="uppercase tracking-wider">{nativeLanguage}</span>
              <span className="text-slate-600">➔</span>
              <span className="uppercase tracking-wider text-teal-400">{targetLanguage}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200 font-mono">{completedLessons}/{totalLessons} Done</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.nav.learningPath}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {pairInfo?.description ||
                `Personalized situational curriculum for learning ${targetLanguage.toUpperCase()} through ${nativeLanguage.toUpperCase()} instruction.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            {/* Free Exploration / Guided Toggle */}
            <button
              onClick={() => setExploreMode(!exploreMode)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-md ${
                exploreMode
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-950/40 ring-1 ring-amber-400/40"
                  : "bg-slate-900/80 text-slate-300 border border-white/[0.08] hover:bg-slate-850 hover:border-slate-700"
              }`}
            >
              <Unlock size={14} className={exploreMode ? "text-white" : "text-amber-400"} />
              <span>{exploreMode ? "Free Exploration (Active)" : "Unlock All (Explore)"}</span>
            </button>

            <Link
              href="/curriculum"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-md shadow-indigo-600/30 hover:scale-105"
            >
              <BookOpen size={14} className="text-white" />
              <span>Full CEFR Syllabus</span>
            </Link>

            <Link
              href="/placement"
              className="px-4 py-2.5 bg-slate-900/80 hover:bg-slate-850 border border-white/[0.08] hover:border-indigo-500/40 text-slate-200 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-md hover:scale-105"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span>{t.placement.pageTitle}</span>
            </Link>
          </div>
        </div>

        {/* Live CEFR Adaptive Calibration Toolbar */}
        <div className="p-4 sm:p-5 rounded-3xl card-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Calibrate Diagnostic Level:</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (Live-test how Klaus personalizes your stages based on test results)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <AnimatedTabs
              tabs={[
                { id: "A1", label: "A1 Beginner" },
                { id: "A2", label: "⚡ A2 Elementary" },
                { id: "B1", label: "⚡ B1 Threshold" },
                { id: "B2", label: "⚡ B2 Vantage" },
              ]}
              activeId={diagnostic?.hasPlacement ? (diagnostic.recommendedLevel || "A1") : "A1"}
              onChange={(lvl) => applyManualCalibration(lvl as any)}
              size="sm"
            />
            {diagnostic?.hasPlacement && (
              <button
                onClick={() => applyManualCalibration("reset")}
                className="px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 font-bold transition active:scale-95 shrink-0"
                title="Reset to default uncalibrated state"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Diagnostic Calibration Pathway Banner (if placement taken) */}
        {diagnostic?.hasPlacement && (
          <div className="p-6 rounded-3xl card-elevated border-indigo-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start sm:items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                🎯
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-extrabold text-base text-white">Diagnostic Pathway Active</h4>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-500/40 font-mono">
                    Assessed Level: CEFR {diagnostic.recommendedLevel}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Accuracy: {diagnostic.score}%
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  All curriculum stages are retained: Mastered concepts are designated as <strong className="text-cyan-300">⚡ Refresher modules</strong> (fast-tracked and unlocked), while unverified areas are highlighted for <strong className="text-amber-300">🎯 High Priority Focus</strong> with all 5 interactive drills.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
              <span className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-sm">
                <span>⚡</span> {diagnostic.refresherModulesCount} Refresher {diagnostic.refresherModulesCount === 1 ? "Stage" : "Stages"}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-amber-950/70 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-sm">
                <span>🎯</span> {diagnostic.focusModulesCount} Focus {diagnostic.focusModulesCount === 1 ? "Stage" : "Stages"}
              </span>
            </div>
          </div>
        )}

        {/* Modules & Lessons Trail */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={36} className="animate-spin text-indigo-400 mb-4" />
            <p className="text-xs font-semibold text-slate-400">{t.common.loading}</p>
          </div>
        ) : modules.length === 0 ? (
          <div className="card-elevated rounded-3xl p-12 text-center">
            <p className="text-slate-400 text-sm">
              No modules available for this language pair yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {modules.map((mod) => (
              <div key={mod.id} className="space-y-4">
                {/* Module Banner */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/[0.1] flex items-center justify-center text-3xl shadow-xl shadow-black/40 shrink-0">
                      {mod.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono shadow-sm">
                          CEFR {mod.cefrLevel || "A1"}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          {mod.cefrStageName || mod.cefrStage || "Curriculum Stage"}
                        </span>
                        {mod.adaptiveStatus === "refresher" ? (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 flex items-center gap-1 shadow-sm">
                            <span>⚡</span> Refresher Stage
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-400/50 text-amber-300 flex items-center gap-1 shadow-sm">
                            <span>🎯</span> High Priority Focus
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                        Module {mod.orderIndex}: {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400">{mod.description}</p>
                    </div>
                  </div>
                </div>

                {/* Lesson Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mod.lessons.map((lsn) => {
                    const isLocked = !lsn.isUnlocked;

                    return (
                      <div
                        key={lsn.id}
                        className={`rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
                          lsn.isCompleted
                            ? "bg-slate-900/80 border-teal-500/40 shadow-lg shadow-teal-950/20 hover:border-teal-400/60 hover:-translate-y-1 hover:shadow-teal-950/40"
                            : isLocked
                            ? "bg-slate-950/40 border-white/[0.04] opacity-50"
                            : lsn.adaptiveStatus === "refresher"
                            ? "card-elevated border-cyan-500/40 shadow-xl shadow-cyan-950/20 hover:border-cyan-400/60 hover:-translate-y-1"
                            : "card-elevated border-indigo-500/35 shadow-xl shadow-indigo-950/30 hover:border-indigo-400/60 hover:-translate-y-1 hover:shadow-indigo-500/10 ring-1 ring-indigo-500/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-white/[0.08] font-mono">
                                {t.lessons.lessonTitle} {lsn.orderIndex}
                              </span>
                              {lsn.adaptiveStatus === "refresher" && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
                                  ⚡ Refresher
                                </span>
                              )}
                            </div>

                            {lsn.isCompleted ? (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
                                <CheckCircle2 size={14} className="text-teal-400" /> {t.common.completed}
                              </span>
                            ) : isLocked ? (
                              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                                <Lock size={13} /> {t.common.locked}
                              </span>
                            ) : lsn.adaptiveStatus === "refresher" ? (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
                                <span>⚡</span> Fast-Track
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                                <Sparkles size={13} className="text-indigo-400" /> Available
                              </span>
                            )}
                          </div>

                          <h4 className="font-extrabold text-base text-white mb-1.5 leading-snug">
                            {lsn.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {lsn.objective}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 mb-4 border-t border-white/[0.06] pt-3">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Clock size={13} className="text-slate-400" /> {lsn.estimatedMinutes} min
                            </span>
                            <span className="flex items-center gap-1 text-amber-300">
                              <Diamond size={13} className="text-amber-400 fill-amber-400" /> +{lsn.xpReward} XP
                            </span>
                            <span className="flex items-center gap-1 text-indigo-300">
                              <Sparkles size={13} className="text-indigo-400" /> {lsn.exerciseCount >= 5 ? "5 Exercises" : `${lsn.exerciseCount} Ex`}
                            </span>
                          </div>

                          {isLocked ? (
                            <button
                              disabled
                              className="w-full py-2.5 rounded-2xl bg-slate-900/60 text-slate-500 font-bold text-xs cursor-not-allowed flex items-center justify-center gap-1.5 border border-white/[0.04]"
                            >
                              <Lock size={14} />
                              <span>{t.common.locked}</span>
                            </button>
                          ) : (
                            <Link
                              href={`/lessons/${lsn.id}`}
                              className={`w-full py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 active:scale-95 ${
                                lsn.adaptiveStatus === "refresher"
                                  ? "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-950/40"
                                  : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-indigo-600/30"
                              }`}
                            >
                              <Play size={14} className="fill-white" />
                              <span>{lsn.isCompleted ? t.common.retry : lsn.adaptiveStatus === "refresher" ? "Refresher Review" : t.common.start}</span>
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
