// Tarot Birth Card (Personality & Soul Card) numerology + Zodiac Element resonance.
// Uses the Mary K. Greer Western Tarotology reduction (MM + DD + YYYY -> 1..22 -> 1..9)
// paired with Tropical Zodiac native element vs. drawn spread elemental balance.

import { getCardById } from '@/data/cards';
import type { CardData, CardValence, Element, ReadingTopic } from '@/data/card-types';
import { getTopicLabel } from '@/data/focus-topics';
import type { Lang } from './variants-th';

export const MAJOR_ELEMENT: Record<string, Element> = {
  'major-00-fool': 'air',
  'major-01-magician': 'air',
  'major-02-high-priestess': 'water',
  'major-03-empress': 'earth',
  'major-04-emperor': 'fire',
  'major-05-hierophant': 'earth',
  'major-06-lovers': 'air',
  'major-07-chariot': 'water',
  'major-08-strength': 'fire',
  'major-09-hermit': 'earth',
  'major-10-wheel-of-fortune': 'fire',
  'major-11-justice': 'air',
  'major-12-hanged-man': 'water',
  'major-13-death': 'water',
  'major-14-temperance': 'fire',
  'major-15-devil': 'earth',
  'major-16-tower': 'fire',
  'major-17-star': 'air',
  'major-18-moon': 'water',
  'major-19-sun': 'fire',
  'major-20-judgement': 'fire',
  'major-21-world': 'earth',
};

const MAJOR_NUMBER_TO_ID: Record<number, string> = {
  0: 'major-00-fool',
  1: 'major-01-magician',
  2: 'major-02-high-priestess',
  3: 'major-03-empress',
  4: 'major-04-emperor',
  5: 'major-05-hierophant',
  6: 'major-06-lovers',
  7: 'major-07-chariot',
  8: 'major-08-strength',
  9: 'major-09-hermit',
  10: 'major-10-wheel-of-fortune',
  11: 'major-11-justice',
  12: 'major-12-hanged-man',
  13: 'major-13-death',
  14: 'major-14-temperance',
  15: 'major-15-devil',
  16: 'major-16-tower',
  17: 'major-17-star',
  18: 'major-18-moon',
  19: 'major-19-sun',
  20: 'major-20-judgement',
  21: 'major-21-world',
};

export function getCardEffectiveElement(card: CardData): Element {
  return card.element ?? MAJOR_ELEMENT[card.id] ?? 'air';
}

export const ELEMENT_NAMES: Record<Element, { th: string; en: string }> = {
  fire: { th: 'ธาตุไฟ', en: 'Fire' },
  earth: { th: 'ธาตุดิน', en: 'Earth' },
  air: { th: 'ธาตุลม', en: 'Air' },
  water: { th: 'ธาตุน้ำ', en: 'Water' },
};

interface ZodiacInfo {
  nameTh: string;
  nameEn: string;
  element: Element;
}

function getZodiacFromMonthDay(month: number, day: number): ZodiacInfo {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { nameTh: 'ราศีเมษ', nameEn: 'Aries', element: 'fire' };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { nameTh: 'ราศีพฤษภ', nameEn: 'Taurus', element: 'earth' };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { nameTh: 'ราศีเมถุน', nameEn: 'Gemini', element: 'air' };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { nameTh: 'ราศีกรกฎ', nameEn: 'Cancer', element: 'water' };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { nameTh: 'ราศีสิงห์', nameEn: 'Leo', element: 'fire' };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { nameTh: 'ราศีกันย์', nameEn: 'Virgo', element: 'earth' };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { nameTh: 'ราศีตุลย์', nameEn: 'Libra', element: 'air' };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { nameTh: 'ราศีพิจิก', nameEn: 'Scorpio', element: 'water' };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { nameTh: 'ราศีธนู', nameEn: 'Sagittarius', element: 'fire' };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { nameTh: 'ราศีมังกร', nameEn: 'Capricorn', element: 'earth' };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { nameTh: 'ราศีกุมภ์', nameEn: 'Aquarius', element: 'air' };
  }
  return { nameTh: 'ราศีมีน', nameEn: 'Pisces', element: 'water' };
}

interface BirthArchetypeCopy {
  archetypeTh: string;
  archetypeEn: string;
  giftTh: string;
  giftEn: string;
  balanceTipTh: string;
  balanceTipEn: string;
}

