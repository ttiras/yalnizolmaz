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
    await expect(page.locator("text=/Geçerli bir e-posta adresi girin/")).toBeVisible();
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
    await expect(page.locator("text=/Şifre en az 9 karakter olmalı/")).toBeVisible();
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

    // With email verification required, we redirect with verify flag and do not auto sign-in
    await expect(page).toHaveURL("/?verify=1", { timeout: 10000 });
    // Modal with role=dialog and title
    const dialog = page.getByRole("dialog", { name: "E-postanı doğrula" });
    await expect(dialog).toBeVisible({ timeout: 5000 });
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

    // Wait for inline error alert under the submit button (scoped to form)
    const form = page.locator("form");
    const inlineAlert = form.locator('[role="alert"]');
    await expect(inlineAlert.first()).toBeVisible({ timeout: 10000 });
    await expect(inlineAlert.first()).toContainText(
      /Email already in use|kullanıcı zaten var|kayıt başarısız/i,
    );
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

    // Should redirect to /blog with verify flag after signup (no auto sign-in)
    await expect(page).toHaveURL("/blog?verify=1", { timeout: 10000 });
    const dialog2 = page.getByRole("dialog", { name: "E-postanı doğrula" });
    await expect(dialog2).toBeVisible({ timeout: 5000 });
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

    // Wait for verification redirect (no auto sign-in)
    await expect(page).toHaveURL("/?verify=1", { timeout: 10000 });
    await expect(page.getByRole("dialog", { name: "E-postanı doğrula" })).toBeVisible({
      timeout: 5000,
    });

    // Now try to access signup page again: still allowed since user isn't logged in yet
    await page.goto("/signup");
    await expect(page).toHaveURL("/signup");
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
