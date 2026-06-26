"use client";

import React, { useRef } from "react";
import { BentoItem } from "@/types";
import { Icon, IconName } from "@/components/core/Icon";

interface BentoCardProps {
  item: BentoItem;
  index: number;
  isActive: boolean;
  onActive: (index: number) => void;
  className?: string;
}

/**
 * BentoCard
 *
 * Represents an individual card cell in the desktop Bento Grid layout.
 * Features a hardware-accelerated radial spotlight trail on cursor hover
 * and binds focus and mouse entering events to the global active index.
 */
export function BentoCard({
  item,
  index,
  isActive,
  onActive,
  className = "",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Directly sets CSS custom properties for mouse tracking glow to bypass React re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    onActive(index);
  };

  const handleFocus = () => {
    onActive(index);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      tabIndex={0}
      className={`relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden cursor-pointer select-none group border transition-all duration-interactive ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-forsythia ${
        isActive
          ? "border-forsythia/40 bg-nocturnal-expedition/20 shadow-glow"
          : "border-mystic-mint/10 bg-nocturnal-expedition/5"
      } ${className}`}
      aria-selected={isActive}
      role="tab"
    >
      {/* 1. Cursor Spotlight Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 200, 1, 0.08), transparent 85%)`,
        }}
      />

      {/* 2. Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Card Header (Icon & Badge / Metric) */}
        <div className="flex items-center justify-between mb-8">
          <div className={`p-3 rounded-lg border transition-all duration-300 ${
            isActive 
              ? "bg-forsythia/10 border-forsythia/30 text-forsythia"
              : "bg-nocturnal-expedition/20 border-mystic-mint/10 text-mystic-mint"
          }`}>
            <Icon name={item.iconName as IconName} size={20} />
          </div>
          
          {item.badge && (
            <span className="px-2 py-0.5 text-[9px] font-technical font-bold uppercase tracking-wider bg-deep-saffron text-arctic-powder rounded-md">
              {item.badge}
            </span>
          )}
        </div>

        {/* Card Body (Title & Copy) */}
        <div>
          <h3 className="font-technical text-md font-bold text-arctic-powder mb-2 group-hover:text-forsythia transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-xs text-mystic-mint/65 leading-relaxed mb-6">
            {item.description}
          </p>
        </div>

        {/* Card Footer Metric display */}
        <div className="border-t border-mystic-mint/5 pt-4 flex items-center justify-between text-xs">
          <span className="text-[10px] text-mystic-mint/40 uppercase tracking-widest font-medium">
            METRIC
          </span>
          <span className="font-technical font-bold text-forsythia">
            {item.metric}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BentoCard;