const BIRTH_ARCHETYPES: Record<number, BirthArchetypeCopy> = {
  0: {
    archetypeTh: 'จิตวิญญาณนักบุกเบิกผู้เป็นอิสระ',
    archetypeEn: 'The Free-Spirited Pioneer',
    giftTh: 'พื้นดวงของคุณเป็นคนเปิดกว้าง ปรับตัวไว และมีสัญชาตญาณในการเริ่มต้นสิ่งใหม่โดยไม่ยึดติดกรอบเดิม',
    giftEn: 'By nature you carry an open, adaptable spirit that spots fresh possibilities before others do.',
    balanceTipTh: 'ใช้ความยืดหยุ่นที่เป็นจุดแข็งควบคู่กับการวางแผนรองรับอีกนิด จะยิ่งไปได้ไกลและมั่นคงค่ะ',
    balanceTipEn: 'Pair your natural spontaneity with one simple grounding plan so your leaps land steadily.',
  },
  1: {
    archetypeTh: 'นักสร้างสรรค์และผู้เปลี่ยนไอเดียให้เป็นจริง',
    archetypeEn: 'The Resourceful Manifestor',
    giftTh: 'พื้นดวงของคุณมีไหวพริบดี สื่อสารเก่ง และมักหาทางออกพลิกแพลงสถานการณ์ด้วยความสามารถของตัวเองได้เสมอ',
    giftEn: 'You naturally possess quick wit, clear communication, and the ability to turn ideas into tangible results.',
    balanceTipTh: 'ระวังการแบกทุกอย่างไว้ทำเองคนเดียว เลือกโฟกัสจุดสำคัญที่สุดก่อนแล้วพลังของคุณจะยิ่งคมชัดค่ะ',
    balanceTipEn: 'Avoid scattering your energy across too many fronts — channeling your focus into one priority unlocks your best magic.',
  },
  2: {
    archetypeTh: 'ผู้หยั่งรู้และเข้าใจความรู้สึกเบื้องลึก',
    archetypeEn: 'The Intuitive Seer',
    giftTh: 'คุณเป็นคนเซ้นส์ไว อ่านบรรยากาศและจังหวะอารมณ์ของคนรอบข้างออกได้ลึกซึ้งแม้ไม่ต้องพูดกันเยอะ',
    giftEn: 'Your inner radar is remarkably sharp — you sense unspoken nuances and emotional currents effortlessly.',
    balanceTipTh: 'เชื่อเสียงสัญชาตญาณแรกของตัวเอง แต่อย่าเก็บความรู้สึกทุกอย่างไว้เงียบๆ คนเดียวจนอึดอัดใจนะคะ',
    balanceTipEn: 'Trust your quiet first instinct, while allowing yourself to voice your needs openly instead of holding everything inside.',
  },
  3: {
    archetypeTh: 'ผู้มอบความอบอุ่นและพลังแห่งการเติบโต',
    archetypeEn: 'The Warm Nurturer',
    giftTh: 'พื้นดวงของคุณมีเสน่ห์ของความใส่ใจ ดูแลคนรอบตัวเก่ง และมีพลังสร้างสรรค์ที่ทำให้เรื่องยากค่อยๆ งอกงามได้',
    giftEn: 'You radiate warmth, creativity, and steady care that helps people and projects blossom around you.',
    balanceTipTh: 'อย่าลืมแบ่งความใจดีที่มักมอบให้คนอื่น กลับมาเติมพลังและดูแลหัวใจตัวเองให้เต็มอิ่มก่อนเสมอค่ะ',
    balanceTipEn: 'Remember to pour the same generous care back into your own wellbeing before tending to everyone else.',
  },
  4: {
    archetypeTh: 'เสาหลักผู้สร้างความมั่นคงและชัดเจน',
    archetypeEn: 'The Steady Architect',
    giftTh: 'คุณเป็นคนมีความรับผิดชอบสูง รักความชัดเจน และสร้างความมั่นคงให้ชีวิตด้วยลำแข้งและวินัยของตัวเอง',
    giftEn: 'You carry natural leadership, reliability, and the discipline to build lasting structure out of chaos.',
    balanceTipTh: 'ผ่อนความเข้มงวดกับตัวเองลงบ้างในวันที่ปัจจัยรอบข้างยังไม่เป็นใจ ความยืดหยุ่นจะช่วยให้ใจเบาขึ้นมากค่ะ',
    balanceTipEn: 'Allow room for softness when plans shift — flexibility complements your strength without weakening it.',
  },
  5: {
    archetypeTh: 'ที่ปรึกษาผู้ยึดมั่นในคุณค่าและความจริงใจ',
    archetypeEn: 'The Grounded Mentor',
    giftTh: 'พื้นดวงของคุณเป็นคนมีหลักการ น่าเชื่อถือ มองการณ์ไกล และมักเป็นที่พึ่งทางความคิดให้คนใกล้ตัวเสมอ',
    giftEn: 'People naturally trust your wisdom, integrity, and steady perspective when navigating life choices.',
    balanceTipTh: 'อนุญาตให้ตัวเองลองวิธีใหม่ๆ นอกกรอบความคุ้นเคยดูบ้าง จะช่วยให้ค้นพบทางออกที่สบายใจกว่าเดิมค่ะ',
    balanceTipEn: 'Give yourself permission to explore unconventional approaches alongside tried-and-true wisdom.',
  },
  6: {
    archetypeTh: 'ผู้เชื่อมโยงหัวใจและทางเลือกที่ซื่อตรงต่อใจ',
    archetypeEn: 'The Heart-Aligned Connector',
    giftTh: 'คุณให้ความสำคัญกับความจริงใจ ความลงตัวของความสัมพันธ์ และการเลือกสิ่งที่สอดคล้องกับคุณค่าในใจจริงๆ',
    giftEn: 'You thrive on genuine connection, harmony, and choices that truly align with your deepest values.',
    balanceTipTh: 'เวลาต้องตัดสินใจ อย่ามัวเกรงใจคนรอบข้างจนลืมถามว่าใจตัวเองต้องการอะไรจริงๆ นะคะ',
    balanceTipEn: 'When weighing options, listen to your own authentic alignment rather than trying to please every side.',
  },
  7: {
    archetypeTh: 'นักสู้ผู้มุ่งมั่นและก้าวข้ามขีดจำกัด',
    archetypeEn: 'The Focused Navigator',
    giftTh: 'พื้นดวงของคุณมีพลังใจเข้มแข็ง เวลาตั้งเป้าเรื่องไหนแล้วจะลุยฝ่าอุปสรรคไปจนถึงปลายทางได้อย่างน่าทึ่ง',
    giftEn: 'Once your heart sets a target, your determination and directional drive can carry you through steep terrain.',
    balanceTipTh: 'ไม่ใช่ทุกเรื่องที่ต้องเร่งเครื่องพุ่งชนเสมอไป บางจังหวะการผ่อนคันเร่งลงนิดหนึ่งกลับทำให้เห็นทางลัดที่ชัดกว่าค่ะ',
    balanceTipEn: 'Not every stretch requires full throttle — easing the pace at key turns helps you steer with effortless precision.',
  },
  8: {
    archetypeTh: 'หัวใจที่เข้มแข็งอย่างอ่อนโยน',
    archetypeEn: 'The Gentle Lionheart',
    giftTh: 'คุณเป็นคนอดทนสูง มีความเมตตา และรับมือกับเรื่องกดดันด้วยความนิ่งสุขุมได้ดีกว่าที่ตัวเองคิดไว้มาก',
    giftEn: 'Beneath your calm warmth lies quiet resilience — you tame storms through patience rather than force.',
    balanceTipTh: 'ไม่ต้องฝืนเข้มแข็งตลอดเวลาก็ได้นะคะ การยอมรับความเหนื่อยและพักพิงคนไว้ใจบ้างคือความกล้าหาญอีกรูปแบบหนึ่งค่ะ',
    balanceTipEn: 'You do not have to carry quiet bravery alone every day — letting yourself rest is part of real strength.',
  },
  9: {
    archetypeTh: 'นักคิดผู้ลึกซึ้งและเข้าใจโลกจากข้างใน',
    archetypeEn: 'The Inner Lantern',
    giftTh: 'พื้นดวงของคุณเป็นคนช่างสังเกต คิดละเอียด รอบคอบ และมักมองเห็นแก่นแท้ของปัญหาที่คนอื่นมองข้าม',
    giftEn: 'You possess thoughtful depth, discernment, and an inner compass that sees straight to the truth of things.',
    balanceTipTh: 'ระวังการเก็บตัวคิดวนคนเดียวนานเกินไป การแชร์มุมมองกับคนที่เข้าใจจะช่วยเติมแสงสว่างให้ใจเร็วขึ้นค่ะ',
    balanceTipEn: 'Guard against retreating too far into over-analysis — sharing your thoughts aloud brings fresh air and relief.',
  },
  10: {
    archetypeTh: 'ผู้พลิกจังหวะชีวิตและเข้าใจการเปลี่ยนแปลง',
    archetypeEn: 'The Cycle Weaver',
    giftTh: 'คุณเป็นคนอ่านจังหวะโอกาสเก่ง ปรับตัวรับความเปลี่ยนแปลงได้ไว และมักมีจังหวะพลิกฟื้นตัวที่เหนือความคาดหมาย',
    giftEn: 'You have an intuitive feel for timing and life cycles, turning unexpected shifts into new openings.',
    balanceTipTh: 'ในวันที่จังหวะรอบตัวหมุนไว การยึดตารางชีวิตพื้นฐานที่สม่ำเสมอจะช่วยให้ใจคุณมั่นคงไม่แกว่งตามคลื่นค่ะ',
    balanceTipEn: 'When external momentum spins fast, anchor yourself in simple daily routines to stay centered.',
  },
  11: {
    archetypeTh: 'ผู้รักความเป็นธรรมและความชัดเจนตรงไปตรงมา',
    archetypeEn: 'The Clear Balancer',
    giftTh: 'พื้นดวงของคุณมีเหตุผล ซื่อตรง ยุติธรรม และแยกแยะข้อเท็จจริงออกจากอารมณ์ได้อย่างเฉียบขาด',
    giftEn: 'Clarity, fairness, and balanced judgment are your hallmarks — you weigh situations with rare honesty.',
    balanceTipTh: 'ในเรื่องของความรู้สึก ไม่จำเป็นต้องชั่งตวงหาเหตุผลร้อยเปอร์เซ็นต์ทุกครั้ง เปิดพื้นที่ให้ความอ่อนโยนนำทางบ้างนะคะ',
    balanceTipEn: 'Matters of the heart rarely fit neat equations — allow compassion to sit beside logic.',
  },
  12: {
    archetypeTh: 'ผู้มองเห็นมุมต่างและเข้าใจชีวิตอย่างลึกซึ้ง',
    archetypeEn: 'The Perspective Shifter',
    giftTh: 'คุณมีมุมมองที่ไม่เหมือนใคร เข้าใจหัวอกคนอื่น และสามารถพลิกวิกฤตให้กลายเป็นบทเรียนที่งดงามได้เสมอ',
    giftEn: 'You see angles others miss, bringing empathy and creative reframing to complex situations.',
    balanceTipTh: 'ระวังการยอมเสียสละหรือรอคอยคนอื่นนานเกินไปจนลืมขยับก้าวเพื่อความสุขของตัวเองนะคะ',
    balanceTipEn: 'Be mindful not to put your own life on indefinite hold for others — your timeline matters too.',
  },
  13: {
    archetypeTh: 'ผู้กล้าผลัดใบเพื่อเริ่มต้นใหม่ที่แท้จริง',
    archetypeEn: 'The Phoenix Transformer',
    giftTh: 'พื้นดวงของคุณมีพลังฟื้นตัวสูงมาก เมื่อถึงจุดที่ตัดสินใจตัดสิ่งที่ไม่ใช่แล้ว คุณจะก้าวสู่บทใหม่ได้แข็งแกร่งกว่าใคร',
    giftEn: 'You carry profound regenerative power — once you release what has run its course, you rise stronger than before.',
    balanceTipTh: 'ไม่ต้องกลัวการวางสิ่งเก่าที่หมดเวลาลงนะคะ ยิ่งมือว่างเร็วเท่าไหร่ สิ่งดีๆ ที่คู่ควรก็จะยิ่งเข้ามาแทนที่ไวขึ้นค่ะ',
    balanceTipEn: 'Trust natural endings without clinging — clearing outworn chapters makes immediate room for renewal.',
  },
  14: {
    archetypeTh: 'ผู้ประสานความต่างและสร้างสมดุลที่พอดี',
    archetypeEn: 'The Harmonious Alchemist',
    giftTh: 'คุณเป็นคนประนีประนอมเก่ง ผสมผสานสิ่งตรงข้ามให้ลงตัวได้แนบเนียน และมีพลังเยียวยาบรรยากาศรอบข้าง',
    giftEn: 'You blend contrasting energies with grace, bringing calm moderation and healing wherever tension arises.',
    balanceTipTh: 'อย่ามัวเกรงใจรักษาสมดุลให้คนอื่นจนฝืนกลืนความต้องการของตัวเองไว้ข้างในนะคะ',
    balanceTipEn: 'Keeping the peace should never mean silencing your own needs — include yourself in the harmony you create.',
  },
  15: {
    archetypeTh: 'ผู้เปี่ยมแรงดึงดูดและความมุ่งมั่นทะเยอทะยาน',
    archetypeEn: 'The Magnetic Realist',
    giftTh: 'พื้นดวงของคุณมีเสน่ห์เฉพาะตัว มองโลกตามความเป็นจริง และมีความมุ่งมั่นสูงมากในสิ่งที่ตัวเองทุ่มเท',
    giftEn: 'You hold strong charisma, sharp realism, and unmistakable drive toward tangible success and passion.',
    balanceTipTh: 'สังเกตจุดที่ความทุ่มเทเริ่มกลายเป็นความยึดติด เมื่อไหร่ที่รู้ตัวว่าถอยออกมาได้เสมอ คุณจะทรงพลังที่สุดค่ะ',
    balanceTipEn: 'Notice when dedication turns into attachment — knowing you can step back freely keeps your power intact.',
  },
  16: {
    archetypeTh: 'ผู้ปลดล็อกความจริงและสร้างรากฐานใหม่ที่แข็งแรง',
    archetypeEn: 'The Truth Awakener',
    giftTh: 'คุณเป็นคนซื่อสัตย์ต่อความจริง ไม่ชอบการหลอกตัวเอง และมีความกล้าที่จะรื้อสิ่งเปราะบางเพื่อสร้างสิ่งที่ดีกว่า',
    giftEn: 'You value authentic truth over fragile illusions and have the courage to rebuild stronger after sudden shifts.',
    balanceTipTh: 'ค่อยๆ ขยับเปลี่ยนแปลงทีละจุดตั้งแต่เนิ่นๆ จะช่วยลดแรงปะทะและทำให้การปรับตัวราบรื่นสบายใจขึ้นค่ะ',
    balanceTipEn: 'Making small proactive adjustments early keeps life evolving smoothly without waiting for pressure to build.',
  },
  17: {
    archetypeTh: 'แสงดาวแห่งความหวังและแรงบันดาลใจ',
    archetypeEn: 'The Guiding Starlight',
    giftTh: 'พื้นดวงของคุณเป็นคนมีจิตใจงดงาม มองโลกอย่างมีความหวัง และเป็นแรงบันดาลใจที่ชุบชูใจคนรอบข้างได้เสมอ',
    giftEn: 'You carry quiet hope, authenticity, and an inspiring presence that naturally uplifts those around you.',
    balanceTipTh: 'แปลงความหวังและภาพฝันในใจให้เป็นก้าวเล็กๆ ที่ลงมือทำได้ในแต่ละสัปดาห์ แล้วฝันของคุณจะจับต้องได้จริงค่ะ',
    balanceTipEn: 'Anchor your bright vision in small weekly steps so your inspiration turns into concrete reality.',
  },
  18: {
    archetypeTh: 'นักเดินทางแห่งอารมณ์และจินตนาการอันลึกซึ้ง',
    archetypeEn: 'The Deep Dreamweaver',
    giftTh: 'คุณมีความละเอียดอ่อนทางอารมณ์สูง จินตนาการล้ำลึก และรับรู้ความรู้สึกซ่อนเร้นของสถานการณ์ได้แม่นยำ',
    giftEn: 'Your emotional sensitivity and creative imagination pick up subtle undercurrents invisible to logic alone.',
    balanceTipTh: 'แยกความกังวลที่จินตนาการไปล่วงหน้าออกจากข้อเท็จจริงตรงหน้า จะช่วยให้เซ้นส์ของคุณแม่นและใจสงบขึ้นมากค่ะ',
    balanceTipEn: 'Gently separate imagined worst-case stories from present facts so your intuition shines without anxiety.',
  },
  19: {
    archetypeTh: 'พลังแห่งความสดใสและหัวใจที่เปิดเผยจริงใจ',
    archetypeEn: 'The Radiant Sunbeam',
    giftTh: 'พื้นดวงของคุณเปี่ยมด้วยพลังบวก ความจริงใจตรงไปตรงมา และดึงดูดโอกาสดีๆ เข้ามาด้วยความสว่างในตัวเอง',
    giftEn: 'Warmth, vitality, and open-hearted sincerity make you a natural magnet for goodwill and bright opportunities.',
    balanceTipTh: 'อนุญาตให้ตัวเองมีวันที่เหนื่อยหรือเงียบได้โดยไม่ต้องฝืนยิ้มสู้ตลอดเวลา พลังของคุณจะกลับมาสดใสไวกว่าเดิมค่ะ',
    balanceTipEn: 'Let yourself have quiet, low-key days without feeling pressured to shine nonstop for everyone else.',
  },
  20: {
    archetypeTh: 'ผู้ตื่นรู้และก้าวสู่บทใหม่ด้วยความเข้าใจตัวเอง',
    archetypeEn: 'The Awakened Caller',
    giftTh: 'คุณเป็นคนเรียนรู้จากอดีตได้ลึกซึ้ง รู้จักให้อภัยและยกระดับตัวเองก้าวข้ามเรื่องเดิมไปสู่จุดที่ดีกว่าเสมอ',
    giftEn: 'You turn past lessons into clear self-knowledge, answering inner callings with honesty and courage.',
    balanceTipTh: 'หยุดตัดสินความผิดพลาดในอดีตของตัวเองอย่างใจดี เพราะทุกก้าวที่ผ่านมาได้หล่อหลอมคุณในเวอร์ชันที่เก่งขึ้นวันนี้ค่ะ',
    balanceTipEn: 'Release self-criticism over old chapters — every past step prepared the clarity you stand in now.',
  },
  21: {
    archetypeTh: 'ผู้หลอมรวมประสบการณ์สู่ความสมบูรณ์ในแบบของตน',
    archetypeEn: 'The Whole-World Integrator',
    giftTh: 'พื้นดวงของคุณมองเห็นภาพกว้าง เข้าใจความเชื่อมโยงของชีวิต และมักทำสิ่งที่ตั้งใจให้สำเร็จครบถ้วนได้อย่างสง่างาม',
    giftEn: 'You naturally see the big picture, weaving diverse experiences into meaningful, lasting fulfillment.',
    balanceTipTh: 'ชื่นชมความสำเร็จในแต่ละก้าวเล็กๆ ระหว่างทางบ้าง ไม่ต้องรอให้สมบูรณ์แบบครบทุกจุดก่อนถึงจะภูมิใจในตัวเองค่ะ',
    balanceTipEn: 'Celebrate milestones along the journey rather than waiting for total perfection before feeling proud.',
  },
};

