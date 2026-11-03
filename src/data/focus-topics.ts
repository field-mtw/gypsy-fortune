// Structured focus categories (7 main life areas) and situational sub-tags (max 1 per category).

import type { AuraIconName } from '@/components/AuraIcon';
import type { ReadingTopic, SelectableTopic } from './card-types';

export type FocusSubTag =
  // Love
  | 'love-single'
  | 'love-talking'
  | 'love-coupled'
  | 'love-ex'
  // Career
  | 'career-current'
  | 'career-hunt'
  | 'career-business'
  | 'career-workplace'
  // Money
  | 'money-cashflow'
  | 'money-windfall'
  | 'money-invest'
  | 'money-debt'
  // Study
  | 'study-exam'
  | 'study-focus'
  | 'study-further'
  // Health & Wellness
  | 'health-burnout'
  | 'health-body'
  | 'health-recovery'
  // Family & Social
  | 'family-home'
  | 'family-friends'
  | 'family-living'
  // Decision / Crossroads
  | 'decision-two-paths'
  | 'decision-stay-go'
  | 'decision-new-leap';

export interface SubTagDef {
  id: FocusSubTag;
  topic: SelectableTopic;
  labelTh: string;
  labelEn: string;
  /** Natural Thai phrase used inside headlines/hooks, e.g. 'ความรักสำหรับคนคุยที่สถานะยังไม่ชัด' */
  phraseTh: string;
  phraseEn: string;
}

export interface FocusTopicDef {
  id: SelectableTopic;
  icon: AuraIconName;
  labelTh: string;
  labelEn: string;
  shortDescTh: string;
  shortDescEn: string;
  phraseTh: string;
  phraseEn: string;
  subTags: SubTagDef[];
}

