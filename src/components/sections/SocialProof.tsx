"use client";

import React from "react";

const COMPANIES = [
  {
    name: "NEXUS",
    element: (
      <span className="font-mono font-black tracking-[0.25em] text-md">
        NEXUS
      </span>
    ),
  },
  {
    name: "ORBIT",
    element: (
      <span className="font-sans tracking-[0.2em] font-extrabold text-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full border border-current shrink-0 animate-pulse" />
        ORBIT
      </span>
    ),
  },
  {
    name: "FLOWGRID",
    element: (
      <span className="font-mono tracking-tight text-md font-semibold">
        FLOW<span className="font-extralight text-mystic-mint/50">/</span>GRID
      </span>
    ),
  },
  {
    name: "VECTORLAB",
    element: (
      <span className="font-mono text-xs font-medium tracking-wide">
        &lt;VECTOR_LAB&gt;
      </span>
    ),
  },
  {
    name: "DATASYNC",
    element: (
      <span className="font-sans text-xs font-bold tracking-[0.18em] uppercase">
        DATA::SYNC
      </span>
    ),
  },
  {
    name: "PIPELINE AI",
    element: (
      <span className="font-mono font-extrabold tracking-wider text-xs">
        PIPELINE<span className="text-[10px] font-light">.AI</span>
      </span>
    ),
  },
];

/**
 * SocialProof
 *
 * Renders a premium typography-based brand wall showcasing companies that
 * trust the platform. Restricts visual style to monochrome to maintain
 * technical, premium developer brand aesthetics.
 */
export function SocialProof() {
  return (
    <section
      aria-label="Platform Adopters"
      className="w-full bg-oceanic-noir border-t border-mystic-mint/5 py-12 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
        {/* Trusted-by heading */}
        <h2 className="font-mono text-[10px] text-mystic-mint/45 uppercase tracking-[0.2em] font-bold text-center">
          TRUSTED BY MODERN ENGINEERING TEAMS
        </h2>

        {/* Logo Wall */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-8 items-center justify-items-center w-full max-w-5xl"
          role="list"
        >
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              role="listitem"
              className="text-mystic-mint/35 hover:text-arctic-powder transition-colors duration-interactive ease-out flex items-center justify-center cursor-default"
              title={company.name}
            >
              {company.element}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
