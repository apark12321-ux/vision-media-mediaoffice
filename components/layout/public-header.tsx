import Link from 'next/link';

const mainNav = [
  { href: '/articles', label: '전체기사' },
  { href: '/category/life-economy', label: '생활경제' },
  { href: '/category/local-business', label: '지역상권' },
  { href: '/category/education', label: '교육·학원' },
  { href: '/category/senior-care', label: '시니어·요양' },
  { href: '/category/health-beauty', label: '건강·뷰티' },
  { href: '/category/startup-franchise', label: '창업·프랜차이즈' },
  { href: '/category/brand-interview', label: '브랜드 인터뷰' },
  { href: '/opinion', label: '오피니언' }
];

const utilityNav = [
  { href: '/report', label: '기사제보' },
  { href: '/advertise', label: '광고문의' },
  { href: '/search', label: '기사검색' },
  { href: '/about', label: '회사소개' }
];

function getTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  }).format(new Date());
}

export function PublicHeader() {
  const today = getTodayLabel();

  return (
    <header className="border-b bg-white">
      <div className="border-b bg-slate-900 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-3">
            <span>{today}</span>
            <span className="hidden text-slate-300 sm:inline">최종편집 {new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' }).format(new Date())}</span>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-slate-200">
            {utilityNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-[1fr_320px] md:items-center">
        <Link href="/" className="inline-flex flex-col">
          <span className="font-serif text-4xl font-black tracking-tight text-brand-navy md:text-5xl">생활경제저널</span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">Everyday Economy Journal</span>
        </Link>
        <Link href="/advertise" className="hidden rounded-sm border bg-gray-50 p-4 text-center text-sm text-gray-600 hover:border-brand-blue md:block">
          <span className="block text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
          <span className="mt-1 block font-bold text-brand-navy">생활경제저널 광고·제휴 문의</span>
        </Link>
      </div>

      <nav className="border-y bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-bold text-gray-800 hover:border-brand-blue hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
