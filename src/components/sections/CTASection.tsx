"use client";

import React from "react";
import { AuroraGradient } from "@/components/ui/BackgroundEffects/AuroraGradient";
import { NoiseOverlay } from "@/components/ui/BackgroundEffects/NoiseOverlay";

/**
 * CTASection
 *
 * Premium closing conversion panel. Uses ambient aurora glows and noise overlays
 * to establish visual depth, hosting keyboard-accessible call-to-actions.
 */
export function CTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="w-full bg-oceanic-noir border-t border-mystic-mint/5 py-32 relative overflow-hidden select-none"
    >
      {/* Visual Enhancers */}
      <AuroraGradient />
      <NoiseOverlay />

      {/* Grid overlay specifically for CTA section background context */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(217, 232, 226, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(217, 232, 226, 0.02) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Technical Subheading */}
        <span className="font-mono text-[10px] text-forsythia uppercase tracking-[0.25em] font-bold mb-4">
          OPERATIONAL SPEEDRUN
        </span>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="heading-section text-arctic-powder max-w-2xl leading-tight mb-6 font-mono font-bold"
        >
          Scale Your Compute to Infinite Automation
        </h2>

        {/* Supporting Copy */}
        <p className="text-body-premium max-w-lg mb-10 text-mystic-mint/70">
          Deploy self-healing pipelines, real-time vector search indexers, and autonomous multi-agent microservices in minutes. Free tier includes 500K automated execution seconds.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          role="presentation"
        >
          <button
            type="button"
            className="btn-primary px-8 py-3.5 text-xs select-none w-full sm:w-auto"
          >
            Deploy Pipeline Free
          </button>
          
          <button
            type="button"
            className="px-8 py-3.5 text-xs font-mono font-bold rounded-lg border border-mystic-mint/25 bg-nocturnal-expedition/10 text-arctic-powder hover:bg-nocturnal-expedition/25 hover:border-mystic-mint/45 select-none w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-forsythia cursor-pointer"
            style={{
              transition:
                "background-color var(--duration-interactive) var(--ease-out), border-color var(--duration-interactive) var(--ease-out)",
            }}
          >
            Schedule Tech Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
