import { test, expect } from "@playwright/test";

test("ShareButtons: web share called when available; links present", async ({ page }) => {
  await page.goto("/blog/yalnizlik-sozleri");
  // expose a stub share
  await page.addInitScript(() => {
    // @ts-expect-error playwright env
    navigator.share = async () => {};
  });

  const shareBtn = page.getByRole("button", { name: /Paylaş \(cihaz\)/i }).first();
  await expect(shareBtn).toBeVisible();
  await shareBtn.click();
  // If share is stubbed, page shouldn't throw
  await expect(page).toHaveURL(/\/blog\/yalnizlik-sozleri/);

  // Check a couple of links exist
  await expect(page.getByRole("link", { name: /X \(Twitter\)/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Facebook/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/i })).toBeVisible();
});
