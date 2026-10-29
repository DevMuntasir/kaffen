"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionSettings } from "@/data/motion";
gsap.registerPlugin(ScrollTrigger);
/** Progressive enhancement: content is visible before JS and in reduced-motion mode. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
   const targets = root.current?.querySelectorAll(".section-heading, .body-copy, .about-quote, .about-image, .service-card, .menu-item, .why-photo, .feature, .gallery-card, .review-card, .stat, .news-card, .footer-grid > div, .section-action, .booking-banner .button");
   if (!targets?.length) return;
   targets.forEach((target, i) => {
    gsap.fromTo(target, { y: 65, opacity: 0, filter: "blur(7px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: motionSettings.revealDuration, ease: motionSettings.revealEase, delay: (i % 3) * .08, scrollTrigger: { trigger: target, start: "top 94%", toggleActions: "play none none reverse" }, clearProps: "filter,transform,opacity" });
   });
  }, root);
  return () => mm.revert();
 }, []);
 return <div ref={root} className={`reveal-region ${className}`}>{children}</div>;
}
