"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { landPathFinderOptions, landPathways } from "@/lib/land/hub-content";

/**
 * Light engagement: visitor self-identifies → recommended land pathway.
 * Keeps the hub advisory, not a hard funnel.
 */
export function LandPathFinder() {
  const [selected, setSelected] = useState<string | null>(null);

  const option = landPathFinderOptions.find((o) => o.id === selected);
  const pathway =
    option && "pathId" in option && option.pathId
      ? landPathways.find((p) => p.id === option.pathId)
      : null;
  const directHref =
    option && "href" in option && option.href ? option.href : pathway?.href ?? null;

  return (
    <div id="explore-path" className="scroll-mt-28">
      <div className="card overflow-hidden p-0">
        <div className="border-b border-border bg-bg-elevated px-6 py-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
            60-second orientation
          </p>
          <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
            Which path fits you?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            One question. A clear recommendation. Then go deeper on the page built for your
            situation — no forms required.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3 p-6 sm:p-8">
            {landPathFinderOptions.map((o) => {
              const active = selected === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setSelected(o.id);
                    trackEvent("land_hub_path_select", {
                      event_category: "land_hub",
                      path_option: o.id,
                    });
                  }}
                  className={`w-full rounded-xl border px-4 py-4 text-left transition sm:px-5 ${
                    active
                      ? "border-gold bg-gold/10 shadow-[0_0_0_1px_rgba(184,137,61,0.25)]"
                      : "border-border bg-bg hover:border-gold/40"
                  }`}
                >
                  <span className="block font-display text-lg text-ivory sm:text-xl">
                    {o.label}
                  </span>
                  <span className="mt-1 block text-xs text-text-muted sm:text-sm">{o.detail}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-center border-t border-border bg-bg-elevated p-6 sm:p-8 lg:border-l lg:border-t-0">
            {!selected ? (
              <p className="text-sm text-text-muted">
                Select the option that best matches your situation. We’ll point you to the right
                next step.
              </p>
            ) : pathway && directHref ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Recommended
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{pathway.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{pathway.tagline}</p>
                <p className="mt-3 text-sm text-text-muted">{pathway.body}</p>
                <Link
                  href={directHref}
                  className="btn btn-primary mt-6 self-start"
                  onClick={() =>
                    trackEvent("land_hub_path_cta", {
                      event_category: "land_hub",
                      destination: directHref,
                    })
                  }
                >
                  {pathway.cta} →
                </Link>
              </>
            ) : directHref ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Recommended
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                  A short conversation
                </h3>
                <p className="mt-3 text-sm text-text-muted">
                  We’ll listen first — lot, acreage, or inventory — and point you to evaluation,
                  Signature Builds, or multi-lot without pressure.
                </p>
                <Link
                  href={directHref}
                  className="btn btn-primary mt-6 self-start"
                  onClick={() =>
                    trackEvent("land_hub_path_cta", {
                      event_category: "land_hub",
                      destination: directHref,
                    })
                  }
                >
                  Schedule a consultation →
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
