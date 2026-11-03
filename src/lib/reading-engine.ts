// Reading engine — composes a warm, context-aware tarot reading across all 8 life domains,
// 24 situational sub-tags, and up to 2 simultaneous topic lenses. Deterministic per seed.

import type { AuraIconName } from '@/components/AuraIcon';
import type { CardData, CardValence, Element, ReadingTopic, SelectableTopic } from '@/data/card-types';
import {
  getFocusTopicDef,
  getSubTagDef,
  getTopicLabel,
  getTopicPhrase,
  type FocusSubTag,
} from '@/data/focus-topics';
import { SUBTAG_LENS } from '@/data/subtag-lens';
import type { SpreadDef } from '@/data/spreads';
import type { UserProfile } from './storage';
import { th as vth, type Lang, type PositionRole } from './variants-th';
import { en as ven } from './variants-en';
import { getDayInfo } from './thai-astro';

const V = { th: vth, en: ven };

export interface DrawnCard {
  card: CardData;
  reversed: boolean;
  position: { id: string; nameTh: string; nameEn: string };
}

export interface CardSection {
  cardId: string;
  cardName: string;
  cardSubtitle?: string;
  image: string;
  reversed: boolean;
  positionName: string;
  oneLiner: string;
  detail: string;
  detailParagraphs: string[];
}

export interface TopicView {
  topic: ReadingTopic;
  icon: AuraIconName;
  topicLabel: string;
  subTagLabel?: string;
  headline: string;
  sections: CardSection[];
}

export interface Reading {
  hook: string;
  headline: string;
  overview: string;
  /** Default card sections (= topicViews[0].sections) */
  sections: CardSection[];
  /** 1 or 2 complete topic lenses for instant tab switching */
  topicViews: TopicView[];
  advice: string[];
  timing: string | null;
  closing: string;
  personalNote: string | null;
}

/* ---------- seeded RNG ---------- */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;
const pick = <T,>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length) % arr.length];

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

/* ---------- draw ---------- */

export const REVERSED_PROBABILITY = 0.3;

export function drawCards(deck: CardData[], count: number, rng: Rng): { card: CardData; reversed: boolean }[] {
  const pool = [...deck];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map((card) => ({
    card,
    reversed: rng() < REVERSED_PROBABILITY,
  }));
}

/* ---------- legacy freetext detector (for older saved journal records) ---------- */

const LEGACY_TOPIC_KEYWORDS: Record<SelectableTopic, string[]> = {
  love: [
    'แต่งงาน', 'งานแต่ง', 'ความรัก', 'ความสัมพันธ์', 'แฟนเก่า', 'แฟน', 'คนคุย', 'แอบชอบ',
    'เนื้อคู่', 'คู่แท้', 'คู่ครอง', 'คืนดี', 'ง้อ', 'เลิกกัน', 'คนโสด', 'โสด', 'รัก',
    'love', 'relationship', 'crush', 'partner', 'marriage', 'dating',
  ],
  career: [
    'สมัครงาน', 'สัมภาษณ์งาน', 'เปลี่ยนงาน', 'ย้ายงาน', 'หางาน', 'เลื่อนตำแหน่ง',
    'การงาน', 'ทำงาน', 'เจ้านาย', 'หัวหน้า', 'เพื่อนร่วมงาน', 'ออฟฟิศ', 'บริษัท', 'ธุรกิจ', 'ค้าขาย', 'งาน',
    'career', 'promotion', 'interview', 'business', 'job', 'work',
  ],
  money: [
    'การเงิน', 'เงินเดือน', 'รายได้', 'รายจ่าย', 'หนี้', 'ปลดหนี้', 'โชคลาภ', 'ลาภลอย',
    'หวย', 'ลงทุน', 'กำไร', 'กู้เงิน', 'เก็บเงิน', 'หมุนเงิน', 'เงินก้อน', 'เงิน', 'หุ้น',
    'finance', 'money', 'salary', 'debt', 'invest', 'wealth',
  ],
  study: [
    'ผลสอบ', 'การสอบ', 'สอบบรรจุ', 'สอบติด', 'ชิงทุน', 'ทุนการศึกษา', 'เรียนต่อ', 'การเรียน', 'อ่านหนังสือ', 'เกรด', 'สอบ', 'เรียน',
    'exam', 'study', 'scholarship', 'university', 'test',
  ],
  health: [
    'สุขภาพ', 'หมดไฟ', 'ฮีลใจ', 'ความเครียด', 'เครียด', 'นอนไม่หลับ', 'ป่วย', 'ร่างกาย', 'พักผ่อน',
    'burnout', 'health', 'stress', 'healing', 'wellness',
  ],
  family: [
    'ครอบครัว', 'ที่บ้าน', 'พ่อแม่', 'พี่น้อง', 'ย้ายบ้าน', 'ที่อยู่อาศัย', 'เพื่อนสนิท', 'มิตรภาพ',
    'family', 'parents', 'home', 'relocation', 'friends',
  ],
  decision: [
    'ตัดสินใจ', 'ทางแยก', 'สองจิตสองใจ', 'ลังเล', 'อยู่ต่อหรือ', 'เลือกทางไหน',
    'decision', 'choice', 'crossroads',
  ],
};

