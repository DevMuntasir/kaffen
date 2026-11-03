import { randomUUID } from "node:crypto";
import { test, expect } from "@playwright/test";

function futureDate(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
function calendarDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
const details = () => ({
  requestId: randomUUID(),
  date: futureDate(60),
  time: "12:00",
  guests: 8,
  duration: 90,
  name: "Reservation Test",
  phone: "+1 212 555 0101",
  email: "test@example.com",
  gatheringType: "Adda",
  gatheringOther: "",
  foodAndBeverage: "Coffee and pastries",
});

test("validates reservation input and rejects past dates", async ({ request }) => {
  expect((await request.get("/api/reservations?date=2020-01-01&guests=2")).status()).toBe(400);
  expect((await request.get(`/api/reservations?date=${futureDate(3)}&guests=9`)).status()).toBe(
    400
  );
  for (const invalid of [{ guests: 1.5 }, { duration: 0 }, { duration: 181 }, { duration: 75.5 }]) {
    expect(
      (await request.post("/api/reservations", { data: { ...details(), ...invalid } })).status()
    ).toBe(400);
  }
  for (const invalid of [
    { email: "invalid" },
    { email: "" },
    { gatheringType: "" },
    { gatheringType: "Unknown" },
    { gatheringType: "Other", gatheringOther: "" },
    { gatheringType: "Adda", gatheringOther: "Unexpected explanation" },
    { foodAndBeverage: "" },
    { foodAndBeverage: "x".repeat(1001) },
  ]) {
    expect(
      (await request.post("/api/reservations", { data: { ...details(), ...invalid } })).status()
    ).toBe(400);
  }
  expect(
    (await request.post("/api/reservations", { data: { ...details(), phone: "invalid" } })).status()
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

test("mobile reservation submits host, gathering and food choices on a single screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Reserve a table", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const confirm = dialog.getByRole("button", { name: "Confirm reservation" });
  await expect(confirm).toBeDisabled();
  await expect(dialog.getByRole("combobox")).toHaveCount(1);
  await dialog
    .getByRole("textbox", { name: "Point of contact / host", exact: true })
    .fill("Mobile Guest");
  await dialog.getByLabel("Mobile number").fill("01712345678");
  await dialog.getByLabel("Host email").fill("guest@example.com");
  await dialog.getByLabel("Type of gathering").selectOption("Other");
  await expect(dialog.getByLabel("Explain your gathering")).toBeVisible();
  await dialog.getByLabel("Explain your gathering").fill("A book club discussion");
  await dialog.getByLabel("Type of gathering").selectOption("Adda");
  await expect(dialog.getByLabel("Explain your gathering")).toHaveCount(0);
  await dialog.getByLabel("Type of gathering").selectOption("Other");
  await expect(dialog.getByLabel("Explain your gathering")).toBeEmpty();
  await dialog.getByLabel("Explain your gathering").fill("A book club discussion");
  await dialog.getByLabel("Choice of food and beverage").fill("Coffee, tea and sandwiches");
  await dialog.getByRole("spinbutton", { name: "Number of guests" }).fill("3");
  await dialog.getByRole("spinbutton", { name: "Booking length" }).fill("75");
  const meetingDate = futureDate(10);
  await dialog
    .getByRole("button", { name: new RegExp(`^Select ${calendarDateLabel(meetingDate)}`) })
    .click();
  await dialog.getByRole("radio", { name: "9:00 AM", exact: true }).check();
  await dialog.getByRole("spinbutton", { name: "Booking length" }).clear();
  await expect(confirm).toBeDisabled();
  await dialog.getByRole("spinbutton", { name: "Booking length" }).fill("75");
  await dialog.getByRole("radio", { name: "10:00 AM", exact: true }).check();
  await expect(
    dialog.getByRole("textbox", { name: "Point of contact / host", exact: true })
  ).toHaveValue("Mobile Guest");
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  const submitted = page.waitForRequest(
    (request) => request.url().endsWith("/api/reservations") && request.method() === "POST"
  );
  await confirm.click();
  const payload = (await submitted).postDataJSON();
  expect(payload).toMatchObject({
    name: "Mobile Guest",
    phone: "01712345678",
    email: "guest@example.com",
    gatheringType: "Other",
    gatheringOther: "A book club discussion",
    foodAndBeverage: "Coffee, tea and sandwiches",
    guests: 3,
    duration: 75,
  });
  await expect(dialog).toContainText("Your Adda Meeting is reserved");
  await expect(dialog.locator(".reservation-summary")).toContainText(
    "3 guests · 1 hour 15 minutes"
  );
});
