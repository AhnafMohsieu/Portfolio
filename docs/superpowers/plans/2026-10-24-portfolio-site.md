# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a single-page editorial portfolio for Md. Mahin Ahmed at `AhnafMohsieu/Portfolio`.

**Architecture:** One hand-written `index.html` containing every section, one `styles.css` design system, one small `script.js` that only enhances filtering. No build step, no dependencies, no framework. A zero-dependency `node --test` suite asserts page structure and that every local link target exists on disk.

**Tech Stack:** HTML5, CSS3, vanilla ES5-compatible JavaScript, `node:test` for structural tests.

## Global Constraints

- No runtime dependencies, no bundler, no framework. The page must work opened directly from disk.
- Only external network dependency allowed: Google Fonts (`Fraunces`), with a `Georgia` fallback so the page still reads correctly offline.
- No inline event handlers (`onclick=`, `onload=`) anywhere in `index.html`.
- No JavaScript may be required to read content. Every work row, paper, and contact detail is present in the HTML.
- Copy rules: papers are **manuscripts prepared for submission**, never "published" or "accepted". Iron Build is "private build · available on request". Pantheon links are staging URLs.
- All colors, spacing, and type come from CSS custom properties declared in `:root`.
- Every local `href`/`src` in `index.html` must resolve to a file in the repository (enforced by tests).
- Commit messages follow `type: summary` (`feat:`, `test:`, `docs:`, `chore:`).

---

### Task 1: Page shell, design tokens, and test harness

**Files:**
- Create: `tests/site.test.js`
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: nothing.
- Produces: `index.html` with `<main id="main">`, `<header class="site-header">`, and a `.hero` section containing `<h1 id="hero-title">Md. Mahin Ahmed</h1>`; `styles.css` exposing the custom properties `--paper`, `--ink`, `--muted`, `--hairline`, `--accent`, `--serif`, `--sans`. Later tasks append sections to this file and must keep the skip link and landmarks intact.

- [ ] **Step 1: Write the failing test**

Create `tests/site.test.js`:

```js
"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const html = () => read("index.html");

test("page shell has skip link, header, main landmark, and one h1", () => {
  const page = html();
  assert.match(page, /class="skip-link" href="#main"/);
  assert.match(page, /<header class="site-header">/);
  assert.match(page, /<main id="main">/);
  assert.strictEqual((page.match(/<h1\b/g) || []).length, 1);
  assert.match(page, /<h1 id="hero-title">Md\. Mahin Ahmed<\/h1>/);
});

test("stylesheet declares every design token", () => {
  const css = read("styles.css");
  for (const token of [
    "--paper:#FAF9F6",
    "--ink:#14110F",
    "--muted:#6B6459",
    "--hairline:#E3DED4",
    "--accent:#9A3B26",
  ]) {
    assert.ok(css.includes(token), `missing token ${token}`);
  }
});

test("no inline event handlers", () => {
  assert.doesNotMatch(html(), /\son[a-z]+\s*=\s*"/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.js`
Expected: FAIL — `ENOENT: no such file or directory, open '...index.html'`

- [ ] **Step 3: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Md. Mahin Ahmed — Developer &amp; Researcher</title>
<meta name="description" content="Portfolio of Md. Mahin Ahmed: WordPress e-commerce for Bangladeshi payments, offline-first browser apps, and research on retrieval-augmented generation, AI in banking, blockchain, and green finance.">
<meta property="og:title" content="Md. Mahin Ahmed — Developer &amp; Researcher">
<meta property="og:description" content="WordPress e-commerce, offline-first web apps, and research manuscripts.">
<meta property="og:type" content="profile">
<meta property="og:image" content="assets/og.png">
<meta name="theme-color" content="#FAF9F6">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="shell">
    <p class="brand"><a href="#top">Md. Mahin Ahmed</a></p>
    <nav class="site-nav" aria-label="Primary">
      <ul>
        <li><a href="#work">Work</a></li>
        <li><a href="#research">Research</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <section class="hero shell" id="top" aria-labelledby="hero-title">
    <p class="eyebrow">Dhaka, Bangladesh · United International University</p>
    <h1 id="hero-title">Md. Mahin Ahmed</h1>
    <p class="lede">Developer and researcher. I build WordPress e-commerce for Bangladeshi payment methods, offline-first browser apps, and reproducible research on retrieval and finance.</p>
    <div class="actions">
      <a class="btn btn--solid" href="mailto:mahinahmed923@gmail.com?subject=Hello%20from%20your%20portfolio">Email me</a>
      <a class="btn" href="https://github.com/AhnafMohsieu">GitHub</a>
    </div>
  </section>
