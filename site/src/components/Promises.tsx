import React from "react";
import { promises } from "../data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

export function Promises() {
  return (
    <section id="s01" aria-labelledby="s01-title" className="bg-plaster py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s01-title"
          num="01"
          tab="The promise"
          title="Four things, every job."
          note="Each one is a clause in your contract, not a line in a brochure."
        />
        <ul className="mt-10 grid grid-cols-2 border-l border-t border-line md:mt-14 lg:grid-cols-4">
          {promises.map((p) => (
            <li key={p.key} className="flex flex-col border-b border-r border-line p-3.5 sm:p-5 md:p-7 lg:min-h-[280px]">
              <span className="font-mono text-[11px] text-slate md:text-[12px]">{p.key}</span>
              <p className="mt-5 font-display text-[16px] font-medium leading-[1.25] text-char min-[400px]:text-[17px] md:text-[22px] lg:mt-auto lg:text-[24px]">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
