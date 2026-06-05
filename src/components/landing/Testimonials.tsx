"use client";

import { Quote } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const testimonials = [
  {
    quote:
      "Hire Guard gave our recruiting team the confidence to scale remote technical interviews without sacrificing integrity. The audit reports alone have transformed how we review candidates.",
    name: "Rachel Morrison",
    title: "VP of Talent Acquisition",
    company: "Meridian Technologies",
  },
  {
    quote:
      "As a staffing agency, verifying candidate authenticity is critical. Hire Guard's identity checks and risk signals help us deliver trusted candidates to our enterprise clients.",
    name: "David Okonkwo",
    title: "Director of Operations",
    company: "TalentBridge Staffing",
  },
  {
    quote:
      "Our hiring managers aren't all engineers. The AI evaluation support helps them ask sharper follow-ups and make more informed decisions — without replacing their judgment.",
    name: "Priya Sharma",
    title: "Head of People",
    company: "CloudScale Inc.",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper className="bg-white py-20 sm:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Trusted by hiring leaders
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-border bg-surface/50 p-6"
            >
              <Quote className="h-8 w-8 text-accent/30" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-navy">{testimonial.name}</p>
                <p className="text-sm text-muted">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
