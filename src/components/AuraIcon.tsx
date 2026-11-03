'use client';

/**
 * Hand-drawn aura line icons (thin 1.5px strokes). No emoji, no generic
 * icon sets — every icon below is drawn for this app's theme.
 */
export const ICON_PATHS = {
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
  heart: (
    <>
      <path d="M12 20.2s-7-4.4-8.6-8.7C2.1 8 4.4 4.5 7.9 4.5c2 0 3.3 1.1 4.1 2.4.8-1.3 2.1-2.4 4.1-2.4 3.5 0 5.8 3.5 4.5 7-1.6 4.3-8.6 8.7-8.6 8.7Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.2" />
      <path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7M3.5 12.5h17" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8l1.4 3.4 3.6.3-2.7 2.4.8 3.5L12 14.6l-3.1 1.8.8-3.5-2.7-2.4 3.6-.3L12 6.8Z" />
    </>
  ),
  academic: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
      <path d="M6.5 11.5v4.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.2M21.5 9.5v5" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 5c2.2 2.8 3 6.2 0 10-3-3.8-2.2-7.2 0-10Z" />
      <path d="M12 15c2.8-3.2 6.2-4 7.8-2.2.6 3.5-2.4 6.2-7.8 6.2-5.4 0-8.4-2.7-7.8-6.2C5.8 11 9.2 11.8 12 15Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.8 18.5c.6-2.9 2.7-4.5 5.2-4.5s4.6 1.6 5.2 4.5" />
      <circle cx="16.2" cy="9.5" r="2.3" />
      <path d="M15.5 14.3c2.1.2 3.8 1.5 4.4 4.2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </>
  ),
  edit: (
    <>
      <path d="M15.8 4.5a2.1 2.1 0 0 1 3 3L8.3 18l-4.3 1 1-4.3L15.8 4.5Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.2 12H2M22 12h-2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" />
    </>
  ),
  alchemy: (
    <>
      <circle cx="9.2" cy="12" r="5.5" />
      <circle cx="14.8" cy="12" r="5.5" />
      <path d="M12 7.4v9.2" />
    </>
  ),
} as const;

export type AuraIconName = keyof typeof ICON_PATHS;

export default function AuraIcon({
  name,
  className = 'h-5 w-5',
}: {
  name: AuraIconName;
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
      {ICON_PATHS[name]}
    </svg>
  );
}
