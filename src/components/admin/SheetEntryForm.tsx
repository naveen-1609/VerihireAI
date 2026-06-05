"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Plus, RotateCcw } from "lucide-react";
import {
  COMPANY_SIZES,
  INTEREST_OPTIONS,
  INTERVIEWS_PER_MONTH,
  validateSheetEntryPayload,
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
};

export default function SheetEntryForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const validation = validateSheetEntryPayload(form);
    if (!validation.success) {
      setStatus("error");
      setErrorMessage(validation.error);
      return;
    }

    try {
      const response = await fetch("/api/admin/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to save entry.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save entry."
      );
    }
  }

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setStatus("idle");
    setErrorMessage("");
  }

  return (
    <div className="space-y-6">
      {status === "success" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-navy">Entry saved to Google Sheets</p>
              <p className="mt-1 text-sm text-muted">
                The row was added successfully. You can enter another contact below.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" required>
            <input
              id="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className={inputClassName}
              placeholder="Jane Smith"
            />
          </Field>

          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={inputClassName}
              placeholder="jane@company.com"
            />
          </Field>

          <Field label="Company" htmlFor="company" required>
            <input
              id="company"
              type="text"
              required
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              className={inputClassName}
              placeholder="Acme Corp"
            />
          </Field>

          <Field label="Website" htmlFor="website">
            <input
              id="website"
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
              type="text"
              required
              value={form.role}
              onChange={(event) => updateField("role", event.target.value)}
              className={inputClassName}
              placeholder="Head of Talent Acquisition"
            />
          </Field>

          <Field label="Company size" htmlFor="companySize" required>
            <select
              id="companySize"
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
              required
              value={form.interest}
              onChange={(event) => updateField("interest", event.target.value)}
              className={inputClassName}
            >
              <option value="">Select interest</option>
              {INTEREST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Problem" htmlFor="problem" required>
          <textarea
            id="problem"
            rows={4}
            required
            value={form.problem}
            onChange={(event) => updateField("problem", event.target.value)}
            className={inputClassName}
            placeholder="What hiring or interview challenge are they trying to solve?"
          />
        </Field>

        <Field label="Notes" htmlFor="notes">
          <textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            className={inputClassName}
            placeholder="Internal notes, follow-up actions, or conversation details."
          />
        </Field>

        {status === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving to sheet...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add to Google Sheet
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:border-accent/30"
          >
            <RotateCcw className="h-4 w-4" />
            Clear form
          </button>
        </div>
      </form>
    </div>
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
