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

test.describe("public quality assertions", () => {
  test("homepage has a canonical, indexable document", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/i);
    await expect(page.locator("body")).not.toContainText(/pending_review|private editorial draft|fixture/i);
  });

  test("homepage does not expose internal queue language", async ({ page }) => {
    await page.goto("/");
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const phrase of forbiddenPublicLanguage) {
      expect(body, `forbidden public phrase: ${phrase}`).not.toContain(phrase);
    }
  });

  test("homepage has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
  });

  test("homepage exposes structured data and six coverage lanes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    const laneLinks = await page.locator('a[href*="/coverage/"]').all();
    expect(laneLinks.length).toBeGreaterThanOrEqual(6);
  });

  test("mobile menu has an accessible open/close contract", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator(
      '[data-menu-toggle], .site-nav-toggle, button[aria-label*="menu" i]'
    ).first();
    await expect(trigger, "a mobile menu trigger is required").toHaveCount(1);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await trigger.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menuId = await trigger.getAttribute("aria-controls");
    const menu = menuId ? page.locator(`#${menuId}`) : page.locator(
      '[data-mobile-menu], .site-nav-menu, nav[aria-label*="menu" i]'
    ).first();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("homepage passes axe-core automated accessibility checks", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("visual baseline is captured for the approved desktop reference", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Run visual baselines once per desktop engine");
    await page.goto("/");
    await expect(page).toHaveScreenshot("homepage-approved.png", {
      animations: "disabled",
      caret: "hide",
      fullPage: true,
      maxDiffPixelRatio: 0.01
    });
  });
});

test.describe("metadata and release controls", () => {
  test("sitemap, robots, and canonical metadata agree", async ({ page, request }) => {
    await page.goto("/");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("https://www.afrodescendantali.com/");

    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/sitemap:/i);
    expect(robots).toMatch(/https:\/\/www\.afrodescendantali\.com\/sitemap\.xml/i);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<urlset");
    expect(sitemap).toMatch(/<loc>https:\/\/www\.afrodescendantali\.com\/analysis\//);
    expect(sitemap).toMatch(/<loc>https:\/\/www\.afrodescendantali\.com\/coverage\//);
    expect(sitemap).not.toMatch(/pending_review|preview-only|fixture/i);
  });
});
