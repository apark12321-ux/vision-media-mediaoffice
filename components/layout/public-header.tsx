import Link from 'next/link';

const navItems = [
  ['전체기사', '/articles'],
  ['평생교육', '/category/lifelong-education'],
  ['자격증', '/category/career-dev'],
  ['시니어교육', '/category/senior-education'],
  ['에듀테크', '/category/edutech-ai'],
  ['교육기관', '/category/edu-institution'],
  ['인터뷰', '/category/interview-people'],
  ['오피니언', '/category/opinion'],
  ['공지·보도', '/category/press-release'],
  ['기사제보', '/report']
] as const;

export function PublicHeader() {
  return (
    <header className="border-b bg-white">
      <nav className="bg-slate-950 text-white">
        <div className="mx-auto flex h-11 max-w-[1120px] items-center overflow-x-auto px-4 text-sm font-bold">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 px-3 py-3 hover:text-amber-300 first:text-amber-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
