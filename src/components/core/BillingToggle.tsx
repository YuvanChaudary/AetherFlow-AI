"use client";

import React from "react";
import { usePricingControls } from "@/hooks/usePricingEngine";

/**
 * BillingToggle
 *
 * Toggles dynamic calculations between Monthly and Annual billing options.
 * Directs changes to the price registry without updating parent layout scopes.
 */
export function BillingToggle() {
  const { billingCycle, setCycle } = usePricingControls();

  return (
    <div 
      className="flex items-center gap-1 bg-nocturnal-expedition/30 border border-mystic-mint/10 p-1 rounded-full relative shadow-sm select-none"
      role="group"
      aria-label="Billing Cycle Selector"
    >
      {/* Monthly Button */}
      <button
        type="button"
        onClick={() => setCycle("monthly")}
        className={`px-5 py-2 rounded-full font-technical text-xs font-bold transition-all duration-interactive ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-forsythia cursor-pointer ${
          billingCycle === "monthly"
            ? "bg-forsythia text-oceanic-noir shadow-md"
            : "text-mystic-mint hover:text-arctic-powder hover:bg-nocturnal-expedition/20"
        }`}
        aria-pressed={billingCycle === "monthly"}
      >
        Monthly
      </button>

      {/* Annual Button */}
      <button
        type="button"
        onClick={() => setCycle("annual")}
        className={`px-5 py-2 rounded-full font-technical text-xs font-bold transition-all duration-interactive ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-forsythia relative cursor-pointer ${
          billingCycle === "annual"
            ? "bg-forsythia text-oceanic-noir shadow-md"
            : "text-mystic-mint hover:text-arctic-powder hover:bg-nocturnal-expedition/20"
        }`}
        aria-pressed={billingCycle === "annual"}
      >
        Annual
        {/* Pulsing discount pill badge */}
        <span 
          className="absolute -top-3 -right-3 px-1.5 py-0.5 text-[8px] font-sans font-bold bg-deep-saffron text-arctic-powder rounded-full shadow-sm animate-pulse"
          aria-label="Save 20 percent on annual plan"
        >
          -20%
        </span>
      </button>
    </div>
  );
}

export default BillingToggle;
