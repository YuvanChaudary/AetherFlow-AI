import React from "react";
import type { Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { buildMetadata, StructuredData, buildWebSiteSchema, buildOrganizationSchema, buildSoftwareApplicationSchema, mergeSchemas } from "@/lib/seo";
import "@/styles/globals.css";

// ── Font Optimization (next/font/google) ──────────────────────────────────────
const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ── Next.js SEO Metadata Configuration ────────────────────────────────────────
export const metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#172B36", // Oceanic Noir brand color
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Layout Component ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Merge initial global site schema data
  const globalSchemas = mergeSchemas(
    buildWebSiteSchema(),
    buildOrganizationSchema(),
    buildSoftwareApplicationSchema()
  );

  return (
    <html
      lang="en"
      className={`${fontInter.variable} ${fontJetBrainsMono.variable} motion-safe:scroll-smooth`}
    >
      <head>
        {/* Safe JSON-LD script injection in the head */}
        <StructuredData schema={globalSchemas} />
      </head>
      <body className="bg-oceanic-noir text-arctic-powder min-h-screen flex flex-col antialiased selection:bg-forsythia selection:text-oceanic-noir">
        {/* Skip Link for Keyboard Nav Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Header />


        {/* Main Content Area */}
        <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
          {children}
        </main>

        {/* Global Semantic Footer */}
        <Footer />
      </body>
    </html>
  );
}
