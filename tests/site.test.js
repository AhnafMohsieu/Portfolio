"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const html = () => read("index.html");

const CATS = ["web", "app", "tool", "research", "finance"];
const PAPER_SLUGS = [
  "paper-1-chunking-rag",
  "paper-2-ai-banking",
  "paper-3-blockchain-banking",
  "paper-4-green-finance",
  "paper-5-prime-bank",
];
const REPORT_FILES = [
  "report-1-dse-event-study.pdf",
  "report-2-square-pharma-dcf.xlsx",
  "report-3-city-bank-prudential-risk.pdf",
  "report-4-crown-cement-working-capital.pdf",
  "report-5-strategic-hrm-analytics.pdf",
  "report-6-behavioral-governance.pdf",
  "report-7-grameenphone-strategy.pdf",
  "report-8-pharma-aids-fsa.pdf",
  "report-9-toyota-international-business.pdf",
  "report-10-sundarban-honey-marketing.pdf",
];

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

test("work section lists fifteen rows with known categories", () => {
  const rows = html().match(/<li class="work__row" data-cat="[a-z]+">/g) || [];
  assert.strictEqual(rows.length, 15);
  for (const row of rows) {
    const cat = row.match(/data-cat="([a-z]+)"/)[1];
    assert.ok(CATS.includes(cat), `unknown category ${cat}`);
  }
});

test("filter chips cover every category plus all", () => {
  const chips = html().match(/<button[^>]*class="chip[^"]*"[^>]*data-cat="[a-z]+"/g) || [];
  const values = chips.map((c) => c.match(/data-cat="([a-z]+)"/)[1]).sort();
  assert.deepStrictEqual(values, ["all", "app", "finance", "research", "tool", "web"]);
});

test("every work row has a title and a description", () => {
  const rows = html().split('<li class="work__row"').slice(1);
  for (const row of rows) {
    assert.match(row, /class="work__title"/);
    assert.match(row, /class="work__desc"/);
  }
});

test("research section documents five manuscripts as unpublished", () => {
  const page = html();
  const papers = page.match(/<article class="paper">/g) || [];
  assert.strictEqual(papers.length, 5);
  assert.doesNotMatch(page, /published|peer-reviewed/i);
  assert.match(page, /manuscript/i);
});

test("finance section lists ten empirical reports and all files exist on disk", () => {
  const page = html();
  const reports = page.match(/<(?:article|li) class="report-row">/g) || [];
  assert.strictEqual(reports.length, 10);
  for (const file of REPORT_FILES) {
    const filePath = path.join(ROOT, "assets", "reports", file);
    assert.ok(fs.existsSync(filePath), `missing report file: ${filePath}`);
    assert.ok(fs.statSync(filePath).size > 50000, `report file too small: ${filePath}`);
  }
});

test("about and contact sections exist with real destinations", () => {
  const page = html();
  assert.match(page, /id="about"/);
  assert.match(page, /id="contact"/);
  assert.match(page, /mailto:mahinahmed923@gmail\.com/);
  assert.match(page, /https:\/\/github\.com\/AhnafMohsieu/);
  assert.match(page, /https:\/\/ahnafmohsieu\.github\.io\/CV\//);
});

test("footer year has a static fallback for JavaScript-off readers", () => {
  assert.match(html(), /id="year">\d{4}</);
});

test("every local link and asset resolves on disk", () => {
  const refs = [...html().matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  const local = refs.filter((r) => !/^(https?:|mailto:|#)/.test(r));
  assert.ok(local.length >= 5, "expected local asset references");
  for (const ref of local) {
    assert.ok(fs.existsSync(path.join(ROOT, ref)), `missing local asset: ${ref}`);
  }
});

test("all five paper PDFs are present and non-trivial", () => {
  for (const slug of PAPER_SLUGS) {
    const file = path.join(ROOT, "assets", "papers", `${slug}.pdf`);
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

test("external work links point at repositories that actually exist", () => {
  const page = html();
  const links = [...page.matchAll(/href="(https:\/\/ahnafmohsieu\.github\.io\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(links.length >= 4, "expected at least four deployed links");
  for (const link of links) {
    assert.match(link, /^https:\/\/ahnafmohsieu\.github\.io\/[A-Za-z0-9-]+(\/[A-Za-z0-9-]+)*\/$/);
  }
});
