"use client";

import { useEffect } from "react";

/**
 * High-performance, zero-dependency entrance orchestrator utilizing the
 * native Web Animations API (WAAPI) for hardware-accelerated layout transitions.
 * Ensures the entire page-load entrance timeline remains within the strict 500ms cap.
 *
 * @param selector - DOM selector string targeting nodes to orchestrate
 * @param delayStaggerMs - Delay increment between successive elements in ms
 */
export function useEntranceOrchestrator(selector: string, delayStaggerMs = 40): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Run when the main document is ready
    const triggerAnimations = () => {
      const elements = document.querySelectorAll(selector);
      const elementsArray = Array.from(elements) as HTMLElement[];

      elementsArray.forEach((el, index) => {
        // Enforce initial styling state to prevent flash of unstyled content (FOUC)
        el.style.opacity = "0";
        el.style.transform = "translateY(12px)";

        // Compute localized delay ensuring we never exceed a 200ms start threshold
        // Total duration per element = 300ms. Max total timeline = 200ms (delay) + 300ms (duration) = 500ms.
        const calculatedDelay = Math.min(index * delayStaggerMs, 200);

        el.animate(
          [
            { opacity: "0", transform: "translateY(12px)" },
            { opacity: "1", transform: "translateY(0)" },
          ],
          {
            duration: 300, // 300ms ease-out layout reflow curve
            delay: calculatedDelay,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)", // ease-out
            fill: "both",
          }
        );
      });
    };

    // If DOM is already parsed, run immediately, otherwise wait for load
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // Small timeout to allow the browser to paint initial layout frames
      const frameId = requestAnimationFrame(() => {
        setTimeout(triggerAnimations, 20);
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      window.addEventListener("DOMContentLoaded", triggerAnimations);
      return () => window.removeEventListener("DOMContentLoaded", triggerAnimations);
    }
  }, [selector, delayStaggerMs]);
}
