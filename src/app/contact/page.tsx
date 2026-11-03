import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us — Brew & Sip",
  description: "Contact Brew & Sip Coffee House, find our opening hours, or send us a message.",
};

export default function Page() {
  return <ContactPage />;
}
