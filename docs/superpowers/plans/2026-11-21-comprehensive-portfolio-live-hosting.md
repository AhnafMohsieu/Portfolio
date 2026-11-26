# Comprehensive Portfolio & Live Hosting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Md. Mahin Ahmed's single-page portfolio into a comprehensive showcase featuring all 3 WordPress e-commerce static archives, 3 live browser apps/tools, 5 academic research manuscripts, 10 empirical finance reports and valuation models, and a live CV link, with automated test coverage and GitHub Actions continuous health monitoring.

**Architecture:** Maintain the zero-dependency, high-performance static HTML/CSS/vanilla JS architecture served by GitHub Pages. Stage all downloadable research paper PDFs and empirical finance reports locally in `assets/papers/` and `assets/reports/`, enrich `index.html` with dedicated semantic sections, update filtering in `styles.css` and `script.js`, and enforce end-to-end integrity with an expanded Node test suite and automated GitHub Actions health checks.

**Tech Stack:** HTML5 semantic landmarks, Vanilla CSS (custom properties, Fraunces serif typography, mobile grid), Vanilla JavaScript (progressive enhancement filtering), Node.js test runner (`node:test`, `node:assert`), GitHub Pages, and GitHub Actions CI.

## Global Constraints

- **Zero Frameworks / No Build Step**: The site must remain 100% vanilla HTML, CSS, and JS.
- **Copy Restrictions**: Academic research papers must strictly be labeled *manuscript* prepared for submission, NEVER *published* or *peer-reviewed*.
- **Asset Integrity**: Every file referenced via relative `href` or `src` must physically exist on disk in `assets/papers/` or `assets/reports/`.
- **Live URLs**: External links for apps, websites hub, and CV must strictly target verified live endpoints (`https://ahnafmohsieu.github.io/...`).
- **PowerShell Discipline**: Local terminal execution on Windows must use native PowerShell syntax and backslashes.

---

### Task 1: Stage Paper 5 and Empirical Finance Report Assets

**Files:**
- Create/Copy:
  - `Portfolio/assets/papers/paper-5-prime-bank.pdf`
  - `Portfolio/assets/reports/report-1-dse-event-study.pdf`
  - `Portfolio/assets/reports/report-2-square-pharma-dcf.xlsx`
  - `Portfolio/assets/reports/report-3-city-bank-prudential-risk.pdf`
  - `Portfolio/assets/reports/report-4-crown-cement-working-capital.pdf`
  - `Portfolio/assets/reports/report-5-strategic-hrm-analytics.pdf`
  - `Portfolio/assets/reports/report-6-behavioral-governance.pdf`
  - `Portfolio/assets/reports/report-7-grameenphone-strategy.pdf`
  - `Portfolio/assets/reports/report-8-pharma-aids-fsa.pdf`
  - `Portfolio/assets/reports/report-9-toyota-international-business.pdf`
  - `Portfolio/assets/reports/report-10-sundarban-honey-marketing.pdf`

**Interfaces:**
- Consumes: Source documents from `C:\Users\Mahin\Desktop\Project\Research Papers` and `C:\Users\Mahin\Desktop\Project\Course Reports\AGY CR`.
- Produces: Normalized PDF/XLSX assets in `Portfolio/assets/papers/` and `Portfolio/assets/reports/` for local serving.

- [ ] **Step 1: Create target directory and stage assets via PowerShell**

```powershell
$portfolioDir = "C:\Users\Mahin\Desktop\Project\Portfolio"
$reportsDir = Join-Path $portfolioDir "assets\reports"
if (!(Test-Path $reportsDir)) { New-Item -ItemType Directory -Path $reportsDir -Force }

# Copy Paper 5
Copy-Item "C:\Users\Mahin\Desktop\Project\Research Papers\Paper 5 - Prime Bank PLC Commercial Banking Thesis\manuscript.pdf" "$portfolioDir\assets\papers\paper-5-prime-bank.pdf" -Force

# Copy AGY CR Reports & Models
$map = @{
    "Securities Analysis & Portfolio Management Report.pdf" = "report-1-dse-event-study.pdf"
    "Management of Financial Institution Report.pdf"        = "report-3-city-bank-prudential-risk.pdf"
    "Managerial Finance Report.pdf"                         = "report-4-crown-cement-working-capital.pdf"
    "Human Resource Management Report.pdf"                  = "report-5-strategic-hrm-analytics.pdf"
    "Organizational Business Report.pdf"                    = "report-6-behavioral-governance.pdf"
    "Strategic Management Report.pdf"                       = "report-7-grameenphone-strategy.pdf"
    "Financial Statement Analysis Report.pdf"               = "report-8-pharma-aids-fsa.pdf"
    "International Business Studies Report.pdf"             = "report-9-toyota-international-business.pdf"
    "Management Marketing Report.pdf"                       = "report-10-sundarban-honey-marketing.pdf"
}
$srcDir = "C:\Users\Mahin\Desktop\Project\Course Reports\AGY CR\PDF_Publications"
foreach ($k in $map.Keys) {
    Copy-Item (Join-Path $srcDir $k) (Join-Path $reportsDir $map[$k]) -Force
}

# Copy Excel Model
Copy-Item "C:\Users\Mahin\Desktop\Project\Course Reports\AGY CR\Financial Modelling Analysis.xlsx" "$reportsDir\report-2-square-pharma-dcf.xlsx" -Force
```

