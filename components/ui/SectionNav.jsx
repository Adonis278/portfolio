"use client";

import { useEffect, useState } from "react";
import { resume } from "@/lib/site";
import styles from "./SectionNav.module.css";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

/**
 * Sticky section rail with scroll spy.
 *
 * Sits directly after the hero, so it only pins once the video has scrolled
 * away and never competes with it. The active link is driven by scroll
 * position rather than the URL hash, because a visitor who scrolls past a
 * section should see the rail follow them without the address bar churning.
 */
export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (targets.length === 0) return undefined;

    // A band across the upper third: whichever section occupies it wins. A
    // plain "is it visible" test lights up two links at once on tall sections.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Sections">
      <div className={styles.inner}>
        <ul className={styles.list}>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`${styles.link} ${active === section.id ? styles.active : ""}`}
                aria-current={active === section.id ? "true" : undefined}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <a className={styles.cta} href={resume.page}>
          Résumé
        </a>
      </div>
    </nav>
  );
}
