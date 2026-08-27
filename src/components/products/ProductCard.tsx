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
  Star,
} from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const badge = getPlatformBadge(product.type);
  const imageUrl = getSafeImageUrl(product.thumbnail_url || product.thumbnail, product.category);

  return (
    <>
      <div
        className="card flex flex-col group overflow-hidden"
        style={{ borderRadius: "12px" }}
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden" style={{ background: "var(--bg-card-subtle)" }}>
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized={imageUrl.startsWith("http://")}
          />
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm border ${badge.bg} ${badge.color}`}
            >
              {badge.label}
            </span>
            {product.is_featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-sm bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" />
                Featured
              </span>
            )}
          </div>
          {/* Price */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className="px-2.5 py-1 rounded text-xs font-semibold"
              style={{
                background: "rgba(0,0,0,0.75)",
                color: "#fff",
                backdropFilter: "blur(6px)",
              }}
            >
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-faint)" }}>
              {product.category || "Software"}
            </p>

            <Link
              href={`/products/${product.slug}`}
              className="group/title flex items-start justify-between gap-2"
            >
              <h3 className="text-sm font-semibold leading-snug line-clamp-1 transition-colors group-hover/title:text-[var(--accent)]" style={{ color: "var(--text-main)" }}>
                {product.title}
              </h3>
              <ArrowUpRight
                className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-0 group-hover/title:opacity-100 transition-opacity"
                style={{ color: "var(--accent)" }}
              />
            </Link>

            <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
              {product.short_description || product.description || "Production-ready software with clean, scalable architecture."}
            </p>

            {/* Tech tags */}
            {product.tech_stack && product.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3.5">
                {product.tech_stack.slice(0, 4).map((t, i) => (
                  <span key={i} className="tag-code">{t}</span>
                ))}
                {product.tech_stack.length > 4 && (
                  <span className="tag-code" style={{ color: "var(--text-faint)" }}>
                    +{product.tech_stack.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-1.5 mt-5 pt-3 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {product.demo_url ? (
              <a
                href={product.demo_url}
                target="_blank"
                rel="noreferrer"
                className="btn flex-1 py-1.5 px-2 text-xs font-semibold"
                style={{
                  background: "var(--accent-muted)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                  borderRadius: "7px",
                  fontSize: "0.75rem",
                }}
              >
                Live Demo
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <Link
                href={`/products/${product.slug}`}
                className="btn btn-secondary flex-1 py-1.5 px-2 text-xs font-semibold"
                style={{ borderRadius: "7px", fontSize: "0.75rem" }}
              >
                View Details
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}

            <Link
              href={`/request-quote?product=${encodeURIComponent(product.title)}&id=${product.id}`}
              className="btn btn-secondary py-1.5 px-2.5 text-xs font-semibold hover:border-blue-400"
              title="Request Custom App / Rebuild"
              style={{ borderRadius: "7px", fontSize: "0.75rem" }}
            >
              Order Custom
            </Link>

            {(product.admin_demo_url || product.admin_demo_username) && (
              <button
                onClick={() => setDemoModalOpen(true)}
                title="Admin demo credentials"
                className="btn btn-secondary p-1.5"
                style={{ borderRadius: "7px" }}
              >
                <KeyRound className="w-3.5 h-3.5" />
              </button>
            )}

            {product.apk_url && (
              <a
                href={product.apk_url}
                target="_blank"
                rel="noreferrer"
                title="Download APK"
                className="btn btn-secondary p-1.5"
                style={{ borderRadius: "7px", color: "#16a34a" }}
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <DemoModal
        product={product}
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
