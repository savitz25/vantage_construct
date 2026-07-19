export type SpaceTile = {
  title: string;
  body: string;
  gradient: string;
};

export type TrustPillar = {
  title: string;
  body: string;
};

export type PriceBand = {
  scope: string;
  includes: string;
  range: string;
};

export type TransformServiceContent = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  toolCard?: {
    badge: string;
    title: string;
    body: string;
    cta: string;
    href: string;
  };
  spaceHeading: string;
  spaces: SpaceTile[];
  trustHeading: string;
  trustIntro: string;
  trustPillars: TrustPillar[];
  pricingHeading: string;
  pricingIntro: string;
  priceBands: PriceBand[];
  pricingNote: string;
  caseHeading: string;
  caseStory: {
    problem: string;
    solution: string;
    result: string;
  };
  faqs: { q: string; a: string }[];
  closeHeading: string;
  closeBody: string;
};

export const basementsPage: TransformServiceContent = {
  path: "/transformations/basements",
  seoTitle: "Finished Basements NJ | Lower Level Living | Vantage",
  seoDescription:
    "Luxury finished basements in Central & Northern NJ — private cinemas, wellness suites, speakeasies, and guest quarters. Moisture-first construction, transparent ranges, and a 60-second Basement Builder.",
  eyebrow: "Finished basements · Lower level living",
  headline: "Unlock your home’s hidden estate",
  subhead:
    "Stop thinking of it as a basement. Start thinking of it as your private cinema, wellness retreat, or speakeasy. Vantage transforms subterranean footprints into the most desired square footage in your home — across Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding Somerset, Morris, Union, and Essex towns since 1990.",
  primaryCta: { label: "Design your lower level", href: "/finished-basement-cost-nj#tool" },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool",
    title: "Design your lower level in 60 seconds",
    body: "Pick the spaces you want — theater, gym, bar, guest suite, office — and watch your layout and estimate take shape in real time. No sign-up needed to see your range.",
    cta: "Open the Basement Builder",
    href: "/finished-basement-cost-nj#tool",
  },
  spaceHeading: "What’s going in yours?",
  spaces: [
    {
      title: "Home theaters & media rooms",
      body: "Tiered seating energy, acoustic detailing, and lighting scenes made for movie nights — not a TV on a folding table.",
      gradient: "from-[#2a1f3d] via-[#3d2a55] to-[#1a141f]",
    },
    {
      title: "Gyms & wellness",
      body: "Performance flooring, mirrored walls, ventilation done right — room for the Peloton and the free weights.",
      gradient: "from-[#1a2e24] via-[#2a4a38] to-[#142018]",
    },
    {
      title: "Bars & entertaining",
      body: "Wet bars, wine storage, game zones — the floor where every gathering ends up.",
      gradient: "from-[#2e2418] via-[#4a3a22] to-[#1a1510]",
    },
    {
      title: "Guest & in-law suites",
      body: "Bedroom, full bath, and real privacy — with code-compliant egress designed in from day one.",
      gradient: "from-[#1f2a32] via-[#2f4450] to-[#141c22]",
    },
    {
      title: "Home offices",
      body: "Quiet, separate, and finally out of the kitchen — built for focus and video calls.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
    },
    {
      title: "Playrooms & flex space",
      body: "Durable finishes and smart storage that grow with your kids — and your life.",
      gradient: "from-[#33241c] via-[#4c3830] to-[#1f1612]",
    },
  ],
  trustHeading: "Built dry. Built legal. Built to last.",
  trustIntro:
    "Every basement horror story starts the same way: water, or a corner cut on code. Here’s how we make sure yours is never that story.",
  trustPillars: [
    {
      title: "Moisture comes first",
      body: "Before a single stud goes up, we evaluate drainage, grading, and any history of dampness. Below-grade assemblies get vapor management, appropriate insulation, and materials selected for performance — because a beautiful space that smells like a basement isn’t finished, it’s covered up.",
    },
    {
      title: "Egress and code, handled",
      body: "Sleeping areas below grade require code-compliant egress. We design it in from day one — windows or walkouts where required — and manage municipal permits and inspections. No surprises at resale when the appraiser asks if the work is permitted.",
    },
    {
      title: "Comfort engineering",
      body: "Lower levels need their own thinking on heating, cooling, and air quality. We plan HVAC extensions, dehumidification, and lighting so the space feels like the main floor — not an afterthought under the stairs.",
    },
    {
      title: "Ceiling height honesty",
      body: "Most NJ basements finish beautifully at existing height. If yours is tight, we’ll tell you plainly what’s achievable — and when a dig-out conversation is (and isn’t) worth the investment.",
    },
  ],
  pricingHeading: "What a finished lower level costs",
  pricingIntro:
    "Transparent planning ranges for North Jersey. Every space is different — these bands help you budget before we’ve seen your footprint. Estimates only; final pricing after site evaluation.",
  priceBands: [
    {
      scope: "Open living level",
      includes: "Rec room energy, flooring, lighting, drywall, paint",
      range: "Typically ~$60k–$95k+",
    },
    {
      scope: "Entertaining level",
      includes: "Open space + wet bar + half bath",
      range: "Typically ~$95k–$150k+",
    },
    {
      scope: "Full suite lower level",
      includes: "Guest bedroom, full bath, media area, bar",
      range: "Typically ~$150k–$250k+",
    },
  ],
  pricingNote:
    "Industry cost-vs-value studies show finished lower levels recouping a meaningful share of cost at resale; in low-inventory luxury towns, buyers increasingly expect them. Confirm current figures with your advisor. Monthly payment framing available in the Basement Builder.",
  caseHeading: "From storage space to the favorite floor in the house",
  caseStory: {
    problem:
      "A North Jersey family with a large unfinished lower level and kids outgrowing the main living room — great structure, zero usable lifestyle space below.",
    solution:
      "Moisture evaluation first, then a zoned plan: media, flex play, and a proper guest bath with egress where needed. Finishes matched the main home so the lower level felt intentional, not “finished basement.”",
    result:
      "The floor the family actually uses after dinner. Built dry, permitted, and documented — ready for the next chapter of the home.",
  },
  faqs: [
    {
      q: "How much does it cost to finish a basement in New Jersey?",
      a: "Most planning ranges fall roughly from the mid–five figures into the mid–six figures depending on size, wet rooms, and suite scope. The fastest personalized range is our Basement Builder — pick your spaces and see a live estimate.",
    },
    {
      q: "How long does a lower-level remodel take?",
      a: "Often on the order of several weeks to a few months of construction once permits are in hand, depending on scope. We manage permitting and provide a written timeline before work begins.",
    },
    {
      q: "Do I need permits to finish my basement in NJ?",
      a: "Yes — framing, electrical, plumbing, and HVAC typically require municipal permits and inspections. Unpermitted work can create problems at resale and with insurance. We handle the process.",
    },
    {
      q: "Can you add a bathroom or bedroom below grade?",
      a: "Yes. Full baths are among our most-requested features. Sleeping areas require code-compliant egress, which we design in from the start.",
    },
    {
      q: "What if my basement has had water issues?",
      a: "Tell us everything — then let us evaluate it. We address causes (grading, drainage, systems) before finishing, and we build with moisture-appropriate detailing. We won’t finish over a problem.",
    },
    {
      q: "My ceilings are low. Can I still finish the space?",
      a: "Usually yes — lighting and design help standard-height rooms feel open. If height is genuinely tight, we’ll walk through options including whether a dig-out makes sense.",
    },
    {
      q: "Does a finished lower level add value?",
      a: "In our market, buyers increasingly expect finished lower levels in luxury homes, and industry studies show meaningful recoup at resale. It’s also some of the most efficient square footage you can add — the structure already exists.",
    },
    {
      q: "Do you only finish basements as part of larger projects?",
      a: "No — we take on dedicated lower-level projects across Somerset, Morris, Union, and Essex counties with the same crews and standards as our custom homes.",
    },
  ],
  closeHeading: "Let’s look at what’s under your house",
  closeBody:
    "Start with the Basement Builder to shape your vision and get a range, or go straight to a complimentary consultation — phone or Zoom, no obligation.",
};

