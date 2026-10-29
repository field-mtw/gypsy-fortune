'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { ALL_CARDS, CARD_BACK_IMAGE, type CardData } from '@/data/cards';
import { getSpread, type SpreadLevel, type SpreadCategory } from '@/data/spreads';
import { mulberry32, REVERSED_PROBABILITY } from '@/lib/reading-engine';
import { saveSession } from '@/lib/session';

function PickPageInner() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();

  const level = useMemo(() => {
    const l = params.get('level');
    return l === '1' || l === '3' || l === '10' ? (Number(l) as SpreadLevel) : 3;
  }, [params]);
  const category = useMemo(() => {
    const c = params.get('category');
    return (c ?? 'past-present-future') as SpreadCategory | 'single' | 'celtic-cross';
  }, [params]);

  const spread = useMemo(() => getSpread(level, category as SpreadCategory), [level, category]);
  const cardCount = spread.cardCount;

  // Shuffle: seeded deck order + reversed flags for every card.
  const [deck, setDeck] = useState<CardData[] | null>(null);
  const [reversedMap, setReversedMap] = useState<Record<string, boolean>>({});
  const [seed, setSeed] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [shuffling, setShuffling] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const computeShuffle = () => {
    const s = Date.now() + Math.floor(Math.random() * 1e9);
    const rng = mulberry32(s);
    const pool = [...ALL_CARDS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const rev: Record<string, boolean> = {};
    for (const c of pool) rev[c.id] = rng() < REVERSED_PROBABILITY;
    return { s, pool, rev };
  };

  // Initial deal on mount (no animation).
  useEffect(() => {
    const { s, pool, rev } = computeShuffle();
    setSeed(s);
    setDeck(pool);
    setReversedMap(rev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Shuffle with a real visible riffle: cards leap and twirl in a wave,
  // then glide into their new shuffled positions (layout animation).
  const shuffle = () => {
    if (shuffling || !deck) return;
    const { s, pool, rev } = computeShuffle();
    setShuffling(true);
    setSelected([]);
    timers.current.push(
      window.setTimeout(() => {
        setSeed(s);
        setDeck(pool);
        setReversedMap(rev);
      }, 420),
    );
    timers.current.push(window.setTimeout(() => setShuffling(false), 1100));
  };

  const toggle = (id: string) => {
    if (shuffling) return;
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= cardCount) return prev;
      return [...prev, id];
    });
  };

  const confirm = () => {
    if (selected.length !== cardCount || !deck) return;
    saveSession({
      seed,
      level,
      category,
      picks: selected,
      reversed: Object.fromEntries(selected.map((id) => [id, reversedMap[id] ?? false])),
      order: deck.map((c) => c.id),
      profileDone: false,
    });
    router.push('/confirm');
  };

  if (!deck) {
    return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;
  }

  return (
    <div className="py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon sm:text-3xl">{t('pick.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-moondim sm:text-base">
          {t('pick.subtitle', { count: cardCount })}
        </p>
        <p className="mt-2 text-xs text-moonfaint">{t('pick.hint')}</p>
        <button
          onClick={shuffle}
          disabled={shuffling}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-moondim transition-colors hover:border-aura-violet/40 hover:text-moon disabled:cursor-wait disabled:opacity-60"
        >
          <motion.span
            animate={shuffling ? { rotate: 360 } : { rotate: 0 }}
            transition={shuffling ? { duration: 0.9, ease: 'easeInOut' } : { duration: 0.2 }}
            className="inline-flex"
          >
            <AuraIcon name="shuffle" className="h-4 w-4" />
          </motion.span>
          {t('pick.shuffle')}
        </button>
      </motion.div>

      {/* Card grid — face down, generous touch targets */}
      <div
        className={`mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8 ${
          shuffling ? 'pointer-events-none' : ''
        }`}
      >
        {deck.map((card, i) => {
          const selIdx = selected.indexOf(card.id);
          const isSel = selIdx >= 0;
          const tilt = ((i * 53) % 13) - 6;
          return (
            <motion.button
              key={card.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={
                shuffling
                  ? { opacity: 1, y: [0, -56, 0], rotate: [0, tilt, 0], scale: [1, 1.06, 1] }
                  : { opacity: 1, y: isSel ? -10 : 0, rotate: 0, scale: 1 }
              }
              transition={
                shuffling
                  ? {
                      duration: 0.9,
                      delay: (i % 12) * 0.028,
                      ease: 'easeInOut',
                      layout: { type: 'spring', stiffness: 320, damping: 34 },
                    }
                  : {
                      duration: 0.35,
                      delay: Math.min(i * 0.012, 0.6),
                      layout: { type: 'spring', stiffness: 320, damping: 34 },
                    }
              }
              onClick={() => toggle(card.id)}
              aria-pressed={isSel}
              aria-label={isSel ? `${t('pick.selected', { selected: selIdx + 1, count: cardCount })}` : t('pick.title')}
              className={`perspective-1200 relative aspect-[2/3] min-h-[88px] rounded-xl transition-shadow ${
                isSel ? 'aura-ring z-10' : 'hover:shadow-[0_0_20px_rgba(167,139,250,0.25)]'
              }`}
            >
              <img
                src={CARD_BACK_IMAGE}
                alt=""
                draggable={false}
                className={`h-full w-full rounded-xl border object-cover select-none ${
                  isSel ? 'border-aura-violet/70' : 'border-white/10'
                }`}
              />
              <AnimatePresence>
                {isSel && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="font-display absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-aura-violet text-sm font-bold text-white shadow-[0_0_16px_rgba(167,139,250,0.7)]"
                  >
                    {selIdx + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-aura-violet/15 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: cardCount }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i < selected.length ? 'bg-aura-violet shadow-[0_0_8px_rgba(167,139,250,0.8)]' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-moondim">
              {t('pick.selected', { selected: selected.length, count: cardCount })}
            </span>
          </div>
          <motion.button
            onClick={confirm}
            disabled={selected.length !== cardCount}
            whileTap={selected.length === cardCount ? { scale: 0.97 } : undefined}
            className={`font-display rounded-full px-7 py-3 font-semibold transition-all ${
              selected.length === cardCount
                ? 'bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 text-white shadow-[0_0_28px_rgba(167,139,250,0.45)]'
                : 'cursor-not-allowed bg-white/5 text-moonfaint'
            }`}
          >
            {t('pick.confirm')}
          </motion.button>
        </div>
      </div>
      {/* spacer for the fixed bar */}
      <div className="h-16" />
    </div>
  );
}

export default function PickPage() {
  const { t } = useTranslation();
  return (
    <Suspense fallback={<p className="py-24 text-center text-moondim">{t('common.loading')}</p>}>
      <PickPageInner />
    </Suspense>
  );
}
