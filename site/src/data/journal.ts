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
    published: "2026-09-25",
    related: [
      { label: "Whole-home renovation", href: "/renovations/whole-home/" },
      { label: "Burnaby kitchen case study", href: "/projects/1968-burnaby-split-level-kitchen/" },
    ],
    body: `
<p>Most of the houses we open in Metro Vancouver were built between 1950 and 1975. They are well framed and usually worth renovating, but forty to seventy years of owners have each left something in the walls. This is what we find, how often, and what it costs when we do.</p>
<h2>Why a 1960s house carries more contingency</h2>
<p>We price pre-1980 houses with a <strong>12% contingency</strong> rather than the 8% we use on newer ones. That is not padding; it is the average of what we have actually spent behind the drywall on houses of this age. Unspent contingency comes back to you on the final invoice.</p>
<h2>Knob-and-tube spliced into newer circuits</h2>
<p>Original knob-and-tube wiring was mostly replaced decades ago, but not always completely. The common finding is a live run in a ceiling bay, spliced into a 1980s circuit, that nobody could see at the site visit. Insurers increasingly refuse it, and an electrician will not sign off a renovated room fed by it.</p>
<p><strong>Typical cost:</strong> <span class="font-mono">$1,500–$4,000</span> per affected area, more if it runs through finished rooms we are not otherwise opening. On our <a href="/projects/1968-burnaby-split-level-kitchen/">Burnaby split-level</a> it was <span class="font-mono">$2,100</span> and four days.</p>
<h2>Galvanised steel supply lines</h2>
<p>Galvanised pipe corrodes from the inside. By now most of it has a fraction of its original bore, which is why the upstairs shower loses pressure when someone runs a tap. We do not connect new fixtures to it. Replacing the supply in the rooms we open is routine; replacing it back to the meter is the better answer if the budget allows.</p>
<p><strong>Typical cost:</strong> <span class="font-mono">$1,200–$3,500</span> for the renovated area; <span class="font-mono">$6,000–$12,000</span> to re-pipe a whole house in PEX.</p>
<h2>Asbestos in the drywall mud, plaster and flooring</h2>
<p>Houses built before about 1990 can contain asbestos in drywall joint compound, textured ceilings, vinyl floor tile and its adhesive, and duct tape on heating ducts. WorkSafeBC requires a hazardous-materials survey before demolition on any house of this age. We order it at signing, so the results are back before the first wall comes down.</p>
<p><strong>Typical cost:</strong> survey <span class="font-mono">$600–$1,100</span>; abatement <span class="font-mono">$1,500–$8,000</span> for a kitchen or bathroom, depending on what is positive. On the Burnaby kitchen abatement was <span class="font-mono">$1,850</span>, paid from contingency.</p>
<h2>Undersized or missing headers</h2>
<p>Earlier renovations sometimes widened an opening without a proper header, or cut a joist to pass a drain. It shows up as a sagging door head or a bouncy floor. Once found, it gets fixed properly, often with an engineer's letter.</p>
<p><strong>Typical cost:</strong> <span class="font-mono">$800–$3,000</span> for a header or sistered joists; more if the fix is a beam.</p>
<h2>Old ducts, no vapour barrier and little insulation</h2>
<p>Walls from this era usually have thin batts or none, and a patchy vapour barrier. Opening a wall is the cheapest time you will ever have to fix it. We price insulating opened exterior walls to current code as part of the scope, not as a surprise.</p>
<h2>What we check at the site visit</h2>
<ul>
<li>The panel: brand, capacity and whether there are any fuses.</li>
<li>The supply line where it enters the house, and at an exposed valve.</li>
<li>The age and texture of ceilings and drywall finish.</li>
<li>Door heads and floors over openings that look like later work.</li>
</ul>
<p>We can find most of these before you sign. The one thing we now do routinely, after the Burnaby job, is ask to open one ceiling bay during the visit. It takes ten minutes and patches in an hour, and it turns the biggest unknown into a priced line.</p>`,
  },
  {
    n: 3,
    slug: "fixed-price-vs-cost-plus",
    title: "Fixed price vs cost-plus: which contract protects you",
    excerpt: "Three contract models, who carries the risk in each, and the clauses to look for.",
    author: "Marta Lindqvist",
    published: "2026-09-11",
    related: [
      { label: "How we work", href: "/process/" },
      { label: "How to read a quote", href: "/journal/how-to-read-a-renovation-quote/" },
    ],
    body: `
<p>The contract decides who pays when something goes wrong. There are three common models in BC renovation, and the right one depends on how well the job can be defined before it starts.</p>
<h2>Fixed price (stipulated sum)</h2>
<p>The contractor agrees to build a defined scope for a defined price. If labour runs long or materials cost more than estimated, the contractor absorbs it. You pay more only through signed change orders.</p>
<p><strong>Who carries the risk:</strong> the contractor, for everything inside the scope.</p>
<p><strong>Where it goes wrong:</strong> a vague scope. A fixed price on "renovate kitchen" fixes nothing, because every disagreement becomes a debate about what was included. A fixed price only protects you when the scope, the allowances and the exclusions are written down.</p>
<h2>Cost-plus (time and materials)</h2>
<p>You pay the actual cost of labour and materials, plus a percentage or a fee for overhead and profit. It is honest about uncertainty, and it is common on jobs where the scope cannot be known until the walls are open.</p>
<p><strong>Who carries the risk:</strong> you. If the job takes longer, you pay for longer.</p>
<p><strong>Where it goes wrong:</strong> a percentage fee rewards a contractor for spending more. If you agree to cost-plus, ask for a fixed fee rather than a percentage, weekly cost reports with invoices attached, and a not-to-exceed figure that triggers a conversation before it is passed.</p>
<h2>Cost-plus with a guaranteed maximum</h2>
<p>A hybrid: you pay actual cost plus fee, up to a ceiling the contractor guarantees. Savings below the ceiling are shared or returned. It suits large jobs where both sides want transparency but you still need a number for the bank.</p>
<p><strong>Who carries the risk:</strong> shared below the ceiling; the contractor above it.</p>
<h2>What we use, and why</h2>
<p>We sign fixed-price contracts for almost everything, with three conditions that make the price mean something:</p>
<ul>
<li><strong>A written scope,</strong> room by room, with allowances for every finish you have not chosen.</li>
<li><strong>A contingency line inside the price,</strong> at 8%, 12% for pre-1980 houses or 15% for structural work. It covers what genuinely cannot be seen, and what is unspent comes back to you.</li>
<li><strong>Change orders with four fields:</strong> cost, days, reason and who asked. <a href="/journal/change-order-vs-overrun/">Why the fourth field matters</a>.</li>
</ul>
<p>Where we cannot define the scope, such as heavy fire or water damage, we say so and propose cost-plus with a fixed fee and a cap.</p>
<h2>Clauses to look for in any model</h2>
<ul>
<li>Payment by completed milestone, not by date, and a deposit no higher than 10–15%.</li>
<li>The 10% Builders Lien Act holdback, held for the statutory period after completion.</li>
<li>Who owns the schedule, and what happens to the price if the contractor is late.</li>
<li>The warranty, in the contract: ours is two years on workmanship and five on the building envelope.</li>
<li>Proof of WorkSafeBC coverage and liability insurance, dated, as an attachment.</li>
</ul>
<p>Whatever the model, if you cannot tell from the contract who pays for a given surprise, ask before you sign. It is a much easier conversation then.</p>`,
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
      { label: "Twelve questions to ask a contractor", href: "/journal/twelve-questions-before-you-sign/" },
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
  {
    n: 7,
    slug: "where-to-live-during-whole-home-renovation",
    title: "Where people live during a whole-home renovation, and what it costs",
    excerpt: "Furnished rentals, family, storage and the dates you need in writing.",
    author: "Daniel Okafor",
    published: "2026-10-16",
    related: [
      { label: "Whole-home renovation", href: "/renovations/whole-home/" },
      { label: "Schedule estimator", href: "/process/" },
    ],
    body: `
<p>You cannot live in a house during a whole-home renovation. With services disconnected, walls open and abatement under way, it is a construction site. For most of our whole-home jobs that means <strong>10 to 16 weeks</strong> living somewhere else. That cost sits outside our contract, but it belongs in your budget.</p>
<h2>The three usual answers</h2>
<h3>A furnished rental</h3>
<p>The most common choice, and the most expensive. Furnished one- and two-bedroom rentals in Metro Vancouver on three- to four-month terms typically run <span class="font-mono">$3,500–$6,500</span> a month, more for a family-sized place near the same school. Over a 14-week job that is <span class="font-mono">$15,000–$30,000</span>.</p>
<p>Ask for a lease with a month-to-month option at the end. Renovations rarely finish early, and the cheapest week is one you do not have to negotiate in a hurry.</p>
<h3>Family or friends</h3>
<p>Free in money and expensive in other ways. It works best when the dates are fixed and short. We have seen it work well for 8 weeks and badly for 16.</p>
<h3>Staying on part of the property</h3>
<p>Occasionally possible when there is a legal suite or a separate laneway house we are not working on, with its own services. We will tell you at the site visit if it is realistic; most of the time it is not.</p>
<h2>Storage and moving</h2>
<p>Everything has to come out, including what is in the closets. Budget for:</p>
<ul>
<li>Movers out and back: <span class="font-mono">$2,500–$5,000</span> for a three-bedroom house.</li>
<li>A storage unit or container: <span class="font-mono">$250–$600</span> a month.</li>
<li>Mail forwarding, address changes and a second trip for what you forgot.</li>
</ul>
<h2>The dates you need in writing</h2>
<p>A rental is only as good as the dates you book it for. Before you sign a lease, you should have from your contractor:</p>
<ol>
<li><strong>A move-out date</strong> tied to the permit being issued, not to a guess.</li>
<li><strong>A move-in date</strong> tied to occupancy sign-off, with the stage schedule behind it.</li>
<li><strong>A weekly update</strong> that tells you whether that date is still good.</li>
</ol>
<p>We give you the move-out and move-in dates at signing and publish a log every week, so you know whether to extend the lease before you have to. If the job is behind, the log says so and says why.</p>
<h2>A worked example</h2>
<p>A family of four, 14-week job, two-bedroom furnished rental at <span class="font-mono">$5,200</span> a month, two moves and a 10-by-15 storage unit: <span class="font-mono">$16,900</span> in rent, <span class="font-mono">$4,000</span> in moving and <span class="font-mono">$1,400</span> in storage, or about <span class="font-mono">$22,300</span> before utilities. Put it in the budget at the start and it is a line. Find it at week six and it is a crisis.</p>`,
  },
  {
    n: 8,
    slug: "bathroom-waterproofing",
    title: "Bathroom waterproofing: the part you can never see again",
    excerpt: "Membranes, flood tests and the photographs you should ask for.",
    author: "Priya Sandhu",
    published: "2026-10-09",
    related: [
      { label: "Bathroom renovation", href: "/renovations/bathrooms/" },
      { label: "Langley bathrooms case study", href: "/projects/1991-langley-townhouse-bathrooms/" },
    ],
    body: `
<p>Tile is not waterproof. Neither is grout. Every shower depends on a layer behind the tile that you will never see again once it is covered. If it is wrong, you find out years later, from the ceiling below.</p>
<h2>What a waterproof shower is made of</h2>
<ul>
<li><strong>A sloped base.</strong> Water has to run to the drain, not sit under the tile. For a curbless shower that means recessing the floor structure, not just thickening the mortar.</li>
<li><strong>A membrane.</strong> Sheet membrane (bonded with thinset) or liquid membrane (painted on in two coats to a measured thickness). Both work when installed to the manufacturer's instructions; both fail when they are not.</li>
<li><strong>Sealed seams, corners and penetrations.</strong> Pre-formed corners, banding over every seam, and collars at the valve and the shower head. Most leaks start here, not in the middle of a wall.</li>
<li><strong>A bonding-flange drain</strong> that clamps or bonds to the membrane, so the waterproof layer is continuous into the drain.</li>
</ul>
<h2>The flood test</h2>
<p>Before tile goes on, we plug the drain and fill the shower base with water to just below the top of the curb or threshold, and leave it for 24 hours. We mark the level at the start and photograph it at the end. If the level has dropped or there is any moisture below, we find the leak and test again.</p>
<p>It costs a day on the schedule. It is the cheapest day on the job.</p>
<h2>Where it goes wrong</h2>
<ul>
<li>Green drywall or cement board treated as if it were waterproof. Cement board is water-resistant; it is not a membrane.</li>
<li>Liquid membrane applied in one thin coat. Ask what thickness the manufacturer requires and how it was checked.</li>
<li>Niches and benches built after the membrane, punched through it, or not slope-to-drain.</li>
<li>Screws through the membrane in the wet zone to hold a glass panel, with no sealing.</li>
</ul>
<h2>The photographs you should ask for</h2>
<p>Because you can never see it again, you should have a record of it. Ask for:</p>
<ol>
<li>The base with the slope visible, before the membrane.</li>
<li>Every corner, seam and penetration after the membrane.</li>
<li>The flood test at the start and at the 24-hour mark, with the water line marked.</li>
<li>The drain connection.</li>
</ol>
<p>We put all four in the weekly log for every bathroom we build, and the membrane is covered by our five-year building-envelope warranty. On our <a href="/projects/1991-langley-townhouse-bathrooms/">Langley townhouse bathrooms</a> you can see each of them, week by week.</p>`,
  },
  {
    n: 9,
    slug: "permit-timelines-compared",
    title: "Permit timelines in Vancouver, Burnaby, Surrey and Langley, compared",
    excerpt: "Dated, sourced and re-checked every quarter.",
    author: "Marta Lindqvist",
    published: "2026-10-01",
    related: [
      { label: "Permits by municipality", href: "/permits/" },
      { label: "Service areas", href: "/service-areas/" },
    ],
    body: `
<p>On most renovations the municipality, not the contractor, controls the longest wait. Here is where the four municipalities we work in most stand, as verified on <time class="font-mono" datetime="2026-09-30">2026-09-30</time>. We re-check every quarter and change the date when we do.</p>
<h2>At a glance</h2>
<table>
<thead><tr><th>Municipality</th><th>Typical permit time</th><th>Typical fees</th></tr></thead>
<tbody>
<tr><td><a href="/service-areas/vancouver/">Vancouver</a></td><td class="font-mono">4–10 weeks</td><td class="font-mono">$2,600–$5,200</td></tr>
<tr><td><a href="/service-areas/burnaby/">Burnaby</a></td><td class="font-mono">6–12 weeks</td><td class="font-mono">$2,400–$4,100</td></tr>
<tr><td><a href="/service-areas/surrey/">Surrey</a></td><td class="font-mono">4–8 weeks</td><td class="font-mono">$2,100–$3,800</td></tr>
<tr><td><a href="/service-areas/langley/">Langley</a></td><td class="font-mono">3–7 weeks</td><td class="font-mono">$1,900–$3,400</td></tr>
</tbody>
</table>
<p>Fees are for a typical kitchen, bathroom or suite scope, including trade permits. Structural work, heritage review and anything that needs a development permit takes longer.</p>
<h2>Vancouver</h2>
<p>Renovation permits go through the City's online portal, and electrical, plumbing and gas permits are separate. Interior alterations with no structural change can qualify for the faster renovation stream, which is why we try hard to keep a kitchen inside its existing walls in Vancouver. Heritage-listed houses add review time.</p>
<h2>Burnaby</h2>
<p>Currently the slowest of the four. Building permits go through Burnaby's portal; plumbing and electrical permits are issued separately, and structural changes need an engineer's letters of assurance. If your job is in Burnaby, we start drawings and the engineer at signing so the application is complete on day one, because an incomplete application goes to the back of the queue.</p>
<h2>Surrey</h2>
<p>Predictable, particularly for suites. Surrey publishes a secondary-suite checklist that we build to line by line, which shortens inspections. East of 192 Street we add a $150 travel line per visit.</p>
<h2>Langley</h2>
<p>The fastest on paper, with one trap: the City of Langley and the Township of Langley are separate municipalities with separate permit offices and rules. We confirm which one applies from the legal address before anything is drawn.</p>
<h2>What you can do to shorten the wait</h2>
<ul>
<li><strong>Decide the layout early.</strong> Changing a drawing after submission can restart the review.</li>
<li><strong>Avoid structural change where you can.</strong> It is the single biggest driver of time in every municipality.</li>
<li><strong>Submit complete.</strong> Survey, engineer's letters and the hazardous-materials report attached, not "to follow".</li>
</ul>
<p>Every figure here is on our <a href="/permits/">permits page</a> with a link to the municipality's own page, so you can check it yourself.</p>`,
  },
  {
    n: 10,
    slug: "twelve-questions-before-you-sign",
    title: "Twelve questions to ask a contractor before you sign",
    excerpt: "Questions with answers you can check, not answers you have to trust.",
    author: "Daniel Okafor",
    published: "2026-08-28",
    related: [
      { label: "Verify our documents", href: "/verify/" },
      { label: "How to read a quote", href: "/journal/how-to-read-a-renovation-quote/" },
    ],
    body: `
<p>Most advice on hiring a contractor tells you to "check references" and "trust your gut". These twelve questions are different: each one has an answer you can check with a document, a phone call or a web page.</p>
<h2>Who they are</h2>
<ol>
<li><strong>What is your legal company name and BC registration number?</strong> Look it up in the BC Registry. The name on the contract should match.</li>
<li><strong>Can I have a WorkSafeBC clearance letter dated this month?</strong> It is free to request from WorkSafeBC and confirms they are registered and paid up. If they are not covered and a worker is hurt on your property, the claim can come to you.</li>
<li><strong>Can I have your liability insurance certificate, naming me?</strong> Look for at least $2 million, and call the broker to confirm it is current.</li>
<li><strong>Who will be on site every day, and what are their tickets?</strong> A name and a Red Seal number, not "our team".</li>
</ol>
<h2>Their work</h2>
<ol start="5">
<li><strong>Can I see a job of the same type and age as mine, finished in the last year?</strong> With the homeowner's phone number, not a gallery.</li>
<li><strong>How many of your last ten jobs finished on schedule, and how late were the others?</strong> A contractor who keeps a log can answer this in a minute.</li>
<li><strong>What went wrong on your last job, and what did it cost?</strong> Everyone has an answer. The good ones tell you without being pushed.</li>
</ol>
<h2>The money</h2>
<ol start="8">
<li><strong>Is the price fixed, and what exactly is excluded?</strong> <a href="/journal/fixed-price-vs-cost-plus/">Fixed price vs cost-plus</a>.</li>
<li><strong>Where is the contingency, and what happens to it if it is not spent?</strong> It should be a line in the price, and unspent contingency should come back to you.</li>
<li><strong>How are change orders priced and approved?</strong> In writing, with cost and days, signed before the work. <a href="/journal/change-order-vs-overrun/">What a change order should contain</a>.</li>
<li><strong>What is the payment schedule?</strong> Milestones, not dates. A deposit over 10–15% is a warning sign, and the 10% lien holdback is yours to keep for the statutory period.</li>
</ol>
<h2>After they leave</h2>
<ol start="12">
<li><strong>What is the warranty, and where is it written?</strong> In the contract. Ours is two years on workmanship and five on the building envelope.</li>
</ol>
<h2>What the answers tell you</h2>
<p>You are not looking for perfect answers. You are looking for a contractor who answers with documents instead of reassurance. We put ours on a <a href="/verify/">verify page</a> so you can check every one before we meet.</p>`,
  },
  {
    n: 11,
    slug: "bc-unregulated-renovation-market",
    title: "What BC's unregulated renovation market means for you as a homeowner",
    excerpt: "Anyone can call themselves a renovator in BC. What that means, and how to protect yourself.",
    author: "Daniel Okafor",
    published: "2026-08-14",
    related: [
      { label: "Twelve questions to ask", href: "/journal/twelve-questions-before-you-sign/" },
      { label: "Verify our documents", href: "/verify/" },
    ],
    body: `
<p>In British Columbia, new homes have to be built by a licensed residential builder and carry home warranty insurance. Renovations do not. There is no provincial licence for a general renovation contractor, which means anyone with a truck can call themselves one tomorrow.</p>
<h2>What is regulated</h2>
<ul>
<li><strong>Specific trades.</strong> Electrical and gas work must be done by licensed contractors under permits overseen by Technical Safety BC. Plumbing must be done under permit, by qualified people.</li>
<li><strong>Permits and inspections.</strong> Your municipality requires permits for structural, plumbing, electrical and most suite work, and inspects it.</li>
<li><strong>Workers' coverage.</strong> Any business with workers must be registered with WorkSafeBC.</li>
<li><strong>A business licence</strong> in the municipality where the work happens.</li>
</ul>
<h2>What is not</h2>
<ul>
<li>Who can run a renovation, coordinate the trades and take your deposit.</li>
<li>Whether the contractor has insurance, a written contract or a warranty.</li>
<li>Whether your deposit is protected if the business closes.</li>
</ul>
<p>New-home warranty insurance does not cover renovations. If a renovation goes wrong, your protection is whatever is written in your contract and whatever the contractor's insurance covers.</p>
<h2>How it goes wrong</h2>
<p>The common stories are depressingly similar: a large deposit, a slow start, a crew that stops turning up, and work done without permits that has to be opened up again when you sell. A contractor who skips the permit is also skipping the inspection that would have caught the problem.</p>
<h2>How to protect yourself</h2>
<ol>
<li><strong>Insist on permits</strong>, pulled in the contractor's name, and see them before work starts.</li>
<li><strong>Check WorkSafeBC and insurance</strong> with documents, not a claim. A clearance letter is free.</li>
<li><strong>Sign a written, fixed-scope contract</strong> with a warranty, a change-order process and a milestone payment schedule.</li>
<li><strong>Keep the deposit small</strong>, 10–15% at most, and keep the 10% Builders Lien Act holdback.</li>
<li><strong>Look for voluntary standards.</strong> Membership of a home builders' association, Red Seal trades on site and a published track record all mean someone has chosen to be accountable.</li>
</ol>
<p>Because nothing requires a renovator to show you any of this, we publish all of ours: registration, WorkSafeBC, insurance, tickets and warranty, each with the date it was last checked, on our <a href="/verify/">verify page</a>.</p>`,
  },
  {
    n: 12,
    slug: "renovations-that-pay-back",
    title: "The five renovations that pay back on resale in this market, and the four that don't",
    excerpt: "Using local sales data, not national averages.",
    author: "Marta Lindqvist",
    published: "2026-07-31",
    related: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Basements & suites", href: "/renovations/basements-and-suites/" },
    ],
    body: `
<p>National "return on renovation" tables are built on US sales and do not describe Metro Vancouver, where land is most of the price and buyers pay for usable space and income. This is what we see in local sales and in conversations with the agents who list the houses we renovate. Treat the figures as ranges, not promises.</p>
<h2>Five that usually pay back</h2>
<h3>1. A legal secondary suite</h3>
<p>The clearest case in this market. A legal suite adds rental income a buyer's lender can count, and it is the renovation most likely to return more than it cost. The word that matters is <em>legal</em>: an unpermitted suite is a disclosure problem, not an asset. <a href="/journal/legal-secondary-suites-compared/">Suite rules by municipality</a>.</p>
<h3>2. A mid-range kitchen in an older house</h3>
<p>Not a high-end one. Taking a dated kitchen to clean, mid-range finishes in the existing footprint (<span class="font-mono">$45,000–$70,000</span>) usually comes back on sale, especially where it is the room that dates the house.</p>
<h3>3. Electrical, plumbing and the panel</h3>
<p>Invisible and unglamorous, but inspectors and insurers find knob-and-tube, galvanised supply and 60-amp panels. Removing them removes a reason for a buyer to discount the offer or walk away. <a href="/journal/inside-the-walls-1960s-vancouver-house/">What we find in the walls</a>.</p>
<h3>4. Envelope and windows</h3>
<p>New cladding and windows on a tired exterior change the listing photograph and the inspection report at once. They return best on houses where the exterior is clearly the weak point.</p>
<h3>5. A second bathroom where there is only one</h3>
<p>A one-bathroom family house is a narrower market. Adding a second bathroom or ensuite inside the existing footprint widens it.</p>
<h2>Four that usually don't</h2>
<h3>1. High-end finishes beyond the neighbourhood</h3>
<p>A <span class="font-mono">$120,000</span> kitchen in a house that sells as land plus a tidy bungalow will not return its cost. Buyers pay for the street first.</p>
<h3>2. Swimming pools</h3>
<p>Expensive to build, expensive to keep, and in this climate a narrow group of buyers wants one.</p>
<h3>3. Very personal design</h3>
<p>Bold tile, a converted garage gym, a bedroom turned into a walk-in closet. Do them because you want them, not for resale.</p>
<h3>4. Unpermitted work of any kind</h3>
<p>It can cost more at sale than it cost to build, through price reductions, holdbacks or lost buyers.</p>
<h2>The honest caveat</h2>
<p>If you are selling within two years, renovate for the sale: the suite, the systems, the obvious weak room. If you are staying ten years, renovate for yourself and treat the resale value as a bonus. Either way, our <a href="/pricing/estimator/">budget estimator</a> will tell you what it costs before you decide.</p>`,
  },
];

export const publishedArticles = articles.filter((a) => a.body && a.published);
