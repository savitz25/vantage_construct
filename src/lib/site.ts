/**
 * Canonical production domain for SEO.
 *
 * Production is deployed at https://vantagecustombuilds.com
 * Override with NEXT_PUBLIC_SITE_URL in Vercel env if this ever changes.
 *
 * CRITICAL: Self-referencing canonicals, sitemap, Open Graph, and JSON-LD
 * all use this URL. Pointing at a different live domain (e.g. old WP site)
 * makes Google treat the new site as a duplicate — no rankings.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantagecustombuilds.com"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}
