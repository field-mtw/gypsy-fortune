// Emotional Pulse check-in (5 optional inner-state pills) + Clarifier follow-up intents.
// Tunes both the conversational opening tone and actionable coaching without adding steps.

import type { AuraIconName } from '@/components/AuraIcon';
import type { CardValence, ReadingTopic } from './card-types';
import type { FocusSubTag } from './focus-topics';

export type EmotionalPulse = 'calm' | 'anxious' | 'stuck' | 'hopeful' | 'drained';

export interface EmotionalPulseDef {
  id: EmotionalPulse;
  icon: AuraIconName;
  labelTh: string;
  labelEn: string;
}

export const EMOTIONAL_PULSES: EmotionalPulseDef[] = [
  {
    id: 'calm',
    icon: 'lotus',
    labelTh: 'นิ่งๆ อยากเช็กแนวโน้ม',
    labelEn: 'Calm · Checking the flow',
  },
  {
    id: 'anxious',
    icon: 'moon',
    labelTh: 'กังวล คิดวนไม่สบายใจ',
    labelEn: 'Anxious · Overthinking',
  },
  {
    id: 'stuck',
    icon: 'compass',
    labelTh: 'อึดอัด ลังเลเลือกไม่ถูก',
    labelEn: 'Stuck · Unsure which way',
  },
  {
    id: 'hopeful',
    icon: 'spark',
    labelTh: 'แอบหวัง รอลุ้นข่าวดี',
    labelEn: 'Hopeful · Waiting on news',
  },
  {
    id: 'drained',
    icon: 'feather',
    labelTh: 'เหนื่อยล้า อยากพักใจ',
    labelEn: 'Drained · Need gentle space',
  },
];

const VALID_PULSES = new Set<string>(['calm', 'anxious', 'stuck', 'hopeful', 'drained']);

export function isValidPulse(val: unknown): val is EmotionalPulse {
  return typeof val === 'string' && VALID_PULSES.has(val);
}

export function getPulseDef(pulse?: EmotionalPulse | null): EmotionalPulseDef | undefined {
  if (!pulse) return undefined;
  return EMOTIONAL_PULSES.find((p) => p.id === pulse);
}

/**
 * Conversational, warm older-sister/tarot-reader opening calibrated to how the querent feels right now.
 */
export function buildPulseAwareHook(
  pulse: EmotionalPulse,
  displayName: string,
  focusPhrase: string | null,
  lang: 'th' | 'en',
): string {
  const greetTh = displayName ? `${displayName}คะ ` : '';
  const aboutTh = focusPhrase ? `เรื่อง${focusPhrase}` : 'เรื่องที่อยู่ในใจตอนนี้';

  if (lang === 'th') {
    switch (pulse) {
      case 'anxious':
        return `${greetTh}รับรู้ได้เลยว่าตอนนี้ใจกำลังคิดวนและห่วง${aboutTh}อยู่พอสมควร วางไหล่ลงสบายๆ ก่อนนะ เดี๋ยวเราค่อยๆ ไล่ดูความจริงจากหน้าไพ่ไปพร้อมกันทีละใบค่ะ`;
      case 'stuck':
        return `${greetTh}เข้าใจความรู้สึกอึดอัดเวลาต้องชั่งใจกับ${aboutTh}เลยนะ มาดูกันว่าหน้าไพ่ชุดนี้จะช่วยสางปมและชี้ทางไหนให้คุณตัดสินใจได้โล่งขึ้นบ้างค่ะ`;
      case 'hopeful':
        return `${greetTh}เห็นความตั้งใจและแรงลุ้นดีๆ ที่ส่งมาถึง${aboutTh}เลย มาเช็กจังหวะจากหน้าไพ่กันตรงๆ นะว่าสัญญาณตอนนี้เปิดทางให้แค่ไหนแล้วค่ะ`;
      case 'drained':
        return `${greetTh}ช่วงนี้คงแบกความรู้สึกเรื่อง${aboutTh}มาเยอะจนล้าเลยใช่ไหม พักหายใจยาวๆ สักนิดนะ ให้หน้าไพ่ชุดนี้ช่วยประคองและชี้จุดที่ผ่อนแรงได้ให้ฟังค่ะ`;
      case 'calm':
      default:
        return `${greetTh}ดีจังเลยที่มาเปิดไพ่เช็กทิศทาง${aboutTh}ตอนใจนิ่งๆ แบบนี้ ตอนใจสบายเราจะอ่านสัญญาณหน้าไพ่ได้ชัดและเอาไปปรับใช้ได้แม่นที่สุดเลยค่ะ`;
    }
  }

  const greetEn = displayName ? `${displayName}, ` : '';
  const aboutEn = focusPhrase ?? 'what is on your mind';
  switch (pulse) {
    case 'anxious':
      return `${greetEn}take a slow breath first — it is completely natural to feel anxious around ${aboutEn}. Let’s walk through what the cards actually show, one clear step at a time.`;
    case 'stuck':
      return `${greetEn}when you feel torn or stuck around ${aboutEn}, clarity helps most. Let’s look at how these cards untangle your options.`;
    case 'hopeful':
      return `${greetEn}your quiet hope around ${aboutEn} comes through clearly — let’s check the honest timing and signals on the table together.`;
    case 'drained':
      return `${greetEn}you have been carrying a lot around ${aboutEn}. Read gently at your own pace and let these cards show where you can set heavy weight down.`;
    case 'calm':
    default:
      return `${greetEn}checking in on ${aboutEn} with a calm, steady mind is the best way to read tarot — let’s see the trajectory ahead.`;
  }
}

