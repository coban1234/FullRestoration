import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { municipalities, phone, projectTypes } from "../../data/site";
import { submitLead } from "../../lib/submit";
import { inputClass } from "./FormField";

type Field = "name" | "phone" | "email" | "municipality" | "project" | "consent";
const LABEL: Record<Field, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  municipality: "Municipality",
  project: "What are you renovating?",
  consent: "Contact consent",
};
const ORDER: Field[] = ["name", "phone", "email", "municipality", "project", "consent"];
const budgets = ["Under $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "$100,000 – $200,000", "$200,000 – $400,000", "Over $400,000", "Not sure yet"];
const timing = ["ASAP", "1–3 months", "3–6 months", "6–12 months", "Just researching"];
const buildings = ["Detached house", "Townhouse", "Condo or apartment", "Strata common area"];

function validateField(f: Field, form: HTMLFormElement): string {
  const v = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
  switch (f) {
    case "name":
      return v("name").length < 2 ? "Enter your name." : "";
    case "phone":
      return v("phone").replace(/\D/g, "").length < 10 ? "Enter your phone number, area code included." : "";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) ? "" : "Enter an email like name@example.com.";
    case "municipality":
      return v("municipality") ? "" : "Choose your municipality.";
    case "project":
      return form.querySelectorAll('input[name="project"]:checked').length ? "" : "Choose at least one.";
    case "consent":
      return (form.elements.namedItem("consent") as HTMLInputElement).checked ? "" : "We need your OK to contact you about this request.";
  }
}

const Err = ({ id, msg }: { id: string; msg?: string }) =>
  msg ? (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[14px] font-medium text-clay-dk">
      <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
        <rect width="10" height="10" fill="#B5512E" />
      </svg>
      {msg}
    </p>
  ) : null;

