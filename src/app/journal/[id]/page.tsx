'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { getCardById } from '@/data/cards';
import { getSpread } from '@/data/spreads';
import { generateReading, type DrawnCard, type Reading } from '@/lib/reading-engine';
import { loadReadings, type ReadingRecord } from '@/lib/storage';

function JournalDetailInner() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const params = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<ReadingRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const r = loadReadings().find((x) => x.id === id);
    if (!r) setNotFound(true);
    else setRecord(r);
  }, [params.id]);

  const reading: Reading | null = useMemo(() => {
    if (!record) return null;
    const spread = getSpread(record.level, record.category as 'past-present-future');
    const drawn: DrawnCard[] = record.cards
      .map((c, i) => {
        const card = getCardById(c.id);
        if (!card) return null;
        const pos = spread.positions[Math.min(i, spread.positions.length - 1)];
        return {
          card,
          reversed: c.reversed,
          position: { id: pos.id, nameTh: pos.nameTh, nameEn: pos.nameEn },
        };
      })
      .filter((x): x is DrawnCard => x !== null);
    return generateReading(drawn, spread, record.profile, lang, record.seed);
  }, [record, lang]);

  if (notFound) {
    return (
      <div className="py-24 text-center">
        <p className="text-moondim">{t('journal.empty')}</p>
        <Link href="/journal" className="mt-4 inline-block text-aura-teal hover:underline">
          {t('nav.journal')}
        </Link>
      </div>
    );
  }
  if (!record || !reading) {
    return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm text-moondim transition-colors hover:text-moon"
      >
        <AuraIcon name="arrowLeft" className="h-4 w-4" />
        {t('common.back')}
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-moonfaint">
          {new Date(record.createdAt).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
        <h1 className="font-display text-glow mt-2 text-2xl leading-relaxed font-semibold text-moon">
          {reading.headline}
        </h1>
      </motion.div>

      {reading.overview && (
        <section className="mt-6 rounded-3xl border border-white/8 bg-abyss/60 p-6">
          <h2 className="font-display mb-3 text-lg font-semibold text-aura-violet">{t('reveal.overviewLabel')}</h2>
          <p className="text-sm leading-loose text-moondim">{reading.overview}</p>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display mb-4 text-lg font-semibold text-aura-violet">{t('reveal.cardByCardLabel')}</h2>
        <div className="space-y-4">
          {reading.sections.map((s) => (
            <article key={s.cardId} className="glass overflow-hidden rounded-3xl">
              <div className="flex gap-4 p-5">
                <img
                  src={s.image}
                  alt={s.cardName}
                  className="aspect-[2/3] w-16 shrink-0 rounded-lg border border-white/10 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs text-aura-teal">{s.positionName}</p>
                  <h3 className="font-display mt-0.5 text-base font-semibold text-moon">{s.cardName}</h3>
                  <p className="font-display mt-2 text-sm font-medium text-aura-rose">{s.oneLiner}</p>
                </div>
              </div>
              <p className="border-t border-white/5 px-5 py-4 text-sm leading-loose text-moondim">{s.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-aura-teal/20 bg-aura-teal/5 p-6">
        <h2 className="font-display mb-3 text-lg font-semibold text-aura-teal">{t('reveal.adviceLabel')}</h2>
        <ul className="space-y-2.5">
          {reading.advice.map((a, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-moondim">
              <span className="mt-0.5 shrink-0 text-aura-teal"><AuraIcon name="check" className="h-4 w-4" /></span>
              {a}
            </li>
          ))}
        </ul>
      </section>

      {reading.timing && (
        <section className="mt-6 rounded-3xl border border-white/8 bg-abyss/60 p-6">
          <h2 className="font-display mb-2 text-base font-semibold text-aura-gold">{t('reveal.timingLabel')}</h2>
          <p className="text-sm leading-relaxed text-moondim">{reading.timing}</p>
        </section>
      )}

      <p className="mt-8 text-center text-sm leading-loose text-moondim italic">{reading.closing}</p>
    </div>
  );
}

export default function JournalDetailPage() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<p className="py-24 text-center text-moondim">{t('common.loading')}</p>}>
      <JournalDetailInner />
    </Suspense>
  );
}
