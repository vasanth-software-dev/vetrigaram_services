# Enterprise SEO Audit: Vetrikharam Home Services

**Repository**: `vasanth-software-dev/vetrikharam_services`  
**Deployment Target**: GitHub Pages (`https://vasanth-software-dev.github.io/vetrikharam_services/`)  
**Architecture**: React 19 + Vite 8 + Tailwind CSS 3 (Single-Page Application)  
**Date**: September 2026  
**Auditor**: Senior Enterprise SEO Engineer & Technical SEO Architect  

---

## Executive Summary

Vetrikharam Home Services provides doorstep appliance repair (AC, refrigerator, washing machine, geyser), electrical solutions, and plumbing services. Currently, the application is structured as a **single-page React application (SPA)** served with client-side routing on GitHub Pages. While the design is modern and clean, the site exhibits critical enterprise-level SEO deficiencies:

1. **Zero Indexable Deep URLs**: All services, reviews, FAQs, and contact points exist solely on one landing page via hash anchors (`#services`, `#faq`).
2. **Missing Meta Infrastructure**: No dynamic canonical URLs, no Open Graph site name, no Twitter Card tags, and a duplicate `og:type` tag.
3. **Absence of Structured Data (JSON-LD)**: No `LocalBusiness`, `Organization`, `Service`, `FAQPage`, or `BreadcrumbList` schema markup exists anywhere.
4. **Crawl & Indexation Gaps**: `robots.txt` and `sitemap.xml` are completely missing from the project.
5. **Client-Side Rendering Blind Spot**: Crawlers that do not execute JavaScript (such as social media preview bots) and search engine bots with limited render budgets receive an empty `<div id="root"></div>`.
6. **Mismatched Local Relevance**: The commented-out `ServiceArea.jsx` contained placeholder US cities (New York, Los Angeles), despite technicians, phone numbers (+91), currency (₹), and timezone (`Asia/Kolkata`) belonging to Tamil Nadu, India (Chennai & Ambattur coverage).

---

## Comprehensive Audit Findings

### 1. Title, Meta, and Social Tags

| Item | Current State | Issue | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| `<title>` | Hardcoded in `index.html`: `"vetikharam Home Services \| Premium Appliance, Electrical & Plumbing Repair"` | Lowercase brand name "vetikharam"; identical title across the entire site; no page-specific titles. | **P0 (Critical)** | Implement centralized SEO manager dynamically generating titles per route (e.g. `AC Repair & Servicing in Chennai \| Vetrikharam Home Services`). |
| `<meta name="description">` | Hardcoded single description in `index.html`. | Same description for all user intents; doesn't describe individual services or localities. | **P0 (Critical)** | Provide unique, intent-driven meta descriptions (150–160 chars) per service, location, and info page. |
| Canonical URLs | **Completely Missing** | Risk of duplicate content penalties across query params, GitHub Pages trailing slashes, and staging URLs. | **P0 (Critical)** | Enforce absolute canonical URLs on every page using `https://vasanth-software-dev.github.io/vetrikharam_services/...`. |
| Robots Directive | **Completely Missing** | No `<meta name="robots">` tag. Crawler indexing rules rely purely on defaults. | **P1 (High)** | Set `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">` on canonical pages and `noindex, follow` on 404/system routes. |
| Open Graph | Present in `index.html` with basic properties, but: (1) Duplicate `og:type="website"` tags on lines 10 & 12; (2) `og:description` is only `"Vetrikharam Services"`; (3) Missing `og:site_name`, `og:locale`. | Low engagement on social shares; duplicate tags cause parser warnings. | **P1 (High)** | Clean up duplicates; provide rich page-specific `og:title`, `og:description`, `og:image`, `og:site_name="Vetrikharam Home Services"`, and `og:locale="en_IN"`. |
| Twitter Cards | **Completely Missing** | No `twitter:card`, `twitter:title`, `twitter:description`, or `twitter:image`. | **P1 (High)** | Implement Twitter summary large image card metadata across all routes. |
| Favicon & Icons | Inline SVG data URI `data:image/svg+xml,...🛠️...` in `index.html`. | Incomplete brand icon set; no Apple touch icon or standardized web manifest icon links. | **P2 (Medium)** | Link standard `/favicon.svg` and provide `apple-touch-icon` links. |

---

### 2. URL Architecture & Routing

