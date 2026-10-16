export interface QA {
  q: string;
  a: string;
}

const strip = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export const faqSchema = (items: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: strip(i.a) } })),
});

export const serviceSchema = (site: string, name: string, description: string, path: string, offer?: { low: number; high: number }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: site + path,
  provider: { "@id": `${site}/#org` },
  areaServed: [{ "@type": "AdministrativeArea", name: "Metro Vancouver" }, { "@type": "AdministrativeArea", name: "Fraser Valley" }],
  ...(offer
    ? { offers: { "@type": "AggregateOffer", lowPrice: offer.low, highPrice: offer.high, priceCurrency: "CAD" } }
    : {}),
});

export const articleSchema = (site: string, o: { headline: string; path: string; datePublished: string; dateModified?: string; author: string; description: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: o.headline,
  description: o.description,
  url: site + o.path,
  datePublished: o.datePublished,
  dateModified: o.dateModified ?? o.datePublished,
  author: { "@type": "Person", name: o.author },
  publisher: { "@id": `${site}/#org` },
});

export const siteUrl = (astroSite: URL | undefined) => astroSite?.toString().replace(/\/$/, "") ?? "";
