import type { Status } from "../types/site";

export interface ChangeOrder {
  id: string;
  amount: number;
  reason: string;
  requestedBy: "client" | "contractor";
  days: number;
  week: number;
}

export interface WeekEntry {
  week: number;
  date: string;
  stage: string;
  status: Status;
  statusLabel: string;
  spent: number;
  title: string;
  body: string[];
  illustration?: number;
  changeOrder?: string;
  gap?: boolean;
  correction?: string;
}

export interface Project {
  slug: string;
  title: string;
  short: string;
  municipality: string;
  vintage: string;
  building: string;
  scope: "Kitchen" | "Bathroom" | "Whole home" | "Basement or suite" | "Exterior" | "Addition";
  live: boolean;
  signed: number;
  final?: number;
  weeksPlanned: number;
  weeksActual?: number;
  permit: string;
  stageNow: number;
  hero?: number;
  asked: string;
  found: { item: string; cost: string }[];
  changeOrders: ChangeOrder[];
  differently: string;
  clientWords?: string;
  spec: { item: string; spec: string; allowance: string }[];
  log: WeekEntry[];
}

export const STAGE_RAIL = ["Pre-start", "Demolition", "Rough-in", "Inspection", "Close-in", "Cabinets & counters", "Finishes & snag"];

const kitchenSpec = [
  { item: "Cabinets", spec: "Semi-custom, painted shaker, soft-close", allowance: "$18,500" },
  { item: "Countertops", spec: "3 cm quartz, eased edge", allowance: "$5,200" },
  { item: "Backsplash tile", spec: "Glazed ceramic, 3×12", allowance: "$14/sq ft" },
  { item: "Flooring", spec: "Engineered white oak, 7\"", allowance: "$11/sq ft" },
  { item: "Lighting", spec: "LED pots + 2 pendants on new circuit", allowance: "$1,900" },
  { item: "Plumbing fixtures", spec: "Undermount sink, pull-down faucet", allowance: "$1,400" },
];

