import { SITE_CONFIG } from "./config";

export type JsonLdSchema = Record<string, unknown>;

/**
 * Builds the WebSite JSON-LD schema for global search box actions.
 */
export function buildWebSiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Builds the Organization JSON-LD schema.
 */
export function buildOrganizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/assets/logo.png`,
    "description": SITE_CONFIG.description,
    "sameAs": [
      `https://x.com/${SITE_CONFIG.twitterHandle.replace("@", "")}`
    ]
  };
}

/**
 * Builds the SoftwareApplication JSON-LD schema for SaaS applications.
 */
export function buildSoftwareApplicationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "brand": {
      "@type": "Brand",
      "name": SITE_CONFIG.name,
    },
    "provider": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": `${SITE_CONFIG.url}/assets/icons/cube-16-solid.svg`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "280",
      "bestRating": "5",
      "worstRating": "1",
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "19.0",
      "highPrice": "149.0",
      "offerCount": "3"
    }
  };
}

/**
 * Merges multiple schemas into a unified JSON-LD array.
 */
export function mergeSchemas(...schemas: JsonLdSchema[]): JsonLdSchema[] {
  return schemas;
}
