import styles from "./ProjectRows.module.css";

/**
 * The project list.
 *
 * One row per project: name, year, one sentence, three tags, and the links that
 * actually resolve. That is the whole entry.
 *
 * What deliberately is not here — and was on every card in the old build — is
 * the status badge, the metric grid, the role line, the role-detail line, the
 * nine-item stack list and the three-button action row. Six of those cards side
 * by side is why the page felt like work to read. The measurements still exist
 * on the case studies, one click away, where they are read rather than skimmed.
 */
export default function ProjectRows({ items }) {
  return (
    <ol className={`glass ${styles.list}`}>
      {items.map((item, i) => (
        <li className={styles.row} key={item.key ?? item.name}>
          <div className={styles.head}>
            <span className={styles.index}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.name}>{item.name}</h3>
            <span className={styles.year}>{item.year}</span>
          </div>

          <div className={styles.body}>
            {item.context ? (
              <p className={styles.context}>{item.context}</p>
            ) : null}
            <p className={styles.line}>{item.line}</p>

            {item.tags?.length ? (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li className={styles.tag} key={tag}>
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
                        className={styles.link}
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
      ))}
    </ol>
  );
}
