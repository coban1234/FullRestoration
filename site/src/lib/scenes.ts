/*
 * Illustrated stand-ins for site photography, drawn in the same flat style and palette as the kitchen sequence.
 * sceneFor(label) chooses a scene from the slot's description; sceneSVG(scene, uid) renders it (viewBox 1600×1000).
 */
import { kitchenSVG } from "./kitchen";

export type Scene =
  | { kind: "kitchen"; stage: number }
  | {
      kind:
        | "bath-before" | "bath-membrane" | "bath-flood" | "bath-after"
        | "gut" | "rough" | "shoring" | "beam" | "firesep" | "basement" | "suite"
        | "street" | "house-before" | "house-after" | "wrap" | "cladding" | "window-open" | "window-head" | "ledger" | "deck" | "addition"
        | "office" | "van" | "permit" | "doc-registry" | "doc-insurance" | "doc-wsbc" | "doc-contract"
        | "corridor" | "moving" | "temp-kitchen" | "phone" | "portrait";
      tone?: number;
    };

const has = (s: string, ...k: string[]) => k.some((x) => s.includes(x));

export function sceneFor(label: string): Scene {
  const s = label.toLowerCase();
  const before = has(s, "before", "original", "fibreglass", "week 00", "pre-start");
  const live = has(s, "current stage");
  const S = (kind: Exclude<Scene, { kind: "kitchen" }>["kind"]): Scene => ({ kind });

  if (has(s, "portrait", "crew member")) return { kind: "portrait", tone: [...s].reduce((h, c) => (h * 33 + c.charCodeAt(0)) >>> 0, 5381) };
  if (has(s, "temporary kitchen", "laundry-room")) return S("temp-kitchen");
  if (has(s, "phone")) return S("phone");
  if (has(s, "moving", "packed boxes")) return S("moving");
  if (has(s, "elevator", "corridor", "strata", "commercial")) return S("corridor");
  if (has(s, "registry")) return S("doc-registry");
  if (has(s, "insurance")) return S("doc-insurance");
  if (has(s, "worksafe", "clearance")) return S("doc-wsbc");
  if (has(s, "permit card", "permit")) return S("permit");
  if (has(s, "contract", "proposal", "design", "quote", "change order", "drawings")) return S("doc-contract");
  if (has(s, "office", "workshop")) return S("office");
  if (has(s, "crew arriving", "van", "site visit")) return S("van");
  if (has(s, "flood")) return S("bath-flood");
  if (has(s, "membrane", "waterproof")) return S("bath-membrane");
  if (has(s, "fire-separation", "fire separation")) return S("firesep");
  if (has(s, "shoring")) return S("shoring");
  if (has(s, "beam", "engineer", "structural")) return S("beam");
  if (has(s, "addition", "second storey")) return S("addition");
  if (has(s, "fibre-cement", "going up")) return S("cladding");
  if (has(s, "rainscreen", "housewrap") && !has(s, "window", "flashing")) return S("wrap");
  if (has(s, "sill pan", "opening")) return S("window-open");
  if (has(s, "head flashing", "lapped under")) return S("window-head");
  if (has(s, "window")) return S("window-open");
  if (has(s, "ledger")) return S("ledger");
  if (has(s, "deck", "outdoor")) return S("deck");
  if (has(s, "cladding", "siding")) return before ? S("house-before") : S("house-after");
  if (has(s, "street", "job in", "exterior")) return before ? S("house-before") : S("street");
  if (has(s, "open joists", "basement before")) return S("basement");

  const kitchen = has(s, "kitchen");
  const bath = has(s, "bath", "ensuite", "shower", "stall", "vanity");
  const suite = has(s, "suite", "basement");
  const stageWord = has(s, "demolition", "demo", "taken back", "gut", "disconnected")
    ? "demo"
    : has(s, "rough-in", "rough in", "open studs", "inspection", "wiring")
      ? "rough"
      : has(s, "close-in", "drywall", "insulation")
        ? "close"
        : has(s, "cabinets", "counters")
          ? "cab"
          : null;

  if (kitchen) {
    if (before) return { kind: "kitchen", stage: 0 };
    if (live) return { kind: "kitchen", stage: 2 };
    const map = { demo: 1, rough: 2, close: 3, cab: 3 } as const;
    return { kind: "kitchen", stage: stageWord ? map[stageWord] : 4 };
  }
  if (bath) {
    if (before) return S("bath-before");
    if (live || stageWord === "close") return S("bath-membrane");
    if (stageWord === "demo") return S("gut");
    if (stageWord === "rough") return S("rough");
    return S("bath-after");
  }
  if (suite) {
    if (before) return S("basement");
    if (live || stageWord === "close") return S("firesep");
    if (stageWord === "demo") return S("basement");
    if (stageWord === "rough") return S("rough");
    return S("suite");
  }
  if (stageWord === "demo" || has(s, "whole home", "split-level", "studs")) return S("gut");
  if (stageWord === "rough") return S("rough");
  if (stageWord === "close") return S("firesep");
  if (has(s, "handover", "warranty", "complete", "finish")) return { kind: "kitchen", stage: 4 };
  return { kind: "kitchen", stage: 3 };
}

