import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "" || Number(amount) === 0) {
    return "Custom Quote";
  }
  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function getPlatformBadge(type: ProductType): { label: string; color: string; bg: string; icon: string } {
  switch (type) {
    case "web_app":
      return {
        label: "Web App / SaaS",
        color: "text-blue-700 dark:text-cyan-400",
        bg: "bg-blue-50 dark:bg-cyan-500/10 border-blue-200 dark:border-cyan-500/20",
        icon: "Globe",
      };
    case "android":
      return {
        label: "Android APK",
        color: "text-emerald-700 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
        icon: "Smartphone",
      };
    case "ios":
      return {
        label: "iOS TestFlight",
        color: "text-violet-700 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20",
        icon: "Smartphone",
      };
    case "custom":
    default:
      return {
        label: "Full Stack Suite",
        color: "text-amber-800 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
        icon: "Layers",
      };
  }
}

export function getFallbackImage(category?: string): string {
  const fallbacks: Record<string, string> = {
    ecommerce: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
    saas: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    logistics: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    fintech: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
    health: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    ai: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
  };
  const cat = (category || "").toLowerCase();
  for (const key of Object.keys(fallbacks)) {
    if (cat.includes(key)) return fallbacks[key];
  }
  return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80";
}

export function getSafeImageUrl(url?: string | null, category?: string): string {
  if (!url || typeof url !== "string") {
    return getFallbackImage(category);
  }

  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "null" || trimmed === "undefined") {
    return getFallbackImage(category);
  }

  // Check if it's already an absolute URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return trimmed;
      }
    } catch {
      return getFallbackImage(category);
    }
  }

  // If it's a root relative path (e.g. /images/...)
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // If it's a relative path from backend storage
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || "http://backend.test";
  const cleanBase = backendBase.replace(/\/$/, "");
  const cleanPath = trimmed.startsWith("storage/") ? trimmed : `storage/${trimmed}`;
  return `${cleanBase}/${cleanPath}`;
}