export function detectReadingTopic(spreadCategory: SpreadDef['category'], question: string): ReadingTopic {
  if (spreadCategory === 'love') return 'love';
  if (spreadCategory === 'career') return 'career';
  if (spreadCategory === 'money') return 'money';

  const q = question.trim().toLowerCase();
  if (!q) return 'general';

  const qNoMarriage = q.replace(/แต่งงาน|งานแต่ง/g, '');
  let bestTopic: ReadingTopic = 'general';
  let bestScore = 0;

  for (const [topic, kws] of Object.entries(LEGACY_TOPIC_KEYWORDS) as [SelectableTopic, string[]][]) {
    const target = topic === 'career' ? qNoMarriage : q;
    let score = 0;
    for (const kw of kws) {
      if (target.includes(kw)) score += kw.length >= 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestTopic;
}

const VALID_SELECTABLE = new Set<string>([
  'love',
  'career',
  'money',
  'study',
  'health',
  'family',
  'decision',
]);

function resolveActiveFocus(
  spread: SpreadDef,
  profile: UserProfile,
): {
  topics: ReadingTopic[];
  subTags: Partial<Record<ReadingTopic, FocusSubTag>>;
  usedStructuredFocus: boolean;
} {
  const lockedFromSpread: SelectableTopic | null =
    spread.category === 'love' || spread.category === 'career' || spread.category === 'money'
      ? spread.category
      : null;

  const rawTopics = Array.isArray(profile.topics)
    ? profile.topics.filter((t): t is SelectableTopic => VALID_SELECTABLE.has(t))
    : [];

  const deduped: SelectableTopic[] = [];
  if (lockedFromSpread) deduped.push(lockedFromSpread);
  for (const t of rawTopics) {
    if (!deduped.includes(t) && deduped.length < 2) {
      deduped.push(t);
    }
  }

  if (deduped.length > 0) {
    const cleanSubTags: Partial<Record<ReadingTopic, FocusSubTag>> = {};
    for (const t of deduped) {
      const st = profile.subTags?.[t];
      const stDef = st ? getSubTagDef(st) : undefined;
      if (st && stDef && stDef.topic === t) {
        cleanSubTags[t] = st;
      }
    }
    return {
      topics: deduped,
      subTags: cleanSubTags,
      usedStructuredFocus: rawTopics.length > 0 || Object.keys(cleanSubTags).length > 0,
    };
  }

  // Legacy freetext or pure general fallback
  const detected = detectReadingTopic(spread.category, profile.question);
  return {
    topics: [detected],
    subTags: {},
    usedStructuredFocus: false,
  };
}

function positionIdToRole(id: string): PositionRole {
  switch (id) {
    case 'theme':
      return 'single';
    case 'past':
    case 'foundation':
      return 'past';
    case 'present':
    case 'state':
    case 'role':
      return 'present';
    case 'you':
      return 'you';
    case 'other':
      return 'other';
    case 'challenge':
      return 'challenge';
    case 'root':
      return 'root';
    case 'crown':
      return 'crown';
    case 'external':
      return 'external';
    case 'hopes':
      return 'hopes';
    case 'next':
    case 'step':
    case 'advice':
      return 'advice';
    case 'future':
    case 'dynamic':
    case 'trend':
    case 'outcome':
    default:
      return 'future';
  }
}

/* ---------- helpers ---------- */

function getValence(card: CardData, reversed: boolean): CardValence {
  return reversed ? card.valenceReversed : card.valenceUpright;
}

function formatUserName(rawName: string, lang: Lang): string {
  const trimmed = rawName.trim();
  if (!trimmed) return '';
  if (lang === 'en') return trimmed;
  if (/^(คุณ|พี่|น้อง|หมอ|ครู|อาจารย์)/.test(trimmed)) return trimmed;
  return `คุณ${trimmed}`;
}

function cardLabel(d: DrawnCard, lang: Lang): string {
  if (lang === 'th') {
    return `${d.card.nameTh}${d.reversed ? ' (กลับหัว)' : ''}`;
  }
  return `${d.card.nameEn}${d.reversed ? ' (Reversed)' : ''}`;
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildEnglishOneLiner(card: CardData, topic: ReadingTopic, reversed: boolean): string {
  const kw1 = card.keywordsEn[0]?.toLowerCase() ?? 'key shift';
  const kw2 = card.keywordsEn[1]?.toLowerCase();
  const pair = kw2 ? `${kw1} and ${kw2}` : kw1;
  const suffix = topic === 'general' ? '' : ` in ${getTopicLabel(topic, 'en').toLowerCase()}`;
  if (!reversed) return `${capitalize(pair)}${suffix}`;
  switch (card.reversedTone) {
    case 'releasing':
      return `Tension easing around ${pair}${suffix}`;
    case 'blocked':
      return `Patience and timing around ${pair}${suffix}`;
    case 'internalized':
      return `Inner reflection on ${pair}${suffix}`;
    case 'extreme':
      return `Finding balance around ${pair}${suffix}`;
    case 'shadow':
      return `Looking closely at ${pair}${suffix}`;
  }
}

function buildHeadlineForTopic(
  drawn: DrawnCard[],
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  lang: Lang,
  rng: Rng,
): string {
  const first = drawn[0];
  const last = drawn[drawn.length - 1];
  const vStart = getValence(first.card, first.reversed);
  const vEnd = getValence(last.card, last.reversed);
  const endCard = cardLabel(last, lang);
  const topicPhrase = getTopicPhrase(topic, subTag, lang);

  if (lang === 'th') {
    if (drawn.length === 1) {
      if (vEnd === 'positive') {
        return pick(rng, [
          `ไพ่ ${endCard} ส่งสัญญาณที่อบอุ่นและเป็นใจให้กับ${topicPhrase} เปิดจังหวะดีให้คุณก้าวเดินหน้าได้อย่างมั่นใจค่ะ`,
          `สำหรับ${topicPhrase} ไพ่ ${endCard} ขึ้นมาเปิดทางสว่าง สะท้อนถึงโอกาสและพลังงานดีๆ ที่พร้อมขยับเข้ามาหาคุณค่ะ`,
        ]);
      }
      if (vEnd === 'mixed') {
        return pick(rng, [
          `สำหรับ${topicPhrase} ไพ่ ${endCard} ชวนให้ประคองสมดุลและฟังเสียงใจตัวเองให้ชัด ก่อนขยับก้าวต่อไปแบบไม่รีบร้อนค่ะ`,
          `ไพ่ ${endCard} สะท้อนจังหวะของการทบทวนและจัดระเบียบ${topicPhrase} ค่อยๆ มองภาพตามความจริงแล้วทางออกจะชัดขึ้นค่ะ`,
        ]);
      }
      return pick(rng, [
        `ไพ่ ${endCard} ขึ้นมาส่งสัญญาณเตือนล่วงหน้าสำหรับ${topicPhrase} ชวนให้ชะลอจังหวะและตั้งหลักอย่างรอบคอบเพื่อผ่อนหนักเป็นเบาค่ะ`,
        `สำหรับ${topicPhrase} ไพ่ ${endCard} แนะนำให้ใจเย็นๆ และอย่าเพิ่งฝืนเร่ง การรู้เท่าทันจุดติดขัดก่อนจะช่วยให้คุณรับมือได้สบายขึ้นค่ะ`,
      ]);
    }

    if (vStart !== 'positive' && vEnd === 'positive') {
      return pick(rng, [
        `แม้ช่วงต้นจะมีเรื่องให้คิดหนักหรือเหนื่อยใจ แต่${topicPhrase}กำลังค่อยๆ คลี่คลายไปในทางที่สดใสขึ้นตามพลังของไพ่ ${endCard} ค่ะ`,
        `จังหวะที่ตึงมือกำลังจะค่อยๆ ผ่านพ้นไปค่ะ ${topicPhrase}มีแนวโน้มปลดล็อกและเปิดทางที่ดีขึ้นโดยมีไพ่ ${endCard} เป็นสัญญาณหนุนปลายทาง`,
      ]);
    }
    if (vStart === 'positive' && vEnd === 'positive') {
      return pick(rng, [
        `${topicPhrase}มีพื้นฐานที่ดีและกำลังเดินหน้าต่ออย่างมั่นคง โดยมีไพ่ ${endCard} ยืนยันถึงโอกาสดีๆ ที่รอต่อยอดอยู่ข้างหน้าค่ะ`,
        `สัญญาณหน้าไพ่เกื้อหนุนต่อเนื่องค่ะ ${topicPhrase}กำลังขยับขยายไปในทิศทางที่ราบรื่นและเป็นใจตามพลังของไพ่ ${endCard}`,
      ]);
    }
    if (vStart === 'positive' && vEnd === 'challenging') {
      return pick(rng, [
        `แม้พื้นฐานเดิมของ${topicPhrase}จะไปได้ดี แต่ไพ่ ${endCard} แวะมาเตือนให้ชะลอจังหวะและวางแผนให้รัดกุมขึ้นในก้าวต่อไปนะคะ`,
        `${topicPhrase}เริ่มด้วยพลังที่ดี แต่ช่วงต่อไปควรเพิ่มความรอบคอบตามที่ไพ่ ${endCard} สะกิดเตือนไว้ เพื่อประคองให้ราบรื่นตลอดรอดฝั่งค่ะ`,
      ]);
    }
    if (vEnd === 'challenging') {
      return pick(rng, [
        `${topicPhrase}อยู่ในจังหวะที่ต้องใจเย็นและค่อยๆ แก้ทีละเปาะ ไพ่ ${endCard} ชวนให้ตั้งหลักให้มั่นก่อนตัดสินใจเรื่องใหญ่ค่ะ`,
        `หน้าไพ่ชวนให้ถอยมาตั้งสติและดูแลใจตัวเองก่อนนะคะ สำหรับ${topicPhrase} การไม่ฝืนเร่งจังหวะจะช่วยผ่อนหนักเป็นเบาได้ดีที่สุดค่ะ`,
      ]);
    }
    return pick(rng, [
      `${topicPhrase}อยู่ในจังหวะปรับสมดุลและรอดูความชัดเจน ไพ่ ${endCard} แนะนำให้ค่อยๆ ประคองจังหวะโดยไม่ต้องรีบกดดันตัวเองค่ะ`,
      `ทิศทางของ${topicPhrase}ยังยืดหยุ่นปรับเปลี่ยนได้ตามการตัดสินใจของคุณ โดยมีไพ่ ${endCard} ชวนให้ชั่งน้ำหนักอย่างรอบด้านค่ะ`,
    ]);
  }

  // English headline synthesis
  if (drawn.length === 1) {
    if (vEnd === 'positive') {
      return `${endCard} brings encouraging momentum for ${topicPhrase}, opening a supportive window to move forward with confidence.`;
    }
    if (vEnd === 'mixed') {
      return `${endCard} invites steady balance around ${topicPhrase} — pause to weigh the full picture before rushing your next move.`;
    }
    return `${endCard} offers an early heads-up around ${topicPhrase}, helping you slow down, regroup, and soften any friction ahead.`;
  }

  if (vStart !== 'positive' && vEnd === 'positive') {
    return `After a demanding start, ${topicPhrase} is gradually brightening toward constructive ground led by ${endCard}.`;
  }
  if (vStart === 'positive' && vEnd === 'positive') {
    return `Supportive energy carries cleanly through ${topicPhrase}, with ${endCard} reinforcing steady progress ahead.`;
  }
  if (vEnd === 'challenging') {
    return `With ${endCard} closing the spread, ${topicPhrase} calls for unhurried pacing, clear boundaries, and thoughtful preparation.`;
  }
  return `${capitalize(topicPhrase)} sits at a mindful turning point, with ${endCard} guiding you toward calm, balanced choices.`;
}

function buildCombinedHeadline(
  drawn: DrawnCard[],
  topics: ReadingTopic[],
  subTags: Partial<Record<ReadingTopic, FocusSubTag>>,
  primaryHeadline: string,
  lang: Lang,
  rng: Rng,
): string {
  if (topics.length < 2) return primaryHeadline;
  const last = drawn[drawn.length - 1];
  const vEnd = getValence(last.card, last.reversed);
  const endCard = cardLabel(last, lang);
  const p1 = getTopicPhrase(topics[0], subTags[topics[0]], lang);
  const p2 = getTopicPhrase(topics[1], subTags[topics[1]], lang);

  if (lang === 'th') {
    if (vEnd === 'positive') {
      return pick(rng, [
        `เรื่อง${p1} ควบคู่กับเรื่อง${p2} มีสัญญาณคลี่คลายไปในทิศทางที่เกื้อหนุนกัน โดยมีไพ่ ${endCard} เปิดจังหวะดีรออยู่ข้างหน้าค่ะ`,
        `พลังงานหน้าไพ่ส่งผลบวกเชื่อมถึงกันทั้งเรื่อง${p1} ควบคู่กับเรื่อง${p2} ไพ่ ${endCard} ยืนยันว่าสิ่งที่ตั้งใจกำลังค่อยๆ ก้าวหน้าอย่างมั่นคงค่ะ`,
      ]);
    }
    if (vEnd === 'challenging') {
      return pick(rng, [
        `สำหรับเรื่อง${p1} ควบคู่กับเรื่อง${p2} ไพ่ ${endCard} ชวนให้ชะลอจังหวะจัดลำดับความสำคัญทีละจุด เพื่อประคองสมดุลไม่ให้ตึงมือเกินไปค่ะ`,
        `หน้าไพ่ส่งสัญญาณเตือนล่วงหน้าให้ค่อยๆ ตั้งหลักทั้งเรื่อง${p1} ควบคู่กับเรื่อง${p2} การไม่ฝืนเร่งพร้อมกันจะช่วยผ่อนหนักเป็นเบาได้ดีที่สุดค่ะ`,
      ]);
    }
    return pick(rng, [
      `จังหวะของ${p1} ควบคู่กับเรื่อง${p2} กำลังเดินไปในโหมดปรับสมดุล ไพ่ ${endCard} แนะนำให้ค่อยๆ จัดสรรพลังกายใจให้พอดีทั้งสองด้านค่ะ`,
    ]);
  }

  if (vEnd === 'positive') {
    return `Both ${p1} and ${p2} move toward supportive ground together, anchored by ${endCard} ahead.`;
  }
  if (vEnd === 'challenging') {
    return `Across both ${p1} and ${p2}, ${endCard} advises unhurried pacing and tackling one priority at a time.`;
  }
  return `Both ${p1} and ${p2} share a balancing chapter, with ${endCard} inviting steady proportion across both areas.`;
}

function buildDominantEnergyNote(drawn: DrawnCard[], lang: Lang, rng: Rng): string {
  const majorCount = drawn.filter((d) => d.card.suit === 'major').length;
  if ((drawn.length === 3 && majorCount >= 2) || (drawn.length >= 10 && majorCount >= 4)) {
    return pick(rng, V[lang].majorPresenceNote);
  }

  const elementCounts: Record<Element, number> = { fire: 0, water: 0, air: 0, earth: 0 };
  for (const d of drawn) {
    if (d.card.element) elementCounts[d.card.element]++;
  }
  const threshold = drawn.length >= 10 ? 4 : 2;
  const dominant = (Object.entries(elementCounts) as [Element, number][]).find(([, c]) => c >= threshold)?.[0];

  if (lang === 'th') {
    if (dominant === 'fire') {
      return 'บรรยากาศรวมของไพ่เซตนี้มีพลังความกระตือรือร้นเด่นชัด การลงมือทำจริงและขยับตัวให้ไวพอดีจะเป็นตัวขับเคลื่อนผลลัพธ์ค่ะ';
    }
    if (dominant === 'water') {
      return 'โทนหลักของหน้าไพ่เอนไปทางเรื่องความรู้สึกและความละเอียดอ่อนในใจ การดูแลอารมณ์ให้สบายและคุยกันด้วยความเข้าใจจึงสำคัญเป็นพิเศษค่ะ';
    }
    if (dominant === 'air') {
      return 'หน้าไพ่เซตนี้เน้นพลังของความคิดและการสื่อสารชัดเจน การมองข้อเท็จจริงอย่างตรงไปตรงมาจะช่วยให้ตัดสินใจได้แม่นยำที่สุดค่ะ';
    }
    if (dominant === 'earth') {
      return 'พลังงานรวมของไพ่ชุดนี้ให้น้ำหนักกับความมั่นคงและผลลัพธ์ที่จับต้องได้จริง ค่อยๆ สร้างไปทีละก้าวอย่างเป็นระบบจะเห็นผลชัดเจนที่สุดค่ะ';
    }
    return 'พลังงานของไพ่กระจายตัวสมดุลในหลายมิติ แปลว่าจังหวะนี้ไม่ได้ผูกติดกับโชคชะตาตายตัว แต่ขึ้นอยู่กับการเลือกและลงมือทำของคุณโดยตรงค่ะ';
  }

  if (dominant === 'fire') {
    return 'Active Fire energy leads this spread — momentum, initiative, and timely action will shape the outcome most.';
  }
  if (dominant === 'water') {
    return 'Emotional Water energy runs through these cards, highlighting empathy, honest feelings, and gentle communication.';
  }
  if (dominant === 'air') {
    return 'Clear-minded Air energy stands out here — objective facts and direct communication will serve you best.';
  }
  if (dominant === 'earth') {
    return 'Grounded Earth energy anchors this spread, favoring practical steps and steady, tangible progress.';
  }
  return 'With balanced energies across the spread, nothing here is locked in stone — your everyday choices hold the steering wheel.';
}

function buildDualTopicBridge(
  topics: ReadingTopic[],
  subTags: Partial<Record<ReadingTopic, FocusSubTag>>,
  lang: Lang,
): string {
  if (topics.length < 2) return '';
  const l1 = getTopicLabel(topics[0], lang);
  const l2 = getTopicLabel(topics[1], lang);
  const p1 = getTopicPhrase(topics[0], subTags[topics[0]], lang);
  const p2 = getTopicPhrase(topics[1], subTags[topics[1]], lang);

  if (lang === 'th') {
    return `เมื่อเชื่อมทั้งสองด้านที่คุณเลือกถามเข้าด้วยกัน พลังงานของหน้าไพ่ชุดนี้สะท้อนว่าเรื่อง${p1} ควบคู่กับเรื่อง${p2} ส่งผลต่อจังหวะใจของคุณไปพร้อมกัน สามารถกดสลับแท็บ "${l1}" และ "${l2}" ด้านล่างเพื่ออ่านคำทำนายเจาะลึกของไพ่แต่ละใบได้ครบทั้งสองมุมมองเลยนะคะ`;
  }
  return `Looking at how ${p1} and ${p2} intersect, the same underlying rhythm shapes both areas — use the "${l1}" and "${l2}" tabs below to read every card in full through each lens.`;
}

function buildOverview(
  drawn: DrawnCard[],
  spread: SpreadDef,
  topics: ReadingTopic[],
  subTags: Partial<Record<ReadingTopic, FocusSubTag>>,
  lang: Lang,
  rng: Rng,
): string {
  const dualBridge = buildDualTopicBridge(topics, subTags, lang);
  if (drawn.length < 3) {
    // For 1-card draws, only show overview when 2 topics are chosen so the user sees how both connect
    return dualBridge;
  }

  const energyNote = buildDominantEnergyNote(drawn, lang, rng);
  const tail = dualBridge ? `${energyNote} ${dualBridge}` : energyNote;

  if (drawn.length >= 10) {
    const c0 = cardLabel(drawn[0], lang);
    const c1 = cardLabel(drawn[1], lang);
    const c5 = cardLabel(drawn[5], lang);
    const c6 = cardLabel(drawn[6], lang);
    const c9 = cardLabel(drawn[9], lang);
    const v9 = getValence(drawn[9].card, drawn[9].reversed);

    if (lang === 'th') {
      const intro = `เมื่ออ่านภาพใหญ่ของ Celtic Cross ทั้ง 10 ใบเชื่อมกัน หัวใจของเรื่องในตอนนี้ตั้งอยู่บนไพ่ ${c0} โดยมีไพ่ ${c1} เป็นโจทย์ท้าทายสำคัญ และมีไพ่ ${c5} สะท้อนความรู้สึกส่วนลึกที่ขับเคลื่อนใจคุณอยู่`;
      const arc =
        v9 === 'positive'
          ? `จุดเปลี่ยนสำคัญของหน้าไพ่ชุดนี้อยู่ที่การนำท่าทีจากไพ่ ${c6} มาปรับใช้ ซึ่งจะช่วยพาสถานการณ์คลี่คลายไปสู่บทสรุปที่สดใสในไพ่ ${c9} ได้อย่างมั่นคงค่ะ`
          : v9 === 'mixed'
            ? `กุญแจสำคัญอยู่ที่การยึดแนวทางจากไพ่ ${c6} เป็นหลักในการวางตัว เพื่อประคองให้บทสรุปในไพ่ ${c9} ออกมาสมดุลและสบายใจที่สุดค่ะ`
            : `หน้าไพ่ชุดนี้ใช้ไพ่ ${c9} เตือนภาพปลายทางไว้ล่วงหน้า เพื่อให้คุณหยิบคำแนะนำจากไพ่ ${c6} ไปปรับทิศทางตั้งแต่วันนี้ ซึ่งจะช่วยผ่อนหนักเป็นเบาได้มากค่ะ`;
      return `${intro} ${arc} ${tail}`;
    }

    const introEn = `Reading the 10-card Celtic Cross as a whole, the heart of the matter rests on ${c0}, crossed by ${c1} as your main challenge and rooted in ${c5} beneath the surface.`;
    const arcEn =
      v9 === 'positive'
        ? `Applying the guidance of ${c6} bridges the spread toward an encouraging resolution in ${c9}.`
        : v9 === 'mixed'
          ? `Leaning on the posture of ${c6} helps steer the final outcome in ${c9} toward steady balance.`
          : `${c9} serves as an early heads-up at the end of the spread, showing why adopting ${c6} now can meaningfully soften the path ahead.`;
    return `${introEn} ${arcEn} ${tail}`;
  }

  // 3-card spreads
  const c0 = cardLabel(drawn[0], lang);
  const c1 = cardLabel(drawn[1], lang);
  const c2 = cardLabel(drawn[2], lang);
  const v0 = getValence(drawn[0].card, drawn[0].reversed);
  const v1 = getValence(drawn[1].card, drawn[1].reversed);
  const v2 = getValence(drawn[2].card, drawn[2].reversed);

  if (lang === 'th') {
    if (spread.category === 'love') {
      const pairPart =
        v0 === 'positive' && v1 === 'positive'
          ? `เมื่อมองไพ่ทั้ง 3 ใบเชื่อมกัน พลังงานระหว่างคุณ (ไพ่ ${c0}) และอีกฝ่าย (ไพ่ ${c1}) เปิดรับและส่งความรู้สึกดีๆ ถึงกันทั้งสองฝั่ง`
          : v0 === 'positive' && v1 !== 'positive'
            ? `เมื่อวางไพ่เทียบกัน จะเห็นว่าฝั่งของคุณ (ไพ่ ${c0}) มีความชัดเจนและเปิดใจมากกว่า ในขณะที่อีกฝ่าย (ไพ่ ${c1}) ยังมีจังหวะลังเลหรือเรื่องส่วนตัวให้ต้องจัดการ`
            : v0 !== 'positive' && v1 === 'positive'
              ? `เมื่อดูภาพรวมคู่กัน อีกฝ่าย (ไพ่ ${c1}) มีท่าทีที่เปิดกว้างและเป็นมิตร ในขณะที่ใจของคุณเอง (ไพ่ ${c0}) อาจยังมีความกังวลหรือตั้งการ์ดระวังตัวอยู่ลึกๆ`
              : `เมื่ออ่านเชื่อมโยงกัน ทั้งฝั่งคุณ (ไพ่ ${c0}) และฝั่งเขา (ไพ่ ${c1}) ต่างยังมีเรื่องในใจหรือจังหวะที่ต้องค่อยๆ ปรับจูนเข้าหากัน`;
      const trendPart =
        v2 === 'positive'
          ? `ส่วนไพ่แนวโน้มความสัมพันธ์อย่าง ${c2} ส่งสัญญาณที่ดีว่าบรรยากาศระหว่างกันจะค่อยๆ ราบรื่นและเข้าใจกันมากขึ้นค่ะ`
          : v2 === 'mixed'
            ? `โดยไพ่สรุปอย่าง ${c2} บอกว่าทิศทางหลังจากนี้ขึ้นอยู่กับการค่อยๆ ประคองจังหวะและเปิดพื้นที่สบายใจให้กันและกันค่ะ`
            : `ส่วนไพ่ ${c2} ในตำแหน่งแนวโน้มแวะมาเตือนว่าอย่าเพิ่งใจร้อนคาดหวังหรือกดดันกัน การให้เวลาและพูดคุยกันดีๆ จะช่วยประคองความสัมพันธ์ได้ดีที่สุดค่ะ`;
      return `${pairPart} ${trendPart} ${tail}`;
    }

    if (spread.category === 'career') {
      const startPart =
        v0 === 'positive'
          ? `เมื่อดูภาพรวมเรื่องงาน จุดที่คุณยืนอยู่ในตอนนี้ (ไพ่ ${c0}) ถือว่ามีต้นทุนและศักยภาพที่ดีเลยค่ะ เพียงแต่มีโจทย์จากไพ่ ${c1} เข้ามาทดสอบให้ต้องจัดระเบียบและรับมืออย่างมีสติ`
          : `ภาพรวมเรื่องงานในรอบนี้สะท้อนว่าสถานการณ์ปัจจุบัน (ไพ่ ${c0}) อาจทำให้รู้สึกตึงมือหรือเหนื่อยอยู่บ้าง โดยมีประเด็นจากไพ่ ${c1} เป็นโจทย์หลักที่ต้องค่อยๆ เคลียร์ให้ผ่าน`;
      const stepPart =
        v2 === 'positive'
          ? `จุดที่น่ายินดีคือไพ่ก้าวต่อไปอย่าง ${c2} เปิดทางสว่างไว้ชัดเจน หากขยับตัวตามแนวทางของไพ่ใบนี้ เรื่องงานจะเดินหน้าได้คล่องตัวขึ้นมากค่ะ`
          : `ทั้งนี้ไพ่ก้าวต่อไปอย่าง ${c2} แนะนำให้เน้นความรัดกุม ค่อยๆ วางแผนทีละขั้นโดยไม่ฝืนเร่งจังหวะเกินไป แล้วทุกอย่างจะค่อยๆ เข้าที่ค่ะ`;
      return `${startPart} ${stepPart} ${tail}`;
    }

    if (spread.category === 'money') {
      const statePart =
        v1 === 'positive'
          ? `เมื่อไล่เรียงเส้นเรื่องการเงิน จากพื้นฐานที่ผ่านมา (ไพ่ ${c0}) ส่งผลให้จังหวะการเงินในปัจจุบัน (ไพ่ ${c1}) มีทิศทางที่คล่องตัวและพอจัดการได้สบายใจขึ้น`
          : `เมื่อมองเส้นทางการเงินต่อเนื่องกัน พื้นฐานก่อนหน้านี้ (ไพ่ ${c0}) ส่งผลมาถึงจังหวะปัจจุบัน (ไพ่ ${c1}) ที่อาจต้องรัดกุมและวางแผนรายรับรายจ่ายให้ละเอียดขึ้นสักนิด`;
      const nextPart =
        v2 === 'positive'
          ? `ส่วนไพ่แนวทางจัดการอย่าง ${c2} ชี้ว่าโอกาสสร้างความมั่นคงกำลังเปิดรับ ยิ่งจัดสรรอย่างเป็นระบบก็จะยิ่งเห็นผลดีชัดเจนค่ะ`
          : `โดยไพ่ ${c2} ในตำแหน่งแนวทางจัดการย้ำให้เน้นความปลอดภัยของเงินในมือเป็นหลัก ชะลอรายจ่ายที่ไม่จำเป็นไว้ก่อนจะอุ่นใจที่สุดค่ะ`;
      return `${statePart} ${nextPart} ${tail}`;
    }

    const flowPart =
      v1 === 'positive'
        ? `เมื่ออ่านเส้นเรื่องร้อยเรียงกัน จากพื้นฐานที่ผ่านมาในไพ่ ${c0} สถานการณ์ได้ขยับมาสู่จังหวะปัจจุบัน (ไพ่ ${c1}) ที่มีพลังงานเกื้อหนุนและเห็นทิศทางชัดขึ้น`
        : `เมื่อมองความต่อเนื่องของไพ่ทั้ง 3 ใบ เรื่องราวจากไพ่ ${c0} ในช่วงก่อนหน้าได้ส่งผลมาถึงปัจจุบัน (ไพ่ ${c1}) ซึ่งเป็นจังหวะที่ต้องประคองตัวและค่อยๆ คิดทบทวน`;
    const futurePart =
      v2 === 'positive'
        ? `และกำลังส่งไม้ต่อไปยังไพ่ ${c2} ในตำแหน่งข้างหน้า ซึ่งเป็นสัญญาณที่ดีว่าเรื่องราวจะค่อยๆ คลี่คลายไปในทางที่สดใสขึ้นค่ะ`
        : v2 === 'mixed'
          ? `ก่อนจะขยับไปสู่ไพ่ ${c2} ที่บอกว่าทิศทางข้างหน้ายังยืดหยุ่นและปรับเปลี่ยนให้ดีขึ้นได้ตามการตัดสินใจของคุณในวันนี้ค่ะ`
          : `ส่วนไพ่ ${c2} ในตำแหน่งข้างหน้าขึ้นมาช่วยเตือนล่วงหน้า เพื่อให้คุณวางแผนรับมือแบบไม่ประมาทและผ่อนหนักเป็นเบาได้ทันเวลาค่ะ`;
    return `${flowPart} ${futurePart} ${tail}`;
  }

  const firstFlowEn =
    spread.category === 'love'
      ? `Looking at all three cards together, your side (${c0}) meets their energy (${c1}), shaping the shared dynamic in ${c2}.`
      : spread.category === 'career'
        ? `Across your career spread, your current standing (${c0}) faces the key lesson of ${c1}, pointing toward ${c2} as your most constructive next move.`
        : spread.category === 'money'
          ? `Tracing your finances, earlier habits in ${c0} lead into your current state in ${c1}, while ${c2} outlines how best to steady and grow from here.`
          : `Following the thread across the spread, ${c0} sets the backdrop for where things stand in ${c1}, leading naturally toward ${c2} ahead.`;
  return `${firstFlowEn} ${tail}`;
}

/* ---------- supplementary advice pools ---------- */

const TOPIC_SUPPLEMENT_ADVICE_TH: Record<ReadingTopic, string[]> = {
  general: [
    'แยกเรื่องที่คุณควบคุมและลงมือทำได้วันนี้ ออกจากเรื่องที่ต้องปล่อยให้เวลาทำหน้าที่ จะช่วยให้ใจเบาขึ้นทันทีค่ะ',
    'ให้เวลาตัวเองได้พักหายใจก่อนตัดสินใจเรื่องสำคัญ การคิดตอนใจนิ่งจะเห็นทางออกที่แม่นยำกว่าเสมอค่ะ',
  ],
  love: [
    'โฟกัสที่การกระทำและความสม่ำเสมอในชีวิตจริงมากกว่าการนั่งตีความข้อความสั้นๆ ไปเองคนเดียวนะคะ',
    'รักษาพื้นที่ความสุขและคุณค่าในตัวเองไว้เสมอ ความรักที่ดีจะยิ่งเติบโตเมื่อใจของคุณอิ่มและสบายค่ะ',
  ],
  career: [
    'จัดลำดับงานสำคัญที่สุดเพียง 1–2 ชิ้นต่อวันให้เสร็จเป็นรูปธรรม ดีกว่าแบกทุกเรื่องพร้อมกันจนล้าค่ะ',
    'จดบันทึกผลงานและข้อตกลงสำคัญเป็นลายลักษณ์อักษรไว้เสมอ จะช่วยป้องกันความคลาดเคลื่อนได้ดีมากค่ะ',
  ],
  money: [
    'ทำบัญชีแยกก้อนเงินใช้จ่ายจำเป็น เงินสำรองฉุกเฉิน และเงินออมออกจากกันตั้งแต่วันที่เงินเข้าจะคุมได้ง่ายที่สุดค่ะ',
    'เว้นระยะตัดสินใจอย่างน้อย 48 ชั่วโมงก่อนจ่ายของชิ้นใหญ่หรือลงทุนเพิ่ม เพื่อเช็กความคุ้มค่าอย่างใจเย็นค่ะ',
  ],
  study: [
    'แบ่งเนื้อหาอ่านทบทวนเป็นบล็อกสั้นๆ รอบละ 25–30 นาทีสลับพักสายตา สมองจะจำได้แม่นกว่าการฝืนอัดยาวค่ะ',
    'สรุปหัวข้อสำคัญเป็นภาษาของตัวเองสั้นๆ หน้าเดียวไว้ทบทวนก่อนวันสอบ จะช่วยเรียกความมั่นใจได้ดีที่สุดค่ะ',
  ],
  health: [
    'เข้านอนให้เป็นเวลาและวางหน้าจอก่อนนอนอย่างน้อย 30 นาที เพื่อให้ระบบประสาทและใจได้พักฟื้นเต็มที่ค่ะ',
    'ใจดีกับตัวเองในวันที่เหนื่อยล้า การอนุญาตให้ตัวเองได้พักไม่ใช่ความขี้เกียจแต่คือการเติมพลังที่จำเป็นค่ะ',
  ],
  family: [
    'รับฟังคนใกล้ตัวให้จบก่อนค่อยสะท้อนความรู้สึกด้วยน้ำเสียงนุ่มนวล จะช่วยลดกำแพงความเข้าใจผิดได้มากค่ะ',
    'รักษาขอบเขตพื้นที่สบายใจของตัวเองอย่างสุภาพ ไม่จำเป็นต้องแบกอารมณ์ของทุกคนรอบตัวไว้ทั้งหมดค่ะ',
  ],
  decision: [
    'เขียนข้อดี-ข้อเสียและความเสี่ยงที่รับไหวลงบนกระดาษ จะช่วยให้เห็นทางเลือกที่ชัดกว่าการคิดวนในหัวค่ะ',
    'หลีกเลี่ยงการตัดสินใจประเด็นสำคัญตอนดึกหรือตอนอารมณ์กำลังพุ่ง รอให้ใจนิ่งสักหนึ่งคืนเสมอค่ะ',
  ],
};

const ADVICE_TIPS_EN: Record<ReadingTopic, string[]> = {
  general: [
    'Separate what is directly within your control this week from what needs time, and put your energy into the first small step.',
    'Give yourself one unhurried night of rest before finalizing any major decision so clarity leads instead of urgency.',
  ],
  love: [
    'Pay attention to consistent, everyday actions rather than over-reading small pauses or unspoken guesses.',
    'Open honest conversations with how you feel rather than assumptions, and keep nurturing your own joy alongside the relationship.',
  ],
  career: [
    'Prioritize the single highest-impact task on your desk first rather than carrying five competing urgencies at once.',
    'Put key expectations, timelines, and agreements in clear writing so everyone stays aligned without guesswork.',
  ],
  money: [
    'Separate essentials, emergency savings, and discretionary spending as soon as income arrives so your baseline stays protected.',
    'Give yourself a 48-hour pause before any large purchase or unfamiliar investment to review the real numbers calmly.',
  ],
  study: [
    'Break study sessions into focused 25-minute blocks with short rest breaks to lock in deeper recall.',
    'Summarize core concepts onto a single review sheet in your own words rather than re-reading passively.',
  ],
  health: [
    'Protect wind-down time away from screens before sleep so both body and nervous system can truly recharge.',
    'Release guilt around resting — sustainable energy comes from honoring your limits early.',
  ],
  family: [
    'Lead delicate home or friend conversations with calm warmth rather than reacting in the heat of the moment.',
    'Hold kind, clear personal boundaries so supporting loved ones never drains your own peace.',
  ],
  decision: [
    'Write down both options side by side on paper and ask which path your future self one year out will thank you for.',
    'Avoid locking in major choices late at night or under pressure — give clarity one calm morning first.',
  ],
};

function collectSingleTopicAdvice(
  drawn: DrawnCard[],
  spread: SpreadDef,
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  lang: Lang,
  rng: Rng,
  excludeTip: string | undefined,
  maxCount: number,
): string[] {
  const tips: string[] = [];

  if (subTag && SUBTAG_LENS[subTag]) {
    tips.push(SUBTAG_LENS[subTag][lang].advice);
  }

  if (lang === 'en') {
    for (const t of ADVICE_TIPS_EN[topic]) {
      if (!tips.includes(t) && tips.length < maxCount) tips.push(t);
    }
    return tips.slice(0, maxCount);
  }

  let ordered: DrawnCard[];
  if (drawn.length === 1) {
    ordered = [drawn[0]];
  } else if (drawn.length === 3) {
    ordered =
      spread.category === 'career' || spread.category === 'money'
        ? [drawn[2], drawn[1], drawn[0]]
        : [drawn[2], drawn[0], drawn[1]];
  } else {
    ordered = [drawn[6], drawn[9], drawn[0], drawn[1], drawn[3]].filter(Boolean);
  }

  for (const d of ordered) {
    const tData = d.card.topicsTh[topic];
    const tip = d.reversed ? tData.adviceReversed : tData.adviceUpright;
    if (tip && tip !== excludeTip && !tips.includes(tip)) {
      tips.push(tip);
    }
    if (tips.length >= maxCount) break;
  }

  if (tips.length < 2) {
    const extra = pick(rng, TOPIC_SUPPLEMENT_ADVICE_TH[topic]);
    if (!tips.includes(extra)) tips.push(extra);
  }

  return tips.slice(0, maxCount);
}

/* ---------- realistic human-scale timing ---------- */

const FAST_MAJOR_IDS = new Set([
  'major-00-fool',
  'major-01-magician',
  'major-07-chariot',
  'major-10-wheel',
  'major-16-tower',
]);

function buildTiming(lastDrawn: DrawnCard, lang: Lang, rng: Rng): string {
  const { card, reversed } = lastDrawn;
  const num = card.number ?? 11;
  let timeframeTh: string;
  let timeframeEn: string;

  if (card.suit === 'wands') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      timeframeTh = 'ในช่วง 3–7 วันข้างหน้า';
      timeframeEn = 'within the next 3–7 days';
    } else if (!reversed || num <= 5) {
      timeframeTh = 'ในช่วง 1–2 สัปดาห์ข้างหน้า';
      timeframeEn = 'within 1–2 weeks';
    } else {
      timeframeTh = 'ในช่วง 2–4 สัปดาห์ข้างหน้า';
      timeframeEn = 'within 2–4 weeks';
    }
  } else if (card.suit === 'swords') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      timeframeTh = 'ในช่วง 1–2 สัปดาห์ข้างหน้า';
      timeframeEn = 'within 1–2 weeks';
    } else if (!reversed || num <= 5) {
      timeframeTh = 'ในช่วง 2–4 สัปดาห์ข้างหน้า';
      timeframeEn = 'within 2–4 weeks';
    } else {
      timeframeTh = 'ในช่วง 1–2 เดือนข้างหน้า';
      timeframeEn = 'over the next 1–2 months';
    }
  } else if (card.suit === 'cups') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      timeframeTh = 'ในช่วง 2–4 สัปดาห์ข้างหน้า';
      timeframeEn = 'within 2–4 weeks';
    } else if (!reversed || num <= 5) {
      timeframeTh = 'ในช่วง 1–3 เดือนข้างหน้า';
      timeframeEn = 'over the next 1–3 months';
    } else {
      timeframeTh = 'ในช่วง 2–4 เดือนข้างหน้า';
      timeframeEn = 'over the next 2–4 months';
    }
  } else if (card.suit === 'pentacles') {
    if (!reversed && (num <= 4 || card.court === 'page')) {
      timeframeTh = 'ในช่วง 1–3 เดือนข้างหน้า';
      timeframeEn = 'over the next 1–3 months';
    } else if (!reversed && num <= 8) {
      timeframeTh = 'ในช่วง 3–6 เดือนข้างหน้า';
      timeframeEn = 'over the next 3–6 months';
    } else {
      timeframeTh = 'ในช่วง 6–12 เดือนข้างหน้า';
      timeframeEn = 'over the next 6–12 months';
    }
  } else {
    if (FAST_MAJOR_IDS.has(card.id)) {
      timeframeTh = reversed ? 'ในช่วง 1–3 เดือนข้างหน้า' : 'ในช่วง 2–4 สัปดาห์ข้างหน้า';
      timeframeEn = reversed ? 'over the next 1–3 months' : 'within 2–4 weeks';
    } else {
      timeframeTh = reversed
        ? 'ในช่วง 3–6 เดือนข้างหน้าเมื่อปัจจัยรอบด้านค่อยๆ ลงตัว'
        : 'ในช่วง 1–3 เดือนข้างหน้าตามจังหวะความพร้อมของคุณ';
      timeframeEn = reversed
        ? 'over the next 3–6 months as surrounding pieces settle into place'
        : 'over the next 1–3 months in step with your readiness';
    }
  }

  return fill(pick(rng, V[lang].timingFrame), {
    timeframe: lang === 'th' ? timeframeTh : timeframeEn,
  });
}

