import React, { useRef } from "react";
import { kitchenStages, weekOf } from "../../data/site";
import { useStageScroll } from "../../hooks/useStageScroll";
import { HeroNumbers } from "./HeroNumbers";
import { KitchenStages } from "./KitchenStages";

export function Hero({ variant = "home" }: { variant?: "home" | "embedded" }) {
  const embedded = variant === "embedded";
  const sectionRef = useRef<HTMLElement>(null);
  const Heading = embedded ? "h2" : "h1";
  const { stage, goTo } = useStageScroll(sectionRef, kitchenStages.length);

  return (
    <section id={embedded ? "sequence" : "hero"} ref={sectionRef} aria-labelledby="hero-title" className="relative bg-concrete max-lg:min-h-[110svh] lg:h-[150svh]">
      <div className="lg:sticky lg:top-[72px] lg:h-[calc(100svh-72px)]">
        <div className="mx-auto h-full w-full max-w-[1280px] px-3 py-3 md:px-8 md:py-6 lg:pl-10 lg:pr-20">
          <div className={`relative grid h-full border border-line bg-plaster lg:grid-cols-2 ${embedded ? "" : "lg:grid-rows-[minmax(0,1fr)_auto]"}`}>
            {/* notebook spine */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-2 -translate-x-1/2 border-x border-line bg-concrete lg:block" />

            <div className="ruled flex min-h-0 flex-col px-5 pb-8 pt-4 md:px-10 lg:col-start-1 lg:row-start-1 lg:pb-6 lg:pl-8 lg:pr-12 lg:pt-6 xl:pl-12 xl:pr-16">
              <div className="flex items-center justify-between gap-4 border-b border-line pb-3 font-mono text-[11px] text-slate">
                <span>{embedded ? "03 / One kitchen, five stages" : "Stonecroft · field notebook"}</span>
                <span>{weekOf}</span>
              </div>

              <div className="mt-8 lg:my-auto lg:pt-6">
                <Heading
                  id="hero-title"
                  className="max-w-[14ch] font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.015em] text-char min-[360px]:text-[34px] min-[400px]:text-[38px] md:text-[60px] lg:text-[48px] xl:text-[60px] 2xl:text-[66px]"
                >
                  {embedded ? "One kitchen, five stages." : "See what week three actually looks like."}
                </Heading>
                <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-slate md:text-[19px] lg:text-[17px] xl:text-[19px]">
                  {embedded
                    ? "The same 1968 Burnaby kitchen from one marked camera position, week 00 to handover. Scroll, or tap a stage."
                    : "Full interior and exterior renovation, Vancouver and the Fraser Valley. Fixed price. Published weekly."}
                </p>
                {!embedded && (
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/book/"
                      className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[2px] bg-clay px-6 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-clay-dk"
                    >
                      Book a site visit
                    </a>
                    <a
                      href="/pricing/estimator/"
                      className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[2px] border border-char px-6 text-[16px] font-medium text-char transition-colors duration-150 hover:bg-char hover:text-plaster"
                    >
                      Get a budget range
                    </a>
                  </div>
                )}
              </div>
            </div>

            <KitchenStages stage={stage} onSelect={goTo} skipTo={embedded ? "#stages" : "#s01"} />
            {!embedded && <HeroNumbers />}
          </div>
        </div>
      </div>
    </section>
  );
}
