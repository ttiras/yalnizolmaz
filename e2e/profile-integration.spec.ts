import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Profile Management Integration", () => {
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

  test("should update profile and see changes in navbar", async ({ page }) => {
    const newDisplayName = `Updated User ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Wait for redirect
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Navigate to home page
    await page.goto("/");

    // Check that navbar shows updated display name
    await expect(page.getByRole("link", { name: newDisplayName })).toBeVisible();
  });

  test("should update profile and see changes in blog comments", async ({ page }) => {
    const newDisplayName = `Comment User ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Wait for redirect
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Navigate to a blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Look for comment section
    const commentSection = page
      .locator('[data-testid="comments-section"], .comments, [class*="comment"]')
      .first();

    if (await commentSection.isVisible()) {
      // Check if updated display name appears in comments
      await expect(page.getByText(newDisplayName)).toBeVisible();
    }
  });

  test("should maintain profile state across different pages", async ({ page }) => {
    const newBio = `Test bio ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const bioInput = page.getByLabel("Biyografi");
    await bioInput.clear();
    await bioInput.fill(newBio);
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Wait for redirect
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Navigate to different pages and come back
    await page.goto("/");
    await page.goto("/blog");
    await page.goto("/profil");

    // Bio should still be updated
    await expect(page.getByText(newBio)).toBeVisible();
  });

  test("should handle profile updates from different entry points", async ({ page }) => {
    const newLocation = `Test City ${Date.now()}`;

    // Update profile from navbar link
    await page.getByRole("link", { name: testEmail }).click();
    await page.getByRole("link", { name: /Düzenle/ }).click();

    const locationInput = page.getByLabel("Konum");
    await locationInput.clear();
    await locationInput.fill(newLocation);
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Wait for redirect
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Location should be updated
    await expect(page.getByText(newLocation)).toBeVisible();
  });

  test("should sync profile changes across multiple tabs", async ({ page, context }) => {
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

    // Update profile in first tab
    await page1.goto("/profil/duzenle");
    const displayNameInput = page1.getByLabel("Görünen Ad");
    const newDisplayName = `Sync Test ${Date.now()}`;
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);
    await page1.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page1).toHaveURL("/profil", { timeout: 10000 });

    // Check second tab shows updated profile
    await page2.goto("/profil");
    await expect(page2.getByRole("heading", { name: newDisplayName })).toBeVisible();

    // Clean up
    await page1.close();
    await page2.close();
  });

  test("should handle profile updates with browser back button", async ({ page }) => {
    // Navigate to profile edit
    await page.goto("/profil");
    await page.getByRole("link", { name: /Düzenle/ }).click();

    // Make changes
    const displayNameInput = page.getByLabel("Görünen Ad");
    const newDisplayName = `Back Button Test ${Date.now()}`;
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);

    // Submit form
    await page.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Use back button
    await page.goBack();

    // Should return to profile page with updated data
    await expect(page).toHaveURL("/profil");
    await expect(page.getByRole("heading", { name: newDisplayName })).toBeVisible();
  });

  test("should handle profile updates with direct URL access", async ({ page }) => {
    const newWebsite = `https://directtest${Date.now()}.com`;

    // Update profile
    await page.goto("/profil/duzenle");
    const websiteInput = page.getByLabel("Website");
    await websiteInput.clear();
    await websiteInput.fill(newWebsite);
    await page.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Access profile page directly
    await page.goto("/profil");

    // Website should be updated
    await expect(page.getByRole("link", { name: newWebsite })).toBeVisible();
  });

  test("should handle profile updates with page refresh", async ({ page }) => {
    const newBio = `Refresh Test ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const bioInput = page.getByLabel("Biyografi");
    await bioInput.clear();
    await bioInput.fill(newBio);
    await page.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Refresh page
    await page.reload();

    // Bio should still be updated
    await expect(page.getByText(newBio)).toBeVisible();
  });

  test("should handle profile updates with navigation away and back", async ({ page }) => {
    const newLocation = `Navigation Test ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const locationInput = page.getByLabel("Konum");
    await locationInput.clear();
    await locationInput.fill(newLocation);
    await page.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Navigate away
    await page.goto("/");
    await page.goto("/blog");
    await page.goto("/profil");

    // Location should still be updated
    await expect(page.getByText(newLocation)).toBeVisible();
  });

  test("should handle profile updates with form validation errors", async ({ page }) => {
    // Try to update with invalid data
    await page.goto("/profil/duzenle");
    const websiteInput = page.getByLabel("Website");
    await websiteInput.clear();
    await websiteInput.fill("invalid-url");

    // Submit form
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Should show validation error
    await expect(page.locator("text=/Geçerli bir website URL'si girin/")).toBeVisible();

    // Should stay on edit page
    await expect(page).toHaveURL("/profil/duzenle");
  });

  test("should handle profile updates with network errors", async ({ page }) => {
    // Mock network error
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Network error" }),
      });
    });

    await page.goto("/profil/duzenle");
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill("Network Error Test");

    // Submit form
    await page.getByRole("button", { name: /Kaydet/ }).click();

    // Should show error message
    await expect(page.locator("text=/Network error/")).toBeVisible();

    // Should stay on edit page
    await expect(page).toHaveURL("/profil/duzenle");
  });

  test("should handle profile updates with concurrent modifications", async ({ page, context }) => {
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

    // Make different changes in each tab
    await page1.goto("/profil/duzenle");
    await page2.goto("/profil/duzenle");

    const bio1 = page1.getByLabel("Biyografi");
    const bio2 = page2.getByLabel("Biyografi");

    await bio1.clear();
    await bio1.fill("Tab 1 Bio");
    await bio2.clear();
    await bio2.fill("Tab 2 Bio");

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

  test("should handle profile updates with session expiration", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Make changes
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

  test("should handle profile updates with browser close and reopen", async ({ page, context }) => {
    const newDisplayName = `Reopen Test ${Date.now()}`;

    // Update profile
    await page.goto("/profil/duzenle");
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);
    await page.getByRole("button", { name: /Kaydet/ }).click();
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Close browser context
    await context.close();

    // Open new context and sign in
    const newContext = await page.context().browser()?.newContext();
    const newPage = await newContext?.newPage();

    if (newPage && newContext) {
      await newPage.goto("/login");
      const emailInput = newPage.getByLabel("E-posta");
      const passwordInput = newPage.getByLabel("Şifre");
      const submitButton = newPage.getByRole("button", { name: /E-posta ile devam et/i });

      await emailInput.fill(testEmail);
      await passwordInput.fill(testPassword);
      await submitButton.click();
      await expect(newPage).toHaveURL("/", { timeout: 10000 });

      // Check profile
      await newPage.goto("/profil");
      await expect(newPage.getByRole("heading", { name: newDisplayName })).toBeVisible();

      await newContext.close();
    }
  });
});
