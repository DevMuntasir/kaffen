"use client";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionSettings } from "@/data/motion";

gsap.registerPlugin(ScrollTrigger);
const ScrollContext = createContext<{ pause: () => void; resume: () => void }>({ pause: () => {}, resume: () => {} });
export const useSmoothScroll = () => useContext(ScrollContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const locks = useRef(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches) return;
      const scroll = new Lenis({ duration: motionSettings.scrollDuration, easing: motionSettings.scrollEase, smoothWheel: true, syncTouch: false, anchors: { offset: -24 }, prevent: node => node.tagName === "DIALOG" || node.hasAttribute("data-lenis-prevent") });
      lenis.current = scroll;
      if (locks.current) scroll.stop();
      scroll.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => scroll.raf(time * 1000);
      gsap.ticker.add(tick);
      const refresh = () => { scroll.resize(); ScrollTrigger.refresh(); };
      const timer = window.setTimeout(refresh, 250);
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      cleanup = () => { clearTimeout(timer); window.removeEventListener("load", refresh); gsap.ticker.remove(tick); scroll.destroy(); lenis.current = null; };
    };
    setup(); media.addEventListener("change", setup);
    return () => { media.removeEventListener("change", setup); cleanup(); };
  }, []);
  return <ScrollContext.Provider value={{ pause: () => { locks.current++; lenis.current?.stop(); }, resume: () => { locks.current = Math.max(0, locks.current - 1); if (!locks.current) lenis.current?.start(); } }}>{children}</ScrollContext.Provider>;
}
