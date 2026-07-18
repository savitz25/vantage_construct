import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";

export function ServicePage({
  eyebrow,
  title,
  description,
  points,
  related,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  related?: { href: string; label: string }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="section pt-0">
        <div className="container-v">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">What to expect</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex gap-2 text-text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
            {related?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {related.map((item) => (
                  <Link key={item.href} href={item.href} className="btn btn-secondary">
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
