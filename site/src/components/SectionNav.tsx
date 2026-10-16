import React, { useEffect, useRef } from "react";
import { sectionIndex } from "../data/site";

interface SectionNavProps {
  active: string | null;
  railVisible: boolean;
}

/** Mobile: sticky horizontal tab bar. Desktop: sticky tabs along the page edge. */
export function SectionNav({ active, railVisible }: SectionNavProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const item = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!item) return;
    const target = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(target, 0), behavior: "smooth" });
  }, [active]);

  return (
    <>
      <nav aria-label="Section index" className="sticky top-[60px] z-30 border-b border-line bg-plaster lg:hidden">
        <ul ref={listRef} className="no-scrollbar flex overflow-x-auto px-2">
          {sectionIndex.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} data-id={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex h-11 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 text-[14px] transition-colors duration-150 ${
                    isActive ? "border-char font-medium text-char" : "border-transparent text-slate"
                  }`}
                >
                  <span className="font-mono text-[12px]">{s.num}</span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        aria-label="Section index"
        aria-hidden={!railVisible}
        className={`fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-200 ease-out lg:block [@media(max-height:700px)]:!hidden ${
          railVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {sectionIndex.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  tabIndex={railVisible ? 0 : -1}
                  aria-label={`${s.num} ${s.label}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex w-10 flex-col items-center gap-2 rounded-l-[2px] border border-r-0 py-3 transition-[transform,background-color,color] duration-150 ease-out ${
                    isActive
                      ? "-translate-x-1.5 border-char bg-char text-plaster"
                      : "border-line bg-concrete text-char hover:-translate-x-1"
                  }`}
                >
                  <span className="font-mono text-[11px]">{s.num}</span>
                  <span className="vertical-label text-[12px] font-medium">{s.short}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
