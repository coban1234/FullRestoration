import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import { kitchenStages } from "../../data/site";
import { KitchenArt } from "../KitchenArt";

interface KitchenStagesProps {
  stage: number;
  onSelect: (index: number) => void;
  skipTo?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function KitchenStages({ stage, onSelect, skipTo = "#s01" }: KitchenStagesProps) {
  const reduce = useReducedMotion();
  const current = kitchenStages[stage];
  const progress = stage / (kitchenStages.length - 1);
  const last = kitchenStages[kitchenStages.length - 1];

  return (
    <div className="flex min-h-0 flex-col justify-center gap-5 border-t border-line px-4 pb-6 pt-8 md:px-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-l lg:border-t-0 lg:px-10 lg:py-6 xl:px-14">
      <figure className="relative mx-auto w-full lg:max-w-[min(100%,calc((100svh-24rem)*1.333))]">
        <span aria-hidden="true" className="absolute -top-3 left-6 z-10 h-6 w-20 -rotate-6 border border-line bg-concrete" />
        <span aria-hidden="true" className="absolute -top-3 right-6 z-10 h-6 w-20 rotate-[5deg] border border-line bg-concrete" />

        <div className="border border-line bg-white p-2.5 md:p-3 lg:-rotate-[0.6deg]">
          {/* measured dimension line */}
          <div aria-hidden="true" className="flex items-center gap-2 font-mono text-[10px] text-slate">
            <span className="h-2.5 w-px bg-slate" />
            <span className="h-px flex-1 bg-slate" />
            <span>3 660 mm</span>
            <span className="h-px flex-1 bg-slate" />
            <span className="h-2.5 w-px bg-slate" />
          </div>

          <div className="relative mt-2 aspect-[4/3] overflow-hidden bg-concrete">
            {kitchenStages.map((s, i) => (
              <div
                key={s.week}
                className="absolute inset-0 transition-opacity duration-300 ease-out"
                style={{ opacity: i === stage ? 1 : 0 }}
              >
                <KitchenArt stage={s.stage} uid={`hero${i}`} alt={s.alt} decorative={i !== stage} className="h-full w-full" />
              </div>
            ))}
            <span className="absolute left-0 top-0 bg-char px-2 py-1 font-mono text-[11px] text-plaster">
              wk {current.week}
            </span>
          </div>

          <figcaption className="px-0.5 pb-1 pt-3" aria-live="polite">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[11px] text-slate">
              <span>Fig. 1 — Burnaby, 1968</span>
              <span>
                Week {current.week} / {last.week}
              </span>
            </div>
            <motion.div
              key={stage}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-display text-[20px] font-medium leading-tight text-char md:text-[22px]">{current.name}</p>
                <p className="font-mono text-[12px] text-char">{current.spend}</p>
              </div>
              <p className="mt-1 min-h-[2.8em] text-[14px] leading-snug text-slate">{current.note}</p>
            </motion.div>
          </figcaption>
        </div>
      </figure>

      <div className="mx-auto w-full lg:max-w-[min(100%,calc((100svh-24rem)*1.333))]">
        <ol aria-label="Renovation stages" className="relative grid grid-cols-5">
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[18px] h-px bg-line-strong" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[10%] top-[18px] h-px w-[80%] origin-left bg-char"
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          />
          {kitchenStages.map((s, i) => {
            const isCurrent = i === stage;
            const done = i <= stage;
            return (
              <li key={s.week} className="relative flex justify-center">
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Week ${s.week}: ${s.name}`}
                  className="flex min-h-[56px] w-full flex-col items-center pt-2"
                >
                  <span className="flex h-5 items-end">
                    <span
                      className={`block transition-[height,background-color] duration-150 ease-out ${
                        isCurrent ? "h-5 w-[3px] bg-char" : done ? "h-3 w-0.5 bg-char" : "h-3 w-0.5 bg-line-strong"
                      }`}
                    />
                  </span>
                  <span className={`mt-1.5 font-mono text-[11px] ${isCurrent ? "text-char" : "text-slate"}`}>wk {s.week}</span>
                  <span
                    className={`whitespace-nowrap text-[11px] leading-tight sm:text-[13px] ${
                      isCurrent ? "font-medium text-char" : "text-slate"
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-line">
          <p className="font-mono text-[11px] text-slate">
            <span className="lg:hidden">Scroll or tap a stage</span>
            <span className="hidden lg:inline">Scroll to rebuild the kitchen</span>
          </p>
          <a
            href={skipTo}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-char underline underline-offset-4 hover:text-clay-dk"
          >
            Skip to content
            <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