/* ---------- build sections for a single topic lens ---------- */

function buildTopicView(
  drawn: DrawnCard[],
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  lang: Lang,
  seed: number,
): { view: TopicView; inlineAdviceTipUsed?: string } {
  const rng = mulberry32(seed);
  const v = V[lang];
  let inlineAdviceTipUsed: string | undefined;

  const sections: CardSection[] = drawn.map((d, idx) => {
    const { card, reversed, position } = d;
    const role = positionIdToRole(position.id);
    const valence = getValence(card, reversed);
    const posName = lang === 'th' ? position.nameTh : position.nameEn;
    const cName = lang === 'th' ? card.nameTh : card.nameEn;
    const revTag = reversed ? (lang === 'th' ? ' (กลับหัว)' : ' (Reversed)') : '';

    let leadIn: string;
    if (role === 'challenge' && valence === 'positive') {
      leadIn =
        lang === 'th'
          ? `ในตำแหน่งโจทย์สำคัญของเรื่องนี้ ไพ่ ${cName}${revTag} กลับขึ้นมาเป็นพลังบวกที่ช่วยคลี่คลายความกังวล`
          : `In the challenge position, ${cName}${revTag} actually brings supportive energy that helps ease the friction.`;
    } else {
      leadIn = fill(pick(rng, v.positionLeadIn[role]), { card: cName, revTag });
    }

    const topicData = card.topicsTh[topic] ?? card.topicsTh.general;
    const coreMeaning =
      lang === 'th'
        ? reversed
          ? topicData.reversed
          : topicData.upright
        : reversed
          ? card.reversedEn
          : card.uprightEn;

    const detailParagraphs: string[] = [`${leadIn} ${coreMeaning}`];

    // Inject sub-tag situational lens on the decisive card (single card, 3rd card, or Celtic Cross outcome)
    const isDecisiveCard = idx === drawn.length - 1;
    if (isDecisiveCard && subTag && SUBTAG_LENS[subTag]) {
      detailParagraphs.push(SUBTAG_LENS[subTag][lang][valence]);
    }

    // Contextual note (ethics / early-warning reassurance / reversed nuance)
    if (position.id === 'other') {
      detailParagraphs.push(pick(rng, v.otherPersonNote));
    } else if (card.isNegative) {
      if (reversed && (card.reversedTone === 'releasing' || valence === 'positive')) {
        detailParagraphs.push(pick(rng, v.negativeReversedNote));
      } else if (reversed) {
        detailParagraphs.push(pick(rng, v.reversedNote[card.reversedTone]));
      } else {
        detailParagraphs.push(pick(rng, v.negativeUprightNote));
      }
    } else if (reversed) {
      detailParagraphs.push(pick(rng, v.reversedNote[card.reversedTone]));
    } else if (drawn.length >= 10 && role === 'advice' && lang === 'th') {
      const tip = topicData.adviceUpright;
      inlineAdviceTipUsed = tip;
      detailParagraphs.push(fill(pick(rng, v.advicePositionNote), { tip }));
    }

    const oneLiner =
      lang === 'th'
        ? reversed
          ? topicData.themeReversed
          : topicData.themeUpright
        : buildEnglishOneLiner(card, topic, reversed);

    return {
      cardId: card.id,
      cardName: cName,
      cardSubtitle: lang === 'th' ? card.subtitleTh : undefined,
      image: card.image,
      reversed,
      positionName: posName,
      oneLiner,
      detail: detailParagraphs.join('\n\n'),
      detailParagraphs,
    };
  });

  const viewHeadline = buildHeadlineForTopic(drawn, topic, subTag, lang, rng);
  const fDef = topic !== 'general' ? getFocusTopicDef(topic) : undefined;
  const stDef = subTag ? getSubTagDef(subTag) : undefined;

  return {
    view: {
      topic,
      icon: fDef?.icon ?? 'spark',
      topicLabel: getTopicLabel(topic, lang),
      subTagLabel: stDef ? (lang === 'th' ? stDef.labelTh : stDef.labelEn) : undefined,
      headline: viewHeadline,
      sections,
    },
    inlineAdviceTipUsed,
  };
}

