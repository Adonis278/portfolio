import { identity, resume } from "@/lib/site";
import styles from "./SiteFooter.module.css";

/**
 * Contact lives here, on every page.
 *
 * It used to be a full section competing with the rest of the page: education,
 * seven honours, six certifications and the contact details all in one block.
 * Those moved to /experience, where someone looking for credentials will find
 * them. What is left is the one thing a recruiter needs from any page they
 * happen to land on: how to reach him.
 */
export default function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.shell}>
        <div className={`glass ${styles.top}`}>
          <div>
            <p className={styles.eyebrow}>Get in touch</p>
            <a className={styles.email} href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
            <p className={styles.detail}>{identity.location}</p>
          </div>

          <ul className={styles.links}>
            {identity.links.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.link}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a className={styles.link} href={resume.page}>
                Résumé
              </a>
            </li>
          </ul>
        </div>

        <p className={styles.colophon}>
          {identity.firstName} {identity.lastName}
        </p>
      </div>
    </footer>
  );
}
