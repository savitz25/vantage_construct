export const company = {
  name: "Vantage Construction",
  legalName: "Vantage Construction Inc",
  founder: "Victor Lobozzo",
  founded: 1990,
  yearsExperience: "35+",
  tagline: "Old-world craftsmanship. Modern innovation. No surprises.",
  philosophy: "No Surprises",
  description:
    "Family-owned luxury custom home builder serving Central & Northern New Jersey. We blend over 35 years of old-world craftsmanship with modern innovation to create homes of exceptional quality.",
  address: {
    street: "16 Saddlemount Ave",
    city: "Warren",
    state: "NJ",
    zip: "07059",
    full: "16 Saddlemount Ave, Warren, NJ 07059",
  },
  phone: "(908) 350-0989",
  phoneTel: "+19083500989",
  email: "V.Lobozzo@VantageConstruct.com",
  licenses: {
    builder: "029289",
    hic: "13VH02047100",
  },
  focusTowns: ["Warren", "Watchung", "Basking Ridge", "Millburn-Short Hills"],
  counties: ["Somerset", "Morris", "Union", "Essex"],
  serviceAreaLabel: "Central & Northern New Jersey",
  social: {
    houzz:
      "https://www.houzz.com/professionals/home-builders/vantage-construction-inc-pfvwus-pf~59598246",
    facebook: "https://www.facebook.com/p/Vantage-Construction-Inc-100067294357226/",
  },
  recognition:
    "America's Trusted Builders — certified top-tier builders trained under a 35+ year master builder developer, with weekly masterminds among hundreds of builders nationwide.",
  values: [
    {
      title: "Commitment to Excellence",
      body: "Every project is built as if it were our own — with old-world craftsmanship, attention to detail, and pride that has defined our family business for over 35 years.",
    },
    {
      title: "Client-Centric Approach",
      body: "Clear, direct communication through in-person meetings, Zoom, or text. Exceptional responsiveness and accessibility at every stage.",
    },
    {
      title: "Innovation & Continuous Improvement",
      body: "We blend traditional building techniques with modern expertise so homes deliver both visible elegance and hidden quality that stands the test of time.",
    },
    {
      title: "Integrity and Accountability",
      body: "Our No Surprises philosophy means transparent process, honest guidance, and clients who remain delighted with their homes 15+ years later.",
    },
  ],
  differentiators: [
    {
      title: "Clear & Welcoming Communication",
      body: "Client-focused communication throughout your journey — meetings, Zoom, or text — with exceptional responsiveness.",
    },
    {
      title: "Expert Guidance Throughout",
      body: "35 years of industry-leading experience across Somerset, Morris, Union, and Essex counties — from design to final walkthrough.",
    },
    {
      title: "Customization at Every Step",
      body: "Every aspect tailored to your vision and budget, from custom luxury homes to high-end renovations.",
    },
    {
      title: "Old-World Craftsmanship & Modern Innovation",
      body: "Traditional techniques paired with modern expertise for lasting value and enduring quality.",
    },
    {
      title: "Elite Trade Partner Network",
      body: "A carefully curated network of trusted trade partners throughout Warren, Watchung, Basking Ridge, and Millburn-Short Hills.",
    },
  ],
  founderBio:
    "For over three decades, Victor Lobozzo has led Vantage Construction in building some of the finest luxury residences in Central and Northern New Jersey. Known for his attention to detail and cost-conscious approach, Victor combines old-world craftsmanship with modern innovation to create homes of lasting value. His exceptional responsiveness and hands-on involvement throughout every project have earned him a reputation as one of the most respected builders in the region, with clients still delighted with their homes 15+ years later. As founder of this family-owned business, Victor ensures every project reflects the superior quality, integrity, and craftsmanship synonymous with the Vantage Construction name.",
  /** Canonical public site — keep in sync with src/lib/site.ts default */
  siteUrl: "https://vantagecustombuilds.com",
} as const;

export const nav = [
  {
    label: "Custom Homes",
    href: "/custom-homes",
    children: [
      { label: "Building Process", href: "/custom-homes/process" },
      { label: "Available Designs", href: "/available-homes" },
      { label: "Knockdowns & Rebuilds", href: "/custom-homes/rebuilds" },
      { label: "ADUs", href: "/custom-homes/adus" },
      { label: "Accessory Buildings", href: "/custom-homes/accessory-buildings" },
      { label: "Land Evaluation", href: "/land/evaluation" },
    ],
  },
  {
    label: "Transformations",
    href: "/transformations",
    children: [
      { label: "Overview", href: "/transformations" },
      { label: "Finished Basements", href: "/transformations/basements" },
      { label: "Kitchen Remodeling", href: "/transformations/kitchens" },
      { label: "Home Additions", href: "/transformations/additions" },
      { label: "Primary Suite", href: "/transformations/primary-suite" },
      { label: "Garages & Accessory Buildings", href: "/transformations/garages" },
      { label: "Outdoor Living", href: "/transformations/outdoor-living" },
      { label: "Attic Conversions", href: "/transformations/attics" },
      { label: "Renovation Process", href: "/transformations/process" },
    ],
  },
  {
    label: "Land & Spec",
    href: "/land",
    children: [
      { label: "Land Hub", href: "/land" },
      { label: "Land Opportunities", href: "/land/opportunities" },
      { label: "Land Evaluation", href: "/land/evaluation" },
      { label: "Spec Homes", href: "/land/spec-homes" },
      { label: "Multi-Lot Development", href: "/land/multi-lot" },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "For Realtors", href: "/partners/realtors" },
      { label: "For Investors", href: "/partners/investors" },
    ],
  },
  {
    label: "Studios",
    href: "/studios",
    children: [
      { label: "All Studios", href: "/studios" },
      { label: "Design Studio", href: "/design-studio" },
      { label: "Kitchen Studio", href: "/kitchen-remodel-cost-nj" },
      { label: "Attic Studio", href: "/attic-conversion-cost-nj" },
      { label: "Garage Studio", href: "/accessory-building-cost-nj" },
      { label: "Outdoor Living Studio", href: "/outdoor-kitchen-cost-nj" },
      { label: "Primary Suite Studio", href: "/primary-suite-cost-nj" },
      { label: "Basement Builder", href: "/finished-basement-cost-nj" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "All Calculators", href: "/calculators" },
      { label: "Cost Studio", href: "/cost-to-build-a-house-nj" },
      { label: "Move or Improve?", href: "/move-or-improve-calculator-nj" },
      { label: "ADU Payback", href: "/adu-cost-calculator-nj" },
      { label: "Lot Feasibility", href: "/land/evaluation" },
      { label: "Multi-Lot HBU", href: "/land/multi-lot" },
      { label: "Renovate vs Rebuild", href: "/custom-homes/rebuilds" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Values", href: "/about#values" },
      { label: "Projects", href: "/projects" },
      { label: "Town guides", href: "/locations" },
      { label: "Warren", href: "/locations/warren-nj" },
      { label: "Watchung", href: "/locations/watchung-nj" },
      { label: "Basking Ridge", href: "/locations/basking-ridge-nj" },
      { label: "Millburn–Short Hills", href: "/locations/millburn-short-hills-nj" },
      { label: "Westfield", href: "/locations/westfield-nj" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "Resource Center", href: "/insights" },
      { label: "FAQs", href: "/insights/faq" },
      { label: "Blog notes", href: "/insights/blog" },
      { label: "Project case studies", href: "/projects" },
    ],
  },
] as const;
