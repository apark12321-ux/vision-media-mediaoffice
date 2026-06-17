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

function MiniArticleCard({ article, compact = false }: { article: PublishedArticle; compact?: boolean }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="overflow-hidden bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={articleImage(article)} alt="" className={compact ? 'h-20 w-full object-cover transition group-hover:scale-105' : 'h-28 w-full object-cover transition group-hover:scale-105'} />
      </div>
      <p className="mt-2 line-clamp-2 text-[13px] font-bold leading-5 text-gray-950 group-hover:text-brand-blue">{article.title}</p>
      <p className="mt-1 text-[11px] text-gray-400">{article.categories?.name ?? '생활경제저널'}</p>
    </Link>
  );
}

function ListArticle({ article, index }: { article: PublishedArticle; index?: number }) {
  return (
    <Link href={`/articles/${article.slug}`} className="flex gap-3 border-b py-3 hover:bg-gray-50">
      {typeof index === 'number' ? <span className="w-5 shrink-0 text-base font-black text-brand-gold">{index + 1}</span> : null}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] font-bold leading-5 text-gray-900 hover:text-brand-blue">{article.title}</p>
        <p className="mt-1 text-[11px] text-gray-400">{article.categories?.name ?? '뉴스'} · {formatDate(article.published_at)}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={articleImage(article)} alt="" className="h-14 w-20 shrink-0 object-cover" />
    </Link>
  );
}

function NewsStrip({ title, articles }: { title: string; articles: PublishedArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="border-t-2 border-gray-950 pt-3">
      <div className="mb-3 flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-black tracking-[-0.03em] text-gray-950">{title}</h2>
        <Link href="/articles" className="text-xs font-bold text-gray-500 hover:text-brand-blue">더보기</Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {articles.slice(0, 6).map((item) => <MiniArticleCard key={item.id} article={item} />)}
      </div>
    </section>
  );
}

