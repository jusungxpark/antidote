# Outreach reports — how they work in this repo

Per-asset market-research reports on custom routes, per the spec in
`~/Downloads/7-2-antidotecontent/Outreach Report — Skeleton & Graph Spec.md`.

- **Portco-direct:** `antidotetransform.com/[company-name]`
- **PE-sponsor variant:** `antidotetransform.com/pe/[company-name]`
- **Demo (show cofounders):** `/retirementtpa` and `/pe/retirementtpa`

Run `npm run dev` and open http://localhost:3000/retirementtpa

Both demo routes render in **template mode** — amber dashed tags mark every
per-firm customization slot. Flip `"templateMode": false` in the company JSON
to see the clean send-ready version.

## Making a new report (no code, ~2–4 hrs)

1. Duplicate `data/companies/retirementtpa.json` → `data/companies/acme-pension.json`
2. Fill the `[CUSTOMIZE]` slots (each annotated with a `_note` in the JSON):
   - `name` / `shortName` — their firm name
   - `plans` + `fte` — from the Form-5500 preparer pull + LinkedIn (places their dot on Graph B)
   - `observations` — the three firm-specific observations (§04)
   - `stackNotes` — up to 2 chips tying workflow rows to their stack
   - `peState.sponsorName` — only if sending the `/pe/` variant
   - `templateMode: false`
3. Routes exist automatically: `/acme-pension` and `/pe/acme-pension`

## Where everything lives

| Layer | Location | Cadence |
|---|---|---|
| Routes + report layout/fonts | `app/(report)/` | rarely |
| Report copy + section structure | `app/components/report/Report.tsx` | rarely |
| Charts (static SVG, no deps) | `app/components/report/charts/` | never per-report |
| Report styles (scoped, light theme) | `app/(report)/report.css` | rarely |
| Sector scaffold (chart data, evidence, workflows, bridge) | `data/sectors/retirement-tpa.json` | refresh quarterly |
| Per-firm layer | `data/companies/[slug].json` | every send |

The marketing site is untouched: `AppShell` (in `app/components/SceneShell.tsx`)
routes `/`, `/buyouts`, `/transformation`, `/case-studies*` through the 3D
SceneShell and lets every other path render bare as a report. **If you add a
new top-level site page, add it to `SITE_PATHS` there.**

Report styles are fully scoped under `.report-body` (its own light theme +
scroll container), so they can't leak into the dark site and vice versa.

## Before any external send

- **Graph B peer field is SYNTHETIC** (`benchmark.peers` in the sector JSON).
  Replace with the real EFAST2 bulk pull: group 5500 filings by preparer →
  plan counts; Clay/Apollo → headcount.
- Sector-map coordinates are re-projected from the internal scores — sanity
  check the 16 dots.
- Accent color: `--accent` in `app/(report)/report.css` + `ACCENT` in
  `app/components/report/theme.ts`.
- Report routes are `noindex` via per-page metadata; keep them out of any
  sitemap.
- Analytics (scroll depth, revisits) not wired yet — revisit ≥2 or scroll
  ≥80% = priority follow-up.

New sector = one new `data/sectors/[id].json` + a copy pass on the §02/§05
copy in `Report.tsx` (currently TPA-specific; extract to sector JSON when
sector #2 arrives).
