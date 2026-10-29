// Local-first persistence. Everything stays in the user's browser.

export interface UserProfile {
  name: string;
  birthdate: string; // YYYY-MM-DD
  question: string;
}

export type AccuracyMark = 'yes' | 'partial' | 'no' | null;

export interface DrawnCardRef {
  id: string;
  reversed: boolean;
}

export interface ReadingRecord {
  id: string;
  createdAt: string; // ISO
  level: 1 | 3 | 10;
  category: string;
  cards: DrawnCardRef[];
  profile: UserProfile;
  summaryTh: string;
  summaryEn: string;
  accuracy: AccuracyMark;
  /** Seed for deterministic re-rendering of the full reading */
  seed: number;
}

const PROFILE_KEY = 'aura-tarot-profile';
const READINGS_KEY = 'aura-tarot-readings';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return { name: '', birthdate: '', question: '' };
  return safeParse<UserProfile>(window.localStorage.getItem(PROFILE_KEY), {
    name: '',
    birthdate: '',
    question: '',
  });
}

export function saveProfile(p: UserProfile) {
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
}

export function loadReadings(): ReadingRecord[] {
  if (typeof window === 'undefined') return [];
  const list = safeParse<ReadingRecord[]>(window.localStorage.getItem(READINGS_KEY), []);
  return Array.isArray(list) ? list : [];
}

export function saveReading(r: ReadingRecord) {
  try {
    const list = loadReadings();
    list.unshift(r);
    window.localStorage.setItem(READINGS_KEY, JSON.stringify(list.slice(0, 200)));
  } catch {
    /* storage unavailable */
  }
}

export function markAccuracy(id: string, mark: Exclude<AccuracyMark, null>) {
  try {
    const list = loadReadings().map((r) => (r.id === id ? { ...r, accuracy: mark } : r));
    window.localStorage.setItem(READINGS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}

export function deleteReading(id: string) {
  try {
    const list = loadReadings().filter((r) => r.id !== id);
    window.localStorage.setItem(READINGS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}