export const projects: Project[] = [
  {
    slug: "1968-burnaby-split-level-kitchen",
    title: "1968 Burnaby split-level — kitchen and main bath",
    short: "Burnaby kitchen and main bath",
    municipality: "Burnaby",
    vintage: "1968",
    building: "Detached split-level",
    scope: "Kitchen",
    live: false,
    signed: 71000,
    final: 74400,
    weeksPlanned: 11,
    weeksActual: 13,
    permit: "BP-2026-04418",
    stageNow: 6,
    hero: 4,
    asked:
      "A family of four in a 1968 split-level wanted the closed galley kitchen opened to the dining room, a pantry wall, and the main bathroom rebuilt in the same window so they would only move out of the kitchen once. Budget was set at signing: $71,000 fixed, 11 weeks on site, with a temporary kitchen in the laundry room. They asked us to keep the original oak floor in the hall and to match it where the wall came out.",
    found: [
      { item: "Live knob-and-tube run above the kitchen ceiling, feeding two bedroom circuits", cost: "$2,100 (CO-01)" },
      { item: "Galvanised supply behind the sink, corroded at the elbow", cost: "Included — priced as a pre-1980 allowance" },
      { item: "Levelling compound under the lino tested positive for asbestos", cost: "Abatement $1,850, inside contingency" },
    ],
    changeOrders: [
      { id: "CO-01", amount: 2100, reason: "Remove live knob-and-tube in the kitchen ceiling bay and rewire both bedroom circuits.", requestedBy: "contractor", days: 4, week: 3 },
      { id: "CO-02", amount: 1300, reason: "Upgrade counters from laminate allowance to 3 cm quartz.", requestedBy: "client", days: 6, week: 8 },
    ],
    differently:
      "We priced the ceiling as closed. In a 1968 Burnaby house we should have opened one ceiling bay at the site visit and looked — a twenty-minute hole would have put the knob-and-tube in the contract instead of in a change order, and saved four days. We also ordered quartz after the template visit rather than before; on the next kitchen, counters are selected at pre-start so the six-day fabrication lead time is inside the schedule, not added to it.",
    clientWords: "“The week-three entry about the wiring was the one that made us trust them. They told us before we asked.”",
    spec: kitchenSpec,
    log: [],
  },
  {
    slug: "1991-langley-townhouse-bathrooms",
    title: "1991 Langley townhouse — two bathrooms",
    short: "Langley townhouse bathrooms",
    municipality: "Langley",
    vintage: "1991",
    building: "Strata townhouse",
    scope: "Bathroom",
    live: false,
    signed: 46000,
    final: 45200,
    weeksPlanned: 7,
    weeksActual: 7,
    permit: "BP-26-01173",
    stageNow: 6,
    asked:
      "Two original 1991 bathrooms in a strata townhouse: tub-shower in the main, a fibreglass stall in the ensuite. The owners wanted a curbless shower in the ensuite and to keep one toilet working throughout, inside strata hours (08:00–17:00 weekdays) and with the elevator-free stair as the only access.",
    found: [
      { item: "Subfloor sound, stack location as drawn", cost: "$0" },
      { item: "Ensuite fan vented into the attic, not outside", cost: "$420, inside contingency" },
    ],
    changeOrders: [{ id: "CO-01", amount: -800, reason: "Tile came in under allowance; credit returned to the owners.", requestedBy: "contractor", days: 0, week: 5 }],
    differently:
      "We booked the strata's stair protection for the first week only and had to re-book it for tile delivery. On strata jobs we now book common-area protection for every delivery day at pre-start, in one request, so the property manager is asked once.",
    spec: [
      { item: "Waterproofing", spec: "Bonded sheet membrane, flood-tested 24 h", allowance: "Included" },
      { item: "Wall tile", spec: "Porcelain, 12×24", allowance: "$12/sq ft" },
      { item: "Vanity", spec: "Wall-hung, 36\"", allowance: "$1,600" },
      { item: "Shower glass", spec: "10 mm fixed panel", allowance: "$1,900" },
    ],
    log: [],
  },
  {
    slug: "1979-surrey-rancher-legal-suite",
    title: "1979 Surrey rancher — legal basement suite",
    short: "Surrey legal suite",
    municipality: "Surrey",
    vintage: "1979",
    building: "Detached rancher with full basement",
    scope: "Basement or suite",
    live: false,
    signed: 88000,
    final: 87400,
    weeksPlanned: 10,
    weeksActual: 10,
    permit: "SUR-26-1087",
    stageNow: 6,
    asked:
      "Convert an unfinished 1979 basement into a legal one-bedroom secondary suite: fire separation, an enlarged egress window, separate ventilation and a dedicated entrance, built to pass Surrey's suite inspection first time.",
    found: [{ item: "Existing furnace duct shared between floors — separated as planned", cost: "Included" }],
    changeOrders: [{ id: "CO-01", amount: -600, reason: "Owner supplied the suite range and fridge.", requestedBy: "client", days: 0, week: 7 }],
    differently:
      "The egress window well needed a drainage tie-in we had drawn but not booked with the excavator. It cost a day. Window wells are now their own line on the pre-start schedule.",
    spec: [
      { item: "Fire separation", spec: "5/8\" Type X, resilient channel, sealed penetrations", allowance: "Included" },
      { item: "Egress window", spec: "Vinyl casement, 0.35 m² clear opening", allowance: "$2,400" },
      { item: "Flooring", spec: "Luxury vinyl plank", allowance: "$6/sq ft" },
    ],
    log: [],
  },
  {
    slug: "1972-coquitlam-rancher-kitchen",
    title: "1972 Coquitlam rancher — kitchen",
    short: "Coquitlam kitchen",
    municipality: "Coquitlam",
    vintage: "1972",
    building: "Detached rancher",
    scope: "Kitchen",
    live: true,
    signed: 71000,
    weeksPlanned: 11,
    permit: "BP-26-02291",
    stageNow: 2,
    asked: "An original 1972 kitchen, opened to the family room, with a new 200-amp panel.",
    found: [{ item: "Knob-and-tube in the ceiling bay over the kitchen, opened by the panel upgrade", cost: "$2,100 (CO-02)" }],
    changeOrders: [
      { id: "CO-01", amount: 1300, reason: "Add under-cabinet lighting circuit.", requestedBy: "client", days: 0, week: 2 },
      { id: "CO-02", amount: 2100, reason: "Remove knob-and-tube in the kitchen ceiling bay and rewire.", requestedBy: "contractor", days: 4, week: 6 },
    ],
    differently: "",
    spec: kitchenSpec,
    log: [],
  },
  {
    slug: "1974-north-vancouver-bathroom",
    title: "1974 North Vancouver — main bathroom",
    short: "North Vancouver bathroom",
    municipality: "North Vancouver",
    vintage: "1974",
    building: "Detached split-level",
    scope: "Bathroom",
    live: true,
    signed: 31500,
    weeksPlanned: 5,
    permit: "DNV-26-3310",
    stageNow: 1,
    asked: "The only bathroom in the house, rebuilt with the toilet kept live for all but five days.",
    found: [],
    changeOrders: [],
    differently: "",
    spec: [],
    log: [],
  },
  {
    slug: "1989-langley-basement-suite",
    title: "1989 Langley — legal basement suite",
    short: "Langley basement suite",
    municipality: "Langley",
    vintage: "1989",
    building: "Detached two-storey",
    scope: "Basement or suite",
    live: true,
    signed: 98000,
    weeksPlanned: 12,
    permit: "TOL-26-0417",
    stageNow: 4,
    asked: "A legal two-bedroom suite with its own laundry in a 1989 basement.",
    found: [],
    changeOrders: [{ id: "CO-01", amount: 1800, reason: "Second egress window in bedroom two.", requestedBy: "client", days: 2, week: 4 }],
    differently: "",
    spec: [],
    log: [],
  },
  {
    slug: "1957-vancouver-bungalow-kitchen",
    title: "1957 East Vancouver bungalow — kitchen",
    short: "East Vancouver kitchen",
    municipality: "Vancouver",
    vintage: "1957",
    building: "Detached bungalow",
    scope: "Kitchen",
    live: false,
    signed: 52000,
    final: 53100,
    weeksPlanned: 9,
    weeksActual: 9,
    permit: "BP-2026-00731",
    stageNow: 6,
    hero: 4,
    asked:
      "A retired couple in a 1957 bungalow wanted the original kitchen rebuilt on the same footprint, with a wider doorway to the dining room, better light and a 200-amp service so they could switch to induction. Layout kept, plumbing kept, everything else new.",
    found: [
      { item: "Lath and plaster ceiling over an undersized header at the dining-room doorway", cost: "Included — engineered header was in the scope" },
      { item: "Galvanised supply to the kitchen and bathroom", cost: "Inside the 12% pre-1980 contingency" },
    ],
    changeOrders: [{ id: "CO-01", amount: 1100, reason: "Add a pantry pull-out and two extra pot lights.", requestedBy: "client", days: 0, week: 5 }],
    differently:
      "We booked the panel upgrade with BC Hydro two weeks into the job and waited nine days for the disconnect. On every pre-1980 job the Hydro request now goes in at contract signing, because the utility's queue is the one schedule we cannot influence once we are on site.",
    clientWords: "“We read the log every Friday night with a glass of wine. It was better than television.”",
    spec: kitchenSpec,
    log: [],
  },
  {
    slug: "1986-richmond-townhouse-kitchen",
    title: "1986 Richmond townhouse — kitchen",
    short: "Richmond townhouse kitchen",
    municipality: "Richmond",
    vintage: "1986",
    building: "Strata townhouse",
    scope: "Kitchen",
    live: false,
    signed: 38500,
    final: 38500,
    weeksPlanned: 7,
    weeksActual: 8,
    permit: "RIC-26-1442",
    stageNow: 6,
    hero: 3,
    asked:
      "A builder-grade 1986 townhouse kitchen replaced on the same layout before the owners listed the unit: new cabinets, quartz, LVP flooring and lighting, inside strata hours and with strata approval for the electrical work.",
    found: [{ item: "Subfloor water damage under the dishwasher from a slow leak", cost: "$640, inside contingency" }],
    changeOrders: [],
    differently:
      "Counter fabrication slipped a week and we found out on the morning of install. We now confirm fabrication dates in writing 72 hours ahead, and the schedule shows the fabricator as a named line so the owner can see whose date it is.",
    spec: kitchenSpec,
    log: [],
  },
];