| Current State | Problems Identified | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- |
| Flat single-page application (`/` or `/vetrikharam_services/`). Section links use hash anchors (`#services`, `#why-us`, `#reviews`, `#faq`, `#contact`). | • Search crawlers do not index hash fragments as distinct pages.<br>• Cannot rank for high-intent keywords like *"AC repair Chennai"*, *"emergency electrician Ambattur"*, or *"plumbing services near me"*.<br>• Lack of deep linking for advertising and customer support. | **P0 (Critical)** | Implement a modern routing architecture with clean URLs:<br>• `/` (Homepage)<br>• `/services` (Services Catalog)<br>• `/services/[service-slug]` (Individual Services)<br>• `/locations` (Coverage Areas)<br>• `/locations/[location-slug]` (City/Locality Pages)<br>• `/[location-slug]/[service-slug]` (Local Service Pages: e.g. `/chennai/ac-repair`)<br>• `/about` (Company & Mission)<br>• `/contact` (Contact & Support) |

---

### 3. Rendering & Indexation (SPA vs. SSG/Prerender)

| Current State | Problems Identified | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- |
| Pure Client-Side Rendering (CSR) via Vite 8 + React 19. `dist/index.html` has an empty `<div id="root"></div>`. | • Social bots (Facebook, Twitter, WhatsApp, LinkedIn) cannot execute JavaScript and see empty content.<br>• Direct navigation to `/services/ac-repair` on GitHub Pages returns a 404 HTTP error.<br>• Search engines must defer rendering, delaying discovery and ranking. | **P0 (Critical)** | Keep Vite 8 (no heavy framework migration needed) and implement **Static Site Generation / Build-Time Prerendering**:<br>• Prerender each indexable route into static HTML with full markup and metadata in `dist/<route>/index.html`.<br>• Create `dist/404.html` with SPA fallback routing for client navigation.<br>• Delivers instant LCP and immediate crawler read without server runtime overhead. |

---

### 4. Technical SEO Assets (`robots.txt` & `sitemap.xml`)

| Asset | Current State | Problems Identified | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| `public/robots.txt` | **Missing** | Crawlers receive 404 or fall back to permissive default without a sitemap pointer. | **P0 (Critical)** | Create `public/robots.txt` specifying allowed crawler directives and absolute path to `sitemap.xml`. |
| `sitemap.xml` | **Missing** | Search engines have no authoritative manifest of valid, canonical URLs. | **P0 (Critical)** | Implement an automated build-time sitemap generator that outputs `sitemap.xml` containing all indexable canonical URLs with `lastmod`, `changefreq`, and `priority`. |

---

### 5. Structured Data (Schema.org JSON-LD)

| Schema Type | Current State | Deficiency | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| `LocalBusiness` / `HomeAndConstructionBusiness` | **Missing** | Missing Google Knowledge Graph signals, phone, service radius, and opening hours. | **P0 (Critical)** | Embed verified `LocalBusiness` JSON-LD with business name, phone (`+91 6374121120`), email, address/coverage (`Chennai, Tamil Nadu`), opening hours (`Mo-Su 08:00-21:00`), and price range. |
| `Organization` & `WebSite` | **Missing** | Brand search results lack official organization context and site search clarity. | **P1 (High)** | Embed `Organization` and `WebSite` schemas on the homepage. |
| `Service` Schema | **Missing** | Service pages lack semantic classification for rich snippets in SERPs. | **P0 (Critical)** | Embed structured `Service` schema on each service page with service name, provider, areaServed, and description. |
| `BreadcrumbList` | **Missing** | SERPs display raw URL strings rather than structured breadcrumb trails. | **P1 (High)** | Embed `BreadcrumbList` JSON-LD on all hierarchical routes (`Home > Services > AC Repair`). |
| `FAQPage` | **Missing** | Valid FAQs exist in `FAQ.jsx` but are invisible to rich snippet scrapers. | **P1 (High)** | Convert genuine FAQs into `FAQPage` schema on FAQ sections and relevant service pages. |

---

### 6. Heading Structure & Content Semantics

| Component | Current State | Problems Identified | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| `Hero.jsx` | Has `<h1>Expert Home Services, Right at Your Door.</h1>` | Good on homepage, but sub-pages need their own semantic `<h1>`. | **P1 (High)** | Ensure each route has exactly one meaningful, keyword-aligned `<h1>`. |
| `Reviews.jsx` | `<h2>What Our Customers Say</h2>` followed directly by `<h4>{test.name}</h4>` | Skips `<h3>`, violating heading hierarchy. | **P2 (Medium)** | Adjust review card author names to `<h3>` or semantic `<div>` to maintain strict `h1 > h2 > h3` hierarchy. |
| Image Alts | `Hero.jsx` carousel has `alt={`slide-${idx}`}`. | Non-descriptive alt text hurts image search indexing and accessibility. | **P2 (Medium)** | Replace with descriptive alt tags (e.g. `Professional home technician repairing electrical panel`). |

---

### 7. Internal Linking & Local SEO