export interface BirthProfile {
  year: number;
  month: number;
  day: number;
  personalityNumber: number;
  soulNumber: number;
  personalityCard: CardData;
  soulCard: CardData;
  zodiac: ZodiacInfo;
}

export function computeBirthProfile(birthdate: string): BirthProfile | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthdate.trim());
  if (!m) return null;
  let year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  // Support Thai Buddhist Era years seamlessly if entered
  if (year >= 2400) year -= 543;
  if (year < 1900 || year > 2100) return null;

  const check = new Date(year, month - 1, day);
  if (
    Number.isNaN(check.getTime()) ||
    check.getMonth() !== month - 1 ||
    check.getDate() !== day
  ) {
    return null;
  }

  // Mary K. Greer canonical Birth Card reduction (Who Are You in the Tarot?):
  // MM + DD + CC + YY -> reduce via Math.floor(n / 10) + (n % 10) until <= 22.
  const century = Math.floor(year / 100);
  const twoDigitYear = year % 100;
  let n = month + day + century + twoDigitYear;
  while (n > 22) {
    n = Math.floor(n / 10) + (n % 10);
  }
  const personalityNumber = n === 22 ? 0 : n;

  let soulNumber: number;
  if (n === 22) {
    soulNumber = 4; // 2 + 2 = 4 (The Fool & The Emperor pair)
  } else {
    let s = n;
    while (s > 9) {
      s = Math.floor(s / 10) + (s % 10);
    }
    soulNumber = s;
  }

  const personalityCard = getCardById(MAJOR_NUMBER_TO_ID[personalityNumber]);
  const soulCard = getCardById(MAJOR_NUMBER_TO_ID[soulNumber]);
  if (!personalityCard || !soulCard) return null;

  return {
    year,
    month,
    day,
    personalityNumber,
    soulNumber,
    personalityCard,
    soulCard,
    zodiac: getZodiacFromMonthDay(month, day),
  };
}

