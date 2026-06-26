"use client";

import React from "react";
import { usePricingControls } from "@/hooks/usePricingEngine";
import { Currency } from "@/types";

/**
 * CurrencySelector
 *
 * Exposes currency toggle switches between INR, USD, and EUR.
 * Updates the global DOM pricing registry reactively.
 */
export function CurrencySelector() {
  const { currency, setCurrency } = usePricingControls();

  const currencies: Array<{ value: Currency; label: string }> = [
    { value: "USD", label: "USD ($)" },
    { value: "INR", label: "INR (₹)" },
    { value: "EUR", label: "EUR (€)" },
  ];

  return (
    <div
      className="flex items-center gap-1 bg-nocturnal-expedition/30 border border-mystic-mint/10 p-1 rounded-full shadow-sm select-none"
      role="group"
      aria-label="Currency Selector"
    >
      {currencies.map((curr) => (
        <button
          key={curr.value}
          type="button"
          onClick={() => setCurrency(curr.value)}
          className={`px-4 py-2 rounded-full font-technical text-xs font-bold transition-all duration-interactive ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-forsythia cursor-pointer ${
            currency === curr.value
              ? "bg-forsythia text-oceanic-noir shadow-md"
              : "text-mystic-mint hover:text-arctic-powder hover:bg-nocturnal-expedition/20"
          }`}
          aria-pressed={currency === curr.value}
        >
          {curr.label}
        </button>
      ))}
    </div>
  );
}

export default CurrencySelector;
