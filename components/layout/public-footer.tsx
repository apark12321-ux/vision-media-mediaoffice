import Link from 'next/link';
import { getPublicSiteSettings } from '@/lib/data/public';

const OFFICIAL_BUSINESS = {
  businessName: '알고파트너스',
  representativeName: '박예준',
  businessRegistrationNumber: '450-07-03104',
  mailOrderRegistrationNumber: '제2025-인천서구-3321호',
  address: '인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 (청라동)'
};

function valueOrFallback(value: string | null | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function optionalValue(value: string | null | undefined) {
  const normalized = value?.trim();
  if (!normalized) return null;
  if (normalized === 'contact@example.com') return null;
  if (normalized === '000-0000-0000') return null;
  return normalized;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-bold text-gray-800">{label}</span>
      <span className="mx-1 text-gray-400">:</span>
      <span>{value}</span>
    </p>
  );
}

export async function PublicFooter() {
  const settings = await getPublicSiteSettings();
  const isRegistered = settings.media_registration_status === 'registered';

  const businessName = valueOrFallback(settings.business_name, OFFICIAL_BUSINESS.businessName);
  const representativeName = valueOrFallback(settings.representative_name, OFFICIAL_BUSINESS.representativeName);
  const businessRegistrationNumber = valueOrFallback(settings.business_registration_number, OFFICIAL_BUSINESS.businessRegistrationNumber);
  const mailOrderRegistrationNumber = valueOrFallback(settings.mail_order_registration_number, OFFICIAL_BUSINESS.mailOrderRegistrationNumber);
  const address = valueOrFallback(settings.address, OFFICIAL_BUSINESS.address);
  const publisherName = valueOrFallback(settings.publisher_name, representativeName);
  const editorName = valueOrFallback(settings.editor_name, representativeName);
  const youthManager = valueOrFallback(settings.youth_protection_manager, representativeName);
  const privacyManager = valueOrFallback(settings.privacy_manager, representativeName);
  const contactEmail = optionalValue(settings.contact_email);
  const contactPhone = optionalValue(settings.contact_phone);

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-lg font-black tracking-tight text-gray-950">{settings.site_name}</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Everyday Economy Journal</p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-b border-gray-200 py-4 text-xs font-semibold text-gray-700 md:text-sm">
          <Link href="/about">회사소개</Link>
          <Link href="/report">기사제보</Link>
          <Link href="/advertise">광고·제휴문의</Link>
          <Link href="/ethics">신문윤리강령</Link>
          <Link href="/practice-code">신문윤리실천요강</Link>
          <Link href="/youth-policy">청소년보호정책</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/copyright-policy">저작권보호정책</Link>
          <Link href="/sponsored-policy">제휴콘텐츠정책</Link>
        </nav>

        <div className="grid gap-6 border-b border-gray-200 py-6 text-[12px] leading-6 text-gray-600 md:grid-cols-2 lg:text-[13px]">
          <section>
            <h3 className="mb-2 text-sm font-black text-gray-950">매체 정보</h3>
            <InfoRow label="제호" value={settings.site_name} />
            <InfoRow label="발행인" value={publisherName} />
            <InfoRow label="편집인" value={editorName} />
            <InfoRow label="청소년보호책임자" value={youthManager} />
            {isRegistered && settings.media_registration_number ? <InfoRow label="인터넷신문 등록번호" value={settings.media_registration_number} /> : null}
            {isRegistered && settings.media_registered_at ? <InfoRow label="인터넷신문 등록일" value={settings.media_registered_at} /> : null}
          </section>

          <section>
            <h3 className="mb-2 text-sm font-black text-gray-950">사업자 정보</h3>
            <InfoRow label="상호" value={businessName} />
            <InfoRow label="대표자" value={representativeName} />
            <InfoRow label="사업자등록번호" value={businessRegistrationNumber} />
            <InfoRow label="통신판매업신고번호" value={mailOrderRegistrationNumber} />
            <InfoRow label="주소" value={address} />
            <InfoRow label="개인정보보호책임자" value={privacyManager} />
            {contactEmail ? <InfoRow label="이메일" value={contactEmail} /> : null}
            {contactPhone ? <InfoRow label="전화" value={contactPhone} /> : null}
          </section>
        </div>

        <div className="pt-4 text-xs leading-6 text-gray-500">
          <p>{settings.site_name}의 모든 콘텐츠는 저작권법의 보호를 받으며, 무단 전재·복사·배포 및 재배포를 금지한다.</p>
          <p className="mt-1 font-semibold text-gray-600">Copyright ⓒ {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
