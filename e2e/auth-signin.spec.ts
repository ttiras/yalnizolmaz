import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Sign In Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
  });

  test("should display login form correctly", async ({ page }) => {
    await page.goto("/login");

    // Check page title and metadata
    await expect(page).toHaveTitle(/Giriş Yap/);

    // Check form elements
    await expect(page.getByLabel("E-posta")).toBeVisible();
    await expect(page.getByLabel("Şifre")).toBeVisible();
    await expect(page.getByRole("button", { name: /E-posta ile devam et/i })).toBeVisible();

    // Check password requirements
    await expect(page.locator("text=/En az 9 karakter/")).toBeVisible();
    await expect(page.locator("text=/Sosyal ile giriş \\(yakında\\)/")).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/login");

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
    await page.goto("/login");

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
    await page.goto("/login");

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

  test("should successfully sign in with valid credentials", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for navigation to home page and authenticated cookie
    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect
      .poll(
        async () => {
          const cookies = await page.context().cookies();
          return cookies.some((c) => c.name === "nhostSession");
        },
        { timeout: 10000 },
      )
      .toBe(true);
  });

  test("should handle sign in with invalid credentials", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill("nonexistent@example.com");
    await passwordInput.fill("wrongpassword123");
    await submitButton.click();

    // Should remain on login and not set session cookie
    await expect(page).toHaveURL(/\/login(\?|$)/, { timeout: 10000 });
    await expect
      .poll(
        async () => {
          const cookies = await page.context().cookies();
          return cookies.some((c) => c.name === "nhostSession");
        },
        { timeout: 2000 },
      )
      .toBe(false);
  });

  test("should redirect to next parameter after successful sign in", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // Navigate to login with next parameter
    await page.goto("/login?next=/blog");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Should redirect to /blog after successful sign in
    await expect(page).toHaveURL("/blog", { timeout: 10000 });
  });

  test("should prevent access to login when already logged in", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // First, sign in
    await page.goto("/login");
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for successful sign in
    await expect(page).toHaveURL("/", { timeout: 10000 });

    // Now try to access login page again
    await page.goto("/login");

    // Should be redirected to home page
    await expect(page).toHaveURL("/");
  });

  test("should handle server-side form submission", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);

    // Test server-side form submission by pressing Enter
    await passwordInput.press("Enter");

    // Wait for navigation to home page and authenticated cookie
    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect
      .poll(
        async () => {
          const cookies = await page.context().cookies();
          return cookies.some((c) => c.name === "nhostSession");
        },
        { timeout: 10000 },
      )
      .toBe(true);
  });

  test("should have proper form accessibility", async ({ page }) => {
    await page.goto("/login");

    // Check form labels are properly associated
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");

    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(emailInput).toHaveAttribute("required");
    await expect(emailInput).toHaveAttribute("autocomplete", "email");

    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("autocomplete", "current-password");

    // Check form has proper structure
    const form = page.locator("form");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("novalidate");
  });

  test("should handle error display correctly", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Test with empty fields
    await submitButton.click();

    // Should show validation errors for required fields
    await expect(page.locator("text=/E-posta gerekli/")).toBeVisible();
    await expect(page.locator("text=/Şifre gerekli/")).toBeVisible();
  });

  test("should preserve next parameter in error scenarios", async ({ page }) => {
    await page.goto("/login?next=/blog");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Test with invalid credentials
    await emailInput.fill("invalid@example.com");
    await passwordInput.fill("wrongpassword123");
    await submitButton.click();

    // Should stay on login page with next parameter preserved
    await expect(page).toHaveURL(/\/login\?next=\/blog/);
  });
});
