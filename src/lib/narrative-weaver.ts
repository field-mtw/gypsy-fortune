// Conversational Narrative Weaver ("โทนพี่สาว/แม่หมอคนกันเอง"):
// 1. Cross-card conversational bridges (Card N responds to Card N-1's energy & role)
// 2. Natural spoken Thai rhythm polisher (reduces repetitive 'ค่ะ' pileups)
// 3. Interactive Clarifier Card answer generator (tailored to 4 follow-up intents)
// 4. Longitudinal Tarot Journal Memory (detects recurring cards & orientation shifts)

import { getCardById } from '@/data/cards';
import type { CardData, CardValence, ReadingTopic } from '@/data/card-types';
import {
  getClarifierIntentDef,
  type ClarifierIntent,
} from '@/data/emotional-pulse';
import { getTopicLabel, getTopicPhrase, type FocusSubTag } from '@/data/focus-topics';
import { buildCourtPersonaNote } from './court-and-timing';
import type { ReadingRecord } from './storage';
import type { Lang, PositionRole } from './variants-th';

type Rng = () => number;
const pick = <T,>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length) % arr.length];

function getValence(card: CardData, reversed: boolean): CardValence {
  return reversed ? card.valenceReversed : card.valenceUpright;
}

function cardDisplay(card: CardData, reversed: boolean, lang: Lang): string {
  if (lang === 'th') {
    return `${card.nameTh}${reversed ? ' (กลับหัว)' : ''}`;
  }
  return `${card.nameEn}${reversed ? ' (Reversed)' : ''}`;
}

/**
 * Smooths out consecutive sentence-ending 'ค่ะ' repetitions inside a paragraph
 * so Thai prose reads like natural spoken conversation rather than stitched templates.
 */
export function polishThaiFlow(paragraph: string): string {
  // 1) Smooth any verb echo across leadIn + card body seams (e.g., "...ซึ่งสะท้อนว่า สะท้อนถึง...")
  const cleaned = paragraph
    .replace(
      /(?:ซึ่ง)?(?:สะท้อน(?:[ก-๙]+)?ว่า|บอก(?:เล่า[ก-๙]+)?ว่า|ชี้ให้เห็นว่า|ยืนยันเสริมว่า|เล่า(?:[ก-๙]+)?ว่า)\s+สะท้อน(ถึง|ว่า)/g,
      'สะท้อน$1',
    )
    .replace(/\s{2,}/g, ' ')
    .trim();

  // 2) Smooth consecutive mid-paragraph 'ค่ะ' repetitions while keeping warm final cadence
  let count = 0;
  const matches = cleaned.match(/ค่ะ(?=\s|$)/g);
  const total = matches ? matches.length : 0;
  if (total <= 1) return cleaned;

  return cleaned.replace(/ค่ะ(?=\s+)/g, (m) => {
    count += 1;
    if (count < total) {
      return count % 2 === 1 ? '' : 'นะ';
    }
    return m;
  });
}

/* ==================== 1. Cross-Card Conversational Lead-In ==================== */

export interface LeadInCardCtx {
  card: CardData;
  reversed: boolean;
  position: { id: string; nameTh: string; nameEn: string };
}

