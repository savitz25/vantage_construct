export type SpaceTile = {
  title: string;
  body: string;
  gradient: string;
  /** Optional luxury photo for use-case gallery */
  image?: string;
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
  primaryCta: { label: "Open the Basement Builder", href: "/finished-basement-cost-nj#tool" },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Highest intent",
    title: "Design your lower level in 60 seconds",
    body: "Pick the spaces you want — theater, gym, bar, guest suite, office — and watch your layout and estimate take shape in real time. No sign-up needed to see your range. Then learn how we build them dry, legal, and to main-floor standards.",
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
    "Open the Basement Builder to shape your vision and get a planning range, or schedule a complimentary consultation — phone, Zoom, or on site, no obligation.",
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
    label: "Open the Move or Improve calculator",
    href: "/move-or-improve-calculator-nj#tool",
  },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool",
    title: "Should you move — or add on?",
    body: "Compare true North Jersey selling costs against the addition that solves the same problem. Instant insight, no sign-up required — then learn how we build seamless expansions.",
    cta: "Open the Move or Improve calculator",
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
  seoTitle: "Attic Conversions NJ | Upper Level Sanctuaries | Vantage",
  seoDescription:
    "Luxury attic conversions in Central & Northern New Jersey — sky-level suites, offices, and lofts. Structure, egress, and comfort engineered properly. Design yours in the Attic Studio.",
  eyebrow: "Attic conversions · Upper-level sanctuaries",
  headline: "A private world under the roof",
  subhead:
    "Sky-level retreats, guest suites, and creative lofts carved from volume you already own — finished with the same craftsmanship as the floors below. Serving North and Central Jersey since 1990.",
  primaryCta: { label: "Open the Attic Studio", href: "/attic-conversion-cost-nj#tool" },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Attic Studio",
    title: "Design your upper level in minutes",
    body: "Choose a vision — primary suite, guest quarters, office, teen retreat — then shape dormers, baths, skylights, and finishes with a live North Jersey planning estimate.",
    cta: "Open the Attic Studio",
    href: "/attic-conversion-cost-nj#tool",
  },
  spaceHeading: "What could your attic become?",
  spaces: [
    {
      title: "Primary suite",
      body: "Sky-level sanctuary — bedroom, spa bath, and quiet separation with egress designed in.",
      gradient: "from-[#2a2430] via-[#3d3448] to-[#1a161f]",
      image: "/media/attics/primary-suite.jpg",
    },
    {
      title: "Guest suite",
      body: "Hospitality with privacy and dignity for visiting family — full bath optional.",
      gradient: "from-[#1f2a32] via-[#2f4450] to-[#141c22]",
      image: "/media/attics/guest-suite.jpg",
    },
    {
      title: "Home office / creative studio",
      body: "Acoustic separation, daylight, and a real door between work and life.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
      image: "/media/attics/home-office.jpg",
    },
    {
      title: "Teen retreat",
      body: "Independent hangout energy upstairs with safe access and code-smart design.",
      gradient: "from-[#30241c] via-[#483828] to-[#1c1612]",
      image: "/media/attics/teen-retreat.jpg",
    },
    {
      title: "Playroom / flex space",
      body: "Durable finishes and smart storage that grow with your kids — then flex later.",
      gradient: "from-[#24302c] via-[#384840] to-[#161c1a]",
      image: "/media/attics/playroom-flex.jpg",
    },
    {
      title: "Reading loft / bonus room",
      body: "Window seats, soft light, and a ceiling that feels intentional — not leftover volume.",
      gradient: "from-[#2c2818] via-[#403c28] to-[#1a1810]",
      image: "/media/attics/reading-loft.jpg",
    },
  ],
  trustHeading: "Structure, Stairs, Light & Comfort — Done Right",
  trustIntro:
    "Attics fail when they’re treated like leftover space. We treat them like real living rooms that happen to sit under the rafters — and we’re honest when the structure can’t support the dream.",
  trustPillars: [
    {
      title: "Structural evaluation honesty",
      body: "Load capacity, collar ties, and floor systems evaluated before we promise a suite. If a dig-up of expectations is needed, you’ll hear it early — not after cabinetry is ordered.",
    },
    {
      title: "Stairs and access",
      body: "Comfortable, code-smart access that feels like architecture — not a pull-down ladder afterthought. Circulation is designed with the main house, not bolted on.",
    },
    {
      title: "Natural light and egress",
      body: "Dormers, windows, skylights, and egress strategy planned for safety, brightness, and resale. Sleeping rooms meet code from day one.",
    },
    {
      title: "Insulation, HVAC & year-round comfort",
      body: "Envelope and mechanicals so summer heat and winter chill don’t define the room. Comfort engineering is scope — not an upgrade afterthought.",
    },
  ],
  pricingHeading: "What attic conversions typically cost",
  pricingIntro:
    "Transparent planning bands for North Jersey. Dormers, baths, stairs, and finish level drive range — use the Attic Studio for a personalized conceptual estimate.",
  priceBands: [
    {
      scope: "Finished loft / office",
      includes: "Access upgrades, insulation, finishes",
      range: "Typically ~$55k–$110k+",
    },
    {
      scope: "Suite with bath",
      includes: "Sleeping room + full bath + egress",
      range: "Commonly ~$95k–$180k+",
    },
    {
      scope: "Dormer / major reconfiguration",
      includes: "Roof geometry + full living program",
      range: "Often $150k–$280k+ · site evaluation required",
    },
  ],
  pricingNote:
    "Conceptual estimates only. Final pricing after structural evaluation, Design & Discovery, and current material & labor costs. Open the Attic Studio for a live planning range.",
  caseHeading: "From storage volume to the favorite floor upstairs",
  caseStory: {
    problem:
      "A North Jersey family with a large unfinished attic — great roof volume, no usable lifestyle space, and kids outgrowing the main floor.",
    solution:
      "Structural reinforcement and proper stairs first, then paired dormers for light and headroom, a spa-level bath with egress designed in, and finishes matched to the main home so the upper level felt intentional.",
    result:
      "A private sky-level retreat the family actually uses — permitted, comfortable year-round, and documented for resale. Not “finished attic.” A real floor of the house.",
  },
  faqs: [
    {
      q: "How much does an attic conversion cost in New Jersey?",
      a: "Planning ranges often start in the mid–five figures for finished lofts and climb into the six figures for suites with baths or dormers. The Attic Studio gives a live conceptual range — then we refine after structural review.",
    },
    {
      q: "Can every attic become living space?",
      a: "Not always. Structure, height, access, and egress determine feasibility. We’ll assess honestly before design investment.",
    },
    {
      q: "Can you finish an attic into a bedroom in NJ?",
      a: "Often yes when height, structure, and egress work. Sleeping rooms require code-compliant egress — typically a proper window or equivalent — which we design from the start.",
    },
    {
      q: "Do attic bedrooms need egress?",
      a: "Yes. Sleeping rooms must meet code. We design compliant solutions from day one so resale and insurance don’t become surprises.",
    },
    {
      q: "Will it be too hot in summer?",
      a: "Not if insulation, ventilation, and HVAC are planned correctly. Comfort engineering is part of the scope — not an afterthought.",
    },
    {
      q: "Do I need permits for an attic remodel?",
      a: "Yes — framing, electrical, plumbing, stairs, and egress typically require municipal permits. We manage the process.",
    },
    {
      q: "Can you add a bathroom in the attic?",
      a: "Often yes when plumbing routes and structure allow. We evaluate early so wet rooms don’t become late surprises.",
    },
  ],
  closeHeading: "Claim the top of the house",
  closeBody:
    "Open the Attic Studio to shape your vision and planning range, or schedule a complimentary consultation — structure, stairs, and light honesty included.",
};

