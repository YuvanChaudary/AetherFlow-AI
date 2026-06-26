"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Currency, BillingCycle } from "@/types";
import { PRICING_MATRIX, calculateDynamicPrice } from "@/config/pricingMatrix";

// ── DOM Pricing Registry Class ──────────────────────────────────────────────
class DOMPriceRegistry {
  private priceElements: Record<string, HTMLSpanElement> = {};
  private labelElements: Record<string, HTMLSpanElement> = {};
  private currency: Currency = "USD";
  private billingCycle: BillingCycle = "monthly";
  private listeners = new Set<() => void>();

  // Subscribe callback for component synchronization (toggles active outline UI)
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): string => {
    return `${this.currency}:${this.billingCycle}`;
  };

  register(tierId: string, priceEl: HTMLSpanElement, labelEl: HTMLSpanElement): void {
    this.priceElements[tierId] = priceEl;
    this.labelElements[tierId] = labelEl;
    // Align price nodes immediately upon registration
    this.updateNode(tierId);
  }

  unregister(tierId: string): void {
    delete this.priceElements[tierId];
    delete this.labelElements[tierId];
  }

  setCurrency(curr: Currency): void {
    if (this.currency !== curr) {
      this.currency = curr;
      this.persist();
      this.updateAll();
      this.notify();
    }
  }

  setCycle(cycle: BillingCycle): void {
    if (this.billingCycle !== cycle) {
      this.billingCycle = cycle;
      this.persist();
      this.updateAll();
      this.notify();
    }
  }

  getCurrency(): Currency {
    return this.currency;
  }

  getCycle(): BillingCycle {
    return this.billingCycle;
  }

  /**
   * Restores cached pricing configurations from localStorage.
   * Runs only post-hydration on client components to protect Next.js rendering boundaries.
   */
  restore(): void {
    if (typeof window === "undefined") return;
    try {
      const savedCurrency = localStorage.getItem("pricing_pref_currency") as Currency;
      const savedCycle = localStorage.getItem("pricing_pref_cycle") as BillingCycle;

      let hasChanges = false;
      if (savedCurrency && ["INR", "USD", "EUR"].includes(savedCurrency)) {
        this.currency = savedCurrency;
        hasChanges = true;
      }
      if (savedCycle && ["monthly", "annual"].includes(savedCycle)) {
        this.billingCycle = savedCycle;
        hasChanges = true;
      }

      if (hasChanges) {
        this.updateAll();
        this.notify();
      }
    } catch {
      // Fail-silent
    }
  }

  private persist(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("pricing_pref_currency", this.currency);
      localStorage.setItem("pricing_pref_cycle", this.billingCycle);
    } catch {
      // Fail-silent
    }
  }

  private updateAll(): void {
    Object.keys(this.priceElements).forEach((tierId) => {
      this.updateNode(tierId);
    });
  }

  private updateNode(tierId: string): void {
    const priceEl = this.priceElements[tierId];
    const labelEl = this.labelElements[tierId];
    if (!priceEl || !labelEl) return;

    const tier = PRICING_MATRIX.tiers[tierId];
    const currencyConfig = PRICING_MATRIX.currencies[this.currency];
    if (!tier || !currencyConfig) return;

    const computedPrice = calculateDynamicPrice(
      tier.baseMonthlyRate,
      currencyConfig.tariffFactor,
      this.billingCycle,
      PRICING_MATRIX.annualDiscountMultiplier
    );

    const cycleLabel = this.billingCycle === "annual" ? "/yr" : "/mo";
    const formattedPrice = `${currencyConfig.symbol}${computedPrice.toLocaleString()}`;

    // Direct DOM text manipulation bypasses React rendering entirely
    priceEl.innerText = formattedPrice;
    labelEl.innerText = cycleLabel;
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// Singleton registry coordinator
export const domPriceRegistry = new DOMPriceRegistry();

/**
 * Custom hook to register component refs with the DOM registry.
 * Re-registers on tier updates.
 */
export function usePricingCardRefs(tierId: string) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const priceEl = priceRef.current;
    const labelEl = labelRef.current;
    if (priceEl && labelEl) {
      domPriceRegistry.register(tierId, priceEl, labelEl);
    }
    return () => {
      domPriceRegistry.unregister(tierId);
    };
  }, [tierId]);

  return { priceRef, labelRef };
}

/**
 * Custom hook for control selectors to watch and set active pricing parameters.
 * Toggles active element layouts reactively.
 */
export function usePricingControls() {
  const stateStr = useSyncExternalStore(
    domPriceRegistry.subscribe,
    domPriceRegistry.getSnapshot,
    () => "USD:monthly" // Default fallback for server prerender
  );

  const [currency, billingCycle] = stateStr.split(":") as [Currency, BillingCycle];

  // Trigger cache restoration once post-hydration
  useEffect(() => {
    domPriceRegistry.restore();
  }, []);

  return {
    currency,
    billingCycle,
    setCurrency: (c: Currency) => domPriceRegistry.setCurrency(c),
    setCycle: (b: BillingCycle) => domPriceRegistry.setCycle(b),
  };
}
