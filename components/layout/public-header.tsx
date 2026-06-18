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
      <nav className="bg-slate-950 text-white">
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
