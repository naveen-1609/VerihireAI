import type { SheetEntryPayload } from "./sheet-entry";
import {
  COMPANY_SIZES,
  INTEREST_OPTIONS,
  INTERVIEWS_PER_MONTH,
} from "./sheet-entry";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequestAccessPayload(
  body: unknown
): { success: true; data: SheetEntryPayload } | { success: false; error: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;

  if (typeof input.honeypot === "string" && input.honeypot.trim()) {
    return { success: false, error: "Submission rejected." };
  }

  const fullName = trimString(input.fullName);
  const email = trimString(input.email).toLowerCase();
  const company = trimString(input.company);
  const website = optionalString(input.website);
  const role = trimString(input.role);
  const companySize = trimString(input.companySize);
  const interviewsPerMonth = trimString(input.interviewsPerMonth);
  const problem = trimString(input.problem);
  const interest = trimString(input.interest);
  const notes = optionalString(input.notes);

  if (!fullName || fullName.length < 2) {
    return { success: false, error: "Please enter your full name." };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid work email." };
  }

  if (!company || company.length < 2) {
    return { success: false, error: "Please enter your company name." };
  }

  if (!role || role.length < 2) {
    return { success: false, error: "Please enter your role." };
  }

  if (!COMPANY_SIZES.includes(companySize as (typeof COMPANY_SIZES)[number])) {
    return { success: false, error: "Please select a company size." };
  }

  if (
    !INTERVIEWS_PER_MONTH.includes(
      interviewsPerMonth as (typeof INTERVIEWS_PER_MONTH)[number]
    )
  ) {
    return { success: false, error: "Please select your monthly interview volume." };
  }

  if (!problem || problem.length < 3) {
    return { success: false, error: "Please describe the hiring challenge you want to solve." };
  }

  if (
    !INTEREST_OPTIONS.includes(interest as (typeof INTEREST_OPTIONS)[number])
  ) {
    return { success: false, error: "Please select what you are most interested in." };
  }

  if (website && website.length > 200) {
    return { success: false, error: "Website must be 200 characters or fewer." };
  }

  if (problem.length > 1000 || (notes && notes.length > 1000)) {
    return { success: false, error: "Responses must be 1,000 characters or fewer." };
  }

  return {
    success: true,
    data: {
      fullName,
      email,
      company,
      website,
      role,
      companySize,
      interviewsPerMonth,
      problem,
      interest,
      notes,
    },
  };
}

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(value: unknown): string | undefined {
  const trimmed = trimString(value);
  return trimmed || undefined;
}
