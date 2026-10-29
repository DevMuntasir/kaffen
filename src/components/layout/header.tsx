"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bean, Menu, X, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { site } from "@/data/site";
import styles from "./header.module.css";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "The craft", href: "#journey" },
  { label: "Gallery", href: "#gallery" },
  { label: "Journal", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export function SocialLinks() {
  return (
    <div className="social-links">
      {[
        { Icon: Facebook, name: "Facebook", url: "https://www.facebook.com/" },
        { Icon: Twitter, name: "Twitter", url: "https://twitter.com/" },
        { Icon: Instagram, name: "Instagram", url: "https://www.instagram.com/" },
        { Icon: Youtube, name: "YouTube", url: "https://www.youtube.com/" },
      ].map(({ Icon, name, url }) => (
        <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
export function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header ref={root} className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand} aria-label="Kaffen home" onClick={() => setOpen(false)}>
          <span className={styles.emblem}><Bean size={24} strokeWidth={1.25} aria-hidden="true" /></span>
          <span className={styles.wordmark}>Kaffen<span className={styles.brandNote}>Coffee & conversation</span></span>
        </a>
        <nav id="main-navigation" aria-label="Main navigation" className={`${styles.navigation} ${open ? styles.open : ""}`}>
          <span className={styles.mobileEyebrow}>Discover Kaffen</span>
          <ul>{links.map((link, index) => <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}><span className={styles.linkNumber}>0{index + 1}</span>{link.label}<ArrowUpRight className={styles.linkArrow} size={18} aria-hidden="true" /></a>
          </li>)}</ul>
          <div className={styles.mobileInfo}><span>Slow moments. Exceptional coffee.</span><span>{site.hours}</span></div>
        </nav>
        <div className={styles.actions}>
          <button className={styles.reserve} onClick={() => { setOpen(false); onBook(); }}>Book a table<ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></button>
          <button ref={toggle} className={styles.toggle} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}>{open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}</button>
        </div>
      </div>
    </header>
  );
}
