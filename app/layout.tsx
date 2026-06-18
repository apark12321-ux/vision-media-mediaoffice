import type { Metadata } from 'next';
import './globals.css';
import { AdSenseScript } from '@/components/ads/adsense-script';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export const metadata: Metadata = {
  title: {
    default: '생활경제저널 | Everyday Economy Journal',
    template: '%s | 생활경제저널'
  },
  description: '생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 브랜드와 사람을 기록하는 생활경제 전문 미디어입니다.'
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