// ---- Logs ----------------------------------------------------------------

type Seed = [stage: string, status: Status, label: string, spent: number, title: string, body: string, illo?: number, co?: string];

function build(slug: string, start: string, seeds: Seed[], extras: Partial<Record<number, Partial<WeekEntry>>> = {}): WeekEntry[] {
  const t0 = new Date(start + "T12:00:00");
  return seeds.map((s, i) => {
    const d = new Date(t0.getTime() + i * 7 * 86400000);
    return {
      week: i + 1,
      date: d.toISOString().slice(0, 10),
      stage: s[0],
      status: s[1],
      statusLabel: s[2],
      spent: s[3],
      title: s[4],
      body: s[5].split("\n\n"),
      illustration: s[6],
      changeOrder: s[7],
      ...(extras[i + 1] || {}),
    };
  });
}

const BURNABY: Seed[] = [
  ["Demolition", "on-schedule", "On schedule", 6800, "Kitchen out, temporary kitchen in", "The temporary kitchen went into the laundry room on day one: utility sink, the family's own fridge, a microwave and a counter on two base cabinets we will reuse in the garage.\n\nDemolition took the galley down to studs and subfloor. Lino came up in one piece over levelling compound we have sent for asbestos testing — standard for this vintage.", 1],
  ["Demolition", "on-schedule", "On schedule", 11400, "Asbestos result back; abatement booked", "The levelling compound tested positive. Abatement ran Wednesday and Thursday with the kitchen sealed and under negative air. Cost is inside the pre-1980 contingency, not a change order.\n\nThe wall to the dining room is out. The beam the engineer specified goes in Monday.", 1],
  ["Services rough-in", "behind", "4 days behind", 19400, "Knob-and-tube found above the kitchen ceiling", "Opening the ceiling bay for the new pot lights exposed a live knob-and-tube run feeding both front bedrooms. It was not visible at the site visit and it was not in the price. We stopped, photographed it and called the owners the same afternoon.\n\nChange order 01 — $2,100 to remove the run and rewire the bay — was signed Thursday. Electrical inspection moves from Thursday to the following Tuesday. That is where the four days come from.", 2, "CO-01 · $2,100 · contractor-identified · +4 days"],
  ["Inspection", "behind", "4 days behind", 24900, "Rough-in inspection passed first visit", "Electrical, plumbing and the beam all passed on Tuesday. The new PEX supply runs back to the main; the galvanised elbow behind the sink is gone.\n\nWe are still four days behind the signed schedule. We have not tried to claw it back by rushing insulation.", 2],
  ["Close-in", "behind", "3 days behind", 33600, "Insulation and drywall", "Insulation inspected Monday, board hung Tuesday to Thursday. One day recovered because the drywall crew could start a day early.\n\nThe main bathroom demolition starts next week, so the family moves to the downstairs bathroom from Monday.", 3],
  ["Close-in", "behind", "3 days behind", 41900, "Taped, primed; bathroom stripped", "Kitchen is taped, sanded and primed. Bathroom is down to studs; the subfloor under the tub is sound.\n\nCabinet delivery is confirmed for week 07.", 3],
  ["Cabinets & counters", "behind", "3 days behind", 52100, "Cabinets set, counters templated", "Cabinets arrived complete and are set and levelled. Counters were templated Thursday.\n\nThe owners are deciding between the laminate allowance and quartz. We have priced both and given them until Monday.", 3],
  ["Cabinets & counters", "behind", "9 days behind", 57800, "Owners chose quartz — six more days", "The owners chose 3 cm quartz. Change order 02 is $1,300 and adds six days, because quartz fabrication is a separate lead time from laminate. Signed Tuesday.\n\nThis is a client-requested change, not an overrun. The difference matters, and the log says which is which.", 3, "CO-02 · $1,300 · client-requested · +6 days"],
  ["Finishes & snag", "behind", "9 days behind", 63300, "Bathroom tile; membrane flood-tested", "The bathroom membrane was flood-tested for 24 hours before any tile went on. Photographs of the membrane are in this entry because nobody will ever see it again.\n\nKitchen backsplash waits on counters.", 3],
  ["Finishes & snag", "behind", "9 days behind", 68200, "Quartz installed", "Counters installed Wednesday. Sink, faucet and backsplash went in by Friday.", 4],
  ["Finishes & snag", "behind", "9 days behind", 71900, "Floors, paint, fixtures", "Oak floor patched to match the hall where the wall came out. Paint and fixtures through the week.", 4],
  ["Finishes & snag", "behind", "2 weeks over plan", 73800, "Deficiency walk", "Fourteen items on the deficiency list, nine closed by Friday. Final electrical and plumbing passed.", 4],
  ["Finishes & snag", "complete", "Handed over", 74400, "Handover — 13 weeks, $74,400", "Handed over Friday. Final price $74,400 against $71,000 signed: CO-01 (knob-and-tube, $2,100, ours to find) and CO-02 (quartz, $1,300, client-requested). Thirteen weeks against eleven planned.\n\nThe two-year workmanship warranty starts today.", 4],
];

