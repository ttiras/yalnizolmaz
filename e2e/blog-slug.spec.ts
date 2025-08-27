import { test, expect } from "@playwright/test";

test("/blog/[slug] smoke: title, JSON-LD, cover media, TOC, prev/next", async ({ page }) => {
  await page.goto("/blog/yalnizlik-sozleri");

  // Title visible
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

  // JSON-LD scripts exist
  const ldCount = await page.locator('script[type="application/ld+json"]').count();
  expect(ldCount).toBeGreaterThan(0);

  // Cover media can be a video or image; smoke-check non-strictly (avoid flakiness)
  // If present, it should be visible; if not, skip without failing the smoke test
  const header = page.locator("header").first();
  const mediaCount = await header.locator("video, img").count();
  if (mediaCount > 0) {
    await expect(header.locator("video, img").first()).toBeVisible();
  }

  // Table of contents label appears after small delay
  await expect(page.getByText("İçindekiler").first()).toBeVisible({ timeout: 3000 });

  // Prev/Next section exists (if there are adjacent posts)
  const others = page.getByRole("heading", { name: /Diğer Yazılar/i }).first();
  await expect(others).toBeVisible();
});

test("TOC click scrolls without hash change", async ({ page }) => {
  await page.goto("/blog/yalnizlik-sozleri");
  // Wait for TOC label
  await expect(page.getByText("İçindekiler").first()).toBeVisible({ timeout: 3000 });

  const initialUrl = page.url();
  const initialScroll = await page.evaluate(() => window.scrollY);

  // Click a known TOC item
  const tocItem = page.getByRole("button", { name: /Yalnızlık Nedir/i }).first();
  await tocItem.click();

  // Scrolled
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScroll);
  // URL unchanged (no hash)
  expect(page.url()).toBe(initialUrl);
});
