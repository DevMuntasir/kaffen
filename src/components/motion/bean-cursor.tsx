"use client";
import { useEffect, useRef } from "react";
import { CoffeeBean } from "./coffee-bean";
import { motionSettings } from "@/data/motion";
type Particle = { x: number; y: number; vx: number; vy: number; life: number; size: number; rotation: number; spin: number; oscillation: number; wave: number; color: string };
export function BeanCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const bean = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let dispose = () => {};
    const setup = () => {
      dispose(); if (!media.matches) return;
      const el = canvas.current, follower = bean.current;
      const ctx = el?.getContext("2d"); if (!el || !ctx || !follower) return;
      let particles: Particle[] = [], frame = 0, lastTime = 0, active = false;
      let x = 0, y = 0, fx = 0, fy = 0, angle = -25;
      const resize = () => { const dpr = Math.min(devicePixelRatio, 2); el.width = innerWidth * dpr; el.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
      const render = (time: number) => {
        frame = 0;
        const delta = Math.min((time - (lastTime || time)) / 16.67, 2); lastTime = time;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        const blend = 1 - Math.pow(1 - motionSettings.cursorFollow, delta || 1);
        fx += (x - fx) * blend; fy += (y - fy) * blend;
        angle += ((x - fx) * .35 - 25 - angle) * .08;
        follower.style.transform = `translate3d(${fx + 14}px,${fy + 15}px,0) rotate(${angle}deg)`;
        if (active) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 40);
          glow.addColorStop(0, "rgba(198,156,109,.2)"); glow.addColorStop(1, "rgba(198,156,109,0)");
          ctx.fillStyle = glow; ctx.fillRect(x - 40, y - 40, 80, 80);
          ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "#C69C6D"; ctx.fill();
        }
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => { p.oscillation += p.wave * delta; p.x += (p.vx + Math.sin(p.oscillation) * .5) * delta; p.y += p.vy * delta; p.rotation += p.spin * delta; p.life -= .008 * delta; p.size += .4 * delta; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * .6, 0, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.color},${Math.max(0, p.life) ** 2 * .15})`; ctx.fill(); ctx.restore(); });
        if (particles.length || Math.abs(x - fx) + Math.abs(y - fy) > .2) frame = requestAnimationFrame(render);
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
        const speed = Math.hypot(event.clientX - x, event.clientY - y);
        x = event.clientX; y = event.clientY;
        if (!active) { fx = x; fy = y; }
        active = true; follower.style.opacity = "1";
        for (let i = 0; i < Math.min(Math.floor(speed / 5) + 1, 4); i++) particles.push({ x: x + (Math.random() - .5) * 10, y: y + (Math.random() - .5) * 10, vx: Math.random() - .5, vy: -Math.random() * 2 - .5, life: 1, size: Math.random() * 20 + 10, color: ["198,156,109", "59,32,16", "255,255,255"][Math.floor(Math.random() * 3)], rotation: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * .05, oscillation: Math.random() * Math.PI * 2, wave: Math.random() * .1 + .05 });
        particles = particles.slice(-180);
        if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(render); }
      };
      const leave = () => { active = false; follower.style.opacity = "0"; ctx.clearRect(0, 0, innerWidth, innerHeight); };
      resize(); document.documentElement.classList.add("bean-cursor-enabled");
      window.addEventListener("resize", resize); window.addEventListener("pointermove", move); document.documentElement.addEventListener("pointerleave", leave); window.addEventListener("blur", leave);
      dispose = () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); window.removeEventListener("blur", leave); ctx.clearRect(0,0,innerWidth,innerHeight); follower.style.opacity = "0"; document.documentElement.classList.remove("bean-cursor-enabled"); };
    };
    setup(); media.addEventListener("change", setup);
    return () => { media.removeEventListener("change", setup); dispose(); };
  }, []);
  return <><canvas ref={canvas} className="cursor-trail" aria-hidden="true"/><div ref={bean} className="bean-cursor" aria-hidden="true"><CoffeeBean size={23} rotation={0}/></div></>;
}
