import Link from 'next/link';

function Sep() {
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
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="mt-20 hidden border-t border-gray-300 bg-white md:block">
        <div className="relative mx-auto flex max-w-6xl gap-10 px-4 py-7 text-[12px] leading-[1.65] text-gray-600">
          <Link href="#top" className="absolute right-4 top-4 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-500">
            ▲ TOP
          </Link>

          <div className="w-[160px] shrink-0 pt-2">
            <Link href="/" className="block leading-none text-gray-400">
              <span className="block text-[13px] tracking-[-0.04em]">신속공정한 보도</span>
              <span className="mt-1 block text-[28px] font-black tracking-[-0.08em] text-gray-500">에듀저널</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">EDU JOURNAL</span>
            </Link>
          </div>

          <div className="min-w-0 flex-1 pr-10">
            <nav className="mb-2 flex flex-wrap items-center text-[13px] text-gray-900">
              <FooterLink href="/terms">이용약관</FooterLink><Sep />
              <FooterLink href="/privacy">개인정보처리방침</FooterLink><Sep />
              <FooterLink href="/about">회사소개</FooterLink><Sep />
              <FooterLink href="/contact">문의</FooterLink><Sep />
              <FooterLink href="/youth-policy">청소년보호정책</FooterLink><Sep />
              <FooterLink href="/report">기사제보</FooterLink><Sep />
              <FooterLink href="/press">보도자료 접수</FooterLink><Sep />
              <FooterLink href="/search">기사검색</FooterLink>
            </nav>

            <div className="space-y-0.5 break-keep text-gray-600">
              <p>제호 에듀저널 | 발행·운영 알고파트너스 | 대표 박예준</p>
              <p>주소 인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 | 문의 contact@edujournal.kr</p>
              <p>인터넷신문 등록번호 등록 신청 예정 | 등록일 등록 완료 후 표기 | 발행인 박예준 | 편집인 박예준 | 청소년보호책임자 박예준</p>
              <p>에듀저널은 독자와 취재원의 권리 보장을 위해 정정·반론·추후보도 요청 및 고충처리 창구를 운영합니다.</p>
              <p>사업자등록번호 450-07-03104 | 통신판매업신고번호 제2025-인천서구-3321호</p>
              <p className="pt-1 text-[11px] text-gray-500">Copyright ⓒ {year} 에듀저널. All rights reserved. 모든 콘텐츠의 무단 전재·복사·배포 및 재배포를 금합니다.</p>
            </div>
          </div>
        </div>
      </footer>
      <footer className="border-t bg-white px-4 py-5 text-center md:hidden">
        <Link href="/?view=pc" className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-black text-slate-700">
          PC버전 보기
        </Link>
      </footer>
    </>
  );
}
