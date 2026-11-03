'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import th from './locales/th.json';
import en from './locales/en.json';

export const LANG_STORAGE_KEY = 'aura-tarot-lang';

if (!i18next.isInitialized) {
  // Always start with 'th' on both server and initial client hydration so HTML matches;
  // I18nProvider syncs any saved user preference from localStorage after mount.
  i18next.use(initReactI18next).init({
    resources: {
      th: { translation: th },
      en: { translation: en },
    },
    lng: 'th',
    fallbackLng: 'th',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  i18next.on('languageChanged', (lng) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANG_STORAGE_KEY, lng);
        document.documentElement.lang = lng === 'en' ? 'en' : 'th';
      }
    } catch {
      /* storage unavailable */
    }
  });
}

export function setAppLanguage(lng: 'th' | 'en') {
  void i18next.changeLanguage(lng);
}

export default i18next;
