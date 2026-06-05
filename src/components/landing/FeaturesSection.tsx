"use client";

import {
  Fingerprint,
  MonitorCheck,
  Brain,
  AlertTriangle,
  Eye,
  FileText,
  ScanSearch,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Fingerprint,
    title: "Candidate Identity Verification",
    description:
      "Confirm the candidate is the person invited to interview using secure pre-interview verification workflows.",
  },
  {
    icon: MonitorCheck,
    title: "Interview Environment Checks",
    description:
      "Detect risky interview conditions such as screen extension, remote desktop indicators, and unauthorized session activity.",
  },
  {
    icon: Brain,
    title: "AI Technical Evaluation",
    description:
      "Help non-technical interviewers validate technical responses using AI-generated follow-up questions, answer analysis, and confidence scoring.",
  },
  {
    icon: ScanSearch,
    title: "AI-Generated Answer Detection",
    description:
      "Flag responses that may be machine-generated or assisted by live AI tools, using linguistic patterns, delivery signals, and consistency indicators for interviewer review.",
  },
  {
    icon: AlertTriangle,
    title: "Proxy & Coaching Risk Signals",
    description:
      "Identify patterns that may indicate external assistance, delayed responses, unnatural answer flow, or off-screen prompting.",
  },
  {
    icon: Eye,
    title: "Gaze & Behavior Insights",
    description:
      "Use interview behavior signals to flag unusual patterns while keeping humans in control of final decisions.",
  },
  {
    icon: FileText,
    title: "Audit-Ready Interview Reports",
    description:
      "Generate structured interview summaries, risk indicators, answer quality notes, and decision-support documentation.",
  },
];

export default function FeaturesSection() {
  return (
    <SectionWrapper className="bg-white py-20 sm:py-28" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Core Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Everything you need for interview integrity
          </h2>
          <p className="mt-4 text-lg text-muted">
            A comprehensive platform designed to support verification, AI answer
            detection, monitoring, evaluation, and reporting — all in one secure
            workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
