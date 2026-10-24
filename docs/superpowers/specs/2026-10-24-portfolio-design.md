# Portfolio Site — Design

Date: 2026-10-24
Status: Approved for planning
Owner: Md. Mahin Ahmed (github.com/AhnafMohsieu)

## 1. Purpose

A single-page public portfolio presenting all of Mahin's work in one place: two
WordPress e-commerce builds, two browser apps, one simulator, and four research
manuscripts. The audience is twofold — technical/professional (internships,
freelance e-commerce work) and academic (research collaboration). The design
must read as credible to both, so it favors restraint over decoration.

Success criteria:

- A visitor understands who Mahin is and what he has built within one screen.
- Any of the 9 works is reachable in one click (live site, repo, or PDF).
- The page loads as a static file with no build step and no framework.
- Editing a work entry requires touching one HTML block, not a JS render path.

## 2. Scope

In scope:

- One static page (`index.html`) with Work, Research, About, Contact sections.
- Hosted PDFs for the four manuscripts.
- Client-side category filtering.
- GitHub Pages deployment configuration.

Out of scope:

- Per-project detail pages (considered and rejected: 9 works do not justify them).
- A CMS, contact-form backend, analytics, blog, dark mode toggle.
- Screenshots or imagery of projects — none exist that can be used truthfully.

## 3. Content inventory

### Works (9)

| # | Title | Category | Link |
|---|-------|----------|------|
| 1 | NoriBD — Seafood E-commerce | web | https://dev-noribd.pantheonsite.io/ |
| 2 | Bangu Bhozon — Multi-Category Retail | web | https://dev-bangu-bhozon.pantheonsite.io/ |
| 3 | Ibadah Quest — Gamified Islamic PWA | app | https://ahnafmohsieu.github.io/Ibadah-Quest/ |
| 4 | Iron Build — Exercise Tracker | app | none (private repo) |
| 5 | Clash of Clans XP Simulator | tool | https://ahnafmohsieu.github.io/Clash-of-Clans-XP-Simulator/ |
| 6 | Chunking Strategies for RAG | research | assets/papers/paper-1-chunking-rag.pdf |
| 7 | Rise of AI in Banking Research | research | assets/papers/paper-2-ai-banking.pdf |
| 8 | Blockchain in Banking Research | research | assets/papers/paper-3-blockchain-banking.pdf |
| 9 | Green & Sustainable Finance | research | assets/papers/paper-4-green-finance.pdf |

The Research section duplicates four of these entries by design: the Work list is
a scannable index, the Research section carries the manuscript detail (target
journal and key finding) that a list row cannot hold.

### Factual constraints

- **Papers are unpublished.** Each is a "final submission version" prepared for
  an MDPI journal. Copy must say *manuscript*, never *published*, and must not
  assert acceptance. Target journals from `Research Papers/README.txt`:
  - Paper 1 → Information (MDPI), 25 pages
  - Paper 2 → Journal of Open Innovation (MDPI), 23 pages
  - Paper 3 → Journal of Open Innovation (MDPI), 22 pages
  - Paper 4 → Information (MDPI), 23 pages
- **Paper 3 has no DOCX**, only PDF and LaTeX — irrelevant to the site, but it
  explains why authoring details vary between papers.
- **Pantheon links are `dev-*` staging URLs** and may expire. They are kept
  because they are the only live demonstration of those builds. The README
  records this risk.
- **Iron Build's repo is private**, so it is listed with no link and the note
  "private build · available on request".
