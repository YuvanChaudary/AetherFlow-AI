"use client";

import { useState, useEffect } from "react";

/**
 * Reusable hook to monitor media query conditions reactively using matchMedia.
 * Safely guards against SSR execution environments.
 *
 * @param query - CSS Media query string (default: "(min-width: 920px)")
 * @returns boolean indicating if query is matching
 */
export function useBreakpoint(query = "(min-width: 920px)"): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaList = window.matchMedia(query);
    
    // Set initial alignment state
    setMatches(mediaList.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browser standard event listener binding
    mediaList.addEventListener("change", listener);
    
    return () => {
      mediaList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

export default useBreakpoint;
