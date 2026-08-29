"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CollapsibleSection.module.css";

/**
 * A page section that can be folded away.
 *
 * Built on native <details>/<summary> rather than a custom disclosure widget,
 * which buys three things for free: keyboard and screen-reader support, a
 * working control before JavaScript loads, and content that stays in the DOM
 * while collapsed so search engines still index it.
 *
 * Sections that start collapsed must not run entrance animations. A GSAP
 * `.from()` on an element inside a closed <details> renders its start state
 * (opacity 0) and then never advances, because ScrollTrigger cannot see a
 * display:none element to fire on. The section would open onto blank space.
 * `animated={false}` is how a caller opts out.
 */
export default function CollapsibleSection({
  id,
  eyebrow,
  title,
  intro,
  defaultOpen = true,
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Collapsing changes the height of everything below it, so every
    // ScrollTrigger start/end position downstream is now wrong.
    const onToggle = () => ScrollTrigger.refresh();

    // A link to a collapsed section would otherwise scroll to a closed header.
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) el.open = true;
    };

    openIfTargeted();
    el.addEventListener("toggle", onToggle);
    window.addEventListener("hashchange", openIfTargeted);

    return () => {
      el.removeEventListener("toggle", onToggle);
      window.removeEventListener("hashchange", openIfTargeted);
    };
  }, [id]);

  return (
    <details ref={ref} id={id} className={styles.section} open={defaultOpen}>
      <summary className={styles.summary}>
        <div className={styles.summaryText}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <span className={styles.toggle} aria-hidden="true">
          <span className={styles.toggleLabel}>
            <span className={styles.whenOpen}>Hide</span>
            <span className={styles.whenClosed}>Show</span>
          </span>
          <svg
            className={styles.chevron}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>

      <div className={styles.body}>
        {intro && <p className={styles.intro}>{intro}</p>}
        {children}
      </div>
    </details>
  );
}
