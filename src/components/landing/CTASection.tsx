"use client";

import { ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function CTASection() {
  return (
    <SectionWrapper className="py-20 sm:py-28" id="demo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gradient-navy relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-teal/10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Make every interview verified, structured, and trustworthy.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Reduce hiring fraud, support interviewers, and improve confidence in
              remote hiring decisions.
            </p>
            <a
              href="/request-access"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-navy transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Request Access
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
