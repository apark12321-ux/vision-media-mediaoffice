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

function articleTypeLabel(type: string | null | undefined) {
  if (type === 'brand_interview') return '브랜드 인터뷰';
  if (type === 'sponsored') return '제휴 콘텐츠';
  if (type === 'advertorial') return '광고 콘텐츠';
  if (type === 'press_release') return '보도자료';
  return '일반기사';
}

function getArticleUrl(slug: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://example.com';
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
  return article.thumbnail_url ?? 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80';
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
        <p className="mt-2 text-sm leading-6 text-slate-500">생활경제저널은 자체 기획 기사와 권리 확인 이미지를 기준으로 발행한다.</p>
        <Link href="/report" className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-brand-blue">기사제보</Link>
      </section>
    </aside>
  );
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, latestArticles] = await Promise.all([getArticleBySlug(slug), getPublishedArticles(80)]);
  if (!article) notFound();

  const categoryName = article.categories?.name ?? '미분류';
  const notice = requiresSponsoredNotice(article.article_type, article.is_sponsored) ? getSponsoredNotice(article.article_type, article.sponsored_notice) : null;
  const sidebarArticles = uniqueBySlug(latestArticles.filter((item) => item.slug !== article.slug));
  const relatedArticles = sidebarArticles.filter((item) => item.categories?.slug === article.categories?.slug);
  const fallbackRelatedArticles = relatedArticles.length ? relatedArticles : sidebarArticles;
  const articleUrl = getArticleUrl(article.slug);
  const inputDate = formatDate(article.published_at);
  const updatedDate = formatDate(article.updated_at);

  return (
    <main className="bg-[#f5f7fa] py-6 md:py-8">
      <div className="mx-auto max-w-[1220px] px-4">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="font-bold hover:text-brand-blue">생활경제저널</Link><span>/</span><Link href="/articles" className="hover:text-brand-blue">전체기사</Link><span>/</span>
          {article.categories?.slug ? <Link href={`/category/${article.categories.slug}`} className="font-bold text-slate-800 hover:text-brand-blue">{categoryName}</Link> : <span className="font-bold text-slate-800">{categoryName}</span>}
        </div>
        <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT} className="mb-5 rounded-2xl border border-slate-200 bg-white p-3" style={{ display: 'block', minHeight: 90 }} />
        <div className="grid gap-6 lg:grid-cols-[56px_minmax(0,720px)_320px] xl:grid-cols-[64px_minmax(0,760px)_330px]">
          <ReaderRail />
          <div className="min-w-0 space-y-7">
            <article className="border border-slate-200 bg-white shadow-sm">
              <header className="px-5 pb-5 pt-6 md:px-8 md:pt-8">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-black"><span className="text-brand-blue">{categoryName}</span><span className="text-slate-300">|</span><span className="text-slate-500">{articleTypeLabel(article.article_type)}</span>{article.is_sponsored && <span className="rounded-full bg-brand-gold/15 px-2.5 py-1 text-brand-gold">제휴표시</span>}</div>
                <h1 className="text-[24px] font-black leading-[1.32] tracking-[-0.04em] text-slate-950 md:text-[29px] lg:text-[31px]">{article.title}</h1>
                {article.subtitle && <p className="mt-3 text-[15px] leading-7 tracking-[-0.02em] text-slate-500 md:text-base">{article.subtitle}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-3 text-[13px] text-slate-500"><p><span className="font-bold text-slate-900">{article.author_name ?? '편집부'}</span> 기자</p><p>입력 {inputDate}</p><p>수정 {updatedDate}</p><p>{categoryName}</p></div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><Link href="/report" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-brand-blue hover:text-brand-blue">기사제보</Link><ArticleShareTools title={article.title} url={articleUrl} /></div>
              </header>
              {notice && <div className="px-5 md:px-8"><SponsoredNotice notice={notice} /></div>}
              <div className="px-5 md:px-8"><ArticleVisualCard article={article} categoryName={categoryName} /></div>
              {article.summary && <section className="mx-5 mt-6 border-l-4 border-brand-blue bg-slate-50 px-5 py-4 md:mx-8"><h2 className="mb-1 text-xs font-black text-brand-blue">핵심 요약</h2><p className="text-[15px] leading-7 text-slate-700">{article.summary}</p></section>}
              <div className="px-5 pb-8 pt-7 md:px-8"><ArticleBody content={article.content} summary={article.summary} articleType={article.article_type} categoryName={categoryName} /></div>
              <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT} className="mx-5 mb-6 rounded-2xl border border-slate-200 bg-white p-3 md:mx-8" style={{ display: 'block', minHeight: 120 }} />
              <footer className="border-t border-slate-100 bg-slate-50 px-5 py-6 md:px-8">
                <div className="text-sm leading-7 text-slate-600"><p className="font-black text-slate-950">&lt;저작권자 ⓒ 생활경제저널 무단전재 및 재배포 금지&gt;</p><p className="mt-1">본 기사의 내용과 사진, 그래픽 등 모든 저작물은 생활경제저널의 허락 없이 전재·복사·배포할 수 없습니다.</p><p>기사제보 및 보도자료 접수: <Link href="/report" className="font-bold text-brand-blue">기사제보 바로가기</Link></p></div>
                {article.tags?.length ? <div className="mt-5 flex flex-wrap gap-2">{article.tags.map((tag) => <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:border-brand-blue hover:text-brand-blue">#{tag}</Link>)}</div> : null}
              </footer>
            </article>
            <NewsSection title="관련기사" articles={fallbackRelatedArticles.slice(0, 6)} />
            <NewsSection title="오늘의 주요 생활경제 뉴스" articles={sidebarArticles.slice(0, 6)} />
            <AdSenseSlot slot={process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT} className="rounded-2xl border border-slate-200 bg-white p-3" style={{ display: 'block', minHeight: 120 }} />
            <NewsSection title="뉴스 PICK" articles={sidebarArticles.slice(6, 12)} />
          </div>
          <Sidebar latest={sidebarArticles.slice(0, 8)} popular={sidebarArticles.slice(3, 12)} />
        </div>
      </div>
    </main>
  );
}