const COQUITLAM: Seed[] = [
  ["Demolition", "on-schedule", "On schedule", 8200, "Temporary kitchen, then demolition", "Temporary kitchen set up in the garage on day one. Kitchen stripped to studs.", 1],
  ["Demolition", "on-schedule", "On schedule", 14600, "Wall out, under-cabinet circuit added", "The owners added an under-cabinet lighting circuit (CO-01, $1,300, client-requested, no schedule impact).", 1, "CO-01 · $1,300 · client-requested · 0 days"],
  ["Services rough-in", "on-schedule", "On schedule", 22800, "Panel upgrade day", "The 100-amp panel came out and a 200-amp panel went in. Power was off for six hours as planned.", 2],
  ["Services rough-in", "on-schedule", "On schedule", 31500, "Plumbing rough-in", "New PEX supply and ABS drain for the moved sink.", 2],
  ["Services rough-in", "on-schedule", "On schedule", 39700, "Electrical rough-in started", "Boxes and home runs for the new layout. Inspection booked for next Thursday.", 2],
  ["Services rough-in", "behind", "4 days behind", 48200, "Knob-and-tube found above the kitchen ceiling", "The panel upgrade opened a live knob-and-tube run in the ceiling bay over the kitchen. It was not visible at the site visit and it was not in the price. We stopped, photographed it, and called the owners the same afternoon.\n\nChange order 02 — $2,100 to remove the run and rewire the bay — was signed on Tuesday. The electrical inspection moves from Thursday to the following Monday, which is where the four days come from.", 2, "CO-02 · $2,100 · contractor-identified · +4 days"],
];

