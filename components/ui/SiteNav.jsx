"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isActivePath } from "@/lib/nav";
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
 */
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

        <Link href={resume.page} className={styles.cta}>
          Résumé
        </Link>
      </nav>
    </header>
  );
}
