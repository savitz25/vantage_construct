/** Accessory Buildings lifestyle hub content */

export const accessoryDisclaimer =
  "Conceptual planning ranges only — not a formal bid, appraisal, or zoning determination. Final cost and feasibility depend on site, municipal rules, utilities, structure, and finish. Past projects do not guarantee future results.";

export const lifestyleUseCases = [
  {
    id: "entertainer",
    title: "The Entertainer",
    subtitle: "Pool houses & cabanas",
    body: "Changing rooms, wet bars, outdoor kitchens, and glass that opens to the water — the building that completes the outdoor estate.",
    image: "/media/garages/pool-pavilion.jpg",
    imageAlt: "Luxury pool house and entertainment pavilion",
    purposeId: "pool-pavilion" as const,
    studioHint: "pool-pavilion",
  },
  {
    id: "collector",
    title: "The Collector",
    subtitle: "Detached garages & carriage houses",
    body: "Climate-aware volume, full-view doors, and detailing space for the cars that matter — architecture, not a kit shed.",
    image: "/media/garages/collectors-garage.jpg",
    imageAlt: "Collector’s luxury garage pavilion",
    purposeId: "collectors-garage" as const,
    studioHint: "collectors-garage",
  },
  {
    id: "sanctuary",
    title: "The Sanctuary",
    subtitle: "Guest houses & private suites",
    body: "Freestanding hospitality for family, multi-gen living, or quiet guests — warmer residential character when zoning allows.",
    image: "/media/garages/guest-adu.webp",
    imageAlt: "Guest suite accessory dwelling",
    purposeId: "guest-adu" as const,
    studioHint: "guest-adu",
  },
  {
    id: "maker",
    title: "The Maker",
    subtitle: "Workshops & studios",
    body: "Serious power, durable floors, and light for craft, art, or fabrication — purpose-built without looking industrial-ugly.",
    image: "/media/garages/workshop-garage.webp",
    imageAlt: "Custom workshop and garage",
    purposeId: "workshop-garage" as const,
    studioHint: "workshop-garage",
  },
  {
    id: "retreat",
    title: "The Retreat",
    subtitle: "Fitness, wellness & quiet work",
    body: "A private gym, yoga pavilion, or deep-focus studio steps from the main house — insulated, intentional, and architecturally continuous.",
    image: "/media/garages/creative-studio.webp",
    imageAlt: "Creative studio and wellness outbuilding",
    purposeId: "creative-studio" as const,
    studioHint: "creative-studio",
  },
] as const;

/** Configurator purpose chips (maps to Garage Studio purposes for consistent ranges) */
export const accessoryConfigPurposes = [
  {
    id: "pool-pavilion",
    label: "Pool house",
    blurb: "Entertaining + wet rooms",
  },
  {
    id: "collectors-garage",
    label: "Collector’s garage",
    blurb: "Oversized, climate-aware",
  },
  {
    id: "guest-adu",
    label: "Guest suite",
    blurb: "Private living / multi-gen",
  },
  {
    id: "carriage-house",
    label: "Carriage house",
    blurb: "Living above parking",
  },
  {
    id: "workshop-garage",
    label: "Workshop",
    blurb: "Craft + vehicle bay",
  },
  {
    id: "creative-studio",
    label: "Studio / office",
    blurb: "Light-filled work space",
  },
  {
    id: "luxury-garage",
    label: "Luxury garage",
    blurb: "Refined multi-bay",
  },
  {
    id: "mixed-use",
    label: "Mixed-use",
    blurb: "Park, work & live",
  },
] as const;

export const accessorySizeOptions = [
  {
    id: "compact",
    label: "Compact",
    blurb: "~400–700 sf · focused program",
    bayId: "two-car" as const,
  },
  {
    id: "standard",
    label: "Standard",
    blurb: "~700–1,100 sf · most popular",
    bayId: "three-car" as const,
  },
  {
    id: "expansive",
    label: "Expansive",
    blurb: "~1,100–1,800+ sf · estate scale",
    bayId: "four-oversized" as const,
  },
] as const;

export const accessoryFinishOptions = [
  {
    id: "premium" as const,
    label: "Premium",
    blurb: "Quality shell, refined but practical",
  },
  {
    id: "luxury" as const,
    label: "Luxury",
    blurb: "Matches a high-end main residence",
  },
  {
    id: "estate" as const,
    label: "Estate",
    blurb: "Top-tier materials and systems",
  },
] as const;

export const costDrivers = [
  {
    title: "Size & structure",
    body: "Footprint, height, roof complexity, and foundation type set the base of every number.",
  },
  {
    title: "Plumbing & wet rooms",
    body: "Full baths, kitchens, and bars transform a “garage” into a finished building.",
  },
  {
    title: "HVAC & insulation",
    body: "Climate control for cars, people, or both — especially in North Jersey winters.",
  },
  {
    title: "Finish level",
    body: "Flooring, millwork, lighting, and exterior materials that match the main house.",
  },
  {
    title: "Site work",
    body: "Driveways, grading, utilities, retaining, and tree work often surprise first-timers.",
  },
  {
    title: "Living programs",
    body: "Suites, lofts, and ADU-style layouts add structure, egress, and code complexity.",
  },
] as const;

