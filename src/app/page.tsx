import React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { AgencyChannelsBar } from "@/components/common/AgencyChannelsBar";
import { AGENCY_CONFIG } from "@/config/agency";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Smartphone,
  Server,
  Zap,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";

export const revalidate = 30;

const techStack = [
  { name: "Laravel 12",         sub: "Backend REST API",      icon: "⚙" },
  { name: "Next.js 15",         sub: "App Router & SSR",      icon: "▲" },
  { name: "Flutter",            sub: "Android & iOS Apps",     icon: "◈" },
  { name: "Laravel Reverb",     sub: "Real-time WebSocket",   icon: "⚡" },
  { name: "MySQL / Postgres",   sub: "Relational Storage",    icon: "◧" },
  { name: "Stripe & Gateways",  sub: "Payment Systems",       icon: "◎" },
  { name: "Tailwind CSS",       sub: "Design System",         icon: "◈" },
  { name: "Sanctum & JWT",      sub: "Authentication",        icon: "⬡" },
];

const platformFilters = [
  { label: "All Products",   href: "/products",             icon: Layers },
  { label: "Web Apps",       href: "/products?type=web_app", icon: Code2 },
  { label: "Android Apps",   href: "/products?type=android", icon: Smartphone },
  { label: "Custom Systems", href: "/products?type=custom",  icon: Server },
];

