import React from "react";
import { AGENCY_CONFIG } from "@/config/agency";
import { MessageCircle, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";

export function AgencyChannelsBar() {
  return (
    <div
      className="border-y py-3 px-4"
      style={{
        background: "var(--bg-section)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Left: Value Proposition */}
        <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            <strong>Need a custom app or want to rebuild a showcased project?</strong> We are available for direct contracts & marketplace hiring.
          </span>
        </div>

        {/* Right: Quick Channel Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* WhatsApp Direct */}
          <a
            href={AGENCY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all hover:brightness-105 shadow-xs"
            style={{
              background: "#25D366",
              color: "#ffffff",
            }}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Fiverr Profile */}
          <a
            href={AGENCY_CONFIG.fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all hover:brightness-105 shadow-xs"
            style={{
              background: "#1dbf73",
              color: "#ffffff",
            }}
          >
            <span className="font-black text-[11px]">fi</span>
            <span>Hire on Fiverr</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* Upwork Profile */}
          <a
            href={AGENCY_CONFIG.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all hover:brightness-105 shadow-xs"
            style={{
              background: "#14a800",
              color: "#ffffff",
            }}
          >
            <span className="font-bold text-[11px]">Up</span>
            <span>Upwork</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
