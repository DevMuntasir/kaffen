"use client";
import dynamic from "next/dynamic";
import { Photo } from "@/components/ui/photo";
const HeroCup=dynamic(()=>import("./hero-cup"),{ssr:false});
export function Hero({ onDelivery }: { onDelivery: () => void }) {
 return <section id="home" className="midnight-hero" aria-label="Midnight Roast coffee experience"><div className="midnight-background"><Photo file="midnight-hero.webp" alt="" width={1600} height={1067} priority/><div/></div><div className="midnight-mobile"><Photo file="midnight-mobile.webp" alt="" width={1000} height={1000}/></div><HeroCup/><div className="midnight-content"><p className="midnight-kicker">Kaffen · The after-dark collection</p><h1>Midnight Roast</h1><p className="midnight-description">Crafted in the shadows, brewed for the bold.{" "}<br/>Experience the art of the perfect extraction.</p><a href="#menu" className="midnight-cta">Explore the Brew</a><button className="midnight-delivery" onClick={onDelivery}>Get delivery <span aria-hidden="true">↗</span></button></div><a className="midnight-discover" href="#about"><span>Scroll to Discover</span><i/></a></section>;
}
