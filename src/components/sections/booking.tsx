"use client";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
export function BookingBanner({ onBook }: { onBook: () => void }) {
  return (
    <section id="booking" className="booking-banner">
      <div className="container">
        <SectionHeading
          eyebrow="Booking table for your & family members"
          title="Need a Table On Coffee House"
        />
        <Button onClick={onBook}>Booking table</Button>
      </div>
    </section>
  );
}
export function BookingModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <Modal title="Book a table" onClose={onClose}>
      {submitted ? (
        <div role="status">
          <p className="eyebrow">Demo request completed</p>
          <p>
            Your details passed validation. No reservation has been sent or confirmed; this preview
            is not connected to a booking service.
          </p>
          <Button onClick={onClose}>Done</Button>
        </div>
      ) : (
        <>
          <p>Choose a time for coffee with your favourite people.</p>
          <form className="booking-form" onSubmit={submit}>
            <label>
              Your name
              <input name="name" autoComplete="name" required placeholder="Full name" />
            </label>
            <label>
              Email address
              <input
                name="email"
                autoComplete="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                autoComplete="tel"
                type="tel"
                required
                placeholder="Phone number"
              />
            </label>
            <label>
              Guests
              <select name="guests" defaultValue="2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input name="date" type="date" min={localDate} required />
            </label>
            <label>
              Time
              <select name="time" defaultValue="10:00">
                {[
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                  "19:00",
                  "20:00",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <p className="form-note">Demo form — submitting does not make a real reservation.</p>
            <Button type="submit">Submit demo request</Button>
          </form>
        </>
      )}
    </Modal>
  );
}
