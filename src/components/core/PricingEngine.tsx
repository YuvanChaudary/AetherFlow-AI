"use client";

import React from "react";
import { PRICING_MATRIX } from "@/config/pricingMatrix";
import { PricingCard } from "./PricingCard";
import { BillingToggle } from "./BillingToggle";
import { CurrencySelector } from "./CurrencySelector";

/**
 * PricingEngine
 *
 * Core layout shell wrapping pricing toggles, currency selectors, and pricing cards.
 * Declares zero state variables, rendering only once to guarantee absolute rendering isolation.
 */
export function PricingEngine() {
  const tiers = Object.values(PRICING_MATRIX.tiers);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center select-none">
      {/* Title & Section Sub-Header */}
      <h2 className="heading-section text-center text-arctic-powder mb-4">
        Predictable, Scalable Pricing Matrix
      </h2>
      <p className="text-body-premium text-center max-w-lg mb-12">
        Choose the computing tier matching your operational pipeline loads. Toggle billing cycles and currencies instantly.
      </p>

      {/* Control Selector Row */}
      <div 
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        role="presentation"
      >
        <BillingToggle />
        <CurrencySelector />
      </div>

      {/* 3-Column Responsive Cards Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch"
        role="region"
        aria-label="Pricing Tier Comparison Matrix"
      >
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            isPopular={tier.id === "pro"}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingEngine;
