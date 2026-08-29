"use client";

import { useEffect } from "react";

/**
 * Registers the media service worker. Renders nothing.
 *
 * Production only: a service worker sitting in front of `next dev` confuses
 * Fast Refresh, and there is nothing to cache locally anyway.
 *
 * Registration is deferred to the load event. The worker's install step
 * downloads the 2.3 MB hero video, and doing that while the page is still
 * fetching its own copy of the same file would put the two in competition on
 * a first visit — the visit where the hero most needs the bandwidth.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return undefined;
    if (!("serviceWorker" in navigator)) return undefined;

    let cancelled = false;

    const register = () => {
      if (cancelled) return;
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Caching is an optimisation; registration failing (private mode,
        // blocked storage, an unsupported browser) must stay invisible.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}
