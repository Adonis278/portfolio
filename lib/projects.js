/**
 * Project catalogue.
 *
 * Two rules govern this file, and they are what keep the portfolio credible:
 *
 * 1. `status` is mandatory and honest. A concept is labelled a concept. A
 *    reviewer who finds one overstated project discounts every other claim on
 *    the page, so the labels protect the real achievements.
 *
 * 2. `links` only ever contains URLs verified to resolve publicly. An empty
 *    array is fine — the card then offers the case study alone. A dead or
 *    disabled button is worse than no button.
 *
 * `role` is the short label a reviewer scans; `roleDetail` is the sentence that
 * survives an interviewer probing it. Every project here was tech-led by
 * Jerome, but the label alone would invite "lead of whom, exactly?" — so the
 * detail always names the scope, the team size, or the real job title.
 *
 * Link checks last run 2026-08-01:
 *   live      wealthbridge.web.app, spiritustec.com, projectbmwx9.web.app
 *   public    Adonis278/{WealthBridge,BrightPocket,CubixAI,DannyAI}
 *   PRIVATE   TravonteD/civiclens-ai, DevOpsSpiritus/LearnFlow
 */

/** Maturity vocabulary. Ordered loosely strongest-evidence first. */
export const STATUS = {
  deployed: { label: "Deployed", tone: "live" },
  production: { label: "Production system", tone: "live" },
  award: { label: "Award winner", tone: "award" },
  finalist: { label: "Competition finalist", tone: "award" },
  prototype: { label: "Working prototype", tone: "build" },
  hackathon: { label: "Hackathon prototype", tone: "build" },
  design: { label: "Product design", tone: "concept" },
  concept: { label: "Research concept", tone: "concept" },
};

/**
 * The six that carry the portfolio. Ordered by how strongly each one argues
 * that he can build: production AWS work first, then the award, then the
 * thing a reviewer can actually click.
 */