/**
 * Tailored emotional coaching line injected into the advice list so guidance matches their emotional state.
 */
export function getPulseCoachingAdvice(
  pulse: EmotionalPulse,
  valence: CardValence,
  lang: 'th' | 'en',
): string {
  if (lang === 'th') {
    switch (pulse) {
      case 'anxious':
        return valence === 'positive'
          ? 'เมื่อหน้าไพ่เปิดทางดีให้แล้ว อนุญาตให้ตัวเองหยุดซ้อมคิดภาพร้ายๆ ล่วงหน้าได้แล้วนะ เอาพลังกลับมามองสิ่งดีๆ ที่เกิดขึ้นจริงตรงหน้าดีกว่า'
          : 'เวลาใจกังวล ภาพในหัวมักน่ากลัวกว่าเรื่องจริงเสมอ ลองโฟกัสแค่สิ่งที่จัดการได้ใน 24 ชั่วโมงนี้ก่อน เรื่องไกลกว่านั้นยังไม่ต้องรีบแบกมาคิดล่วงหน้าค่ะ';
      case 'stuck':
        return 'ความอึดอัดจะเบาลงทันทีเมื่อคุณเลือกขยับก้าวเล็กๆ เพียงก้าวเดียวก่อน ไม่จำเป็นต้องเห็นคำตอบครบทั้งปีในวันนี้ถึงจะเริ่มเดินได้ค่ะ';
      case 'hopeful':
        return valence === 'positive'
          ? 'รักษาพลังบวกและความสม่ำเสมอนี้ไว้แบบสบายๆ ไม่ต้องเฝ้าเช็กผลทุกชั่วโมง แล้วข่าวดีจะขยับเข้ามาตามจังหวะที่เป็นธรรมชาติเองค่ะ'
          : 'เก็บความหวังดีๆ ไว้เป็นพลังใจได้เต็มที่ แต่อย่าลืมเผื่อพื้นที่เซฟใจและดูการกระทำจริงควบคู่ไปด้วย จะได้ไม่กดดันตัวเองเกินไปนะ';
      case 'drained':
        return 'วันนี้ห้ามฝืนแก้ปัญหาใหญ่ตอนร่างกายและใจยังล้าเด็ดขาด พักชาร์จแบตให้ตัวเองอิ่มก่อนสักคืน พอแรงกลับมาทางออกจะง่ายขึ้นครึ่งหนึ่งเลยค่ะ';
      case 'calm':
      default:
        return 'ใช้จังหวะที่ใจกำลังนิ่งแบบนี้วางแผนก้าวต่อไปไว้ล่วงหน้าเบาๆ ความสุขุมของคุณในตอนนี้คือแต้มต่อที่ได้เปรียบที่สุดค่ะ';
    }
  }

  switch (pulse) {
    case 'anxious':
      return valence === 'positive'
        ? 'Since the spread leans supportive, give yourself permission to step out of worst-case mental loops and trust what is working.'
        : 'When worry runs high, narrow your focus to what you can calmly handle in the next 24 hours rather than carrying next month today.';
    case 'stuck':
      return 'Break the stalemate with one small, reversible action this week — momentum clears fog faster than endless weighing.';
    case 'hopeful':
      return valence === 'positive'
        ? 'Hold your bright expectation lightly without clock-watching; steady warmth lets good timing unfold naturally.'
        : 'Keep your hope grounded in observable actions and healthy pacing so your heart stays protected.';
    case 'drained':
      return 'Do not force big decisions while depleted — prioritize one restorative night of rest before tackling the next step.';
    case 'calm':
    default:
      return 'Use your calm clarity right now to sketch a simple, unhurried plan while your perspective is balanced.';
  }
}

