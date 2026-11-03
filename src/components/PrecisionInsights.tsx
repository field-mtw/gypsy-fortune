'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from './AuraIcon';
import { CARD_BACK_IMAGE } from '@/data/cards';
import type { ReadingTopic } from '@/data/card-types';
import {
  getClarifierOptionsForTopic,
  type ClarifierIntent,
} from '@/data/emotional-pulse';
import type { FocusSubTag } from '@/data/focus-topics';
import type { ClarifierReading, JournalMemoryNote } from '@/lib/narrative-weaver';
import type { ShadowCardReading } from '@/lib/reading-engine';
import type { ChemistryBadgeTone, SpreadChemistry } from '@/lib/spread-chemistry';
import type { ClarifierCardRef, DrawnCardRef } from '@/lib/storage';
import type { SoulLensReading } from '@/lib/tarot-numerology';

const BADGE_TONE_CLASSES: Record<ChemistryBadgeTone, string> = {
  gold: 'border-aura-gold/35 bg-aura-gold/12 text-aura-gold',
  violet: 'border-aura-violet/35 bg-aura-violet/12 text-moon',
  teal: 'border-aura-teal/35 bg-aura-teal/12 text-aura-teal',
  rose: 'border-aura-rose/35 bg-aura-rose/12 text-aura-rose',
};

