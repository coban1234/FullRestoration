import React from "react";
import { CheckIcon, ChevronDownIcon, Loader2Icon } from "lucide-react";
import { nextSteps, phone, projectTypes, regions } from "../../data/site";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { FormField, inputClass } from "./FormField";
import { useBookingForm } from "./useBookingForm";

const municipalities = regions.flatMap((r) => r.places);
const projects = projectTypes;

export function BookingForm() {
  const { values, errors, status, reference, update, submit, reset } = useBookingForm();
  const submitting = status === "submitting";

  return (
    <section id="s08" aria-labelledby="s08-title" className="bg-concrete py-16 md:py-24">
      <Container>
        <SectionHeading
          id="s08-title"
          num="08"
          tab="Book"
          title="Book a site visit"
          note="No charge, no pressure. You leave with a written scope and price whether you hire us or not."
        />

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="border-b border-char pb-2 text-[13px] font-medium text-slate">What happens next</h3>
            <ol className="relative mt-6">
              <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-4 w-px bg-line-strong" />
              {nextSteps.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-char bg-concrete font-mono text-[13px] text-char">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="font-display text-[20px] font-medium leading-tight text-char">{step.title}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate">
                      {step.text.split(/(\d+(?:–\d+)?)/).map((part, idx) =>
                        /^\d/.test(part) ? (
                          <span key={idx} className="font-mono text-char">
                            {part}
                          </span>
                        ) : (
                          <React.Fragment key={idx}>{part}</React.Fragment>
                        )
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[15px] text-slate">
              Rather talk?{" "}
              <a href={phone.href} className="font-mono text-char underline underline-offset-4">
                {phone.display}
              </a>
              , weekdays <span className="font-mono text-char">7:30–17:00</span>.
            </p>
          </div>

          <div className="chamfer border border-line bg-white p-5 md:p-8 lg:col-span-7">
            {status === "success" ? (
              <div role="status" className="py-6">
                <span className="flex h-10 w-10 items-center justify-center bg-green-lt">
                  <CheckIcon className="h-5 w-5 text-green-dk" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[28px] font-medium leading-tight text-char">Request received.</h3>
                <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-slate">
                  Thanks, {values.name.split(" ")[0]}. We’ll call <span className="font-mono text-char">{values.phone}</span> within
                  one business day to book a time in {values.municipality}.
                </p>
                <p className="mt-6 font-mono text-[13px] text-slate">
                  Reference <span className="text-char">{reference}</span>
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 inline-flex h-12 items-center rounded-[2px] border border-char px-5 text-[16px] font-medium text-char transition-colors duration-150 hover:bg-char hover:text-plaster"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit} aria-describedby={status === "error" ? "form-error" : undefined}>
                {status === "error" && (
                  <div id="form-error" role="alert" className="mb-6 border-l-2 border-clay bg-clay-tint p-4 text-[15px] text-clay-dk">
                    That didn’t send. Check your connection and try again, or call{" "}
                    <span className="font-mono">{phone.display}</span>.
                  </div>
                )}
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField id="field-name" label="Name" error={errors.name} className="md:col-span-2">
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "field-name-error" : undefined}
                      className={inputClass(!!errors.name)}
                    />
                  </FormField>
                  <FormField id="field-phone" label="Phone" error={errors.phone}>
                    <input
                      id="field-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "field-phone-error" : undefined}
                      className={`${inputClass(!!errors.phone)} font-mono`}
                    />
                  </FormField>
                  <FormField id="field-email" label="Email" error={errors.email}>
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "field-email-error" : undefined}
                      className={inputClass(!!errors.email)}
                    />
                  </FormField>
                  <FormField id="field-municipality" label="Municipality" error={errors.municipality}>
                    <div className="relative">
                      <select
                        id="field-municipality"
                      name="municipality"
                        value={values.municipality}
                        onChange={(e) => update("municipality", e.target.value)}
                        aria-invalid={!!errors.municipality}
                        aria-describedby={errors.municipality ? "field-municipality-error" : undefined}
                        className={`${inputClass(!!errors.municipality)} appearance-none pr-10`}
                      >
                        <option value="">Choose…</option>
                        {municipalities.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
                    </div>
                  </FormField>
                  <FormField id="field-project" label="What are you renovating?" error={errors.project}>
                    <div className="relative">
                      <select
                        id="field-project"
                      name="project"
                        value={values.project}
                        onChange={(e) => update("project", e.target.value)}
                        aria-invalid={!!errors.project}
                        aria-describedby={errors.project ? "field-project-error" : undefined}
                        className={`${inputClass(!!errors.project)} appearance-none pr-10`}
                      >
                        <option value="">Choose…</option>
                        {projects.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" aria-hidden="true" />
                    </div>
                  </FormField>
                </div>

                <div className="mt-6 border-t border-line pt-5">
                  <label htmlFor="field-consent" className="flex min-h-[44px] cursor-pointer items-start gap-3">
                    <input
                      id="field-consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "field-consent-error" : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-[2px] border-line-strong accent-char"
                    />
                    <span className="text-[15px] leading-relaxed text-char">
                      Stonecroft can contact me by phone or email about this request. Nothing else, no mailing list.
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="field-consent-error" className="ml-8 mt-1 flex items-center gap-1.5 text-[13px] font-medium text-clay-dk">
                      <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
                        <rect width="10" height="10" fill="#B5512E" />
                      </svg>
                      {errors.consent}
                    </p>
                  )}
                </div>

                <p className="mt-5 text-[14px] text-slate">
                  Want to add photos, budget and timing?{" "}
                  <a href="/book/" className="font-medium text-char underline underline-offset-4">
                    Use the full form
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[2px] bg-clay px-7 text-[16px] font-medium text-white transition-colors duration-150 hover:bg-clay-dk disabled:cursor-wait disabled:bg-clay-dk md:w-auto"
                >
                  {submitting && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {submitting ? "Sending…" : "Request a site visit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
