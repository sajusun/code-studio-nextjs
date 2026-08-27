"use client";

import React, { useState } from "react";
import { submitQuoteRequest } from "@/lib/api";
import {
  Sparkles,
  Send,
  CheckCircle2,
  Globe,
  Smartphone,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function RequestQuotePage() {
  const [platform, setPlatform] = useState("web_app");
  const [budget, setBudget] = useState("$1,000 - $3,000");
  const [timeline, setTimeline] = useState("1 - 2 Months");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const platformOptions = [
    { id: "web_app", label: "Web Application / SaaS", icon: Globe, desc: "Fullstack Next.js & Laravel" },
    { id: "android", label: "Android Mobile App", icon: Smartphone, desc: "Flutter APK & Play Store" },
    { id: "ios", label: "iOS App (TestFlight/Store)", icon: Smartphone, desc: "Native iOS & Swift/React Native" },
    { id: "full_suite", label: "Full Stack Ecosystem", icon: Layers, desc: "Web + Mobile + Admin API" },
  ];

  const budgetOptions = ["< $1,000", "$1,000 - $3,000", "$3,000 - $8,000", "$10,000+ Enterprise"];
  const timelineOptions = ["Urgent (< 3 Weeks)", "1 - 2 Months", "Flexible / Long-term"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await submitQuoteRequest({
        name,
        email,
        phone,
        platform_type: platform,
        budget: `${budget} (Timeline: ${timeline})`,
        message,
      });

      if (res.status === "success" || res.success || res.code === 200) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.message || "Failed to submit request. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      
      {/* Title Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Project Estimator & Scope Builder
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Request a Custom Engineering Quote
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
          Tell us about your project goals. We will evaluate technical feasibility and return a detailed architectural roadmap and estimate within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-emerald-500/30 text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received Successfully!</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-slate-900 dark:text-white font-bold">{name}</span>. Our lead software architect will review your project requirements and email you at <span className="text-blue-600 dark:text-cyan-400 font-bold">{email}</span> shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-9 shadow-xl">
          
          {/* Step 1: Platform Type */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
              1. Select Target Platform:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {platformOptions.map((opt) => {
                const isSelected = platform === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPlatform(opt.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-cyan-500/15 border-blue-500 dark:border-cyan-400 text-blue-900 dark:text-cyan-300 shadow-md ring-2 ring-blue-500/20 dark:ring-cyan-400/20"
                        : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
                    }`}
                  >
                    <opt.icon className={`w-5 h-5 ${isSelected ? "text-blue-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"}`} />
                    <div>
                      <span className="text-xs font-bold block">{opt.label}</span>
                      <span className="text-[10px] opacity-75">{opt.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Budget Range */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
              2. Anticipated Budget Range:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {budgetOptions.map((b) => {
                const isSelected = budget === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-indigo-500/20 border-blue-500 dark:border-indigo-400 text-blue-800 dark:text-indigo-300 shadow-sm ring-1 ring-blue-500/20"
                        : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline */}
          <div className="space-y-3.5">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
              3. Expected Delivery Timeline:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {timelineOptions.map((t) => {
                const isSelected = timeline === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-violet-500/20 border-blue-500 dark:border-violet-400 text-blue-800 dark:text-violet-300 shadow-sm ring-1 ring-blue-500/20"
                        : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Contact Info & Requirements */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-white/5">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
              4. Contact Details & Requirements:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Work Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">WhatsApp / Phone Number (Optional)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">Project Scope & Features Description *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your core requirements, desired features, reference apps, or target users... *"
                rows={4}
                required
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-blue-500 shadow-xs leading-relaxed"
              ></textarea>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl btn-primary font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Submitting Project Scope...</span>
            ) : (
              <>
                <span>Submit Scope & Request Detailed Estimate</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

        </form>
      )}

    </div>
  );
}
