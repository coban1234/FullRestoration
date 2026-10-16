import React, { useEffect, useMemo, useState } from "react";
import { LEVELS, finishBasis, finishRows, finishesUpdated, type Level } from "../../data/finishes";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-CA");

/** INT-6. Without JS it is the full static comparison table; with JS, radios per row drive a running total. */
export function FinishSelector() {
  const [ready, setReady] = useState(false);
  const [pick, setPick] = useState<Record<string, Level>>(() => Object.fromEntries(finishRows.map((r) => [r.key, "mid"])));
  const [focus, setFocus] = useState<Level>("mid");
  useEffect(() => setReady(true), []);

  const total = useMemo(
    () =>
      finishRows.reduce<[number, number]>(
        (acc, r) => {
          const a = r.cells[pick[r.key]].amount;
          return [acc[0] + a[0], acc[1] + a[1]];
        },
        [0, 0]
      ),
    [pick]
  );

  const setAll = (lvl: Level) => {
    setFocus(lvl);
    setPick(Object.fromEntries(finishRows.map((r) => [r.key, lvl])));
    document.getElementById(`fs-col-${lvl}`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };

  return (
    <div>
      {ready && (
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-[14px] text-slate">Set every row to:</span>
          <div role="group" aria-label="Set every row to one level" className="inline-flex border border-char">
            {LEVELS.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={() => setAll(l.key)}
                aria-pressed={focus === l.key && finishRows.every((r) => pick[r.key] === l.key)}
                className={`h-11 px-4 text-[15px] font-medium ${focus === l.key && finishRows.every((r) => pick[r.key] === l.key) ? "bg-char text-plaster" : "bg-white text-char"}`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chamfer overflow-x-auto border border-line bg-white" tabIndex={0} aria-label="Finish comparison table, scrolls sideways">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Finish levels compared with allowances. {finishBasis}.</caption>
          <thead>
            <tr className="border-b border-char">
              <th scope="col" className="sticky left-0 z-10 w-[150px] bg-white px-4 py-3 text-[13px] font-medium text-slate">
                Item
              </th>
              {LEVELS.map((l) => (
                <th key={l.key} id={`fs-col-${l.key}`} scope="col" className="px-4 py-3 font-display text-[19px] font-medium text-char">
                  {l.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finishRows.map((r) => (
              <tr key={r.key} className="border-b border-line align-top last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-4 text-[15px] font-medium text-char">
                  {r.label}
                  <span className="mt-1 block font-mono text-[11px] font-normal text-slate">
                    {r.qty} {r.unit}
                  </span>
                </th>
                {LEVELS.map((l) => {
                  const c = r.cells[l.key];
                  const on = ready && pick[r.key] === l.key;
                  const id = `fs-${r.key}-${l.key}`;
                  return (
                    <td key={l.key} className="p-1.5">
                      <label
                        htmlFor={ready ? id : undefined}
                        className={`block h-full p-3 ${ready ? "cursor-pointer" : ""} ${on ? "outline outline-2 -outline-offset-2 outline-char bg-plaster" : ""}`}
                      >
                        {ready && (
                          <input
                            id={id}
                            type="radio"
                            name={`fs-${r.key}`}
                            checked={on}
                            onChange={() => setPick((p) => ({ ...p, [r.key]: l.key }))}
                            className="sr-only"
                          />
                        )}
                        <span className="photo-slot mb-2 block h-14 w-full" aria-hidden="true" />
                        <span className="block text-[14px] leading-snug text-char">{c.cls}</span>
                        <span className="mt-1.5 block font-mono text-[13px] text-char">{c.allowance}</span>
                        <span className="mt-0.5 block font-mono text-[11px] text-slate">
                          {money(c.amount[0])}–{money(c.amount[1])}
                        </span>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ready && (
        <div aria-live="polite" className="mt-4 flex flex-col gap-1 border-t-2 border-char pt-4 md:flex-row md:items-baseline md:justify-between">
          <p className="text-[14px] text-slate">Your allowance total, materials only</p>
          <p className="font-mono text-[28px] text-char md:text-[34px]">
            {money(total[0])} — {money(total[1])}
          </p>
        </div>
      )}
      <p className="mt-3 font-mono text-[12px] text-slate">
        Basis: {finishBasis}. Allowances updated {finishesUpdated} · exclude 5% GST · supplied, not installed.
      </p>
    </div>
  );
}
