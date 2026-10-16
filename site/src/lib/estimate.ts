/**
 * INT-3 calculation. One module, used by the estimator island and by build-time rendering, so the two
 * can never produce different numbers for the same inputs.
 */
export type Scope = "kitchen" | "bathroom" | "wholehome" | "basement" | "exterior" | "addition";
export type Size = "small" | "medium" | "large";
export type Finish = "builder" | "mid" | "high" | "custom";
export type Building = "detached" | "townhouse" | "condo" | "strata";
export type Pre1980 = "yes" | "no" | "unsure";
export type Range = [number, number];

export interface Rates {
  updated: string;
  currency: string;
  base: {
    kitchen: Record<Size, Range>;
    bathroom: Record<Size, Range>;
    wholehome: { perSqFt: Record<"builder" | "mid" | "high", Range> };
    basement: { perSqFt: Record<"builder" | "mid" | "high", Range> };
  };
  finishMultiplier: Record<Finish, number>;
  buildingMultiplier: Record<Building, number>;
  contingencyPct: { default: number; pre1980: number; structural: number };
  permits: Record<string, Range>;
  designPctOfConstruction: Range;
}

export interface EstimateInput {
  scopes: Scope[];
  sizes: Partial<Record<"kitchen" | "bathroom", Size>>;
  sqft: Partial<Record<"wholehome" | "basement", number>>;
  finish: Finish;
  building: Building;
  pre1980: Pre1980;
  municipality: string;
}

export interface EstimateLine {
  label: string;
  range: Range;
}

export interface EstimateResult {
  priced: boolean;
  construction: Range;
  permits: Range;
  permitsNote?: string;
  design: Range;
  contingencyPct: number;
  contingency: Range;
  total: Range;
  lines: EstimateLine[];
  unpriced: Scope[];
  summary: string;
}

export const SCOPE_LABEL: Record<Scope, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  wholehome: "Whole home",
  basement: "Basement or suite",
  exterior: "Exterior",
  addition: "Addition",
};

export const SIZE_LABEL: Record<"kitchen" | "bathroom", Record<Size, string>> = {
  kitchen: { small: "Small kitchen — under 120 sq ft", medium: "Medium kitchen — 120–180 sq ft", large: "Large kitchen — over 180 sq ft" },
  bathroom: { small: "Small bathroom — under 40 sq ft (ensuite or powder)", medium: "Standard bathroom — 40–60 sq ft (5'×8')", large: "Large bathroom — over 60 sq ft" },
};

export const FINISH_LABEL: Record<Finish, { name: string; def: string }> = {
  builder: { name: "Builder", def: "Stock cabinets, laminate counters, ceramic tile, entry-tier fixtures." },
  mid: { name: "Mid-range", def: "Semi-custom cabinets, quartz counters, porcelain tile, mid-tier fixtures." },
  high: { name: "High-end", def: "Custom millwork, natural stone, large-format tile, designer fixtures." },
  custom: { name: "Custom", def: "Architect-specified, one-off pieces, imported materials." },
};

export const BUILDING_LABEL: Record<Building, string> = {
  detached: "Detached house",
  townhouse: "Townhouse",
  condo: "Condo or apartment",
  strata: "Strata common area",
};

/** Municipalities without their own row borrow the nearest published one and say so. */
const PERMIT_KEY: Record<string, { key: string; borrowed?: string }> = {
  Vancouver: { key: "vancouver" },
  Burnaby: { key: "burnaby" },
  Surrey: { key: "surrey" },
  Richmond: { key: "richmond" },
  "North Vancouver": { key: "northVancouver" },
  Langley: { key: "langley" },
  Abbotsford: { key: "abbotsford" },
  Chilliwack: { key: "chilliwack" },
  "West Vancouver": { key: "northVancouver", borrowed: "North Vancouver" },
  "New Westminster": { key: "burnaby", borrowed: "Burnaby" },
  Coquitlam: { key: "burnaby", borrowed: "Burnaby" },
};

const add = (a: Range, b: Range): Range => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Range, k: number): Range => [a[0] * k, a[1] * k];
const round = (r: Range, step = 100): Range => [Math.floor(r[0] / step) * step, Math.ceil(r[1] / step) * step];

export function estimate(rates: Rates, i: EstimateInput): EstimateResult {
  const lines: EstimateLine[] = [];
  const unpriced: Scope[] = [];
  const fm = rates.finishMultiplier[i.finish];
  const tier = i.finish === "custom" ? "high" : i.finish;
  const customBump = i.finish === "custom" ? rates.finishMultiplier.custom / rates.finishMultiplier.high : 1;

  for (const s of i.scopes) {
    if (s === "kitchen" || s === "bathroom") {
      const size = i.sizes[s] ?? "medium";
      lines.push({ label: SIZE_LABEL[s][size].split(" — ")[0], range: mul(rates.base[s][size], fm) });
    } else if (s === "wholehome" || s === "basement") {
      const sq = Math.max(100, i.sqft[s] ?? (s === "wholehome" ? 2000 : 900));
      lines.push({ label: `${SCOPE_LABEL[s]}, ${sq.toLocaleString("en-CA")} sq ft`, range: mul(mul(rates.base[s].perSqFt[tier], sq), customBump) });
    } else {
      unpriced.push(s);
    }
  }

  const bm = rates.buildingMultiplier[i.building];
  const construction = round(mul(lines.reduce<Range>((acc, l) => add(acc, l.range), [0, 0]), bm), 1000);
  const pk = PERMIT_KEY[i.municipality] ?? { key: "vancouver" };
  const permits: Range = lines.length ? rates.permits[pk.key] : [0, 0];
  const [dLo, dHi] = rates.designPctOfConstruction;
  const design = round([construction[0] * dLo, construction[1] * dHi]);
  const structural = i.scopes.includes("addition");
  const contingencyPct = structural
    ? rates.contingencyPct.structural
    : i.pre1980 === "no"
      ? rates.contingencyPct.default
      : rates.contingencyPct.pre1980;
  const contingency = round(mul(add(add(construction, permits), design), contingencyPct));
  const total = add(add(add(construction, permits), design), contingency);

  const summary = [
    i.scopes.map((s) => (s === "kitchen" || s === "bathroom" ? `${SCOPE_LABEL[s].toLowerCase()} (${i.sizes[s] ?? "medium"})` : SCOPE_LABEL[s].toLowerCase())).join(" + "),
    `${FINISH_LABEL[i.finish].name.toLowerCase()} finish`,
    `${i.pre1980 === "yes" ? "pre-1980 " : i.pre1980 === "unsure" ? "unknown-vintage " : ""}${BUILDING_LABEL[i.building].toLowerCase()}`,
    i.municipality,
  ].join(", ");

  return {
    priced: lines.length > 0,
    construction,
    permits,
    permitsNote: pk.borrowed ? `No published row for ${i.municipality}; using ${pk.borrowed}'s range.` : undefined,
    design,
    contingencyPct,
    contingency,
    total,
    lines,
    unpriced,
    summary: summary.charAt(0).toUpperCase() + summary.slice(1),
  };
}

export const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-CA");
export const fmtRange = (r: Range) => `${fmt(r[0])} — ${fmt(r[1])}`;
