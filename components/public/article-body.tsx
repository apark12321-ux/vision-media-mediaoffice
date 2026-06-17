import { buildEditorialSections } from '@/lib/editorial/article-style';

const INTERNAL_LABELS = new Set([
  '기사',
  '본문',
  '기사 본문',
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

const NEWS_TONE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/입니다(?=\.|!|\?|$)/g, '이다'],
  [/했습니다(?=\.|!|\?|$)/g, '했다'],
  [/하였습니다(?=\.|!|\?|$)/g, '했다'],
  [/합니다(?=\.|!|\?|$)/g, '한다'],
  [/됩니다(?=\.|!|\?|$)/g, '된다'],
  [/됐습니다(?=\.|!|\?|$)/g, '됐다'],
  [/되었습니다(?=\.|!|\?|$)/g, '됐다'],
  [/있습니다(?=\.|!|\?|$)/g, '있다'],
  [/없습니다(?=\.|!|\?|$)/g, '없다'],
  [/보입니다(?=\.|!|\?|$)/g, '보인다'],
  [/나타납니다(?=\.|!|\?|$)/g, '나타난다'],
  [/나타났습니다(?=\.|!|\?|$)/g, '나타났다'],
  [/확인됩니다(?=\.|!|\?|$)/g, '확인된다'],
  [/분석됩니다(?=\.|!|\?|$)/g, '분석된다'],
  [/전망됩니다(?=\.|!|\?|$)/g, '전망된다'],
  [/관측됩니다(?=\.|!|\?|$)/g, '관측된다'],
  [/해석됩니다(?=\.|!|\?|$)/g, '해석된다'],
  [/필요합니다(?=\.|!|\?|$)/g, '필요하다'],
  [/중요합니다(?=\.|!|\?|$)/g, '중요하다'],
  [/가능합니다(?=\.|!|\?|$)/g, '가능하다'],
  [/어렵습니다(?=\.|!|\?|$)/g, '어렵다'],
  [/높습니다(?=\.|!|\?|$)/g, '높다'],
  [/많습니다(?=\.|!|\?|$)/g, '많다'],
  [/큽니다(?=\.|!|\?|$)/g, '크다'],
  [/밝혔습니다(?=\.|!|\?|$)/g, '밝혔다'],
  [/전했습니다(?=\.|!|\?|$)/g, '전했다'],
  [/설명했습니다(?=\.|!|\?|$)/g, '설명했다'],
  [/지적했습니다(?=\.|!|\?|$)/g, '지적했다'],
  [/덧붙였습니다(?=\.|!|\?|$)/g, '덧붙였다']
];

function isInternalLabel(label: string) {
  return INTERNAL_LABELS.has(label.trim());
}

function normalizeNewsTone(text: string) {
  return NEWS_TONE_REPLACEMENTS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), text).trim();
}

export function ArticleBody({
  title,
  content,
  summary,
  articleType,
  categoryName
}: {
  title?: string | null;
  content?: string | null;
  summary?: string | null;
  articleType?: string | null;
  categoryName?: string | null;
}) {
  const sections = buildEditorialSections({ title, content, summary, articleType, categoryName });

  const blocks = sections.flatMap((section) => {
    const body = section.body.map(normalizeNewsTone).filter(Boolean);
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
    return <p className="text-gray-600">기사가 준비 중이다.</p>;
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
