import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SponsoredNotice } from '@/components/public/sponsored-notice';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { getSponsoredNotice, requiresSponsoredNotice } from '@/lib/compliance/sponsored-notice';
import { formatDate } from '@/lib/utils/format';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, latestArticles] = await Promise.all([getArticleBySlug(slug), getPublishedArticles(6)]);
  if (!article) notFound();
  const notice = requiresSponsoredNotice(article.article_type, article.is_sponsored) ? getSponsoredNotice(article.article_type, article.sponsored_notice) : null;

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <article>
        <div className="border-b pb-6">
          <div className="text-sm font-black text-brand-gold">{article.categories?.name ?? '미분류'}</div>
          <h1 className="mt-3 text-4xl font-black leading-tight text-gray-950 md:text-5xl">{article.title}</h1>
          {article.subtitle && <p className="mt-4 text-xl leading-8 text-gray-600">{article.subtitle}</p>}
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            <span>{article.author_name}</span>
            <span>입력 {formatDate(article.published_at)}</span>
            <span>수정 {formatDate(article.updated_at)}</span>
          </div>
        </div>

        {notice && <SponsoredNotice notice={notice} />}
        {article.summary && <p className="mt-8 border-l-4 border-brand-navy bg-gray-50 p-5 text-lg leading-8 text-gray-700">{article.summary}</p>}
        <div className="markdown-body mt-8 whitespace-pre-wrap text-lg leading-9 text-gray-800">{article.content}</div>
        {article.tags?.length ? <div className="mt-10 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">#{tag}</span>)}</div> : null}

        <div className="mt-12 border-t pt-6 text-sm leading-7 text-gray-600">
          <p>저작권자 © 생활경제저널. 무단 전재 및 재배포 금지.</p>
          <p className="mt-2">기사제보 및 보도자료 접수: <Link href="/report" className="font-bold text-brand-blue">기사제보 바로가기</Link></p>
        </div>
      </article>

      <aside className="space-y-6">
        <section className="border-t-2 border-brand-navy pt-3">
          <h2 className="text-lg font-black text-brand-navy">최신기사</h2>
          <div className="mt-3 space-y-3">
            {latestArticles.filter((item) => item.slug !== article.slug).slice(0, 5).map((item) => (
              <Link key={item.id} href={`/articles/${item.slug}`} className="block border-b pb-3 text-sm font-bold leading-6 text-gray-900 hover:text-brand-blue">
                {item.title}
              </Link>
            ))}
          </div>
        </section>
        <Link href="/advertise" className="block border bg-gray-50 p-5 text-center hover:border-brand-blue">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Advertisement</span>
          <strong className="mt-2 block text-lg text-brand-navy">광고·제휴 문의</strong>
          <span className="mt-2 block text-sm leading-6 text-gray-600">브랜드 인터뷰와 배너 광고 안내</span>
        </Link>
      </aside>
    </main>
  );
}
