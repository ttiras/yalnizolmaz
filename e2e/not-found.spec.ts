import { test, expect } from "@playwright/test";

test("404 page renders and links home", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  // At least ensure a link back to blog or home exists
  const homeLink = page.getByRole("link", { name: /Ana sayfa|Home|Blog/i }).first();
  await expect(homeLink).toBeVisible();
});
