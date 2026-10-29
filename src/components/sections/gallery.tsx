"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/data/site";
import { Photo } from "@/components/ui/photo";
import { Modal } from "@/components/ui/modal";
export function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="gallery" className="gallery-section" aria-label="Coffee gallery">
      <div className="gallery-track" ref={track}>
        {gallery.map((item, i) => (
          <button
            className="gallery-card"
            key={item.name}
            onClick={() => setSelected(i)}
            aria-label={`View ${item.name}`}
          >
            <Photo file={item.image} alt={item.name} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="gallery-controls">
        <button
          className="icon-button"
          aria-label="Previous gallery images"
          onClick={() => track.current?.scrollBy({ left: -390, behavior: "smooth" })}
        >
          <ChevronLeft />
        </button>
        <button
          className="icon-button"
          aria-label="Next gallery images"
          onClick={() => track.current?.scrollBy({ left: 390, behavior: "smooth" })}
        >
          <ChevronRight />
        </button>
      </div>
      {selected !== null && (
        <Modal title={gallery[selected].name} onClose={() => setSelected(null)}>
          <Photo
            file={gallery[selected].image}
            alt={gallery[selected].name}
            className="lightbox-photo"
          />
        </Modal>
      )}
    </section>
  );
}
