'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

export default function LandingPage() {
  const { t } = useTranslation();

  const levels = [
    { name: t('landing.level1Name'), desc: t('landing.level1Desc'), href: '/spread?level=1', icon: 'spark' as const },
    { name: t('landing.level3Name'), desc: t('landing.level3Desc'), href: '/spread?level=3', icon: 'cards' as const },
    { name: t('landing.level10Name'), desc: t('landing.level10Desc'), href: '/spread?level=10', icon: 'moon' as const },
  ];

  const steps = [
    { title: t('landing.step1Title'), desc: t('landing.step1Desc'), icon: 'cards' as const },
    { title: t('landing.step2Title'), desc: t('landing.step2Desc'), icon: 'feather' as const },
    { title: t('landing.step3Title'), desc: t('landing.step3Desc'), icon: 'eye' as const },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="flex min-h-[78vh] flex-col items-center justify-center py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-2 text-sm tracking-[0.2em] text-aura-teal uppercase"
        >
          <AuraIcon name="spark" className="h-4 w-4" />
          {t('landing.eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-glow max-w-3xl text-4xl leading-tight font-semibold text-moon sm:text-6xl"
        >
          {t('landing.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-moondim sm:text-lg"
        >
          {t('landing.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link
              href="/spread"
              className="font-display inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-aura-violet/80 via-[#8b7cf6]/80 to-aura-teal/70 px-10 py-4 text-xl font-semibold text-white shadow-[0_0_40px_rgba(167,139,250,0.45)] transition-transform hover:scale-[1.03]"
            >
              <AuraIcon name="spark" className="h-6 w-6" />
              {t('landing.cta')}
            </Link>
          </motion.div>
          <p className="mt-4 text-sm text-moonfaint">{t('landing.free')}</p>
        </motion.div>
      </section>

      {/* Levels */}
      <section className="py-14">
        <motion.h2 {...fadeUp} className="font-display mb-8 text-center text-2xl font-semibold text-moon sm:text-3xl">
          {t('landing.levelsTitle')}
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {levels.map((l, i) => (
            <motion.div key={l.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <Link
                href={l.href}
                className="glass group flex h-full flex-col rounded-3xl p-6 transition-all hover:border-aura-violet/40 hover:shadow-[0_0_32px_rgba(167,139,250,0.2)]"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-aura-violet/15 text-aura-violet">
                  <AuraIcon name={l.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-moon">{l.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-moondim">{l.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-aura-teal">
                  {t('landing.cta')}
                  <AuraIcon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-14">
        <motion.h2 {...fadeUp} className="font-display mb-8 text-center text-2xl font-semibold text-moon sm:text-3xl">
          {t('landing.stepsTitle')}
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="rounded-3xl border border-white/5 bg-abyss/60 p-6"
            >
              <div className="font-display mb-3 text-sm tracking-widest text-aura-rose">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mb-3 text-aura-teal">
                <AuraIcon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-moon">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-moondim">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ritual + ethics */}
      <section className="py-10">
        <motion.div {...fadeUp} className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center">
          <div className="mb-3 inline-flex text-aura-gold">
            <AuraIcon name="moon" className="h-7 w-7" />
          </div>
          <h2 className="font-display text-xl font-semibold text-moon">{t('landing.ritualTitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-moondim">{t('landing.ritualDesc')}</p>
          <p className="mt-6 border-t border-white/5 pt-5 text-xs leading-relaxed text-moonfaint">
            {t('landing.ethicsNote')}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
