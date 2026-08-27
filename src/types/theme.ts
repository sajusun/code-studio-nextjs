export type ThemeColor =
  | "oceanic_blue"    // 1. Royal Blue & Sapphire (Default)
  | "emerald_luxe"    // 2. Emerald & Mint Jade
  | "violet_aura"     // 3. Electric Violet & Indigo
  | "sunset_amber"    // 4. Crimson Orange & Amber
  | "obsidian_slate"; // 5. Obsidian Minimalist Monochrome

export type ThemeMode = "light" | "dark";

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  description: string;
  previewColor: string;
  gradient: string;
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: "oceanic_blue",
    name: "Oceanic Blue",
    description: "Royal Azure & Electric Blue (Stripe / SaaS Style)",
    previewColor: "#2563eb",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "emerald_luxe",
    name: "Emerald Luxe",
    description: "Mint Jade & Deep Emerald (Fintech & Clean Tech)",
    previewColor: "#059669",
    gradient: "from-emerald-600 to-teal-400",
  },
  {
    id: "violet_aura",
    name: "Violet Aura",
    description: "Neon Purple & Deep Indigo (AI & High-Tech)",
    previewColor: "#7c3aed",
    gradient: "from-violet-600 to-fuchsia-500",
  },
  {
    id: "sunset_amber",
    name: "Sunset Amber",
    description: "Crimson Flame & Warm Gold (High-Energy & Creative)",
    previewColor: "#ea580c",
    gradient: "from-orange-600 to-amber-500",
  },
  {
    id: "obsidian_slate",
    name: "Obsidian Slate",
    description: "Minimalist Titanium & Pure Monochrome (Apple Style)",
    previewColor: "#334155",
    gradient: "from-slate-700 to-zinc-500",
  },
];
