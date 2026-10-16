import React from "react";
import { finishedJobs } from "../data/site";
import { formatCurrency } from "../utils/format";
import { Container } from "./Container";
import { Polaroid } from "./Polaroid";
import { SectionHeading } from "./SectionHeading";
import { StatusMark } from "./StatusMark";

export function FinishedJobs() {
  return (
    <section id="s05" aria-labelledby="s05-title" className="bg-plaster py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s05-title"
          num="05"
          tab="Finished"
          title="Two finished jobs"
          note="Signed price against final price, planned weeks against actual. One went over. We show it anyway."
        />

        <div className="mt-6 md:mt-10">
          {finishedJobs.map((job, i) => {
            const diff = job.final - job.signed;
            const over = diff > 0;
            const weeksLate = job.weeksActual - job.weeksPlanned;
            return (
              <article
                key={job.id}
                aria-labelledby={`${job.id}-title`}
                className="grid gap-8 border-b border-line py-10 last:border-b-0 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <Polaroid
                  stage={job.stage}
                  uid={`fj${i}`}
                  alt={job.alt}
                  caption={job.caption}
                  tilt={i % 2 === 0 ? "left" : "right"}
                  className="mx-auto w-full max-w-[400px] md:col-span-5 lg:col-span-4"
                />
                <div className="md:col-span-7 lg:col-span-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[14px] text-slate">
                      {job.place} · built <span className="font-mono">{job.built}</span>
                    </p>
                    <StatusMark status="complete" label="Complete" variant="pill" />
                  </div>
                  <h3
                    id={`${job.id}-title`}
                    className="mt-3 font-display text-[28px] font-medium leading-[1.08] text-char md:text-[40px]"
                  >
                    {job.title}
                  </h3>

                  <dl className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Signed</dt>
                      <dd className="mt-1 font-mono text-[19px] text-char md:text-[22px]">{formatCurrency(job.signed)}</dd>
                    </div>
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Final</dt>
                      <dd className="mt-1 font-mono text-[19px] text-char md:text-[22px]">{formatCurrency(job.final)}</dd>
                    </div>
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Difference</dt>
                      <dd className={`mt-1 font-mono text-[19px] md:text-[22px] ${over ? "text-clay-dk" : "text-green-dk"}`}>
                        {over ? "+" : "−"}
                        {formatCurrency(diff)}
                        <span className="ml-1.5 font-sans text-[13px]">{over ? "over" : "under"}</span>
                      </dd>
                    </div>
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Weeks planned</dt>
                      <dd className="mt-1 font-mono text-[19px] text-char md:text-[22px]">{job.weeksPlanned}</dd>
                    </div>
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Weeks actual</dt>
                      <dd className="mt-1 font-mono text-[19px] text-char md:text-[22px]">{job.weeksActual}</dd>
                    </div>
                    <div className="border-b border-r border-line bg-white p-4">
                      <dt className="text-[13px] text-slate">Schedule</dt>
                      <dd className="mt-2">
                        {weeksLate > 0 ? (
                          <StatusMark status="behind" label={`${weeksLate} weeks late`} />
                        ) : (
                          <StatusMark status="on-schedule" label="On schedule" />
                        )}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 max-w-[60ch] border-l border-line-strong pl-4 text-[15px] leading-relaxed text-slate">{job.note}</p>
                  <a href={`/projects/${job.slug}/`} className="mt-6 inline-flex min-h-[44px] items-center text-[15px] font-medium text-char underline underline-offset-4 hover:text-clay-dk">
                    Read the case study and full log
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4">
          <a href="/projects/" className="btn-secondary w-full sm:w-auto">
            All finished projects, with final costs
          </a>
        </p>
      </Container>
    </section>
  );
}
