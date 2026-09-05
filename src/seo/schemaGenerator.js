import { SITE_CONFIG } from '../data/seoData.js';

/**
 * Enterprise Schema.org JSON-LD Builders
 * Validated against Schema.org and Google Search Console Rich Results specifications.
 */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    "name": SITE_CONFIG.brandName,
    "legalName": SITE_CONFIG.legalName,
    "url": SITE_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": SITE_CONFIG.defaultOgImage,
      "width": "512",
      "height": "512",
      "caption": SITE_CONFIG.brandName
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE_CONFIG.phone,
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Tamil"]
    },
    "sameAs": [
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.twitter,
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.linkedin
    ]
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.siteUrl}/#website`,
    "url": SITE_CONFIG.siteUrl,
    "name": SITE_CONFIG.brandName,
    "description": "Premium doorstep home appliance repair, electrical troubleshooting, and plumbing services in Chennai.",
    "publisher": {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`
    },
    "inLanguage": "en-IN"
  };
}

export function getLocalBusinessSchema(location = null) {
  const locality = location ? location.name : SITE_CONFIG.address.addressLocality;
  const postalCode = location ? location.postalCode : SITE_CONFIG.address.postalCode;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_CONFIG.siteUrl}/#localbusiness${location ? `-${location.id}` : ''}`,
    "name": `${SITE_CONFIG.brandName} ${location ? `- ${location.name}` : ''}`,
    "image": SITE_CONFIG.defaultOgImage,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "url": location ? `${SITE_CONFIG.siteUrl}/locations/${location.id}` : SITE_CONFIG.siteUrl,
    "priceRange": SITE_CONFIG.priceRange,
    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
    "currenciesAccepted": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": locality,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "postalCode": postalCode,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "21:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Chennai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Ambattur"
      }
    ]
  };
}

export function getServiceSchema(service, location = null) {
  if (!service) return null;

  const serviceUrl = location 
    ? `${SITE_CONFIG.siteUrl}/${location.id}/${service.id}`
    : `${SITE_CONFIG.siteUrl}/services/${service.id}`;

  const serviceName = location
    ? `${service.name} in ${location.name}`
    : service.name;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    "name": serviceName,
    "serviceType": service.categoryTitle,
    "description": service.desc,
    "url": serviceUrl,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": SITE_CONFIG.brandName,
      "telephone": SITE_CONFIG.phone,
      "url": SITE_CONFIG.siteUrl
    },
    "areaServed": {
      "@type": location ? "AdministrativeArea" : "City",
      "name": location ? location.name : "Chennai, Tamil Nadu"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Offer Catalog`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${serviceName} - Doorstep Inspection & Estimate`
          },
          "price": "149",
          "priceCurrency": "INR",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "149",
            "priceCurrency": "INR",
            "name": "Inspection Fee (Adjusted in final service bill)"
          },
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01"
        }
      ]
    }
  };
}

export function getBreadcrumbSchema(items = []) {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_CONFIG.siteUrl}${item.url}`
    }))
  };
}

export function getFaqSchema(faqs = []) {
  if (!faqs || !faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}
