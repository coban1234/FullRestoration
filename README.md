# Stonecroft Renovation — website

Static marketing site built from *Renovation Website Specification v1.1*, in the Draft C ("Field Notebook") visual direction.

- **Stack:** [Astro 5](https://astro.build) (static HTML output) + React islands for interactive parts + Tailwind CSS.
- **Output:** plain HTML/CSS/JS in `site/dist/` — no server needed. Any static host works.
- `design-drafts/` holds the four original HTML design drafts (not deployed).

## Run locally

Requires Node 20 or newer.

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # writes site/dist/
npm run preview    # serves the built site
```

## Environment variables

Copy `site/.env.example` to `site/.env` for local use, and set the same variables in the host's dashboard.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Live domain, e.g. `https://www.stonecroft.ca`. Used for canonical URLs, sitemap, robots.txt and schema. |
| `PUBLIC_FORM_ACTION` | URL that receives the booking, contact and estimator forms (multipart POST). Formspree, Basin or Getform work without code. If empty, forms simulate success and go to the thank-you page — **set this before launch.** |

## Deploy: GitHub → host → your domain

### 1. Push to GitHub

```bash
git remote add origin https://github.com/<you>/stonecroft-site.git
git push -u origin main
```

### 2. Connect a host (pick one)

All three rebuild automatically on every push to `main`.

**Netlify** — *Add new site → Import from Git →* pick the repo. `netlify.toml` already sets base `site`, command `npm run build`, publish `dist`. Add the env vars under *Site configuration → Environment variables*.

**Vercel** — *Add New → Project →* import the repo, set **Root Directory = `site`**. Framework is detected as Astro; `site/vercel.json` sets headers and trailing slashes. Add the env vars under *Settings → Environment Variables*.

**Cloudflare Pages** — *Workers & Pages → Create → Pages → Connect to Git.* Framework preset **Astro**, root directory `site`, build command `npm run build`, output `dist`, and env var `NODE_VERSION=22`. Headers come from `site/public/_headers`.

### 3. Point your domain

In the host's *Domains* screen add `www.stonecroft.ca` (and the bare domain, redirecting to `www`). At your domain registrar either:

- switch nameservers to the host (simplest; Netlify and Cloudflare offer this), or
- add the DNS records the host shows — usually a `CNAME` for `www` pointing at the host's address and an `A`/`ALIAS` record for the bare domain.

HTTPS certificates are issued automatically once DNS resolves. Then set `SITE_URL` to the final domain and redeploy.

## Where content lives

All copy and numbers are in typed data files, so most edits need no layout work:

| File | Content |
| --- | --- |
| `site/src/data/site.ts` | Company details, phone, address, nav, services, team, licences |
| `site/src/data/projects.ts` | Case studies and weekly build-log entries |
| `site/src/data/pricing.ts` | §11 price tables, factors, inclusions, draw schedule |
| `site/src/data/schedules.ts` | Schedule estimator stages per scope |
| `site/src/data/finishes.ts` | Finish selector rows and allowances |
| `site/src/data/cities.ts` | City pages and permit details |
| `site/src/data/journal.ts` | Journal articles |
| `site/public/data/rates.json` | Budget estimator rates (INT-3) |

## Before launch

- Replace every hatched **photo slot** with real site photography (spec §12: documentary, no stock, no AI).
- Replace placeholder data: crew names and certificates, licence/insurance/WorkSafeBC numbers, permit numbers, project figures, allowances.
- Replace `site/public/docs/stonecroft-verification-pack.pdf` with the real scanned pack.
- Re-verify permit timelines and official URLs in `cities.ts` and `schedules.ts`.
- Set `PUBLIC_FORM_ACTION` and send a test booking.
- Have Privacy and Terms reviewed by a BC lawyer.