</main>
</body>
</html>
```

- [ ] **Step 4: Create `styles.css`**

```css
/* Portfolio — Md. Mahin Ahmed. Minimal editorial. No framework. */

:root{
  --paper:#FAF9F6;
  --ink:#14110F;
  --muted:#6B6459;
  --hairline:#E3DED4;
  --accent:#9A3B26;
  --shell:1100px;
  --measure:68ch;
  --serif:"Fraunces",Georgia,"Times New Roman",serif;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}

*,*::before,*::after{box-sizing:border-box}

html{scroll-behavior:smooth}

body{
  margin:0;
  background:var(--paper);
  color:var(--ink);
  font-family:var(--sans);
  font-size:17px;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}

a{color:var(--accent);text-decoration:underline;text-underline-offset:2px}
a:hover{color:var(--ink)}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

.skip-link{position:absolute;left:-9999px;top:0;background:var(--ink);color:var(--paper);padding:12px 18px;z-index:10}
.skip-link:focus{left:12px;top:12px}

.shell{width:min(100% - 48px,var(--shell));margin-inline:auto}

.site-header{border-bottom:1px solid var(--hairline)}
.site-header .shell{display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-block:22px;flex-wrap:wrap}
.brand{font-family:var(--serif);font-size:1.05rem;font-weight:600;margin:0}
.brand a{color:var(--ink);text-decoration:none}
.site-nav ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}
.site-nav a{color:var(--muted);text-decoration:none;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase}
.site-nav a:hover{color:var(--ink)}

.hero{padding-block:96px 72px}
.eyebrow{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 18px}
.hero h1{font-family:var(--serif);font-size:clamp(2.5rem,7vw,4.5rem);line-height:1.02;letter-spacing:-.02em;margin:0 0 20px;font-weight:600}
.hero .lede{max-width:56ch;font-size:1.15rem;color:var(--muted);margin:0 0 32px}
.actions{display:flex;gap:14px;flex-wrap:wrap}

.btn{display:inline-block;padding:12px 22px;border:1px solid var(--ink);border-radius:2px;font-size:.92rem;font-weight:600;text-decoration:none;color:var(--ink);background:transparent;transition:background 120ms ease,color 120ms ease,border-color 120ms ease}
.btn:hover{background:var(--accent);border-color:var(--accent);color:var(--paper)}
.btn--solid{background:var(--ink);color:var(--paper)}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
```

- [ ] **Step 5: Run tests and verify they pass**

Run: `node --test tests/site.test.js`
Expected: PASS, 3 tests.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css tests/site.test.js
git commit -m "feat: add page shell, design tokens, and structural tests"
```

---

### Task 2: Work section with filters

**Files:**
- Modify: `index.html` (append inside `<main>`, after the hero section)
- Modify: `styles.css` (append work + filter rules)
- Modify: `tests/site.test.js` (append tests)

**Interfaces:**
- Consumes: `.shell`, `--hairline`, `--accent` from Task 1.
- Produces: nine `<li class="work__row" data-cat="...">` elements inside `<ol class="work">`, and `<button class="chip" data-cat="..." aria-pressed="...">` elements inside `<div class="filters" role="group" aria-label="Filter work by type">`. Task 5's script depends on the exact class names `chip`, `work__row`, the attribute `data-cat`, the values `all|web|app|tool|research`, and the class `is-hidden`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/site.test.js`:

```js
const CATS = ["web", "app", "tool", "research"];

test("work section lists nine rows with known categories", () => {
  const rows = html().match(/<li class="work__row" data-cat="[a-z]+">/g) || [];
  assert.strictEqual(rows.length, 9);
  for (const row of rows) {
    const cat = row.match(/data-cat="([a-z]+)"/)[1];
    assert.ok(CATS.includes(cat), `unknown category ${cat}`);
  }
});

test("filter chips cover every category plus all", () => {
  const chips = html().match(/<button class="chip[^"]*" data-cat="[a-z]+"/g) || [];
  const values = chips.map((c) => c.match(/data-cat="([a-z]+)"/)[1]).sort();
  assert.deepStrictEqual(values, ["all", "app", "research", "tool", "web"]);
});

test("every work row has a title and a description", () => {
  const rows = html().split('<li class="work__row"').slice(1);
  for (const row of rows) {
    assert.match(row, /class="work__title"/);
    assert.match(row, /class="work__desc"/);
  }
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/site.test.js`
Expected: FAIL — `work section lists nine rows...` actual 0.

