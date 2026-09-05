# Enterprise SEO Launch & Quality Checklist

**Client**: Vetrikharam Home Services  
**Target Environment**: GitHub Pages (`https://vasanth-software-dev.github.io/vetrikharam_services/`)  
**Status**: Ready for Production Launch  

---

## 1. Technical SEO & Indexability Pre-Flight

- [x] **Robots Configuration (`public/robots.txt`)**
  - [x] Disallow rules allow legitimate crawlers to access all public pages, JS, CSS, and images.
  - [x] Private paths (`/api/`) and duplicate query patterns are properly blocked.
  - [x] Sitemap directive references `https://vasanth-software-dev.github.io/vetrikharam_services/sitemap.xml`.

- [x] **XML Sitemap (`dist/sitemap.xml`)**
  - [x] Sitemap is automatically generated on build.
  - [x] Contains exactly 31 indexable, canonical URLs.
  - [x] URLs match canonical tags exactly (trailing slash for root, no trailing slash for sub-routes).
  - [x] Excludes 404, redirect, and query parameters.
  - [x] Valid `<lastmod>`, `<changefreq>`, and `<priority>` attributes included.

- [x] **Static Prerendering (SSG)**
  - [x] Every route has a physical `index.html` file in `dist/` (`dist/services/ac-repair/index.html`, etc.).
  - [x] Direct URL navigation on GitHub Pages returns HTTP 200 without 404 redirection flickers.
  - [x] `dist/404.html` exists with `<meta name="robots" content="noindex, follow">`.

- [x] **Canonical Tags**
  - [x] Every indexable page specifies an absolute canonical tag `<link rel="canonical" href="...">`.
  - [x] No relative URLs used in canonical tags.
  - [x] Prevents duplicate content issues from query parameters or case sensitivity.

---

## 2. Page-Level Metadata & Social Tags

- [x] **Unique `<title>` Tags**
  - [x] Homepage: `"Vetrikharam Home Services | Premium Appliance, Electrical & Plumbing Repair"`.
  - [x] Services: `"AC Repair & Servicing | Doorstep Repair & Servicing | Vetrikharam"`.
  - [x] Locations: `"Home Services in Chennai | Appliance, Electrical & Plumbing Repair | Vetrikharam"`.
  - [x] Local Services: `"AC Repair & Servicing in Chennai | Doorstep Service | Vetrikharam"`.
  - [x] 404 Page: `"Page Not Found (404) | Vetrikharam Home Services"`.

- [x] **Unique `<meta name="description">` Tags**
  - [x] Under 160 characters, natural language, action-oriented.
  - [x] Highlights ₹149 inspection policy and 30-day warranty.
  - [x] No keyword stuffing.

- [x] **Open Graph Protocol**
  - [x] `og:title`, `og:description`, `og:url`, `og:image`, `og:type="website"`.
  - [x] `og:site_name="Vetrikharam Home Services"`.
  - [x] `og:locale="en_IN"`.
  - [x] Duplicate `og:type` tags in `index.html` removed.

- [x] **Twitter / X Cards**
  - [x] `twitter:card="summary_large_image"`.
  - [x] `twitter:title`, `twitter:description`, `twitter:image` populated for all routes.

---

## 3. Structured Data (Schema.org JSON-LD)

- [x] **`HomeAndConstructionBusiness` / `LocalBusiness`**
  - [x] Legal name, phone number (`+91-6374121120`), email, address, geo coordinates.
  - [x] Opening hours: `Mo-Su 08:00-21:00`.
  - [x] Service coverage: `Chennai`, `Ambattur`.
  - [x] Validated against Schema.org validator.

- [x] **`Service` Schema**
  - [x] Present on all service pages and local service pages.
  - [x] Includes provider, areaServed, description, and transparent ₹149 inspection offer.

- [x] **`BreadcrumbList` Schema**
  - [x] Present on all sub-pages.
  - [x] Matches visible breadcrumbs.

- [x] **`FAQPage` Schema**
  - [x] Present on homepage, service pages, and location pages where real FAQs exist.
  - [x] All FAQs represent genuine business policies.

---

## 4. On-Page Content & Semantics

- [x] **Heading Hierarchy**
  - [x] Exactly one `<h1>` per page matching user intent.
  - [x] Logical `<h2>` and `<h3>` nesting without skipped heading levels.
  - [x] Review card headings updated from `<h4>` to `<h3>`.

- [x] **Internal Linking & Navigation**
  - [x] Navbar links to real routes (`/services`, `/locations`, `/about`, `/contact`).
  - [x] Footer links to individual services, location hubs, and company info.
  - [x] Breadcrumb navigation on all deep pages.
  - [x] Cross-links between services and locations (`/chennai/ac-repair`).

- [x] **Accessibility & Media**
  - [x] Carousel images in `Hero.jsx` feature descriptive alt text.
  - [x] `fetchpriority="high"` and `loading="eager"` applied to above-the-fold hero image.
  - [x] Explicit `width="1200"` and `height="800"` attributes prevent Cumulative Layout Shift (CLS).

---

## 5. Post-Launch Google Search Console Verification

- [ ] **Step 1**: Add property `https://vasanth-software-dev.github.io/vetrikharam_services/` in GSC.
- [ ] **Step 2**: Replace `GSC_VERIFICATION_PLACEHOLDER` in `index.html` with real token (or verify via HTML file / DNS).
- [ ] **Step 3**: Submit sitemap at `https://vasanth-software-dev.github.io/vetrikharam_services/sitemap.xml`.
- [ ] **Step 4**: Run Rich Results Test on `/services/ac-repair` to confirm `Service` and `FAQPage` rich results.
- [ ] **Step 5**: Run URL Inspection to request initial indexing of the homepage and primary service hubs.
