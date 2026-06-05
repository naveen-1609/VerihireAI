import { google } from "googleapis";
import type { SheetEntryPayload } from "./sheet-entry";

const SHEET_HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Company",
  "Website",
  "Role",
  "Company Size",
  "Interviews Per Month",
  "Problem",
  "Interest",
  "Notes",
] as const;

const SHEET_TAB = (
  process.env.GOOGLE_SHEETS_TAB_NAME || "Hire Guard Early Access"
).replace(/^['"]|['"]$/g, "");

function rowFromPayload(data: SheetEntryPayload): string[] {
  return [
    new Date().toISOString(),
    data.fullName,
    data.email,
    data.company,
    data.website || "",
    data.role,
    data.companySize,
    data.interviewsPerMonth,
    data.problem,
    data.interest,
    data.notes || "",
  ];
}

async function submitViaAppsScript(
  scriptUrl: string,
  data: SheetEntryPayload
): Promise<void> {
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    redirect: "follow",
  });

  const raw = await response.text();

  if (!response.ok || raw.includes("Access Denied") || raw.includes("You need access")) {
    throw new Error(
      "Google Apps Script denied access. Redeploy the script as a Web App with 'Who has access: Anyone'."
    );
  }

  let result: { success?: boolean; error?: string };

  try {
    result = JSON.parse(raw) as { success?: boolean; error?: string };
  } catch {
    throw new Error(
      "Google Apps Script returned an unexpected response. Check the deployment URL and permissions."
    );
  }

  if (!result.success) {
    throw new Error(result.error || "Apps Script submission failed.");
  }
}

async function submitViaServiceAccount(data: SheetEntryPayload): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets service account is not fully configured.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `${SHEET_TAB}!A:K`;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB}!A1:K1`,
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_TAB}!A1:K1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [Array.from(SHEET_HEADERS)],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [rowFromPayload(data)],
    },
  });
}

function hasServiceAccountConfig(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
  );
}

export async function appendSheetEntry(data: SheetEntryPayload): Promise<void> {
  if (hasServiceAccountConfig()) {
    await submitViaServiceAccount(data);
    return;
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (appsScriptUrl) {
    await submitViaAppsScript(appsScriptUrl, data);
    return;
  }

  throw new Error("Google Sheets is not configured.");
}

export function isGoogleSheetsConfigured(): boolean {
  const hasAppsScript = Boolean(process.env.GOOGLE_APPS_SCRIPT_URL);
  const hasServiceAccount = Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
  );

  return hasAppsScript || hasServiceAccount;
}
