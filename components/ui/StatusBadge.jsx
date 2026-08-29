import { STATUS } from "@/lib/projects";
import styles from "./StatusBadge.module.css";

/**
 * Maturity label for a project.
 *
 * Every card carries one. Being explicit that something is a concept costs
 * nothing and buys credibility for the projects that really did ship — a
 * reviewer who catches one overstatement discounts the whole page.
 */
export default function StatusBadge({ status, recognition }) {
  const entry = STATUS[status];
  if (!entry) return null;

  return (
    <span className={`${styles.badge} ${styles[entry.tone]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {recognition || entry.label}
    </span>
  );
}
