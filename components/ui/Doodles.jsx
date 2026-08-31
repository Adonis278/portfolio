/**
 * Hand-drawn marks and icon stickers.
 *
 * Rule 5 of the decomposition. The loose marks carry no information at all —
 * they exist to fill the gutters around the portrait so the hero reads as a
 * composed spread rather than a headshot beside a paragraph. The icon
 * stickers below them do mean something: each names one thing he builds.
 *
 * Everything is inline SVG on `currentColor` with no fill, so a mark takes its
 * colour from wherever it sits and costs no network request. Each is drawn on
 * a small grid with round line caps, which is what gives them the felt-tip
 * quality rather than a vector-icon quality.
 *
 * All aria-hidden: a screen reader announcing "star, squiggle, spark" between
 * a name and a job title would be worse than silence.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/* --- loose marks (decorative) -------------------------------------------- */

export function Star(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M12 2.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"
      />
    </svg>
  );
}

/*
 * Used as a drawn underline, which means it has to stretch to whatever width
 * the word above it happens to be. `preserveAspectRatio="none"` is what allows
 * that — without it the browser keeps the 40:14 ratio and centres a small mark
 * inside the box instead of filling it. The stroke distorts slightly when
 * stretched, which is fine for a hand-drawn mark and would not be for an icon.
 */
export function Squiggle(props) {
  return (
    <svg
      viewBox="0 0 40 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <path
        {...stroke}
        strokeWidth={3.4}
        d="M2 8c3-6 6.5-6 9.5 0s6.5 6 9.5 0 6.5-6 9.5 0"
      />
    </svg>
  );
}

export function Spark(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </svg>
  );
}

export function Arrow(props) {
  return (
    <svg viewBox="0 0 44 30" aria-hidden="true" {...props}>
      {/* a drawn arrow, curving — a straight one reads as UI chrome */}
      <path {...stroke} d="M3 6c12 16 26 19 38 15" />
      <path {...stroke} d="M32 16c4 2.8 6.6 4 9 5-2 1.8-3.8 4-5 7" />
    </svg>
  );
}

export function Bolt(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M13.5 2 5 13.5h6L10.5 22 19 10.5h-6L13.5 2Z" />
    </svg>
  );
}

export function Loop(props) {
  return (
    <svg viewBox="0 0 30 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M4 20c-2-6 1-13 7-16 5-2.5 9 1 8 6-1 4-6 6-8 3s1-8 5-9c5-1.3 9 2 10 7"
      />
    </svg>
  );
}

/* --- icon stickers (each names one thing he builds) ---------------------- */

export function CodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4" />
    </svg>
  );
}

export function CloudIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        {...stroke}
        d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 11.2 3.5 3.5 0 0 0 7 18Z"
      />
    </svg>
  );
}

export function AgentIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="5" r="2.6" />
      <circle {...stroke} cx="5" cy="18" r="2.6" />
      <circle {...stroke} cx="19" cy="18" r="2.6" />
      <path {...stroke} d="M10.2 7.2 6.6 15.4M13.8 7.2l3.6 8.2M7.6 18h8.8" />
    </svg>
  );
}

export function TerminalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path {...stroke} d="m7 10 3 2.5L7 15M13 15.5h4" />
    </svg>
  );
}

/* --- brand marks --------------------------------------------------------- */
/*
 * GitHub and LinkedIn, as filled glyphs rather than the outlined style above.
 * Brand marks have a fixed shape — outlining them to match the house style
 * would make them harder to recognise, which is the one job they have.
 *
 * `fill: currentColor` so each takes the colour of the button it sits in.
 */

export function GitHubMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.66 5.58.66 11.85c0 5.01 3.25 9.26 7.75 10.76.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.15.69-3.82-1.33-3.82-1.33-.52-1.31-1.27-1.66-1.27-1.66-1.03-.71.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .95-.31 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.17-1.47 3.12-1.16 3.12-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.17 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.5-1.5 7.74-5.75 7.74-10.76C23.34 5.58 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
