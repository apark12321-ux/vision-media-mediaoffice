export type EditorialSection = {
  heading: string;
  body: string[];
  toneHint?: string;
};

const EXPLICIT_SECTION_RE = /^\s*(?:#{2,3}\s*)?(?:\[)?(리드|핵심 요약|핵심 쟁점|배경|현장 맥락|현장 반응|독자 영향|소비자 영향|업계 영향|전망|정리|전망과 과제|브랜드 배경|운영 철학|독자 체크포인트|발표 내용|사업 배경|향후 계획|편집자 주|문답|인터뷰|보도자료)(?:\])?\s*$/;

const MARKDOWN_HEADING_RE = /^\s*#{2,3}\s+(.+?)\s*$/;

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
  const line = raw.trim();
  const internalMatch = line.match(EXPLICIT_SECTION_RE);
  if (internalMatch) return internalMatch[1] ?? null;

  const markdownMatch = line.match(MARKDOWN_HEADING_RE);
  if (markdownMatch) return markdownMatch[1] ?? null;

  return null;
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

  const hasAnyHeading = String(input.content ?? '')
    .split('\n')
    .some((line) => normalizeHeading(line));

  if (hasAnyHeading) {
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

  const source = input.summary ? [input.summary, ...paragraphs] : paragraphs;
  return [{ heading: '본문', body: source }];
}

export function analyzeArticleStructure(input: {
  title: string;
  summary?: string | null;
  content: string;
  articleType?: string | null;
}) {
  const paragraphs = splitParagraphs(input.content);
  const connectorCount = ARTICLE_CONNECTORS.filter((word) => input.content.includes(word)).length;
  const warnings: string[] = [];

  if (!input.summary || input.summary.trim().length < 45) {
    warnings.push('요약문이 짧습니다. 기사 핵심, 배경, 독자 영향을 1~2문장으로 보강하세요.');
  }

  if (paragraphs.length < 6) {
    warnings.push('본문 문단 수가 부족합니다. 리드, 배경, 쟁점, 현장 맥락, 독자 영향, 전망 단락이 자연스럽게 이어져야 합니다.');
  }

  if (input.content.trim().length < 900) {
    warnings.push('본문 분량이 짧습니다. 인터넷신문 기사로 보이려면 최소 900자 이상을 권장합니다.');
  }

  if (connectorCount < 2) {
    warnings.push('문장 간 연결어와 맥락 전환이 부족합니다. 다만/특히/이에/한편/따라서 등으로 흐름을 보강하세요.');
  }

  if (!/(왜|배경|이유|흐름|변화|영향|과제|전망|기준|확인|관계자|업계|소비자)/.test(input.content)) {
    warnings.push('사실 나열에 그칠 수 있습니다. 변화의 배경, 독자 영향, 향후 과제를 한 단락 이상 넣으세요.');
  }

  if (/\[(리드|배경|현장 맥락|독자 영향|전망과 과제|정리)\]/.test(input.content)) {
    warnings.push('본문에 관리자용 구조 라벨이 포함되어 있습니다. 공개 기사에서는 자연스러운 문단형 보도문으로 정리하세요.');
  }

  return {
    ok: warnings.length === 0,
    paragraphCount: paragraphs.length,
    hasSections: hasExplicitEditorialSections(input.content),
    connectorCount,
    warnings
  };
}

export function getArticleWritingTemplate(articleType = 'normal') {
  if (articleType === 'brand_interview') {
    return `브랜드가 주목받는 배경을 먼저 제시한다. 광고 문구가 아니라 지역·업종·고객 변화 속에서 이 업체를 살펴볼 이유를 기사 첫 문단에 담는다.\n\n이후 업체의 설립 배경, 대표자의 운영 철학, 고객 응대 기준, 현장 사례를 자연스럽게 이어 쓴다. 직접 인용은 필요한 경우에만 사용하고, 과장된 최상급 표현은 피한다.\n\n마지막 문단에서는 독자가 업체를 선택하기 전 확인할 기준과 해당 업종의 변화 흐름을 정리한다.`;
  }

  if (articleType === 'press_release') {
    return `발표 주체와 핵심 내용을 첫 문단에서 육하원칙에 맞춰 정리한다. 제공 자료를 그대로 옮기지 말고, 독자가 알아야 할 일정·대상·배경을 기사체로 재구성한다.\n\n중간 문단에서는 발표 배경, 적용 대상, 기대 효과, 현장에 미칠 영향을 설명한다. 확인되지 않은 홍보성 표현은 삭제하거나 완화한다.\n\n마지막 문단에서는 후속 일정, 유의 사항, 독자가 추가로 확인할 지점을 정리한다.`;
  }

  return `첫 문단은 기사 핵심을 바로 제시한다. 무엇이 달라졌고, 왜 독자가 알아야 하는지 2~3문장으로 압축한다.\n\n중간 문단에서는 배경과 현장 맥락을 이어 쓴다. 정책, 시장 흐름, 소비자 변화, 지역 상권의 반응을 근거 중심으로 설명한다.\n\n마지막 문단에서는 독자에게 미치는 영향과 향후 과제를 정리한다. 단정적 전망이나 광고성 표현은 피하고, 확인 가능한 사실과 신중한 분석으로 마무리한다.`;
}
