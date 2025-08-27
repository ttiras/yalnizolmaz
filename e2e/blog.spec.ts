import { test, expect } from "@playwright/test";

test("/blog page smoke: hero, featured link, grid mounts", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /Blog/i })).toBeVisible();
  // Featured section link exists if at least one post present
  const featured = page.locator("a").filter({ hasText: /\S+/ }).first();
  await expect(featured).toBeVisible();
  // Client grid mounts (search input exists inside component)
  const search = page.getByRole("textbox").first();
  await expect(search).toBeVisible();
});
