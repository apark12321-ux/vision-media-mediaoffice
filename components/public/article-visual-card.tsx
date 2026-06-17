import type { Article } from '@/types/database';

export function ArticleVisualCard({ article, categoryName }: { article: Article; categoryName: string }) {
  if (article.thumbnail_url) {
    const source = article.image_source_name || '생활경제저널 DB';
    const caption = article.image_caption || `▲ ${article.title} 관련 자료. 출처=${source}.`;

    return (
      <figure className="mt-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.thumbnail_url} alt={article.title} className="mx-auto max-h-[520px] max-w-full object-contain" />
        <figcaption className="mt-2 text-left text-xs leading-5 text-gray-500">{caption}</figcaption>
      </figure>
    );
  }

  const sourceText = article.summary || article.subtitle || article.title;
  const lines = sourceText.split('.').map((item) => item.trim()).filter(Boolean).slice(0, 3);

  return (
    <figure className="mt-8">
      <div className="border border-gray-300 bg-white p-4">
        <div className="border-4 border-brand-navy bg-gray-50 p-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-brand-gold">Everyday Economy Journal</p>
          <p className="mt-2 inline-flex bg-brand-navy px-3 py-1 text-xs font-black text-white">{categoryName}</p>
          <h2 className="mx-auto mt-5 max-w-xl break-keep text-2xl font-black leading-tight tracking-[-0.04em] text-gray-950 md:text-3xl">{article.title}</h2>
          <div className="mx-auto mt-5 max-w-xl space-y-2 text-left text-sm leading-7 text-gray-700 md:text-base">
            {lines.map((line) => (
              <p key={line} className="border-l-4 border-brand-gold bg-white px-3 py-2">{line}</p>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-left text-xs leading-5 text-gray-500">▲ 기사 내용을 바탕으로 생활경제저널이 자체 제작한 정보형 이미지입니다.</figcaption>
    </figure>
  );
}
