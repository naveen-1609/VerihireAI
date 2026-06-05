"use client";

import {
  UserX,
  Users,
  Bot,
  Monitor,
  HelpCircle,
  FileX,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const problems = [
  {
    icon: UserX,
    title: "Candidate impersonation",
    description:
      "Remote interviews make it harder to confirm the person on camera is the invited candidate.",
  },
  {
    icon: Users,
    title: "Proxy interviews",
    description:
      "Third parties may participate on behalf of candidates, undermining hiring integrity.",
  },
  {
    icon: Bot,
    title: "Live AI-assisted answers",
    description:
      "Candidates may use AI tools during interviews to generate polished responses they cannot explain, adapt, or defend under follow-up questioning.",
  },
  {
    icon: Monitor,
    title: "Session integrity risks",
    description:
      "Remote desktop usage, screen extensions, and unauthorized session activity can compromise interview validity.",
  },
  {
    icon: HelpCircle,
    title: "Technical validation gaps",
    description:
      "Non-technical interviewers often struggle to assess whether technical answers are accurate or complete.",
  },
  {
    icon: FileX,
    title: "Limited audit trails",
    description:
      "Teams lack structured records to review interview integrity, decisions, and risk indicators after the fact.",
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper className="bg-white py-20 sm:py-28" id="problem">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            The Challenge
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Hiring teams are facing a new interview integrity problem
          </h2>
          <p className="mt-4 text-lg text-muted">
            As remote and high-volume hiring grows, organizations need better
            ways to verify candidates, support interviewers, and maintain
            reliable hiring records — without compromising candidate experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                <problem.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-navy">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
