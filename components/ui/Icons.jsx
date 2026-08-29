/** Inline 24px icons — no icon dependency, no runtime fetch. */

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function PlayIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5 18.5 12 8 18.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PauseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="5.5" width="2.6" height="13" rx="1.1" fill="currentColor" stroke="none" />
      <rect x="13.4" y="5.5" width="2.6" height="13" rx="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SoundOnIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.2L11.5 6v12L7.2 14.5H4z" fill="currentColor" stroke="none" />
      <path d="M15.2 9.4a3.6 3.6 0 0 1 0 5.2" />
      <path d="M17.9 6.9a7.2 7.2 0 0 1 0 10.2" />
    </svg>
  );
}

export function SoundOffIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.2L11.5 6v12L7.2 14.5H4z" fill="currentColor" stroke="none" />
      <path d="m15.5 9.8 4.4 4.4" />
      <path d="m19.9 9.8-4.4 4.4" />
    </svg>
  );
}

export function ArrowDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15" />
      <path d="m6.5 14 5.5 5.5L17.5 14" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}