/* ---------- drawing primitives ---------- */
const r = (x: number, y: number, w: number, h: number, fill: string, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const p = (pts: string, fill: string, extra = "") => `<polygon points="${pts}" fill="${fill}" ${extra}/>`;
const l = (x1: number, y1: number, x2: number, y2: number, stroke: string, sw = 2, extra = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const t = (x: number, y: number, s: string, size: number, fill = "#1C1B19", extra = "") =>
  `<text x="${x}" y="${y}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="${size}" fill="${fill}" ${extra}>${s}</text>`;
const range = (a: number, b: number, step: number) => {
  const out: number[] = [];
  for (let i = a; i <= b; i += step) out.push(i);
  return out;
};

const C = {
  plaster: "#F4F1EC",
  concrete: "#E2DDD5",
  char: "#1C1B19",
  slate: "#6B6760",
  clay: "#B5512E",
  oak: "#C49A6C",
  stud: "#D8BC8E",
  studDk: "#B89766",
  green: "#4F7A5A",
  mist: "#DDE4E6",
  sky: "#D7E1E4",
};

function defs(u: string) {
  return `<defs>
    <pattern id="${u}tileOld" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#E9E1D2"/><rect x="2" y="2" width="40" height="40" fill="#9FBFAE"/></pattern>
    <pattern id="${u}tileNew" width="200" height="100" patternUnits="userSpaceOnUse"><rect width="200" height="100" fill="#D6D2CB"/><rect x="1.5" y="1.5" width="197" height="97" fill="#ECE8E1"/></pattern>
    <pattern id="${u}floorTile" width="160" height="160" patternUnits="userSpaceOnUse"><rect width="160" height="160" fill="#8F8A82"/><rect x="2" y="2" width="156" height="156" fill="#A9A49B"/></pattern>
    <pattern id="${u}lino" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#D8CBB0"/><rect width="30" height="30" fill="#B79D78"/><rect x="30" y="30" width="30" height="30" fill="#B79D78"/></pattern>
    <pattern id="${u}ply" width="240" height="120" patternUnits="userSpaceOnUse"><rect width="240" height="120" fill="#C9A576"/><path d="M0 34 C70 28 140 42 240 34 M0 80 C80 72 160 88 240 80" stroke="#B48F5E" stroke-width="2" fill="none"/><path d="M0 0 H240 M0 0 V120" stroke="#9C7A4C" stroke-width="2"/></pattern>
    <pattern id="${u}osb" width="60" height="40" patternUnits="userSpaceOnUse"><rect width="60" height="40" fill="#B39066"/><rect x="6" y="5" width="18" height="6" fill="#C4A274" transform="rotate(12 15 8)"/><rect x="32" y="20" width="20" height="5" fill="#97764C" transform="rotate(-18 42 22)"/><rect x="10" y="26" width="14" height="5" fill="#A5835A"/></pattern>
    <pattern id="${u}conc" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#B9B4AB"/><circle cx="20" cy="30" r="2" fill="#A39E95"/><circle cx="80" cy="70" r="2.5" fill="#A39E95"/><circle cx="50" cy="100" r="1.5" fill="#CFCAC1"/><circle cx="100" cy="20" r="1.5" fill="#CFCAC1"/></pattern>
    <pattern id="${u}lvp" width="300" height="60" patternUnits="userSpaceOnUse"><rect width="300" height="60" fill="#C8A272"/><path d="M0 0 H300 M180 0 V30 M60 30 V60 M0 30 H300" stroke="#A9845A" stroke-width="2"/><path d="M10 14 C80 10 140 18 170 14 M70 46 C150 42 220 50 290 46" stroke="#B89262" stroke-width="1.5" fill="none"/></pattern>
    <pattern id="${u}wrap" width="320" height="160" patternUnits="userSpaceOnUse"><rect width="320" height="160" fill="#F2F2EF"/><text x="20" y="60" font-family="JetBrains Mono, monospace" font-size="22" fill="#C9CDD0" letter-spacing="4">HOUSEWRAP</text><text x="180" y="140" font-family="JetBrains Mono, monospace" font-size="22" fill="#C9CDD0" letter-spacing="4">HOUSEWRAP</text></pattern>
    <pattern id="${u}stucco" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#D9CDB4"/><circle cx="8" cy="10" r="2" fill="#C8BB9F"/><circle cx="28" cy="26" r="2.5" fill="#CDBFA3"/><circle cx="18" cy="34" r="1.5" fill="#E4D9C2"/></pattern>
    <pattern id="${u}fc" width="400" height="200" patternUnits="userSpaceOnUse"><rect width="400" height="200" fill="#2E3438"/><path d="M0 0 H400 M0 100 H400 M0 0 V100 M200 100 V200" stroke="#1E2326" stroke-width="5"/></pattern>
    <pattern id="${u}lap" width="100" height="36" patternUnits="userSpaceOnUse"><rect width="100" height="36" fill="#9DB0AA"/><rect y="30" width="100" height="6" fill="#86998F"/></pattern>
    <pattern id="${u}shingle" width="60" height="30" patternUnits="userSpaceOnUse"><rect width="60" height="30" fill="#4A4642"/><path d="M0 29 H60 M30 0 V29" stroke="#3A3633" stroke-width="3"/></pattern>
    <pattern id="${u}quilt" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#3F5F86"/><path d="M0 0 L60 60 M60 0 L0 60" stroke="#35506F" stroke-width="3"/></pattern>
    <pattern id="${u}board" width="300" height="200" patternUnits="userSpaceOnUse"><rect width="300" height="200" fill="#CFD1CF"/><path d="M0 0 H300 M0 0 V200" stroke="#B5B8B6" stroke-width="3"/>${range(20, 280, 65).map((x) => range(20, 190, 42).map((y) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#9A9D9B"/>`).join("")).join("")}</pattern>
    <pattern id="${u}grass" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#7E9A6A"/><path d="M5 20 L8 10 M20 20 L22 8 M33 20 L30 11" stroke="#6B875A" stroke-width="2"/></pattern>
    <linearGradient id="${u}skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D7DC"/><stop offset="1" stop-color="#E8ECEA"/></linearGradient>
    <linearGradient id="${u}glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6EEF0" stop-opacity=".75"/><stop offset=".5" stop-color="#CFDCE0" stop-opacity=".35"/><stop offset="1" stop-color="#E6EEF0" stop-opacity=".7"/></linearGradient>
  </defs>`;
}

/** Interior box: back wall 200–1400 × 120–760, side walls, ceiling and floor in one-point perspective. */
function room(o: { back: string; left?: string; right?: string; ceil?: string; floor: string; shade?: boolean }) {
  return [
    r(0, 0, 1600, 1000, o.back),
    p("0,0 1600,0 1400,120 200,120", o.ceil ?? "#ECE8E1"),
    p("0,0 200,120 200,760 0,1000", o.left ?? o.back),
    p("1600,0 1400,120 1400,760 1600,1000", o.right ?? o.back),
    o.shade !== false ? p("0,0 200,120 200,760 0,1000", "#000", 'opacity=".10"') + p("1600,0 1400,120 1400,760 1600,1000", "#000", 'opacity=".16"') : "",
    p("200,760 1400,760 1600,1000 0,1000", o.floor),
    p("200,760 1400,760 1600,1000 0,1000", "#000", 'opacity=".06"'),
    l(200, 760, 1400, 760, "#000", 2, 'opacity=".25"'),
  ].join("");
}

function studs(x0: number, x1: number, y0: number, y1: number, spacing = 80) {
  let s = r(x0, y1 - 18, x1 - x0, 18, C.studDk) + r(x0, y0, x1 - x0, 18, C.studDk) + r(x0, y0 + 18, x1 - x0, 12, C.stud);
  for (const x of range(x0, x1 - 20, spacing)) s += r(x, y0 + 18, 22, y1 - y0 - 36, C.stud) + r(x + 18, y0 + 18, 4, y1 - y0 - 36, C.studDk, 'opacity=".6"');
  return s;
}

function sky(u: string, ground = 800) {
  return r(0, 0, 1600, 1000, `url(#${u}skyG)`) + r(0, ground, 1600, 1000 - ground, `url(#${u}grass)`);
}

