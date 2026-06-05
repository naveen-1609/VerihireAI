import { describe, expect, it } from "vitest";
import { validateRequestAccessPayload } from "../request-access";
import { validPayload } from "./fixtures";

describe("validateRequestAccessPayload", () => {
  it("accepts a valid public request-access submission", () => {
    const result = validateRequestAccessPayload(validPayload);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Jane Smith");
      expect(result.data.problem).toBe("Proxy interviews during remote hiring");
    }
  });

  it("rejects honeypot spam submissions", () => {
    const result = validateRequestAccessPayload({
      ...validPayload,
      honeypot: "https://spam.example",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Submission rejected.");
    }
  });

  it("rejects invalid email with public-facing message", () => {
    const result = validateRequestAccessPayload({
      ...validPayload,
      email: "bad-email",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/work email/i);
    }
  });

  it("rejects responses longer than 1000 characters", () => {
    const result = validateRequestAccessPayload({
      ...validPayload,
      notes: "x".repeat(1001),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/1,000 characters/i);
    }
  });
});
