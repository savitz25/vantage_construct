import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Accessory Buildings",
  description:
    "Custom luxury garages, workshops, art studios, and accessory buildings by Vantage Construction in Central & Northern New Jersey.",
  path: "/custom-homes/accessory-buildings",
});

const types = [
  {
    title: "Luxury car garages",
    body: "Climate-aware storage, refined finishes, and architectural integration with your main residence.",
  },
  {
    title: "Workshops",
    body: "Expansive, purpose-built spaces for serious hobbies, fabrication, and craft.",
  },
  {
    title: "Art studios & creative spaces",
    body: "Light-filled studios designed around how you work and create.",
  },
  {
    title: "Pool houses & retreats",
    body: "Outdoor living support buildings that elevate entertaining and daily lifestyle.",
  },
];

export default function AccessoryBuildingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessory buildings"
        title="Spaces for your passions"
        description="Create the ultimate space — from luxury car garages to expansive workshops to professional art studios — designed and built with the same craftsmanship as our custom homes."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {types.map((item) => (
            <div key={item.title} className="card p-8">
              <h2 className="font-display text-3xl text-ivory">{item.title}</h2>
              <p className="mt-3 text-text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
