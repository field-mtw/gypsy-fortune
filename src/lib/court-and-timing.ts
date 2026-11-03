// Context-smart Court Card Persona Decoder (16 Court Cards) + Concrete Calendar Timing.
// Adapts Court Cards between relational person-reading vs. personal posture/ally-support,
// and anchors timing windows to real calendar dates when a client/record reference date is supplied.

import type { CardData, ReadingTopic } from '@/data/card-types';
import type { FocusSubTag } from '@/data/focus-topics';
import type { Lang } from './variants-th';

interface CourtPersonaEntry {
  personUprightTh: string;
  personReversedTh: string;
  postureUprightTh: string;
  postureReversedTh: string;
  personEn: string;
  postureEn: string;
}

const COURT_PERSONAS: Record<string, CourtPersonaEntry> = {
  /* ==================== WANDS (FIRE) ==================== */
  'wands-page': {
    personUprightTh:
      'หากมองเป็นตัวบุคคล ไพ่ใบนี้แทนคนอารมณ์ดี กระตือรือร้น ชอบทักชอบชวนคุยเรื่องใหม่ๆ มีความจริงใจสดใสแต่อาจยังอยู่ในวัยหรือจังหวะที่เพิ่งเริ่มต้นสร้างตัว',
    personReversedTh:
      'หากมองเป็นตัวบุคคล สะท้อนถึงคนที่มาไวไฟแรงในช่วงแรกแต่ความสม่ำเสมอยังแกว่ง เบื่อง่าย หรือยังลังเลไม่กล้าลงมือจริงจังอย่างที่พูดไว้',
    postureUprightTh:
      'ในแง่บทบาทของคุณ ไพ่ชวนให้ปลุกไฟความอยากรู้อยากลองขึ้นมาใหม่ เปิดรับไอเดียหรือผู้ช่วยรุ่นน้องที่คล่องแคล่วเข้ามาเติมสีสันให้งานเดินไวขึ้น',
    postureReversedTh:
      'ระวังอาการไฟไหม้ฟาง ตื่นเต้นอยากทำหลายอย่างพร้อมกันแต่ยังจับต้นชนปลายไม่ถูก เลือกปักธงเริ่มจากเรื่องเล็กๆ ชิ้นเดียวให้จบก่อนจะเห็นผลกว่ามาก',
    personEn:
      'As a person, Page of Wands points to someone upbeat, curious, and enthusiastic — though when reversed, their follow-through can be inconsistent.',
    postureEn:
      'As a personal stance, approach this with fresh curiosity and beginner’s courage while keeping your focus anchored on one step at a time.',
  },
  'wands-knight': {
    personUprightTh:
      'ในมุมตัวบุคคล แทนคนลุยๆ ชัดเจน คิดเร็วทำเร็ว มีเสน่ห์น่าดึงดูดและไม่ชอบอะไรอืดอาด ถ้าสนใจเรื่องไหนหรือใครแล้วจะแสดงออกให้รู้ตรงๆ ทันที',
    personReversedTh:
      'ในมุมตัวบุคคล ต้องระวังคนใจร้อน หุนหันพลันแล่น อารมณ์ขึ้นลงไว หรือเข้ามาแบบรุกแรงปุบปับแล้วจู่ๆ ก็แผ่วหายไปเมื่อหมดความตื่นเต้น',
    postureUprightTh:
      'จังหวะนี้เหมาะจะสวมวิญญาณขาลุย กล้าตัดสินใจขยับตัวให้ไวเมื่อเห็นโอกาส แต่อย่าลืมเช็กรายละเอียดพื้นฐานควบคู่ไปด้วย',
    postureReversedTh:
      'เบรกความใจร้อนอยากเห็นผลทันตาลงสักนิด เพราะยิ่งเร่งเครื่องตอนทางยังไม่ชัดจะยิ่งเหนื่อยฟรี ตั้งหลักจัดลำดับก่อนลุยจะชัวร์กว่า',
    personEn:
      'As a person, Knight of Wands reflects someone bold, fast-moving, and charismatic — or impulsive and hot-and-cold when reversed.',
    postureEn:
      'Channel decisive momentum where action is needed, while steering clear of rushed, heat-of-the-moment moves.',
  },
  'wands-queen': {
    personUprightTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนเก่งที่มีเสน่ห์มั่นใจ อบอุ่น เข้าสังคมเก่ง พึ่งพาได้ และมักเป็นจุดศูนย์กลางที่คอยให้กำลังใจคนรอบข้างเสมอ',
    personReversedTh:
      'ในมุมตัวบุคคล อาจหมายถึงคนที่ช่วงนี้แอบเหนื่อยลึกๆ จนหงุดหงิดง่าย ขี้น้อยใจ คิดเปรียบเทียบ หรือพยายามคุมทุกอย่างด้วยอารมณ์มากกว่าปกติ',
    postureUprightTh:
      'ไพ่ชวนให้คุณดึงความมั่นใจและออร่าในตัวเองออกมาเต็มที่ กล้านำเสนอผลงานอย่างภูมิใจ หรืออาจได้รับแรงหนุนดีๆ จากผู้หญิงเก่งที่เมตตาคุณ',
    postureReversedTh:
      'อย่าเพิ่งเอาตัวเองไปเปรียบเทียบกับใครจนเสียความมั่นใจ กลับมาโฟกัสจุดแข็งของตัวเองแล้วค่อยๆ ฟื้นไฟข้างในขึ้นมาใหม่นะ',
    personEn:
      'As a person, Queen of Wands embodies warm confidence, charisma, and capability — or temporary insecurity and sharp pride when reversed.',
    postureEn:
      'Step into visible self-assurance and own your strengths without comparing your timeline to anyone else’s.',
  },
  'wands-king': {
    personUprightTh:
      'หากดูเป็นตัวบุคคล แทนคนมีความเป็นผู้นำสูง มองการณ์ไกล ใจกว้าง พูดคำไหนคำนั้น และพร้อมออกหน้าปกป้องดูแลคนที่ตัวเองให้ความสำคัญ',
    personReversedTh:
      'หากดูเป็นตัวบุคคล สะท้อนถึงคนที่มีอีโก้ค่อนข้างสูง ชอบให้ทุกอย่างเป็นไปตามใจตัวเอง ดื้อเงียบ หรือคาดหวังมาตรฐานจากคนรอบข้างสูงจนอึดอัด',
    postureUprightTh:
      'รอบนี้คุณต้องสวมหมวกผู้นำที่มองภาพใหญ่ให้ขาด กล้าตัดสินใจวางทิศทางหลักด้วยตัวเอง หรือมีเกณฑ์ได้รับแรงสนับสนุนจากผู้ใหญ่สายลุย',
    postureReversedTh:
      'ผ่อนความกดดันที่อยากควบคุมทุกอย่างให้เป๊ะดั่งใจลงบ้าง เปิดพื้นที่รับฟังวิธีใหม่ๆ จะช่วยให้งานและใจคุณเบาลงเยอะเลย',
    personEn:
      'As a person, King of Wands represents a visionary, protective leader — though when reversed, stubbornness or high expectations can surface.',
    postureEn:
      'Lead from big-picture vision and steady conviction, leaving room for flexibility instead of rigid control.',
  },

  /* ==================== CUPS (WATER) ==================== */
  'cups-page': {
    personUprightTh:
      'หากมองเป็นตัวบุคคล แทนคนจิตใจอ่อนโยน ช่างสังเกต ขี้เกรงใจ มีมุมโรแมนติกน่ารัก และมักแสดงความห่วงใยผ่านรายละเอียดเล็กๆ น้อยๆ',
    personReversedTh:
      'หากมองเป็นตัวบุคคล สะท้อนถึงคนที่ค่อนข้างอ่อนไหวง่าย ขี้งอน คิดมากแต่ไม่ยอมพูดตรงๆ หรือยังไม่กล้าแสดงความรู้สึกที่แท้จริงออกมา',
    postureUprightTh:
      'ไพ่ชวนให้คุณฟังเสียงหัวใจและสัญชาตญาณตัวเองให้มากขึ้น เปิดใจรับแรงบันดาลใจใหม่ๆ ด้วยความอ่อนโยน ไม่กดดันตัวเองจนตึงเกินไป',
    postureReversedTh:
      'ระวังอารมณ์น้อยใจหรือความหวั่นไหวชั่ววูบเข้ามาทำให้เสียสมาธิ ตั้งสติแยกความรู้สึกออกจากข้อเท็จจริงก่อนตัดสินใจนะ',
    personEn:
      'As a person, Page of Cups shows someone gentle, sensitive, and sincere — or emotionally shy and easily bruised when reversed.',
    postureEn:
      'Stay receptive to creative intuition and gentle goodwill without letting passing moods cloud your footing.',
  },
  'cups-knight': {
    personUprightTh:
      'ในมุมตัวบุคคล แทนคนช่างเอาใจ พูดจาไพเราะ มีเสน่ห์ละมุน เข้ามาทำให้ใจฟูและให้ความสำคัญกับบรรยากาศความรู้สึกมากเป็นพิเศษ',
    personReversedTh:
      'ในมุมตัวบุคคล ต้องระวังคนที่มาพร้อมคำพูดหวานชวนเคลิ้มแต่อารมณ์แปรปรวนง่าย โลเล หรือชอบหนีปัญหาเวลาต้องคุยเรื่องจริงจัง',
    postureUprightTh:
      'ใช้ความนุ่มนวลและศิลปะการพูดประสานใจเป็นตัวนำ การเข้าหาเรื่องนี้ด้วยไมตรีและความเข้าใจจะเปิดประตูโอกาสได้ง่ายกว่าการแข็งใส่',
    postureReversedTh:
      'เช็กให้ชัวร์ว่าแผนหรือข้อเสนอตรงหน้ามีรายละเอียดรองรับจริง ไม่ใช่แค่ภาพฝันสวยหรูตามอารมณ์ชั่วคราว',
    personEn:
      'As a person, Knight of Cups represents a charming romantic who leads with heart — or someone moody and idealistic when reversed.',
    postureEn:
      'Lead with tact and heartfelt diplomacy while keeping both feet planted on realistic ground.',
  },
  'cups-queen': {
    personUprightTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนอบอุ่น รับฟังเก่ง เข้าใจความรู้สึกคนอื่นลึกซึ้ง รักจริงและทุ่มเทดูแลจิตใจคนใกล้ตัวดีมาก แม้บางครั้งจะเก็บความกังวลไว้ในใจเงียบๆ',
    personReversedTh:
      'ในมุมตัวบุคคล อาจหมายถึงคนที่ช่วงนี้อ่อนไหวเปราะบางเป็นพิเศษ คิดมากกับคำพูดคนอื่น หรือเผลอแบกอารมณ์ความทุกข์ของคนรอบข้างจนตัวเองจม',
    postureUprightTh:
      'จังหวะนี้ความเมตตาและเซ้นส์อันละเอียดอ่อนคือจุดแข็งของคุณ ดูแลหัวใจตัวเองให้อิ่มเอมก่อน แล้วคุณจะอ่านจังหวะเรื่องนี้ได้แม่นยำมาก',
    postureReversedTh:
      'ขีดเส้นกั้นพลังงานทางอารมณ์ให้ดี อย่าเพิ่งรับเอาความเครียดของใครมาแบกไว้ทั้งหมด เซฟความสบายใจของตัวเองเป็นอันดับแรกนะ',
    personEn:
      'As a person, Queen of Cups points to someone deeply empathetic, loyal, and nurturing — or emotionally overwhelmed when reversed.',
    postureEn:
      'Honor your intuition and emotional self-care first, maintaining healthy boundaries so you do not absorb outside stress.',
  },
  'cups-king': {
    personUprightTh:
      'หากดูเป็นตัวบุคคล แทนผู้ใหญ่หรือคนที่ดูสุขุม ใจดี มีวุฒิภาวะทางอารมณ์สูง ไม่ค่อยโวยวายแต่รักและคอยซัพพอร์ตอยู่ข้างหลังอย่างมั่นคง',
    personReversedTh:
      'หากดูเป็นตัวบุคคล สะท้อนถึงคนที่เก็บอารมณ์เก่งจนเดาใจยาก ปากบอกไม่เป็นไรแต่ข้างในคิดเยอะ หรือใช้ความเงียบหลบเลี่ยงการเคลียร์ใจตรงๆ',
    postureUprightTh:
      'ไพ่แนะนำให้วางตัวนิ่ง สุขุม และใช้ความเข้าใจเป็นฐาน ยิ่งคุณคุมอารมณ์ได้มั่นคงเท่าไหร่ สถานการณ์รอบข้างก็จะยิ่งเกรงใจและคล้อยตามคุณ หรืออาจได้ผู้ใหญ่ใจดีเข้ามาช่วยประคอง',
    postureReversedTh:
      'ระวังการกดความอึดอัดไว้ข้างในคนเดียวจนตึงเครียด หาพื้นที่ระบายหรือสื่อสารความต้องการออกไปด้วยน้ำเสียงสงบแต่ชัดเจนดีกว่า',
    personEn:
      'As a person, King of Cups represents someone calm, kind, and emotionally mature — or guarded and quietly withdrawn when reversed.',
    postureEn:
      'Respond with composed emotional maturity and steady warmth rather than suppressing unspoken feelings.',
  },

  /* ==================== SWORDS (AIR) ==================== */
  'swords-page': {
    personUprightTh:
      'หากมองเป็นตัวบุคคล แทนคนหัวไว ช่างสังเกต ชอบหาข้อมูล ถามตรงตอบตรง อาจแอบส่องแอบติดตามเรื่องราวอยู่ห่างๆ ด้วยความอยากรู้อยากเห็น',
    personReversedTh:
      'หากมองเป็นตัวบุคคล ต้องระวังคนพูดจาไวไม่ทันคิด ขี้ระแวง จับผิดเก่ง หรือชอบตีความคำพูดสั้นๆ ไปในทางลบจนเกิดเรื่องเข้าใจผิด',
    postureUprightTh:
      'ไพ่ชวนให้คุณตื่นตัวเก็บข้อมูลและตรวจสอบรายละเอียดให้ครบก่อนขยับตัว ความช่างสังเกตและไหวพริบจะช่วยให้คุณไม่เสียเปรียบ',
    postureReversedTh:
      'ลดการไถเช็กข่าวสารหรือคิดระแวงไปล่วงหน้าลงสักนิด โฟกัสเฉพาะข้อเท็จจริงที่ยืนยันได้จริงแล้วใจจะสงบขึ้นมาก',
    personEn:
      'As a person, Page of Swords shows someone observant, sharp-minded, and curious — or defensive and quick to jump to conclusions when reversed.',
    postureEn:
      'Verify facts attentively and stay curious without slipping into restless over-monitoring.',
  },
  'swords-knight': {
    personUprightTh:
      'ในมุมตัวบุคคล แทนคนมุ่งมั่น พูดตรงไม่อ้อมค้อม คิดไวตัดสินใจไว เวลามีประเด็นอะไรจะอยากเคลียร์ให้จบเดี๋ยวนั้นเลย ไม่ชอบความคลุมเครือ',
    personReversedTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนใจร้อน ปากไว เวลาหงุดหงิดอาจเผลอพูดแรงแบบขวานผ่าซากโดยไม่ทันถนอมน้ำใจคนฟัง',
    postureUprightTh:
      'จังหวะนี้เหมาะกับการลุยจัดการเรื่องค้างคาอย่างฉับไวและตรงประเด็น ใช้ความชัดเจนตัดความลังเลออกไปแล้วเดินหน้าเต็มตัวได้เลย',
    postureReversedTh:
      'ระวังความรีบร้อนหรือคำพูดตอนอารมณ์พุ่งจะสร้างรอยร้าวโดยไม่ตั้งใจ นับหนึ่งถึงสิบและทวนแผนให้รอบคอบก่อนกดส่งหรือตกลงนะ',
    personEn:
      'As a person, Knight of Swords indicates someone direct, driven, and fast-talking — or blunt and impatient when reversed.',
    postureEn:
      'Move forward with sharp focus, tempering speed with thoughtful tact before speaking or acting.',
  },
  'swords-queen': {
    personUprightTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนฉลาด ทันคน ชัดเจนเรื่องเหตุผลและขอบเขต แม้ภายนอกอาจดูนิ่งหรือไม่ค่อยอ้อน แต่เป็นคนซื่อตรงและจริงใจมาก',
    personReversedTh:
      'ในมุมตัวบุคคล อาจหมายถึงคนที่เคยเจ็บมาเยอะจนตั้งการ์ดสูง พูดจาประชดประชันเย็นชา หรือตัดสินคนอื่นไวเกินไปเพื่อปกป้องใจตัวเอง',
    postureUprightTh:
      'ไพ่ชวนให้คุณใช้เหตุผลนำอารมณ์ กล้าขีดเส้นขอบเขตที่ชัดเจนอย่างสุภาพ อะไรที่ไม่ใช่ก็ตัดจบอย่างมืออาชีพโดยไม่ต้องรู้สึกผิด',
    postureReversedTh:
      'ผ่อนความเข้มงวดในการตำหนิตัวเองและคนรอบข้างลงนิดหนึ่ง ใช้ความชัดเจนควบคู่กับน้ำเสียงที่นุ่มนวลจะได้ผลลัพธ์ที่ดีกว่ามาก',
    personEn:
      'As a person, Queen of Swords reflects someone discerning, honest, and clear-bounded — or guarded and overly critical when reversed.',
    postureEn:
      'Rely on clear boundaries and objective truth while keeping compassion in your tone.',
  },
  'swords-king': {
    personUprightTh:
      'หากดูเป็นตัวบุคคล แทนคนมีหลักการสูง มีเหตุผล น่าเกรงขาม มองปัญหาทะลุปรุโปร่ง มักแสดงความรักหรือความหวังดีผ่านคำแนะนำตรงๆ มากกว่าคำหวาน',
    personReversedTh:
      'หากดูเป็นตัวบุคคล สะท้อนถึงคนที่ค่อนข้างเข้มงวด จุกจิก ยึดเหตุผลตัวเองเป็นใหญ่ หรือใช้คำพูดกดดันจนคนรอบข้างรู้สึกเกร็ง',
    postureUprightTh:
      'รอบนี้ต้องใช้ตรรกะ กฎกติกา และความยุติธรรมเป็นที่ตั้ง การปรึกษาผู้เชี่ยวชาญเฉพาะทางหรือวางแผนอย่างเป็นระบบจะพาคุณชนะโจทย์นี้ได้',
    postureReversedTh:
      'อย่าเพิ่งใช้แต่ตรรกะแข็งๆ บีบคั้นตัวเองหรือสถานการณ์มากเกินไป เว้นพื้นที่ให้ความยืดหยุ่นเข้ามาช่วยคลายปมบ้างนะ',
    personEn:
      'As a person, King of Swords points to an authoritative, analytical thinker — or someone cold and overly rigid when reversed.',
    postureEn:
      'Apply structured strategy, sound advice, and fair judgment without becoming overly harsh.',
  },

  /* ==================== PENTACLES (EARTH) ==================== */
  'pentacles-page': {
    personUprightTh:
      'หากมองเป็นตัวบุคคล แทนคนตั้งใจจริง ซื่อสัตย์ ขยันสร้างเนื้อสร้างตัว อาจไม่ใช่สายหวือหวาแต่หวังดีและค่อยๆ พิสูจน์ตัวเองจากการกระทำจริง',
    personReversedTh:
      'หากมองเป็นตัวบุคคล สะท้อนถึงคนที่ช่วงนี้โฟกัสหลุดง่าย ผัดวันประกันพรุ่ง หรือยังวางแผนเรื่องอนาคตและการเงินไม่ค่อยเข้าที่',
    postureUprightTh:
      'เป็นจังหวะดีมากที่จะเริ่มต้นศึกษาทักษะใหม่ วางรากฐานเก็บหอมรอมริบ หรือค่อยๆ ปั้นผลงานจากจุดเล็กๆ ด้วยความสม่ำเสมอ',
    postureReversedTh:
      'กลับมาเช็กรายละเอียดพื้นฐานและจัดตารางลงมือทำให้ชัดเจน อย่าปล่อยให้ความขี้เกียจหรือความกลัวไม่พร้อมมาดึงจังหวะดีๆ ไว้',
    personEn:
      'As a person, Page of Pentacles represents someone earnest, dependable, and eager to build — or distracted and hesitant when reversed.',
    postureEn:
      'Focus on practical learning, small consistent habits, and laying solid groundwork.',
  },
  'pentacles-knight': {
    personUprightTh:
      'ในมุมตัวบุคคล แทนคนเสมอต้นเสมอปลาย อดทน รับผิดชอบสูง พูดน้อยแต่ทำจริง อาจขยับตัวช้าและคิดนานนิดหนึ่งแต่ถ้าตกลงใจแล้วไว้ใจได้ยาวๆ',
    personReversedTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนที่ติดความเคยชินเดิมๆ ไม่ค่อยกล้าเปลี่ยน ขยับตัวช้าจนน่าอึดอัด หรือบ้างานจนลืมใส่ใจบรรยากาศรอบข้าง',
    postureUprightTh:
      'ความสม่ำเสมอและวินัยคือกุญแจชนะของคุณในรอบนี้ ค่อยๆ เดินทีละก้าวอย่างไม่ย่อท้อ ผลลัพธ์ระยะยาวจะมั่นคงคุ้มเหนื่อยแน่นอน',
    postureReversedTh:
      'ลองเช็กดูว่าเรากำลังย่ำอยู่กับวิธีเดิมที่ไม่ได้ผลหรือเปล่า ปรับวิธีทำงานให้ยืดหยุ่นขึ้นอีกนิดจะช่วยประหยัดแรงไปได้มาก',
    personEn:
      'As a person, Knight of Pentacles shows someone loyal, patient, and hardworking — or overly cautious and stuck in routine when reversed.',
    postureEn:
      'Lean on steady perseverance and daily consistency, refreshing routines if progress feels stagnant.',
  },
  'pentacles-queen': {
    personUprightTh:
      'ในมุมตัวบุคคล สะท้อนถึงคนอบอุ่น ช่างดูแลเอาใจใส่ในชีวิตจริง จัดการเรื่องเงินและบ้านเก่ง อยู่ด้วยแล้วรู้สึกปลอดภัยสบายใจเหมือนอยู่บ้าน',
    personReversedTh:
      'ในมุมตัวบุคคล อาจหมายถึงคนที่แบกภาระดูแลคนอื่นและเรื่องค่าใช้จ่ายไว้เยอะจนเหนื่อยล้า กังวลเรื่องความมั่นคง หรือลืมดูแลตัวเอง',
    postureUprightTh:
      'ไพ่ชวนให้คุณกลับมาดูแลสุขภาพกายใจ จัดระเบียบการเงินและพื้นที่ส่วนตัวให้น่าอยู่ หรือมีเกณฑ์ได้รับความช่วยเหลือจากผู้ใหญ่ใจดีที่พึ่งพาได้จริง',
    postureReversedTh:
      'วางภาระที่แบกแทนคนอื่นลงบ้าง หันมาเติมพลังกายใจและจัดสรรเงินสำรองให้ตัวเองอุ่นใจก่อนเป็นอันดับแรกนะ',
    personEn:
      'As a person, Queen of Pentacles embodies practical care, generosity, and grounded comfort — or overextension and worry when reversed.',
    postureEn:
      'Tend to your practical wellbeing, comfort, and financial steadiness with warm self-respect.',
  },
  'pentacles-king': {
    personUprightTh:
      'หากดูเป็นตัวบุคคล แทนคนมีความมั่นคงสูง พึ่งพาได้จริง รักครอบครัว วางแผนระยะยาวเก่ง และมักแสดงความรักด้วยการซัพพอร์ตให้ชีวิตคุณสบายขึ้น',
    personReversedTh:
      'หากดูเป็นตัวบุคคล สะท้อนถึงคนที่เครียดเรื่องงานหรือตัวเลขมากเกินไป ดื้อเงียบ หวงพื้นที่ความมั่นคง หรือให้เวลากับงานมากกว่าความรู้สึก',
    postureUprightTh:
      'รอบนี้เน้นความคุ้มค่าระยะยาวและการบริหารทรัพยากรอย่างมืออาชีพ มีโอกาสได้รับคำชี้แนะหรือการสนับสนุนจากผู้ใหญ่ที่มีความมั่นคงสูง',
    postureReversedTh:
      'ระวังการยึดติดกับความสมบูรณ์แบบหรือความกังวลเรื่องผลลัพธ์มากไปจนตึงเครียด ค่อยๆ ประคองฐานที่มีอยู่ให้สมดุลก็เพียงพอแล้ว',
    personEn:
      'As a person, King of Pentacles represents a dependable provider with strong long-term stability — or rigid materialism when reversed.',
    postureEn:
      'Build patiently toward sustainable long-term value rather than chasing quick fixes.',
  },
};

