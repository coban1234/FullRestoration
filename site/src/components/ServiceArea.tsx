import React from "react";
import { phone, regions, slugify } from "../data/site";
import { launchCities } from "../data/cities";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

export function ServiceArea() {
  const total = regions.reduce((n, r) => n + r.places.length, 0);
  return (
    <section id="s07" aria-labelledby="s07-title" className="bg-plaster py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s07-title"
          num="07"
          tab="Area"
          title="Where we work"
          note={
            <>
              <span className="font-mono text-char">{total}</span> municipalities, run out of our Burnaby yard. Just outside the line?
              Call <a href={phone.href} className="font-mono text-char underline underline-offset-4">{phone.display}</a> and we’ll tell
              you straight.
            </>
          }
        />
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[3fr_1fr] lg:gap-12">
          {regions.map((region) => (
            <div key={region.label}>
              <h3 className="flex items-baseline justify-between border-b border-char pb-2 text-[13px] font-medium text-slate">
                {region.label}
                <span className="font-mono text-[12px]">{region.places.length}</span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {region.places.map((place) => (
                  <li key={place}>
                    {launchCities.includes(slugify(place)) ? (
                      <a
                        href={`/service-areas/${slugify(place)}/`}
                        className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-char bg-white px-4 text-[15px] font-medium text-char hover:bg-char hover:text-plaster"
                      >
                        {place} <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <a
                        href={`/book/?city=${encodeURIComponent(place)}&src=home-areas`}
                        aria-label={`Book a site visit in ${place}`}
                        className="inline-flex h-11 items-center rounded-[2px] border border-line bg-white px-4 text-[15px] text-char hover:border-char hover:bg-char hover:text-plaster"
                      >
                        {place}
                      </a>
                    )}
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
