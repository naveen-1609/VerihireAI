"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  User,
  Video,
  CheckCircle2,
  Bot,
} from "lucide-react";

export default function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent-teal/10 to-transparent blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-navy/10"
      >
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="ml-2 text-xs font-medium text-muted">
            Hire Guard Interview Session
          </span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-5">
          <div className="relative col-span-3 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-navy to-navy-light">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <User className="h-10 w-10 text-white/80" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
              <Video className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-medium text-white">Sarah Chen</span>
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-emerald-500/90 px-2.5 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-medium text-white">Verified</span>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold text-navy">
                  Identity Verified
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Document match confirmed
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Liveness check passed
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-800">
                  Risk Signals
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-amber-700">
                  Possible AI-generated response — elevated linguistic uniformity
                </p>
                <p className="text-xs text-amber-700">
                  Off-screen gaze pattern detected — review recommended
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-green-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-navy">
                  AI Interviewer Notes
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate">
                Response on system design shows strong fundamentals. Suggest
                follow-up on caching strategy.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -left-4 top-1/4 hidden rounded-xl border border-border bg-white p-3 shadow-lg lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-navy">Session Secure</p>
            <p className="text-[10px] text-muted">Integrity checks active</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -right-4 bottom-1/4 hidden rounded-xl border border-border bg-white p-3 shadow-lg lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <Bot className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-navy">AI Response Risk</p>
            <p className="text-[10px] text-muted">Likelihood: moderate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
