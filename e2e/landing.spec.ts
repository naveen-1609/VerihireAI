import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads the homepage with hero and primary CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/VeriHire AI/i);
    await expect(
      page.getByRole("heading", {
        name: /Secure, Verified Interviews for Modern Hiring Teams/i,
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Request Access" }).first()).toBeVisible();
  });

  test("navigates from hero CTA to request access page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Request Access" }).first().click();

    await expect(page).toHaveURL(/\/request-access$/);
    await expect(
      page.getByRole("heading", { name: /Get early access to/i })
    ).toBeVisible();
  });

  test("navbar links to key landing sections", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("navigation").getByRole("link", { name: "How It Works" }).click();
    await expect(page).toHaveURL(/#how-it-works/);
    await expect(
      page.getByRole("heading", { name: /simple, secure interview workflow/i })
    ).toBeVisible();
  });
});
