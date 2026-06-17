import Link from 'next/link';
import type { Article } from '@/types/database';
import { formatDate } from '@/lib/utils/format';

export function ArticleCard({ article }: { article: Article }) {
  const typeLabel = article.article_type === 'brand_interview' ? '브랜드 인터뷰' : article.article_type === 'sponsored' ? '제휴 콘텐츠' : article.article_type === 'advertorial' ? '광고/제휴' : article.article_type === 'press_release' ? '보도자료' : '일반 기사';
  return (
    <Link href={`/articles/${article.slug}`} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <span className="rounded-full bg-gray-100 px-2 py-1">{article.categories?.name ?? '미분류'}</span>
        <span>{formatDate(article.published_at)}</span>
      </div>
      <h3 className="line-clamp-2 text-lg font-bold leading-snug text-brand-navy group-hover:text-brand-blue">{article.title}</h3>
      {article.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{article.summary}</p>}
      <div className="mt-4 text-xs font-semibold text-brand-gold">{typeLabel}</div>
    </Link>
  );
}
