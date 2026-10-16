import { type FormEvent, useState } from "react";
import { submitLead } from "../../lib/submit";

export type BookingField = "name" | "phone" | "email" | "municipality" | "project" | "consent";

export interface BookingValues {
  name: string;
  phone: string;
  email: string;
  municipality: string;
  project: string;
  consent: boolean;
}

export type BookingErrors = Partial<Record<BookingField, string>>;
export type BookingStatus = "idle" | "submitting" | "success" | "error";

const INITIAL: BookingValues = {
  name: "",
  phone: "",
  email: "",
  municipality: "",
  project: "",
  consent: false,
};

const ORDER: BookingField[] = ["name", "phone", "email", "municipality", "project", "consent"];

export function useBookingForm() {
  const [values, setValues] = useState<BookingValues>(INITIAL);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [reference, setReference] = useState("");

  function update<K extends BookingField>(field: K, value: BookingValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    const firstInvalid = ORDER.find((f) => next[f]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.set(k, String(v)));
      await submitLead(fd, "home-short");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(INITIAL);
    setErrors({});
    setStatus("idle");
  }

  return { values, errors, status, reference, update, submit, reset };
}

function validate(v: BookingValues): BookingErrors {
  const errors: BookingErrors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name.";
  if (v.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter your full phone number, area code included.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Enter an email like name@example.com.";
  if (!v.municipality) errors.municipality = "Choose your municipality.";
  if (!v.project) errors.project = "Choose what you’re renovating.";
  if (!v.consent) errors.consent = "We need your OK to contact you.";
  return errors;
}

