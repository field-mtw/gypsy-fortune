// Spread definitions — locked per research (Appendix A).
// Celtic Cross uses the modern label set, consistently across the app.

export interface SpreadPosition {
  id: string;
  nameTh: string;
  nameEn: string;
  descTh: string;
  descEn: string;
}

export type SpreadLevel = 1 | 3 | 10;
export type SpreadCategory =
  | 'past-present-future'
  | 'love'
  | 'money'
  | 'career'
  | 'fortune';

export interface SpreadDef {
  level: SpreadLevel;
  category: SpreadCategory | 'single' | 'celtic-cross';
  cardCount: number;
  positions: SpreadPosition[];
}

const P = (
  id: string,
  nameTh: string,
  nameEn: string,
  descTh: string,
  descEn: string,
): SpreadPosition => ({ id, nameTh, nameEn, descTh, descEn });

export const SINGLE_SPREAD: SpreadDef = {
  level: 1,
  category: 'single',
  cardCount: 1,
  positions: [
    P(
      'theme',
      'คำตอบ / ธีม',
      'The answer / theme',
      'ไพ่ใบนี้คือคำตอบของคำถาม หรือธีมหลักของวันนี้',
      'This card is the answer to your question, or the theme of today',
    ),
  ],
};

const THREE_CARD_SPREADS: Record<SpreadCategory, SpreadDef> = {
  'past-present-future': {
    level: 3,
    category: 'past-present-future',
    cardCount: 3,
    positions: [
      P('past', 'อดีต', 'The past', 'สิ่งที่หล่อหลอมสถานการณ์มาจนถึงวันนี้', 'What shaped the situation up to today'),
      P('present', 'ปัจจุบัน', 'The present', 'สภาพที่เป็นอยู่ตอนนี้ — ใบที่น้ำหนักมากที่สุด', 'The state of things right now — the heaviest card'),
      P('future', 'อนาคต', 'The future', 'แนวโน้มถ้าพลังงานยังเป็นแบบนี้ — ทิศทางที่เป็นไปได้ ไม่ใช่ชะตาตายตัว', 'The likely direction if the energy stays — a possible trend, not fixed fate'),
    ],
  },
  love: {
    level: 3,
    category: 'love',
    cardCount: 3,
    positions: [
      P('you', 'คุณ', 'You', 'ความรู้สึกและสถานะของคุณในความสัมพันธ์ตอนนี้', 'Your feelings and standing in the relationship right now'),
      P('other', 'อีกฝ่าย', 'The other person', 'ท่าทีของเขาที่คุณสังเกตได้จากพฤติกรรม', 'Their observable attitude and behavior toward you'),
      P('dynamic', 'แนวโน้มความสัมพันธ์', 'Relationship trend', 'พลวัตระหว่างกันสองคน และทิศทางที่เป็นไปได้', 'The dynamic between you two and where it may head'),
    ],
  },
  money: {
    level: 3,
    category: 'money',
    cardCount: 3,
    positions: [
      P('foundation', 'รากฐานการเงิน', 'Financial foundation', 'อดีตและนิสัยการเงินที่พาคุณมาถึงจุดนี้', 'The past habits that brought your finances here'),
      P('state', 'สถานะปัจจุบัน', 'Current state', 'ภาพการเงินที่เป็นจริงตอนนี้', 'The honest picture of your finances right now'),
      P('next', 'คำแนะนำ / ก้าวต่อไป', 'Guidance / next step', 'สิ่งที่ควรทำต่อไป — ไม่ใช่คำตอบว่าจะรวยเมื่อไหร่', 'What to do next — not a promise of when wealth arrives'),
    ],
  },
  career: {
    level: 3,
    category: 'career',
    cardCount: 3,
    positions: [
      P('role', 'ตำแหน่งปัจจุบัน', 'Current role', 'จุดที่คุณยืนอยู่ในงานตอนนี้', 'Where you stand at work right now'),
      P('challenge', 'อุปสรรค / บทเรียนหลัก', 'Challenge / key lesson', 'สิ่งที่ขวางอยู่ หรือสิ่งที่ต้องเรียนรู้', 'What blocks you, or what you need to learn'),
      P('step', 'ก้าวต่อไปที่ดีที่สุด', 'Best next step', 'แอ็กชันที่ควรทำต่อไป', 'The action most worth taking next'),
    ],
  },
  fortune: {
    level: 3,
    category: 'fortune',
    cardCount: 3,
    positions: [
      P('past', 'อดีต', 'The past', 'พื้นพลังและบทเรียนที่ติดตัวมา', 'The ground you stand on and the lessons you carry'),
      P('present', 'ปัจจุบัน', 'The present', 'จังหวะชีวิตของคุณตอนนี้', 'The rhythm of your life right now'),
      P('trend', 'แนวโน้ม', 'The trend', 'ทิศทางที่ชีวิตกำลังมุ่งไป', 'The direction your life is heading'),
    ],
  },
};

