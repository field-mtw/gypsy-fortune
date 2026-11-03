// Sub-tag precision layer — adapts the reading's decisive card & advice to the user's exact situational sub-tag.

import type { FocusSubTag } from './focus-topics';

export interface SubTagLensEntry {
  th: {
    positive: string;
    mixed: string;
    challenging: string;
    advice: string;
  };
  en: {
    positive: string;
    mixed: string;
    challenging: string;
    advice: string;
  };
}

export const SUBTAG_LENS: Record<FocusSubTag, SubTagLensEntry> = {
  /* ==================== LOVE ==================== */
  'love-single': {
    th: {
      positive:
        'เจาะจงสำหรับคนโสด พลังงานหน้าไพ่เปิดรับความสัมพันธ์ครั้งใหม่ที่เข้ามาแบบสบายใจ มีโอกาสพบคนที่คุยกันถูกคอจากสังคม กิจกรรม หรือสายงานที่คุ้นเคยค่ะ',
      mixed:
        'ในมุมของคนโสด จังหวะนี้เหมาะกับการเปิดพื้นที่ให้คนใหม่ๆ ได้ทำความรู้จักแบบค่อยเป็นค่อยไป ยังไม่ต้องรีบเร่งผูกมัดจนกว่าจะเห็นความสม่ำเสมอค่ะ',
      challenging:
        'สำหรับคนโสด ไพ่ชวนให้กลับมาเติมความสุขให้ตัวเองอิ่มก่อนนะคะ ช่วงนี้อย่าเพิ่งรีบเปิดใจเพียงเพราะความเหงา การคัดกรองคนอย่างใจเย็นจะช่วยเซฟหัวใจได้ดีที่สุดค่ะ',
      advice:
        'พาตัวเองออกไปเจอสังคมหรือกิจกรรมที่ชอบแบบไม่กดดัน ความเป็นตัวของตัวเองที่สดใสจะดึงดูดคนที่ศีลเสมอกันเข้ามาเองค่ะ',
    },
    en: {
      positive:
        'For singles, this card opens warm space for a genuine new connection — stay open to conversations that start naturally.',
      mixed:
        'As a single heart, let new connections unfold at an unhurried pace and watch consistency over quick sparks.',
      challenging:
        'For singles, prioritize your own peace first rather than rushing into something out of loneliness.',
      advice:
        'Step into spaces and hobbies you genuinely enjoy; relaxed authenticity attracts the healthiest match.',
    },
  },
  'love-talking': {
    th: {
      positive:
        'เจาะจงถึงสถานะคนคุย สัญญาณระหว่างคุณสองคนมีแนวโน้มชัดเจนและอบอุ่นขึ้น ต่างฝ่ายต่างเริ่มเปิดพื้นที่ให้กันและมีโอกาสขยับความสัมพันธ์ไปอีกขั้นค่ะ',
      mixed:
        'สำหรับสถานะคนคุยที่ยังไม่ชัด ตอนนี้ยังเป็นช่วงดูเชิงและเรียนรู้จังหวะของกันและกัน แนะนำให้ดูที่การกระทำต่อเนื่องมากกว่าคำพูดสั้นๆ ค่ะ',
      challenging:
        'ในมุมของคนคุยที่สถานะคลุมเครือ ไพ่สะกิดให้ระวังการทุ่มใจไปฝ่ายเดียวโดยยังไม่ได้รับความชัดเจนกลับมา ถอยมาวางใจไว้ตรงกลางจะไม่เหนื่อยเกินไปค่ะ',
      advice:
        'สังเกตความสม่ำเสมอในการทักทายและใส่ใจในชีวิตจริง และเมื่อจังหวะสบายใจค่อยถามความชัดเจนแบบตรงไปตรงมาไม่กดดันค่ะ',
    },
    en: {
      positive:
        'In a talking stage, signals are warming up toward clearer mutual interest and steadier closeness.',
      mixed:
        'While the status is still forming, observe consistent everyday effort rather than rushing a label.',
      challenging:
        'In an unclear talking stage, protect your emotional balance and avoid over-investing without reciprocal effort.',
      advice:
        'Let steady actions speak louder than mixed signals, and communicate your boundaries gently.',
    },
  },
  'love-coupled': {
    th: {
      positive:
        'ในมุมของคนมีคู่ พลังไพ่ช่วยหนุนความเข้าใจและความมั่นคงในชีวิตคู่ เป็นจังหวะดีในการวางแผนอนาคตร่วมกันหรือเติมความอบอุ่นให้กันมากขึ้นค่ะ',
      mixed:
        'สำหรับชีวิตคู่ช่วงนี้ อาจมีเรื่องภาระหน้าที่หรือเวลาที่ต้องสลับมาปรับจูนกันบ้าง การเปิดใจรับฟังกันโดยไม่คิดแทนจะช่วยให้ความสัมพันธ์ราบรื่นขึ้นค่ะ',
      challenging:
        'สำหรับคนมีคู่ ไพ่เตือนให้ระวังความเหนื่อยสะสมหรือคำพูดประชดเล็กๆ ที่บั่นทอนใจ ลองลดทิฐิแล้วหันมาคุยกันด้วยความห่วงใยเหมือนวันแรกๆ นะคะ',
      advice:
        'หาเวลาคุณภาพสั้นๆ ที่ได้คุยและฟังความรู้สึกกันจริงๆ โดยวางเรื่องงานและมือถือลงชั่วคราวค่ะ',
    },
    en: {
      positive:
        'Within your relationship, mutual support deepens — a great window for shared plans and warm appreciation.',
      mixed:
        'In partnership, balancing daily responsibilities with open, patient listening will keep you in sync.',
      challenging:
        'For couples, soften defensive words and address unspoken tension as teammates rather than opponents.',
      advice:
        'Set aside unhurried quality time together without screens or outside stress.',
    },
  },
  'love-ex': {
    th: {
      positive:
        'สำหรับเรื่องแฟนเก่าและการมูฟออน พลังไพ่ชี้ไปในทิศทางที่หัวใจคุณจะโล่งและเป็นอิสระขึ้น ไม่ว่าจะเป็นการเคลียร์ความค้างคาด้วยดีหรือการพร้อมก้าวสู่วันใหม่ที่สดใสกว่าเดิมค่ะ',
      mixed:
        'ในบริบทของแฟนเก่า ความรู้สึกผูกพันหรือความคิดถึงอาจยังแวะเวียนมาเป็นระยะ ให้เวลากับหัวใจตัวเองค่อยๆ ตกผลึกโดยไม่ต้องเร่งบังคับว่าจะต้องลืมทันทีค่ะ',
      challenging:
        'สำหรับประเด็นแฟนเก่า ไพ่เตือนอย่างอบอุ่นว่าอย่าเพิ่งกลับไปวนในลูปเดิมหากปัญหาเก่ายังไม่ได้รับการแก้ไข การรักและให้เกียรติหัวใจตัวเองสำคัญที่สุดในตอนนี้ค่ะ',
      advice:
        'ถามใจตัวเองตามตรงว่าคิดถึง "ตัวตนจริงของเขาในวันนี้" หรือคิดถึง "ความทรงจำดีๆ ในวันวาน" คำตอบนี้จะชี้ทางที่ชัดที่สุดค่ะ',
    },
    en: {
      positive:
        'Around an ex or moving on, emotional heaviness lifts — bringing peaceful closure or fresh readiness for a brighter chapter.',
      mixed:
        'Memories may still linger gently; give yourself grace to process before making any sudden outreach.',
      challenging:
        'Be mindful of reopening an old cycle if the core issue remains unchanged — protect your hard-earned healing.',
      advice:
        'Reflect honestly on whether you miss the present reality of that person or simply the comfort of old memories.',
    },
  },

  /* ==================== CAREER ==================== */
  'career-current': {
    th: {
      positive:
        'เจาะจงกับงานปัจจุบันและการเติบโต ผลงานและความตั้งใจของคุณเริ่มเข้าตาผู้ใหญ่ มีจังหวะได้รับความไว้วางใจ ขยับขยายหน้าที่ หรือก้าวหน้าขึ้นอย่างมั่นคงค่ะ',
      mixed:
        'สำหรับงานที่ทำอยู่ตอนนี้ เป็นช่วงประคองมาตรฐานและจัดระบบงานให้เข้าที่ การเก็บรายละเอียดให้เนี๊ยบจะเป็นแต้มต่อสำคัญในระยะถัดไปค่ะ',
      challenging:
        'ในมุมของงานปัจจุบัน อาจรู้สึกตึงมือจากภาระงานที่ถาโถมหรือกติกาที่เปลี่ยนไป แนะนำให้โฟกัสเนื้องานหลักตามลำดับความสำคัญ อย่าเพิ่งแบกทุกอย่างไว้คนเดียวค่ะ',
      advice:
        'สรุปผลงานและตัวเลขความสำเร็จที่ทำได้เก็บไว้เป็นระยะ จะช่วยต่อยอดโอกาสเลื่อนขั้นหรือประเมินผลได้ดีมากค่ะ',
    },
    en: {
      positive:
        'In your current role, steady competence is being noticed — opening room for recognition and expanded responsibility.',
      mixed:
        'At work right now, refining workflows and staying consistent builds quiet leverage for your next step up.',
      challenging:
        'If your current workload feels heavy, clarify priorities with stakeholders instead of carrying invisible pressure alone.',
      advice:
        'Keep a clear record of your wins and completed milestones for upcoming reviews or growth talks.',
    },
  },
  'career-hunt': {
    th: {
      positive:
        'สำหรับคนที่กำลังหางานใหม่หรือเล็งย้ายงาน จังหวะดวงกำลังเปิดรับโอกาสใหม่ที่น่าสนใจ มีเกณฑ์ได้รับการติดต่อกลับ สัมภาษณ์ราบรื่น หรือเจอที่ที่เข้ากับตัวตนมากขึ้นค่ะ',
      mixed:
        'ในเรื่องการสมัครงานหรือย้ายงาน อาจต้องใช้เวลาคัดเลือกและเปรียบเทียบเงื่อนไขสักนิด อย่ารีบด่วนตัดสินใจออกจากที่เดิมจนกว่าข้อเสนอใหม่จะชัดเจนเป็นลายลักษณ์อักษรค่ะ',
      challenging:
        'สำหรับการหางานใหม่หรือเปลี่ยนงาน ช่วงนี้อาจมีดีเลย์หรือข้อเสนอยังไม่ตรงใจร้อยเปอร์เซ็นต์ ใช้จังหวะนี้ปรับเรซูเม่และอัปสกิลรอไว้ เดี๋ยวรอบโอกาสที่ดีกว่าจะตามมาค่ะ',
      advice:
        'ปรับพอร์ตและเรซูเม่ให้ชูจุดแข็งที่แก้ปัญหาให้องค์กรได้จริง และลองเปิดช่องทางผ่านคนรู้จักหรือคอนเนกชันสายงานดูนะคะ',
    },
    en: {
      positive:
        'For your job search or switch, momentum favors promising callbacks, interviews, and a better-fitting environment.',
      mixed:
        'Take time comparing offers carefully and secure written confirmation before leaving your current base.',
      challenging:
        'Hiring timelines may move slowly right now — treat delays as space to sharpen your portfolio for a stronger match.',
      advice:
        'Tailor your resume to concrete results and tap trusted industry connections alongside direct applications.',
    },
  },
  'career-business': {
    th: {
      positive:
        'เจาะจงด้านธุรกิจส่วนตัว ค้าขาย หรือฟรีแลนซ์ มีเกณฑ์ได้ลูกค้ากลุ่มใหม่ ยอดออเดอร์คึกคัก หรือต่อยอดไอเดียสร้างจุดขายที่ทำกำไรได้ดีค่ะ',
      mixed:
        'สำหรับคนทำธุรกิจและฟรีแลนซ์ ช่วงนี้เหมาะกับการรักษาฐานลูกค้าเก่าควบคู่กับการคุมต้นทุนให้รัดกุม ค่อยๆ ปรับกลยุทธ์ตามตลาดจริงจะไปได้มั่นคงค่ะ',
      challenging:
        'ในมุมธุรกิจและงานอิสระ ระวังเรื่องกระแสเงินสดหมุนเวียนหรือดีลที่ตกลงปากเปล่าแล้วยังไม่นิ่ง เน้นเก็บมัดจำและเช็กต้นทุนแฝงทุกครั้งก่อนรับงานใหญ่ค่ะ',
      advice:
        'ใส่ใจบริการหลังการขายและความชัดเจนของขอบเขตงาน การบอกปากต่อปากจากลูกค้าที่ประทับใจจะพางานดีๆ เข้ามาต่อเนื่องค่ะ',
    },
    en: {
      positive:
        'For business and freelance work, fresh client interest and standout offerings bring encouraging traction.',
      mixed:
        'Nurture repeat clients while keeping operating costs lean and adaptable.',
      challenging:
        'Protect margins and require clear deposits and written scope before committing resources.',
      advice:
        'Focus on standout reliability for existing clients — word-of-mouth referrals will carry strong weight.',
    },
  },
  'career-workplace': {
    th: {
      positive:
        'สำหรับเรื่องเพื่อนร่วมงานและผู้ใหญ่ในที่ทำงาน บรรยากาศความร่วมมือเป็นไปในทางบวก มีคนพร้อมซัพพอร์ตช่วยเหลือและรับฟังเหตุผลของคุณมากขึ้นค่ะ',
      mixed:
        'ในมุมความสัมพันธ์ที่ทำงาน แนะนำให้วางตัวเป็นกลางสุภาพ โฟกัสที่เนื้องานและข้อเท็จจริงมากกว่าอารมณ์ของคนรอบข้างจะทำงานได้สบายใจที่สุดค่ะ',
      challenging:
        'สำหรับเรื่องคนในที่ทำงาน อาจมีคำพูดจุกจิกหรือความเห็นไม่ตรงกันเข้ามากวนใจ ขีดเส้นแบ่งขอบเขตงานให้ชัดและเก็บหลักฐานการสื่อสารเป็นลายลักษณ์อักษรไว้เสมอค่ะ',
      advice:
        'สื่อสารเรื่องงานให้กระชับ ชัดเจน และตรงประเด็นโดยไม่เก็บอารมณ์ของคนอื่นกลับมาคิดต่อหลังเลิกงานค่ะ',
    },
    en: {
      positive:
        'Workplace relationships lean supportive — collaboration and backing from mentors or peers flow smoothly.',
      mixed:
        'Stay warm yet neutral in office politics, letting clear facts guide shared work.',
      challenging:
        'Keep healthy emotional distance from workplace friction and document agreements clearly.',
      advice:
        'Communicate expectations concisely in writing and leave office tension at the door after hours.',
    },
  },

  /* ==================== MONEY ==================== */
  'money-cashflow': {
    th: {
      positive:
        'ในมุมสภาพคล่องรายเดือน การเงินหมุนเวียนคล่องมือขึ้น รายรับสมดุลกับรายจ่ายและเริ่มพอมีจังหวะแบ่งเก็บสำรองได้สบายใจขึ้นค่ะ',
      mixed:
        'สำหรับสภาพคล่องช่วงนี้ เงินเข้าออกยังพอหมุนทันกันได้แต่อาจมีรายจ่ายจุกจิกแทรกเข้ามา การกันงบใช้จ่ายรายสัปดาห์จะช่วยให้ไม่ตึงมือตอนปลายเดือนค่ะ',
      challenging:
        'เจาะจงเรื่องสภาพคล่อง ช่วงนี้ควรรัดเข็มขัดตัดรายจ่ายตามอารมณ์ออกชั่วคราว และสำรองเงินสดไว้เผื่อค่าใช้จ่ายฉุกเฉินก่อนเป็นอันดับแรกนะคะ',
      advice:
        'เช็กยอดรายจ่ายแฝงหรือค่าบริการรายเดือนที่ไม่ได้ใช้งาน แล้วตัดออกทันทีจะช่วยดึงเงินสดกลับมาได้ไวค่ะ',
    },
    en: {
      positive:
        'Monthly cashflow smooths out nicely, giving you breathing room to cover bills and set savings aside.',
      mixed:
        'Income covers needs, though small unplanned expenses call for mindful weekly budgeting.',
      challenging:
        'Keep cash liquid right now and pause impulse spending until monthly obligations settle.',
      advice:
        'Audit recurring subscriptions and small leaks this week to free up immediate breathing room.',
    },
  },
  'money-windfall': {
    th: {
      positive:
        'สำหรับมุมโชคลาภและเงินก้อนพิเศษ หน้าไพ่ส่งสัญญาณข่าวดีเรื่องเงินพิเศษ โบนัส คอมมิชชัน ของขวัญมีค่า หรือลาภลอยเล็กๆ น้อยๆ ที่ทำให้ยิ้มได้ค่ะ',
      mixed:
        'ในเรื่องโชคลาภและเงินพิเศษ โอกาสได้เงินจะมาจากการลงมือทำ น้ำพักน้ำแรง หรือการต่อยอดคอนเนกชันมากกว่าการหวังพึ่งเสี่ยงโชคเพียงอย่างเดียวค่ะ',
      challenging:
        'สำหรับด้านการเสี่ยงโชค ช่วงนี้ดวงลาภลอยยังไม่เด่นชัด แนะนำให้เก็บเงินต้นไว้กับตัวและเน้นสร้างรายได้จากช่องทางที่ชัวร์จะคุ้มค่าและปลอดภัยกว่าค่ะ',
      advice:
        'หากเสี่ยงโชคให้ตั้งงบเล็กๆ พอสนุกไม่กระทบเงินหลัก และเมื่อได้เงินพิเศษเข้ามาให้แบ่งเก็บออมทันทีอย่างน้อยครึ่งหนึ่งค่ะ',
    },
    en: {
      positive:
        'Around windfalls and bonuses, auspicious energy favors pleasant extras, rewards, or timely gifts.',
      mixed:
        'Extra gains are far more likely through active effort and smart follow-up than pure chance.',
      challenging:
        'Speculative luck is quiet right now — protect your principal rather than chasing risky bets.',
      advice:
        'Keep any fun-money budget strictly capped, and tuck away half of any bonus that arrives.',
    },
  },
  'money-invest': {
    th: {
      positive:
        'เจาะจงด้านการลงทุนและต่อยอดทรัพย์สิน เป็นจังหวะดีสำหรับการวางแผนลงทุนที่มีพื้นฐานรองรับ หรือต่อยอดสินทรัพย์ที่เติบโตมั่นคงในระยะกลางถึงยาวค่ะ',
      mixed:
        'สำหรับการลงทุน ช่วงนี้เหมาะกับการทยอยสะสมทีละไม้ (DCA) และศึกษาข้อมูลเชิงลึกให้ครบถ้วนมากกว่าการทุ่มเงินก้อนใหญ่ในจังหวะเดียวค่ะ',
      challenging:
        'ในมุมการลงทุน ไพ่เตือนให้ระวังสินทรัพย์ผันผวนสูงหรือข้อเสนอที่การันตีผลตอบแทนเกินจริง การรักษาเงินต้นและถือสภาพคล่องไว้ก่อนถือเป็นการลงทุนที่ฉลาดที่สุดตอนนี้ค่ะ',
      advice:
        'เลือกลงทุนเฉพาะในสิ่งที่คุณเข้าใจกลไกความเสี่ยงชัดเจน และกระจายพอร์ตไม่วางไข่ไว้ในตะกร้าใบเดียวค่ะ',
    },
    en: {
      positive:
        'For investing, grounded research and quality long-term assets align well with this spread.',
      mixed:
        'Pace your entries gradually rather than committing a single lump sum all at once.',
      challenging:
        'Guard your capital against hype or unfamiliar high-risk promises; patience preserves wealth.',
      advice:
        'Invest only in vehicles you thoroughly understand and keep your core emergency fund untouched.',
    },
  },
  'money-debt': {
    th: {
      positive:
        'สำหรับเรื่องการปลดหนี้และตั้งหลักการเงิน เริ่มเห็นแสงสว่างและช่องทางทยอยเคลียร์ยอดค้างให้เบาลง มีโอกาสเจรจาปรับโครงสร้างหรือได้รายได้เสริมเข้ามาช่วยผ่อนแรงค่ะ',
      mixed:
        'ในมุมของการจัดการภาระหนี้ แม้ต้องใช้เวลาค่อยๆ ผ่อนชำระไปตามแผน แต่หากรักษาวินัยต่อเนื่องไม่สร้างหนี้ก้อนใหม่ ยอดจะค่อยๆ ลดลงอย่างเป็นระบบค่ะ',
      challenging:
        'สำหรับการเคลียร์ภาระหนี้ อย่าเพิ่งท้อหรือกู้ก้อนใหม่มาโปะก้อนเก่าแบบดอกเบี้ยแพง แนะนำให้กางตัวเลขจริงและเข้าไปคุยปรับเงื่อนไขผ่อนชำระตรงๆ จะช่วยให้หายใจโล่งขึ้นค่ะ',
      advice:
        'เรียงลำดับปิดหนี้ก้อนที่ดอกเบี้ยสูงที่สุดหรือก้อนเล็กที่สุดก่อนทีละรายการ เพื่อสร้างกำลังใจและลดภาระดอกเบี้ยสะสมค่ะ',
    },
    en: {
      positive:
        'Around clearing debt, steady discipline or helpful restructuring opens a realistic path to lighter shoulders.',
      mixed:
        'Progress comes step by step — avoid taking on new obligations while chipping away consistently.',
      challenging:
        'Avoid high-interest rollovers; facing the numbers directly and negotiating terms early brings real relief.',
      advice:
        'List balances clearly and target either the highest-interest or smallest balance first for steady momentum.',
    },
  },

  /* ==================== STUDY ==================== */
  'study-exam': {
    th: {
      positive:
        'เจาะจงเรื่องผลสอบและการแข่งขัน มีเกณฑ์ทำข้อสอบได้ตรงจุดที่อ่านทบทวนไว้ สติและไหวพริบในห้องสอบจะพาให้ผ่านเกณฑ์หรือได้ผลลัพธ์ที่น่าภูมิใจค่ะ',
      mixed:
        'สำหรับการสอบครั้งนี้ ผลลัพธ์จะแปรผันตรงกับการฝึกทำโจทย์และอุดจุดอ่อนในช่วงโค้งสุดท้าย ยิ่งทบทวนจุดที่มักพลาดบ่อยจะยิ่งเพิ่มคะแนนได้ชัดค่ะ',
      challenging:
        'ในมุมของการสอบ ระวังความตื่นเต้นลนลานหรือการอ่านอัดข้ามคืนจนสมองล้าในวันจริง เน้นสรุปหัวใจสำคัญและพักผ่อนให้พอจะดึงศักยภาพออกมาได้ดีกว่าค่ะ',
      advice:
        'ฝึกจับเวลาทำข้อสอบเก่าเสมือนจริง เพื่อลดอาการตื่นสนามและบริหารเวลาในห้องสอบได้แม่นยำค่ะ',
    },
    en: {
      positive:
        'For upcoming exams, your preparation aligns well — calm recall under pressure supports strong results.',
      mixed:
        'Results hinge on targeted review during this final stretch, especially practicing weak spots.',
      challenging:
        'Avoid last-minute cramming at the expense of sleep; a clear head on exam day matters most.',
      advice:
        'Run timed practice sets on key topics so pacing feels second nature during the real test.',
    },
  },
  'study-focus': {
    th: {
      positive:
        'สำหรับเรื่องสมาธิและไฟในการเรียน ช่วงนี้สมองเปิดรับความรู้ใหม่ได้ดี เริ่มจับทางวิธีเรียนที่เข้ากับตัวเองได้จนอ่านเข้าใจไวขึ้นมากค่ะ',
      mixed:
        'ในมุมสมาธิการเรียน ไฟอาจมาเป็นพักๆ สลับกับความวอกแวก แนะนำให้แบ่งเวลาเรียนเป็นรอบสั้นๆ สลับพัก จะช่วยให้เดินหน้าได้ต่อเนื่องกว่าการฝืนนั่งยาวค่ะ',
      challenging:
        'เจาะจงเรื่องไฟในการเรียน ตอนนี้ใจอาจล้าหรือกดดันตัวเองมากไปจนไม่อยากหยิบหนังสือ ลองลดเป้าต่อวันลงให้เล็กที่สุดเพื่อกู้จังหวะความมั่นใจกลับมาก่อนนะคะ',
      advice:
        'จัดโต๊ะเรียนให้โล่ง เก็บมือถือห่างมือสัก 25–30 นาทีต่อรอบ จะช่วยดึงสมาธิกลับมาได้ไวอย่างไม่น่าเชื่อค่ะ',
    },
    en: {
      positive:
        'Your study focus is sharpening — concepts click faster when you follow curiosity and clear structure.',
      mixed:
        'Energy may ebb and flow; short focused study sprints beat marathon sessions right now.',
      challenging:
        'Ease perfectionism if study fatigue hits — tiny daily goals rebuild momentum gently.',
      advice:
        'Clear your desk and try 25-minute phone-free blocks to let deep focus settle in naturally.',
    },
  },
  'study-further': {
    th: {
      positive:
        'สำหรับการเรียนต่อ ชิงทุน หรือเลือกสายเรียน ทิศทางเปิดกว้างและมีโอกาสได้รับข่าวดีจากสถาบันหรือหลักสูตรที่ช่วยต่อยอดอนาคตระยะยาวค่ะ',
      mixed:
        'ในเรื่องการเลือกสายเรียนหรือสมัครเรียนต่อ แนะนำให้เทียบทั้งความถนัดจริงและโอกาสต่อยอดอาชีพหลังเรียนจบ ควบคู่กับการเตรียมเอกสารให้พร้อมแต่เนิ่นๆ ค่ะ',
      challenging:
        'สำหรับการยื่นเรียนต่อหรือชิงทุน อาจต้องเตรียมแผนสำรองเผื่อไว้และเช็กเกณฑ์คุณสมบัติเอกสารให้ละเอียดรอบคอบ ไม่ควรหวังพึ่งตัวเลือกเดียวโดดๆ ค่ะ',
      advice:
        'ลองพูดคุยขอคำแนะนำจากรุ่นพี่หรือคนที่เรียนสายนั้นจริงๆ จะได้เห็นภาพตรงปกก่อนตัดสินใจเลือกค่ะ',
    },
    en: {
      positive:
        'Paths toward further study or scholarships look promising, aligning well with your long-term growth.',
      mixed:
        'Weigh curriculum fit alongside career outcomes, and prepare application materials early.',
      challenging:
        'Double-check requirements and keep a solid backup program ready so options stay open.',
      advice:
        'Speak with alumni or practitioners in that field to validate day-to-day reality before committing.',
    },
  },

  /* ==================== HEALTH ==================== */
  'health-burnout': {
    th: {
      positive:
        'สำหรับใจที่เหนื่อยล้าและภาวะหมดไฟ หน้าไพ่ส่งพลังฮีลใจที่อบอุ่นมาบอกว่าเมฆหมอกความตึงเครียดกำลังค่อยๆ เบาลง คุณกำลังจะได้พื้นที่หายใจและกลับมายิ้มได้เต็มที่อีกครั้งค่ะ',
      mixed:
        'ในมุมของความเครียดและอาการหมดไฟ ใจคุณรับภาระแทนคนอื่นหรือกดดันตัวเองมาพักใหญ่แล้ว อนุญาตให้ตัวเองวางคำว่าต้องเก่งตลอดเวลาลงบ้างนะคะ',
      challenging:
        'เจาะจงเรื่องภาวะหมดไฟ ไพ่กอดไหล่เตือนว่าตอนนี้แบตเตอรี่ใจคุณเหลือน้อยมากแล้ว หยุดฝืนอัดงานเพิ่มแล้วให้สิทธิ์ตัวเองได้พักซ่อมแซมใจอย่างจริงจังก่อนนะคะ',
      advice:
        'กันเวลาอย่างน้อยวันละ 30 นาทีเป็นพื้นที่ปลอดงานและปลอดโซเชียล เพื่อทำสิ่งที่ชุบชูใจตัวเองล้วนๆ ค่ะ',
    },
    en: {
      positive:
        'For stress and burnout recovery, emotional heaviness is lifting — making way for gentler days and renewed spark.',
      mixed:
        'You have been carrying high expectations; give yourself permission to step back from constant perfection.',
      challenging:
        'Your emotional battery needs real rest — pause extra commitments and treat recovery as non-negotiable.',
      advice:
        'Carve out 30 unplugged minutes daily for quiet rest or something purely comforting.',
    },
  },
  'health-body': {
    th: {
      positive:
        'ในมุมสุขภาพร่างกายและการพักผ่อน พลังงานกายฟื้นตัวดีขึ้น การปรับเวลานอน การขยับร่างกายเบาๆ และการดูแลอาหารการกินจะเห็นผลลัพธ์ที่สดชื่นชัดเจนค่ะ',
      mixed:
        'สำหรับสุขภาพร่างกาย ช่วงนี้ระวังอาการล้าสะสม ออฟฟิศซินโดรม ปวดตึงคอและบ่า หรือการนอนหลับไม่สนิท การจัดตารางพักให้เป็นเวลาจะช่วยได้มากค่ะ',
      challenging:
        'เจาะจงด้านร่างกาย ร่างกายกำลังส่งสัญญาณเตือนให้ลดการหักโหม พักสายตา ดื่มน้ำให้พอ และหากมีอาการผิดปกติเรื้อรังควรแวะตรวจเช็กกับแพทย์เพื่อความสบายใจนะคะ',
      advice:
        'ปรับเวลานอนให้เร็วขึ้นสักครึ่งชั่วโมง และลุกยืดเหยียดกล้ามเนื้อทุกๆ ชั่วโมงระหว่างวันค่ะ',
    },
    en: {
      positive:
        'Physical vitality responds well to steady sleep, hydration, and gentle movement right now.',
      mixed:
        'Watch minor posture tension, eye strain, or uneven sleep — consistent daily routines restore balance.',
      challenging:
        'Listen promptly to fatigue signals rather than pushing through, and consult a professional for persistent concerns.',
      advice:
        'Prioritize earlier sleep tonight and stretch tension from your neck and shoulders regularly.',
    },
  },
  'health-recovery': {
    th: {
      positive:
        'สำหรับการฟื้นฟูพลังงานชีวิต จังหวะนี้เหมือนต้นไม้ที่ได้น้ำและแสงแดดพอดี พลังบวกและแรงบันดาลใจกำลังค่อยๆ ไหลกลับเข้ามาเติมเต็มตัวคุณค่ะ',
      mixed:
        'ในมุมการชาร์จพลังชีวิต การฟื้นตัวจะเกิดขึ้นแบบค่อยเป็นค่อยไป ไม่ต้องเร่งบังคับตัวเองให้สดใสทันที ค่อยๆ เก็บเกี่ยวความสุขเล็กๆ รอบตัวในแต่ละวันนะคะ',
      challenging:
        'สำหรับการกู้คืนพลังใจ ลองถอยห่างจากบรรยากาศหรือบทสนทนาที่ดูดพลังงาน (Toxic) ชั่วคราว เพื่อปิดรูรั่วและรักษาพลังใจดีๆ ของตัวเองไว้ค่ะ',
      advice:
        'พาตัวเองไปรับแสงแดดอ่อนๆ ตอนเช้า อยู่ใกล้ธรรมชาติ หรือจัดห้องนอนให้โปร่งโล่งเพื่อเปลี่ยนถ่ายพลังงานใหม่ค่ะ',
    },
    en: {
      positive:
        'Life energy is steadily replenishing — small joys and fresh air restore your natural glow.',
      mixed:
        'Let recovery unfold gently day by day without pressuring yourself to bounce back overnight.',
      challenging:
        'Step back from draining environments or conversations so your energy can replenish undisturbed.',
      advice:
        'Get morning sunlight, declutter your resting space, and savor simple daily comforts.',
    },
  },

  /* ==================== FAMILY ==================== */
  'family-home': {
    th: {
      positive:
        'เจาะจงเรื่องคนในครอบครัว บรรยากาศในบ้านอบอุ่นและหันหน้าพูดคุยเข้าใจกันได้ดีขึ้น มีเกณฑ์ได้รับความช่วยเหลือเกื้อกูลหรือมีข่าวดีร่วมกันในบ้านค่ะ',
      mixed:
        'สำหรับความเข้าใจในครอบครัว ต่างคนต่างมีความหวังดีแต่อาจแสดงออกคนละภาษา การลดคำบ่นและรับฟังด้วยน้ำเสียงนุ่มนวลจะช่วยเชื่อมใจคนต่างวัยได้ดีมากค่ะ',
      challenging:
        'ในมุมของคนในบ้าน อาจมีความคาดหวังหรือความเห็นต่างระหว่างวัยทำให้อึดอัดใจ รักษาขอบเขตส่วนตัวด้วยความสุภาพและเลี่ยงการปะทะตอนอารมณ์ร้อนนะคะ',
      advice:
        'ชวนทานข้าวพร้อมหน้าหรือถามไถ่สารทุกข์สุกดิบเรื่องง่ายๆ ด้วยน้ำเสียงสบายๆ แทนการถกประเด็นตึงเครียดค่ะ',
    },
    en: {
      positive:
        'At home, warmth and mutual care strengthen — supportive family moments bring comfort.',
      mixed:
        'Good intentions exist on all sides even if communication styles differ; gentle tone bridges generational gaps.',
      challenging:
        'Hold calm personal boundaries around family expectations and step back from heated debates.',
      advice:
        'Lead with simple warmth — a shared meal or kind check-in softens stubborn tension.',
    },
  },
  'family-friends': {
    th: {
      positive:
        'สำหรับมิตรภาพและสังคมคนรอบตัว คุณมีกัลยาณมิตรที่ดีคอยเป็นเซฟโซนและให้คำปรึกษาที่จริงใจ มีโอกาสได้เจอเพื่อนใหม่ที่เคมีเข้ากันดีด้วยค่ะ',
      mixed:
        'ในมุมของเพื่อนและคนรอบข้าง ช่วงนี้ต่างคนต่างมีภาระชีวิตของตัวเอง อาจห่างกันบ้างตามจังหวะแต่ความหวังดียังอยู่ครบ เลือกคบคนที่อยู่ด้วยแล้วสบายใจเป็นหลักค่ะ',
      challenging:
        'เจาะจงเรื่องสังคมรอบตัว ไพ่เตือนให้ระวังเรื่องดราม่าคำพูดคนกลางหรือการรับภาระปัญหาของเพื่อนมาแบกไว้เอง ถอยออกมาอยู่ในระยะที่พอดีจะเซฟใจได้ดีกว่าค่ะ',
      advice:
        'ให้เวลากับเพื่อนกลุ่มที่คุยแล้วพลังบวกเพิ่ม และไม่ต้องเกรงใจที่จะปฏิเสธนัดที่ทำให้คุณฝืนใจค่ะ',
    },
    en: {
      positive:
        'Friendships and trusted allies offer genuine warmth, laughter, and supportive perspective.',
      mixed:
        'Busy schedules may space out catch-ups, yet true friends remain steady — value quality over quantity.',
      challenging:
        'Avoid getting pulled into third-party gossip or over-carrying others’ drama; healthy distance protects peace.',
      advice:
        'Invest your social energy in people who leave you feeling lighter and respected.',
    },
  },
  'family-living': {
    th: {
      positive:
        'สำหรับเรื่องที่อยู่อาศัยและการโยกย้าย เป็นจังหวะที่ดีสำหรับการจัดแต่งบ้าน รีโนเวตมุมพักผ่อน หรือได้เจอทำเลที่อยู่ใหม่ที่อยู่แล้วร่มเย็นสบายใจค่ะ',
      mixed:
        'ในมุมที่อยู่อาศัยหรือการย้ายที่อยู่ แนะนำให้ค่อยๆ เปรียบเทียบทำเล สัญญา และค่าใช้จ่ายแฝงให้รอบคอบก่อนตัดสินใจวางมัดจำค่ะ',
      challenging:
        'เจาะจงเรื่องบ้านและการโยกย้าย ช่วงนี้อาจมีเรื่องซ่อมแซมจุกจิกหรือแผนย้ายที่อยู่ล่าช้ากว่ากำหนด เผื่อเวลาและงบสำรองไว้สักนิดจะจัดการได้ไม่เหนื่อยค่ะ',
      advice:
        'เคลียร์ของเก่าที่ไม่ได้ใช้ในบ้านออกไปบ้าง จะช่วยให้บรรยากาศที่อยู่อาศัยโล่งโปร่งและรับพลังงานดีๆ เข้ามาง่ายขึ้นค่ะ',
    },
    en: {
      positive:
        'Around home and relocation, auspicious energy supports refreshing your space or finding a comfortable new base.',
      mixed:
        'Inspect lease details, neighborhood feel, and hidden costs carefully before finalizing a move.',
      challenging:
        'Minor repairs or moving delays may crop up — pad your timeline and budget for smooth handling.',
      advice:
        'Declutter one corner of your living space this week to invite fresh, calm energy.',
    },
  },

  /* ==================== DECISION ==================== */
  'decision-two-paths': {
    th: {
      positive:
        'เจาะจงกับการชั่งใจระหว่าง 2 ทางเลือก คำตอบเริ่มชัดเจนขึ้นแล้วค่ะ เลือกทางที่ทำให้คุณเติบโตได้ในระยะยาวและเป็นตัวเองได้แบบไม่ต้องฝืนใจจะส่งผลดีที่สุด',
      mixed:
        'สำหรับอาการลังเล 2 ทาง ทั้งสองตัวเลือกต่างมีข้อดีคนละแบบ แนะนำให้กางข้อดี-ข้อเสียลงบนกระดาษและหาข้อมูลที่ยังขาดอีกนิดก่อนฟันธงค่ะ',
      challenging:
        'ในมุมการเลือกทางแยก ตอนนี้อารมณ์ความกังวลอาจบังตาทำให้มองยังไม่ครบทุกมุม อย่าเพิ่งรีบตัดสินใจภายใต้แรงกดดัน เว้นจังหวะให้ใจนิ่งก่อนสักนิดนะคะ',
      advice:
        'ลองเขียนเปรียบเทียบว่า "อีก 1 ปีข้างหน้า ทางไหนที่คุณจะไม่เสียดายทีหลัง" คำตอบนั้นคือเข็มทิศที่แม่นยำที่สุดค่ะ',
    },
    en: {
      positive:
        'Between two paths, clarity favors the option aligned with long-term growth and authentic peace.',
      mixed:
        'Both options carry distinct trade-offs — map pros and cons on paper and gather one more piece of factual data.',
      challenging:
        'Pause before deciding under pressure; let emotional fog settle so you see both choices clearly.',
      advice:
        'Ask which option your future self one year from now will thank you for choosing.',
    },
  },
  'decision-stay-go': {
    th: {
      positive:
        'สำหรับคำถามว่าจะอยู่ต่อหรือก้าวออกมาดี หน้าไพ่ส่งพลังสนับสนุนให้คุณเลือกทางที่ให้คุณค่าและความสบายใจกับตัวคุณเอง ไม่ว่าเลือกทางไหนก็มีจังหวะที่ดีรองรับค่ะ',
      mixed:
        'ในประเด็นจะอยู่ต่อหรือพอแค่นี้ ลองตั้งกรอบเวลาและเงื่อนไขที่ชัดเจนให้ตัวเองสักหนึ่งช่วงสั้นๆ หากลองปรับเต็มที่แล้วยังเหมือนเดิม คุณจะตัดสินใจเดินออกมาได้โดยไม่ค้างคาใจค่ะ',
      challenging:
        'เจาะจงคำถามอยู่ต่อหรือไปต่อ ไพ่สะกิดให้มองตามความจริงตรงหน้ามากกว่าความเสียดายเวลาที่ผ่านมา การเตรียมแผนสำรองให้พร้อมก่อนขยับตัวจะทำให้คุณปลอดภัยที่สุดค่ะ',
      advice:
        'แยก "ความผูกพันเสียดายอดีต" ออกจาก "ศักยภาพจริงในอนาคต" แล้วเตรียมแผนรองรับตัวเองให้มั่นคงก่อนตัดสินใจค่ะ',
    },
    en: {
      positive:
        'Around staying versus moving on, trust the path that honors your self-worth — supportive ground awaits.',
      mixed:
        'Set a clear personal milestone or timeframe to test improvement before making a final call.',
      challenging:
        'Look at present reality rather than sunk cost, and build a steady safety net before stepping away.',
      advice:
        'Separate attachment to past effort from realistic future wellbeing, then choose with self-respect.',
    },
  },
  'decision-new-leap': {
    th: {
      positive:
        'สำหรับการตัดสินใจก้าวเริ่มสิ่งใหม่ จังหวะดวงเปิดไฟเขียวให้คุณกล้าลองออกจากกรอบเดิม การเริ่มต้นครั้งนี้จะพาโอกาสและประสบการณ์ที่คุ้มค่าเข้ามาค่ะ',
      mixed:
        'ในมุมการเริ่มสิ่งใหม่ สามารถก้าวออกไปลองได้เลยค่ะ เพียงแต่แนะนำให้เริ่มจากการทดลองสเกลเล็กๆ ควบคู่กับฐานเดิมที่มั่นคงไปก่อนจะอุ่นใจที่สุด',
      challenging:
        'สำหรับคำถามว่าควรกระโดดเริ่มสิ่งใหม่ตอนนี้เลยไหม ไพ่แนะนำให้ชะลอเตรียมทุน ข้อมูล และความพร้อมพื้นฐานให้แน่นอีกนิด รอจังหวะพร้อมกว่านี้จะออกตัวได้สวยกว่ามากค่ะ',
      advice:
        'เริ่มต้นจากการทดลองก้าวเล็กๆ ที่ความเสี่ยงต่ำก่อน เพื่อเช็กทิศทางจริงก่อนทุ่มเวลาหรือทรัพยากรเต็มตัวค่ะ',
    },
    en: {
      positive:
        'For taking a new leap, the green light is on — stepping beyond your comfort zone opens rewarding growth.',
      mixed:
        'Test the new path as a low-risk pilot alongside your steady base before going all in.',
      challenging:
        'Strengthen your preparation and resources a bit further before launching so your footing is solid.',
      advice:
        'Run a small practical experiment first to validate the new direction with minimal risk.',
    },
  },
};
