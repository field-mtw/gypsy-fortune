'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import {
  ClarifierSection,
  JournalMemoryBanner,
  ShadowCardSection,
  SoulLensSection,
  SpreadChemistrySection,
} from '@/components/PrecisionInsights';
import { getCardById } from '@/data/cards';
import { getPulseDef } from '@/data/emotional-pulse';
import { getSpread } from '@/data/spreads';
import { generateReading, type DrawnCard, type Reading } from '@/lib/reading-engine';
import { loadReadings, type ReadingRecord } from '@/lib/storage';

function JournalDetailInner() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const params = useParams();
  const router = useRouter();
  const [record, setRecord] = useState<ReadingRecord | null>(null);
  const [priorReadings, setPriorReadings] = useState<ReadingRecord[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);

  useEffect(() => {
    const id = params.id as string;
    const all = loadReadings();
    const r = all.find((x) => x.id === id);
    if (!r) {
      setNotFound(true);
    } else {
      setRecord(r);
      setPriorReadings(all.filter((x) => x.id !== r.id && x.createdAt < r.createdAt));
    }
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
    return generateReading(
      drawn,
      spread,
      record.profile,
      lang,
      record.seed,
      record.shadowCard ?? null,
      {
        pulse: record.pulse ?? null,
        clarifier: record.clarifier ?? null,
        priorReadings,
        referenceIsoDate: record.createdAt,
      },
    );
  }, [record, priorReadings, lang]);

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

  const hasMultiTopics = reading.topicViews.length > 1;
  const activeView = reading.topicViews[activeTopicIdx] ?? reading.topicViews[0];
  const activeSections = activeView ? activeView.sections : reading.sections;
  const activeSoulLens = activeView ? activeView.soulLens : reading.soulLens;
  const activeShadow = activeView ? activeView.shadow : reading.shadow;
  const activeClarifier = activeView ? activeView.clarifier : reading.clarifier;
  const pulseDef = getPulseDef(record.pulse);
  const hasFocusBadges =
    (reading.topicViews.length > 0 && reading.topicViews[0].topic !== 'general') || Boolean(pulseDef);

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
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {hasFocusBadges ? (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {reading.topicViews
              .filter((tv) => tv.topic !== 'general')
              .map((tv) => (
                <span
                  key={tv.topic}
                  className="inline-flex items-center gap-1.5 rounded-full border border-aura-violet/30 bg-aura-violet/10 px-3 py-1 text-xs text-moon"
                >
                  <AuraIcon name={tv.icon} className="h-3.5 w-3.5 text-aura-teal" />
                  <span>
                    {tv.topicLabel}
                    {tv.subTagLabel ? ` · ${tv.subTagLabel}` : ''}
                  </span>
                </span>
              ))}
            {pulseDef && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-aura-rose/35 bg-aura-rose/12 px-3 py-1 text-xs text-aura-rose">
                <AuraIcon name={pulseDef.icon} className="h-3.5 w-3.5" />
                <span>{lang === 'th' ? pulseDef.labelTh : pulseDef.labelEn}</span>
              </span>
            )}
          </div>
        ) : (
          record.profile.question && (
            <p className="mt-1.5 text-sm text-aura-teal">“{record.profile.question}”</p>
          )
        )}

        <h1 className="font-display text-glow mt-3 text-xl leading-relaxed font-semibold text-moon sm:text-2xl">
          {reading.headline}
        </h1>
      </motion.div>

      {reading.journalMemory && (
        <div className="mt-6">
          <JournalMemoryBanner memory={reading.journalMemory} />
        </div>
      )}

      {reading.overview && (
        <section className="mt-6 rounded-3xl border border-white/8 bg-abyss/60 p-6">
          <h2 className="font-display mb-3 text-lg font-semibold text-aura-violet">{t('reveal.overviewLabel')}</h2>
          <p className="text-sm leading-loose text-moondim">{reading.overview}</p>
        </section>
      )}

      <div className="mt-6 space-y-6">
        <SpreadChemistrySection chemistry={reading.chemistry} shadowRevealed={true} />
        {activeSoulLens && <SoulLensSection soulLens={activeSoulLens} />}
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-lg font-semibold text-aura-violet">{t('reveal.cardByCardLabel')}</h2>

          {hasMultiTopics && (
            <div className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-abyss/80 p-1.5">
              {reading.topicViews.map((tv, idx) => {
                const active = idx === activeTopicIdx;
                return (
                  <button
                    key={tv.topic}
                    type="button"
                    onClick={() => setActiveTopicIdx(idx)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                      active
                        ? 'bg-aura-violet/30 text-moon shadow-[0_0_16px_rgba(167,139,250,0.3)]'
                        : 'text-moondim hover:text-moon'
                    }`}
                  >
                    <AuraIcon name={tv.icon} className="h-3.5 w-3.5 text-aura-teal" />
                    <span>
                      {tv.topicLabel}
                      {tv.subTagLabel ? ` (${tv.subTagLabel})` : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {hasMultiTopics && activeView && (
          <p className="mb-4 rounded-2xl border border-aura-violet/20 bg-aura-violet/8 px-4 py-3 text-xs leading-relaxed text-moondim">
            {activeView.headline}
          </p>
        )}

        <div className="space-y-4">
          {activeSections.map((s) => (
            <article key={`${activeView?.topic ?? 'main'}-${s.cardId}`} className="glass overflow-hidden rounded-3xl">
              <div className="flex gap-4 p-5 sm:p-6">
                <img
                  src={s.image}
                  alt={s.cardName}
                  className="aspect-[2/3] w-16 shrink-0 rounded-lg border border-white/10 object-cover sm:w-20"
                  style={s.reversed ? { transform: 'rotate(180deg)' } : undefined}
                />
                <div className="min-w-0">
                  <p className="text-xs text-aura-teal">{s.positionName}</p>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-moon">{s.cardName}</h3>
                    {s.cardSubtitle && (
                      <span className="text-xs text-aura-violet/90">· {s.cardSubtitle}</span>
                    )}
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-moonfaint">
                      {s.reversed ? t('reveal.reversed') : t('reveal.upright')}
                    </span>
                  </div>
                  <p className="font-display mt-2 text-sm leading-relaxed font-medium text-aura-rose">
                    {s.oneLiner}
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-t border-white/5 px-5 py-4 text-sm leading-loose sm:px-6">
                {s.detailParagraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? 'text-moon/90'
                        : 'border-l-2 border-aura-violet/35 pl-3.5 text-moondim'
                    }
                  >
                    {para}
                  </p>
                ))}

                {s.courtPersonaNote && (
                  <div className="rounded-2xl border border-aura-gold/25 bg-aura-gold/8 px-4 py-3 text-xs leading-relaxed text-moondim sm:text-sm">
                    <span className="font-display mr-2 inline-flex items-center gap-1 rounded-full border border-aura-gold/35 bg-aura-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-aura-gold">
                      <AuraIcon name="users" className="h-3 w-3" />
                      {t('reveal.courtPersonaBadge')}
                    </span>
                    <span>{s.courtPersonaNote}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeShadow && (
        <div className="mt-6">
          <ShadowCardSection shadow={activeShadow} revealed={true} onReveal={() => {}} />
        </div>
      )}

      {activeClarifier && (
        <div className="mt-6">
          <ClarifierSection
            topic={activeView?.topic ?? 'general'}
            subTag={activeView?.subTag}
            clarifier={activeClarifier}
          />
        </div>
      )}

      <section className="mt-6 rounded-3xl border border-aura-teal/20 bg-aura-teal/5 p-6">
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

      {(reading.timing || reading.personalNote) && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
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
                {lang === 'th' ? 'เกร็ดเสริมกำลังใจเฉพาะคุณ' : 'Just for you'}
              </h2>
              <p className="text-sm leading-relaxed text-moondim">{reading.personalNote}</p>
            </div>
          )}
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
