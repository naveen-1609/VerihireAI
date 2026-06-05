import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getAdminSessionToken,
  isAdminAuthConfigured,
  verifyAdminSessionToken,
} from "../admin-auth";

describe("admin-auth", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reports configured when admin env vars exist", () => {
    vi.stubEnv("ADMIN_PASSWORD", "secret-password");
    vi.stubEnv("ADMIN_SESSION_TOKEN", "secret-token");

    expect(isAdminAuthConfigured()).toBe(true);
    expect(getAdminSessionToken()).toBe("secret-token");
  });

  it("reports not configured when env vars are missing", () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    vi.stubEnv("ADMIN_SESSION_TOKEN", "");

    expect(isAdminAuthConfigured()).toBe(false);
  });

  it("verifies a matching session token", () => {
    vi.stubEnv("ADMIN_SESSION_TOKEN", "abc123");

    expect(verifyAdminSessionToken("abc123")).toBe(true);
    expect(verifyAdminSessionToken("wrong")).toBe(false);
    expect(verifyAdminSessionToken(undefined)).toBe(false);
  });
});
