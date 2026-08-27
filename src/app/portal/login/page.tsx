"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useClientAuth } from "@/context/ClientAuthContext";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Code2,
  Sparkles,
  AlertCircle,
  KeyRound,
} from "lucide-react";

export default function ClientPortalLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useClientAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/portal");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    setErrorMsg("");

    const res = await login(email, password);
    if (res.success) {
      router.push("/portal");
    } else {
      setErrorMsg(res.message || "Invalid credentials. Please contact your account manager.");
      setSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("client@demo.com");
    setPassword("password123");
    setErrorMsg("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ background: "var(--accent-gradient)" }}
            >
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight" style={{ color: "var(--text-main)" }}>
              CodeStudio
            </span>
          </Link>

          <h1 className="heading-md text-2xl font-bold" style={{ color: "var(--text-main)" }}>
            Client Project Workspace
          </h1>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "340px", margin: "0 auto" }}>
            Sign in to track real-time project milestones, communicate with assigned engineers, and access deliverables.
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-7 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          
          {errorMsg && (
            <div className="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-main)" }}>
                Client Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="alexander@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  style={{
                    background: "var(--bg-card-subtle)",
                    borderColor: "var(--border)",
                    color: "var(--text-main)",
                  }}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-main)" }}>
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-[11px] font-medium text-accent hover:underline"
                >
                  Need access?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  style={{
                    background: "var(--bg-card-subtle)",
                    borderColor: "var(--border)",
                    color: "var(--text-main)",
                  }}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full justify-center text-xs py-2.5 mt-2"
            >
              {submitting ? "Signing In..." : "Access Project Portal"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Client Auto-Fill */}
          <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: "var(--border-subtle)" }}>
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:border-amber-400 text-amber-700 dark:text-amber-300"
              style={{
                background: "rgba(245, 158, 11, 0.08)",
                borderColor: "rgba(245, 158, 11, 0.25)",
              }}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Fill Demo Client (client@demo.com)</span>
            </button>
          </div>
        </div>

        {/* Security & Private Access Notice */}
        <div className="flex items-start gap-2.5 p-4 rounded-xl border text-xs" style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}>
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p style={{ color: "var(--text-muted)" }}>
            <strong>Private Workspace:</strong> Public registration is disabled. Access credentials are generated automatically by our project leads upon contract kickoff.
          </p>
        </div>

      </div>
    </div>
  );
}
