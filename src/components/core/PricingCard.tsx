"use client";

import React from "react";
import { PricingTierData } from "@/types";
import { usePricingCardRefs } from "@/hooks/usePricingEngine";
import { Icon } from "@/components/core/Icon";

interface PricingCardProps {
  tier: PricingTierData;
  isPopular?: boolean;
}

/**
 * PricingCard
 *
 * Memoized card element that represents a specific pricing tier.
 * Bypasses React updates for price values by referencing direct DOM nodes.
 */
export const PricingCard = React.memo(function PricingCard({
  tier,
  isPopular = false,
}: PricingCardProps) {
  // Bind price and cycle text nodes to the DOM Price Registry
  const { priceRef, labelRef } = usePricingCardRefs(tier.id);

  return (
    <article
      className={`glass-panel rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-interactive ease-[var(--ease-out)] ${
        isPopular
          ? "border-forsythia/35 bg-nocturnal-expedition/20 shadow-glow"
          : "border-mystic-mint/10"
      }`}
      aria-label={`${tier.name} Plan Details`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <span className="absolute -top-3 left-8 px-3 py-1 text-[9px] font-technical font-bold uppercase tracking-wider bg-forsythia text-oceanic-noir rounded-full shadow-md animate-pulse">
          Most Popular
        </span>
      )}

      <div>
        {/* Tier Header */}
        <h3 className="font-technical text-lg font-bold text-forsythia mb-2">
          {tier.name}
        </h3>
        
        {/* Dynamic Price Display DOM Nodes */}
        <div className="flex items-baseline gap-1.5 mb-6" aria-live="polite">
          <span
            ref={priceRef}
            className="text-4xl md:text-5xl font-technical font-bold text-arctic-powder"
          >
            {/* Predictable SSR default placeholder: USD Monthly */}
            {`$${tier.baseMonthlyRate}`}
          </span>
          <span
            ref={labelRef}
            className="text-xs text-mystic-mint/60 uppercase tracking-wider"
          >
            /mo
          </span>
        </div>

        {/* Feature Checklist */}
        <ul className="space-y-4 mb-8" role="list">
          {tier.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-xs text-mystic-mint/95">
              <Icon
                name="cube-16-solid"
                size={12}
                className="text-forsythia mt-0.5 shrink-0"
              />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA Button */}
      <button
        type="button"
        className={`w-full py-3 rounded-lg font-technical text-xs font-bold transition-all duration-interactive ease-[var(--ease-out)] cursor-pointer focus-visible:outline-2 focus-visible:outline-forsythia ${
          isPopular
            ? "btn-primary"
            : "border border-mystic-mint/25 bg-nocturnal-expedition/10 text-arctic-powder hover:bg-nocturnal-expedition/30 hover:border-mystic-mint/45"
        }`}
      >
        Select {tier.name}
      </button>
    </article>
  );
});

PricingCard.displayName = "PricingCard";
export default PricingCard;