export const additionsPage: TransformServiceContent = {
  path: "/transformations/additions",
  seoTitle: "Home Additions NJ | Primary Suites & Expansions | Vantage",
  seoDescription:
    "Luxury home additions in Central & Northern New Jersey — primary suites, kitchens, great rooms. Seamless architecture, transparent process, Move or Improve calculator.",
  eyebrow: "Home additions · Right-size living",
  headline: "Grow the home you already love",
  subhead:
    "Primary suites, great rooms, kitchens, and multi-room expansions that match your architecture — without giving up your neighborhood, schools, or rate. Serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding counties since 1990.",
  primaryCta: {
    label: "Run Move or Improve?",
    href: "/move-or-improve-calculator-nj#tool",
  },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool",
    title: "Should you move — or add on?",
    body: "Compare true North Jersey selling costs against the addition that solves the same problem. Instant insight, no sign-up required.",
    cta: "Open Move or Improve calculator",
    href: "/move-or-improve-calculator-nj#tool",
  },
  spaceHeading: "What are you adding?",
  spaces: [
    {
      title: "Primary suite wings",
      body: "A true retreat — spa bath, walk-in, and privacy that the original floor plan never allowed.",
      gradient: "from-[#2a241c] via-[#3d3428] to-[#1a1612]",
    },
    {
      title: "Kitchen & gathering expansions",
      body: "Open the heart of the home with light, island space, and flow to outdoor living.",
      gradient: "from-[#2c2218] via-[#4a3828] to-[#1c1610]",
    },
    {
      title: "Great rooms & family wings",
      body: "Ceiling volume, daylight, and rooms that actually fit how your family lives.",
      gradient: "from-[#1f2430] via-[#2e3848] to-[#141820]",
    },
    {
      title: "Second-story additions",
      body: "Add bedrooms and baths above without surrendering the lot you love.",
      gradient: "from-[#243028] via-[#354838] to-[#161c18]",
    },
    {
      title: "In-law & multi-gen suites",
      body: "Independent living with dignity — connected when you want it, private when you need it.",
      gradient: "from-[#2a2030] via-[#3d3048] to-[#1a141f]",
    },
    {
      title: "Mudrooms & lifestyle connectors",
      body: "The hardworking rooms that make luxury livable — entry, storage, laundry, flow.",
      gradient: "from-[#302820] via-[#483c30] to-[#1c1814]",
    },
  ],
  trustHeading: "Seamless outside. Solid underneath.",
  trustIntro:
    "The best additions disappear into the architecture — and never surprise you on structure, permits, or living through the work.",
  trustPillars: [
    {
      title: "Architectural integration",
      body: "Roof lines, materials, and proportions designed to look original — or intentionally modern — depending on your vision.",
    },
    {
      title: "Structure & systems first",
      body: "Load paths, foundations, and mechanical capacity planned before finishes. No pretty boxes on weak bones.",
    },
    {
      title: "Living-in-place planning",
      body: "Clear phasing, dust control, and communication so your home stays livable while we expand it.",
    },
    {
      title: "Permits without drama",
      body: "We coordinate municipal approvals and inspections so you’re not the project manager.",
    },
  ],
  pricingHeading: "What additions typically cost",
  pricingIntro:
    "Planning bands for North Jersey luxury work. Size, structure, and finishes drive range — use Move or Improve for a personalized comparison.",
  priceBands: [
    {
      scope: "Focused room addition",
      includes: "Single-room expansion, integrated finishes",
      range: "Often mid–six figures depending on size",
    },
    {
      scope: "Primary suite wing",
      includes: "Bedroom, spa bath, closet, systems",
      range: "Commonly ~$180k–$350k+",
    },
    {
      scope: "Major multi-room expansion",
      includes: "Kitchen/great room or multi-level work",
      range: "Frequently $300k–$600k+",
    },
  ],
  pricingNote:
    "Estimates only. Final pricing after site evaluation and Design & Discovery. Industry recoup percentages vary by project type — we discuss value honestly, without hype.",
  caseHeading: "Right-sized without relocating",
  caseStory: {
    problem:
      "A family loved their town and rate — but the house had no true primary suite and the kitchen couldn’t host holidays.",
    solution:
      "A tailored addition package: suite wing + kitchen expansion, matched exteriors, and a clear living-in-place plan.",
    result:
      "Same address, transformed daily life — without the transfer taxes and friction of moving up.",
  },
  faqs: [
    {
      q: "How much does a home addition cost in NJ?",
      a: "It depends on size, structure, and finishes. Planning ranges often start in the mid–six figures for meaningful luxury expansions. Our Move or Improve tool helps frame cost versus relocating.",
    },
    {
      q: "Can you match my existing exterior?",
      a: "Yes — seamless matching or intentional contrast. We plan materials and roof geometry carefully so the addition looks intentional.",
    },
    {
      q: "Do I need to move out during construction?",
      a: "Often not for partial expansions. We’ll tell you honestly when phasing allows living in place — and when temporary arrangements are wiser.",
    },
    {
      q: "How long does an addition take?",
      a: "Design, permits, and build vary by municipality and scope. You’ll get a written timeline before construction begins.",
    },
  ],
  closeHeading: "Expand with intention",
  closeBody:
    "Run Move or Improve for the financial logic, then schedule a complimentary consultation to walk your home and lot.",
};

