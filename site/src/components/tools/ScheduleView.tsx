import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { dur, permitsVerified, schedules, type ScheduleScope } from "../../data/schedules";

interface Props {
  initial: string;
  selectable?: boolean;
  headingLevel?: "h2" | "h3";
}

function Chart({ s }: { s: ScheduleScope }) {
  const mids = s.stages.map((st) => (st.min + st.max) / 2);
  const span = mids.reduce((a, b) => a + b, 0) + s.stages[s.stages.length - 1].max - mids[mids.length - 1];
  let at = 0;
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Estimated schedule, {s.short}: stage, minimum and maximum duration</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Stage</th>
          <th scope="col">Timeline</th>
          <th scope="col">Duration</th>
        </tr>
      </thead>
      <tbody>
        {s.stages.map((st, i) => {
          const left = (at / span) * 100;
          const wMin = (st.min / span) * 100;
          const wMax = (st.max / span) * 100;
          at += mids[i];
          return (
            <tr key={st.name} className="border-b border-line last:border-b-0">
              <th scope="row" className="w-[38%] py-2.5 pr-3 align-middle text-[14px] font-medium text-char md:w-[26%] md:text-[15px]">
                {st.name}
              </th>
              <td className="hidden py-2.5 align-middle md:table-cell" aria-hidden="true">
                <div className="relative h-3 bg-concrete">
                  <span className="absolute inset-y-0 bg-char" style={{ left: `${left}%`, width: `${wMin}%` }} />
                  <span
                    className="absolute inset-y-0 border-y border-r border-char bg-[repeating-linear-gradient(135deg,transparent_0_3px,#908374_3px_4px)]"
                    style={{ left: `${left + wMin}%`, width: `${Math.max(wMax - wMin, 0.4)}%` }}
                  />
                </div>
              </td>
              <td className="w-[34%] whitespace-nowrap py-2.5 pl-3 text-right align-middle font-mono text-[13px] text-char md:w-[16%] md:text-[14px]">
                {dur(st.min, st.max)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ScheduleView({ initial, selectable = false, headingLevel = "h2" }: Props) {
  const [slug, setSlug] = useState(initial);
  const s = schedules.find((x) => x.slug === slug) ?? schedules[0];
  const H = headingLevel;

  useEffect(() => {
    if (!selectable) return;
    try {
      const saved = sessionStorage.getItem("sc-schedule");
      if (saved && schedules.some((x) => x.slug === saved)) setSlug(saved);
    } catch {
      /* ignore */
    }
  }, [selectable]);

  const choose = (v: string) => {
    setSlug(v);
    try {
      sessionStorage.setItem("sc-schedule", v);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="chamfer border border-line bg-white p-5 md:p-8">
      <div className="flex flex-col gap-4 border-b border-char pb-4 md:flex-row md:items-end md:justify-between">
        <H className="font-mono text-[12px] uppercase tracking-[0.12em] text-slate">Estimated schedule — {s.short}</H>
        {selectable && (
          <label className="block md:w-[300px]">
            <span className="text-[13px] font-medium text-char">Choose a scope</span>
            <span className="relative mt-1 block">
              <select
                value={slug}
                onChange={(e) => choose(e.target.value)}
                className="h-12 w-full appearance-none rounded-[2px] border border-line-strong bg-white px-3.5 pr-10 text-[16px] text-char"
              >
                {schedules.map((x) => (
                  <option key={x.slug} value={x.slug}>
                    {x.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
            </span>
          </label>
        )}
      </div>

      <div className="mt-4" aria-live="polite">
        <Chart s={s} />
        <dl className="mt-5 grid gap-3 border-t border-char pt-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">On site</dt>
            <dd className="mt-1 font-mono text-[22px] text-char">{s.onSite}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">Start to finish (permits included)</dt>
            <dd className="mt-1 font-mono text-[22px] text-char">{s.total}</dd>
          </div>
        </dl>

        <div role="note" aria-label={s.disruption.label} className="chamfer mt-6 border border-clay bg-clay-tint p-5">
          <p className="flex items-center gap-3 font-mono text-[14px] font-semibold uppercase tracking-[0.06em] text-clay-dk">
            <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
              <rect width="10" height="10" fill="#B5512E" />
            </svg>
            {s.disruption.label}
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-char">{s.disruption.text}</p>
        </div>

        <p className="mt-5 text-[14px] leading-relaxed text-slate">
          Permit timelines are the municipality's, not ours. Burnaby is currently the slowest in our service area. Permit timelines verified:{" "}
          <span className="font-mono text-char">{permitsVerified}</span> — see{" "}
          <a href="/permits/#timelines" className="font-medium text-clay-dk underline underline-offset-4">
            each municipality's own page
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="/book/?src=schedule&pos=mid" className="btn-primary sm:whitespace-nowrap">
            Book a site visit
          </a>
          {s.example && (
            <a href={s.example.href} className="btn-secondary sm:whitespace-nowrap">
              {s.example.label} →
            </a>
          )}
          {!selectable && (
            <a href={`/process/schedule/${s.slug}/`} className="inline-flex min-h-[48px] items-center text-[15px] font-medium text-clay-dk underline underline-offset-4">
              Full {s.name.toLowerCase()} schedule
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
