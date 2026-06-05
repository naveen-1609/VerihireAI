import { Shield } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.065 2.065 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "AI Answer Detection", href: "/#features" },
    { label: "AI Assistant", href: "/#ai-assistant" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Request Access", href: "/request-access" },
  ],
  "Use Cases": [
    { label: "Technical Interviews", href: "/#use-cases" },
    { label: "Remote Hiring", href: "/#use-cases" },
    { label: "Staffing & Vendors", href: "/#use-cases" },
    { label: "Enterprise TA", href: "/#customers" },
  ],
  Security: [
    { label: "Privacy", href: "/#privacy" },
    { label: "Compliance", href: "/#privacy" },
    { label: "Audit Logs", href: "/#privacy" },
    { label: "Data Retention", href: "/#privacy" },
  ],
  Company: [
    { label: "Contact", href: "/#contact" },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Terms", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <span className="text-lg font-semibold text-white">
                VeriHire <span className="text-accent">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Secure interview integrity platform for modern hiring teams.
              Verify identity, detect risk signals, and evaluate with confidence.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
              LinkedIn
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} VeriHire AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white/70">
              Terms
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white/70">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
