import { PageHeader, SectionTitle, pageStyles } from "@/components/ui/Page";
import { experience, leadership, credentials } from "@/lib/site";
import { recognition } from "@/lib/projects";
import styles from "./experience.module.css";

export const metadata = {
  title: "Experience | Jerome Adonis",
  description:
    "Engineering internships at Amazon Web Services, Bank of America and Ernst & Young, plus leadership, education and certifications.",
};

/**
 * Everything a recruiter checks after the work: who employed him, what he was
 * trusted to run, and what the credentials are.
 *
 * These were three separate sections on the old single page, each with its own
 * heading and its own scroll. Grouping them costs nothing — they are read
 * together or not at all — and it removes two full sections from the home page.
 */
export default function ExperiencePage() {
  return (
    <main className={pageStyles.shell}>
      <PageHeader
        eyebrow="Experience"
        title="Production work, not coursework."
        intro="Three summers of shipping software inside large engineering organisations, and the roles I run outside them."
      />

      <ol className={`glass ${styles.jobs}`}>
        {experience.map((job) => (
          <li className={styles.job} key={job.company}>
            <div>
              <h2 className={styles.company}>{job.company}</h2>
              <p className={styles.role}>{job.role}</p>
              <p className={styles.meta}>
                {job.place} · {job.period}
              </p>
            </div>
            <ul className={styles.points}>
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <section className={pageStyles.block}>
        <SectionTitle index="02">Recognition</SectionTitle>
        <ul className={styles.awards}>
          {recognition.map((item) => (
            <li className={`glass ${styles.award}`} key={item.label}>
              <span className={styles.awardValue}>{item.value}</span>
              <span className={styles.awardLabel}>{item.label}</span>
              <span className={styles.awardYear}>{item.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={pageStyles.block}>
        <SectionTitle index="03">Leadership</SectionTitle>
        <ul className={`glass ${styles.leadership}`}>
          {leadership.map((item) => (
            <li className={styles.lead} key={item.org}>
              <div>
                <h3 className={styles.leadRole}>{item.role}</h3>
                <p className={styles.leadOrg}>{item.org}</p>
              </div>
              <p className={styles.leadBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={pageStyles.block}>
        <SectionTitle index="04">Education and certifications</SectionTitle>
        <div className={styles.credentials}>
          <div>
            <h3 className={styles.degree}>{credentials.degree}</h3>
            <p className={styles.school}>{credentials.school}</p>
            <p className={styles.detail}>{credentials.detail}</p>
            <ul className={styles.chips}>
              {credentials.honors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.chipsLabel}>Certifications</p>
            <ul className={styles.chips}>
              {credentials.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
