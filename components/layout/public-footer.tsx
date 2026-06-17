import Link from 'next/link';
import { getPublicSiteSettings } from '@/lib/data/public';

export async function PublicFooter() {
  const settings = await getPublicSiteSettings();
  const isRegistered = settings.media_registration_status === 'registered';

  return (
    <footer className="mt-20 border-t bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h2 className="text-lg font-black text-brand-navy">{settings.site_name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">{settings.site_description}</p>
          <div className="mt-4 space-y-1 text-xs leading-6 text-gray-500">
            {settings.business_name && <p>운영사: {settings.business_name}</p>}
            {settings.representative_name && <p>대표: {settings.representative_name}</p>}
            {settings.business_registration_number && <p>사업자등록번호: {settings.business_registration_number}</p>}
            {settings.mail_order_registration_number && <p>통신판매업신고번호: {settings.mail_order_registration_number}</p>}
            {isRegistered && settings.media_registration_number && <p>인터넷신문 등록번호: {settings.media_registration_number}</p>}
            {isRegistered && settings.publisher_name && <p>발행인: {settings.publisher_name}</p>}
            {isRegistered && settings.editor_name && <p>편집인: {settings.editor_name}</p>}
            {isRegistered && settings.youth_protection_manager && <p>청소년보호책임자: {settings.youth_protection_manager}</p>}
            {settings.address && <p>주소: {settings.address}</p>}
            <p>이메일: {settings.contact_email} · 전화: {settings.contact_phone}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-brand-navy">정책</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/terms">이용약관</Link></li>
            <li><Link href="/privacy">개인정보처리방침</Link></li>
            <li><Link href="/refund-policy">환불정책</Link></li>
            <li><Link href="/sponsored-policy">제휴 콘텐츠 윤리정책</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-brand-navy">광고·제휴</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/advertise">광고 상품 안내</Link></li>
            <li><Link href="/apply">브랜드 인터뷰 신청</Link></li>
            <li><Link href="/ad-policy">광고 정책</Link></li>
            <li><Link href="/copyright-policy">저작권/초상권 정책</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} {settings.business_name}. All rights reserved.</div>
    </footer>
  );
}
