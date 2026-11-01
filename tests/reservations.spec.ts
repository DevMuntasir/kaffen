import { randomUUID } from "node:crypto";
import { test, expect } from "@playwright/test";

function futureDate(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
const details = () => ({
  requestId: randomUUID(),
  date: futureDate(60),
  time: "12:00",
  guests: 8,
  name: "Reservation Test",
  email: "test@example.com",
  phone: "+1 212 555 0101",
  notes: "",
});

test("validates reservation input and rejects past dates", async ({ request }) => {
  expect((await request.get("/api/reservations?date=2020-01-01&guests=2")).status()).toBe(400);
  expect((await request.get(`/api/reservations?date=${futureDate(3)}&guests=9`)).status()).toBe(
    400
  );
  expect(
    (await request.post("/api/reservations", { data: { ...details(), email: "invalid" } })).status()
  ).toBe(400);
  expect(
    (
      await request.post("/api/reservations", { data: { ...details(), date: "2020-01-01" } })
    ).status()
  ).toBe(400);
  expect(
    (await request.post("/api/reservations", { data: { ...details(), time: "20:00" } })).status()
  ).toBe(400);
});

test("saves once, prevents concurrent overbooking and accounts for overlapping sittings", async ({
  request,
}) => {
  const input = details();
  const first = await request.post("/api/reservations", { data: input });
  expect(first.status()).toBe(201);
  const receipt = (await first.json()).reservation;
  expect(receipt.reference).toMatch(/^KF-[A-F0-9]{8}$/);
  expect(receipt.email).toBeUndefined();
  const retry = await request.post("/api/reservations", { data: input });
  expect((await retry.json()).reservation.reference).toBe(receipt.reference);
  const concurrent = await Promise.all(
    Array.from({ length: 3 }, () => request.post("/api/reservations", { data: details() }))
  );
  expect(concurrent.map((r) => r.status()).sort()).toEqual([201, 201, 409]);
  const availability = await request.get(`/api/reservations?date=${input.date}&guests=1`);
  const { times } = await availability.json();
  expect(times).not.toContain("11:00");
  expect(times).not.toContain("12:00");
  expect(times).not.toContain("13:00");
  expect(times).toContain("13:30");
  expect(
    (
      await request.post("/api/reservations", { data: { ...details(), time: "12:30", guests: 1 } })
    ).status()
  ).toBe(409);
});

test("mobile reservation flow supports changing details without losing contact information", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Reserve a table", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Continue to your details" })).toBeDisabled();
  await dialog.getByLabel("Date", { exact: true }).fill(futureDate(10));
  await dialog.getByRole("radio", { name: "9:00 AM", exact: true }).check();
  await dialog.getByRole("button", { name: "Continue to your details" }).click();
  await dialog.getByLabel("Your name").fill("Mobile Guest");
  await dialog.getByRole("button", { name: "Change", exact: true }).click();
  await dialog.getByRole("radio", { name: "10:00 AM", exact: true }).check();
  await dialog.getByRole("button", { name: "Continue to your details" }).click();
  await expect(dialog.getByLabel("Your name")).toHaveValue("Mobile Guest");
  await expect(dialog.locator(".reservation-summary")).toContainText("10:00 AM");
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await dialog.screenshot({ path: test.info().outputPath("reservation-mobile.png") });
});
