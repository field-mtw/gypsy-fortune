'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import AuraIcon from '@/components/AuraIcon';
import { loadProfile, saveProfile, type UserProfile } from '@/lib/storage';
import { loadSession, saveSession } from '@/lib/session';

type StepId = 'name' | 'birthdate' | 'question' | 'done';
const STEPS: StepId[] = ['name', 'birthdate', 'question'];

interface Msg {
  from: 'cards' | 'user';
  text: string;
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({ name: '', birthdate: '', question: '' });
  const [stepIdx, setStepIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = loadSession();
    if (!s || s.picks.length === 0) {
      router.replace('/spread');
      return;
    }
    setProfile(loadProfile());
    setStarted(true);
  }, [router]);

  useEffect(() => {
    if (!started) return;
    const step = STEPS[stepIdx];
    if (!step) return;
    const q = t(`profile.q${step[0].toUpperCase()}${step.slice(1)}`);
    setMsgs((m) => [...m, { from: 'cards', text: q }]);
    setInput('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, started]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs]);

  if (!started) return <p className="py-24 text-center text-moondim">{t('common.loading')}</p>;

  const step = STEPS[stepIdx];
  const benefit = step ? t(`profile.q${step[0].toUpperCase()}${step.slice(1)}Benefit`) : '';

  const answer = (value: string) => {
    const trimmed = value.trim();
    if (trimmed) setMsgs((m) => [...m, { from: 'user', text: trimmed }]);
    const next = { ...profile, [step]: trimmed };
    setProfile(next);
    if (stepIdx + 1 >= STEPS.length) finish(next);
    else setStepIdx(stepIdx + 1);
  };

  const finish = (p: UserProfile) => {
    saveProfile(p);
    const s = loadSession();
    if (s) saveSession({ ...s, profileDone: true });
    router.push('/reveal');
  };

  const skipAll = () => finish(profile);

  return (
    <div className="mx-auto max-w-xl py-10">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-moon">{t('profile.title')}</h1>
        <p className="mt-2 text-sm text-moondim">{t('profile.subtitle')}</p>
        <p className="mt-1 text-xs text-aura-teal">{t('profile.completeNote')}</p>
      </div>

      {/* progress */}
      <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`h-2 w-8 rounded-full transition-colors ${
              i < stepIdx ? 'bg-aura-teal' : i === stepIdx ? 'bg-aura-violet shadow-[0_0_10px_rgba(167,139,250,0.7)]' : 'bg-white/12'
            }`}
          />
        ))}
      </div>

      {/* chat */}
      <div className="mt-6 space-y-4 pb-4">
        <AnimatePresence initial={false}>
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.from === 'cards' && (
                <span className="mt-1 mr-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aura-violet/20 text-aura-violet">
                  <AuraIcon name="spark" className="h-4 w-4" />
                </span>
              )}
              <div
                className={`chat-bubble max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-aura-violet/25 text-moon'
                    : 'glass text-moondim'
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* input area */}
      {step && (
        <div className="sticky bottom-4">
          <div className="glass rounded-3xl p-4">
            {benefit && (
              <p className="mb-3 flex items-center gap-1.5 text-xs text-aura-teal">
                <AuraIcon name="eye" className="h-3.5 w-3.5" />
                {benefit}
              </p>
            )}
            <div className="flex gap-2">
              <input
                type={step === 'birthdate' ? 'date' : 'text'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') answer(input);
                }}
                placeholder={
                  step === 'name' ? t('profile.placeholderName')
                  : step === 'question' ? t('profile.placeholderQuestion')
                  : undefined
                }
                aria-label={t(`profile.q${step[0].toUpperCase()}${step.slice(1)}`)}
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-void/60 px-4 py-3 text-sm text-moon placeholder:text-moonfaint focus:border-aura-violet/60 focus:outline-none"
              />
              <button
                onClick={() => answer(input)}
                className="font-display shrink-0 rounded-2xl bg-aura-violet/70 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-aura-violet"
              >
                {t('profile.next')}
              </button>
            </div>
            <div className="mt-3 flex justify-between">
              <button onClick={() => answer('')} className="text-xs text-moonfaint transition-colors hover:text-moondim">
                {t('profile.skip')}
              </button>
              <button onClick={skipAll} className="text-xs text-moonfaint transition-colors hover:text-moondim">
                {t('profile.skipAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
