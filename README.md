# Aura Tarot (working title)

78-card Rider-Waite-Smith tarot reading web app (Thai primary, English secondary).
Free 100%, no paywall.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- i18next + react-i18next (TH/EN, switchable anytime)
- Motion (`motion` package) for card/UI animation
- tsParticles for the starfield background

## Features

- 3 spread levels: 1 card (daily draw) / 3 cards (5 life-area categories) / Celtic Cross (10 cards)
- Face-down intuitive card picking with 3-layer mis-tap protection
- Chat-style optional profile (name / birthdate / question) saved to localStorage
- Reading engine: variant pools (no copy-paste readings), one-line summaries,
  upright + 5 reversed modes, elemental dignities, System-A timing
  (Wands=days, Swords=weeks, Cups=months, Pentacles=years)
- Ritual cooldown: max 3 readings/month, 7+ days apart (soft gate, never hard-blocks)
- Reading journal with "did it come true" tracking
- Original "aura line art" card artwork (79 images, upright only — the app rotates 180° for reversed)

## Develop

```bash
npm install
npm run dev
```

## Deploy

Push to `main` → Vercel auto-deploys.

## Brand

"Aura Tarot" is a working title — the owner will set the final brand name.
