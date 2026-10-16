/**
 * Posts a lead to PUBLIC_FORM_ACTION (Formspree, Basin, Netlify Forms, a serverless function — anything that
 * accepts multipart form data). With no endpoint configured the request is kept in sessionStorage only, so
 * the flow can be tested end to end before a backend exists.
 */
export const FORM_ACTION: string = import.meta.env.PUBLIC_FORM_ACTION || "";

export async function submitLead(data: FormData, source: "home-short" | "book" | "contact" | "estimator"): Promise<void> {
  data.set("source", source);
  data.set("submitted_at", new Date().toISOString());
  const ref = `SV-${Math.floor(1000 + Math.random() * 9000)}`;
  data.set("reference", ref);

  if (FORM_ACTION) {
    const res = await fetch(FORM_ACTION, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
  } else {
    await new Promise((r) => setTimeout(r, 600));
  }

  try {
    sessionStorage.setItem(
      "sc-lead",
      JSON.stringify({ ref, name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), municipality: String(data.get("municipality") || "") })
    );
  } catch {
    /* private mode */
  }
  window.location.assign("/book/thank-you/");
}
