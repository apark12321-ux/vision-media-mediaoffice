import Link from 'next/link';

const navItems = [
  ['평생교육·HRD', '/category/lifelong-education'],
  ['자격증·자기계발', '/category/career-dev'],
  ['시니어·실버교육', '/category/senior-education'],
  ['에듀테크·AI', '/category/edutech-ai'],
  ['교육기관 탐방', '/category/edu-institution'],
  ['오피니언', '/category/opinion'],
  ['공지·보도', '/category/press-release'],
  ['교육센터', '/education-center']
] as const;

export function PublicHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-6 text-center">
        <Link href="/" className="inline-flex flex-col items-center">
          <span className="font-serif text-4xl font-black tracking-[0.18em] text-slate-950 md:text-5xl">에듀저널</span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-amber-600">EDU JOURNAL</span>
          <span className="mt-2 text-xs font-medium text-gray-500">평생교육·자격증·시니어학습 전문 인터넷매체</span>
        </Link>
      </div>
      <nav className="border-t bg-slate-950 text-white">
        <div className="mx-auto flex h-11 max-w-7xl items-center gap-5 overflow-x-auto px-4 text-sm font-bold">
          <Link href="/" className="shrink-0 text-amber-300">전체기사</Link>
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="shrink-0 hover:text-amber-300">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
