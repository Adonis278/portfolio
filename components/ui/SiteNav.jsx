"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActivePath } from "@/lib/nav";
import { GitHubMark, LinkedInMark } from "@/components/ui/Doodles";
import { identity, resume } from "@/lib/site";
import styles from "./SiteNav.module.css";

/**
 * Top navigation.
 *
 * Replaces SectionNav, which scroll-spied anchors inside one very long page.
 * These are real routes, so the browser back button works, each page can be
 * linked directly on an application, and the tab you are on is unambiguous.
 *
 * Client component only because it needs the current path to mark the active
 * tab. Everything it renders is otherwise static.
 *
 * The two social marks sit next to the résumé button rather than in the tab
 * row: they leave the site, and mixing outbound links into a row of internal
 * pages makes the row stop meaning "pages of this site". Both are pulled from
 * `identity.links` so the URLs live in one place.
 */

/** Icon for each outbound profile, keyed by the label in lib/site.js */
const SOCIAL_MARKS = {
  GitHub: GitHubMark,
  LinkedIn: LinkedInMark,
};

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className={styles.bar}>
      <nav className={styles.inner} aria-label="Primary">
        <Link href="/" className={styles.wordmark}>
          {identity.firstName} {identity.lastName}
        </Link>

        <ul className={styles.list}>
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.social}>
          {identity.links
            .filter((link) => SOCIAL_MARKS[link.label])
            .map((link) => {
              const Mark = SOCIAL_MARKS[link.label];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${link.label} profile, opens in a new tab`}
                >
                  <Mark className={styles.socialIcon} />
                </a>
              );
            })}
        </div>

        <Link href={resume.page} className={styles.cta}>
          Résumé
        </Link>
      </nav>
    </header>
  );
}
