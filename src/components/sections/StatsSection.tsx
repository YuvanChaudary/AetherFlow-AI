"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon, IconName } from "@/components/core/Icon";

interface StatItem {
  id: number;
  iconName: string;
  targetValue: string;
  label: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 1,
    iconName: "cog-8-tooth",
    targetValue: "99.99%",
    label: "Platform Uptime Guarantee",
  },
  {
    id: 2,
    iconName: "arrow-path",
    targetValue: "50M+",
    label: "Pipelines Executed",
  },
  {
    id: 3,
    iconName: "cube-16-solid",
    targetValue: "180+",
    label: "Enterprise Customers",
  },
  {
    id: 4,
    iconName: "chart-pie",
    targetValue: "2.3PB",
    label: "Data Processed Daily",
  },
];

/**
 * StatCounter
 *
 * Micro-component that parses numbers from strings (like decimals, suffixes)
 * and animates them using requestAnimationFrame with an exponential ease-out
 * deceleration when triggered by the viewport IntersectionObserver.
 */
function StatCounter({ targetValue }: { targetValue: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(() => {
    // Extract suffix for initial display state (e.g. "0%")
    const match = targetValue.match(/^[\d.]+(.*)$/);
    const suffix = match ? match[1] : "";
    return "0" + suffix;
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
          
          // Start animation
          const match = targetValue.match(/^([\d.]+)(.*)$/);
          if (!match) return;
          const targetNum = parseFloat(match[1]);
          const suffix = match[2];
          const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;

          const duration = 1500; // 1.5 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Exponential easeOut: starts fast, slows down smoothly
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentNum = easeProgress * targetNum;

            setCurrentValue(currentNum.toFixed(decimals) + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, targetValue]);

  return <span ref={elementRef}>{currentValue}</span>;
}

/**
 * StatsSection
 *
 * Renders a responsive dashboard metrics row displaying trust statistics.
 * The numbers trigger counting animations independently upon scrolling into viewport.
 */
export function StatsSection() {
  return (
    <section
      aria-label="Operational Metrics"
      className="w-full bg-oceanic-noir border-y border-mystic-mint/5 py-16 select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          role="region"
          aria-label="Platform performance statistics"
        >
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 p-6 glass-panel rounded-xl border border-mystic-mint/10"
            >
              {/* Icon Bubble */}
              <div className="p-3 rounded-lg bg-nocturnal-expedition/30 border border-mystic-mint/10 text-forsythia flex items-center justify-center">
                <Icon name={stat.iconName as IconName} size={20} />
              </div>

              {/* Stat Value & Title */}
              <div className="flex flex-col gap-1">
                <span className="font-mono text-3xl md:text-4xl font-extrabold text-arctic-powder tracking-tight">
                  <StatCounter targetValue={stat.targetValue} />
                </span>
                <p className="text-xs text-mystic-mint/60 uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
