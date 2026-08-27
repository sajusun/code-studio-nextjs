import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/api";
import { formatCurrency, getPlatformBadge, getSafeImageUrl } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import {
  ArrowLeft,
  ExternalLink,
  KeyRound,
  Download,
  CheckCircle2,
  Cpu,
  Layers,
  MessageSquare,
  Sparkles,
  MessageCircle,
  Users,
} from "lucide-react";

export const revalidate = 30;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await fetchProductBySlug(slug);

  if (!data || !data.product) {
    notFound();
  }

  const { product, related } = data;
  const badge = getPlatformBadge(product.type);
  const heroImage = getSafeImageUrl(product.thumbnail_url || product.thumbnail, product.category);
  const rawGallery = product.gallery_urls && product.gallery_urls.length > 0
    ? product.gallery_urls
    : [heroImage];
  const gallery = rawGallery.map((img) => getSafeImageUrl(img, product.category));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Main Grid: Left Gallery + Right Specs & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Gallery & Description (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Hero Image */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950 shadow-2xl">
            <Image
              src={heroImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
              unoptimized={heroImage.startsWith("http://")}
            />
          </div>

          {/* Gallery Thumbnails (if available) */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950 hover:border-blue-500 dark:hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                    unoptimized={img.startsWith("http://")}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description & Overview */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>Product Architecture & Features</span>
            </h2>

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4 font-medium">
              {product.description || product.short_description || "Comprehensive enterprise system built with modern best practices."}
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-6 border-t border-slate-200/80 dark:border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-cyan-400">
                  Included Capabilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Engineering Team Behind This App */}
          {product.developers && product.developers.length > 0 && (
            <div className="card p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-main)" }}>
                    <Users className="w-4 h-4 text-accent" />
                    <span>Engineers Behind This Project</span>
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Directly contact or hire the specialized developers who architected this software.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.developers.map((dev) => (
                  <Link
                    key={dev.id}
                    href={`/team/${dev.slug}`}
                    className="p-3.5 rounded-xl border flex items-center gap-3 transition-all hover:border-blue-400 hover:shadow-xs group"
                    style={{ background: "var(--bg-section)", borderColor: "var(--border)" }}
                  >
                    {/* Avatar Initials */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{
                        background: dev.roles?.[0]?.color ? `linear-gradient(135deg, ${dev.roles[0].color}, ${dev.roles[0].color}99)` : "var(--accent-gradient)",
                      }}
                    >
                      {dev.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate group-hover:text-accent transition-colors" style={{ color: "var(--text-main)" }}>
                        {dev.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-accent truncate">
                        {dev.role_in_project}
                      </p>
                      <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                        {dev.experience_years}+ yrs exp · View Profile →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live Demos, Credentials, Pricing & CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Action Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 sticky top-28">
            
            {/* Title & Price */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {product.category || "Software Offering"}
              </span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">{product.title}</h1>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(product.price)}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ Full License or Custom Build</span>
              </div>
            </div>

            {/* Live Demo Buttons */}
            <div className="space-y-3 pt-2">
              
              {product.demo_url && (
                <a
                  href={product.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl btn-primary font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Launch Live User Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {product.apk_url && (
                <a
                  href={product.apk_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Android APK Build</span>
                </a>
              )}

              {product.testflight_url && (
                <a
                  href={product.testflight_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-violet-50 dark:bg-violet-500/10 hover:bg-violet-100 dark:hover:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Join iOS TestFlight Beta</span>
                </a>
              )}

            </div>

            {/* Admin Demo Sandbox Credentials */}
            {(product.admin_demo_url || product.admin_demo_username) && (
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-950/80 border border-amber-300/60 dark:border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <KeyRound className="w-4 h-4" />
                  <span>Admin Panel Sandbox Access</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-amber-200 dark:border-white/5 px-3 py-2 rounded-lg text-slate-800 dark:text-slate-300">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-blue-700 dark:text-cyan-300 font-bold">{product.admin_demo_username || "admin@demo.com"}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-amber-200 dark:border-white/5 px-3 py-2 rounded-lg text-slate-800 dark:text-slate-300">
                    <span className="text-slate-500">Pass:</span>
                    <span className="text-blue-700 dark:text-cyan-300 font-bold">{product.admin_demo_password || "password"}</span>
                  </div>
                </div>

                {product.admin_demo_url && (
                  <a
                    href={product.admin_demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs font-bold text-amber-800 dark:text-amber-400 hover:underline pt-1"
                  >
                    Open Admin Demo URL ↗
                  </a>
                )}
              </div>
            )}

            {/* Tech Stack Pills */}
            {product.tech_stack && product.tech_stack.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization & Hiring Box */}
            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                background: "var(--bg-section)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-main)" }}>
                  Need This App Customized or Rebuilt?
                </h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We can customize this software with your logo, brand colors, custom payment gateways, and business logic.
              </p>

              <div className="space-y-2 pt-1">
                {/* Request Quote Button */}
                <Link
                  href={`/request-quote?product=${encodeURIComponent(product.title)}&id=${product.id}`}
                  className="btn btn-primary w-full justify-center text-xs py-2.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Customization Quote</span>
                </Link>

                {/* WhatsApp Direct Chat */}
                <a
                  href={`https://wa.me/8801700000000?text=Hello%2C%20I%20am%20interested%20in%20customizing%20or%20ordering%20the%20${encodeURIComponent(product.title)}%20software.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full justify-center text-xs font-semibold"
                  style={{ background: "#25D366", color: "#ffffff" }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Discuss on WhatsApp</span>
                </a>

                {/* Order on Fiverr */}
                <a
                  href="https://www.fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full justify-center text-xs font-semibold"
                  style={{ background: "#1dbf73", color: "#ffffff" }}
                >
                  <span className="font-bold text-[11px]">fi</span>
                  <span>Order via Fiverr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {related && related.length > 0 && (
        <section className="pt-10 border-t border-slate-200/80 dark:border-white/5 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Similar Software in This Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
