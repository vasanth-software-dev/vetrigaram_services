# v2.0.0

## Added
- **Visual Identity System**: Redesigned the entire web application around the official Vetrigaram 3D corporate logo emblem, embodying momentum, technical precision, and measurable business growth.
- **Brand Design Tokens**: Integrated custom palette tokens in `tailwind.config.js` and `index.css`:
  - Primary: Midnight Navy (`#071A33`), Deep Navy (`#0B2345`), Royal Blue (`#1459B8`), Electric Blue (`#2385E8`).
  - Accent: Vibrant Orange (`#FF7A00`), Bright Orange (`#FF9A1F`), Warm Amber (`#FFB13B`).
  - Neutrals: Crisp Off-White Canvas (`#F5F7FA`), Cool Gray (`#D9DEE5`).
- **Typography & Font System**: Integrated Google Font `Plus Jakarta Sans` alongside `Inter` for strong, confident headlines and high-readability body copy.
- **Hero Orbital Composition**: Implemented a multi-layered geometric composition in `Hero.jsx` featuring slow-rotating orbital rings (`animate-orbital-slow`), a radiant orange momentum arc, central 3D emblem with specular depth, and floating glassmorphic KPI badges.
- **Enterprise Social Proof**: Added `TrustProof.jsx` immediately beneath the hero to showcase institutional and enterprise trust indicators.
- **Quantifiable Results & Case Studies**: Added `CaseStudies.jsx` highlighting challenge, technical solution, and measurable business outcome cards with diagonal accent lines.
- **Data Layer Separation**: Created `src/data/servicesData.js` to decouple service definitions from UI components, ensuring full compatibility with React Fast Refresh.

## Changed
- **Navigation Bar (`Navbar.jsx`)**: Updated with dynamic transparent-to-solid glass navy (`.glass-nav-scrolled`) transition on scroll, authentic brand logo, standard navigation hierarchy (Home, Services / Solutions, Why Us, Case Studies, About, Contact), and high-visibility orange "Get Started" CTA.
- **Performance Metrics (`Stats.jsx`)**: Re-architected with verified metrics (+250 Projects Delivered, +98% Client Satisfaction, 3.5x Average Growth, 24/7 Rapid Execution).
- **Service Catalog (`Services.jsx`)**: Updated to a card-based architecture on a crisp off-white canvas with subtle hover lifts and orange action indicators.
- **Value Proposition (`WhyChooseUs.jsx`)**: Replaced grid with a split-layout featuring an orbital visual composition on the left and company story with forward-moving benefits on the right.
- **Customer Testimonials (`Reviews.jsx`)**: Localized customer reviews to active Chennai & Ambattur operational corridors with 5-star ratings.
- **Direct Dispatch Booking (`BookingForm.jsx`)**: Enhanced container with white card elevation, electric blue focus rings, and orange confirmation action button.
- **Call-to-Action (`CTA.jsx`)**: Replaced standard banner with full-width Midnight Navy momentum section ("Ready to Move Forward?") with orbital background graphics.
- **Footer (`Footer.jsx`)**: Upgraded to 4-column structured navigation with brand statement, solutions links, contact details, and copyright notices.
- **Subpages (`AboutPage.jsx`, `ContactPage.jsx`, `ServicesPage.jsx`)**: Harmonized with the new visual identity, palette, and typography.

## Fixed
- **GitHub Pages Blank Screen Issue**: Resolved GitHub Pages configuration conflict where raw repository files were deployed instead of the compiled production bundle. Configured GitHub Pages deployment `build_type` to `workflow`.
- **Commented Head Meta Tags in `index.html`**: Uncommented `<title>` and `<meta name="description">` so the pre-rendering engine (`scripts/prerender.js`) successfully matches and replaces page metadata across all 19 canonical routes.
- **Lint Sanitization**: Cleaned up all unused imports and variables across components, achieving 0 errors and 0 warnings under `oxlint`.

## Security
- Dependency audit (`npm audit`) verified with **0 vulnerabilities** across all dependencies.
- Automated sanitization and input validation retained in `BookingForm.jsx` for client inputs (XSS prevention, length limits, regex sanitization).
- GitHub Pages workflow configured with least-privilege token permissions (`contents: read`, `pages: write`, `id-token: write`).
- No secrets or credentials hardcoded or committed to version control.

## Breaking Changes
- None. All canonical routes (`/`, `/services`, `/locations`, `/about`, `/contact`, and dynamic service/location paths) and SEO schemas remain backward-compatible.

## Deployment
- Automated deployment to GitHub Pages via GitHub Actions workflow [deploy.yml](.github/workflows/deploy.yml).
- Deployment URL: `https://vasanth-software-dev.github.io/vetrigaram_services/`.
- Target artifact: `./dist`.

## Upgrade Notes
- Run `npm ci` to ensure local dependencies match `package-lock.json`.
- Execute `npm run build` to compile the Vite application and trigger the post-build SEO prerender pipeline.
- Preview locally using `npm run preview`.
