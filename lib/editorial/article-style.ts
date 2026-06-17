export type EditorialSection = {
  heading: string;
  body: string[];
  toneHint?: string;
};

const EXPLICIT_SECTION_RE = /^\s*(?:#{2,3}\s*)?(?:\[)?(리드|핵심 요약|핵심 쟁점|배경|현장 맥락|현장 반응|독자 영향|소비자 영향|업계 영향|전망|정리|전망과 과제|편집자 주|문답|인터뷰|보도자료)(?:\])?\s*$/;

const ARTICLE_CONNECTORS = ['다만', '특히', '이에', '한편', '따라서', '반면', '업계', '현장', '관계자', '소비자', '보호자', '학부모', '이용자', '사업자'];

export function splitParagraphs(content: string | null | undefined) {
  return String(content ?? '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function hasExplicitEditorialSections(content: string | null | undefined) {
  return String(content ?? '')
    .split('\n')
    .some((line) => EXPLICIT_SECTION_RE.test(line.trim()));
}

function normalizeHeading(raw: string) {
  const match = raw.trim().match(EXPLICIT_SECTION_RE);
  return match?.[1] ?? null;
}

export function buildEditorialSections(input: {
  content: string | null | undefined;
  summary?: string | null;
  articleType?: string | null;
  categoryName?: string | null;
}): EditorialSection[] {
  const paragraphs = splitParagraphs(input.content);
  if (!paragraphs.length && input.summary) {
    return [{ heading: '리드', body: [input.summary], toneHint: '기사의 핵심을 한 문단으로 압축합니다.' }];
  }

  if (hasExplicitEditorialSections(input.content)) {
    const sections: EditorialSection[] = [];
    let current: EditorialSection | null = null;

    String(input.content ?? '')
      .split('\n')
      .forEach((line) => {
        const heading = normalizeHeading(line);
        if (heading) {
          current = { heading, body: [] };
          sections.push(current);
          return;
        }

        const text = line.trim();
        if (!text) return;
        if (!current) {
          current = { heading: '리드', body: [] };
          sections.push(current);
        }
        current.body.push(text);
      });

    return sections.filter((section) => section.body.length);
  }

  const categoryName = input.categoryName ?? '생활경제';
  const labels = input.articleType === 'brand_interview'
    ? ['리드', '브랜드 배경', '운영 철학', '현장 맥락', '독자 체크포인트', '정리']
    : input.articleType === 'press_release'
      ? ['리드', '발표 내용', '사업 배경', '향후 계획', '정리']
      : ['리드', '배경', '현장 맥락', '독자 영향', '전망과 과제'];

  const source = input.summary ? [input.summary, ...paragraphs] : paragraphs;
  return source.map((paragraph, index) => ({
    heading: labels[Math.min(index, labels.length - 1)] ?? '정리',
    body: [paragraph],
    toneHint: index === 0 ? `${categoryName} 독자가 먼저 알아야 할 핵심을 제시합니다.` : undefined
  }));
}

export function analyzeArticleStructure(input: {
  title: string;
  summary?: string | null;
  content: string;
  articleType?: string | null;
}) {
  const paragraphs = splitParagraphs(input.content);
  const hasSections = hasExplicitEditorialSections(input.content);
  const connectorCount = ARTICLE_CONNECTORS.filter((word) => input.content.includes(word)).length;
  const warnings: string[] = [];

  if (!input.summary || input.summary.trim().length < 35) {
    warnings.push('요약문이 짧습니다. 기사 핵심, 배경, 독자 영향을 1~2문장으로 보강하세요.');
  }

  if (paragraphs.length < 5) {
    warnings.push('본문 문맥 단락이 부족합니다. 리드, 배경, 현장 맥락, 독자 영향, 정리 단락을 갖추세요.');
  }

  if (!hasSections) {
    warnings.push('본문에 기사 구조 표지가 없습니다. [리드], [배경], [현장 맥락], [독자 영향], [정리] 구조를 권장합니다.');
  }

  if (connectorCount < 2) {
    warnings.push('문장 간 연결어와 맥락 전환이 부족합니다. 다만/특히/이에/한편/따라서 등으로 흐름을 보강하세요.');
  }

  if (!/(왜|배경|이유|흐름|변화|영향|과제|전망|기준|확인)/.test(input.content)) {
    warnings.push('사실 나열에 그칠 수 있습니다. 변화의 배경, 독자 영향, 향후 과제를 한 단락 이상 넣으세요.');
  }

  return {
    ok: warnings.length === 0,
    paragraphCount: paragraphs.length,
    hasSections,
    connectorCount,
    warnings
  };
}

export function getArticleWritingTemplate(articleType = 'normal') {
  if (articleType === 'brand_interview') {
    return `[리드]\n이 브랜드를 소개해야 하는 이유와 독자가 먼저 알아야 할 핵심을 2~3문장으로 쓴다.\n\n[브랜드 배경]\n업체가 어떤 지역·업종·고객층에서 활동하는지 설명한다.\n\n[운영 철학]\n대표자 또는 운영자의 기준, 고객을 대하는 방식, 서비스 원칙을 담는다.\n\n[현장 맥락]\n해당 업종에서 고객이 실제로 비교하는 기준과 불안을 설명한다.\n\n[독자 체크포인트]\n독자가 업체를 선택하기 전 확인하면 좋은 기준을 정리한다.\n\n[정리]\n과장 없이 브랜드의 의미와 향후 과제를 담백하게 마무리한다.`;
  }

  if (articleType === 'press_release') {
    return `[리드]\n발표의 핵심 사실을 육하원칙에 맞춰 2~3문장으로 정리한다.\n\n[발표 내용]\n기관·기업이 밝힌 주요 내용을 구체적으로 설명한다.\n\n[사업 배경]\n왜 이 발표가 나왔는지, 관련 시장·지역·독자 맥락을 설명한다.\n\n[향후 계획]\n후속 일정, 적용 범위, 기대 효과를 사실 중심으로 쓴다.\n\n[정리]\n독자가 확인해야 할 의미와 유의점을 덧붙인다.`;
  }

  return `[리드]\n기사의 핵심 변화 또는 문제 제기를 2~3문장으로 제시한다.\n\n[배경]\n이 이슈가 나온 배경, 최근 흐름, 독자가 알아야 할 기본 정보를 설명한다.\n\n[현장 맥락]\n업계·지역·소비자 관점에서 실제로 어떤 변화가 있는지 풀어쓴다.\n\n[독자 영향]\n이 내용이 소비자, 보호자, 학부모, 사업자에게 어떤 의미인지 설명한다.\n\n[전망과 과제]\n앞으로 확인할 점, 남은 과제, 주의할 표현을 담백하게 정리한다.`;
}
