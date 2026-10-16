import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { exteriorLinks, navLinks, phone, renovationLinks } from "../../data/site";
import type { NavLink } from "../../types/site";

type MenuId = "renovations" | "exterior" | null;

const MENUS: { id: Exclude<MenuId, null>; label: string; links: NavLink[]; all: NavLink }[] = [
  { id: "renovations", label: "Renovations", links: renovationLinks, all: { label: "All interior renovation", href: "/renovations/" } },
  { id: "exterior", label: "Exterior", links: exteriorLinks, all: { label: "All exterior work", href: "/exterior/" } },
];

const extraDesktop: NavLink[] = [{ label: "Additions", href: "/additions/" }];

export function Header({ current = "/" }: { current?: string }) {
  const [menu, setMenu] = useState<MenuId>(null);
  const [drawer, setDrawer] = useState(false);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menu) {
        triggers.current[menu]?.focus();
        setMenu(null);
      }
      if (drawer) {
        setDrawer(false);
        drawerBtn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!menu) return;
      const t = e.target as HTMLElement;
      if (!t.closest("[data-menu]")) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [menu, drawer]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    if (!drawer) return;
    const root = drawerRef.current;
    const focusables = () => [...(root?.querySelectorAll<HTMLElement>("a,button") || [])];
    focusables()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root?.addEventListener("keydown", trap);
    return () => root?.removeEventListener("keydown", trap);
  }, [drawer]);

  const isCurrent = (href: string) => current === href || (href !== "/" && current.startsWith(href));

  return (
    <header className="hdr sticky top-0 z-40 border-b border-line">
      <div className="mx-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between gap-6 px-5 md:px-8 lg:h-[72px] lg:pl-10 lg:pr-20">
        <a href="/" className="font-display text-[22px] font-semibold tracking-[-0.01em] text-char">
          Stonecroft
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            {MENUS.map((m) => (
              <li key={m.id} className="relative" data-menu>
                <button
                  ref={(el) => (triggers.current[m.id] = el)}
                  type="button"
                  aria-expanded={menu === m.id}
                  aria-controls={`menu-${m.id}`}
                  onClick={() => setMenu((v) => (v === m.id ? null : m.id))}
                  className={`inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap text-[15px] font-medium hover:text-clay-dk ${
                    isCurrent(m.all.href) ? "text-clay-dk" : "text-char"
                  }`}
                >
                  {m.label}
                  <ChevronDownIcon aria-hidden="true" className={`h-4 w-4 transition-transform duration-150 ${menu === m.id ? "rotate-180" : ""}`} />
                </button>
                <div
                  id={`menu-${m.id}`}
                  hidden={menu !== m.id}
                  className="absolute left-0 top-full mt-3 w-72 border border-char bg-plaster p-2"
                >
                  <ul>
                    {m.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          aria-current={current === l.href ? "page" : undefined}
                          className="flex min-h-[44px] items-center border-b border-line px-3 text-[15px] text-char hover:bg-concrete"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href={m.all.href} className="flex min-h-[44px] items-center px-3 text-[14px] font-medium text-clay-dk underline underline-offset-4">
                        {m.all.label} →
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
            {[...extraDesktop, ...navLinks].map((link) => (
              <li key={link.href} className={link.href === "/additions/" ? "hidden 2xl:block" : ""}>
                <a
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={`whitespace-nowrap text-[15px] font-medium underline-offset-[6px] transition-colors duration-150 hover:text-clay-dk hover:underline ${
                    isCurrent(link.href) ? "text-clay-dk underline" : "text-char"
                  }`}
                >
                  {link.label === "Build log" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green" />
                      Build log
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={phone.href} className="hidden whitespace-nowrap font-mono text-[14px] text-char hover:text-clay-dk xl:inline">
            {phone.display}
          </a>
          <a
            href="/book/"
            className="inline-flex h-11 items-center whitespace-nowrap rounded-[2px] border border-char px-4 text-[15px] font-medium text-char transition-colors duration-150 hover:bg-char hover:text-plaster"
          >
            Book a site visit
          </a>
        </div>

        <button
          ref={drawerBtn}
          type="button"
          onClick={() => setDrawer(true)}
          aria-expanded={drawer}
          aria-controls="mobile-menu"
          className="inline-flex h-11 min-w-[76px] items-center justify-center rounded-[2px] border border-char px-4 text-[15px] font-medium text-char lg:hidden"
        >
          Menu
        </button>
      </div>

      {drawer && (
        <div
          id="mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-plaster lg:hidden"
        >
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-line px-5">
            <a href="/" className="font-display text-[22px] font-semibold text-char">
              Stonecroft
            </a>
            <button
              type="button"
              onClick={() => {
                setDrawer(false);
                drawerBtn.current?.focus();
              }}
              className="inline-flex h-11 min-w-[76px] items-center justify-center rounded-[2px] border border-char px-4 text-[15px] font-medium text-char"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5 pb-6 pt-2">
            {MENUS.map((m) => (
              <div key={m.id}>
                <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-slate">{m.label}</p>
                <ul className="mt-1 border-t border-char">
                  {[...m.links, { label: m.id === "renovations" ? "All interior" : "All exterior", href: m.all.href }].map((l) => (
                    <li key={l.href} className="border-b border-line">
                      <a href={l.href} className="flex min-h-[52px] items-center font-display text-[22px] font-medium text-char">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-slate">The record</p>
            <ul className="mt-1 border-t border-char">
              {[
                { label: "Additions & structural", href: "/additions/" },
                { label: "General contracting", href: "/general-contracting/" },
                ...navLinks,
                { label: "Process", href: "/process/" },
                { label: "Permits", href: "/permits/" },
                { label: "About", href: "/about/" },
                { label: "Contact", href: "/contact/" },
              ].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a href={l.href} className="flex min-h-[52px] items-center font-display text-[22px] font-medium text-char">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sticky bottom-0 grid gap-3 border-t border-line bg-plaster px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
            <a href="/book/" className="inline-flex h-12 items-center justify-center rounded-[2px] bg-clay px-5 text-[16px] font-medium text-white">
              Book a site visit
            </a>
            <a
              href={phone.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] border border-char px-5 text-[16px] font-medium text-char"
            >
              Call <span className="font-mono">{phone.display}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
