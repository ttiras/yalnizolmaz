import { test, expect } from "@playwright/test";

test("Theme toggle switches and persists across reload", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const initiallyDark = await html.evaluate((el) => el.classList.contains("dark"));

  // Click the theme toggle button (label varies by current state)
  const toggle = page.getByRole("button", { name: /Koyu moda geç|Açık moda geç/i }).first();
  await toggle.click();

  // Expect class to flip and data-theme to reflect it
  await expect
    .poll(async () => html.evaluate((el) => el.classList.contains("dark")))
    .toBe(!initiallyDark);
  const isDarkNow = await html.evaluate((el) => el.classList.contains("dark"));
  await expect(html).toHaveAttribute("data-theme", isDarkNow ? "dark" : "light");

  // Reload and ensure persistence via localStorage + FOUC script
  await page.reload();
  await expect
    .poll(async () => html.evaluate((el) => el.classList.contains("dark")))
    .toBe(isDarkNow);
  await expect(html).toHaveAttribute("data-theme", isDarkNow ? "dark" : "light");
});
