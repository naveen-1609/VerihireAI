import { expect, test } from "@playwright/test";
import { fillAdminEntryForm, mockSuccessfulSheetApis } from "./helpers";

const ADMIN_PASSWORD = "e2e-test-password";

test.describe("Admin flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockSuccessfulSheetApis(page);
  });

  test("redirects unauthenticated users from admin entries to login", async ({ page }) => {
    await page.goto("/admin/entries");
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: "Internal Access" })).toBeVisible();
  });

  test("rejects invalid admin password", async ({ page }) => {
    await page.goto("/admin");
    await page.getByLabel("Admin password").fill("wrong-password");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText("Invalid password.")).toBeVisible();
    await expect(page).toHaveURL(/\/admin$/);
  });

  test("logs in and submits an admin sheet entry", async ({ page }) => {
    await page.goto("/admin");
    await page.getByLabel("Admin password").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/admin\/entries$/, { timeout: 10_000 });
    await expect(
      page.getByRole("heading", { name: "Add contact entry" })
    ).toBeVisible();
    await page.waitForLoadState("networkidle");

    await fillAdminEntryForm(page);
    await page.getByRole("button", { name: "Add to Google Sheet" }).click();

    await expect(page.getByText("Entry saved to Google Sheets")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("signs out from admin panel", async ({ page }) => {
    await page.goto("/admin");
    await page.getByLabel("Admin password").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin\/entries$/);

    await page.getByRole("link", { name: "Sign out" }).click();
    await page.waitForURL(/\/admin$/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { name: "Internal Access" })).toBeVisible();
  });
});
