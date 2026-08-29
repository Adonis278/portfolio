import styles from "./Page.module.css";

/**
 * Shared page furniture.
 *
 * Every page below the home page opens the same way: a mono eyebrow, a serif
 * title, and at most two lines of introduction. Keeping that in one place is
 * what stops five pages from drifting into five slightly different layouts.
 */

export function PageShell({ children, className = "" }) {
  return <div className={`${styles.shell} ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className={styles.header}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}

export function SectionTitle({ index, children }) {
  return (
    <h2 className={styles.sectionTitle}>
      {index ? <span className={styles.sectionIndex}>{index}</span> : null}
      {children}
    </h2>
  );
}

export { styles as pageStyles };
