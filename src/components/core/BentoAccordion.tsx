"use client";

import React, { useState, useEffect } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useBentoAccordionState } from "@/hooks/useBentoAccordionState";
import BentoCard from "./BentoCard";
import AccordionItem from "./AccordionItem";
import { BentoItem } from "@/types";

const FEATURES: BentoItem[] = [
  {
    id: 1,
    title: "Autonomous Workflows",
    description:
      "Deploy self-healing automation loops that automatically recover and scale based on live pipeline load.",
    iconName: "cog-8-tooth",
    metric: "99.8% Recovery",
    badge: "Auto-Scale",
  },
  {
    id: 2,
    title: "Vector Search Engine",
    description:
      "High-dimensional neural indexing for semantic search queries at millisecond scale.",
    iconName: "search",
    metric: "< 2ms Latency",
    badge: "Neural Index",
  },
  {
    id: 3,
    title: "Streaming ETL",
    description:
      "Real-time data transformation pipelines with zero-copy streaming and dynamic schema matching.",
    iconName: "arrow-path",
    metric: "5.2 GB/s Bandwidth",
    badge: "Real-time",
  },
  {
    id: 4,
    title: "Real-Time AI Agents",
    description:
      "Multi-agent systems executing low-latency decision trees and asynchronous operations.",
    iconName: "cube-16-solid",
    metric: "12,500 ops/sec",
    badge: "Multi-Agent",
  },
  {
    id: 5,
    title: "Data Governance",
    description:
      "Automated compliance monitoring, strict lineage tracking, and granular attribute access controls.",
    iconName: "link-solid",
    metric: "100% Audited",
    badge: "SOC 2 Type II",
  },
  {
    id: 6,
    title: "Enterprise Security",
    description:
      "Military-grade end-to-end encryption, secure enclave execution environments, and zero-trust verification.",
    iconName: "arrow-trending-up",
    metric: "FIPS 140-3 Standard",
    badge: "Zero-Trust",
  },
];

/**
 * BentoAccordion
 *
 * Responsive features showcase that automatically transforms from a premium
 * Bento Grid on desktop viewports to a touch-optimized Accordion on mobile viewports.
 * Maintains context lock on active indices across breakpoints using a pub-sub store.
 */
export function BentoAccordion() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint("(min-width: 920px)");
  const { activeIndex, setActiveIndex } = useBentoAccordionState();

  useEffect(() => {
    setMounted(true);
    // Set default active index to 0 (Autonomous Workflows) on mount
    setActiveIndex(0);
  }, [setActiveIndex]);

  const handleToggle = React.useCallback(
    (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
    },
    [activeIndex, setActiveIndex]
  );

  // Keyboard navigation for Bento Cards in the grid
  const handleGridKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        const cards = Array.from(
          document.querySelectorAll<HTMLDivElement>('[role="tab"][tabindex="0"]')
        );
        let nextIndex = index;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextIndex = (index + 1) % cards.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          nextIndex = (index - 1 + cards.length) % cards.length;
        }
        cards[nextIndex]?.focus();
      }
    },
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
      {/* Title & Section Sub-Header */}
      <h2 className="heading-section text-center text-arctic-powder mb-4">
        Premium AI Platform Features
      </h2>
      <p className="text-body-premium text-center max-w-lg mb-16">
        Accelerate operations with automated loops, millisecond-latency search, and enterprise-grade data protection.
      </p>

      {/* Responsive Wrapper with smooth mount transition */}
      <div
        className="w-full transition-opacity duration-300"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        {!mounted ? (
          // Crawlable and SEO-friendly static fallback matching the server render
          <div className="flex flex-col border-t border-mystic-mint/10 w-full">
            {FEATURES.map((item, idx) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={idx}
                isActive={idx === 0} // First panel expanded by default
                onToggle={() => {}}
              />
            ))}
          </div>
        ) : isDesktop ? (
          // Desktop view: Premium Bento Grid
          <div className="grid grid-cols-1 bento:grid-cols-3 gap-6 w-full items-stretch">
            {FEATURES.map((item, idx) => {
              // Custom alternating spans layout
              let colSpanClass = "bento:col-span-1";
              if (idx === 0 || idx === 3 || idx === 4) {
                colSpanClass = "bento:col-span-2";
              }

              return (
                <div
                  key={item.id}
                  className={colSpanClass}
                  onKeyDown={(e) => handleGridKeyDown(e, idx)}
                >
                  <BentoCard
                    item={item}
                    index={idx}
                    isActive={activeIndex === idx}
                    onActive={setActiveIndex}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          // Mobile view: Touch-optimized Accordion
          <div className="flex flex-col border-t border-mystic-mint/10 w-full">
            {FEATURES.map((item, idx) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={idx}
                isActive={activeIndex === idx}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BentoAccordion;
