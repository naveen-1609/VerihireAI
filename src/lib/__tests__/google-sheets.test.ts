import { afterEach, describe, expect, it, vi } from "vitest";
import { isGoogleSheetsConfigured } from "../google-sheets";

describe("isGoogleSheetsConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns true when Apps Script URL is set", () => {
    vi.stubEnv("GOOGLE_APPS_SCRIPT_URL", "https://script.google.com/macros/s/test/exec");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "");
    vi.stubEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL", "");
    vi.stubEnv("GOOGLE_PRIVATE_KEY", "");

    expect(isGoogleSheetsConfigured()).toBe(true);
  });

  it("returns true when service account credentials are set", () => {
    vi.stubEnv("GOOGLE_APPS_SCRIPT_URL", "");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "sheet-id");
    vi.stubEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL", "service@project.iam.gserviceaccount.com");
    vi.stubEnv("GOOGLE_PRIVATE_KEY", "-----BEGIN PRIVATE KEY-----");

    expect(isGoogleSheetsConfigured()).toBe(true);
  });

  it("returns false when no Google Sheets integration is configured", () => {
    vi.stubEnv("GOOGLE_APPS_SCRIPT_URL", "");
    vi.stubEnv("GOOGLE_SHEETS_SPREADSHEET_ID", "");
    vi.stubEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL", "");
    vi.stubEnv("GOOGLE_PRIVATE_KEY", "");

    expect(isGoogleSheetsConfigured()).toBe(false);
  });
});
