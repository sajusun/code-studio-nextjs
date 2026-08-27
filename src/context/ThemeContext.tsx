"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeColor, ThemeMode, THEME_PRESETS } from "@/types/theme";

interface ThemeContextType {
  theme: ThemeColor;
  mode: ThemeMode;
  setTheme: (theme: ThemeColor) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const defaultThemeFromEnv = (process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeColor) || "oceanic_blue";
const defaultModeFromEnv = (process.env.NEXT_PUBLIC_DEFAULT_MODE as ThemeMode) || "light";

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultThemeFromEnv,
  mode: defaultModeFromEnv,
  setTheme: () => {},
  setMode: () => {},
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeColor>(defaultThemeFromEnv);
  const [mode, setModeState] = useState<ThemeMode>(defaultModeFromEnv);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read persisted theme from localStorage
    const savedTheme = localStorage.getItem("app_theme_color") as ThemeColor;
    const savedMode = localStorage.getItem("app_theme_mode") as ThemeMode;

    if (savedTheme && THEME_PRESETS.some((p) => p.id === savedTheme)) {
      setThemeState(savedTheme);
    }
    if (savedMode === "light" || savedMode === "dark") {
      setModeState(savedMode);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Mode (light / dark)
    if (mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    root.setAttribute("data-mode", mode);

    // Apply Color Palette
    root.setAttribute("data-theme", theme);

    // Persist
    localStorage.setItem("app_theme_color", theme);
    localStorage.setItem("app_theme_mode", mode);
  }, [theme, mode]);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
