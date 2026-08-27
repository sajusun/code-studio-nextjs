import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchDeveloperBySlug } from "@/lib/api";
import { Developer, DeveloperProductSummary } from "@/types";
import { formatCurrency, getPlatformBadge, getSafeImageUrl } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Globe,
  GitBranch,
  Star,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Code2,
  Layers,
} from "lucide-react";

export const revalidate = 30;

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetchDeveloperBySlug(slug);
  if (!res || !res.data) {
    return { title: "Developer Profile — CodeStudio" };
  }
  const dev = res.data;
  return {
    title: `${dev.name} — Developer Profile & Portfolio | CodeStudio`,
    description: dev.bio || `${dev.name} is a software engineer specializing in ${dev.roles?.map(r => r.name).join(", ")}.`,
  };
}

export default async function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetchDeveloperBySlug(slug);

  if (!res || !res.data) {
    notFound();
  }

  const dev: Developer = res.data;
  const primaryRole = dev.roles?.[0];
  const primaryColor = primaryRole?.color ?? "#2563eb";
  const products: DeveloperProductSummary[] = dev.products ?? [];

  return (
    <div className="min-h-screen py-10">
      <div className="container space-y-10">

        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Developers
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Available for Contracts</span>
          </div>
        </div>

        {/* Developer Header Hero Card */}
        <div className="card p-8 md:p-10 rounded-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 pointer-events-none blur-3xl"
            style={{ background: primaryColor }}
          />

          <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
            {/* Avatar & Roles (4 Cols) */}
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}99)`,
                }}
              >
                {getInitials(dev.name)}
              </div>

              <div>
                <h1 className="heading-md text-xl sm:text-2xl" style={{ color: "var(--text-main)" }}>
                  {dev.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {dev.experience_years}+ Years Professional Experience
                  </span>
                </div>

                {/* Role Badges */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mt-3">
                  {dev.roles?.map((role) => (
                    <span
                      key={role.id}
                      className="px-2.5 py-1 rounded-md text-xs font-bold"
                      style={{
                        backgroundColor: `${role.color}15`,
                        color: role.color,
                        border: `1px solid ${role.color}30`,
                      }}
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 pt-2">
                {dev.github_url && (
                  <a
                    href={dev.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center border hover:border-blue-400 transition-all"
                    style={{ background: "var(--bg-card-subtle)", borderColor: "var(--border)" }}
                    aria-label="GitHub Profile"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                )}
                {dev.linkedin_url && (
                  <a
                    href={dev.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center border hover:border-blue-400 transition-all text-blue-600"
                    style={{ background: "var(--bg-card-subtle)", borderColor: "var(--border)" }}
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {dev.portfolio_url && (
                  <a
                    href={dev.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center border hover:border-blue-400 transition-all"
                    style={{ background: "var(--bg-card-subtle)", borderColor: "var(--border)" }}
                    aria-label="Personal Portfolio"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {dev.twitter_url && (
                  <a
                    href={dev.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center border hover:border-blue-400 transition-all"
                    style={{ background: "var(--bg-card-subtle)", borderColor: "var(--border)" }}
                    aria-label="Twitter/X Profile"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Bio, Skills, and Direct Hire Action (8 Cols) */}
            <div className="md:col-span-8 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>
                  About & Background
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {dev.bio || "Experienced software engineer dedicated to building scalable, high-performance web applications, mobile architectures, and APIs."}
                </p>
              </div>

              {/* Skills Matrix */}
              {dev.skills && dev.skills.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "var(--text-faint)" }}>
                    Specialized Tech Stack & Tools
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.map((skill) => (
                      <span key={skill} className="tag-code px-2.5 py-1 text-xs font-mono font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Hire Box */}
              <div
                className="p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}
              >
                <div>
                  <h4 className="text-sm font-bold" style={{ color: "var(--text-main)" }}>
                    Want {dev.name} to work on your project?
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Directly assign this developer for your upcoming software or mobile build.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/request-quote?developer=${encodeURIComponent(dev.name)}&id=${dev.id}`}
                    className="btn btn-primary text-xs py-2 px-4"
                  >
                    Hire {dev.name.split(" ")[0]}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={`https://wa.me/8801700000000?text=Hello%2C%20I%20would%20like%20to%20hire%20${encodeURIComponent(dev.name)}%20for%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-xs py-2 px-3 font-semibold"
                    style={{ background: "#25D366", color: "#fff" }}
                    title="Direct WhatsApp Chat"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── PRODUCTS BUILT BY THIS DEVELOPER ───────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-overline mb-1">Portfolio & Track Record</p>
              <h2 className="heading-lg text-2xl font-bold" style={{ color: "var(--text-main)" }}>
                Software & Apps Built by {dev.name}
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}>
              {products.length} Project{products.length !== 1 ? "s" : ""}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((prod) => {
                const badge = getPlatformBadge(prod.type);
                const thumbUrl = getSafeImageUrl(prod.thumbnail_url, prod.category);

                return (
                  <div key={prod.id} className="card group flex flex-col justify-between overflow-hidden">
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden" style={{ background: "var(--bg-card-subtle)" }}>
                      <Image
                        src={thumbUrl}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        unoptimized={thumbUrl.startsWith("http://")}
                      />
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm border ${badge.bg} ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 z-10">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold backdrop-blur-sm bg-black/75 text-white">
                          {formatCurrency(prod.price)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {prod.role_in_project && (
                          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-accent mb-1 uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            <span>Role: {prod.role_in_project}</span>
                          </div>
                        )}
                        <Link href={`/products/${prod.slug}`} className="block group-hover:text-accent transition-colors">
                          <h3 className="text-sm font-semibold line-clamp-1" style={{ color: "var(--text-main)" }}>
                            {prod.title}
                          </h3>
                        </Link>
                        <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {prod.short_description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="text-xs font-semibold text-accent inline-flex items-center gap-1 hover:underline"
                        >
                          View Project Details <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/request-quote?product=${encodeURIComponent(prod.title)}&developer=${encodeURIComponent(dev.name)}`}
                          className="text-xs font-semibold hover:underline"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Customize
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="card p-12 text-center rounded-2xl"
              style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}
            >
              <Layers className="w-10 h-10 mx-auto mb-3 text-slate-400" />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                No public projects assigned yet
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {dev.name} is currently working on custom client contracts.
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
