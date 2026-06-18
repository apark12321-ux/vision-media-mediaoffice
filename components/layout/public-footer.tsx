import Link from 'next/link';

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
  return (
    <footer className="mt-20 border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-[12px] leading-6 text-gray-600 md:flex-row md:items-start md:gap-10 lg:text-[13px]">
        <div className="min-w-[150px]">
          <Link href="/" className="block text-2xl font-black leading-none tracking-tight text-gray-400">
            에듀저널
          </Link>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">EDU JOURNAL</p>
        </div>

        <div className="flex-1">
          <nav className="flex flex-wrap items-center text-[13px] md:text-sm">
            <FooterLink href="/terms">회원약관</FooterLink>
            <Dot />
            <FooterLink href="/privacy">개인정보처리방침</FooterLink>
            <Dot />
            <FooterLink href="/about">회사소개</FooterLink>
            <Dot />
            <FooterLink href="/education-center">교육센터</FooterLink>
            <Dot />
            <FooterLink href="/advertise">광고·제휴 안내</FooterLink>
            <Dot />
            <FooterLink href="/youth-policy">청소년보호정책</FooterLink>
            <Dot />
            <FooterLink href="/report">기사제보</FooterLink>
            <Dot />
            <FooterLink href="/search">기사검색</FooterLink>
          </nav>

          <div className="mt-3 space-y-1 break-keep text-gray-600">
            <p>
              제호 에듀저널 <Dot /> 운영사 알고파트너스 <Dot /> 대표 박예준 <Dot /> 사업자등록번호 450-07-03104 <Dot /> 통신판매업신고번호 제2025-인천서구-3321호
            </p>
            <p>주소 인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 (청라동)</p>
            <p>
              발행인 박예준 <Dot /> 편집인 박예준 <Dot /> 청소년보호책임자 박예준 <Dot /> 개인정보보호책임자 박예준
            </p>
            <p>인터넷신문 등록번호와 등록일은 등록 완료 후 표시한다.</p>
            <p>
              에듀저널은 평생교육, 자격증, 시니어 학습, 에듀테크 정보를 다루며 반론·정정보도 및 추후보도 요청 창구를 운영한다.
            </p>
            <p>
              무단 전재, 복사, 배포 및 재배포를 금지한다.
              <span className="ml-2 font-semibold text-gray-700">Copyright ⓒ {new Date().getFullYear()} 에듀저널. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
