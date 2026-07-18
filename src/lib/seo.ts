import type { Metadata } from "next";
import { company } from "./company";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantageconstruct.com";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle =
    title === company.name
      ? `${company.name} | Luxury Custom Home Builder Central New Jersey`
      : `${title} | ${company.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: company.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    telephone: company.phone,
    email: company.email,
    foundingDate: String(company.founded),
    founder: {
      "@type": "Person",
      name: company.founder,
      jobTitle: "Master Builder / Developer",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: "US",
    },
    areaServed: [
      ...company.focusTowns.map((t) => ({ "@type": "City", name: `${t}, NJ` })),
      ...company.counties.map((c) => ({
        "@type": "AdministrativeArea",
        name: `${c} County, NJ`,
      })),
    ],
    description: company.description,
    priceRange: "$$$$",
    sameAs: [company.social.houzz, company.social.facebook],
  };
}

export function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "7-Step Custom Home Building Process",
    description:
      "Vantage Construction’s proven no-surprises process for building a luxury custom home in Central & Northern New Jersey.",
    step: [
      "Share Your Vision With Us",
      "Design & Discovery Phase",
      "Sign Construction Agreement",
      "We Secure Permits & Approvals",
      "Build",
      "Certificate of Occupancy",
      "Celebrate Beginnings",
    ].map((name, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name,
    })),
  };
}

export function faqJsonLd(
  items: readonly { q: string; a: string }[] | { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productOfferJsonLd(plan: {
  name: string;
  summary: string;
  priceFrom: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: plan.summary,
    brand: { "@type": "Brand", name: company.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: plan.priceFrom,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/available-homes/${plan.slug}`),
      description:
        "Base construction price. Land, sitework, permits, and utilities not included.",
    },
  };
}
