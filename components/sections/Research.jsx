import CollapsibleSection from "@/components/ui/CollapsibleSection";
import { research } from "@/lib/site";
import styles from "./Research.module.css";

/**
 * Undergraduate research. Deliberately its own section rather than another
 * row of project cards: this is the only work on the page with a poster and a
 * program behind it, and burying it among shipped products loses that.
 */
export default function Research({ id = "research" }) {
  return (
    <CollapsibleSection
      id={id}
      eyebrow="Research"
      title="Modelling work with a poster behind it."
      intro="Two undergraduate studies, both funded and both presented. Neither has a public repository, so what follows is the record."
    >
      <ol className={styles.list}>
        {research.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.head}>
              <div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.kicker}>{item.kicker}</p>
              </div>
              {item.award && <span className={styles.award}>{item.award}</span>}
            </div>

            <dl className={styles.meta}>
              <div>
                <dt>Program</dt>
                <dd>{item.program}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{item.year}</dd>
              </div>
            </dl>

            <p className={styles.body}>{item.body}</p>

            <ul className={styles.stack}>
              {item.stack.map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>

            <p className={styles.outputs}>
              <span className={styles.outputsLabel}>Output</span>
              {item.outputs.join(", ")}
              {item.note ? `. ${item.note}` : ""}
            </p>
          </li>
        ))}
      </ol>
    </CollapsibleSection>
  );
}
