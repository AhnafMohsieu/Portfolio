# Comprehensive Portfolio & Live Hosting — Design

Date: 2026-11-21  
Status: Approved for planning  
Owner: Md. Mahin Ahmed (github.com/AhnafMohsieu)  

## 1. Purpose

A single-page, zero-dependency, public portfolio presenting the full scope of Md. Mahin Ahmed's work:
1. Three WordPress WooCommerce storefront static archives
2. Three live browser apps and interactive tools (PWAs)
3. Five academic research manuscripts (prepared for submission)
4. Ten empirical finance models and business research deliverables
5. Live Curriculum Vitae (CV) viewer
6. Automated health checks and continuous GitHub deployment

The portfolio serves dual audiences:
- **Technical & Industry**: Recruiters, clients, and engineering teams evaluating front-end engineering, offline-first PWA architectures, and e-commerce implementations.
- **Academic & Financial Institutions**: Research collaborators, graduate admissions, and investment/commercial banking evaluators reviewing quantitative finance models, econometric event studies, and bibliometric research.

Success criteria:
- Every project is live and reachable in one click from the portfolio.
- Zero build steps; lightweight, accessible, hand-crafted vanilla HTML/CSS/JS.
- Strict test coverage with `tests/site.test.js` validating all assets, paths, links, and accessibility rules.
- Automated GitHub Actions workflow testing site integrity and verifying `HTTP 200 OK` across all 9 live GitHub Pages endpoints.

---

## 2. Live Hosting & Deployment Architecture

All projects are hosted entirely on GitHub Pages under the `AhnafMohsieu` organization with 100% uptime, zero hosting costs, and automated deployment from `main` branch roots:

| Project | Type | Source Repository | Live Hosted URL |
|---|---|---|---|
| **Portfolio** | Main Hub | `AhnafMohsieu/Portfolio` | `https://ahnafmohsieu.github.io/Portfolio/` |
| **Websites Hub** | Archive Portal | `AhnafMohsieu/Websites` | `https://ahnafmohsieu.github.io/Websites/` |
| **NoriBD** | WooCommerce Archive | `AhnafMohsieu/Websites` | `https://ahnafmohsieu.github.io/Websites/nori/` |
| **Bangu Bhozon** | WooCommerce Archive | `AhnafMohsieu/Websites` | `https://ahnafmohsieu.github.io/Websites/bangubhozon/` |
| **Cafe Neptune** | WooCommerce Archive | `AhnafMohsieu/Websites` | `https://ahnafmohsieu.github.io/Websites/cafe-neptune/` |
| **Ibadah Quest** | PWA Tracker | `AhnafMohsieu/Ibadah-Quest` | `https://ahnafmohsieu.github.io/Ibadah-Quest/` |
| **Iron Build** | PWA Workout App | `AhnafMohsieu/Iron-Build` | `https://ahnafmohsieu.github.io/Iron-Build/` |
| **CoC XP Simulator** | Interactive Tool | `AhnafMohsieu/Clash-of-Clans-Exp-Simulator` | `https://ahnafmohsieu.github.io/Clash-of-Clans-Exp-Simulator/` |
| **Curriculum Vitae** | Live CV Viewer | `AhnafMohsieu/CV` | `https://ahnafmohsieu.github.io/CV/` |

---

## 3. Content Inventory & Asset Architecture

### A. Academic Research Manuscripts (5 Papers)
Stored in `Portfolio/assets/papers/`:
1. `paper-1-chunking-rag.pdf`: *How Should We Chunk Scientific Documents for Retrieval? A Controlled Evaluation of Chunking Strategies for Retrieval-Augmented Generation* (MDPI Information, 25 pages)
2. `paper-2-ai-banking.pdf`: *The Rise of Artificial Intelligence in Banking Research: A Two-Decade Bibliometric Analysis with Structural Break Detection* (MDPI JOI, 23 pages)
3. `paper-3-blockchain-banking.pdf`: *Blockchain and Distributed-Ledger Technologies in Banking Research: Structural Break Detection Across a Decade of Growth* (MDPI JOI, 22 pages)
4. `paper-4-green-finance.pdf`: *Continuous Diffusion, Not Capability Shocks: Green and Sustainable Finance Research Without a Structural Break* (MDPI Information, 23 pages)
5. `paper-5-prime-bank.pdf`: *Commercial Banking Performance, Credit Risk Dynamics, and Macroeconomic Shocks: An Empirical Study of Prime Bank PLC* (Prepared manuscript, 24+ pages; copied from `Research Papers/Paper 5 - Prime Bank PLC Commercial Banking Thesis/manuscript.pdf`)

*Constraint: Factual terminology strictly designates these works as manuscripts prepared for submission; no claims of accepted publication.*

