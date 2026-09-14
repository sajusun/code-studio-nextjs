"use client";

import React, { useState } from "react";
import Link from "next/link";
import { subscribeNewsletter } from "@/lib/api";
import {
  Code2,
  Send,
  CheckCircle2,
  Globe,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Heart,
  GitBranch,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success || res.status === "success") {
        setStatus("success");
        setMessage("Thank you! You're subscribed to software release alerts.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.message || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-2xl relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Code<span className="text-gradient">Studio</span>
              </span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              We design and engineer enterprise-grade web apps, mobile apps, SaaS tools, and headless microservices. Explore ready-to-deploy solutions and live demo previews.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Systems Online
              </div>

              <a
                href="https://github.com/sajusun/code-studio-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full hover:border-blue-400 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                Open Source (MIT)
              </a>
            </div>
          </div>

          {/* Software Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Showcase Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link href="/products?type=web_app" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" /> Web Applications
                </Link>
              </li>
              <li>
                <Link href="/products?type=android" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5" /> Android APK Builds
                </Link>
              </li>
              <li>
                <Link href="/products?type=ios" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5" /> iOS TestFlight Apps
                </Link>
              </li>
              <li>
                <Link href="/products?type=custom" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Custom SaaS Suites
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Company & Open Source</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/services" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Engineering Services</Link></li>
              <li><Link href="/team" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Engineering Team</Link></li>
              <li><Link href="/request-quote" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Project Estimator</Link></li>
              <li><a href="https://github.com/sajusun/code-studio-nextjs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">GitHub Repository ↗</a></li>
              <li><a href="https://sajusun.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">Developer Portfolio ↗</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" /> New Release Alerts
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Subscribe to get notified when new SaaS products, mobile apps, or open-source boilerplates drop.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-1 focus-within:border-blue-500/50 dark:focus-within:border-cyan-500/50 shadow-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="p-2 rounded-lg btn-primary text-white disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === "success" && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {message}
                </p>
              )}
              {status === "error" && (
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">{message}</p>
              )}
            </form>
          </div>

        </div>

        {/* Developer Attribution & Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-slate-200/80 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span>Architected &amp; Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              href="https://sajusun.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 underline underline-offset-2 transition-colors"
            >
              Sakhawat Hossain (@sajusun)
            </a>
            <span>•</span>
            <span>© {new Date().getFullYear()} CodeStudio PRO</span>
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://github.com/sajusun/code-studio-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <GitBranch className="w-3.5 h-3.5" /> GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/sajusun"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
            >
              LinkedIn
            </a>
            <span>•</span>
            <span className="text-slate-400 dark:text-slate-600">Next.js 16 • Laravel 12 Microservice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
