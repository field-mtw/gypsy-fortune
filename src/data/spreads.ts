// Spread definitions — 1-card, 3-card (5 life categories), and 10-card Celtic Cross.

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
      'คำตอบหลักของเรื่องนี้',
      'The answer / theme',
      'ไพ่ใบนี้สะท้อนคำตอบของเรื่องที่อยู่ในใจ หรือพลังงานสำคัญของคุณในวันนี้',
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
      P('past', 'อดีตที่ผ่านมา', 'The past', 'ที่มาและเรื่องราวที่หล่อหลอมสถานการณ์มาจนถึงวันนี้', 'What shaped the situation up to today'),
      P('present', 'สถานการณ์ปัจจุบัน', 'The present', 'สิ่งที่กำลังเกิดขึ้นจริงในตอนนี้ และจุดสำคัญที่สุดของเรื่อง', 'The state of things right now — the heaviest card'),
      P('future', 'แนวโน้มข้างหน้า', 'The future', 'ทิศทางที่จะเกิดขึ้นต่อหากพลังงานยังเดินไปในจังหวะเดิม', 'The likely direction if the energy stays — a possible trend, not fixed fate'),
    ],
  },
  love: {
    level: 3,
    category: 'love',
    cardCount: 3,
    positions: [
      P('you', 'ความรู้สึกของคุณ', 'You', 'ความรู้สึกและจุดยืนในใจของคุณต่อความสัมพันธ์นี้', 'Your feelings and standing in the relationship right now'),
      P('other', 'ท่าทีของอีกฝ่าย', 'The other person', 'ท่าทีและการแสดงออกของเขาที่คุณสัมผัสได้ในตอนนี้', 'Their observable attitude and behavior toward you'),
      P('dynamic', 'แนวโน้มความสัมพันธ์', 'Relationship trend', 'บรรยากาศระหว่างคุณสองคนและทิศทางที่กำลังจะพัฒนาต่อไป', 'The dynamic between you two and where it may head'),
    ],
  },
  money: {
    level: 3,
    category: 'money',
    cardCount: 3,
    positions: [
      P('foundation', 'พื้นฐานการเงินที่ผ่านมา', 'Financial foundation', 'พฤติกรรมการใช้เงินและที่มาที่พาสภาพคล่องมาถึงจุดนี้', 'The past habits that brought your finances here'),
      P('state', 'การเงินในตอนนี้', 'Current state', 'ภาพรวมรายรับรายจ่ายและความคล่องตัวที่เป็นอยู่จริง', 'The honest picture of your finances right now'),
      P('next', 'แนวทางจัดการการเงิน', 'Guidance / next step', 'ก้าวต่อไปที่ควรทำเพื่อให้การเงินมั่นคงและสบายใจขึ้น', 'What to do next — not a promise of when wealth arrives'),
    ],
  },
  career: {
    level: 3,
    category: 'career',
    cardCount: 3,
    positions: [
      P('role', 'สถานการณ์งานตอนนี้', 'Current role', 'จุดที่คุณยืนอยู่และบรรยากาศการทำงานในปัจจุบัน', 'Where you stand at work right now'),
      P('challenge', 'โจทย์ท้าทายและบทเรียน', 'Challenge / key lesson', 'สิ่งที่กำลังทดสอบคุณ หรือจุดที่ต้องก้าวข้ามให้ได้', 'What blocks you, or what you need to learn'),
      P('step', 'ก้าวต่อไปที่ควรทำ', 'Best next step', 'แนวทางลงมือทำที่จะช่วยให้เรื่องงานเดินหน้าได้ดีที่สุด', 'The action most worth taking next'),
    ],
  },
  fortune: {
    level: 3,
    category: 'fortune',
    cardCount: 3,
    positions: [
      P('past', 'พื้นดวงและสิ่งที่สั่งสมมา', 'The past', 'ต้นทุนชีวิตและบทเรียนที่ติดตัวคุณมาถึงปัจจุบัน', 'The ground you stand on and the lessons you carry'),
      P('present', 'จังหวะชีวิตตอนนี้', 'The present', 'พลังงานหลักที่กำลังหมุนเวียนอยู่ในชีวิตคุณช่วงนี้', 'The rhythm of your life right now'),
      P('trend', 'ทิศทางดวงข้างหน้า', 'The trend', 'แนวโน้มจังหวะชีวิตที่กำลังค่อยๆ เปิดทางรออยู่', 'The direction your life is heading'),
    ],
  },
};

export const CELTIC_CROSS_SPREAD: SpreadDef = {
  level: 10,
  category: 'celtic-cross',
  cardCount: 10,
  positions: [
    P('present', 'หัวใจของเรื่องในตอนนี้', 'Heart of the matter', 'แกนกลางของคำถามและสิ่งที่กำลังเกิดขึ้นจริงตรงหน้า', 'The heart of the question, what is happening now'),
    P('challenge', 'โจทย์ที่เข้ามาท้าทาย', 'The challenge', 'อุปสรรคหรือประเด็นสำคัญที่เข้ามาทดสอบเรื่องนี้', 'What crosses or supports the heart of the matter'),
    P('past', 'รากฐานจากอดีต', 'Past / foundation', 'เหตุการณ์ก่อนหน้าที่เป็นต้นตอพามาถึงจุดปัจจุบัน', 'The past behind you, the roots of the situation'),
    P('future', 'จังหวะที่กำลังจะเข้ามา', 'Near future', 'เรื่องราวระยะใกล้ที่กำลังก่อตัวและขยับเข้ามาหา', 'What is forming and on its way'),
    P('crown', 'เป้าหมายที่มุ่งหวัง', 'Crown / goal', 'ภาพผลลัพธ์ที่คุณตั้งใจและอยากเห็นมากที่สุด', 'Your aim, the best possible outcome'),
    P('root', 'ความรู้สึกส่วนลึกในใจ', 'Root / subconscious', 'แรงขับลึกๆ หรือความรู้สึกในใจที่ไม่ค่อยได้พูดออกมา', 'Hidden drives, unspoken feelings'),
    P('advice', 'ท่าทีและแนวทางรับมือ', 'Advice / approach', 'มุมมองและวิธีวางตัวที่ไพ่อยากแนะนำให้ใช้กับเรื่องนี้', 'How to approach this, the attitude you bring'),
    P('external', 'คนรอบข้างและปัจจัยภายนอก', 'External influences', 'บรรยากาศรอบตัว คำพูดคนอื่น หรือเหตุการณ์ที่อยู่เหนือการควบคุม', 'People around you and forces beyond control'),
    P('hopes', 'ความหวังและความกังวลลึกๆ', 'Hopes and fears', 'สิ่งที่แอบหวังไว้ในใจควบคู่กับสิ่งที่ยังแอบกลัว', 'Deep hopes and fears — often two sides of one coin'),
    P('outcome', 'บทสรุปและแนวโน้มปลายทาง', 'Outcome', 'ภาพปลายทางของเรื่องนี้หากทุกอย่างยังเดินไปตามจังหวะปัจจุบัน', 'Where things head if everything continues as is'),
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
