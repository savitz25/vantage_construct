export const processSteps = [
  {
    number: 1,
    title: "Share Your Vision With Us",
    summary: "Complimentary consultation to explore goals, budget, and fit.",
    details: [
      "Review your project goals and explore your vision",
      "Discuss lifestyle needs that shape design and layout",
      "Review available homes, gallery, and inspiration",
      "Expert guidance on expectations so there are no surprises",
      "Clear discussion of budget considerations with ballpark ranges",
      "Outline our proven process and timeline expectations",
      "Discuss financing options and requirements",
      "Determine if Design & Discovery investment makes sense",
    ],
  },
  {
    number: 2,
    title: "Design & Discovery Phase",
    summary: "Feasibility, sketches, and cost clarity before you commit to build.",
    investment: "$500 – $2,500 based on project scope & complexity",
    details: [
      "Professional evaluation of your land — or help finding a home site",
      "Feasibility analysis for design vs. desired budget",
      "Preliminary sketches and space planning layouts",
      "Customize floor plan and elevations",
      "Set realistic allowances for major selections",
      "Discuss sitework, permit fees, and utility connection fees",
      "Comprehensive planning with thorough cost analysis",
      "Refine budget parameters based on design decisions",
    ],
  },
  {
    number: 3,
    title: "Sign Construction Agreement",
    summary: "Full cost clarity, milestones, and deposit to begin drawings & permits.",
    investment: "Deposit typically $5,000 – $30,000 depending on scope",
    details: [
      "Complete detailed cost analysis and projections",
      "Establish payment schedules and milestones",
      "Develop detailed project timeline",
      "Review client task list for selections during build",
      "Sign construction agreement and submit deposit for construction drawings, permitting fees, and site plan if needed",
    ],
  },
  {
    number: 4,
    title: "We Secure Permits & Approvals",
    summary: "We manage the approval process so you stay focused on decisions that matter.",
    details: [
      "Building permit applications and submissions",
      "Zoning compliance verification",
      "Environmental considerations",
      "Historical district approvals when applicable",
      "HOA or covenant reviews",
      "Health department approvals",
      "Site development permits",
      "Utility connection permits",
    ],
  },
  {
    number: 5,
    title: "Build",
    summary: "Hands-on construction management with constant communication.",
    details: [
      "Constant communication and progress updates",
      "Sitework including grading, drainage, and foundation preparation",
      "Utility coordination for power, water, sewer — or well/septic",
      "Bi-weekly progress, budget, and timeline updates via Zoom and site visits",
      "Internal quality checks at key milestones",
      "Building inspector requirements and scheduling",
      "Optional job-site camera for 24/7 remote viewing (~$50/mo)",
      "Welcome design refinements during construction with upfront pricing",
      "Cleanliness and site security throughout",
    ],
  },
  {
    number: 6,
    title: "Certificate of Occupancy",
    summary: "Walkthroughs, systems training, and a smooth handoff into your home.",
    details: [
      "Detailed walkthrough inspections",
      "Complete all punch list items",
      "Ensure all systems are fully operational",
      "Systems orientation and training",
      "Warranty information and coverage review",
      "Owner’s manuals and documentation",
      "Digital record of specifications, selections, and paint colors",
      "Final inspections and occupancy permits",
      "Professional deep cleaning",
      "Regular check-ins during your first months after completion",
    ],
  },
  {
    number: 7,
    title: "Celebrate Beginnings",
    summary: "Housewarming celebration and a lasting relationship with Vantage.",
    details: [
      "Host a housewarming celebration at our expense",
      "Welcome back the craftspeople who built your home",
      "Invite friends and family to experience your custom home",
      "Share your experience through reviews and referrals",
      "Join our community of homeowners who experienced no surprises",
      "Stay connected for future home care guidance and support",
    ],
  },
] as const;

export const landDevelopments = [
  "Hidden Hollow Estates",
  "Prospect Hill Estates",
  "Winding Ridge Estates",
] as const;

export const customHomeServices = [
  {
    title: "Available Designs",
    href: "/available-homes",
    body: "Explore customizable floor plans organized by size — each can be personalized to your style and needs.",
  },
  {
    title: "Knockdowns & Rebuilds",
    href: "/custom-homes/rebuilds",
    body: "Transform your existing property into your dream home. We guide every step at your current location.",
  },
  {
    title: "Accessory Dwelling Units",
    href: "/custom-homes/adus",
    body: "Maximize property potential with a custom ADU — rental income, multi-generational living, or private guest space.",
  },
  {
    title: "Accessory Buildings",
    href: "/custom-homes/accessory-buildings",
    body: "Luxury car garages, expansive workshops, professional art studios, and more.",
  },
  {
    title: "Land Evaluation",
    href: "/land/evaluation",
    body: "Evaluate and maximize your lot’s potential with local zoning knowledge and proven analysis.",
  },
] as const;

