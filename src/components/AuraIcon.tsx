'use client';

/**
 * Hand-drawn aura line icons (thin 1.5px strokes). No emoji, no generic
 * icon sets — every icon below is drawn for this app's theme.
 */
const PATHS: Record<string, React.ReactNode> = {
  spark: (
    <>
      <path d="M12 2c.7 4.8 2.4 7.6 5 9.2 2.6 1.7 5.4 2.3 9 2.8-3.6.5-6.4 1.1-9 2.8-2.6 1.6-4.3 4.4-5 9.2-.7-4.8-2.4-7.6-5-9.2-2.6-1.7-5.4-2.3-9-2.8 3.6-.5 6.4-1.1 9-2.8 2.6-1.6 4.3-4.4 5-9.2Z" />
      <path d="M19 3.5c.3 2 1 3.2 2.1 3.9 1.1.7 2.3 1 3.9 1.1-1.6.2-2.8.5-3.9 1.2-1.1.7-1.8 1.9-2.1 3.9-.3-2-1-3.2-2.1-3.9-1.1-.7-2.3-1-3.9-1.2 1.6-.1 2.8-.4 3.9-1.1 1.1-.7 1.8-1.9 2.1-3.9Z" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />,
  cards: (
    <>
      <rect x="7" y="7" width="11" height="15" rx="2" transform="rotate(8 12 14)" />
      <rect x="5" y="5" width="11" height="15" rx="2" transform="rotate(-6 10 12)" />
      <path d="M10.5 9.5c.4 2.4 1.2 3.8 2.5 4.6" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15.5H6.7A1.7 1.7 0 0 0 5 20.2V4.5Z" />
      <path d="M5 19.5A1.5 1.5 0 0 1 6.5 18H19" />
      <path d="M9 7.5h7M9 11h5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c-5.2 5-5.2 12 0 17M12 3.5c5.2 5 5.2 12 0 17" />
    </>
  ),
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  shuffle: (
    <>
      <path d="M3 7h4l10 10h4m0 0-2.5-2.5M21 17l-2.5 2.5M3 17h4l2.5-2.5M13.5 9.5 17 7h4m0 0L18.5 4.5M21 7l-2.5 2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  feather: <path d="M20 4c-6 0-12 4-13.5 11L4 20l1-2.5C4 10 10 4 20 4ZM7 17c2-4 5-7 9-9" />,
  ring: <circle cx="12" cy="12" r="8.5" />,
};

export default function AuraIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: keyof typeof PATHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
