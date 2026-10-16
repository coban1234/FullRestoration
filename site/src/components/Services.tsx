import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { serviceGroups } from "../data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="s03" aria-labelledby="s03-title" className="bg-plaster py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s03-title"
          num="03"
          tab="Index"
          title="What we build"
          note="One crew, one contract. We run the trades ourselves rather than handing you a list of numbers."
        />
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-8">
          {serviceGroups.map((group) => (
            <div key={group.label}>
              <h3 className="border-b border-char pb-2 text-[13px] font-medium text-slate">{group.label}</h3>
              <ul>
                {group.services.map((service) => (
                  <li key={service.name} className="border-b border-line">
                    <a
                      href={service.path}
                      className="group flex min-h-[64px] items-center justify-between gap-4 py-3 text-char transition-colors duration-150 hover:text-clay-dk"
                    >
                      <span>
                        <span className="block font-display text-[21px] font-medium leading-tight md:text-[24px]">{service.name}</span>
                        {service.note && <span className="mt-1 block text-[14px] leading-snug text-slate">{service.note}</span>}
                      </span>
                      <ArrowRightIcon
                        className="h-5 w-5 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
