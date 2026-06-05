import { expect, test } from "@playwright/test";
import { fillRequestAccessForm, mockSuccessfulSheetApis } from "./helpers";

test.describe("Request access flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockSuccessfulSheetApis(page);
  });

  test("submits the form and shows success state", async ({ page }) => {
    await page.goto("/request-access");

    await fillRequestAccessForm(page);
    await page.getByRole("button", { name: "Request Access" }).click();

    await expect(page.getByRole("heading", { name: "Request received" })).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(/thank you for your interest/i)).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.goto("/request-access");

    await fillRequestAccessForm(page);
    await page.locator("main form #email").fill("not-an-email");
    await page.getByRole("button", { name: "Request Access" }).click();

    await expect(page.getByText(/valid work email/i)).toBeVisible();
  });

  test("shows API error when submission fails", async ({ page }) => {
    await page.route("**/api/request-access", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: "Google Apps Script denied access.",
        }),
      });
    });

    await page.goto("/request-access");
    await fillRequestAccessForm(page);
    await page.getByRole("button", { name: "Request Access" }).click();

    await expect(page.getByText(/Google Apps Script denied access/i)).toBeVisible();
  });
});
