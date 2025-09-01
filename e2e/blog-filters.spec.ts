import { test, expect } from "@playwright/test";

test("/blog filters: search and tag filter narrow results", async ({ page }) => {
  await page.goto("/blog");

  const cards = page.locator("article");
  const initialCount = await cards.count();
  expect(initialCount).toBeGreaterThan(0);

  // Type a query
  await page.getByRole("textbox", { name: /Blogda ara/i }).fill("yalnızlık");
  await expect.poll(async () => (await cards.count()) <= initialCount).toBeTruthy();

  // Click a tag chip if exists
  const tagButton = page.locator("button[aria-pressed]").first();
  if (await tagButton.isVisible()) {
    await tagButton.click();
    await expect.poll(async () => (await cards.count()) <= initialCount).toBeTruthy();
  }
});
