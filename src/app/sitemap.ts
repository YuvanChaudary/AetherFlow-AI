import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
