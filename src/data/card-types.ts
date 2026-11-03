// Shared card data types for the Aura Tarot app.
// Card artwork: upright only; the app rotates 180deg for reversed cards.

export type Suit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
export type Element = 'fire' | 'water' | 'air' | 'earth';
export type TimingUnit = 'days' | 'weeks' | 'months' | 'years';
export type CourtRank = 'page' | 'knight' | 'queen' | 'king';

export type BaseReadingTopic = 'general' | 'love' | 'career' | 'money';
export type ExtraReadingTopic = 'study' | 'health' | 'family' | 'decision';
export type ReadingTopic = BaseReadingTopic | ExtraReadingTopic;
export type SelectableTopic = Exclude<ReadingTopic, 'general'>;

export type CardValence = 'positive' | 'challenging' | 'mixed';

/** Reversed reading mode — matched to each card's true reversed nature */
export type ReversedMode =
  | 'blocked' // ติดขัด/ยังไม่ถึงจังหวะ — energy present but delayed
  | 'internalized' // เกิดขึ้นข้างในใจ — inner/psychological processing
  | 'extreme' // มากไปหรือน้อยไป — energy out of balance
  | 'shadow' // มุมที่ซ่อนอยู่/ต้องระวัง — blind spot or hidden tension
  | 'releasing'; // กำลังคลี่คลาย/ปลดล็อก — heaviness lifting

export interface TopicMeaningTh {
  /** ประโยคใจความสั้นสำหรับพาดหัวและสรุปรายใบ */
  themeUpright: string;
  /** ประโยคใจความสั้นเมื่อกลับหัว */
  themeReversed: string;
  /** คำทำนายเมื่อตั้งตรง (2-3 ประโยค ภาษาธรรมชาติ อบอุ่น เข้าใจง่าย) */
  upright: string;
  /** คำทำนายเมื่อกลับหัว (2-3 ประโยค สอดคล้องกับโทนกลับหัวจริงของไพ่) */
  reversed: string;
  /** คำแนะนำที่นำไปใช้ได้จริงเมื่อไพ่ตั้งตรง */
  adviceUpright: string;
  /** คำแนะนำที่นำไปใช้ได้จริงเมื่อไพ่กลับหัว */
  adviceReversed: string;
}

export interface CardDataBase {
  /** File-stem id, e.g. 'major-00-fool', 'wands-ace', 'cups-02', 'swords-page' */
  id: string;
  /** Public URL of the artwork, e.g. '/cards/major-00-fool.webp' */
  image: string;
  suit: Suit;
  /** Element for minor suits; null for Major Arcana */
  element: Element | null;
  /** 0-21 for majors; 1-10 for pips; null for court cards */
  number: number | null;
  court: CourtRank | null;
  nameEn: string;
  /** ชื่อไพ่ที่ใช้เรียกในคำทำนายไทย เช่น 'The Fool', '2 ถ้วย', '3 เหรียญ', 'ราชินีดาบ' */
  nameTh: string;
  /** ฉายาภาษาไทยสั้นๆ สำหรับไพ่ Major Arcana แสดงเสริมบนหัวการ์ด เช่น 'ก้าวแรกแห่งอิสระ' */
  subtitleTh?: string;
  /** 3-4 short upright keywords */
  keywordsEn: string[];
  keywordsTh: string[];
  /** Concise upright meaning (EN + fallback TH) */
  uprightEn: string;
  uprightTh: string;
  /** Concise reversed meaning (EN + fallback TH) */
  reversedEn: string;
  reversedTh: string;
  /** Key RWS visual symbolism */
  symbolismEn: string;
  symbolismTh: string;
  /** Suit timing base unit */
  timingUnit: TimingUnit | null;
  /** One of the 8 early-warning cards (always read with reassurance + a way out) */
  isNegative: boolean;
  /** Internal research note only (never rendered into reading prose) */
  uncertainNote: string | null;
  /** Natural reversed mode of this card so framing never contradicts its meaning */
  reversedTone: ReversedMode;
  /** Emotional/outcome direction when upright */
  valenceUpright: CardValence;
  /** Emotional/outcome direction when reversed */
  valenceReversed: CardValence;
}

/** Base card record in suit files (4 core domains; merged with 4 extra domains in cards.ts) */
export interface RawCardData extends CardDataBase {
  topicsTh: Record<BaseReadingTopic, TopicMeaningTh>;
}

/** Full card record with all 8 life domains */
export interface CardData extends CardDataBase {
  topicsTh: Record<ReadingTopic, TopicMeaningTh>;
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