- [ ] **Step 2: Verify all staged assets exist and are non-empty**

Run:
```powershell
$required = @(
    "assets\papers\paper-5-prime-bank.pdf",
    "assets\reports\report-1-dse-event-study.pdf",
    "assets\reports\report-2-square-pharma-dcf.xlsx",
    "assets\reports\report-3-city-bank-prudential-risk.pdf",
    "assets\reports\report-4-crown-cement-working-capital.pdf",
    "assets\reports\report-5-strategic-hrm-analytics.pdf",
    "assets\reports\report-6-behavioral-governance.pdf",
    "assets\reports\report-7-grameenphone-strategy.pdf",
    "assets\reports\report-8-pharma-aids-fsa.pdf",
    "assets\reports\report-9-toyota-international-business.pdf",
    "assets\reports\report-10-sundarban-honey-marketing.pdf"
)
foreach ($r in $required) {
    $p = "C:\Users\Mahin\Desktop\Project\Portfolio\$r"
    if (!(Test-Path $p) -or (Get-Item $p).Length -lt 50000) { throw "Invalid asset: $r" }
}
Write-Output "ALL ASSETS VERIFIED"
```
Expected: `ALL ASSETS VERIFIED`

- [ ] **Step 3: Commit staged assets**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" add assets/
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" commit -m "feat: stage Paper 5 and 10 empirical finance reports and models"
```

---

### Task 2: Stylesheet Extensions for New Sections

**Files:**
- Modify: `Portfolio/styles.css`

**Interfaces:**
- Consumes: Existing custom properties (`--paper`, `--ink`, `--muted`, `--accent`, `--hairline`, `--serif`, `--sans`).
- Produces: Layout classes `.grid--cards`, `.card`, `.badge`, `.card__links`, `.note-banner`.

- [ ] **Step 1: Add new component styles to `styles.css`**

Append modern editorial card, badge, and grid styles matching Fraunces typography:
```css
/* Cards Grid for Apps & Websites */
.grid--cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:24px}
.card{background:transparent;border:1px solid var(--hairline);padding:24px;display:flex;flex-direction:column;justify-content:space-between;transition:border-color 140ms ease}
.card:hover{border-color:var(--muted)}
.card__header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;gap:12px}
.card__title{font-family:var(--serif);font-size:1.25rem;font-weight:600;margin:0;line-height:1.25}
.badge{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);border:1px solid var(--accent);padding:2px 8px;border-radius:999px;white-space:nowrap}
.card__desc{color:var(--muted);font-size:.92rem;margin:0 0 16px;line-height:1.55}
.card__meta{font-size:.82rem;color:var(--muted);margin-bottom:16px}
.card__links{display:flex;gap:16px;font-size:.86rem;flex-wrap:wrap}

/* Notice banner for static web archives */
.notice-box{border-left:3px solid var(--accent);background:rgba(154,59,38,.05);padding:14px 18px;margin-bottom:24px;font-size:.88rem;color:var(--muted)}
.notice-box strong{color:var(--ink)}

/* Finance report list items */
.report-row{display:grid;grid-template-columns:3rem minmax(0,1fr) 12rem;gap:24px;padding:24px 0;border-bottom:1px solid var(--hairline)}
.report-row:last-child{border-bottom:0}
.report-row__num{font-family:var(--serif);font-size:.95rem;color:var(--accent);padding-top:4px}
.report-row__title{font-family:var(--serif);font-size:1.2rem;font-weight:600;margin:0 0 6px;line-height:1.3}
.report-row__desc{color:var(--muted);font-size:.9rem;margin:0 0 8px;max-width:62ch}
.report-row__meta{font-size:.82rem;color:var(--muted);margin:0}
.report-row__action{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;font-size:.86rem;gap:6px}

@media (max-width:720px){
  .report-row{grid-template-columns:2.25rem minmax(0,1fr);gap:16px}
  .report-row__action{grid-column:2}
}
```

- [ ] **Step 2: Verify CSS validity**

Run:
```powershell
Get-Content "C:\Users\Mahin\Desktop\Project\Portfolio\styles.css" | Select-String "grid--cards", "report-row", "notice-box"
```
Expected: All 3 class patterns appear.

- [ ] **Step 3: Commit stylesheet updates**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" add styles.css
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" commit -m "feat: add card, report, and notice styles in styles.css"
```

