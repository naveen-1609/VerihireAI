"use client";

import {
  Users,
  Briefcase,
  Building,
  Code,
  Landmark,
  Wifi,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const customers = [
  { icon: Users, label: "HR teams" },
  { icon: Briefcase, label: "Recruiting agencies" },
  { icon: Building, label: "Staffing vendors" },
  { icon: Code, label: "Technical hiring teams" },
  { icon: Landmark, label: "Enterprise talent acquisition teams" },
  { icon: Wifi, label: "Companies hiring remote candidates" },
];

export default function TargetCustomers() {
  return (
    <SectionWrapper className="bg-surface py-20 sm:py-28" id="customers">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Who It&apos;s For
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Who Hire Guard is for
          </h2>
          <p className="mt-4 text-lg text-muted">
            Whether you&apos;re screening contractors, running campus drives, or
            hiring senior engineers remotely — Hire Guard adapts to your workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <div
              key={customer.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 transition-all hover:border-accent/20 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5">
                <customer.icon className="h-5 w-5 text-navy" />
              </div>
              <span className="font-medium text-slate">{customer.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
