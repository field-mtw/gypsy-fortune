// Ritual cooldown: max 3 readings / month, at least 7 days apart.
// Soft gate only — the app never hard-blocks; it shows mystical copy
// with a countdown and lets the user proceed if they insist.

import { loadReadings } from './storage';

export const MAX_PER_MONTH = 3;
export const MIN_GAP_DAYS = 7;
const DAY_MS = 86_400_000;

export interface CooldownState {
  readingsThisMonth: number;
  daysSinceLast: number | null;
  /** Advisory only — UI shows the ritual gate but never hard-blocks. */
  suggestWait: boolean;
  nextAvailableAt: number | null;
  lastReadingAt: number | null;
}

export function getCooldownState(now = Date.now()): CooldownState {
  const readings = loadReadings();
  if (readings.length === 0) {
    return {
      readingsThisMonth: 0,
      daysSinceLast: null,
      suggestWait: false,
      nextAvailableAt: null,
      lastReadingAt: null,
    };
  }
  const d = new Date(now);
  const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  const readingsThisMonth = readings.filter(
    (r) => new Date(r.createdAt).getTime() >= monthStart,
  ).length;
  const lastAt = Math.max(...readings.map((r) => new Date(r.createdAt).getTime()));
  const daysSinceLast = Math.floor((now - lastAt) / DAY_MS);
  const suggestWait = readingsThisMonth >= MAX_PER_MONTH || daysSinceLast < MIN_GAP_DAYS;
  const nextAvailableAt = suggestWait ? lastAt + MIN_GAP_DAYS * DAY_MS : null;
  return { readingsThisMonth, daysSinceLast, suggestWait, nextAvailableAt, lastReadingAt: lastAt };
}

export function formatCountdown(targetMs: number, lang: 'th' | 'en', now = Date.now()): string {
  const diff = Math.max(0, targetMs - now);
  const days = Math.floor(diff / DAY_MS);
  const hours = Math.floor((diff % DAY_MS) / 3_600_000);
  if (lang === 'th') {
    if (days > 0) return `อีก ${days} วัน ${hours} ชั่วโมง`;
    return `อีก ${hours} ชั่วโมง`;
  }
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}