/* ---------- main ---------- */

export function generateReading(
  drawn: DrawnCard[],
  spread: SpreadDef,
  profile: UserProfile,
  lang: Lang,
  seed: number,
): Reading {
  const rng = mulberry32(seed);
  const v = V[lang];
  const { topics, subTags, usedStructuredFocus } = resolveActiveFocus(spread, profile);

  /* hook */
  const displayName = formatUserName(profile.name, lang);
  const cleanQuestion = profile.question.trim();
  const hasName = displayName.length > 0;
  const hasQ = cleanQuestion.length > 0;

  let hook: string;
  if (usedStructuredFocus && topics[0] !== 'general') {
    const focusPhrase =
      topics.length >= 2
        ? lang === 'th'
          ? `${getTopicPhrase(topics[0], subTags[topics[0]], 'th')} ควบคู่กับ${getTopicPhrase(topics[1], subTags[topics[1]], 'th')}`
          : `${getTopicPhrase(topics[0], subTags[topics[0]], 'en')} alongside ${getTopicPhrase(topics[1], subTags[topics[1]], 'en')}`
        : getTopicPhrase(topics[0], subTags[topics[0]], lang);

    hook = hasName
      ? fill(pick(rng, v.hookFocusBoth), { name: displayName, focus: focusPhrase })
      : fill(pick(rng, v.hookFocusOnly), { focus: focusPhrase });
  } else if (hasName && hasQ) {
    hook = fill(pick(rng, v.hookBoth), { name: displayName, question: cleanQuestion });
  } else if (hasName) {
    hook = fill(pick(rng, v.hookNameOnly), { name: displayName });
  } else if (hasQ) {
    hook = fill(pick(rng, v.hookQuestionOnly), { question: cleanQuestion });
  } else {
    hook = pick(rng, v.hookGeneric);
  }

  /* build topicViews (1 or 2 complete lenses) */
  const builtViews = topics.map((t, idx) =>
    buildTopicView(drawn, t, subTags[t], lang, (seed ^ ((idx + 1) * 0x9e3779b9)) >>> 0),
  );
  const topicViews = builtViews.map((b) => b.view);
  const primarySections = topicViews[0]?.sections ?? [];

  const headline = buildCombinedHeadline(
    drawn,
    topics,
    subTags,
    topicViews[0]?.headline ?? '',
    lang,
    rng,
  );
  const overview = buildOverview(drawn, spread, topics, subTags, lang, rng);

  /* advice: unified across 1 or 2 topics */
  let advice: string[];
  if (topics.length >= 2) {
    const t0Tips = collectSingleTopicAdvice(
      drawn,
      spread,
      topics[0],
      subTags[topics[0]],
      lang,
      rng,
      builtViews[0]?.inlineAdviceTipUsed,
      2,
    );
    const t1Tips = collectSingleTopicAdvice(
      drawn,
      spread,
      topics[1],
      subTags[topics[1]],
      lang,
      rng,
      builtViews[1]?.inlineAdviceTipUsed,
      2,
    );
    const label0 = getTopicLabel(topics[0], lang);
    const label1 = getTopicLabel(topics[1], lang);
    advice = [
      ...t0Tips.map((tip) => `[${label0}] ${tip}`),
      ...t1Tips.map((tip) => `[${label1}] ${tip}`),
    ];
  } else {
    advice = collectSingleTopicAdvice(
      drawn,
      spread,
      topics[0],
      subTags[topics[0]],
      lang,
      rng,
      builtViews[0]?.inlineAdviceTipUsed,
      3,
    );
  }

  const timing = drawn.length > 0 ? buildTiming(drawn[drawn.length - 1], lang, rng) : null;

  /* personal note: lucky color from birthdate */
  let personalNote: string | null = null;
  const dayInfo = getDayInfo(profile.birthdate);
  if (dayInfo && rng() < 0.85) {
    personalNote = fill(pick(rng, v.luckyColor), {
      day: lang === 'th' ? dayInfo.dayNameTh : dayInfo.dayNameEn,
      color: lang === 'th' ? dayInfo.luckyColorTh : dayInfo.luckyColorEn,
    });
  }

  const closing = pick(rng, v.closing);

  return {
    hook,
    headline,
    overview,
    sections: primarySections,
    topicViews,
    advice,
    timing,
    closing,
    personalNote,
  };
}
