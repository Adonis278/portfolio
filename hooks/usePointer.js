"use client";

import { useEffect, useRef } from "react";

/**
 * Normalized pointer position (-1..1 on both axes) written into a ref.
 *
 * Deliberately ref-based: the hero, the Three.js camera and the parallax
 * layers all read this every frame, and routing it through state would
 * re-render the whole tree on every mouse move.
 */
export function usePointer({ enabled = true } = {}) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;

    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return pointer;
}
