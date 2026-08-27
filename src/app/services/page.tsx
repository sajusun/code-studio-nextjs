import React from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Server,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "SaaS & Web App Engineering",
      desc: "Full-stack development using Next.js 15 App Router, React 19, and robust Laravel microservice backends with state-of-the-art UI/UX.",
      tags: ["Next.js 15", "Laravel 12", "Tailwind CSS", "TypeScript", "SSR / SEO"],
      features: [
        "Server-Side Rendering for maximum SEO",
        "Role-based multi-tenant authentication",
        "Automated billing & subscription flows",
      ],
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Mobile Apps",
      desc: "Native-feel Android and iOS applications with single codebase velocity. Direct APK distribution and TestFlight/AppStore pipeline.",
      tags: ["Flutter", "React Native", "Android APK", "iOS TestFlight", "Push FCM"],
      features: [
        "Offline caching & background synchronization",
        "Firebase Cloud Messaging push alerts",
        "Biometric security & hardware access",
      ],
    },
    {
      icon: Server,
      title: "Headless APIs & Microservices",
      desc: "High-throughput RESTful architecture, event-driven broadcasting via Laravel Reverb WebSockets, and third-party webhook integrations.",
      tags: ["RESTful API", "Reverb WebSockets", "Sanctum", "Redis Queues", "Docker"],
      features: [
        "Sub-100ms response time latency",
        "Multi-channel notification engine",
        "Complete OpenAPI / Postman specifications",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Payment Gateway Integrations",
      desc: "Secure checkout implementations supporting multi-currency global transactions and local payment processors.",
      tags: ["Stripe Checkout", "SSLCommerz", "PayPal", "Webhooks", "Idempotency"],
      features: [
        "Instant webhook transaction verification",
        "Automated PDF invoice generation",
        "PCI-DSS compliant tokenized card vaults",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Capabilities & Engineering Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Bespoke Software Engineering & SaaS Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          From concept to deployment, we build high-reliability software systems that solve complex business challenges and provide exceptional user experiences.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-400 flex items-center justify-center">
                <srv.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{srv.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{srv.desc}</p>

              <div className="pt-2 space-y-2.5">
                {srv.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap gap-1.5">
              {srv.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-300 font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-blue-300/50 dark:border-cyan-500/30 bg-gradient-to-r from-blue-50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/60 text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Ready to Architect Your Custom Project?</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
          Contact our team today to discuss technical requirements, architecture design, and timeline estimates.
        </p>
        <Link
          href="/request-quote"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl btn-primary font-black text-xs shadow-lg transition-all"
        >
          <span>Start Project Discussion</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
