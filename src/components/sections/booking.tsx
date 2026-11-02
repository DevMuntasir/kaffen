"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { site } from "@/data/site";
import {
  displayDate,
  displayDuration,
  displayTime,
  latestReservationDate,
  reservationPolicy,
  restaurantNow,
  type ReservationReceipt,
} from "@/lib/reservation";

export function BookingBanner({ onBook }: { onBook: () => void }) {
  return (
    <section id="booking" className="booking-banner reservation-banner">
      <div className="container">
        <div>
          <SectionHeading
            eyebrow="A seat for every occasion"
            title="Good company. A table waiting."
          />
          <p>
            Slow mornings, catch-ups, or something to celebrate. Make a little time for each other.
          </p>
          <div className="reservation-facts">
            <span>
              <Users size={16} /> 1–8 guests
            </span>
            <span>
              <Clock3 size={16} /> Choose your meeting length
            </span>
            <span>
              <CalendarDays size={16} /> Up to 90 days ahead
            </span>
          </div>
        </div>
        <div className="reservation-banner-action">
          <Button onClick={onBook}>Plan an Adda Meeting</Button>
          <span>Deposit online or in person</span>
        </div>
      </div>
    </section>
  );
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"table" | "details">("table");
  const [date, setDate] = useState(() => restaurantNow().date);
  const [guests, setGuests] = useState(2);
  const [duration, setDuration] = useState(90);
  const [calendarMonth, setCalendarMonth] = useState(() => restaurantNow().date.slice(0, 7));
  const [calendarAvailability, setCalendarAvailability] = useState<Record<string, number>>({});
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [time, setTime] = useState("");
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [contact, setContact] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    notes: "",
    gatheringType: "Professional meeting",
    gatheringOther: "",
    depositMethod: "Web",
    foodAndBeverage: "",
    privacyAccepted: false,
  });
  const [receipt, setReceipt] = useState<ReservationReceipt | null>(null);
  const requestId = useRef("");
  const submitting = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setTimes([]);
    setTime("");
    fetch(
      `/api/reservations?date=${encodeURIComponent(date)}&guests=${guests}&duration=${duration}`,
      {
        signal: controller.signal,
        cache: "no-store",
      }
    )
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setTimes(result.times);
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setError(cause instanceof Error ? cause.message : "Could not load available times.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [date, guests, duration, refresh]);

  useEffect(() => {
    const controller = new AbortController();
    setCalendarLoading(true);
    fetch(`/api/reservations?month=${calendarMonth}&guests=${guests}&duration=${duration}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setCalendarAvailability(result.availability);
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setError(cause instanceof Error ? cause.message : "Could not load the calendar.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setCalendarLoading(false);
      });
    return () => controller.abort();
  }, [calendarMonth, guests, duration, refresh]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSaving(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          date,
          time,
          guests,
          duration,
          requestId: requestId.current,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409 || response.status === 400) {
          setStep("table");
          setTime("");
          requestId.current = "";
        }
        throw new Error(result.error || "Your reservation could not be saved.");
      }
      setReceipt(result.reservation);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Connection interrupted. Please try again."
      );
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  return (
    <Modal title={receipt ? "Your Adda Meeting is reserved" : "Adda Meeting"} onClose={onClose}>
      {receipt ? (
        <div className="reservation-success" role="status">
          <span className="reservation-check">
            <Check size={28} aria-hidden="true" />
          </span>
          <p>We look forward to welcoming you, {receipt.name}.</p>
          <div className="reservation-ticket">
            <span className="eyebrow">Reservation reference</span>
            <strong className="reservation-reference">{receipt.reference}</strong>
            <ReservationSummary
              date={receipt.date}
              time={receipt.time}
              guests={receipt.guests}
              duration={receipt.duration}
            />
            <span>
              <MapPin size={16} aria-hidden="true" /> {site.address}
            </span>
          </div>
          <p className="reservation-small">
            Save your reference for your visit. For changes, contact {site.email}. Email
            confirmations are not sent automatically.
          </p>
          <Button onClick={onClose}>All done</Button>
        </div>
      ) : (
        <>
          <p className="reservation-intro">
            Check space availability, choose your meeting length, and tell us how we can host you.
          </p>
          <ol className="reservation-steps" aria-label="Reservation progress">
            <li aria-current={step === "table" ? "step" : undefined}>
              <span>{step === "details" ? <Check size={14} /> : "1"}</span> Find a table
            </li>
            <li aria-current={step === "details" ? "step" : undefined}>
              <span>2</span> Your details
            </li>
          </ol>
          {error && (
            <div className="reservation-error" role="alert">
              {error}
            </div>
          )}
          {step === "table" ? (
            <form
              className="booking-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (time && times.includes(time)) {
                  setError("");
                  setStep("details");
                }
              }}
            >
              <label htmlFor="booking-guests">
                Party size
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(event) => {
                    setLoading(true);
                    setTime("");
                    setGuests(Number(event.target.value));
                  }}
                >
                  {Array.from({ length: reservationPolicy.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="booking-duration">
                Booking length
                <select
                  id="booking-duration"
                  value={duration}
                  onChange={(event) => {
                    setLoading(true);
                    setTime("");
                    setDuration(Number(event.target.value));
                  }}
                >
                  {reservationPolicy.durations.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {displayDuration(minutes)}
                    </option>
                  ))}
                </select>
              </label>
              <AvailabilityCalendar
                month={calendarMonth}
                selectedDate={date}
                availability={calendarAvailability}
                loading={calendarLoading}
                duration={duration}
                onMonthChange={setCalendarMonth}
                onSelect={(selected) => {
                  setLoading(true);
                  setTime("");
                  setDate(selected);
                }}
              />
              <fieldset className="reservation-times" aria-busy={loading}>
                <legend>
                  Available times <span>{reservationPolicy.timeZoneLabel}</span>
                </legend>
                {loading ? (
                  <p role="status">Finding a seat for you…</p>
                ) : times.length ? (
                  <div className="reservation-time-grid">
                    {times.map((slot) => (
                      <label
                        key={slot}
                        className={`reservation-time ${time === slot ? "is-selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={slot}
                          checked={time === slot}
                          onChange={() => setTime(slot)}
                          required
                        />
                        {displayTime(slot)}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p role="status">
                    {error
                      ? "Please retry the availability check."
                      : "No tables available. Try another date or a smaller party."}
                  </p>
                )}
              </fieldset>
              {!loading && (
                <button
                  className="reservation-text-button"
                  type="button"
                  onClick={() => setRefresh((value) => value + 1)}
                >
                  Refresh availability
                </button>
              )}
              <p className="form-note">
                Availability reflects your selected meeting length. For groups larger than 8,
                contact {site.email}.
              </p>
              <Button type="submit" disabled={!time || loading}>
                Continue to your details
              </Button>
            </form>
          ) : (
            <form className="booking-form" onSubmit={submit} aria-busy={saving}>
              <div className="reservation-review">
                <ReservationSummary date={date} time={time} guests={guests} duration={duration} />
                <button
                  className="reservation-text-button"
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    requestId.current = "";
                    setError("");
                    setStep("table");
                  }}
                >
                  <ArrowLeft size={14} /> Change
                </button>
              </div>
              <label className="reservation-full">
                Point of contact / host
                <input
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Full name"
                  value={contact.name}
                  onChange={(event) => setContact({ ...contact, name: event.target.value })}
                />
              </label>
              <label className="reservation-full">
                Profession
                <input
                  name="profession"
                  autoComplete="organization-title"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Your profession or role"
                  value={contact.profession}
                  onChange={(event) => setContact({ ...contact, profession: event.target.value })}
                />
              </label>
              <label>
                Type of gathering
                <select
                  name="gatheringType"
                  required
                  value={contact.gatheringType}
                  onChange={(event) =>
                    setContact({
                      ...contact,
                      gatheringType: event.target.value,
                      gatheringOther: event.target.value === "Other" ? contact.gatheringOther : "",
                    })
                  }
                >
                  <option>Professional meeting</option>
                  <option>Adda</option>
                  <option>Special social event</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Reservation deposit
                <select
                  name="depositMethod"
                  required
                  value={contact.depositMethod}
                  onChange={(event) =>
                    setContact({ ...contact, depositMethod: event.target.value })
                  }
                >
                  <option value="Web">Pay on the web</option>
                  <option value="In person">Pay in person</option>
                </select>
              </label>
              {contact.gatheringType === "Other" && (
                <label className="reservation-full">
                  Tell us about your gathering
                  <input
                    name="gatheringOther"
                    required
                    minLength={2}
                    maxLength={200}
                    placeholder="Describe the gathering"
                    value={contact.gatheringOther}
                    onChange={(event) =>
                      setContact({ ...contact, gatheringOther: event.target.value })
                    }
                  />
                </label>
              )}
              <label className="reservation-full">
                Food and beverage choices
                <textarea
                  name="foodAndBeverage"
                  rows={4}
                  required
                  minLength={2}
                  maxLength={1000}
                  placeholder="Describe the food, coffee, tea, or other beverage options you would like."
                  value={contact.foodAndBeverage}
                  onChange={(event) =>
                    setContact({ ...contact, foodAndBeverage: event.target.value })
                  }
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  value={contact.email}
                  onChange={(event) => setContact({ ...contact, email: event.target.value })}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={30}
                  placeholder="Your phone number"
                  value={contact.phone}
                  onChange={(event) => setContact({ ...contact, phone: event.target.value })}
                />
              </label>
              <label className="reservation-full">
                Special requests <span className="reservation-optional">Optional</span>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={500}
                  placeholder="A celebration, accessibility needs, or anything we should know?"
                  value={contact.notes}
                  onChange={(event) => setContact({ ...contact, notes: event.target.value })}
                />
              </label>
              <p className="form-note">
                We’ll use these details to coordinate your meeting and reservation deposit.
              </p>
              <label className="privacy-consent reservation-full">
                <input
                  name="privacyAccepted"
                  type="checkbox"
                  required
                  checked={contact.privacyAccepted}
                  onChange={(event) =>
                    setContact({ ...contact, privacyAccepted: event.target.checked })
                  }
                />
                <span>
                  I have read and agree to the privacy statement. I consent to the use of my contact
                  and meeting details to manage this reservation.
                </span>
              </label>
              <Button type="submit" disabled={saving}>
                {saving ? "Reserving your table…" : "Confirm reservation"}
              </Button>
            </form>
          )}
        </>
      )}
    </Modal>
  );
}