export function SpreadChemistrySection({
  chemistry,
  shadowRevealed = true,
}: {
  chemistry: SpreadChemistry;
  shadowRevealed?: boolean;
}) {
  const { t } = useTranslation();

  // Do not spoil the Shadow Card's identity before the user flips it
  const visiblePairings = chemistry.pairings.filter(
    (p) => !p.includesShadow || shadowRevealed,
  );

  return (
    <section className="rounded-3xl border border-aura-violet/20 bg-abyss/70 p-6">
      <div className="flex items-center gap-2">
        <span className="text-aura-teal">
          <AuraIcon name="alchemy" className="h-5 w-5" />
        </span>
        <h2 className="font-display text-lg font-semibold text-moon">
          {t('reveal.chemistryLabel')}
        </h2>
      </div>

      {/* Signal Badges */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {chemistry.badges.map((b, i) => (
          <span
            key={i}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${BADGE_TONE_CLASSES[b.tone]}`}
          >
            {b.label}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-loose text-moondim">{chemistry.synthesisText}</p>

      {/* Iconic Card Pairings */}
      {visiblePairings.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-white/8 pt-4">
          {visiblePairings.map((p) => (
            <div
              key={p.pairKey}
              className="rounded-2xl border border-aura-gold/25 bg-aura-gold/6 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-aura-gold/35 bg-aura-gold/15 px-2.5 py-0.5 text-[11px] font-medium text-aura-gold">
                  {p.includesShadow
                    ? t('reveal.chemistryShadowPairBadge')
                    : t('reveal.chemistryPairBadge')}
                </span>
                <span className="font-display text-xs font-semibold text-moon">
                  {p.cardAName} × {p.cardBName}
                </span>
              </div>
              <p className="font-display mt-1.5 text-sm font-semibold text-aura-rose">
                {p.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-moondim sm:text-sm">
                {p.meaning}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function SoulLensSection({
  soulLens,
  onSaveBirthdate,
}: {
  soulLens: SoulLensReading | null;
  onSaveBirthdate?: (birthdate: string) => void;
}) {
  const { t } = useTranslation();
  const [editingDate, setEditingDate] = useState(false);
  const [dateVal, setDateVal] = useState('');

  if (!soulLens) {
    if (!onSaveBirthdate) return null;
    return (
      <section className="rounded-3xl border border-dashed border-aura-violet/30 bg-abyss/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display flex items-center gap-2 text-base font-semibold text-moon">
              <AuraIcon name="sun" className="h-4 w-4 text-aura-gold" />
              {t('reveal.soulLensMissingTitle')}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-moondim sm:text-sm">
              {t('reveal.soulLensMissingDesc')}
            </p>
          </div>
          {!editingDate && (
            <button
              type="button"
              onClick={() => setEditingDate(true)}
              className="shrink-0 self-start rounded-full border border-aura-gold/40 bg-aura-gold/12 px-4 py-2 text-xs font-medium text-aura-gold transition-colors hover:bg-aura-gold/20 sm:self-center"
            >
              {t('reveal.soulLensAddCta')}
            </button>
          )}
        </div>

        <AnimatePresence>
          {editingDate && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
                  onSaveBirthdate(dateVal);
                  setEditingDate(false);
                }
              }}
              className="mt-4 flex flex-wrap items-center gap-2.5 overflow-hidden pt-1"
            >
              <input
                type="date"
                value={dateVal}
                onChange={(e) => setDateVal(e.target.value)}
                required
                className="rounded-xl border border-white/15 bg-void/80 px-3.5 py-2 text-sm text-moon focus:border-aura-violet focus:outline-none"
              />
              <button
                type="submit"
                className="font-display rounded-full bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 px-5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-transform hover:scale-[1.02]"
              >
                {t('reveal.soulLensApply')}
              </button>
              <button
                type="button"
                onClick={() => setEditingDate(false)}
                className="px-2 py-1.5 text-xs text-moonfaint hover:text-moondim"
              >
                {t('common.close')}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    );
  }

  const relationPillClass =
    soulLens.elementRelation === 'amplified'
      ? 'border-aura-gold/35 bg-aura-gold/12 text-aura-gold'
      : soulLens.elementRelation === 'supportive'
        ? 'border-aura-teal/35 bg-aura-teal/12 text-aura-teal'
        : 'border-aura-violet/35 bg-aura-violet/12 text-moon';

  return (
    <section className="glass relative overflow-hidden rounded-3xl border border-aura-gold/25 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-aura-gold">
            <AuraIcon name="sun" className="h-5 w-5" />
          </span>
          <h2 className="font-display text-lg font-semibold text-moon">
            {t('reveal.soulLensLabel')}
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-moondim">
            {soulLens.zodiacLabel}
          </span>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${relationPillClass}`}>
            {soulLens.elementRelationBadge}
          </span>
        </div>
      </div>

      {soulLens.matchedInSpread && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-aura-rose/40 bg-aura-rose/15 px-3.5 py-1 text-xs font-medium text-aura-rose">
          <AuraIcon name="spark" className="h-3.5 w-3.5" />
          <span>{t('reveal.soulLensSyncBadge')}</span>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Miniature Birth Card Artwork */}
        <div className="flex shrink-0 items-center justify-center gap-3 self-center sm:self-start">
          <div className="text-center">
            <img
              src={soulLens.personalityCardImage}
              alt={soulLens.personalityCardName}
              draggable={false}
              className="aspect-[2/3] w-20 rounded-xl border border-aura-gold/35 object-cover shadow-[0_0_24px_rgba(251,191,36,0.18)] select-none"
            />
            <span className="mt-1.5 block text-[10px] text-aura-gold">
              {soulLens.isUnifiedArchetype
                ? t('reveal.soulLensUnified')
                : t('reveal.soulLensPersonality')}
            </span>
            <span className="font-display block max-w-[92px] truncate text-xs font-medium text-moon">
              {soulLens.personalityCardName}
            </span>
          </div>

          {!soulLens.isUnifiedArchetype && (
            <div className="text-center">
              <img
                src={soulLens.soulCardImage}
                alt={soulLens.soulCardName}
                draggable={false}
                className="aspect-[2/3] w-20 rounded-xl border border-aura-violet/35 object-cover shadow-[0_0_24px_rgba(167,139,250,0.2)] select-none"
              />
              <span className="mt-1.5 block text-[10px] text-aura-violet">
                {t('reveal.soulLensSoul')}
              </span>
              <span className="font-display block max-w-[92px] truncate text-xs font-medium text-moon">
                {soulLens.soulCardName}
              </span>
            </div>
          )}
        </div>

        {/* Archetype & Resonance Copy */}
        <div className="min-w-0 flex-1 space-y-3 text-sm leading-loose">
          <p className="font-display text-base font-semibold text-aura-gold">
            {soulLens.archetypeTitle}
          </p>
          <p className="text-moondim">{soulLens.archetypeSummary}</p>
          <p className="text-moon/95">{soulLens.spreadResonance}</p>
          <p className="border-l-2 border-aura-gold/40 pl-3.5 text-xs leading-relaxed text-moondim sm:text-sm">
            {soulLens.balanceAdvice}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ShadowCardSection({
  shadow,
  revealed,
  onReveal,
}: {
  shadow: ShadowCardReading | null;
  revealed: boolean;
  onReveal: () => void;
}) {
  const { t } = useTranslation();

  if (!shadow) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-aura-violet/35 bg-gradient-to-br from-abyss/90 via-void/90 to-aura-violet/15 p-6 shadow-[0_0_36px_rgba(167,139,250,0.14)]">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-aura-violet">
          <AuraIcon name="moon" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold text-moon">
            {t('reveal.shadowTitle')}
          </h2>
          <p className="mt-0.5 text-xs text-moonfaint">{t('reveal.shadowSubtitle')}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="shadow-locked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-5 flex flex-col items-center gap-5 sm:flex-row"
          >
            <button
              type="button"
              onClick={onReveal}
              aria-label={t('reveal.shadowRevealBtn')}
              className="group relative shrink-0 focus:outline-none"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="overflow-hidden rounded-2xl border border-aura-violet/45 shadow-[0_0_30px_rgba(167,139,250,0.35)] transition-transform group-hover:scale-[1.04]"
              >
                <img
                  src={CARD_BACK_IMAGE}
                  alt={t('reveal.shadowTitle')}
                  draggable={false}
                  className="aspect-[2/3] w-24 object-cover select-none sm:w-28"
                />
              </motion.div>
            </button>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm leading-loose text-moondim">{t('reveal.shadowTeaser')}</p>
              <button
                type="button"
                onClick={onReveal}
                className="font-display mt-4 inline-flex items-center gap-2 rounded-full border border-aura-violet/45 bg-aura-violet/20 px-6 py-2.5 text-sm font-semibold text-moon shadow-[0_0_24px_rgba(167,139,250,0.28)] transition-all hover:bg-aura-violet/35"
              >
                <AuraIcon name="eye" className="h-4 w-4 text-aura-teal" />
                {t('reveal.shadowRevealBtn')}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="shadow-open"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="shrink-0 self-center sm:self-start"
              >
                <img
                  src={shadow.image}
                  alt={shadow.cardName}
                  draggable={false}
                  className="aspect-[2/3] w-24 rounded-xl border border-aura-violet/40 object-cover shadow-[0_0_28px_rgba(167,139,250,0.3)] select-none sm:w-28"
                  style={shadow.reversed ? { transform: 'rotate(180deg)' } : undefined}
                />
              </motion.div>

              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-moon">
                      {shadow.cardName}
                    </h3>
                    {shadow.cardSubtitle && (
                      <span className="text-xs text-aura-violet/90">· {shadow.cardSubtitle}</span>
                    )}
                    <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[11px] text-moonfaint">
                      {shadow.reversed ? t('reveal.reversed') : t('reveal.upright')}
                    </span>
                  </div>
                  <p className="font-display mt-1.5 text-sm font-medium text-aura-rose">
                    {shadow.oneLiner}
                  </p>
                </div>

                <p className="text-sm leading-loose text-moon/90">{shadow.subconsciousCore}</p>

                <div className="rounded-2xl border border-aura-teal/25 bg-aura-teal/8 p-4">
                  <p className="font-display mb-1 flex items-center gap-1.5 text-xs font-semibold text-aura-teal">
                    <AuraIcon name="spark" className="h-3.5 w-3.5" />
                    {t('reveal.shadowUnlockLabel')}
                  </p>
                  <p className="text-xs leading-relaxed text-moondim sm:text-sm">
                    {shadow.innerUnlock}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function JournalMemoryBanner({ memory }: { memory: JournalMemoryNote | null }) {
  if (!memory) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-aura-gold/30 bg-gradient-to-r from-aura-gold/10 via-abyss/80 to-aura-violet/10 p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-aura-gold/40 bg-aura-gold/15 px-3 py-0.5 text-xs font-medium text-aura-gold">
          <AuraIcon name="book" className="h-3.5 w-3.5" />
          <span>{memory.badge}</span>
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-moon/90">{memory.message}</p>
    </motion.section>
  );
}

export function ClarifierSection({
  topic,
  subTag,
  pool,
  clarifier,
  onPickClarifier,
}: {
  topic: ReadingTopic;
  subTag?: FocusSubTag;
  pool?: DrawnCardRef[];
  clarifier: ClarifierReading | null;
  onPickClarifier?: (choice: ClarifierCardRef) => void;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const [selectedIntent, setSelectedIntent] = useState<ClarifierIntent | null>(null);

  const options = getClarifierOptionsForTopic(topic, subTag);
  const activeIntent =
    selectedIntent && options.some((o) => o.id === selectedIntent) ? selectedIntent : null;
  const activeIntentDef = activeIntent ? options.find((o) => o.id === activeIntent) : undefined;

  if (!clarifier && (!pool || pool.length === 0 || !onPickClarifier)) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-aura-teal/30 bg-gradient-to-br from-abyss/90 via-void/90 to-aura-teal/12 p-6 shadow-[0_0_32px_rgba(94,234,212,0.1)]">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-aura-teal">
          <AuraIcon name="cards" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold text-moon">
            {clarifier ? t('reveal.clarifierResultTitle') : t('reveal.clarifierTitle')}
          </h2>
          {!clarifier && (
            <p className="mt-0.5 text-xs text-moonfaint">{t('reveal.clarifierSubtitle')}</p>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {clarifier ? (
          <motion.div
            key={`clarifier-done-${clarifier.cardId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-5"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-void/50 px-3.5 py-2.5 text-xs text-moondim">
              <span className="rounded-full border border-aura-teal/35 bg-aura-teal/15 px-2.5 py-0.5 font-medium text-aura-teal">
                {clarifier.intentBadge}
              </span>
              <span className="text-moon/85">“{clarifier.intentQuestion}”</span>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="shrink-0 self-center sm:self-start"
              >
                <img
                  src={clarifier.image}
                  alt={clarifier.cardName}
                  draggable={false}
                  className="aspect-[2/3] w-24 rounded-xl border border-aura-teal/40 object-cover shadow-[0_0_28px_rgba(94,234,212,0.22)] select-none sm:w-28"
                  style={clarifier.reversed ? { transform: 'rotate(180deg)' } : undefined}
                />
              </motion.div>

              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="font-display text-base font-semibold text-moon">
                      {clarifier.cardName}
                    </h3>
                    {clarifier.cardSubtitle && (
                      <span className="text-xs text-aura-violet/90">
                        · {clarifier.cardSubtitle}
                      </span>
                    )}
                    <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[11px] text-moonfaint">
                      {clarifier.reversed ? t('reveal.reversed') : t('reveal.upright')}
                    </span>
                  </div>
                  <p className="font-display mt-1.5 text-sm font-medium text-aura-rose">
                    {clarifier.oneLiner}
                  </p>
                </div>

                <p className="text-sm leading-loose text-moon/90">{clarifier.leadParagraph}</p>

                <div className="rounded-2xl border border-aura-gold/25 bg-aura-gold/8 p-4">
                  <p className="font-display mb-1 flex items-center gap-1.5 text-xs font-semibold text-aura-gold">
                    <AuraIcon name="compass" className="h-3.5 w-3.5" />
                    {t('reveal.clarifierTakeawayLabel')}
                  </p>
                  <p className="text-xs leading-relaxed text-moondim sm:text-sm">
                    {clarifier.actionTakeaway}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : !activeIntent ? (
          <motion.div
            key="clarifier-choose-intent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2.5"
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedIntent(opt.id)}
                className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-void/55 px-4 py-3.5 text-left transition-all hover:border-aura-teal/45 hover:bg-aura-teal/10"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-aura-teal/15 text-aura-teal transition-colors group-hover:bg-aura-teal/25">
                    <AuraIcon name={opt.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-medium text-aura-teal">
                      {lang === 'th' ? opt.shortTagTh : opt.shortTagEn}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-moon">
                      {lang === 'th' ? opt.labelTh : opt.labelEn}
                    </span>
                  </div>
                </div>
                <AuraIcon
                  name="arrowRight"
                  className="h-4 w-4 shrink-0 text-moonfaint transition-transform group-hover:translate-x-1 group-hover:text-aura-teal"
                />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="clarifier-pick-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-aura-teal/30 bg-aura-teal/10 px-4 py-2.5 text-xs">
              <span className="text-moon">
                “{activeIntentDef ? (lang === 'th' ? activeIntentDef.labelTh : activeIntentDef.labelEn) : ''}”
              </span>
              <button
                type="button"
                onClick={() => setSelectedIntent(null)}
                className="shrink-0 text-[11px] text-aura-teal underline-offset-2 hover:underline"
              >
                {t('reveal.clarifierChangeQuestion')}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-moondim sm:text-sm">
              {t('reveal.clarifierPickPrompt')}
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
              {(pool ?? []).slice(0, 3).map((cardRef, idx) => {
                const fanRotate = idx === 0 ? -5 : idx === 2 ? 5 : 0;
                return (
                  <motion.button
                    key={cardRef.id}
                    type="button"
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ rotate: fanRotate }}
                    onClick={() =>
                      onPickClarifier?.({
                        id: cardRef.id,
                        reversed: cardRef.reversed,
                        intent: activeIntent,
                      })
                    }
                    className="overflow-hidden rounded-2xl border border-aura-teal/40 shadow-[0_0_24px_rgba(94,234,212,0.22)] transition-shadow hover:border-aura-teal hover:shadow-[0_0_32px_rgba(94,234,212,0.4)] focus:outline-none"
                  >
                    <img
                      src={CARD_BACK_IMAGE}
                      alt={`Clarifier option ${idx + 1}`}
                      draggable={false}
                      className="aspect-[2/3] w-20 object-cover select-none sm:w-24"
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
