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

const pageByHref: Record<string, { image?: string; title: string; body: string }> = {
  [basementsPage.path]: {
    image: basementsPage.spaces[0]?.image,
    title: basementsPage.spaces[0]?.title ?? "Finished basements",
    body: basementsPage.subhead,
  },
  [kitchensPage.path]: {
    image: kitchensPage.spaces[0]?.image,
    title: kitchensPage.spaces[0]?.title ?? "Kitchen remodeling",
    body: kitchensPage.subhead,
  },
  [primarySuitePage.path]: {
    image: primarySuitePage.spaces[0]?.image,
    title: primarySuitePage.spaces[0]?.title ?? "Primary suite",
    body: primarySuitePage.subhead,
  },
  [additionsPage.path]: {
    image: additionsPage.spaces[0]?.image,
    title: additionsPage.spaces[0]?.title ?? "Home additions",
    body: additionsPage.subhead,
  },
  [garagesPage.path]: {
    image: garagesPage.spaces[0]?.image,
    title: garagesPage.spaces[0]?.title ?? "Garages",
    body: garagesPage.subhead,
  },
  [outdoorPage.path]: {
    image: outdoorPage.spaces[0]?.image,
    title: outdoorPage.spaces[0]?.title ?? "Outdoor living",
    body: outdoorPage.subhead,
  },
  [atticsPage.path]: {
    image: atticsPage.spaces[0]?.image,
    title: atticsPage.spaces[0]?.title ?? "Attic conversions",
    body: atticsPage.subhead,
  },
};

/** Cross-links other transformation services for discovery + SEO. */
export function RelatedServices({
  currentPath,
  variant = "full",
}: {
  currentPath: string;
  /** mid = compact grid after spaces; full = rich end-of-page section */
  variant?: "mid" | "full";
}) {
  const others = transformServices.filter((s) => s.href !== currentPath);
  if (!others.length) return null;

  const relatedTools = transformTools
    .filter((t) => !t.href.includes(currentPath.split("/").pop() ?? "___"))
    .slice(0, 4);

  if (variant === "mid") {
    return (
      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Still exploring?</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">
                Browse other rooms & projects
              </h2>
            </div>
            <Link
              href="/transformations"
              className="text-sm font-semibold text-gold-deep hover:underline"
            >
              All transformations →
            </Link>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-6 sm:gap-3">
            {others.map((s) => {
              const meta = pageByHref[s.href];
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card card-hover group w-[9.5rem] shrink-0 overflow-hidden p-0 sm:w-auto"
                >
                  <div className="relative aspect-[4/3] bg-bg-soft">
                    {meta?.image ? (
                      <SmartImage
                        src={meta.image}
                        alt=""
                        fill
                        sizes="160px"
                        className="transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-bg-soft to-bg-elevated" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute bottom-2 left-2 right-2 font-display text-base text-white drop-shadow">
                      {s.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section border-t border-border bg-bg-elevated">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Explore more of your home</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Other transformations homeowners pair with this project
            </h2>
            <p className="mt-3 text-text-muted">
              Many clients plan more than one space. Jump into another room — or open a Studio tool —
              without hunting through the main menu.
            </p>
          </div>
          <Link href="/transformations" className="btn btn-secondary !px-4 !py-2.5 text-xs">
            Transformations hub
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 right-3 font-display text-xl text-white drop-shadow">
                    {s.title ?? s.label}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="line-clamp-3 text-sm text-text-muted">{s.body}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-gold-deep">
                    Explore {s.label.toLowerCase()} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {relatedTools.length ? (
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-dim">
              Interactive Studios
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted transition hover:border-gold/40 hover:text-gold-deep"
                >
                  {t.label}
                  {t.badge ? (
                    <span className="ml-2 text-[0.65rem] uppercase tracking-wider text-gold">
                      {t.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
              <Link
                href="/studios"
                className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-deep"
              >
                All Studios →
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-dim">
          {transformSecondaryLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-gold-deep">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
