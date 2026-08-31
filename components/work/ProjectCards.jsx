import styles from "./ProjectCards.module.css";

/**
 * Project cards.
 *
 * No longer a client component. The glass build tracked the pointer across
 * each card to move a specular highlight, which needed `useRef`, two event
 * handlers and `"use client"` on the whole tree. This system has no
 * translucency for a highlight to play on, so all of that came out and the
 * cards ship as plain HTML — the hover lift is pure CSS.
 *
 * What each card carries: its artwork on a coloured mat, a counter, the name,
 * one sentence, three tags, and up to three links.
 */
export default function ProjectCards({ items }) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => {
        const primary = item.links?.[0];
        return (
          <li
            className={`panel ${styles.card}`}
            key={item.key ?? item.name}
          >
            <div className={`panel ${styles.frame}`}>
              {item.image ? (
                <img
                  className={styles.shot}
                  src={item.image}
                  width={960}
                  height={600}
                  alt={`${item.name} artwork`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              ) : (
                /* Fallback for a project added without artwork. Uses the
                   card's own accent rather than a hardcoded tint. */
                <div className={styles.tile}>
                  <span className={styles.tileMark}>{item.name.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className={styles.body}>
              <div className={styles.head}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.name}>
                  {primary ? (
                    <a
                      className={styles.nameLink}
                      href={primary.href}
                      target={
                        primary.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        primary.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                    >
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <span className={styles.year}>{item.year}</span>
              </div>

              {item.context ? (
                <p className={styles.context}>{item.context}</p>
              ) : null}
              <p className={styles.line}>{item.line}</p>

              {item.tags?.length ? (
                <ul className={styles.tags}>
                  {item.tags.map((tag) => (
                    <li className={`panel ${styles.tag}`} key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.links?.length ? (
                <ul className={styles.links}>
                  {item.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.href}>
                        <a
                          className={`panel ${styles.link}`}
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer noopener" : undefined}
                        >
                          {link.label}
                          {external ? <span aria-hidden="true"> ↗</span> : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
