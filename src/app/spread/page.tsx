'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { SPREAD_CATEGORIES, type SpreadCategory, type SpreadLevel } from '@/data/spreads';
import { getCooldownState, formatCountdown } from '@/lib/cooldown';

type Step = 'level' | 'category';

function SpreadPageInner() {
  const { t, i18n } = useTranslation();
  const params = useSearchParams();
  const lang = i18n.language === 'en' ? 'en' : 'th';

  const initialLevel = useMemo(() => {
    const l = params.get('level');
    return l === '1' || l === '3' || l === '10' ? (Number(l) as SpreadLevel) : null;
  }, [params]);

  const [level, setLevel] = useState<SpreadLevel | null>(initialLevel);
  const [category, setCategory] = useState<SpreadCategory | null>(null);
  const [gateDismissed, setGateDismissed] = useState(false);
  const [cooldown, setCooldown] = useState(() => getCooldownState());

  useEffect(() => {
    setCooldown(getCooldownState());
  }, []);

  const step: Step = !level ? 'level' : level === 3 && !category ? 'category' : 'level';
  const showGate = cooldown.suggestWait && !gateDismissed;

  const levels: { value: SpreadLevel; name: string; desc: string; icon: 'spark' | 'cards' | 'moon' }[] = [
    { value: 1, name: t('spread.level1'), desc: t('spread.level1Desc'), icon: 'spark' },
    { value: 3, name: t('spread.level3'), desc: t('spread.level3Desc'), icon: 'cards' },
    { value: 10, name: t('spread.level10'), desc: t('spread.level10Desc'), icon: 'moon' },
  ];

  const ready = level !== null && (level !== 3 || category !== null);
  const pickHref = ready
    ? `/pick?level=${level}${level === 3 ? `&category=${category}` : ''}`
    : '#';

  return (
    <div className="py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-display text-center text-3xl font-semibold text-moon sm:text-4xl">
          {t('spread.title')}
        </h1>
        <p className="mt-3 text-center text-moondim">{t('spread.subtitle')}</p>
      </motion.div>

      {/* Cooldown soft gate */}
      <AnimatePresence>
        {showGate && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-auto mt-8 max-w-xl rounded-3xl p-7 text-center"
          >
            <div className="mb-3 inline-flex text-aura-gold">
              <AuraIcon name="clock" className="h-8 w-8" />
            </div>
            <h2 className="font-display text-xl font-semibold text-moon">{t('cooldown.title')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-moondim">
              {t('cooldown.message', { count: cooldown.readingsThisMonth })}
            </p>
            {cooldown.nextAvailableAt && (
              <p className="mt-2 text-sm text-aura-teal">
                {t('cooldown.nextAvailable', {
                  time: formatCountdown(cooldown.nextAvailableAt, lang),
                })}
              </p>
            )}
            <button
              onClick={() => setGateDismissed(true)}
              className="font-display mt-5 rounded-full border border-aura-violet/40 px-6 py-2.5 text-sm font-medium text-moon transition-all hover:bg-aura-violet/15"
            >
              {t('cooldown.proceed')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level select */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {levels.map((l, i) => (
          <motion.button
            key={l.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => {
              setLevel(l.value);
              if (l.value !== 3) setCategory(null);
            }}
            aria-pressed={level === l.value}
            className={`glass rounded-3xl p-6 text-left transition-all ${
              level === l.value
                ? 'aura-ring border-aura-violet/60'
                : 'hover:border-aura-violet/35'
            }`}
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-aura-violet/15 text-aura-violet">
              <AuraIcon name={l.icon} className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-semibold text-moon">{l.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-moondim">{l.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Category select */}
      <AnimatePresence>
        {level === 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <h2 className="font-display mt-10 mb-5 text-center text-xl font-semibold text-moon">
              {t('spread.categoryTitle')}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SPREAD_CATEGORIES.map((c, i) => (
                <motion.button
                  key={c}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    category === c
                      ? 'aura-ring border-aura-teal/60 bg-mist/70'
                      : 'border-white/8 bg-abyss/60 hover:border-aura-teal/30'
                  }`}
                >
                  <h3 className="font-display font-semibold text-moon">{t(`spread.categories.${c}`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-moondim">{t(`spread.categoryDesc.${c}`)}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <div className="mt-10 text-center">
        {ready ? (
          <Link
            href={pickHref}
            className="font-display inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-aura-violet/80 to-aura-teal/60 px-8 py-3.5 text-lg font-semibold text-white shadow-[0_0_32px_rgba(167,139,250,0.4)] transition-transform hover:scale-[1.03]"
          >
            {t('spread.continue')}
            <AuraIcon name="arrowRight" className="h-5 w-5" />
          </Link>
        ) : (
          <p className="text-sm text-moonfaint">
            {step === 'level' ? t('spread.subtitle') : t('spread.categoryTitle')}
          </p>
        )}
        {ready && level && (
          <p className="mt-3 text-sm text-moonfaint">
            {t('spread.cardsToPick', { count: level === 1 ? 1 : level === 3 ? 3 : 10 })}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SpreadPage() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<p className="py-20 text-center text-moondim">{t('common.loading')}</p>}>
      <SpreadPageInner />
    </Suspense>
  );
}