function tree(x: number, y: number, s = 1) {
  return r(x - 10 * s, y, 20 * s, 140 * s, "#6E5638") + `<circle cx="${x}" cy="${y - 20 * s}" r="${90 * s}" fill="#5F7F5A"/><circle cx="${x - 60 * s}" cy="${y + 20 * s}" r="${60 * s}" fill="#56744F"/><circle cx="${x + 55 * s}" cy="${y + 10 * s}" r="${65 * s}" fill="#6A8A62"/>`;
}

function win(x: number, y: number, w: number, h: number, frame = "#F4F1EC") {
  return r(x - 8, y - 8, w + 16, h + 16, frame) + r(x, y, w, h, "#9FB3BA") + p(`${x},${y + h} ${x + w * 0.55},${y} ${x + w * 0.8},${y} ${x + w * 0.25},${y + h}`, "#fff", 'opacity=".25"') + l(x + w / 2, y, x + w / 2, y + h, frame, 8) + r(x - 14, y + h + 6, w + 28, 12, frame);
}

function house(u: string, x: number, w: number, o: { body: string; roof?: string; storeys?: number; door?: string; base?: number; trim?: string }) {
  const base = o.base ?? 800;
  const st = o.storeys ?? 1;
  const h = 230 * st + 40;
  const top = base - h;
  const roofH = 150;
  const trim = o.trim ?? C.plaster;
  let s = r(x, top, w, h, o.body);
  s += p(`${x - 40},${top} ${x + w / 2},${top - roofH} ${x + w + 40},${top}`, o.roof ?? `url(#${u}shingle)`) + r(x - 40, top - 6, w + 80, 14, "#2C2926");
  for (let k = 0; k < st; k++) {
    const wy = top + 60 + k * 230;
    s += win(x + 60, wy, 150, 120, trim) + win(x + w - 210, wy, 150, 120, trim);
  }
  s += r(x + w / 2 - 50, base - 200, 100, 200, o.door ?? C.clay) + r(x + w / 2 - 62, base - 212, 124, 12, trim) + `<circle cx="${x + w / 2 + 32}" cy="${base - 100}" r="6" fill="#E8D9A8"/>`;
  s += r(x - 10, base - 6, w + 20, 12, "#8E877C");
  return s;
}

function paper(u: string, x: number, y: number, w: number, h: number, inner: string, rot = -3) {
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">${r(x + 10, y + 14, w, h, "#000", 'opacity=".12"')}${r(x, y, w, h, "#FBFAF7")}${inner}</g>`;
}

function docLines(x: number, y: number, w: number, n: number, gap = 34) {
  return range(0, n - 1, 1)
    .map((i) => r(x, y + i * gap, w * (i % 3 === 2 ? 0.62 : i % 4 === 1 ? 0.86 : 1), 9, "#CFCAC1"))
    .join("");
}

function stamp(x: number, y: number, label: string, color = C.green) {
  return `<g transform="rotate(-12 ${x} ${y})" opacity=".85"><circle cx="${x}" cy="${y}" r="78" fill="none" stroke="${color}" stroke-width="7"/><circle cx="${x}" cy="${y}" r="62" fill="none" stroke="${color}" stroke-width="2.5"/>${t(x - 58, y + 9, label, 24, color, 'font-weight="700" letter-spacing="2"')}</g>`;
}

/* ---------- scenes ---------- */
function portrait(u: string, tone = 0) {
  const skins = ["#8D5B3C", "#C68E64", "#E2B48C", "#6B4428", "#D9A27A"];
  const hair = ["#2C2926", "#5A4326", "#1C1B19", "#8E6A40", "#3A3633"];
  const hats = ["#F4F3EF", "#E2B13C", "#F4F3EF", "#B5512E", "#F4F3EF"];
  const i = tone % 5;
  const sk = skins[i];
  return (
    room({ back: `url(#${u}osb)`, floor: `url(#${u}ply)`, ceil: "#C6B08A" }) + studs(200, 1400, 120, 760) + r(0, 0, 1600, 1000, C.plaster, 'opacity=".35"') +
    // torso: work shirt + hi-vis vest
    `<path d="M380 1000 C 400 760 560 690 800 690 C 1040 690 1200 760 1220 1000 Z" fill="${["#4F6670", "#2E3438", "#6E5638", "#4F7A5A", "#3F5F86"][i]}"/>` +
    `<path d="M520 1000 L 560 740 L 700 700 L 720 1000 Z M1080 1000 L 1040 740 L 900 700 L 880 1000 Z" fill="#E8833A"/>` +
    r(520, 860, 200, 18, "#E9EBEC") + r(880, 860, 200, 18, "#E9EBEC") +
    // neck and head
    r(740, 590, 120, 120, sk) + `<ellipse cx="800" cy="480" rx="150" ry="175" fill="${sk}"/>` +
    `<ellipse cx="652" cy="500" rx="22" ry="40" fill="${sk}"/><ellipse cx="948" cy="500" rx="22" ry="40" fill="${sk}"/>` +
    `<path d="M660 420 C 680 330 920 330 940 420 L 940 380 C 900 300 700 300 660 380 Z" fill="${hair[i]}"/>` +
    // hard hat
    `<path d="M630 390 C 630 220 970 220 970 390 Z" fill="${hats[i]}"/>` + r(600, 380, 400, 26, hats[i], 'rx="13"') + r(790, 236, 20, 150, "#0001") +
    `<path d="M700 610 Q 800 650 900 610" stroke="#0003" stroke-width="5" fill="none"/>`
  );
}

