import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = { title: "Kaffen — Coffee House", description: "Organic & fresh coffee, a welcoming coffee house, and extraordinary taste. Explore the Kaffen coffee menu.", icons: { icon: "/images/cropped-logo-32x32.png" } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
