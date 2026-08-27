"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { THEME_PRESETS, ThemeColor } from "@/types/theme";
import { Sun, Moon, Palette, Check } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-1.5" ref={dropdownRef}>
      
      {/* Light / Dark Mode Toggle */}
      <button
        onClick={toggleMode}
        title={`Switch to ${mode === "light" ? "Dark" : "Light"} mode`}
        aria-label="Toggle light or dark theme"
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400/40 transition-all flex items-center justify-center shadow-xs"
      >
        {mode === "light" ? (
          <Moon className="w-4 h-4 text-slate-700" />
        ) : (
          <Sun className="w-4 h-4 text-amber-300" />
        )}
      </button>

      {/* Color Palette Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Select Color Palette"
          aria-label="Select theme color palette"
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400/40 transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Palette className="w-4 h-4" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-panel bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1 mb-1">
              Select Color Palette
            </div>

            <div className="space-y-1">
              {THEME_PRESETS.map((preset) => {
                const isSelected = theme === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setTheme(preset.id as ThemeColor);
                      setDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all text-xs font-semibold ${
                      isSelected
                        ? "bg-slate-100 dark:bg-white/10 text-slate-950 dark:text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-xs shrink-0"
                        style={{ backgroundColor: preset.previewColor }}
                      ></span>
                      <span>{preset.name}</span>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