const scenes: Record<Exclude<Scene, { kind: "kitchen" }>["kind"], (u: string, tone?: number) => string> = {
  portrait,
  "bath-before": (u) =>
    room({ back: `url(#${u}tileOld)`, floor: `url(#${u}lino)`, ceil: "#E6DFD0" }) +
    // fibreglass stall
    r(860, 170, 500, 590, "#E6D8BC") + r(890, 200, 440, 545, "#EFE4CD") + l(860, 175, 1360, 175, "#A59A86", 8) +
    `<path d="M880 182 Q 900 450 885 740 L 960 740 Q 950 450 935 182 Z" fill="#C9B98F" opacity=".9"/>` +
    r(1240, 300, 30, 14, "#B7B1A6") + `<circle cx="1255" cy="280" r="22" fill="#B7B1A6"/>` +
    // vanity, mirror, toilet
    r(300, 260, 330, 240, "#C9D2D1") + r(286, 248, 358, 12, "#9C8E74") +
    r(300, 560, 360, 200, "#7A5A3A") + r(290, 540, 380, 28, "#E7DCC4") + r(320, 580, 150, 160, "#6C4E31") + r(490, 580, 150, 160, "#6C4E31") +
    `<ellipse cx="480" cy="552" rx="80" ry="12" fill="#D2C6AC"/>` +
    r(700, 520, 110, 160, "#EFE8DA") + `<ellipse cx="755" cy="700" rx="78" ry="38" fill="#E9E1D0"/>` + r(735, 700, 40, 60, "#E2D9C6") +
    r(0, 0, 1600, 1000, "#7A6A3A", 'opacity=".06"'),

  "bath-membrane": (u) =>
    room({ back: "#C2C9B3", floor: `url(#${u}ply)`, ceil: "#E7E5DF" }) +
    // membrane on shower walls with lapped seams
    r(820, 120, 580, 640, "#E17F33") +
    range(120, 700, 160).map((y) => r(820, y + 140, 580, 20, "#C96A22")).join("") +
    l(820, 120, 820, 760, "#C96A22", 14) +
    r(1080, 360, 180, 120, "#B95C1B") + r(1092, 372, 156, 96, "#D2732A") +
    p("820,760 1400,760 1600,1000 700,1000", "#E17F33") + `<circle cx="1180" cy="880" r="34" fill="#9E9A93"/><circle cx="1180" cy="880" r="20" fill="#6E6A63"/>` +
    // board with screws on the dry wall
    range(240, 760, 90).map((x) => range(170, 720, 110).map((y) => `<circle cx="${x}" cy="${y}" r="3" fill="#8C937F"/>`).join("")).join("") +
    r(380, 520, 16, 120, "#C9C3B8") + r(450, 520, 16, 120, "#C9C3B8") + `<circle cx="388" cy="520" r="12" fill="#B33A2B"/><circle cx="458" cy="520" r="12" fill="#2F5F8A"/>` +
    r(560, 700, 70, 18, "#9E9A93"),

  "bath-flood": (u) =>
    scenes["bath-membrane"](u) +
    p("820,800 1400,800 1560,980 760,980", "#4F95C2", 'opacity=".8"') + l(840, 812, 1390, 812, "#BFDCE8", 4, 'opacity=".8"') +
    l(840, 712, 1390, 712, "#B33A2B", 6, 'stroke-dasharray="26 12"') + r(1300, 660, 96, 40, C.plaster) + t(1310, 688, "24 h", 22, "#B33A2B", 'font-weight="700"'),

  "bath-after": (u) =>
    room({ back: `url(#${u}tileNew)`, floor: `url(#${u}floorTile)`, ceil: "#F1EFEA" }) +
    r(1100, 330, 160, 110, "#D8D3CB") + r(1112, 342, 136, 86, "#E3DED6") + r(1130, 372, 24, 56, "#4F7A5A") + r(1166, 384, 22, 44, "#F4F1EC") + r(1200, 360, 24, 68, C.oak) +
    r(1000, 160, 18, 120, "#9C9A96") + `<ellipse cx="1009" cy="160" rx="60" ry="10" fill="#9C9A96"/>` +
    // glass panel
    p("860,120 880,120 880,760 860,760", "#B9C4C7") + p("880,140 1040,140 1060,960 880,780", `url(#${u}glass)`) + l(1040, 140, 1060, 960, "#A9B6BA", 3) +
    l(900, 930, 1300, 930, "#6E6A63", 6) +
    // floating oak vanity, basin, round mirror
    `<circle cx="490" cy="330" r="130" fill="#C8CFD0"/><circle cx="490" cy="330" r="130" fill="none" stroke="#2C2926" stroke-width="8"/>` +
    r(300, 560, 380, 130, C.oak) + l(490, 575, 490, 675, "#A67E52", 3) + r(300, 548, 380, 14, "#E9E5DE") + r(410, 520, 160, 34, "#F7F5F1") + r(484, 488, 12, 36, "#6E6A63") +
    r(720, 300, 70, 10, "#6E6A63") + r(730, 310, 50, 170, "#DCD4C4") +
    r(0, 0, 1600, 1000, "#FFF", 'opacity=".04"'),

  gut: (u) =>
    room({ back: `url(#${u}osb)`, floor: `url(#${u}ply)`, ceil: "#C6B08A", shade: true }) +
    studs(200, 1400, 120, 760) +
    range(220, 1380, 100).map((x) => l(x - (800 - x) * 0.25, 0, x, 120, C.studDk, 14)).join("") +
    `<path d="M520 300 C 560 360 500 420 540 470" stroke="#E2B13C" stroke-width="7" fill="none"/>` + r(528, 466, 28, 28, "#E2B13C") + r(522, 486, 40, 16, "#B33A2B") +
    p("980,1000 1040,860 1120,880 1180,830 1260,900 1330,870 1420,1000", "#8C7A62") + p("1040,1000 1090,920 1160,940 1230,900 1300,1000", "#A3916F") +
    r(300, 640, 220, 120, "#6E6A63") + r(300, 640, 220, 14, "#55524C") + t(318, 710, "DISCONNECTED", 22, "#F4F1EC") +
    r(820, 200, 140, 80, C.plaster) + t(834, 236, "SERVICES", 18, "#B33A2B", 'font-weight="700"') + t(834, 262, "OFF · wk 02", 18, C.slate),

  rough: (u) =>
    room({ back: `url(#${u}osb)`, floor: `url(#${u}ply)`, ceil: "#C6B08A" }) +
    studs(200, 1400, 120, 760) +
    range(220, 1380, 100).map((x) => l(x - (800 - x) * 0.25, 0, x, 120, C.studDk, 14)).join("") +
    // wiring and boxes
    `<path d="M200 300 C 400 280 520 320 700 300 S 1000 280 1400 300" stroke="#E2B13C" stroke-width="7" fill="none"/>` +
    `<path d="M200 330 C 500 350 760 320 1400 340" stroke="#D9D4C8" stroke-width="7" fill="none"/>` +
    range(360, 1300, 240).map((x) => `<path d="M${x + 12} 300 V 460" stroke="#E2B13C" stroke-width="6"/>` + r(x, 460, 30, 46, "#2F5F8A")).join("") +
    // PEX
    `<path d="M980 760 V 520 Q 980 480 1020 480 H 1100" stroke="#B33A2B" stroke-width="10" fill="none"/>` +
    `<path d="M1020 760 V 560 Q 1020 520 1060 520 H 1100" stroke="#2F5F8A" stroke-width="10" fill="none"/>` +
    r(1180, 140, 200, 300, "#B6BBBE") + r(1196, 156, 168, 268, "#9EA4A8") + range(176, 400, 32).map((y) => r(1216, y, 128, 14, "#2C2926")).join(""),

  shoring: (u) =>
    room({ back: "#E6E0D5", floor: `url(#${u}ply)`, ceil: "#E3DCCF" }) +
    studs(200, 560, 120, 760) + studs(1040, 1400, 120, 760) +
    r(560, 120, 480, 640, "#D7CFC1") + l(560, 120, 560, 760, "#B8AFA0", 4) + l(1040, 120, 1040, 760, "#B8AFA0", 4) +
    r(200, 170, 1200, 46, "#B48A58") + r(200, 210, 1200, 10, "#8E6A40") +
    range(420, 1180, 190).map((x) => r(x, 220, 26, 540, "#8D9296") + r(x - 14, 220, 54, 14, "#6F7478") + r(x - 14, 746, 54, 14, "#6F7478") + r(x - 2, 560, 30, 40, "#B33A2B")).join("") +
    r(380, 754, 860, 14, "#8E6A40"),

  beam: (u) =>
    room({ back: "#E6E0D5", floor: `url(#${u}ply)`, ceil: "#E3DCCF" }) +
    studs(200, 360, 120, 760) + studs(1240, 1400, 120, 760) +
    // LVL beam in pockets
    r(200, 150, 1200, 110, "#C8A06A") + range(0, 4, 1).map((i) => l(200, 172 + i * 22, 1400, 172 + i * 22, "#A9834F", 3)).join("") +
    t(560, 222, "LVL 3-PLY 1¾ × 11⅞", 26, "#5A4326") +
    r(330, 260, 70, 500, "#C8A06A") + r(1200, 260, 70, 500, "#C8A06A") +
    range(290, 340, 18).map((y) => `<circle cx="365" cy="${y}" r="5" fill="#55524C"/><circle cx="1235" cy="${y}" r="5" fill="#55524C"/>`).join("") +
    paper(u, 660, 470, 300, 220, docLines(690, 520, 240, 4) + stamp(880, 640, "FIELD", "#2F5F8A"), 4) +
    r(560, 720, 300, 20, "#E2B13C") + r(690, 722, 40, 16, "#7FB0C8"),

  firesep: (u) =>
    room({ back: `url(#${u}board)`, floor: `url(#${u}conc)`, ceil: `url(#${u}board)` }) +
    r(820, 120, 580, 640, "#E6E0D5") + studs(820, 1400, 120, 760, 80) +
    range(200, 700, 120).map((y) => r(820, y, 580, 10, "#A7ADB2") + r(820, y + 10, 580, 4, "#8C9296")).join("") +
    r(250, 680, 160, 80, "#E26D9A") + r(250, 680, 160, 14, "#C85A85") +
    r(1020, 300, 220, 140, C.plaster) + t(1036, 340, "TYPE X 5/8″", 22, "#B33A2B", 'font-weight="700"') + t(1036, 372, "RC-1 · 45 min", 20, C.slate) + t(1036, 404, "wk 07", 20, C.slate),

  basement: (u) =>
    room({ back: `url(#${u}conc)`, floor: `url(#${u}conc)`, ceil: "#B9A07A" }) +
    range(140, 1460, 70).map((x) => l(x, 0, 200 + (x - 140) * 0.909, 120, "#8C6E46", 18)).join("") +
    r(200, 120, 1200, 40, "#9C8058") +
    r(560, 130, 520, 70, "#B8BDC0") + l(560, 200, 1080, 200, "#9EA4A8", 4) +
    r(980, 220, 260, 140, "#7A8E95") + r(990, 230, 240, 120, "#9FB3BA") + l(1110, 230, 1110, 350, "#E2DDD5", 6) +
    r(300, 540, 120, 220, "#6E6A63") + `<circle cx="360" cy="520" r="40" fill="#8E8A82"/>` + r(460, 600, 90, 160, "#D9D4C8") +
    p("520,1000 600,880 760,860 840,1000", "#000", 'opacity=".08"'),

  suite: (u) =>
    room({ back: "#EFEBE3", floor: `url(#${u}lvp)`, ceil: "#F4F1EC" }) +
    r(940, 180, 360, 230, "#E6E0D5") + win(960, 200, 320, 190) +
    // kitchenette
    r(220, 400, 420, 130, "#A9B9B1") + r(220, 600, 420, 160, "#A9B9B1") + r(212, 582, 436, 22, "#E9E5DE") + range(230, 600, 140).map((x) => l(x + 140, 610, x + 140, 750, "#8FA197", 3)).join("") +
    r(350, 570, 120, 14, "#6E6A63") + r(500, 420, 110, 90, "#F4F1EC") +
    // sofa and rug
    p("760,1000 1500,1000 1360,860 860,860", "#C9B79A") +
    r(880, 640, 460, 140, "#4F6670") + r(860, 700, 500, 100, "#5B7480") + r(860, 640, 44, 160, "#4F6670") + r(1316, 640, 44, 160, "#4F6670") +
    range(380, 1220, 280).map((x) => `<circle cx="${x}" cy="60" r="16" fill="#FFF7DA"/>`).join(""),

  street: (u) =>
    sky(u, 780) + r(0, 860, 1600, 140, "#B5AEA3") + r(0, 850, 1600, 16, "#D8D2C6") +
    tree(80, 560, 0.9) +
    house(u, 170, 380, { body: `url(#${u}lap)`, storeys: 1, base: 780, door: "#2F4F5F" }) +
    house(u, 640, 400, { body: `url(#${u}fc)`, storeys: 2, base: 780, door: C.clay, trim: "#E9E5DE" }) +
    house(u, 1140, 360, { body: `url(#${u}stucco)`, storeys: 1, base: 780, door: "#6E5638" }) +
    r(700, 700, 10, 120, "#55524C") + r(640, 640, 130, 70, C.plaster) + r(640, 640, 130, 14, C.clay) + t(652, 694, "STONECROFT", 14, C.char, 'font-weight="700"') +
    tree(1560, 580, 0.8),

  "house-before": (u) =>
    sky(u) + tree(1420, 540, 1.1) + house(u, 380, 840, { body: `url(#${u}stucco)`, storeys: 1, door: "#7B6A4C", trim: "#E4DCCB" }) +
    range(0, 6, 1).map((i) => l(420 + i * 130, 560 + (i % 2) * 70, 470 + i * 130, 620 + (i % 2) * 60, "#A89A7C", 3)).join("") +
    r(0, 800, 1600, 200, `url(#${u}grass)`),

  "house-after": (u) => sky(u) + tree(1420, 540, 1.1) + house(u, 380, 840, { body: `url(#${u}fc)`, storeys: 1, door: C.clay, trim: "#E9E5DE" }) + r(0, 800, 1600, 200, `url(#${u}grass)`),

  wrap: (u) =>
    sky(u, 900) +
    r(100, 100, 1400, 800, `url(#${u}wrap)`) + range(130, 1480, 120).map((x) => r(x, 100, 34, 800, C.stud) + r(x + 28, 100, 6, 800, C.studDk, 'opacity=".6"')).join("") +
    r(560, 300, 360, 300, "#3E4448") + r(540, 600, 400, 26, "#9EA4A8") + r(540, 286, 400, 18, "#9EA4A8") +
    r(100, 880, 1400, 20, "#9EA4A8"),

  cladding: (u) =>
    sky(u, 900) +
    r(100, 100, 1400, 800, `url(#${u}wrap)`) + range(130, 1480, 120).map((x) => r(x, 100, 34, 800, C.stud)).join("") +
    r(100, 420, 1400, 480, `url(#${u}fc)`) + r(100, 380, 820, 40, `url(#${u}fc)`) +
    r(100, 412, 1400, 10, "#55524C") +
    // ladder
    `<g transform="rotate(-8 1240 600)">${r(1180, 150, 16, 800, "#C9A24A")}${r(1290, 150, 16, 800, "#C9A24A")}${range(190, 900, 80).map((y) => r(1196, y, 94, 12, "#C9A24A")).join("")}</g>`,

  "window-open": (u) =>
    r(0, 0, 1600, 1000, `url(#${u}wrap)`) + range(40, 1600, 160).map((x) => (x > 420 && x < 1180 ? "" : r(x, 0, 40, 1000, C.stud))).join("") +
    r(460, 180, 680, 620, "#3A3530") + r(470, 190, 660, 600, "#4C463F") + studs(480, 1120, 200, 780, 160) +
    p("440,800 1160,800 1180,840 420,840", "#B6BBBE") + p("420,800 460,800 460,740 420,760", "#B6BBBE") + p("1180,800 1140,800 1140,740 1180,760", "#B6BBBE") +
    r(430, 150, 740, 26, "#9EA4A8") + p("430,176 1170,176 1150,196 450,196", "#7F858A") +
    r(400, 140, 30, 720, "#E8E2D6", 'opacity=".9"') + r(1170, 140, 30, 720, "#E8E2D6", 'opacity=".9"'),

  "window-head": (u) =>
    r(0, 0, 1600, 1000, `url(#${u}wrap)`) +
    win(420, 420, 760, 460, "#2E3438") +
    p("380,370 1220,370 1200,400 400,400", "#8C9296") + r(380, 350, 840, 24, "#A7ADB2") +
    p("300,0 1300,0 1300,360 300,360", `url(#${u}wrap)`) + l(300, 360, 1300, 360, "#B6BBBE", 3) +
    p("300,360 1300,360 1300,380 300,380", "#000", 'opacity=".08"') +
    r(560, 260, 480, 70, "#E9EBEC") + l(560, 260, 1040, 260, "#C9CDD0", 3) + t(600, 304, "LAP: UPPER OVER LOWER", 24, C.slate),

  ledger: (u) =>
    sky(u, 650) + r(0, 0, 1600, 520, `url(#${u}lap)`) + r(0, 500, 1600, 30, "#9EA4A8") +
    r(0, 530, 1600, 120, "#7E6A4C") + range(80, 1560, 160).map((x) => `<circle cx="${x}" cy="565" r="9" fill="#3A3633"/><circle cx="${x + 70}" cy="615" r="9" fill="#3A3633"/>`).join("") +
    range(60, 1600, 200).map((x) => p(`${x},650 ${x + 40},650 ${x + 40 + (x - 800) * 0.6},1000 ${x + (x - 800) * 0.6},1000`, "#9A8058") + r(x - 6, 640, 52, 40, "#9EA4A8")).join(""),

  deck: (u) =>
    sky(u) + r(0, 0, 1600, 560, `url(#${u}lap)`) + win(560, 160, 480, 300, C.plaster) +
    p("0,600 1600,600 1600,1000 0,1000", "#A5835A") + range(600, 1000, 34).map((y) => l(0, y, 1600, y, "#8C6E46", 3)).join("") +
    range(80, 1600, 180).map((x) => r(x, 420, 18, 200, "#2C2926")).join("") + r(0, 410, 1600, 20, "#2C2926") + r(0, 580, 1600, 14, "#2C2926") +
    range(110, 1600, 30).map((x) => l(x, 430, x, 580, "#2C2926", 3)).join(""),

  addition: (u) =>
    sky(u) + tree(1460, 520, 1) +
    house(u, 380, 840, { body: `url(#${u}lap)`, storeys: 1, door: "#2F4F5F" }) +
    r(380, 250, 840, 290, "#E9E5DE", 'opacity=".001"') +
    studs(400, 1200, 270, 540, 70) + p("360,270 800,90 1240,270", "none", `stroke="${C.studDk}" stroke-width="22"`) +
    range(440, 1160, 90).map((x) => l(x, 270, 800, 100 + Math.abs(x - 800) * 0.3, C.stud, 10)).join("") +
    r(360, 252, 880, 22, "#9C8058"),

  office: (u) =>
    sky(u, 860) + r(0, 860, 1600, 140, "#B5AEA3") +
    r(160, 260, 1280, 600, "#C9C3B8") + range(160, 1440, 320).map((x) => l(x, 260, x, 860, "#B1AA9E", 4)).join("") + r(140, 240, 1320, 24, "#9E978B") +
    r(260, 470, 420, 390, "#9EA4A8") + range(490, 850, 30).map((y) => l(260, y, 680, y, "#8C9296", 3)).join("") +
    r(820, 560, 180, 300, "#2E3438") + r(836, 576, 148, 270, "#9FB3BA") + win(1100, 480, 240, 180, "#2E3438") +
    r(780, 330, 520, 100, C.char) + `<text x="812" y="398" font-family="Clash Display, Satoshi, sans-serif" font-size="62" font-weight="600" fill="${C.plaster}">Stonecroft</text>` +
    r(300, 330, 120, 60, C.plaster) + t(312, 370, "UNIT 4", 26, C.char, 'font-weight="700"') +
    scenesVan(1040, 960, 0.75),

  van: (u) => sky(u, 820) + house(u, 260, 760, { body: `url(#${u}stucco)`, storeys: 1, base: 820, door: "#2F4F5F" }) + r(0, 820, 1600, 180, "#A7A196") + tree(1460, 560, 1) + scenesVan(980, 900, 1.05),

  permit: (u) =>
    r(0, 0, 1600, 1000, `url(#${u}lap)`) +
    r(260, 120, 1080, 760, C.plaster) + r(290, 150, 1020, 700, "#9FB3BA") +
    range(150, 520, 26).map((y) => r(290, y, 1020, 18, "#EDE9E2")).join("") + l(800, 150, 800, 850, C.plaster, 14) +
    p("290,850 700,150 900,150 490,850", "#fff", 'opacity=".12"') +
    paper(u, 880, 470, 360, 300, r(880, 470, 360, 70, "#E2B13C") + t(902, 516, "BUILDING PERMIT", 24, C.char, 'font-weight="700"') + docLines(906, 572, 300, 5, 32) + t(906, 750, "BP-2026-01187", 20, C.slate), 2) +
    r(1040, 452, 60, 30, "#E8E2CF", 'opacity=".9" transform="rotate(8 1070 467)"') +
    r(240, 880, 1120, 30, "#D8D2C6"),

  "doc-registry": (u) => desk(u, "BC REGISTRY", "BC1428817", "ACTIVE"),
  "doc-insurance": (u) => desk(u, "CERTIFICATE OF INSURANCE", "CGL · $5,000,000", "IN FORCE"),
  "doc-wsbc": (u) => desk(u, "CLEARANCE LETTER", "Account 4471902", "CLEAR", true),
  "doc-contract": (u) => desk(u, "FIXED-PRICE CONTRACT", "Scope · Price · Schedule", "SIGNED"),

  corridor: (u) =>
    `<g>${r(0, 0, 1600, 1000, "#D9D2C4")}${p("0,0 1600,0 1060,300 540,300", "#ECE8E1")}${p("0,0 540,300 540,680 0,1000", "#CFC7B8")}${p("1600,0 1060,300 1060,680 1600,1000", "#C5BDAD")}${p("540,680 1060,680 1600,1000 0,1000", "#8E8A82")}</g>` +
    r(540, 300, 520, 380, "#E2DDD5") + r(600, 340, 400, 340, `url(#${u}quilt)`) + l(800, 340, 800, 680, "#2E4462", 4) +
    p("540,680 1060,680 1500,1000 100,1000", "#A9A49B") + range(0, 4, 1).map((i) => l(540 - i * 110, 680 + i * 80, 1060 + i * 110, 680 + i * 80, "#E2B13C", 6)).join("") +
    p("0,140 300,250 300,720 0,880", `url(#${u}quilt)`, 'opacity=".9"') +
    r(1020, 360, 30, 40, "#B6BBBE") + range(120, 1500, 460).map((x) => `<circle cx="${x}" cy="60" r="14" fill="#FFF7DA"/>`).join(""),

  moving: (u) =>
    room({ back: "#E9E3D8", floor: `url(#${u}lvp)`, ceil: "#F1EEE8" }) +
    r(1060, 200, 240, 560, "#D5CBBB") + r(1080, 220, 200, 540, "#C9BFAE") + `<circle cx="1250" cy="500" r="8" fill="#8E877C"/>` +
    box(260, 560, 300, 200, "KITCHEN") + box(300, 380, 240, 180, "DISHES") + box(600, 600, 260, 160, "PANTRY") + box(880, 640, 180, 120, "") + box(640, 470, 180, 130, "FRAGILE"),

  "temp-kitchen": (u) =>
    room({ back: "#E8E1D3", floor: `url(#${u}lino)`, ceil: "#ECE6DA" }) +
    r(940, 420, 200, 340, "#F2F0EA") + r(1160, 420, 200, 340, "#F2F0EA") + `<circle cx="1040" cy="610" r="70" fill="#C9CFD2"/><circle cx="1040" cy="610" r="52" fill="#9FB3BA"/>` + `<circle cx="1260" cy="610" r="70" fill="#C9CFD2"/>` +
    r(940, 440, 420, 20, "#DAD6CE") +
    r(260, 560, 560, 24, "#E9E5DE") + r(280, 584, 14, 176, "#8E8A82") + r(786, 584, 14, 176, "#8E8A82") +
    r(300, 430, 220, 130, "#3A3633") + r(316, 446, 150, 98, "#5A5650") + r(480, 452, 26, 80, "#2C2926") +
    r(560, 520, 140, 40, "#2C2926") + `<circle cx="630" cy="540" r="16" fill="#B33A2B" opacity=".6"/>` + r(730, 480, 60, 80, "#E9E5DE") +
    r(260, 300, 560, 16, C.oak) + range(290, 760, 70).map((x) => r(x, 250, 50, 50, x % 140 ? "#F4F1EC" : "#A9B9B1")).join("") +
    r(560, 180, 200, 80, C.plaster) + t(578, 230, "TEMP · wk 01", 22, C.clay, 'font-weight="700"'),

  phone: (u) =>
    scenes.rough(u) + r(0, 0, 1600, 1000, C.plaster, 'opacity=".45"') +
    `<g transform="rotate(-7 800 520)">${r(610, 150, 380, 760, "#1C1B19", 'rx="46"')}${r(630, 190, 340, 680, C.plaster, 'rx="20"')}` +
    t(656, 240, "WEEK 06 · BURNABY", 20, C.slate) +
    `<text x="656" y="292" font-family="Clash Display, Satoshi, sans-serif" font-size="34" font-weight="600" fill="${C.char}">Close-in</text>` +
    range(0, 6, 1).map((i) => r(656 + i * 44, 320, 38, 12, i < 4 ? C.green : i === 4 ? C.clay : "#D4CCC1")).join("") +
    t(656, 400, "$48,200", 40, C.char) + t(656, 432, "of $71,000 · 68%", 18, C.slate) +
    r(656, 466, 288, 90, "#F3E4DC") + t(672, 500, "CO-02 · $2,100", 18, C.clay, 'font-weight="700"') + t(672, 530, "+4 days · contractor", 16, C.slate) +
    docLines(656, 590, 288, 6, 30) + r(656, 790, 288, 52, C.clay) + t(716, 824, "Read the entry", 20, "#fff") + `</g>`,
};

