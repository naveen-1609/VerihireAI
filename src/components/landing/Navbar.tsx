"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { label: "Product", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Security", href: "/#privacy" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy">
            <Shield className="h-5 w-5 text-accent" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-navy">
            Hire <span className="text-accent">Guard</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/#contact"
            className="text-sm font-medium text-muted transition-colors hover:text-navy"
          >
            Contact
          </a>
          <a
            href="/request-access"
            className="rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-navy-light hover:shadow-lg hover:shadow-navy/20"
          >
            Request Access
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-navy md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate hover:bg-surface"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </a>
              <a
                href="/request-access"
                className="mt-2 rounded-lg bg-navy px-4 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Request Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
