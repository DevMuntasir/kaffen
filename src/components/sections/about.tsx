import { Coffee, Utensils, Soup } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { description } from "@/data/site";
export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div>
            <SectionHeading eyebrow="About us" title="Organic & Fresh Coffee Provider Center" />
            <p className="body-copy">
              {description} et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur
              magni dolores eos qui ratione
            </p>
            <blockquote className="about-quote">
              <Photo file="quote_img.png" alt="Coffee house founder" width={95} height={95} />
              <p>Quis autem vel eum iure reprehenderit in ealuptate velit esse molestiae</p>
            </blockquote>
          </div>
          <Photo
            file="about_img.png"
            alt="Fresh coffee beans pouring into a white cup"
            className="about-image"
            width={686}
            height={540}
          />
        </div>
        <div id="services" className="service-grid">
          {[
            { name: "Restaurant Menu", image: "service1.jpg", Icon: Utensils },
            { name: "Coffee Menu", image: "service2.jpg", Icon: Coffee },
            { name: "Food Services", image: "service3.jpg", Icon: Soup },
          ].map(({ name, image, Icon }) => (
            <a className="service-card" href="#menu" key={name}>
              <Photo file={image} alt="" />
              <div>
                <Icon size={56} strokeWidth={1} />
                <h3>{name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
