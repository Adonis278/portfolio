"use client";

import { useEffect } from "react";
import { firebaseApp } from "@/lib/firebase";

/**
 * Initialises Firebase Analytics in the browser. Renders nothing.
 *
 * Analytics is loaded with a dynamic import inside an effect for three
 * reasons: getAnalytics touches `window` and would break the static export at
 * build time, isSupported() has to gate environments where measurement is
 * unavailable (no cookies, some in-app browsers, older Safari), and keeping
 * the ~40kB module out of the entry chunk means it never delays the hero.
 */
/** Hosts whose traffic should never reach the Analytics property. */
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1", ""]);

const isLocalHost = () => {
  const { hostname } = window.location;
  return LOCAL_HOSTS.has(hostname) || hostname.endsWith(".local");
};

export default function FirebaseAnalytics() {
  useEffect(() => {
    // NODE_ENV alone is not enough: a production bundle previewed locally
    // still reports as "production" and would pollute the property, so the
    // host is checked at runtime too.
    if (process.env.NODE_ENV !== "production" || isLocalHost()) return;

    let cancelled = false;

    import("firebase/analytics")
      .then(async ({ getAnalytics, isSupported }) => {
        if (cancelled || !(await isSupported())) return;
        getAnalytics(firebaseApp);
      })
      .catch(() => {
        // Measurement is non-essential; a blocked or failed load must never
        // surface to the visitor.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
