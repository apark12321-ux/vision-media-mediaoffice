import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

export default async function HomePage() {
  const articles = await getPublishedArticles(12);
  const hero = articles[0];

  return (
    <main className="bg-gray-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-4xl font-black text-slate-950">에듀저널</h1>
          <p className="mt-2 text-sm font-bold tracking-[0.25em] text-gray-500">EDU JOURNAL</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <div className="border bg-white p-6">
          {hero ? (
            <Link href={`/articles/${hero.slug}`} className="group block">
              <h2 className="text-3xl font-black leading-tight text-slate-950 group-hover:text-amber-600">{hero.title}</h2>
              {hero.thumbnail_url ? <img src={hero.thumbnail_url} alt="" className="mt-5 aspect-[16/9] w-full object-cover" /> : null}
              <p className="mt-4 line-clamp-4 text-base leading-7 text-gray-600">{hero.summary}</p>
              <p className="mt-3 text-xs text-gray-500">{hero.author_name} · {formatDate(hero.published_at)}</p>
            </Link>
          ) : <p className="text-sm text-gray-500">기사를 준비 중입니다.</p>}
        </div>

        <aside className="border bg-white p-5">
          <h2 className="border-b pb-2 text-lg font-black text-slate-900">최신기사</h2>
          <div className="mt-3 divide-y">
            {articles.slice(1, 8).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="block py-3">
                <p className="line-clamp-2 text-sm font-bold leading-6 text-slate-900 hover:text-amber-600">{article.title}</p>
                <p className="mt-1 text-xs text-gray-500">{formatDate(article.published_at)}</p>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
