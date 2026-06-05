import { describe, expect, it } from "vitest";
import { validateSheetEntryPayload } from "../sheet-entry";
import { validPayload } from "./fixtures";

describe("validateSheetEntryPayload", () => {
  it("accepts a valid admin sheet entry", () => {
    const result = validateSheetEntryPayload(validPayload);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("jane@acme.com");
      expect(result.data.website).toBe("https://acme.com");
      expect(result.data.notes).toBe("Interested in early access");
    }
  });

  it("normalizes email to lowercase", () => {
    const result = validateSheetEntryPayload({
      ...validPayload,
      email: "Jane@ACME.COM",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("jane@acme.com");
    }
  });

  it("rejects invalid request bodies", () => {
    expect(validateSheetEntryPayload(null).success).toBe(false);
    expect(validateSheetEntryPayload("string").success).toBe(false);
  });

  it("rejects missing full name", () => {
    const result = validateSheetEntryPayload({ ...validPayload, fullName: "J" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/full name/i);
    }
  });

  it("rejects invalid email", () => {
    const result = validateSheetEntryPayload({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/valid email/i);
    }
  });

  it("rejects invalid company size", () => {
    const result = validateSheetEntryPayload({
      ...validPayload,
      companySize: "Huge",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/company size/i);
    }
  });

  it("rejects invalid interview volume", () => {
    const result = validateSheetEntryPayload({
      ...validPayload,
      interviewsPerMonth: "99999",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/interviews per month/i);
    }
  });

  it("rejects short problem descriptions", () => {
    const result = validateSheetEntryPayload({ ...validPayload, problem: "No" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/problem/i);
    }
  });

  it("rejects invalid interest option", () => {
    const result = validateSheetEntryPayload({
      ...validPayload,
      interest: "Blockchain hiring",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/interest/i);
    }
  });

  it("allows optional website and notes to be omitted", () => {
    const { website: _website, notes: _notes, ...requiredOnly } = validPayload;
    const result = validateSheetEntryPayload(requiredOnly);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBeUndefined();
      expect(result.data.notes).toBeUndefined();
    }
  });
});
