import CollapsibleSection from "@/components/ui/CollapsibleSection";
import { recognition } from "@/lib/projects";
import { leadership } from "@/lib/site";
import styles from "./Leadership.module.css";

/**
 * Leadership and recognition, merged into one section on purpose. Judged
 * awards and elected roles are the same argument from two directions, and
 * splitting them left two thin sections where one substantial one reads
 * better.
 */
export default function Leadership({ id = "leadership" }) {
  return (
    <CollapsibleSection
      id={id}
      eyebrow="Leadership and recognition"
      title="Judged by other people, trusted by them too."
    >
      <div className={styles.awards}>
        {recognition.map((item) => (
          <div key={item.label} className={styles.award}>
            <span className={styles.awardValue}>{item.value}</span>
            <span className={styles.awardLabel}>{item.label}</span>
            <span className={styles.awardYear}>{item.year}</span>
          </div>
        ))}
      </div>

      <ul className={styles.roles}>
        {leadership.map((item) => (
          <li key={`${item.org}-${item.role}`} className={styles.role}>
            <div className={styles.roleHead}>
              <h3 className={styles.roleTitle}>{item.role}</h3>
              <p className={styles.roleOrg}>{item.org}</p>
            </div>
            <p className={styles.roleBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
