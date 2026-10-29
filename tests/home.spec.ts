import { test, expect } from '@playwright/test';

test('desktop homepage images, navigation and booking flow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Midnight Roast');
  await page.getByRole('button', { name: 'Book a table', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Your name').fill('Test Visitor');
  await dialog.getByLabel('Email address').fill('visitor@example.com');
  await dialog.getByLabel('Phone number').fill('01234567890');
  await dialog.getByLabel('Date', { exact: true }).fill('2030-10-29');
  await dialog.getByRole('button', { name: 'Submit demo request' }).click();
  await expect(dialog.getByRole('status')).toContainText('No reservation has been sent');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'View Latte', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; }));
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: 'docs/home-desktop.png', fullPage: true });
});

test('mobile menu, responsive bounds and delivery dialog', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.getByRole('navigation')).not.toBeVisible();
  await expect(page).toHaveURL(/#about$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Get delivery', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('not connected');
  await page.getByRole('link', { name: 'Browse coffee menu' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/#menu$/);
  await page.screenshot({ path: 'docs/home-mobile.png', fullPage: true });
});