- [ ] **Step 3: Add the work section to `index.html`**

Insert immediately after the closing `</section>` of the hero:

```html
  <section class="section shell" id="work" aria-labelledby="work-title">
    <div class="section-head">
      <span class="section-num">01</span>
      <h2 id="work-title">Selected Work</h2>
      <p class="lede">Nine pieces across e-commerce, browser apps, and research. Filter by type; every entry links to the live build or the manuscript.</p>
    </div>

    <div class="filters" role="group" aria-label="Filter work by type">
      <button class="chip" type="button" data-cat="all" aria-pressed="true">All</button>
      <button class="chip" type="button" data-cat="web" aria-pressed="false">Web</button>
      <button class="chip" type="button" data-cat="app" aria-pressed="false">App</button>
      <button class="chip" type="button" data-cat="tool" aria-pressed="false">Tool</button>
      <button class="chip" type="button" data-cat="research" aria-pressed="false">Research</button>
    </div>

    <ol class="work">
      <li class="work__row" data-cat="web">
        <span class="work__num">01</span>
        <div class="work__body">
          <h3 class="work__title">NoriBD — Seafood E-commerce</h3>
          <p class="work__desc">WordPress shop for fresh seafood: catalogue, cart, checkout, and Bangladeshi payments alongside cash on delivery.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">WordPress · WooCommerce · bKash/Nagad</span>
          <a class="work__link" href="https://dev-noribd.pantheonsite.io/">Visit site</a>
        </div>
      </li>
      <li class="work__row" data-cat="web">
        <span class="work__num">02</span>
        <div class="work__body">
          <h3 class="work__title">Bangu Bhozon — Multi-Category Retail</h3>
          <p class="work__desc">Multi-category WordPress retail covering gadgets, fashion, groceries, books, home essentials, and fresh seafood, with the same local payment stack.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">WordPress · WooCommerce · COD</span>
          <a class="work__link" href="https://dev-bangu-bhozon.pantheonsite.io/">Visit site</a>
        </div>
      </li>
      <li class="work__row" data-cat="app">
        <span class="work__num">03</span>
        <div class="work__body">
          <h3 class="work__title">Ibadah Quest — Gamified Islamic PWA</h3>
          <p class="work__desc">Offline-first worship tracker with prayer times, streaks, XP and levels, a reading library, and progress analytics.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Vanilla JS · PWA · Service worker</span>
          <a class="work__link" href="https://ahnafmohsieu.github.io/Ibadah-Quest/">Open app</a>
        </div>
      </li>
      <li class="work__row" data-cat="app">
        <span class="work__num">04</span>
        <div class="work__body">
          <h3 class="work__title">Iron Build — Exercise Tracker</h3>
          <p class="work__desc">Offline-capable workout tracker for logging sessions and tracking progression over time.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Vanilla JS · PWA</span>
          <span class="work__note">Private build · available on request</span>
        </div>
      </li>
      <li class="work__row" data-cat="tool">
        <span class="work__num">05</span>
        <div class="work__body">
          <h3 class="work__title">Clash of Clans XP Simulator</h3>
          <p class="work__desc">No-build planner that turns attack, donation, builder, and war inputs into time-to-target projections with per-source breakdowns.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Vanilla JS · Chart.js · PWA</span>
          <a class="work__link" href="https://ahnafmohsieu.github.io/Clash-of-Clans-XP-Simulator/">Open simulator</a>
        </div>
      </li>
      <li class="work__row" data-cat="research">
        <span class="work__num">06</span>
        <div class="work__body">
          <h3 class="work__title">How Should We Chunk Scientific Documents for Retrieval?</h3>
          <p class="work__desc">Controlled evaluation of chunking strategies for retrieval-augmented generation, built on a reproducible 43-case test suite.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">RAG · Controlled evaluation</span>
          <a class="work__link" href="assets/papers/paper-1-chunking-rag.pdf">Read PDF</a>
        </div>
      </li>
      <li class="work__row" data-cat="research">
        <span class="work__num">07</span>
        <div class="work__body">
          <h3 class="work__title">The Rise of AI in Banking Research</h3>
          <p class="work__desc">Two-decade bibliometric analysis of AI in banking with structural break detection.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Bibliometric · Structural breaks</span>
          <a class="work__link" href="assets/papers/paper-2-ai-banking.pdf">Read PDF</a>
        </div>
      </li>
      <li class="work__row" data-cat="research">
        <span class="work__num">08</span>
        <div class="work__body">
          <h3 class="work__title">Blockchain in Banking Research</h3>
          <p class="work__desc">A decade of blockchain literature, where a sharp 2012 structural break marks the early-crypto era and no later break appears.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Blockchain · Bibliometric</span>
          <a class="work__link" href="assets/papers/paper-3-blockchain-banking.pdf">Read PDF</a>
        </div>
      </li>
      <li class="work__row" data-cat="research">
        <span class="work__num">09</span>
        <div class="work__body">
          <h3 class="work__title">Green and Sustainable Finance Research</h3>
          <p class="work__desc">Evidence that green finance research grows by continuous policy-driven diffusion rather than capability shocks, with no structural break at any date.</p>
        </div>
        <div class="work__meta">
          <span class="work__stack">Green finance · Diffusion</span>
          <a class="work__link" href="assets/papers/paper-4-green-finance.pdf">Read PDF</a>
        </div>
      </li>
    </ol>
  </section>
```

