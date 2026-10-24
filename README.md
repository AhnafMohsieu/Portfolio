# Portfolio

Single-page portfolio for Md. Mahin Ahmed — WordPress e-commerce builds,
offline-first browser apps, and research manuscripts.

Live site: https://ahnafmohsieu.github.io/Portfolio/

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

## Deployment

Served by GitHub Pages from `main` / `/ (root)`. Pushing to `main` republishes
the site; no build step runs.

## Known limitations

- NoriBD and Bangu Bhozon are WordPress builds whose staging hosts have expired.
  Their rows carry no link rather than a broken one; the export archives are
  available on request.
- The four papers are manuscripts prepared for submission, not published work.
