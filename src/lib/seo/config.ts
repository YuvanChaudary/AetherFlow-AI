/**
 * Central SEO Configuration.
 * All metadata factories and structured schemas consume settings from this file.
 */
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aetherflow.ai",
  name: "AetherFlow AI",
  shortName: "AetherFlow",
  description: "AetherFlow AI is a premium, autonomous, next-gen AI-driven data automation platform. Streamline and orchestrate high-throughput data pipelines with zero engineering friction.",
  ogImage: "/assets/og-image.png",
  twitterHandle: "@aetherflow_ai",
  locale: "en_US",
  authors: [{ name: "AetherFlow Engineering Team", url: "https://aetherflow.ai" }],
  keywords: [
    "AI Platform",
    "Data Automation",
    "ETL",
    "ELT Data Pipelines",
    "Serverless Ingestion",
    "High-Performance SaaS",
    "AetherFlow AI",
    "Developer Data Tools",
  ],
  robots: "index, follow",
  themeColor: "#172B36", // Brand background: Oceanic Noir
  schemaType: "Organization" as const,
} as const;

export type SiteConfig = typeof SITE_CONFIG;
