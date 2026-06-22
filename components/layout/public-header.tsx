import Link from 'next/link';

const navItems = [
  ['최신', '/articles'],
  ['평생교육', '/category/lifelong-education'],
  ['자격증', '/category/career-dev'],
  ['시니어교육', '/category/senior-education'],
  ['에듀테크', '/category/edutech-ai'],
  ['교육기관', '/category/edu-institution'],
  ['인터뷰', '/category/interview-people'],
  ['오피니언', '/category/opinion'],
  ['정책·보도', '/category/press-release']
] as const;

const utilityLinks = [
  ['기사제보', '/report'],
  ['보도자료 접수', '/press'],
  ['문의하기', '/contact'],
  ['회사소개', '/about']
] as const;

export function PublicHeader() {
  return (
    <header className="border-b bg-white">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-2 px-4 py-2 text-[12px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-slate-700">2026.06.18(목)</span>
            <span>교육 현장 · 정책 · 기관 소식</span>
            <span className="hidden md:inline">서울 24℃ · 흐림</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold">
            {utilityLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-blue-700">{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between">
        <Link href="/" className="block">
          <p className="text-[11px] font-black tracking-[0.32em] text-blue-700">EDUCATION INDUSTRY MEDIA</p>
          <div className="mt-1 flex items-end gap-3">
            <span className="text-[40px] font-black leading-none tracking-[-0.08em] text-slate-950 md:text-[52px]">에듀저널</span>
            <span className="pb-1 text-[13px] font-black tracking-[0.25em] text-slate-400">EDU JOURNAL</span>
          </div>
          <p className="mt-2 text-[13px] font-semibold text-slate-500">매일 만나는 교육 산업·평생학습·에듀테크 소식</p>
        </Link>
        <form action="/search" className="flex h-10 w-full max-w-[360px] overflow-hidden border border-slate-300 bg-white">
          <input name="q" aria-label="기사 검색" placeholder="검색어를 입력해주세요" className="min-w-0 flex-1 px-3 text-[13px] outline-none" />
          <button className="bg-slate-950 px-4 text-[13px] font-black text-white" type="submit">검색</button>
        </form>
      </div>

      <nav className="border-y border-slate-950 bg-white text-slate-950">
        <div className="mx-auto flex h-12 max-w-[1120px] items-center overflow-x-auto px-4 text-[15px] font-black">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 border-r border-slate-200 px-4 py-3 hover:text-blue-700 first:border-l"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
