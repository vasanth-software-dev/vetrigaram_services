# Enterprise Technical SEO Implementation Guide

**Project**: Vetrikharam Home Services  
**Repository**: `vasanth-software-dev/vetrikharam_services`  
**Deployment**: GitHub Pages (`https://vasanth-software-dev.github.io/vetrikharam_services/`)  
**Architecture**: React 19 + Vite 8 + React Router + Build-Time SSG Prerendering  
**Date**: September 2026  

---

## 1. Architectural Overview

The enterprise SEO upgrade transforms Vetrikharam from a basic single-page hash-scrolling app into a multi-route, static-prerendered, Schema.org-enriched home-services portal. The architecture consists of four distinct layers:

1. **Central Data Registry (`src/data/seoData.js`)**: Single source of truth containing verified business information, service offerings, regional coverage hubs, technician assignments, and canonical routes.
2. **Dynamic Metadata & Schema Layer (`src/seo/SeoHead.jsx` & `src/seo/schemaGenerator.js`)**: Generates Google-compliant Schema.org JSON-LD and manages `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph, and Twitter metadata during client-side transitions.
3. **Semantic Page Components (`src/pages/*`)**: Dedicated, indexable views for Services, Locations, Local Service hubs, About, Contact, and 404 recovery.
4. **Automated SSG Build Pipeline (`scripts/prerender.js`)**: Runs post-build to prerender static HTML files for all 31 canonical routes, generate `dist/sitemap.xml`, and configure `dist/robots.txt`.

---

## 2. Route Architecture & Canonical Strategy

### Route Hierarchy:
- `/` — Main Homepage & Booking Hub
- `/services` — Comprehensive Services Catalog
- `/services/:serviceSlug` — Deep Service Pages (e.g. `/services/ac-repair`, `/services/refrigerator-repair`, `/services/plumbing-repair`)
- `/locations` — Regional Service Coverage Directory
- `/locations/:locationSlug` — City/Hub Level Directory (e.g. `/locations/chennai`, `/locations/ambattur`)
- `/:locationSlug/:serviceSlug` — High-Intent Local Service Hubs (e.g. `/chennai/ac-repair`, `/ambattur/plumbing-repair`)
- `/about` — Verified Technician Network & Standards
- `/contact` — Direct Support, Operating Hours & Booking
- `*` — 404 Error Page (`noindex, follow`)

### Canonical URL Strategy:
To prevent duplicate content penalties between HTTP/HTTPS, query strings, and staging domains:
- All canonical URLs are generated as **absolute HTTPS URLs** anchored to `https://vasanth-software-dev.github.io/vetrikharam_services/`.
- The root URL strictly uses a trailing slash (`https://vasanth-software-dev.github.io/vetrikharam_services/`).
- Sub-routes strictly omit trailing slashes (`https://vasanth-software-dev.github.io/vetrikharam_services/services/ac-repair`).
- All canonical tags are embedded in the static `<head>` and updated dynamically on route transitions.

---

## 3. Structured Data (Schema.org JSON-LD) Implementation

The application automatically injects validated JSON-LD schemas representing the business, services, navigation, and customer inquiries:

| Schema Type | Applied Routes | Key Properties |
| :--- | :--- | :--- |
| **`HomeAndConstructionBusiness`** | `/`, `/locations/*`, `/:location/:service` | Business name, telephone (`+91-6374121120`), email, address, geo coordinates, openingHours (`Mo-Su 08:00-21:00`), priceRange (`₹₹`), areaServed (`Chennai`, `Ambattur`). |
| **`Organization`** | `/`, `/about` | Official organization identity, logo, sameAs social links, customer service contact point. |
| **`WebSite`** | `/` | WebSite classification, site name, publisher ID. |
| **`Service`** | `/services/:serviceSlug`, `/:location/:service` | Service name, category, description, provider (`Vetrikharam Home Services`), areaServed, and transparent price offer (`₹149 Inspection`). |
| **`BreadcrumbList`** | All Sub-Pages (`/services/*`, `/locations/*`, etc.) | Ordered `ListItem` hierarchy (`Home > Services > AC Repair`) for enhanced Google SERP breadcrumb display. |
| **`FAQPage`** | `/`, Service Pages, Location Pages | Question and Answer pairs reflecting real business policies (inspection fee adjustment, spare parts warranty, arrival times). |

---

## 4. Local SEO Architecture (Chennai & Ambattur)

Vetrikharam operates primarily in the Chennai metropolitan area and the Ambattur industrial/residential corridor. The local SEO strategy avoids spammy doorway pages by delivering genuine, differentiated local content:

### 1. Chennai Hub (`/locations/chennai`)
- **Coverage**: Central, North, and South Chennai residential belts (Anna Nagar, T. Nagar, Velachery, Adyar, Mylapore, Tambaram, Porur, Kilpauk, Vadapalani).
- **Pincodes**: 600001 to 600120.
- **Dispatch**: Decentralized technician hubs with 2 to 4 hour doorstep arrival window.

### 2. Ambattur Hub (`/locations/ambattur`)
- **Coverage**: Ambattur OT, Industrial Estate Residential quarters, Mogappair East & West, Padi, Mannurpet, Korattur.
- **Pincodes**: 600053, 600058, 600037, 600080, 600098.
- **Dispatch**: Priority rapid-dispatch corridor with 60 to 90 minute arrival times.

### 3. Local Service Pages (`/:location/:service`)
- Combines specific repair diagnostics (e.g. AC gas charging, coil cleaning) with local logistics (assigned local technicians like Parthi, Boobal, and Vasanth, neighborhood list, local response times, and embedded booking).

---

## 5. Robots.txt and Sitemap.xml Generation

### `public/robots.txt`
```robots
User-agent: *
Allow: /

Disallow: /api/
Disallow: /*?*sort=
Disallow: /*?*filter=

Sitemap: https://vasanth-software-dev.github.io/vetrikharam_services/sitemap.xml
```

### Automated Sitemap Generation
`scripts/prerender.js` automatically produces `dist/sitemap.xml` containing all 31 indexable URLs, setting:
- `<loc>`: Absolute HTTPS canonical URL.
- `<lastmod>`: Build date in ISO format (`YYYY-MM-DD`).
- `<changefreq>`: `weekly` for services/homepage; `monthly` for locations/about.
- `<priority>`: `1.0` for homepage, `0.9` for local services, `0.85` for individual services, `0.8` for locations.

---

## 6. Performance & Core Web Vitals (CWV)

### 1. Largest Contentful Paint (LCP)
- Replaced unoptimized external Unsplash URLs with explicit width (`1200`), height (`800`), `fetchpriority="high"`, and `loading="eager"` on the active hero slide.
- Subsequent slides load lazily (`loading="lazy"`).

### 2. Cumulative Layout Shift (CLS)
- All navigation icons are rendered via inline SVGs (`lucide-react`) preventing layout jumps during font loading.
- Breadcrumbs and hero banners utilize reserved aspect ratios and min-height containers.

### 3. Interaction to Next Paint (INP)
- Booking form updates and drawer toggles operate through lightweight React state hooks with zero blocking event loops.

---

## 7. Google Search Console Setup & Verification

When preparing to submit the site to Google Search Console:

1. **Domain / URL Prefix Property**:
   - In Google Search Console, add property: `https://vasanth-software-dev.github.io/vetrikharam_services/`.
2. **HTML Meta Tag Verification**:
   - In `index.html`, locate:
     ```html
     <meta name="google-site-verification" content="GSC_VERIFICATION_PLACEHOLDER" />
     ```
   - Replace `GSC_VERIFICATION_PLACEHOLDER` with the verification token provided by Google.
3. **Submit XML Sitemap**:
   - In GSC, navigate to **Sitemaps** in the left sidebar.
   - Enter `sitemap.xml` and click **Submit**.
   - GSC will process the 31 canonical URLs.
4. **URL Inspection**:
   - Test `https://vasanth-software-dev.github.io/vetrikharam_services/services/ac-repair` in the GSC URL Inspection tool.
   - Confirm that Googlebot discovers the pre-rendered HTML, title, meta description, and Service schema.

---

## 8. Deployment Requirements (GitHub Actions)

The existing workflow in `.github/workflows/deploy.yml` builds and deploys `./dist` to GitHub Pages:

```yaml
- name: Build
  run: npm run build
```

Because our `package.json` specifies:
```json
"build": "vite build && node scripts/prerender.js"
```
GitHub Actions will automatically:
1. Compile the production JS/CSS bundles.
2. Run `scripts/prerender.js` to create all static HTML route directories.
3. Generate `dist/sitemap.xml` and `dist/robots.txt`.
4. Deploy the complete pre-rendered static site to GitHub Pages.

---

## 9. Prioritized Future SEO Improvements

| Phase | Recommendation | Expected Impact | Priority |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Customer Review Schema (Real Reviews)**: When real customer reviews with verified timestamps and ratings are collected in the database, embed `AggregateRating` and `Review` schemas. | Enables star ratings in Google SERP snippets. | High |
| **Phase 2** | **Custom Domain Setup**: Migrate from `vasanth-software-dev.github.io/vetrikharam_services` to a custom brand domain (e.g. `vetrikharamservices.com`). | Boosts domain authority, brand memorability, and click-through rates. | High |
| **Phase 3** | **Image WebP/AVIF Conversion**: Convert `logo-emblem.png` (607 KB) to modern WebP format (under 50 KB) and self-host hero banner graphics. | Saves ~1.5 MB in initial bundle payload on mobile networks. | Medium |
| **Phase 4** | **Helpful Content Blog**: Add an educational hub (`/blog`) covering topics like "How Often Should You Service Your Split AC in Chennai?" and "5 Signs Your Home Needs Immediate Rewiring". | Captures top-of-funnel informational search queries. | Medium |
