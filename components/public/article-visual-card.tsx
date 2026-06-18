import type { Article } from '@/types/database';
import { EduVisual } from '@/components/public/edu-visual';

export function ArticleVisualCard({ article, categoryName }: { article: Article; categoryName: string }) {
  return (
    <figure className="mt-8">
      <EduVisual category={categoryName} title={article.title} className="mx-auto h-[300px] max-w-full rounded-xl md:h-[420px]" />
      <figcaption className="mt-2 text-left text-xs leading-5 text-gray-500">
        {categoryName} 기사 이해를 돕기 위한 에듀저널 자체 그래픽입니다.
      </figcaption>
    </figure>
  );
}
