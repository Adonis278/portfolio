import { PageHeader, pageStyles } from "@/components/ui/Page";
import { research } from "@/lib/site";
import styles from "./research.module.css";

export const metadata = {
  title: "Research | Jerome Adonis",
  description:
    "Undergraduate research: an adaptive neuro-fuzzy inference system for equity forecasting, and a study on pandemic and natural disaster data.",
};

/**
 * Research gets its own tab because it answers a question the project list
 * cannot: whether he can hold a method steady long enough to test something and
 * report what came back.
 *
 * Note what is still absent: accuracy figures. Neither study's poster has been
 * recovered, and a number invented here is the first thing an interviewer would
 * probe. The methodology is the claim; the metrics stay out until the source
 * documents are in hand.
 */
export default function ResearchPage() {
  return (
    <main className={pageStyles.shell}>
      <PageHeader
        eyebrow="Research"
        title="Two studies, both presented."
        intro="Undergraduate work, both funded. Neither has a public repository, so what follows is the record of what was built and how it was tested."
      />

      <div className={styles.grid}>
        {research.map((item) => (
          <article className={`glass ${styles.study}`} key={item.id}>
            {item.award ? (
              <span className={styles.award}>{item.award}</span>
            ) : null}
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.kicker}>{item.kicker}</p>

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
              {item.stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>

            {item.outputs?.length ? (
              <p className={styles.outputs}>
                <span className={styles.outputsLabel}>Output</span>
                {item.outputs.join(", ")}
                {item.note ? `. ${item.note}` : null}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