export const CELTIC_CROSS_SPREAD: SpreadDef = {
  level: 10,
  category: 'celtic-cross',
  cardCount: 10,
  positions: [
    P('present', 'ประเด็นหลัก (ปัจจุบัน)', 'Heart of the matter', 'ใจกลางของคำถาม สิ่งที่เกิดขึ้นตอนนี้', 'The heart of the question, what is happening now'),
    P('challenge', 'สิ่งที่ขวาง', 'The challenge', 'อุปสรรคหรือปัจจัยที่ขัดหรือเสริมประเด็นหลัก', 'What crosses or supports the heart of the matter'),
    P('past', 'อดีต / รากฐาน', 'Past / foundation', 'อดีตที่ผ่านมา รากเหตุที่พามาถึงจุดนี้', 'The past behind you, the roots of the situation'),
    P('future', 'อนาคตอันใกล้', 'Near future', 'สิ่งที่กำลังก่อตัว กำลังจะมาถึง', 'What is forming and on its way'),
    P('crown', 'เป้าหมาย / สิ่งที่มุ่งหวัง', 'Crown / goal', 'เป้าหมายที่ตั้งใจไว้ ผลลัพธ์ที่ดีที่สุดที่เป็นไปได้', 'Your aim, the best possible outcome'),
    P('root', 'รากลึก / จิตใต้สำนึก', 'Root / subconscious', 'แรงขับที่ซ่อนอยู่ ความรู้สึกที่ไม่ได้พูดออกมา', 'Hidden drives, unspoken feelings'),
    P('advice', 'คำแนะนำ / ท่าทีของเรา', 'Advice / approach', 'วิธีรับมือที่ควรใช้ ทัศนคติที่นำมาสู่เรื่องนี้', 'How to approach this, the attitude you bring'),
    P('external', 'ปัจจัยภายนอก', 'External influences', 'คนรอบข้าง เหตุการณ์ และสิ่งแวดล้อมที่ควบคุมไม่ได้', 'People around you and forces beyond control'),
    P('hopes', 'ความหวังและความกลัว', 'Hopes and fears', 'สิ่งที่หวังลึกๆ และสิ่งที่กลัว — มักเป็นสองด้านของเรื่องเดียวกัน', 'Deep hopes and fears — often two sides of one coin'),
    P('outcome', 'บทสรุป', 'Outcome', 'ทิศทางบทสรุปถ้าทุกอย่างดำเนินแบบนี้ต่อไป', 'Where things head if everything continues as is'),
  ],
};

export function getSpread(level: SpreadLevel, category?: SpreadCategory): SpreadDef {
  if (level === 1) return SINGLE_SPREAD;
  if (level === 10) return CELTIC_CROSS_SPREAD;
  return THREE_CARD_SPREADS[category ?? 'past-present-future'];
}

export const SPREAD_CATEGORIES: SpreadCategory[] = [
  'past-present-future',
  'love',
  'money',
  'career',
  'fortune',
];
