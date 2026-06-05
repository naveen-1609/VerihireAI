export interface SheetEntryPayload {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  role: string;
  companySize: string;
  interviewsPerMonth: string;
  problem: string;
  interest: string;
  notes?: string;
}

export const COMPANY_SIZES = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,000+ employees",
] as const;

export const INTERVIEWS_PER_MONTH = [
  "Less than 10",
  "10–50",
  "51–200",
  "201–500",
  "500+",
] as const;

export const INTEREST_OPTIONS = [
  "Technical interviews",
  "Remote hiring",
  "Staffing & vendor screening",
  "Campus hiring",
  "High-volume recruiting",
  "Contract role verification",
  "AI answer detection",
  "Other",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSheetEntryPayload(
  body: unknown
): { success: true; data: SheetEntryPayload } | { success: false; error: string } {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;

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
    return { success: false, error: "Please enter a full name." };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "Please enter a valid email." };
  }

  if (!company || company.length < 2) {
    return { success: false, error: "Please enter a company name." };
  }

  if (!role || role.length < 2) {
    return { success: false, error: "Please enter a role." };
  }

  if (!COMPANY_SIZES.includes(companySize as (typeof COMPANY_SIZES)[number])) {
    return { success: false, error: "Please select a company size." };
  }

  if (
    !INTERVIEWS_PER_MONTH.includes(
      interviewsPerMonth as (typeof INTERVIEWS_PER_MONTH)[number]
    )
  ) {
    return { success: false, error: "Please select interviews per month." };
  }

  if (!problem || problem.length < 3) {
    return { success: false, error: "Please describe the problem you are trying to solve." };
  }

  if (
    !INTEREST_OPTIONS.includes(interest as (typeof INTEREST_OPTIONS)[number])
  ) {
    return { success: false, error: "Please select an area of interest." };
  }

  if (website && website.length > 200) {
    return { success: false, error: "Website must be 200 characters or fewer." };
  }

  if (problem.length > 1000) {
    return { success: false, error: "Problem description must be 1,000 characters or fewer." };
  }

  if (notes && notes.length > 1000) {
    return { success: false, error: "Notes must be 1,000 characters or fewer." };
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