export const directionalCostBands = [
  {
    label: "Finished pool house / pavilion",
    range: "$180k – $450k+",
    note: "Wet rooms, glass, outdoor connection",
  },
  {
    label: "Luxury multi-bay garage",
    range: "$120k – $350k+",
    note: "Doors, exterior match, lighting",
  },
  {
    label: "Collector / oversized garage",
    range: "$200k – $500k+",
    note: "Height, climate, detailing space",
  },
  {
    label: "Carriage house / guest suite",
    range: "$250k – $650k+",
    note: "Living space, full systems, finishes",
  },
] as const;

export const zoningPoints = [
  {
    title: "Setbacks",
    body: "Accessory structures still need side, rear, and sometimes front yards — tighter than many owners expect.",
  },
  {
    title: "Lot coverage & impervious",
    body: "Building + drive + patio can hit coverage or stormwater limits before you hit square footage dreams.",
  },
  {
    title: "Utilities",
    body: "Power is common; water, sewer/septic, and HVAC runs add cost and municipal review.",
  },
  {
    title: "Height & massing",
    body: "Two-story carriage houses and tall collector bays trigger different rules than a single-story garage.",
  },
  {
    title: "ADU vs accessory structure",
    body: "Full kitchens, permanent living, or separate dwelling programs may reclassify the building as an ADU with extra rules.",
  },
  {
    title: "Honest early answers",
    body: "We surface constraints before design fantasy becomes wasted drawings — and link to land evaluation when the lot itself is the question.",
  },
] as const;

export const accessoryProcess = [
  {
    step: "01",
    title: "Vision & site",
    body: "What you want the space to do, and what the property can legally and practically support.",
  },
  {
    step: "02",
    title: "Concept & range",
    body: "Program, massing, and a planning investment band — refined in Garage Studio or on paper.",
  },
  {
    step: "03",
    title: "Approvals",
    body: "Permits, zoning interpretation, and coordination with the main residence’s architecture.",
  },
  {
    step: "04",
    title: "Build with craft",
    body: "Same No Surprises process as our custom homes — trade partners, finishes, and final walkthrough.",
  },
] as const;

export const accessoryCases = [
  {
    title: "Pool pavilion that finished the estate",
    outcome: "Entertaining year-round",
    body: "A glass-forward pavilion with full bath and outdoor kitchen adjacency turned a beautiful pool into a complete outdoor lifestyle — designed to match the main house, not compete with it.",
  },
  {
    title: "Collector garage with quiet curb presence",
    outcome: "Serious collection, refined streetscape",
    body: "Oversized bays and climate control hidden behind a refined façade and roof form continuous with the residence. Function first; estate character preserved.",
  },
] as const;

export const accessoryFaqs = [
  {
    q: "How much does an accessory building cost in New Jersey?",
    a: "Finished luxury outbuildings typically land from the low six figures into the mid–high six figures depending on size, plumbing, HVAC, and finish. The configurator and Garage Studio on this site give conceptual ranges — not formal bids. Site work and utilities can move totals significantly.",
  },
  {
    q: "Is a pool house cheaper than adding onto the house?",
    a: "Not always. A finished pool house still needs foundation, structure, systems, and finishes. Sometimes an addition is more efficient; sometimes a freestanding pavilion better protects the main house and outdoor program. We compare honestly.",
  },
  {
    q: "What’s the difference between an accessory building and an ADU?",
    a: "An accessory building may be garage, workshop, pool house, or studio without full dwelling status. An ADU is typically a separate living unit with kitchen/bath and residential use rules. Crossing into ADU territory changes zoning, parking, and sometimes fees — we clarify early.",
  },
  {
    q: "Do I need a variance for a carriage house or guest suite?",
    a: "Sometimes. Height, setbacks, coverage, and living-space rules vary by municipality. We review feasibility before you commit to a design path.",
  },
  {
    q: "How long does an accessory building take?",
    a: "Simple garages can be faster; finished pool houses, carriage houses, and suite programs often take many months including design, approvals, and construction. Timeline depends on complexity and township.",
  },
  {
    q: "Can the building match my home’s architecture?",
    a: "That’s the standard. Roof forms, materials, and proportions should read as one estate — not a kit structure parked beside a luxury home.",
  },
  {
    q: "What is a Site Feasibility / Concept Review?",
    a: "A focused conversation (and high-level site read) on what you want to build, whether the lot and zoning likely support it, major cost drivers, and recommended next steps — including Garage Studio refinement or Design & Discovery.",
  },
] as const;
