import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { company, nav } from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(11,31,74,0.35)] bg-navy-deep text-on-navy">
      <div className="container-wide section">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="inline-flex rounded-xl bg-white/95 px-3 py-2 shadow-sm">
              <BrandLogo variant="footer" />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-on-navy/75">
              Family-owned luxury custom home builder serving {company.serviceAreaLabel} since{" "}
              {company.founded}. {company.tagline}
            </p>
            <div className="mt-6 space-y-2 text-sm text-on-navy/70">
              <p>
                <a className="transition hover:text-gold-bright" href={`tel:${company.phoneTel}`}>
                  {company.phone}
                </a>
              </p>
              <p>
                <a className="transition hover:text-gold-bright" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
              <p>{company.address.full}</p>
            </div>
            <div className="mt-6 space-y-1 text-xs text-on-navy/50">
              <p>N.J. Registered Builder: License # {company.licenses.builder}</p>
              <p>
                N.J. Registered Home Improvement Contractor: License# {company.licenses.hic}
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {nav.slice(0, 7).map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold tracking-wide text-on-navy transition hover:text-gold-bright"
                >
                  {item.label}
                </Link>
                {"children" in item && item.children ? (
                  <ul className="mt-3 space-y-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm text-on-navy/65 transition hover:text-gold-bright"
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
              <p className="text-sm font-semibold tracking-wide text-on-navy">Connect</p>
              <ul className="mt-3 space-y-2 text-sm text-on-navy/65">
                <li>
                  <Link href="/start" className="transition hover:text-gold-bright">
                    Schedule Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/commercial" className="transition hover:text-gold-bright">
                    Commercial
                  </Link>
                </li>
                <li>
                  <a
                    href={company.social.houzz}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-gold-bright"
                  >
                    Houzz
                  </a>
                </li>
                <li>
                  <a
                    href={company.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-gold-bright"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-70" />

        <div className="flex flex-col gap-4 text-sm text-on-navy/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Luxury custom home builder serving {company.focusTowns.join(" · ")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-gold-bright">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-gold-bright">
              Terms
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs text-on-navy/45">
          Proudly recognized by America&apos;s Trusted Builders — builders trained under a 35+ year
          master builder developer through weekly national masterminds.
        </p>
      </div>
    </footer>
  );
}
