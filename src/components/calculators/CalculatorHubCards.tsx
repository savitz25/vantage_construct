"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import { calculators, type CalculatorItem } from "@/lib/calculators/catalog";

function badgeClass(badge: CalculatorItem["badge"]) {
  if (badge === "Most Popular") return "border-gold/50 bg-gold/20 text-gold-deep";
  if (badge === "New") return "border-emerald-700/30 bg-emerald-900/20 text-emerald-200";
  return "border-white/25 bg-black/35 text-white";
}

export function CalculatorHubCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {calculators.map((c) => (
        <article
          key={c.id}
          className="card card-hover group flex flex-col overflow-hidden p-0"
        >
          <div className="relative aspect-[16/10] bg-bg-soft">
            <SmartImage
              src={c.image}
              alt={c.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                {c.category}
              </span>
              {c.badge ? (
                <span
                  className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${badgeClass(c.badge)}`}
                >
                  {c.badge}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h2 className="font-display text-2xl text-ivory sm:text-3xl">{c.title}</h2>
            <p className="mt-2 flex-1 text-sm text-text-muted">{c.body}</p>
            <Link
              href={c.href}
              className="btn btn-primary mt-5 self-start !px-4 !py-2.5 text-xs"
              onClick={() =>
                trackEvent("calculator_hub_open", {
                  event_category: "calculators",
                  calculator_id: c.id,
                  destination: c.href,
                })
              }
            >
              {c.cta ?? "Open calculator"} →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
