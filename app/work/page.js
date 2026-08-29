import ProjectRows from "@/components/work/ProjectRows";
import { PageHeader, SectionTitle, pageStyles } from "@/components/ui/Page";
import { featuredWork, otherWork } from "@/lib/featured";
import styles from "./work-index.module.css";

export const metadata = {
  title: "Work | Jerome Adonis",
  description:
    "Selected engineering work: multi-agent AI on AWS, shipped AI products, and competition-winning builds.",
};

/**
 * The work index.
 *
 * Two tiers, and the split is the point. The six above are the ones worth a
 * reviewer's attention for an AI or software engineering role. The rest are
 * listed by name and a single line, because a portfolio that presents twenty-two
 * projects as equals is really presenting none of them.
 */
export default function WorkPage() {
  return (
    <main className={pageStyles.shell}>
      <PageHeader
        eyebrow="Work"
        title="Six that matter, and the rest."
        intro="Every project below is real. These six are the ones that show the most about how I build agentic systems and ship software, so they are the ones with the detail."
      />

      <ProjectRows items={featuredWork} />

      <section className={pageStyles.block}>
        <SectionTitle index="02">Also built</SectionTitle>
        <ul className={`glass ${styles.list}`}>
          {otherWork.map((item) => (
            <li className={styles.item} key={item.name}>
              <span className={styles.name}>{item.name}</span>
              {item.note ? (
                <span className={styles.note}>{item.note}</span>
              ) : null}
              {item.links?.length || item.href ? (
                <span className={styles.links}>
                  {item.href ? (
                    <a className={styles.link} href={item.href}>
                      Case study
                    </a>
                  ) : null}
                  {item.links.map((link) => (
                    <a
                      className={styles.link}
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.label}
                    </a>
                  ))}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