export function BookFull() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [summary, setSummary] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const started = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const f = formRef.current;
    if (!f) return;
    (f.elements.namedItem("src") as HTMLInputElement).value = p.get("src") || document.referrer || "direct";
    (f.elements.namedItem("pos") as HTMLInputElement).value = p.get("pos") || "";
    const city = p.get("city");
    if (city && municipalities.includes(city)) (f.elements.namedItem("municipality") as HTMLSelectElement).value = city;
    try {
      const est = sessionStorage.getItem("sc-estimate");
      if (est) (f.elements.namedItem("estimator") as HTMLInputElement).value = est;
    } catch {
      /* ignore */
    }
  }, []);

  const blur = (f: Field) => {
    if (!formRef.current) return;
    const msg = validateField(f, formRef.current);
    setErrors((e) => ({ ...e, [f]: msg || undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Partial<Record<Field, string>> = {};
    ORDER.forEach((f) => {
      const m = validateField(f, form);
      if (m) next[f] = m;
    });
    setErrors(next);
    const first = ORDER.find((f) => next[f]);
    if (first) {
      setSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSummary(false);
    const fd = new FormData(form);
    if (fd.get("company_website") || Date.now() - started.current < 3000) {
      window.location.assign("/book/thank-you/");
      return;
    }
    setSending(true);
    setFailed(false);
    try {
      await submitLead(fd, "book");
    } catch {
      setFailed(true);
      setSending(false);
    }
  };

  const recheck = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as Field;
    if (ORDER.includes(name) && errors[name] && formRef.current && !validateField(name, formRef.current)) {
      setErrors((x) => ({ ...x, [name]: undefined }));
    }
  };

  const aria = (f: Field) => ({ "aria-invalid": !!errors[f] || undefined, "aria-describedby": errors[f] ? `err-${f}` : undefined });
  const listed = ORDER.filter((f) => errors[f]);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onInput={recheck} onChange={recheck} encType="multipart/form-data" className="chamfer border border-line bg-white p-5 md:p-8">
      {summary && listed.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 border-l-2 border-clay bg-clay-tint p-4 outline-none">
          <p className="text-[15px] font-medium text-clay-dk">
            {listed.length === 1 ? "One thing to fix" : `${listed.length} things to fix`} before we can send this:
          </p>
          <ul className="mt-2 space-y-1">
            {listed.map((f) => (
              <li key={f}>
                <a href={`#f-${f}`} className="text-[15px] text-clay-dk underline underline-offset-4">
                  {LABEL[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {failed && (
        <div role="alert" className="mb-6 border-l-2 border-clay bg-clay-tint p-4 text-[15px] text-clay-dk">
          That did not send. Nothing you typed has been lost — try again, or call <span className="font-mono">{phone.display}</span>.
        </div>
      )}

      <input type="hidden" name="src" />
      <input type="hidden" name="pos" />
      <input type="hidden" name="estimator" />
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="f-name" className="block text-[15px] font-medium">
            Name
          </label>
          <input id="f-name" name="name" type="text" autoComplete="name" onBlur={() => blur("name")} className={`mt-1.5 ${inputClass(!!errors.name)}`} {...aria("name")} />
          <Err id="err-name" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="f-phone" className="block text-[15px] font-medium">
            Phone
          </label>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" onBlur={() => blur("phone")} className={`mt-1.5 font-mono ${inputClass(!!errors.phone)}`} {...aria("phone")} />
          <Err id="err-phone" msg={errors.phone} />
        </div>
        <div>
          <label htmlFor="f-email" className="block text-[15px] font-medium">
            Email
          </label>
          <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" onBlur={() => blur("email")} className={`mt-1.5 ${inputClass(!!errors.email)}`} {...aria("email")} />
          <Err id="err-email" msg={errors.email} />
        </div>
        <div>
          <label htmlFor="f-municipality" className="block text-[15px] font-medium">
            Municipality
          </label>
          <div className="relative mt-1.5">
            <select id="f-municipality" name="municipality" autoComplete="address-level2" defaultValue="" onBlur={() => blur("municipality")} className={`${inputClass(!!errors.municipality)} appearance-none pr-10`} {...aria("municipality")}>
              <option value="">Choose…</option>
              {municipalities.map((m) => (
                <option key={m}>{m}</option>
              ))}
              <option>Somewhere else</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
          </div>
          <Err id="err-municipality" msg={errors.municipality} />
        </div>
        <div>
          <label htmlFor="f-address" className="block text-[15px] font-medium">
            Street address <span className="font-normal text-slate">(optional)</span>
          </label>
          <input id="f-address" name="address" type="text" autoComplete="street-address" className={`mt-1.5 ${inputClass(false)}`} />
        </div>

        <fieldset id="f-project" tabIndex={-1} className="md:col-span-2" {...aria("project")}>
          <legend className="text-[15px] font-medium">What are you renovating?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {projectTypes.map((p) => (
              <label key={p} className="flex min-h-[52px] cursor-pointer items-center gap-3 border border-line px-4 has-[:checked]:border-char has-[:checked]:bg-plaster">
                <input type="checkbox" name="project" value={p} onChange={() => errors.project && blur("project")} className="h-5 w-5 accent-char" />
                <span className="text-[16px]">{p}</span>
              </label>
            ))}
          </div>
          <Err id="err-project" msg={errors.project} />
        </fieldset>

        <div>
          <label htmlFor="f-budget" className="block text-[15px] font-medium">
            Budget range <span className="font-normal text-slate">(optional)</span>
          </label>
          <div className="relative mt-1.5">
            <select id="f-budget" name="budget" defaultValue="" className={`${inputClass(false)} appearance-none pr-10`}>
              <option value="">Choose…</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
          </div>
        </div>
        <div>
          <label htmlFor="f-start" className="block text-[15px] font-medium">
            When do you want to start? <span className="font-normal text-slate">(optional)</span>
          </label>
          <div className="relative mt-1.5">
            <select id="f-start" name="start" defaultValue="" className={`${inputClass(false)} appearance-none pr-10`}>
              <option value="">Choose…</option>
              {timing.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
          </div>
        </div>
        <div>
          <label htmlFor="f-building" className="block text-[15px] font-medium">
            Building type <span className="font-normal text-slate">(optional)</span>
          </label>
          <div className="relative mt-1.5">
            <select id="f-building" name="building" defaultValue="" className={`${inputClass(false)} appearance-none pr-10`}>
              <option value="">Choose…</option>
              {buildings.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
          </div>
        </div>
        <div>
          <label htmlFor="f-year" className="block text-[15px] font-medium">
            Year built <span className="font-normal text-slate">(optional, a guess is fine)</span>
          </label>
          <input id="f-year" name="year_built" type="text" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="e.g. 1968" className={`mt-1.5 font-mono ${inputClass(false)}`} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="f-about" className="block text-[15px] font-medium">
            Tell us about the project <span className="font-normal text-slate">(optional)</span>
          </label>
          <textarea
            id="f-about"
            name="about"
            rows={5}
            placeholder="What you want to change, what's bothering you, anything you've already been told."
            className="mt-1.5 w-full rounded-[2px] border border-line-strong bg-white px-3.5 py-3 text-[16px] placeholder:text-slate"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="f-photos" className="block text-[15px] font-medium">
            Photos of the space <span className="font-normal text-slate">(optional — phone photos are perfect)</span>
          </label>
          <label htmlFor="f-photos" className="mt-1.5 flex min-h-[56px] cursor-pointer items-center justify-center gap-2 border border-dashed border-line-strong bg-plaster px-4 text-[15px] font-medium text-char hover:border-char">
            {files.length ? `${files.length} photo${files.length > 1 ? "s" : ""} added — tap to change` : "Add photos"}
          </label>
          <input
            id="f-photos"
            name="photos"
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            className="sr-only"
            onChange={(e) => setFiles([...(e.target.files ?? [])].map((f) => f.name))}
          />
          {files.length > 0 && <p className="mt-1.5 truncate font-mono text-[12px] text-slate">{files.join(", ")}</p>}
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-line pt-5">
        <div>
          <label htmlFor="f-consent" className="flex min-h-[44px] cursor-pointer items-start gap-3">
            <input id="f-consent" name="consent" type="checkbox" onChange={() => errors.consent && blur("consent")} className="mt-0.5 h-5 w-5 shrink-0 accent-char" {...aria("consent")} />
            <span className="text-[15px] leading-relaxed">Stonecroft can contact me by phone or email about this request. Nothing else.</span>
          </label>
          <Err id="err-consent" msg={errors.consent} />
        </div>
        <label htmlFor="f-subscribe" className="flex min-h-[44px] cursor-pointer items-start gap-3">
          <input id="f-subscribe" name="log_subscribe" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-char" />
          <span className="text-[15px] leading-relaxed text-slate">Also send me the weekly build log by email. Separate from this request; unsubscribe any time.</span>
        </label>
      </div>

      <button type="submit" disabled={sending} className="btn-primary mt-7 w-full disabled:cursor-wait md:w-auto">
        {sending && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {sending ? "Sending…" : "Request a site visit"}
      </button>
    </form>
  );
}
