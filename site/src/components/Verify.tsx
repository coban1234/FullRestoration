import React from "react";
import { CheckIcon, DownloadIcon } from "lucide-react";
import { credentials } from "../data/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

export function Verify() {
  return (
    <section id="s06" aria-labelledby="s06-title" className="bg-char py-16 text-plaster md:py-24">
      <Container>
        <SectionHeading
          id="s06-title"
          num="06"
          tab="Verify"
          title="Check us"
          tone="dark"
          note="Don’t take our word for any of this. Every number below is on a public record, re-checked on the date shown."
        />

        <ul className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2 md:gap-4">
          {credentials.map((c) => (
            <li key={c.label} className="chamfer chamfer-dark flex flex-col border border-slate bg-char-lt p-5 md:p-7">
              <p className="text-[14px] text-mist">{c.label}</p>
              <p className="mt-3 break-words font-mono text-[26px] leading-none text-plaster md:text-[32px]">{c.value}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{c.detail}</p>
              <div className="mt-auto pt-6">
                <p className="flex items-center gap-2 border-t border-slate pt-4 text-[13px] text-plaster">
                  <CheckIcon className="h-4 w-4 text-mist" aria-hidden="true" />
                  Verified <span className="font-mono text-mist">{c.verified}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <a
            href="/verify/#pack"
            className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-[2px] border border-mist px-5 text-[16px] font-medium text-plaster transition-colors duration-150 hover:bg-plaster hover:text-char"
          >
            <DownloadIcon className="h-4 w-4" aria-hidden="true" />
            Download the PDF pack
            <span className="font-mono text-[12px] text-mist">4 docs · 2.1 MB</span>
          </a>
          <p className="text-[14px] text-mist">Registration letter, WSBC clearance, insurance certificate, warranty terms.</p>
        </div>
      </Container>
    </section>
  );
}
