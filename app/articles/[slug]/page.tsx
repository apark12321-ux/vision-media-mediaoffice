import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, latestArticles] = await Promise.all([getArticleBySlug(slug), getPublishedArticles(12)]);
  if (!article) notFound();

  const categoryName = article.categories?.name ?? '미분류';
  const notice = requiresSponsoredNotice(article.article_type, article.is_sponsored) ? getSponsoredNotice(article.article_type, article.sponsored_notice) : null;
  const sidebarArticles = latestArticles.filter((item) => item.slug !== article.slug);
  const relatedArticles = sidebarArticles.filter((item) => item.categories?.slug === article.categories?.slug).slice(0, 4);
  const fallbackRelatedArticles = relatedArticles.length ? relatedArticles : sidebarArticles.slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0 border-t-2 border-gray-950 pt-5">
          <nav className="mb-5 flex flex-wrap items-center gap-2 border-b pb-3 text-xs text-gray-500" aria-label="현재 위치">
            <Link href="/" className="hover:text-brand-blue">HOME</Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-brand-blue">전체기사</Link>
            <span>›</span>
            {article.categories?.slug ? (
              <Link href={`/category/${article.categories.slug}`} className="font-bold text-gray-700 hover:text-brand-blue">{categoryName}</Link>
            ) : (
              <span className="font-bold text-gray-700">{categoryName}</span>
            )}
          </nav>

          <header className="border-b pb-5">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="border border-brand-navy px-2 py-1 text-brand-navy">{categoryName}</span>
              <span className="border border-gray-300 px-2 py-1 text-gray-600">{articleTypeLabel(article.article_type)}</span>
              {article.is_sponsored && <span className="border border-brand-gold px-2 py-1 text-brand-gold">제휴표시</span>}
            </div>

            <h1 className="text-[2rem] font-black leading-tight tracking-[-0.04em] text-gray-950 md:text-[2.75rem]">
              {article.title}
            </h1>
            {article.subtitle && <p className="mt-3 text-lg leading-8 text-gray-600 md:text-xl">{article.subtitle}</p>}

            <div className="mt-5 grid gap-2 border-t border-gray-200 pt-4 text-sm text-gray-600 sm:grid-cols-2">
              <p><span className="font-bold text-gray-900">기자명</span> {article.author_name ?? '편집부'}</p>
              <p><span className="font-bold text-gray-900">기사입력</span> {formatDate(article.published_at)}</p>
              <p><span className="font-bold text-gray-900">최종수정</span> {formatDate(article.updated_at)}</p>
              <p><span className="font-bold text-gray-900">분류</span> {categoryName}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-3 text-xs text-gray-500">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-gray-800">글자크기</span>
                <span className="inline-flex h-7 w-7 items-center justify-center border bg-white font-bold">+</span>
                <span className="inline-flex h-7 w-7 items-center justify-center border bg-white font-bold">-</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/report" className="border px-3 py-1.5 font-bold text-gray-700 hover:border-brand-blue hover:text-brand-blue">기사제보</Link>
                <button type="button" className="border px-3 py-1.5 font-bold text-gray-700">프린트</button>
                <button type="button" className="border px-3 py-1.5 font-bold text-gray-700">공유</button>
              </div>
            </div>
          </header>

          {notice && <SponsoredNotice notice={notice} />}

          {article.thumbnail_url && (
            <figure className="mt-8 border bg-gray-50 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.thumbnail_url} alt={article.title} className="mx-auto max-h-[520px] w-full object-cover" />
              <figcaption className="mt-2 px-2 text-center text-xs text-gray-500">생활경제저널 자료사진</figcaption>
            </figure>
          )}

          {article.summary && (
            <section className="mt-7 border-y bg-gray-50 px-5 py-4">
              <h2 className="mb-2 text-sm font-black text-brand-navy">기사 요약</h2>
              <p className="text-base leading-8 text-gray-700">{article.summary}</p>
            </section>
          )}

          <div className="mt-8 border-b pb-10">
            <div className="mb-5 border-l-4 border-gray-950 pl-3 text-sm font-black text-gray-950">본문</div>
            <div className="whitespace-pre-wrap text-[1.08rem] leading-9 text-gray-800 md:text-[1.12rem]">
              {article.content}
            </div>
          </div>

          <footer className="mt-7 space-y-6">
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

            <div className="border-y py-4 text-sm leading-7 text-gray-600">
              <p>저작권자 © 생활경제저널. 무단 전재 및 재배포 금지.</p>
              <p>기사제보 및 보도자료 접수: <Link href="/report" className="font-bold text-brand-blue">기사제보 바로가기</Link></p>
            </div>

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

        <aside className="space-y-7 lg:sticky lg:top-6 lg:self-start">
          <Link href="/advertise" className="block border border-gray-300 bg-gray-50 p-5 text-center hover:border-brand-blue">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
            <strong className="mt-2 block text-lg text-brand-navy">광고·제휴 문의</strong>
            <span className="mt-2 block text-sm leading-6 text-gray-600">브랜드 인터뷰, 배너 광고, 기획 특집 안내</span>
          </Link>

          <section className="border-t-2 border-brand-navy pt-3">
            <h2 className="text-lg font-black text-brand-navy">최신기사</h2>
            <div className="mt-3 space-y-0 border-t">
              {sidebarArticles.slice(0, 6).map((item) => (
                <Link key={item.id} href={`/articles/${item.slug}`} className="block border-b py-3 text-sm font-bold leading-6 text-gray-900 hover:text-brand-blue">
                  {item.title}
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
