/** INT-5 schedules. Placeholder durations from typical sequencing (spec §16) — replace with actuals after three jobs per scope. */
export interface ScheduleStage {
  name: string;
  min: number;
  max: number;
}

export interface ScheduleScope {
  slug: string;
  name: string;
  short: string;
  stages: ScheduleStage[];
  onSite: string;
  total: string;
  disruption: { label: string; text: string };
  example?: { href: string; label: string };
  intro: string;
}

export const permitsVerified = "2026-09-30";

const D = (name: string, min: number, max: number): ScheduleStage => ({ name, min, max });

export const schedules: ScheduleScope[] = [
  {
    slug: "small-kitchen",
    name: "Small kitchen",
    short: "small kitchen, existing layout",
    intro: "A kitchen under 120 sq ft, layout kept, cabinets and counters replaced. The fastest kitchen we build, because nothing moves.",
    stages: [D("Design & permits", 21, 42), D("Demolition", 2, 4), D("Services rough-in", 5, 10), D("Inspection", 2, 6), D("Close-in", 5, 10), D("Cabinets & counters", 10, 21), D("Finishes & snag", 5, 10)],
    onSite: "5 – 9 weeks",
    total: "8 – 15 weeks",
    disruption: { label: "Kitchen unusable: 5 – 7 weeks", text: "On day one we build you a temporary kitchen: sink, fridge, microwave and counter in the laundry room or garage. Included, not an extra." },
  },
  {
    slug: "medium-kitchen",
    name: "Medium kitchen",
    short: "medium kitchen, mid-range",
    intro: "120–180 sq ft with a minor layout change — the most common kitchen we build in Metro Vancouver.",
    stages: [D("Design & permits", 28, 49), D("Demolition", 3, 5), D("Services rough-in", 7, 14), D("Inspection", 2, 6), D("Close-in", 7, 14), D("Cabinets & counters", 14, 28), D("Finishes & snag", 7, 14)],
    onSite: "7 – 12 weeks",
    total: "11 – 19 weeks",
    disruption: {
      label: "Kitchen unusable: 6 – 9 weeks",
      text: "On day one we build you a temporary kitchen: sink, fridge, microwave and counter in the laundry room or garage. Included, not an extra. Dishwashing is in a utility sink. Plan to eat out more than you think.",
    },
    example: { href: "/projects/1968-burnaby-split-level-kitchen/log/", label: "See a real 11-week kitchen" },
  },
  {
    slug: "large-kitchen",
    name: "Large kitchen",
    short: "large kitchen with wall removal",
    intro: "Over 180 sq ft, usually opened to a dining or family room with a beam. The engineer and the beam set the pace.",
    stages: [D("Design & permits", 42, 84), D("Demolition", 4, 7), D("Structural & rough-in", 10, 21), D("Inspection", 3, 7), D("Close-in", 7, 14), D("Cabinets & counters", 21, 35), D("Finishes & snag", 7, 14)],
    onSite: "9 – 14 weeks",
    total: "15 – 26 weeks",
    disruption: { label: "Kitchen unusable: 8 – 12 weeks", text: "Temporary kitchen from day one. With a wall coming out, the dining room is closed too for 2–3 weeks." },
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    short: "standard 5'×8' bathroom",
    intro: "Full tear-out, new waterproofing, tiled shower. The waterproofing is flood-tested for 24 hours before tile.",
    stages: [D("Design & permits", 14, 35), D("Demolition", 2, 3), D("Services rough-in", 3, 7), D("Inspection", 2, 5), D("Waterproofing & flood test", 3, 4), D("Tile", 5, 10), D("Fixtures & snag", 3, 7)],
    onSite: "3 – 5 weeks",
    total: "5 – 10 weeks",
    disruption: {
      label: "Only bathroom unusable: 3 – 5 weeks",
      text: "If this is your only bathroom, we stage the work to keep the toilet live for all but 4–6 days, and we will tell you which days at the pre-start meeting.",
    },
    example: { href: "/projects/1974-north-vancouver-bathroom/log/", label: "Follow a live bathroom" },
  },
  {
    slug: "two-bathrooms",
    name: "Two bathrooms",
    short: "two bathrooms, staged",
    intro: "Two bathrooms done one after the other so one always works. Takes longer than doing both at once, and nobody has to leave.",
    stages: [D("Design & permits", 14, 35), D("Bathroom one", 18, 28), D("Bathroom two", 18, 28), D("Inspection", 2, 5), D("Fixtures & snag", 3, 7)],
    onSite: "6 – 9 weeks",
    total: "8 – 14 weeks",
    disruption: { label: "One bathroom unusable at a time: 3 – 4 weeks each", text: "The second bathroom does not start until the first is back in use." },
    example: { href: "/projects/1991-langley-townhouse-bathrooms/log/", label: "See a 7-week, two-bathroom job" },
  },
  {
    slug: "whole-home",
    name: "Whole home",
    short: "whole-home gut renovation",
    intro: "Interior taken back to studs throughout, with new services. The house is a construction site, not a home, for the duration.",
    stages: [D("Design & permits", 56, 140), D("Demolition & abatement", 7, 14), D("Structural", 7, 21), D("Services rough-in", 14, 28), D("Inspections", 5, 10), D("Insulation & close-in", 14, 21), D("Kitchen, baths & millwork", 21, 35), D("Finishes & snag", 14, 21)],
    onSite: "12 – 20 weeks",
    total: "20 – 40 weeks",
    disruption: { label: "House uninhabitable: 10 – 16 weeks", text: "Budget for somewhere else to live. A furnished rental in Metro Vancouver runs $3,200–$5,500 a month; we give you the move-out and move-in dates at contract." },
  },
  {
    slug: "basement",
    name: "Basement finishing",
    short: "basement finish (not a suite)",
    intro: "An unfinished basement finished as living space for the household — rec room, office, bedroom. No separate suite.",
    stages: [D("Design & permits", 21, 42), D("Framing", 5, 10), D("Services rough-in", 7, 14), D("Inspection", 2, 6), D("Insulation & close-in", 7, 14), D("Finishes & snag", 10, 21)],
    onSite: "5 – 9 weeks",
    total: "8 – 15 weeks",
    disruption: { label: "Basement unusable: 5 – 9 weeks", text: "The rest of the house stays live. Expect 2–4 days without the furnace or water while services are tied in, scheduled in advance." },
  },
  {
    slug: "legal-suite",
    name: "Legal secondary suite",
    short: "legal basement suite",
    intro: "A self-contained, permitted secondary suite: fire separation, egress, separate ventilation, its own entrance.",
    stages: [D("Design & permits", 28, 70), D("Demolition & cutting", 5, 10), D("Egress & entrance", 5, 10), D("Services rough-in", 10, 18), D("Inspection", 3, 7), D("Fire separation & close-in", 10, 18), D("Kitchen & bath", 10, 18), D("Final & occupancy", 5, 10)],
    onSite: "9 – 13 weeks",
    total: "13 – 23 weeks",
    disruption: { label: "Basement unusable: 9 – 13 weeks", text: "Upstairs stays live. Concrete cutting for the egress window is loud for one to two days; we tell you which." },
    example: { href: "/projects/1979-surrey-rancher-legal-suite/log/", label: "See a 10-week suite" },
  },
  {
    slug: "addition",
    name: "Rear addition",
    short: "single-storey rear addition",
    intro: "Foundations, framing and a new roof tied into the existing house. Development permits can add months before this timeline starts.",
    stages: [D("Design, DP & permits", 84, 210), D("Excavation & foundations", 10, 21), D("Framing & roof", 14, 28), D("Envelope & windows", 10, 18), D("Services rough-in", 10, 18), D("Inspections", 5, 10), D("Close-in & tie-in", 14, 21), D("Finishes & snag", 14, 21)],
    onSite: "14 – 22 weeks",
    total: "26 – 52 weeks",
    disruption: { label: "Back of the house unusable: 3 – 6 weeks during tie-in", text: "The existing house stays live until the opening is cut. Rezoning, where required, can add 6–18 months before any of this begins." },
  },
];

export const getSchedule = (slug: string) => schedules.find((s) => s.slug === slug)!;

export const dur = (min: number, max: number) =>
  max < 14 ? `${min} – ${max} days` : `${Math.max(1, Math.round(min / 7))} – ${Math.round(max / 7)} wks`;
