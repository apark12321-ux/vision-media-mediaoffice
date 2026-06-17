import Link from 'next/link';
import { getPublicSiteSettings } from '@/lib/data/public';

function hasValue(value?: string | null) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return Boolean(normalized) && !normalized.includes('example.com') && normalized !== '000-0000-0000';
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!hasValue(value)) return null;
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
  const isPreparing = settings.media_registration_status === 'preparing';
  const representativeName = settings.representative_name ?? '박예준';
  const publisherName = settings.publisher_name ?? representativeName;
  const editorName = settings.editor_name ?? representativeName;
  const youthManager = settings.youth_protection_manager ?? representativeName;
  const privacyManager = settings.privacy_manager ?? representativeName;

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="font-serif text-2xl font-black tracking-tight text-brand-navy">{settings.site_name}</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">Everyday Economy Journal</p>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
            <Link href="/about">회사소개</Link>
            <Link href="/report">기사제보</Link>
            <Link href="/advertise">광고·제휴문의</Link>
            <Link href="/search">기사검색</Link>
            <Link href="/ethics">신문윤리강령</Link>
            <Link href="/practice-code">신문윤리실천요강</Link>
            <Link href="/youth-policy">청소년보호정책</Link>
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/copyright-policy">저작권보호정책</Link>
            <Link href="/sponsored-policy">제휴콘텐츠정책</Link>
          </nav>
        </div>

        <div className="grid gap-8 border-b border-gray-200 py-7 text-[13px] leading-7 text-gray-600 lg:grid-cols-[1.1fr_1.1fr_1fr]">
          <section>
            <h3 className="mb-2 text-sm font-black text-gray-900">매체 정보</h3>
            <InfoRow label="제호" value={settings.site_name} />
            <InfoRow label="운영사" value={settings.business_name} />
            <InfoRow label="대표자" value={representativeName} />
            <InfoRow label="발행인" value={publisherName} />
            <InfoRow label="편집인" value={editorName} />
            <InfoRow label="발행 형태" value="인터넷 기반 생활경제 전문 매체" />
            <InfoRow label="발행 주기" value="수시 발행" />
          </section>

          <section>
            <h3 className="mb-2 text-sm font-black text-gray-900">사업자 정보</h3>
            <InfoRow label="상호" value={settings.business_name} />
            <InfoRow label="사업자등록번호" value={settings.business_registration_number} />
            <InfoRow label="통신판매업신고번호" value={settings.mail_order_registration_number} />
            <InfoRow label="주소" value={settings.address} />
            <InfoRow label="이메일" value={settings.contact_email} />
            <InfoRow label="전화" value={settings.contact_phone} />
          </section>

          <section>
            <h3 className="mb-2 text-sm font-black text-gray-900">등록·책임자 정보</h3>
            {isRegistered ? (
              <>
                <InfoRow label="인터넷신문 등록번호" value={settings.media_registration_number} />
                <InfoRow label="인터넷신문 등록일" value={settings.media_registered_at} />
              </>
            ) : (
              <p className="text-gray-600">
                인터넷신문 등록번호와 등록일은 관할기관 등록 완료 후 표시됩니다.
              </p>
            )}
            {isPreparing && <p className="text-gray-600">현재 인터넷신문 등록 준비 단계입니다.</p>}
            <InfoRow label="청소년보호책임자" value={youthManager} />
            <InfoRow label="개인정보보호책임자" value={privacyManager} />
          </section>
        </div>

        <div className="pt-5 text-xs leading-6 text-gray-500">
          <p>
            생활경제저널의 모든 기사와 콘텐츠는 저작권법의 보호를 받으며, 무단 전재·복사·배포를 금지합니다.
          </p>
          <p className="mt-1">
            Copyright ⓒ {new Date().getFullYear()} {settings.site_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
