"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { validateRequestAccessPayload } from "@/lib/request-access";
import {
  COMPANY_SIZES,
  INTEREST_OPTIONS,
  INTERVIEWS_PER_MONTH,
} from "@/lib/sheet-entry";

const initialForm = {
  fullName: "",
  email: "",
  company: "",
  website: "",
  role: "",
  companySize: "",
  interviewsPerMonth: "",
  problem: "",
  interest: "",
  notes: "",
  honeypot: "",
};

export default function RequestAccessForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload = {
      fullName: form.fullName,
      email: form.email,
      company: form.company,
      website: form.website,
      role: form.role,
      companySize: form.companySize,
      interviewsPerMonth: form.interviewsPerMonth,
      problem: form.problem,
      interest: form.interest,
      notes: form.notes,
      honeypot: form.honeypot,
    };

    const validation = validateRequestAccessPayload(payload);
    if (!validation.success) {
      setStatus("error");
      setErrorMessage(validation.error);
      return;
    }

    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit request");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit request"
      );
    }
  }

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-navy">Request received</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thank you for your interest in Hire Guard. Our team will review your
          request and get back to you shortly.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-teal"
        >
          Back to homepage
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className={inputClassName}
            placeholder="Jane Smith"
          />
        </Field>

        <Field label="Work email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClassName}
            placeholder="jane@company.com"
          />
        </Field>

        <Field label="Company" htmlFor="company" required>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={inputClassName}
            placeholder="Acme Corp"
          />
        </Field>

        <Field label="Company website" htmlFor="website">
          <input
            id="website"
            name="website"
            type="url"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
            className={inputClassName}
            placeholder="https://company.com"
          />
        </Field>

        <Field label="Role" htmlFor="role" required>
          <input
            id="role"
            name="role"
            type="text"
            required
            autoComplete="organization-title"
            value={form.role}
            onChange={(event) => updateField("role", event.target.value)}
            className={inputClassName}
            placeholder="Head of Talent Acquisition"
          />
        </Field>

        <Field label="Company size" htmlFor="companySize" required>
          <select
            id="companySize"
            name="companySize"
            required
            value={form.companySize}
            onChange={(event) => updateField("companySize", event.target.value)}
            className={inputClassName}
          >
            <option value="">Select company size</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Interviews per month" htmlFor="interviewsPerMonth" required>
          <select
            id="interviewsPerMonth"
            name="interviewsPerMonth"
            required
            value={form.interviewsPerMonth}
            onChange={(event) =>
              updateField("interviewsPerMonth", event.target.value)
            }
            className={inputClassName}
          >
            <option value="">Select interview volume</option>
            {INTERVIEWS_PER_MONTH.map((volume) => (
              <option key={volume} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Area of interest" htmlFor="interest" required>
          <select
            id="interest"
            name="interest"
            required
            value={form.interest}
            onChange={(event) => updateField("interest", event.target.value)}
            className={inputClassName}
          >
            <option value="">Select what you are most interested in</option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="What hiring or interview problem are you trying to solve?"
        htmlFor="problem"
        required
      >
        <textarea
          id="problem"
          name="problem"
          rows={4}
          required
          value={form.problem}
          onChange={(event) => updateField("problem", event.target.value)}
          className={inputClassName}
          placeholder="e.g. candidate impersonation, proxy interviews, AI-generated answers, or interviewer support."
        />
      </Field>

      <Field label="Additional notes" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          className={inputClassName}
          placeholder="Anything else you would like us to know."
        />
      </Field>

      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={(event) => updateField("honeypot", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface/70 px-4 py-3 text-sm text-muted">
        By submitting this form, you agree that Hire Guard may contact you about
        early access, product updates, and onboarding.
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Access
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-navy">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-slate outline-none transition-all placeholder:text-muted/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/10";
