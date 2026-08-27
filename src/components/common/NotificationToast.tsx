"use client";

import React from "react";
import { useNotifications } from "@/context/NotificationContext";
import { Bell, X, Sparkles } from "lucide-react";

export function NotificationToast() {
  const { latestNotification, dismissToast } = useNotifications();

  if (!latestNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 shadow-2xl bg-slate-900/95 flex items-start gap-3.5 backdrop-blur-xl">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              Live Product Drop
            </span>
            <span className="text-[10px] text-slate-400">{latestNotification.time}</span>
          </div>
          <h4 className="text-sm font-bold text-white mt-1 leading-snug">{latestNotification.title}</h4>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2">{latestNotification.body}</p>
        </div>

        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
