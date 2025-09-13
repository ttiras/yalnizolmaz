import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Complete Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
  });

  test("should complete full signup to signin to signout flow", async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    const testPassword = "validpassword123";

    // Step 1: Sign up
    await page.goto("/signup");
    await expect(page).toHaveTitle(/Kayıt Ol/);

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for successful signup and redirect to home
    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Step 2: Sign out
    // Look for sign out button in user menu or navbar
    const userMenu = page.getByRole("link", { name: testEmail });
    await userMenu.click();

    // Look for sign out option
    const signOutButton = page.getByRole("button", { name: /Çıkış|Sign Out|Logout/i });
    await signOutButton.click();

    // Should be redirected to home page and no longer see user email
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: testEmail })).not.toBeVisible();

    // Step 3: Sign in again
    await page.goto("/login");
    await expect(page).toHaveTitle(/Giriş Yap/);

    const loginEmailInput = page.getByLabel("E-posta");
    const loginPasswordInput = page.getByLabel("Şifre");
    const loginSubmitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await loginEmailInput.fill(testEmail);
    await loginPasswordInput.fill(testPassword);
    await loginSubmitButton.click();

    // Wait for successful sign in
    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });
  });

  test("should handle authentication state persistence across page refreshes", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // Sign in
    await page.goto("/login");
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Wait for successful sign in
    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Refresh the page
    await page.reload();

    // Should still be logged in
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Navigate to different pages and verify authentication persists
    await page.goto("/blog");
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible();

    await page.goto("/profil");
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible();
  });

  test("should redirect unauthenticated users to login when accessing protected routes", async ({
    page,
  }) => {
    // Try to access profile page without being logged in
    await page.goto("/profil");

    // Should be redirected to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should handle authentication with next parameter correctly", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // Try to access a protected route first
    await page.goto("/profil");

    // Should be redirected to login with next parameter
    await expect(page).toHaveURL(/\/login\?next=\/profil/);

    // Sign in
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Should be redirected back to the original protected route
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should show appropriate UI elements based on authentication state", async ({ page }) => {
    // When not authenticated
    await page.goto("/");

    // Should see login/signup buttons
    await expect(page.getByRole("link", { name: /Giriş Yap|Login/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Kayıt Ol|Sign Up/i })).toBeVisible();

    // Sign in
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

    await expect(page).toHaveURL("/", { timeout: 10000 });

    // When authenticated
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible();
    await expect(page.getByRole("link", { name: /Giriş Yap|Login/i })).not.toBeVisible();
    await expect(page.getByRole("link", { name: /Kayıt Ol|Sign Up/i })).not.toBeVisible();
  });

  test("should handle concurrent authentication attempts gracefully", async ({ page, context }) => {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    const testPassword = "validpassword123";

    // Open multiple tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // Sign up in first tab
    await page1.goto("/signup");
    const emailInput1 = page1.getByLabel("E-posta");
    const passwordInput1 = page1.getByLabel("Şifre");
    const submitButton1 = page1.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput1.fill(testEmail);
    await passwordInput1.fill(testPassword);
    await submitButton1.click();

    await expect(page1).toHaveURL("/", { timeout: 10000 });
    await expect(page1.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Check that second tab also shows authenticated state
    await page2.goto("/");
    await expect(page2.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Clean up
    await page1.close();
    await page2.close();
  });

  test("should handle authentication errors with proper user feedback", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    // Test with invalid credentials
    await emailInput.fill("invalid@example.com");
    await passwordInput.fill("wrongpassword123");
    await submitButton.click();

    // Should show error message and stay on login page
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.locator("text=/kullanıcı bulunamadı|şifre yanlış|giriş başarısız|invalid|incorrect/i"),
    ).toBeVisible({ timeout: 10000 });

    // Form should still be functional after error
    await emailInput.clear();
    await emailInput.fill("test@example.com");
    await passwordInput.clear();
    await passwordInput.fill("validpassword123");
    await submitButton.click();

    // Should attempt login again
    await expect(page.getByRole("button", { name: /Gönderiliyor.../ })).toBeVisible();
  });

  test("should maintain authentication state across browser sessions", async ({
    page,
    context,
  }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // Sign in
    await page.goto("/login");
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Close the page and open a new one
    await page.close();
    const newPage = await context.newPage();

    // Should still be authenticated
    await newPage.goto("/");
    await expect(newPage.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    await newPage.close();
  });
});