export function isRelationalReadingContext(
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  positionId: string,
): boolean {
  return (
    topic === 'love' ||
    topic === 'family' ||
    subTag === 'career-workplace' ||
    positionId === 'other' ||
    positionId === 'external'
  );
}

/**
 * Decodes any of the 16 Court Cards into natural, context-appropriate insight.
 * Returns null for non-court cards.
 */
export function buildCourtPersonaNote(
  card: CardData,
  reversed: boolean,
  topic: ReadingTopic,
  subTag: FocusSubTag | undefined,
  positionId: string,
  lang: Lang,
): string | null {
  if (!card.court) return null;
  const entry = COURT_PERSONAS[card.id];
  if (!entry) return null;

  const relational = isRelationalReadingContext(topic, subTag, positionId);
  if (lang === 'th') {
    if (relational) {
      return reversed ? entry.personReversedTh : entry.personUprightTh;
    }
    return reversed ? entry.postureReversedTh : entry.postureUprightTh;
  }
  return relational ? entry.personEn : entry.postureEn;
}

/* ==================== Concrete Calendar Timing ==================== */

const THAI_MONTHS_SHORT = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
];

const THAI_MONTHS_FULL = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
];

const EN_MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const EN_MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FAST_MAJOR_IDS = new Set([
  'major-00-fool',
  'major-01-magician',
  'major-07-chariot',
  'major-10-wheel-of-fortune',
  'major-16-tower',
]);

