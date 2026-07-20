import { absoluteUrl } from "@/lib/site";

/** Canonical brand asset paths (served from /public/brand) */
export const brand = {
  /** Full logo: mark + VANTAGE wordmark, transparent PNG */
  logo: "/brand/vantage-logo.png",
  logoWebp: "/brand/vantage-logo.webp",
  /** Square mark only (favicons / compact UI) — navy fill, tight crop */
  mark: "/brand/vantage-mark.png",
  favicon16: "/brand/favicon-16.png",
  favicon32: "/brand/favicon-32.png",
  favicon48: "/brand/favicon-48.png",
  appleTouch: "/brand/apple-touch-icon.png",
  icon192: "/brand/icon-192.png",
  icon512: "/brand/icon-512.png",
  /** Email-safe PNG width ~360px */
  logoEmail: "/brand/vantage-logo-email.png",
} as const;

export function brandLogoAbsolute(kind: keyof typeof brand = "logoEmail") {
  return absoluteUrl(brand[kind]);
}
