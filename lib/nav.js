/**
 * Site structure.
 *
 * The previous build was a single page carrying six flagship case-study cards,
 * a sixteen-item project grid, two research studies, three jobs, a tech ticker,
 * four recognition tiles, four leadership entries, seven honours and six
 * certifications. Roughly 7,000 pixels of scroll, and a reviewer has to read
 * all of it to find the two things they came for.
 *
 * So it splits into pages. Each one answers a single question, the nav says
 * which question you are on, and nothing competes for attention inside a page.
 */

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

/**
 * Marks the active tab. `/work/edith` should light up "Work", so every route
 * except the root matches on prefix; the root has to match exactly or it would
 * stay lit on every page.
 */
export const isActivePath = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);
