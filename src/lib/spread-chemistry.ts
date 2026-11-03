// Spread Chemistry & Direct Card Pairings engine.
// Analyzes the spread as an interconnected whole before card-by-card reading:
// Major Arcana weight, elemental balance/clash, court/reversed/number signals, and 34 iconic pairings.

import type { CardData, CardValence, Element } from '@/data/card-types';
import { ELEMENT_NAMES, getCardEffectiveElement } from './tarot-numerology';
import type { Lang } from './variants-th';

export type ChemistryBadgeTone = 'gold' | 'violet' | 'teal' | 'rose';

export interface ChemistryBadge {
  label: string;
  tone: ChemistryBadgeTone;
}

export interface CardPairingHighlight {
  pairKey: string;
  cardAName: string;
  cardBName: string;
  includesShadow: boolean;
  title: string;
  meaning: string;
}

export interface SpreadChemistry {
  dominantElement: Element;
  overallValence: CardValence;
  majorCount: number;
  totalCards: number;
  badges: ChemistryBadge[];
  pairings: CardPairingHighlight[];
  synthesisText: string;
}

interface RawPairingRule {
  a: string;
  b: string;
  titleTh: string;
  titleEn: string;
  meaningTh: string;
  meaningEn: string;
}

const ICONIC_PAIRINGS: RawPairingRule[] = [
  {
    a: 'major-06-lovers',
    b: 'major-15-devil',
    titleTh: 'แรงดึงดูดสูงกับโจทย์เรื่องขอบเขตใจ',
    titleEn: 'Intense Magnetism & Boundaries',
    meaningTh: 'เป็นคู่ไพ่ที่มีเคมีดึงดูดแรงมาก แต่เตือนให้แยกแยะระหว่างความผูกพันที่ทำให้ใจเป็นสุข กับความผูกมัดที่ทำให้รู้สึกอึดอัดไม่เป็นตัวเองค่ะ',
    meaningEn: 'Strong chemistry meets attachment — pause to distinguish genuine heart connection from unhealthy over-entanglement.',
  },
  {
    a: 'major-16-tower',
    b: 'major-17-star',
    titleTh: 'ฟ้าหลังฝนและการเยียวยาสู่จุดที่ดีกว่า',
    titleEn: 'Clear Skies After Sudden Change',
    meaningTh: 'การเปลี่ยนแปลงกะทันหันหรือสิ่งที่เพิ่งสั่นคลอน กำลังทำหน้าที่กวาดทางเพื่อพาคุณไปสู่ความเบาสบายและความหวังครั้งใหม่ที่สดใสจริงใจกว่าเดิมค่ะ',
    meaningEn: 'What shook loose is actively clearing space for deep healing, relief, and a brighter chapter ahead.',
  },
  {
    a: 'major-13-death',
    b: 'major-20-judgement',
    titleTh: 'ปิดฉากเรื่องเก่าเพื่อตื่นรู้สู่ชีวิตบทใหม่',
    titleEn: 'Complete Chapter Close & Awakening',
    meaningTh: 'จังหวะผลัดใบครั้งใหญ่ที่พาคุณก้าวพ้นวงจรเดิมอย่างเด็ดขาด เพื่อเริ่มต้นเส้นทางใหม่ที่ตรงกับตัวตนของคุณในวันนี้จริงๆ ค่ะ',
    meaningEn: 'A decisive close to an outgrown cycle, awakening a clearer and truer calling.',
  },
  {
    a: 'major-13-death',
    b: 'major-00-fool',
    titleTh: 'วางกระเป๋าใบเก่าแล้วออกเดินทางด้วยใจอิสระ',
    titleEn: 'Clean Ending Into Fresh Adventure',
    meaningTh: 'ทันทีที่คุณยอมปล่อยสิ่งที่หมดเวลาไปแล้ว ประตูการเริ่มต้นใหม่ที่เบาสบายและเป็นอิสระจะเปิดรับทันทีค่ะ',
    meaningEn: 'Releasing what has ended immediately opens an unburdened, fresh beginning.',
  },
  {
    a: 'major-00-fool',
    b: 'major-01-magician',
    titleTh: 'ก้าวแรกที่มาพร้อมเครื่องมือสร้างฝันให้เป็นจริง',
    titleEn: 'Fresh Leap Backed by Real Skill',
    meaningTh: 'ไม่ได้มีแค่ไฟอยากเริ่มต้นใหม่เท่านั้น แต่คุณยังมีทักษะและจังหวะที่ดีพอจะปั้นสิ่งนี้ให้สำเร็จเป็นรูปธรรมได้จริงค่ะ',
    meaningEn: 'Fresh enthusiasm meets practical capability — you have everything needed to turn this new idea into reality.',
  },
  {
    a: 'major-02-high-priestess',
    b: 'major-18-moon',
    titleTh: 'สัญชาตญาณคมชัดท่ามกลางเรื่องที่ยังไม่เปิดเผยหมด',
    titleEn: 'Deep Intuition Amid Unspoken Layers',
    meaningTh: 'สถานการณ์ยังมีรายละเอียดซ่อนอยู่ใต้ผิวน้ำ ให้เชื่อเซ้นส์แรกของตัวเองแต่เฝ้าสังเกตเงียบๆ ไปก่อน อย่าเพิ่งรีบเปิดหน้าไพ่ทั้งหมดค่ะ',
    meaningEn: 'Subtle layers remain unspoken — trust your quiet intuition and observe patiently before acting.',
  },
  {
    a: 'major-18-moon',
    b: 'major-19-sun',
    titleTh: 'หมอกความคลุมเครือกำลังจางลงสู่ความชัดเจน',
    titleEn: 'Fog Lifting Into Bright Clarity',
    meaningTh: 'เรื่องที่เคยสับสน คิดมาก หรือไม่แน่ใจ กำลังจะได้รับคำตอบและความจริงที่โปร่งใสชัดเจนในไม่ช้านี้ค่ะ',
    meaningEn: 'Confusion and second-guessing give way to open truth, warmth, and unmistakable clarity.',
  },
  {
    a: 'major-03-empress',
    b: 'major-04-emperor',
    titleTh: 'สมดุลแห่งความอบอุ่นและความมั่นคงแข็งแรง',
    titleEn: 'Warm Abundance & Solid Structure',
    meaningTh: 'พลังหยิน–หยางที่ลงตัวมาก มีทั้งความใส่ใจอ่อนโยนและโครงสร้างที่พึ่งพาได้จริง ส่งผลดีทั้งเรื่องความสัมพันธ์และการสร้างรากฐานระยะยาวค่ะ',
    meaningEn: 'Nurturing warmth pairs with dependable structure — ideal for lasting relationships and grounded growth.',
  },
  {
    a: 'major-03-empress',
    b: 'wands-04',
    titleTh: 'ข่าวดี ความอิ่มเอมใจ และบรรยากาศที่อบอุ่นมั่นคง',
    titleEn: 'Celebration, Comfort & Thriving Home Energy',
    meaningTh: 'ไพ่คู่นี้ส่งพลังบวกเรื่องความสำเร็จที่น่าภูมิใจ ความอบอุ่นในครอบครัว หรือความสัมพันธ์ที่ขยับสู่ความมั่นคงสบายใจค่ะ',
    meaningEn: 'A joyful pairing pointing to milestone celebrations, domestic warmth, and thriving stability.',
  },
  {
    a: 'major-06-lovers',
    b: 'cups-02',
    titleTh: 'ไพ่คู่ความเข้าใจและหัวใจที่ส่งถึงกัน',
    titleEn: 'Soulful Mutual Connection',
    meaningTh: 'เป็นสัญญาณของมิตรภาพหรือความรักที่เปิดใจเข้าหากันอย่างเท่าเทียม พูดภาษาใจเดียวกัน และพร้อมจับมือประคองกันไปดีมากค่ะ',
    meaningEn: 'One of the tarot’s warmest harmony pairs — mutual respect, emotional reciprocity, and genuine partnership.',
  },
  {
    a: 'cups-02',
    b: 'cups-10',
    titleTh: 'ความรู้สึกดีๆ ที่ต่อยอดสู่ความสุขระยะยาว',
    titleEn: 'Deepening Bond Into Lasting Joy',
    meaningTh: 'ความเข้าใจกันในระดับบุคคลกำลังค่อยๆ เติบโตเป็นความอบอุ่นมั่นคงที่ทำให้ใจอิ่มฟูในระยะยาวค่ะ',
    meaningEn: 'One-on-one harmony naturally ripens into deeper emotional fulfillment and shared peace.',
  },
  {
    a: 'swords-03',
    b: 'swords-10',
    titleTh: 'ความเสียใจเดินทางมาถึงจุดสิ้นสุดเพื่อเริ่มต้นฟื้นฟู',
    titleEn: 'Heartache Reaching Its Final Turning Point',
    meaningTh: 'แม้เรื่องที่ผ่านมาจะทำให้เหนื่อยหรือเจ็บใจ แต่ไพ่คู่นี้ยืนยันว่าจุดหนักที่สุดกำลังผ่านพ้นไปแล้ว จากนี้คือจังหวะวางลงและเยียวยาใจตัวเองค่ะ',
    meaningEn: 'Though painful, the heaviest part of this chapter has bottomed out — gentle recovery begins from here.',
  },
  {
    a: 'swords-03',
    b: 'major-17-star',
    titleTh: 'บาดแผลในใจที่กำลังได้รับการปลอบประโลมอย่างอ่อนโยน',
    titleEn: 'Gentle Healing Over Old Heartache',
    meaningTh: 'ความผิดหวังที่เคยค้างคาใจกำลังค่อยๆ เบาบางลง มีแสงแห่งความสบายใจและกำลังใจดีๆ เข้ามาช่วยซ่อมแซมความรู้สึกค่ะ',
    meaningEn: 'Tender restoration washes over past disappointment, renewing calm hope in your heart.',
  },
  {
    a: 'swords-08',
    b: 'swords-09',
    titleTh: 'ความคิดวนและความกังวลที่หนักกว่าสถานการณ์จริง',
    titleEn: 'Overthinking Magnifying Worry',
    meaningTh: 'ไพ่คู่นี้สะท้อนว่าสิ่งที่บีบคั้นคุณที่สุดตอนนี้คือความกลัวในหัวตัวเอง ลองถอยออกมาสูดหายใจลึกๆ จะเห็นว่าทางออกยังมีอยู่รอบตัวค่ะ',
    meaningEn: 'Mental loops are making things look tighter than they truly are — stepping back into daylight reveals open exits.',
  },
  {
    a: 'major-10-wheel-of-fortune',
    b: 'pentacles-ace',
    titleTh: 'วงล้อจังหวะชีวิตหมุนเปิดรับโอกาสทองที่จับต้องได้',
    titleEn: 'Timely Stroke of Practical Opportunity',
    meaningTh: 'จังหวะโอกาสดีเรื่องการเงิน งาน หรือช่องทางสร้างความมั่นคงกำลังหมุนเข้ามาหา เตรียมความพร้อมคว้าไว้ได้เลยค่ะ',
    meaningEn: 'Favorable timing aligns with a concrete financial or career opening worth stepping into.',
  },
  {
    a: 'pentacles-ace',
    b: 'major-19-sun',
    titleTh: 'โอกาสใหม่ที่สดใสและออกดอกออกผลชัดเจน',
    titleEn: 'Radiant Prosperity & Clear Success',
    meaningTh: 'การเริ่มต้นเรื่องเงิน โปรเจกต์ หรือแผนงานใหม่ในรอบนี้มีเกณฑ์ราบรื่น โปร่งใส และสร้างผลตอบแทนที่น่าชื่นใจมากค่ะ',
    meaningEn: 'A bright green light for practical ventures, bringing visible growth and earned confidence.',
  },
  {
    a: 'major-07-chariot',
    b: 'wands-08',
    titleTh: 'จังหวะพุ่งทะยานรวดเร็ว ข่าวสารความคืบหน้ามาไว',
    titleEn: 'Rapid Momentum & Swift News',
    meaningTh: 'เรื่องที่รอคอยหรือกำลังเร่งมือมีเกณฑ์ขยับตัวเร็วขึ้นแบบก้าวกระโดด เตรียมรับข่าวสารหรือการเดินทางที่คึกคักได้เลยค่ะ',
    meaningEn: 'Stalled matters accelerate quickly — expect fast communication, travel, or decisive forward motion.',
  },
  {
    a: 'wands-ace',
    b: 'pentacles-ace',
    titleTh: 'ทั้งแรงบันดาลใจใหม่และโอกาสสร้างรายได้มาพร้อมกัน',
    titleEn: 'Spark of Passion Meets Solid Ground',
    meaningTh: 'ไอเดียหรือความตั้งใจที่ผุดขึ้นในตอนนี้ ไม่ได้เป็นแค่ความฝันสนุกๆ แต่สามารถต่อยอดให้เกิดผลลัพธ์และรายได้ที่มั่นคงได้จริงค่ะ',
    meaningEn: 'Creative fire pairs with material backing — an ideal seed for a sustainable new venture.',
  },
  {
    a: 'major-09-hermit',
    b: 'swords-04',
    titleTh: 'สัญญาณให้พักเบรก ปิดเสียงรบกวนเพื่อชาร์จพลังใจ',
    titleEn: 'Sacred Pause & Deep Recharge',
    meaningTh: 'ไพ่ทั้งสองใบประสานเสียงตรงกันว่าอย่าเพิ่งฝืนเร่งคำตอบ การถอยมาพักผ่อนให้ใจเงียบสงบจะทำให้มองเห็นทางออกที่ฉลาดที่สุดค่ะ',
    meaningEn: 'Both cards agree: stepping back for quiet rest restores sharper wisdom than pushing through exhaustion.',
  },
  {
    a: 'major-11-justice',
    b: 'swords-ace',
    titleTh: 'ความชัดเจนตรงไปตรงมาและการตัดสินใจที่เฉียบขาด',
    titleEn: 'Sharp Truth & Fair Resolution',
    meaningTh: 'ความคลุมเครือจะถูกตัดจบด้วยเหตุผลและข้อเท็จจริง ส่งผลดีต่อเรื่องเอกสาร ข้อตกลง หรือการคุยกันแบบเปิดอกตรงประเด็นค่ะ',
    meaningEn: 'Clean truth cuts through ambiguity — favorable for contracts, fair decisions, and honest clarity.',
  },
  {
    a: 'major-08-strength',
    b: 'major-14-temperance',
    titleTh: 'พลังความนิ่งนุ่มนวลที่ค่อยๆ ประสานเรื่องยากให้ลงตัว',
    titleEn: 'Patient Grace & Steady Healing',
    meaningTh: 'ยิ่งใจเย็นและใช้ความนุ่มนวลประนีประนอมมากเท่าไหร่ เรื่องที่ดูตึงมือก็จะยิ่งคลี่คลายเข้าที่อย่างราบรื่นเกินคาดค่ะ',
    meaningEn: 'Gentle patience and balanced pacing dissolve friction far more effectively than force.',
  },
  {
    a: 'major-12-hanged-man',
    b: 'major-09-hermit',
    titleTh: 'จังหวะชะลอตัวที่มีความหมายเพื่อเปลี่ยนมุมมองใหม่',
    titleEn: 'Wise Stillness & Fresh Perspective',
    meaningTh: 'ความล่าช้าในตอนนี้ไม่ใช่เรื่องเสียเปล่า แต่เป็นเวลาทองให้คุณได้ทบทวนและมองเห็นแง่มุมสำคัญที่คนใจร้อนมักมองข้ามค่ะ',
    meaningEn: 'An intentional pause reveals crucial insights hidden from rushed eyes.',
  },
  {
    a: 'pentacles-05',
    b: 'pentacles-06',
    titleTh: 'ผ่านจุดตึงมือไปสู่การได้รับความช่วยเหลือเกื้อกูล',
    titleEn: 'Support Arriving After Scarcity',
    meaningTh: 'หากช่วงที่ผ่านมาเหนื่อยหรือตึงมือ กำลังจะมีคนยื่นมือเข้ามาช่วยแบ่งเบา หรือมีช่องทางหมุนเวียนให้หายใจคล่องขึ้นค่ะ',
    meaningEn: 'Helpful hands and fairer reciprocity step in to ease recent strain.',
  },
  {
    a: 'cups-05',
    b: 'cups-06',
    titleTh: 'ละสายตาจากสิ่งที่เสียไป แล้วพบความอบอุ่นที่ยังอยู่ข้างตัว',
    titleEn: 'Turning From Regret Toward Warm Support',
    meaningTh: 'เมื่อค่อยๆ คลายความเสียดายเรื่องเก่าลง คุณจะสังเกตเห็นมิตรภาพดีๆ หรือคนคุ้นเคยที่ยังคอยหวังดีต่อคุณเสมอค่ะ',
    meaningEn: 'Shifting focus away from past loss reconnects you with comforting allies and sweet memories.',
  },
  {
    a: 'cups-07',
    b: 'swords-02',
    titleTh: 'ตัวเลือกเยอะจนลังเล ต้องกลับมาฟังเสียงความจริงตรงหน้า',
    titleEn: 'Too Many Options Clouding the Choice',
    meaningTh: 'ยิ่งมีหลายทางเลือกยิ่งทำให้ไม่กล้าฟันธง ลองตัดตัวเลือกที่เป็นแค่ความคาดหวังลอยๆ ออก แล้วดูเฉพาะข้อเท็จจริงที่จับต้องได้ค่ะ',
    meaningEn: 'Wishful possibilities are stalling a decision — narrow the list to grounded facts first.',
  },
  {
    a: 'wands-10',
    b: 'swords-10',
    titleTh: 'สัญญาณเตือนให้วางภาระที่แบกเกินตัวลงทันที',
    titleEn: 'Permission to Put Down Heavy Burdens',
    meaningTh: 'คุณทุ่มเทแบกทุกอย่างมาเต็มพิกัดแล้วค่ะ ไพ่คู่นี้ขอให้แบ่งงาน ปฏิเสธสิ่งที่เกินกำลัง และคืนเวลาพักฟื้นให้ตัวเองโดยด่วน',
    meaningEn: 'You have carried more than enough — delegate, set limits, and let yourself truly rest.',
  },
  {
    a: 'pentacles-09',
    b: 'pentacles-10',
    titleTh: 'ความมั่นคงมั่งคั่งที่ต่อยอดจากน้ำพักน้ำแรงสู่ระยะยาว',
    titleEn: 'Earned Independence & Lasting Wealth',
    meaningTh: 'สิ่งที่คุณอดทนสร้างมาด้วยตัวเองกำลังแข็งแรงและต่อยอดกลายเป็นความมั่นคงระยะยาวที่พึ่งพาได้อย่างภาคภูมิใจค่ะ',
    meaningEn: 'Personal diligence blossoms into enduring financial and family security.',
  },
  {
    a: 'major-19-sun',
    b: 'major-21-world',
    titleTh: 'ความสำเร็จสมบูรณ์แบบและการบรรลุเป้าหมายอย่างงดงาม',
    titleEn: 'Radiant Fulfillment & Complete Victory',
    meaningTh: 'หนึ่งในคู่ไพ่ที่ดีที่สุดของสำรับ บอกถึงความสำเร็จที่อิ่มเอมใจ เรื่องที่ทุ่มเทกำลังจะปิดจ็อบลงตัวพร้อมรอยยิ้มกว้างค่ะ',
    meaningEn: 'One of tarot’s brightest combinations — joyful achievement and wholehearted completion.',
  },
  {
    a: 'major-05-hierophant',
    b: 'pentacles-03',
    titleTh: 'การเรียนรู้และทำงานร่วมกับผู้เชี่ยวชาญพาไปสู่ความก้าวหน้า',
    titleEn: 'Mentorship & Skilled Collaboration',
    meaningTh: 'การขอคำปรึกษาจากผู้รู้ การเรียนเพิ่มทักษะ หรือการทำงานเป็นทีมอย่างเป็นระบบ จะยกระดับผลงานของคุณให้โดดเด่นชัดเจนค่ะ',
    meaningEn: 'Trusted guidance and structured teamwork elevate your craft to the next level.',
  },
  {
    a: 'major-15-devil',
    b: 'swords-08',
    titleTh: 'พันธนาการทางใจที่คุณถือกุญแจปลดล็อกอยู่ในมือแล้ว',
    titleEn: 'Breaking Free From Self-Limiting Traps',
    meaningTh: 'ความรู้สึกว่าหนีไม่ออกเกิดจากความคุ้นชินหรือความกลัวไปเอง ทันทีที่คุณกล้าขยับขอบเขตเล็กๆ โซ่ที่รัดใจจะคลายออกทันทีค่ะ',
    meaningEn: 'What feels trapping is looser than it seems — one honest boundary begins unlocking the door.',
  },
  {
    a: 'cups-ace',
    b: 'major-03-empress',
    titleTh: 'หัวใจที่เปี่ยมชีวิตชีวา ความเมตตา และการเริ่มต้นที่อบอุ่น',
    titleEn: 'Overflowing Heart & Creative Blossoming',
    meaningTh: 'พลังงานความรัก ความสุข และความคิดสร้างสรรค์กำลังผลิบานเต็มที่ เป็นจังหวะที่ใจอิ่มฟูและดึงดูดสิ่งดีๆ เข้ามาง่ายมากค่ะ',
    meaningEn: 'Emotional renewal and abundant warmth flow together, nurturing fresh love and inspiration.',
  },
  {
    a: 'wands-06',
    b: 'major-07-chariot',
    titleTh: 'ชัยชนะที่เกิดจากความมุ่งมั่นไม่ยอมแพ้',
    titleEn: 'Earned Triumph & Forward Drive',
    meaningTh: 'ความตั้งใจและการลุยไม่ถอยของคุณกำลังจะส่งผลให้ได้รับการยอมรับ มีความก้าวหน้าและผ่านด่านสำคัญได้อย่างสง่างามค่ะ',
    meaningEn: 'Focused determination carries you across the finish line with clear recognition.',
  },
  {
    a: 'cups-08',
    b: 'major-17-star',
    titleTh: 'การกล้าเดินออกจากจุดที่ไม่เติมเต็ม เพื่อไปพบแสงสว่างที่ใช่กว่า',
    titleEn: 'Walking Away Toward True Renewal',
    meaningTh: 'การตัดสินใจถอยจากสิ่งที่ไม่ตอบโจทย์ใจอีกต่อไป จะพาคุณไปพบพื้นที่ใหม่ที่สงบ สบายใจ และมีความหวังมากกว่าเดิมค่ะ',
    meaningEn: 'Leaving behind what no longer fulfills you leads straight toward peaceful renewal.',
  },
  {
    a: 'pentacles-08',
    b: 'pentacles-03',
    titleTh: 'ความเชี่ยวชาญเฉพาะตัวที่เป็นที่ยอมรับของคนรอบข้าง',
    titleEn: 'Dedicated Craft Winning Respect',
    meaningTh: 'ความขยันใส่ใจรายละเอียดของคุณไม่ได้สูญเปล่า คนรอบข้างมองเห็นฝีมือและพร้อมสนับสนุนให้ต่อยอดไปได้ไกลขึ้นค่ะ',
    meaningEn: 'Consistent craftsmanship earns genuine appreciation and collaborative momentum.',
  },
];

