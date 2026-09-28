"use client";

import React, { useRef, useState, useEffect } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  activeId?: string;
  activeTab?: string;
  onChange: (id: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "pill" | "underline" | "floating";
}

export function AnimatedTabs({
  tabs,
  activeId,
  activeTab,
  onChange,
  size = "md",
  className = "",
  variant = "pill",
}: AnimatedTabsProps) {
  const currentActiveId = activeId ?? activeTab ?? (tabs[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Reposition animated indicator whenever currentActiveId changes or window resizes
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = tabRefs.current.get(currentActiveId);
      const container = containerRef.current;
      if (activeEl && container) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [currentActiveId, tabs]);

  const sizeClasses = {
    sm: "py-1 px-3 text-xs",
    md: "py-2 px-4 text-xs sm:text-sm",
    lg: "py-2.5 px-5 text-sm sm:text-base",
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] shadow-inner select-none overflow-x-auto no-scrollbar max-w-full ${className}`}
    >
      {/* Sliding Active Indicator Pill */}
      {indicatorStyle.width > 0 && (
        <span
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 shadow-lg shadow-indigo-600/35 border border-indigo-400/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          style={{
            transform: `translateX(${indicatorStyle.left - 6}px)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {/* Tabs */}
      {tabs.map((tab) => {
        const isActive = tab.id === currentActiveId;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative z-10 font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors duration-200 active:scale-95 ${
              sizeClasses[size]
            } ${
              isActive
                ? "text-white drop-shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400 border border-white/[0.06]"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default AnimatedTabs;
