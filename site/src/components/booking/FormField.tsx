import React, { type ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ id, label, error, hint, className = "", children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[14px] font-medium text-char">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-[13px] text-slate">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-clay-dk">
          <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
            <rect width="10" height="10" fill="#B5512E" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-[2px] border bg-white px-3.5 text-[16px] text-char placeholder:text-slate focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-char transition-colors duration-150 ${
    invalid ? "border-clay" : "border-line-strong"
  }`;
