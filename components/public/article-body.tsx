import { buildEditorialSections } from '@/lib/editorial/article-style';

export function ArticleBody({
  content,
  summary,
  articleType,
  categoryName
}: {
  content: string | null;
  summary?: string | null;
  articleType?: string | null;
  categoryName?: string | null;
}) {
  const sections = buildEditorialSections({ content, summary, articleType, categoryName });

  if (!sections.length) {
    return <p className="text-gray-600">본문이 준비 중입니다.</p>;
  }

  return (
    <div className="space-y-8" style={{ fontSize: 'calc(1.08rem * var(--article-font-scale, 1))' }}>
      {sections.map((section, index) => {
        const isLead = index === 0 || section.heading === '리드';
        return (
          <section key={`${section.heading}-${index}`} className={isLead ? 'border-l-4 border-brand-navy bg-gray-50 px-5 py-4' : ''}>
            <h3 className={isLead ? 'text-base font-black text-brand-navy' : 'mb-3 border-l-4 border-gray-950 pl-3 text-base font-black text-gray-950'}>
              {section.heading}
            </h3>
            <div className={isLead ? 'mt-2 space-y-3 text-[1.05em] font-medium leading-9 text-gray-800' : 'space-y-4 leading-9 text-gray-800'}>
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