- [ ] **Step 4: Append work styles to `styles.css`**

```css
.section{padding-block:64px;border-top:1px solid var(--hairline)}
.section-head{margin-bottom:28px}
.section-num{display:block;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
h2{font-family:var(--serif);font-size:clamp(1.75rem,4vw,2.5rem);line-height:1.1;margin:0;font-weight:600;letter-spacing:-.01em}
.section .lede{max-width:var(--measure);color:var(--muted);margin:12px 0 0}

.filters{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0 8px}
.chip{font:inherit;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;padding:8px 15px;background:transparent;color:var(--muted);border:1px solid var(--hairline);border-radius:999px;cursor:pointer;transition:background 120ms ease,color 120ms ease,border-color 120ms ease}
.chip:hover{border-color:var(--muted);color:var(--ink)}
.chip[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}

.work{list-style:none;margin:0;padding:0}
.work__row{display:grid;grid-template-columns:3rem minmax(0,1fr) 15rem;gap:24px;padding:26px 0;border-bottom:1px solid var(--hairline)}
.work__row.is-hidden{display:none}
.work__num{font-family:var(--serif);font-size:.95rem;color:var(--accent);padding-top:5px}
.work__title{font-family:var(--serif);font-size:1.3rem;font-weight:600;line-height:1.25;margin:0 0 6px}
.work__desc{margin:0;color:var(--muted);max-width:58ch}
.work__meta{font-size:.84rem;color:var(--muted)}
.work__stack{display:block;margin-bottom:10px}
.work__note{display:block;color:var(--muted);font-style:italic}
.work__link{font-size:.84rem;letter-spacing:.03em}

@media (max-width:720px){
  .work__row{grid-template-columns:2.25rem minmax(0,1fr);gap:16px}
  .work__meta{grid-column:2}
}
```

- [ ] **Step 5: Run tests and verify they pass**

