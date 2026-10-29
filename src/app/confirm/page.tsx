'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { CARD_BACK_IMAGE } from '@/data/cards';
import { getSpread } from '@/data/spreads';
import { loadSession } from '@/lib/session';

export default function ConfirmPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const [ready, setReady] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);
  const [positionNames, setPositionNames] = useState<string[]>([]);
  const [backHref, setBackHref] = useState('/pick');

  useEffect(() => {
    const s = loadSession();
    if (!s || s.picks.length === 0) {
      router.replace('/spread');
      return;
    }
    const spread = getSpread(s.level, s.category as 'past-present-future');
    setPicks(s.picks);
    setBackHref(`/pick?level=${s.level}&category=${s.category}`);
    setPositionNames(
      s.picks.map((_, i) => {
        const p = spread.positions[Math.min(i, spread.positions.length - 1)];
        return lang === 'th' ? p.nameTh : p.nameEn;
      }),
    );
    setReady(true);
  }, [router, lang]);

  if (!ready) return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;

  return (
    <div className="mx-auto max-w-3xl py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon sm:text-3xl">{t('confirm.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-moondim">{t('confirm.subtitle')}</p>
      </motion.div>

      <div className={`mt-10 grid gap-5 ${picks.length > 4 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {picks.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24, rotateY: 90 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="text-center"
          >
            <div className="perspective-1200">
              <img
                src={CARD_BACK_IMAGE}
                alt={t('confirm.position', { n: i + 1 })}
                draggable={false}
                className="aspect-[2/3] w-full rounded-2xl border border-aura-violet/25 object-cover shadow-[0_0_28px_rgba(167,139,250,0.25)] select-none"
              />
            </div>
            <p className="font-display mt-3 text-sm font-medium text-aura-teal">
              {t('confirm.position', { n: i + 1 })}
            </p>
            <p className="mt-1 text-xs text-moondim">{positionNames[i]}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-moondim transition-colors hover:border-aura-violet/40 hover:text-moon"
        >
          <AuraIcon name="arrowLeft" className="h-4 w-4" />
          {t('confirm.back')}
        </Link>
        <motion.div whileTap={{ scale: 0.97 }}>
          <Link
            href="/profile"
            className="font-display inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 px-8 py-3.5 text-lg font-semibold text-white shadow-[0_0_32px_rgba(167,139,250,0.45)] transition-transform hover:scale-[1.03]"
          >
            <AuraIcon name="eye" className="h-5 w-5" />
            {t('confirm.reveal')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
