import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 1024px)";
const HEADER_DESKTOP = 72;

function getRange(el: HTMLElement): number {
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
  if (isDesktop) {
    // Sticky spread: scrub across the extra height of the section.
    return Math.max(el.offsetHeight - (window.innerHeight - HEADER_DESKTOP), 1);
  }
  return Math.max(el.offsetHeight * 0.5, 1);
}

export function useStageScroll(ref: RefObject<HTMLElement>, count: number) {
  const [stage, setStage] = useState(0);
  const manualAt = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      if (manualAt.current !== null) {
        if (Math.abs(window.scrollY - manualAt.current) < 48) return;
        manualAt.current = null;
      }
      const rect = el.getBoundingClientRect();
      const offset = window.matchMedia(DESKTOP_QUERY).matches ? HEADER_DESKTOP : 0;
      const progress = Math.min(Math.max((offset - rect.top) / getRange(el), 0), 1);
      setStage(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, count]);

  const goTo = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return;
      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      if (!isDesktop) {
        // On a single page, tapping a stage swaps the image in place.
        manualAt.current = window.scrollY;
        setStage(index);
        return;
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sectionTop = window.scrollY + el.getBoundingClientRect().top - HEADER_DESKTOP;
      const target = sectionTop + getRange(el) * ((index + 0.5) / count);
      setStage(index);
      window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    },
    [ref, count]
  );

  return { stage, goTo };
}