export default async function HomePage() {
  const { data: products } = await fetchProducts({ perPage: 6 });

  return (
    <div>
      {/* Top Marketplace / WhatsApp Direct Hiring Bar */}
      <AgencyChannelsBar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container py-14 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — headline + CTA */}
            <div>
              <div className="badge-accent mb-4">
                <Zap className="w-3 h-3" />
                Team Portfolio & Custom Software Agency
              </div>

              <h1 className="heading-xl mb-4" style={{ color: "var(--text-main)" }}>
                Software & Apps built
                <br />
                <span className="text-gradient">for real-world businesses.</span>
              </h1>

              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)", maxWidth: "460px" }}>
                Explore our catalog of production-ready Web Apps, Flutter & Mobile Apps, 
                and SaaS platforms. <strong>Need a custom app from scratch or want to rebuild/customize 
                any of our existing projects for your brand?</strong> Hire our specialized team today.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Link href="/products" className="btn btn-primary">
                  Browse Software Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/request-quote" className="btn btn-secondary">
                  Request Custom Build
                </Link>
              </div>

              {/* Direct Marketplace / Quick Chat Action */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={AGENCY_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Direct WhatsApp Chat</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href={AGENCY_CONFIG.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1dbf73] hover:underline"
                >
                  <span>Order on Fiverr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-x-7 gap-y-3 mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                {[
                  { value: "50+",   label: "Projects Delivered" },
                  { value: "100%",  label: "Live Demos" },
                  { value: "Web & Mobile", label: "Cross-Platform" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-base font-bold" style={{ color: "var(--text-main)" }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual Service Offering Cards */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {[
                { icon: "🌐", title: "Custom Web Apps",  sub: "Next.js · Laravel · React",   color: "#2563eb" },
                { icon: "📱", title: "Flutter Mobile",    sub: "Android & iOS Single Codebase", color: "#16a34a" },
                { icon: "🔄", title: "Rebuild & Reskin", sub: "Customize Existing Projects", color: "#9333ea" },
                { icon: "⚙️", title: "REST APIs & SaaS", sub: "High-throughput Microservices", color: "#d97706" },
                { icon: "👥", title: "Dedicated Team",   sub: "Frontend · Backend · Mobile", color: "#0891b2" },
                { icon: "💬", title: "Live Tracking",    sub: "Private Client Project Portal", color: "#dc2626" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border p-4 flex items-start gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    cursor: "default",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                      {item.title}
                    </div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-faint)" }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW WE WORK WITH CLIENTS ─────────────────────────────────────────── */}
      <section className="section-sm border-b" style={{ borderColor: "var(--border)", background: "var(--bg-section)" }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1: Custom App from scratch */}
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-main)" }}>
                  1. Build a Brand New App
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Have an innovative startup or business idea? We design UI/UX, write scalable backend code, build mobile apps, and deploy to live servers and app stores.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <Link href="/request-quote" className="text-xs font-semibold text-accent inline-flex items-center gap-1 hover:underline">
                  Get Project Estimation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Rebuild & Customize Showcased App */}
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-main)" }}>
                  2. Rebuild & Customize an App
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Like any software from our showcase? We can re-brand it with your logo, color palette, custom features, and payment gateways for a fast launch.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <Link href="/products" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline">
                  Browse Catalog to Rebuild <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Hire Specialized Team */}
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(139, 92, 246, 0.12)", color: "#8b5cf6" }}
                >
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-main)" }}>
                  3. Hire Dedicated Engineers
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Need expert Flutter, Laravel, React, or Java developers to augment your team? Hire our developers with flexible hourly, milestone, or contract billing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <Link href="/team" className="text-xs font-semibold text-purple-600 dark:text-purple-400 inline-flex items-center gap-1 hover:underline">
                  Meet the Developers <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="label-overline mb-2">Software Catalog & Portfolio</p>
              <h2 className="heading-lg" style={{ color: "var(--text-main)" }}>
                Featured Software Built by Our Team
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Test interactive live demos, download Android APKs, and request custom modifications.
              </p>
            </div>

            {/* Platform filter pills */}
            <div className="flex flex-wrap gap-2">
              {platformFilters.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="btn btn-ghost text-xs py-1.5 px-3"
                  style={{ fontSize: "0.75rem" }}
                >
                  <f.icon className="w-3.5 h-3.5" />
                  {f.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Product grid */}
          {products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="/products" className="btn btn-secondary">
                  View All Products & Apps
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div
              className="rounded-xl border p-16 text-center"
              style={{ borderColor: "var(--border)", background: "var(--bg-section)" }}
            >
              <Layers className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--text-faint)" }} />
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-main)" }}>No products yet</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Add products via the admin dashboard to see them listed here.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────────── */}
      <section className="section bg-section">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="label-overline mb-2">Technology & Engineering</p>
            <h2 className="heading-lg" style={{ color: "var(--text-main)" }}>
              Built on Modern Enterprise Stack
            </h2>
            <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
              Every solution is architected with production-grade tooling, clean separation of concerns, and full source code ownership.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {techStack.map((t, i) => (
              <div
                key={i}
                className="card p-4 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 font-mono"
                  style={{
                    background: "var(--accent-muted)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  {t.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                    {t.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM PROJECT ESTIMATOR & CTA ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="rounded-2xl border p-10 md:p-14"
            style={{
              background: "var(--bg-section)",
              borderColor: "var(--border)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <div>
                <p className="label-overline mb-3">Custom Development & Orders</p>
                <h2 className="heading-lg mb-4" style={{ color: "var(--text-main)" }}>
                  Have an app or project idea?
                </h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  Whether you want to build a brand new mobile app, SaaS platform, or want to customize any of our showcased software for your company — we provide end-to-end engineering.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Full source code ownership & clean architecture",
                    "Hire via Fiverr, Upwork, or Direct Contract",
                    "Private client project portal with live progress updates",
                    "Free initial consultation & detailed estimation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-7"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <h3 className="heading-md mb-2" style={{ color: "var(--text-main)" }}>
                  Start Your Project
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  Select your platform and features to get an instant preliminary quote, or contact us directly on WhatsApp / Fiverr.
                </p>
                
                <div className="space-y-2.5">
                  <Link href="/request-quote" className="btn btn-primary w-full justify-center">
                    Open Project Estimator
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <a
                    href={AGENCY_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full justify-center text-xs font-semibold"
                    style={{ background: "#25D366", color: "#fff" }}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Quick Chat on WhatsApp
                  </a>

                  <a
                    href={AGENCY_CONFIG.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full justify-center text-xs font-semibold"
                    style={{ background: "#1dbf73", color: "#fff" }}
                  >
                    Order via Fiverr Marketplace
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
