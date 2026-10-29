import type { Metadata } from 'next';
import { Prompt, IBM_Plex_Sans_Thai } from 'next/font/google';
import './globals.css';
import I18nProvider from '@/i18n/I18nProvider';
import Starfield from '@/components/Starfield';
import Header from '@/components/Header';

const prompt = Prompt({
  variable: '--font-display',
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: '--font-body',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

// Working title — the owner will set the real brand name later.
export const metadata: Metadata = {
  title: 'Aura Tarot — ดูดวงไพ่ทาโรต์ 78 ใบ',
  description:
    'เลือกไพ่ทาโรต์ด้วยมือคุณเอง รับคำทำนายจากไพ่จริงทั้ง 78 ใบ ระบบ Rider-Waite ฟรี 100%',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${prompt.variable} ${ibmPlexSansThai.variable}`}>
      <body className="aurora-bg font-body antialiased">
        <I18nProvider>
          <Starfield />
          <Header />
          <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}
