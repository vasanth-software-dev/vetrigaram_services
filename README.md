# Vetrigaram Tech Services — Web Application (v2.0.0)

> A modern, high-performance web platform built with React 19, Vite, and Tailwind CSS, featuring enterprise-grade SEO pre-rendering and automated GitHub Actions deployment to GitHub Pages.

---

## Architecture Overview

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS with custom brand design tokens (Midnight Navy `#071A33`, Deep Navy `#0B2345`, Royal Blue `#1459B8`, Electric Blue `#2385E8`, Vibrant Orange `#FF7A00`)
- **Typography**: Google Fonts (`Plus Jakarta Sans`, `Inter`, `Poppins`)
- **SEO & Pre-rendering**: Post-build custom pre-rendering pipeline generating 19 static HTML routes with rich Schema.org JSON-LD structured data and OpenGraph tags
- **Linter**: `oxlint` (Oxc linter)
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

---

## Local Development & Operations

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation
```bash
# Clean, deterministic install using lockfile
npm ci
```

### Local Dev Server
```bash
npm run dev
```
Serves the application locally at `http://localhost:5173/vetrigaram_services/`.

### Linting & Quality Verification
```bash
# Run oxlint across all source files
npm run lint

# Check dependency vulnerabilities
npm audit
```

### Production Build & Pre-render Pipeline
```bash
npm run build
```
Build pipeline steps:
1. `vite build` compiles production assets into `dist/`.
2. `node scripts/prerender.js` pre-renders all 19 canonical routes to static HTML with injected JSON-LD schemas.
3. Generates `dist/404.html` (SPA fallback) and `dist/sitemap.xml`.
4. Copies `robots.txt` and `.nojekyll` to `dist/`.

### Preview Production Build
```bash
npm run preview
```
Runs a local preview server from `./dist` at `http://localhost:4173/vetrigaram_services/`.

---

## Release Process & Git Workflow

This repository follows a disciplined trunk-based release flow with release preparation branches:

```
feature/* 
   ↓
release/v2.0.0
   ↓
CI / Quality Gates (npm ci → npm run lint → npm audit → npm run build)
   ↓
main
   ↓
v2.0.0 Annotated Git Tag
   ↓
GitHub Actions Deployment to GitHub Pages
```

### Creating a Release
1. Create a release branch from `main`:
   ```bash
   git checkout -b release/vX.Y.Z
   ```
2. Bump the version in `package.json`:
   ```bash
   npm version X.Y.Z --no-git-tag-version
   ```
3. Update `CHANGELOG.md` with structured release notes.
4. Execute quality gates:
   ```bash
   npm ci
   npm run lint
   npm audit
   npm run build
   ```
5. Merge into `main` and create an annotated Git tag:
   ```bash
   git checkout main
   git merge release/vX.Y.Z
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```
6. Push changes and tag to origin:
   ```bash
   git push origin main
   git push origin vX.Y.Z
   ```

---

## GitHub Pages Configuration

The repository is configured for GitHub Actions-based deployments:
- **Build and Deployment Source**: `GitHub Actions` (`build_type: workflow`)
- **Workflow Path**: `.github/workflows/deploy.yml`
- **Target URL**: `https://vasanth-software-dev.github.io/vetrigaram_services/`
- **Output Artifact**: `./dist`
- **Permissions**: `contents: read`, `pages: write`, `id-token: write`

---

## Important Safety Rules

- **Never force-push**: `git push --force` and `git push --force-with-lease` are strictly forbidden on `main`.
- **Never rewrite history**: Do not rebase or amend commits already pushed to public remotes.
- **Do not bypass quality gates**: All commits must pass `npm run lint` and `npm run build` prior to merge.
- **Maintain `.nojekyll`**: Required in `public/` to prevent GitHub's Jekyll engine from ignoring files with leading underscores or custom asset structures.
