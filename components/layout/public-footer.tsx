import Link from 'next/link';
import { getPublicSiteSettings } from '@/lib/data/public';

const OFFICIAL_BUSINESS = {
  businessName: '알고파트너스',
  representativeName: '박예준',
  businessRegistrationNumber: '450-07-03104',
  mailOrderRegistrationNumber: '제2025-인천서구-3321호',
  address: '인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 (청라동)',
  contactEmail: 'contact@example.com',
  contactPhone: '000-0000-0000'
};

function valueOrFallback(value: string | null | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
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
  const contactEmail = valueOrFallback(settings.contact_email, OFFICIAL_BUSINESS.contactEmail);
  const contactPhone = valueOrFallback(settings.contact_phone, OFFICIAL_BUSINESS.contactPhone);

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-black tracking-tight text-gray-950">{settings.site_name}</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">Everyday Economy Journal</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            {settings.site_name}은 {businessName}가 운영하는 생활경제 전문 매체다.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 border-b border-gray-200 py-5 text-sm font-semibold text-gray-700">
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

        <div className="grid gap-8 border-b border-gray-200 py-7 text-[13px] leading-7 text-gray-600 md:grid-cols-3">
          <section>
            <h3 className="mb-2 text-sm font-black text-gray-950">매체 정보</h3>
            <InfoRow label="제호" value={settings.site_name} />
            <InfoRow label="발행인" value={publisherName} />
            <InfoRow label="편집인" value={editorName} />
            <InfoRow label="청소년보호책임자" value={youthManager} />
            <InfoRow label="인터넷신문 등록번호" value={isRegistered && settings.media_registration_number ? settings.media_registration_number : '등록 후 표시'} />
            <InfoRow label="인터넷신문 등록일" value={isRegistered && settings.media_registered_at ? settings.media_registered_at : '등록 후 표시'} />
          </section>

          <section>
            <h3 className="mb-2 text-sm font-black text-gray-950">사업자 정보</h3>
            <InfoRow label="상호" value={businessName} />
            <InfoRow label="대표자" value={representativeName} />
            <InfoRow label="사업자등록번호" value={businessRegistrationNumber} />
            <InfoRow label="통신판매업신고번호" value={mailOrderRegistrationNumber} />
            <InfoRow label="주소" value={address} />
          </section>

          <section>
            <h3 className="mb-2 text-sm font-black text-gray-950">연락처</h3>
            <InfoRow label="대표 이메일" value={contactEmail} />
            <InfoRow label="대표 전화" value={contactPhone} />
            <InfoRow label="개인정보보호책임자" value={privacyManager} />
          </section>
        </div>

        <div className="space-y-2 pt-5 text-xs leading-6 text-gray-500">
          <p>
            {settings.site_name}의 모든 기사와 콘텐츠는 저작권법의 보호를 받으며, 무단 전재·복사·배포 및 재배포를 금지한다. 제휴·광고성 콘텐츠는 별도 고지 기준에 따라 표시한다.
          </p>
          <p className="font-semibold text-gray-600">Copyright ⓒ {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
