'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { getCardById, CARD_BACK_IMAGE } from '@/data/cards';
import { getSpread } from '@/data/spreads';
import { generateReading, type DrawnCard, type Reading } from '@/lib/reading-engine';
import { loadSession, clearSession } from '@/lib/session';
import { loadProfile, saveReading, type ReadingRecord } from '@/lib/storage';

function FlipCard({
  image,
  name,
  reversed,
  index,
  flipped,
  onFlip,
}: {
  image: string;
  name: string;
  reversed: boolean;
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <button onClick={onFlip} className="perspective-1200 block w-full" aria-label={name}>
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1.2] }}
        className="preserve-3d relative aspect-[2/3] w-full"
      >
        <img
          src={CARD_BACK_IMAGE}
          alt=""
          draggable={false}
          className="backface-hidden absolute inset-0 h-full w-full rounded-2xl border border-aura-violet/25 object-cover select-none"
        />
        <div
          className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl border border-aura-violet/40"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <img
            src={image}
            alt={name}
            draggable={false}
            className="h-full w-full object-cover select-none"
            style={reversed ? { transform: 'rotate(180deg)' } : undefined}
          />
        </div>
      </motion.div>
      <span className="mt-2 block text-xs text-moonfaint">{String(index + 1).padStart(2, '0')}</span>
    </button>
  );
}

