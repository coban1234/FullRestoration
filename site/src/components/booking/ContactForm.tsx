import { useState, type FormEvent } from "react";
import { submitLead } from "../../lib/submit";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("company_website") || "")) return;
    const next: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) next.name = "Enter your name.";
    const email = String(fd.get("email") || "").trim();
    const tel = String(fd.get("phone") || "").trim();
    if (!email && !tel) next.email = "Enter an email address or a phone number so we can reply.";
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an email address like name@example.com.";
    if (!String(fd.get("message") || "").trim()) next.message = "Enter a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      (form.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    try {
      await submitLead(fd, "contact");
    } catch {
      setState("error");
    }
  }

  const field = "mt-2 block w-full rounded-sm border border-line-strong bg-white px-3.5 py-3 text-[16px] focus:border-char focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-char";
  const err = (k: string) =>
    errors[k] ? (
      <p id={`c-${k}-err`} className="mt-1.5 text-[14px] text-clay-dk">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="block text-[15px] font-medium">
        Name
        <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
        {err("name")}
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[15px] font-medium">
          Email
          <input name="email" type="email" autoComplete="email" inputMode="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} />
          {err("email")}
        </label>
        <label className="block text-[15px] font-medium">
          Phone <span className="font-normal text-slate">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </label>
      </div>
      <label className="block text-[15px] font-medium">
        Message
        <textarea name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} />
        {err("message")}
      </label>
      <div>
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" && (
          <p role="alert" className="mt-3 text-[14px] text-clay-dk">
            That didn't send. Please try again, or call us.
          </p>
        )}
        <p className="mt-3 text-[13px] text-slate">
          To book a site visit, use the <a href="/book/" className="link">booking form</a> instead — it asks the questions we need.
        </p>
      </div>
    </form>
  );
}
