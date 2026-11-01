import { test, expect } from "@playwright/test";

test("desktop homepage images, navigation and booking flow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Midnight Roast");
  await page.getByRole("button", { name: "Reserve a table", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const date = new Date();
  date.setDate(date.getDate() + 7);
  await dialog.getByLabel("Date", { exact: true }).fill(date.toISOString().slice(0, 10));
  await dialog.getByLabel("Party size").selectOption("3");
  await dialog.getByRole("radio", { name: "10:00 AM", exact: true }).check();
  await dialog.getByRole("button", { name: "Continue to your details" }).click();
  await dialog.getByLabel("Your name").fill("Test Visitor");
  await dialog.getByLabel("Email address").fill("visitor@example.com");
  await dialog.getByLabel("Phone number").fill("01234567890");
  await dialog.getByLabel(/Special requests/).fill("A quiet table, please.");
  await dialog.getByRole("button", { name: "Confirm reservation" }).click();
  await expect(dialog.getByRole("heading")).toHaveText("Your table is reserved");
  await expect(dialog.getByRole("status")).toContainText("3 guests");
  await expect(dialog.locator(".reservation-reference")).toHaveText(/^KF-[A-F0-9]{8}$/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "View Latte", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    document.querySelectorAll("img").forEach((image) => {
      image.loading = "eager";
    })
  );
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete && image.naturalWidth > 0)
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true
  );
  expect(errors).toEqual([]);
  await page.screenshot({ path: test.info().outputPath("home-desktop.png"), fullPage: true });
});

test("mobile menu, responsive bounds and delivery dialog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("navigation").locator('a[href="#about"]').click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(page).toHaveURL(/#about$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true
  );
  await page.getByRole("button", { name: "Get delivery", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("not connected");
  await page.getByRole("link", { name: "Browse coffee menu" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#menu$/);
  await page.screenshot({ path: test.info().outputPath("home-mobile.png"), fullPage: true });
});
