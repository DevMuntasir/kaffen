"use client";
import { useState } from "react";
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { CoffeeMenu } from "./sections/coffee-menu";
import { CoffeeJourney } from "./sections/coffee-journey";
import { WhyUs } from "./sections/why-us";
import { Gallery } from "./sections/gallery";
import { Testimonials, Statistics } from "./sections/testimonials";
import { News } from "./sections/news";
import { BookingBanner, BookingModal } from "./sections/booking";
import { Modal } from "./ui/modal";
import { ButtonLink } from "./ui/button";
import { MotionProvider } from "./motion/motion-provider";
import { BeanCursor } from "./motion/bean-cursor";
import { Reveal } from "./motion/reveal";
import { FloatingBeans } from "./motion/floating-beans";
export function HomePage() {
  const [dialog, setDialog] = useState<"booking" | "delivery" | null>(null);
  const book = () => setDialog("booking");
  return <MotionProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <BeanCursor/><Header onBook={book}/>
    <main id="main">
      <Hero onDelivery={() => setDialog("delivery")}/>
      <Reveal><FloatingBeans variant="roasted"/><About/></Reveal>
      <Reveal><FloatingBeans/><CoffeeMenu/></Reveal>
      <CoffeeJourney/>
      <Reveal><FloatingBeans variant="green"/><WhyUs/></Reveal>
      <Reveal><Gallery/></Reveal>
      <Reveal><FloatingBeans variant="roasted"/><Testimonials/></Reveal>
      <Reveal><Statistics/></Reveal>
      <Reveal><FloatingBeans/><News/></Reveal>
      <Reveal><BookingBanner onBook={book}/></Reveal>
    </main>
    <Reveal><Footer/></Reveal>
    {dialog === "booking" && <BookingModal onClose={() => setDialog(null)}/>}
    {dialog === "delivery" && <Modal title="Coffee, wherever you are" onClose={() => setDialog(null)}><p>Explore our coffee selection. Online delivery is not connected in this homepage preview.</p><ButtonLink href="#menu" onClick={() => setDialog(null)}>Browse coffee menu</ButtonLink></Modal>}
  </MotionProvider>;
}