const NORTHVAN: Seed[] = [
  ["Pre-start", "on-schedule", "On schedule", 3100, "Pre-start and protection", "Pre-start meeting on site. We confirmed which five days the toilet will be off: week 03 Tuesday to week 04 Monday.", 0],
  ["Demolition", "on-schedule", "On schedule", 6900, "Bathroom stripped", "Tile and tub out. Subfloor sound.", 1],
  ["Demolition", "on-schedule", "On schedule", 9800, "Galvanised supply replaced", "Galvanised supply replaced back to the main, as quoted. Toilet off from Tuesday as scheduled.", 1],
];

const LANGLEY_SUITE: Seed[] = [
  ["Pre-start", "on-schedule", "On schedule", 6200, "Pre-start", "Suite layout confirmed against the Township's checklist.", 0],
  ["Demolition", "on-schedule", "On schedule", 13800, "Basement cleared", "Old partition walls and drop ceiling out.", 1],
  ["Rough-in", "on-schedule", "On schedule", 24500, "Egress window cut", "Concrete cut for the bedroom one egress window.", 2],
  ["Rough-in", "behind", "2 days behind", 33900, "Second egress window added", "The owners added a second egress window in bedroom two (CO-01, $1,800, client-requested, +2 days).", 2, "CO-01 · $1,800 · client-requested · +2 days"],
  ["Rough-in", "behind", "2 days behind", 42700, "Separate ventilation run", "Dedicated HRV for the suite.", 2],
  ["Inspection", "behind", "2 days behind", 51200, "Rough-in inspection passed", "All trades passed.", 2],
  ["Close-in", "behind", "2 days behind", 59800, "Fire separation board", "5/8\" Type X on resilient channel.", 3],
  ["Close-in", "behind", "1 day behind", 68400, "Fire separation inspected", "Passed first visit.", 3],
  ["Close-in", "on-schedule", "Back on schedule", 76900, "Taped and primed", "Recovered the last day.", 3],
  ["Close-in", "on-schedule", "On schedule", 87100, "Suite kitchen roughed", "Cabinets on order.", 3],
  ["Close-in", "complete", "Close-in complete", 96300, "Close-in complete", "Fire separation inspection passed on the first visit. Egress windows trimmed.", 3],
];