function AvailabilityCalendar({
  month,
  selectedDate,
  availability,
  loading,
  duration,
  onMonthChange,
  onSelect,
}: {
  month: string;
  selectedDate: string;
  availability: Record<string, number>;
  loading: boolean;
  duration: number;
  onMonthChange: (month: string) => void;
  onSelect: (date: string) => void;
}) {
  const first = new Date(`${month}-01T12:00:00Z`);
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(first);
  const firstCell = new Date(first);
  firstCell.setUTCDate(firstCell.getUTCDate() - firstCell.getUTCDay());
  const days = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstCell);
    day.setUTCDate(firstCell.getUTCDate() + index);
    return day.toISOString().slice(0, 10);
  });
  const shiftMonth = (offset: number) => {
    const next = new Date(first);
    next.setUTCMonth(next.getUTCMonth() + offset);
    onMonthChange(next.toISOString().slice(0, 7));
  };
  const earliestMonth = restaurantNow().date.slice(0, 7);
  const latestMonth = latestReservationDate().slice(0, 7);

  return (
    <fieldset className="availability-calendar reservation-full" aria-busy={loading}>
      <legend>Space availability · {displayDuration(duration)}</legend>
      <div className="calendar-toolbar">
        <button
          type="button"
          aria-label="Previous month"
          disabled={month <= earliestMonth}
          onClick={() => shiftMonth(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <strong>{monthLabel}</strong>
        <button
          type="button"
          aria-label="Next month"
          disabled={month >= latestMonth}
          onClick={() => shiftMonth(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((day) => {
          const inMonth = day.slice(0, 7) === month;
          const slots = availability[day] || 0;
          const disabled = !inMonth || slots === 0;
          return (
            <button
              key={day}
              type="button"
              className={day === selectedDate ? "is-selected" : ""}
              disabled={disabled || loading}
              aria-label={
                inMonth
                  ? `Select ${displayDate(day)} — ${slots ? `${slots} times available` : "unavailable"}`
                  : undefined
              }
              onClick={() => onSelect(day)}
            >
              <span>{Number(day.slice(-2))}</span>
              {inMonth && <small>{slots ? "Available" : "Full"}</small>}
            </button>
          );
        })}
      </div>
      <p className="calendar-key">
        {loading ? "Checking space…" : "Choose an available date to see meeting start times."}
      </p>
    </fieldset>
  );
}

function ReservationSummary({
  date,
  time,
  guests,
  duration,
}: {
  date: string;
  time: string;
  guests: number;
  duration: number;
}) {
  return (
    <div className="reservation-summary">
      <span>
        <CalendarDays size={16} aria-hidden="true" />
        {displayDate(date)}
      </span>
      <span>
        <Clock3 size={16} aria-hidden="true" />
        {displayTime(time)} · {reservationPolicy.timeZoneLabel}
      </span>
      <span>
        <Users size={16} aria-hidden="true" />
        {guests} {guests === 1 ? "guest" : "guests"} · {displayDuration(duration)}
      </span>
    </div>
  );
}
