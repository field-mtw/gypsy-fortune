'use client';

// Draw-flow session carried between /spread -> /pick -> /confirm -> /profile -> /reveal.
// Stored in sessionStorage so a refresh mid-flow does not lose the draw.

import type { SpreadLevel, SpreadCategory } from '@/data/spreads';

export interface DrawSession {
  seed: number;
  level: SpreadLevel;
  category: SpreadCategory | 'single' | 'celtic-cross';
  /** Card ids in the order the user tapped them */
  picks: string[];
  /** Reversed flags keyed by card id (determined at shuffle time) */
  reversed: Record<string, boolean>;
  /** Shuffled deck order (card ids) for the pick screen */
  order: string[];
  profileDone: boolean;
}

const KEY = 'aura-tarot-session';

export function saveSession(s: DrawSession) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* unavailable */
  }
}

export function loadSession(): DrawSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DrawSession) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* unavailable */
  }
}
