import { identity, resume } from "@/lib/site";
import styles from "./Hero.module.css";

/**
 * The editorial masthead.
 *
 * This replaces VideoIntro. The video is not deleted — it is simply no longer
 * the first thing a reviewer meets. A 21MB autoplaying clip cost several
 * seconds before anything legible appeared; the headshot is 169KB and the name
 * is readable on the first paint.
 *
 * Server component on purpose. Nothing here needs client JavaScript, so the
 * whole hero ships as HTML and the entrance animation runs from CSS.
 */

/** Employers, in reverse chronological order. The strongest evidence he has. */
const CREDENTIALS = [
  { name: "Amazon Web Services", year: "2025" },
  { name: "Bank of America", year: "2023" },
  { name: "Ernst & Young", year: "2022" },
];

export default function Hero({ nextSectionId = "work" }) {
  return (
    <header className={styles.hero}>
      <div className={styles.shell}>
        {/* The meta row that used to sit here is gone: with a sticky nav
            directly above, a second horizontal band of small caps made the top
            of the page feel like chrome before any content. */}
        <div className={styles.masthead}>
          <div className={styles.nameBlock}>
            <h1 className={`${styles.name} ${styles.reveal} ${styles.d1}`}>
              <span className={styles.nameLine}>{identity.firstName}</span>
              <span className={`${styles.nameLine} ${styles.nameAccent}`}>
                {identity.lastName}
              </span>
            </h1>

            <div className={`${styles.reveal} ${styles.d2}`}>
              <div className={styles.rule} />
              <p className={styles.role}>{identity.role}</p>
              <p className={styles.subtitle}>{identity.subtitle}</p>

              <div className={styles.actions}>
                <a className={styles.primary} href={resume.page}>
                  View résumé
                </a>
                <a className={styles.secondary} href={`#${nextSectionId}`}>
                  See the work
                </a>
              </div>

              <ul className={styles.links}>
                {identity.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className={styles.link}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`${styles.portraitCol} ${styles.reveal} ${styles.d3}`}>
            {/*
              The cutout has no background, so it is not framed. A soft radial
              pool sits behind it and the figure stands free on the ground —
              a boxed portrait would reintroduce the hard edge the transparent
              PNG exists to remove.

              Plain <img>, not next/image: the site is `output: "export"`, so
              the Image Optimization API is unavailable. Sizes are generated at
              build time instead. WebP because alpha in PNG cost 2.1MB here and
              the same cutout in WebP is 107KB.
            */}
            <div className={styles.glow} aria-hidden="true" />
            <img
              className={styles.cutout}
              src="/img/jerome-cutout-800.webp"
              srcSet="/img/jerome-cutout-480.webp 480w, /img/jerome-cutout-800.webp 800w, /img/jerome-cutout-1254.webp 1254w"
              sizes="(max-width: 60rem) 18rem, 32vw"
              width={800}
              height={800}
              alt="Jerome Adonis"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className={`glass ${styles.strip}`}>
          <span className={styles.stripLabel}>Built at</span>
          {CREDENTIALS.map((item) => (
            <span key={item.name} className={styles.stripItem}>
              {item.name}
              <span className={styles.stripYear}>{item.year}</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
