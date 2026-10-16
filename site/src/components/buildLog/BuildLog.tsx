import React from "react";
import { homeEntries } from "../../data/projects";
import { weekOf } from "../../data/site";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { LogEntryCard } from "./LogEntryCard";

export function BuildLog() {
  const [featured, ...rest] = homeEntries();

  return (
    <section id="s02" aria-labelledby="s02-title" className="bg-concrete py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s02-title"
          num="02"
          tab="Build log"
          title="This week on site"
          note={
            <>
              Posted every Friday for the week commencing <span className="font-mono text-char">{weekOf}</span>. The job running late goes
              first.
            </>
          }
        />
        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-12 lg:gap-5">
          <div className="lg:col-span-7 lg:row-span-2">
            <LogEntryCard entry={featured} featured />
          </div>
          {rest.map((entry) => (
            <div key={entry.href} className="lg:col-span-5">
              <LogEntryCard entry={entry} />
            </div>
          ))}
        </div>
        <p className="mt-8">
          <a href="/build-log/" className="btn-secondary w-full sm:w-auto">
            Every live job, every week
          </a>
        </p>
      </Container>
    </section>
  );
}
