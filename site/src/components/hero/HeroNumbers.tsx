import React from "react";
import { heroNumbers, weekOf } from "../../data/site";
import { formatCurrency } from "../../utils/format";
import { StatusMark } from "../StatusMark";

export function HeroNumbers() {
  return (
    <div className="ruled border-t border-line px-5 pb-7 pt-6 md:px-10 lg:col-start-1 lg:row-start-2 lg:border-t-0 lg:pb-8 lg:pl-8 lg:pr-12 lg:pt-0 xl:pl-12 xl:pr-16">
      <div className="flex items-baseline justify-between gap-4 border-b border-char pb-2">
        <h2 className="text-[14px] font-medium text-char">This week’s numbers</h2>
        <p className="font-mono text-[11px] text-slate">w/c {weekOf}</p>
      </div>
      <dl className="grid grid-cols-2 sm:grid-cols-4">
        <div className="border-b border-line py-3 pr-3">
          <dt className="text-[13px] text-slate">Jobs on site</dt>
          <dd className="mt-1.5 font-mono text-[24px] leading-none text-char xl:text-[28px]">{heroNumbers.jobs}</dd>
        </div>
        <div className="border-b border-line py-3 pr-3">
          <dt>
            <StatusMark status="on-schedule" label="On schedule" />
          </dt>
          <dd className="mt-1.5 font-mono text-[24px] leading-none text-char xl:text-[28px]">{heroNumbers.onSchedule}</dd>
        </div>
        <div className="border-b border-line py-3 pr-3">
          <dt>
            <StatusMark status="behind" label="Behind" />
          </dt>
          <dd className="mt-1.5 font-mono text-[24px] leading-none text-char xl:text-[28px]">
            {heroNumbers.behind}
            <span className="ml-2 text-[12px] text-clay-dk">{heroNumbers.behindDays} days</span>
          </dd>
        </div>
        <div className="border-b border-line py-3 pr-3">
          <dt className="text-[13px] text-slate">Spent to date</dt>
          <dd className="mt-1.5 font-mono text-[20px] leading-none text-char xl:text-[22px]">
            {formatCurrency(heroNumbers.spent)}
            <span className="mt-1 block text-[11px] text-slate">of {formatCurrency(heroNumbers.signed)}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
