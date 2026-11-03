"use client";

import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bean,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import styles from "./account-page.module.css";

type Mode = "login" | "signup";

export function AccountPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setMessage("");
    setShowPassword(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    window.setTimeout(() => {
      if (mode === "signup") {
        localStorage.setItem("brewandsip-customer", JSON.stringify({ name, email }));
        setMessage(`Welcome to the house, ${name.split(" ")[0]}. Your account is ready.`);
      } else {
        setMessage("Welcome back. Your coffee table is waiting.");
      }
      setBusy(false);
    }, 450);
  }

  return (
    <main className={styles.page}>
      <section className={styles.story} aria-label="Brew & Sip customer membership">
        <img src="/images/midnight-hero.webp" alt="A handcrafted coffee at Brew & Sip" />
        <div className={styles.storyShade} />
        <a href="/" className={styles.brand} aria-label="Brew & Sip home">
          <span className={styles.emblem}>
            <Bean size={25} strokeWidth={1.25} />
          </span>
          <span>
            Brew & Sip<small>Coffee & conversation</small>
          </span>
        </a>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>The house is yours</p>
          <h1>
            Good coffee.
            <br />
            <em>Kept personal.</em>
          </h1>
    
     
        </div>
        <span className={styles.storyNote}>Brew & Sip Coffee House · Est. 2009</span>
      </section>

      <section className={styles.account}>
        <div className={styles.mobileTop}>
          <a href="/" className={styles.mobileBrand}>
            <Bean size={20} /> Brew & Sip
          </a>
          <a href="/" aria-label="Back to Brew & Sip">
            <ArrowLeft size={20} />
          </a>
        </div>
        <div className={styles.formWrap}>
          <div className={styles.intro}>
           
            <h2>{mode === "login" ? "Sign in to your account" : "Create your account"}</h2>
            <p>
              {mode === "login"
                ? "Your next cup is closer than you think."
                : "A few details, then the good part begins."}
            </p>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => switchMode("login")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => switchMode("signup")}
            >
              Create account
            </button>
          </div>

          {message ? (
            <div className={styles.success} role="status">
              <span>
                <Check size={22} />
              </span>
              <div>
                <strong>You&apos;re all set.</strong>
                <p>{message}</p>
              </div>
              <a href="/">
                Return to Brew & Sip <ArrowRight size={15} />
              </a>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              {mode === "signup" && (
                <label>
                  <span>Full name</span>
                  <div className={styles.field}>
                    <UserRound size={18} />
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      minLength={2}
                      required
                    />
                  </div>
                </label>
              )}
              <label>
                <span>Email address</span>
                <div className={styles.field}>
                  <Mail size={18} />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>
              <label>
                <span>Password</span>
                <div className={styles.field}>
                  <LockKeyhole size={18} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className={styles.reveal}
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              {mode === "login" ? (
                <div className={styles.formMeta}>
                  <label className={styles.remember}>
                    <input type="checkbox" name="remember" /> <span>Remember me</span>
                  </label>
                  <button type="button">Forgot password?</button>
                </div>
              ) : (
                <label className={styles.consent}>
                  <input type="checkbox" required />
                  <span>
                    I agree to the <a href="#terms">terms</a> and{" "}
                    <a href="#privacy">privacy policy</a>.
                  </span>
                </label>
              )}
              <button className={styles.submit} type="submit" disabled={busy}>
                {busy ? "One moment…" : mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {!message && (
            <p className={styles.switch}>
              {mode === "login" ? "New to Brew & Sip?" : "Already a member?"}{" "}
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>
          )}
        </div>
        <p className={styles.support}>
          Need a hand? <a href="mailto:hello@brewandsip.com">hello@brewandsip.com</a>
        </p>
      </section>
    </main>
  );
}
