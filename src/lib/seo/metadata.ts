import type { Metadata } from "next";
import { SITE_CONFIG } from "./config";

export interface MetadataOptions {
  title?: string;
  titleAbsolute?: boolean;
  description?: string;
  keywords?: string[];
  mergeKeywords?: boolean;
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
  noFollow?: boolean;
}

const resolveImage = (img: string): string =>
  img.startsWith("http") ? img : `${SITE_CONFIG.url}${img}`;

const canonicalUrl = (path = "/"): string =>
  `${SITE_CONFIG.url}${path === "/" ? "" : path}`;

/**
 * Builds the page metadata schema dynamically.
 */
export function buildMetadata(opts: MetadataOptions = {}): Metadata {
  const {
    title,
    titleAbsolute = false,
    description = SITE_CONFIG.description,
    keywords = [],
    mergeKeywords = true,
    path = "/",
    ogImage = SITE_CONFIG.ogImage,
    ogImageAlt = `${SITE_CONFIG.name} – Autonomous Data Platform`,
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogType = "website",
    twitterCard = "summary_large_image",
    noIndex = false,
    noFollow = false,
  } = opts;

  const resolvedTitle = title
    ? titleAbsolute
      ? title
      : `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name;

  const resolvedKeywords = mergeKeywords
    ? [...new Set([...SITE_CONFIG.keywords, ...keywords])]
    : keywords.length > 0
    ? keywords
    : [...SITE_CONFIG.keywords];

  const canonical = canonicalUrl(path);
  const ogImageUrl = resolveImage(ogImage);

  return {
    title: title
      ? { default: resolvedTitle, template: titleAbsolute ? "%s" : `%s | ${SITE_CONFIG.name}` }
      : { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
    description,
    keywords: resolvedKeywords,
    authors: SITE_CONFIG.authors.map((a) => ({ name: a.name, url: a.url })),
    creator: "AetherFlow Engineering Team",
    publisher: "AetherFlow AI",
    category: "technology",
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
    },
    openGraph: {
      type: ogType,
      url: canonical,
      title: resolvedTitle,
      description,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: resolvedTitle,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [ogImageUrl],
    },
    appleWebApp: {
      capable: true,
      title: SITE_CONFIG.shortName,
      statusBarStyle: "black-translucent",
    },
    applicationName: SITE_CONFIG.shortName,
    generator: "Next.js",
    metadataBase: new URL(SITE_CONFIG.url),
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      shortcut: "/favicon.ico",
      apple: [{ url: "/assets/icons/cube-16-solid.svg", sizes: "180x180", type: "image/svg+xml" }],
    },
  };
}
