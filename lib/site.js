/**
 * Single source of truth for portfolio content.
 * Everything the hero and the sections render is derived from here so copy
 * changes never require touching a component.
 */

export const identity = {
  firstName: "Jerome",
  lastName: "Adonis",
  tagline: "AI Engineering · Agentic Systems · Cloud Architecture",
  role: "AI Engineer · Founder · Cloud Architect",
  subtitle:
    "I build intelligent, cloud-native systems that turn complex business problems into scalable products. From multi-agent AI solutions on AWS to full-stack applications, I take ideas from architecture to working software.",
  location: "West Virginia",
  email: "adonisherome73@gmail.com",
  phone: "+1 774-464-0357",
  links: [
    { label: "GitHub", href: "https://github.com/Adonis278" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jeromeadonis" },
    { label: "Email", href: "mailto:adonisherome73@gmail.com" },
  ],
};

/** The résumé is served as a static file so the URL can be shared directly. */
export const resume = {
  file: "/resume/jerome-adonis-resume.pdf",
  page: "/resume",
  updated: "July 2026",
  downloadName: "Jerome-Adonis-Resume.pdf",
};

export const marquee = [
  "AWS Bedrock",
  "Agentic Pipelines",
  "Next.js",
  "TypeScript",
  "Python",
  "Lambda · S3 · DynamoDB",
  "Prompt Engineering",
  "Three.js",
  "Spring Boot",
  "Firebase",
];

export const experience = [
  {
    company: "Amazon Web Services",
    role: "Solutions Architect Intern",
    place: "New York, NY",
    period: "May – Aug 2025",
    points: [
      "Designed and deployed a production Slack-integrated AI agent on Bedrock + Lambda, automating enterprise knowledge retrieval with agentic LLM pipelines.",
      "Engineered prompt architectures and tool-call flows with chain-of-thought reasoning for reliable, production-grade agentic output.",
      "Built serverless architecture (Lambda, S3, DynamoDB) that cut administrative overhead by 20%.",
      "Implemented CI/CD pipelines supporting zero-downtime production deployments.",
    ],
  },
  {
    company: "Bank of America",
    role: "Software Engineering Intern",
    place: "Charlotte, NC",
    period: "Jun – Aug 2023",
    points: [
      "Built Java/Spring Boot backend microservices supporting real-time banking workflows.",
      "Wrote unit and integration tests (JUnit, Mockito) under TDD across distributed services.",
      "Automated Jira extraction and reporting in Python for a 30% team efficiency gain; built Tableau dashboards for 120+ stakeholders.",
    ],
  },
  {
    company: "Ernst & Young",
    role: "FSO Technology Consultant Intern",
    place: "Charlotte, NC",
    period: "Jun – Aug 2022",
    points: [
      "Resolved billing workflows for financial-sector clients on AWS, pairing implementation with client-facing consulting.",
      "Built an ML model analyzing real estate market data to optimize ROI; ran AI-driven qualitative analysis on Azure for energy clients.",
    ],
  },
];

/**
 * Undergraduate research. Neither of these has a public repository, so the
 * page itself is the artifact. Figures are deliberately absent until the
 * poster and presentation are recovered: an accuracy number invented here
 * would be the one claim an interviewer probes.
 */
export const research = [
  {
    id: "anfis",
    title: "ANFIS Stock Forecasting",
    kicker: "Adaptive neuro-fuzzy inference on equity data",
    program: "MSEIP Summer Research Program",
    year: "2022",
    award: "$500 research award",
    body: "Built an adaptive neuro-fuzzy inference system to forecast equity prices, trained on Google stock data spanning 2019 to 2022. The series was split chronologically rather than shuffled, with roughly the first two years used for training and the final year held back for testing, so the model was never scored on data it had already seen.",
    stack: ["MATLAB", "ANFIS", "Time-series modelling", "Supervised learning"],
    outputs: ["Research poster", "Program presentation"],
    note: "Poster and full presentation available on request.",
  },
  {
    id: "covid-disasters",
    title: "COVID and Natural Disaster Correlation",
    kicker: "Exploratory data science study",
    program: "Independent research",
    year: "2022",
    award: "$500 research award",
    body: "Investigated whether pandemic case data moved with natural disaster events. Cleaned and joined the two datasets in Python, then built the visual analysis needed to test the relationship and support a written conclusion rather than asserting one.",
    stack: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Spyder"],
    outputs: ["Visual analysis", "Written findings"],
  },
];

/**
 * Leadership. Kept separate from Experience on purpose: running a chapter and
 * mentoring cohorts is a different claim from shipping software, and merging
 * them makes both read thinner.
 */
export const leadership = [
  {
    role: "President",
    org: "NSBE Livingstone Chapter",
    body: "Leads the National Society of Black Engineers chapter, running technical programming and building employer and alumni connections for members.",
  },
  {
    role: "Ambassador",
    org: "PROPEL PitchIQ",
    body: "Mentors HBCU students through the PROPEL PitchIQ program, supporting cohorts across Morgan State, FAMU, North Carolina A&T, Clark Atlanta, Prairie View, Tuskegee and Grambling as they build and sharpen their pitches.",
  },
  {
    role: "Founder",
    org: "Blue Bear Hack",
    body: "Founded the campus hackathon and builder club, running workshops on AI agents, APIs, version control and interview preparation.",
  },
  {
    role: "University Innovation Fellow",
    org: "Stanford d.school",
    body: "Selected into the Stanford d.school University Innovation Fellows program, training in design thinking and campus innovation leadership.",
  },
];

export const credentials = {
  degree: "B.S. Computer Science",
  school: "Livingstone College (HBCU)",
  detail: "4.00 GPA · May 2026",
  honors: [
    "President's List",
    "Stanford d.school University Innovation Fellow",
    "PROPEL PitchIQ Ambassador",
    "President, NSBE Livingstone",
    "HBCU Battle of the Brains Finalist",
    "HBCU Living Legends Scholar",
    "James B. Duke Scholarship",
  ],
  certifications: [
    "AWS Solutions Architect",
    "AWS Cloud Practitioner",
    "Duke Software Engineering",
    "Meta Frontend & Backend Developer",
    "CodePath Technical Interview Prep, Advanced (2023)",
    "CodePath Technical Interview Prep, Intermediate (2022)",
  ],
};

/** The production pipeline that generated the hero video on this page. */
export const pipeline = [
  {
    step: "01",
    title: "Identity-consistent 3D avatar",
    body: "An AI-generated likeness locked to a single identity reference so every frame reads as the same person.",
  },
  {
    step: "02",
    title: "Cinematic talking-head render",
    body: "The avatar driven into an animated performance, with warm practical key light, monitor-blue fill and shallow depth of field.",
  },
  {
    step: "03",
    title: "Interactive frontend build",
    body: "The footage becomes the light source for a Three.js bokeh field, GSAP motion, and a scroll-driven hero built in Next.js.",
  },
];

export const media = {
  /**
   * Versioned filename, not a replacement in place. firebase.json serves
   * `**\/*.mp4` with `max-age=31536000, immutable`, and the service worker is
   * cache-first over /media/, so overwriting the old path would leave every
   * returning visitor watching the previous video for up to a year. A new
   * name is the only reliable way to ship a new cut.
   */
  hero: "/media/jerome-intro-voice.mp4",
  heroType: "video/mp4",
  /**
   * Frame 0 of the hero video. Without it the hero renders black whenever a
   * browser refuses autoplay (iOS Low Power Mode, data saver, reduced-motion
   * setups), which reads as a broken page rather than a still.
   */
  heroPoster: "/media/hero-poster-voice.jpg",
  /** Intrinsic dimensions of the source render — used to avoid layout shift. */
  width: 1280,
  height: 720,
};
