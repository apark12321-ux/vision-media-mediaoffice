import type { Article } from '@/types/database';

export function ArticleVisualCard({ article, categoryName }: { article: Article; categoryName: string }) {
  const image = article.thumbnail_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';

  return (
    <figure className="mt-8">
      <div className="mx-auto h-[300px] max-w-full overflow-hidden rounded-xl bg-slate-100 md:h-[420px]">
        <img src={image} alt={article.title} className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 text-left text-xs leading-5 text-gray-500">
        {categoryName} 관련 교육 현장 사진
      </figcaption>
    </figure>
  );
}
