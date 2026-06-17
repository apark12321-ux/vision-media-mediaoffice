import { notFound } from 'next/navigation';
import { SponsoredNotice } from '@/components/public/sponsored-notice';
import { getArticleBySlug } from '@/lib/data/public';
import { getSponsoredNotice, requiresSponsoredNotice } from '@/lib/compliance/sponsored-notice';
import { formatDate } from '@/lib/utils/format';

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const notice = requiresSponsoredNotice(article.article_type, article.is_sponsored) ? getSponsoredNotice(article.article_type, article.sponsored_notice) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-sm font-bold text-brand-gold">{article.categories?.name ?? '미분류'}</div>
      <h1 className="mt-3 text-4xl font-black leading-tight text-brand-navy">{article.title}</h1>
      {article.subtitle && <p className="mt-4 text-xl leading-8 text-gray-600">{article.subtitle}</p>}
      <div className="mt-5 text-sm text-gray-500">{article.author_name} · {formatDate(article.published_at)}</div>
      {notice && <SponsoredNotice notice={notice} />}
      {article.summary && <p className="mt-8 rounded-xl bg-gray-50 p-5 text-lg leading-8 text-gray-700">{article.summary}</p>}
      <div className="markdown-body mt-8 whitespace-pre-wrap text-lg leading-9 text-gray-800">{article.content}</div>
      {article.tags?.length ? <div className="mt-10 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">#{tag}</span>)}</div> : null}
    </article>
  );
}
