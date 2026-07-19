# Brinovax Public Website

The Brinovax Website Hosting marketing site — React + Vite + TypeScript. This is the
source intended for the **`brinovax-public-website`** GitHub repo that
`.github/workflows/deploy-website-dev.yml` (in the infrastructure repo) checks out
and deploys to `dev.brinovax.com`.

## Pages
`/` · `/how-it-works` · `/pricing` · `/about` · `/contact` (+ SPA 404 fallback).

## Local development
```bash
npm ci          # or: npm install
npm run dev      # http://localhost:5173
npm run lint
npm run typecheck
npm test
npm run build    # outputs ./dist (what gets deployed)
npm run preview  # serve the production build locally
```

## Contact form
The form validates on the client and, by default, **posts nothing** — it confirms
success client-side. To wire a real endpoint, set `VITE_CONTACT_ENDPOINT` (see
`.env.example`). No secrets are ever embedded in the client bundle.

## Deployment
Deployment is handled by the infrastructure repo's `deploy-website-dev.yml`:
`npm ci → lint → typecheck → test → build → S3 sync (cache headers, --delete) →
CloudFront invalidation → health check`. The dev CloudFront distribution already maps
403/404 → `/index.html`, so client-side routes work on direct navigation.

Rollback = re-run the deploy workflow with an older `ref` (the S3 bucket is versioned).
See the infrastructure repo's `docs/rollback-process.md`.
