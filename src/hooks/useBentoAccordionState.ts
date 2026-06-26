"use client";

import { useSyncExternalStore } from "react";

class BentoAccordionStore {
  private activeIndex: number | null = null;
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): string => {
    return String(this.activeIndex);
  };

  getActiveIndex = (): number | null => {
    return this.activeIndex;
  };

  setActiveIndex = (index: number | null): void => {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      this.notify();
    }
  };

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// Singleton store instance
export const bentoAccordionStore = new BentoAccordionStore();

/**
 * Hook to share and update the active index context between Bento (desktop)
 * and Accordion (mobile) layouts without triggering parent-level page updates.
 */
export function useBentoAccordionState() {
  const activeIndexStr = useSyncExternalStore(
    bentoAccordionStore.subscribe,
    bentoAccordionStore.getSnapshot,
    () => "null"
  );

  const activeIndex = activeIndexStr === "null" ? null : Number(activeIndexStr);

  return {
    activeIndex,
    setActiveIndex: bentoAccordionStore.setActiveIndex,
  };
}
