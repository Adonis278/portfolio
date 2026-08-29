import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import PdfPreview from "@/components/resume/PdfPreview";
import { credentials, experience, identity, resume } from "@/lib/site";
import styles from "./resume.module.css";

const fullName = `${identity.firstName} ${identity.lastName}`;

export const metadata = {
  title: `Résumé | ${fullName}`,
  description: `Résumé for ${fullName}, ${identity.role}. Updated ${resume.updated}.`,
};

/**
 * Shareable résumé page.
 *
 * The embedded viewer is a convenience, not the delivery mechanism: iOS
 * Safari and most in-app browsers refuse to render a PDF in an iframe, and
 * recruiters forward links from phones. So the download and open-in-new-tab
 * buttons sit above the viewer, and a readable HTML summary sits below it —
 * that summary is what search engines and screen readers actually get.
 */
export default function ResumePage() {
  return (
    <main className={styles.main}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}>
          ← Back to portfolio
        </Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Résumé · Updated {resume.updated}</p>
          <h1 className={styles.title}>{fullName}</h1>
          <p className={styles.role}>{identity.role}</p>

          <div className={styles.actions}>
            <a className={styles.primary} href={resume.file} download={resume.downloadName}>
              Download PDF
            </a>
            <a
              className={styles.secondary}
              href={resume.file}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open in new tab
              <ArrowUpRightIcon width={14} height={14} />
            </a>
            <a className={styles.secondary} href={`mailto:${identity.email}`}>
              Email me
            </a>
          </div>
        </header>

        <PdfPreview file={resume.file} downloadName={resume.downloadName} />

        {/* Text version: indexable, screen-reader friendly, and readable even
            if the PDF never loads. */}
        <section className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title" className={styles.summaryTitle}>
            Summary
          </h2>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Education</h3>
            <p className={styles.blockLead}>{credentials.degree}</p>
            <p className={styles.blockMeta}>
              {credentials.school} · {credentials.detail}
            </p>
            <ul className={styles.tags}>
              {credentials.honors.map((honor) => (
                <li key={honor} className={styles.tag}>
                  {honor}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Experience</h3>
            <ol className={styles.jobs}>
              {experience.map((job) => (
                <li key={job.company} className={styles.job}>
                  <p className={styles.jobCompany}>{job.company}</p>
                  <p className={styles.jobRole}>
                    {job.role} · {job.period}
                  </p>
                  <ul className={styles.points}>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Certifications</h3>
            <ul className={styles.tags}>
              {credentials.certifications.map((cert) => (
                <li key={cert} className={styles.tag}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <a href={`mailto:${identity.email}`}>{identity.email}</a>
              </li>
              <li>{identity.phone}</li>
              <li>{identity.location}</li>
              {identity.links
                .filter((link) => link.href.startsWith("http"))
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
