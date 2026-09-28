"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "icon-only" | "dropdown" | "pill";
  className?: string;
}

export default function ThemeToggle({ variant = "icon-only", className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          aria-label="Toggle theme dropdown"
        >
          {resolvedTheme === "dark" ? (
            <Moon size={15} className="text-indigo-400" />
          ) : (
            <Sun size={15} className="text-amber-500" />
          )}
          <span className="capitalize">{theme}</span>
          <ChevronDown size={13} className="text-slate-400" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => {
                setTheme("light");
                setDropdownOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition ${
                theme === "light"
                  ? "bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Sun size={14} className="text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => {
                setTheme("dark");
                setDropdownOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition ${
                theme === "dark"
                  ? "bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Moon size={14} className="text-indigo-400" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => {
                setTheme("system");
                setDropdownOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition ${
                theme === "system"
                  ? "bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Monitor size={14} className="text-teal-500" />
              <span>System</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm active:scale-95 flex items-center justify-center ${className}`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={16} className="text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon size={16} className="text-indigo-600 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