export function buildConversationalLeadIn(
  curr: LeadInCardCtx,
  prev: LeadInCardCtx | null,
  idx: number,
  total: number,
  role: PositionRole,
  lang: Lang,
  rng: Rng,
): string {
  const cName = lang === 'th' ? curr.card.nameTh : curr.card.nameEn;
  const revTag = curr.reversed ? (lang === 'th' ? ' (กลับหัว)' : ' (Reversed)') : '';
  const currFull = `${cName}${revTag}`;
  const posName = lang === 'th' ? curr.position.nameTh : curr.position.nameEn;
  const currV = getValence(curr.card, curr.reversed);

  if (lang === 'en') {
    if (total === 1) {
      return pick(rng, [
        `${currFull} steps forward as the heart of your answer today —`,
        `Looking straight at the core of this matter, ${currFull} shows clearly that`,
      ]);
    }
    if (!prev || idx === 0) {
      return `Starting with ${posName.toLowerCase()}, ${currFull} sets the stage:`;
    }
    const prevFull = cardDisplay(prev.card, prev.reversed, 'en');
    const prevV = getValence(prev.card, prev.reversed);
    if (role === 'other') {
      return prevV === currV
        ? `Turning to their side alongside your ${prevFull}, ${currFull} mirrors a very similar rhythm:`
        : `Turning to their side in contrast to your ${prevFull}, ${currFull} reveals a different pace:`;
    }
    if (prevV !== 'positive' && currV === 'positive') {
      return `Encouragingly, moving from ${prevFull} into ${posName.toLowerCase()}, ${currFull} brightens the energy noticeably:`;
    }
    if (prevV === 'positive' && currV === 'challenging') {
      return `One gentle watchout as ${prevFull} shifts into ${posName.toLowerCase()} — ${currFull} asks for extra care:`;
    }
    return `Flowing directly from ${prevFull} into ${posName.toLowerCase()}, ${currFull} continues the story:`;
  }

  // Thai conversational voice ("โทนพี่สาว/แม่หมอคนกันเอง")
  if (total === 1) {
    return pick(rng, [
      `ไพ่ที่เปิดขึ้นมาคุยกับคุณโดยตรงในรอบนี้คือ ${currFull} ซึ่งจับใจความสำคัญของเรื่องไว้ชัดมาก —`,
      `มาดูคำตอบหลักจากไพ่ ${currFull} กันเลยนะ ไพ่ใบนี้สะท้อนภาพตรงหน้าให้เห็นว่า`,
      `ใบเดียวเน้นๆ ของคุณในวันนี้คือ ${currFull} เล่าจังหวะและทิศทางของเรื่องนี้ไว้ตรงจุดเลยว่า`,
    ]);
  }

  if (!prev || idx === 0) {
    if (role === 'you') {
      return pick(rng, [
        `มาเริ่มเช็กจากฝั่งหัวใจและความรู้สึกของคุณกันก่อนนะ ไพ่ ${currFull} สะท้อนภาพในใจคุณตอนนี้ว่า`,
        `เปิดใบแรกในมุมตัวคุณเองกันก่อน ไพ่ ${currFull} บอกเล่าจังหวะความรู้สึกของคุณไว้ตรงไปตรงมาเลยว่า`,
      ]);
    }
    if (role === 'past') {
      return pick(rng, [
        `ลองย้อนดูจุดตั้งต้นของเรื่องกันก่อนนิดหนึ่งนะ ไพ่ ${currFull} เล่าถึงพื้นฐานที่ผ่านมาไว้ว่า`,
        `เริ่มจากที่มาที่ไปก่อนหน้านี้ ไพ่ ${currFull} สะท้อนสิ่งที่สั่งสมมาจนถึงวันนี้ว่า`,
      ]);
    }
    return pick(rng, [
      `เปิดประเดิมใบแรกที่มุมของ${posName}กันก่อนเลย ไพ่ ${currFull} จับบรรยากาศจริงตรงหน้าไว้ว่า`,
      `มาดูจุดตั้งต้นในตำแหน่ง${posName}กันก่อนนะ ไพ่ ${currFull} สะท้อนพลังงานหลักของเรื่องนี้ว่า`,
    ]);
  }

  const prevFull = cardDisplay(prev.card, prev.reversed, 'th');
  const prevV = getValence(prev.card, prev.reversed);

  // Special relational bridge: 'you' -> 'other' in Love spread
  if (role === 'other') {
    if (prevV === 'positive' && currV === 'positive') {
      return pick(rng, [
        `ทีนี้พอสลับมาดูฝั่งเขากันบ้าง เทียบกับใจคุณที่เปิดรับในไพ่ ${prevFull} แล้ว ฝั่งเขาก็ได้ไพ่ ${currFull} ที่ส่งพลังดีกลับมาไม่แพ้กันเลย —`,
        `ขยับมาส่องฝั่งเขากันต่อนะ ข่าวดีคือจังหวะของเขาสอดรับกับไพ่ ${prevFull} ของคุณได้ดีมาก โดยไพ่ ${currFull} บอกว่า`,
      ]);
    }
    if (prevV === 'positive' && currV !== 'positive') {
      return pick(rng, [
        `ทีนี้พอสลับมาดูฝั่งเขาเทียบกับไพ่ ${prevFull} ของคุณเมื่อกี้ จะเห็นจังหวะที่ต่างกันอยู่นิดหนึ่งตรงที่ฝั่งเขาขึ้นไพ่ ${currFull} —`,
        `แต่พอหันมาดูท่าทีฝั่งเขาเทียบกับความชัดเจนของคุณในไพ่ ${prevFull} ไพ่ ${currFull} สะท้อนว่าฝั่งเขายังมีมุมที่ชะลออยู่ คือ`,
      ]);
    }
    if (prevV !== 'positive' && currV === 'positive') {
      return pick(rng, [
        `สลับมาดูฝั่งเขากันบ้างนะ ต่างจากฝั่งคุณที่ยังแอบคิดเยอะในไพ่ ${prevFull} เพราะฝั่งเขาขึ้นไพ่ ${currFull} ที่ท่าทีเปิดกว้างกว่าที่กังวลไว้ —`,
        `จุดที่น่าสนใจคือ ในขณะที่คุณยังระวังตัวตามไพ่ ${prevFull} พอเปิดดูฝั่งเขากลับได้ไพ่ ${currFull} ซึ่งสะท้อนว่า`,
      ]);
    }
    return pick(rng, [
      `พอขยับมาดูฝั่งเขาเทียบกับไพ่ ${prevFull} ของคุณ จะเห็นว่าต่างคนต่างยังมีเรื่องในใจให้ต้องจูนกันอยู่ โดยไพ่ ${currFull} เล่ามุมของเขาว่า`,
      `มาดูท่าทีฝั่งเขาควบคู่กับไพ่ ${prevFull} ของคุณกันต่อนะ ไพ่ ${currFull} สะท้อนจังหวะของเขาในช่วงนี้ว่า`,
    ]);
  }

  // Positive card landing in Challenge slot
  if (role === 'challenge' && currV === 'positive') {
    return `ต่อเนื่องจากไพ่ ${prevFull} พอมาดูโจทย์ท้าทายของเรื่องนี้ ไพ่ ${currFull} กลับขึ้นมาเป็นพลังบวกที่ช่วยคลายความกังวล —`;
  }

  // Cross-card emotional transitions
  if (prevV !== 'positive' && currV === 'positive') {
    return pick(rng, [
      `ข่าวดีคือพอขยับจากความตึงมือในไพ่ ${prevFull} มาสู่ตำแหน่ง${posName} ไพ่ ${currFull} เข้ามาเปลี่ยนบรรยากาศให้สว่างและโล่งขึ้นชัดมาก —`,
      `จุดที่ทำให้ใจชื้นขึ้นเลยคือ ต่อเนื่องจากไพ่ ${prevFull} เมื่อกี้ พอมาถึงมุมของ${posName} ไพ่ ${currFull} ขึ้นมาช่วยเปิดทางคลี่คลายว่า`,
    ]);
  }

  if (prevV === 'positive' && currV === 'challenging') {
    return pick(rng, [
      `จุดที่อยากสะกิดให้ระวังทันเกมไว้หน่อยคือ แม้ไพ่ ${prevFull} ก่อนหน้านี้จะดูราบรื่นดี แต่พอขยับมาถึง${posName} ไพ่ ${currFull} แวะมาเตือนว่า`,
      `พอมองต่อจากพลังดีๆ ของไพ่ ${prevFull} มาที่ตำแหน่ง${posName} มีเรื่องให้ต้องชะลอและรัดกุมขึ้นนิดหนึ่งตามที่ไพ่ ${currFull} ชี้ให้เห็นว่า`,
    ]);
  }

  if (prevV === 'positive' && currV === 'positive') {
    return pick(rng, [
      `พอมองไล่ต่อมาจากไพ่ ${prevFull} พลังงานดีๆ ยิ่งส่งไม้ต่อมายังตำแหน่ง${posName}แบบไม่ขาดตอน เพราะไพ่ ${currFull} ยืนยันเสริมว่า`,
      `รับจังหวะบวกต่อจากไพ่ ${prevFull} มาถึงมุมของ${posName} ไพ่ ${currFull} ยิ่งช่วยขยายภาพความก้าวหน้าให้ชัดขึ้นว่า`,
    ]);
  }

  if (prevV === 'challenging' && currV === 'challenging') {
    return pick(rng, [
      `ต่อเนื่องจากโจทย์ในไพ่ ${prevFull} พอมาถึงตำแหน่ง${posName} ไพ่ ${currFull} บอกตรงๆ ว่าช่วงนี้อาจยังต้องใจเย็นประคองจังหวะไปก่อน —`,
      `รับช่วงจากไพ่ ${prevFull} มาดูที่${posName}กันต่อ ไพ่ ${currFull} ชวนให้ค่อยๆ แก้ทีละเปาะแบบไม่กดดันตัวเอง เพราะ`,
    ]);
  }

  return pick(rng, [
    `ขยับต่อจากไพ่ ${prevFull} มาดูที่ตำแหน่ง${posName}กันนะ ไพ่ ${currFull} เล่าจังหวะถัดมาให้เห็นภาพชัดขึ้นว่า`,
    `รับไม้ต่อจากไพ่ ${prevFull} มาสู่${posName} ไพ่ ${currFull} สะท้อนทิศทางต่อเนื่องของเรื่องนี้ไว้ว่า`,
  ]);
}

