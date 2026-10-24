# website

Website for the [standard-context](https://github.com/standard-servers/standard-context) and [standard-middleware](https://github.com/standard-servers/standard-middleware) proposals.

> [!NOTE]
> This is an early proposal to share the idea. Nothing here is final.

A single static page in [`public/index.html`](./public/index.html), with syntax highlighting by [rangi](https://github.com/pi0/rangi). No build step.

## Development

Serve the `public` directory with any static server:

```sh
npx serve public
```

## Deployment

Every push to `main` deploys to GitHub Pages via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
