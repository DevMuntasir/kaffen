"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Bean, Check, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import styles from "./contact-page.module.css";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 500);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="Brew & Sip home">
          <span className={styles.emblem}>
            <Bean size={23} strokeWidth={1.25} />
          </span>
          <span>
            Brew & Sip<small>Coffee & conversation</small>
          </span>
        </a>
        <a href="/" className={styles.back}>
          <ArrowLeft size={16} /> Back to the coffee house
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroIntro}>
          <p className={styles.eyebrow}>Come say hello</p>
          <h1>
            Let&apos;s make time
            <br />
            for <em>good conversation.</em>
          </h1>
          <p className={styles.lede}>
            Questions, celebrations, collaborations—or just wondering what&apos;s brewing? We&apos;d
            love to hear from you.
          </p>
        </div>
        <div className={styles.contactCards}>
          <a href="tel:+01234567899">
            <Phone size={18} />
            <span>
              Call us<small>{site.phone}</small>
            </span>
            <ArrowRight size={16} />
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={18} />
            <span>
              Email us<small>{site.email}</small>
            </span>
            <ArrowRight size={16} />
          </a>
          <div>
            <MapPin size={18} />
            <span>
              Find us<small>{site.address}</small>
            </span>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.formColumn}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Send a note</p>
            <h2>What&apos;s on your mind?</h2>
            <p>We usually reply within one business day.</p>
          </div>

          {sent ? (
            <div className={styles.success} role="status">
              <span>
                <Check size={25} />
              </span>
              <h2>Your note is on its way.</h2>
              <p>Thanks for reaching out. Someone from the Brew & Sip team will be in touch soon.</p>
              <button type="button" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <div className={styles.row}>
                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="How should we address you?"
                    required
                  />
                </label>
                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>
              <label>
                <span>What can we help with?</span>
                <select name="topic" defaultValue="" required>
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>General enquiry</option>
                  <option>Private event</option>
                  <option>Reservation</option>
                  <option>Wholesale coffee</option>
                  <option>Press & partnerships</option>
                </select>
              </label>
              <label>
                <span>Your message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us a little more…"
                  minLength={10}
                  required
                />
              </label>
              <label className={styles.consent}>
                <input type="checkbox" required />
                  <span>I agree that Brew & Sip may use these details to reply to my enquiry.</span>
              </label>
              <button className={styles.submit} type="submit" disabled={busy}>
                {busy ? "Sending…" : "Send message"}
                <ArrowRight size={17} />
              </button>
            </form>
          )}
        </div>

        <aside className={styles.visit}>
          <div className={styles.photo}>
            <img src="/images/started_img_n5.jpg" alt="Warm seating inside Brew & Sip Coffee House" />
            <span>
              <MapPin size={14} /> {site.address}
            </span>
          </div>
          <div className={styles.hours}>
            <div className={styles.hoursTitle}>
              <Clock3 size={19} />
              <h2>Opening hours</h2>
            </div>
            <dl>
              <div>
                <dt>Sunday — Thursday</dt>
                <dd>08:00 am — 09:00 pm</dd>
              </div>
              <div>
                <dt>Friday</dt>
                <dd>03:00 pm — 09:00 pm</dd>
              </div>
              <div>
                <dt>Saturday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <p>Kitchen closes 30 minutes before the coffee bar.</p>
          </div>
        </aside>
      </section>

      <footer className={styles.footer}>
        <span>Brew & Sip Coffee House · Est. 2009</span>
        <span>Slow moments. Exceptional coffee.</span>
      </footer>
    </main>
  );
}