export const FOCUS_TOPICS: FocusTopicDef[] = [
  {
    id: 'love',
    icon: 'heart',
    labelTh: 'ความรัก / ความสัมพันธ์',
    labelEn: 'Love & Relationships',
    shortDescTh: 'คนโสด คนคุย ชีวิตคู่ หรือแฟนเก่า',
    shortDescEn: 'Single, talking stage, partner, or ex',
    phraseTh: 'ความรักและความสัมพันธ์',
    phraseEn: 'your love life',
    subTags: [
      {
        id: 'love-single',
        topic: 'love',
        labelTh: 'คนโสด / เปิดใจรับรักใหม่',
        labelEn: 'Single / New love',
        phraseTh: 'ความรักของคนโสดและการเปิดใจรับคนใหม่',
        phraseEn: 'new love as a single heart',
      },
      {
        id: 'love-talking',
        topic: 'love',
        labelTh: 'คนคุย / สถานะไม่ชัด',
        labelEn: 'Talking stage / Unclear status',
        phraseTh: 'ความสัมพันธ์กับคนคุยที่ยังไม่ชัดเจน',
        phraseEn: 'your talking-stage connection',
      },
      {
        id: 'love-coupled',
        topic: 'love',
        labelTh: 'คนมีคู่ / ชีวิตคู่',
        labelEn: 'In a relationship / Partner',
        phraseTh: 'ความรักและชีวิตคู่ปัจจุบัน',
        phraseEn: 'your current partnership',
      },
      {
        id: 'love-ex',
        topic: 'love',
        labelTh: 'แฟนเก่า / มูฟออน',
        labelEn: 'Ex-partner / Moving on',
        phraseTh: 'เรื่องแฟนเก่าและการมูฟออน',
        phraseEn: 'past love and moving forward',
      },
    ],
  },
  {
    id: 'career',
    icon: 'briefcase',
    labelTh: 'การงาน / ธุรกิจ',
    labelEn: 'Career & Business',
    shortDescTh: 'งานประจำ ย้ายงาน ค้าขาย หรือคนในที่ทำงาน',
    shortDescEn: 'Current role, job change, business, or coworkers',
    phraseTh: 'เส้นทางการงานและธุรกิจ',
    phraseEn: 'your career and work',
    subTags: [
      {
        id: 'career-current',
        topic: 'career',
        labelTh: 'งานปัจจุบัน / เลื่อนขั้น',
        labelEn: 'Current job / Promotion',
        phraseTh: 'ความก้าวหน้าในงานปัจจุบัน',
        phraseEn: 'growth in your current role',
      },
      {
        id: 'career-hunt',
        topic: 'career',
        labelTh: 'หางานใหม่ / ย้ายงาน',
        labelEn: 'Job hunt / Career switch',
        phraseTh: 'การสมัครงานใหม่และการย้ายงาน',
        phraseEn: 'your job search and career transition',
      },
      {
        id: 'career-business',
        topic: 'career',
        labelTh: 'ธุรกิจส่วนตัว / ฟรีแลนซ์',
        labelEn: 'Business / Freelance',
        phraseTh: 'ธุรกิจส่วนตัวและงานอิสระ',
        phraseEn: 'your business or freelance path',
      },
      {
        id: 'career-workplace',
        topic: 'career',
        labelTh: 'เพื่อนร่วมงาน / เจ้านาย',
        labelEn: 'Coworkers / Boss',
        phraseTh: 'บรรยากาศเพื่อนร่วมงานและผู้ใหญ่ในที่ทำงาน',
        phraseEn: 'workplace dynamics and leadership',
      },
    ],
  },
  {
    id: 'money',
    icon: 'coin',
    labelTh: 'การเงิน / โชคลาภ',
    labelEn: 'Money & Fortune',
    shortDescTh: 'สภาพคล่อง โชคลาภ การลงทุน หรือปลดหนี้',
    shortDescEn: 'Cashflow, windfalls, investing, or debt',
    phraseTh: 'จังหวะการเงินและโชคลาภ',
    phraseEn: 'your finances and fortune',
    subTags: [
      {
        id: 'money-cashflow',
        topic: 'money',
        labelTh: 'สภาพคล่องรายเดือน',
        labelEn: 'Monthly cashflow',
        phraseTh: 'สภาพคล่องและรายรับรายจ่ายช่วงนี้',
        phraseEn: 'your day-to-day cashflow',
      },
      {
        id: 'money-windfall',
        topic: 'money',
        labelTh: 'โชคลาภ / เงินก้อน',
        labelEn: 'Luck / Windfall',
        phraseTh: 'โอกาสรับโชคลาภและเงินก้อนพิเศษ',
        phraseEn: 'windfalls and fortunate gains',
      },
      {
        id: 'money-invest',
        topic: 'money',
        labelTh: 'การลงทุน / ต่อยอด',
        labelEn: 'Investing / Wealth growth',
        phraseTh: 'การลงทุนและต่อยอดทรัพย์สิน',
        phraseEn: 'investments and building wealth',
      },
      {
        id: 'money-debt',
        topic: 'money',
        labelTh: 'ปลดหนี้ / ตั้งหลัก',
        labelEn: 'Clearing debt / Regrouping',
        phraseTh: 'การคลี่คลายภาระหนี้และตั้งหลักการเงิน',
        phraseEn: 'clearing debt and regaining footing',
      },
    ],
  },
  {
    id: 'study',
    icon: 'academic',
    labelTh: 'การเรียน / การสอบ',
    labelEn: 'Study & Exams',
    shortDescTh: 'ผลสอบ แข่งขัน สมาธิ หรือเรียนต่อชิงทุน',
    shortDescEn: 'Exams, focus, admissions, or scholarships',
    phraseTh: 'การเรียนและการสอบ',
    phraseEn: 'your studies and exams',
    subTags: [
      {
        id: 'study-exam',
        topic: 'study',
        labelTh: 'ผลสอบ / การแข่งขัน',
        labelEn: 'Exam results / Competition',
        phraseTh: 'เกณฑ์ผลสอบและการแข่งขันครั้งนี้',
        phraseEn: 'upcoming exam and test outcomes',
      },
      {
        id: 'study-focus',
        topic: 'study',
        labelTh: 'สมาธิและไฟในการเรียน',
        labelEn: 'Focus & study motivation',
        phraseTh: 'สมาธิและความต่อเนื่องในการเรียน',
        phraseEn: 'study focus and academic momentum',
      },
      {
        id: 'study-further',
        topic: 'study',
        labelTh: 'เรียนต่อ / ชิงทุน / เลือกสาย',
        labelEn: 'Further study / Scholarships',
        phraseTh: 'การเรียนต่อ ชิงทุน หรือเลือกสายที่ใช่',
        phraseEn: 'further education and scholarship paths',
      },
    ],
  },
  {
    id: 'health',
    icon: 'lotus',
    labelTh: 'สุขภาพกาย-ใจ (ฮีลใจ)',
    labelEn: 'Mind & Body Wellness',
    shortDescTh: 'ความเครียด หมดไฟ สุขภาพกาย หรือการพักฟื้น',
    shortDescEn: 'Burnout, emotional healing, or physical rest',
    phraseTh: 'สุขภาพกายและการดูแลหัวใจ',
    phraseEn: 'your mind-and-body wellbeing',
    subTags: [
      {
        id: 'health-burnout',
        topic: 'health',
        labelTh: 'ความเครียด / หมดไฟ (ฮีลใจ)',
        labelEn: 'Stress / Burnout healing',
        phraseTh: 'การคลายความเครียดและฮีลใจจากความเหนื่อยล้า',
        phraseEn: 'healing from stress and burnout',
      },
      {
        id: 'health-body',
        topic: 'health',
        labelTh: 'สุขภาพกายและการพักผ่อน',
        labelEn: 'Physical health & rest',
        phraseTh: 'สมดุลสุขภาพร่างกายและการพักผ่อน',
        phraseEn: 'physical vitality and rest',
      },
      {
        id: 'health-recovery',
        topic: 'health',
        labelTh: 'การฟื้นฟูพลังชีวิต',
        labelEn: 'Restoring life energy',
        phraseTh: 'การฟื้นฟูพลังงานชีวิตให้กลับมาสดใส',
        phraseEn: 'recharging your inner energy',
      },
    ],
  },
  {
    id: 'family',
    icon: 'users',
    labelTh: 'ครอบครัว / คนรอบข้าง',
    labelEn: 'Family & Circle',
    shortDescTh: 'คนในบ้าน มิตรภาพ หรือที่อยู่อาศัย',
    shortDescEn: 'Home life, friendships, or living space',
    phraseTh: 'ครอบครัวและคนรอบข้าง',
    phraseEn: 'family and people around you',
    subTags: [
      {
        id: 'family-home',
        topic: 'family',
        labelTh: 'ความเข้าใจในครอบครัว',
        labelEn: 'Family harmony',
        phraseTh: 'ความเข้าใจและบรรยากาศของคนในครอบครัว',
        phraseEn: 'harmony and understanding at home',
      },
      {
        id: 'family-friends',
        topic: 'family',
        labelTh: 'มิตรภาพ / สังคมรอบตัว',
        labelEn: 'Friends & social circle',
        phraseTh: 'มิตรภาพและคนในสังคมรอบตัว',
        phraseEn: 'friendships and your social circle',
      },
      {
        id: 'family-living',
        topic: 'family',
        labelTh: 'ที่อยู่อาศัย / การโยกย้าย',
        labelEn: 'Home / Relocation',
        phraseTh: 'เรื่องที่อยู่อาศัยและการขยับขยายโยกย้าย',
        phraseEn: 'living arrangements and relocation',
      },
    ],
  },
  {
    id: 'decision',
    icon: 'compass',
    labelTh: 'การตัดสินใจทางแยก',
    labelEn: 'Life Crossroads',
    shortDescTh: 'ลังเล 2 ทาง อยู่ต่อหรือพอแค่นี้ หรือเริ่มสิ่งใหม่',
    shortDescEn: 'Weighing two paths, stay or leave, or a new leap',
    phraseTh: 'การตัดสินใจครั้งสำคัญ',
    phraseEn: 'your upcoming decision',
    subTags: [
      {
        id: 'decision-two-paths',
        topic: 'decision',
        labelTh: 'ลังเลระหว่าง 2 ทางเลือก',
        labelEn: 'Weighing 2 options',
        phraseTh: 'การชั่งใจเลือกทางเดินที่เหมาะกับคุณที่สุด',
        phraseEn: 'choosing clearly between two paths',
      },
      {
        id: 'decision-stay-go',
        topic: 'decision',
        labelTh: 'อยู่ต่อหรือพอแค่นี้ดี',
        labelEn: 'Stay or move on',
        phraseTh: 'คำถามว่าจะประคองอยู่ต่อหรือก้าวออกมาดี',
        phraseEn: 'deciding whether to stay or move on',
      },
      {
        id: 'decision-new-leap',
        topic: 'decision',
        labelTh: 'กล้าเริ่มสิ่งใหม่ดีไหม',
        labelEn: 'Taking a new leap',
        phraseTh: 'การตัดสินใจก้าวออกไปเริ่มต้นสิ่งใหม่',
        phraseEn: 'taking a leap into something new',
      },
    ],
  },
];

