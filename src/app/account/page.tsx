import type { Metadata } from "next";
import { AccountPage } from "@/components/account-page";

export const metadata: Metadata = {
  title: "Customer Account — Brew & Sip",
  description: "Sign in or create your Brew & Sip customer account.",
};

export default function Page() {
  return <AccountPage />;
}
