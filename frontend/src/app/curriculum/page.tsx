"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
  Clock,
  Diamond,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedTabs from "@/components/AnimatedTabs";
import SpotlightCard from "@/components/SpotlightCard";

interface ExercisePreview {
  id: string;
  orderIndex: number;
  type: string;
  instruction: string;
  prompt: string;
}

interface LessonDetail {
  id: string;
  orderIndex: number;
  title: string;
  objective: string;
  culturalTip?: string | null;
  xpReward: number;
  estimatedMinutes: number;
  exerciseCount: number;
  vocabularyCount: number;
  cefrLevel: string;
  cefrStage: string;
  adaptiveStatus: "refresher" | "focus";
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface ModuleDetail {
  id: string;
  orderIndex: number;
  category: string;
  cefrLevel: string;
  cefrStage: string;
  cefrStageName: string;
  adaptiveStatus: "refresher" | "focus";
  title: string;
  description: string;
  icon: string;
  lessons: LessonDetail[];
}

interface DiagnosticInfo {
  hasPlacement: boolean;
  score: number;
  recommendedLevel: string;
  refresherModulesCount: number;
  focusModulesCount: number;
}

export default function CurriculumRoadmapPage() {
  const { nativeLanguage, targetLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleDetail[]>([]);
  const [diagnostic, setDiagnostic] = useState<DiagnosticInfo | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  useEffect(() => {
    async function loadCurriculum() {
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

        const completedParam = completedSet.size > 0 ? `&completedLessons=${Array.from(completedSet).join(",")}` : "";
        const res = await fetch(`/api/learning-path?native=${nativeLanguage}&target=${targetLanguage}${completedParam}`, {
          headers,
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        
        let activeDiagnostic: DiagnosticInfo | null = data.placementDiagnostic || null;

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

        let loadedModules: ModuleDetail[] = data.modules || [];

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
        setDiagnostic(activeDiagnostic);
      } catch (err) {
        console.error("Failed to load curriculum roadmap:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCurriculum();

    window.addEventListener("lingua_progress_updated", loadCurriculum);
    window.addEventListener("storage", loadCurriculum);
    window.addEventListener("focus", loadCurriculum);

    return () => {
      window.removeEventListener("lingua_progress_updated", loadCurriculum);
      window.removeEventListener("storage", loadCurriculum);
      window.removeEventListener("focus", loadCurriculum);
    };
  }, [nativeLanguage, targetLanguage]);

  const applyManualCalibration = (level: "A1" | "A2" | "B1" | "B2" | "reset") => {
    if (level === "reset") {
      if (typeof window !== "undefined") {
        localStorage.removeItem(`lingua_placement_diagnostic_${nativeLanguage}_${targetLanguage}`);
        localStorage.removeItem("lingua_placement_diagnostic");
      }
      setDiagnostic(null);
      setModules((prev) =>
        prev.map((mod) => ({
          ...mod,
          adaptiveStatus: "focus" as const,
          lessons: mod.lessons.map((lsn) => ({
            ...lsn,
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

    const newDiagnostic: DiagnosticInfo = {
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
            adaptiveStatus: isRefresher ? ("refresher" as const) : ("focus" as const),
          })),
        };
      })
    );
    setDiagnostic(newDiagnostic);
  };

  const exercisePillars = [
    {
      num: 1,
      title: "Pictorial Identification",
      icon: "🖼️",
      desc: "Visual illustration card matching with Klaus audio preview button",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300",
    },
    {
      num: 2,
      title: "Contextual Multiple Choice",
      icon: "📝",
      desc: "Situational phrase selection with culturally authentic options",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-300",
    },
    {
      num: 3,
      title: "Listening Comprehension",
      icon: "🎧",
      desc: "Klaus spoken audio drill assessing ear calibration and phonetics",
      color: "from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-300",
    },
    {
      num: 4,
      title: "Word Order Syntax",
      icon: "🧩",
      desc: "Interactive word tile assembly into proper SOV/SVO grammatical order",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300",
    },
    {
      num: 5,
      title: "Production Translation",
      icon: "✍️",
      desc: "Real-world sentence translation from native thought into target speech",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-300",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto pb-12">
        {/* Header Hero */}
        <div className="card-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/30 rounded-full text-xs font-bold text-indigo-300 mb-3 shadow-sm">
              <BookOpen size={14} className="text-indigo-400" />
              <span>Official CEFR Language Framework</span>
              <span className="text-slate-500">•</span>
              <span className="uppercase text-white font-mono">{nativeLanguage} ➔ {targetLanguage}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Standardized CEFR Curriculum
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed font-normal">
              Every stage is anchored in the internationally recognized Common European Framework of Reference for Languages (CEFR). Each lesson is powered by exactly <strong>5 interactive drill exercises</strong> designed to train visual, auditory, and structural language mastery.
            </p>

            {/* Quick CEFR Stepper Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-white/[0.08]">
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center shadow-sm hover:scale-105 transition-transform">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Stage 1</span>
                <span className="text-sm font-black text-white">A1 Breakthrough</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-center shadow-sm hover:scale-105 transition-transform">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Stage 2</span>
                <span className="text-sm font-black text-white">A2 Essentials</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center shadow-sm hover:scale-105 transition-transform">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Stage 3</span>
                <span className="text-sm font-black text-white">A2 Practical</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center shadow-sm hover:scale-105 transition-transform">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Stage 4</span>
                <span className="text-sm font-black text-white">B1 Threshold</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center shadow-sm hover:scale-105 transition-transform">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Stage 5</span>
                <span className="text-sm font-black text-white">B2 Vantage</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Interactive Exercise Pillars Showcase */}
        <div className="card-elevated rounded-3xl p-6 border border-white/[0.08] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles size={18} className="text-teal-400" />
              <span>5 Standard Exercises in Every Stage & Lesson</span>
            </h3>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800/90 border border-white/[0.08] px-3 py-1 rounded-full shadow-sm">
              Full Multi-Sensory Drill
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {exercisePillars.map((p) => (
              <div
                key={p.num}
                className={`p-4 rounded-2xl border bg-gradient-to-b ${p.color} flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-[10px] font-mono font-bold bg-slate-900/90 px-2 py-0.5 rounded-full text-slate-300 border border-white/[0.08]">
                      Step {p.num}
                    </span>
                  </div>
                  <h4 className="font-black text-xs text-white leading-snug">{p.title}</h4>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-normal">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live CEFR Adaptive Calibration Toolbar */}
        <div className="p-4 sm:p-5 rounded-3xl card-elevated border border-white/[0.08] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Calibrate Diagnostic Level:</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline font-medium">
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

        {/* Diagnostic Calibration Pathway Summary (if taken) */}
        {diagnostic?.hasPlacement && (
          <div className="p-5 rounded-3xl card-elevated border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
                🎯
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="font-black text-sm text-white">Dynamic Diagnostic Calibration Active</h4>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-500/40 font-mono">
                    CEFR {diagnostic.recommendedLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  All 5 stages remain in your syllabus. Mastered topics are tagged as <strong className="text-cyan-300">⚡ Refresher modules</strong> (fast-tracked and unlocked), while unverified areas are set as <strong className="text-amber-300">🎯 High Priority Focus</strong> for deep practice.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-sm">
                ⚡ {diagnostic.refresherModulesCount} Refresher
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-amber-950/70 border border-amber-500/40 text-amber-300 shadow-sm">
                🎯 {diagnostic.focusModulesCount} Focus
              </span>
            </div>
          </div>
        )}

        {/* Detailed Stages & Lessons Accordion */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={36} className="animate-spin text-indigo-400 mb-4" />
            <p className="text-xs font-semibold text-slate-400">{t.common.loading}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((mod) => {
              const isExpanded = expandedModule === mod.orderIndex;

              return (
                <div
                  key={mod.id}
                  className="rounded-3xl border border-white/[0.08] card-elevated shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Module Header Bar */}
                  <div
                    onClick={() => setExpandedModule(isExpanded ? null : mod.orderIndex)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
                        {mod.icon}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono shadow-sm">
                            CEFR {mod.cefrLevel || "A1"}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {mod.cefrStageName || `Stage ${mod.orderIndex}`}
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
                        <h3 className="font-black text-base sm:text-xl text-white tracking-tight">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 font-normal">{mod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 font-mono">
                        {mod.lessons.length} Lessons • {mod.lessons.length * 5} Exercises
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-white/[0.08] flex items-center justify-center text-slate-400 transition-colors hover:text-white">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lessons Grid */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-white/[0.08] bg-slate-950/50 space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mod.lessons.map((lsn) => (
                          <div
                            key={lsn.id}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                              lsn.isCompleted
                                ? "card-interactive border-teal-500/40"
                                : lsn.adaptiveStatus === "refresher"
                                ? "card-interactive border-cyan-500/40 ring-1 ring-cyan-500/20"
                                : "card-interactive border-white/[0.08]"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-white/[0.08] text-slate-300 font-mono">
                                  Lesson {lsn.orderIndex}
                                </span>
                                {lsn.isCompleted ? (
                                  <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
                                    <CheckCircle2 size={13} /> Done
                                  </span>
                                ) : lsn.adaptiveStatus === "refresher" ? (
                                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                                    ⚡ Refresher
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                    🎯 Focus
                                  </span>
                                )}
                              </div>

                              <h4 className="font-extrabold text-sm text-white mb-1 leading-snug">
                                {lsn.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed mb-3 font-normal">
                                {lsn.objective}
                              </p>

                              {/* Exercise breakdown pill */}
                              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-[10px] text-slate-300 font-medium space-y-1 mb-3.5">
                                <div className="font-bold text-indigo-300">5 Included Exercises:</div>
                                <div className="text-slate-400">1. 🖼️ Pictorial ID • 2. 📝 Choice</div>
                                <div className="text-slate-400">3. 🎧 Listening • 4. 🧩 Word Order</div>
                                <div className="text-slate-400">5. ✍️ Production Translation</div>
                              </div>
                            </div>

                            <Link
                              href={`/lessons/${lsn.id}`}
                              className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md ${
                                lsn.adaptiveStatus === "refresher"
                                  ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-teal"
                                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow-indigo"
                              }`}
                            >
                              <Play size={12} className="fill-white" />
                              <span>{lsn.isCompleted ? "Review Lesson" : lsn.adaptiveStatus === "refresher" ? "Fast-Track Lesson" : "Start Lesson"}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