---

### Task 3: Markup Expansion in `index.html`

**Files:**
- Modify: `Portfolio/index.html`

**Interfaces:**
- Consumes: Staged files in `assets/papers/` and `assets/reports/`, CSS classes from Task 2.
- Produces: Updated DOM landmarks (`#main`), navigation anchors (`#work`, `#apps`, `#websites`, `#research`, `#finance`, `#about`, `#contact`), filter chips including `finance`, and CV links.

- [ ] **Step 1: Update navigation and hero in `index.html`**

Update `<nav class="site-nav">`:
```html
<nav class="site-nav" aria-label="Primary">
  <ul>
    <li><a href="#work">Work</a></li>
    <li><a href="#apps">Apps</a></li>
    <li><a href="#websites">Sites</a></li>
    <li><a href="#research">Research</a></li>
    <li><a href="#finance">Finance</a></li>
    <li><a href="https://ahnafmohsieu.github.io/Portfolio/cv/">CV</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```
In `.hero .actions`:
```html
<div class="actions">
  <a class="btn btn--solid" href="mailto:published on the live page only?subject=Hello%20from%20your%20portfolio">Email me</a>
  <a class="btn" href="https://ahnafmohsieu.github.io/Portfolio/cv/">View CV</a>
  <a class="btn" href="https://github.com/AhnafMohsieu">GitHub</a>
</div>
```

- [ ] **Step 2: Update Selected Work with `finance` filter chip and flagship rows**

Add the `finance` chip to `.filters`:
```html
<button class="chip" type="button" data-cat="finance" aria-pressed="false">Finance</button>
```
Add flagship rows to `<ol class="work">` with `data-cat="finance"` and `data-cat="research"`:
- Square Pharma Corporate DCF Valuation model
- DSE Dividend Announcement Event Study
- City Bank PLC CAMELS & Basel III Risk
- Crown Cement Working Capital CCC
- Paper 5: Commercial Banking Performance, Credit Risk & Macroeconomic Shocks (Prime Bank PLC)

- [ ] **Step 3: Add dedicated `#apps` and `#websites` sections**

```html
<section class="section shell" id="apps" aria-labelledby="apps-title">
  <div class="section-head">
    <span class="section-num">02</span>
    <h2 id="apps-title">Live Applications & Tools</h2>
    <p class="lede">Offline-first browser applications and calculation tools built with vanilla JavaScript, service workers, and Chart.js. Hosted continuously on GitHub Pages.</p>
  </div>
  <div class="grid--cards">
    <!-- Ibadah Quest Card -->
    <!-- Iron Build Card -->
    <!-- Clash of Clans XP Simulator Card -->
  </div>
</section>

<section class="section shell" id="websites" aria-labelledby="websites-title">
  <div class="section-head">
    <span class="section-num">03</span>
    <h2 id="websites-title">E-Commerce Storefronts</h2>
    <p class="lede">WordPress & WooCommerce retail builds engineered for the Bangladeshi payment ecosystem (bKash, Nagad, Cash on Delivery).</p>
  </div>
  <div class="notice-box">
    <strong>Static Mirror Hub:</strong> These storefronts are hosted as browsable static captures of running WordPress installations. Catalogs and product detail views are live; checkout and cart actions are answered client-side with informational notices.
  </div>
  <div class="grid--cards">
    <!-- NoriBD Card -->
    <!-- Bangu Bhozon Card -->
    <!-- Cafe Neptune Card -->
  </div>
</section>
```

- [ ] **Step 4: Update `#research` to 5 manuscripts and add `#finance` section**

In `#research`: Add `<article class="paper">` for Paper 5:
```html
<article class="paper">
  <h3 class="paper__title">Commercial Banking Performance, Credit Risk Dynamics, and Macroeconomic Shocks: An Empirical Study of Prime Bank PLC</h3>
  <p class="paper__meta">Manuscript · prepared for submission · 25 pages</p>
  <p class="paper__desc">Longitudinal econometric assessment of credit risk governance, Basel III prudential compliance, and loan-loss provisioning through macroeconomic volatility.</p>
  <a class="paper__link" href="assets/papers/paper-5-prime-bank.pdf">Read the manuscript (PDF, 25 pages)</a>
</article>
```

Add Section `05 — Empirical Finance & Business Studies` (`#finance`):
Listing all 10 reports with title, metadata, description, and download link to `assets/reports/report-*.pdf` and `assets/reports/report-2-square-pharma-dcf.xlsx`.

- [ ] **Step 5: Verify markup with git diff and basic checks**

