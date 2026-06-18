import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

const categoryCards = [
  ['평생교육·HRD', 'lifelong-education'],
  ['자격증·자기계발', 'career-dev'],
  ['시니어·실버교육', 'senior-education'],
  ['에듀테크·AI', 'edutech-ai'],
  ['교육기관 탐방', 'edu-institution'],
  ['오피니언', 'opinion']
] as const;

export default async function HomePage() {
  const articles = await getPublishedArticles(18);
  const hero = articles[0];
  const latest = articles.slice(1, 7);
  const ranking = articles.slice(0, 5);

  return (
    <main className="bg-gray-50 text-slate-800">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-gray-500 flex justify-between">
          <span>발행일자 2026년 06월 18일</span>
          <span className="font-bold text-amber-600">평생교육·자격증·에듀테크 전문 미디어</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="border bg-white p-5">
            {hero ? (
              <Link href={`/articles/${hero.slug}`} className="group block">
                <p className="mb-2 text-xs font-black text-amber-600">HEADLINE</p>
                <h1 className="text-2xl font-black leading-tight text-slate-950 group-hover:text-amber-600 md:text-3xl">{hero.title}</h1>
                <div className="mt-4 grid gap-4 md:grid-cols-[260px_1fr]">
                  {hero.thumbnail_url ? <img src={hero.thumbnail_url} alt="" className="aspect-[4/3] w-full object-cover" /> : null}
                  <div>
                    <p className="line-clamp-5 text-sm leading-7 text-gray-650">{hero.summary}</p>
                    <p className="mt-4 text-xs text-gray-500">{hero.author_name} · {formatDate(hero.published_at)}</p>
                  </div>
                </div>
              </Link>
            ) : <p className="text-sm text-gray-500">기사를 준비 중입니다.</p>}
          </div>

          <div className="mt-5 border bg-white p-5">
            <h2 className="border-l-4 border-amber-500 pl-3 text-sm font-black">에듀저널 최신 동향</h2>
            <div className="mt-4 divide-y">
              {latest.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="flex items-center justify-between gap-4 py-3 hover:bg-gray-50">
                  <div>
                    <p className="line-clamp-1 text-sm font-bold text-slate-900 hover:text-amber-600">{article.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{article.categories?.name} · {formatDate(article.published_at)}</p>
                  </div>
                  <span className="hidden text-xs text-gray-400 md:block">더보기</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="col-span-12 space-y-5 lg:col-span-4">
          <div className="border bg-slate-950 p-5 text-white">
            <p className="text-xs font-black text-amber-300">EDU JOURNAL FOCUS</p>
            <h2 className="mt-2 text-xl font-black leading-tight">평생교육원·교육기관 소식을 전문적으로 기록한다</h2>
            <p className="mt-3 text-xs leading-6 text-slate-300">교육 정책, 성인학습, 자격증, 시니어 교육, 에듀테크 이슈를 한곳에서 정리한다.</p>
          </div>

          <div className="border bg-white p-5">
            <h2 className="border-b pb-2 text-lg font-black text-slate-900">많이 본 뉴스</h2>
            <div className="mt-3 space-y-3">
              {ranking.map((article, index) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-black text-slate-700">{index + 1}</span>
                  <p className="line-clamp-2 text-sm font-bold leading-6 text-slate-900 hover:text-amber-600">{article.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map(([name, slug], index) => {
            const article = articles[index % Math.max(articles.length, 1)];
            return (
              <Link key={slug} href={`/category/${slug}`} className="overflow-hidden border bg-white hover:border-amber-400">
                <div className="bg-slate-950 px-4 py-2 text-xs font-black text-white">
                  {name} <span className="float-right text-amber-300">더보기 +</span>
                </div>
                <div className="flex gap-3 p-4">
                  {article?.thumbnail_url ? <img src={article.thumbnail_url} alt="" className="h-20 w-24 object-cover" /> : null}
                  <div>
                    <p className="line-clamp-3 text-sm font-bold leading-6 text-slate-900">{article?.title ?? `${name} 주요 기사`}</p>
                    <p className="mt-1 text-xs text-gray-500">에듀저널 편집부</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