| Area | Current State | Problems Identified | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| Service Links | Navbar and Services list only trigger React state change or smooth scroll. | No crawlable `<a href="...">` anchor tags leading to deep service resources. | **P0 (Critical)** | Link all service cards, navbar menu items, and footer links to real route URLs (`/services/ac-repair`). |
| Local Coverage | `ServiceArea.jsx` contained mocked US locations (New York, Chicago) and was disabled. | Misses high-value local search queries in Chennai and Ambattur. | **P0 (Critical)** | Re-architect local coverage around actual Tamil Nadu service areas (Chennai, Ambattur, Anna Nagar, Velachery, etc.) with real service guarantees. |
| Breadcrumbs | None | Deep pages lack navigational context and internal link equity. | **P1 (High)** | Add visual breadcrumbs with microdata on all deep service and location pages. |

---

### 8. Performance & Core Web Vitals (CWV)

| Asset / Factor | Current State | Performance Impact | Priority | Recommended Solution |
| :--- | :--- | :--- | :--- | :--- |
| External Carousel Images | 3 Unsplash images loaded in `Hero.jsx` via external URL. | Increases LCP due to external DNS resolution, lack of preload, and large file size. | **P1 (High)** | Optimize image loading, add explicit dimensions, and set `fetchpriority="high"` on the initial slide. |
| Large Media Files | `public/logo-emblem.png` is 607 KB; `public/logo.mp4` is 1.35 MB. | Consumes unnecessary bandwidth on mobile networks. | **P2 (Medium)** | Ensure static logo fallbacks use optimized formats and responsive dimensions. |
| Code Splitting | Single bundled chunk in Vite. | Entire page script is loaded on first visit. | **P2 (Medium)** | Leverage route-based lazy loading (`React.lazy` / dynamic imports) so routes load on demand. |

---

## Files Identified for Modification and Creation

### Files to Modify:
1. `index.html` — Clean up redundant tags, add proper meta hooks and SEO defaults.
2. `vite.config.js` — Configure build settings and prerendering / SSR build support.
3. `package.json` — Add routing dependencies and prerender scripts.
4. `src/App.jsx` — Implement clean route handling with page components while retaining the existing single-page home experience and booking modals.
5. `src/components/Navbar.jsx` — Upgrade menu items to real semantic navigation links.
6. `src/components/Footer.jsx` — Add crawlable internal links to services, locations, about, and contact.
7. `src/components/Hero.jsx` — Optimize image alt attributes and performance attributes.
8. `src/components/Reviews.jsx` — Fix heading hierarchy (`h2` -> `h3`).
9. `src/components/Services.jsx` — Add internal links to dedicated service pages.
10. `src/components/ServiceArea.jsx` — Align with actual business coverage (Chennai & Ambattur).

### Files to Create:
1. `SEO_AUDIT.md` — Complete technical audit report (this document).
2. `SEO_RENDERING.md` — Documentation of the rendering & prerendering architecture decision.
3. `SEO_IMPLEMENTATION.md` — Comprehensive architectural documentation and deployment guide.
4. `SEO_CHECKLIST.md` — Pre-launch verification and ongoing SEO maintenance checklist.
5. `src/seo/SeoHead.jsx` — Centralized, reusable SEO component for dynamic `<title>`, `<meta>`, canonical, Open Graph, Twitter Cards, and JSON-LD.
6. `src/seo/schemaGenerator.js` — Schema.org JSON-LD utilities (`LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`, `WebSite`).
7. `src/data/seoData.js` — Central source of truth for business metadata, services, locations, and pricing policies.
8. `src/pages/HomePage.jsx` — Modular homepage component preserving all existing sections.
9. `src/pages/ServicesPage.jsx` — Comprehensive catalog of all offered services with structured internal links.
10. `src/pages/ServiceDetailPage.jsx` — Rich, dedicated service page (e.g. `/services/ac-repair`) with deep descriptions, benefits, step-by-step process, transparent pricing, FAQs, and booking CTA.
11. `src/pages/LocationsPage.jsx` — Hub for serviced localities and service areas.
12. `src/pages/LocationDetailPage.jsx` — Location-specific hub (e.g. `/locations/chennai`, `/locations/ambattur`).
13. `src/pages/LocationServicePage.jsx` — High-intent local service page (e.g. `/chennai/ac-repair`, `/chennai/plumbing`).
14. `src/pages/AboutPage.jsx` — Company story, verified technician network, customer commitments.
15. `src/pages/ContactPage.jsx` — Contact numbers, email, operational hours, service coverage, and booking link.
16. `src/pages/NotFoundPage.jsx` — User-friendly 404 page with `noindex` and helpful recovery links.
17. `scripts/prerender.js` — Build-time Node script that prerenders all routes into static HTML files (`dist/<route>/index.html`) with injected metadata and generates `sitemap.xml` and `robots.txt`.
