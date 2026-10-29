"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Leaf, Mountain, Thermometer, Clock3, Award } from "lucide-react";
import { coffeeJourney } from "@/data/coffee-journey";
import { motionSettings } from "@/data/motion";
import { CoffeeBean } from "@/components/motion/coffee-bean";
import { Photo } from "@/components/ui/photo";
gsap.registerPlugin(ScrollTrigger);
const icons = [[MapPin,Leaf,Mountain],[Thermometer,Clock3,Award],[Thermometer,Clock3,Award]];
export function CoffeeJourney() {
 const root = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
   const section=root.current, rail=track.current;
   if (!section || !rail) return;
   section.classList.add("journey--pinned");
   const panels=Array.from(rail.querySelectorAll<HTMLElement>(".journey-panel"));
   const tween=gsap.to(rail, { x: () => -(rail.scrollWidth - section.clientWidth), ease: "none", scrollTrigger: { id:"coffee-journey", trigger:section, start:"top top", end: () => `+=${motionSettings.horizontalDistance}`, scrub:motionSettings.horizontalScrub, pin:true, anticipatePin:1, invalidateOnRefresh:true, onUpdate: self => { section.style.setProperty("--journey-progress",String(self.progress)); } } });
   panels.forEach((panel,index)=>{
    const children=panel.querySelectorAll(".journey-copy > *, .journey-visual");
    gsap.fromTo(children,{opacity:0,y:40},{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power3.out",scrollTrigger:index===0?{trigger:section,start:"top 55%",toggleActions:"play none none reverse"}:{trigger:panel,containerAnimation:tween,start:"left 85%",toggleActions:"play none none reverse"}});
   });
   return () => { section.classList.remove("journey--pinned"); section.style.removeProperty("--journey-progress"); };
  },root);
  return () => mm.revert();
 },[]);
 return <section id="journey" ref={root} className="coffee-journey" aria-label="From origin to midnight roast"><div ref={track} className="journey-track">{coffeeJourney.map((item,index)=><article className={`journey-panel journey-panel--${index}`} key={item.step} style={{"--bean-color":item.color,"--bean-glow":item.glow} as CSSProperties} aria-labelledby={`journey-title-${index}`}><div className="journey-inner"><div className="journey-copy"><p className="journey-step"><span/>Step {item.step}<span/></p><h2 id={`journey-title-${index}`}>{item.title}</h2><p className="journey-subtitle">— {item.subtitle}</p><p className="journey-description">{item.description}</p><dl className="journey-stats">{item.stats.map((stat,i)=>{const Icon=icons[index][i];return <div key={stat.label}><span className="journey-stat-icon"><Icon size={16}/></span><div><dt>{stat.label}</dt><dd>{stat.value}</dd></div></div>;})}</dl><ul className="journey-tags">{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div><div className="journey-visual"><div className="journey-photo"><Photo file={item.image} alt={item.title} width={700} height={934}/><span aria-hidden="true">{item.step}</span></div><div className="journey-bean journey-bean--main"><CoffeeBean size={100} color={item.color} glow={item.glow}/></div><div className="journey-bean journey-bean--small"><CoffeeBean size={56} color={item.color} rotation={40}/></div><div className="journey-bean journey-bean--tiny"><CoffeeBean size={42} color={item.color} rotation={-60}/></div></div></div><div className="journey-dots" aria-hidden="true">{coffeeJourney.map((_,i)=><span key={i} className={index===i?"is-active":""}/>)}</div></article>)}</div></section>;
}
