"use client";

import { CheckCircle2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const solutions = [
  "Candidate identity verification before the interview",
  "Device and session integrity checks",
  "Suspicious behavior and gaze pattern monitoring",
  "Remote assistance and proxy-risk detection",
  "AI-generated answer and live AI-assistance risk signals",
  "AI-assisted technical answer validation",
  "Interview summary, scoring, and audit reports",
];

export default function SolutionSection() {
  return (
    <SectionWrapper className="bg-surface py-20 sm:py-28" id="solution">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              The Solution
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Hire Guard helps teams interview with confidence
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Hire Guard is a secure interview layer that supports hiring teams
              throughout the interview lifecycle — from pre-interview verification
              to post-interview decision support.
            </p>

            <ul className="mt-8 space-y-4">
              {solutions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-teal" />
                  <span className="text-sm leading-relaxed text-slate">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-accent/20 bg-white p-5">
              <p className="text-sm font-medium text-navy">
                Built for transparency, consent, and responsible evaluation.
              </p>
              <p className="mt-1 text-sm text-muted">
                Every check is designed to support human judgment — not replace it.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/10 to-accent-teal/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
              <div className="border-b border-border bg-navy px-6 py-4">
                <p className="text-sm font-semibold text-white">
                  Interview Integrity Dashboard
                </p>
                <p className="text-xs text-white/60">Session overview — placeholder</p>
              </div>
              <div className="space-y-4 p-6">
                {[
                  { label: "Identity Status", value: "Verified", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Session Integrity", value: "Clear", color: "text-emerald-600 bg-emerald-50" },
                  { label: "Risk Indicators", value: "1 flagged", color: "text-amber-600 bg-amber-50" },
                  { label: "AI Response Signals", value: "Review", color: "text-amber-600 bg-amber-50" },
                  { label: "AI Evaluation", value: "Complete", color: "text-accent bg-green-50" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <span className="text-sm text-muted">{row.label}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${row.color}`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="rounded-lg bg-gradient-to-r from-navy to-navy-light p-4">
                  <p className="text-xs font-medium text-white/70">
                    Overall Integrity Score
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">92 / 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
