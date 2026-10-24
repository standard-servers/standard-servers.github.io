# AGENTS.md

Static website presenting the [standard-context](https://github.com/standard-servers/proposals/tree/main/packages/standard-context) and [standard-middleware](https://github.com/standard-servers/proposals/tree/main/packages/standard-middleware) proposals from [standard-servers/proposals](https://github.com/standard-servers/proposals). It is an early draft for sharing the idea, so keep it minimal and keep the "proposal, not final" banner.

- Single page: `public/index.html` (inline CSS, no build step, no dependencies).
- Design: based on the Spica design system. The tokens the page uses are copied inline into its `<style>`. Deliberate departures: neutral gray backgrounds (no tinted washes), Nunito sans-serif headings (no Alice), no constellation decoration. Otherwise follow Spica rules (sentence case, no emoji).
- Syntax highlighting: [rangi](https://github.com/pi0/rangi), loaded from jsDelivr with a pinned version. Code goes in `<pre><code data-lang="ts">` with HTML-escaped `<`, `>` and `&`.
- Types: the `<!-- types: <package> -->` sections are generated from upstream `packages/<package>/src/index.ts` by `node scripts/sync-types.ts [local-proposals-dir]` (Node 24, no deps). Don't edit them by hand. When the spec changes, also update the hand-written examples to match.
- Deploy: pushing to `main` publishes `public/` to GitHub Pages via `.github/workflows/deploy.yml`.
- Preview locally: `npx serve public`.
