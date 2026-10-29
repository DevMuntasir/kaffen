"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoffeeBean } from "./coffee-bean";
gsap.registerPlugin(ScrollTrigger);
export function FloatingBeans({ variant = "gold" }: { variant?: "gold" | "roasted" | "green" }) {
  const ref = useRef<HTMLDivElement>(null);
  const color = variant === "green" ? "#5a7a28" : variant === "roasted" ? "#754327" : "#C69C6D";
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        ref.current?.querySelectorAll<HTMLElement>(".floating-bean").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60 + i * 25, rotation: -20 },
            {
              y: -70 - i * 25,
              rotation: 35,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current?.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      },
      ref
    );
    return () => mm.revert();
  }, []);
  return (
    <div ref={ref} className="floating-beans" aria-hidden="true">
      {[70, 44, 30].map((size, i) => (
        <div key={size} className={`floating-bean floating-bean--${i}`}>
          <div className="bean-bob">
            <CoffeeBean color={color} size={size} rotation={i * 40 - 25} />
          </div>
        </div>
      ))}
    </div>
  );
}
