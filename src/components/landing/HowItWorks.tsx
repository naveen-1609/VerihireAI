"use client";

import { Send, ShieldCheck, Video, FileBarChart } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const steps = [
  {
    icon: Send,
    step: "01",
    title: "Invite Candidate",
    description: "Recruiters send a secure interview link.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Verify Identity",
    description:
      "Candidate completes identity and environment checks before joining.",
  },
  {
    icon: Video,
    step: "03",
    title: "Conduct Interview",
    description:
      "Interviewers receive real-time AI assistance, answer validation support, and indicators for potentially AI-generated responses.",
  },
  {
    icon: FileBarChart,
    step: "04",
    title: "Review Report",
    description:
      "Hiring teams receive an interview integrity report and AI-assisted evaluation summary.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper className="bg-surface py-20 sm:py-28" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            A simple, secure interview workflow
          </h2>
          <p className="mt-4 text-lg text-muted">
            From invitation to decision support — VeriHire AI integrates into
            your existing hiring process with minimal friction.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-border">
                  <step.icon className="h-7 w-7 text-accent" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="mx-auto mt-6 h-8 w-px bg-border lg:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
