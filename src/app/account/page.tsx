import type { Metadata } from "next";
import { AccountPage } from "@/components/account-page";

export const metadata: Metadata = {
  title: "Customer Account — Kaffen",
  description: "Sign in or create your Kaffen customer account.",
};

export default function Page() {
  return <AccountPage />;
}
