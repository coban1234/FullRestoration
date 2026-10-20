import type {
  Credential,
  FinishedJob,
  KitchenStage,
  LogEntry,
  NavLink,
  NextStep,
  PriceRow,
  PromiseItem,
  Region,
  SectionIndexItem,
  ServiceGroup,
} from "../types/site";

export const company = {
  name: "Stonecroft",
  legalName: "Stonecroft Renovation Ltd.",
  email: "hello@stonecroft.ca",
  registration: "BC1428817",
  worksafe: "4471902",
  hours: "Mon–Fri 07:30–17:00",
};

export const phone = { display: "604-555-0142", href: "tel:+16045550142", e164: "+16045550142" };

export const office = {
  line1: "Unit 4, 3871 North Fraser Way",
  line2: "Burnaby BC",
  city: "Burnaby",
  region: "BC",
  postal: "V5J 5G6",
};

export const promiseHeading = "Four things, every job.";

export const promises: PromiseItem[] = [
  { key: "Contract", text: "A fixed scope and a fixed price, signed before we start." },
  { key: "Weekly log", text: "A published weekly log — spend, schedule, and anything that went wrong." },
  { key: "Permits", text: "Every permit pulled, every number on this site checkable." },
  { key: "Your contact", text: "One person who answers the phone, named before you sign." },
];

export const renovationLinks: NavLink[] = [
  { label: "Kitchens", href: "/renovations/kitchens/" },
  { label: "Bathrooms", href: "/renovations/bathrooms/" },
  { label: "Whole home", href: "/renovations/whole-home/" },
  { label: "Basements & suites", href: "/renovations/basements-and-suites/" },
];

export const exteriorLinks: NavLink[] = [
  { label: "Siding & cladding", href: "/exterior/siding-and-cladding/" },
  { label: "Windows & doors", href: "/exterior/windows-and-doors/" },
  { label: "Decks & outdoor", href: "/exterior/decks-and-outdoor/" },
];

export const navLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing/" },
  { label: "Projects", href: "/projects/" },
  { label: "Build log", href: "/build-log/" },
  { label: "Verify", href: "/verify/" },
];

export const companyLinks: NavLink[] = [
  { label: "About", href: "/about/" },
  { label: "Process", href: "/process/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Build log", href: "/build-log/" },
  { label: "Verify", href: "/verify/" },
  { label: "Journal", href: "/journal/" },
  { label: "Contact", href: "/contact/" },
];

export const sectionIndex: SectionIndexItem[] = [
  { id: "s01", num: "01", label: "Promise", short: "Promise" },
  { id: "s02", num: "02", label: "This week", short: "Log" },
  { id: "s03", num: "03", label: "What we build", short: "Build" },
  { id: "s04", num: "04", label: "Costs", short: "Costs" },
  { id: "s05", num: "05", label: "Finished jobs", short: "Jobs" },
  { id: "s06", num: "06", label: "Check us", short: "Check" },
  { id: "s07", num: "07", label: "Where we work", short: "Area" },
  { id: "s08", num: "08", label: "Book a visit", short: "Book" },
];

export const weekOf = "2026-10-12";

export const heroNumbers = {
  jobs: 3,
  onSchedule: 2,
  behind: 1,
  behindDays: 4,
  spent: 154300,
  signed: 200500,
};

export const kitchenStages: KitchenStage[] = [
  {
    week: "00",
    name: "Before",
    short: "Before",
    note: "The 1968 kitchen. Original cabinets, laminate, lino, one circuit for everything.",
    spend: "Signed $71,000",
    stage: 0,
    alt: "Illustration of the original 1968 kitchen: dark oak cabinets, avocado fridge, patterned wallpaper and checkered linoleum.",
  },
  {
    week: "01",
    name: "Demolition",
    short: "Demo",
    note: "Stripped to studs and subfloor. Cabinets out, services capped, sheeting up.",
    spend: "Spent $6,800 of $71,000",
    stage: 1,
    alt: "Illustration of the same kitchen at demolition: cabinets removed, plywood subfloor exposed, plastic sheeting over the doorway.",
  },
  {
    week: "03",
    name: "Services rough-in",
    short: "Rough-in",
    note: "Open studs, new wiring and boxes, PEX supply, ABS drain. Knob-and-tube found in the ceiling.",
    spend: "Spent $19,400 of $71,000",
    stage: 2,
    alt: "Illustration of the kitchen at rough-in: open stud walls, new electrical cable, red and blue PEX, permit card taped in the window.",
  },
  {
    week: "06",
    name: "Close-in",
    short: "Close-in",
    note: "Drywall hung, taped and first-coated. Window trimmed. Floor protected for finishes.",
    spend: "Spent $41,900 of $71,000",
    stage: 3,
    alt: "Illustration of the kitchen at close-in: drywall hung and taped, left half primed, floor protected, ladder in place.",
  },
  {
    week: "13",
    name: "Complete",
    short: "Complete",
    note: "Handover. Two weeks over plan and $3,400 over — both logged the week they happened.",
    spend: "Final $74,400 of $71,000",
    stage: 4,
    alt: "Illustration of the completed kitchen from the same camera position: sage cabinets, quartz counter, tile backsplash, oak floor.",
  },
];

export const buildStages = ["Demolition", "Rough-in", "Close-in", "Finishes"];

