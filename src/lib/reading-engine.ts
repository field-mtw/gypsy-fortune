// Reading engine — composes a full tarot reading from variant pools.
// Deterministic per seed: the same seed always yields the same reading,
// so journal entries can be re-rendered exactly.

import type { CardData, ReversedMode, Element } from '@/data/card-types';
import type { SpreadDef } from '@/data/spreads';
import type { UserProfile } from './storage';
import { th as vth, type Lang } from './variants-th';
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
  image: string;
  reversed: boolean;
  positionName: string;
  oneLiner: string;
  detail: string;
}

export interface Reading {
  hook: string;
  headline: string;
  overview: string;
  sections: CardSection[];
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
  // Fisher-Yates with the seeded rng
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map((card) => ({
    card,
    reversed: rng() < REVERSED_PROBABILITY,
  }));
}

/* ---------- helpers ---------- */

function chooseReversedMode(card: CardData, rng: Rng): ReversedMode {
  if (card.isNegative) return pick(rng, ['releasing', 'releasing', 'blocked'] as ReversedMode[]);
  if (card.court) return pick(rng, ['internalized', 'internalized', 'blocked', 'extreme'] as ReversedMode[]);
  const modes: ReversedMode[] = ['blocked', 'internalized', 'extreme', 'shadow', 'releasing'];
  return pick(rng, modes);
}

