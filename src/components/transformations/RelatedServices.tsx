import Link from "next/link";
import { transformServices } from "@/lib/transformations/ia";

/** Cross-links other transformation services for SEO and discovery. */
export function RelatedServices({ currentPath }: { currentPath: string }) {
  const others = transformServices.filter((s) => s.href !== currentPath).slice(0, 4);
  if (!others.length) return null;

  return (
    <section className="section-sm border-t border-border">
      <div className="container-wide">
        <p className="eyebrow">Explore more</p>
        <h2 className="mt-3 font-display text-3xl text-ivory">Related transformations</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <Link key={s.href} href={s.href} className="card card-hover p-5">
              <h3 className="font-display text-xl text-ivory">{s.title ?? s.label}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-text-muted">{s.body}</p>
              <span className="mt-4 inline-block text-sm text-gold-deep">
                Explore {s.label.toLowerCase()} →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/transformations" className="text-sm text-gold-deep hover:underline">
            View all home transformations →
          </Link>
        </div>
      </div>
    </section>
  );
}
