import React from "react";
import type { Status } from "../types/site";

type Tone = "light" | "dark";

interface StatusMarkProps {
  status: Status;
  label: string;
  tone?: Tone;
  variant?: "plain" | "pill";
  className?: string;
}

const SHAPE_COLOR: Record<Tone, Record<Status, string>> = {
  light: { behind: "#B5512E", "on-schedule": "#4A7C59", complete: "#C89A5E" },
  dark: { behind: "#E08A54", "on-schedule": "#8FBE9D", complete: "#C89A5E" },
};

const TEXT_COLOR: Record<Tone, Record<Status, string>> = {
  light: { behind: "text-clay-dk", "on-schedule": "text-green-dk", complete: "text-oak-dk" },
  dark: { behind: "text-clay-br", "on-schedule": "text-green-br", complete: "text-oak" },
};

const TINT: Record<Status, string> = {
  behind: "bg-clay-tint",
  "on-schedule": "bg-green-lt",
  complete: "bg-oak-lt",
};

export function StatusShape({ status, color, size = 10 }: { status: Status; color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" className="shrink-0">
      {status === "behind" && <rect x="0.5" y="0.5" width="9" height="9" fill={color} />}
      {status === "on-schedule" && <circle cx="5" cy="5" r="4.5" fill={color} />}
      {status === "complete" && <polygon points="0.5,0.5 5,0.5 9.5,5 5,9.5 0.5,9.5 5,5" fill={color} />}
    </svg>
  );
}

export function StatusMark({ status, label, tone = "light", variant = "plain", className = "" }: StatusMarkProps) {
  const pill = variant === "pill" ? `${TINT[status]} px-2 py-1 rounded-[2px]` : "";
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap font-mono text-[12px] font-medium leading-none ${TEXT_COLOR[tone][status]} ${pill} ${className}`}
    >
      <StatusShape status={status} color={SHAPE_COLOR[tone][status]} />
      {label}
    </span>
  );
}
