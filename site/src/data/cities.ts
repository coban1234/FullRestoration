export interface City {
  slug: string;
  name: string;
  intro: string;
  stock: { era: string; hides: string }[];
  permit: { process: string; fees: string; timeline: string; verified: string; url: string };
  projectSlug: string;
  specifics: { title: string; text: string }[];
  travel: string;
}

/** §7.17: build four strong city pages at launch, not eleven thin ones. */
export const launchCities = ["vancouver", "burnaby", "surrey", "langley"];

export const cities: City[] = [
  {
    slug: "vancouver",
    name: "Vancouver",
    intro:
      "Most of our Vancouver work is east of Main: 1910s–1940s character houses, Vancouver Specials from the 1960s and 70s, and strata units in buildings old enough to need their plumbing risers replaced. Vancouver is also the one municipality in our area that builds to its own code — the Vancouver Building By-law — rather than the BC Building Code.",
    stock: [
      { era: "1910–1940 character houses", hides: "Knob-and-tube, balloon framing with no fire blocking, lath and plaster over shiplap, rubble or brick foundations." },
      { era: "1965–1985 Vancouver Specials", hides: "Aluminium branch wiring in some runs, galvanised supply, asbestos in textured ceilings and drywall mud, single-pane aluminium windows." },
      { era: "1970s–1990s low-rise strata", hides: "Original copper or poly-B risers, undersized exhaust, shared stacks that fix where a bathroom can go." },
    ],
    permit: {
      process: "Renovation permits through the City's online portal; trade permits (electrical, plumbing, gas) are separate. Interior alterations with no structural change can qualify for the faster renovation stream.",
      fees: "$2,600–$5,200 for a typical kitchen or bathroom scope, including trade permits.",
      timeline: "4–10 weeks for a typical renovation permit; longer where heritage or structural review applies.",
      verified: "2026-09-30",
      url: "https://vancouver.ca/home-property-development/renovations.aspx",
    },
    projectSlug: "1974-north-vancouver-bathroom",
    specifics: [
      { title: "Vancouver Building By-law", text: "The City has its own building code. We build to whichever governs, and in Vancouver that is the By-law, not the BCBC." },
      { title: "Heritage register and character retention", text: "Houses on the Heritage Register or in character-retention areas have exterior change limits. We check the address before the site visit." },
      { title: "Tree protection", text: "Protected trees need a permit to remove or prune and can fix where a deck or addition can go." },
    ],
    travel: "No travel charge anywhere in Vancouver.",
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    intro:
      "Our office is in Burnaby, and the bulk of our kitchen work is in its 1950s–1970s split-levels and ranchers. Burnaby's permit queue is currently the slowest in our service area, which is why every Burnaby schedule we publish starts with permits rather than demolition.",
    stock: [
      { era: "1955–1975 split-levels and ranchers", hides: "Knob-and-tube spliced into newer circuits, galvanised supply, asbestos in lino levelling compound, 60–100 amp panels." },
      { era: "1980s two-storeys", hides: "Poly-B supply lines, builder-grade framing over large spans, bathroom fans venting into attics." },
    ],
    permit: {
      process: "Building permit through Burnaby's permit portal; plumbing and electrical permits issued separately. Structural changes need engineer's letters of assurance.",
      fees: "$2,400–$4,100 for a typical kitchen scope.",
      timeline: "6–12 weeks for most residential alteration permits at the time of verification.",
      verified: "2026-09-30",
      url: "https://www.burnaby.ca/services-and-payments/permits-and-applications",
    },
    projectSlug: "1968-burnaby-split-level-kitchen",
    specifics: [
      { title: "Secondary suites", text: "Burnaby permits secondary suites in most single-family zones, with its own ceiling-height and parking rules." },
      { title: "Creek and ravine setbacks", text: "Lots near Burnaby's creeks and ravines carry streamside setbacks that limit additions and decks." },
    ],
    travel: "No travel charge. Burnaby is where our crews start the day.",
  },
  {
    slug: "surrey",
    name: "Surrey",
    intro:
      "Surrey work for us is mostly basements: 1970s–1990s houses with full-height basements that make good legal suites. Surrey's suite rules are clear and its inspectors are consistent, which makes it one of the easier municipalities to get a suite passed first time.",
    stock: [
      { era: "1970–1985 ranchers with full basements", hides: "Shared furnace ducting between floors, low beams under ceiling height, small basement windows that fail egress." },
      { era: "1985–2000 two-storeys", hides: "Poly-B plumbing, OSB subfloors that swell under old bathrooms." },
    ],
    permit: {
      process: "Building permit for suites and structural work; Surrey publishes a secondary-suite checklist we build to line by line.",
      fees: "$2,100–$3,800 for a typical scope.",
      timeline: "4–8 weeks for most suite and alteration permits.",
      verified: "2026-09-30",
      url: "https://www.surrey.ca/renovating-building-development/building-renovating",
    },
    projectSlug: "1979-surrey-rancher-legal-suite",
    specifics: [
      { title: "Suite parking", text: "Surrey requires an additional off-street parking space for a secondary suite. We check the driveway at the site visit." },
      { title: "Floodplain overlay", text: "Parts of Surrey near the Serpentine and Nicomekl rivers sit in floodplain areas with minimum floor elevations." },
    ],
    travel: "No travel charge west of 192 Street; $150 per visit east of it.",
  },
  {
    slug: "langley",
    name: "Langley",
    intro:
      "We work in both the City and the Township of Langley — two separate municipalities with two separate permit offices. Most of our Langley jobs are bathrooms in 1990s townhouses and suites in 1980s–2000s houses.",
    stock: [
      { era: "1985–2000 townhouses", hides: "Bathroom fans vented into attics, fibreglass shower stalls over damp subfloor, strata rules on work hours." },
      { era: "1980s–2000s detached houses", hides: "Poly-B supply, unfinished basements with ceiling heights just under suite minimums." },
    ],
    permit: {
      process: "City of Langley and Township of Langley each issue their own permits. We confirm which one applies from the legal address.",
      fees: "$1,900–$3,400 for a typical scope.",
      timeline: "3–7 weeks for most residential alteration permits.",
      verified: "2026-09-30",
      url: "https://www.tol.ca/en/services/building-permits.aspx",
    },
    projectSlug: "1991-langley-townhouse-bathrooms",
    specifics: [
      { title: "Two municipalities", text: "City of Langley and Township of Langley have different suite and setback rules. The address decides which apply." },
      { title: "Agricultural Land Reserve", text: "Township lots inside the ALR have limits on additional dwellings, including some suites." },
    ],
    travel: "$150 per visit, shown on the proposal as its own line.",
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug)!;
