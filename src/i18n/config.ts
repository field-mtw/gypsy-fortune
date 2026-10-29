'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import th from './locales/th.json';
import en from './locales/en.json';

const LANG_KEY = 'aura-tarot-lang';

function detectLang(): string {
  if (typeof window === 'undefined') return 'th';
  const saved = window.localStorage.getItem(LANG_KEY);
  if (saved === 'th' || saved === 'en') return saved;
  return 'th';
}

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      th: { translation: th },
      en: { translation: en },
    },
    lng: detectLang(),
    fallbackLng: 'th',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  i18next.on('languageChanged', (lng) => {
    try {
      window.localStorage.setItem(LANG_KEY, lng);
      document.documentElement.lang = lng === 'th' ? 'th' : 'en';
    } catch {
      /* storage unavailable */
    }
  });
}

export function setAppLanguage(lng: 'th' | 'en') {
  void i18next.changeLanguage(lng);
}

export default i18next;
