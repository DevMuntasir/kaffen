export const reservationPolicy = {
  timeZone: "America/New_York",
  timeZoneLabel: "New York time",
  capacity: 24,
  duration: 90,
  durations: [60, 90, 120, 180] as const,
  maxGuests: 8,
  advanceDays: 90,
};

export function validReservationDuration(duration: number) {
  return reservationPolicy.durations.some((value) => value === duration);
}

export function displayDuration(duration: number) {
  if (duration < 60) return `${duration} minutes`;
  const hours = duration / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ${hours === 1 ? "hour" : "hours"}`;
}

export const reservationTimes = Array.from({ length: 24 }, (_, i) => {
  const minutes = 8 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export function restaurantNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: reservationPolicy.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

export function latestReservationDate(today = restaurantNow().date) {
  const date = new Date(`${today}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + reservationPolicy.advanceDays);
  return date.toISOString().slice(0, 10);
}

export function validReservationDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date &&
    date >= restaurantNow().date &&
    date <= latestReservationDate()
  );
}

export function futureSlot(date: string, time: string) {
  const now = restaurantNow();
  return (
    validReservationDate(date) &&
    reservationTimes.includes(time) &&
    (date > now.date || time > now.time)
  );
}

export function displayTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export type ReservationReceipt = {
  reference: string;
  date: string;
  time: string;
  guests: number;
  duration: number;
  name: string;
};
