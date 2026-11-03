'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import type { SelectableTopic } from '@/data/card-types';
import {
  FOCUS_TOPICS,
  formatFocusSelectionSummary,
  getFocusTopicDef,
  type FocusSubTag,
} from '@/data/focus-topics';
import { loadProfile, saveProfile, type UserProfile } from '@/lib/storage';
import { loadSession, saveSession } from '@/lib/session';

type StepId = 'name' | 'birthdate' | 'focus';
const STEPS: StepId[] = ['name', 'birthdate', 'focus'];

interface Msg {
  id: string;
  from: 'cards' | 'user';
  text: string;
}

function getLockedTopicFromSpread(
  level?: number,
  category?: string,
): SelectableTopic | null {
  if (level !== 3) return null;
  if (category === 'love' || category === 'career' || category === 'money') {
    return category;
  }
  return null;
}

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [hasSavedIdentity, setHasSavedIdentity] = useState(false);
  const [editingIdentity, setEditingIdentity] = useState(false);

  const [lockedPrimary, setLockedPrimary] = useState<SelectableTopic | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<SelectableTopic[]>([]);
  const [selectedSubTags, setSelectedSubTags] = useState<Partial<Record<SelectableTopic, FocusSubTag>>>({});

  const [stepIdx, setStepIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = loadSession();
    if (!s || s.picks.length === 0) {
      router.replace('/spread');
      return;
    }
    const saved = loadProfile();
    const locked = getLockedTopicFromSpread(s.level, s.category);
    const returning = Boolean(saved.name.trim() || saved.birthdate.trim());

    setName(saved.name);
    setBirthdate(saved.birthdate);
    setHasSavedIdentity(returning);
    setLockedPrimary(locked);
    setSelectedTopics(locked ? [locked] : []);
    setSelectedSubTags({});

    if (returning) {
      setStepIdx(2); // Jump straight to Focus step
      const lockedDef = locked ? getFocusTopicDef(locked) : undefined;
      const focusPrompt = lockedDef
        ? t('profile.qFocusLocked', { topic: lang === 'th' ? lockedDef.labelTh : lockedDef.labelEn })
        : t('profile.qFocus');
      setMsgs([{ id: 'init-focus', from: 'cards', text: focusPrompt }]);
    } else {
      setStepIdx(0);
      setInput('');
      setMsgs([{ id: 'step-0', from: 'cards', text: t('profile.qName') }]);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs.length, stepIdx]);

  if (!ready) {
    return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;
  }

  const step = STEPS[stepIdx] ?? 'focus';

  const pushNextQuestionBubble = (nextIdx: number) => {
    const nextStep = STEPS[nextIdx];
    if (!nextStep) return;
    let promptText = '';
    if (nextStep === 'name') promptText = t('profile.qName');
    else if (nextStep === 'birthdate') promptText = t('profile.qBirthdate');
    else {
      const lockedDef = lockedPrimary ? getFocusTopicDef(lockedPrimary) : undefined;
      promptText = lockedDef
        ? t('profile.qFocusLocked', { topic: lang === 'th' ? lockedDef.labelTh : lockedDef.labelEn })
        : t('profile.qFocus');
    }
    setMsgs((prev) => [...prev, { id: `cards-${nextIdx}-${Date.now()}`, from: 'cards', text: promptText }]);
  };

  const handleIdentityStepSubmit = (rawVal: string) => {
    const trimmed = rawVal.trim();
    if (step === 'name') {
      setName(trimmed);
      if (trimmed) {
        setMsgs((prev) => [...prev, { id: `user-name-${Date.now()}`, from: 'user', text: trimmed }]);
      }
      setInput(birthdate);
      setStepIdx(1);
      pushNextQuestionBubble(1);
    } else if (step === 'birthdate') {
      setBirthdate(trimmed);
      if (trimmed) {
        const formattedDate = new Date(trimmed + 'T00:00:00').toLocaleDateString(
          lang === 'th' ? 'th-TH' : 'en-US',
          { year: 'numeric', month: 'short', day: 'numeric' },
        );
        setMsgs((prev) => [...prev, { id: `user-bd-${Date.now()}`, from: 'user', text: formattedDate }]);
      }
      setInput('');
      setStepIdx(2);
      pushNextQuestionBubble(2);
    }
  };

  const toggleMainTopic = (topicId: SelectableTopic) => {
    if (lockedPrimary && topicId === lockedPrimary) {
      // Locked primary from 3-card spread stays selected
      return;
    }
    setSelectedTopics((prev) => {
      if (prev.includes(topicId)) {
        const next = prev.filter((x) => x !== topicId);
        setSelectedSubTags((st) => {
          const copy = { ...st };
          delete copy[topicId];
          return copy;
        });
        return next;
      }
      if (prev.length < 2) {
        return [...prev, topicId];
      }
      // Replace the 2nd (secondary) slot smoothly so the user never hits a dead-end
      const dropped = prev[1];
      setSelectedSubTags((st) => {
        const copy = { ...st };
        if (dropped) delete copy[dropped];
        return copy;
      });
      return [prev[0], topicId];
    });
  };

  const toggleSubTag = (topicId: SelectableTopic, subTagId: FocusSubTag) => {
    setSelectedSubTags((prev) => ({
      ...prev,
      [topicId]: prev[topicId] === subTagId ? undefined : subTagId,
    }));
  };

  const completeAndReveal = (topicsToUse: SelectableTopic[], subTagsToUse: Partial<Record<SelectableTopic, FocusSubTag>>) => {
    const cleanSubTags: Partial<Record<SelectableTopic, FocusSubTag>> = {};
    for (const tId of topicsToUse) {
      if (subTagsToUse[tId]) cleanSubTags[tId] = subTagsToUse[tId];
    }
    const summary =
      topicsToUse.length > 0
        ? formatFocusSelectionSummary(topicsToUse, cleanSubTags, lang)
        : '';

    const finalProfile: UserProfile = {
      name: name.trim(),
      birthdate: birthdate.trim(),
      question: summary,
      topics: topicsToUse,
      subTags: cleanSubTags,
    };

    saveProfile(finalProfile);
    const s = loadSession();
    if (s) saveSession({ ...s, profileDone: true });
    router.push('/reveal');
  };

  const handleGeneralSkip = () => {
    const fallbackTopics = lockedPrimary ? [lockedPrimary] : [];
    completeAndReveal(fallbackTopics, {});
  };

  const lockedTopicDef = lockedPrimary ? getFocusTopicDef(lockedPrimary) : undefined;
  const secondaryTopicCandidates = lockedPrimary
    ? FOCUS_TOPICS.filter((tDef) => tDef.id !== lockedPrimary)
    : FOCUS_TOPICS;

  const formattedSavedBirthdate = birthdate
    ? (() => {
        const d = new Date(birthdate + 'T00:00:00');
        return Number.isNaN(d.getTime())
          ? birthdate
          : d.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
      })()
    : '';

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon sm:text-3xl">{t('profile.title')}</h1>
        <p className="mt-2 text-sm text-moondim">{t('profile.subtitle')}</p>
        <p className="mt-1 text-xs text-aura-teal">{t('profile.completeNote')}</p>
      </div>

      {/* Returning user identity pill + inline editor */}
      {hasSavedIdentity && step === 'focus' && (
        <div className="mt-6">
          {!editingIdentity ? (
            <div className="mx-auto flex max-w-lg flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-abyss/70 px-4 py-2.5 text-xs text-moondim">
              <span className="flex items-center gap-2">
                <AuraIcon name="spark" className="h-3.5 w-3.5 text-aura-violet" />
                <span>
                  {t('profile.returningGreeting', {
                    name: name.trim() ? (lang === 'th' ? ` ${name.trim()}` : `, ${name.trim()}`) : '',
                  })}
                  {formattedSavedBirthdate ? ` · ${formattedSavedBirthdate}` : ''}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setEditingIdentity(true)}
                className="inline-flex items-center gap-1 rounded-full border border-white/12 px-2.5 py-1 text-[11px] text-aura-teal transition-colors hover:border-aura-teal/40"
              >
                <AuraIcon name="edit" className="h-3 w-3" />
                {t('profile.editIdentity')}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mx-auto max-w-lg space-y-3 rounded-2xl p-4"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-moondim">{t('profile.qName')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('profile.placeholderName')}
                    className="w-full rounded-xl border border-white/10 bg-void/60 px-3 py-2 text-sm text-moon placeholder:text-moonfaint focus:border-aura-violet/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-moondim">{t('profile.qBirthdate')}</label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-void/60 px-3 py-2 text-sm text-moon focus:border-aura-violet/60 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingIdentity(false)}
                  className="rounded-full bg-aura-violet/30 px-4 py-1.5 text-xs font-medium text-moon hover:bg-aura-violet/50"
                >
                  {t('common.close')}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Progress indicator (shown during full 3-step onboarding) */}
      {!hasSavedIdentity && (
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-2 w-8 rounded-full transition-colors ${
                i < stepIdx
                  ? 'bg-aura-teal'
                  : i === stepIdx
                    ? 'bg-aura-violet shadow-[0_0_10px_rgba(167,139,250,0.7)]'
                    : 'bg-white/12'
              }`}
            />
          ))}
        </div>
      )}

      {/* Conversational chat bubbles */}
      <div className="mt-6 space-y-4 pb-4">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.from === 'cards' && (
                <span className="mt-1 mr-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aura-violet/20 text-aura-violet">
                  <AuraIcon name="spark" className="h-4 w-4" />
                </span>
              )}
              <div
                className={`chat-bubble max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                  m.from === 'user' ? 'bg-aura-violet/25 text-moon' : 'glass text-moondim'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Step 1 & 2: Name / Birthdate input */}
      {(step === 'name' || step === 'birthdate') && (
        <div className="sticky bottom-4">
          <div className="glass rounded-3xl p-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs text-aura-teal">
              <AuraIcon name="eye" className="h-3.5 w-3.5" />
              {step === 'name' ? t('profile.qNameBenefit') : t('profile.qBirthdateBenefit')}
            </p>
            <div className="flex gap-2">
              <input
                type={step === 'birthdate' ? 'date' : 'text'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleIdentityStepSubmit(input);
                }}
                placeholder={step === 'name' ? t('profile.placeholderName') : undefined}
                aria-label={step === 'name' ? t('profile.qName') : t('profile.qBirthdate')}
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-void/60 px-4 py-3 text-sm text-moon placeholder:text-moonfaint focus:border-aura-violet/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleIdentityStepSubmit(input)}
                className="font-display shrink-0 rounded-2xl bg-aura-violet/70 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-aura-violet"
              >
                {t('profile.next')}
              </button>
            </div>
            <div className="mt-3 flex justify-between">
              <button
                type="button"
                onClick={() => handleIdentityStepSubmit('')}
                className="text-xs text-moonfaint transition-colors hover:text-moondim"
              >
                {t('profile.skip')}
              </button>
              <button
                type="button"
                onClick={handleGeneralSkip}
                className="text-xs text-moonfaint transition-colors hover:text-moondim"
              >
                {t('profile.skipAll')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Structured Focus Category & Sub-tag Selector (Zero freetext) */}
      {step === 'focus' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass mt-2 rounded-3xl p-5 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs text-aura-teal">
              <AuraIcon name="eye" className="h-3.5 w-3.5 shrink-0" />
              <span>{t('profile.qFocusBenefit')}</span>
            </p>
            {!lockedPrimary && (
              <span className="text-[11px] text-moonfaint">{t('profile.maxTwoHint')}</span>
            )}
          </div>

          {/* Case A: Locked primary category from 3-card spread (love / career / money) */}
          {lockedTopicDef && (
            <div className="mb-6 rounded-2xl border border-aura-violet/45 bg-mist/60 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-aura-violet/20 text-aura-violet">
                    <AuraIcon name={lockedTopicDef.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-moon">
                      {lang === 'th' ? lockedTopicDef.labelTh : lockedTopicDef.labelEn}
                    </p>
                    <p className="text-xs text-moondim">
                      {lang === 'th' ? lockedTopicDef.shortDescTh : lockedTopicDef.shortDescEn}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-aura-violet/25 px-2.5 py-1 text-[11px] font-medium text-aura-violet">
                  {t('profile.lockedPrimaryBadge')}
                </span>
              </div>

              <div className="mt-3.5 border-t border-white/8 pt-3">
                <p className="mb-2 text-xs text-moondim">
                  {t('profile.subTagHint', {
                    topic: lang === 'th' ? lockedTopicDef.labelTh : lockedTopicDef.labelEn,
                  })}
                </p>
                <div className="flex flex-wrap gap-2">
                  {lockedTopicDef.subTags.map((st) => {
                    const active = selectedSubTags[lockedTopicDef.id] === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => toggleSubTag(lockedTopicDef.id, st.id)}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                          active
                            ? 'border-aura-teal bg-aura-teal/20 font-medium text-aura-teal shadow-[0_0_14px_rgba(94,234,212,0.25)]'
                            : 'border-white/12 bg-void/50 text-moondim hover:border-aura-teal/40 hover:text-moon'
                        }`}
                      >
                        {lang === 'th' ? st.labelTh : st.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main Category Grid (all 7 topics, or 6 optional secondary topics if primary is locked) */}
          {lockedTopicDef && (
            <p className="mb-3 text-xs font-medium text-moondim">{t('profile.addSecondTopic')}</p>
          )}

          <div className="grid gap-2.5 sm:grid-cols-2">
            {secondaryTopicCandidates.map((tDef) => {
              const idx = selectedTopics.indexOf(tDef.id);
              const isSelected = idx !== -1;
              const isPrimary = idx === 0;
              return (
                <button
                  key={tDef.id}
                  type="button"
                  onClick={() => toggleMainTopic(tDef.id)}
                  aria-pressed={isSelected}
                  className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? isPrimary
                        ? 'border-aura-violet/70 bg-aura-violet/15 shadow-[0_0_20px_rgba(167,139,250,0.22)]'
                        : 'border-aura-teal/65 bg-aura-teal/12 shadow-[0_0_18px_rgba(94,234,212,0.18)]'
                      : 'border-white/10 bg-void/45 hover:border-aura-violet/35'
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isSelected
                        ? isPrimary
                          ? 'bg-aura-violet/25 text-aura-violet'
                          : 'bg-aura-teal/20 text-aura-teal'
                        : 'bg-white/6 text-moondim'
                    }`}
                  >
                    <AuraIcon name={tDef.icon} className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-display text-sm font-semibold text-moon">
                        {lang === 'th' ? tDef.labelTh : tDef.labelEn}
                      </span>
                      {isSelected && (
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            isPrimary
                              ? 'bg-aura-violet/25 text-aura-violet'
                              : 'bg-aura-teal/20 text-aura-teal'
                          }`}
                        >
                          {isPrimary ? t('profile.primaryBadge') : t('profile.secondaryBadge')}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-moonfaint">
                      {lang === 'th' ? tDef.shortDescTh : tDef.shortDescEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sub-tag drawers for user-tapped categories (excluding lockedPrimary which is rendered above) */}
          <AnimatePresence initial={false}>
            {selectedTopics
              .filter((tId) => tId !== lockedPrimary)
              .map((tId) => {
                const tDef = getFocusTopicDef(tId);
                if (!tDef) return null;
                const isPrimary = selectedTopics[0] === tId;
                return (
                  <motion.div
                    key={tId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-2xl border border-white/10 bg-abyss/70 p-3.5">
                      <p className="mb-2.5 text-xs text-moondim">
                        {t('profile.subTagHint', {
                          topic: lang === 'th' ? tDef.labelTh : tDef.labelEn,
                        })}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tDef.subTags.map((st) => {
                          const active = selectedSubTags[tId] === st.id;
                          return (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => toggleSubTag(tId, st.id)}
                              aria-pressed={active}
                              className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                                active
                                  ? isPrimary
                                    ? 'border-aura-violet bg-aura-violet/25 font-medium text-moon shadow-[0_0_12px_rgba(167,139,250,0.3)]'
                                    : 'border-aura-teal bg-aura-teal/20 font-medium text-aura-teal shadow-[0_0_12px_rgba(94,234,212,0.25)]'
                                  : 'border-white/12 bg-void/50 text-moondim hover:border-white/30 hover:text-moon'
                              }`}
                            >
                              {lang === 'th' ? st.labelTh : st.labelEn}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            {!lockedPrimary ? (
              <button
                type="button"
                onClick={handleGeneralSkip}
                className="order-2 text-xs text-moonfaint transition-colors hover:text-moondim sm:order-1"
              >
                {t('profile.generalOption')}
              </button>
            ) : (
              <span className="order-2 sm:order-1" />
            )}

            <button
              type="button"
              onClick={() => completeAndReveal(selectedTopics, selectedSubTags)}
              className="font-display order-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aura-violet/85 to-aura-teal/65 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_28px_rgba(167,139,250,0.4)] transition-transform hover:scale-[1.02] sm:order-2 sm:w-auto"
            >
              <AuraIcon name="eye" className="h-5 w-5" />
              {t('profile.finish')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