export default function RevealPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const lang = i18n.language === 'en' ? 'en' : 'th';

  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null);
  const [seed, setSeed] = useState(0);
  const [level, setLevel] = useState<1 | 3 | 10>(3);
  const [category, setCategory] = useState('past-present-future');
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    const s = loadSession();
    if (!s || s.picks.length === 0) {
      router.replace('/spread');
      return;
    }
    const spread = getSpread(s.level, s.category as 'past-present-future');
    const cards: DrawnCard[] = s.picks
      .map((id, i) => {
        const card = getCardById(id);
        if (!card) return null;
        const pos = spread.positions[Math.min(i, spread.positions.length - 1)];
        return {
          card,
          reversed: s.reversed[id] ?? false,
          position: { id: pos.id, nameTh: pos.nameTh, nameEn: pos.nameEn },
        };
      })
      .filter((x): x is DrawnCard => x !== null);
    setDrawn(cards);
    setSeed(s.seed);
    setLevel(s.level);
    setCategory(s.category);
    setFlipped(new Array(cards.length).fill(false));
  }, [router]);

  const profile = useMemo(() => loadProfile(), []);
  const reading: Reading | null = useMemo(() => {
    if (!drawn) return null;
    const spread = getSpread(level, category as 'past-present-future');
    return generateReading(drawn, spread, profile, lang, seed);
  }, [drawn, level, category, profile, lang, seed]);

  if (!drawn || !reading) {
    return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;
  }

  const allFlipped = flipped.every(Boolean);
  const flipAll = () => setFlipped(drawn.map(() => true));

  const handleSave = () => {
    if (savedId) return;
    const spread = getSpread(level, category as 'past-present-future');
    const readingTh = generateReading(drawn, spread, profile, 'th', seed);
    const readingEn = generateReading(drawn, spread, profile, 'en', seed);
    const record: ReadingRecord = {
      id: `r-${seed}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      level,
      category,
      cards: drawn.map((d) => ({ id: d.card.id, reversed: d.reversed })),
      profile,
      summaryTh: readingTh.headline,
      summaryEn: readingEn.headline,
      accuracy: null,
      seed,
    };
    saveReading(record);
    setSavedId(record.id);
  };

  const newReading = () => {
    clearSession();
    router.push('/spread');
  };

  const gridCols =
    drawn.length === 1
      ? 'grid-cols-1 max-w-[280px]'
      : drawn.length <= 3
        ? 'grid-cols-3 max-w-xl'
        : 'grid-cols-3 sm:grid-cols-5 max-w-3xl';

  return (
    <div className="py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon sm:text-3xl">{t('reveal.title')}</h1>
        <p className="mt-2 text-sm text-moondim">{reading.hook}</p>
      </motion.div>

      {/* Cards */}
      <div className={`mx-auto mt-10 grid gap-4 sm:gap-5 ${gridCols}`}>
        {drawn.map((d, i) => (
          <motion.div
            key={d.card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <FlipCard
              image={d.card.image}
              name={lang === 'th' ? d.card.nameTh : d.card.nameEn}
              reversed={d.reversed}
              index={i}
              flipped={flipped[i] ?? false}
              onFlip={() => setFlipped((f) => f.map((v, j) => (j === i ? true : v)))}
            />
            <AnimatePresence>
              {flipped[i] && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-center"
                >
                  <p className="font-display text-sm font-semibold text-moon">
                    {lang === 'th' ? d.card.nameTh : d.card.nameEn}
                  </p>
                  <p className="mt-0.5 text-xs text-moonfaint">
                    {d.position.nameTh && lang === 'th' ? d.position.nameTh : d.position.nameEn}
                    {' · '}
                    {d.reversed ? t('reveal.reversed') : t('reveal.upright')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {!allFlipped && (
        <div className="mt-8 text-center">
          <button
            onClick={flipAll}
            className="font-display inline-flex items-center gap-2 rounded-full bg-aura-violet/25 px-7 py-3 font-semibold text-moon transition-all hover:bg-aura-violet/40"
          >
            <AuraIcon name="eye" className="h-5 w-5" />
            {t('confirm.reveal')}
          </button>
        </div>
      )}

      {/* Reading */}
      <AnimatePresence>
        {allFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-12 max-w-3xl space-y-8"
          >
            {/* Headline */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-7 text-center"
            >
              <p className="text-xs tracking-[0.25em] text-aura-teal uppercase">{t('reveal.summaryLabel')}</p>
              <p className="font-display text-glow mt-3 text-xl leading-relaxed font-medium text-moon sm:text-2xl">
                {reading.headline}
              </p>
            </motion.section>

            {/* Overview */}
            {reading.overview && (
              <section className="rounded-3xl border border-white/8 bg-abyss/60 p-6">
                <h2 className="font-display mb-3 text-lg font-semibold text-aura-violet">
                  {t('reveal.overviewLabel')}
                </h2>
                <p className="text-sm leading-loose text-moondim">{reading.overview}</p>
              </section>
            )}

            {/* Card by card */}
            <section>
              <h2 className="font-display mb-4 text-lg font-semibold text-aura-violet">
                {t('reveal.cardByCardLabel')}
              </h2>
              <div className="space-y-4">
                {reading.sections.map((s, i) => (
                  <motion.article
                    key={s.cardId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className="glass overflow-hidden rounded-3xl"
                  >
                    <div className="flex gap-4 p-5 sm:p-6">
                      <img
                        src={s.image}
                        alt={s.cardName}
                        draggable={false}
                        className="aspect-[2/3] w-16 shrink-0 rounded-lg border border-white/10 object-cover select-none sm:w-20"
                        style={drawn[i].reversed ? { transform: 'rotate(180deg)' } : undefined}
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-aura-teal">{s.positionName}</p>
                        <h3 className="font-display mt-0.5 text-base font-semibold text-moon">
                          {s.cardName}
                          <span className="ml-2 text-xs font-normal text-moonfaint">
                            {drawn[i].reversed ? t('reveal.reversed') : t('reveal.upright')}
                          </span>
                        </h3>
                        <p className="font-display mt-2 text-sm font-medium text-aura-rose">{s.oneLiner}</p>
                      </div>
                    </div>
                    <p className="border-t border-white/5 px-5 py-4 text-sm leading-loose text-moondim sm:px-6">
                      {s.detail}
                    </p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Advice */}
            <section className="rounded-3xl border border-aura-teal/20 bg-aura-teal/5 p-6">
              <h2 className="font-display mb-3 text-lg font-semibold text-aura-teal">{t('reveal.adviceLabel')}</h2>
              <ul className="space-y-2.5">
                {reading.advice.map((a, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-moondim">
                    <span className="mt-0.5 shrink-0 text-aura-teal">
                      <AuraIcon name="check" className="h-4 w-4" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            {/* Timing + personal */}
            {(reading.timing || reading.personalNote) && (
              <section className="grid gap-4 sm:grid-cols-2">
                {reading.timing && (
                  <div className="rounded-3xl border border-white/8 bg-abyss/60 p-6">
                    <h2 className="font-display mb-2 flex items-center gap-2 text-base font-semibold text-aura-gold">
                      <AuraIcon name="clock" className="h-4 w-4" />
                      {t('reveal.timingLabel')}
                    </h2>
                    <p className="text-sm leading-relaxed text-moondim">{reading.timing}</p>
                  </div>
                )}
                {reading.personalNote && (
                  <div className="rounded-3xl border border-white/8 bg-abyss/60 p-6">
                    <h2 className="font-display mb-2 flex items-center gap-2 text-base font-semibold text-aura-rose">
                      <AuraIcon name="spark" className="h-4 w-4" />
                      {lang === 'th' ? 'เกร็ดเฉพาะคุณ' : 'Just for you'}
                    </h2>
                    <p className="text-sm leading-relaxed text-moondim">{reading.personalNote}</p>
                  </div>
                )}
              </section>
            )}

            {/* Closing */}
            <p className="text-center text-sm leading-loose text-moondim italic">{reading.closing}</p>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
              <button
                onClick={handleSave}
                disabled={!!savedId}
                className={`font-display inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold transition-all ${
                  savedId
                    ? 'cursor-default bg-aura-teal/20 text-aura-teal'
                    : 'bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 text-white shadow-[0_0_28px_rgba(167,139,250,0.4)] hover:scale-[1.03]'
                }`}
              >
                <AuraIcon name={savedId ? 'check' : 'book'} className="h-5 w-5" />
                {savedId ? t('reveal.saved') : t('reveal.save')}
              </button>
              <button
                onClick={newReading}
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-moondim transition-colors hover:border-aura-violet/40 hover:text-moon"
              >
                {t('reveal.newReading')}
              </button>
              <Link href="/" className="rounded-full px-4 py-3 text-sm text-moonfaint transition-colors hover:text-moondim">
                {t('reveal.backHome')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
