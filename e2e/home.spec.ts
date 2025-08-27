import { test, expect } from "@playwright/test";

test("home page hero and CTAs render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Yalnız Olmaz/i })).toBeVisible();
  // There are two "Bloga Git" links (hero and CTA). Check the first one (hero).
  await expect(page.getByRole("link", { name: /Bloga Git/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Yalnızlık sözleri/i }).first()).toBeVisible();
});
