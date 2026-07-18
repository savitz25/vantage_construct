import { CtaBanner } from "@/components/CtaBanner";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { investorStructures, landDevelopments } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Investor Partnerships",
  description:
    "Partner with Vantage Construction on luxury custom homes and development opportunities in Northern & Central New Jersey — loan, equity, and hybrid structures.",
  path: "/partners/investors",
});

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For investors"
        title="Maximize real estate investment potential"
        description="Partner with us on luxury custom homes or development opportunities in Northern and Central New Jersey’s most desirable communities."
      />
      <section className="section pt-0">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {investorStructures.map((item) => (
              <div key={item.title} className="card p-8">
                <h2 className="font-display text-3xl text-ivory">{item.title}</h2>
                <p className="mt-3 text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="card mt-8 p-8">
            <h2 className="font-display text-3xl text-ivory">Why partner with Vantage</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 text-text-muted">
              <li>Strategic market & land analysis in Warren, Watchung, Basking Ridge, Millburn-Short Hills</li>
              <li>Successful developments including {landDevelopments.join(", ")}</li>
              <li>Proven development track record since 1990</li>
              <li>Deep local market expertise & realtor relationships</li>
              <li>No-surprises approach to every project</li>
              <li>Spec home program in the $850k–$2M+ range</li>
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="mb-6 text-center font-display text-3xl text-ivory">
              Start a conversation
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
