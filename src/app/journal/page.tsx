'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import {
  loadReadings,
  markAccuracy,
  deleteReading,
  type ReadingRecord,
  type AccuracyMark,
} from '@/lib/storage';

function formatDate(iso: string, lang: string): string {
  try {
    return new Date(iso).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

const ACCURACY_STYLE: Record<Exclude<AccuracyMark, null>, string> = {
  yes: 'bg-aura-teal/20 text-aura-teal border-aura-teal/40',
  partial: 'bg-aura-gold/15 text-aura-gold border-aura-gold/40',
  no: 'bg-white/5 text-moonfaint border-white/15',
};

export default function JournalPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const [readings, setReadings] = useState<ReadingRecord[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setReadings(loadReadings());
  }, []);

  const setMark = (id: string, mark: Exclude<AccuracyMark, null>) => {
    markAccuracy(id, mark);
    setReadings(loadReadings());
  };

  const remove = (id: string) => {
    deleteReading(id);
    setReadings(loadReadings());
    setConfirmDelete(null);
  };

  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon sm:text-3xl">{t('journal.title')}</h1>
        <p className="mt-2 text-sm text-moondim">{t('journal.subtitle')}</p>
      </div>

      {readings.length === 0 ? (
        <div className="glass mx-auto mt-10 max-w-md rounded-3xl p-10 text-center">
          <div className="mb-4 inline-flex text-aura-violet">
            <AuraIcon name="book" className="h-10 w-10" />
          </div>
          <p className="text-moondim">{t('journal.empty')}</p>
          <Link
            href="/spread"
            className="font-display mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 px-7 py-3 font-semibold text-white"
          >
            <AuraIcon name="spark" className="h-5 w-5" />
            {t('journal.emptyCta')}
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {readings.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-moonfaint">{formatDate(r.createdAt, lang)}</p>
                  <p className="font-display mt-1.5 leading-relaxed font-medium text-moon">
                    {lang === 'th' ? r.summaryTh : r.summaryEn}
                  </p>
                  <p className="mt-1 text-xs text-moonfaint">
                    {r.level === 1 ? t('spread.level1') : r.level === 3 ? t('spread.level3') : t('spread.level10')}
                    {r.profile.name ? ` · ${r.profile.name}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => setConfirmDelete(confirmDelete === r.id ? null : r.id)}
                  className="shrink-0 rounded-full p-2 text-moonfaint transition-colors hover:bg-white/5 hover:text-moondim"
                  aria-label={t('journal.delete')}
                >
                  <AuraIcon name="x" className="h-4 w-4" />
                </button>
              </div>

              {confirmDelete === r.id && (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-red-400/20 bg-red-500/5 p-3">
                  <span className="flex-1 text-xs text-moondim">{t('journal.deleteConfirm')}</span>
                  <button onClick={() => remove(r.id)} className="rounded-full bg-red-500/20 px-4 py-1.5 text-xs text-red-300">
                    {t('journal.delete')}
                  </button>
                  <button onClick={() => setConfirmDelete(null)} className="rounded-full px-3 py-1.5 text-xs text-moonfaint">
                    {t('common.close')}
                  </button>
                </div>
              )}

              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="mb-2.5 text-xs tracking-wide text-moonfaint uppercase">{t('journal.cameTrue')}</p>
                <div className="flex flex-wrap gap-2">
                  {(['yes', 'partial', 'no'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMark(r.id, m)}
                      aria-pressed={r.accuracy === m}
                      className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
                        r.accuracy === m ? ACCURACY_STYLE[m] : 'border-white/10 text-moonfaint hover:border-white/25 hover:text-moondim'
                      }`}
                    >
                      {t(`journal.${m === 'yes' ? 'yes' : m === 'partial' ? 'partial' : 'notYet'}`)}
                    </button>
                  ))}
                  <Link
                    href={`/journal/${r.id}`}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-aura-teal hover:underline"
                  >
                    {t('journal.viewDetail')}
                    <AuraIcon name="arrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
