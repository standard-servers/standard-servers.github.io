# website

Website for the [standard-servers proposals](https://github.com/standard-servers/proposals) ([standard-context](https://github.com/standard-servers/proposals/tree/main/packages/standard-context) and [standard-middleware](https://github.com/standard-servers/proposals/tree/main/packages/standard-middleware)).

> [!NOTE]
> This is an early proposal to share the idea. Nothing here is final.

A single static page in [`public/index.html`](./public/index.html), with syntax highlighting by [rangi](https://github.com/pi0/rangi). No build step.

## Development

Serve the `public` directory with any static server:

```sh
npx serve public
```

### Sync types

The proposal types on the page are copied from upstream `packages/*/src/index.ts` into the `<!-- types: <package> -->` sections of `public/index.html`. Don't edit them by hand, run:

```sh
node scripts/sync-types.ts               # from GitHub (main)
node scripts/sync-types.ts ../proposals  # from a local checkout
```

## Deployment

Every push to `main` deploys to GitHub Pages via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
