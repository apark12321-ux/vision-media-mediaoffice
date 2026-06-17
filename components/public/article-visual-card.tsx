import type { Article } from '@/types/database';
import { getArticleImageForDisplay } from '@/lib/images/article-images';

export function ArticleVisualCard({ article, categoryName }: { article: Article; categoryName: string }) {
  const image = getArticleImageForDisplay(article);
  const sourceLabel = [image.sourceName, image.license].filter(Boolean).join(' · ');

  return (
    <figure className="mt-8 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={article.title} className="mx-auto max-h-[520px] max-w-full object-contain" />
      <figcaption className="mt-2 text-left text-xs leading-5 text-gray-500">
        {image.caption}
        {image.isFallback ? ` ${categoryName} 기사 이해를 돕기 위한 무료 자료사진입니다.` : null}
        {sourceLabel ? <span className="ml-1">({sourceLabel})</span> : null}
      </figcaption>
    </figure>
  );
}