Run: `node --test tests/site.test.js`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css tests/site.test.js
git commit -m "feat: add selected work list with category filters"
```

---

### Task 3: Research, About, Contact, footer

**Files:**
- Modify: `index.html` (append after the work section)
- Modify: `styles.css` (append)
- Modify: `tests/site.test.js` (append)

**Interfaces:**
- Consumes: `assets/papers/*.pdf` paths introduced in Task 2's work rows.
- Produces: `<article class="paper">` elements, `#about`, `#contact`, and `<span id="year">2026</span>` that Task 5 overwrites.

- [ ] **Step 1: Write the failing tests**

Append to `tests/site.test.js`:

```js
test("research section documents four manuscripts as unpublished", () => {
  const page = html();
  const papers = page.match(/<article class="paper">/g) || [];
  assert.strictEqual(papers.length, 4);
  assert.doesNotMatch(page, /published|peer-reviewed/i);
  assert.match(page, /manuscript/i);
});

test("about and contact sections exist with real destinations", () => {
  const page = html();
  assert.match(page, /id="about"/);
  assert.match(page, /id="contact"/);
  assert.match(page, /mailto:mahinahmed923@gmail\.com/);
  assert.match(page, /https:\/\/github\.com\/AhnafMohsieu/);
});

test("footer year has a static fallback for JavaScript-off readers", () => {
  assert.match(html(), /id="year">\d{4}</);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/site.test.js`
Expected: FAIL — `papers.length` is 0.

- [ ] **Step 3: Append sections to `index.html` (inside `<main>`, after work section)**

```html
  <section class="section shell" id="research" aria-labelledby="research-title">
    <div class="section-head">
      <span class="section-num">02</span>
      <h2 id="research-title">Research</h2>
      <p class="lede">Four manuscripts prepared for submission. Each PDF is the full manuscript, not an abstract.</p>
    </div>

    <article class="paper">
      <h3 class="paper__title">How Should We Chunk Scientific Documents for Retrieval?</h3>
      <p class="paper__meta">Manuscript · prepared for submission to <em>Information</em> (MDPI) · 25 pages</p>
      <p class="paper__desc">A controlled evaluation of chunking strategies for retrieval-augmented generation, with a reproducible test suite rather than anecdotal comparisons.</p>
      <a class="paper__link" href="assets/papers/paper-1-chunking-rag.pdf">Read the manuscript (PDF, 25 pages)</a>
    </article>

    <article class="paper">
      <h3 class="paper__title">The Rise of Artificial Intelligence in Banking Research</h3>
      <p class="paper__meta">Manuscript · prepared for submission to <em>Journal of Open Innovation</em> (MDPI) · 23 pages</p>
      <p class="paper__desc">A two-decade bibliometric analysis of AI in banking, using structural break detection to date the field's shifts.</p>
      <a class="paper__link" href="assets/papers/paper-2-ai-banking.pdf">Read the manuscript (PDF, 23 pages)</a>
    </article>

    <article class="paper">
      <h3 class="paper__title">Blockchain and Distributed-Ledger Technologies in Banking Research</h3>
      <p class="paper__meta">Manuscript · prepared for submission to <em>Journal of Open Innovation</em> (MDPI) · 22 pages</p>
      <p class="paper__desc">Across a decade of literature, a sharp structural break in 2012 marks the early-crypto era; no later break appears.</p>
      <a class="paper__link" href="assets/papers/paper-3-blockchain-banking.pdf">Read the manuscript (PDF, 22 pages)</a>
    </article>

    <article class="paper">
      <h3 class="paper__title">Continuous Diffusion, Not Capability Shocks: Green and Sustainable Finance Research</h3>
      <p class="paper__meta">Manuscript · prepared for submission to <em>Information</em> (MDPI) · 23 pages</p>
      <p class="paper__desc">Green finance research grows through continuous policy-driven compounding rather than discrete breakthroughs, and moves independently of AI and blockchain.</p>
      <a class="paper__link" href="assets/papers/paper-4-green-finance.pdf">Read the manuscript (PDF, 23 pages)</a>
    </article>
  </section>

  <section class="section shell" id="about" aria-labelledby="about-title">
    <div class="section-head">
      <span class="section-num">03</span>
      <h2 id="about-title">About</h2>
    </div>
    <div class="prose">
      <p>I am a BBA candidate at United International University in Dhaka. My work sits between two disciplines: shipping software for small businesses and studying how technology diffuses through finance research.</p>
      <p>On the build side I focus on WordPress and WooCommerce storefronts for the Bangladeshi market, where bKash, Nagad, and cash on delivery matter more than card checkout, and on offline-first browser apps that keep working when the network does not. On the research side I care about reproducibility: the analyses behind my manuscripts run from versioned code and checked-in result files.</p>
      <p class="skills"><span class="skills__label">Toolkit</span> WordPress and WooCommerce · vanilla JavaScript and PWAs · Chart.js · Python · LaTeX · RAG and LLM evaluation · bibliometric analysis · bKash, Nagad, and COD integration</p>
    </div>
  </section>

  <section class="section shell" id="contact" aria-labelledby="contact-title">
    <div class="section-head">
      <span class="section-num">04</span>
      <h2 id="contact-title">Contact</h2>
      <p class="lede">Open to internships, freelance e-commerce builds, and research collaboration.</p>
    </div>
    <ul class="contact">
      <li><span class="contact__label">Email</span><a href="mailto:mahinahmed923@gmail.com">mahinahmed923@gmail.com</a></li>
      <li><span class="contact__label">GitHub</span><a href="https://github.com/AhnafMohsieu">github.com/AhnafMohsieu</a></li>
      <li><span class="contact__label">Location</span>Dhaka, Bangladesh</li>
      <li><span class="contact__label">Institution</span>United International University</li>
    </ul>
  </section>
</main>

<footer class="site-footer">
  <div class="shell">
    <p>© <span id="year">2026</span> Md. Mahin Ahmed</p>
    <p><a href="#top">Back to top</a></p>
  </div>
</footer>
```

Delete the old `</main>` line that closed the element after the hero — the snippet above supplies the new closing tag.

- [ ] **Step 4: Append styles to `styles.css`**

```css
.paper{padding:28px 0;border-bottom:1px solid var(--hairline)}
.paper:last-child{border-bottom:0}
.paper__title{font-family:var(--serif);font-size:1.35rem;font-weight:600;line-height:1.3;margin:0 0 6px;max-width:52ch}
.paper__meta{font-size:.82rem;letter-spacing:.04em;color:var(--muted);margin:0 0 10px;text-transform:uppercase}
.paper__desc{color:var(--muted);max-width:62ch;margin:0 0 10px}
.paper__link{font-size:.9rem}

.prose{max-width:var(--measure)}
.prose p{margin:0 0 16px}
.skills{font-size:.95rem;color:var(--muted)}
.skills__label{display:block;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}

.contact{list-style:none;margin:0;padding:0;display:grid;gap:10px;max-width:52ch}
.contact li{display:grid;grid-template-columns:9rem minmax(0,1fr);gap:16px;border-bottom:1px solid var(--hairline);padding-bottom:10px}
.contact__label{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding-top:3px}

.site-footer{border-top:1px solid var(--hairline);padding-block:28px;font-size:.85rem;color:var(--muted)}
.site-footer .shell{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.site-footer p{margin:0}

@media (max-width:720px){
  .contact li{grid-template-columns:1fr;gap:2px}
}
```

- [ ] **Step 5: Run tests and verify they pass**

Run: `node --test tests/site.test.js`
Expected: PASS, 9 tests.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css tests/site.test.js
git commit -m "feat: add research, about, contact, and footer sections"
```

---

### Task 4: Local asset verification test

**Files:**
- Modify: `tests/site.test.js`

**Interfaces:**
- Consumes: every `href`/`src` in `index.html`.
- Produces: a guard that fails the build when a local asset is missing, used again in Task 5 after PDFs are copied in.

- [ ] **Step 1: Write the failing test**

Append to `tests/site.test.js`:

```js
test("every local link and asset resolves on disk", () => {
  const page = html();
  const refs = [...page.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  const local = refs.filter(
    (r) => !/^(https?:|mailto:|#)/.test(r)
  );
  assert.ok(local.length >= 5, "expected local asset references");
  for (const ref of local) {
    assert.ok(
      fs.existsSync(path.join(ROOT, ref)),
      `missing local asset: ${ref}`
    );
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.js`
Expected: FAIL — `missing local asset: assets/favicon.svg`

- [ ] **Step 3: Create the assets**

Create `assets/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="MMA">
  <rect width="64" height="64" fill="#14110F"/>
  <text x="32" y="43" font-family="Georgia, serif" font-size="26" font-weight="600" fill="#FAF9F6" text-anchor="middle">M</text>
</svg>
```

Create `assets/og.png` as a 1200×630 social card. Generate it with the bundled script rather than checking in an opaque binary:

```bash
node scripts/make-og.js
```

`scripts/make-og.js` writes a minimal valid PNG using zlib (no dependencies):

```js
"use strict";
const fs = require("node:fs");
const zlib = require("node:zlib");
const path = require("node:path");

const W = 1200;
const H = 630;
const BG = [0xfa, 0xf9, 0xf6];

const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y++) {
  const row = y * (W * 3 + 1);
  raw[row] = 0;
  for (let x = 0; x < W; x++) {
    const i = row + 1 + x * 3;
    raw[i] = BG[0];
    raw[i + 1] = BG[1];
    raw[i + 2] = BG[2];
  }
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const byte of body) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([len, body, crcBuf]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const out = path.join(__dirname, "..", "assets", "og.png");
fs.writeFileSync(out, png);
console.log(`wrote ${out} (${W}x${H}, ${png.length} bytes)`);
```

Run it, then delete the generator if you prefer — but keeping it means the card can be regenerated:

```bash
node scripts/make-og.js
rm scripts/make-og.js
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.js`
Expected: PASS, 10 tests.

- [ ] **Step 5: Commit**

```bash
git add assets/favicon.svg assets/og.png tests/site.test.js
git commit -m "chore: add favicon and social preview assets"
```

---

### Task 5: Copy paper PDFs and add filtering script

**Files:**
- Create: `assets/papers/paper-1-chunking-rag.pdf` (copy from source)
- Create: `assets/papers/paper-2-ai-banking.pdf` (copy)
- Create: `assets/papers/paper-3-blockchain-banking.pdf` (copy)
- Create: `assets/papers/paper-4-green-finance.pdf` (copy)
- Create: `script.js`
- Modify: `index.html` (add `<script src="script.js" defer></script>` before `</body>`)
- Modify: `tests/site.test.js` (append)

**Interfaces:**
- Consumes: `.chip[data-cat]`, `.work__row[data-cat]`, `.is-hidden`, `#year` from Tasks 2 and 3.
- Produces: `window`-free IIFE; no exported API.

- [ ] **Step 1: Write the failing tests**

Append to `tests/site.test.js`:

```js
test("all four paper PDFs are present and non-trivial", () => {
  for (const n of [1, 2, 3, 4]) {
    const slugs = [
      "paper-1-chunking-rag",
      "paper-2-ai-banking",
      "paper-3-blockchain-banking",
      "paper-4-green-finance",
    ];
    const file = path.join(ROOT, "assets", "papers", `${slugs[n - 1]}.pdf`);
    assert.ok(fs.existsSync(file), `missing ${file}`);
    assert.ok(fs.statSync(file).size > 100000, `${file} looks truncated`);
  }
});

test("script.js is loaded with defer and handles filter state", () => {
  const page = html();
  assert.match(page, /<script src="script\.js" defer><\/script>/);
  const js = read("script.js");
  assert.match(js, /aria-pressed/);
  assert.match(js, /replaceState/);
  assert.match(js, /is-hidden/);
  assert.doesNotMatch(js, /\bvar\s+window\b/);
});

test("script.js parses as valid JavaScript", () => {
  const { execFileSync } = require("node:child_process");
  execFileSync(process.execPath, ["--check", path.join(ROOT, "script.js")]);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/site.test.js`
Expected: FAIL — missing `assets/papers/paper-1-chunking-rag.pdf`.

- [ ] **Step 3: Copy the PDFs**

```bash
mkdir -p assets/papers
cp "../Research Papers/Paper 1 - Chunking Strategies for Retrieval-Augmented Generation/manuscript.pdf" assets/papers/paper-1-chunking-rag.pdf
cp "../Research Papers/Paper 2 - Rise of Artificial Intelligence in Banking Research/manuscript.pdf" assets/papers/paper-2-ai-banking.pdf
cp "../Research Papers/Paper 3 - Blockchain in Banking/manuscript.pdf" assets/papers/paper-3-blockchain-banking.pdf
cp "../Research Papers/Paper 4 - Green Finance/manuscript.pdf" assets/papers/paper-4-green-finance.pdf
```

- [ ] **Step 4: Create `script.js`**

```js
/* Portfolio filtering. Progressive enhancement only: without this file every
   work row stays visible and the chips are inert. */