function computeOverallValence(
  drawn: { card: CardData; reversed: boolean }[],
): CardValence {
  if (drawn.length === 0) return 'mixed';
  let score = 0;
  drawn.forEach((d, idx) => {
    const v = d.reversed ? d.card.valenceReversed : d.card.valenceUpright;
    // Give slightly higher weight to the final/outcome card
    const weight = idx === drawn.length - 1 ? 1.5 : 1;
    if (v === 'positive') score += weight;
    else if (v === 'challenging') score -= weight;
  });
  if (score >= 0.75) return 'positive';
  if (score <= -0.75) return 'challenging';
  return 'mixed';
}

export function analyzeSpreadChemistry(
  drawn: { card: CardData; reversed: boolean }[],
  shadowCard: { card: CardData; reversed: boolean } | null,
  lang: Lang,
): SpreadChemistry {
  const totalCards = drawn.length;
  const majorCount = drawn.filter((d) => d.card.suit === 'major').length;
  const courtCount = drawn.filter((d) => d.card.court !== null).length;
  const reversedCount = drawn.filter((d) => d.reversed).length;
  const overallValence = computeOverallValence(drawn);

  // Tally elements across drawn cards (with slight tie-break priority to the final card)
  const elCounts: Record<Element, number> = { fire: 0, water: 0, air: 0, earth: 0 };
  for (const d of drawn) {
    const el = getCardEffectiveElement(d.card);
    elCounts[el] += 1;
  }
  const lastEl =
    drawn.length > 0 ? getCardEffectiveElement(drawn[drawn.length - 1].card) : 'air';

  const sortedEls = (['fire', 'water', 'air', 'earth'] as Element[]).sort((a, b) => {
    if (elCounts[b] !== elCounts[a]) return elCounts[b] - elCounts[a];
    if (b === lastEl) return 1;
    if (a === lastEl) return -1;
    return 0;
  });
  const dominantElement = sortedEls[0];
  const topElCount = elCounts[dominantElement];
  const distinctElements = (['fire', 'water', 'air', 'earth'] as Element[]).filter(
    (e) => elCounts[e] > 0,
  );

  const badges: ChemistryBadge[] = [];

  // 1) Major Arcana weight badge
  if (totalCards === 1) {
    if (majorCount === 1) {
      badges.push({
        label:
          lang === 'th'
            ? 'ไพ่ชุดใหญ่ (Major Arcana) · จังหวะบทเรียนสำคัญ'
            : 'Major Arcana · Key Life Lesson',
        tone: 'gold',
      });
    } else {
      badges.push({
        label:
          lang === 'th'
            ? 'ไพ่ชุดรอง (Minor Arcana) · ปรับทิศทางได้ด้วยมือคุณ'
            : 'Minor Arcana · Practical Everyday Shift',
        tone: 'teal',
      });
    }
  } else if (totalCards === 3) {
    if (majorCount === 3) {
      badges.push({
        label:
          lang === 'th'
            ? 'Major Arcana ครบทั้ง 3 ใบ · จุดเปลี่ยนสำคัญของชีวิต'
            : 'All 3 Major Arcana · Pivotal Turning Point',
        tone: 'gold',
      });
    } else if (majorCount === 2) {
      badges.push({
        label:
          lang === 'th'
            ? 'Major Arcana 2/3 ใบ · จังหวะหัวเลี้ยวหัวต่อที่มีนัยสำคัญ'
            : '2/3 Major Arcana · Significant Crossroads',
        tone: 'violet',
      });
    } else if (majorCount === 1) {
      badges.push({
        label:
          lang === 'th'
            ? 'สมดุลไพ่ใหญ่–ไพ่รอง · มีโจทย์หลักแต่คุมจังหวะเองได้'
            : '1/3 Major Arcana · Guided Yet In Your Hands',
        tone: 'teal',
      });
    } else {
      badges.push({
        label:
          lang === 'th'
            ? 'ไพ่เหตุการณ์ใกล้ตัวล้วน · ผลลัพธ์เปลี่ยนได้ตามการลงมือทำ'
            : 'All Minor Arcana · Outcome Shaped by Daily Action',
        tone: 'teal',
      });
    }
  } else {
    if (majorCount >= 5) {
      badges.push({
        label:
          lang === 'th'
            ? `Major Arcana เข้มข้น (${majorCount}/${totalCards}) · บทใหญ่ของการเติบโต`
            : `High Major Presence (${majorCount}/${totalCards}) · Major Life Arc`,
        tone: 'gold',
      });
    } else if (majorCount >= 3) {
      badges.push({
        label:
          lang === 'th'
            ? `Major Arcana สมดุล (${majorCount}/${totalCards}) · จังหวะเปลี่ยนผ่านสำคัญ`
            : `Balanced Majors (${majorCount}/${totalCards}) · Meaningful Shift`,
        tone: 'violet',
      });
    } else {
      badges.push({
        label:
          lang === 'th'
            ? `เน้นเรื่องปฏิบัติจริง (${majorCount}/${totalCards} Major) · ค่อยๆ แก้ตามขั้นตอนได้`
            : `Action-Focused Spread (${majorCount}/${totalCards} Major) · Step-by-Step Control`,
        tone: 'teal',
      });
    }
  }

  // 2) Elemental dominance / balance badge
  const elLabel = ELEMENT_NAMES[dominantElement][lang];
  if (totalCards >= 3 && distinctElements.length >= 3 && topElCount === 1) {
    badges.push({
      label:
        lang === 'th'
          ? 'กระจายครบหลายธาตุ · มีทั้งมุมใจ เหตุผล และการลงมือทำ'
          : 'Balanced Elements · Mind, Heart & Action Aligned',
      tone: 'teal',
    });
  } else {
    const elTraitTh: Record<Element, string> = {
      fire: 'พลังการริเริ่มและแรงขับเคลื่อน',
      water: 'ความรู้สึกและสัญชาตญาณนำทาง',
      air: 'ความคิดวิเคราะห์และความชัดเจน',
      earth: 'ความมั่นคงและผลลัพธ์จับต้องได้',
    };
    const elTraitEn: Record<Element, string> = {
      fire: 'Initiative & Momentum',
      water: 'Emotion & Intuition',
      air: 'Clarity & Thought',
      earth: 'Stability & Practicality',
    };
    badges.push({
      label:
        lang === 'th'
          ? `${elLabel}นำ (${elTraitTh[dominantElement]})`
          : `${elLabel} Dominant · ${elTraitEn[dominantElement]}`,
      tone: dominantElement === 'fire' ? 'rose' : dominantElement === 'water' ? 'violet' : 'teal',
    });
  }

  // 3) Repeated numbers, Court influence, or Reversed concentration badge
  const numMap = new Map<number, number>();
  for (const d of drawn) {
    if (d.card.suit !== 'major' && d.card.number !== null) {
      numMap.set(d.card.number, (numMap.get(d.card.number) ?? 0) + 1);
    }
  }
  let repeatedPip: number | null = null;
  for (const [num, cnt] of numMap.entries()) {
    if (cnt >= 2) {
      repeatedPip = num;
      break;
    }
  }

  if (courtCount >= 2) {
    badges.push({
      label:
        lang === 'th'
          ? `ไพ่บุคคล ${courtCount} ใบ · คนรอบข้างมีบทบาทต่อเรื่องนี้ชัดเจน`
          : `${courtCount} Court Cards · Key People Influence This Situation`,
      tone: 'gold',
    });
  } else if (repeatedPip !== null) {
    const pipHintTh =
      repeatedPip === 1
        ? 'สัญญาณการเริ่มต้นบทใหม่ชัดเจน'
        : repeatedPip === 10
          ? 'จังหวะปิดรอบเก่าเพื่อเริ่มรอบใหม่'
          : 'จังหวะย้ำประเด็นสำคัญซ้ำให้สังเกต';
    badges.push({
      label:
        lang === 'th'
          ? `เลข ${repeatedPip} ปรากฏซ้ำ · ${pipHintTh}`
          : `Repeating Number ${repeatedPip} · Amplified Theme`,
      tone: 'gold',
    });
  } else if (totalCards >= 3 && reversedCount >= Math.ceil(totalCards * 0.67)) {
    badges.push({
      label:
        lang === 'th'
          ? `ไพ่กลับหัว ${reversedCount}/${totalCards} ใบ · พลังงานใคร่ครวญข้างในรอปลดล็อก`
          : `${reversedCount}/${totalCards} Reversed · Inner Processing & Unblocking`,
      tone: 'rose',
    });
  }

  // 4) Iconic Pairings lookup (drawn cards + optional 1-card × shadow pairing)
  const poolForPairs =
    totalCards === 1 && shadowCard
      ? [
          { ...drawn[0], isShadow: false },
          { ...shadowCard, isShadow: true },
        ]
      : drawn.map((d) => ({ ...d, isShadow: false }));

  const pairings: CardPairingHighlight[] = [];
  const idIndexMap = new Map<string, { card: CardData; isShadow: boolean }>();
  for (const item of poolForPairs) {
    idIndexMap.set(item.card.id, { card: item.card, isShadow: item.isShadow });
  }

  for (const rule of ICONIC_PAIRINGS) {
    const foundA = idIndexMap.get(rule.a);
    const foundB = idIndexMap.get(rule.b);
    if (foundA && foundB) {
      pairings.push({
        pairKey: `${rule.a}__${rule.b}`,
        cardAName: lang === 'th' ? foundA.card.nameTh : foundA.card.nameEn,
        cardBName: lang === 'th' ? foundB.card.nameTh : foundB.card.nameEn,
        includesShadow: foundA.isShadow || foundB.isShadow,
        title: lang === 'th' ? rule.titleTh : rule.titleEn,
        meaning: lang === 'th' ? rule.meaningTh : rule.meaningEn,
      });
      if (pairings.length >= 2) break;
    }
  }

  // 5) Narrative synthesis text explaining how the cards interact as a system
  let synthesisText: string;
  if (lang === 'th') {
    const arcanaSentence =
      totalCards === 1
        ? majorCount === 1
          ? 'แม้จะเปิดเพียงใบเดียว แต่การได้ไพ่ชุดใหญ่ (Major Arcana) สะท้อนว่าเรื่องนี้มีความหมายลึกซึ้งและเป็นบทเรียนสำคัญของใจคุณในช่วงนี้'
          : 'ไพ่ใบนี้เป็นไพ่ชุดรอง (Minor Arcana) ซึ่งแปลว่าสถานการณ์ไม่ได้ถูกล็อกตายตัว แต่ปรับเปลี่ยนให้ดีขึ้นได้จากการตัดสินใจและการกระทำในชีวิตประจำวันของคุณเอง'
        : majorCount >= Math.ceil(totalCards * 0.6)
          ? `ในกระดานนี้มีไพ่ชุดใหญ่ (Major Arcana) ปรากฏถึง ${majorCount} จาก ${totalCards} ใบ บ่งบอกว่าเรื่องที่คุณถามไม่ได้เป็นเพียงเรื่องจุกจิกชั่วคราว แต่เป็นจังหวะหัวเลี้ยวหัวต่อสำคัญที่พาคุณเติบโตไปอีกขั้น`
          : majorCount >= 1
            ? `สัดส่วนไพ่ชุดใหญ่ ${majorCount} ใบผสานกับไพ่ชุดรองในกระดาน สะท้อนว่าแม้จะมีจังหวะโชคชะตาหรือปัจจัยใหญ่เข้ามาเกี่ยวข้อง แต่คุณยังมีพื้นที่ลงมือจัดการรายละเอียดด้วยตัวเองได้อย่างเต็มที่`
            : 'กระดานนี้เป็นไพ่ชุดรอง (Minor Arcana) ล้วน ซึ่งเป็นข่าวดีว่าผลลัพธ์ทั้งหมดอยู่ในมือคุณ สามารถค่อยๆ ปรับแก้ตามสถานการณ์จริงได้โดยไม่ต้องกังวลเรื่องชะตาบังคับ';

    let elementInteractionSentence: string;
    const hasFireWater = elCounts.fire > 0 && elCounts.water > 0;
    const hasAirWater = elCounts.air > 0 && elCounts.water > 0;
    const hasFireAir = elCounts.fire > 0 && elCounts.air > 0;
    const hasEarthWater = elCounts.earth > 0 && elCounts.water > 0;

    if (totalCards === 1 && shadowCard) {
      const shEl = getCardEffectiveElement(shadowCard.card);
      const mainEl = dominantElement;
      if (mainEl === shEl) {
        elementInteractionSentence = ` อีกทั้งพลังงานหน้าไพ่หลักและไพ่ใต้สำรับยังเป็น${ELEMENT_NAMES[mainEl].th}ตรงกัน ย้ำว่าความรู้สึกข้างในกับสิ่งที่แสดงออกมากำลังพูดเรื่องเดียวกันอย่างชัดเจนค่ะ`;
      } else {
        elementInteractionSentence = ` เมื่ออ่านคู่กับไพ่ใต้สำรับที่เป็น${ELEMENT_NAMES[shEl].th} จะเห็นมิติทั้งสิ่งที่เกิดขึ้นตรงหน้าและแรงขับเคลื่อนลึกๆ ในใจที่คอยถ่วงดุลกันอยู่ค่ะ`;
      }
    } else if (hasFireWater && elCounts.fire + elCounts.water >= totalCards - 1) {
      elementInteractionSentence = ' เคมีระหว่างธาตุไฟและธาตุน้ำในกระดานเตือนให้ค่อยๆ จูนสมดุลระหว่าง "ความใจร้อนอยากเห็นผลไว" กับ "ความอ่อนไหวทางอารมณ์" ไม่ให้ฝั่งไหนดึงใจไปสุดโต่งค่ะ';
    } else if (hasAirWater && elCounts.air + elCounts.water >= totalCards - 1) {
      elementInteractionSentence = ' การมาเจอกันของธาตุลมและธาตุน้ำสะท้อนการชั่งน้ำหนักระหว่าง "เหตุผลในหัว" กับ "ความรู้สึกในใจ" แนะนำให้รับฟังทั้งสองฝั่งควบคู่กันโดยไม่กดทับความรู้สึกตัวเองค่ะ';
    } else if (hasFireAir && elCounts.fire + elCounts.air >= totalCards - 1) {
      elementInteractionSentence = ' พลังธาตุไฟและธาตุลมช่วยพัดเสริมกันให้ความคิดและจังหวะการขยับตัวเดินหน้าไวขึ้น เพียงระวังอย่าตัดสินใจปุบปับเกินไปก็จะยิ่งส่งผลดีค่ะ';
    } else if (hasEarthWater && elCounts.earth + elCounts.water >= totalCards - 1) {
      elementInteractionSentence = ' เคมีของธาตุดินและธาตุน้ำช่วยหล่อเลี้ยงกันอย่างอบอุ่น ทำให้ความตั้งใจและความรู้สึกดีๆ ค่อยๆ ก่อตัวเป็นความมั่นคงที่จับต้องได้จริงค่ะ';
    } else {
      elementInteractionSentence = ` โดยมีกระแส${elLabel}เป็นตัวกำหนดจังหวะหลักของกระดาน ช่วยชี้เป้าให้คุณวางน้ำหนักการรับมือได้อย่างตรงจุดค่ะ`;
    }

    synthesisText = `${arcanaSentence}${elementInteractionSentence}`;
  } else {
    const arcanaEn =
      totalCards === 1
        ? majorCount === 1
          ? 'Drawing a Major Arcana card for a single-card reading highlights a meaningful soul-level theme rather than a passing mood.'
          : 'As a Minor Arcana card, this situation remains practical and responsive to your everyday choices.'
        : majorCount >= Math.ceil(totalCards * 0.6)
          ? `With ${majorCount} of ${totalCards} cards from the Major Arcana, this spread marks a pivotal chapter with lasting personal significance.`
          : majorCount >= 1
            ? `Blending ${majorCount} Major Arcana card(s) with practical Minor suits shows big-picture lessons paired with clear room for hands-on action.`
            : 'Composed entirely of Minor Arcana cards, this spread puts practical steering firmly in your everyday hands.';

    synthesisText = `${arcanaEn} Overall energy leans toward ${elLabel}, guiding the pace and tone of how these cards unfold together.`;
  }

  return {
    dominantElement,
    overallValence,
    majorCount,
    totalCards,
    badges,
    pairings,
    synthesisText,
  };
}