const LANGLEY_TH: Seed[] = [
  ["Demolition", "on-schedule", "On schedule", 7400, "Ensuite out first", "Main bathroom stays live.", 1],
  ["Rough-in", "on-schedule", "On schedule", 14200, "Curbless drain", "Linear drain set; fan re-vented outside.", 2],
  ["Close-in", "on-schedule", "On schedule", 21900, "Membrane flood-tested", "24-hour flood test passed.", 3],
  ["Finishes & snag", "on-schedule", "On schedule", 29800, "Ensuite tiled; main bathroom starts", "Ensuite back in use Friday.", 3],
  ["Finishes & snag", "on-schedule", "On schedule", 36100, "Tile under allowance", "Credit of $800 returned (CO-01).", 3, "CO-01 · −$800 · credit · 0 days"],
  ["Finishes & snag", "on-schedule", "On schedule", 41900, "Main bathroom tiled", "Glass measured.", 4],
  ["Finishes & snag", "complete", "Handed over", 45200, "Handover — 7 weeks, $45,200", "Handed over on schedule, $800 under the signed price.", 4],
];

const SURREY: Seed[] = Array.from({ length: 10 }, (_, i) => {
  const stages = ["Pre-start", "Demolition", "Rough-in", "Rough-in", "Inspection", "Close-in", "Close-in", "Finishes & snag", "Finishes & snag", "Finishes & snag"];
  const spent = [5200, 14100, 23800, 33100, 41900, 52400, 61800, 72300, 81500, 87400][i];
  const last = i === 9;
  return [stages[i], last ? "complete" : "on-schedule", last ? "Handed over" : "On schedule", spent, last ? "Suite inspection passed — handed over" : `Week ${String(i + 1).padStart(2, "0")} — ${stages[i].toLowerCase()}`, last ? "Surrey's suite inspection passed first time. Final $87,400 against $88,000 signed." : "Work as scheduled. No change orders this week.", Math.min(4, Math.floor(i / 2.2))] as Seed;
});

const VANCOUVER_K: Seed[] = [
  ["Demolition", "on-schedule", "On schedule", 5900, "Temporary kitchen in the dining room", "Temporary kitchen set up in the dining room with a utility sink tied into the laundry line. Kitchen stripped to studs.", 1],
  ["Demolition", "on-schedule", "On schedule", 10200, "Header in, lath and plaster down", "The engineered header over the dining-room doorway went in on Tuesday. The ceiling came down to joists.", 1],
  ["Services rough-in", "on-schedule", "On schedule", 17800, "Galvanised supply out", "Galvanised supply replaced to the kitchen and bathroom, inside the pre-1980 contingency. Panel upgrade waiting on BC Hydro.", 2],
  ["Inspection", "on-schedule", "On schedule", 23400, "Rough-in passed; Hydro disconnect booked", "Rough-in inspection passed first visit. BC Hydro has booked the disconnect for next Thursday.", 2],
  ["Close-in", "on-schedule", "On schedule", 30100, "200-amp service live", "New service live after a six-hour outage. Insulation and board this week.", 3, "CO-01 · $1,100 · client-requested · 0 days"],
  ["Close-in", "on-schedule", "On schedule", 35700, "Drywall taped and primed", "Taped, sanded, primed. Cabinets confirmed for Monday.", 3],
  ["Cabinets & counters", "on-schedule", "On schedule", 42900, "Cabinets set, counters templated", "Cabinets in and levelled; quartz templated Thursday.", 3],
  ["Finishes & snag", "on-schedule", "On schedule", 49800, "Counters, backsplash, induction", "Counters installed, backsplash tiled, induction range on its new circuit.", 4],
  ["Finishes & snag", "complete", "Handed over", 53100, "Handover — 9 weeks, $53,100", "Handed over on schedule. Final $53,100 against $52,000 signed: CO-01 (pantry pull-out and pot lights, $1,100, client-requested).", 4],
];

