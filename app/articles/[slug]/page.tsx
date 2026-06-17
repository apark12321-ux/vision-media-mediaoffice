import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/public/article-body';
import { ArticleShareTools } from '@/components/public/article-share-tools';
import { ArticleVisualCard } from '@/components/public/article-visual-card';
import { SponsoredNotice } from '@/components/public/sponsored-notice';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { getSponsoredNotice, requiresSponsoredNotice } from '@/lib/compliance/sponsored-notice';
import { formatDate } from '@/lib/utils/format';

type PublishedArticle = Awaited<ReturnType<typeof getPublishedArticles>>[number];

function articleTypeLabel(type: string | null | undefined) {
  switch (type) {
    case 'brand_interview':
      return '브랜드 인터뷰';
    case 'sponsored':
      return '제휴 콘텐츠';
    case 'advertorial':
      return '광고 콘텐츠';
    case 'press_release':
      return '보도자료';
    default:
      return '일반기사';
  }
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
    <Link href={`/articles/${article.slug}`} className="group flex gap-3 rounded-2xl p-2 transition hover:bg-slate-50">
      {typeof index === 'number' ? (
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500 group-hover:bg-brand-blue group-hover:text-white">
          {index + 1}
        </span>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={articleImage(article)} alt="" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 group-hover:text-brand-blue">{article.title}</p>
        <p className="mt-1 text-xs text-slate-400">{article.categories?.name ?? '뉴스'} · {formatDate(article.published_at)}</p>
      </div>
    </Link>
  );
}

function ModernCard({ article }: { article: PublishedArticle }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={articleImage(article)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>{article.categories?.name ?? '뉴스'}</span>
          <span>·</span>
          <span>{formatDate(article.published_at)}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-black leading-6 tracking-[-0.03em] text-slate-950 group-hover:text-brand-blue">{article.title}</h3>
        {article.summary ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{article.summary}</p> : null}
      </div>
    </Link>
  );
}

function NewsSection({ title, description, articles }: { title: string; description?: string; articles: PublishedArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        <Link href="/articles" className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-brand-blue hover:text-brand-blue">더보기</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((item) => <ModernCard key={item.id} article={item} />)}
      </div>
    </section>
  );
}

function MinimalTextList({ title, articles }: { title: string; articles: PublishedArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-black tracking-[-0.03em] text-slate-950">{title}</h2>
      <div className="space-y-1">
        {articles.slice(0, 6).map((item, index) => (
          <Link key={item.id} href={`/articles/${item.slug}`} className="group flex gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50">
            <span className="w-5 shrink-0 text-sm font-black text-slate-300 group-hover:text-brand-blue">{index + 1}</span>
            <span className="line-clamp-2 text-sm font-bold leading-6 text-slate-800 group-hover:text-brand-blue">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Sidebar({ latest, popular }: { latest: PublishedArticle[]; popular: PublishedArticle[] }) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">최신기사</h2>
          <Link href="/articles" className="text-xs font-bold text-slate-400 hover:text-brand-blue">전체보기</Link>
        </div>
        <div className="space-y-2">
          {latest.slice(0, 5).map((item) => <SmallNewsItem key={item.id} article={item} />)}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">많이 본 뉴스</h2>
          <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-black text-brand-blue">LIVE</span>
        </div>
        <div className="space-y-2">
          {popular.slice(0, 6).map((item, index) => <SmallNewsItem key={item.id} article={item} index={index} />)}
        </div>
      </section>

      <Link href="/advertise" className="block overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-navy to-brand-blue p-6 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-brand-gold">Brand Partnership</span>
        <strong className="mt-4 block text-2xl font-black tracking-[-0.05em]">브랜드 인터뷰·제휴 콘텐츠</strong>
        <span className="mt-3 block text-sm leading-6 text-white/80">생활경제저널과 함께 신뢰 기반 브랜드 콘텐츠를 발행하세요.</span>
      </Link>
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
  const relatedArticles = sidebarArticles.filter((item) => item.categories?.slug === article.categories?.slug).slice(0, 6);
  const fallbackRelatedArticles = relatedArticles.length ? relatedArticles : sidebarArticles.slice(0, 6);
  const articleUrl = getArticleUrl(article.slug);
  const inputDate = formatDate(article.published_at);
  const updatedDate = formatDate(article.updated_at);
  const groupedSections = ['생활경제', '지역상권', '교육·학원', '시니어·요양', '건강·뷰티', '창업·프랜차이즈', '브랜드 인터뷰', '오피니언', '보도자료'].map((name) => ({
    name,
    articles: sidebarArticles.filter((item) => item.categories?.name === name).slice(0, 6),
  })).filter((section) => section.articles.length > 0);

  return (
    <main className="bg-slate-50 py-8 md:py-10">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="font-bold hover:text-brand-blue">생활경제저널</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-brand-blue">전체기사</Link>
          <span>/</span>
          {article.categories?.slug ? (
            <Link href={`/category/${article.categories.slug}`} className="font-bold text-slate-800 hover:text-brand-blue">{categoryName}</Link>
          ) : (
            <span className="font-bold text-slate-800">{categoryName}</span>
          )}
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,760px)_340px]">
          <div className="min-w-0 space-y-7">
            <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <header className="px-5 pb-6 pt-6 md:px-8 md:pt-8">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-black">
                  <span className="rounded-full bg-brand-navy px-3 py-1.5 text-white">{categoryName}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">{articleTypeLabel(article.article_type)}</span>
                  {article.is_sponsored && <span className="rounded-full bg-brand-gold/15 px-3 py-1.5 text-brand-gold">제휴표시</span>}
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-[-0.06em] text-slate-950 md:text-5xl">
                  {article.title}
                </h1>
                {article.subtitle && <p className="mt-4 text-lg leading-8 tracking-[-0.02em] text-slate-600">{article.subtitle}</p>}

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-4 text-sm text-slate-500">
                  <p><span className="font-bold text-slate-900">{article.author_name ?? '편집부'}</span> 기자</p>
                  <p>입력 {inputDate}</p>
                  <p>수정 {updatedDate}</p>
                  <p>{categoryName}</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <Link href="/report" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:border-brand-blue hover:text-brand-blue">
                    기사제보
                  </Link>
                  <ArticleShareTools title={article.title} url={articleUrl} />
                </div>
              </header>

              {notice && <div className="px-5 md:px-8"><SponsoredNotice notice={notice} /></div>}

              <div className="px-5 md:px-8">
                <ArticleVisualCard article={article} categoryName={categoryName} />
              </div>

              {article.summary && (
                <section className="mx-5 mt-7 rounded-3xl bg-slate-50 px-5 py-5 md:mx-8">
                  <h2 className="mb-2 text-sm font-black text-brand-blue">핵심 요약</h2>
                  <p className="text-base leading-8 text-slate-700">{article.summary}</p>
                </section>
              )}

              <div className="px-5 pb-8 pt-8 md:px-8">
                <ArticleBody content={article.content} summary={article.summary} articleType={article.article_type} categoryName={categoryName} />
              </div>

              <footer className="border-t border-slate-100 bg-slate-50 px-5 py-6 md:px-8">
                <div className="text-sm leading-7 text-slate-600">
                  <p className="font-black text-slate-950">&lt;저작권자 ⓒ 생활경제저널 무단전재 및 재배포 금지&gt;</p>
                  <p className="mt-1">본 기사의 내용과 사진, 그래픽 등 모든 저작물은 생활경제저널의 허락 없이 전재·복사·배포할 수 없습니다.</p>
                  <p>기사제보 및 보도자료 접수: <Link href="/report" className="font-bold text-brand-blue">기사제보 바로가기</Link></p>
                </div>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                  <p className="font-black text-slate-950">{article.author_name ?? '편집부'} 기자</p>
                  <p className="mt-1">생활경제저널은 생활경제 현장과 지역 브랜드의 변화를 데이터와 현장 맥락으로 기록합니다.</p>
                </div>

                {article.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:border-brand-blue hover:text-brand-blue">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </footer>
            </article>

            <NewsSection title="관련기사" description={`${categoryName} 분야에서 함께 읽을 만한 기사입니다.`} articles={fallbackRelatedArticles} />
            <NewsSection title="오늘의 주요 생활경제 뉴스" description="생활경제저널 편집부가 고른 주요 흐름입니다." articles={sidebarArticles.slice(0, 6)} />

            <div className="grid gap-5 md:grid-cols-2">
              <MinimalTextList title="생활경제 주요뉴스" articles={sidebarArticles.filter((item) => item.categories?.name === '생활경제')} />
              <MinimalTextList title="지역상권 주요뉴스" articles={sidebarArticles.filter((item) => item.categories?.name === '지역상권')} />
            </div>

            {groupedSections.slice(0, 4).map((section) => (
              <NewsSection key={section.name} title={section.name} articles={section.articles} />
            ))}
          </div>

          <Sidebar latest={sidebarArticles.slice(0, 8)} popular={sidebarArticles.slice(3, 12)} />
        </div>
      </div>
    </main>
  );
}
