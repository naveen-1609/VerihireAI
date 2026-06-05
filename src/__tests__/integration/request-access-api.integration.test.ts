import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/request-access/route";
import { validPayload } from "@/lib/__tests__/fixtures";
import { jsonPostRequest, readJson } from "./helpers";

vi.mock("@/lib/google-sheets", () => ({
  isGoogleSheetsConfigured: vi.fn(),
  appendSheetEntry: vi.fn(),
}));

import { appendSheetEntry, isGoogleSheetsConfigured } from "@/lib/google-sheets";

const mockedIsConfigured = vi.mocked(isGoogleSheetsConfigured);
const mockedAppend = vi.mocked(appendSheetEntry);

describe("POST /api/request-access", () => {
  beforeEach(() => {
    mockedIsConfigured.mockReturnValue(true);
    mockedAppend.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and saves a valid submission", async () => {
    const response = await POST(jsonPostRequest("/api/request-access", validPayload));
    const body = await readJson<{ success: boolean; message?: string }>(response);

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toMatch(/submitted successfully/i);
    expect(mockedAppend).toHaveBeenCalledOnce();
    expect(mockedAppend).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "jane@acme.com",
        role: "Head of Talent",
      })
    );
  });

  it("returns 400 for invalid payload", async () => {
    const response = await POST(
      jsonPostRequest("/api/request-access", { ...validPayload, email: "not-valid" })
    );
    const body = await readJson<{ success: boolean; error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/work email/i);
    expect(mockedAppend).not.toHaveBeenCalled();
  });

  it("returns 400 for honeypot spam", async () => {
    const response = await POST(
      jsonPostRequest("/api/request-access", {
        ...validPayload,
        honeypot: "spam-bot",
      })
    );
    const body = await readJson<{ success: boolean; error: string }>(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe("Submission rejected.");
    expect(mockedAppend).not.toHaveBeenCalled();
  });

  it("returns 503 when Google Sheets is not configured", async () => {
    mockedIsConfigured.mockReturnValue(false);

    const response = await POST(jsonPostRequest("/api/request-access", validPayload));
    const body = await readJson<{ success: boolean; error: string }>(response);

    expect(response.status).toBe(503);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/not configured/i);
  });

  it("returns 500 when Google Sheets write fails", async () => {
    mockedAppend.mockRejectedValue(new Error("Apps Script denied access"));

    const response = await POST(jsonPostRequest("/api/request-access", validPayload));
    const body = await readJson<{ success: boolean; error: string }>(response);

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/Apps Script denied access/i);
  });
});
