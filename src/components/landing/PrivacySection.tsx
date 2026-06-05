"use client";

import {
  Handshake,
  Eye,
  Settings,
  Database,
  UserCheck,
  Scale,
  ScrollText,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const principles = [
  {
    icon: Handshake,
    title: "Candidate consent before monitoring",
    description:
      "Candidates are informed and must consent before any integrity checks begin.",
  },
  {
    icon: Eye,
    title: "Clear disclosure of checks performed",
    description:
      "Every verification and monitoring step is transparently communicated upfront.",
  },
  {
    icon: Settings,
    title: "Configurable company policies",
    description:
      "Teams define which checks apply based on role, region, and hiring requirements.",
  },
  {
    icon: Database,
    title: "Data retention controls",
    description:
      "Configurable retention periods and secure data handling aligned with your policies.",
  },
  {
    icon: UserCheck,
    title: "Human review before hiring decisions",
    description:
      "AI provides decision support — final hiring decisions always remain with your team.",
  },
  {
    icon: Scale,
    title: "Bias-aware AI assistance",
    description:
      "Evaluation models are designed with fairness considerations and human oversight.",
  },
  {
    icon: ScrollText,
    title: "Secure audit logs",
    description:
      "Complete, tamper-resistant records of interview sessions and integrity events.",
  },
];

export default function PrivacySection() {
  return (
    <SectionWrapper className="bg-white py-20 sm:py-28" id="privacy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Privacy & Compliance
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Designed for responsible and transparent interviews
          </h2>
          <p className="mt-4 text-lg text-muted">
            VeriHire AI is built with ethics and compliance at its core. We believe
            interview integrity and candidate respect go hand in hand.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-border p-5 transition-all hover:border-accent-teal/30 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-teal/10">
                <principle.icon className="h-5 w-5 text-accent-teal" />
              </div>
              <h3 className="font-semibold text-navy">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-accent-teal/20 bg-gradient-to-br from-accent-teal/5 to-accent/5 p-6 text-center">
          <p className="text-sm font-medium text-navy">
            Our approach prioritizes informed consent, minimal data collection,
            and human-centered decision making — so your team can hire with
            confidence and integrity.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
