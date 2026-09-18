import ProjectCards from "@/components/work/ProjectCards";
import { PageHeader, SectionTitle, pageStyles } from "@/components/ui/Page";
import { featuredWork, otherWork } from "@/lib/featured";
import { STATUS } from "@/lib/projects";
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

      <ProjectCards items={featuredWork} />

      <section className={pageStyles.block}>
        <SectionTitle index="02">Also built</SectionTitle>
        {/*
          Sticker tiles, in the same system as the six cards above: outline,
          hard shadow, a colour that cycles so no two neighbours match. The
          counter continues from the featured six, so the page reads as one
          numbered body of work rather than a headline and an appendix.
        */}
        <ul className={styles.grid}>
          {otherWork.map((item, i) => {
            const status = STATUS[item.status];
            const links = [
              ...(item.href ? [{ label: "Case study", href: item.href }] : []),
              ...(item.links ?? []),
            ];
            return (
              <li className={`panel ${styles.tile}`} key={item.name}>
                <div className={styles.tileHead}>
                  <span className={styles.count}>
                    {String(featuredWork.length + i + 1).padStart(2, "0")}
                  </span>
                  {status ? (
                    <span className={styles.status}>{status.label}</span>
                  ) : null}
                </div>

                <h3 className={styles.name}>{item.name}</h3>
                {item.note ? <p className={styles.note}>{item.note}</p> : null}

                {links.length ? (
                  <ul className={styles.links}>
                    {links.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <li key={link.href + link.label}>
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
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
