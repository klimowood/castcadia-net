import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const displayFont = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://castcadia.net"),
  title: "Guided Fishing Charters Coeur d'Alene | Castcadia",
  description:
    "Book premium guided fishing charters in Coeur d'Alene and the Pacific Northwest. Reserve your trip through vally.",
  openGraph: {
    title: "Castcadia Guided Fishing",
    description: "Premium guided fishing charters with trusted local expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-[#0f2320] font-sans text-[#ecf4f2] antialiased`}>
        <SiteHeader />
        <main className="pb-24 md:pb-0">{children}</main>
        <SiteFooter />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
