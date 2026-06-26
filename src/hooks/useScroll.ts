"use client";

import { useState, useEffect } from "react";

/**
 * Reusable hook to monitor window vertical scroll position relative to a threshold.
 * Runs passively to maintain high scrolling performance.
 *
 * @param threshold - The vertical scroll distance in pixels to trigger threshold toggle
 * @returns boolean indicating if window has scrolled past the threshold
 */
export function useScroll(threshold = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled(scrolled);
    };

    // Attach passive listener for scroll event
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
export default useScroll;
