import React, { useMemo } from "react";
import { kitchenSVG, STAGES } from "../lib/kitchen";

interface KitchenArtProps {
  stage: number;
  uid?: string;
  alt?: string;
  className?: string;
  decorative?: boolean;
}

/** Illustrated stand-in for site photography (spec §5.4: no stock or AI imagery). */
export function KitchenArt({ stage, uid, alt, className = "", decorative = false }: KitchenArtProps) {
  const id = uid ?? `k${stage}`;
  const svg = useMemo(() => kitchenSVG(stage, { uid: id, fit: "xMidYMid slice", alt: alt ?? STAGES[stage].alt }), [stage, id, alt]);
  return (
    <div
      className={`[&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      aria-hidden={decorative || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
