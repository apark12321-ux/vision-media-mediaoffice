import Link from 'next/link';
import { ArticleCard } from '@/components/public/article-card';
import { getCategories, getPublishedArticles } from '@/lib/data/public';
import type { Article } from '@/types/database';
import { formatDate } from '@/lib/utils/format';

function NewsListItem({ article, index }: { article: Article; index?: number }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group flex gap-3 border-b py-3 last:border-b-0">
      {typeof index === 'number' && <span className="mt-0.5 w-6 shrink-0 text-sm font-black text-brand-gold">{index + 1}</span>}
      <div>
        <p className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 group-hover:text-brand-blue">{article.title}</p>
        <p className="mt-1 text-xs text-gray-500">{article.categories?.name ?? '미분류'} · {formatDate(article.published_at)}</p>
      </div>
    </Link>
  );
}

function SectionBlock({ title, href, articles }: { title: string; href: string; articles: Article[] }) {
  return (
    <section className="border-t-2 border-brand-navy pt-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-brand-navy">{title}</h2>
        <Link href={href} className="text-xs font-bold text-gray-500 hover:text-brand-blue">더보기</Link>
      </div>
      {articles.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => <ArticleCard key={article.id} article={article} compact />)}
        </div>
      ) : (
        <div className="rounded-sm border bg-gray-50 p-6 text-sm text-gray-500">발행 준비 중입니다.</div>
      )}
    </section>
  );
}

export default async function HomePage() {
  const [articles, categories] = await Promise.all([getPublishedArticles(40), getCategories()]);
  const topArticle = articles[0];
  const mainArticles = articles.slice(1, 5);
  const latestArticles = articles.slice(0, 8);
  const brandArticles = articles.filter((article) => article.article_type === 'brand_interview' || article.categories?.slug === 'brand-interview');
  const normalCategories = categories.filter((category) => !['brand-interview'].includes(category.slug));

  return (
    <main>
      <section className="border-b bg-gray-50">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 text-sm">
          <span className="rounded-sm bg-brand-navy px-2 py-1 text-xs font-black text-white">주요뉴스</span>
          <p className="line-clamp-1 font-medium text-gray-700">생활경제저널은 생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 뉴스를 전합니다.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1.15fr_0.85fr_320px]">
        <div>
          <div className="mb-3 flex items-center justify-between border-b-2 border-brand-navy pb-2">
            <h1 className="text-xl font-black text-brand-navy">메인 뉴스</h1>
            <Link href="/articles" className="text-xs font-bold text-gray-500 hover:text-brand-blue">전체기사</Link>
          </div>
          {topArticle ? (
            <Link href={`/articles/${topArticle.slug}`} className="group block">
              <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 text-sm font-bold text-slate-400">
                {topArticle.thumbnail_url ? <img src={topArticle.thumbnail_url} alt="" className="h-full w-full object-cover" /> : '생활경제저널'}
              </div>
              <p className="mt-4 text-xs font-bold text-brand-gold">{topArticle.categories?.name ?? '미분류'}</p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950 group-hover:text-brand-blue">{topArticle.title}</h2>
              {topArticle.summary && <p className="mt-3 line-clamp-3 text-base leading-7 text-gray-600">{topArticle.summary}</p>}
              <p className="mt-3 text-xs text-gray-500">{topArticle.author_name} · {formatDate(topArticle.published_at)}</p>
            </Link>
          ) : (
            <div className="rounded-sm border bg-white p-10 text-center text-gray-500">발행된 기사가 없습니다.</div>
          )}
        </div>

        <div>
          <div className="mb-3 border-b-2 border-brand-navy pb-2">
            <h2 className="text-xl font-black text-brand-navy">주요 기사</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {mainArticles.length ? mainArticles.map((article) => <ArticleCard key={article.id} article={article} compact />) : <p className="rounded-sm border bg-gray-50 p-6 text-sm text-gray-500">주요 기사를 준비 중입니다.</p>}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="border-t-2 border-brand-navy pt-3">
            <h2 className="text-lg font-black text-brand-navy">최신기사</h2>
            <div className="mt-2">
              {latestArticles.slice(0, 6).map((article) => <NewsListItem key={article.id} article={article} />)}
            </div>
          </section>

          <section className="border-t-2 border-brand-navy pt-3">
            <h2 className="text-lg font-black text-brand-navy">많이 본 뉴스</h2>
            <div className="mt-2">
              {latestArticles.slice(0, 5).map((article, index) => <NewsListItem key={article.id} article={article} index={index} />)}
            </div>
          </section>

          <Link href="/advertise" className="block border bg-gray-50 p-5 text-center hover:border-brand-blue">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
            <strong className="mt-2 block text-lg text-brand-navy">광고·제휴 문의</strong>
            <span className="mt-2 block text-sm leading-6 text-gray-600">브랜드 인터뷰, 배너 광고, 기획 특집 문의</span>
          </Link>
        </aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-8">
        {normalCategories.map((category) => (
          <SectionBlock
            key={category.id}
            title={category.name}
            href={`/category/${category.slug}`}
            articles={articles.filter((article) => article.categories?.slug === category.slug)}
          />
        ))}
      </section>

      <section className="border-y bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4 flex items-center justify-between border-b-2 border-brand-navy pb-2">
            <h2 className="text-xl font-black text-brand-navy">브랜드 인터뷰 · 제휴 콘텐츠</h2>
            <Link href="/category/brand-interview" className="text-xs font-bold text-gray-500 hover:text-brand-blue">더보기</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {brandArticles.length ? brandArticles.slice(0, 3).map((article) => <ArticleCard key={article.id} article={article} compact />) : <p className="rounded-sm border bg-white p-6 text-sm text-gray-500">브랜드 인터뷰 기사를 준비 중입니다.</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <Link href="/report" className="border p-6 hover:border-brand-blue">
          <h2 className="text-lg font-black text-brand-navy">기사제보</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">생활경제 현장의 제보와 보도자료를 접수합니다.</p>
        </Link>
        <Link href="/sponsored-policy" className="border p-6 hover:border-brand-blue">
          <h2 className="text-lg font-black text-brand-navy">제휴 콘텐츠 안내</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">광고·협찬·제휴 콘텐츠는 독자가 식별할 수 있도록 표시합니다.</p>
        </Link>
        <Link href="/ethics" className="border p-6 hover:border-brand-blue">
          <h2 className="text-lg font-black text-brand-navy">신문 윤리강령</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">정확성, 공정성, 책임 있는 콘텐츠 운영 원칙을 안내합니다.</p>
        </Link>
      </section>
    </main>
  );
}
