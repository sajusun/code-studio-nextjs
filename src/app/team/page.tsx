import React from "react";
import Link from "next/link";
import { fetchDevelopers, fetchDeveloperRoles } from "@/lib/api";
import { Developer, DeveloperRole } from "@/types";
import {
  GitBranch,
  Globe,
  Code2,
  Users,
  Sparkles,
  ArrowRight,
  Star,
  Briefcase,
  Filter,
} from "lucide-react";

// Inline SVG brand icons (lucide-react v1 removed brand icons)
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Helper: initials avatar ────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ── Helper: gradient per role color ───────────────────────────────────────────
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "99,102,241";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

// ── DeveloperCard ─────────────────────────────────────────────────────────────
function DeveloperCard({ dev }: { dev: Developer }) {
  const primaryRole = dev.roles[0];
  const primaryColor = primaryRole?.color ?? "#6366f1";
  const rgb = hexToRgb(primaryColor);

  return (
    <div
      className="glass-card rounded-3xl overflow-hidden group relative flex flex-col"
      style={{ "--card-accent": primaryColor, "--card-rgb": rgb } as React.CSSProperties}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
      />

      {/* Card Header — Avatar + basic info */}
      <div className="p-6 pb-4 flex items-start gap-4">
        {/* Avatar */}
        <Link href={`/team/${dev.slug}`} className="relative shrink-0 group/avatar">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover/avatar:scale-105"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}88)`,
              boxShadow: `0 8px 24px -4px rgba(${rgb},0.4)`,
            }}
          >
            {getInitials(dev.name)}
          </div>
          {/* Online dot */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 shadow" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/team/${dev.slug}`} className="block group/name">
            <h3 className="font-bold text-base text-slate-900 dark:text-white truncate group-hover/name:text-accent transition-colors">
              {dev.name}
            </h3>
          </Link>
          {/* Experience badge */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <Briefcase className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {dev.experience_years}+ yrs experience
            </span>
          </div>
          {/* Role badges */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {dev.roles.slice(0, 2).map((role) => (
              <span
                key={role.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold"
                style={{
                  backgroundColor: `${role.color}18`,
                  color: role.color,
                  border: `1px solid ${role.color}30`,
                }}
              >
                {role.name}
              </span>
            ))}
            {dev.roles.length > 2 && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-500">
                +{dev.roles.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {dev.bio && (
        <div className="px-6 pb-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {dev.bio}
          </p>
        </div>
      )}

      {/* Skills chips */}
      {dev.skills && dev.skills.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {dev.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/8"
              >
                {skill}
              </span>
            ))}
            {dev.skills.length > 6 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-400">
                +{dev.skills.length - 6}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Profile link + Social links footer */}
      <div
        className="px-6 py-3.5 border-t flex items-center justify-between"
        style={{ borderColor: `${primaryColor}18` }}
      >
        <Link
          href={`/team/${dev.slug}`}
          className="text-xs font-semibold text-accent inline-flex items-center gap-1 hover:underline"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <div className="flex items-center gap-1.5">
          {dev.github_url && (
            <a
              href={dev.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label={`${dev.name} GitHub`}
            >
              <GitBranch className="w-3 h-3" />
            </a>
          )}
          {dev.linkedin_url && (
            <a
              href={dev.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              aria-label={`${dev.name} LinkedIn`}
            >
              <LinkedinIcon className="w-3 h-3" />
            </a>
          )}
          {dev.portfolio_url && (
            <a
              href={dev.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all"
              aria-label={`${dev.name} Portfolio`}
            >
              <Globe className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Role Filter Tab ───────────────────────────────────────────────────────────
function RoleFilterTab({
  role,
  active,
}: {
  role: DeveloperRole;
  active: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
        active
          ? "text-white border-transparent shadow-lg"
          : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/15"
      }`}
      style={
        active
          ? {
              backgroundColor: role.color,
              boxShadow: `0 4px 14px -2px ${role.color}55`,
            }
          : {}
      }
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: active ? "rgba(255,255,255,0.7)" : role.color }}
      />
      {role.name}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export const metadata = {
  title: "Our Team — CodeStudio",
  description:
    "Meet the talented developers behind CodeStudio. Frontend, Backend, Flutter, Android, iOS, Java and more.",
};

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const activeRole = params.role ?? "all";

  // Parallel fetch
  const [developersRes, rolesRes] = await Promise.all([
    fetchDevelopers({ role: activeRole === "all" ? undefined : activeRole }),
    fetchDeveloperRoles(),
  ]);

  const developers: Developer[] = developersRes.data ?? [];
  const roles: DeveloperRole[] = rolesRes.data ?? [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06] dark:opacity-[0.08] blur-3xl pointer-events-none"
          style={{ background: "var(--accent-gradient)" }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-[0.04] dark:opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: "var(--accent-gradient)" }} />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
            style={{
              background: "var(--accent-badge-bg)",
              color: "var(--accent-primary)",
              border: "1px solid var(--accent-badge-bg)",
            }}>
            <Users className="w-3.5 h-3.5" />
            <span>Meet The Team</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            The Minds Behind{" "}
            <span className="text-gradient">CodeStudio</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A team of passionate engineers, designers, and developers building
            world-class software solutions across every platform.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              { label: "Developers", value: `${developers.length}+` },
              { label: "Specializations", value: `${roles.length}+` },
              { label: "Projects Shipped", value: "50+" },
              { label: "Countries Served", value: "12+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-gradient">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {/* All tab */}
            <Link href="/team">
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeRole === "all"
                  ? "btn-primary border-transparent"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/15"
              }`}>
                <Code2 className="w-3.5 h-3.5" />
                All Developers
              </span>
            </Link>
            {roles.map((role) => (
              <Link
                key={role.id}
                href={`/team?role=${role.slug}`}
              >
                <RoleFilterTab role={role} active={activeRole === role.slug} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developer Grid ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {developers.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: "var(--accent-badge-bg)" }}>
                <Users className="w-9 h-9" style={{ color: "var(--accent-primary)" }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No developers found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                No developers match this filter yet. Try a different specialization.
              </p>
              <Link href="/team" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold">
                View All Developers
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-5">
                Showing <span className="font-bold text-slate-700 dark:text-slate-200">{developers.length}</span> developer{developers.length !== 1 ? "s" : ""}
                {activeRole !== "all" && (
                  <span> · <Link href="/team" className="hover:underline" style={{ color: "var(--accent-primary)" }}>Clear filter</Link></span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {developers.map((dev) => (
                  <DeveloperCard key={dev.id} dev={dev} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
              style={{ background: "var(--accent-gradient)" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ background: "var(--accent-badge-bg)", color: "var(--accent-primary)" }}>
                <Sparkles className="w-3.5 h-3.5" />
                Work With Us
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
                Need a Custom Software Solution?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-7">
                Our team is ready to build your next web app, mobile app, or full-stack platform.
                Get a free consultation and quote today.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary font-bold text-sm shadow-xl"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white dark:bg-white/8 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
