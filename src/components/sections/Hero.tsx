"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useEntranceOrchestrator } from "@/hooks/useEntranceOrchestrator";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Icon, IconName } from "@/components/core/Icon";


// Lazy-load the WebGL canvas to preserve main-thread performance
const HeroCanvas = dynamic(() => import("../ui/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="w-40 h-40 rounded-full border border-mystic-mint/10 bg-nocturnal-expedition/10 animate-pulse" />
    </div>
  ),
});

export function Hero() {
  // Apply staggered entrance transitions on page load to elements with .animate-hero
  useEntranceOrchestrator(".animate-hero", 60);

  const metrics = [
    { value: "50k/s", label: "Max Throughput" },
    { value: "< 12ms", label: "Latency Ceiling" },
    { value: "99.999%", label: "Uptime SLA" },
  ];

  const trustedLogos: Array<{ name: string; icon: IconName }> = [
    { name: "VERCEL", icon: "cube-16-solid" },
    { name: "STRIPE", icon: "link-solid" },
    { name: "LINEAR", icon: "chart-pie" },
    { name: "RAYCAST", icon: "cog-8-tooth" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-65px)] w-full flex items-center justify-center overflow-hidden pt-12 pb-24 md:py-0">
      {/* 1. Global Ambient Backgrounds */}
      <BackgroundEffects />

      {/* 2. Structured Layout Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        {/* Left Copy Panel */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Eyebrow Badge */}
          <div className="animate-hero flex items-center gap-2 px-3 py-1 rounded-full bg-nocturnal-expedition/40 border border-mystic-mint/20 text-xs font-technical text-forsythia mb-6 shadow-glow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forsythia"></span>
            </span>
            AUTONOMOUS_ENGINE_V1.0
          </div>

          {/* Heading */}
          <h1 className="heading-hero animate-hero text-arctic-powder mb-6">
            AetherFlow AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forsythia to-deep-saffron">
              Data Automation Engine
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-body-premium animate-hero max-w-lg mb-8">
            Deploy self-healing data automation pipelines in seconds. Scale seamlessly from startup 
            prototypes to high-throughput enterprise matrices without maintaining database clusters.
          </p>

          {/* Dual CTAs */}
          <div className="animate-hero flex flex-wrap gap-4 mb-12">
            <a href="#pricing" className="btn-primary flex items-center gap-2 group">
              <span>Deploy Engine</span>
              <Icon name="chevron-right" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-mystic-mint/25 bg-nocturnal-expedition/10 font-technical text-sm font-bold text-arctic-powder hover:bg-nocturnal-expedition/30 hover:border-mystic-mint/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-forsythia"
            >
              Read Docs
            </a>
          </div>

          {/* Metrics Row */}
          <div className="animate-hero grid grid-cols-3 gap-6 md:gap-12 border-t border-mystic-mint/10 pt-8 w-full">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-technical text-xl md:text-2xl font-bold text-forsythia">
                  {m.value}
                </span>
                <span className="text-[10px] md:text-xs text-mystic-mint/60 uppercase tracking-widest mt-1">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trusted-By Section */}
          <div className="animate-hero flex items-center gap-4 mt-8 flex-wrap">
            <span className="text-[10px] text-mystic-mint/40 uppercase tracking-widest font-medium">
              TRUSTED BY
            </span>
            <div className="flex gap-6 items-center flex-wrap">
              {trustedLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center gap-1.5 opacity-40 hover:opacity-75 transition-opacity duration-200"
                >
                  <Icon name={logo.icon} size={14} className="text-mystic-mint" />
                  <span className="font-technical text-[10px] font-bold tracking-wider text-mystic-mint">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 3D Visual Panel */}
        <div className="lg:col-span-5 h-[28rem] lg:h-[40rem] relative flex items-center justify-center animate-hero">
          {/* 3D WebGL Canvas Layer */}
          <div className="absolute inset-0 z-0">
            <HeroCanvas />
          </div>

          {/* Glassmorphic Product Preview Card */}
          <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-xl p-4 z-10 select-none">
            <div className="flex items-center justify-between border-b border-mystic-mint/15 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-deep-saffron/80" />
                <span className="font-technical text-[10px] text-mystic-mint/70 tracking-wider">
                  aetherflow-worker.json
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-forsythia font-technical">
                <Icon name="arrow-path" size={10} className="animate-spin" />
                <span>active</span>
              </div>
            </div>
            <pre className="font-technical text-[10px] text-mystic-mint/90 leading-relaxed overflow-x-auto">
              <code>{`{
  "engine": "AetherFlow-V1",
  "pipeline": "enterprise-sync",
  "source": "postgresql://db.prod",
  "destination": "snowflake://warehouse",
  "status": "synchronized_idle"
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* 3. Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[10px] font-technical text-mystic-mint/50 select-none">
        <span>SCROLL</span>
        <div className="animate-bounce mt-1">
          <Icon name="chevron-down" size={12} className="text-forsythia" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
