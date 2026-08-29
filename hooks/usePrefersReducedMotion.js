"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's reduced-motion preference.
 *
 * Resolved synchronously on the client rather than in an effect: consumers
 * branch on this while building a GSAP timeline and a WebGL scene, so a
 * false-then-true flip would tear both down and rebuild them one frame in —
 * visible as an entrance animation that starts and then snaps. Reading it
 * during render is hydration-safe because no markup depends on it.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const onChange = (event) => setReduced(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
