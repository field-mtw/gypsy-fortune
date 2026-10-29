// Shared card data types for the Aura Tarot app.
// Card artwork: upright only; the app rotates 180deg for reversed cards.

export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
export type Element = 'fire' | 'water' | 'air' | 'earth';
export type TimingUnit = 'days' | 'weeks' | 'months' | 'years';
export type CourtRank = 'page' | 'knight' | 'queen' | 'king';

/** Reversed reading mode (locked: choose per reading, consistently) */
export type ReversedMode =
  | 'blocked' // ติดขัด/ล่าช้า — energy present but not flowing
  | 'internalized' // หันเข้าข้างใน — inner/psychological rather than outer
  | 'extreme' // น้อยไป/มากไป — too little or too much of the energy
  | 'shadow' // ด้านเงา — the unripe/shadow side
  | 'releasing'; // กำลังคลี่คลาย — the worst is passing

export interface CardData {
  /** File-stem id, e.g. 'major-00-fool', 'wands-ace', 'cups-02', 'swords-page' */
  id: string;
  /** Public URL of the artwork, e.g. '/cards/major-00-fool.webp' */
  image: string;
  suit: Suit;
  /** Element for minor suits; null for Major Arcana (dignities not applied) */
  element: Element | null;
  /** 0-21 for majors; 1-10 for pips; null for court cards */
  number: number | null;
  court: CourtRank | null;
  nameEn: string;
  nameTh: string;
  /** 3-4 short upright keywords */
  keywordsEn: string[];
  keywordsTh: string[];
  /** Concise upright meaning, one or two sentences */
  uprightEn: string;
  uprightTh: string;
  /** Concise reversed meaning — MAJORITY reading where sources split */
  reversedEn: string;
  reversedTh: string;
  /** Key RWS visual symbolism (short phrase) */
  symbolismEn: string;
  symbolismTh: string;
  /** Timing System A (locked): Wands=days, Swords=weeks, Cups=months, Pentacles=years; null for majors */
  timingUnit: TimingUnit | null;
  /** One of the 8 early-warning cards (read with a way out, never as doom) */
  isNegative: boolean;
  /** Note when the reversed meaning had a source split (majority reading used) */
  uncertainNote: string | null;
}

export const SUIT_ELEMENT: Record<Exclude<Suit, 'major'>, Element> = {
  wands: 'fire',
  cups: 'water',
  swords: 'air',
  pentacles: 'earth',
};

export const SUIT_TIMING: Record<Exclude<Suit, 'major'>, TimingUnit> = {
  wands: 'days',
  swords: 'weeks',
  cups: 'months',
  pentacles: 'years',
};

/** The 8 cards always read as early warning + a way out (never doom) */
export const NEGATIVE_CARD_IDS = new Set([
  'major-16-tower',
  'major-13-death',
  'swords-10',
  'swords-03',
  'pentacles-05',
  'major-18-moon',
  'major-15-devil',
  'swords-09',
]);
