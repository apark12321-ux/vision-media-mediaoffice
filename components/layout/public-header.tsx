import Link from 'next/link';

const nav = [
  { href: '/articles', label: '전체기사' },
  { href: '/category/life-economy', label: '생활경제' },
  { href: '/category/local-business', label: '지역상권' },
  { href: '/category/brand-interview', label: '브랜드 인터뷰' },
  { href: '/advertise', label: '광고·제휴' }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-brand-navy">생활경제저널</span>
          <span className="text-xs uppercase tracking-[0.25em] text-gray-500">Everyday Economy Journal</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/apply" className="rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue">
          브랜드 인터뷰 신청
        </Link>
      </div>
    </header>
  );
}
