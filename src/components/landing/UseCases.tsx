"use client";

import {
  Code2,
  Building2,
  Globe,
  GraduationCap,
  FileSignature,
  Users,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const useCases = [
  {
    icon: Code2,
    title: "Technical Interviews",
    description:
      "Validate technical depth with AI-assisted evaluation and integrity checks.",
  },
  {
    icon: Building2,
    title: "Staffing & Vendor Candidate Screening",
    description:
      "Verify third-party candidates before they reach your hiring managers.",
  },
  {
    icon: Globe,
    title: "Remote Hiring",
    description:
      "Maintain confidence in distributed interviews across time zones.",
  },
  {
    icon: GraduationCap,
    title: "Campus Hiring",
    description:
      "Scale early-career recruiting with structured verification workflows.",
  },
  {
    icon: FileSignature,
    title: "Contract Role Verification",
    description:
      "Confirm contractor and freelance candidates meet integrity standards.",
  },
  {
    icon: Users,
    title: "High-Volume Recruiting",
    description:
      "Process large candidate pipelines with consistent audit-ready reports.",
  },
];

export default function UseCases() {
  return (
    <SectionWrapper className="bg-white py-20 sm:py-28" id="use-cases">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Use Cases
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Built for high-integrity hiring workflows
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex gap-4 rounded-2xl border border-border bg-surface/50 p-5 transition-all hover:border-accent/20 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                <useCase.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy">{useCase.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