const TOPIC_MAP = new Map<SelectableTopic, FocusTopicDef>(FOCUS_TOPICS.map((t) => [t.id, t]));
const SUBTAG_MAP = new Map<FocusSubTag, SubTagDef>(
  FOCUS_TOPICS.flatMap((t) => t.subTags).map((st) => [st.id, st]),
);

export function getFocusTopicDef(id: SelectableTopic): FocusTopicDef | undefined {
  return TOPIC_MAP.get(id);
}

export function getSubTagDef(id?: FocusSubTag): SubTagDef | undefined {
  return id ? SUBTAG_MAP.get(id) : undefined;
}

export function getTopicLabel(topic: ReadingTopic, lang: 'th' | 'en'): string {
  if (topic === 'general') return lang === 'th' ? 'ดวงภาพรวม' : 'General Reading';
  const def = TOPIC_MAP.get(topic);
  if (!def) return lang === 'th' ? 'ดวงภาพรวม' : 'General Reading';
  return lang === 'th' ? def.labelTh : def.labelEn;
}

export function getTopicPhrase(
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  lang: 'th' | 'en',
): string {
  if (subTag) {
    const st = SUBTAG_MAP.get(subTag);
    if (st && st.topic === topic) {
      return lang === 'th' ? st.phraseTh : st.phraseEn;
    }
  }
  if (topic === 'general') {
    return lang === 'th' ? 'จังหวะชีวิตในภาพรวมช่วงนี้' : 'your overall path right now';
  }
  const def = TOPIC_MAP.get(topic);
  if (!def) return lang === 'th' ? 'จังหวะชีวิตช่วงนี้' : 'this chapter';
  return lang === 'th' ? def.phraseTh : def.phraseEn;
}

/** Human-readable chip summary saved on ReadingRecord and shown in chat/journal */
export function formatFocusSelectionSummary(
  topics: SelectableTopic[],
  subTags: Partial<Record<SelectableTopic, FocusSubTag>>,
  lang: 'th' | 'en',
): string {
  if (!topics || topics.length === 0) {
    return lang === 'th' ? 'ดูดวงภาพรวมทั่วไป' : 'General overview';
  }
  return topics
    .map((tId) => {
      const def = TOPIC_MAP.get(tId);
      if (!def) return '';
      const main = lang === 'th' ? def.labelTh : def.labelEn;
      const stId = subTags?.[tId];
      const st = stId ? SUBTAG_MAP.get(stId) : undefined;
      if (st && st.topic === tId) {
        return `${main} (${lang === 'th' ? st.labelTh : st.labelEn})`;
      }
      return main;
    })
    .filter(Boolean)
    .join(' · ');
}