export const flagships = [
  {
    slug: "edith",
    name: "EDITH",
    kicker: "Enterprise multi-agent AI on AWS",
    category: "Enterprise AI · Cloud architecture",
    context: "Amazon Web Services, Solutions Architect Internship",
    year: "2025",
    status: "production",
    role: "Solutions Architect",
    roleDetail:
      "Owned the architecture, the build and the stakeholder handoff as Solutions Architect Intern",
    summary:
      "A Slack-integrated knowledge platform that ingests documents, manages their lifecycle, and answers questions in natural language. Built on Bedrock and a multi-agent architecture, and handed off to stakeholders in production.",
    problem:
      "Partner-facing teams lost hours a week uploading, validating, organising and re-finding internal knowledge. Information was scattered across documents and Slack, which slowed validation and delayed decisions.",
    solution:
      "An AI-powered document ingestion, lifecycle-management and retrieval platform that lives where the teams already work: Slack. It evolved from a single-agent design into a modular multi-agent system.",
    capabilities: [
      "Natural-language knowledge retrieval in Slack",
      "Document ingestion with metadata extraction",
      "Content validation and review workflows",
      "Semantic search and document routing",
      "Duplicate, freshness and quality monitoring",
      "Feedback capture on AI-generated answers",
    ],
    contribution: [
      "Translated stakeholder needs into a cloud architecture",
      "Evolved a single-agent prototype into a modular multi-agent design",
      "Built the serverless workflows and the Slack integration",
      "Designed the document review and lifecycle process",
      "Added monitoring, feedback capture and analytics dashboards",
      "Presented and handed the system off to stakeholders",
    ],
    stack: [
      "Amazon Bedrock",
      "Strands Agents",
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "OpenSearch",
      "EventBridge",
      "Slack API",
      "CI/CD",
    ],
    results: [
      { value: "~20%", label: "less weekly admin workload", kind: "measured" },
      { value: "~40%", label: "faster document validation", kind: "measured" },
      { value: "<2 min", label: "to a semantic answer", kind: "measured" },
    ],
    /* Employer-confidential: no repository, and the case study uses only
       sanitised, recreated examples. */
    links: [],
    linkNote:
      "Built during an AWS internship, so the source is not public. The case study describes the architecture using sanitised examples only.",
    featured: true,
  },

  {
    slug: "civiclens-ai",
    name: "CivicLens AI",
    kicker: "Accessible civic information",
    category: "Civic tech · Accessible AI · Multimodal",
    context: "InternXL AI Innovation Challenge",
    year: "2026",
    status: "award",
    recognition: "2nd place · $5,000 award",
    role: "Full-Stack Developer",
    roleDetail:
      "Built the platform across the stack, and owned the PRD, system prompts and user flows",
    summary:
      "Turns government documents, legal notices and public meetings into plain language, other languages, audio and live captions, so residents who are currently locked out of civic information can actually use it.",
    problem:
      "Public documents are written for administrators, not residents. People with limited literacy, language barriers, low vision or hearing loss are effectively excluded from information about their own city.",
    solution:
      "A civic accessibility platform that rewrites complex public information into plain language and delivers it in the format each resident needs, while always keeping the original document one tap away for comparison.",
    capabilities: [
      "Plain-language document simplification",
      "Three-to-five point civic summaries",
      "Multilingual translation",
      "Text-to-speech output",
      "Side-by-side comparison against the source document",
      "Confidence scoring with human review",
      "ASL recognition and real-time captioning (concept)",
    ],
    contribution: [
      "Product requirements, system prompts and user flows",
      "Accessibility-first interaction design",
      "Model and translation pipeline direction",
    ],
    stack: ["React", "Firebase", "LLM APIs", "Translation APIs", "Text-to-speech", "Computer vision"],
    results: [
      { value: "2nd", label: "of the competition field", kind: "measured" },
      { value: "$5,000", label: "awarded", kind: "measured" },
    ],
    links: [
      { label: "Live Demo", href: "https://civic-lens-ai7.lovable.app/", kind: "primary" },
    ],
    /* Team repo TravonteD/civiclens-ai is private — re-confirmed 2026-08-02. */
    linkNote:
      "The team repository is private, so there is no public code link. The live demo is the artifact, and I am happy to walk through the architecture.",
    featured: true,
  },

  {
    slug: "wealthbridge",
    name: "WealthBridge",
    kicker: "Building and rebuilding credit",
    category: "FinTech · Credit · Agentic AI",
    context: "Community-focused project, Salisbury NC",
    year: "2025–2026",
    status: "deployed",
    /* Overrides the "Deployed" label on the badge. Keeps the live tone, because
       it is both awarded and the one flagship a reviewer can actually click. */
    recognition: "$8,000 awarded",
    role: "Full-Stack Developer",
    roleDetail:
      "Owned the architecture, the agent design and the full-stack build end to end",
    summary:
      "A platform for people building or rebuilding credit. It parses their real bank statements, works out where the score is actually losing ground, and names the next step, with Credit Repair, Smart Investing and Mentorship modules on a real-time Firebase backend.",
    problem:
      "People trying to build or rebuild credit are told to raise their score without being told which move raises it. The guidance they can find is generic, static, and disconnected from what is actually in their accounts.",
    solution:
      "A full-stack platform whose 'Wealth Navigator' agent works from the user's own financial picture rather than general advice, using designed prompt flows, tool calls and reasoning chains. BrightPocket supplies the ingestion side: statement parsing across three file formats, transaction normalisation, and recurring-payment detection, with PII redacted before anything reaches the model.",
    capabilities: [
      "AI advisor with tool calls and reasoning chains",
      "Credit Repair, Smart Investing and Mentorship modules",
      "Gamified challenges and goal tracking",
      "Bank statement upload with CSV, PDF and image parsing (BrightPocket)",
      "Transaction normalisation and recurring-payment detection",
      "PII redaction and agent memory",
    ],
    contribution: [
      "Architected and shipped the full stack end to end",
      "Designed the agent's prompt flows, tools and reasoning chains",
      "Built the React/Next.js frontend with real-time Firestore sync",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase Auth", "Firestore", "Cloud Functions", "Strands Agents"],
    results: [
      { value: "$8,000", label: "awarded by the Risk Management Association", kind: "measured" },
      { value: "3", label: "shipped product modules", kind: "measured" },
      { value: "Real-time", label: "Firestore sync across modules", kind: "measured" },
      { value: "~40%", label: "engagement lift", kind: "projected" },
    ],
    links: [
      { label: "Live Demo", href: "https://wealthbridge.web.app", kind: "primary" },
      { label: "View Code", href: "https://github.com/Adonis278/WealthBridge", kind: "secondary" },
      { label: "BrightPocket Code", href: "https://github.com/Adonis278/BrightPocket", kind: "secondary" },
    ],
    featured: true,
  },

  {
    slug: "remiband",
    name: "RemiBand",
    kicker: "AI-enabled smart wound care",
    category: "Health tech · Wearables · Product innovation",
    context: "Propel Future of Tech Innovation Challenge",
    year: "2026",
    status: "award",
    recognition: "$10,500 prize · top 2 of 110 teams",
    role: "Tech Lead",
    roleDetail:
      "Led engineering for a five-person cross-disciplinary team, and owned the sensor-to-cloud architecture and platform integration",
    team: "5 people · computer science, biology, business",
    summary:
      "A smart bandage concept that monitors a wound continuously, spots deterioration between clinic visits, and alerts the patient or clinician before a small problem becomes a hospital admission.",
    problem:
      "Chronic wounds worsen silently between appointments. For people with diabetes, post-surgical patients, veterans and rural patients, the gap between visits is where preventable harm happens.",
    solution:
      "A sensing bandage paired with an AI layer that reads the signal trend rather than a single reading, and escalates to a human when the trajectory looks wrong.",
    capabilities: [
      "Continuous wound monitoring",
      "pH, temperature, humidity and oxygenation sensing",
      "AI-assisted healing insight from signal trends",
      "Clinician and patient alerting",
      "Apple Health and Apple Watch integration",
      "Healing progress visualisation",
    ],
    contribution: [
      "The technical and product bridge across a five-person cross-disciplinary team",
      "Sensor-to-cloud data flow and mobile experience direction",
      "Security, privacy and platform integration planning",
    ],
    stack: ["Sensor telemetry", "Cloud data pipeline", "AI trend analysis", "Apple Health", "Mobile"],
    results: [
      { value: "$10,500", label: "prize awarded", kind: "measured" },
      { value: "Top 2", label: "of 110 teams", kind: "measured" },
    ],
    links: [],
    linkNote:
      "Hardware sensing and medication delivery are research-stage. Demo video and pitch materials available on request.",
    featured: true,
  },

  {
    slug: "hairfusion",
    name: "HairFusion",
    kicker: "Try it. Love it. Then book it.",
    category: "Generative AI · AR · Inclusive consumer product",
    context: "BE Smart Hackathon, Charlotte, team Blue-Bear-Prime",
    year: "2025",
    status: "hackathon",
    recognition: "Built by 5 people in 48 hours",
    role: "Full-Stack Developer & Tech Lead",
    roleDetail:
      "Led a five-person team and built the frontend plus the Vertex AI and Gemini Vision integration in 48 hours",
    team: "5 people · Blue-Bear-Prime",
    summary:
      "An AR/AI hairstyle try-on built for every hair type. Upload a selfie, pick a style, and see a photoreal render of yourself wearing it, then find a stylist who can actually cut it.",
    problem:
      "A haircut is a decision you cannot undo, chosen from a reference photo of someone else's head. It is worse if your hair is textured: mainstream beauty AI is trained on straight hair, so people with 3A to 4C hair get previews that look nothing like them, or no preview at all.",
    solution:
      "Gemini Vision reads facial features, skin tone and head shape from the user's own photo; Imagen 2 renders the chosen style back onto them. The style library is texture-inclusive by design, covering braids, locs, fades, coils and protective styles, and an onboarding flow captures hair texture (1A to 4C), density and goals so the AI has something real to work from.",
    capabilities: [
      "Photoreal 'Ultra' renders on the user's own photo (Imagen 2)",
      "Real-time AR overlays with MediaPipe face tracking",
      "Texture-inclusive library: braids, locs, fades, coils, protective styles",
      "1A–4C onboarding for texture, density and styling goals",
      "Face-shape hints and maintenance information",
      "Stylist discovery, portfolios and booking",
      "Privacy-first: on-device AR processing",
    ],
    contribution: [
      "Led technical direction for the five-person team",
      "Built the Next.js 14 / React frontend and the design-token system",
      "Integrated Vertex AI, Gemini Vision analysis and Imagen 2 generation",
      "Wired MediaPipe face tracking for the real-time AR overlay",
      "Set up Firebase auth and storage for saved looks",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Vertex AI",
      "Gemini 2.5 Flash Lite",
      "Imagen 2",
      "MediaPipe",
      "TensorFlow.js",
      "Three.js",
      "Firebase",
    ],
    results: [
      { value: "48 hrs", label: "concept to working prototype", kind: "measured" },
      { value: "1A–4C", label: "hair types supported", kind: "measured" },
      { value: "5", label: "person team led", kind: "measured" },
    ],
    /* Repo is private (Sumon-Mondal/Personal-Blue-Bear-Prime, checked 2026-08-02)
       and the only deck link supplied was a Canva /edit URL — never publish an
       edit link, it hands strangers write access to the design. */
    links: [],
    linkNote:
      "Team repository is private and the project was never deployed. Demo deck and generated before/after examples available on request.",
    featured: true,
  },

  {
    slug: "hbcu-career-copilot",
    name: "HBCU Career Copilot",
    kicker: "Career access, built with guardrails",
    category: "Career tech · AI matching · Browser automation",
    context: "MVP product design",
    year: "2026",
    status: "design",
    role: "Full-Stack Developer & Tech Lead",
    roleDetail:
      "Owned the end-to-end product design, architecture and 16-week delivery roadmap",
    summary:
      "A student-first career platform and browser extension: trusted job discovery, explainable matching, grounded résumé tailoring and application autofill, deliberately designed so the AI never applies on a student's behalf.",
    problem:
      "HBCU students face fragmented opportunity discovery, repetitive applications, weak translation of their experience into recruiter language, and limited access to sponsorship-friendly roles.",
    solution:
      "A reusable candidate profile feeding explainable matching and user-reviewed autofill, with an employer workspace and career-centre analytics on the other side.",
    capabilities: [
      "Reusable candidate profile with résumé ingestion",
      "Explainable job matching, not an opaque score",
      "Chrome extension for Greenhouse, Lever and generic forms",
      "User-reviewed autofill",
      "Résumé tailoring grounded in candidate-provided facts",
      "Employer workspace and career-centre analytics",
    ],
    /* The guardrails are the most interesting part of this design and the
       reason it belongs in a portfolio: they are product judgement, not code. */
    decisions: [
      "No autonomous application submission in the MVP",
      "High-risk fields require an explicit user action",
      "AI-generated claims must be grounded in candidate-provided facts",
      "Explain the matching factors rather than showing a score",
      "Audit ranking for bias and disparate impact",
      "Free for students during initial adoption",
    ],
    contribution: ["End-to-end product design, architecture and 16-week delivery roadmap"],
    stack: ["Next.js", "TypeScript", "Chrome MV3", "FastAPI", "PostgreSQL", "pgvector", "LLM gateway"],
    results: [],
    links: [],
    linkNote: "Product design and architecture are complete; implementation has not started.",
    featured: true,
  },
];

/**
 * Supporting work. Deliberately compact — these exist to show range, and a
 * reviewer should be able to scan the whole grid in a few seconds.
 */
export const moreWork = [
  {
    name: "Spiritus Agentic Solutions",
    blurb: "Autonomous AI agents built for African realities, and the studio the Tinker tutor ships under.",
    status: "deployed",
    links: [{ label: "Visit Site", href: "https://spiritustec.com" }],
  },
  {
    name: "Cubix.AI",
    blurb: "Audits how a business is represented inside AI-generated answers, then tracks whether that representation improves.",
    status: "deployed",
    links: [
      { label: "Live", href: "https://cubixaius.web.app" },
      { label: "View Code", href: "https://github.com/Adonis278/CubixAI" },
    ],
  },
  {
    name: "Bloom",
    blurb: "A task-initiation tool for students with ADHD in grades 6 to 9. It gives one next step sized to the student, generated from what they have actually written rather than a fixed plan, and when keystroke timing shows a silent stall it makes the following step smaller on its own. Timing only, never content. Built for IncludAI 2026.",
    status: "deployed",
    links: [
      /* Not labelled "Live". The deployed app is behind Google sign-in with no
         guest path, so the entire public surface is a title, one sentence and
         an auth button. A reviewer clicking "Live" would see nothing of the
         product, which is worse than being told up front what the click costs.
         Code first: the repo is public and is the more useful click. */
      { label: "View Code", href: "https://github.com/Adonis278/Bloom-ABA" },
      { label: "Sign in to try", href: "https://bloom-aba.web.app" },
    ],
  },
  {
    name: "Machine Learning Portfolio",
    blurb: "Notebooks working through linear regression, natural language processing and computer vision, each one taken from raw data to an evaluated model.",
    status: "prototype",
    links: [{ label: "View Code", href: "https://github.com/Adonis278/Machine-Learning" }],
  },
  {
    name: "Tinker",
    blurb: "An AI tutor that refuses to hand over the answer. It teaches in the language you think in, through a world you already navigate confidently, and grounds every lesson in notes you upload. Push it for the answer and it holds the line, asking a sharper question and naming the misconception behind a wrong one.",
    status: "deployed",
    links: [
      { label: "Live", href: "https://tinkersas.web.app" },
      { label: "View Code", href: "https://github.com/Adonis278/Tinker" },
    ],
  },
  {
    name: "Dilemo",
    blurb: "Booking and CRM platform for an independent barber, with a brand site, mobile booking and an owner dashboard.",
    status: "deployed",
    links: [{ label: "Live", href: "https://dilemohair.web.app" }],
  },
  {
    name: "ACE Mobility",
    blurb: "Mobility service platform built and shipped for a client in TypeScript.",
    status: "deployed",
    links: [
      { label: "Live", href: "https://acemobility10.web.app" },
      { label: "View Code", href: "https://github.com/Adonis278/ACEMOBILITY" },
    ],
  },
  {
    name: "One Wireless Solutions",
    blurb: "Business platform for a wireless infrastructure firm, covering DAS solutions, network design and fibre optic cabling.",
    status: "deployed",
    links: [
      { label: "Live", href: "https://one-wireless-services.web.app" },
      { label: "View Code", href: "https://github.com/Adonis278/one-wireless-services" },
    ],
  },
  {
    name: "Movie Recommendation System",
    blurb: "Java program that reads your picks from a film database and recommends titles that match your taste.",
    status: "prototype",
    links: [
      { label: "View Code", href: "https://github.com/Adonis278/Building-a-Recommendation-System" },
    ],
  },
  {
    name: "Plustou",
    blurb: "Social platform built to connect people around shared interests and local discovery.",
    status: "deployed",
    links: [{ label: "Live", href: "https://ploustou-team.web.app" }],
  },
  {
    name: "Sharp Cleaning Solutions",
    blurb: "React site and enquiry flow for a commercial cleaning company.",
    status: "deployed",
    links: [{ label: "Live", href: "https://sharp-clean-solutions.web.app" }],
  },
  {
    name: "DentAI Concierge",
    blurb: "Voice agent handling dental front-desk workflows, from scheduling to insurance verification.",
    status: "concept",
    links: [{ label: "View Code", href: "https://github.com/Adonis278/DannyAI" }],
  },
  {
    name: "LearnFlow",
    blurb: "An AI learning coach that teaches reasoning instead of handing over answers.",
    status: "design",
    links: [],
  },
  {
    name: "HBCU Battle of the Brains",
    blurb: "Recruitment platform built with an 8-person team and presented to national stakeholders.",
    status: "prototype",
    links: [],
  },
  {
    name: "Salisbury Connect Redesign",
    blurb: "Civic mobility UX redesign addressing a 2.4 out of 5 store rating.",
    status: "design",
    links: [],
  },
];

/** Recognition worth surfacing on its own, not buried in project cards. */
export const recognition = [
  { value: "$10,500", label: "Propel Future of Tech Challenge, top 2 of 110 teams", year: "2026" },
  { value: "$8,000", label: "Risk Management Association, WealthBridge", year: "2026" },
  { value: "$5,000", label: "InternXL AI Innovation Challenge, 2nd place", year: "2026" },
  { value: "4.00", label: "GPA · President's List", year: "2026" },
  { value: "Finalist", label: "HBCU Battle of the Brains", year: "2022" },
];

export const getFlagship = (slug) => flagships.find((p) => p.slug === slug);
