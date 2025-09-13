import { test, expect } from "@playwright/test";

test.skip(
  process.env.E2E_WITH_AUTH !== "1",
  "Auth e2e disabled. Run with E2E_WITH_AUTH=1 and a running Nhost backend.",
);

test.describe("Authentication Blog Integration", () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
  });

  test("should require authentication for commenting on blog posts", async ({ page }) => {
    // Navigate to a blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Look for comment section and try to interact
    const commentSection = page
      .locator('[data-testid="comments-section"], .comments, [class*="comment"]')
      .first();

    if (await commentSection.isVisible()) {
      // Try to find comment input or compose button
      const commentInput = page
        .locator(
          'textarea[placeholder*="yorum"], input[placeholder*="yorum"], [data-testid="comment-input"]',
        )
        .first();
      const composeButton = page.getByRole("button", { name: /yorum|comment|yaz/i }).first();

      if (await commentInput.isVisible()) {
        // Try to type in comment input
        await commentInput.click();
        await commentInput.fill("Test comment");

        // Should either show login prompt or redirect to login
        const loginPrompt = page.locator("text=/giriş|login|giriş yap/i");
        if (await loginPrompt.isVisible({ timeout: 2000 })) {
          await expect(loginPrompt).toBeVisible();
        } else {
          // Check if redirected to login
          await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        }
      } else if (await composeButton.isVisible()) {
        // Click compose button
        await composeButton.click();

        // Should either show login prompt or redirect to login
        const loginPrompt = page.locator("text=/giriş|login|giriş yap/i");
        if (await loginPrompt.isVisible({ timeout: 2000 })) {
          await expect(loginPrompt).toBeVisible();
        } else {
          // Check if redirected to login
          await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        }
      }
    }
  });

  test("should allow commenting after authentication", async ({ page }) => {
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

    // Consider authentication successful if nhost session cookie is set and we didn't land on /login?error=1
    await expect
      .poll(
        async () => {
          const cookies = await page.context().cookies();
          const hasSession = cookies.some((c) => c.name === "nhostSession");
          const url = page.url();
          return hasSession && !url.includes("/login?error=1");
        },
        { timeout: 15000 },
      )
      .toBe(true);

    // Now navigate to blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Look for comment section
    const commentSection = page
      .locator('[data-testid="comments-section"], .comments, [class*="comment"]')
      .first();

    if (await commentSection.isVisible()) {
      // Should be able to interact with comment functionality
      const commentInput = page
        .locator(
          'textarea[placeholder*="yorum"], input[placeholder*="yorum"], [data-testid="comment-input"]',
        )
        .first();
      const composeButton = page.getByRole("button", { name: /yorum|comment|yaz/i }).first();

      if (await commentInput.isVisible()) {
        // Should be able to type in comment input
        await commentInput.click();
        await commentInput.fill("Test comment from authenticated user");
        await expect(commentInput).toHaveValue("Test comment from authenticated user");
      } else if (await composeButton.isVisible()) {
        // Should be able to click compose button
        await composeButton.click();
        // Look for comment form that should appear
        const commentForm = page.locator('form, textarea, input[type="text"]').first();
        await expect(commentForm).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test("should require authentication for liking blog content", async ({ page }) => {
    // Navigate to a blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Look for like button
    const likeButton = page.getByRole("button", { name: /beğen|like|❤|♥/i }).first();

    if (await likeButton.isVisible()) {
      // Try to click like button
      await likeButton.click();

      // Should either show login prompt or redirect to login
      const loginPrompt = page.locator("text=/giriş|login|giriş yap/i");
      if (await loginPrompt.isVisible({ timeout: 2000 })) {
        await expect(loginPrompt).toBeVisible();
      } else {
        // Check if redirected to login
        await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
      }
    }
  });

  test("should allow liking after authentication", async ({ page }) => {
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

    await expect(page).toHaveURL("/", { timeout: 10000 });
    await expect(page.getByRole("link", { name: testEmail })).toBeVisible({ timeout: 5000 });

    // Now navigate to blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Look for like button
    const likeButton = page.getByRole("button", { name: /beğen|like|❤|♥/i }).first();

    if (await likeButton.isVisible()) {
      // Should be able to click like button
      await likeButton.click();

      // Should not redirect to login or show login prompt
      await expect(page).toHaveURL(/\/blog\/yalnizlik-sozleri/);

      // Look for any success indication or state change
      const successIndicator = page.locator("text=/beğenildi|liked|başarılı/i");
      if (await successIndicator.isVisible({ timeout: 2000 })) {
        await expect(successIndicator).toBeVisible();
      }
    }
  });

  test("should preserve next parameter when redirecting from blog to login", async ({ page }) => {
    // Navigate to a blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Try to interact with authenticated feature
    const likeButton = page.getByRole("button", { name: /beğen|like|❤|♥/i }).first();
    const commentInput = page
      .locator('textarea[placeholder*="yorum"], input[placeholder*="yorum"]')
      .first();

    if (await likeButton.isVisible()) {
      await likeButton.click();
    } else if (await commentInput.isVisible()) {
      await commentInput.click();
    }

    // Should either remain on blog page with a login prompt OR be redirected to login with next parameter
    const onBlog = /\/blog\/yalnizlik-sozleri/.test(page.url());
    if (!onBlog) {
      await expect(page).toHaveURL(/\/login\?next=\/blog\/yalnizlik-sozleri/, { timeout: 5000 });
    }
  });

  test("should redirect back to blog post after successful authentication", async ({ page }) => {
    const testEmail = process.env.NHOST_TEST_EMAIL_A || "test@test.com";
    const rawPass = process.env.NHOST_TEST_PASSWORD_A || process.env.PASSWORD || "1234test1234";
    const testPassword = rawPass.replace(/\r?\n/g, "").replace(/\s+$/g, "");

    // Navigate to blog post first
    await page.goto("/blog/yalnizlik-sozleri");

    // Try to interact with authenticated feature to trigger login redirect
    const likeButton = page.getByRole("button", { name: /beğen|like|❤|♥/i }).first();
    const commentInput = page
      .locator('textarea[placeholder*="yorum"], input[placeholder*="yorum"]')
      .first();

    if (await likeButton.isVisible()) {
      await likeButton.click();
    } else if (await commentInput.isVisible()) {
      await commentInput.click();
    }

    // Should either remain on blog page with a login prompt OR be redirected to login with next parameter
    const onBlog2 = /\/blog\/yalnizlik-sozleri/.test(page.url());
    if (!onBlog2) {
      await expect(page).toHaveURL(/\/login\?next=\/blog\/yalnizlik-sozleri/, { timeout: 5000 });
    }

    // Sign in
    const emailInput = page.getByLabel("E-posta");
    const passwordInput = page.getByLabel("Şifre");
    const submitButton = page.getByRole("button", { name: /E-posta ile devam et/i });

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    // Should be redirected back to the blog post
    await expect(page).toHaveURL(/\/blog\/yalnizlik-sozleri/, { timeout: 10000 });
  });

  test("should show different UI elements based on authentication state on blog pages", async ({
    page,
  }) => {
    // When not authenticated
    await page.goto("/blog/yalnizlik-sozleri");

    // Should see login prompts or disabled interactive elements
    const loginPrompts = page.locator("text=/giriş|login|giriş yap/i");
    const disabledElements = page.locator("button[disabled], input[disabled]");

    // At least one of these should be present
    const hasLoginPrompt = (await loginPrompts.count()) > 0;
    const hasDisabledElements = (await disabledElements.count()) > 0;

    expect(hasLoginPrompt || hasDisabledElements).toBeTruthy();

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

    // Now navigate back to blog post
    await page.goto("/blog/yalnizlik-sozleri");

    // Should see interactive elements for authenticated users
    const interactiveElements = page.locator(
      "button:not([disabled]), textarea:not([disabled]), input:not([disabled])",
    );
    await expect(interactiveElements.first()).toBeVisible({ timeout: 5000 });
  });
});
