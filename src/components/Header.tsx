'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '@/i18n/config';
import AuraIcon from './AuraIcon';

export default function Header() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'th';

  return (
    <header className="sticky top-0 z-40 border-b border-aura-violet/10 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-aura-violet">
            <AuraIcon name="spark" className="h-6 w-6" />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-moon">
            {t('brand.name')}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/journal"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-moondim transition-colors hover:bg-mist hover:text-moon"
          >
            <AuraIcon name="book" className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.journal')}</span>
          </Link>

          <div
            className="flex items-center rounded-full border border-aura-violet/20 bg-mist/60 p-1"
            role="group"
            aria-label={t('nav.language')}
          >
            <AuraIcon name="globe" className="ml-1.5 h-4 w-4 text-moondim" />
            {(['th', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => setAppLanguage(lng)}
                aria-pressed={lang === lng}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                  lang === lng
                    ? 'bg-aura-violet/25 text-moon shadow-[0_0_12px_rgba(167,139,250,0.35)]'
                    : 'text-moonfaint hover:text-moondim'
                }`}
              >
                {lng === 'th' ? 'ไทย' : 'EN'}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
