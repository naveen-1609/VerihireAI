"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function PricingTeaser() {
  return (
    <SectionWrapper className="bg-surface py-20 sm:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-teal/5" />

          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Coming Soon
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Custom plans for teams and enterprises
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Flexible pricing based on interview volume, team size, and feature
              requirements. Contact us for a tailored quote.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/request-access"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-light"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:border-accent/30"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
