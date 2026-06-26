"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionOptions extends IntersectionObserverInit {
  /** If true, unobserve once the element enters the viewport (useful for entrance animations) */
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook to track viewport intersection status of a DOM element using the IntersectionObserver API.
 * Safely guarded for SSR contexts.
 *
 * @param options - Standard IntersectionObserver options and additional custom configurations
 * @returns A tuple containing a RefObject and the current intersection boolean status
 */
export function useIntersection<T extends HTMLElement>(
  options: IntersectionOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0, root = null, rootMargin = "0px", freezeOnceVisible = false } = options;
  
  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const matching = entry.isIntersecting;
        setIsIntersecting(matching);

        // Freeze observer if single visibility trigger is specified
        if (matching && freezeOnceVisible) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element && !freezeOnceVisible) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isIntersecting];
}
export default useIntersection;
