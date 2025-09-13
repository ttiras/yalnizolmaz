import { test, expect } from "@playwright/test";

test.describe("Debug Authentication", () => {
  const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
  const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "123456789";
  const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

  test("should debug authentication flow", async ({ page }) => {
    console.log("Test email:", testEmail);
    console.log("Test password:", testPassword);

    // Clear any existing session
    await page.context().clearCookies();

    // Go to login page
    await page.goto("/login");
    console.log("Current URL after going to login:", page.url());

    // Fill in credentials
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);

    console.log("Filled form with email:", testEmail);

    // Submit form
    await submitButton.click();
    console.log("Clicked submit button");

    // Wait a bit and check what happens
    await page.waitForTimeout(3000);
    console.log("Current URL after submit:", page.url());

    // Check for any error messages
    const errorMessages = await page
      .locator('[role="alert"], .error, [class*="error"]')
      .allTextContents();
    console.log("Error messages found:", errorMessages);

    // Check for success indicators
    const successMessages = await page
      .locator('[class*="success"], [class*="toast"]')
      .allTextContents();
    console.log("Success messages found:", successMessages);

    // Check cookies
    const cookies = await page.context().cookies();
    console.log(
      "Cookies after submit:",
      cookies.map((c) => ({ name: c.name, value: c.value.substring(0, 50) + "..." })),
    );

    // Check if we're redirected
    const currentUrl = page.url();
    console.log("Final URL:", currentUrl);

    if (currentUrl.includes("/login")) {
      console.log("Still on login page - authentication failed");
    } else {
      console.log("Redirected away from login page - authentication might have succeeded");
    }
  });
});
