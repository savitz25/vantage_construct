import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import {
  transformSecondaryLinks,
  transformServices,
  transformTools,
} from "@/lib/transformations/ia";
import {
  additionsPage,
  atticsPage,
  basementsPage,
  garagesPage,
  kitchensPage,
  outdoorPage,
  primarySuitePage,
} from "@/lib/transformations/service-pages";

const pageByHref: Record<string, { image?: string; body: string }> = {
  [basementsPage.path]: {
    image: basementsPage.spaces[0]?.image,
    body: basementsPage.spaces[0]?.body ?? basementsPage.subhead,
  },
  [kitchensPage.path]: {
    image: kitchensPage.spaces[0]?.image,
    body: kitchensPage.spaces[0]?.body ?? kitchensPage.subhead,
  },
  [primarySuitePage.path]: {
    image: primarySuitePage.spaces[0]?.image,
    body: primarySuitePage.spaces[0]?.body ?? primarySuitePage.subhead,
  },
  [additionsPage.path]: {
    image: additionsPage.spaces[0]?.image,
    body: additionsPage.spaces[0]?.body ?? additionsPage.subhead,
  },
  [garagesPage.path]: {
    image: garagesPage.spaces[0]?.image,
    body: garagesPage.spaces[0]?.body ?? garagesPage.subhead,
  },
  [outdoorPage.path]: {
    image: outdoorPage.spaces[0]?.image,
    body: outdoorPage.spaces[0]?.body ?? outdoorPage.subhead,
  },
  [atticsPage.path]: {
    image: atticsPage.spaces[0]?.image,
    body: atticsPage.spaces[0]?.body ?? atticsPage.subhead,
  },
};

/**
 * Elegant in-page cross-navigation between Transformations services.
 * Prefer mid + full sections over sticky header bars (keeps main nav premium).
 */
export function RelatedServices({
  currentPath,
  variant = "full",
}: {
  currentPath: string;
  /** mid = after gallery; full = end-of-page with Studios */
  variant?: "mid" | "full";
}) {
  const others = transformServices.filter((s) => s.href !== currentPath);
  if (!others.length) return null;

  const relatedTools = transformTools.slice(0, 6);

  if (variant === "mid") {
    return (
      <section className="section border-y border-border/80 bg-bg-elevated/60">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Design more of your home</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Explore other transformations
            </h2>
            <p className="mt-3 text-text-muted">
              Many homeowners plan more than one space. Jump to another room when you&apos;re ready —
              no need to dig through the main menu.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => {
              const meta = pageByHref[s.href];
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card card-hover group overflow-hidden p-0"
                >
                  <div className="relative aspect-[16/10] bg-bg-soft">
                    {meta?.image ? (
                      <SmartImage
                        src={meta.image}
                        alt={`${s.label} — Vantage home transformations`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-bg-soft via-bg-elevated to-[#e8dfd0]" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl text-white drop-shadow sm:text-2xl">
                      {s.title ?? s.label}
                    </h3>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="line-clamp-2 text-sm text-text-muted">{s.body}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold-deep">
                      View {s.label.toLowerCase()}
                      <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/transformations" className="btn btn-secondary">
              All transformations
            </Link>
            <Link href="/studios" className="text-sm font-semibold text-gold-deep hover:underline">
              Open Design Studios →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section border-t border-border">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Continue exploring</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Next steps for your home
            </h2>
            <p className="mt-3 text-text-muted">
              Related rooms, process, and interactive Studios — all one click away.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/transformations" className="btn btn-secondary !px-4 !py-2.5 text-xs">
              Transformations hub
            </Link>
            <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs">
              Schedule a consultation
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition hover:border-gold/35 hover:shadow-[0_12px_40px_rgba(40,30,15,0.06)]"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-bg-soft">
                {pageByHref[s.href]?.image ? (
                  <SmartImage
                    src={pageByHref[s.href].image}
                    alt={`${s.label} transformation in North Jersey`}
                    fill
                    sizes="80px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg text-ivory">{s.label}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-text-muted">{s.body}</p>
              </div>
              <span className="ml-auto shrink-0 text-gold-deep opacity-70 transition group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-bg-elevated/80 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
            Interactive Studios & calculators
          </p>
          <p className="mt-2 max-w-xl text-sm text-text-muted">
            Design and estimate in minutes — then bring results to a consultation.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:border-gold/40 hover:text-gold-deep"
              >
                {t.label}
              </Link>
            ))}
            <Link
              href="/studios"
              className="rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-deep"
            >
              All Studios →
            </Link>
            <Link
              href="/cost-to-build-a-house-nj"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-navy transition hover:border-gold/40"
            >
              Cost Studio →
            </Link>
            <Link
              href="/move-or-improve-calculator-nj"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:border-gold/40 hover:text-gold-deep"
            >
              Move or improve →
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-dim">
          {transformSecondaryLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-deep">
              {l.label}
            </Link>
          ))}
          <Link href="/custom-homes/rebuilds" className="hover:text-gold-deep">
            Knockdowns & rebuilds
          </Link>
          <Link href="/land/evaluation" className="hover:text-gold-deep">
            Lot evaluation
          </Link>
          <Link href="/locations" className="hover:text-gold-deep">
            Town guides
          </Link>
        </div>
      </div>
    </section>
  );
}
