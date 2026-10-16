import React from "react";
import { pricing, pricingReviewed } from "../data/site";
import type { PriceRow } from "../types/site";
import { formatCurrency } from "../utils/format";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const UNIT_LABEL: Record<PriceRow["unit"], string> = {
  project: "per project",
  sqft: "per sq ft",
};

function RangeBar({ row }: { row: PriceRow }) {
  const left = (row.low / row.scaleMax) * 100;
  const width = ((row.high - row.low) / row.scaleMax) * 100;
  return (
    <div className="relative h-2 w-full bg-concrete" aria-hidden="true">
      <span className="absolute inset-y-0 bg-char" style={{ left: `${left}%`, width: `${width}%` }} />
      <span
        className="absolute top-1/2 h-0 w-[8%] -translate-y-1/2 border-t-2 border-dotted border-char"
        style={{ left: `${left + width}%` }}
      />
    </div>
  );
}

export function Pricing() {
  return (
    <section id="s04" aria-labelledby="s04-title" className="bg-concrete py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s04-title"
          num="04"
          tab="Costs"
          title="What it costs"
          note="These are the ranges we actually contract at in this market. Your range depends on scope, finish and what the building is hiding."
        />

        {/* Desktop / tablet table */}
        <div className="chamfer mt-10 hidden border border-line bg-white md:mt-14 md:block">
          <table className="w-full text-left">
            <caption className="sr-only">Typical renovation cost ranges</caption>
            <thead>
              <tr className="border-b border-char text-[13px] text-slate">
                <th scope="col" className="py-3 pl-7 font-medium">Project</th>
                <th scope="col" className="py-3 font-medium">From</th>
                <th scope="col" className="py-3 font-medium">To</th>
                <th scope="col" className="py-3 font-medium">Basis</th>
                <th scope="col" className="w-[30%] py-3 pr-7 font-medium">Range</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr key={row.project} className="border-b border-line last:border-b-0">
                  <th scope="row" className="py-5 pl-7 font-display text-[22px] font-medium text-char">
                    {row.project}
                  </th>
                  <td className="py-5 font-mono text-[18px] text-char">{formatCurrency(row.low)}</td>
                  <td className="py-5 font-mono text-[18px] text-char">{formatCurrency(row.high)}+</td>
                  <td className="py-5 text-[15px] text-slate">{UNIT_LABEL[row.unit]}</td>
                  <td className="py-5 pr-7">
                    <RangeBar row={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards — every column kept */}
        <ul className="mt-10 grid gap-3 md:hidden">
          {pricing.map((row) => (
            <li key={row.project} className="chamfer border border-line bg-white p-5">
              <h3 className="font-display text-[22px] font-medium text-char">{row.project}</h3>
              <dl className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <dt className="text-[12px] text-slate">From</dt>
                  <dd className="mt-1 font-mono text-[15px] text-char">{formatCurrency(row.low)}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-slate">To</dt>
                  <dd className="mt-1 font-mono text-[15px] text-char">{formatCurrency(row.high)}+</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-slate">Basis</dt>
                  <dd className="mt-1 text-[14px] text-char">{UNIT_LABEL[row.unit]}</dd>
                </div>
              </dl>
              <div className="mt-4">
                <p className="sr-only">Range</p>
                <RangeBar row={row} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-slate">
            Ranges reviewed <span className="font-mono text-char">{pricingReviewed}</span>. All figures exclude{" "}
            <span className="font-mono text-char">5%</span> GST. Bars are drawn to scale within each basis.
          </p>
          <a
            href="/pricing/estimator/"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-[2px] border border-char px-6 text-[16px] font-medium text-char transition-colors duration-150 hover:bg-char hover:text-plaster"
          >
            Get a budget range
          </a>
        </div>
      </Container>
    </section>
  );
}
