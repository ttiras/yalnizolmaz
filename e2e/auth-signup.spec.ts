import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Sign Up Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
  });

  test("should display signup form correctly", async ({ page }) => {
    await page.goto("/signup");

    // Check page title and metadata
    await expect(page).toHaveTitle(/Kayıt Ol/);

    // Check form elements
    await expect(page.getByLabel("E-posta")).toBeVisible();
    await expect(page.getByLabel("Şifre")).toBeVisible();
    await expect(page.getByRole("button", { name: /E-posta ile devam et/i })).toBeVisible();

    // Check password requirements
    await expect(page.locator("text=/En az 9 karakter/")).toBeVisible();
    await expect(page.locator("text=/Sosyal ile giriş \\(yakında\\)/")).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/signup");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Test invalid email
    await emailInput.fill("invalid-email");
    await passwordInput.fill("validpassword123");
    await submitButton.click();

    // Should show validation error
    await expect(page.locator("text=/Geçerli bir e-posta girin/")).toBeVisible();
  });

  test("should validate password length", async ({ page }) => {
    await page.goto("/signup");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Test short password
    await emailInput.fill("test@example.com");
    await passwordInput.fill("short");
    await submitButton.click();

    // Should show validation error
    await expect(page.locator("text=/En az 9 karakter olmalı/")).toBeVisible();
  });

  test("should have functional form elements", async ({ page }) => {
    await page.goto("/signup");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Check that form elements are present and functional
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Test that inputs accept text
    await emailInput.fill("test@example.com");
    await passwordInput.fill("validpassword123");

    await expect(emailInput).toHaveValue("test@example.com");
    await expect(passwordInput).toHaveValue("validpassword123");
  });

  test("should successfully sign up with valid credentials", async ({ page }) => {
    // Generate unique email for this test
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    const testPassword = "validpassword123";

    await page.goto("/signup");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for navigation to home page
    await expect(page).toHaveURL("/", { timeout: 10000 });

    // Check that user is logged in by looking for user email in navbar
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });
  });

  test("should handle signup with existing email", async ({ page }) => {
    // Use a known existing email (if available in test environment)
    const existingEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const testPassword = "validpassword123";

    await page.goto("/signup");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(existingEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for error message
    await expect(
      page.locator("text=/kullanıcı zaten var|already exists|kayıt başarısız/i"),
    ).toBeVisible({
      timeout: 10000,
    });
  });

  test("should redirect to next parameter after successful signup", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    const testPassword = "validpassword123";

    // Navigate to signup with next parameter
    await page.goto("/signup?next=/blog");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Should redirect to /blog after successful signup
    await expect(page).toHaveURL("/blog", { timeout: 10000 });
  });

  test("should prevent access to signup when already logged in", async ({ page }) => {
    // First, sign up a user
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    const testPassword = "validpassword123";

    await page.goto("/signup");
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for successful signup
    await expect(page).toHaveURL("/", { timeout: 10000 });

    // Now try to access signup page again
    await page.goto("/signup");

    // Should be redirected to home page
    await expect(page).toHaveURL("/");
  });

  test("should have proper form accessibility", async ({ page }) => {
    await page.goto("/signup");

    // Check form labels are properly associated
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");

    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required");
    await expect(emailInput).toHaveAttribute("autocomplete", "email");

    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("autocomplete", "new-password");

    // Check form has proper structure
    const form = page.locator("form");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("novalidate");
  });
});
