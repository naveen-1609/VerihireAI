import { expect, type Page } from "@playwright/test";

export const testEntry = {
  fullName: "E2E Test User",
  email: "e2e.test@acme.com",
  company: "Acme Testing",
  website: "https://acme.test",
  role: "Talent Lead",
  companySize: "51–200 employees",
  interviewsPerMonth: "51–200",
  problem: "Need to verify remote interview integrity during hiring.",
  interest: "Remote hiring",
  notes: "Submitted via Playwright E2E test",
};

export async function mockSuccessfulSheetApis(page: Page) {
  await page.route("**/api/request-access", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Your request has been submitted successfully.",
      }),
    });
  });

  await page.route("**/api/admin/entries", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

function getMainForm(page: Page) {
  return page.locator("main form");
}

async function fillSheetEntryFields(form: ReturnType<typeof getMainForm>) {
  await form.locator("#fullName").click();
  await form.locator("#fullName").fill(testEntry.fullName);
  await form.locator("#email").fill(testEntry.email);
  await form.locator("#company").fill(testEntry.company);
  await form.locator("#website").fill(testEntry.website);
  await form.locator("#role").fill(testEntry.role);
  await form.locator("#companySize").selectOption(testEntry.companySize);
  await form.locator("#interviewsPerMonth").selectOption(testEntry.interviewsPerMonth);
  await form.locator("#interest").selectOption(testEntry.interest);
  await form.locator("#problem").fill(testEntry.problem);
  await form.locator("#notes").fill(testEntry.notes);
}

async function fillSheetEntryForm(page: Page) {
  const form = getMainForm(page);

  await expect(form.locator("#fullName")).toBeVisible();
  await expect(form.locator("#companySize option")).toHaveCount(6);

  await expect(async () => {
    await fillSheetEntryFields(form);
    await expect(form.locator("#fullName")).toHaveValue(testEntry.fullName);
    await expect(form.locator("#companySize")).toHaveValue(testEntry.companySize);
    await expect(form.locator("#interest")).toHaveValue(testEntry.interest);
  }).toPass({ timeout: 15_000 });
}

export async function fillRequestAccessForm(page: Page) {
  await fillSheetEntryForm(page);
}

export async function fillAdminEntryForm(page: Page) {
  await fillSheetEntryForm(page);
}
