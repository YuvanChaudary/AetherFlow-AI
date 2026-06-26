import { PricingMatrix } from "@/types";

export const PRICING_MATRIX: PricingMatrix = {
  // Flat annual discount multiplier of 20% (1.0 - 0.20 = 0.8)
  annualDiscountMultiplier: 0.8,

  // Regional tariff config and conversion multipliers
  currencies: {
    USD: {
      symbol: "$",
      label: "USD",
      tariffFactor: 1.0,
    },
    INR: {
      symbol: "₹",
      label: "INR",
      tariffFactor: 83.0, // Regional base conversion tariff factor
    },
    EUR: {
      symbol: "€",
      label: "EUR",
      tariffFactor: 0.92, // Euro conversion tariff factor
    },
  },

  // Base tier USD monthly rates and specifications
  tiers: {
    starter: {
      id: "starter",
      name: "Starter",
      baseMonthlyRate: 19.0, // Base USD price
      features: [
        "Up to 5 automated pipelines",
        "10,000 runs/month limit",
        "Community forum support",
        "Basic SEO integration check",
      ],
    },
    pro: {
      id: "pro",
      name: "Professional",
      baseMonthlyRate: 49.0, // Base USD price
      features: [
        "Unlimited active pipelines",
        "250,000 runs/month limit",
        "Priority developer support (email/chat)",
        "Advanced custom analytics dash",
        "Zero-latency multi-region syncs",
      ],
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      baseMonthlyRate: 149.0, // Base USD price
      features: [
        "Custom high-throughput integrations",
        "Unlimited pipelines & runs",
        "24/7 dedicated support representative",
        "Custom SLA and performance uptime audits",
        "Isolated virtual machine hosting options",
      ],
    },
  },
};

/**
 * Calculates dynamic price based on the multi-dimensional matrix.
 * Formula: (Base Monthly Rate * Tariff Factor * Billing Multiplier)
 *
 * @param baseMonthlyRate - Base rate in USD
 * @param tariffFactor - Regional tariff variable
 * @param cycle - 'monthly' | 'annual'
 * @param discount - Discount multiplier
 * @returns Formatted dynamic price string
 */
export function calculateDynamicPrice(
  baseMonthlyRate: number,
  tariffFactor: number,
  cycle: "monthly" | "annual",
  discount: number
): number {
  const baseRateForCycle = cycle === "annual" ? baseMonthlyRate * 12 * discount : baseMonthlyRate;
  const convertedPrice = baseRateForCycle * tariffFactor;
  // Round to nearest integer for clean aesthetic display
  return Math.round(convertedPrice);
}
