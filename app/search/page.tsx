import Link from 'next/link';

const links = [
  ['평생교육', '/category/lifelong-education'],
  ['자격증', '/category/career-dev'],
  ['시니어교육', '/category/senior-education'],
  ['에듀테크', '/category/edutech-ai'],
  ['교육기관', '/category/edu-institution'],
  ['오피니언', '/category/opinion']
] as const;

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">기사검색</h1>
      <p className="mt-4 leading-8 text-gray-700">관심 있는 교육 주제를 선택하면 관련 기사를 확인할 수 있습니다.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {links.map(([label, href]) => <Link key={href} href={href} className="border bg-white p-4 text-sm font-black text-gray-800 hover:border-brand-blue hover:text-brand-blue">{label}</Link>)}
      </div>
    </main>
  );
}
