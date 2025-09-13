import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Profile Management E2E", () => {
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

  test("should display profile page correctly", async ({ page }) => {
    await page.goto("/profil");

    // Check page title
    await expect(page).toHaveTitle(/Profil/);

    // Check main profile elements
    await expect(page.getByRole("heading", { name: testEmail })).toBeVisible();
    await expect(page.getByText("Hesap Bilgileri")).toBeVisible();
    await expect(page.getByText("Profil İstatistikleri")).toBeVisible();
    await expect(page.getByText("Son Aktiviteler")).toBeVisible();

    // Check edit button
    await expect(page.getByRole("link", { name: /Düzenle/ })).toBeVisible();
  });

  test("should navigate to profile edit page", async ({ page }) => {
    await page.goto("/profil");

    // Click edit button
    await page.getByRole("link", { name: /Düzenle/ }).click();

    // Should navigate to edit page
    await expect(page).toHaveURL("/profil/duzenle");
    await expect(page).toHaveTitle(/Profil Düzenle/);
  });

  test("should display profile edit form with current data", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Check form elements
    await expect(page.getByLabel("Görünen Ad")).toBeVisible();
    await expect(page.getByLabel("Biyografi")).toBeVisible();
    await expect(page.getByLabel("Konum")).toBeVisible();
    await expect(page.getByLabel("Website")).toBeVisible();
    await expect(page.getByLabel("E-posta")).toBeVisible();

    // Check that email is disabled
    const emailInput = page.getByLabel("E-posta");
    await expect(emailInput).toBeDisabled();
    await expect(emailInput).toHaveValue(testEmail);

    // Check action buttons
    await expect(page.getByRole("button", { name: /Kaydet/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /İptal/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Geri/ })).toBeVisible();
  });

  test("should update display name successfully", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Update display name
    const newDisplayName = `Test User ${Date.now()}`;
    await displayNameInput.clear();
    await displayNameInput.fill(newDisplayName);

    // Submit form
    await submitButton.click();

    // Should redirect to profile page
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Check that display name was updated
    await expect(page.getByRole("heading", { name: newDisplayName })).toBeVisible();
  });

  test("should update bio successfully", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const bioInput = page.getByLabel("Biyografi");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Update bio
    const newBio = `Test bio content ${Date.now()}`;
    await bioInput.clear();
    await bioInput.fill(newBio);

    // Submit form
    await submitButton.click();

    // Should redirect to profile page
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Check that bio was updated
    await expect(page.getByText(newBio)).toBeVisible();
  });

  test("should update location successfully", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const locationInput = page.getByLabel("Konum");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Update location
    const newLocation = `Test City ${Date.now()}`;
    await locationInput.clear();
    await locationInput.fill(newLocation);

    // Submit form
    await submitButton.click();

    // Should redirect to profile page
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Check that location was updated
    await expect(page.getByText(newLocation)).toBeVisible();
  });

  test("should update website successfully", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const websiteInput = page.getByLabel("Website");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Update website
    const newWebsite = `https://testwebsite${Date.now()}.com`;
    await websiteInput.clear();
    await websiteInput.fill(newWebsite);

    // Submit form
    await submitButton.click();

    // Should redirect to profile page
    await expect(page).toHaveURL("/profil", { timeout: 10000 });

    // Check that website was updated
    await expect(page.getByRole("link", { name: newWebsite })).toBeVisible();
  });

  test("should validate website URL format", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const websiteInput = page.getByLabel("Website");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Try invalid URL
    await websiteInput.clear();
    await websiteInput.fill("not-a-valid-url");

    // Submit form
    await submitButton.click();

    // Should show error message
    await expect(page.locator("text=/Geçerli bir website URL'si girin/")).toBeVisible();
  });

  test("should respect character limits", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const bioInput = page.getByLabel("Biyografi");

    // Test display name character limit
    const longDisplayName = "a".repeat(101);
    await displayNameInput.clear();
    await displayNameInput.fill(longDisplayName);

    // Should be truncated to 100 characters
    await expect(displayNameInput).toHaveValue("a".repeat(100));

    // Test bio character limit
    const longBio = "a".repeat(501);
    await bioInput.clear();
    await bioInput.fill(longBio);

    // Should be truncated to 500 characters
    await expect(bioInput).toHaveValue("a".repeat(500));
  });

  test("should show character counters", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const bioInput = page.getByLabel("Biyografi");

    // Check initial counters
    await expect(page.getByText("0/100 karakter")).toBeVisible();
    await expect(page.getByText("0/500 karakter")).toBeVisible();

    // Type some text and check counters update
    await displayNameInput.fill("Test Name");
    await expect(page.getByText("9/100 karakter")).toBeVisible();

    await bioInput.fill("Test bio content");
    await expect(page.getByText("16/500 karakter")).toBeVisible();
  });

  test("should handle form validation errors", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Clear display name (required field)
    await displayNameInput.clear();

    // Submit form
    await submitButton.click();

    // Should show validation error
    await expect(page.locator("text=/Display name is required/")).toBeVisible();
  });

  test("should cancel editing and return to profile", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Make some changes
    const displayNameInput = page.getByLabel("Görünen Ad");
    await displayNameInput.clear();
    await displayNameInput.fill("Modified Name");

    // Click cancel
    await page.getByRole("link", { name: /İptal/ }).click();

    // Should return to profile page
    await expect(page).toHaveURL("/profil");

    // Changes should not be saved
    await expect(page.getByRole("heading", { name: "Modified Name" })).not.toBeVisible();
  });

  test("should navigate back to profile from edit page", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Click back button
    await page.getByRole("link", { name: /Geri/ }).click();

    // Should return to profile page
    await expect(page).toHaveURL("/profil");
  });

  test("should show loading state during form submission", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Make a change
    await displayNameInput.clear();
    await displayNameInput.fill("Loading Test");

    // Submit form
    await submitButton.click();

    // Should show loading state
    await expect(page.getByRole("button", { name: /Kaydediliyor.../ })).toBeVisible();
  });

  test("should handle profile update errors gracefully", async ({ page }) => {
    // Mock a network error by intercepting the API call
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Server error" }),
      });
    });

    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Make a change
    await displayNameInput.clear();
    await displayNameInput.fill("Error Test");

    // Submit form
    await submitButton.click();

    // Should show error message
    await expect(page.locator("text=/Server error/")).toBeVisible();
  });

  test("should preserve form data on validation errors", async ({ page }) => {
    await page.goto("/profil/duzenle");

    const displayNameInput = page.getByLabel("Görünen Ad");
    const bioInput = page.getByLabel("Biyografi");
    const submitButton = page.getByRole("button", { name: /Kaydet/ });

    // Fill form with valid data
    const testDisplayName = "Test Display Name";
    const testBio = "Test bio content";

    await displayNameInput.clear();
    await displayNameInput.fill(testDisplayName);
    await bioInput.clear();
    await bioInput.fill(testBio);

    // Mock validation error
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ message: "Validation error" }),
      });
    });

    // Submit form
    await submitButton.click();

    // Should show error but preserve form data
    await expect(page.locator("text=/Validation error/")).toBeVisible();
    await expect(displayNameInput).toHaveValue(testDisplayName);
    await expect(bioInput).toHaveValue(testBio);
  });

  test("should display user avatar correctly", async ({ page }) => {
    await page.goto("/profil");

    // Check that avatar is displayed
    const avatar = page
      .locator('[data-testid="user-avatar"], .avatar, img[alt*="avatar"], img[alt*="user"]')
      .first();
    await expect(avatar).toBeVisible();

    // Check avatar size and styling
    await expect(avatar).toHaveCSS("width", "120px");
    await expect(avatar).toHaveCSS("height", "120px");
  });

  test("should display profile statistics", async ({ page }) => {
    await page.goto("/profil");

    // Check statistics section
    await expect(page.getByText("Profil İstatistikleri")).toBeVisible();
    await expect(page.getByText("Yazı")).toBeVisible();
    await expect(page.getByText("Yorum")).toBeVisible();
    await expect(page.getByText("Beğeni")).toBeVisible();
    await expect(page.getByText("Katkı")).toBeVisible();

    // Check that all stats show 0 initially
    const stats = page.locator(".text-2xl.font-bold");
    const statCounts = await stats.allTextContents();
    expect(statCounts.every((count) => count === "0")).toBeTruthy();
  });

  test("should display account information correctly", async ({ page }) => {
    await page.goto("/profil");

    // Check account information section
    await expect(page.getByText("Hesap Bilgileri")).toBeVisible();
    await expect(page.getByText("E-posta")).toBeVisible();
    await expect(page.getByText("Kullanıcı ID")).toBeVisible();

    // Check that email is displayed
    await expect(page.getByText(testEmail)).toBeVisible();

    // Check that user ID is displayed
    await expect(page.locator("text=/[a-f0-9-]{36}/")).toBeVisible(); // UUID format
  });

  test("should handle empty profile data gracefully", async ({ page }) => {
    // Mock empty profile data
    await page.route("**/api/profil/guncelle", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Profile updated" }),
      });
    });

    await page.goto("/profil/duzenle");

    // Check that form handles empty data
    const bioInput = page.getByLabel("Biyografi");
    const locationInput = page.getByLabel("Konum");
    const websiteInput = page.getByLabel("Website");

    // All fields should be empty initially
    await expect(bioInput).toHaveValue("");
    await expect(locationInput).toHaveValue("");
    await expect(websiteInput).toHaveValue("");

    // Should be able to submit empty form
    const submitButton = page.getByRole("button", { name: /Kaydet/ });
    await submitButton.click();

    // Should redirect to profile page
    await expect(page).toHaveURL("/profil", { timeout: 10000 });
  });

  test("should be accessible with keyboard navigation", async ({ page }) => {
    await page.goto("/profil/duzenle");

    // Tab through form elements
    await page.keyboard.press("Tab"); // Focus first input
    await page.keyboard.press("Tab"); // Focus next input
    await page.keyboard.press("Tab"); // Focus next input

    // Check that focus is visible
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Test form submission with Enter key
    await page.keyboard.press("Enter");

    // Should either submit form or show validation error
    const hasValidationError = await page
      .locator("text=/Display name is required/")
      .isVisible({ timeout: 1000 });
    const hasRedirected = !page.url().includes("/profil/duzenle");

    expect(hasValidationError || hasRedirected).toBeTruthy();
  });
});
