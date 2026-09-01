import { identity, resume } from "@/lib/site";
import {
  Star,
  Squiggle,
  Spark,
  Arrow,
  Bolt,
  Loop,
  CodeIcon,
  CloudIcon,
  AgentIcon,
  TerminalIcon,
} from "@/components/ui/Doodles";
import styles from "./Hero.module.css";

/**
 * The hero.
 *
 * Both references build the same thing: a portrait with decoration orbiting
 * it. The decoration is doing real work — it fills the space a cut-out
 * portrait leaves around itself, and it lets the page say what he does without
 * spending another paragraph saying it.
 *
 * Two layers around the photo:
 *   - four icon stickers, each naming one thing he builds (agents, cloud,
 *     code, shipping). These mean something.
 *   - loose marks (star, bolt, loop, arrow, spark) that mean nothing and are
 *     there purely for energy, which is rule 5 of the decomposition.
 *
 * All of it is aria-hidden, and the loose marks sit behind the portrait in the
 * stacking order so nothing can intercept a click or get read aloud between
 * his name and his job title.
 *
 * Server component: nothing here needs client JavaScript.
 */

const CREDENTIALS = [
  { name: "Amazon Web Services", year: "2025" },
  { name: "Bank of America", year: "2023" },
  { name: "Ernst & Young", year: "2022" },
];

/** The four icon stickers, with the colour and corner each one takes. */
const ORBIT = [
  { key: "agent", Icon: AgentIcon, label: "Agents", tone: "blue", seat: "tl" },
  { key: "cloud", Icon: CloudIcon, label: "Cloud", tone: "yellow", seat: "tr" },
  { key: "code", Icon: CodeIcon, label: "Backend", tone: "coral", seat: "bl" },
  { key: "ship", Icon: TerminalIcon, label: "Ship", tone: "mint", seat: "br" },
];

export default function Hero({ nextSectionId = "featured" }) {
  return (
    <header className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.masthead}>
          <div className={styles.copy}>
            <p className={`panel ${styles.eyebrow}`}>
              <Spark className={styles.eyebrowIcon} aria-hidden="true" />
              Hi, I&rsquo;m Jerome
            </p>

            <h1 className={styles.name}>
              <span className={styles.nameLine}>I build systems</span>
              <span className={styles.nameLine}>
                that{" "}
                <span className={styles.nameAccent}>
                  ship
                  <Squiggle className={styles.underline} aria-hidden="true" />
                </span>
              </span>
            </h1>

            <p className={styles.role}>{identity.role}</p>
            <p className={styles.subtitle}>{identity.subtitle}</p>

            <div className={styles.actions}>
              <a
                className={`panel panelHover ${styles.primary}`}
                href={`#${nextSectionId}`}
              >
                See the work
              </a>
              <a
                className={`panel panelHover ${styles.secondary}`}
                href={resume.page}
              >
                Résumé
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

          <div className={styles.portraitCol}>
            {/* Loose marks — behind the portrait, purely decorative. */}
            <div className={styles.marks} aria-hidden="true">
              <Star className={`${styles.mark} ${styles.markStar}`} />
              <Bolt className={`${styles.mark} ${styles.markBolt}`} />
              <Loop className={`${styles.mark} ${styles.markLoop}`} />
              <Arrow className={`${styles.mark} ${styles.markArrow}`} />
              <Spark className={`${styles.mark} ${styles.markSpark}`} />
            </div>

            {/* The colour block the cut-out stands on. Rule 3. */}
            <div className={styles.blob} aria-hidden="true" />

            {/*
              Plain <img>, not next/image: the site is `output: "export"`, so
              the Image Optimization API is unavailable and sizes are generated
              at build time instead. WebP because alpha in PNG cost 2.1MB and
              the same cutout in WebP is 107KB.
            */}
            <img
              className={styles.cutout}
              src="/img/jerome-cutout-800.webp"
              srcSet="/img/jerome-cutout-480.webp 480w, /img/jerome-cutout-800.webp 800w, /img/jerome-cutout-1254.webp 1254w"
              sizes="(max-width: 60rem) 20rem, 34vw"
              width={800}
              height={800}
              alt="Jerome Adonis"
              fetchPriority="high"
              decoding="async"
            />

            {/* Icon stickers — these name real things, so they sit in front. */}
            <ul className={styles.orbit} aria-hidden="true">
              {ORBIT.map(({ key, Icon, label, tone, seat }) => (
                <li
                  className={`panel ${styles.chip}`}
                  data-chip={tone}
                  data-seat={seat}
                  key={key}
                >
                  <Icon className={styles.chipIcon} />
                  <span className={styles.chipLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`panel ${styles.strip}`}>
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
