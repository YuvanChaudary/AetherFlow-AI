export type BillingCycle = "monthly" | "annual";

export type Currency = "INR" | "USD" | "EUR";

export interface CurrencyConfig {
  symbol: string;
  label: string;
  tariffFactor: number; // Regional tariff variable
}

export interface PricingTierData {
  id: string;
  name: string;
  baseMonthlyRate: number; // Base rate in USD
  features: string[];
}

export interface PricingMatrix {
  tiers: Record<string, PricingTierData>;
  currencies: Record<Currency, CurrencyConfig>;
  annualDiscountMultiplier: number; // e.g. 0.8 for 20% discount
}

export interface BentoItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  metric?: string;
}
