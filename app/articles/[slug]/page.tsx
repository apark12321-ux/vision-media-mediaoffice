import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/public/article-body';
import { ArticleShareTools } from '@/components/public/article-share-tools';
import { ArticleVisualCard } from '@/components/public/article-visual-card';
import { SponsoredNotice } from '@/components/public/sponsored-notice';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { getSponsoredNotice, requiresSponsoredNotice } from '@/lib/compliance/sponsored-notice';
import { formatDate } from '@/lib/utils/format';

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

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, latestArticles] = await Promise.all([getArticleBySlug(slug), getPublishedArticles(16)]);
  if (!article) notFound();

  const categoryName = article.categories?.name ?? '미분류';
  const notice = requiresSponsoredNotice(article.article_type, article.is_sponsored) ? getSponsoredNotice(article.article_type, article.sponsored_notice) : null;
  const sidebarArticles = latestArticles.filter((item) => item.slug !== article.slug);
  const relatedArticles = sidebarArticles.filter((item) => item.categories?.slug === article.categories?.slug).slice(0, 4);
  const fallbackRelatedArticles = relatedArticles.length ? relatedArticles : sidebarArticles.slice(0, 4);
  const photoNewsArticles = sidebarArticles.slice(0, 4);
  const articleUrl = getArticleUrl(article.slug);
  const inputDate = formatDate(article.published_at);
  const updatedDate = formatDate(article.updated_at);

  return (
    <main className="mx-auto max-w-7xl px-4 py-7">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:justify-center">
        <article className="min-w-0">
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

            <h1 className="text-[1.9rem] font-black leading-tight tracking-[-0.045em] text-gray-950 md:text-[2.45rem]">
              {article.title}
            </h1>
            {article.subtitle && <p className="mt-3 text-base leading-7 text-gray-600 md:text-lg">{article.subtitle}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 pt-3 text-xs text-gray-500">
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

            <section>
              <h2 className="border-b-2 border-gray-950 pb-2 text-lg font-black text-gray-950">관련기사</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {fallbackRelatedArticles.map((item) => (
                  <Link key={item.id} href={`/articles/${item.slug}`} className="border-b pb-3 text-sm font-bold leading-6 text-gray-900 hover:text-brand-blue">
                    <span className="mr-2 text-brand-gold">•</span>{item.title}
                  </Link>
                ))}
              </div>
            </section>
          </footer>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="border-t-2 border-gray-950 pt-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-lg font-black text-gray-950">포토뉴스</h2>
              <div className="flex gap-1 text-xs text-gray-400">
                <span className="border px-1.5">‹</span>
                <span className="border px-1.5">›</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1">
              {photoNewsArticles.map((item) => (
                <Link key={item.id} href={`/articles/${item.slug}`} className="group relative block overflow-hidden bg-gray-200">
                  {item.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail_url} alt={item.title} className="h-28 w-full object-cover transition group-hover:scale-105" />
                  ) : (
                    <div className="flex h-28 w-full items-center justify-center bg-gray-200 px-2 text-center text-xs font-bold text-gray-500">생활경제저널</div>
                  )}
                  <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/65 px-2 py-1 text-xs font-bold leading-4 text-white">{item.title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-t-2 border-brand-navy pt-3">
            <h2 className="text-lg font-black text-brand-navy">최신기사</h2>
            <div className="mt-3 space-y-0 border-t">
              {sidebarArticles.slice(0, 6).map((item) => (
                <Link key={item.id} href={`/articles/${item.slug}`} className="flex gap-3 border-b py-3 text-sm font-bold leading-6 text-gray-900 hover:text-brand-blue">
                  {item.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail_url} alt="" className="h-12 w-16 shrink-0 object-cover" />
                  ) : null}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-t-2 border-gray-950 pt-3">
            <h2 className="text-lg font-black text-gray-950">많이 본 뉴스</h2>
            <ol className="mt-3 space-y-0 border-t">
              {sidebarArticles.slice(2, 8).map((item, index) => (
                <li key={item.id} className="border-b py-3">
                  <Link href={`/articles/${item.slug}`} className="flex gap-3 text-sm font-bold leading-6 text-gray-900 hover:text-brand-blue">
                    <span className="text-base font-black text-brand-gold">{index + 1}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <Link href="/advertise" className="block border border-gray-300 bg-gray-50 p-5 text-center hover:border-brand-blue">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
            <strong className="mt-2 block text-lg text-brand-navy">광고·제휴 문의</strong>
            <span className="mt-2 block text-sm leading-6 text-gray-600">브랜드 인터뷰, 배너 광고, 기획 특집 안내</span>
          </Link>

          <section className="border bg-white p-4">
            <h2 className="border-b pb-2 text-base font-black text-gray-950">기사제보</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">생활경제 현장의 소식, 보도자료, 브랜드 인터뷰 제안을 접수합니다.</p>
            <Link href="/report" className="mt-4 inline-flex w-full items-center justify-center bg-brand-navy px-4 py-2 text-sm font-bold text-white hover:bg-brand-blue">
              제보하기
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
