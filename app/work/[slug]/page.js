import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { flagships, getFlagship } from "@/lib/projects";
import { identity } from "@/lib/site";
import styles from "./case-study.module.css";

/** Required by `output: export` — every case study is prerendered. */
export function generateStaticParams() {
  return flagships.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getFlagship(params.slug);
  if (!project) return {};

  return {
    title: `${project.name} | ${identity.firstName} ${identity.lastName}`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }) {
  const project = getFlagship(params.slug);
  if (!project) notFound();

  const index = flagships.findIndex((p) => p.slug === project.slug);
  const next = flagships[(index + 1) % flagships.length];

  const measured = project.results?.filter((r) => r.kind === "measured") ?? [];
  const projected = project.results?.filter((r) => r.kind === "projected") ?? [];

  return (
    <main className={styles.main}>
      <div className={styles.shell}>
        <Link href="/#work" className={styles.back}>
          ← All work
        </Link>

        {/* ---- header ---------------------------------------------------- */}

        <header className={styles.header}>
          <div className={styles.badges}>
            <StatusBadge status={project.status} recognition={project.recognition} />
            <span className={styles.year}>{project.year}</span>
          </div>

          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.kicker}>{project.kicker}</p>
          <p className={styles.summary}>{project.summary}</p>

          <dl className={styles.meta}>
            {project.role && (
              <div>
                <dt>Role</dt>
                <dd className={styles.roleValue}>{project.role}</dd>
              </div>
            )}
            <div>
              <dt>Context</dt>
              <dd>{project.context}</dd>
            </div>
            {project.team && (
              <div>
                <dt>Team</dt>
                <dd>{project.team}</dd>
              </div>
            )}
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
          </dl>

          {/* The sentence that has to survive an interviewer asking what
              "tech lead" actually meant here. */}
          {project.roleDetail && <p className={styles.roleDetail}>{project.roleDetail}</p>}

          {project.links.length > 0 && (
            <div className={styles.actions}>
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={link.kind === "primary" ? styles.primary : styles.secondary}
                >
                  {link.label}
                  <ArrowUpRightIcon width={14} height={14} />
                </a>
              ))}
            </div>
          )}

          {/* Says plainly why there is no link, instead of leaving a gap the
              reader has to interpret. */}
          {project.linkNote && <p className={styles.linkNote}>{project.linkNote}</p>}
        </header>

        {/* ---- results --------------------------------------------------- */}

        {(measured.length > 0 || projected.length > 0) && (
          <section className={styles.resultsBand} aria-label="Results">
            {measured.map((r) => (
              <div key={r.label} className={styles.result}>
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>{r.label}</span>
              </div>
            ))}
            {projected.map((r) => (
              <div key={r.label} className={`${styles.result} ${styles.projected}`}>
                <span className={styles.resultValue}>{r.value}</span>
                <span className={styles.resultLabel}>
                  {r.label}
                  <span className={styles.projectedTag}>projected, not measured</span>
                </span>
              </div>
            ))}
          </section>
        )}

        {/* ---- narrative -------------------------------------------------- */}

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>The problem</h2>
          <p className={styles.prose}>{project.problem}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>The solution</h2>
          <p className={styles.prose}>{project.solution}</p>

          {project.capabilities?.length > 0 && (
            <ul className={styles.list}>
              {project.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>

        {project.decisions?.length > 0 && (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Key decisions</h2>
            <p className={styles.prose}>
              The constraints mattered more than the features. These are the rules the
              product was built around.
            </p>
            <ul className={styles.list}>
              {project.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>What I did</h2>
          <ul className={styles.list}>
            {project.contribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Stack</h2>
          <ul className={styles.chips}>
            {project.stack.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- footer ---------------------------------------------------- */}

        <nav className={styles.pager} aria-label="More work">
          <Link href={`/work/${next.slug}`} className={styles.nextCard}>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextName}>
              {next.name}
              <ArrowUpRightIcon width={18} height={18} />
            </span>
            <span className={styles.nextKicker}>{next.kicker}</span>
          </Link>

          <div className={styles.contactCard}>
            <span className={styles.nextLabel}>Want the detail?</span>
            <a className={styles.contactLink} href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
            <span className={styles.nextKicker}>
              Happy to walk through the architecture and the code.
            </span>
          </div>
        </nav>
      </div>
    </main>
  );
}
