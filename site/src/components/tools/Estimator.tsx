import React, { useEffect, useRef, useState } from "react";
import {
  BUILDING_LABEL,
  FINISH_LABEL,
  SCOPE_LABEL,
  SIZE_LABEL,
  estimate,
  fmtRange,
  type Building,
  type EstimateInput,
  type Finish,
  type Pre1980,
  type Rates,
  type Scope,
  type Size,
} from "../../lib/estimate";
import { FORM_ACTION } from "../../lib/submit";

interface Props {
  rates: Rates;
  municipalities: string[];
}

const SCOPES: Scope[] = ["kitchen", "bathroom", "wholehome", "basement", "exterior", "addition"];
const STEPS = ["What are you renovating?", "How big?", "Finish level", "Your building", "Where?"];

const Row = ({ children, checked }: { children: React.ReactNode; checked: boolean }) => (
  <span
    className={`flex min-h-[56px] w-full cursor-pointer items-center gap-4 border px-4 py-3 text-[16px] transition-colors duration-100 ${
      checked ? "border-char bg-plaster" : "border-line bg-white hover:border-line-strong"
    }`}
  >
    {children}
  </span>
);

const Box = ({ on, round }: { on: boolean; round?: boolean }) => (
  <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center border border-char ${round ? "rounded-full" : "rounded-[2px]"} ${on ? "bg-char" : "bg-white"}`}>
    {on && (round ? <span className="h-2 w-2 rounded-full bg-plaster" /> : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F4F1EC" strokeWidth="2"><path d="m2 6 3 3 5-6" /></svg>)}
  </span>
);

export function Estimator({ rates, municipalities }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState<EstimateInput>({
    scopes: [],
    sizes: { kitchen: "medium", bathroom: "medium" },
    sqft: { wholehome: 2000, basement: 900 },
    finish: "mid",
    building: "detached",
    pre1980: "unsure",
    municipality: "",
  });
  const legend = useRef<HTMLLegendElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent">("idle");
  const started = useRef(false);

  useEffect(() => {
    if (done) result.current?.focus();
    else if (started.current) legend.current?.focus();
    started.current = true;
  }, [step, done]);

  const set = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setInput((s) => ({ ...s, [k]: v }));
  const toggleScope = (s: Scope) => set("scopes", input.scopes.includes(s) ? input.scopes.filter((x) => x !== s) : [...input.scopes, s]);

  const validate = () => {
    if (step === 0 && !input.scopes.length) return "Choose at least one.";
    if (step === 4 && !input.municipality) return "Choose your municipality.";
    return "";
  };
  const next = () => {
    const e = validate();
    setError(e);
    if (e) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setDone(true);
      try {
        sessionStorage.setItem("sc-estimate", JSON.stringify(input));
      } catch {
        /* ignore */
      }
    }
  };
  const back = () => {
    setError("");
    if (done) setDone(false);
    else setStep(Math.max(0, step - 1));
  };

  const r = done ? estimate(rates, input) : null;

  if (r) {
    return (
      <div ref={result} tabIndex={-1} aria-live="polite" className="chamfer border border-line bg-white p-5 outline-none md:p-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-slate">Your estimated range</p>
        {r.priced ? (
          <>
            <p className="mt-3 font-mono text-[34px] leading-none text-char md:text-[52px]">{fmtRange(r.total)}</p>
            <p className="mt-3 text-[15px] text-slate">{r.summary}</p>
            <table className="mt-6 w-full border-collapse text-left font-mono text-[14px] md:text-[15px]">
              <caption className="sr-only">Breakdown of the estimated range</caption>
              <tbody>
                {r.lines.length > 1 &&
                  r.lines.map((l) => (
                    <tr key={l.label} className="border-b border-line text-slate">
                      <th scope="row" className="py-2 pr-3 font-sans font-normal">
                        · {l.label}
                      </th>
                      <td className="py-2 text-right">{fmtRange(l.range)}</td>
                    </tr>
                  ))}
                <tr className="border-b border-line">
                  <th scope="row" className="py-2.5 pr-3 font-sans font-medium">Construction</th>
                  <td className="py-2.5 text-right">{fmtRange(r.construction)}</td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="py-2.5 pr-3 font-sans font-medium">Permits & fees</th>
                  <td className="py-2.5 text-right">{fmtRange(r.permits)}</td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="py-2.5 pr-3 font-sans font-medium">Design & drawings</th>
                  <td className="py-2.5 text-right">{fmtRange(r.design)}</td>
                </tr>
                <tr className="border-b border-char bg-clay-tint">
                  <th scope="row" className="px-2 py-2.5 pr-3 font-sans font-medium text-clay-dk">Contingency ({Math.round(r.contingencyPct * 100)}%)</th>
                  <td className="px-2 py-2.5 text-right text-clay-dk">{fmtRange(r.contingency)}</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pr-3 font-sans font-semibold">Total</th>
                  <td className="py-3 text-right font-semibold">{fmtRange(r.total)}</td>
                </tr>
              </tbody>
            </table>
            {r.contingencyPct > rates.contingencyPct.default && (
              <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-char">
                {r.contingencyPct === rates.contingencyPct.structural
                  ? "Structural work: we have carried 15% contingency. Foundations and existing framing are the least predictable part of any addition."
                  : `${input.pre1980 === "yes" ? "Pre-1980 building" : "Building age unknown"}: we have carried 12% rather than 8% contingency. Knob-and-tube wiring, asbestos in floor levelling compound and galvanised supply lines are all common in this vintage and all are discovered after demolition, not before.`}
              </p>
            )}
            {input.building !== "detached" && (
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-slate">
                {BUILDING_LABEL[input.building]} work costs more for real reasons: elevator booking, restricted hours, common-area protection and strata review.
              </p>
            )}
            {r.permitsNote && <p className="mt-3 text-[14px] text-slate">{r.permitsNote}</p>}
          </>
        ) : (
          <p className="mt-3 max-w-[56ch] font-display text-[24px] leading-snug text-char">
            Exterior and addition work varies too much to range honestly from five questions. A site visit is the only way to a real number.
          </p>
        )}
        {r.unpriced.length > 0 && r.priced && (
          <p className="mt-3 text-[15px] text-slate">
            Not included above: {r.unpriced.map((s) => SCOPE_LABEL[s].toLowerCase()).join(" and ")} — these need a site visit to range.
          </p>
        )}
        <p className="mt-5 border-t border-line pt-4 text-[15px] font-medium text-char">This is a range, not a quote. A quote needs a site visit.</p>
        <p className="mt-1 font-mono text-[12px] text-slate">Rates updated: {rates.updated} · excludes 5% GST</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/book/?src=estimator&pos=result" className="btn-primary">
            Book a site visit
          </a>
          <button type="button" onClick={back} className="btn-secondary">
            Change answers
          </button>
        </div>

        <form
          className="mt-8 border-t border-line pt-6"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
            setEmailState("sending");
            const fd = new FormData();
            fd.set("email", email);
            fd.set("estimate", `${r.summary}: ${fmtRange(r.total)}`);
            try {
              fd.set("source", "estimator-email");
              if (FORM_ACTION) await fetch(FORM_ACTION, { method: "POST", body: fd, headers: { Accept: "application/json" } }).catch(() => undefined);
            } finally {
              setEmailState("sent");
            }
          }}
        >
          <label htmlFor="est-email" className="text-[14px] font-medium text-char">
            Email me this range <span className="font-normal text-slate">(optional — one field, nothing else)</span>
          </label>
          {emailState === "sent" ? (
            <p role="status" className="mt-2 text-[15px] text-green-dk">
              Sent to <span className="font-mono">{email}</span>.
            </p>
          ) : (
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="est-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-[2px] border border-line-strong bg-white px-3.5 text-[16px] sm:max-w-[340px]"
              />
              <button type="submit" disabled={emailState === "sending"} className="btn-secondary">
                {emailState === "sending" ? "Sending…" : "Email me this range"}
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }

  const sizedScopes = input.scopes.filter((s): s is "kitchen" | "bathroom" => s === "kitchen" || s === "bathroom");
  const sqftScopes = input.scopes.filter((s): s is "wholehome" | "basement" => s === "wholehome" || s === "basement");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="chamfer border border-line bg-white"
    >
      <div className="border-b border-line px-5 pt-5 md:px-8 md:pt-7">
        <div className="flex items-center justify-between font-mono text-[12px] text-slate">
          <span aria-live="polite">
            Step {step + 1} of {STEPS.length}
          </span>
          <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div role="progressbar" aria-label="Estimator progress" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} className="mt-2 h-1.5 bg-concrete">
          <div className="h-full bg-char transition-[width] duration-200" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="h-5" />
      </div>

      <fieldset className="px-5 py-6 md:px-8 md:py-8" aria-describedby={error ? "est-error" : undefined}>
        <legend ref={legend} tabIndex={-1} className="font-display text-[26px] font-medium leading-tight text-char outline-none md:text-[32px]">
          {STEPS[step]}
        </legend>

        {step === 0 && (
          <div className="mt-5 grid gap-2 md:grid-cols-2">
            <p className="text-[14px] text-slate md:col-span-2">Choose all that apply — they add together.</p>
            {SCOPES.map((s) => (
              <label key={s} className="block">
                <input type="checkbox" className="sr-only" checked={input.scopes.includes(s)} onChange={() => toggleScope(s)} name="scope" value={s} />
                <Row checked={input.scopes.includes(s)}>
                  <Box on={input.scopes.includes(s)} />
                  {SCOPE_LABEL[s]}
                </Row>
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="mt-5 space-y-6">
            {sizedScopes.map((s) => (
              <fieldset key={s}>
                <legend className="text-[14px] font-medium text-slate">{SCOPE_LABEL[s]}</legend>
                <div className="mt-2 grid gap-2">
                  {(["small", "medium", "large"] as Size[]).map((z) => (
                    <label key={z} className="block">
                      <input type="radio" className="sr-only" name={`size-${s}`} checked={input.sizes[s] === z} onChange={() => set("sizes", { ...input.sizes, [s]: z })} />
                      <Row checked={input.sizes[s] === z}>
                        <Box on={input.sizes[s] === z} round />
                        {SIZE_LABEL[s][z]}
                      </Row>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {sqftScopes.map((s) => (
              <label key={s} className="block">
                <span className="text-[14px] font-medium text-char">{SCOPE_LABEL[s]} — floor area in sq ft</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={100}
                  step={50}
                  value={input.sqft[s] ?? ""}
                  onChange={(e) => set("sqft", { ...input.sqft, [s]: Number(e.target.value) })}
                  className="mt-1.5 h-12 w-full rounded-[2px] border border-line-strong bg-white px-3.5 font-mono text-[16px] sm:max-w-[240px]"
                />
              </label>
            ))}
            {!sizedScopes.length && !sqftScopes.length && (
              <p className="text-[16px] text-slate">Nothing to size for {input.scopes.map((s) => SCOPE_LABEL[s].toLowerCase()).join(" and ")} — press Next.</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 grid gap-2">
            {(Object.keys(FINISH_LABEL) as Finish[]).map((f) => (
              <label key={f} className="block">
                <input type="radio" className="sr-only" name="finish" checked={input.finish === f} onChange={() => set("finish", f)} />
                <Row checked={input.finish === f}>
                  <Box on={input.finish === f} round />
                  <span>
                    <span className="font-medium">{FINISH_LABEL[f].name}:</span> <span className="text-slate">{FINISH_LABEL[f].def}</span>
                  </span>
                </Row>
              </label>
            ))}
            <a href="/pricing/finishes/" className="mt-2 text-[15px] font-medium text-clay-dk underline underline-offset-4">
              See what each finish level includes, item by item
            </a>
          </div>
        )}

        {step === 3 && (
          <div className="mt-5 space-y-6">
            <div className="grid gap-2">
              {(Object.keys(BUILDING_LABEL) as Building[]).map((b) => (
                <label key={b} className="block">
                  <input type="radio" className="sr-only" name="building" checked={input.building === b} onChange={() => set("building", b)} />
                  <Row checked={input.building === b}>
                    <Box on={input.building === b} round />
                    {BUILDING_LABEL[b]}
                  </Row>
                </label>
              ))}
            </div>
            <fieldset>
              <legend className="text-[16px] font-medium text-char">Built before 1980?</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["yes", "no", "unsure"] as Pre1980[]).map((v) => (
                  <label key={v} className="block">
                    <input type="radio" className="sr-only" name="pre1980" checked={input.pre1980 === v} onChange={() => set("pre1980", v)} />
                    <Row checked={input.pre1980 === v}>
                      <Box on={input.pre1980 === v} round />
                      {v === "yes" ? "Yes" : v === "no" ? "No" : "Unsure"}
                    </Row>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 4 && (
          <label className="mt-5 block">
            <span className="text-[14px] text-slate">This changes permit cost and timeline.</span>
            <select
              value={input.municipality}
              onChange={(e) => set("municipality", e.target.value)}
              autoComplete="address-level2"
              className="mt-2 h-14 w-full rounded-[2px] border border-line-strong bg-white px-3.5 text-[16px] md:max-w-[420px]"
            >
              <option value="">Choose your municipality…</option>
              {municipalities.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        )}

        {error && (
          <p id="est-error" role="alert" className="mt-4 flex items-center gap-2 text-[14px] font-medium text-clay-dk">
            <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
              <rect width="10" height="10" fill="#B5512E" />
            </svg>
            {error}
          </p>
        )}
      </fieldset>

      <div className="sticky bottom-0 flex gap-3 border-t border-line bg-white px-5 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:static md:px-8 md:py-5">
        <button type="button" onClick={back} disabled={step === 0} className="btn-secondary flex-1 disabled:opacity-40 md:flex-none">
          Back
        </button>
        <button type="submit" className="btn-secondary flex-1 border-char bg-char text-plaster hover:bg-char-lt md:flex-none">
          {step === STEPS.length - 1 ? "Show my range" : "Next"}
        </button>
      </div>
    </form>
  );
}
