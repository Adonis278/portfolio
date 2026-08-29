"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server.
 *
 * GSAP setup has to run before the browser paints. With a plain useEffect the
 * server-rendered copy paints at full opacity for one frame, then the `.from()`
 * tweens snap it to opacity 0 — a visible flash on every load. useLayoutEffect
 * closes that gap; the isomorphic wrapper keeps React from warning during SSR.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
