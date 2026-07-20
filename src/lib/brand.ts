import { absoluteUrl } from "@/lib/site";

/** Canonical brand asset paths (served from /public/brand) */
export const brand = {
  /** Full logo: mark + VANTAGE wordmark, transparent PNG */
  logo: "/brand/vantage-logo.png",
  logoWebp: "/brand/vantage-logo.webp",
  /** Square mark only (favicons / compact UI) */
  mark: "/brand/vantage-mark.png",
  /** Email-safe PNG width ~360px */
  logoEmail: "/brand/vantage-logo-email.png",
} as const;

export function brandLogoAbsolute(kind: keyof typeof brand = "logoEmail") {
  return absoluteUrl(brand[kind]);
}
