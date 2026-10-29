"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useSmoothScroll } from "@/components/motion/motion-provider";
import { X } from "lucide-react";
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const scroll = useSmoothScroll();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    scroll.pause();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
      scroll.resume();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      data-lenis-prevent
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}>
          <X />
        </button>
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
