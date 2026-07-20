import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCta } from "@/components/StickyCta";
import { brand } from "@/lib/brand";
import { company } from "@/lib/company";
import { createMetadata, localBusinessJsonLd, webSiteJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
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
  // Self-referencing base for all relative OG/canonical URLs
  metadataBase: new URL(SITE_URL),
  icons: {
    // Multi-size set from full-logo mark — cache-busted for logo refresh
    icon: [
      { url: "/favicon.ico?v=5", sizes: "48x48" },
      { url: "/brand/favicon-16.png?v=5", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png?v=5", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png?v=5", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-192.png?v=5", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png?v=5", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png?v=5", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/favicon-32.png?v=5"],
  },
  // Do NOT set meta keywords — ignored by Google; only reveals keyword list to competitors
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <StickyCta />
        <Analytics />
      </body>
    </html>
  );
}