type Dignity = 'friendly' | 'enemy' | 'neutral';
function dignityBetween(a: Element | null, b: Element | null): Dignity {
  if (!a || !b || a === b) return a === b && a ? 'friendly' : 'neutral';
  const friendly: [Element, Element][] = [['fire', 'air'], ['water', 'earth']];
  const enemy: [Element, Element][] = [['fire', 'water'], ['air', 'earth']];
  if (friendly.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 'friendly';
  if (enemy.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 'enemy';
  return 'neutral';
}

const ELEMENT_NAME: Record<Lang, Record<Element, string>> = {
  th: { fire: 'ไฟ', water: 'น้ำ', air: 'ลม', earth: 'ดิน' },
  en: { fire: 'fire', water: 'water', air: 'air', earth: 'earth' },
};

const NUMEROLOGY: Record<Lang, Record<number, string>> = {
  th: {
    1: 'จุดเริ่มต้นใหม่', 2: 'สมดุลและทางสองแพร่ง', 3: 'การเติบโต', 4: 'โครงสร้างและความมั่นคง',
    5: 'ความเปลี่ยนแปลง', 6: 'ความปรองดอง', 7: 'การทบทวนและประเมิน',
    8: 'การลงมือทำ', 9: 'จุดสูงสุดใกล้สำเร็จ', 10: 'การจบบริบูรณ์เพื่อเริ่มวัฏจักรใหม่',
  },
  en: {
    1: 'new beginnings', 2: 'balance and crossroads', 3: 'growth', 4: 'structure and stability',
    5: 'change', 6: 'harmony', 7: 'review and assessment',
    8: 'action and mastery', 9: 'near-completion', 10: 'completion into a new cycle',
  },
};

const TIMING_WORD: Record<Lang, Record<'days' | 'weeks' | 'months' | 'years', string>> = {
  th: { days: 'วัน', weeks: 'สัปดาห์', months: 'เดือน', years: 'ปี' },
  en: { days: 'days', weeks: 'weeks', months: 'months', years: 'years' },
};

const ADVICE_TIPS: Record<Lang, string[]> = {
  th: [
    'เขียนสิ่งที่กังวลที่สุดออกมาเป็นข้อๆ แล้ววงว่าข้อไหนลงมือแก้ได้ภายในสัปดาห์นี้',
    'เล่าเรื่องนี้ให้คนที่ไว้ใจฟังหนึ่งคน บางทีมุมมองจากข้างนอกเห็นสิ่งที่เรามองไม่เห็น',
    'ให้เวลาตัวเองหนึ่งคืนก่อนตัดสินใจเรื่องใหญ่ อย่าตัดสินใจตอนใจร้อนหรือตอนดึก',
    'เริ่มจากก้าวเล็กที่สุดที่ทำได้วันนี้ ความคืบหน้าเล็กๆ สะสมเป็นความเปลี่ยนแปลงใหญ่',
    'ทบทวนว่าอะไรคือสิ่งที่ควบคุมได้ และอะไรที่ต้องปล่อยวาง แล้วเทพลังให้สิ่งที่ควบคุมได้',
    'จดบันทึกความรู้สึกตอนนี้ไว้ แล้วกลับมาอ่านอีกครั้งในหนึ่งเดือน คุณจะเห็นการเติบโตของตัวเอง',
    'ถ้ามีบทสนทนาที่ค้างคา ลองเริ่มด้วยประโยค "ฉันรู้สึกว่า..." แทนการกล่าวโทษ',
    'ดูแลร่างกายพื้นฐานให้ดีก่อน — นอนพอ กินดี ใจที่มั่นคงเริ่มจากร่างกายที่พร้อม',
  ],
  en: [
    'Write down your biggest worry as bullet points, then circle the one you can act on this week.',
    'Tell this to one person you trust — an outside view often sees what we cannot.',
    'Give yourself one night before any big decision. Never decide when rushed or late at night.',
    'Start with the smallest step you can take today; small progress compounds.',
    'Separate what you can control from what you must release, then pour energy into the former.',
    'Journal how you feel right now and re-read it in a month — you will see your own growth.',
    'If a conversation is overdue, open with "I feel..." instead of blame.',
    'Care for the basics first — sleep, food, rest. A steady heart starts with a rested body.',
  ],
};

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
  const cardName = (c: CardData) => (lang === 'th' ? c.nameTh : c.nameEn);
  const posName = (p: DrawnCard['position']) => (lang === 'th' ? p.nameTh : p.nameEn);

  /* hook */
  const hasName = profile.name.trim().length > 0;
  const hasQ = profile.question.trim().length > 0;
  const hook = hasName || hasQ
    ? fill(pick(rng, v.hook), { name: profile.name.trim(), question: profile.question.trim() })
    : pick(rng, v.hookGeneric);

  /* per-card sections */
  let dignityNotesUsed = 0;
  const sections: CardSection[] = drawn.map((d, i) => {
    const { card, reversed, position } = d;
    const kw = lang === 'th' ? card.keywordsTh[0] : card.keywordsEn[0];
    const meaning = lang === 'th'
      ? reversed ? card.reversedTh : card.uprightTh
      : reversed ? card.reversedEn : card.uprightEn;

    const oneLiner = fill(pick(rng, v.summary), {
      card: cardName(card), keyword: kw, position: posName(position),
    });

    const parts: string[] = [];
    if (position.id === 'past') parts.push(pick(rng, v.pastValidation));
    if (i > 0) parts.push(pick(rng, v.connector) + ',');
    parts.push(fill(pick(rng, v.positionIntro), { position: posName(position), card: cardName(card) }) + '.');

    let body: string;
    if (reversed) {
      const mode = chooseReversedMode(card, rng);
      body = fill(pick(rng, v.reversed[mode]), { card: cardName(card), meaning });
    } else {
      body = fill(pick(rng, v.uprightDetail), { meaning, card: cardName(card), position: posName(position) });
    }

    // elemental dignity vs neighbors (minors only, max 2 notes per reading)
    if (card.element && dignityNotesUsed < 2) {
      const neighbors = [drawn[i - 1]?.card.element ?? null, drawn[i + 1]?.card.element ?? null];
      const rels = neighbors.map((n) => dignityBetween(card.element, n));
      if (rels.includes('friendly')) {
        const el = neighbors[rels.indexOf('friendly')] as Element;
        body += ' ' + fill(pick(rng, v.dignityBoost), { element: ELEMENT_NAME[lang][el] });
        dignityNotesUsed++;
      } else if (rels.includes('enemy')) {
        const el = neighbors[rels.indexOf('enemy')] as Element;
        body += ' ' + fill(pick(rng, v.dignityWeaken), { element: ELEMENT_NAME[lang][el] });
        dignityNotesUsed++;
      }
    }

    // early-warning framing for the 8 heavy cards (upright or reversed)
    if (card.isNegative) body = fill(pick(rng, v.negative), { detail: body });
    // love-spread ethics: position 2 reads observable behavior only
    if (position.id === 'other') body += ' ' + pick(rng, v.otherPersonSoften);

    parts.push(body);
    return {
      cardId: card.id,
      cardName: cardName(card),
      image: card.image,
      reversed,
      positionName: posName(position),
      oneLiner,
      detail: parts.join(' '),
    };
  });

  /* headline: from the most decisive position (last, or the single card) */
  const keySection = sections[sections.length - 1];
  const headline = keySection.oneLiner;

  /* overview: majors count + repeated numbers + missing element */
  const overviewParts: string[] = [];
  const majorCount = drawn.filter((d) => d.card.suit === 'major').length;
  if (drawn.length >= 3 && majorCount >= 3) {
    overviewParts.push(fill(pick(rng, v.overviewMajorMany), { n: majorCount }));
  } else if (drawn.length >= 3) {
    overviewParts.push(pick(rng, v.overviewMajorFew));
  }
  if (drawn.length >= 3) {
    const counts = new Map<number, number>();
    for (const d of drawn) {
      if (d.card.number != null && d.card.number >= 1 && d.card.number <= 10) {
        counts.set(d.card.number, (counts.get(d.card.number) ?? 0) + 1);
      }
    }
    const repeated = [...counts.entries()].find(([, c]) => c >= 2);
    if (repeated) {
      const [num] = repeated;
      overviewParts.push(
        lang === 'th'
          ? `เลข ${num} ปรากฏซ้ำในไพ่หลายใบ — ธีมของ "${NUMEROLOGY.th[num]}" กำลังเด่นเป็นพิเศษในเรื่องนี้`
          : `The number ${num} repeats across cards — the theme of "${NUMEROLOGY.en[num]}" runs strongly through this reading.`,
      );
    }
    const present = new Set(drawn.map((d) => d.card.element).filter(Boolean) as Element[]);
    const all: Element[] = ['fire', 'water', 'air', 'earth'];
    const missing = all.find((e) => !present.has(e));
    if (missing && rng() < 0.7) {
      overviewParts.push(fill(pick(rng, v.overviewMissing), { element: ELEMENT_NAME[lang][missing] }));
    }
  }
  const overview = overviewParts.join(' ');

  /* advice: 2 actionable tips */
  const tips = [...ADVICE_TIPS[lang]].sort(() => rng() - 0.5).slice(0, 2);
  const advice = tips.map((tip) => fill(pick(rng, v.advice), { tip }));

  /* timing: from the last card (future/outcome), System A, soft phrasing */
  let timing: string | null = null;
  const lastCard = drawn[drawn.length - 1].card;
  if (lastCard.timingUnit && lastCard.number) {
    const n = lastCard.number * (drawn[drawn.length - 1].reversed ? 2 : 1);
    const unit = TIMING_WORD[lang][lastCard.timingUnit];
    const timeframe = lang === 'th' ? `${n} ${unit}` : `${n} ${unit}`;
    timing = fill(pick(rng, v.timing), { timeframe });
  } else if (lastCard.suit === 'major') {
    timing = lang === 'th'
      ? 'ไพ่ Major ในตำแหน่งสุดท้าย — นี่คือพลังบทใหญ่ที่เร่งไม่ได้ ไพ่ไม่ให้กรอบเวลาที่แน่นอน แต่บอกว่าเมื่อจังหวะมาถึง ทุกอย่างจะขยับเร็ว เตรียมตัวให้พร้อมดีกว่านับวันรอ'
      : 'A Major card closes the spread — this is big-chapter energy that cannot be rushed. No exact timeframe, but when the moment comes, things will move fast. Be ready rather than count days.';
  }

  /* personal note: lucky color from birthdate */
  let personalNote: string | null = null;
  const dayInfo = getDayInfo(profile.birthdate);
  if (dayInfo && rng() < 0.8) {
    personalNote = fill(pick(rng, v.luckyColor), {
      day: lang === 'th' ? dayInfo.dayNameTh : dayInfo.dayNameEn,
      color: lang === 'th' ? dayInfo.luckyColorTh : dayInfo.luckyColorEn,
    });
  }

  const closing = pick(rng, v.closing);

  return { hook, headline, overview, sections, advice, timing, closing, personalNote };
}
