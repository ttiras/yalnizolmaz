import { test, expect } from "@playwright/test";

test("ReadingProgress bar widens on scroll", async ({ page }) => {
  await page.goto("/blog/yalnizlik-sozleri");
  const bar = page.locator("div.fixed.top-0 div[style*='width']").first();
  // initial width may be 0% or small
  const before = await bar.evaluate((el) => (el as HTMLElement).style.width || "0%");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await expect
    .poll(async () => bar.evaluate((el) => (el as HTMLElement).style.width))
    .not.toBe(before);
});