function TextNewsBox({ title, articles }: { title: string; articles: PublishedArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="border bg-white p-4">
      <div className="mb-2 flex items-center justify-between border-b pb-2">
        <h2 className="text-base font-black text-gray-950">{title}</h2>
        <span className="text-xs text-gray-400">뉴스</span>
      </div>
      <div>
        {articles.slice(0, 5).map((item, index) => (
          <Link key={item.id} href={`/articles/${item.slug}`} className="flex gap-2 border-b py-2 last:border-b-0">
            <span className="mt-0.5 text-xs font-black text-brand-gold">{index + 1}</span>
            <span className="line-clamp-2 text-[13px] font-bold leading-5 text-gray-800 hover:text-brand-blue">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LongRankingPanel({ title, articles, offset = 0 }: { title: string; articles: PublishedArticle[]; offset?: number }) {
  const items = articles.slice(offset, offset + 5);
  if (!items.length) return null;

  return (
    <section className="border bg-white p-3">
      <div className="mb-2 flex items-center justify-between border-b pb-2">
        <h2 className="text-sm font-black text-brand-navy">{title}</h2>
        <span className="rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-bold text-white">실시간</span>
      </div>
      <ol>
        {items.map((item, index) => (
          <li key={item.id} className="border-b py-2 last:border-b-0">
            <Link href={`/articles/${item.slug}`} className="flex gap-2 text-[12px] font-bold leading-5 text-gray-800 hover:text-brand-blue">
              <span className="w-5 shrink-0 text-center font-black text-brand-gold">{index + 1}</span>
              <span className="line-clamp-2">{item.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Sidebar({ articles }: { articles: PublishedArticle[] }) {
  const repeated = articles.length ? articles : [];

  return (
    <aside className="space-y-4">
      <section className="border-t-2 border-gray-950 bg-white pt-3">
        <div className="flex items-center justify-between border-b px-1 pb-2">
          <h2 className="text-lg font-black text-gray-950">포토뉴스</h2>
          <div className="flex gap-1 text-xs text-gray-400">
            <span className="border px-1.5">‹</span>
            <span className="border px-1.5">›</span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1">
          {repeated.slice(0, 4).map((item) => (
            <Link key={item.id} href={`/articles/${item.slug}`} className="group relative block overflow-hidden bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={articleImage(item)} alt="" className="h-28 w-full object-cover transition group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/65 px-2 py-1 text-xs font-bold leading-4 text-white">{item.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <Link href="/advertise" className="block bg-brand-navy p-5 text-center text-white hover:bg-brand-blue">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
        <strong className="mt-2 block text-lg">광고·제휴 문의</strong>
        <span className="mt-2 block text-sm leading-6 text-white/80">브랜드 인터뷰, 배너 광고, 기획 특집 안내</span>
      </Link>

      <section className="border-t-2 border-brand-navy bg-white pt-3">
        <h2 className="px-1 text-lg font-black text-brand-navy">최신기사</h2>
        <div className="mt-2 border-t">
          {repeated.slice(0, 6).map((item) => <ListArticle key={item.id} article={item} />)}
        </div>
      </section>

      <section className="border-t-2 border-gray-950 bg-white pt-3">
        <h2 className="px-1 text-lg font-black text-gray-950">많이 본 뉴스</h2>
        <div className="mt-2 border-t">
          {repeated.slice(2, 8).map((item, index) => <ListArticle key={item.id} article={item} index={index} />)}
        </div>
      </section>

      {Array.from({ length: 8 }).map((_, index) => (
        <LongRankingPanel key={index} title={index % 2 === 0 ? '실시간 많이 본 뉴스' : '분야별 주요뉴스'} articles={repeated} offset={(index * 3) % Math.max(repeated.length, 1)} />
      ))}
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
  const relatedArticles = sidebarArticles.filter((item) => item.categories?.slug === article.categories?.slug).slice(0, 8);
  const fallbackRelatedArticles = relatedArticles.length ? relatedArticles : sidebarArticles.slice(0, 8);
  const articleUrl = getArticleUrl(article.slug);
  const inputDate = formatDate(article.published_at);
  const updatedDate = formatDate(article.updated_at);
  const groupedSections = ['생활경제', '지역상권', '교육·학원', '시니어·요양', '건강·뷰티', '창업·프랜차이즈', '브랜드 인터뷰', '오피니언', '보도자료'].map((name) => ({
    name,
    articles: sidebarArticles.filter((item) => item.categories?.name === name).slice(0, 6),
  })).filter((section) => section.articles.length > 0);

  return (
    <main className="bg-[#eef1f5] py-6">
      <div className="mx-auto max-w-[1180px] px-3">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,720px)_300px_120px]">
          <div className="min-w-0 space-y-5">
            <article className="bg-white px-5 py-6 shadow-sm md:px-8">
              <nav className="mb-5 flex flex-wrap items-center gap-2 border-y bg-gray-50 px-3 py-2 text-xs text-gray-500" aria-label="현재 위치">
                <span className="font-bold text-gray-700">현재위치</span>
                <Link href="/" className="hover:text-brand-blue">HOME</Link>
                <span>›</span>
                <Link href="/articles" className="hover:text-brand-blue">전체기사</Link>
                <span>›</span>
                {article.categories?.slug ? (
                  <Link href={`/category/${article.categories.slug}`} className="font-bold text-gray-800 hover:text-brand-blue">{categoryName}</Link>
                ) : (
                  <span className="font-bold text-gray-800">{categoryName}</span>
                )}
              </nav>

              <header className="border-b border-gray-300 pb-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="bg-brand-navy px-2 py-1 text-white">{categoryName}</span>
                  <span className="border border-gray-300 px-2 py-1 text-gray-600">{articleTypeLabel(article.article_type)}</span>
                  {article.is_sponsored && <span className="border border-brand-gold px-2 py-1 text-brand-gold">제휴표시</span>}
                </div>

                <h1 className="text-[1.55rem] font-black leading-tight tracking-[-0.045em] text-gray-950 md:text-[2rem]">
                  {article.title}
                </h1>
                {article.subtitle && <p className="mt-3 text-[15px] leading-7 text-gray-600">{article.subtitle}</p>}

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-3 text-xs text-gray-500">
                  <p><span className="font-bold text-gray-900">발행인</span> : {article.author_name ?? '편집부'}</p>
                  <p><span className="font-bold text-gray-900">기사입력</span> : {inputDate}</p>
                  <p><span className="font-bold text-gray-900">최종수정</span> : {updatedDate}</p>
                  <p><span className="font-bold text-gray-900">분류</span> : {categoryName}</p>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                  <Link href="/report" className="border px-3 py-1.5 text-xs font-bold text-gray-700 hover:border-brand-blue hover:text-brand-blue">
                    기사제보
                  </Link>
                  <ArticleShareTools title={article.title} url={articleUrl} />
                </div>
              </header>

              {notice && <SponsoredNotice notice={notice} />}

              <ArticleVisualCard article={article} categoryName={categoryName} />

              {article.summary && (
                <section className="mt-7 border-y bg-gray-50 px-5 py-4">
                  <h2 className="mb-2 text-sm font-black text-brand-navy">기사 요약</h2>
                  <p className="text-base leading-8 text-gray-700">{article.summary}</p>
                </section>
              )}

              <div className="mt-8 border-b pb-10">
                <div className="mb-5 border-l-4 border-gray-950 pl-3 text-sm font-black text-gray-950">본문</div>
                <ArticleBody content={article.content} summary={article.summary} articleType={article.article_type} categoryName={categoryName} />
              </div>

              <footer className="mt-7 space-y-6">
                <div className="border-y py-4 text-sm leading-7 text-gray-600">
                  <p className="font-bold text-gray-950">&lt;저작권자 ⓒ 생활경제저널 무단전재 및 재배포 금지&gt;</p>
                  <p className="mt-1">본 기사의 내용과 사진, 그래픽 등 모든 저작물은 생활경제저널의 허락 없이 전재·복사·배포할 수 없습니다.</p>
                  <p>기사제보 및 보도자료 접수: <Link href="/report" className="font-bold text-brand-blue">기사제보 바로가기</Link></p>
                </div>

                <div className="rounded-sm border bg-gray-50 p-5 text-sm leading-7 text-gray-700">
                  <p className="font-bold text-gray-950">{article.author_name ?? '편집부'} 기자</p>
                  <p className="mt-1">생활경제저널은 생활경제 현장과 지역 브랜드의 이야기를 기록합니다.</p>
                </div>

                {article.tags?.length ? (
                  <div className="flex flex-wrap gap-2 border-b pb-6">
                    {article.tags.map((tag) => (
                      <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="rounded-full border px-3 py-1 text-sm text-gray-600 hover:border-brand-blue hover:text-brand-blue">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </footer>
            </article>

            <section className="bg-white p-5 shadow-sm">
              <h2 className="border-b-2 border-gray-950 pb-2 text-lg font-black text-gray-950">관련기사</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {fallbackRelatedArticles.slice(0, 4).map((item) => <ListArticle key={item.id} article={item} />)}
              </div>
            </section>

            <NewsStrip title="함께 보면 좋은 뉴스" articles={sidebarArticles.slice(0, 6)} />
            <NewsStrip title="포토·영상 뉴스" articles={sidebarArticles.slice(6, 12)} />

            {groupedSections.map((section) => (
              <NewsStrip key={section.name} title={section.name} articles={section.articles} />
            ))}

            <div className="grid gap-4 md:grid-cols-2">
              <TextNewsBox title="생활경제 주요뉴스" articles={sidebarArticles.filter((item) => item.categories?.name === '생활경제')} />
              <TextNewsBox title="지역상권 주요뉴스" articles={sidebarArticles.filter((item) => item.categories?.name === '지역상권')} />
              <TextNewsBox title="교육·시니어 뉴스" articles={sidebarArticles.filter((item) => ['교육·학원', '시니어·요양'].includes(item.categories?.name ?? ''))} />
              <TextNewsBox title="건강·창업 뉴스" articles={sidebarArticles.filter((item) => ['건강·뷰티', '창업·프랜차이즈'].includes(item.categories?.name ?? ''))} />
            </div>
          </div>

          <Sidebar articles={sidebarArticles} />

          <aside className="hidden space-y-3 xl:block">
            {Array.from({ length: 18 }).map((_, index) => {
              const item = sidebarArticles[index % Math.max(sidebarArticles.length, 1)];
              if (!item) return null;
              return (
                <Link key={`${item.id}-${index}`} href={`/articles/${item.slug}`} className="block border bg-white p-2 text-center shadow-sm hover:border-brand-blue">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={articleImage(item)} alt="" className="h-12 w-full object-cover" />
                  <p className="mt-1 line-clamp-2 text-[11px] font-bold leading-4 text-gray-700">{item.title}</p>
                </Link>
              );
            })}
          </aside>
        </div>
      </div>
    </main>
  );
}
