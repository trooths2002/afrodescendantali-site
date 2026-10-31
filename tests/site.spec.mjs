import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const publicRoutes = [
  "/",
  "/analysis/",
  "/coverage/",
  "/coverage/sub-saharan-africa.html",
  "/coverage/black-america.html",
  "/coverage/black-caribbean.html",
  "/coverage/afro-latino.html",
  "/coverage/afro-europe.html",
  "/coverage/indian-ocean.html",
  "/media.html",
  "/method.html",
  "/about.html",
  "/contact.html"
];

const forbiddenPublicLanguage = [
  "pending_review",
  "private editorial draft",
  "private preview only",
  "fixture",
  "candidate source",
  "review required",
  "still being reviewed",
  "feed activation disabled"
];

test.describe("public route contract", () => {
  for (const route of publicRoutes) {
    test(`${route} responds successfully`, async ({ request }) => {
      const response = await request.get(route);
      expect(response.status(), route).toBe(200);
    });
  }
});

test.describe("homepage release assertions", () => {
  test("homepage has canonical, indexable, structured metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/i);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("homepage contains real published content and no internal queue language", async ({ page }) => {
    await page.goto("/");
    const body = (await page.locator("body").innerText()).toLowerCase();
    expect(body).toContain("published analysis");
    for (const phrase of forbiddenPublicLanguage) {
      expect(body, `forbidden public phrase: ${phrase}`).not.toContain(phrase);
    }
  });

  test("homepage exposes six coverage lanes", async ({ page }) => {
    await page.goto("/");
    const routes = await page.locator('a[href*="/coverage/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")).filter(Boolean)
    );
    for (const lane of [
      "sub-saharan-africa.html",
      "black-america.html",
      "black-caribbean.html",
      "afro-latino.html",
      "afro-europe.html",
      "indian-ocean.html"
    ]) expect(routes).toContain(`/coverage/${lane}`);
  });

  test("mobile menu opens, closes with Escape, and returns focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator("button.menu-toggle");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.focus();
    await trigger.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("homepage has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
  });

  test("homepage passes axe-core automated checks", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("approved desktop visual baseline is captured", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Run one desktop visual baseline");
    await page.goto("/");
    await expect(page).toHaveScreenshot("studio-briefing-homepage.png", {
      animations: "disabled",
      caret: "hide",
      fullPage: true,
      maxDiffPixelRatio: 0.01
    });
  });
});

test.describe("metadata and release controls", () => {
  test("sitemap and robots remain coherent", async ({ page, request }) => {
    await page.goto("/");
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe("https://www.afrodescendantali.com/");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/sitemap:/i);
    expect(robots).toMatch(/https:\/\/www\.afrodescendantali\.com\/sitemap\.xml/i);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<urlset");
    for (const lane of ["sub-saharan-africa", "black-america", "black-caribbean", "afro-latino", "afro-europe", "indian-ocean"]) {
      expect(sitemap).toContain(`/coverage/${lane}`);
    }
    expect(sitemap).not.toMatch(/pending_review|preview-only|fixture/i);
  });
});