export const kitchensPage: TransformServiceContent = {
  path: "/transformations/kitchens",
  seoTitle: "Kitchen Remodeling NJ | Luxury Kitchen Renovations | Vantage",
  seoDescription:
    "Luxury kitchen remodeling in Central & Northern New Jersey — islands, light, storage, and entertaining flow with transparent process and lasting craftsmanship.",
  eyebrow: "Kitchen remodeling · The heart of the home",
  headline: "Where every gathering begins",
  subhead:
    "Luxury kitchen renovations that balance beauty, storage, and flow — so holidays, weeknights, and wine nights finally work. Serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding Somerset, Morris, Union, and Essex towns since 1990.",
  primaryCta: { label: "Open the Kitchen Studio", href: "/kitchen-remodel-cost-nj#tool" },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Kitchen Studio",
    title: "Design your kitchen in minutes",
    body: "Explore 12 high-end styles and swap counters, backsplash, island, and hardware live — with a North Jersey planning estimate. Then we build it with real millwork, appliances, and craftsmanship.",
    cta: "Open the Kitchen Studio",
    href: "/kitchen-remodel-cost-nj#tool",
  },
  spaceHeading: "What kind of kitchen are you building?",
  spaces: [
    {
      title: "Entertainer’s open kitchens",
      body: "Islands that host, sightlines to the great room, and lighting scenes for cooking and company.",
      gradient: "from-[#2e2418] via-[#4a3820] to-[#1a1410]",
    },
    {
      title: "Chef-ready work triangles",
      body: "Serious appliances, prep zones, and ventilation — without sacrificing the room’s elegance.",
      gradient: "from-[#1f2a32] via-[#2f4450] to-[#141c22]",
    },
    {
      title: "Classic & transitional elegance",
      body: "Timeless cabinetry, panel-ready appliances, and details that still feel right in fifteen years.",
      gradient: "from-[#2a241c] via-[#3d3428] to-[#1a1612]",
    },
    {
      title: "Sculleries & back kitchens",
      body: "The luxury of a show kitchen up front — and a hardworking prep kitchen behind the scenes.",
      gradient: "from-[#243028] via-[#354838] to-[#161c18]",
    },
    {
      title: "Breakfast & morning rooms",
      body: "Daylight, banquettes, and coffee stations that make everyday life feel considered.",
      gradient: "from-[#2c2818] via-[#403c28] to-[#1a1810]",
    },
    {
      title: "Kitchen + addition packages",
      body: "When the footprint is the problem, we expand the room and rebuild the heart of the home as one project.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
    },
  ],
  trustHeading: "Beautiful now. Built to cook for decades.",
  trustIntro:
    "A luxury kitchen fails when it’s only finishes. We plan structure, plumbing, electrical, and ventilation so the room performs as well as it photographs.",
  trustPillars: [
    {
      title: "Layout before millwork",
      body: "Traffic, islands, appliance clearances, and storage strategy locked before cabinetry is ordered.",
    },
    {
      title: "Systems & ventilation",
      body: "Gas, electric, water, and range hood exhaust planned for real cooking — not just catalog looks.",
    },
    {
      title: "Living-in-place realism",
      body: "Clear sequencing and temporary kitchen planning so your household can function during the remodel.",
    },
    {
      title: "Craft & coordination",
      body: "Cabinetry, stone, tile, and lighting managed as one scope with the same standards as our custom homes.",
    },
  ],
  pricingHeading: "What kitchen remodels typically cost",
  pricingIntro:
    "North Jersey luxury kitchens vary widely with cabinetry, stone, appliances, and whether walls move. These bands are for early planning only.",
  priceBands: [
    {
      scope: "Refresh renovation",
      includes: "Surfaces, lighting, select cabinetry updates",
      range: "Often mid–five to low–six figures",
    },
    {
      scope: "Full luxury kitchen",
      includes: "Cabinetry, appliances, stone, layout refinements",
      range: "Commonly ~$120k–$250k+",
    },
    {
      scope: "Kitchen + structural expansion",
      includes: "Addition or wall removals + full finish package",
      range: "Frequently $250k–$450k+",
    },
  ],
  pricingNote:
    "Estimates only. Final pricing after site evaluation and Design & Discovery. Appliance packages and custom millwork drive upper ranges.",
  caseHeading: "From cramped to the room everyone stays in",
  caseStory: {
    problem:
      "A dated galley kitchen in a loved North Jersey home — no island, poor light, and zero hosting capacity for family dinners.",
    solution:
      "Opened a wall, re-planned the work triangle, introduced a substantial island, and upgraded lighting and storage without losing the home’s character.",
    result:
      "The kitchen became the true center of the house — functional for weeknights and effortless for holidays.",
  },
  faqs: [
    {
      q: "How much does a luxury kitchen remodel cost in NJ?",
      a: "Many full luxury kitchens land in the low- to mid–six figures depending on cabinetry, appliances, stone, and structural changes. We’ll give you a planning range after seeing your space.",
    },
    {
      q: "Can you open walls or expand the kitchen?",
      a: "Yes. We evaluate structure first, then plan openings or small additions so the kitchen gains light and flow the right way.",
    },
    {
      q: "Do I need to move out during a kitchen remodel?",
      a: "Often not. We discuss temporary cooking setups and sequencing so most families stay in place.",
    },
    {
      q: "How long does a kitchen renovation take?",
      a: "Design, selections, lead times, and construction vary. You’ll receive a written timeline before work begins.",
    },
    {
      q: "Do you handle permits for kitchen remodels?",
      a: "When electrical, plumbing, structural, or other permit-triggering work is involved, we manage municipal permits and inspections.",
    },
  ],
  closeHeading: "Design the kitchen you’ll live in every day",
  closeBody:
    "Open the Kitchen Studio to shape your vision and planning range, or schedule a complimentary consultation — phone, Zoom, or on site.",
};

