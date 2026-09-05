import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../data/seoData';
import { escapeJsonForScript, sanitizeText } from '../utils/security';

/**
 * Reusable Enterprise SEO Component
 * Controls <title>, <meta>, canonical, robots, Open Graph, Twitter Cards, and JSON-LD schemas.
 * Operates during client navigation (updating DOM) and during build-time prerendering.
 */
export default function SeoHead({
  title,
  description,
  canonicalPath = '',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  ogType = 'website',
  ogImage = SITE_CONFIG.defaultOgImage,
  schemas = [],
}) {
  const fullTitle = title 
    ? (title.includes(SITE_CONFIG.shortName) ? title : `${title} | ${SITE_CONFIG.brandName}`)
    : `${SITE_CONFIG.brandName} | Premium Appliance, Electrical & Plumbing Repair`;

  const metaDesc = description || "Vetrigaram Tech Services delivers fast, reliable, and professional appliance repair, electrical troubleshooting, and plumbing services from verified technicians at transparent prices.";

  // Normalize and sanitize canonical URL path
  const sanitizedPath = sanitizeText(canonicalPath, { allowNewlines: false, maxLength: 200 }).replace(/^[/\\]+/, '/');
  const cleanPath = sanitizedPath.startsWith('/') ? sanitizedPath : `/${sanitizedPath}`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;

  useEffect(() => {
    // 1. Title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const updateMeta = (attributeName, attributeValue, content) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    updateMeta('name', 'description', metaDesc);
    updateMeta('name', 'robots', robots);

    // 3. Open Graph
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', metaDesc);
    updateMeta('property', 'og:url', canonicalUrl);
    updateMeta('property', 'og:image', ogImage);
    updateMeta('property', 'og:type', ogType);
    updateMeta('property', 'og:site_name', SITE_CONFIG.brandName);
    updateMeta('property', 'og:locale', SITE_CONFIG.locale);

    // 4. Twitter Cards
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', metaDesc);
    updateMeta('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Schemas injection
    const existingSchemaScript = document.getElementById('dynamic-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schemas && schemas.length > 0) {
      const validSchemas = schemas.filter(Boolean);
      if (validSchemas.length > 0) {
        const script = document.createElement('script');
        script.id = 'dynamic-jsonld-schema';
        script.type = 'application/ld+json';
        const rawJson = JSON.stringify(
          validSchemas.length === 1 ? validSchemas[0] : { "@context": "https://schema.org", "@graph": validSchemas }
        );
        script.textContent = escapeJsonForScript(rawJson);
        document.head.appendChild(script);
      }
    }
  }, [fullTitle, metaDesc, canonicalUrl, robots, ogType, ogImage, schemas]);

  // Render elements directly for SSR / React 19 metadata hoisting
  const validSchemas = (schemas || []).filter(Boolean);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_CONFIG.brandName} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {validSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: escapeJsonForScript(
              JSON.stringify(
                validSchemas.length === 1 ? validSchemas[0] : { "@context": "https://schema.org", "@graph": validSchemas }
              )
            )
          }}
        />
      )}
    </>
  );
}
