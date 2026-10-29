import type { CardData } from './card-types';

/**
 * Minor Arcana: Swords (Air / ดาบ) + Pentacles (Earth / เหรียญ).
 *
 * Meanings cross-checked across Labyrinthos, Purple Garden, tarot-cards.org,
 * Biddy Tarot per research_notes/tarot-78-card-roster-rws-20261029-1428/report.md.
 * Where reputable sources split on a reversed meaning, the majority reading
 * is used and the split recorded in `uncertainNote`.
 *
 * Timing (System A, locked): Swords = weeks, Pentacles = years.
 */
export const swordsPentaclesCards: CardData[] = [
  // ------------------------- SWORDS (Air / ดาบ) -------------------------
  {
    id: 'swords-ace',
    image: '/cards/swords-ace.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 1,
    court: null,
    nameEn: 'Ace of Swords',
    nameTh: 'หนึ่งดาบ',
    keywordsEn: ['clarity', 'breakthrough', 'truth', 'new ideas'],
    keywordsTh: ['ความชัดเจน', 'การทะลุผ่าน', 'ความจริง', 'ไอเดียใหม่'],
    uprightEn:
      'A breakthrough of clear thought: truth is revealed and a new mental clarity cuts through confusion.',
    uprightTh:
      'ความชัดเจนทางความคิดทะลุผ่านม่านหมอก: ความจริงปรากฏขึ้น ไอเดียใหม่ช่วยแก้ปัญหาได้',
    reversedEn:
      'Confusion, miscommunication, or clouded judgment — facts are unclear, so hold off on big decisions.',
    reversedTh:
      'ความสับสน การสื่อสารผิดพลาด หรือวิจารณญาณมัวหมอง — ข้อเท็จจริงยังไม่ชัด อย่าเพิ่งตัดสินใจเรื่องใหญ่',
    symbolismEn:
      'A hand emerges from a cloud gripping an upright sword, crowned with laurel and palm',
    symbolismTh:
      'มือโผล่ออกจากเมฆกำดาบตั้งตรง ประดับด้วยมงกุฎช่อมะกอกและใบปาล์ม',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-02',
    image: '/cards/swords-02.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 2,
    court: null,
    nameEn: 'Two of Swords',
    nameTh: 'สองดาบ',
    keywordsEn: ['difficult choice', 'indecision', 'stalemate', 'avoidance'],
    keywordsTh: ['ทางเลือกยาก', 'ลังเล', 'ทางตัน', 'การหลีกเลี่ยง'],
    uprightEn:
      'A difficult choice has you at a stalemate; you are avoiding the decision and need to face it head-on.',
    uprightTh:
      'ติดอยู่ระหว่างทางเลือกสองทางที่ตัดสินใจยาก คุณกำลังเลี่ยงปัญหา ถึงเวลาต้องเผชิญหน้าตรงๆ',
    reversedEn:
      'Clarity arrives and a decision is made — the blindfold comes off and you can finally see the situation as it is.',
    reversedTh:
      'ความชัดเจนกลับมา ตัดสินใจได้แล้ว — ผ้าปิดตาหลุดออก มองเห็นสถานการณ์ตามความเป็นจริง',
    symbolismEn:
      'A blindfolded woman sits holding two crossed swords, with the sea and rocks behind her',
    symbolismTh:
      'หญิงสาวผ้าปิดตานั่งกำดาบไขว้สองเล่ม มีทะเลและโขดหินอยู่เบื้องหลัง',
    isNegative: false,
    uncertainNote:
      'Sources split on the reversed meaning; majority reading used (Purple Garden, tarot-cards.org, Biddy: clarity, decision made). Labyrinthos reads it as still confused — the lesser of two evils with no right choice.',
  },
  {
    id: 'swords-03',
    image: '/cards/swords-03.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 3,
    court: null,
    nameEn: 'Three of Swords',
    nameTh: 'สามดาบ',
    keywordsEn: ['heartbreak', 'sorrow', 'grief', 'painful truth'],
    keywordsTh: ['อกหัก', 'ความโศกเศร้า', 'ความทุกข์', 'ความจริงอันเจ็บปวด'],
    uprightEn:
      'Heartbreak and sorrow: a painful truth must be accepted before healing can begin.',
    uprightTh:
      'ความเจ็บปวดจากการอกหักหรือความจริงอันโหดร้าย ต้องยอมรับความจริงก่อนการเยียวยาจะเริ่มได้',
    reversedEn:
      'Healing is underway — forgiveness and release of old pain are opening the way forward.',
    reversedTh:
      'กำลังอยู่ในช่วงเยียวยา — การให้อภัยและการปล่อยวางความเจ็บปวดเก่ากำลังเปิดทางไปข้างหน้า',
    symbolismEn:
      'A large heart pierced by three swords, surrounded by clouds and rain',
    symbolismTh:
      'หัวใจดวงใหญ่ถูกดาบสามเล่มแทงท่ามกลางเมฆฝน',
    isNegative: true,
    uncertainNote: null,
  },
  {
    id: 'swords-04',
    image: '/cards/swords-04.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 4,
    court: null,
    nameEn: 'Four of Swords',
    nameTh: 'สี่ดาบ',
    keywordsEn: ['rest', 'recovery', 'contemplation', 'pause'],
    keywordsTh: ['การพักผ่อน', 'การฟื้นฟู', 'การครุ่นคิด', 'การหยุดพัก'],
    uprightEn:
      'Rest and recover: take a deliberate pause from the battle to regain your strength and perspective.',
    uprightTh:
      'พักผ่อนและฟื้นฟูตัวเอง: หยุดพักจากการต่อสู้อย่างตั้งใจเพื่อเรียกแรงและมุมมองกลับมา',
    reversedEn:
      'Restlessness and exhaustion — you are refusing the rest you need, or waking up still depleted.',
    reversedTh:
      'กระสับกระส่ายและหมดแรง — คุณกำลังปฏิเสธการพักที่จำเป็น หรือตื่นมาแล้วยังล้าเหมือนเดิม',
    symbolismEn:
      'A knight lies in rest upon a tomb inside a chapel, three swords above and one beneath',
    symbolismTh:
      'อัศวินนอนพักบนหีบศพในโบสถ์ มีดาบสามเล่มแขวนอยู่ด้านบนและอีกเล่มอยู่ใต้ตัว',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-05',
    image: '/cards/swords-05.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 5,
    court: null,
    nameEn: 'Five of Swords',
    nameTh: 'ห้าดาบ',
    keywordsEn: ['conflict', 'hollow victory', 'tension', 'win at all costs'],
    keywordsTh: ['ความขัดแย้ง', 'ชัยชนะที่ว่างเปล่า', 'ความตึงเครียด', 'ชนะทุกวิถีทาง'],
    uprightEn:
      'Conflict ends in a hollow victory — winning at all costs has damaged relationships and trust.',
    uprightTh:
      'ความขัดแย้งจบลงด้วยชัยชนะที่ว่างเปล่า — การเอาชนะทุกวิถีทางทำลายความสัมพันธ์และความไว้ใจ',
    reversedEn:
      'Reconciliation and release: the conflict is defused, and you are ready to move on and let go.',
    reversedTh:
      'การปรองดองและการปล่อยวาง: ความขัดแย้งคลี่คลายลง คุณพร้อมก้าวต่อไปและวางมันลงแล้ว',
    symbolismEn:
      'A figure holding three swords, with two defeated figures walking away in the distance',
    symbolismTh:
      'ชายคนหนึ่งถือดาบสามเล่ม ขณะที่อีกสองคนเดินห่างออกไปด้วยความพ่ายแพ้',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-06',
    image: '/cards/swords-06.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 6,
    court: null,
    nameEn: 'Six of Swords',
    nameTh: 'หกดาบ',
    keywordsEn: ['transition', 'moving on', 'leaving trouble behind', 'recovery'],
    keywordsTh: ['การเปลี่ยนผ่าน', 'การก้าวต่อไป', 'ทิ้งปัญหาไว้เบื้องหลัง', 'การฟื้นตัว'],
    uprightEn:
      'A transition toward calmer waters — you are leaving trouble behind and moving toward a better situation.',
    uprightTh:
      'การเปลี่ยนผ่านสู่น่านน้ำที่สงบกว่า — คุณกำลังทิ้งปัญหาไว้เบื้องหลัง มุ่งสู่สถานการณ์ที่ดีขึ้น',
    reversedEn:
      'Resistance to change, unfinished business, or feeling stuck — something keeps you from moving on.',
    reversedTh:
      'การต่อต้านการเปลี่ยนแปลง มีเรื่องค้างคา หรือรู้สึกติดอยู่กับที่ — บางอย่างรั้งคุณไว้ไม่ให้ก้าวต่อ',
    symbolismEn:
      'A boat carrying a cloaked figure toward a distant shore, six swords planted upright in the boat',
    symbolismTh:
      'เรือบรรทุกคนคลุมผ้าล่องไปยังฝั่งไกล มีดาบหกเล่มปักตั้งอยู่ในเรือ',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-07',
    image: '/cards/swords-07.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 7,
    court: null,
    nameEn: 'Seven of Swords',
    nameTh: 'เจ็ดดาบ',
    keywordsEn: ['deception', 'strategy', 'secrecy', 'stealth'],
    keywordsTh: ['การหลอกลวง', 'กลยุทธ์', 'ความลับ', 'การแอบทำ'],
    uprightEn:
      'Deception or hidden strategy is at play — be alert to what is not being said, and guard against dishonesty.',
    uprightTh:
      'มีเรื่องหลอกลวงหรือแผนลับซ่อนอยู่ — ระวังสิ่งที่ไม่ได้พูดออกมา และป้องกันตัวเองจากความไม่ซื่อสัตย์',
    reversedEn:
      'Coming clean: secrets are confessed, or you rethink your approach and choose honesty over cunning.',
    reversedTh:
      'การเปิดเผยความจริง: ความลับถูกสารภาพออกมา หรือคุณเปลี่ยนวิธีคิด เลือกความซื่อสัตย์แทนเล่ห์เหลี่ยม',
    symbolismEn:
      'A figure sneaks away with five swords, glancing back at two left behind near a distant camp',
    symbolismTh:
      'ชายคนหนึ่งลอบนำดาบห้าเล่มหนีไป หันกลับมามองดาบอีกสองเล่มที่ทิ้งไว้ใกล้ค่ายทหาร',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-08',
    image: '/cards/swords-08.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 8,
    court: null,
    nameEn: 'Eight of Swords',
    nameTh: 'แปดดาบ',
    keywordsEn: ['feeling trapped', 'restriction', 'self-limiting beliefs', 'victim mindset'],
    keywordsTh: ['รู้สึกติดกับ', 'ข้อจำกัด', 'ความเชื่อที่จำกัดตัวเอง', 'คิดว่าตัวเองเป็นเหยื่อ'],
    uprightEn:
      'You feel trapped and powerless — but the prison is largely of your own making; new options exist if you look.',
    uprightTh:
      'คุณรู้สึกติดกับและไร้อำนาจ — แต่คุกนี้ส่วนใหญ่สร้างขึ้นเอง ยังมีทางเลือกอื่นถ้าคุณมองหา',
    reversedEn:
      'Freedom returns: a new perspective releases self-imposed limits and the fear begins to lift.',
    reversedTh:
      'อิสรภาพกลับมา: มุมมองใหม่ปลดข้อจำกัดที่ตัวเองสร้างขึ้น ความกลัวเริ่มจางลง',
    symbolismEn:
      'A blindfolded, bound woman surrounded by eight swords, with water and a castle nearby',
    symbolismTh:
      'หญิงผ้าปิดตาถูกมัด ล้อมรอบด้วยดาบแปดเล่ม ใกล้แหล่งน้ำและปราสาท',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-09',
    image: '/cards/swords-09.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 9,
    court: null,
    nameEn: 'Nine of Swords',
    nameTh: 'เก้าดาบ',
    keywordsEn: ['anxiety', 'worry', 'fear', 'sleepless nights'],
    keywordsTh: ['ความวิตกกังวล', 'ความกังวล', 'ความกลัว', 'นอนไม่หลับ'],
    uprightEn:
      'Anxiety and worry are keeping you up at night — fears are magnified in the dark, often beyond their real size.',
    uprightTh:
      'ความวิตกกังวลทำให้นอนไม่หลับ — ความกลัวมักขยายใหญ่เกินจริงในยามค่ำคืน',
    reversedEn:
      'Hope is returning: worry is lifting, the mind is settling, and recovery from sleepless anxiety is underway.',
    reversedTh:
      'ความหวังกำลังกลับมา: ความกังวลคลายลง จิตใจสงบขึ้น และกำลังฟื้นตัวจากความวิตกที่รบกวนการนอน',
    symbolismEn:
      'A figure sits upright in bed holding their head in their hands, nine swords hanging on the wall behind',
    symbolismTh:
      'คนนั่งลุกบนเตียงกุมศีรษะด้วยมือทั้งสอง มีดาบเก้าเล่มแขวนอยู่บนผนังด้านหลัง',
    isNegative: true,
    uncertainNote:
      'Sources split on the reversed meaning; majority reading used (Purple Garden, tarot-cards.org, Biddy: hope returning, releasing worry, recovery). Labyrinthos is internally self-contradictory, listing both "hope" and "despair".',
  },
  {
    id: 'swords-10',
    image: '/cards/swords-10.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: 10,
    court: null,
    nameEn: 'Ten of Swords',
    nameTh: 'สิบดาบ',
    keywordsEn: ['painful ending', 'betrayal', 'rock bottom', 'closure'],
    keywordsTh: ['จุดจบที่เจ็บปวด', 'การหักหลัง', 'จุดต่ำสุด', 'การปิดฉาก'],
    uprightEn:
      'A painful ending or betrayal — you have hit rock bottom, but the worst is over and closure brings a new dawn.',
    uprightTh:
      'จุดจบที่เจ็บปวดหรือการหักหลัง — คุณถึงจุดต่ำสุดแล้ว แต่เรื่องเลวร้ายที่สุดผ่านพ้นไป รุ่งอรุณใหม่กำลังมา',
    reversedEn:
      'Recovery and healing: the worst is over, wounds are mending, and you are rising from the lowest point.',
    reversedTh:
      'การฟื้นตัวและการเยียวยา: เรื่องเลวร้ายที่สุดผ่านพ้นไป บาดแผลกำลังสมาน และคุณกำลังลุกขึ้นจากจุดต่ำสุด',
    symbolismEn:
      'A figure lies face-down with ten swords in their back, a red sunrise breaking over dark clouds',
    symbolismTh:
      'ร่างนอนคว่ำหน้าถูกดาบสิบเล่มปักหลัง มีแสงอาทิตย์สีแดงขึ้นพ้นเมฆดำ',
    isNegative: true,
    uncertainNote: null,
  },
  {
    id: 'swords-page',
    image: '/cards/swords-page.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: null,
    court: 'page',
    nameEn: 'Page of Swords',
    nameTh: 'เด็กถือดาบ',
    keywordsEn: ['curiosity', 'mental energy', 'vigilance', 'new ideas'],
    keywordsTh: ['ความอยากรู้', 'พลังทางปัญญา', 'ความเฝ้าระวัง', 'ไอเดียใหม่'],
    uprightEn:
      'Curious mental energy: stay alert, ask sharp questions, and embrace learning — a new idea wants your attention.',
    uprightTh:
      'พลังความอยากรู้ทางปัญญา: ตื่นตัว ตั้งคำถามเฉียบคม และเปิดรับการเรียนรู้ — มีไอเดียใหม่อยากให้คุณสนใจ',
    reversedEn:
      'Scattered thoughts, gossip, or empty talk — watch for deception and avoid spreading what you cannot verify.',
    reversedTh:
      'ความคิดฟุ้งซ่าน การนินทา หรือพูดโดยไม่ทำจริง — ระวังการหลอกลวง และอย่าเผยแพร่สิ่งที่ยืนยันไม่ได้',
    symbolismEn:
      'A young figure holds a sword upright on windy ground, looking watchfully over their shoulder',
    symbolismTh:
      'เยาวชนยืนถือดาบตั้งตรงบนพื้นที่มีลมแรง หันมองไปข้างหลังอย่างเฝ้าระวัง',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-knight',
    image: '/cards/swords-knight.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: null,
    court: 'knight',
    nameEn: 'Knight of Swords',
    nameTh: 'อัศวินดาบ',
    keywordsEn: ['swift action', 'ambition', 'directness', 'defending beliefs'],
    keywordsTh: ['การลงมือรวดเร็ว', 'ความทะเยอทะยาน', 'ความตรงไปตรงมา', 'ยืนหยัดในความเชื่อ'],
    uprightEn:
      'Swift, decisive action driven by ambition — charge toward your goal with directness and defend what you believe.',
    uprightTh:
      'ลงมืออย่างรวดเร็วและเด็ดขาดด้วยความทะเยอทะยาน — พุ่งสู่เป้าหมายอย่างตรงไปตรงมา และยืนหยัดในสิ่งที่เชื่อ',
    reversedEn:
      'Recklessness and impulsiveness: charging ahead without thinking, or words that cut deeper than intended.',
    reversedTh:
      'ความหุนหันพลันแล่น: พุ่งไปข้างหน้าโดยไม่คิด หรือคำพูดที่ทิ่มแทงลึกกว่าที่ตั้งใจ',
    symbolismEn:
      'An armored knight charges forward on a rearing horse, sword raised, into a storm',
    symbolismTh:
      'อัศวินเกราะขี่ม้าโผนพุ่งไปข้างหน้า ชูดาบขึ้น ท่ามกลางพายุ',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-queen',
    image: '/cards/swords-queen.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: null,
    court: 'queen',
    nameEn: 'Queen of Swords',
    nameTh: 'ราชินีดาบ',
    keywordsEn: ['clear judgment', 'perceptiveness', 'independence', 'honesty'],
    keywordsTh: ['วิจารณญาณชัดเจน', 'สายตาแหลมคม', 'ความเป็นอิสระ', 'ความซื่อตรง'],
    uprightEn:
      'Clear, perceptive judgment: see through pretense, speak the honest truth, and act from experience.',
    uprightTh:
      'วิจารณญาณที่ชัดเจนและแหลมคม: มองทะลุการเสแสร้ง พูดความจริงตรงๆ และตัดสินใจจากประสบการณ์',
    reversedEn:
      'Cold-heartedness or bitterness: sharp words used to wound, or judgment clouded by past hurt.',
    reversedTh:
      'ความเย็นชาหรือขมขื่น: คำพูดแหลมคมใช้เพื่อทำร้าย หรือการตัดสินใจที่ถูกอดีตทำร้ายบดบัง',
    symbolismEn:
      'A queen sits on a stone throne holding a sword upright, one hand raised in command',
    symbolismTh:
      'ราชินีนั่งบนบัลลังก์หินถือดาบตั้งตรง อีกมือหนึ่งยกขึ้นราวกับกำลังสั่งการ',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'swords-king',
    image: '/cards/swords-king.webp',
    suit: 'swords',
    element: 'air',
    timingUnit: 'weeks',
    number: null,
    court: 'king',
    nameEn: 'King of Swords',
    nameTh: 'ราชาดาบ',
    keywordsEn: ['intellectual authority', 'truth', 'discipline', 'logic'],
    keywordsTh: ['อำนาจทางปัญญา', 'ความจริง', 'วินัย', 'ตรรกะ'],
    uprightEn:
      'Intellectual authority: lead with truth, logic, and discipline — decide with the head, not the heart.',
    uprightTh:
      'อำนาจทางปัญญา: นำด้วยความจริง ตรรกะ และวินัย — ตัดสินใจด้วยเหตุผล ไม่ใช่อารมณ์',
    reversedEn:
      'Manipulation or misuse of power: intellect used to control or cut, rather than to serve the truth.',
    reversedTh:
      'การบงการหรือใช้อำนาจในทางผิด: ใช้ปัญญาเพื่อควบคุมหรือทำร้าย แทนที่จะรับใช้ความจริง',
    symbolismEn:
      'A king sits on a stone throne holding a sword upright, with butterflies and a crescent moon motif',
    symbolismTh:
      'ราชานั่งบนบัลลังก์หินถือดาบตั้งตรง ประดับลวดลายผีเสื้อและพระจันทร์เสี้ยว',
    isNegative: false,
    uncertainNote: null,
  },
  // ----------------------- PENTACLES (Earth / เหรียญ) -----------------------
  {
    id: 'pentacles-ace',
    image: '/cards/pentacles-ace.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 1,
    court: null,
    nameEn: 'Ace of Pentacles',
    nameTh: 'หนึ่งเหรียญ',
    keywordsEn: ['new opportunity', 'prosperity', 'new venture', 'manifestation'],
    keywordsTh: ['โอกาสใหม่', 'ความมั่งคั่ง', 'ธุรกิจใหม่', 'การก่อร่าง'],
    uprightEn:
      'A new financial or material opportunity: prosperity is offered — plant the seed with a solid plan.',
    uprightTh:
      'โอกาสทางการเงินหรือวัตถุใหม่: ความมั่งคั่งยื่นมือมาให้ — ลงมือเพาะเมล็ดด้วยแผนที่มั่นคง',
    reversedEn:
      'A missed opportunity, bad investment, or poor planning — check the details before you commit money.',
    reversedTh:
      'พลาดโอกาส การลงทุนที่ผิดพลาด หรือวางแผนไม่ดี — ตรวจรายละเอียดให้แน่ก่อนลงเงิน',
    symbolismEn:
      'A hand emerges from a cloud holding a golden pentacle over a lush garden path',
    symbolismTh:
      'มือโผล่ออกจากเมฆถือเหรียญทองคำเหนือทางเดินในสวนอันอุดมสมบูรณ์',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-02',
    image: '/cards/pentacles-02.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 2,
    court: null,
    nameEn: 'Two of Pentacles',
    nameTh: 'สองเหรียญ',
    keywordsEn: ['balance', 'juggling priorities', 'adaptability', 'flexibility'],
    keywordsTh: ['ความสมดุล', 'บริหารหลายสิ่ง', 'ความปรับตัว', 'ความยืดหยุ่น'],
    uprightEn:
      'You are juggling many priorities — balance and adaptability will keep everything in motion.',
    uprightTh:
      'คุณกำลังบริหารสิ่งสำคัญหลายอย่างพร้อมกัน — ความสมดุลและความปรับตัวจะทำให้ทุกอย่างเดินต่อได้',
    reversedEn:
      'Imbalance and overwhelm: too many balls in the air, disorganized, and something is about to drop.',
    reversedTh:
      'เสียสมดุลและล้นมือ: ถือบอลมากเกินไป ไร้ระเบียบ และมีบางอย่างกำลังจะหล่น',
    symbolismEn:
      'A figure dances while juggling two pentacles joined by a looping infinity ribbon, ships on rolling waves behind',
    symbolismTh:
      'คนเต้นรำขณะโยนเหรียญสองเหรียญที่เชื่อมด้วยริบบิ้นอินฟินิตี้ เบื้องหลังมีเรือบนคลื่น',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-03',
    image: '/cards/pentacles-03.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 3,
    court: null,
    nameEn: 'Three of Pentacles',
    nameTh: 'สามเหรียญ',
    keywordsEn: ['teamwork', 'collaboration', 'skill', 'craftsmanship'],
    keywordsTh: ['การทำงานเป็นทีม', 'ความร่วมมือ', 'ทักษะฝีมือ', 'งานช่าง'],
    uprightEn:
      'Teamwork and craftsmanship: skilled collaboration is recognized and produces quality results.',
    uprightTh:
      'การทำงานเป็นทีมและฝีมือช่าง: ความร่วมมือของผู้มีทักษะได้รับการยอมรับและสร้างผลงานคุณภาพ',
    reversedEn:
      'Lack of teamwork and poor quality — disharmony, miscommunication, or work that does not meet the standard.',
    reversedTh:
      'ขาดความร่วมมือและงานคุณภาพตก — ความไม่ลงรอย สื่อสารผิดพลาด หรืองานไม่ผ่านมาตรฐาน',
    symbolismEn:
      'Three figures consult over a cathedral arch bearing three carved pentacles',
    symbolismTh:
      'คนสามคนปรึกษากันข้างซุ้มโบสถ์ที่มีเหรียญสามเหรียญสลักอยู่',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-04',
    image: '/cards/pentacles-04.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 4,
    court: null,
    nameEn: 'Four of Pentacles',
    nameTh: 'สี่เหรียญ',
    keywordsEn: ['security', 'saving', 'holding on', 'control'],
    keywordsTh: ['ความมั่นคง', 'การออม', 'การยึดติด', 'การควบคุม'],
    uprightEn:
      'Security through saving and control — but watch that holding on too tightly does not become fear.',
    uprightTh:
      'ความมั่นคงจากการออมและการควบคุม — แต่ระวังอย่าให้การยึดเกาะแน่นเกินไปกลายเป็นความกลัว',
    reversedEn:
      'Letting go: releasing control and sharing generously brings freedom — loosen your grip on possessions.',
    reversedTh:
      'การปล่อยวาง: การคลายการควบคุมและแบ่งปันอย่างเอื้อเฟื้อ นำมาซึ่งอิสระ — คลายกำมือจากสิ่งที่ยึดไว้',
    symbolismEn:
      'A seated figure clutches one pentacle to the chest, one on the head, and two under the feet',
    symbolismTh:
      'คนนั่งกอดเหรียญหนึ่งเหรียญไว้ที่อก อีกเหรียญบนหัว และสองเหรียญใต้เท้า',
    isNegative: false,
    uncertainNote:
      'Sources split on the reversed meaning; majority reading used (Purple Garden, tarot-cards.org: letting go, generosity, releasing control). Labyrinthos reads it as greediness, stinginess, possessiveness.',
  },
  {
    id: 'pentacles-05',
    image: '/cards/pentacles-05.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 5,
    court: null,
    nameEn: 'Five of Pentacles',
    nameTh: 'ห้าเหรียญ',
    keywordsEn: ['hardship', 'poverty', 'insecurity', 'isolation'],
    keywordsTh: ['ความยากลำบาก', 'ความขาดแคลน', 'ความไม่มั่นคง', 'ความโดดเดี่ยว'],
    uprightEn:
      'Hardship and insecurity — financial strain or feeling left out in the cold; help exists even if unseen.',
    uprightTh:
      'ความยากลำบากและความไม่มั่นคง — ปัญหาการเงินหรือรู้สึกถูกทิ้งในความหนาว ยังมีความช่วยเหลือซ่อนอยู่แม้คุณมองไม่เห็น',
    reversedEn:
      'Recovery and improvement: the worst of the hardship is passing, and help is finally arriving.',
    reversedTh:
      'การฟื้นตัวและการดีขึ้น: ช่วงยากลำบากที่สุดกำลังผ่านพ้น ความช่วยเหลือกำลังมาถึงแล้ว',
    symbolismEn:
      'Two ragged figures trudge through snow past a church window glowing with five pentacles',
    symbolismTh:
      'คนซอมซ่อสองคนเดินฝ่าหิมะผ่านหน้าต่างโบสถ์ที่เรืองแสงพร้อมเหรียญห้าเหรียญ',
    isNegative: true,
    uncertainNote: null,
  },
  {
    id: 'pentacles-06',
    image: '/cards/pentacles-06.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 6,
    court: null,
    nameEn: 'Six of Pentacles',
    nameTh: 'หกเหรียญ',
    keywordsEn: ['generosity', 'giving and receiving', 'charity', 'fairness'],
    keywordsTh: ['ความเอื้อเฟื้อ', 'การให้และรับ', 'การกุศล', 'ความยุติธรรม'],
    uprightEn:
      'Generosity and balance: giving and receiving flow fairly — you may be the giver or the one receiving help.',
    uprightTh:
      'ความเอื้อเฟื้อและความสมดุล: การให้และรับไหลเวียนอย่างยุติธรรม — คุณอาจเป็นผู้ให้หรือผู้รับความช่วยเหลือ',
    reversedEn:
      'Strings attached: generosity with conditions, debt, or an unequal power dynamic in what is given.',
    reversedTh:
      'การให้ที่มีเงื่อนไข: ความเอื้อเฟื้อแฝงข้อแลกเปลี่ยน หนี้สิน หรืออำนาจที่ไม่เท่าเทียมในการให้',
    symbolismEn:
      'A wealthy figure distributes coins to two beggars, holding balanced scales',
    symbolismTh:
      'คนมั่งมีแจกเหรียญแก่ขอทานสองคน พร้อมถือตราชูที่สมดุล',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-07',
    image: '/cards/pentacles-07.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 7,
    court: null,
    nameEn: 'Seven of Pentacles',
    nameTh: 'เจ็ดเหรียญ',
    keywordsEn: ['patience', 'long-term investment', 'assessment', 'hard work'],
    keywordsTh: ['ความอดทน', 'การลงทุนระยะยาว', 'การประเมินผล', 'งานหนัก'],
    uprightEn:
      'Patience and long-term thinking: step back, assess the harvest so far, and let your investment grow.',
    uprightTh:
      'ความอดทนและการมองระยะยาว: ถอยออกมาประเมินผลผลิตที่ผ่านมา แล้วปล่อยให้การลงทุนเติบโตต่อไป',
    reversedEn:
      'Impatience and poor returns: effort feels wasted — review whether the investment is still worth it.',
    reversedTh:
      'ใจร้อนและผลตอบแทนน้อย: รู้สึกเหมือนทุ่มแรงเปล่า — ทบทวนว่าการลงทุนนี้ยังคุ้มอยู่หรือไม่',
    symbolismEn:
      'A worker leans on a hoe, gazing at a bush bearing seven pentacles',
    symbolismTh:
      'คนงานพิงจอบ มองต้นพุ่มที่มีเหรียญเจ็ดเหรียญงอกอยู่',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-08',
    image: '/cards/pentacles-08.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 8,
    court: null,
    nameEn: 'Eight of Pentacles',
    nameTh: 'แปดเหรียญ',
    keywordsEn: ['diligence', 'mastery', 'apprenticeship', 'skill-building'],
    keywordsTh: ['ความขยัน', 'ความชำนาญ', 'การฝึกหัด', 'การสร้างทักษะ'],
    uprightEn:
      'Diligence and mastery: focused, dedicated work builds real skill — the apprentice is becoming the master.',
    uprightTh:
      'ความขยันและความชำนาญ: การทุ่มเทโฟกัสสร้างทักษะที่แท้จริง — จากผู้ฝึกหัดกำลังก้าวสู่ช่างฝีมือ',
    reversedEn:
      'Lack of focus or perfectionism: uninspired work, cutting corners, or over-polishing what is already done.',
    reversedTh:
      'ขาดสมาธิหรือเจ้าระเบียบเกินไป: งานไร้แรงบันดาลใจ ลัดขั้นตอน หรือขัดเกลาเกินจำเป็น',
    symbolismEn:
      'A craftsman carves pentacles at a workbench, with seven finished coins displayed above',
    symbolismTh:
      'ช่างแกะสลักเหรียญที่โต๊ะทำงาน มีเหรียญเสร็จแล้วเจ็ดเหรียญจัดแสดงอยู่ด้านบน',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-09',
    image: '/cards/pentacles-09.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 9,
    court: null,
    nameEn: 'Nine of Pentacles',
    nameTh: 'เก้าเหรียญ',
    keywordsEn: ['abundance', 'self-sufficiency', 'luxury', 'rewards of labor'],
    keywordsTh: ['ความมั่งคั่ง', 'ความพึ่งพาตนเอง', 'ความหรูหรา', 'รางวัลของความพยายาม'],
    uprightEn:
      'Abundance and self-sufficiency: disciplined effort has paid off — enjoy the refined fruits of your labor.',
    uprightTh:
      'ความมั่งคั่งและความพึ่งพาตนเอง: ความพยายามอย่างมีวินัยออกดอกออกผล — ดื่มด่ำกับผลของแรงงานอย่างภาคภูมิ',
    reversedEn:
      'Financial setback, reckless spending, or overwork — success is being undermined by imbalance.',
    reversedTh:
      'ปัญหาการเงิน ใช้จ่ายฟุ่มเฟือย หรือทำงานหนักเกินไป — ความสำเร็จกำลังถูกความไม่สมดุลกัดกร่อน',
    symbolismEn:
      'A well-dressed woman stands in a vineyard with a hooded falcon, nine pentacles among the vines',
    symbolismTh:
      'หญิงแต่งกายดีเยี่ยมยืนในไร่องุ่นพร้อมเหยี่ยวคลุมตา มีเหรียญเก้าเหรียญอยู่ท่ามกลางเถาวัลย์',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-10',
    image: '/cards/pentacles-10.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: 10,
    court: null,
    nameEn: 'Ten of Pentacles',
    nameTh: 'สิบเหรียญ',
    keywordsEn: ['legacy', 'wealth', 'family security', 'lasting abundance'],
    keywordsTh: ['มรดก', 'ความมั่งคั่ง', 'ความมั่นคงของครอบครัว', 'ความอุดมสมบูรณ์ยั่งยืน'],
    uprightEn:
      'Legacy and lasting abundance: family security and wealth built to be shared across generations.',
    uprightTh:
      'มรดกและความอุดมสมบูรณ์ยั่งยืน: ความมั่นคงของครอบครัวและความมั่งคั่งที่สร้างไว้เพื่อแบ่งปันข้ามรุ่น',
    reversedEn:
      'Family tension or financial instability: legacy is threatened by conflict over money or short-term thinking.',
    reversedTh:
      'ความขัดแย้งในครอบครัวหรือการเงินไม่มั่นคง: มรดกถูกคุกคามด้วยความขัดแย้งเรื่องเงินหรือการมองสั้น',
    symbolismEn:
      'An elder watches children playing under an arch bearing ten pentacles, two dogs at his feet',
    symbolismTh:
      'ชายชราเฝ้าดูเด็กๆ เล่นใต้ซุ้มประตูที่มีเหรียญสิบเหรียญ มีสุนัขสองตัวที่เท้า',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-page',
    image: '/cards/pentacles-page.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: null,
    court: 'page',
    nameEn: 'Page of Pentacles',
    nameTh: 'เด็กถือเหรียญ',
    keywordsEn: ['ambition', 'study', 'new venture', 'diligence'],
    keywordsTh: ['ความทะเยอทะยาน', 'การศึกษาเล่าเรียน', 'ธุรกิจใหม่', 'ความขยัน'],
    uprightEn:
      'Eager ambition: a new venture or course of study is worth pursuing — start small and stay diligent.',
    uprightTh:
      'ความทะเยอทะยานที่กระตือรือร้น: ธุรกิจใหม่หรือการศึกษาเล่าเรียนคุ้มค่าที่จะลงมือ — เริ่มจากเล็กและขยันต่อไป',
    reversedEn:
      'Procrastination and lack of progress: opportunities are missed by delaying the first step.',
    reversedTh:
      'การผัดวันประกันพรุ่งและไม่ก้าวหน้า: โอกาสหลุดมือเพราะเลื่อนก้าวแรกออกไปเรื่อยๆ',
    symbolismEn:
      'A young figure stands in a green field, studying a golden pentacle held aloft',
    symbolismTh:
      'เยาวชนยืนในทุ่งเขียวขจี ศึกษาเหรียญทองคำที่ถือชูขึ้น',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-knight',
    image: '/cards/pentacles-knight.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: null,
    court: 'knight',
    nameEn: 'Knight of Pentacles',
    nameTh: 'อัศวินเหรียญ',
    keywordsEn: ['reliability', 'hard work', 'routine', 'responsibility'],
    keywordsTh: ['ความน่าเชื่อถือ', 'ความขยัน', 'กิจวัตร', 'ความรับผิดชอบ'],
    uprightEn:
      'Steady reliability: consistent, methodical effort and responsibility will deliver results over time.',
    uprightTh:
      'ความน่าเชื่อถือที่มั่นคง: ความพยายามอย่างสม่ำเสมอและเป็นระบบ รวมทั้งความรับผิดชอบ จะให้ผลลัพธ์ตามเวลา',
    reversedEn:
      'Stagnation, laziness, or rigid perfectionism — routine has become a rut instead of a foundation.',
    reversedTh:
      'ความซบเซา ความเกียจคร้าน หรือเจ้าระเบียบจนแข็งทื่อ — กิจวัตรกลายเป็นหลุมจม แทนที่จะเป็นรากฐาน',
    symbolismEn:
      'An armored knight on a heavy black horse, holding a pentacle, gazing at tilled farmland',
    symbolismTh:
      'อัศวินเกราะขี่ม้าดำตัวใหญ่ ถือเหรียญ มองออกไปยังทุ่งนาที่ไถแล้ว',
    isNegative: false,
    uncertainNote: null,
  },
  {
    id: 'pentacles-queen',
    image: '/cards/pentacles-queen.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: null,
    court: 'queen',
    nameEn: 'Queen of Pentacles',
    nameTh: 'ราชินีเหรียญ',
    keywordsEn: ['nurturing practicality', 'financial security', 'abundance', 'resourcefulness'],
    keywordsTh: ['การดูแลอย่างเป็นรูปธรรม', 'ความมั่นคงทางการเงิน', 'ความอุดมสมบูรณ์', 'ความเฉลียวฉลาด'],
    uprightEn:
      'Nurturing practicality: grounded care for home, body, and finances — abundance managed with wisdom.',
    uprightTh:
      'การดูแลอย่างเป็นรูปธรรม: ดูแลบ้าน ร่างกาย และการเงินอย่างติดดิน — บริหารความอุดมสมบูรณ์ด้วยปัญญา',
    reversedEn:
      'Overcommitted and out of balance: you are neglecting your own needs while caring for everyone else.',
    reversedTh:
      'รับภาระมากเกินไปจนเสียสมดุล: คุณละเลยความต้องการของตัวเอง ขณะดูแลทุกคนอื่น',
    symbolismEn:
      'A queen cradles a large pentacle in her lap, surrounded by flowers, rabbits, and a lush garden',
    symbolismTh:
      'ราชินีอุ้มเหรียญใหญ่ไว้บนตัก ท่ามกลางดอกไม้ กระต่าย และสวนอันอุดมสมบูรณ์',
    isNegative: false,
    uncertainNote:
      'Sources differ mildly on the reversed meaning; majority reading used (Purple Garden: overcommitted, self-neglect, imbalance; tarot-cards.org: care become absorption). Labyrinthos leans toward self-centeredness, jealousy, smothering.',
  },
  {
    id: 'pentacles-king',
    image: '/cards/pentacles-king.webp',
    suit: 'pentacles',
    element: 'earth',
    timingUnit: 'years',
    number: null,
    court: 'king',
    nameEn: 'King of Pentacles',
    nameTh: 'ราชาเหรียญ',
    keywordsEn: ['material success', 'abundance', 'security', 'business acumen'],
    keywordsTh: ['ความสำเร็จทางวัตถุ', 'ความอุดมสมบูรณ์', 'ความมั่นคง', 'หัวการค้า'],
    uprightEn:
      'Material success and security: mastery of the practical world — prosperity built to last, shared generously.',
    uprightTh:
      'ความสำเร็จทางวัตถุและความมั่นคง: เชี่ยวชาญโลกแห่งความเป็นจริง — ความมั่งคั่งที่สร้างให้ยั่งยืนและแบ่งปันอย่างเอื้อเฟื้อ',
    reversedEn:
      'Greed or poor financial control: materialism, corruption, or money handled carelessly.',
    reversedTh:
      'ความโลภหรือการเงินไร้การควบคุม: วัตถุนิยม การทุจริต หรือการจับจ่ายอย่างประมาท',
    symbolismEn:
      'A king enthroned amid carved bulls, vines and castles, resting his hand on a large pentacle',
    symbolismTh:
      'ราชานั่งบัลลังก์ท่ามกลางกระทิงแกะสลัก เถาวัลย์ และปราสาท มือแตะเหรียญใหญ่',
    isNegative: false,
    uncertainNote: null,
  },
];
