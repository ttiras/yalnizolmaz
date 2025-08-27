import { test, expect } from "@playwright/test";

test("JSON-LD contains expected fields on blog detail", async ({ page }) => {
  await page.goto("/blog/yalnizlik-sozleri");
  const scripts = page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  expect(count).toBeGreaterThan(0);
  const text = await scripts.first().textContent();
  expect(text).toContain('"@context":"https://schema.org"');
  expect(text).toMatch(/"@type":"(Article|BreadcrumbList)"/);
  expect(text).toContain('"headline"');
  expect(text).toContain('"datePublished"');
});
