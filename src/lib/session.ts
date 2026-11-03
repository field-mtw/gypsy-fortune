'use client';

// Draw-flow session carried between /spread -> /pick -> /confirm -> /profile -> /reveal.
// Stored in sessionStorage so a refresh mid-flow does not lose the draw.

import type { EmotionalPulse } from '@/data/emotional-pulse';
import type { SpreadLevel, SpreadCategory } from '@/data/spreads';
import type { ClarifierCardRef, DrawnCardRef } from './storage';

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
  /** Bottom-of-the-deck card remaining after the user's picks (subconscious Shadow Card) */
  shadowCard?: DrawnCardRef;
  /** 3 unpicked cards reserved for the optional interactive Clarifier draw */
  clarifierPool?: DrawnCardRef[];
  /** Chosen Clarifier card + intent if already drawn during /reveal */
  clarifier?: ClarifierCardRef;
  /** Optional 1-tap emotional state for this session only */
  pulse?: EmotionalPulse;
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
