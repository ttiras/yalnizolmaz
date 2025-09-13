import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Profile Management Edge Cases", () => {
  const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
  const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
  const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();

    // Sign in before each test
    await page.goto("/login");
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for successful sign in or handle authentication failure
    try {
      await expect(page).toHaveURL("/", { timeout: 10000 });
      await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });
    } catch (error) {
      // If authentication fails, skip the test
      test.skip(
        true,
        "Authentication failed - Nhost backend may not be running or credentials invalid",
      );
    }
  });

  test("should redirect unauthenticated users to login", async ({ page }) => {
    // Clear session
    await page.context().clearCookies();

    // Try to access profile page
    await page.goto("/profil");

    // Should redirect to login with next parameter
    await expect(page).toHaveURL(/\/login\?next=\/profil/);
  });

  test("should redirect unauthenticated users to login from edit page", async ({ page }) => {
    // Clear session
    await page.context().clearCookies();

    // Try to access profile edit page
    await page.goto("/profil/duzenle");

    // Should redirect to login with next parameter
    await expect(page).toHaveURL(/\/login\?next=\/profil\/duzenle/);
  });

  test("should handle network timeout gracefully", async ({ page }) => {
    // Mock a slow network response
    await page.route("**/api/profil/guncelle", (route) => {
      // Delay response to simulate timeout
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Profile updated" }),
        });
      }, 10000);
    });

    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    await displayNameInput.clear();
    await displayNameInput.fill("Timeout Test");

    // Submit form
    await submitButton.click();

    // Should show loading state
    await expect(page.getByRole("button", { name: /Kaydediliyor.../ })).toBeVisible();

    // Wait for timeout or success
    await page.waitForTimeout(5000);
  });

  test("should handle malformed API responses", async ({ page }) => {
    // Mock malformed response
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "invalid json",
      });
    });

    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    await displayNameInput.clear();
    await displayNameInput.fill("Malformed Response Test");

    // Submit form
    await submitButton.click();

    // Should handle error gracefully
    await expect(page.locator("text=/Beklenmeyen bir hata oluştu/")).toBeVisible();
  });

  test("should handle concurrent profile updates", async ({ page, context }) => {
    // Open two tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // Sign in both pages
    for (const p of [page1, page2]) {
      await p.goto("/login");
      const emailInput = p.getByLabel("E-posta");
      const passwordInput = p.getByLabel("Şifre");
      const submitButton = p.getByRole("button", { name: /E-posta ile devam et/i });

      await emailInput.fill(testEmail);
      await passwordInput.fill(testPassword);
      await submitButton.click();
      await expect(p).toHaveURL("/", { timeout: 10000 });
    }

    // Navigate both to edit page
    await page1.goto("/profil/duzenle");
    await page2.goto("/profil/duzenle");

    // Make different changes in each tab
    const displayName1 = page1.getByLabel("Görünen Ad");
    const displayName2 = page2.getByLabel("Görünen Ad");

    await displayName1.clear();
    await displayName1.fill("Tab 1 Update");
    await displayName2.clear();
    await displayName2.fill("Tab 2 Update");

    // Submit both forms
    await page1.getByRole("button", { name: /Kaydet/ }).click();
    await page2.getByRole("button", { name: /Kaydet/ }).click();

    // Both should complete successfully
    await expect(page1).toHaveURL("/profil", { timeout: 10000 });
    await expect(page2).toHaveURL("/profil", { timeout: 10000 });

    // Clean up
    await page1.close();
    await page2.close();
  });

  test("should handle very long text inputs", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const bioInput = page.getByLabel("Biyografi");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Try to enter very long text
    const veryLongBio = "a".repeat(10000);
    await bioInput.clear();
    await bioInput.fill(veryLongBio);

    // Should be truncated to max length
    await expect(bioInput).toHaveValue("a".repeat(500));

    // Submit should work
    await submitButton.click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should handle special characters in inputs", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const bioInput = page.getByLabel("Biyografi");
    const locationInput = page.getByLabel("Konum");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Test special characters
    const specialText = "Test with special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?`~";

    await displayNameInput.clear();
    await displayNameInput.fill(specialText);
    await bioInput.clear();
    await bioInput.fill(specialText);
    await locationInput.clear();
    await locationInput.fill(specialText);

    // Submit form
    await submitButton.click();

    // Should handle special characters correctly
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should handle Unicode characters", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const bioInput = page.getByLabel("Biyografi");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Test Unicode characters
    const unicodeText = "Test with Unicode: 你好世界 🌍 émojis 🎉";

    await displayNameInput.clear();
    await displayNameInput.fill(unicodeText);
    await bioInput.clear();
    await bioInput.fill(unicodeText);

    // Submit form
    await submitButton.click();

    // Should handle Unicode correctly
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should handle rapid form submissions", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    await displayNameInput.clear();
    await displayNameInput.fill("Rapid Submit Test");

    // Submit form multiple times rapidly
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();

    // Should handle rapid submissions gracefully
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should handle browser back/forward navigation", async ({ page }) => {
    await page.goto("/profil");
    await page.goto("/profil/duzenle");

    // Make some changes
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill("Back Navigation Test");

    // Go back
    await page.goBack();

    // Should return to profile page
    await expect(page).toHaveURL("/profil");

    // Go forward
    await page.goForward();

    // Should return to edit page with changes preserved
    await expect(page).toHaveURL("/profil/duzenle");
    await expect(displayNameInput).toHaveValue("Back Navigation Test");
  });

  test("should handle page refresh during editing", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Make some changes
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill("Refresh Test");

    // Refresh page
    await page.reload();

    // Changes should be lost (form resets)
    await expect(displayNameInput).toHaveValue("");
  });

  test("should handle multiple browser tabs", async ({ page, context }) => {
    // Open multiple tabs
    const tabs = await Promise.all([context.newPage(), context.newPage(), context.newPage()]);

    // Sign in all tabs
    for (const tab of tabs) {
      await tab.goto("/login");
      const emailInput = tab.getByLabel("E-posta");
      const passwordInput = tab.getByLabel("Şifre");
      const submitButton = tab.getByRole("button", { name: /E-posta ile devam et/i });

      await emailInput.fill(testEmail);
      await passwordInput.fill(testPassword);
      await submitButton.click();
      await expect(tab).toHaveURL("/", { timeout: 10000 });
    }

    // Navigate all tabs to profile
    for (const tab of tabs) {
      await tab.goto("/profil");
    }

    // All tabs should show profile page
    for (const tab of tabs) {
      await expect(tab.getByRole("heading", { name: testEmail })).toBeVisible();
    }

    // Clean up
    await Promise.all(tabs.map((tab) => tab.close()));
  });

  test("should handle session expiration during editing", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Make some changes
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill("Session Expiry Test");

    // Clear session (simulate expiration)
    await page.context().clearCookies();

    // Try to submit form
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("should handle API rate limiting", async ({ page }) => {
    // Mock rate limiting response
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ message: "Too many requests" }),
      });
    });

    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    await displayNameInput.clear();
    await displayNameInput.fill("Rate Limit Test");

    // Submit form
    await submitButton.click();

    // Should show rate limit error
    await expect(page.locator("text=/Too many requests/")).toBeVisible();
  });

  test("should handle server maintenance mode", async ({ page }) => {
    // Mock maintenance mode response
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ message: "Service temporarily unavailable" }),
      });
    });

    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    await displayNameInput.clear();
    await displayNameInput.fill("Maintenance Test");

    // Submit form
    await submitButton.click();

    // Should show maintenance error
    await expect(page.locator("text=/Service temporarily unavailable/")).toBeVisible();
  });
});
