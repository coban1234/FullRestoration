import React, { useEffect, useState } from "react";
import { PhoneIcon } from "lucide-react";
import { phone } from "../../data/site";

/** Fixed bottom bar below lg. Hidden while a form field has focus, and while any `hideWhileVisible` element is on screen. */
export function MobileActionBar({ hideWhileVisible = [] }: { hideWhileVisible?: string[] }) {
  const [typing, setTyping] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input, select, textarea");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  useEffect(() => {
    const els = hideWhileVisible.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setCovered([...seen.values()].some(Boolean));
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [hideWhileVisible.join(",")]);

  const hidden = typing || covered;

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-white px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 transition-transform duration-200 ease-out lg:hidden ${
        hidden ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href={phone.href}
        tabIndex={hidden ? -1 : 0}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-clay text-[16px] font-medium text-white"
      >
        <PhoneIcon className="h-4 w-4" aria-hidden="true" />
        Call
      </a>
      <a
        href="/book/"
        tabIndex={hidden ? -1 : 0}
        className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[2px] border border-char text-[15px] font-medium text-char min-[360px]:text-[16px]"
      >
        Book a site visit
      </a>
    </div>
  );
}
