"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClientAuth } from "@/context/ClientAuthContext";
import { fetchClientProjectDetails, sendClientProjectMessage } from "@/lib/api";
import { getEcho } from "@/lib/echo";
import { ClientProject, ProjectMessage } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  GitBranch,
  Globe,
  Layers,
  MessageCircle,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  AlertCircle,
  Code2,
} from "lucide-react";

export default function SingleProjectPortalPage() {
  const params = useParams();
  const code = params?.code as string;
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useClientAuth();

  const [project, setProject] = useState<ClientProject | null>(null);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load project details
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/portal/login");
      return;
    }

    if (token && code) {
      fetchClientProjectDetails(token, code).then((res) => {
        if (res && res.data) {
          setProject(res.data);
          setMessages(res.data.messages || []);
        }
        setLoadingData(false);
      });
    }
  }, [code, isAuthenticated, isLoading, router, token]);

  // Laravel Reverb WebSockets Real-Time Listener
  useEffect(() => {
    if (!project?.id) return;

    const echo = getEcho();
    if (!echo) return;

    const channel = echo.channel(`project.${project.id}`);
    channel.listen(".project.message", (e: ProjectMessage) => {
      setMessages((prev) => {
        // Prevent duplicate if this message or its content is already present
        const exists = prev.some((m) => m.id === e.id || (m.message === e.message && m.sender_name === e.sender_name && Date.now() - new Date(m.created_at).getTime() < 10000));
        if (exists) return prev;
        return [e, ...prev];
      });
    });

    return () => {
      echo.leaveChannel(`project.${project.id}`);
    };
  }, [project?.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !project || !token) return;

    const text = newMessage.trim();
    setNewMessage("");
    setSending(true);

    const tempId = Date.now();
    const tempMsg: ProjectMessage = {
      id: tempId,
      sender_type: "client",
      sender_name: "Alexander Wright",
      message: text,
      created_at: new Date().toISOString(),
      time: "Just now",
    };
    setMessages((prev) => [tempMsg, ...prev]);

    try {
      const res = await sendClientProjectMessage(token, project.id, text);
      if (res && res.data) {
        setMessages((prev) => prev.map((m) => (m.id === tempId ? res.data : m)));
      }
    } catch (err) {
      console.error("Message send error:", err);
    } finally {
      setSending(false);
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Loading project workspace...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-20 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold" style={{ color: "var(--text-main)" }}>Project Not Found</h2>
        <p className="text-xs text-slate-400">The requested project code does not exist or you do not have permission to view it.</p>
        <Link href="/portal" className="btn btn-primary text-xs py-2 px-4 inline-flex">
          Back to Portal
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return { label: "In Active Engineering", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" };
      case "review":
        return { label: "Staging Client Review", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
      case "completed":
        return { label: "Completed & Released", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
      default:
        return { label: status.toUpperCase(), color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20" };
    }
  };

  const badge = getStatusBadge(project.status);

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">

        {/* ── Top Navigation & Project Badge ───────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Projects
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-md border" style={{ background: "var(--accent-muted)", borderColor: "var(--accent-border)" }}>
              {project.project_code}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        </div>

        {/* ── Project Header Summary Card ─────────────────────────────────── */}
        <div className="card p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                {project.platform || "Custom Full-Stack Build"}
              </span>
              <h1 className="heading-md text-xl sm:text-2xl font-bold" style={{ color: "var(--text-main)" }}>
                {project.title}
              </h1>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 lg:text-right shrink-0">
              {project.budget && (
                <div className="p-3 rounded-xl border min-w-[120px]" style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Budget</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white">
                    {formatCurrency(project.budget)} {project.currency}
                  </div>
                </div>
              )}
              {project.delivery_deadline && (
                <div className="p-3 rounded-xl border min-w-[120px]" style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Target Delivery</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {project.delivery_deadline}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5" style={{ color: "var(--text-main)" }}>
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Overall Completion
              </span>
              <span className="text-accent font-bold text-sm">{project.progress_percent}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${project.progress_percent}%`,
                  background: "var(--accent-gradient)",
                }}
              />
            </div>
          </div>

          {/* Deliverables Quick Access Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {project.staging_url && (
              <a
                href={project.staging_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>Open Staging Preview ↗</span>
              </a>
            )}

            {project.apk_build_url && (
              <a
                href={project.apk_build_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Android APK</span>
              </a>
            )}

            {project.figma_url && (
              <a
                href={project.figma_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-purple-600 dark:text-purple-400"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Figma Designs ↗</span>
              </a>
            )}

            {project.github_repo_url && (
              <a
                href={project.github_repo_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Source Code Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* ── Main Two Column Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Milestones & Architecture Roadmap (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Milestones Card */}
            <div className="card p-6 sm:p-7 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="heading-md text-base font-bold flex items-center gap-2" style={{ color: "var(--text-main)" }}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Project Milestones & Verification Phases</span>
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Track deliverables step-by-step from UI design to production store release.
                  </p>
                </div>
              </div>

              {project.milestones && project.milestones.length > 0 ? (
                <div className="space-y-4 pt-2">
                  {project.milestones.map((milestone, idx) => {
                    const isCompleted = milestone.status === "completed";
                    const isInProgress = milestone.status === "in_progress";

                    return (
                      <div
                        key={milestone.id}
                        className="p-4 rounded-xl border flex items-start gap-3.5 transition-all"
                        style={{
                          background: isCompleted ? "rgba(16, 185, 129, 0.04)" : (isInProgress ? "rgba(37, 99, 235, 0.04)" : "var(--bg-section)"),
                          borderColor: isCompleted ? "rgba(16, 185, 129, 0.25)" : (isInProgress ? "rgba(37, 99, 235, 0.25)" : "var(--border)"),
                        }}
                      >
                        {/* Step indicator */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            background: isCompleted ? "#10b981" : (isInProgress ? "var(--accent)" : "var(--border)"),
                            color: isCompleted || isInProgress ? "#fff" : "var(--text-muted)",
                          }}
                        >
                          {isCompleted ? "✓" : idx + 1}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-xs font-bold truncate" style={{ color: "var(--text-main)" }}>
                              {milestone.title}
                            </h4>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                              style={{
                                background: isCompleted ? "rgba(16, 185, 129, 0.15)" : (isInProgress ? "rgba(37, 99, 235, 0.15)" : "rgba(148, 163, 184, 0.15)"),
                                color: isCompleted ? "#059669" : (isInProgress ? "var(--accent)" : "#64748b"),
                              }}
                            >
                              {isCompleted ? "Completed" : (isInProgress ? "In Progress" : "Pending")}
                            </span>
                          </div>

                          {milestone.description && (
                            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                              {milestone.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                            {milestone.due_date && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Due: {milestone.due_date}
                              </span>
                            )}
                            {milestone.completed_at && (
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                Signed off on {milestone.completed_at}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  No milestones configured yet for this project.
                </div>
              )}
            </div>

            {/* Architecture Notes */}
            {project.notes && (
              <div className="card p-6 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
                  Custom Requirements & Scope Notes
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.notes}
                </p>
              </div>
            )}

          </div>

          {/* Right: Assigned Engineers & Real-Time Live Message Board (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Assigned Engineers Card */}
            <div className="card p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--text-main)" }}>
                  <Users className="w-4 h-4 text-accent" />
                  <span>Assigned Engineering Team</span>
                </h3>
              </div>

              {project.developers && project.developers.length > 0 ? (
                <div className="space-y-2.5">
                  {project.developers.map((dev) => (
                    <div
                      key={dev.id}
                      className="p-3 rounded-xl border flex items-center justify-between gap-3"
                      style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                          style={{ background: dev.primary_color || "var(--accent)" }}
                        >
                          {dev.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold truncate" style={{ color: "var(--text-main)" }}>
                            {dev.name}
                          </h4>
                          <p className="text-[10px] font-semibold text-accent truncate">
                            {dev.role_in_project}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/team/${dev.slug}`}
                        className="text-[11px] font-semibold text-slate-400 hover:text-accent hover:underline shrink-0"
                      >
                        Profile ↗
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Team assignment in progress.</p>
              )}
            </div>

            {/* Real-time Project Activity & Messages */}
            <div className="card p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--text-main)" }}>
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span>Live Project Message Board</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Direct sync with engineering desk</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Message List */}
              <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => {
                    const isClient = msg.sender_type === "client";
                    const isSystem = msg.sender_type === "system";

                    return (
                      <div
                        key={`${msg.id || idx}-${msg.created_at}`}
                        className={`p-3 rounded-xl text-xs space-y-1 ${
                          isClient
                            ? "border ml-4"
                            : isSystem
                            ? "border border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-300"
                            : "border mr-4"
                        }`}
                        style={{
                          background: isClient ? "var(--accent-muted)" : (isSystem ? undefined : "var(--bg-section)"),
                          borderColor: isClient ? "var(--accent-border)" : (isSystem ? undefined : "var(--border)"),
                        }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span style={{ color: isClient ? "var(--accent)" : "var(--text-main)" }}>
                            {msg.sender_name}
                          </span>
                          <span className="text-slate-400 font-normal">{msg.time || "Recent"}</span>
                        </div>
                        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {msg.message}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No messages yet. Send an update or question below.
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Send Message Form */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t space-y-2" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border rounded-xl p-1 focus-within:border-blue-500 transition-all" style={{ borderColor: "var(--border)" }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type an update or question for team..."
                    className="w-full bg-transparent px-3 py-1.5 text-xs focus:outline-none"
                    style={{ color: "var(--text-main)" }}
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="btn btn-primary p-2 text-white disabled:opacity-40"
                    style={{ borderRadius: "8px" }}
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
