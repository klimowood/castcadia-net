import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const headingFont = Fraunces({ subsets: ["latin"], variable: "--font-heading", weight: ["400", "600", "700", "900"], style: ["normal", "italic"] });
const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://castcadia.net"),
  title: {
    default: "Guided Fishing Charters Coeur d'Alene | Castcadia Outfitters",
    template: "%s | Castcadia Outfitters",
  },
  description:
    "Premium guided fishing charters in Coeur d'Alene and the Pacific Northwest. Target bass, pike, salmon, and steelhead with expert local guides. Book your trip today.",
  openGraph: {
    title: "Castcadia Outfitters — Guided Fishing Charters",
    description: "Premium guided fishing charters in Coeur d'Alene and the Pacific Northwest.",
    type: "website",
    siteName: "Castcadia Outfitters",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        <SiteHeader />
        <main className="pb-20 md:pb-0">{children}</main>
        <SiteFooter />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
