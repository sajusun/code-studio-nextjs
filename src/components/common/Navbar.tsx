"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import {
  Code2,
  Sparkles,
  Layers,
  Smartphone,
  Globe,
  Bell,
  ArrowRight,
  Menu,
  X,
  Send,
  Users,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const { notifications, unreadCount, clearNotifications } = useNotifications();

  const navLinks = [
    { name: "Showcase", href: "/products", icon: Layers },
    { name: "Web Apps", href: "/products?type=web_app", icon: Globe },
    { name: "Mobile Apps", href: "/products?type=android", icon: Smartphone },
    { name: "Team", href: "/team", icon: Users },
    { name: "Services", href: "/services", icon: Code2 },
    { name: "Contact", href: "/contact", icon: Send },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-blue-600 dark:text-cyan-400 group-hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Code<span className="text-gradient">Studio</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/20">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Software & SaaS Showcase</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-white dark:bg-white/10 text-blue-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                }`}
              >
                <link.icon className="w-3.5 h-3.5 opacity-75" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme & Palette Switcher */}
          <ThemeSwitcher />

          {/* Realtime Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400/40 transition-all relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Live Updates</h4>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] text-slate-500 hover:text-rose-600 transition-colors font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No live broadcasts yet. Stay tuned for product launches!
                    </div>
                  ) : (
                    notifications.map((n, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-blue-400/30 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">{n.type || "Update"}</span>
                          <span className="text-[9px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{n.title}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{n.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Request Custom Quote CTA */}
          <Link
            href="/request-quote"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 py-6 space-y-3 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              <link.icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              {link.name}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl btn-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