- No ORCID exists yet (noted in the papers' own README), so no ORCID is shown.

### Identity

- Name: Md. Mahin Ahmed
- Role line: Developer & Researcher
- Email: mahinahmed923@gmail.com
- GitHub: https://github.com/AhnafMohsieu
- Location: Dhaka, Bangladesh
- Institution: United International University
- Skills (from the existing demo, verified against the work above): WordPress /
  WooCommerce, Vanilla JS PWA, Chart.js, Python, RAG / LLM evaluation,
  bibliometric analysis, LaTeX, bKash / Nagad / COD integration.

## 4. Structure

Single page, six regions in order:

1. **Header** — name and role at left; anchor nav (Work · Research · About ·
   Contact) at right. Not sticky.
2. **Hero** — name, one-sentence positioning, location/institution line, two
   actions (Email, GitHub).
3. **01 — Work** — filter chips (All · Web · App · Tool · Research) and nine
   entries. Each entry is a row: ordinal, title, one-line description, stack,
   and an external link when one exists.
4. **02 — Research** — the four manuscripts as expanded entries: title, target
   journal, one-line finding, and a "Read PDF" link.
5. **03 — About** — two short paragraphs and a skills line.
6. **04 — Contact** — email, GitHub, location, and an availability sentence.
7. **Footer** — copyright with the current year, back to top.

### File layout

```
/
├─ index.html
├─ styles.css
├─ script.js
├─ assets/
│  ├─ papers/                 four manuscript PDFs
│  ├─ favicon.svg
│  └─ og.png                  social preview (1200×630)
├─ .nojekyll                  keeps underscore-prefixed paths from being stripped
├─ README.md                  what it is, how to edit, deploy notes
└─ docs/superpowers/specs/    this document
```

## 5. Visual system

Minimal editorial. The page should feel like a printed catalogue, not a product
landing page.

- **Color:** paper `#FAF9F6`, ink `#14110F`, muted `#6B6459`, hairline
  `#E3DED4`, accent `#9A3B26`. Accent is used only for links, the active filter,
  and the ordinal numerals. No gradients, no box shadows, no filled cards.
- **Type:** headings in a display serif (Fraunces from Google Fonts, falling back
  to Georgia, then the generic serif); body in the system sans stack; metadata
  labels in small caps with `letter-spacing: 0.08em`.
- **Scale:** body 17px/1.65; section headings `clamp(1.75rem, 4vw, 2.5rem)`;
  hero name `clamp(2.5rem, 7vw, 4.5rem)`.
- **Layout:** 1100px shell with 24px gutters; prose capped at 68ch; sections
  separated by a 1px hairline and numbered (`01 — Work`); work rows use a
  three-column grid (ordinal · content · meta) that collapses to one column
  below 720px; border radii capped at 4px.
- **Motion:** 120ms transitions on color and underline only. Nothing animates on
  scroll; `prefers-reduced-motion` disables transitions.

## 6. Behavior

- Filter chips carry `data-cat`; clicking one sets `aria-pressed` on that chip and
  toggles a `.is-hidden` class on non-matching rows.
- The active filter is mirrored into the URL hash (`#work`, `#work-app`) with
  `history.replaceState`, and read back on load so a filtered view can be shared.
- Without JavaScript every row remains visible and the chips are inert. Filtering
  is the only enhancement, never a requirement for reading content.
- The footer year is written by `script.js`; the HTML ships a hardcoded fallback
  year so it is correct with JS disabled.

## 7. Accessibility

- Skip link to `#main`; one `<h1>`; sections use `<section aria-labelledby>`.
- Filter chips are `<button type="button">` inside a labelled group; active state
  is exposed with `aria-pressed`, not color alone.
- Links are underlined; focus rings are visible and never removed.
- Contrast: ink on paper ≈ 16:1, muted on paper ≈ 5.2:1, accent on paper ≈ 5.6:1
  — all above 4.5:1.
- Paper links carry descriptive text ("Read the PDF — 25 pages"), so link text is
  meaningful out of context.

## 8. Deployment

GitHub Pages from the `main` branch root. This requires the repository to be
public on a free plan; the repository is currently private and stays that way
until the owner chooses otherwise. The README documents the exact toggle:
Settings → General → Danger Zone → Change visibility, then Settings → Pages →
Source: `main` / `/ (root)`.

## 9. Testing

Static page, so verification is manual and scripted in equal parts:

1. `node --check script.js` for syntax.
2. Open the file locally and confirm: all nine work rows visible with JS disabled,
   filters work with JS enabled, hash round-trips, no console errors.
3. Responsive check at 360px, 720px, and 1440px.
4. Keyboard pass: skip link, nav, every link and chip reachable, focus visible.
5. Every external and PDF link returns 200.
6. Lighthouse (or equivalent) accessibility score of 100 on the deployed page.

## 10. Risks

- Staging links (`dev-*.pantheonsite.io`) may disappear; the entries would then
  need their link removed rather than left broken.
- PDFs add ~2 MB to the repository. Acceptable for four papers; would not scale
  to dozens.

## 11. Defaults chosen without explicit confirmation

These were decided to keep the work moving and can be reversed at any time:

- Iron Build included, unlinked.
- Repository remains private; no deployment until the owner makes it public.
- All four PDFs hosted in the repository rather than "on request".

## 12. Implementation deviations (2026-10-24)

Recorded after the build, so the document does not describe a site that does not
exist:

- **Ten works, not nine.** Cafe Neptune was added once the websites work began;
  the three WordPress builds are now entries 01–03.
- **Iron Build is linked, not unlinked.** Its repository was made public and a
  Pages site was created, so `ahnafmohsieu.github.io/Iron-Build/` resolves.
- **The simulator slug was wrong in the source demo.** The live URL is
  `Clash-of-Clans-Exp-Simulator`, not `Clash-of-Clans-XP-Simulator`.
- **NoriBD and Bangu Bhozon link to a case study, not a shop.** Their Pantheon
  staging hosts return 404 and are unrecoverable, so both point at
  `ahnafmohsieu.github.io/Websites/` rather than at a dead URL.
- **The repository is public and deployed.** Pages serves the site from `main`.