export const garagesPage: TransformServiceContent = {
  path: "/transformations/garages",
  seoTitle: "Custom Garages NJ | Carriage Houses & Accessory Buildings | Vantage",
  seoDescription:
    "Luxury custom garages, carriage houses, workshops, and accessory buildings in Central & Northern New Jersey. Design yours in the Garage Studio.",
  eyebrow: "Garages & accessory buildings · Estate architecture",
  headline: "Buildings that earn their place on the property",
  subhead:
    "Private garages, collector pavilions, carriage houses, and creative outbuildings designed with the same intention as the main residence. Serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding communities since 1990.",
  primaryCta: {
    label: "Open the Garage Studio",
    href: "/accessory-building-cost-nj#tool",
  },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Garage Studio",
    title: "Design your garage or accessory building in minutes",
    body: "Choose luxury garage, carriage house, workshop, studio, ADU, or pavilion — then configure bays, doors, living space above, and finishes with a live North Jersey planning estimate.",
    cta: "Open the Garage Studio",
    href: "/accessory-building-cost-nj#tool",
  },
  spaceHeading: "What are you creating?",
  spaces: [
    {
      title: "Luxury garage",
      body: "Refined multi-bay storage with architectural detailing worthy of the main house.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
      image: "/media/garages/luxury-garage.jpg",
    },
    {
      title: "Collector’s garage",
      body: "Oversized bays, full-view doors, and detailing space for the cars that matter.",
      gradient: "from-[#2a2430] via-[#3d3448] to-[#1a161f]",
      image: "/media/garages/collectors-garage.jpg",
    },
    {
      title: "Workshop + garage",
      body: "Power, storage, and a proper work bay — still elegant from the curb.",
      gradient: "from-[#30281c] via-[#483c28] to-[#1c1810]",
      image: "/media/garages/workshop-garage.jpg",
    },
    {
      title: "Creative studio",
      body: "Daylight, quiet, and room to make — an intentional outbuilding for craft or music.",
      gradient: "from-[#2a2430] via-[#3d3448] to-[#1a161f]",
      image: "/media/garages/creative-studio.jpg",
    },
    {
      title: "Carriage house",
      body: "Garage below, living above — the estate classic when zoning allows.",
      gradient: "from-[#243028] via-[#384838] to-[#141c18]",
      image: "/media/garages/carriage-house.jpg",
    },
    {
      title: "Guest suite / ADU",
      body: "Independent living with estate manners — multi-gen, guests, or rental potential.",
      gradient: "from-[#1f2a32] via-[#2f4450] to-[#141c22]",
      image: "/media/garages/guest-adu.jpg",
    },
  ],
  trustHeading: "Foundation, structure & continuity — done right",
  trustIntro:
    "A garage or outbuilding should strengthen the property — not look like an afterthought. We plan foundation, structure, utilities, and exterior architecture as seriously as any living room.",
  trustPillars: [
    {
      title: "Site & zoning first",
      body: "Setbacks, coverage, and municipal rules checked before design investment so the building is buildable.",
    },
    {
      title: "Structure & foundation",
      body: "Foundations, framing, and weatherproofing sized for cars, shop equipment, climate control, or living space above.",
    },
    {
      title: "Utilities & systems",
      body: "Electrical capacity, lighting, plumbing, and optional HVAC planned for how you’ll actually use the building.",
    },
    {
      title: "Matching the main house",
      body: "Materials and massing that read as part of the estate language — not a kit shed next to a luxury home.",
    },
  ],
  pricingHeading: "What custom garages typically cost",
  pricingIntro:
    "Transparent planning bands for North Jersey. Size, living space above, doors, and finish level drive range — use the Garage Studio for a personalized conceptual estimate.",
  priceBands: [
    {
      scope: "Refined multi-bay garage",
      includes: "Structure, doors, electrical, exterior matching",
      range: "Typically ~$85k–$180k+",
    },
    {
      scope: "Workshop / studio building",
      includes: "Power, finishes, insulation, lighting package",
      range: "Commonly ~$120k–$250k+",
    },
    {
      scope: "Carriage house / living above",
      includes: "Upper level, stairs, bath, enhanced envelope",
      range: "Often $200k–$400k+ · site evaluation required",
    },
  ],
  pricingNote:
    "Conceptual estimates only. Final pricing after design consultation, site evaluation, zoning review, and structural design. Also see Custom Homes → Accessory Buildings for new-construction packages.",
  caseHeading: "From driveway overflow to estate architecture",
  caseStory: {
    problem:
      "A luxury home with cars and hobbies overflowing the original garage — and no structure that matched the architecture.",
    solution:
      "A purpose-built multi-bay garage with workshop zone, proper power, and exterior detailing continuous with the main house.",
    result:
      "Order restored, property value reinforced, and a building the owners are proud to show.",
  },
  faqs: [
    {
      q: "How much does a custom garage cost in NJ?",
      a: "Many luxury multi-bay garages land from the high five figures into the mid–six figures. Carriage houses and ADU programs climb higher. Open the Garage Studio for a live planning range.",
    },
    {
      q: "Can you match my home’s exterior on a new garage?",
      a: "Yes — roof forms, siding or masonry, trim, and proportions are designed for architectural continuity.",
    },
    {
      q: "Do accessory buildings need permits in NJ?",
      a: "Typically yes. Size, use, and utilities affect requirements. We manage municipal approvals.",
    },
    {
      q: "Can a garage include a loft or living suite above?",
      a: "Often, when structure, access, and zoning allow. We’ll assess feasibility early.",
    },
    {
      q: "Is this different from your custom-homes accessory buildings page?",
      a: "Same craftsmanship. This page focuses on existing-property garages and outbuildings; new-construction packages are also covered under Custom Homes → Accessory Buildings.",
    },
  ],
  closeHeading: "Give your collection — and your craft — a proper home",
  closeBody:
    "Open the Garage Studio to shape your vision and planning range, or schedule a complimentary consultation — site, zoning, and architecture honesty included.",
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
  primaryCta: {
    label: "Open the Outdoor Living Studio",
    href: "/outdoor-kitchen-cost-nj#tool",
  },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Outdoor Living Studio",
    title: "Design your outdoor kitchen & living space in minutes",
    body: "Choose resort backyard, outdoor kitchen, fire lounge, or pavilion — then configure cover, fire, seating, and finishes with a live North Jersey planning estimate.",
    cta: "Open the Outdoor Living Studio",
    href: "/outdoor-kitchen-cost-nj#tool",
  },
  spaceHeading: "Curate your outdoor estate",
  spaces: [
    {
      title: "Outdoor kitchens",
      body: "Cooking, serving, and gathering — planned for flow, utilities, and weather.",
      gradient: "from-[#2e2418] via-[#4a3820] to-[#1a1410]",
      image: "/media/outdoor/outdoor-kitchen.jpg",
    },
    {
      title: "Covered living & lounge",
      body: "Pavilions and pergolas that feel like true outdoor rooms.",
      gradient: "from-[#243028] via-[#384838] to-[#141c18]",
      image: "/media/outdoor/covered-lounge.jpg",
    },
    {
      title: "Fire & conversation",
      body: "The magnet that turns a patio into a room after dark.",
      gradient: "from-[#331c18] via-[#4c2c24] to-[#1f100e]",
      image: "/media/outdoor/fire-conversation.jpg",
    },
    {
      title: "Resort-style backyard",
      body: "Kitchen, cover, fire, and lounge as one outdoor estate.",
      gradient: "from-[#30281c] via-[#483c28] to-[#1c1810]",
      image: "/media/outdoor/full-resort.jpg",
    },
    {
      title: "Poolside living",
      body: "Shade, seating, and entertaining steps from the water.",
      gradient: "from-[#1c2833] via-[#2c3c4c] to-[#101820]",
      image: "/media/outdoor/poolside.jpg",
    },
    {
      title: "Entertainment pavilion",
      body: "Fully covered hosting with kitchen and bar energy.",
      gradient: "from-[#1a1c2e] via-[#2a2e48] to-[#10121c]",
      image: "/media/outdoor/entertainment-pavilion.jpg",
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
    "Transparent planning bands for North Jersey. Kitchen complexity, covered structure, and fire features drive range — use the Outdoor Living Studio for a personalized estimate.",
  priceBands: [
    {
      scope: "Patio + fire lounge",
      includes: "Hardscape, fire pit or linear fire, seating zone",
      range: "Typically ~$45k–$95k+",
    },
    {
      scope: "Covered living / pavilion",
      includes: "Structure, flooring, electrical, finishes",
      range: "Commonly ~$90k–$180k+",
    },
    {
      scope: "Outdoor kitchen + entertaining",
      includes: "Cooking suite, cover, lighting, fire optional",
      range: "Often $150k–$300k+ · site evaluation required",
    },
  ],
  pricingNote:
    "Conceptual estimates only. Final pricing after site evaluation. Landscape, pool equipment, and hardscape partners coordinated as needed. Open the Outdoor Living Studio for a live range.",
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
    {
      q: "How much does outdoor living cost in NJ?",
      a: "Premium decks often start mid–five figures; covered porches and outdoor kitchens commonly land in the low- to mid–six figures depending on utilities and finishes.",
    },
    {
      q: "Can you build a four-season sunroom?",
      a: "Yes — when structure, foundation, and envelope are designed for year-round comfort, not just a screened porch.",
    },
    {
      q: "Do outdoor projects require HOA approval?",
      a: "Sometimes. We help prepare packages and coordinate timing when covenants apply.",
    },
  ],
  closeHeading: "Bring the resort home",
  closeBody:
    "Open the Outdoor Living Studio to shape your vision and planning range, or schedule a complimentary consultation — site, utilities, and architecture honesty included.",
};

