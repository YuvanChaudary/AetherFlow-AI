import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AetherFlow AI Platform",
    short_name: "AetherFlow",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#172B36",
    theme_color: "#172B36",
    orientation: "portrait",
    icons: [
      {
        src: "/assets/icons/cube-16-solid.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
