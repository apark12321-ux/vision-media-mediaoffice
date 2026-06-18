import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdSenseSlot } from '@/components/ads/adsense-slot';
import { ArticleBody } from '@/components/public/article-body';
import { ArticleShareTools } from '@/components/public/article-share-tools';
import { ArticleVisualCard } from '@/components/public/article-visual-card';
import { SponsoredNotice } from '@/components/public/sponsored-notice';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { getSponsoredNotice, requiresSponsoredNotice } from '@/lib/compliance/sponsored-notice';
import { formatDate } from '@/lib/utils/format';

type PublishedArticle = Awaited<ReturnType<typeof getPublishedArticles>>[number];

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function articleTypeLabel(type: string | null | undefined) {
  if (type === 'brand_interview') return '브랜드 인터뷰';
  if (type === 'sponsored') return '제휴 콘텐츠';
  if (type === 'advertorial') return '광고 콘텐츠';
  if (type === 'press_release') return '보도자료';
  return '일반기사';
}

function getArticleUrl(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://edujournal.kr';
  return `${siteUrl}/articles/${slug}`;
}

function uniqueBySlug(articles: PublishedArticle[]) {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.slug)) return false;
    seen.add(article.slug);
    return true;
  });
}

function articleImage(article: PublishedArticle) {
  return article.thumbnail_url ?? 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80';
}

function SmallNewsItem({ article, index }: { article: PublishedArticle; index?: number }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group flex gap-3 rounded-xl p-2 hover:bg-slate-50">
      {typeof index === 'number' ? <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">{index + 1}</span> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={articleImage(article)} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 group-hover:text-brand-blue">{article.title}</p>
        <p className="mt-1 text-xs text-slate-400">{article.categories?.name ?? '뉴스'} · {formatDate(article.published_at)}</p>
      </div>
    </Link>
  );
}

function NewsCard({ article }: { article: PublishedArticle }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group grid grid-cols-[96px_1fr] gap-3 border-b border-slate-100 py-3 last:border-b-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={articleImage(article)} alt="" className="h-16 w-24 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-black leading-5 text-slate-900 group-hover:text-brand-blue">{article.title}</p>
        <p className="mt-1 text-xs text-slate-400">{article.categories?.name ?? '뉴스'} · {formatDate(article.published_at)}</p>
      </div>
    </Link>
  );
}

function NewsSection({ title, articles }: { title: string; articles: PublishedArticle[] }) {
  if (!articles.length) return null;
  return (
    <section className="border-t border-slate-950 pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">{title}</h2>
        <Link href="/articles" className="text-xs font-bold text-slate-400 hover:text-brand-blue">더보기</Link>
      </div>
      <div className="grid gap-x-5 md:grid-cols-2">
        {articles.slice(0, 6).map((item) => <NewsCard key={item.id} article={item} />)}
      </div>
    </section>
  );
}

function ReaderRail() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 flex flex-col items-center gap-3 text-[11px] font-bold text-slate-400">
        {['공유', '댓글', '저장', '인쇄'].map((label) => (
          <button key={label} type="button" className="h-12 w-12 rounded-full border border-slate-200 bg-white shadow-sm hover:border-brand-blue hover:text-brand-blue">{label}</button>
        ))}
      </div>
    </aside>
  );
}

function Sidebar({ latest, popular }: { latest: PublishedArticle[]; popular: PublishedArticle[] }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT} className="rounded-2xl border border-slate-200 bg-white p-3" style={{ display: 'block', minHeight: 250 }} />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">최신기사</h2>
          <Link href="/articles" className="text-xs font-bold text-slate-400 hover:text-brand-blue">전체보기</Link>
        </div>
        <div className="space-y-2">{latest.slice(0, 5).map((item) => <SmallNewsItem key={item.id} article={item} />)}</div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">많이 본 뉴스</h2>
          <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-black text-brand-blue">LIVE</span>
        </div>
        <div className="space-y-2">{popular.slice(0, 6).map((item, index) => <SmallNewsItem key={item.id} article={item} index={index} />)}</div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-black tracking-[-0.04em] text-slate-950">뉴스룸 안내</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">에듀저널은 자체 기획 기사와 권리 확인 이미지를 기준으로 발행한다.</p>
        <Link href="/report" className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-brand-blue">기사제보</Link>
      </section>
    </aside>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = uniqueBySlug(await getPublishedArticles());
  const latest = all.filter((item) => item.slug !== article.slug).slice(0, 8);
  const popular = all.filter((item) => item.slug !== article.slug).slice(3, 11);
  const related = all.filter((item) => item.categories?.slug === article.categories?.slug && item.slug !== article.slug).slice(0, 4);
  const sponsoredNotice = requiresSponsoredNotice(article) ? getSponsoredNotice(article.article_type) : null;

  return (
    <div className="bg-white">
      <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT} className="mx-auto my-4 max-w-5xl border-y border-slate-100 py-3" style={{ display: 'block', minHeight: 90 }} />
      <main className="mx-auto grid max-w-[1180px] gap-8 px-4 py-6 lg:grid-cols-[56px_minmax(0,760px)_320px] xl:grid-cols-[64px_minmax(0,780px)_330px]">
        <ReaderRail />
        <article className="min-w-0">
          <nav className="mb-5 text-xs font-bold text-slate-400">
            <Link href="/" className="hover:text-brand-blue">홈</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${article.categories?.slug ?? ''}`} className="hover:text-brand-blue">{article.categories?.name ?? '뉴스'}</Link>
          </nav>
          <div className="border-b border-slate-200 pb-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-black text-brand-blue">{article.categories?.name ?? '교육뉴스'}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{articleTypeLabel(article.article_type)}</span>
            </div>
            <h1 className="text-[24px] font-black leading-[1.22] tracking-[-0.06em] text-slate-950 md:text-[29px] lg:text-[31px]">{article.title}</h1>
            {article.subtitle ? <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{article.subtitle}</p> : null}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span>{article.author_name ?? '에듀저널 편집부'}</span>
              <span>입력 {formatDate(article.published_at)}</span>
            </div>
          </div>
          {sponsoredNotice ? <SponsoredNotice notice={sponsoredNotice} className="mt-6" /> : null}
          <ArticleVisualCard article={article} className="mt-6" />
          <ArticleBody content={article.content ?? ''} className="mt-8" />
          <ArticleShareTools url={getArticleUrl(article.slug)} title={article.title} className="mt-10" />
          <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT} className="mt-8 border-y border-slate-100 py-3" style={{ display: 'block', minHeight: 120 }} />
          <div className="mt-12 space-y-10">
            <NewsSection title="관련 기사" articles={related} />
            <NewsSection title="주요 교육뉴스" articles={latest.slice(0, 8)} />
          </div>
        </article>
        <Sidebar latest={latest} popular={popular} />
      </main>
    </div>
  );
}
