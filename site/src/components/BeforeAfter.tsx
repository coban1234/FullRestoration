import React, { useEffect, useRef, useState } from "react";
import { KitchenArt } from "./KitchenArt";
import { SceneArt } from "./SceneArt";

type Side = { stage?: number; label: string };

interface BeforeAfterProps {
  uid: string;
  before: Side;
  after: Side;
  caption: string;
}

function Pane({ side, uid }: { side: Side; uid: string }) {
  if (side.stage !== undefined) return <KitchenArt stage={side.stage} uid={uid} alt={side.label} className="absolute inset-0" />;
  return <SceneArt label={side.label} uid={uid} className="absolute inset-0" />;
}

const Chip = ({ children, right }: { children: string; right?: boolean }) => (
  <span className={`absolute top-3 z-10 bg-char/80 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-plaster ${right ? "right-3" : "left-3"}`}>
    {children}
  </span>
);

/** INT-2. Range input drives a clip-path; vertical swipes still scroll the page. */
export function BeforeAfter({ uid, before, after, caption }: BeforeAfterProps) {
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => setReady(true), []);

  const fromPointer = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))));
  };

  if (!ready) {
    return (
      <figure>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Before", before],
            ["After", after],
          ].map(([l, s]) => (
            <div key={l as string} className="relative aspect-[4/3] overflow-hidden border border-line bg-concrete">
              <Chip>{l as string}</Chip>
              <Pane side={s as Side} uid={`${uid}${l}`} />
            </div>
          ))}
        </div>
        <figcaption className="mt-2.5 font-mono text-[11px] text-slate">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[4/3] select-none overflow-hidden border border-line bg-concrete"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Pane side={after} uid={`${uid}a`} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Pane side={before} uid={`${uid}b`} />
        </div>
        <Chip>Before</Chip>
        <Chip right>After</Chip>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[2px] bg-plaster" style={{ left: `calc(${pos}% - 1px)` }}>
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2px] border border-char bg-plaster">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="#1C1A18" strokeWidth="1.6">
              <path d="M6 1 1 6l5 5M12 1l5 5-5 5" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.shiftKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
              e.preventDefault();
              setPos((p) => Math.min(100, Math.max(0, p + (e.key === "ArrowRight" ? 20 : -20))));
            }
          }}
          step={5}
          aria-label="Reveal before or after"
          aria-valuetext={`showing ${100 - pos}% after`}
          className="ba-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-[11px] text-slate">{caption}</figcaption>
    </figure>
  );
}
