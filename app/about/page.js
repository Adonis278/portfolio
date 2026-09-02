import { PageHeader, SectionTitle, pageStyles } from "@/components/ui/Page";
import styles from "./about.module.css";

export const metadata = {
  title: "About | Jerome Adonis",
  description:
    "AI engineer and cloud solutions architect. What I build, how I think about it, and what I am working on now.",
};

/**
 * About.
 *
 * The prose here is the copy already published on the GitHub profile README, so
 * the two read as one person rather than two drafts. The stance paragraph is
 * the part that makes this page worth having: anyone can list technologies, and
 * a reviewer meeting a fourth AI portfolio in a morning remembers the one that
 * said what it refuses to do.
 */

const FOCUS = [
  {
    title: "Agentic systems",
    body: "Multi-agent architectures, tool calling, and the retrieval and evaluation work that decides whether an agent is trustworthy enough to put in front of someone's staff.",
  },
  {
    title: "Cloud and serverless",
    body: "AWS by preference. Bedrock, Lambda, DynamoDB, S3 and OpenSearch, wired together with CI/CD that makes a release boring.",
  },
  {
    title: "Full-stack product",
    body: "Next.js and TypeScript front to back, because an agent nobody can use is a research artifact rather than a product.",
  },
  {
    title: "Accessibility as engineering",
    body: "Building for low bandwidth, shared devices, second languages and attention that does not cooperate. These are constraints, not charity.",
  },
];

export default function AboutPage() {
  return (
    <main className={pageStyles.shell}>
      <PageHeader
        eyebrow="About"
        title="I build things that give people more capability, not more dependency."
      />

      <div className={styles.intro}>
        <div className={styles.prose}>
          <p>
            I studied computer information systems at{" "}
            <strong>Livingstone College</strong>, graduating summa cum laude in
            May 2026 with a 4.00 GPA, and I am now a master&rsquo;s student in
            computer science at{" "}
            <strong>West Virginia State University</strong>. Along the way I
            spent three summers building production software at{" "}
            <strong>Amazon Web Services</strong>, <strong>Bank of America</strong>{" "}
            and <strong>Ernst &amp; Young</strong>.
          </p>
          <p>
            What holds the work together is a preference for systems that hand
            people more capability rather than more dependency. The AI tutor I
            build refuses to give up the answer. The task-initiation tool I build
            is designed to need less of a student&rsquo;s attention, not more.
            That is a deliberate stance, and it decides what I choose to build.
          </p>
          <p>
            Right now most of my product work ships under{" "}
            <a
              className={styles.link}
              href="https://spiritustec.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Spiritus Agentic Solutions
            </a>
            , where the constraint that shapes everything is that intelligence
            has to survive contact with an unreliable network, a shared device,
            and a user who is not working in English.
          </p>
        </div>

        <figure className={`panel ${styles.portrait}`}>
          <img
            className={styles.portraitImg}
            src="/img/jerome-cutout-800.webp"
            srcSet="/img/jerome-cutout-480.webp 480w, /img/jerome-cutout-800.webp 800w"
            sizes="(max-width: 52rem) 100vw, 24rem"
            width={800}
            height={800}
            alt="Jerome Adonis"
            decoding="async"
          />
        </figure>
      </div>

      <section className={pageStyles.block}>
        <SectionTitle index="02">What I work on</SectionTitle>
        <ul className={styles.focus}>
          {FOCUS.map((item) => (
            <li className={`panel ${styles.focusItem}`} key={item.title}>
              <h3 className={styles.focusTitle}>{item.title}</h3>
              <p className={styles.focusBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