function box(x: number, y: number, w: number, h: number, label: string) {
  return r(x, y, w, h, "#C8A06A") + r(x, y, w, 18, "#B48A58") + r(x + w / 2 - 18, y, 36, h * 0.45, "#D9BE8E", 'opacity=".9"') + (label ? t(x + 20, y + h - 26, label, Math.min(24, w / 9), "#5A4326", 'font-weight="700"') : "");
}

function scenesVan(x: number, base: number, s: number) {
  const w = 520 * s;
  const h = 230 * s;
  const y = base - h - 40 * s;
  return (
    r(x, y, w * 0.72, h, "#F4F3EF") + p(`${x + w * 0.72},${y + h * 0.3} ${x + w * 0.9},${y + h * 0.36} ${x + w},${y + h * 0.7} ${x + w},${y + h} ${x + w * 0.72},${y + h}`, "#ECEAE4") +
    p(`${x + w * 0.74},${y + h * 0.36} ${x + w * 0.88},${y + h * 0.4} ${x + w * 0.96},${y + h * 0.66} ${x + w * 0.74},${y + h * 0.66}`, "#9FB3BA") +
    r(x, y + h * 0.55, w, 18 * s, C.clay) + `<text x="${x + 30 * s}" y="${y + h * 0.42}" font-family="Clash Display, Satoshi, sans-serif" font-size="${40 * s}" font-weight="600" fill="${C.char}">Stonecroft</text>` +
    `<circle cx="${x + w * 0.2}" cy="${y + h + 4}" r="${44 * s}" fill="#2C2926"/><circle cx="${x + w * 0.2}" cy="${y + h + 4}" r="${18 * s}" fill="#9EA4A8"/>` +
    `<circle cx="${x + w * 0.8}" cy="${y + h + 4}" r="${44 * s}" fill="#2C2926"/><circle cx="${x + w * 0.8}" cy="${y + h + 4}" r="${18 * s}" fill="#9EA4A8"/>`
  );
}

