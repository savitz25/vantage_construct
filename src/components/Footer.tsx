import Link from "next/link";
import { company, nav } from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="container-wide section">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="font-display text-3xl text-ivory">Vantage Construction</div>
            <p className="mt-4 max-w-md text-text-muted">
              Family-owned luxury custom home builder serving {company.serviceAreaLabel} since{" "}
              {company.founded}. {company.tagline}
            </p>
            <div className="mt-6 space-y-2 text-sm text-text-muted">
              <p>
                <a className="hover:text-gold" href={`tel:${company.phoneTel}`}>
                  {company.phone}
                </a>
              </p>
              <p>
                <a className="hover:text-gold" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
              <p>{company.address.full}</p>
            </div>
            <div className="mt-6 space-y-1 text-xs text-text-dim">
              <p>N.J. Registered Builder: License # {company.licenses.builder}</p>
              <p>
                N.J. Registered Home Improvement Contractor: License# {company.licenses.hic}
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {nav.slice(0, 7).map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="text-sm font-semibold tracking-wide text-ivory">
                  {item.label}
                </Link>
                {"children" in item && item.children ? (
                  <ul className="mt-3 space-y-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm text-text-muted transition hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div>
              <p className="text-sm font-semibold tracking-wide text-ivory">Connect</p>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>
                  <Link href="/start" className="hover:text-gold">
                    Schedule Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/commercial" className="hover:text-gold">
                    Commercial
                  </Link>
                </li>
                <li>
                  <a href={company.social.houzz} target="_blank" rel="noreferrer" className="hover:text-gold">
                    Houzz
                  </a>
                </li>
                <li>
                  <a
                    href={company.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gold"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider-gold my-10" />

        <div className="flex flex-col gap-4 text-sm text-text-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>
            Luxury custom home builder serving {company.focusTowns.join(" · ")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs text-text-dim">
          Proudly recognized by America&apos;s Trusted Builders — builders trained under a 35+ year
          master builder developer through weekly national masterminds.
        </p>
      </div>
    </footer>
  );
}
