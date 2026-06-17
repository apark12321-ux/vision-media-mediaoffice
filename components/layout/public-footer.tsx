import Link from 'next/link';
import { getPublicSiteSettings } from '@/lib/data/public';

export async function PublicFooter() {
  const settings = await getPublicSiteSettings();
  const isRegistered = settings.media_registration_status === 'registered';

  return (
    <footer className="mt-16 border-t-4 border-brand-navy bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="font-serif text-2xl font-black text-brand-navy">{settings.site_name}</h2>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Everyday Economy Journal</p>
        <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-b pb-5 text-sm text-gray-700">
          <Link href="/about">회사소개</Link>
          <Link href="/report">기사제보</Link>
          <Link href="/advertise">광고문의</Link>
          <Link href="/search">기사검색</Link>
          <Link href="/ethics">신문윤리강령</Link>
          <Link href="/practice-code">신문윤리실천요강</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/sponsored-policy">제휴콘텐츠정책</Link>
        </nav>
        <div className="grid gap-6 py-6 text-xs leading-6 text-gray-600 md:grid-cols-2">
          <div>
            <p>제호: {settings.site_name}</p>
            <p>운영사: {settings.business_name}</p>
            <p>대표: {settings.representative_name}</p>
            {settings.business_registration_number && <p>사업자등록번호: {settings.business_registration_number}</p>}
            {settings.mail_order_registration_number && <p>통신판매업신고번호: {settings.mail_order_registration_number}</p>}
          </div>
          <div>
            {isRegistered && settings.media_registration_number && <p>인터넷신문 등록번호: {settings.media_registration_number}</p>}
            {isRegistered && settings.publisher_name && <p>발행인: {settings.publisher_name}</p>}
            {isRegistered && settings.editor_name && <p>편집인: {settings.editor_name}</p>}
            <p>이메일: {settings.contact_email}</p>
            <p>전화: {settings.contact_phone}</p>
          </div>
        </div>
        <div className="border-t pt-4 text-center text-xs text-gray-500">Copyright {new Date().getFullYear()} {settings.site_name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
