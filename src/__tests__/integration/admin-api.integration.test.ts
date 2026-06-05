import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as loginPost } from "@/app/api/admin/login/route";
import { POST as logoutPost } from "@/app/api/admin/logout/route";
import { POST as entriesPost } from "@/app/api/admin/entries/route";
import { validPayload } from "@/lib/__tests__/fixtures";
import { adminSessionCookie } from "@/lib/admin-auth";
import { getSetCookie, jsonPostRequest, parseSessionCookie, readJson } from "./helpers";

vi.mock("@/lib/google-sheets", () => ({
  isGoogleSheetsConfigured: vi.fn(),
  appendSheetEntry: vi.fn(),
}));

import { appendSheetEntry, isGoogleSheetsConfigured } from "@/lib/google-sheets";

const mockedIsConfigured = vi.mocked(isGoogleSheetsConfigured);
const mockedAppend = vi.mocked(appendSheetEntry);

describe("Admin API integration", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_PASSWORD", "integration-test-password");
    vi.stubEnv("ADMIN_SESSION_TOKEN", "integration-test-session-token");
    mockedIsConfigured.mockReturnValue(true);
    mockedAppend.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  describe("POST /api/admin/login", () => {
    it("returns 200 and sets session cookie for valid password", async () => {
      const response = await loginPost(
        jsonPostRequest("/api/admin/login", { password: "integration-test-password" })
      );
      const body = await readJson<{ success: boolean }>(response);
      const sessionToken = parseSessionCookie(getSetCookie(response));

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(sessionToken).toBe("integration-test-session-token");
      expect(getSetCookie(response)).toContain(`${adminSessionCookie.name}=`);
    });

    it("returns 401 for invalid password", async () => {
      const response = await loginPost(
        jsonPostRequest("/api/admin/login", { password: "wrong-password" })
      );
      const body = await readJson<{ error: string }>(response);

      expect(response.status).toBe(401);
      expect(body.error).toBe("Invalid password.");
      expect(getSetCookie(response)).toBeNull();
    });
  });

  describe("POST /api/admin/logout", () => {
    it("clears the session cookie", async () => {
      const response = await logoutPost();
      const setCookie = getSetCookie(response);

      expect(response.status).toBe(200);
      expect(setCookie).toContain(`${adminSessionCookie.name}=;`);
    });
  });

  describe("POST /api/admin/entries", () => {
    it("returns 200 and appends a valid admin entry", async () => {
      const response = await entriesPost(
        jsonPostRequest("/api/admin/entries", validPayload)
      );
      const body = await readJson<{ success: boolean }>(response);

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(mockedAppend).toHaveBeenCalledOnce();
    });

    it("returns 400 for invalid admin payload", async () => {
      const response = await entriesPost(
        jsonPostRequest("/api/admin/entries", { ...validPayload, role: "" })
      );
      const body = await readJson<{ error: string }>(response);

      expect(response.status).toBe(400);
      expect(body.error).toMatch(/role/i);
      expect(mockedAppend).not.toHaveBeenCalled();
    });

    it("returns 503 when Google Sheets is not configured", async () => {
      mockedIsConfigured.mockReturnValue(false);

      const response = await entriesPost(
        jsonPostRequest("/api/admin/entries", validPayload)
      );
      const body = await readJson<{ error: string }>(response);

      expect(response.status).toBe(503);
      expect(body.error).toMatch(/not configured/i);
    });
  });

  describe("Admin auth flow", () => {
    it("login → entries write succeeds with mocked Google Sheets", async () => {
      const loginResponse = await loginPost(
        jsonPostRequest("/api/admin/login", { password: "integration-test-password" })
      );
      const sessionToken = parseSessionCookie(getSetCookie(loginResponse));

      expect(sessionToken).toBeTruthy();

      const entriesResponse = await entriesPost(
        jsonPostRequest("/api/admin/entries", validPayload, {
          [adminSessionCookie.name]: sessionToken!,
        })
      );

      expect(entriesResponse.status).toBe(200);
      expect(mockedAppend).toHaveBeenCalledOnce();
    });
  });
});