export const atticsPage: TransformServiceContent = {
  path: "/transformations/attics",
  seoTitle: "Attic Conversions NJ | Private Upper-Level Suites | Vantage",
  seoDescription:
    "Luxury attic conversions in Central & Northern New Jersey — offices, suites, and private retreats with structure, egress, and comfort engineered properly.",
  eyebrow: "Attic conversions · Upper-level sanctuaries",
  headline: "A private world under the roof",
  subhead:
    "Offices, studios, and suite-level retreats carved from volume you already own — finished with the same craftsmanship as the floors below. Serving North and Central Jersey since 1990.",
  primaryCta: { label: "Schedule a feasibility review", href: "/start" },
  secondaryCta: { label: "See transformation process", href: "/transformations/process" },
  spaceHeading: "What could your attic become?",
  spaces: [
    {
      title: "Primary or guest suites",
      body: "Quiet sleeping spaces with light, storage, and privacy away from the main floor.",
      gradient: "from-[#2a2430] via-[#3d3448] to-[#1a161f]",
    },
    {
      title: "Studios & creative lofts",
      body: "Daylit rooms for art, music, or making — designed for comfort, not just square footage.",
      gradient: "from-[#24302c] via-[#384840] to-[#161c1a]",
    },
    {
      title: "Home offices",
      body: "Acoustic separation and a real door between work and life.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
    },
    {
      title: "Teen / multi-gen retreats",
      body: "Independent living energy upstairs with safe access and code-smart design.",
      gradient: "from-[#30241c] via-[#483828] to-[#1c1612]",
    },
    {
      title: "Reading lofts & flex rooms",
      body: "Soft, bright, quietly luxurious — the room nobody wants to leave.",
      gradient: "from-[#2c2818] via-[#403c28] to-[#1a1810]",
    },
    {
      title: "Storage done beautifully",
      body: "Kneewall systems and built-ins that reclaim chaos without looking utilitarian.",
      gradient: "from-[#282420] via-[#3c3830] to-[#161412]",
    },
  ],
  trustHeading: "Structure, stairs, and air — done right",
  trustIntro:
    "Attics fail when they’re treated like leftover space. We treat them like real living rooms that happen to sit under the rafters.",
  trustPillars: [
    {
      title: "Structural honesty",
      body: "Load capacity, collar ties, and floor systems evaluated before we promise a suite.",
    },
    {
      title: "Stairs & access",
      body: "Comfortable, code-smart access that feels like architecture — not a pull-down ladder afterthought.",
    },
    {
      title: "Light & egress",
      body: "Dormers, windows, and egress strategy planned for safety, brightness, and resale.",
    },
    {
      title: "Comfort envelope",
      body: "Insulation, ventilation, and HVAC so summer heat and winter chill don’t define the room.",
    },
  ],
  pricingHeading: "What attic conversions typically cost",
  pricingIntro:
    "Ranges depend on dormers, baths, stairs, and structural work. These bands are for planning only.",
  priceBands: [
    {
      scope: "Finished loft / office",
      includes: "Access upgrades, insulation, finishes",
      range: "Often starting mid–five to low–six figures",
    },
    {
      scope: "Suite with bath",
      includes: "Sleeping room + full bath + egress",
      range: "Commonly low– to mid–six figures",
    },
    {
      scope: "Dormer / major reconfiguration",
      includes: "Roof geometry changes + full living program",
      range: "Project-specific — site evaluation required",
    },
  ],
  pricingNote:
    "Estimates only. Final pricing after structural review and Design & Discovery.",
  caseHeading: "Volume reclaimed",
  caseStory: {
    problem: "A dark attic used only for boxes — but ceiling volume that begged for a suite.",
    solution:
      "Structural reinforcement, proper stairs, dormer light, and a spa-level bath planned for egress and comfort.",
    result: "A private upper retreat that feels intentional — not “finished attic.”",
  },
  faqs: [
    {
      q: "Can every attic become living space?",
      a: "Not always. Structure, height, access, and egress determine feasibility. We’ll assess honestly before design investment.",
    },
    {
      q: "Do attic bedrooms need egress?",
      a: "Sleeping rooms must meet code. We design compliant solutions from the start.",
    },
    {
      q: "Will it be too hot in summer?",
      a: "Not if the envelope and mechanicals are planned correctly. Comfort engineering is part of the scope — not an upgrade afterthought.",
    },
  ],
  closeHeading: "Claim the top of the house",
  closeBody:
    "Schedule a complimentary consultation. We’ll evaluate structure, access, and what’s possible under your roof.",
};

