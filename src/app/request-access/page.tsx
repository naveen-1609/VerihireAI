import type { Metadata } from "next";
import { Shield, Sparkles, Users, FileCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import RequestAccessForm from "@/components/landing/RequestAccessForm";

export const metadata: Metadata = {
  title: "Request Access — VeriHire AI",
  description:
    "Request early access to VeriHire AI — the secure interview integrity platform for modern hiring teams.",
};

const highlights = [
  {
    icon: Shield,
    title: "Secure interview integrity",
    description: "Identity verification, session checks, and risk signals in one platform.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted evaluation",
    description: "Support interviewers with answer validation and structured reporting.",
  },
  {
    icon: Users,
    title: "Built for hiring teams",
    description: "Designed for HR, recruiting agencies, and technical hiring leaders.",
  },
  {
    icon: FileCheck,
    title: "No commitment required",
    description: "Request access to learn more — there is no obligation to buy.",
  },
];

export default function RequestAccessPage() {
  return (
    <>
      <Navbar />
      <main className="gradient-hero min-h-screen pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Request Access
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                Get early access to{" "}
                <span className="gradient-text">VeriHire AI</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Share a few details about your team and hiring needs. We&apos;ll
                review your request and follow up with next steps.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/70 bg-white/70 p-5 backdrop-blur-sm"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-semibold text-navy">{item.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-navy">Request access</h2>
                <p className="mt-2 text-sm text-muted">
                  Fill in your details below. Submissions are saved automatically
                  for our team to review.
                </p>
              </div>

              <RequestAccessForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
