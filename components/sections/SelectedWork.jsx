"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import StatusBadge from "@/components/ui/StatusBadge";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { flagships, moreWork } from "@/lib/projects";
import styles from "./SelectedWork.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Stops a card's link click from also triggering the card-wide navigation. */
const stop = (event) => event.stopPropagation();

function ProjectCard({ project }) {
  const {
    slug,
    name,
    kicker,
    category,
    year,
    status,
    recognition,
    role,
    roleDetail,
    summary,
    stack,
    results,
    links,
  } = project;

  const measured = results?.filter((r) => r.kind === "measured") ?? [];
  const projected = results?.filter((r) => r.kind === "projected") ?? [];

  return (
    <article className={`${styles.card} ${styles.rise}`}>
      <div className={styles.cardHead}>
        <StatusBadge status={status} recognition={recognition} />
        <span className={styles.year}>{year}</span>
      </div>

      {/* Role sits above the title so the same two words land on every card —
          the repetition is the point: it reads as a pattern, not a one-off. */}
      {role && (
        <p className={styles.role}>
          <span className={styles.roleMark} aria-hidden="true" />
          {role}
        </p>
      )}

      <h3 className={styles.cardTitle}>
        <Link href={`/work/${slug}`} className={styles.cardLink}>
          {name}
          <span className={styles.cardKicker}>{kicker}</span>
        </Link>
      </h3>

      <p className={styles.category}>{category}</p>
      {roleDetail && <p className={styles.roleDetail}>{roleDetail}</p>}
      <p className={styles.summary}>{summary}</p>

      {(measured.length > 0 || projected.length > 0) && (
        <ul className={styles.results}>
          {measured.map((r) => (
            <li key={r.label} className={styles.result}>
              <span className={styles.resultValue}>{r.value}</span>
              <span className={styles.resultLabel}>{r.label}</span>
            </li>
          ))}
          {/* Projections are shown but never dressed up as outcomes. */}
          {projected.map((r) => (
            <li key={r.label} className={`${styles.result} ${styles.projected}`}>
              <span className={styles.resultValue}>{r.value}</span>
              <span className={styles.resultLabel}>
                {r.label}
                <span className={styles.projectedTag}>projected</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <ul className={styles.stack}>
        {stack.slice(0, 6).map((item) => (
          <li key={item} className={styles.chip}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Link href={`/work/${slug}`} className={styles.primaryAction}>
          View Case Study
          <ArrowUpRightIcon width={15} height={15} />
        </Link>

        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            onClick={stop}
            className={link.kind === "primary" ? styles.liveAction : styles.secondaryAction}
          >
            {link.label}
            <ArrowUpRightIcon width={14} height={14} />
          </a>
        ))}
      </div>
    </article>
  );
}

export default function SelectedWork({ id = "work" }) {
  const rootRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(`.${styles.rise}`, { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray(`.${styles.rise}`).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef}>
      <CollapsibleSection
        id={id}
        eyebrow="Selected work"
        title="Six projects that show the range."
        intro="Every project below carries an honest status label: deployed, prototype, or design. Where the code is public or the product is live, the link is right there. Where it is not, the case study carries the evidence instead."
      >
        <div className={styles.grid}>
          {flagships.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </CollapsibleSection>

      {/* Closed by default. Its items carry no `.rise` class on purpose: a
          GSAP `.from()` inside a closed <details> paints opacity 0 and never
          advances, so opening the section would reveal nothing. */}
      <CollapsibleSection
        id="lab"
        eyebrow="More work"
        title="Product lab"
        defaultOpen={false}
      >
        <ul className={styles.moreGrid}>
          {moreWork.map((item) => (
            <li key={item.name} className={styles.moreItem}>
              <div className={styles.moreHead}>
                <h3 className={styles.moreName}>{item.name}</h3>
                <StatusBadge status={item.status} />
              </div>
              <p className={styles.moreBlurb}>{item.blurb}</p>
              {item.links.length > 0 && (
                <div className={styles.moreLinks}>
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.moreLink}
                    >
                      {link.label}
                      <ArrowUpRightIcon width={13} height={13} />
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </div>
  );
}