export const outdoorPage: TransformServiceContent = {
  path: "/transformations/outdoor-living",
  seoTitle: "Outdoor Living NJ | Decks, Porches, Kitchens & Sunrooms | Vantage",
  seoDescription:
    "Luxury outdoor living in Central & Northern New Jersey — decks, porches, sunrooms, outdoor kitchens, and fireplaces built to the same standard as the home.",
  eyebrow: "Outdoor living · Resort at home",
  headline: "Extend the season. Elevate every evening.",
  subhead:
    "Decks, porches, sunrooms, outdoor kitchens, and fireplaces designed as true living rooms without walls — for Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding communities.",
  primaryCta: { label: "Schedule a consultation", href: "/start" },
  secondaryCta: { label: "View process", href: "/transformations/process" },
  spaceHeading: "Curate your outdoor estate",
  spaces: [
    {
      title: "Outdoor kitchens",
      body: "Cooking, serving, and gathering — planned for flow, utilities, and weather.",
      gradient: "from-[#2e2418] via-[#4a3820] to-[#1a1410]",
    },
    {
      title: "Covered porches & sunrooms",
      body: "Four-season comfort with architecture that belongs on the house.",
      gradient: "from-[#243028] via-[#384838] to-[#141c18]",
    },
    {
      title: "Decks & multi-level terraces",
      body: "Structure you can trust, detailing that feels custom — not big-box.",
      gradient: "from-[#30281c] via-[#483c28] to-[#1c1810]",
    },
    {
      title: "Fireplaces & fire features",
      body: "The magnet that turns a patio into a room after dark.",
      gradient: "from-[#331c18] via-[#4c2c24] to-[#1f100e]",
    },
    {
      title: "Poolside living rooms",
      body: "Shade, seating, and outdoor entertainment zones for resort-level hosting.",
      gradient: "from-[#1c2833] via-[#2c3c4c] to-[#101820]",
    },
    {
      title: "Lighting & evening architecture",
      body: "Layered light that makes the exterior as intentional as the interior.",
      gradient: "from-[#1a1c2e] via-[#2a2e48] to-[#10121c]",
    },
  ],
  trustHeading: "Outdoor rooms that last in New Jersey weather",
  trustIntro:
    "Luxury outdoor living fails when it’s treated as furniture on a platform. We build for structure, drainage, and year-round enjoyment.",
  trustPillars: [
    {
      title: "Structure & attachments",
      body: "Ledgers, footings, and connections engineered for safety and longevity.",
    },
    {
      title: "Weather & materials",
      body: "Finishes and assemblies chosen for freeze-thaw, sun, and moisture — not catalog convenience.",
    },
    {
      title: "Utilities & cooking",
      body: "Gas, electric, water, and ventilation planned for real outdoor kitchens.",
    },
    {
      title: "Architecture first",
      body: "Porches and sunrooms that look original to the home — not bolted on.",
    },
  ],
  pricingHeading: "What outdoor living typically costs",
  pricingIntro:
    "Scope ranges from refined decking packages to full outdoor kitchen environments. Estimates only.",
  priceBands: [
    {
      scope: "Premium deck / terrace",
      includes: "Structure, railing, finish surfaces",
      range: "Often mid–five to low–six figures",
    },
    {
      scope: "Covered porch / sunroom",
      includes: "Roofed outdoor room, finishes, electrical",
      range: "Commonly low– to mid–six figures",
    },
    {
      scope: "Outdoor kitchen + entertaining",
      includes: "Cooking suite, structure, lighting, fireplace",
      range: "Project-specific — frequently mid–six figures+",
    },
  ],
  pricingNote:
    "Final pricing after site evaluation. Landscape, pool equipment, and hardscape partners coordinated as needed.",
  caseHeading: "Evenings that never leave home",
  caseStory: {
    problem: "A beautiful yard with no true outdoor room — unusable after dark or in shoulder seasons.",
    solution:
      "Covered porch + fireplace + outdoor kitchen planned as one architectural composition with the house.",
    result: "The new favorite “room” — without moving.",
  },
  faqs: [
    {
      q: "Do you build outdoor kitchens?",
      a: "Yes — full entertaining packages with utilities, structure, and finishes coordinated as one project.",
    },
    {
      q: "Can you match my home’s architecture?",
      a: "That’s the goal. Materials, roof forms, and proportions are designed to feel intentional.",
    },
    {
      q: "What about permits?",
      a: "Many outdoor structures and utility runs require municipal review. We manage the process.",
    },
  ],
  closeHeading: "Bring the resort home",
  closeBody:
    "Schedule a complimentary consultation. We’ll walk the property and map the outdoor living experience that fits how you entertain.",
};