### B. Empirical Finance Models & Business Studies (10 Deliverables)
Stored in `Portfolio/assets/reports/` (copied from `Course Reports/AGY CR/PDF_Publications/` and `Course Reports/AGY CR/`):
1. `report-1-dse-event-study.pdf`: *Market Efficiency and Event-Driven Stock Returns: An Empirical Test on the Dhaka Stock Exchange* (21 pages; companion Python OLS/Patell Z engine)
2. `report-2-square-pharma-dcf.xlsx` & summary PDF: *Corporate DCF Valuation, Weighted Average Cost of Capital (WACC), and Dynamic Growth Sensitivity Framework: Square Pharmaceuticals PLC* (17-sheet model + 1,000-run Monte Carlo VaR simulation)
3. `report-3-city-bank-prudential-risk.pdf`: *Commercial Bank Performance and Prudential Risk Management: A Financial Study of City Bank PLC (2021–2025)* (32 pages, 36 financial ratios, Basel III CAMELS)
4. `report-4-crown-cement-working-capital.pdf`: *Working Capital Management and Financial Forecasting in Manufacturing: An Empirical Study of Crown Cement PLC* (23 pages, Cash Conversion Cycle & AFN)
5. `report-5-strategic-hrm-analytics.pdf`: *Strategic Human Resource Management, Dynamic Capabilities, and Workforce Analytics* (18 pages, RBV & VRIO frameworks)
6. `report-6-behavioral-governance.pdf`: *Human Capital Management and Organizational Behavior: Employee Motivation and Team Performance* (13 pages, Big Five & groupthink mitigation)
7. `report-7-grameenphone-strategy.pdf`: *Strategic Architecture and Competitive Dynamics in Frontier Telecommunications: Grameenphone Limited* (20 pages, Porter's Five Forces & Telco-to-TechCo)
8. `report-8-pharma-aids-fsa.pdf`: *Longitudinal Financial Statement Analysis and Corporate Ratio Evaluation: Pharma Aids Limited (2018–2023)* (26 pages, 6-year DuPont decomposition)
9. `report-9-toyota-international-business.pdf`: *Multinational Enterprise Strategy and Market Penetration in Frontier Economies: Toyota Motor Corporation in Bangladesh* (26 pages, Dunning's OLI & CKD localization)
10. `report-10-sundarban-honey-marketing.pdf`: *Commercial Feasibility, Market Growth Strategy, and Brand Architecture: Sundarban Honey Co.* (11 pages, 4P & pro-forma economics)

---

## 4. Page Structure & User Experience

Single-page layout, structured into clear semantic landmarks:

1. **Header & Skip Link**: Accessible skip to `#main`. Primary navigation links:
   - `Work` (`#work`)
   - `Apps` (`#apps`)
   - `Websites` (`https://ahnafmohsieu.github.io/Websites/`)
   - `Research` (`#research`)
   - `Finance` (`#finance`)
   - `CV` (`https://ahnafmohsieu.github.io/CV/`)
   - `Contact` (`#contact`)

2. **Hero Section (`#top`)**:
   - Eyebrow: `Dhaka, Bangladesh · United International University`
   - Title: `Md. Mahin Ahmed`
   - Lede: *Developer and researcher. I build offline-first browser apps, WordPress e-commerce for Bangladeshi payment gateways, and reproducible empirical research across finance and retrieval.*
   - CTAs: `Email me` (`mailto`), `View CV` (`https://ahnafmohsieu.github.io/CV/`), `GitHub` (`https://github.com/AhnafMohsieu`).

3. **Section 01 — Selected Work (`#work`)**:
   - Filter Chips: `All`, `Web`, `App`, `Tool`, `Research`, `Finance`.
   - Comprehensive tabular rows displaying title, brief description, technology stack, and direct action link.
   - Client-side filtering via `script.js` preserving keyboard accessibility and query parameter state.

4. **Section 02 — Browser Apps & Tools (`#apps`)**:
   - Showcase cards for *Ibadah Quest*, *Iron Build*, and *Clash of Clans XP Simulator*.
   - Features, offline/PWA capabilities, and dual action links (Launch Live App, View Source).

5. **Section 03 — Research Manuscripts (`#research`)**:
   - All 5 manuscripts with target journals, page counts, empirical methodologies, and direct PDF download links.

6. **Section 04 — Empirical Finance & Business Studies (`#finance`)**:
   - The 10 landmark reports with executive findings, methodologies (DCF, CAMELS, OLS Event Study, DuPont, etc.), and downloadable PDF / Excel model assets.

7. **Section 05 — About (`#about`)**:
   - Biographical statement, academic institution, engineering and financial toolkits.

8. **Section 06 — Contact (`#contact`)**:
   - Email, GitHub, LinkedIn, location, institution, and CV link.

9. **Footer**:
   - Copyright notice with dynamic/static year fallback and back-to-top anchor.

---

## 5. Automated Verification & CI/CD Health Monitoring

1. **Local Test Suite (`tests/site.test.js`)**:
   - Extends existing assertions to cover:
     - All 5 paper PDFs and 10 finance reports present on disk (>100 KB).
     - Filter chip coverage including `finance`.
     - Valid external URLs (checking format and target repos).
     - Landmark and accessibility rules.
   - Run command: `node --test tests/site.test.js`.

2. **GitHub Actions Health-Check Workflow (`.github/workflows/healthcheck.yml`)**:
   - Triggers: `push` to `main`, `pull_request`, and scheduled weekly `cron: '0 0 * * 1'`.
   - Steps:
     1. Check out repository.
     2. Setup Node.js.
     3. Run `node --test tests/site.test.js`.
     4. Health check: Ping all 9 GitHub Pages URLs and assert `HTTP 200 OK`.
     5. Fail workflow with actionable summary if any site is down or an asset is missing.

---

## 6. Implementation Sequence

1. Asset staging: Copy Paper 5 PDF and 10 AGY CR publication PDFs/models into `assets/papers/` and `assets/reports/`.
2. Markup & styles: Update `index.html` and `styles.css` with new sections, filter buttons, navigation, and CV links.
3. Filtering script: Update `script.js` to support new category filters.
4. Test updates: Update `tests/site.test.js` to enforce all deliverables and run local tests.
5. GitHub Actions: Create `.github/workflows/healthcheck.yml`.
6. Git commit & push: Commit changes to `Portfolio` repo and push to GitHub `main` to trigger live deployment.
