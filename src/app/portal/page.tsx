"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useClientAuth } from "@/context/ClientAuthContext";
import { fetchClientProjects } from "@/lib/api";
import { ClientProject } from "@/types";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Globe,
  Layers,
  Code2,
  Calendar,
} from "lucide-react";

export default function ClientPortalDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, logout } = useClientAuth();

  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/portal/login");
      return;
    }

    if (token) {
      fetchClientProjects(token).then((res) => {
        if (res && res.data) {
          setProjects(res.data);
        }
        setLoadingProjects(false);
      });
    }
  }, [isAuthenticated, isLoading, router, token]);

  if (isLoading || loadingProjects) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading your project workspace...</p>
        </div>
      </div>
    );
  }

  const activeCount = projects.filter((p) => ["discovery", "in_progress", "review"].includes(p.status)).length;
  const avgProgress = projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress_percent, 0) / projects.length) : 0;
  const totalMilestones = projects.reduce((acc, p) => acc + (p.milestones_count || 0), 0);
  const completedMilestones = projects.reduce((acc, p) => acc + (p.completed_milestones || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return { label: "In Active Development", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" };
      case "review":
        return { label: "In Staging Review", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
      case "completed":
        return { label: "Production Released", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
      default:
        return { label: status.toUpperCase(), color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20" };
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container space-y-8">

        {/* ── Client Welcome Header ────────────────────────────────────────── */}
        <div className="card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-accent uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Client Portal Workspace
            </div>
            <h1 className="heading-lg text-2xl font-bold" style={{ color: "var(--text-main)" }}>
              Welcome back, {user?.name || "Client"} 👋
            </h1>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Account: <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{user?.email}</span> • Direct project tracking & live updates
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/request-quote" className="btn btn-secondary text-xs py-2 px-3.5">
              + New Custom Scope
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/portal/login");
              }}
              className="btn btn-ghost text-xs py-2 px-3 flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Key Metrics Bar ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4.5 rounded-xl space-y-1">
            <div className="text-xs font-semibold text-slate-400">Active Builds</div>
            <div className="text-2xl font-black text-accent">{activeCount}</div>
            <div className="text-[11px] text-slate-500">In engineering pipeline</div>
          </div>

          <div className="card p-4.5 rounded-xl space-y-1">
            <div className="text-xs font-semibold text-slate-400">Average Completion</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgProgress}%</div>
            <div className="text-[11px] text-slate-500">Across all active contracts</div>
          </div>

          <div className="card p-4.5 rounded-xl space-y-1">
            <div className="text-xs font-semibold text-slate-400">Milestones Done</div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {completedMilestones} / {totalMilestones}
            </div>
            <div className="text-[11px] text-slate-500">Verification phases signed off</div>
          </div>

          <div className="card p-4.5 rounded-xl space-y-1">
            <div className="text-xs font-semibold text-slate-400">Engineering Desk</div>
            <div className="text-2xl font-black text-emerald-500 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              Live
            </div>
            <div className="text-[11px] text-slate-500">WebSocket live sync active</div>
          </div>
        </div>

        {/* ── Projects List ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-md text-lg font-bold" style={{ color: "var(--text-main)" }}>
                Your Assigned Projects
              </h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Click any project to view milestones checklist, live staging URLs, and communicate with engineers.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}>
              {projects.length} Project{projects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((proj) => {
                const badge = getStatusBadge(proj.status);

                return (
                  <div
                    key={proj.id}
                    className="card p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all hover:border-blue-400 hover:shadow-md group"
                  >
                    <div>
                      {/* Top Code & Status */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-accent px-2.5 py-0.5 rounded-md border" style={{ background: "var(--accent-muted)", borderColor: "var(--accent-border)" }}>
                          {proj.project_code}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/portal/projects/${proj.project_code}`}>
                        <h3 className="text-base font-bold group-hover:text-accent transition-colors" style={{ color: "var(--text-main)" }}>
                          {proj.title}
                        </h3>
                      </Link>

                      <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {proj.description || "Custom enterprise software development."}
                      </p>

                      {/* Platform & Delivery info */}
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t text-xs" style={{ borderColor: "var(--border-subtle)" }}>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Platform Stack</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300 truncate block">
                            {proj.platform || "Web & Mobile"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Target Deadline</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-accent" />
                            {proj.delivery_deadline || "In Schedule"}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 mt-4">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span style={{ color: "var(--text-muted)" }}>Development Progress</span>
                          <span className="text-accent font-bold">{proj.progress_percent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${proj.progress_percent}%`,
                              background: "var(--accent-gradient)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Assigned Engineers Avatars */}
                      {proj.developers && proj.developers.length > 0 && (
                        <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
                          <span className="text-[11px] text-slate-400 font-medium">Assigned Team:</span>
                          <div className="flex items-center -space-x-2">
                            {proj.developers.map((dev) => (
                              <div
                                key={dev.id}
                                title={`${dev.name} (${dev.role_in_project})`}
                                className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white font-bold text-[10px]"
                                style={{ background: dev.primary_color || "#2563eb" }}
                              >
                                {dev.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="pt-2">
                      <Link
                        href={`/portal/projects/${proj.project_code}`}
                        className="btn btn-primary w-full justify-center text-xs py-2.5"
                      >
                        <span>Open Project Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card p-12 text-center rounded-2xl space-y-3" style={{ background: "var(--bg-section)" }}>
              <Layers className="w-10 h-10 mx-auto text-slate-400" />
              <h3 className="text-sm font-bold" style={{ color: "var(--text-main)" }}>No projects initialized yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Once our engineering team finalizes your scope on Fiverr, WhatsApp, or Contact Desk, your project will appear here.
              </p>
              <Link href="/request-quote" className="btn btn-primary text-xs py-2 px-4 inline-flex mt-2">
                Submit Project Scope
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
