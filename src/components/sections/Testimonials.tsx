"use client";

import React from "react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Principal Systems Architect",
    company: "NEXUS",
    quote: "AetherFlow AI completely transformed our real-time pipelines. Latency dropped by 80% on day one. Their autonomous scaling loops are absolutely bulletproof.",
    rating: 5,
    initials: "SJ",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Head of Platform Engineering",
    company: "ORBIT",
    quote: "We migrated 500+ streaming ETL flows in a single afternoon. The developer experience, zero hydration layout shifts, and automated compliance checks are world-class.",
    rating: 5,
    initials: "DC",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "VECTORLAB",
    quote: "Enterprise security and FIPS compliance were non-negotiable for our compute environments. AetherFlow checked every box without sacrificing vector search speeds.",
    rating: 5,
    initials: "ER",
  },
];

const StarIcon = React.memo(function StarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-forsythia fill-current"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
});

/**
 * Testimonials
 *
 * Renders three enterprise-grade quotes in a responsive multi-column layout.
 * Leverages semantic HTML `<blockquote/>` to optimize search crawler indexability
 * and implements CSS-based hover transitions for premium UX.
 */
export function Testimonials() {
  return (
    <section
      aria-label="Customer Success Stories"
      className="w-full bg-oceanic-noir py-24 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Header Title */}
        <h2 className="heading-section text-center text-arctic-powder mb-4">
          Trusted by Engineering Leaders
        </h2>
        <p className="text-body-premium text-center max-w-lg mb-16">
          See how scaling teams leverage AetherFlow to build resilient, low-latency data pipelines at scale.
        </p>

        {/* 3-Column Testimonials Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch"
          role="region"
          aria-label="Customer Testimonials"
        >
          {TESTIMONIALS_DATA.map((t) => (
            <article
              key={t.id}
              className="glass-panel rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-interactive border border-mystic-mint/10 bg-nocturnal-expedition/5 hover:border-forsythia/35 hover:bg-nocturnal-expedition/15 hover:shadow-glow"
              style={{
                transition:
                  "border-color var(--duration-interactive) var(--ease-out), background-color var(--duration-interactive) var(--ease-out), box-shadow var(--duration-interactive) var(--ease-out)",
              }}
            >
              {/* Card Body */}
              <div className="flex flex-col gap-5">
                {/* 5-Star Rating Indicators */}
                <div 
                  className="flex items-center gap-1"
                  aria-label={`Rated ${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                {/* Quote Content */}
                <blockquote className="text-xs text-mystic-mint/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Card Footer: Author Profile */}
              <div className="flex items-center gap-4 border-t border-mystic-mint/5 pt-5 mt-6">
                {/* Avatar Initial Bubble */}
                <div 
                  className="w-10 h-10 rounded-full bg-nocturnal-expedition/60 border border-mystic-mint/15 text-forsythia font-technical text-sm font-bold flex items-center justify-center shrink-0 cursor-default select-none"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>

                {/* Profile Citation Details */}
                <div className="flex flex-col text-left">
                  <cite className="font-technical text-xs font-bold text-arctic-powder not-italic">
                    {t.name}
                  </cite>
                  <span className="text-[10px] text-mystic-mint/55 uppercase tracking-wider font-light">
                    {t.role}, <span className="font-semibold text-forsythia/85">{t.company}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
