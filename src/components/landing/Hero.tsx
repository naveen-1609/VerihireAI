"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Eye, Sparkles, FileCheck, ScanSearch } from "lucide-react";
import HeroMockup from "./HeroMockup";

const trustBadges = [
  { icon: ShieldCheck, label: "Identity Verification" },
  { icon: Eye, label: "Interview Integrity" },
  { icon: ScanSearch, label: "AI Answer Detection" },
  { icon: FileCheck, label: "Compliance-Ready" },
];

export default function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-accent-teal/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-accent shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Secure Interview Integrity Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
            >
              Secure, Verified Interviews for{" "}
              <span className="gradient-text">Modern Hiring Teams</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              Verify candidate identity, detect suspicious interview behavior,
              identify potentially AI-generated responses, and help interviewers
              evaluate answers with AI-powered confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="/request-access"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-light hover:shadow-lg hover:shadow-navy/25"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:border-accent/30 hover:shadow-md"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-white/60 px-3 py-3 text-center backdrop-blur-sm"
                >
                  <badge.icon className="h-5 w-5 text-accent" />
                  <span className="text-xs font-medium text-slate">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
