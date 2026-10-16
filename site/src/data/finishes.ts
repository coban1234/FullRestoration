/** INT-6. Allowances are placeholders pending supplier pricing (spec §16). Quantities are for a medium kitchen. */
export type Level = "builder" | "mid" | "high";

export interface FinishRow {
  key: string;
  label: string;
  qty: number;
  unit: string;
  cells: Record<Level, { cls: string; allowance: string; amount: [number, number] }>;
}

export const LEVELS: { key: Level; name: string }[] = [
  { key: "builder", name: "Builder" },
  { key: "mid", name: "Mid-range" },
  { key: "high", name: "High-end" },
];

export const finishBasis = "Medium kitchen, 150 sq ft floor, 30 sq ft backsplash, 18 linear ft of cabinets";

export const finishRows: FinishRow[] = [
  {
    key: "cabinets",
    label: "Cabinets",
    qty: 18,
    unit: "lin ft",
    cells: {
      builder: { cls: "Stock melamine boxes, thermofoil doors", allowance: "$350–500 / lin ft", amount: [6300, 9000] },
      mid: { cls: "Semi-custom plywood boxes, painted shaker, soft-close", allowance: "$800–1,100 / lin ft", amount: [14400, 19800] },
      high: { cls: "Custom millwork, inset doors, integrated panels", allowance: "$1,500–2,200 / lin ft", amount: [27000, 39600] },
    },
  },
  {
    key: "countertops",
    label: "Countertops",
    qty: 45,
    unit: "sq ft",
    cells: {
      builder: { cls: "Post-formed laminate", allowance: "$35–55 / sq ft", amount: [1575, 2475] },
      mid: { cls: "3 cm engineered quartz, eased edge", allowance: "$95–130 / sq ft", amount: [4275, 5850] },
      high: { cls: "Natural stone or porcelain slab, mitred edge", allowance: "$160–260 / sq ft", amount: [7200, 11700] },
    },
  },
  {
    key: "tile",
    label: "Backsplash tile",
    qty: 30,
    unit: "sq ft",
    cells: {
      builder: { cls: "Ceramic subway, 3×6", allowance: "$6–9 / sq ft supplied", amount: [180, 270] },
      mid: { cls: "Glazed ceramic or porcelain, 3×12", allowance: "$12–18 / sq ft supplied", amount: [360, 540] },
      high: { cls: "Handmade zellige or slab backsplash", allowance: "$30–60 / sq ft supplied", amount: [900, 1800] },
    },
  },
  {
    key: "flooring",
    label: "Flooring",
    qty: 150,
    unit: "sq ft",
    cells: {
      builder: { cls: "Luxury vinyl plank", allowance: "$4–6 / sq ft supplied", amount: [600, 900] },
      mid: { cls: "Engineered oak, 7\" wide plank", allowance: "$9–13 / sq ft supplied", amount: [1350, 1950] },
      high: { cls: "Solid hardwood or large-format porcelain", allowance: "$16–24 / sq ft supplied", amount: [2400, 3600] },
    },
  },
  {
    key: "fixtures",
    label: "Plumbing fixtures",
    qty: 1,
    unit: "set",
    cells: {
      builder: { cls: "Drop-in stainless sink, single-lever faucet", allowance: "$500–800 / set", amount: [500, 800] },
      mid: { cls: "Undermount sink, pull-down faucet", allowance: "$1,100–1,600 / set", amount: [1100, 1600] },
      high: { cls: "Fireclay or integrated sink, bridge faucet, filter tap", allowance: "$2,500–4,000 / set", amount: [2500, 4000] },
    },
  },
  {
    key: "hardware",
    label: "Hardware",
    qty: 30,
    unit: "pieces",
    cells: {
      builder: { cls: "Stainless bar pulls", allowance: "$5–8 / piece", amount: [150, 240] },
      mid: { cls: "Solid brass or matte black pulls", allowance: "$14–22 / piece", amount: [420, 660] },
      high: { cls: "Unlacquered brass, custom lengths", allowance: "$35–60 / piece", amount: [1050, 1800] },
    },
  },
  {
    key: "lighting",
    label: "Lighting",
    qty: 1,
    unit: "package",
    cells: {
      builder: { cls: "LED pot lights", allowance: "$700–1,000 / package", amount: [700, 1000] },
      mid: { cls: "LED pots, two pendants, under-cabinet strip", allowance: "$1,600–2,300 / package", amount: [1600, 2300] },
      high: { cls: "Layered scheme, dimming controls, feature pendants", allowance: "$3,500–6,000 / package", amount: [3500, 6000] },
    },
  },
  {
    key: "paint",
    label: "Paint",
    qty: 400,
    unit: "sq ft wall",
    cells: {
      builder: { cls: "Contractor-grade acrylic, 2 coats", allowance: "$1.50–2 / sq ft", amount: [600, 800] },
      mid: { cls: "Premium washable acrylic, 2 coats", allowance: "$2.50–3.50 / sq ft", amount: [1000, 1400] },
      high: { cls: "Premium paint, Level 5 drywall finish", allowance: "$4.50–6 / sq ft", amount: [1800, 2400] },
    },
  },
];

export const finishesUpdated = "2026-10-14";
