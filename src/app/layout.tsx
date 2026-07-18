import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { company } from "@/lib/company";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: company.name,
    description: company.description,
    path: "/",
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantageconstruct.com"),
  keywords: [
    "luxury custom home builder New Jersey",
    "custom home builder Warren NJ",
    "home builder Basking Ridge",
    "custom homes Millburn Short Hills",
    "knockdown rebuild New Jersey",
    "ADU builder NJ",
    "Victor Lobozzo",
    "Vantage Construction",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