const RICHMOND_K: Seed[] = [
  ["Demolition", "on-schedule", "On schedule", 4800, "Strata protection, demolition", "Common-area protection approved and installed. Kitchen out in two days.", 1],
  ["Services rough-in", "on-schedule", "On schedule", 9900, "Subfloor repaired", "Water damage under the dishwasher repaired ($640, inside contingency).", 2],
  ["Close-in", "on-schedule", "On schedule", 15600, "Patch and paint", "Walls patched, ceiling skimmed, primed.", 3],
  ["Cabinets & counters", "on-schedule", "On schedule", 23800, "Cabinets set", "Cabinets set and levelled. Counters templated.", 3],
  ["Cabinets & counters", "on-schedule", "On schedule", 27900, "LVP down", "Flooring installed throughout the kitchen and dining area.", 3],
  ["Cabinets & counters", "behind", "1 week behind", 29200, "Counter fabrication slipped a week", "The fabricator told us on install morning that the slab was not cut. New install date is next Wednesday — one week late. No cost to the owners; this is ours to manage.", 3],
  ["Finishes & snag", "behind", "1 week behind", 35900, "Counters in, backsplash done", "Counters installed Wednesday, backsplash Thursday and Friday.", 4],
  ["Finishes & snag", "complete", "Handed over", 38500, "Handover — 8 weeks, $38,500", "Handed over at the signed price, one week later than planned.", 4],
];

const LOGS: Record<string, WeekEntry[]> = {
  "1957-vancouver-bungalow-kitchen": build("1957-vancouver-bungalow-kitchen", "2026-02-06", VANCOUVER_K),
  "1986-richmond-townhouse-kitchen": build("1986-richmond-townhouse-kitchen", "2026-03-13", RICHMOND_K, {
    4: { gap: true, title: "Week 04 — no entry posted", body: ["Site lead was off sick on Friday; the log resumed in week 05. Work on site continued as scheduled."] },
  }),
  "1968-burnaby-split-level-kitchen": build("1968-burnaby-split-level-kitchen", "2026-07-03", BURNABY, {
    6: { correction: "Correction, 2026-08-21: week 06 spend was first stated as $40,700; the correct figure is $41,900." },
  }),
  "1972-coquitlam-rancher-kitchen": build("1972-coquitlam-rancher-kitchen", "2026-09-11", COQUITLAM),
  "1974-north-vancouver-bathroom": build("1974-north-vancouver-bathroom", "2026-10-02", NORTHVAN),
  "1989-langley-basement-suite": build("1989-langley-basement-suite", "2026-08-07", LANGLEY_SUITE),
  "1991-langley-townhouse-bathrooms": build("1991-langley-townhouse-bathrooms", "2026-04-10", LANGLEY_TH),
  "1979-surrey-rancher-legal-suite": build("1979-surrey-rancher-legal-suite", "2026-05-01", SURREY),
};

for (const p of projects) p.log = LOGS[p.slug] || [];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)!;

export interface FlatEntry extends WeekEntry {
  project: Project;
  href: string;
}

export const allEntries: FlatEntry[] = projects
  .flatMap((p) => p.log.map((e) => ({ ...e, project: p, href: `/projects/${p.slug}/log/week-${e.week}/` })))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/** Three most recent entries; at least one must be a delay if one exists in the last 30 days (§4.4). */
export function homeEntries(today = "2026-10-16"): FlatEntry[] {
  const latestPerProject = projects
    .filter((p) => p.live)
    .map((p) => allEntries.find((e) => e.project.slug === p.slug)!)
    .filter(Boolean);
  const picks = latestPerProject.slice(0, 3);
  const cutoff = new Date(new Date(today).getTime() - 30 * 86400000).toISOString().slice(0, 10);
  if (!picks.some((e) => e.status === "behind")) {
    const delay = allEntries.find((e) => e.status === "behind" && e.date >= cutoff);
    if (delay) picks[picks.length - 1] = delay;
  }
  return picks.sort((a, b) => (a.status === "behind" ? -1 : b.status === "behind" ? 1 : 0));
}

export const completed = projects.filter((p) => !p.live);
export const live = projects.filter((p) => p.live);

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const money = (n: number) => (n < 0 ? "−" : "") + "$" + Math.abs(n).toLocaleString("en-CA");
