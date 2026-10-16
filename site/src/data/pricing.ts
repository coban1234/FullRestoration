/** §11 — Pricing to publish. Replace with own contracted figures after three completed jobs per category. */
export const interiorRanges = [
  { scope: "Kitchen — builder finish", range: "$28,000 – $42,000", note: "Stock cabinets, laminate counters, existing layout" },
  { scope: "Kitchen — mid-range", range: "$45,000 – $70,000", note: "Semi-custom cabinets, quartz, porcelain tile, minor layout change" },
  { scope: "Kitchen — high-end", range: "$72,000 – $120,000+", note: "Custom millwork, stone, appliance-driven layout change" },
  { scope: "Bathroom — standard 5'×8'", range: "$20,000 – $35,000", note: "Full tear-out, new waterproofing, tiled shower" },
  { scope: "Bathroom — luxury", range: "$40,000+", note: "Freestanding tub, steam, heated floors, custom glass" },
  { scope: "Whole home — mid-range", range: "$150 – $300 / sq ft" },
  { scope: "Whole home — high-end", range: "$250 – $400+ / sq ft" },
  { scope: "Whole home — total", range: "$150,000 – $500,000+" },
  { scope: "Basement finishing", range: "$50 – $150 / sq ft", note: "A 1,000 sq ft basement: $50,000 – $150,000" },
  { scope: "Legal suite conversion", range: "add 15 – 30%", note: "Fire separation, egress, separate ventilation, parking" },
];

export const kitchenRanges = interiorRanges.slice(0, 3);
export const bathroomRanges = interiorRanges.slice(3, 5);
export const wholeHomeRanges = interiorRanges.slice(5, 8);
export const basementRanges = interiorRanges.slice(8, 10);

export const componentRanges = [
  { scope: "Windows, installed", range: "$1,000 – $1,500 each" },
  { scope: "200-amp panel upgrade", range: "$3,000 – $9,000" },
  { scope: "Whole-home rewire, older house", range: "$15,000 – $40,000+" },
  { scope: "Whole-home plumbing upgrade", range: "$2,000 – $15,000+" },
  { scope: "Hardwood flooring, installed", range: "$9 – $25 / sq ft" },
  { scope: "Engineered hardwood, installed", range: "$3 – $15 / sq ft" },
  { scope: "Laminate flooring, installed", range: "$3 – $8 / sq ft" },
  { scope: "Interior painting", range: "$2 – $6 / sq ft" },
  { scope: "Permits and municipal fees", range: "$1,700 – $5,200", note: "By municipality and scope" },
  { scope: "Design and drawings", range: "5 – 8% of construction" },
  { scope: "Contingency", range: "8% / 12% / 15%", note: "Standard / pre-1980 / structural" },
];

export const factors = [
  { title: "Moving plumbing", impact: "+$2,500 – $9,000", text: "Moving a sink, toilet or shower more than a metre usually means new drain runs through joists, and sometimes a new stack connection." },
  { title: "Removing a load-bearing wall", impact: "+$8,000 – $25,000", text: "Engineer, beam, posts, temporary shoring and an inspection. The opening size and the floor above set the number." },
  { title: "Building age before 1980", impact: "+4% contingency", text: "Knob-and-tube, asbestos and galvanised supply are found after demolition, not before. We carry 12% rather than 8%." },
  { title: "Panel upgrade", impact: "$3,000 – $9,000", text: "Most 1960s–70s houses run 60–100 amp services. Induction ranges and heat pumps need 200." },
  { title: "Finish level", impact: "×0.82 to ×1.75", text: "Builder to custom. Cabinets and counters move the number most, then tile, then fixtures." },
  { title: "Condo or strata building", impact: "+12% – 18%", text: "Elevator booking, restricted hours, common-area protection and strata engineering review. Real costs, not a surcharge." },
  { title: "Layout change", impact: "+10% – 25%", text: "Keeping the footprint is the single biggest saving available. Every moved wall moves electrical, plumbing and the floor." },
  { title: "Municipality", impact: "$1,700 – $5,200 permits", text: "Fees and timelines differ; Burnaby's permit queue is currently the slowest in our area, Langley's the fastest." },
];

export const included = [
  "Demolition and disposal",
  "All labour, ours and our subtrades'",
  "Materials to the stated allowance",
  "Permits and municipal fees",
  "Engineering where required",
  "Site and floor protection",
  "The temporary kitchen, on kitchen jobs",
  "Final clean",
  "Deficiency work",
  "Two-year workmanship and five-year envelope warranty",
];

export const excluded = [
  "Appliances",
  "Furniture and moving",
  "Window coverings",
  "Landscaping restoration beyond the work area",
  "Anything above the allowance — priced as a change order before it is ordered",
  "Client-supplied materials, which we install but cannot warranty",
];

export const draws = [
  { stage: "Deposit at signing", pct: "10%", when: "Holds your start date and pays for permit drawings" },
  { stage: "Demolition complete", pct: "15%", when: "Signed off on site at the week-one walk" },
  { stage: "Rough-in inspection passed", pct: "25%", when: "Municipal inspection card in the window" },
  { stage: "Close-in complete", pct: "20%", when: "Drywall finished, ready for cabinets or tile" },
  { stage: "Substantial completion", pct: "20%", when: "Usable; deficiency list issued" },
  { stage: "Holdback release", pct: "10%", when: "33 days after completion, under BC's Builders Lien Act" },
];

export const notFor = [
  "If you are collecting three quotes to find the lowest, we will not be it.",
  "If you want to skip permits, we cannot work with you.",
  "If your budget is under $20,000, a specialist trade will serve you better than a general contractor.",
  "If you want work started next week, we are the wrong firm — we book two to three weeks out for site visits alone.",
];
