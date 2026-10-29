import { test, expect } from "@playwright/test";

test("smooth scrolling, cursor, horizontal journey and dialog scroll lock", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Midnight Roast");
  await page.mouse.move(700, 350);
  await expect(page.locator(".bean-cursor")).toHaveCSS("opacity", "1");
  await expect(page.locator(".midnight-cup canvas")).toBeVisible();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "docs/midnight-desktop.png" });
  await page.mouse.wheel(0, 650);
  await page.waitForTimeout(100);
  const first = await page.evaluate(() => scrollY);
  await page.waitForTimeout(1400);
  const last = await page.evaluate(() => scrollY);
  expect(last).toBeGreaterThan(first);
  const journey = page.locator("#journey");
  await expect(journey).toHaveClass(/journey--pinned/);
  const start = await journey.evaluate((el) => el.getBoundingClientRect().top + scrollY);
  for (const [offset, index] of [
    [0, 0],
    [1000, 1],
    [2000, 2],
  ]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), start + offset);
    await page.waitForTimeout(1800);
    const bounds = await page.locator(".journey-panel").nth(index).boundingBox();
    expect(Math.abs(bounds!.x)).toBeLessThan(5);
    expect(Math.abs(bounds!.y)).toBeLessThan(5);
    await expect(page.locator(".journey-panel").nth(index).locator("h2")).toBeVisible();
    await page.screenshot({ path: `docs/journey-${index + 1}.png` });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Book a table", exact: true }).click();
  const before = await page.evaluate(() => scrollY);
  await page.mouse.move(30, 200);
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1300);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(before);
  expect(errors).toEqual([]);
});

test("mobile and reduced motion keep every journey panel readable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#journey")).not.toHaveClass(/journey--pinned/);
  await expect(page.locator(".cursor-trail")).toBeHidden();
  for (const panel of await page.locator(".journey-panel").all()) {
    await panel.scrollIntoViewIfNeeded();
    const box = await panel.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.width).toBeLessThanOrEqual(390);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "docs/midnight-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator("#journey")).not.toHaveClass(/journey--pinned/);
  await expect(page.locator(".cursor-trail")).toBeHidden();
  expect(await page.locator(".journey-panel").count()).toBe(3);
  await page.locator("#menu").scrollIntoViewIfNeeded();
  await expect(page.locator("#menu h2")).toHaveCSS("opacity", "1");
});
