"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CalendarDays, Check, Clock3, MapPin, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { site } from "@/data/site";
import {
  displayDate,
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
              <Clock3 size={16} /> 90 minutes, all yours
            </span>
            <span>
              <CalendarDays size={16} /> Up to 90 days ahead
            </span>
          </div>
        </div>
        <div className="reservation-banner-action">
          <Button onClick={onBook}>Reserve a table</Button>
          <span>No booking fee</span>
        </div>
      </div>
    </section>
  );
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"table" | "details">("table");
  const [date, setDate] = useState(() => restaurantNow().date);
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("");
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [receipt, setReceipt] = useState<ReservationReceipt | null>(null);
  const requestId = useRef("");
  const submitting = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setTimes([]);
    setTime("");
    fetch(`/api/reservations?date=${encodeURIComponent(date)}&guests=${guests}`, {
      signal: controller.signal,
      cache: "no-store",
    })
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
  }, [date, guests, refresh]);

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
        body: JSON.stringify({ ...contact, date, time, guests, requestId: requestId.current }),
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
    <Modal title={receipt ? "Your table is reserved" : "Make yourself at home"} onClose={onClose}>
      {receipt ? (
        <div className="reservation-success" role="status">
          <span className="reservation-check">
            <Check size={28} aria-hidden="true" />
          </span>
          <p>We look forward to welcoming you, {receipt.name}.</p>
          <div className="reservation-ticket">
            <span className="eyebrow">Reservation reference</span>
            <strong className="reservation-reference">{receipt.reference}</strong>
            <ReservationSummary date={receipt.date} time={receipt.time} guests={receipt.guests} />
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
            A good cup. Your favourite people. We’ll save you a seat.
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
              <label htmlFor="booking-date">
                Date
                <input
                  id="booking-date"
                  type="date"
                  required
                  min={restaurantNow().date}
                  max={latestReservationDate()}
                  value={date}
                  onChange={(event) => {
                    setLoading(true);
                    setTime("");
                    setDate(event.target.value);
                  }}
                />
              </label>
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
                Each reservation is for 90 minutes. For groups larger than 8, contact {site.email}.
              </p>
              <Button type="submit" disabled={!time || loading}>
                Continue to your details
              </Button>
            </form>
          ) : (
            <form className="booking-form" onSubmit={submit} aria-busy={saving}>
              <div className="reservation-review">
                <ReservationSummary date={date} time={time} guests={guests} />
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
                Your name
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
                No payment required. Special requests are subject to availability. Your details are
                used to manage your reservation.
              </p>
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

function ReservationSummary({
  date,
  time,
  guests,
}: {
  date: string;
  time: string;
  guests: number;
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
        {guests} {guests === 1 ? "guest" : "guests"} · 90 minutes
      </span>
    </div>
  );
}
