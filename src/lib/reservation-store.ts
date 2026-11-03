import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { reservationPolicy } from "./reservation";

export type Reservation = {
  reference: string;
  requestId: string;
  date: string;
  time: string;
  guests: number;
  duration: number;
  name: string;
  email: string;
  phone: string;
  gatheringType: string;
  gatheringOther: string;
  foodAndBeverage: string;
  createdAt: string;
};

// One persistent Node process owns this file. The queue serializes read/check/write
// transactions; atomic rename prevents readers from seeing a partially written file.
const state = globalThis as typeof globalThis & { reservationQueue?: Promise<unknown> };
const directory = process.env.RESERVATION_DATA_DIR || path.join(process.cwd(), ".data");
const filename = path.join(directory, "reservations.json");

export async function readReservations(): Promise<Reservation[]> {
  try {
    return JSON.parse(await readFile(filename, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function remainingSeats(
  records: Reservation[],
  date: string,
  time: string,
  duration = reservationPolicy.duration
) {
  const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
  const start = minutes(time);
  // Check peak occupancy at each half-hour of the requested sitting.
  let peak = 0;
  for (let at = start; at < start + duration; at += 30) {
    const occupied = records
      .filter(
        (r) =>
          r.date === date &&
          minutes(r.time) <= at &&
          minutes(r.time) + (r.duration || reservationPolicy.duration) > at
      )
      .reduce((sum, r) => sum + r.guests, 0);
    peak = Math.max(peak, occupied);
  }
  return reservationPolicy.capacity - peak;
}

export function createReservation(input: Omit<Reservation, "reference" | "createdAt">) {
  const operation = (state.reservationQueue || Promise.resolve()).then(async () => {
    const records = await readReservations();
    const previous = records.find((r) => r.requestId === input.requestId);
    if (previous) return previous;
    if (remainingSeats(records, input.date, input.time, input.duration) < input.guests) return null;
    const record: Reservation = {
      ...input,
      reference: `KF-${randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    await mkdir(directory, { recursive: true });
    const temporary = `${filename}.${randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify([...records, record], null, 2), { mode: 0o600 });
    await rename(temporary, filename);
    return record;
  });
  state.reservationQueue = operation.catch(() => undefined);
  return operation;
}