function desk(u: string, title: string, sub: string, mark: string, redact = false) {
  return (
    r(0, 0, 1600, 1000, "#B48A58") + range(0, 1000, 90).map((y) => `<path d="M0 ${y + 30} C 400 ${y + 10} 900 ${y + 50} 1600 ${y + 28}" stroke="#A47C4C" stroke-width="3" fill="none"/>`).join("") +
    paper(u, 420, 90, 760, 840,
      t(480, 190, title, 34, C.char, 'font-weight="700" letter-spacing="2"') + t(480, 236, sub, 26, C.slate) + l(480, 262, 1120, 262, C.char, 3) +
      docLines(480, 310, 640, 9) +
      (redact ? r(480, 400, 360, 22, C.char) + r(480, 468, 280, 22, C.char) : "") +
      docLines(480, 640, 420, 4) + l(480, 860, 760, 860, C.char, 2) + `<path d="M500 840 C 540 800 580 870 620 830 S 700 820 740 846" stroke="#2F5F8A" stroke-width="4" fill="none"/>` +
      stamp(1000, 760, mark.padEnd(6).slice(0, 6), mark === "SIGNED" ? C.clay : C.green), -2) +
    r(1260, 640, 30, 300, "#2C2926", 'transform="rotate(28 1275 790)"') + r(1262, 640, 26, 40, C.clay, 'transform="rotate(28 1275 790)"')
  );
}

