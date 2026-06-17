import { buildEditorialSections } from '@/lib/editorial/article-style';

const INTERNAL_LABELS = new Set([
  '리드',
  '핵심 요약',
  '핵심 쟁점',
  '배경',
  '현장 맥락',
  '현장 반응',
  '독자 영향',
  '소비자 영향',
  '업계 영향',
  '전망',
  '정리',
  '전망과 과제',
  '브랜드 배경',
  '운영 철학',
  '독자 체크포인트',
  '발표 내용',
  '사업 배경',
  '향후 계획',
  '편집자 주',
  '문답',
  '인터뷰',
  '보도자료'
]);

function isInternalLabel(label: string) {
  return INTERNAL_LABELS.has(label.trim());
}

export function ArticleBody({
  content,
  summary,
  articleType,
  categoryName
}: {
  content?: string | null;
  summary?: string | null;
  articleType?: string | null;
  categoryName?: string | null;
}) {
  const sections = buildEditorialSections({ content, summary, articleType, categoryName });

  const blocks = sections.flatMap((section) => {
    const body = section.body.filter(Boolean);
    if (!body.length) return [];

    if (isInternalLabel(section.heading)) {
      return body.map((paragraph) => ({ type: 'paragraph' as const, text: paragraph }));
    }

    return [
      { type: 'heading' as const, text: section.heading },
      ...body.map((paragraph) => ({ type: 'paragraph' as const, text: paragraph }))
    ];
  });

  if (!blocks.length) {
    return <p className="text-gray-600">본문이 준비 중입니다.</p>;
  }

  return (
    <div className="article-body space-y-6" style={{ fontSize: 'calc(1.08rem * var(--article-font-scale, 1))' }}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h3 key={`${block.type}-${index}`} className="mt-10 border-t border-gray-200 pt-7 text-xl font-black leading-snug text-gray-950">
              {block.text}
            </h3>
          );
        }

        const isLead = index === 0;
        return (
          <p
            key={`${block.type}-${index}`}
            className={
              isLead
                ? 'text-[1.12em] font-semibold leading-9 text-gray-900'
                : 'leading-9 text-gray-800'
            }
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