export const serviceGroups: ServiceGroup[] = [
  {
    label: "Interior",
    services: [
      { name: "Kitchens", path: "/renovations/kitchens/", note: "$28,000–$120,000+. Six to nine weeks without a kitchen." },
      { name: "Bathrooms", path: "/renovations/bathrooms/", note: "Waterproofing photographed before a single tile goes on." },
      { name: "Whole home", path: "/renovations/whole-home/", note: "1950s–1980s gut renovations, priced per square foot." },
      { name: "Basements & suites", path: "/renovations/basements-and-suites/", note: "Legal secondary suites, municipality by municipality." },
    ],
  },
  {
    label: "Exterior",
    services: [
      { name: "Siding & cladding", path: "/exterior/siding-and-cladding/", note: "Fibre cement, wood, metal — over a proper rainscreen." },
      { name: "Windows & doors", path: "/exterior/windows-and-doors/", note: "$1,000–$1,500 a window, full-frame or insert." },
    ],
  },
  {
    label: "Structure",
    services: [
      { name: "Additions & structural", path: "/additions/", note: "Second storeys, rear additions, beams. 15% contingency." },
      { name: "General contracting", path: "/general-contracting/", note: "Strata and small commercial, reported to council weekly." },
    ],
  },
];

export const pricing: PriceRow[] = [
  { project: "Kitchen", low: 28000, high: 120000, unit: "project", scaleMax: 140000 },
  { project: "Bathroom", low: 20000, high: 40000, unit: "project", scaleMax: 140000 },
  { project: "Whole home", low: 150, high: 400, unit: "sqft", scaleMax: 460 },
  { project: "Basement", low: 50, high: 150, unit: "sqft", scaleMax: 460 },
];

export const pricingReviewed = "2026-10-14";

export const finishedJobs: FinishedJob[] = [
  {
    id: "burnaby",
    slug: "1968-burnaby-split-level-kitchen",
    place: "Burnaby",
    built: "1968",
    title: "Kitchen and bath in a split-level",
    stage: 4,
    alt: "Illustration of the finished Burnaby kitchen with sage cabinets and a tile backsplash.",
    caption: "Burnaby · 1968 split-level · handover wk 13",
    signed: 71000,
    final: 74400,
    weeksPlanned: 11,
    weeksActual: 13,
    note: "Both the overage and the two extra weeks were written up as change orders the week they happened. The full trail is in the published log.",
  },
  {
    id: "langley-townhouse",
    slug: "1991-langley-townhouse-bathrooms",
    place: "Langley",
    built: "1991",
    title: "Two bathrooms in a townhouse",
    alt: "Finished townhouse ensuite, curbless shower.",
    caption: "Langley · 1991 townhouse · handover wk 07",
    signed: 46000,
    final: 45200,
    weeksPlanned: 7,
    weeksActual: 7,
    note: "No surprises behind the walls, so the contingency came back to the owner as a credit on the final invoice.",
  },
];

export const credentials: Credential[] = [
  {
    label: "BC business registration",
    value: "BC1428817",
    detail: "Stonecroft Renovation Ltd. Search the number on the BC Registry.",
    verified: "2026-10-14",
  },
  {
    label: "WorkSafeBC account",
    value: "4471902",
    detail: "Clearance letter in good standing — every crew and sub is covered on your job.",
    verified: "2026-10-09",
  },
  {
    label: "Commercial general liability",
    value: "$5,000,000",
    detail: "Policy CGL-0048817. Certificate naming you as additional insured, on request.",
    verified: "2026-09-30",
  },
  {
    label: "Written warranty",
    value: "2 yr / 5 yr",
    detail: "2-year workmanship, 5-year building envelope. In the contract, not a brochure.",
    verified: "2026-10-14",
  },
];

export const regions: Region[] = [
  {
    label: "Metro Vancouver",
    places: ["Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "Richmond", "New Westminster", "Coquitlam", "Surrey", "Langley"],
  },
  { label: "Fraser Valley", places: ["Abbotsford", "Chilliwack"] },
];

export const municipalities = regions.flatMap((r) => r.places);

export const projectTypes = ["Kitchen", "Bathroom", "Whole home", "Basement or suite", "Exterior", "Addition"];

export const nextSteps: NextStep[] = [
  { title: "We call you back", text: "Within one business day, from the person who would run your job." },
  { title: "Site visit", text: "60–90 minutes at your house, usually within two to three weeks. We measure, photograph and open nothing." },
  { title: "Fixed scope and price", text: "A fixed-price proposal in 5–10 business days. Yours to keep, sign or shop around." },
];

/** Placeholder crew — replace with real names, roles and certification numbers before launch. */
export const team = [
  { name: "Daniel Okafor", role: "Owner, site lead on every kitchen", years: 19, cert: "Red Seal Carpenter · BC-RS-047712" },
  { name: "Marta Lindqvist", role: "Project manager, schedules and change orders", years: 12, cert: "Gold Seal Project Manager · CHBA BC" },
  { name: "Sean Whitford", role: "Lead carpenter", years: 15, cert: "Red Seal Carpenter · BC-RS-051880" },
  { name: "Priya Sandhu", role: "Site lead, bathrooms and suites", years: 9, cert: "Red Seal Carpenter · BC-RS-066203" },
  { name: "Tomás Reyes", role: "Carpenter, finishing", years: 7, cert: "Level 3 Apprentice" },
];

export const licences = [
  { municipality: "Vancouver", number: "26-118204", verified: "2026-01-12" },
  { municipality: "Burnaby", number: "BL-2026-03317", verified: "2026-01-08" },
  { municipality: "Surrey", number: "SUR-BL-889214", verified: "2026-01-15" },
  { municipality: "Inter-municipal licence (Fraser Valley)", number: "IMBL-26-4471", verified: "2026-01-10" },
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type { LogEntry };
