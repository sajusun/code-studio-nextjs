"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency, getPlatformBadge, getSafeImageUrl } from "@/lib/utils";
import { DemoModal } from "./DemoModal";
import {
  ExternalLink,
  KeyRound,
  Download,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const badge = getPlatformBadge(product.type);
  const imageUrl = getSafeImageUrl(product.thumbnail_url || product.thumbnail, product.category);

  return (
    <>
      <div className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300">
        
        {/* Top Image Preview & Badges */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            unoptimized={imageUrl.startsWith("http://")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

          {/* Platform Tag */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${badge.bg} ${badge.color}`}>
              {badge.label}
            </span>
            {product.is_featured && (
              <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 border border-amber-500/30 text-amber-300 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3.5 z-10">
            <span className="px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white font-extrabold text-xs shadow-lg">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {product.category || "Software Suite"}
            </div>

            <Link href={`/products/${product.slug}`} className="block group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight line-clamp-1 flex items-center justify-between">
                <span>{product.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-cyan-400" />
              </h3>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {product.short_description || product.description || "Enterprise architecture with clean code, scalable APIs, and modern frontend."}
            </p>

            {/* Tech Stack Badges */}
            {product.tech_stack && product.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {product.tech_stack.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {product.tech_stack.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                    +{product.tech_stack.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-5 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
            
            {/* Live Web Demo Button */}
            {product.demo_url ? (
              <a
                href={product.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-blue-50 dark:bg-cyan-500/10 hover:bg-blue-100 dark:hover:bg-cyan-500/20 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}

            {/* Admin Demo Button (opens modal) */}
            {(product.admin_demo_url || product.admin_demo_username) && (
              <button
                onClick={() => setDemoModalOpen(true)}
                title="View Admin Demo Credentials"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-400/40 transition-all flex items-center justify-center"
              >
                <KeyRound className="w-4 h-4" />
              </button>
            )}

            {/* APK Download Button */}
            {product.apk_url && (
              <a
                href={product.apk_url}
                target="_blank"
                rel="noreferrer"
                title="Download Android APK"
                className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all flex items-center justify-center"
              >
                <Download className="w-4 h-4" />
              </a>
            )}

          </div>

        </div>

      </div>

      {/* Admin Demo Modal */}
      <DemoModal
        product={product}
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
