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

function Dot() {
  return <span className="mx-2 text-gray-300">|</span>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-gray-800 hover:text-gray-950">
      {children}
    </Link>
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
    <footer className="mt-20 border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-[12px] leading-6 text-gray-600 md:flex-row md:items-start md:gap-10 lg:text-[13px]">
        <div className="min-w-[150px]">
          <Link href="/" className="block text-2xl font-black leading-none tracking-tight text-gray-400">
            {settings.site_name}
          </Link>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Everyday Economy Journal</p>
        </div>

        <div className="flex-1">
          <nav className="flex flex-wrap items-center text-[13px] md:text-sm">
            <FooterLink href="/terms">회원약관</FooterLink>
            <Dot />
            <FooterLink href="/privacy">개인정보처리방침</FooterLink>
            <Dot />
            <FooterLink href="/about">회사소개</FooterLink>
            <Dot />
            <FooterLink href="/advertise">광고·제휴 안내</FooterLink>
            <Dot />
            <FooterLink href="/youth-policy">청소년보호정책</FooterLink>
            <Dot />
            <FooterLink href="/report">기사제보</FooterLink>
            <Dot />
            <FooterLink href="/press-release">보도자료</FooterLink>
            <Dot />
            <FooterLink href="/search">기사검색</FooterLink>
          </nav>

          <div className="mt-3 space-y-1 break-keep text-gray-600">
            <p>
              제호 {settings.site_name} <Dot /> 운영사 {businessName} <Dot /> 대표 {representativeName} <Dot /> 사업자등록번호 {businessRegistrationNumber} <Dot /> 통신판매업신고번호 {mailOrderRegistrationNumber}
            </p>
            <p>
              주소 {address}
              {contactPhone ? <><Dot /> 전화 {contactPhone}</> : null}
              {contactEmail ? <><Dot /> 이메일 {contactEmail}</> : null}
            </p>
            <p>
              발행인 {publisherName} <Dot /> 편집인 {editorName} <Dot /> 청소년보호책임자 {youthManager} <Dot /> 개인정보보호책임자 {privacyManager}
              {isRegistered && settings.media_registration_number ? <><Dot /> 인터넷신문 등록번호 {settings.media_registration_number}</> : null}
              {isRegistered && settings.media_registered_at ? <><Dot /> 등록일 {settings.media_registered_at}</> : null}
            </p>
            <p>
              {settings.site_name}은 독자의 취재원 보호와 뉴스 이용자의 권리 보장을 위해 반론·정정보도 및 추후보도 요청 창구를 운영한다.
            </p>
            <p>
              이 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며 무단 전재, 복사, 배포 및 재배포를 금지한다.
              <span className="ml-2 font-semibold text-gray-700">Copyright ⓒ {new Date().getFullYear()} {settings.site_name}. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
