import { test, expect } from "@playwright/test";

test("home page has docs link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Read our docs/i })).toBeVisible();
});