export const primarySuitePage: TransformServiceContent = {
  path: "/transformations/primary-suite",
  seoTitle: "Primary Suite Remodel NJ | Luxury Owner’s Suite | Vantage",
  seoDescription:
    "Luxury primary suite remodels and additions in Central & Northern New Jersey — spa baths, walk-in closets, private retreats. Design yours in the Primary Suite Studio.",
  eyebrow: "Primary suite · Private retreat",
  headline: "Your private sanctuary, every day",
  subhead:
    "Bedroom, spa bath, and dressing room designed as one calm, luxurious retreat — remodel or addition. Serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding towns since 1990.",
  primaryCta: {
    label: "Open the Primary Suite Studio",
    href: "/primary-suite-cost-nj#tool",
  },
  secondaryCta: { label: "Schedule a consultation", href: "/start" },
  toolCard: {
    badge: "Interactive tool · Primary Suite Studio",
    title: "Design your owner’s suite in minutes",
    body: "Choose spa, modern minimal, classic elegant, or resort-style — then configure bedroom, bath, and closet with a live North Jersey planning estimate.",
    cta: "Open the Primary Suite Studio",
    href: "/primary-suite-cost-nj#tool",
  },
  spaceHeading: "The three zones of a true suite",
  spaces: [
    {
      title: "Spa bathroom",
      body: "Freestanding tub, steam, curbless shower, double vanities — the emotional centerpiece.",
      gradient: "from-[#2a241c] via-[#3d3428] to-[#1a1612]",
      image: "/media/primary-suite/spa-retreat.jpg",
    },
    {
      title: "Bedroom sanctuary",
      body: "Feature walls, ceilings, fireplaces, and private outdoor access for rest.",
      gradient: "from-[#1c2433] via-[#2a384c] to-[#121820]",
      image: "/media/primary-suite/light-resort.jpg",
    },
    {
      title: "Walk-in / dressing",
      body: "Standard walk-ins to his-and-hers with fully custom millwork and islands.",
      gradient: "from-[#2e2418] via-[#4a3820] to-[#1a1410]",
      image: "/media/primary-suite/traditional-luxury.jpg",
    },
    {
      title: "Modern minimal",
      body: "Clean lines, large shower, floating vanities — luxury through restraint.",
      gradient: "from-[#1f2a32] via-[#2f4450] to-[#141c22]",
      image: "/media/primary-suite/modern-minimal.jpg",
    },
    {
      title: "Classic elegant",
      body: "Paneled walls, furniture vanity, timeless proportions.",
      gradient: "from-[#2a2430] via-[#3d3448] to-[#1a161f]",
      image: "/media/primary-suite/classic-elegant.jpg",
    },
    {
      title: "Dramatic & moody",
      body: "Deep tones, fireplace, evening glamour.",
      gradient: "from-[#1a1c2e] via-[#2a2e48] to-[#10121c]",
      image: "/media/primary-suite/dramatic-moody.jpg",
    },
  ],
  trustHeading: "Wet zones, millwork & privacy — done right",
  trustIntro:
    "Primary suites fail when bathrooms leak, closets feel like afterthoughts, or the addition doesn’t match the house. We plan water, structure, and craftsmanship as seriously as aesthetics.",
  trustPillars: [
    {
      title: "Bathroom waterproofing & systems",
      body: "Steam, curbless showers, freestanding tubs — detailed for performance, not just photos.",
    },
    {
      title: "Custom closet millwork",
      body: "From premium organizers to fully custom dressing rooms with islands and lighting.",
    },
    {
      title: "Addition vs remodel honesty",
      body: "When the suite needs more footprint, we plan structure and living-in-place clearly.",
    },
    {
      title: "Quiet luxury continuity",
      body: "Materials and proportions that feel original to the home — serene, not showy for its own sake.",
    },
  ],
  pricingHeading: "What primary suites typically cost",
  pricingIntro:
    "Transparent planning bands for North Jersey. Bathroom complexity, closet millwork, and outdoor access drive range — use the Primary Suite Studio for a personalized estimate.",
  priceBands: [
    {
      scope: "Bath-focused remodel",
      includes: "Spa bath, vanities, finishes",
      range: "Typically ~$85k–$160k+",
    },
    {
      scope: "Full suite remodel",
      includes: "Bedroom + bath + closet refresh",
      range: "Commonly ~$150k–$280k+",
    },
    {
      scope: "Suite addition / wing",
      includes: "New footprint, full suite program",
      range: "Often $250k–$450k+ · site evaluation required",
    },
  ],
  pricingNote:
    "Conceptual estimates only. Final pricing after site evaluation and Design & Discovery. Open the Primary Suite Studio for a live planning range.",
  caseHeading: "From tired master to private retreat",
  caseStory: {
    problem:
      "A dated primary bedroom and cramped bath that never felt like a retreat — the homeowners wanted spa-level mornings without moving.",
    solution:
      "Replanned wet zones for freestanding tub and large shower, added heated floors, and built a dressing room with custom millwork — finishes matched the rest of the home.",
    result:
      "A calm, private suite they use every day — the room they leave last in the morning and return to first at night.",
  },
  faqs: [
    {
      q: "How much does a primary suite remodel cost in NJ?",
      a: "Many luxury projects land from the high five figures into the mid–six figures. Bathroom complexity and custom closets drive upper ranges. Open the Primary Suite Studio for a live planning estimate.",
    },
    {
      q: "Can you add a primary suite as an addition?",
      a: "Yes. Suite wings are a common addition type. We evaluate structure, roof, and living-in-place before design investment.",
    },
    {
      q: "Do you build steam showers?",
      a: "Yes — steam packages, curbless showers, and radiant floors are common luxury requests.",
    },
    {
      q: "Can you do fully custom closets?",
      a: "Yes — from premium organizer systems to fully custom millwork with islands and dressing tables.",
    },
  ],
  closeHeading: "Design the suite you deserve",
  closeBody:
    "Open the Primary Suite Studio to shape your vision and planning range, or schedule a complimentary consultation — calm, private luxury starts with a clear plan.",
};
