import React from "react";
import { KitchenArt } from "./KitchenArt";
import { SceneArt } from "./SceneArt";

interface PolaroidProps {
  stage?: number;
  uid?: string;
  alt: string;
  caption: string;
  tilt?: "left" | "right";
  className?: string;
}

/** Taped print. With a kitchen stage it shows the illustration; without one it shows a labelled photo slot. */
export function Polaroid({ stage, uid, alt, caption, tilt = "left", className = "" }: PolaroidProps) {
  return (
    <figure className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 border border-line bg-concrete" />
      <div className={`border border-line bg-white p-2.5 ${tilt === "left" ? "md:-rotate-1" : "md:rotate-1"}`}>
        <div className="aspect-square overflow-hidden bg-concrete">
          {stage !== undefined ? (
            <KitchenArt stage={stage} uid={uid} alt={alt} className="h-full w-full" />
          ) : (
            <SceneArt label={alt.replace(/^Photo slot:\s*/i, "")} uid={uid ?? "pol"} className="h-full w-full" />
          )}
        </div>
        <figcaption className="px-0.5 pb-1 pt-3 font-mono text-[11px] leading-snug text-slate">{caption}</figcaption>
      </div>
    </figure>
  );
}