export type ElementRelation = 'amplified' | 'supportive' | 'balancing';

export function getElementRelation(nativeEl: Element, spreadEl: Element): ElementRelation {
  if (nativeEl === spreadEl) return 'amplified';
  const supportivePairs =
    (nativeEl === 'fire' && spreadEl === 'air') ||
    (nativeEl === 'air' && spreadEl === 'fire') ||
    (nativeEl === 'earth' && spreadEl === 'water') ||
    (nativeEl === 'water' && spreadEl === 'earth');
  return supportivePairs ? 'supportive' : 'balancing';
}

export interface SoulLensReading {
  personalityCardId: string;
  personalityCardName: string;
  personalityCardSubtitle?: string;
  personalityCardImage: string;
  soulCardId: string;
  soulCardName: string;
  soulCardSubtitle?: string;
  soulCardImage: string;
  isUnifiedArchetype: boolean;
  archetypeTitle: string;
  zodiacLabel: string;
  elementRelation: ElementRelation;
  elementRelationBadge: string;
  matchedInSpread: boolean;
  matchedCardName?: string;
  archetypeSummary: string;
  spreadResonance: string;
  balanceAdvice: string;
}

export function buildSoulLens(
  birthdate: string,
  drawnCards: { card: CardData; reversed: boolean }[],
  topic: ReadingTopic,
  dominantSpreadElement: Element,
  overallValence: CardValence,
  lang: Lang,
): SoulLensReading | null {
  const bp = computeBirthProfile(birthdate);
  if (!bp || drawnCards.length === 0) return null;

  const { personalityCard, soulCard, personalityNumber, soulNumber, zodiac } = bp;
  const isUnified = personalityNumber === soulNumber;
  const arch = BIRTH_ARCHETYPES[personalityNumber] ?? BIRTH_ARCHETYPES[soulNumber];
  const soulArch = BIRTH_ARCHETYPES[soulNumber] ?? arch;

  // Check if user drew their own Personality or Soul card on the main spread
  const matchedEntry = drawnCards.find(
    (d) => d.card.id === personalityCard.id || d.card.id === soulCard.id,
  );
  const matchedInSpread = Boolean(matchedEntry);
  const matchedCardName = matchedEntry
    ? lang === 'th'
      ? matchedEntry.card.nameTh
      : matchedEntry.card.nameEn
    : undefined;

  const nativeEl = zodiac.element;
  const relation = getElementRelation(nativeEl, dominantSpreadElement);
  const nativeElName = ELEMENT_NAMES[nativeEl][lang];
  const spreadElName = ELEMENT_NAMES[dominantSpreadElement][lang];
  const topicLabel = getTopicLabel(topic, lang);

  let elementRelationBadge: string;
  if (lang === 'th') {
    if (relation === 'amplified') {
      elementRelationBadge = `พลังธาตุตรงพื้นดวง (${nativeElName} × ${spreadElName})`;
    } else if (relation === 'supportive') {
      elementRelationBadge = `พลังธาตุเกื้อหนุนกัน (${nativeElName} × ${spreadElName})`;
    } else {
      elementRelationBadge = `พลังธาตุถ่วงดุลมุมมอง (${nativeElName} × ${spreadElName})`;
    }
  } else {
    if (relation === 'amplified') {
      elementRelationBadge = `Amplified Element (${nativeElName} × ${spreadElName})`;
    } else if (relation === 'supportive') {
      elementRelationBadge = `Supportive Elements (${nativeElName} × ${spreadElName})`;
    } else {
      elementRelationBadge = `Balancing Elements (${nativeElName} × ${spreadElName})`;
    }
  }

  const pName = lang === 'th' ? personalityCard.nameTh : personalityCard.nameEn;
  const sName = lang === 'th' ? soulCard.nameTh : soulCard.nameEn;

  let archetypeSummary: string;
  if (lang === 'th') {
    if (isUnified) {
      archetypeSummary = `จากวันเกิดของคุณ ไพ่ประจำตัวทั้งระดับบุคลิกและจิตวิญญาณรวมเป็นหนึ่งเดียวที่ไพ่ ${pName} (${arch.archetypeTh}) ${arch.giftTh}`;
    } else {
      archetypeSummary = `จากวันเกิดของคุณ ไพ่บุคลิกภาพคือ ${pName} (${arch.archetypeTh}) คู่กับไพ่จิตวิญญาณเบื้องลึกคือ ${sName} (${soulArch.archetypeTh}) ${arch.giftTh}`;
    }
  } else {
    if (isUnified) {
      archetypeSummary = `From your birthdate, both your Personality and Soul archetype unite in ${pName} (${arch.archetypeEn}). ${arch.giftEn}`;
    } else {
      archetypeSummary = `From your birthdate, your outer Personality Card is ${pName} (${arch.archetypeEn}), paired with your deeper Soul Card ${sName} (${soulArch.archetypeEn}). ${arch.giftEn}`;
    }
  }

  let spreadResonance: string;
  if (lang === 'th') {
    const syncNote = matchedInSpread
      ? `ความพิเศษของรอบนี้คือคุณหยิบได้ไพ่ประจำตัวของตัวเอง (${matchedCardName}) ขึ้นมาในการเปิดไพ่โดยตรง สะท้อนว่าคำตอบเรื่อง${topicLabel}ไม่ได้อยู่ไกลตัวเลย แต่กำลังปลุกให้คุณกลับมาเชื่อมั่นในสัญชาตญาณและตัวตนแท้จริงของตัวเองค่ะ `
      : '';

    let elBridge: string;
    if (relation === 'amplified') {
      elBridge =
        overallValence === 'challenging'
          ? `เมื่อเจ้าชะตา${zodiac.nameTh} (${nativeElName}) เปิดได้หน้าไพ่ที่เด่นด้วย${spreadElName}เหมือนกัน พลังงานในเรื่อง${topicLabel}จึงเข้มข้นเป็นสองเท่า ระวังอย่าอินหรือกดดันตัวเองตามกระแสอารมณ์ตรงหน้ามากเกินไป`
          : `ในฐานะชาว${zodiac.nameTh} (${nativeElName}) การเปิดได้หน้าไพ่ที่เด่นด้วย${spreadElName}ตรงกับพื้นดวง ช่วยส่งให้จังหวะเรื่อง${topicLabel}เข้าทางธรรมชาติของคุณ สามารถขยับตัวตามความถนัดได้อย่างมั่นใจ`;
    } else if (relation === 'supportive') {
      elBridge = `พื้นดวง${zodiac.nameTh} (${nativeElName}) ของคุณสอดรับกับกระแส${spreadElName}ของหน้าไพ่รอบนี้อย่างกลมกลืน พลังจากไพ่จึงช่วยหนุนให้จุดแข็งของไพ่ ${pName} ทำงานในเรื่อง${topicLabel}ได้ลื่นไหลและเห็นช่องทางคลี่คลายได้ไวขึ้น`;
    } else {
      if (nativeEl === 'fire' && dominantSpreadElement === 'water') {
        elBridge = `พื้นดวง${zodiac.nameTh} (${nativeElName}) ของคุณมักชอบความชัดเจนทันใจ แต่หน้าไพ่รอบนี้เด่นด้วย${spreadElName}ที่ละเอียดอ่อน ไพ่จึงกำลังชวนให้ลดความใจร้อนลงนิด แล้วใช้ความเข้าอกเข้าใจรับมือเรื่อง${topicLabel}แทนการพุ่งชนตรงๆ`;
      } else if (nativeEl === 'water' && dominantSpreadElement === 'air') {
        elBridge = `พื้นดวง${zodiac.nameTh} (${nativeElName}) ของคุณรับรู้ความรู้สึกได้ลึกซึ้ง ในขณะที่หน้าไพ่เด่นด้วย${spreadElName}แห่งเหตุผล รอบนี้การถอยมามองข้อเท็จจริงอย่างตรงไปตรงมาจะช่วยประคองใจเรื่อง${topicLabel}ได้ดีที่สุด`;
      } else if (nativeEl === 'air' && dominantSpreadElement === 'earth') {
        elBridge = `พื้นดวง${zodiac.nameTh} (${nativeElName}) ของคุณมีไอเดียและการคิดวิเคราะห์ที่ไวมาก ส่วนหน้าไพ่เด่นด้วย${spreadElName}ที่เน้นผลลัพธ์จริง ไพ่จึงชวนให้เปลี่ยนความคิดในหัวเรื่อง${topicLabel}ออกมาเป็นการลงมือทำทีละก้าวอย่างสม่ำเสมอ`;
      } else if (nativeEl === 'earth' && dominantSpreadElement === 'fire') {
        elBridge = `พื้นดวง${zodiac.nameTh} (${nativeElName}) ของคุณรักความชัวร์และรอบคอบ ส่วนหน้าไพ่ส่งพลัง${spreadElName}ที่คึกคักเข้ามากระตุ้น จึงเป็นจังหวะดีในเรื่อง${topicLabel}ที่จะกล้าก้าวออกจากความคุ้นเคยเดิมๆ เร็วขึ้นอีกนิด`;
      } else {
        elBridge = `เมื่อเทียบพื้นดวง${zodiac.nameTh} (${nativeElName}) กับหน้าไพ่ที่เด่นด้วย${spreadElName} ไพ่ชุดนี้กำลังเข้ามาเติมมุมมองฝั่งที่คุณอาจไม่คุ้นชิน เพื่อให้การจัดการเรื่อง${topicLabel}กลมกล่อมและรอบด้านยิ่งขึ้น`;
      }
    }
    spreadResonance = `${syncNote}${elBridge}ค่ะ`;
  } else {
    const syncNoteEn = matchedInSpread
      ? `Remarkably, your own Birth Card (${matchedCardName}) appeared directly in this reading — a strong sign that the answer in ${topicLabel.toLowerCase()} comes from trusting your core nature. `
      : '';

    const elBridgeEn =
      relation === 'amplified'
        ? `As a ${zodiac.nameEn} (${nativeElName}), drawing a ${spreadElName}-dominant spread doubles the intensity around ${topicLabel.toLowerCase()} — lean into your natural flow while keeping steady balance.`
        : relation === 'supportive'
          ? `Your ${zodiac.nameEn} (${nativeElName}) nature harmonizes naturally with the ${spreadElName} current of these cards, helping your ${pName} strengths shine smoothly in ${topicLabel.toLowerCase()}.`
          : `Because your ${zodiac.nameEn} (${nativeElName}) temperament meets a contrasting ${spreadElName} spread, these cards invite you to borrow ${spreadElName.toLowerCase()} qualities to round out your approach to ${topicLabel.toLowerCase()}.`;

    spreadResonance = `${syncNoteEn}${elBridgeEn}`;
  }

  return {
    personalityCardId: personalityCard.id,
    personalityCardName: pName,
    personalityCardSubtitle: lang === 'th' ? personalityCard.subtitleTh : undefined,
    personalityCardImage: personalityCard.image,
    soulCardId: soulCard.id,
    soulCardName: sName,
    soulCardSubtitle: lang === 'th' ? soulCard.subtitleTh : undefined,
    soulCardImage: soulCard.image,
    isUnifiedArchetype: isUnified,
    archetypeTitle: lang === 'th' ? arch.archetypeTh : arch.archetypeEn,
    zodiacLabel:
      lang === 'th'
        ? `${zodiac.nameTh} · ${nativeElName}`
        : `${zodiac.nameEn} · ${nativeElName} Element`,
    elementRelation: relation,
    elementRelationBadge,
    matchedInSpread,
    matchedCardName,
    archetypeSummary,
    spreadResonance,
    balanceAdvice: lang === 'th' ? arch.balanceTipTh : arch.balanceTipEn,
  };
}
