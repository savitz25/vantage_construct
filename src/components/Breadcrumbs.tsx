import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = {
  label: string;
  /** Parent crumbs should include href; current page omits it (not linked). */
  href?: string;
  /** Absolute path for BreadcrumbList schema when the crumb is not a link */
  path?: string;
};

type Props = {
  items: Crumb[];
  /**
   * inline — sits inside PageHero / tool hero (no bar, no extra top padding)
   * standalone — rare; adds header offset when used alone
   */
  variant?: "inline" | "standalone";
  className?: string;
};

/**
 * Refined sitewide breadcrumb trail + BreadcrumbList JSON-LD.
 * Prefer passing crumbs into PageHero so they sit above the H1 with proper spacing.
 */
export function Breadcrumbs({ items, variant = "inline", className = "" }: Props) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const urlPath = item.href ?? item.path ?? "/";
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: absoluteUrl(urlPath),
      };
    }),
  };

  const nav = (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb-nav ${variant === "standalone" ? "breadcrumb-nav-standalone" : ""} ${className}`}
    >
      <ol className="breadcrumb-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="breadcrumb-item">
              {i > 0 ? (
                <span className="breadcrumb-sep" aria-hidden>
                  ›
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      {variant === "standalone" ? (
        <div className="breadcrumb-standalone-wrap">{nav}</div>
      ) : (
        nav
      )}
    </>
  );
}
