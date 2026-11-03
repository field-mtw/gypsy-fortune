'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next, { LANG_STORAGE_KEY } from './config';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if ((saved === 'th' || saved === 'en') && i18next.language !== saved) {
        void i18next.changeLanguage(saved);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
