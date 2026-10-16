import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { STAGE_RAIL, money, pad2, type FlatEntry } from "../../data/projects";
import type { Status } from "../../types/site";
import { percentOf } from "../../utils/format";
import { StatusMark } from "../StatusMark";

interface LogEntryCardProps {
  entry: FlatEntry;
  featured?: boolean;
  showProject?: boolean;
  headingLevel?: "h2" | "h3";
}

const CURRENT_FILL: Record<Status, string> = {
  behind: "bg-clay",
  "on-schedule": "bg-green",
  complete: "bg-oak",
};

const railIndex = (stage: string) => {
  const s = stage.toLowerCase();
  const i = STAGE_RAIL.findIndex((r) => r.toLowerCase() === s || s.startsWith(r.toLowerCase().split(" ")[0]));
  return i < 0 ? 0 : i;
};

export function LogEntryCard({ entry, featured = false, showProject = true, headingLevel = "h3" }: LogEntryCardProps) {
  const p = entry.project;
  const pct = percentOf(entry.spent, p.signed);
  const idx = railIndex(entry.stage);
  const H = headingLevel;

  return (
    <article className="chamfer flex h-full flex-col border border-line bg-white p-5 md:p-7">
      <header className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <span className="text-[14px] text-slate">
          {showProject ? (
            <>
              {p.municipality} · <span className="font-mono">{p.vintage}</span> {p.scope.toLowerCase()}
            </>
          ) : (
            <time className="font-mono" dateTime={entry.date}>
              {entry.date}
            </time>
          )}
        </span>
        <span className="font-mono text-[12px] text-slate">
          Week <span className="text-char">{pad2(entry.week)}</span>
          {showProject && p.live && <span className="hidden sm:inline"> / {pad2(p.weeksPlanned)}</span>}
        </span>
      </header>

      <H className={`mt-5 font-display font-medium leading-[1.08] text-char ${featured ? "text-[28px] md:text-[40px]" : "text-[22px] md:text-[26px]"}`}>
        <a href={entry.href} className="hover:underline hover:decoration-1 hover:underline-offset-4">
          {entry.title}
        </a>
      </H>

      <div className="mt-4">
        <StatusMark status={entry.status} label={entry.statusLabel} variant="pill" />
      </div>

      <div className="mt-6">
        <p className="text-[13px] text-slate">
          Stage: <span className="font-medium text-char">{entry.stage}</span>
        </p>
        <ol className="mt-2 grid grid-cols-7 gap-1" aria-label={`Stage ${idx + 1} of ${STAGE_RAIL.length}`}>
          {STAGE_RAIL.map((name, i) => {
            const isCurrent = i === idx;
            const isDone = i < idx || (isCurrent && entry.status === "complete");
            const fill = isCurrent ? CURRENT_FILL[entry.status] : isDone ? "bg-char" : "bg-concrete";
            return (
              <li key={name} title={name}>
                <span className={`block h-1.5 ${fill}`} />
                <span className="sr-only">
                  {name}
                  {isCurrent ? " (current)" : isDone ? " (done)" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className={`font-mono leading-none text-char ${featured ? "text-[28px] md:text-[36px]" : "text-[22px]"}`}>{money(entry.spent)}</p>
          <p className="font-mono text-[12px] text-slate">
            of {money(p.signed)} · {pct}%
          </p>
        </div>
        <div className="mt-3 h-2 w-full bg-concrete" role="img" aria-label={`Spent ${money(entry.spent)} of ${money(p.signed)} signed`}>
          <div className={`h-full ${entry.spent > p.signed ? "bg-clay" : "bg-char"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>

      {(featured || entry.changeOrder) && (
        <div className="mt-6 space-y-3">
          {entry.changeOrder && (
            <p className="inline-block border-l-2 border-clay pl-3 font-mono text-[12px] text-clay-dk">{entry.changeOrder}</p>
          )}
          {featured && <p className="text-[15px] leading-relaxed text-char">{entry.body[0]}</p>}
        </div>
      )}

      <a
        href={entry.href}
        className="group mt-auto inline-flex min-h-[44px] items-center gap-2 pt-6 text-[15px] font-medium text-char underline-offset-4 hover:underline"
      >
        Read the week <span className="font-mono">{pad2(entry.week)}</span> entry
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </article>
  );
}
