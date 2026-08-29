import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { credentials, identity, resume } from "@/lib/site";
import styles from "./Work.module.css";

/**
 * Credentials and contact. Split out of Work so it can stay last on the page
 * while Leadership renders above it. Not collapsible: a contact block that
 * can be folded away is a contact block nobody uses.
 */
export default function Contact({ id = "contact" }) {
  return (
    <footer id={id} className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.eyebrow}>Education</p>
            <h3 className={styles.degree}>{credentials.degree}</h3>
            <p className={styles.school}>{credentials.school}</p>
            <p className={styles.detail}>{credentials.detail}</p>

            <ul className={styles.tagList}>
              {credentials.honors.map((honor) => (
                <li className={styles.tag} key={honor}>
                  {honor}
                </li>
              ))}
            </ul>

            <p className={styles.eyebrowTight}>Certifications</p>
            <ul className={styles.tagList}>
              {credentials.certifications.map((cert) => (
                <li className={styles.tag} key={cert}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact}>
            <p className={styles.eyebrow}>Get in touch</p>
            <a className={styles.contactLink} href={`mailto:${identity.email}`}>
              {identity.email}
              <ArrowUpRightIcon width={22} height={22} />
            </a>
            <p className={styles.detail}>{identity.phone}</p>
            <p className={styles.detail}>{identity.location}</p>

            <ul className={styles.footerLinks}>
              <li>
                <a href={resume.page}>Résumé</a>
              </li>
              {identity.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.colophon}>
          © {new Date().getFullYear()} {identity.firstName} {identity.lastName} · Built with
          Next.js, Three.js and GSAP
        </p>
      </div>
    </footer>
  );
}
