import Link from 'next/link';
import type { Article } from '@/types/database';
import { formatDate } from '@/lib/utils/format';

function getTypeLabel(article: Article) {
  if (article.article_type === 'brand_interview') return '브랜드 인터뷰';
  if (article.article_type === 'sponsored') return '제휴 콘텐츠';
  if (article.article_type === 'advertorial') return '광고/제휴';
  if (article.article_type === 'press_release') return '보도자료';
  return '일반 기사';
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  const typeLabel = getTypeLabel(article);

  return (
    <Link href={`/articles/${article.slug}`} className="group block border-b pb-4 transition last:border-b-0 hover:text-brand-blue md:border md:bg-white md:p-4 md:hover:border-brand-blue">
      <div className="flex gap-4 md:block">
        <div className={`${compact ? 'h-20 w-28 md:h-28 md:w-full' : 'h-28 w-36 md:h-40 md:w-full'} flex shrink-0 items-center justify-center bg-slate-100 text-xs font-bold text-slate-400`}>생활경제저널</div>
        <div className="min-w-0 flex-1 md:mt-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-brand-gold">{article.categories?.name ?? '미분류'}</span>
            <span>{formatDate(article.published_at)}</span>
          </div>
          <h3 className={`${compact ? 'text-base' : 'text-lg'} mt-2 line-clamp-2 font-black leading-snug text-gray-950 group-hover:text-brand-blue`}>{article.title}</h3>
          {!compact && article.summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">{article.summary}</p>}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="font-semibold text-gray-500">{article.author_name}</span>
            <span className="text-gray-400">{typeLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
