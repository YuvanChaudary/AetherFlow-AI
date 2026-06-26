import React from "react";
import { Hero } from "@/components/sections/Hero";
import { PricingEngine } from "@/components/core/PricingEngine";
import { BentoAccordion } from "@/components/core/BentoAccordion";
import { SocialProof } from "@/components/sections/SocialProof";
import { StatsSection } from "@/components/sections/StatsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

/**
 * Main Index Page - Server Component (RSC)
 * Maximizes initial load performance and SEO indexing.
 * Hosts the Hero section and dynamic pricing engine.
 */
export default function Page() {
  return (
    <>
      {/* Hero Section & WebGL Canvas (Phase 1) */}
      <Hero />

      {/* ── Layout Slots ─────────────────── */}
      
      {/* Bento Grid Feature Showcase Section */}
      <section 
        id="features" 
        aria-label="Features Showcase" 
        className="w-full bg-oceanic-noir"
      >
        <BentoAccordion />
      </section>

      {/* Social Proof Brand Showcase */}
      <SocialProof />

      {/* Performance Metrics strip */}
      <StatsSection />

      {/* Customer Testimonials Grid */}
      <Testimonials />

      {/* Closing Call-To-Action Conversion Area */}
      <CTASection />

      {/* Frequently Asked Questions Accordion */}
      <FAQ />

      {/* Inline Newsletter Subscription */}
      <NewsletterCTA />

      {/* Technology Architecture Section */}
      <section 
        id="technology" 
        aria-label="Technology Engine" 
        className="w-full bg-oceanic-noir"
      >
        {/* Tech stack details and flow charts */}
      </section>

      {/* Dynamic Pricing Matrix Section */}
      <section 
        id="pricing" 
        aria-label="Flexible Pricing Plans" 
        className="w-full bg-oceanic-noir"
      >
        <PricingEngine />
      </section>

      {/* Docs References Section */}
      <section 
        id="docs" 
        aria-label="Developer Resources" 
        className="w-full bg-oceanic-noir"
      >
        {/* Documentation links and guides */}
      </section>
    </>
  );
}

