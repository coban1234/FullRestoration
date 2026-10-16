export interface Article {
  slug: string;
  n: number;
  title: string;
  excerpt: string;
  author: string;
  published?: string;
  modified?: string;
  scheduled?: string;
  body?: string;
  related?: { label: string; href: string }[];
}

/** §7.19 launch list, in priority order. Unpublished articles are listed with their scheduled date and not linked. */
export const articles: Article[] = [
  {
    n: 1,
    slug: "kitchen-renovation-cost-vancouver-2026",
    title: "What a kitchen renovation actually costs in Vancouver in 2026 (with real invoices)",
    excerpt: "Three finished kitchens, their signed prices and their final invoices — line by line, including the one that went over.",
    author: "Daniel Okafor",
    published: "2026-10-02",
    related: [
      { label: "Kitchen renovation", href: "/renovations/kitchens/" },
      { label: "Budget estimator", href: "/pricing/estimator/" },
    ],
    body: `
<p>Every kitchen renovation article on the internet gives you a range. This one does too — <strong>$28,000 to $120,000+</strong> in Metro Vancouver in 2026 — but it also shows you three real invoices from kitchens we finished this year, so you can see where the money actually went.</p>
<h2>The three bands</h2>
<p>Builder-finish kitchens run <span class="font-mono">$28,000–$42,000</span>: stock cabinets, laminate counters, the existing layout. Mid-range is <span class="font-mono">$45,000–$70,000</span>: semi-custom cabinets, quartz, porcelain tile and usually one minor layout change. High-end starts around <span class="font-mono">$72,000</span> and goes past <span class="font-mono">$120,000</span> with custom millwork, stone and a layout driven by appliances.</p>
<p>Those are the ranges we contract at. They exclude 5% GST, and they include permits, the temporary kitchen, disposal and a contingency line — which a lot of quotes leave out.</p>
<h2>Invoice one: Richmond townhouse, $38,500</h2>
<p>A 1986 strata townhouse kitchen, same layout, builder-to-mid finishes. Signed at <span class="font-mono">$38,500</span>, finished at <span class="font-mono">$38,500</span>, one week late because the counter fabricator slipped. Roughly: cabinets and hardware 31%, counters 12%, labour 34%, electrical and plumbing 11%, flooring 6%, permits, disposal and protection 6%.</p>
<p>The week's delay cost the owners nothing, because it was ours to manage. It is <a href="/projects/1986-richmond-townhouse-kitchen/log/week-6/">in the log as week 06</a>.</p>
<h2>Invoice two: East Vancouver bungalow, $53,100</h2>
<p>A 1957 bungalow, footprint kept, a new header at the dining-room doorway and a 200-amp service for induction. Signed at <span class="font-mono">$52,000</span>; one client-requested change order (pantry pull-out and two pot lights, <span class="font-mono">$1,100</span>) took it to <span class="font-mono">$53,100</span>. On schedule at nine weeks.</p>
<p>The panel upgrade was <span class="font-mono">$6,400</span> of that — the line most people do not see coming in a 1950s house.</p>
<h2>Invoice three: Burnaby split-level, $74,400</h2>
<p>This is the one that went over. A 1968 split-level, galley opened to the dining room with a beam, plus the main bathroom. Signed at <span class="font-mono">$71,000</span> and eleven weeks. Finished at <span class="font-mono">$74,400</span> and thirteen weeks.</p>
<ul>
<li><strong>CO-01, $2,100, contractor-identified, +4 days</strong> — live knob-and-tube in the kitchen ceiling bay, not visible at the site visit.</li>
<li><strong>CO-02, $1,300, client-requested, +6 days</strong> — counters upgraded from laminate to quartz.</li>
</ul>
<p>Of the $3,400 overage, $2,100 was ours to find and $1,300 was a choice. The difference matters, which is why every change order in our log says who asked for it. The asbestos abatement (<span class="font-mono">$1,850</span>) came out of the 12% pre-1980 contingency, not the client's pocket. <a href="/projects/1968-burnaby-split-level-kitchen/">The full case study</a> has every week.</p>
<h2>What moves the number</h2>
<ul>
<li><strong>Layout.</strong> Keeping the footprint is the biggest saving available; moving a sink more than a metre is $2,500–$9,000.</li>
<li><strong>Walls.</strong> A load-bearing wall adds $8,000–$25,000 with the engineer and beam.</li>
<li><strong>Age.</strong> Pre-1980 houses carry 12% contingency rather than 8%.</li>
<li><strong>Building.</strong> Condo and strata work costs 12–18% more for real access and approval costs.</li>
</ul>
<h2>How to use this</h2>
<p>Take the band that matches your finish, adjust for layout and age, and add GST. Or answer five questions in our <a href="/pricing/estimator/">budget estimator</a>, which does the same arithmetic with contingency as its own line and shows you the range before it asks for anything.</p>`,
  },
  {
    n: 2,
    slug: "inside-the-walls-1960s-vancouver-house",
    title: "What's inside the walls of a 1960s Vancouver house",
    excerpt: "Knob-and-tube spliced into newer circuits, galvanised supply, asbestos in the mud — and what each costs when you find it.",
    author: "Sean Whitford",
    scheduled: "2026-10-30",
  },
  {
    n: 3,
    slug: "fixed-price-vs-cost-plus",
    title: "Fixed price vs cost-plus: which contract protects you",
    excerpt: "Three contract models, who carries the risk in each, and the clauses to look for.",
    author: "Marta Lindqvist",
    scheduled: "2026-11-13",
  },
  {
    n: 4,
    slug: "how-to-read-a-renovation-quote",
    title: "How to read a renovation quote, line by line",
    excerpt: "Allowances, exclusions, contingency and the draw schedule — what should be on the page and what its absence means.",
    author: "Marta Lindqvist",
    published: "2026-09-18",
    related: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Twelve questions to ask a contractor", href: "/journal/" },
    ],
    body: `
<p>If you are holding a renovation quote right now, this article is for you. Here is what a good one contains, in the order you should read it, and what it means when a line is missing.</p>
<h2>1. The scope — in words, not a total</h2>
<p>A quote should describe what will be built, room by room: "remove and dispose of existing kitchen cabinets, counters and flooring to subfloor; supply and install…". If the scope is one line — "kitchen renovation, $55,000" — you have no way to know what is included, and neither will the contractor when you disagree later.</p>
<h2>2. Allowances</h2>
<p>An allowance is a budget for something you have not chosen yet: "tile, $12–18 per sq ft supplied". Check three things: that every finish item has one, that the figure is realistic against a showroom, and what happens above and below it. A good contract says overages are a change order priced before ordering, and underages are a credit.</p>
<p>Unrealistically low allowances are the most common way a low quote becomes a high final bill. If the cabinet allowance is $6,000 for a 150 sq ft kitchen, the quote is not cheap — it is incomplete.</p>
<h2>3. Exclusions</h2>
<p>Read the exclusions as carefully as the inclusions. Appliances, window coverings and furniture are normally excluded. Permits, disposal, engineering, the temporary kitchen and final cleaning should normally be <em>included</em>. If they are excluded, add them before comparing quotes.</p>
<h2>4. Contingency</h2>
<p>Every renovation finds something. A quote with no contingency is not telling you the job will go smoothly; it is telling you the surprise will be billed as an extra. Look for a contingency line — 8% standard, 12% for pre-1980 houses, 15% for structural work — included in the total, with unspent contingency returned.</p>
<h2>5. Change-order terms</h2>
<p>The quote or contract should say how changes are priced, that they are written and signed before work proceeds, and that each states its cost and schedule impact. <a href="/journal/change-order-vs-overrun/">How to tell a change order from an overrun</a>.</p>
<h2>6. The schedule</h2>
<p>Not just a start date: stage durations, and how long you lose the room. If a quote promises a kitchen in three weeks, ask what is being skipped.</p>
<h2>7. The draw schedule and holdback</h2>
<p>Payments should follow completed milestones, not dates. A deposit over 10–15% before any work is a warning sign. BC's Builders Lien Act requires the owner to hold back 10% for 33 days after completion; a contractor who asks you to ignore that is asking you to take on their subtrades' risk.</p>
<h2>8. Who is doing the work</h2>
<p>The quote should name the site lead and the subtrades, or say when they will be named. "Licensed trades" is not a name.</p>
<h2>9. Insurance, WorkSafeBC and warranty</h2>
<p>Ask for the documents, not the claim: a WorkSafeBC clearance letter dated this month, a liability certificate, and the warranty terms in writing. <a href="/verify/">Ours are here</a>.</p>
<h2>Comparing two quotes</h2>
<p>Put them side by side on the same lines: scope, allowances, exclusions, contingency, schedule. Add what is excluded from each. The cheaper quote is very often the one with the most exclusions.</p>`,
  },
  {
    n: 5,
    slug: "legal-secondary-suites-compared",
    title: "Legal secondary suites compared across six Fraser Valley municipalities",
    excerpt: "Vancouver, Burnaby, Surrey, Langley, Abbotsford and Chilliwack: parking, licensing, inspections and what suites rent for.",
    author: "Priya Sandhu",
    published: "2026-09-04",
    related: [
      { label: "Basements & suites", href: "/renovations/basements-and-suites/" },
      { label: "Permits by municipality", href: "/permits/#timelines" },
    ],
    body: `
<p>A legal secondary suite is one of the few renovations in this market with a clear financial case. It is also the one where the rules differ most between municipalities. Here is how six of them compare, as verified on 2026-09-30.</p>
<h2>What every municipality requires</h2>
<p>Under the BC Building Code (or Vancouver's own by-law), a suite needs: minimum ceiling heights, egress windows from every bedroom, fire separation between units, smoke alarms interconnected across both units, and separate ventilation or heating so smoke cannot travel between them. Those are the same everywhere. What differs is zoning, parking, licensing and fees.</p>
<h2>Vancouver</h2>
<p>Suites are permitted in most residential zones. No additional parking is required. A business licence is needed to rent. Vancouver builds to its own Vancouver Building By-law, which has some suite-specific provisions.</p>
<h2>Burnaby</h2>
<p>Permitted in most single-family zones, with one additional off-street space. Burnaby's permit queue is currently the slowest in our area, so start design early.</p>
<h2>Surrey</h2>
<p>Permitted, with a published suite checklist we build to line by line. One additional parking space; an annual secondary-suite utility fee applies.</p>
<h2>Langley</h2>
<p>The City and Township are separate municipalities with separate rules. The Township permits suites outside some Agricultural Land Reserve lots and requires a business licence.</p>
<h2>Abbotsford and Chilliwack</h2>
<p>Both permit suites in most zones with one extra parking space. Abbotsford requires suite registration.</p>
<h2>What suites rent for</h2>
<p>We deliberately do not publish a rent calculator; it would be guessing. Use current listings for your neighbourhood and suite size, discount them for vacancy, and compare against the cost of making the suite legal — typically 15–30% more than finishing the basement as ordinary living space.</p>
<h2>The cost of not doing it legally</h2>
<p>A suite that is finished but not legal cannot be insured as a suite, cannot be declared as income to a lender, and is a disclosure problem when you sell. The legal version costs more once; the illegal one keeps costing.</p>
<p><a href="/projects/1979-surrey-rancher-legal-suite/">Our Surrey suite</a> passed inspection first time at $87,400 in ten weeks. The <a href="/projects/1989-langley-basement-suite/log/">Langley suite</a> is on site now.</p>`,
  },
  {
    n: 6,
    slug: "change-order-vs-overrun",
    title: "What a change order is, and how to tell it from an overrun",
    excerpt: "Four fields — cost, days, reason, who asked — separate a legitimate change from a contractor's mistake billed to you.",
    author: "Marta Lindqvist",
    published: "2026-08-21",
    related: [
      { label: "Change-order policy", href: "/process/#change-orders" },
      { label: "Burnaby kitchen case study", href: "/projects/1968-burnaby-split-level-kitchen/" },
    ],
    body: `
<p>Every renovation changes. The question is not whether there will be change orders, but whether you can tell the legitimate ones from overruns being passed on to you.</p>
<h2>A change order has four fields</h2>
<ol>
<li><strong>Cost</strong> — a number, before the work, not "time and materials".</li>
<li><strong>Schedule impact</strong> — in days. Zero is a valid answer; "minimal" is not.</li>
<li><strong>Reason</strong> — what changed and why.</li>
<li><strong>Who requested it</strong> — you, or the contractor.</li>
</ol>
<p>That fourth field is the one most contractors leave out, and it is the one that matters.</p>
<h2>Three kinds of change</h2>
<p><strong>Client-requested.</strong> You chose quartz instead of laminate. It costs more and it is your decision. Fair.</p>
<p><strong>Contractor-identified, unforeseeable.</strong> We opened a ceiling and found live knob-and-tube that was not visible at the site visit. Removing it is necessary and could not reasonably have been priced. Fair — and this is what contingency is for.</p>
<p><strong>Contractor error or omission.</strong> The contractor forgot to price the range hood vent, or under-ordered tile. That is an overrun, and it is not yours to pay.</p>
<h2>How to tell them apart</h2>
<ul>
<li>Was it visible or reasonably predictable at the site visit? If yes, it should have been priced.</li>
<li>Is it in the scope already, under a different description? Read the scope.</li>
<li>Was it photographed and shown to you before the work? It should have been.</li>
<li>Did you sign it before the work proceeded? If not, you did not agree to it.</li>
</ul>
<h2>An example from our own log</h2>
<p>On our <a href="/projects/1968-burnaby-split-level-kitchen/">Burnaby kitchen</a>, CO-01 was $2,100 and four days to remove knob-and-tube hidden in a ceiling bay — contractor-identified. CO-02 was $1,300 and six days for a quartz upgrade — client-requested. In our "what we would do differently" note we admit we should have opened one ceiling bay at the site visit. That is the honest test: a good contractor will tell you which of their change orders they could have avoided.</p>`,
  },
  { n: 7, slug: "where-to-live-during-whole-home-renovation", title: "Where people live during a whole-home renovation, and what it costs", excerpt: "Furnished rentals, family, storage and the dates you need in writing.", author: "Daniel Okafor", scheduled: "2026-11-27" },
  { n: 8, slug: "bathroom-waterproofing", title: "Bathroom waterproofing: the part you can never see again", excerpt: "Membranes, flood tests and the photographs you should ask for.", author: "Priya Sandhu", scheduled: "2026-12-11" },
  { n: 9, slug: "permit-timelines-compared", title: "Permit timelines in Vancouver, Burnaby, Surrey and Langley, compared", excerpt: "Dated, sourced and re-checked every quarter.", author: "Marta Lindqvist", scheduled: "2027-01-08" },
  { n: 10, slug: "twelve-questions-before-you-sign", title: "Twelve questions to ask a contractor before you sign", excerpt: "Questions with answers you can check, not answers you have to trust.", author: "Daniel Okafor", scheduled: "2027-01-22" },
  { n: 11, slug: "bc-unregulated-renovation-market", title: "What BC's unregulated renovation market means for you as a homeowner", excerpt: "Anyone can call themselves a renovator in BC. What that means, and how to protect yourself.", author: "Daniel Okafor", scheduled: "2027-02-05" },
  { n: 12, slug: "renovations-that-pay-back", title: "The five renovations that pay back on resale in this market, and the four that don't", excerpt: "Using local sales data, not national averages.", author: "Marta Lindqvist", scheduled: "2027-02-19" },
];

export const publishedArticles = articles.filter((a) => a.body && a.published);
