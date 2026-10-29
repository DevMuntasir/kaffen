"use client";
import { useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { articles } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
export function News() {
  const [selected, setSelected] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  return (
    <section id="news" className="section news-section">
      <div className="container">
        <SectionHeading
          eyebrow="Get every single update"
          title="Read Some Latest Blog & News"
          centered
        />
        <div className="news-grid">
          {articles.map((item, i) => (
            <button className="news-card" key={item.image} onClick={() => setSelected(i)}>
              <Photo file={item.image} alt="Coffee house stories" />
              <div>
                <h3>{item.title}</h3>
                <p>
                  <span>
                    <CalendarDays size={15} />
                    March 26, 2022
                  </span>
                  <span>
                    <MessageCircle size={15} />
                    Comments (0)
                  </span>
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="section-action">
          <Button onClick={() => setAll(!all)}>{all ? "Show less" : "View all"}</Button>
          {all && (
            <p className="body-copy" role="status">
              You’re viewing all three articles from the reference homepage.
            </p>
          )}
        </div>
      </div>
      {selected !== null && (
        <Modal title={articles[selected].title} onClose={() => setSelected(null)}>
          <Photo file={articles[selected].image} alt="Coffee house" />
          <p className="eyebrow">March 26, 2022 · Demo article</p>
          <p>
            This article card is reproduced from the Kaffen homepage. Full article content can be
            connected through your CMS.
          </p>
        </Modal>
      )}
    </section>
  );
}
