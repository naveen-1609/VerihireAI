import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyAdminPassword } from "../admin-password";

describe("verifyAdminPassword", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns true for the configured password", () => {
    vi.stubEnv("ADMIN_PASSWORD", "test-admin-password");

    expect(verifyAdminPassword("test-admin-password")).toBe(true);
  });

  it("returns false for an incorrect password", () => {
    vi.stubEnv("ADMIN_PASSWORD", "test-admin-password");

    expect(verifyAdminPassword("wrong-password")).toBe(false);
  });

  it("returns false when admin password is not configured", () => {
    vi.stubEnv("ADMIN_PASSWORD", "");

    expect(verifyAdminPassword("anything")).toBe(false);
  });
});
