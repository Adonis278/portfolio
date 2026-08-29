"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { experience, marquee, pipeline } from "@/lib/site";
import styles from "./Work.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Work({ id = "work" }) {
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

      // One trigger per element rather than a batched timeline: sections here
      // are long, and a single scrub would fire everything at once.
      gsap.utils.toArray(`.${styles.rise}`).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 1.25,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* Seam between the video hero and the page proper. */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <span className={styles.marqueeGroup} key={copy}>
              {marquee.map((item) => (
                <span className={styles.marqueeItem} key={`${copy}-${item}`}>
                  {item}
                  <span className={styles.marqueeDot} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---- experience -------------------------------------------------- */}

      <CollapsibleSection
        id={id}
        eyebrow="Experience"
        title="Production work, not coursework."
      >
        <ol className={styles.timeline}>
          {experience.map((job) => (
            <li className={`${styles.job} ${styles.rise}`} key={job.company}>
              <div className={styles.jobHead}>
                <h3 className={styles.jobCompany}>{job.company}</h3>
                <p className={styles.jobRole}>{job.role}</p>
                <p className={styles.jobMeta}>
                  {job.place} <span aria-hidden="true">·</span> {job.period}
                </p>
              </div>
              <ul className={styles.jobPoints}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </CollapsibleSection>

      {/* ---- how this page was made --------------------------------------
          Closed by default, and its items carry no `.rise` class: a GSAP
          `.from()` inside a closed <details> renders opacity 0 and never
          advances, so the section would open onto nothing. */}

      <CollapsibleSection
        id="pipeline"
        eyebrow="How this page was made"
        title="An AI-to-code cinematic pipeline."
        defaultOpen={false}
      >
        <ol className={styles.pipeline}>
          {pipeline.map((step) => (
            <li className={styles.step} key={step.step}>
              <span className={styles.stepIndex}>{step.step}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </CollapsibleSection>

    </div>
  );
}
