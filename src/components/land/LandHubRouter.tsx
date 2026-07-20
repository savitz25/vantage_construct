"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import {
  landDescribeOptions,
  landPathways,
  type LandPathwayId,
} from "@/lib/land/hub-content";

/**
 * Routing question + pathway cards.
 * Selecting “What best describes you?” highlights the matching card and tracks analytics.
 */
export function LandHubRouter() {
  const [active, setActive] = useState<LandPathwayId | null>(null);
  const groupId = useId();

  useEffect(() => {
    trackEvent("land_hub_view", { event_category: "land_hub", page_path: "/land" });
  }, []);

  function selectDescribe(optionId: string, pathId: LandPathwayId) {
    setActive(pathId);
    trackEvent("land_hub_describe_select", {
      event_category: "land_hub",
      describe_option: optionId,
      pathway: pathId,
    });
    // Smooth scroll to highlighted card on mobile
    requestAnimationFrame(() => {
      document.getElementById(`pathway-${pathId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }

  function trackPathway(pathId: LandPathwayId, href: string, source: "card" | "cta") {
    trackEvent("land_hub_pathway_click", {
      event_category: "land_hub",
      pathway: pathId,
      destination: href,
      click_source: source,
    });
  }

  return (
    <div className="space-y-12 lg:space-y-14">
      {/* Routing question */}
      <div
        id="explore-path"
        className="scroll-mt-28 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8"
        role="group"
        aria-labelledby={`${groupId}-label`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
          Start here
        </p>
        <h2
          id={`${groupId}-label`}
          className="mt-2 font-display text-2xl text-ivory sm:text-3xl"
        >
          What best describes you?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">
          One answer steers you to the right opportunity — then open the matching card below.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-labelledby={`${groupId}-label`}>
          {landDescribeOptions.map((opt) => {
            const selected = active === opt.pathId;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectDescribe(opt.id, opt.pathId)}
                className={`rounded-xl border px-4 py-4 text-left transition sm:min-h-[5.5rem] ${
                  selected
                    ? "border-gold bg-gold/12 ring-1 ring-gold/30"
                    : "border-border bg-bg hover:border-gold/40"
                }`}
              >
                <span className="block text-sm font-medium leading-snug text-ivory sm:text-[0.95rem]">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Three pathways */}
      <div id="pathways" className="scroll-mt-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow justify-center">Land pathways</p>
          <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
            Choose the door that matches your goal
          </h2>
          <p className="mt-3 text-text-muted">
            This hub introduces — it does not replace — the deeper pages. Each path is built for a
            different audience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {landPathways.map((path) => {
            const highlighted = active === path.id;
            return (
              <article
                key={path.id}
                id={`pathway-${path.id}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-bg-elevated shadow-[var(--shadow)] transition ${
                  highlighted
                    ? "border-gold ring-2 ring-gold/35"
                    : "border-border hover:border-gold/35"
                }`}
                aria-current={highlighted ? "true" : undefined}
              >
                <Link
                  href={path.href}
                  className="relative block aspect-[16/10] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  onClick={() => trackPathway(path.id, path.href, "card")}
                  aria-label={`${path.title} — ${path.cta}`}
                >
                  <SmartImage
                    src={path.image}
                    alt={path.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {path.audience}
                  </span>
                  {highlighted ? (
                    <span className="absolute right-3 top-3 rounded-full border border-gold/50 bg-black/55 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep backdrop-blur-sm">
                      Recommended for you
                    </span>
                  ) : null}
                </Link>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-2xl text-ivory sm:text-3xl">{path.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold-deep">{path.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{path.body}</p>
                  <Link
                    href={path.href}
                    className="btn btn-primary mt-6 self-start"
                    onClick={() => trackPathway(path.id, path.href, "cta")}
                  >
                    {path.cta} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
