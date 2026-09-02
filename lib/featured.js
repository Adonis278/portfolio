import { flagships, moreWork } from "./projects";

/**
 * Curation layer for the target roles: AI Engineer and Software Engineer.
 *
 * `lib/projects.js` stays the record of everything and is not edited here. This
 * file only decides what a reviewer sees first, and reduces each entry to one
 * sentence. The long-form summaries still live on the case studies, where
 * someone who is already interested will read them.
 *
 * Ordering is by strength of evidence for those two roles specifically:
 *   1. production AI system at a named employer, with measured outcomes
 *   2. shipped AI products with public code and a live URL
 *   3. an externally judged win
 *   4. hardware, which is real but proves less about writing software
 *
 * Two of these — Tinker and Bloom — sat in the sixteen-item "Product lab" grid,
 * where the strongest AI work on the site was indistinguishable from a cleaning
 * company's marketing page. They are promoted here.
 */

const CURATED = [
  {
    key: "edith",
    from: "flagship",
    slug: "edith",
    name: "EDITH",
    year: "2025",
    context: "Amazon Web Services",
    /* Every card carries commissioned artwork rather than a screenshot.
       Deliberately NO shared house style: each piece is its own medium and
       palette — here a dark cinematic 3D render, elsewhere risograph print,
       Bauhaus poster, paper collage, watercolour, clinical photography. A
       single consistent style made six projects read as one repeated image;
       what carries interest is that each one looks like a different artist
       was hired for it, the way the reference portfolio does it. */
    image: "/img/work/edith-art.webp",
    line: "A Slack-native multi-agent knowledge platform on Amazon Bedrock, built and handed to stakeholders in production during an AWS internship.",
    tags: ["Amazon Bedrock", "Multi-agent", "Lambda"],
  },
  {
    key: "tinker",
    from: "more",
    name: "Tinker",
    year: "2026",
    context: "Prometheus Innovation Challenge",
    image: "/img/work/tinker-art.webp",
    line: "An AI tutor that refuses to hand over the answer, teaching in the language you think in and grounding every lesson in notes you upload.",
    tags: ["Next.js", "LLM APIs", "Firebase"],
  },
  {
    key: "wealthbridge",
    from: "flagship",
    slug: "wealthbridge",
    name: "WealthBridge",
    year: "2026",
    context: "Risk Management Association",
    image: "/img/work/wealthbridge-art.webp",
    line: "A credit building platform that parses real bank statements as CSV, PDF or image and redacts PII before analysis, turning the result into the next step that moves a score. Awarded $8,000.",
    tags: ["Next.js", "TypeScript", "Cloud Functions"],
  },
  {
    key: "civiclens",
    from: "flagship",
    slug: "civiclens-ai",
    name: "CivicLens AI",
    year: "2026",
    context: "InternXL AI Innovation Challenge",
    image: "/img/work/civiclens-art.webp",
    line: "Turns dense government documents into plain language, audio and other languages. Second place and $5,000 against a national field.",
    tags: ["LLM APIs", "Google ADK", "Text-to-speech"],
  },
  {
    key: "bloom",
    from: "more",
    name: "Bloom",
    year: "2026",
    context: "IncludAI with Stanford",
    /* Public URL is a Google sign-in wall — a screenshot would show almost
       nothing. Illustrated instead. */
    image: "/img/work/bloom-art.webp",
    line: "Task initiation for students with ADHD. It reads a silent stall from keystroke timing, never content, and quietly makes the next step smaller.",
    tags: ["React", "Firebase", "LLM APIs"],
  },
  {
    key: "remiband",
    from: "flagship",
    slug: "remiband",
    name: "RemiBand",
    year: "2026",
    context: "Propel Future of Tech Challenge",
    /* Hardware, no web product to capture. Illustrated instead. */
    image: "/img/work/remiband-art.webp",
    line: "An AI-enabled wound-monitoring wearable that flags deterioration before it becomes an admission. Top 2 of 110 teams and $10,500.",
    tags: ["Sensor telemetry", "Apple Health", "Cloud pipeline"],
  },
];

const flagshipBySlug = new Map(flagships.map((p) => [p.slug, p]));
const moreByName = new Map(moreWork.map((p) => [p.name, p]));

/**
 * Resolves each curated entry against the source record so links and status
 * are never restated here. If a name stops matching, the entry drops out rather
 * than rendering a card that points nowhere.
 */
export const featuredWork = CURATED.map((item) => {
  const source =
    item.from === "flagship"
      ? flagshipBySlug.get(item.slug)
      : moreByName.get(item.name);

  if (!source) return null;

  const links = [...(source.links ?? [])];
  if (item.slug) {
    links.unshift({ label: "Case study", href: `/work/${item.slug}` });
  }

  /* Three links maximum, in order of what a reviewer opens first. A fourth
     turns the row into a menu, and on WealthBridge the fourth pointed at a
     different product than the row is describing. */
  const RANK = {
    "Case study": 0,
    Live: 1,
    "Live Demo": 1,
    "View Code": 2,
    /* Ranked below code on purpose: it leads to an auth wall, not the product. */
    "Sign in to try": 3,
  };
  const trimmed = links
    .slice()
    .sort((a, b) => (RANK[a.label] ?? 9) - (RANK[b.label] ?? 9))
    .slice(0, 3);

  return { ...item, status: source.status, links: trimmed };
}).filter(Boolean);

/** The home page shows four. Any more and it stops being a shortlist. */
export const homeWork = featuredWork.slice(0, 4);

/** Everything not promoted above, for the quiet list at the foot of /work. */
const featuredNames = new Set(featuredWork.map((p) => p.name));

export const otherWork = [
  ...flagships
    .filter((p) => !featuredNames.has(p.name))
    .map((p) => ({
      name: p.name,
      note: p.kicker,
      href: `/work/${p.slug}`,
      links: p.links ?? [],
    })),
  ...moreWork
    .filter((p) => !featuredNames.has(p.name))
    .map((p) => ({
      name: p.name,
      /* First sentence only. The full blurbs run three or four sentences,
         which is what made the old grid a wall of text. */
      note: (p.blurb ?? "").split(/(?<=\.)\s/)[0],
      links: p.links ?? [],
    })),
];
