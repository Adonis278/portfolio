import Link from "next/link";
import Hero from "@/components/Hero/Hero";
import ProjectRows from "@/components/work/ProjectRows";
import { SectionTitle, pageStyles } from "@/components/ui/Page";
import { homeWork } from "@/lib/featured";
import styles from "./home.module.css";

/**
 * Home.
 *
 * The whole page is now the hero plus four projects. Everything else that used
 * to live here has a page of its own, reachable from the nav, so a reviewer who
 * wants the research or the employment history goes straight there instead of
 * scrolling past it to find out whether they care.
 *
 * Four is the shortlist. A fifth would start the scroll that this rebuild is
 * trying to remove.
 */
export default function Page() {
  return (
    <main>
      <Hero nextSectionId="featured" />

      <section className={pageStyles.shell} id="featured">
        <SectionTitle index="01">Selected work</SectionTitle>
        <ProjectRows items={homeWork} />

        <div className={styles.more}>
          <Link className={styles.moreLink} href="/work">
            All work
            <span aria-hidden="true"> →</span>
          </Link>
          <p className={styles.moreNote}>
            Research, employment history and credentials each have their own
            page.
          </p>
        </div>
      </section>
    </main>
  );
}
