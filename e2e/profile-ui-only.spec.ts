import { test, expect } from "@playwright/test";

test.describe("Profile UI Components (No Auth Required)", () => {
  test("should redirect to login when accessing profile page without authentication", async ({
    page,
  }) => {
    await page.goto("/profil");

    // Should redirect to login with next parameter
    await expect(page).toHaveURL(/\/login\?next=\/profil/);
  });

  test("should redirect to login when accessing profile edit page without authentication", async ({
    page,
  }) => {
    await page.goto("/profil/duzenle");

    // Should redirect to login with next parameter
    await expect(page).toHaveURL(/\/login\?next=\/profil\/duzenle/);
  });

  test("should display login form correctly", async ({ page }) => {
    await page.goto("/login");

    // Check page title
    await expect(page).toHaveTitle(/Giriş Yap/);

    // Check form elements
    await expect(page.getByLabel("E-posta")).toBeVisible();
    await expect(page.getByLabel("Şifre")).toBeVisible();
    await expect(page.getByRole("button", { name: /E-posta ile devam et/i })).toBeVisible();
  });

  test("should display signup form correctly", async ({ page }) => {
    await page.goto("/signup");

    // Check page title
    await expect(page).toHaveTitle(/Kayıt Ol/);

    // Check form elements
    await expect(page.getByLabel("E-posta")).toBeVisible();
    await expect(page.getByLabel("Şifre")).toBeVisible();
    await expect(page.getByRole("button", { name: /E-posta ile devam et/i })).toBeVisible();
  });

  test("should handle invalid login attempts", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Try invalid credentials
    await emailInput.fill("invalid@test.com");
    await passwordInput.fill("wrongpassword");
    await submitButton.click();

    // Should stay on login page with error
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("text=/Hatalı e-posta veya şifre/")).toBeVisible();
  });

  test("should handle empty form submission", async ({ page }) => {
    await page.goto("/login");

    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Submit empty form
    await submitButton.click();

    // Should show validation errors
    await expect(page.locator("text=/E-posta gerekli/")).toBeVisible();
    await expect(page.locator("text=/Şifre gerekli/")).toBeVisible();
  });

  test("should handle invalid email format", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Try invalid email format
    await emailInput.fill("not-an-email");
    await passwordInput.fill("password123");
    await submitButton.click();

    // Should show validation error
    await expect(page.locator("text=/Geçerli bir e-posta adresi girin/")).toBeVisible();
  });

  test("should handle short password", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Try short password
    await emailInput.fill("test@test.com");
    await passwordInput.fill("123");
    await submitButton.click();

    // Should show validation error
    await expect(page.locator("text=/Şifre en az 6 karakter olmalı/")).toBeVisible();
  });

  test("should navigate between login and signup pages", async ({ page }) => {
    await page.goto("/login");

    // Check for signup link
    const signupLink = page.getByRole("link", { name: /Kayıt ol/i });
    await expect(signupLink).toBeVisible();

    // Click signup link
    await signupLink.click();

    // Should navigate to signup page
    await expect(page).toHaveURL("/signup");

    // Check for login link
    const loginLink = page.getByRole("link", { name: /Giriş yap/i });
    await expect(loginLink).toBeVisible();

    // Click login link
    await loginLink.click();

    // Should navigate back to login page
    await expect(page).toHaveURL("/login");
  });

  test("should handle form submission with loading state", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Fill form
    await emailInput.fill("test@test.com");
    await passwordInput.fill("password123");

    // Submit form
    await submitButton.click();

    // Should show loading state
    await expect(page.getByRole("button", { name: /Gönderiliyor.../ })).toBeVisible();
  });

  test("should be accessible with keyboard navigation", async ({ page }) => {
    await page.goto("/login");

    // Tab through form elements
    await page.keyboard.press("Tab"); // Focus email input
    await page.keyboard.press("Tab"); // Focus password input
    await page.keyboard.press("Tab"); // Focus submit button

    // Check that focus is visible
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Test form submission with Enter key
    await page.keyboard.press("Enter");

    // Should show validation errors or loading state
    const hasValidationError = await page
      .locator("text=/E-posta gerekli/")
      .isVisible({ timeout: 1000 });
    const hasLoadingState = await page
      .getByRole("button", { name: /Gönderiliyor.../ })
      .isVisible({ timeout: 1000 });

    expect(hasValidationError || hasLoadingState).toBeTruthy();
  });

  test("should handle browser back button on auth pages", async ({ page }) => {
    await page.goto("/login");
    await page.goto("/signup");

    // Go back
    await page.goBack();

    // Should return to login page
    await expect(page).toHaveURL("/login");
  });

  test("should handle page refresh on auth pages", async ({ page }) => {
    await page.goto("/login");

    // Fill form
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");

    await emailInput.fill("test@test.com");
    await passwordInput.fill("password123");

    // Refresh page
    await page.reload();

    // Form should be reset
    await expect(emailInput).toHaveValue("");
    await expect(passwordInput).toHaveValue("");
  });
});
