// Thai traditional day associations: lucky color + day Buddha.
// Standard cultural knowledge used for the personalization layer (70/30 rule).

export interface DayInfo {
  dayIndex: number; // 0 = Sunday
  dayNameTh: string;
  dayNameEn: string;
  luckyColorTh: string;
  luckyColorEn: string;
  buddhaTh: string;
  buddhaEn: string;
}

const DAYS: DayInfo[] = [
  { dayIndex: 0, dayNameTh: 'วันอาทิตย์', dayNameEn: 'Sunday', luckyColorTh: 'สีแดง', luckyColorEn: 'red', buddhaTh: 'พระปางถวายเนตร', buddhaEn: 'the Standing Buddha (contemplation)' },
  { dayIndex: 1, dayNameTh: 'วันจันทร์', dayNameEn: 'Monday', luckyColorTh: 'สีเหลืองนวล', luckyColorEn: 'soft yellow', buddhaTh: 'พระปางห้ามญาติ', buddhaEn: 'the Buddha forbidding relatives' },
  { dayIndex: 2, dayNameTh: 'วันอังคาร', dayNameEn: 'Tuesday', luckyColorTh: 'สีชมพู', luckyColorEn: 'pink', buddhaTh: 'พระปางไสยาสน์', buddhaEn: 'the Reclining Buddha' },
  { dayIndex: 3, dayNameTh: 'วันพุธ', dayNameEn: 'Wednesday', luckyColorTh: 'สีเขียว', luckyColorEn: 'green', buddhaTh: 'พระปางอุ้มบาตร', buddhaEn: 'the Buddha carrying the alms bowl' },
  { dayIndex: 4, dayNameTh: 'วันพฤหัสบดี', dayNameEn: 'Thursday', luckyColorTh: 'สีส้ม', luckyColorEn: 'orange', buddhaTh: 'พระปางสมาธิ', buddhaEn: 'the Meditating Buddha' },
  { dayIndex: 5, dayNameTh: 'วันศุกร์', dayNameEn: 'Friday', luckyColorTh: 'สีฟ้า', luckyColorEn: 'blue', buddhaTh: 'พระปางรำพึง', buddhaEn: 'the Contemplating Buddha' },
  { dayIndex: 6, dayNameTh: 'วันเสาร์', dayNameEn: 'Saturday', luckyColorTh: 'สีม่วง', luckyColorEn: 'purple', buddhaTh: 'พระปางนาคปรก', buddhaEn: 'the Naga-protected Buddha' },
];

/** Returns day info for a YYYY-MM-DD birthdate, or null if invalid. */
export function getDayInfo(birthdate: string): DayInfo | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) return null;
  const d = new Date(birthdate + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return null;
  return DAYS[d.getDay()];
}
