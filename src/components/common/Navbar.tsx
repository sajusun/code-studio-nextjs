"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import {
  Code2,
  Bell,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const navLinks = [
  { name: "Products",  href: "/products"       },
  { name: "Services",  href: "/services"        },
  { name: "Team",      href: "/team"            },
  { name: "Contact",   href: "/contact"         },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const { notifications, unreadCount, clearNotifications } = useNotifications();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href.split("?")[0]));

  return (
    <header
      className="sticky top-0 z-40 glass-nav"
      style={{ boxShadow: "0 1px 0 var(--border)" }}
    >
      <div className="container h-16 flex items-center justify-between gap-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-gradient)" }}
          >
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight" style={{ color: "var(--text-main)" }}>
              CodeStudio
            </span>
            <span className="text-[10px] font-medium" style={{ color: "var(--text-faint)" }}>
              Software & Engineering
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-accent font-semibold"
                  : "hover:bg-[var(--bg-card-subtle)]"
              }`}
              style={{
                color: isActive(link.href) ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">

          <ThemeSwitcher />

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="btn btn-ghost p-2"
              aria-label="Notifications"
              style={{ borderRadius: "8px", position: "relative" }}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ background: "var(--accent)", fontSize: "9px" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-xl border shadow-lg z-50 overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--text-main)" }}>
                    Live Updates
                  </span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[11px] hover:underline"
                      style={{ color: "var(--text-faint)" }}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs" style={{ color: "var(--text-faint)" }}>
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 border-b last:border-0"
                        style={{ borderColor: "var(--border-subtle)" }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold" style={{ color: "var(--accent)" }}>
                            {n.type ?? "Update"}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs font-medium" style={{ color: "var(--text-main)" }}>
                          {n.title}
                        </p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {n.body}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Client Portal Link */}
          <Link
            href="/portal"
            className="btn btn-secondary hidden sm:inline-flex text-xs py-2 px-3 items-center gap-1.5 hover:border-blue-400"
            title="Private Client Project Workspace"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Client Portal</span>
          </Link>

          {/* CTA */}
          <Link href="/request-quote" className="btn btn-primary hidden sm:inline-flex text-xs py-2 px-4">
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.href) ? "var(--accent)" : "var(--text-secondary)",
                  background: isActive(link.href) ? "var(--accent-muted)" : "transparent",
                }}
              >
                {link.name}
                <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40" />
              </Link>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: "var(--border)" }}>
              <Link
                href="/request-quote"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary w-full justify-center text-sm"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
