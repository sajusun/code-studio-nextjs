"use client";

import React, { useState } from "react";
import { submitQuoteRequest } from "@/lib/api";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await submitQuoteRequest({
        name,
        email,
        subject: subject || "General Contact Inquiry",
        message,
      });

      if (res.status === "success" || res.success || res.code === 200) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.message || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Direct Support & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Get in Touch with Our Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Have a question about a software package, license pricing, or custom engineering? We respond within a few hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Direct Chat Card */}
          <div className="card p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Direct Chat & WhatsApp</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Instant communication for urgent project scopes & inquiries:</p>
              <a
                href="https://wa.me/8801700000000?text=Hello%20CodeStudio%2C%20I%20want%20to%20discuss%20a%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-2 inline-flex items-center gap-1.5"
              >
                <span>Chat on WhatsApp (+880 1700-000000)</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Fiverr & Upwork Card */}
          <div className="card p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Hire via Marketplaces</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>If you prefer hiring with marketplace escrow and protection:</p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1dbf73] hover:underline"
                >
                  Fiverr Profile ↗
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#14a800] hover:underline"
                >
                  Upwork Profile ↗
                </a>
              </div>
            </div>
          </div>

          {/* Email Support Card */}
          <div className="card p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: "var(--text-main)" }}>Direct Email Desk</h3>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>For formal RFPs, custom quote documents, and NDA requests:</p>
              <a href="mailto:contact@codestudio.dev" className="text-xs font-mono font-bold text-accent hover:underline mt-2 inline-block">
                contact@codestudio.dev
              </a>
            </div>
          </div>

        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass-panel p-10 rounded-3xl border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Thank you, <span className="text-slate-900 dark:text-white font-bold">{name}</span>. We have received your inquiry and will reply to <span className="text-blue-600 dark:text-cyan-400 font-bold">{email}</span> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Your Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. License purchase inquiry, custom quote"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Your Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message or question... *"
                  rows={5}
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs leading-relaxed"
                ></textarea>
              </div>

              {errorMsg && <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl btn-primary font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