export function sceneSVG(scene: Scene, uid: string, alt: string): string {
  if (scene.kind === "kitchen") return kitchenSVG(scene.stage, { uid, fit: "xMidYMid slice", alt });
  const u = uid.replace(/[^a-zA-Z0-9_-]/g, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${alt.replace(/"/g, "&quot;")}">${defs(u)}${scenes[scene.kind](u, scene.tone)}</svg>`;
}

/** Small material swatch for the finish selector, keyed by row and level. */
export function swatchSVG(row: string, level: number): string {
  const k = row.toLowerCase();
  const pal = (a: string[]) => a[Math.min(level, a.length - 1)];
  let body = "";
  if (k.includes("cabinet")) body = r(0, 0, 300, 80, pal(["#E9E3D6", "#A9B9B1", "#2E3438"])) + l(150, 0, 150, 80, "#0002", 4) + r(130, 30, 8, 22, pal(["#9C9A96", "#6E6A63", "#C9A24A"])) + r(162, 30, 8, 22, pal(["#9C9A96", "#6E6A63", "#C9A24A"]));
  else if (k.includes("counter")) body = r(0, 0, 300, 80, pal(["#CDBFA8", "#ECE8E1", "#F4F2EE"])) + (level > 0 ? `<path d="M0 50 C 80 30 160 70 300 40" stroke="${level > 1 ? "#9C9A96" : "#D6D2CB"}" stroke-width="${level > 1 ? 3 : 2}" fill="none"/>` : range(0, 300, 18).map((x) => `<circle cx="${x}" cy="${(x * 7) % 80}" r="2" fill="#B5A68C"/>`).join(""));
  else if (k.includes("backsplash")) body = level === 0 ? range(0, 300, 38).map((x) => range(0, 80, 26).map((y) => r(x + 1, y + 1, 36, 24, "#F2F0EA")).join("")).join("") + "" : level === 1 ? range(0, 300, 50).map((x) => range(0, 80, 26).map((y, j) => r(x + (j % 2) * 25 + 1, y + 1, 48, 24, "#E3E8E4")).join("")).join("") : range(0, 300, 20).map((x) => r(x + 1, 0, 18, 80, "#5F7F78")).join("");
  else if (k.includes("floor")) body = range(0, 80, 20).map((y, j) => r(0, y, 300, 20, pal(["#BFA27C", "#C8A272", "#A87F52"])) + l(((j * 97) % 300), y, ((j * 97) % 300), y + 20, "#0003", 3) + l(0, y, 300, y, "#0002", 2)).join("");
  else if (k.includes("plumb")) body = r(0, 0, 300, 80, "#ECE8E1") + r(120, 18, 16, 50, pal(["#B6BBBE", "#8E9296", "#2C2926"])) + r(120, 18, 70, 14, pal(["#B6BBBE", "#8E9296", "#2C2926"]));
  else if (k.includes("hardware")) body = r(0, 0, 300, 80, "#E2DDD5") + r(80, 34, 140, 12, pal(["#B6BBBE", "#2C2926", "#C9A24A"]), 'rx="6"');
  else if (k.includes("light")) body = r(0, 0, 300, 80, "#2C2926") + `<circle cx="150" cy="40" r="${18 + level * 6}" fill="#FFF3C4" opacity=".9"/>` + (level > 0 ? `<circle cx="70" cy="40" r="12" fill="#FFF3C4" opacity=".6"/><circle cx="230" cy="40" r="12" fill="#FFF3C4" opacity=".6"/>` : "");
  else body = r(0, 0, 100, 80, pal(["#EFEBE3", "#E3DCCF", "#C9B79A"])) + r(100, 0, 100, 80, pal(["#E6E0D5", "#A9B9B1", "#4F6670"])) + r(200, 0, 100, 80, pal(["#F4F1EC", "#D9CDB4", "#2E3438"]));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
}
