import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-bg-elevated/50">
        <div className="container-wide flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-xs text-text-dim">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <span key={`${item.label}-${i}`} className="inline-flex items-center gap-2">
                {i > 0 ? (
                  <span aria-hidden className="text-text-dim/60">
                    /
                  </span>
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-text-muted transition hover:text-gold-deep"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "font-medium text-text-muted" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
