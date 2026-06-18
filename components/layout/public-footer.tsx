import Link from 'next/link';

function Dot() {
  return <span className="mx-2 text-gray-300">|</span>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-gray-700 hover:text-gray-950">
      {children}
    </Link>
  );
}

export async function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-300 bg-[#f7f7f7]">
      <div className="mx-auto max-w-6xl px-4 py-7 text-[12px] leading-6 text-gray-600 lg:text-[13px]">
        <nav className="flex flex-wrap items-center border-b border-gray-300 pb-3 text-[13px] md:text-sm">
          <FooterLink href="/about">회사소개</FooterLink>
          <Dot />
          <FooterLink href="/terms">이용약관</FooterLink>
          <Dot />
          <FooterLink href="/privacy">개인정보처리방침</FooterLink>
          <Dot />
          <FooterLink href="/youth-policy">청소년보호정책</FooterLink>
          <Dot />
          <FooterLink href="/education-center">교육센터</FooterLink>
          <Dot />
          <FooterLink href="/advertise">광고·제휴문의</FooterLink>
          <Dot />
          <FooterLink href="/report">기사제보</FooterLink>
          <Dot />
          <FooterLink href="/press">보도자료</FooterLink>
          <Dot />
          <FooterLink href="/search">기사검색</FooterLink>
        </nav>

        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-[170px]">
            <Link href="/" className="block text-2xl font-black leading-none tracking-tight text-gray-500">
              에듀저널
            </Link>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">EDU JOURNAL</p>
          </div>

          <div className="flex-1 space-y-1 break-keep">
            <p>
              <strong className="text-gray-800">제호</strong> 에듀저널
              <Dot />
              <strong className="text-gray-800">운영사</strong> 알고파트너스
              <Dot />
              <strong className="text-gray-800">대표자</strong> 박예준
              <Dot />
              <strong className="text-gray-800">사업자등록번호</strong> 450-07-03104
              <Dot />
              <strong className="text-gray-800">통신판매업신고번호</strong> 제2025-인천서구-3321호
            </p>
            <p>
              <strong className="text-gray-800">인터넷신문 등록번호</strong> 임시-인천서구-0001호
              <Dot />
              <strong className="text-gray-800">등록일</strong> 2026.06.18(임시)
              <Dot />
              <strong className="text-gray-800">발행일</strong> 2026.06.18
            </p>
            <p>
              <strong className="text-gray-800">발행인</strong> 박예준
              <Dot />
              <strong className="text-gray-800">편집인</strong> 박예준
              <Dot />
              <strong className="text-gray-800">청소년보호책임자</strong> 박예준
              <Dot />
              <strong className="text-gray-800">개인정보보호책임자</strong> 박예준
            </p>
            <p>
              <strong className="text-gray-800">주소</strong> 인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 (청라동)
            </p>
            <p>
              <strong className="text-gray-800">대표전화</strong> 032-000-0000
              <Dot />
              <strong className="text-gray-800">팩스</strong> 032-000-0001
              <Dot />
              <strong className="text-gray-800">대표메일</strong> contact@edujournal.kr
              <Dot />
              <strong className="text-gray-800">제보메일</strong> news@edujournal.kr
            </p>
            <p>
              에듀저널은 평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 정보를 다루는 교육 전문 인터넷매체입니다.
              반론·정정보도 및 추후보도 요청은 대표메일 또는 기사제보 창구를 통해 접수합니다.
            </p>
            <p>
              모든 콘텐츠의 저작권은 에듀저널 또는 제공자에게 있으며, 무단 전재·복사·배포·재배포를 금지합니다.
              <span className="ml-2 font-semibold text-gray-700">Copyright ⓒ {year} 에듀저널. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
