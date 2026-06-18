import Link from 'next/link';
import type { Article } from '@/types/database';
import { formatDate } from '@/lib/utils/format';

function getTypeLabel(article: Article) {
  if (article.article_type === 'brand_interview') return '인터뷰';
  if (article.article_type === 'press_release') return '보도자료';
  return '일반 기사';
}

function visualTone(name?: string | null) {
  if (name?.includes('자격')) return 'bg-amber-50 text-amber-950 border-amber-200';
  if (name?.includes('시니어')) return 'bg-emerald-50 text-emerald-950 border-emerald-200';
  if (name?.includes('AI')) return 'bg-indigo-50 text-indigo-950 border-indigo-200';
  if (name?.includes('기관')) return 'bg-cyan-50 text-cyan-950 border-cyan-200';
  if (name?.includes('인터뷰')) return 'bg-violet-50 text-violet-950 border-violet-200';
  if (name?.includes('오피니언')) return 'bg-slate-50 text-slate-950 border-slate-200';
  return 'bg-blue-50 text-blue-950 border-blue-200';
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  const typeLabel = getTypeLabel(article);
  const categoryName = article.categories?.name ?? '에듀저널';

  return (
    <Link href={`/articles/${article.slug}`} className="group block border-b pb-4 transition last:border-b-0 hover:text-brand-blue md:border md:bg-white md:p-4 md:hover:border-brand-blue">
      <div className="flex gap-4 md:block">
        <div className={`${compact ? 'h-20 w-28 md:h-28 md:w-full' : 'h-28 w-36 md:h-40 md:w-full'} relative shrink-0 overflow-hidden border ${visualTone(categoryName)}`}>
          <div className="absolute right-2 top-2 h-10 w-10 rounded-full bg-white/70" />
          <div className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-white/60" />
          <div className="relative flex h-full flex-col justify-between p-3">
            <span className="text-[10px] font-black tracking-[0.18em] opacity-70">EDU</span>
            <strong className="line-clamp-2 text-sm font-black leading-tight">{categoryName}</strong>
          </div>
        </div>
        <div className="min-w-0 flex-1 md:mt-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-brand-gold">{categoryName}</span>
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