/* ==================== 2. Interactive Clarifier Reading ==================== */

export interface ClarifierReading {
  intent: ClarifierIntent;
  intentQuestion: string;
  intentBadge: string;
  cardId: string;
  cardName: string;
  cardSubtitle?: string;
  image: string;
  reversed: boolean;
  oneLiner: string;
  leadParagraph: string;
  actionTakeaway: string;
}

export function buildClarifierReading(
  clarifier: { card: CardData; reversed: boolean; intent: ClarifierIntent },
  drawn: LeadInCardCtx[],
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  lang: Lang,
): ClarifierReading {
  const { card, reversed, intent } = clarifier;
  const intentDef = getClarifierIntentDef(intent);
  const topicData = card.topicsTh[topic] ?? card.topicsTh.general;
  const cName = lang === 'th' ? card.nameTh : card.nameEn;
  const revTag = reversed ? (lang === 'th' ? ' (กลับหัว)' : ' (Reversed)') : '';
  const fullCard = `${cName}${revTag}`;
  const anchorMain =
    drawn.length > 0
      ? cardDisplay(drawn[drawn.length - 1].card, drawn[drawn.length - 1].reversed, lang)
      : fullCard;
  const topicPhrase = getTopicPhrase(topic, subTag, lang);

  const oneLiner =
    lang === 'th'
      ? reversed
        ? topicData.themeReversed
        : topicData.themeUpright
      : reversed
        ? card.keywordsEn.slice(0, 2).join(' · ') + ' (inner check)'
        : card.keywordsEn.slice(0, 2).join(' · ');

  if (lang === 'th') {
    const core = reversed ? topicData.reversed : topicData.upright;
    const tip = reversed ? topicData.adviceReversed : topicData.adviceUpright;
    const courtPerson = buildCourtPersonaNote(card, reversed, topic, subTag, intent === 'other-heart' ? 'other' : 'advice', 'th');

    let leadParagraph: string;
    let actionTakeaway: string;

    switch (intent) {
      case 'other-heart':
        leadParagraph = polishThaiFlow(
          `เมื่อถามเจาะถึงความในใจและท่าทีลึกๆ ของอีกฝ่ายต่อ${topicPhrase} ไพ่ขยายความเปิดได้ ${fullCard} ขยายต่อจากไพ่ ${anchorMain} ว่า ${core}${courtPerson ? ` ${courtPerson}` : ''}`,
        );
        actionTakeaway = polishThaiFlow(
          `วิธีรับมือกับจังหวะของเขาให้สบายใจที่สุดตอนนี้คือ ${tip} โดยดูความสม่ำเสมอจากการกระทำจริงควบคู่กับการเปิดพื้นที่คุยกันดีๆ ค่ะ`,
        );
        break;

      case 'watchout':
        leadParagraph = polishThaiFlow(
          `สำหรับจุดบอดหรือเรื่องที่ต้องระวังไม่ให้เผลอพลาด ไพ่ ${fullCard} ขึ้นมาสะกิดขยายต่อจากไพ่ ${anchorMain} ให้ทันเกมว่า ${reversed ? core : `แม้ไพ่ใบนี้จะมีพลังด้านบวกเรื่อง${topicData.themeUpright} แต่จุดที่ต้องระวังคืออย่าชะล่าใจหรือทุ่มสุดตัวจนลืมเช็กรายละเอียดรอบด้าน — ${core}`}`,
        );
        actionTakeaway = polishThaiFlow(
          `เกราะป้องกันที่ดีที่สุดจากไพ่ใบนี้คือ ${tip} แค่รู้เท่าทันจุดนี้ไว้ล่วงหน้าก็ช่วยเซฟตัวคุณได้เยอะมากแล้วค่ะ`,
        );
        break;

      case 'turning-point':
        leadParagraph = polishThaiFlow(
          `เมื่อถามหาสัญญาณจุดเปลี่ยนหรือจังหวะปลดล็อกของ${topicPhrase} ไพ่ ${fullCard} ชี้เป้าเชื่อมกับไพ่ ${anchorMain} ว่าจุดขยับตัวจะเริ่มเห็นได้เมื่อเกิดบรรยากาศของ "${oneLiner}" — ${core}`,
        );
        actionTakeaway = polishThaiFlow(
          `ระหว่างรอจังหวะปลดล็อกนี้ สิ่งที่คุณเตรียมรอรับมือไว้ได้เลยคือ ${tip} พอโอกาสเปิดเข้ามาจะได้คว้าได้ทันทีค่ะ`,
        );
        break;

      case 'best-action':
      default:
        leadParagraph = polishThaiFlow(
          `เมื่อถามต่อว่าตอนนี้ควรวางตัวหรือขยับตัวยังไงให้เรื่อง${topicPhrase}ออกมาดีที่สุด ไพ่ ${fullCard} ขึ้นมาเสริมไพ่ ${anchorMain} แบบตรงประเด็นว่า ${core}${courtPerson ? ` ${courtPerson}` : ''}`,
        );
        actionTakeaway = polishThaiFlow(
          `สรุปก้าวที่นำไปทำได้ทันทีตั้งแต่วันนี้เลยก็คือ ${tip}`,
        );
        break;
    }

    return {
      intent,
      intentQuestion: intentDef.labelTh,
      intentBadge: intentDef.shortTagTh,
      cardId: card.id,
      cardName: cName,
      cardSubtitle: card.subtitleTh,
      image: card.image,
      reversed,
      oneLiner,
      leadParagraph,
      actionTakeaway,
    };
  }

  // English Clarifier synthesis
  const coreEn = reversed ? card.reversedEn : card.uprightEn;
  const courtEn = buildCourtPersonaNote(card, reversed, topic, subTag, intent === 'other-heart' ? 'other' : 'advice', 'en');

  let leadEn: string;
  let takeawayEn: string;

  switch (intent) {
    case 'other-heart':
      leadEn = `Asking into the other person’s deeper stance around ${topicPhrase}, ${fullCard} clarifies ${anchorMain}: ${coreEn}${courtEn ? ` ${courtEn}` : ''}`;
      takeawayEn = `Respond with unhurried warmth, letting consistent real-world actions speak clearer than assumptions.`;
      break;
    case 'watchout':
      leadEn = `Checking the key blind spot to watch alongside ${anchorMain}, ${fullCard} highlights where extra mindfulness pays off: ${coreEn}`;
      takeawayEn = `Spotting this early gives you full room to pace yourself, keep clear boundaries, and avoid unnecessary friction.`;
      break;
    case 'turning-point':
      leadEn = `Pointing to the breakthrough catalyst behind ${anchorMain}, ${fullCard} signals that momentum shifts through ${card.keywordsEn.slice(0, 2).join(' and ')}: ${coreEn}`;
      takeawayEn = `Prepare steady ground now so when this opening appears, you can step into it smoothly.`;
      break;
    case 'best-action':
    default:
      leadEn = `Focusing on your smartest next move alongside ${anchorMain}, ${fullCard} answers directly: ${coreEn}${courtEn ? ` ${courtEn}` : ''}`;
      takeawayEn = `Lean into ${card.keywordsEn[0] ?? 'clear intention'} through one grounded, practical step this week.`;
      break;
  }

  return {
    intent,
    intentQuestion: intentDef.labelEn,
    intentBadge: intentDef.shortTagEn,
    cardId: card.id,
    cardName: cName,
    cardSubtitle: undefined,
    image: card.image,
    reversed,
    oneLiner,
    leadParagraph: leadEn,
    actionTakeaway: takeawayEn,
  };
}