function addDays(base: Date, days: number): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(base: Date, months: number): Date {
  const d = new Date(base.getTime());
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDaySpan(base: Date, minDays: number, maxDays: number, lang: Lang): string {
  const d1 = addDays(base, minDays);
  const d2 = addDays(base, maxDays);
  const m1 = d1.getMonth();
  const m2 = d2.getMonth();
  if (lang === 'th') {
    if (m1 === m2) {
      return `ราววันที่ ${d1.getDate()}–${d2.getDate()} ${THAI_MONTHS_FULL[m1]}`;
    }
    return `ราววันที่ ${d1.getDate()} ${THAI_MONTHS_SHORT[m1]} – ${d2.getDate()} ${THAI_MONTHS_SHORT[m2]}`;
  }
  if (m1 === m2) {
    return `around ${EN_MONTHS_SHORT[m1]} ${d1.getDate()}–${d2.getDate()}`;
  }
  return `around ${EN_MONTHS_SHORT[m1]} ${d1.getDate()} – ${EN_MONTHS_SHORT[m2]} ${d2.getDate()}`;
}

function formatMonthSpan(base: Date, minMonths: number, maxMonths: number, lang: Lang): string {
  const d1 = addMonths(base, minMonths);
  const d2 = addMonths(base, maxMonths);
  const m1 = d1.getMonth();
  const m2 = d2.getMonth();
  if (lang === 'th') {
    if (m1 === m2) return `ราวเดือน${THAI_MONTHS_FULL[m1]}`;
    return `ช่วงเดือน${THAI_MONTHS_FULL[m1]} – ${THAI_MONTHS_FULL[m2]}`;
  }
  if (m1 === m2) return `around ${EN_MONTHS_FULL[m1]}`;
  return `between ${EN_MONTHS_FULL[m1]} and ${EN_MONTHS_FULL[m2]}`;
}

function getSuitActiveDayHint(card: CardData, lang: Lang): string {
  if (lang === 'th') {
    switch (card.suit) {
      case 'wands':
        return 'โดยเฉพาะจังหวะวันอาทิตย์หรือวันพฤหัสบดีที่พลังงานเรื่องนี้จะขยับตัวชัดเป็นพิเศษ';
      case 'cups':
        return 'โดยเฉพาะวันจันทร์หรือวันศุกร์ซึ่งเหมาะกับการพูดคุยเปิดใจและขยับความสัมพันธ์';
      case 'swords':
        return 'โดยเฉพาะวันพุธหรือวันเสาร์ที่เหมาะกับการเคลียร์เอกสาร เจรจา หรือตัดสินใจให้เด็ดขาด';
      case 'pentacles':
        return 'โดยเฉพาะวันพฤหัสบดีหรือวันศุกร์ที่เกื้อหนุนเรื่องข้อตกลง การเงิน และผลลัพธ์ที่เป็นรูปธรรม';
      case 'major':
      default:
        return 'โดยสังเกตสัญญาณความชัดเจนที่จะค่อยๆ ปรากฏเด่นขึ้นเมื่อใจคุณพร้อมขยับก้าวแรก';
    }
  }
  switch (card.suit) {
    case 'wands':
      return 'especially around Sundays or Thursdays when active momentum peaks.';
    case 'cups':
      return 'especially around Mondays or Fridays for heartfelt conversations.';
    case 'swords':
      return 'especially around Wednesdays or Saturdays for clear decisions and communication.';
    case 'pentacles':
      return 'especially around Thursdays or Fridays for practical and financial steps.';
    case 'major':
    default:
      return 'with key turning signals surfacing as soon as you commit to your first step.';
  }
}

export function buildConcreteTiming(
  lastDrawn: { card: CardData; reversed: boolean },
  referenceIsoDate: string | null | undefined,
  lang: Lang,
): string {
  const { card, reversed } = lastDrawn;
  const num = card.number ?? 11;

  type SpanSpec =
    | { kind: 'days'; min: number; max: number; relTh: string; relEn: string }
    | { kind: 'months'; min: number; max: number; relTh: string; relEn: string };

  let spec: SpanSpec;

  if (card.suit === 'wands') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      spec = { kind: 'days', min: 3, max: 7, relTh: 'ภายใน 3–7 วันข้างหน้า', relEn: 'within the next 3–7 days' };
    } else if (!reversed || num <= 5) {
      spec = { kind: 'days', min: 7, max: 14, relTh: 'ในช่วง 1–2 สัปดาห์ข้างหน้า', relEn: 'within 1–2 weeks' };
    } else {
      spec = { kind: 'days', min: 14, max: 28, relTh: 'ในช่วง 2–4 สัปดาห์ข้างหน้า', relEn: 'within 2–4 weeks' };
    }
  } else if (card.suit === 'swords') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      spec = { kind: 'days', min: 7, max: 14, relTh: 'ในช่วง 1–2 สัปดาห์ข้างหน้า', relEn: 'within 1–2 weeks' };
    } else if (!reversed || num <= 5) {
      spec = { kind: 'days', min: 14, max: 28, relTh: 'ในช่วง 2–4 สัปดาห์ข้างหน้า', relEn: 'within 2–4 weeks' };
    } else {
      spec = { kind: 'months', min: 1, max: 2, relTh: 'ในช่วง 1–2 เดือนข้างหน้า', relEn: 'over the next 1–2 months' };
    }
  } else if (card.suit === 'cups') {
    if (!reversed && (num <= 5 || card.court === 'page' || card.court === 'knight')) {
      spec = { kind: 'days', min: 14, max: 28, relTh: 'ในช่วง 2–4 สัปดาห์ข้างหน้า', relEn: 'within 2–4 weeks' };
    } else if (!reversed || num <= 5) {
      spec = { kind: 'months', min: 1, max: 3, relTh: 'ในช่วง 1–3 เดือนข้างหน้า', relEn: 'over the next 1–3 months' };
    } else {
      spec = { kind: 'months', min: 2, max: 4, relTh: 'ในช่วง 2–4 เดือนข้างหน้า', relEn: 'over the next 2–4 months' };
    }
  } else if (card.suit === 'pentacles') {
    if (!reversed && (num <= 4 || card.court === 'page')) {
      spec = { kind: 'months', min: 1, max: 3, relTh: 'ในช่วง 1–3 เดือนข้างหน้า', relEn: 'over the next 1–3 months' };
    } else if (!reversed && num <= 8) {
      spec = { kind: 'months', min: 3, max: 6, relTh: 'ในช่วง 3–6 เดือนข้างหน้า', relEn: 'over the next 3–6 months' };
    } else {
      spec = { kind: 'months', min: 6, max: 12, relTh: 'ในช่วง 6–12 เดือนข้างหน้า', relEn: 'over the next 6–12 months' };
    }
  } else {
    if (FAST_MAJOR_IDS.has(card.id)) {
      spec = reversed
        ? { kind: 'months', min: 1, max: 3, relTh: 'ในช่วง 1–3 เดือนข้างหน้า', relEn: 'over the next 1–3 months' }
        : { kind: 'days', min: 14, max: 28, relTh: 'ในช่วง 2–4 สัปดาห์ข้างหน้า', relEn: 'within 2–4 weeks' };
    } else {
      spec = reversed
        ? { kind: 'months', min: 3, max: 6, relTh: 'ในช่วง 3–6 เดือนข้างหน้า', relEn: 'over the next 3–6 months' }
        : { kind: 'months', min: 1, max: 3, relTh: 'ในช่วง 1–3 เดือนข้างหน้า', relEn: 'over the next 1–3 months' };
    }
  }

  let parsedBase: Date | null = null;
  if (referenceIsoDate) {
    const d = new Date(referenceIsoDate);
    if (!Number.isNaN(d.getTime())) {
      parsedBase = d;
    }
  }

  const dayHint = getSuitActiveDayHint(card, lang);

  if (!parsedBase) {
    if (lang === 'th') {
      return `เมื่อดูจังหวะเวลาจากหน้าไพ่ สัญญาณความชัดเจนจะเริ่มขยับให้เห็น${spec.relTh} ${dayHint}`;
    }
    return `Based on the spread’s pace, expect clearer movement ${spec.relEn}, ${dayHint}`;
  }

  const calendarLabel =
    spec.kind === 'days'
      ? formatDaySpan(parsedBase, spec.min, spec.max, lang)
      : formatMonthSpan(parsedBase, spec.min, spec.max, lang);

  if (lang === 'th') {
    return `จับจังหวะจากหน้าไพ่ใบสรุป แนวโน้มเรื่องนี้จะเริ่มเห็นความเคลื่อนไหวชัดเจน${spec.relTh} (${calendarLabel}) ${dayHint}`;
  }
  return `Tracing the final card’s pace, expect noticeable movement ${spec.relEn} (${calendarLabel}), ${dayHint}`;
}
