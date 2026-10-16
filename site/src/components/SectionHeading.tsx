import React, { type ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  num: string;
  tab: string;
  title: string;
  note?: ReactNode;
  tone?: "light" | "dark";
}

export function SectionHeading({ id, num, tab, title, note, tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`border-t ${dark ? "border-mist" : "border-char"}`}>
      <span
        className={`inline-flex h-8 items-center gap-2 px-3 text-[13px] font-medium ${
          dark ? "bg-plaster text-char" : "bg-char text-plaster"
        }`}
      >
        <span className="font-mono text-[12px]">{num}</span>
        <span aria-hidden="true" className={dark ? "text-slate" : "text-mist"}>
          /
        </span>
        {tab}
      </span>
      <div className="mt-6 grid gap-5 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          id={id}
          className="font-display text-[34px] font-semibold leading-[1.04] tracking-[-0.01em] md:text-[48px] lg:col-span-8 lg:text-[56px]"
        >
          {title}
        </h2>
        {note && (
          <div
            className={`border-l pl-4 text-[15px] leading-relaxed lg:col-span-4 ${
              dark ? "border-slate text-mist" : "border-line-strong text-slate"
            }`}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
