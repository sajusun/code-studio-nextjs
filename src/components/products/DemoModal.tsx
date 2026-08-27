"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { Copy, Check, ExternalLink, X, KeyRound, ShieldAlert, Sparkles } from "lucide-react";

interface DemoModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ product, isOpen, onClose }: DemoModalProps) {
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!isOpen || !product) return null;

  const copyToClipboard = (text: string, type: "user" | "pass") => {
    navigator.clipboard.writeText(text);
    if (type === "user") {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 flex items-center justify-center text-blue-700 dark:text-cyan-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live Sandbox Access
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{product.title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Use the credentials below to explore the management dashboard, metrics, user permissions, and admin controls in real-time.
        </p>

        {/* Credentials Box */}
        <div className="space-y-3.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-2xl p-4.5 mb-6">
          
          {/* Username / Email */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
              Demo Admin Email / Login
            </label>
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-3.5 py-2.5 shadow-xs">
              <code className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-300">
                {product.admin_demo_username || "admin@demo.com"}
              </code>
              <button
                onClick={() => copyToClipboard(product.admin_demo_username || "admin@demo.com", "user")}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 font-bold transition-colors cursor-pointer"
              >
                {copiedUser ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUser ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
              Demo Password
            </label>
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-3.5 py-2.5 shadow-xs">
              <code className="text-xs font-mono font-bold text-blue-700 dark:text-cyan-300">
                {product.admin_demo_password || "password"}
              </code>
              <button
                onClick={() => copyToClipboard(product.admin_demo_password || "password", "pass")}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 font-bold transition-colors cursor-pointer"
              >
                {copiedPass ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPass ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {product.admin_demo_url ? (
          <a
            href={product.admin_demo_url}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>Launch Admin Sandbox</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-medium flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Admin demo URL not configured for this item. Contact us for private access.</span>
          </div>
        )}

      </div>
    </div>
  );
}
