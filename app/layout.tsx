import type { Metadata } from 'next';
import './globals.css';
import { AdSenseScript } from '@/components/ads/adsense-script';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export const metadata: Metadata = {
  title: {
    default: '에듀저널 | EDU JOURNAL',
    template: '%s | 에듀저널'
  },
  description: '평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 정보를 다루는 교육 전문 인터넷매체입니다.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-brand-ink antialiased">
        <AdSenseScript />
        <PublicHeader />
        <main>{children}</main>
        <PublicFooter />
      </body>
    </html>
  );
}