export const transformationServices = [
  {
    title: "Additions",
    href: "/transformations/additions",
    body: "Expand living space with a seamless addition that matches your home’s style and enhances value.",
  },
  {
    title: "Remodeling & Renovations",
    href: "/transformations/remodeling",
    body: "Transform outdated spaces into beautiful, functional rooms that reflect your style.",
  },
  {
    title: "Lower Level Living",
    href: "/transformations/basements",
    body: "Private cinemas, wellness suites, speakeasies, and guest quarters — the best square footage you already own.",
  },
  {
    title: "Attic Sanctuaries",
    href: "/transformations/attics",
    body: "Upper-level suites, studios, and offices reclaimed from volume under the roof.",
  },
  {
    title: "Outdoor Living Estate",
    href: "/transformations/outdoor-living",
    body: "Porches, sunrooms, decks, outdoor kitchens, and fireplaces for resort-level evenings at home.",
  },
] as const;

export const commercialServices = [
  "Offices",
  "Medical & dental",
  "Retail",
  "Restaurant",
  "Tenant improvements",
  "Light industrial",
] as const;

export const commercialStartingNote =
  "Commercial buildouts and tenant improvements available — approximate starting points from roughly $175k depending on scope.";

export const realtorCommissionExample = {
  landPrice: 150000,
  landCommissionRate: 0.05,
  landCommission: 7500,
  homeBuild: 700000,
  packageTotal: 850000,
  packageCommissionRate: 0.03,
  packageCommission: 25500,
  additionalEarnings: 18000,
};

export const investorStructures = [
  {
    title: "Loan Returns",
    body: "Partner through project financing structures designed around clear timelines and transparent reporting.",
  },
  {
    title: "Equity Splits",
    body: "Share in project upside through equity partnership structures on select opportunities.",
  },
  {
    title: "Hybrid Models",
    body: "Combine elements of loan and equity structures to match your investment goals.",
  },
] as const;

export const faqs = [
  {
    q: "What areas do you serve?",
    a: "We specialize in Central & Northern New Jersey with a strong focus on Warren, Watchung, Basking Ridge, and Millburn-Short Hills, serving Somerset, Morris, Union, and Essex counties.",
  },
  {
    q: "What does “No Surprises” mean?",
    a: "We discuss everything upfront, anticipate challenges, keep you informed every step of the way, and provide clear communication so you always know where the project stands.",
  },
  {
    q: "What is the Design & Discovery investment?",
    a: "Typical investment is $500–$2,500 based on project scope and complexity. This phase covers feasibility, preliminary design, and thorough cost analysis before construction commitment.",
  },
  {
    q: "What deposit is required for construction?",
    a: "Deposits typically range from $5,000 to $30,000 depending on project scope, covering construction drawings, permitting fees, and site plan work when needed.",
  },
  {
    q: "Can you customize plans I found online?",
    a: "Yes. Already have plans or found inspiration elsewhere? We’ll adapt any design to create your ideal home while maintaining your vision.",
  },
  {
    q: "Do you offer job-site cameras?",
    a: "Yes — optional job-site camera for 24/7 remote viewing is available at approximately $50/month, ideal for out-of-state clients.",
  },
  {
    q: "Are plan prices all-inclusive?",
    a: "Base plan pricing excludes land, sitework, permits, and utility connections. Selections and finishes also affect final pricing. We provide tailored estimates for your location.",
  },
  {
    q: "Do you work with realtors and investors?",
    a: "Yes. We partner with realtors on land-to-home packages and buyer referrals, and with investors on loan, equity, and hybrid structures across Central and Northern New Jersey.",
  },
] as const;

export const locationHubs = [
  {
    slug: "warren-nj",
    name: "Warren",
    county: "Somerset",
    blurb:
      "Our home base. Family-owned luxury custom homes, renovations, and land work rooted in deep local knowledge of Warren Township.",
  },
  {
    slug: "watchung-nj",
    name: "Watchung",
    county: "Somerset",
    blurb:
      "Distinctive custom residences and property transformations in one of Central New Jersey’s most desirable hilltop communities.",
  },
  {
    slug: "basking-ridge-nj",
    name: "Basking Ridge",
    county: "Somerset",
    blurb:
      "Luxury custom builds, knockdowns, and renovations tailored to Basking Ridge’s character and lifestyle.",
  },
  {
    slug: "millburn-short-hills-nj",
    name: "Millburn–Short Hills",
    county: "Essex",
    blurb:
      "High-end custom homes and renovations in Millburn and Short Hills, built to the exacting standards these communities expect.",
  },
] as const;
