import { CtaBanner } from "@/components/CtaBanner";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { realtorCommissionExample } from "@/lib/content";
import { formatPrice } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Realtor Partnerships",
  description:
    "Team up with Vantage Construction to convert land listings into custom home packages and refer premium buyers — commissions that can more than triple.",
  path: "/partners/realtors",
});

export default function RealtorsPage() {
  const ex = realtorCommissionExample;

  return (
    <>
      <PageHero
        eyebrow="For realtors"
        title="Two ways to make more money faster with custom homes"
        description="Transform raw land listings into lucrative home sales — or refer your discerning buyers for premium home builds. We handle construction details so you can focus on your next sale."
      />

      <section className="section pt-0">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card p-8">
              <h2 className="font-display text-3xl text-ivory">Team up with us to</h2>
              <ul className="mt-5 space-y-3 text-text-muted">
                <li>Convert challenging land listings into attractive home packages</li>
                <li>Fast-track land sales with ready-to-build packages</li>
                <li>Maximize commission potential beyond land-only deals</li>
                <li>Offer unique value to your clients</li>
              </ul>
            </div>
            <div className="card p-8">
              <h2 className="font-display text-3xl text-ivory">We will</h2>
              <ul className="mt-5 space-y-3 text-text-muted">
                <li>Meet with your potential leads and price out their custom home</li>
                <li>Pay your commission at land closing and framing</li>
                <li>Provide ongoing support and communication throughout the build</li>
                <li>Handle all construction details</li>
              </ul>
            </div>
          </div>

          <div className="card p-8">
            <p className="eyebrow">Example</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">
              How your commissions can triple
            </h2>
            <p className="mt-4 text-text-muted">
              Imagine a land listing for {formatPrice(ex.landPrice)} with a 5% commission totaling{" "}
              {formatPrice(ex.landCommission)}. By creating a home package where the custom home
              costs {formatPrice(ex.homeBuild)} (package total {formatPrice(ex.packageTotal)}), a 3%
              commission on the package could total {formatPrice(ex.packageCommission)} — more than
              triple the original commission.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs uppercase tracking-wider text-text-dim">Land only</dt>
                <dd className="mt-1 font-display text-2xl text-ivory">
                  {formatPrice(ex.landCommission)}
                </dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs uppercase tracking-wider text-text-dim">With package</dt>
                <dd className="mt-1 font-display text-2xl text-gold">
                  {formatPrice(ex.packageCommission)}
                </dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs uppercase tracking-wider text-text-dim">Additional</dt>
                <dd className="mt-1 font-display text-2xl text-ivory">
                  +{formatPrice(ex.additionalEarnings)}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-text-dim">
              You receive land commission at closing and home commission when construction begins —
              no waiting for a Certificate of Occupancy.
            </p>
          </div>
        </div>

        <div className="container-v mt-12">
          <h2 className="mb-6 text-center font-display text-3xl text-ivory">
            Submit a land listing or buyer referral
          </h2>
          <ContactForm />
        </div>
      </section>

      <CtaBanner title="Let’s talk partnership" />
    </>
  );
}