Run:
```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" diff index.html | Select-String "id=""finance""", "id=""apps""", "id=""websites"""
```
Expected: All three section IDs present.

- [ ] **Step 6: Commit `index.html` updates**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" add index.html
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" commit -m "feat: expand index.html with apps, websites, 5 papers, and 10 finance reports"
```

---

### Task 4: Test Suite Updates & Validation

**Files:**
- Modify: `Portfolio/tests/site.test.js`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js`, `assets/papers/`, `assets/reports/`.
- Produces: Node.js test runner passing output.

- [ ] **Step 1: Update assertions in `site.test.js`**

Modify:
1. `CATS`: Update to `["web", "app", "tool", "research", "finance"]`.
2. `PAPER_SLUGS`: Add `"paper-5-prime-bank"`.
3. Add `REPORT_SLUGS`: Array of the 10 report slugs.
4. Update `papers.length`: Assert 5.
5. Add test for reports: Assert 10 report items with valid non-trivial files in `assets/reports/`.
6. Assert CV link `https://ahnafmohsieu.github.io/Portfolio/cv/` exists.
7. Maintain strict anti-hallucination constraint: no manuscript or report called "published".

- [ ] **Step 2: Run test suite**

Run:
```powershell
node --test "C:\Users\Mahin\Desktop\Project\Portfolio\tests\site.test.js"
```
Expected: All tests pass with 0 failures.

- [ ] **Step 3: Commit test suite updates**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" add tests/site.test.js
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" commit -m "test: expand test suite for 5 papers, 10 finance reports, and live CV links"
```

---

### Task 5: GitHub Actions Continuous Health-Check Workflow

**Files:**
- Create: `Portfolio/.github/workflows/healthcheck.yml`

**Interfaces:**
- Consumes: GitHub Actions runner, Node.js environment, public internet access to ping `ahnafmohsieu.github.io`.
- Produces: Green CI status badge and build notifications.

- [ ] **Step 1: Write workflow file `.github/workflows/healthcheck.yml`**

```yaml
name: Test Suite & Live Endpoint Healthcheck

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run every Monday at midnight UTC
    - cron: '0 0 * * 1'
  workflow_dispatch:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run local portfolio test suite
        run: node --test tests/site.test.js

      - name: Ping live GitHub Pages endpoints
        run: |
          urls=(
            "https://ahnafmohsieu.github.io/Portfolio/"
            "https://ahnafmohsieu.github.io/Websites/"
            "https://ahnafmohsieu.github.io/Websites/nori/"
            "https://ahnafmohsieu.github.io/Websites/bangubhozon/"
            "https://ahnafmohsieu.github.io/Websites/cafe-neptune/"
            "https://ahnafmohsieu.github.io/Ibadah-Quest/"
            "https://ahnafmohsieu.github.io/Iron-Build/"
            "https://ahnafmohsieu.github.io/Clash-of-Clans-Exp-Simulator/"
            "https://ahnafmohsieu.github.io/Portfolio/cv/"
          )
          for url in "${urls[@]}"; do
            status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
            echo "Checking $url -> HTTP $status"
            if [ "$status" != "200" ]; then
              echo "Error: $url returned HTTP $status instead of 200"
              exit 1
            fi
          done
          echo "All 9 live endpoints healthy!"
```

- [ ] **Step 2: Commit workflow file**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" add .github/workflows/healthcheck.yml
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" commit -m "ci: add GitHub Actions test suite and live endpoint health check workflow"
```

---

### Task 6: Push to GitHub & Verify Live Deployment

**Files:** None (Git remote operation)

- [ ] **Step 1: Push changes to GitHub `origin main`**

```powershell
git -C "C:\Users\Mahin\Desktop\Project\Portfolio" push origin main
```
Expected: Remote accepts push and GitHub Pages deployment builds.

- [ ] **Step 2: Trigger and verify the GitHub Actions health check workflow**

Run:
```powershell
gh workflow run healthcheck.yml --repo AhnafMohsieu/Portfolio
Start-Sleep -Seconds 10
gh run list --repo AhnafMohsieu/Portfolio --limit 3
```
Expected: Workflow run in progress or success.

- [ ] **Step 3: Live verify the updated Portfolio on GitHub Pages**

Run:
```powershell
$resp = Invoke-WebRequest -Uri "https://ahnafmohsieu.github.io/Portfolio/" -TimeoutSec 15 -UseBasicParsing
if ($resp.StatusCode -eq 200 -and $resp.Content -match "paper-5-prime-bank") {
    Write-Output "PORTFOLIO LIVE & FULLY UPDATED"
} else {
    Write-Output "Deployment propagating... (Status: $($resp.StatusCode))"
}
```
Expected: `PORTFOLIO LIVE & FULLY UPDATED`
