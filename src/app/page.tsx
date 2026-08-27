import React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 30; // 30 seconds ISR

export default async function HomePage() {
  const { data: products } = await fetchProducts({ perPage: 8 });

  const techStackIcons = [
    { name: "Laravel 12", role: "Backend Microservice" },
    { name: "Next.js 15", role: "App Router & SSR" },
    { name: "Tailwind CSS", role: "Design System" },
    { name: "Laravel Reverb", role: "Real-time WebSockets" },
    { name: "Flutter", role: "Cross-Platform Mobile" },
    { name: "MySQL / Postgres", role: "Relational Storage" },
    { name: "Stripe & SSLCommerz", role: "Payment Gateways" },
    { name: "Sanctum & JWT", role: "Multi-Channel Auth" },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-400 text-xs font-bold tracking-wide backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Production-Ready Software & SaaS Showcase</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Build, Deploy & Scale with <span className="text-gradient">Modern Software</span> Architectures.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our curated catalog of web apps, mobile solutions (Android APK & iOS TestFlight), SaaS tools, and headless microservices with live interactive sandbox demos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-primary font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
            >
              <span>Explore All Software</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/request-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Cpu className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>Request Custom Engineering</span>
            </Link>
          </div>

          {/* Platform Stat Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/5 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Live Interactive Demos</div>
            </div>
            <div className="glass-panel p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/5 text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-cyan-400">Web & Mobile</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Cross-Platform Ready</div>
            </div>
            <div className="glass-panel p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/5 text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">&lt; 100ms</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">WebSocket Reverb Speed</div>
            </div>
            <div className="glass-panel p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/5 text-center">
              <div className="text-2xl font-black text-indigo-600 dark:text-violet-400">Headless</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">REST API Microservice</div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FEATURED SOFTWARE SHOWCASE                                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Featured Catalog
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Popular Software & Ready-Made Suites
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products?type=web_app"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-400/40 transition-all shadow-xs"
            >
              Web Apps
            </Link>
            <Link
              href="/products?type=android"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-400/40 transition-all shadow-xs"
            >
              Android APKs
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/20 hover:bg-blue-100 transition-all flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-3xl p-8">
            <Layers className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Please add products via the Laravel Admin Dashboard (`/admin/products`) to see them appear live here.
            </p>
          </div>
        )}

      </section>


      {/* ========================================================================= */}
      {/* TECH STACK ECOSYSTEM                                                      */}
      {/* ========================================================================= */}
      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-100/60 dark:bg-slate-950/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              Battle-Tested Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Built on Modern Enterprise Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStackIcons.map((tech, i) => (
              <div
                key={i}
                className="glass-panel p-4.5 rounded-2xl border border-slate-200/80 dark:border-white/5 hover:border-blue-400/40 dark:hover:border-cyan-500/30 transition-all flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 flex items-center justify-center text-blue-700 dark:text-cyan-400 shrink-0 font-mono font-bold text-xs">
                  #
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* CUSTOM PROJECT ESTIMATOR & CTA                                            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-blue-300/40 dark:border-cyan-500/30 p-8 sm:p-14 bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/70 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-800 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Need a Tailored Solution?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Have a unique product idea or need customization?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We provide end-to-end custom development — from initial UI/UX prototypes to backend microservices, real-time WebSocket integrations, and mobile app store releases.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Full source code ownership & clean modular architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Integrated API authentication & multi-channel notifications</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Free initial consultation & detailed project timeline estimation</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Launch Your Custom Build</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use our interactive project estimator to select features, platforms, and receive an instant preliminary quote.
              </p>

              <Link
                href="/request-quote"
                className="w-full py-3.5 rounded-xl btn-primary font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Open Project Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