/* ==================== 3. Tarot Journal Memory ==================== */

export interface JournalMemoryNote {
  kind: 'recurring-card' | 'topic-continuity';
  badge: string;
  message: string;
}

function formatShortDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
    day: 'numeric',
    month: 'short',
  });
}

export function buildJournalMemory(
  drawn: LeadInCardCtx[],
  primaryTopic: ReadingTopic,
  overallValence: CardValence,
  priorRecords: ReadingRecord[],
  lang: Lang,
): JournalMemoryNote | null {
  if (!priorRecords || priorRecords.length === 0 || drawn.length === 0) return null;

  const recent = priorRecords.slice(0, 6);

  // 1) Check for a recurring card between today's main spread and recent journal history
  for (const prev of recent) {
    for (const d of drawn) {
      const prevMatch = prev.cards.find((pc) => pc.id === d.card.id);
      if (prevMatch) {
        const cardObj = getCardById(d.card.id) ?? d.card;
        const cName = lang === 'th' ? cardObj.nameTh : cardObj.nameEn;
        const dateStr = formatShortDate(prev.createdAt, lang);
        const dateChunkTh = dateStr ? `เมื่อวันที่ ${dateStr}` : 'ในการเปิดไพ่รอบก่อน';
        const dateChunkEn = dateStr ? `on ${dateStr}` : 'in a recent reading';

        const flippedChange = prevMatch.reversed !== d.reversed;
        const cameTrueBoost = prev.accuracy === 'yes';

        if (lang === 'th') {
          let orientationNote: string;
          if (flippedChange && prevMatch.reversed && !d.reversed) {
            orientationNote = 'แถมรอบนั้นเคยขึ้นกลับหัว แต่วันนี้พลิกกลับมาตั้งตรงแล้ว สะท้อนว่าสิ่งที่เคยติดขัดในใจเริ่มคลี่คลายเข้าที่ขึ้นจริง';
          } else if (flippedChange && !prevMatch.reversed && d.reversed) {
            orientationNote = 'โดยรอบนี้พลิกมาขึ้นมุมกลับหัว เพื่อชวนให้หันกลับมาทบทวนรายละเอียดข้างในใจให้ลึกขึ้นกว่าเดิม';
          } else {
            orientationNote = 'การที่ไพ่ใบเดิมแวะกลับมาทักซ้ำ แปลว่าบทเรียนหรือพลังงานเรื่องนี้ยังเป็นกุญแจสำคัญที่คุณไม่ควรมองข้าม';
          }

          const accuracyTail = cameTrueBoost
            ? ' (ยิ่งรอบนั้นคุณเคยบันทึกไว้ในสมุดว่าเกิดขึ้นจริงด้วย รอบนี้ยิ่งน่าฟังเสียงสะกิดจากไพ่ใบนี้เป็นพิเศษเลยค่ะ)'
            : 'ค่ะ';

          return {
            kind: 'recurring-card',
            badge: `ไพ่ใบเดิมกลับมาทักซ้ำ · ${cName}`,
            message: `แอบสังเกตจากสมุดบันทึกของคุณนะ ไพ่ ${cName} เคยขึ้นมาหาคุณมาแล้ว${dateChunkTh} ${orientationNote}${accuracyTail}`,
          };
        }

        const orientEn =
          flippedChange && prevMatch.reversed && !d.reversed
            ? 'Last time it appeared reversed, and today it turns upright — a clear sign that blocked energy is beginning to move.'
            : flippedChange
              ? 'Appearing in the opposite orientation today invites a fresh inward angle on a familiar theme.'
              : 'Seeing the exact same card return signals an ongoing lesson worth paying close attention to.';

        return {
          kind: 'recurring-card',
          badge: `Recurring Card · ${cName}`,
          message: `From your reading journal, ${cName} also appeared ${dateChunkEn}. ${orientEn}${cameTrueBoost ? ' (You marked that earlier reading as came true, making this echo extra notable.)' : ''}`,
        };
      }
    }
  }

  // 2) Check for topic continuity if the user is revisiting the same life area
  if (primaryTopic !== 'general') {
    const sameTopicPrev = recent.find((r) => r.profile.topics?.includes(primaryTopic));
    if (sameTopicPrev) {
      const dateStr = formatShortDate(sameTopicPrev.createdAt, lang);
      const tLabel = getTopicLabel(primaryTopic, lang);
      if (lang === 'th') {
        const toneShift =
          overallValence === 'positive'
            ? 'รอบนี้สัญญาณหน้าไพ่ดูโปร่งและเปิดทางเกื้อหนุนให้คุณเดินหน้าได้มั่นใจขึ้นชัดเจนค่ะ'
            : overallValence === 'challenging'
              ? 'รอบนี้ไพ่อยากชวนให้เน้นการประคองจังหวะและเซฟพลังใจตัวเองเป็นหลักก่อน อย่าเพิ่งฝืนเร่งเกินไปนะคะ'
              : 'รอบนี้หน้าไพ่ชวนให้ค่อยๆ ปรับสมดุลและรอดูจังหวะความสม่ำเสมอต่อเนื่องจากครั้งก่อนค่ะ';

        return {
          kind: 'topic-continuity',
          badge: `ติดตามพัฒนาการ · ${tLabel}`,
          message: `เห็นคุณกลับมาเช็กเรื่อง${tLabel}ต่อเนื่องจาก${dateStr ? `วันที่ ${dateStr}` : 'ครั้งก่อน'} ${toneShift}`,
        };
      }

      return {
        kind: 'topic-continuity',
        badge: `Ongoing Thread · ${tLabel}`,
        message: `Following up on your ${tLabel.toLowerCase()} reading${dateStr ? ` from ${dateStr}` : ''}, today’s spread shifts focus toward ${overallValence === 'positive' ? 'brightening momentum and open doors.' : overallValence === 'challenging' ? 'patient self-care and grounded pacing.' : 'steady observation and balance.'}`,
      };
    }
  }

  return null;
}