(function () {
  "use strict";

  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip[data-cat]"));
  var rows = Array.prototype.slice.call(document.querySelectorAll(".work__row[data-cat]"));
  if (!chips.length || !rows.length) return;

  var cats = chips.map(function (chip) { return chip.dataset.cat; });

  function apply(cat) {
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(chip.dataset.cat === cat));
    });
    rows.forEach(function (row) {
      row.classList.toggle("is-hidden", cat !== "all" && row.dataset.cat !== cat);
    });
    var hash = cat === "all" ? "#work" : "#work-" + cat;
    if (location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { apply(chip.dataset.cat); });
  });

  var fromHash = (location.hash || "").replace(/^#work-/, "");
  apply(cats.indexOf(fromHash) > -1 ? fromHash : "all");

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
```

- [ ] **Step 5: Add the script tag to `index.html`**

Insert before `</body>`:

```html
<script src="script.js" defer></script>
```

- [ ] **Step 6: Run tests and verify they pass**

Run: `node --test tests/site.test.js`
Expected: PASS, 13 tests.

- [ ] **Step 7: Manual browser check**

Open `index.html` directly. Verify: chips filter the list, `#work-app` in the URL survives a reload, all nine rows appear with JavaScript disabled, no console errors.

- [ ] **Step 8: Commit**

```bash
git add assets/papers script.js index.html tests/site.test.js
git commit -m "feat: host manuscript PDFs and add progressive filter script"
```

---

### Task 6: README, `.nojekyll`, and full verification

**Files:**
- Create: `.nojekyll` (empty)
- Modify: `README.md`
- Modify: `styles.css` (append responsive rules if any remain unapplied)

**Interfaces:**
- Consumes: everything above.
- Produces: publishable repository state.

- [ ] **Step 1: Create `.nojekyll`**

```bash
printf "" > .nojekyll
```

- [ ] **Step 2: Replace `README.md`**

```markdown
# Portfolio

Single-page portfolio for Md. Mahin Ahmed — WordPress e-commerce builds, offline-first browser apps, and research manuscripts.

Live site: not yet published (see Deployment).

## Editing

Everything a visitor reads lives in `index.html`, written by hand. To change a
work entry, edit its `<li class="work__row">` block; `data-cat` must stay one of
`web`, `app`, `tool`, `research`. To add a paper, copy the PDF into
`assets/papers/` and add a matching `<article class="paper">` block.

Design tokens (colors, fonts, widths) are the custom properties at the top of
`styles.css`. No build step, no dependencies.

## Tests

```bash
node --test tests/site.test.js
```

The suite checks page structure, that no inline handlers crept in, that the copy
never calls a manuscript "published", and that every local link and asset exists
on disk.

## Deployment (GitHub Pages)

Pages on a private repository requires a paid plan. On a free account, first make
the repository public: Settings → General → Danger Zone → Change visibility.
Then Settings → Pages → Source: `main` / `/ (root)`.

## Known limitations

- The Pantheon links (`dev-noribd`, `dev-bangu-bhozon`) are staging URLs and may
  expire; if one dies, remove the link rather than leaving it broken.
- Iron Build has no public URL, so it is listed without a link.
- The four papers are manuscripts prepared for submission, not published work.
```

- [ ] **Step 3: Run the whole suite**

```bash
node --test tests/site.test.js
node --check script.js
```

Expected: 13 tests pass, no syntax errors.

- [ ] **Step 4: Responsive and keyboard pass**

Check at 360px, 720px, and 1440px. Tab through: skip link, four nav links, two hero buttons, five chips, nine rows, four PDF links, footer. Focus must be visible at every stop.

- [ ] **Step 5: Verify every external link resolves**

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8');const u=[...h.matchAll(/href=\"(https?:[^\"]+)\"/g)].map(m=>m[1]);Promise.all(u.map(async x=>{const r=await fetch(x,{method:'HEAD'}).catch(()=>({status:'ERR'}));console.log(r.status,x)}))"
```

Expected: 200 for GitHub and both `github.io` apps; the two Pantheon staging URLs may return 3xx/403 and are acceptable but should be noted.

- [ ] **Step 6: Commit and push**

```bash
git add .nojekyll README.md
git commit -m "docs: document editing, tests, and deployment"
git push
```

---

## Self-Review Notes

- **Spec coverage:** purpose and layout (Tasks 1–3), content inventory and copy rules (Tasks 2–3, enforced by tests), visual system (Task 1 tokens plus Tasks 2–3 rules), behavior and no-JS fallback (Task 5), accessibility (Tasks 2–4 plus the Task 6 keyboard pass), deployment (Task 6), testing (all tasks), risks (Task 6 README).
- **Deviation from the spec:** the spec listed `assets/og.png` without saying how to produce it; Task 4 adds a throwaway generator so the file is reproducible instead of an unexplained binary.
- **Consistency:** `data-cat` values, `.is-hidden`, `#year`, and the `assets/papers/*.pdf` slugs are identical across tasks and tests.