/* ==================== Interactive Clarifier Intents ==================== */

export type ClarifierIntent = 'best-action' | 'watchout' | 'other-heart' | 'turning-point';

export interface ClarifierIntentOption {
  id: ClarifierIntent;
  icon: AuraIconName;
  labelTh: string;
  labelEn: string;
  shortTagTh: string;
  shortTagEn: string;
}

const CLARIFIER_OPTIONS_MAP: Record<ClarifierIntent, ClarifierIntentOption> = {
  'best-action': {
    id: 'best-action',
    icon: 'compass',
    labelTh: 'ถ้าอยากให้เรื่องนี้ออกมาดีที่สุด ตอนนี้ควรวางตัวหรือทำยังไง?',
    labelEn: 'What is the smartest move I can make right now?',
    shortTagTh: 'ท่าทีและทางออกที่ดีที่สุด',
    shortTagEn: 'Best Next Move',
  },
  watchout: {
    id: 'watchout',
    icon: 'eye',
    labelTh: 'มีจุดบอดหรือเรื่องอะไรที่ต้องระวังไม่ให้เผลอพลาดบ้าง?',
    labelEn: 'What blind spot or pitfall should I watch out for?',
    shortTagTh: 'จุดบอดที่ควรระวัง',
    shortTagEn: 'Key Blind Spot',
  },
  'other-heart': {
    id: 'other-heart',
    icon: 'heart',
    labelTh: 'ลึกๆ แล้วอีกฝ่ายหรือคนที่เกี่ยวข้องเขามองเรื่องนี้ยังไงอยู่?',
    labelEn: 'What is the other person quietly feeling or thinking?',
    shortTagTh: 'ท่าทีลึกๆ ของอีกฝ่าย',
    shortTagEn: 'Their Inner Stance',
  },
  'turning-point': {
    id: 'turning-point',
    icon: 'spark',
    labelTh: 'จุดเปลี่ยนหรือสัญญาณปลดล็อกของเรื่องนี้จะมาจากทางไหน?',
    labelEn: 'Where will the key breakthrough or turning point come from?',
    shortTagTh: 'สัญญาณจุดเปลี่ยนสำคัญ',
    shortTagEn: 'Breakthrough Signal',
  },
};

export function getClarifierIntentDef(intent: ClarifierIntent): ClarifierIntentOption {
  return CLARIFIER_OPTIONS_MAP[intent] ?? CLARIFIER_OPTIONS_MAP['best-action'];
}

export function getClarifierOptionsForTopic(
  topic: ReadingTopic,
  subTag?: FocusSubTag,
): ClarifierIntentOption[] {
  const isRelational =
    topic === 'love' || topic === 'family' || subTag === 'career-workplace';

  if (isRelational) {
    return [
      CLARIFIER_OPTIONS_MAP['other-heart'],
      CLARIFIER_OPTIONS_MAP['best-action'],
      CLARIFIER_OPTIONS_MAP['watchout'],
    ];
  }
  return [
    CLARIFIER_OPTIONS_MAP['best-action'],
    CLARIFIER_OPTIONS_MAP['turning-point'],
    CLARIFIER_OPTIONS_MAP['watchout'],
  ];
}
