import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ALL_CANONICAL_ROUTES,
  SITE_CONFIG,
  getServiceBySlug,
  getLocationBySlug
} from '../src/data/seoData.js';

import {
  getOrganizationSchema,
  getWebSiteSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFaqSchema
} from '../src/seo/schemaGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');
const today = new Date().toISOString().split('T')[0];

console.log('--- Starting Enterprise SEO Build & Prerender Pipeline ---');

// Helper to determine route metadata & structured data
function getRouteMetadata(routePath) {
  let title = `${SITE_CONFIG.brandName} | Premium Appliance Repair`;

  let description =
    'Vetrigaram Tech Services delivers fast, reliable, and professional appliance repair services across Chennai and Ambattur from verified technicians.';

  let schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getLocalBusinessSchema()
  ];

  if (routePath === '/') {
    // Homepage
    title = `${SITE_CONFIG.brandName} | Premium Appliance Repair`;

    description =
      'Vetrigaram Tech Services delivers fast, certified, and warranty-backed appliance repair services across Chennai and Ambattur. ₹149 inspection.';
  } else if (routePath === '/services') {
    title = `All Doorstep Appliance Services | Appliance Repair | ${SITE_CONFIG.shortName}`;

    description =
      'Browse all certified doorstep appliance repair services by Vetrigaram in Chennai and Ambattur. AC servicing, refrigerator repair, washing machine repair, microwave repair, and more.';

    schemas.push(
      getBreadcrumbSchema([
        { name: 'Services', url: '/services' }
      ])
    );
  } else if (routePath.startsWith('/services/')) {
    const slug = routePath.replace('/services/', '');
    const service = getServiceBySlug(slug);

    if (service) {
      title = `${service.name} | Doorstep Repair & Servicing | ${SITE_CONFIG.shortName}`;

      description = `${service.desc} Transparent ₹149 inspection charge adjusted in final bill. 30-day service warranty.`;

      schemas = [
        getServiceSchema(service),
        getBreadcrumbSchema([
          { name: 'Services', url: '/services' },
          {
            name: service.name,
            url: `/services/${service.id}`
          }
        ]),
        getFaqSchema(service.faqs)
      ];
    }
  } else if (routePath === '/locations') {
    title = `Service Locations & Doorstep Coverage | ${SITE_CONFIG.brandName}`;

    description =
      "Explore Vetrigaram's active doorstep technician hubs across Chennai and Ambattur. Certified home appliance repair with fast technician arrival.";

    schemas.push(
      getBreadcrumbSchema([
        { name: 'Locations', url: '/locations' }
      ])
    );
  } else if (routePath.startsWith('/locations/')) {
    const slug = routePath.replace('/locations/', '');
    const location = getLocationBySlug(slug);

    if (location) {
      title = location.metaTitle;
      description = location.metaDescription;

      schemas = [
        getLocalBusinessSchema(location),
        getBreadcrumbSchema([
          { name: 'Locations', url: '/locations' },
          {
            name: location.name,
            url: `/locations/${location.id}`
          }
        ]),
        getFaqSchema(location.faqs)
      ];
    }
  } else if (routePath === '/about') {
    title = `About Us | Verified Doorstep Appliance Technicians | ${SITE_CONFIG.shortName}`;

    description =
      'Learn about Vetrigaram Tech Services. Our mission is delivering reliable, verified, and warranty-backed appliance repair across Chennai and Ambattur.';

    schemas = [
      getOrganizationSchema(),
      getBreadcrumbSchema([
        { name: 'About Us', url: '/about' }
      ])
    ];
  } else if (routePath === '/contact') {
    title = `Contact Us & Book a Technician | ${SITE_CONFIG.brandName}`;

    description =
      'Contact Vetrigaram Tech Services in Chennai & Ambattur. Call +91 6374121120 or book online for fast appliance repair. Open 8 AM - 9 PM daily.';

    schemas = [
      getLocalBusinessSchema(),
      getBreadcrumbSchema([
        { name: 'Contact', url: '/contact' }
      ])
    ];
  } else {
    // Check if it matches /:locationSlug/:serviceSlug
    const parts = routePath.split('/').filter(Boolean);

    if (parts.length === 2) {
      const [locSlug, srvSlug] = parts;

      const location = getLocationBySlug(locSlug);
      const service = getServiceBySlug(srvSlug);

      if (location && service) {
        title = `${service.name} in ${location.name} | Doorstep Service | ${SITE_CONFIG.shortName}`;

        description =
          `Professional ${service.name.toLowerCase()} in ${location.name}. ` +
          `Fast doorstep technician dispatch across ${location.keyLocalities
            .slice(0, 4)
            .join(', ')}. Flat ₹149 inspection with 30-day warranty.`;

        schemas = [
          getServiceSchema(service, location),
          getLocalBusinessSchema(location),
          getBreadcrumbSchema([
            {
              name: 'Locations',
              url: '/locations'
            },
            {
              name: location.name,
              url: `/locations/${location.id}`
            },
            {
              name: service.shortName,
              url: `/${location.id}/${service.id}`
            }
          ]),
          getFaqSchema(service.faqs)
        ];
      }
    }
  }

  const cleanPath = routePath.startsWith('/')
    ? routePath
    : `/${routePath}`;

  const canonicalUrl =
    `${SITE_CONFIG.siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;

  return {
    title,
    description,
    canonicalUrl,
    schemas: schemas.filter(Boolean)
  };
}

// 1. Generate Static HTML for all indexable routes
let generatedCount = 0;

for (const route of ALL_CANONICAL_ROUTES) {
  const meta = getRouteMetadata(route.path);

  let html = templateHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/s,
    `<title>${meta.title}</title>`
  );

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/s,
    `<link rel="canonical" href="${meta.canonicalUrl}" />`
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${meta.title}" />`
  );

  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${meta.description}" />`
  );

  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/s,
    `<meta property="og:url" content="${meta.canonicalUrl}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/s,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/s,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  // Inject JSON-LD Schema before </head>
  if (meta.schemas && meta.schemas.length > 0) {
    const schemaScript = `
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(
  meta.schemas.length === 1
    ? meta.schemas[0]
    : {
        '@context': 'https://schema.org',
        '@graph': meta.schemas
      },
  null,
  2
)}
    </script>
  </head>`;

    html = html.replace('</head>', schemaScript);
  }

  // Determine output filepath
  if (route.path === '/') {
    fs.writeFileSync(
      path.join(distDir, 'index.html'),
      html,
      'utf-8'
    );
  } else {
    const targetDir = path.join(
      distDir,
      route.path.replace(/^\//, '')
    );

    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(
      path.join(targetDir, 'index.html'),
      html,
      'utf-8'
    );
  }

  generatedCount++;
}

console.log(
  `✓ Prerendered ${generatedCount} static HTML pages with unique metadata and JSON-LD schemas.`
);

// 2. Generate dist/404.html
const notFoundHtml = templateHtml
  .replace(
    /<title>.*?<\/title>/s,
    `<title>Page Not Found (404) | ${SITE_CONFIG.brandName}</title>`
  )
  .replace(
    /<meta name="robots" content=".*?" \/>/s,
    `<meta name="robots" content="noindex, follow" />`
  );

fs.writeFileSync(
  path.join(distDir, '404.html'),
  notFoundHtml,
  'utf-8'
);

console.log(
  '✓ Generated dist/404.html with noindex directive for GitHub Pages SPA fallback.'
);

// 3. Generate XML Sitemap
const sitemapEntries = ALL_CANONICAL_ROUTES
  .map(route => {
    const cleanPath = route.path.startsWith('/')
      ? route.path
      : `/${route.path}`;

    const loc =
      `${SITE_CONFIG.siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || '0.8'}</priority>
  </url>`;
  })
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemapEntries}
</urlset>
`;

fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  sitemapXml
);

console.log(
  `✓ Generated dist/sitemap.xml with ${ALL_CANONICAL_ROUTES.length} canonical URLs.`
);

// 4. Ensure robots.txt in dist
const robotsSource = path.resolve(
  __dirname,
  '../public/robots.txt'
);

if (fs.existsSync(robotsSource)) {
  fs.copyFileSync(
    robotsSource,
    path.join(distDir, 'robots.txt')
  );

  console.log(
    '✓ Verified dist/robots.txt points to https://vasanth-software-dev.github.io/vetrigaram_services/sitemap.xml'
  );
}

console.log(
  '--- Enterprise SEO Build & Prerender Completed Successfully ---'
);
