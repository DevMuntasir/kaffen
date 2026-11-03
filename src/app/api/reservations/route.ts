import { NextRequest, NextResponse } from "next/server";
import {
  futureSlot,
  reservationPolicy,
  reservationTimes,
  validReservationDuration,
  validReservationDate,
} from "@/lib/reservation";
import { createReservation, readReservations, remainingSeats } from "@/lib/reservation-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const reply = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || "";
  const month = request.nextUrl.searchParams.get("month") || "";
  const guests = Number(request.nextUrl.searchParams.get("guests"));
  const duration = Number(
    request.nextUrl.searchParams.get("duration") || reservationPolicy.duration
  );
  if (
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > reservationPolicy.maxGuests ||
    !validReservationDuration(duration)
  )
    return reply({ error: "Choose a valid booking length and 1–8 guests." }, 400);
  try {
    const records = await readReservations();
    if (month) {
      if (!/^\d{4}-\d{2}$/.test(month))
        return reply({ error: "Choose a valid calendar month." }, 400);
      const first = new Date(`${month}-01T12:00:00Z`);
      if (Number.isNaN(first.getTime()) || first.toISOString().slice(0, 7) !== month)
        return reply({ error: "Choose a valid calendar month." }, 400);
      const availability: Record<string, number> = {};
      while (first.toISOString().slice(0, 7) === month) {
        const day = first.toISOString().slice(0, 10);
        if (validReservationDate(day)) {
          availability[day] = reservationTimes.filter(
            (time) =>
              futureSlot(day, time) && remainingSeats(records, day, time, duration) >= guests
          ).length;
        }
        first.setUTCDate(first.getUTCDate() + 1);
      }
      return reply({ availability });
    }
    if (!validReservationDate(date))
      return reply({ error: "Choose a date within the next 90 days." }, 400);
    return reply({
      times: reservationTimes.filter(
        (time) => futureSlot(date, time) && remainingSeats(records, date, time, duration) >= guests
      ),
    });
  } catch {
    return reply({ error: "Availability could not be loaded. Please try again." }, 503);
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") && request.headers.get("origin") !== request.nextUrl.origin)
    return reply({ error: "Please book from our website." }, 403);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return reply({ error: "Reservation details are too long." }, 413);
    body = JSON.parse(raw);
  } catch {
    return reply({ error: "Invalid reservation details." }, 400);
  }
  if (!body || typeof body !== "object")
    return reply({ error: "Invalid reservation details." }, 400);
  const text = (key: string) => (typeof body[key] === "string" ? body[key].trim() : "");
  const date = text("date"),
    time = text("time"),
    name = text("name"),
    phone = text("phone"),
    requestId = text("requestId");
  const guests = body.guests;
  const duration = body.duration;
  if (!futureSlot(date, time))
    return reply({ error: "Choose an upcoming time within the next 90 days." }, 400);
  if (!Number.isInteger(guests) || guests < 1 || guests > reservationPolicy.maxGuests)
    return reply({ error: "Reservations are available for 1–8 guests." }, 400);
  if (!validReservationDuration(duration))
    return reply({ error: "Choose a valid booking length." }, 400);
  if (
    name.length < 2 ||
    name.length > 80 ||
    !/^[+\d\s().-]{7,30}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 7 ||
    !/^[0-9a-f-]{36}$/i.test(requestId)
  )
    return reply(
      {
        error: "Please enter your name and a valid mobile number.",
      },
      400
    );
  try {
    const record = await createReservation({
      date,
      time,
      guests,
      duration,
      name,
      phone,
      requestId,
    });
    if (!record)
      return reply({ error: "That time just filled up. Please choose another time." }, 409);
    return reply(
      {
        reservation: {
          reference: record.reference,
          date: record.date,
          time: record.time,
          guests: record.guests,
          duration: record.duration,
          name: record.name,
        },
      },
      201
    );
  } catch {
    return reply({ error: "Your reservation could not be saved. Please try again." }, 503);
  }
}
