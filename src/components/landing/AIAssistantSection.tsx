"use client";

import { Sparkles, MessageSquare, CheckSquare, Target, BarChart3, ScanSearch } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const examples = [
  { icon: MessageSquare, text: "Generate follow-up questions" },
  { icon: CheckSquare, text: "Check whether an answer is technically accurate" },
  { icon: ScanSearch, text: "Flag responses that may be AI-generated or AI-assisted" },
  { icon: Target, text: "Compare candidate responses against role expectations" },
  { icon: BarChart3, text: "Summarize strengths, gaps, and risk areas" },
];

export default function AIAssistantSection() {
  return (
    <SectionWrapper className="bg-surface py-20 sm:py-28" id="ai-assistant">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
              <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-navy to-navy-light px-5 py-4">
                <Sparkles className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    AI Interviewer Assistant
                  </p>
                  <p className="text-xs text-white/60">Real-time support panel</p>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="rounded-lg bg-surface p-4">
                  <p className="text-xs font-medium text-muted">Question asked</p>
                  <p className="mt-1 text-sm text-navy">
                    &ldquo;How would you design a rate limiter for an API?&rdquo;
                  </p>
                </div>
                <div className="rounded-lg border border-accent/20 bg-green-50 p-4">
                  <p className="text-xs font-medium text-accent">Suggested follow-up</p>
                  <p className="mt-1 text-sm text-slate">
                    Ask about token bucket vs. sliding window trade-offs and
                    distributed rate limiting.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-medium text-amber-700">
                    AI response signal
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    Response structure and phrasing suggest possible AI assistance.
                    Recommend a spontaneous follow-up to validate depth.
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs font-medium text-emerald-700">
                    Answer analysis
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    Technical content is directionally accurate. Confidence score: 82%.
                    Minor gap in distributed systems context.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              AI Interviewer Assistant
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              AI support for interviewers, not AI replacement
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Hire Guard helps interviewers ask better questions, identify bluff
              or AI-assisted answers, and evaluate candidate responses more
              consistently. The platform supports human judgment instead of
              replacing it.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {examples.map((example) => (
                <div
                  key={example.text}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <example.icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-slate">
                    {example.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
