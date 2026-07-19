import type { Metadata } from "next";
import { company } from "./company";
import { absoluteUrl, SITE_URL } from "./site";

export { absoluteUrl, SITE_URL };

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
  const fullTitle = formatPageTitle(title);

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

/** Build title tags without double-branding. Prefer: Service NJ | Modifier | Vantage Construction */
function formatPageTitle(title: string): string {
  if (title === company.name) {
    return `${company.name} | Luxury Custom Home Builder | Central & Northern NJ`;
  }
  // Normalize trailing "| Vantage" to full legal brand
  let cleaned = title.replace(/\s*\|\s*Vantage\s*$/i, "").trim();
  if (cleaned.includes(company.name)) return cleaned;
  return `${cleaned} | ${company.name}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    foundingDate: String(company.founded),
    image: absoluteUrl("/media/plans/fallback-luxury-home.svg"),
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
    geo: {
      "@type": "GeoCoordinates",
      // Warren Township, NJ approximate — refine when GBP pin confirmed
      latitude: 40.6343,
      longitude: -74.5049,
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
    knowsAbout: [
      "Custom home building",
      "Luxury home remodeling",
      "Home additions",
      "Finished basements",
      "Kitchen remodeling",
      "ADU construction",
      "Knockdown rebuilds",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `N.J. Registered Builder #${company.licenses.builder}`,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `N.J. Home Improvement Contractor #${company.licenses.hic}`,
      },
    ],
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

/** Service schema for transformation / construction service pages */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: absoluteUrl(path),
    provider: {
      "@id": `${SITE_URL}/#business`,
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      telephone: company.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: [
      ...company.focusTowns.map((t) => ({ "@type": "City", name: `${t}, NJ` })),
      ...company.counties.map((c) => ({
        "@type": "AdministrativeArea",
        name: `${c} County, NJ`,
      })),
    ],
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

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    description: company.description,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };
}
