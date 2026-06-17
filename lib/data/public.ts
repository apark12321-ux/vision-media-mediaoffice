import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings: SiteSettings = {
  id: 'fallback',
  site_name: '생활경제저널',
  site_description: '생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 브랜드와 사람을 기록하는 생활경제 전문 미디어입니다.',
  operator_name: 'Algo Partners',
  business_name: '알고파트너스',
  representative_name: '박예준',
  media_registration_status: 'unregistered',
  contact_email: 'contact@example.com',
  contact_phone: '000-0000-0000'
};

export const fallbackCategories: Category[] = [
  { id: 'cat-life-economy', name: '생활경제', slug: 'life-economy', description: '생활경제 현장과 소비 트렌드', sort_order: 1 },
  { id: 'cat-local-business', name: '지역상권', slug: 'local-business', description: '지역 상권과 생활서비스', sort_order: 2 },
  { id: 'cat-education', name: '교육·학원', slug: 'education', description: '교육기관과 학원 운영 현장', sort_order: 3 },
  { id: 'cat-senior-care', name: '시니어·요양', slug: 'senior-care', description: '요양, 돌봄, 시니어 서비스', sort_order: 4 },
  { id: 'cat-health-beauty', name: '건강·뷰티', slug: 'health-beauty', description: '건강, 뷰티, 웰니스 서비스', sort_order: 5 },
  { id: 'cat-startup-franchise', name: '창업·프랜차이즈', slug: 'startup-franchise', description: '창업과 프랜차이즈 정보', sort_order: 6 },
  { id: 'cat-brand-interview', name: '브랜드 인터뷰', slug: 'brand-interview', description: '브랜드와 대표자의 이야기', sort_order: 7 },
  { id: 'cat-opinion', name: '오피니언', slug: 'opinion', description: '편집부 칼럼과 전문가 기고', sort_order: 8 },
  { id: 'cat-press-release', name: '보도자료', slug: 'press-release', description: '기업, 기관, 단체 제공 자료', sort_order: 9 }
];

function category(slug: string) {
  return fallbackCategories.find((item) => item.slug === slug) ?? fallbackCategories[0]!;
}

function fallbackArticle(input: {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categorySlug: string;
  articleType?: Article['article_type'];
  isSponsored?: boolean;
  tags: string[];
  publishedAt: string;
  author?: string;
  sponsoredNotice?: string;
}): Article {
  const selectedCategory = category(input.categorySlug);

  return {
    id: input.id,
    title: input.title,
    slug: input.slug,
    subtitle: null,
    summary: input.summary,
    content: input.content,
    category_id: selectedCategory.id,
    article_type: input.articleType ?? 'normal',
    status: 'published',
    thumbnail_url: null,
    author_name: input.author ?? '편집부',
    client_id: null,
    is_sponsored: input.isSponsored ?? false,
    sponsored_notice: input.sponsoredNotice ?? null,
    tags: input.tags,
    seo_title: input.title,
    seo_description: input.summary,
    compliance_checked: true,
    forbidden_terms_detected: [],
    published_at: input.publishedAt,
    created_at: input.publishedAt,
    updated_at: input.publishedAt,
    categories: selectedCategory
  };
}

export const fallbackArticles: Article[] = [
  fallbackArticle({
    id: 'article-001',
    title: '고물가 시대, 동네 소비가 달라지는 세 가지 흐름',
    slug: 'life-economy-local-consumption-trends',
    summary: '생활비 부담이 커지는 상황에서 소비자는 가격, 접근성, 신뢰도를 함께 따지고 있습니다.',
    content: `고물가가 이어지면서 생활경제의 중심은 거창한 소비보다 매일 반복되는 선택으로 이동하고 있습니다.

소비자는 가까운 거리, 합리적인 가격, 꾸준한 서비스 품질을 기준으로 동네 업체를 다시 살펴보고 있습니다. 특히 생활서비스 업종에서는 일회성 할인보다 설명이 명확하고 응대가 안정적인 곳이 선택받는 흐름이 나타납니다.

지역 사업자에게 필요한 것은 단순 홍보보다 고객이 안심하고 비교할 수 있는 정보입니다. 운영 철학, 가격 기준, 서비스 절차, 후기 관리 방식이 콘텐츠로 정리될 때 신뢰 형성에 도움이 됩니다.`,
    categorySlug: 'life-economy',
    tags: ['생활경제', '소비트렌드', '지역상권'],
    publishedAt: '2026-06-17T09:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-002',
    title: '생활서비스 업종이 가격보다 먼저 설명해야 할 것',
    slug: 'life-service-trust-points',
    summary: '고객은 가격표보다 서비스 범위, 책임 기준, 상담 방식에서 신뢰를 확인합니다.',
    content: `생활서비스 업종에서 가격은 중요한 판단 기준이지만, 가격만으로 선택이 끝나지는 않습니다.

고객은 실제 서비스 범위가 어디까지인지, 추가 비용은 어떤 경우에 발생하는지, 문제가 생겼을 때 어떻게 대응하는지를 알고 싶어 합니다. 이 정보가 명확할수록 상담 전환율과 재방문 가능성이 높아집니다.

따라서 업체 소개 콘텐츠에는 가격보다 먼저 서비스 절차, 고객 응대 원칙, 사례 기반 설명이 포함되어야 합니다.`,
    categorySlug: 'life-economy',
    tags: ['생활서비스', '고객신뢰', '상담'],
    publishedAt: '2026-06-16T16:20:00+09:00'
  }),
  fallbackArticle({
    id: 'article-003',
    title: '생활경제 현장에서 브랜드 콘텐츠가 필요한 이유',
    slug: 'why-brand-content-matters-in-everyday-economy',
    summary: '검색과 비교가 일상화되면서 업체의 설명력 자체가 경쟁력이 되고 있습니다.',
    content: `소비자는 업체를 선택하기 전에 검색 결과, 지도 리뷰, 홈페이지, 블로그, 기사형 콘텐츠를 함께 확인합니다.

이 과정에서 중요한 것은 과장된 표현이 아니라 일관된 설명입니다. 무엇을 제공하는지, 누구에게 맞는지, 어떤 기준으로 운영하는지가 정리되어 있으면 고객은 선택 부담을 줄일 수 있습니다.

브랜드 콘텐츠는 광고 문구가 아니라 신뢰를 설명하는 자료가 되어야 합니다.`,
    categorySlug: 'life-economy',
    tags: ['브랜드콘텐츠', '생활경제', '신뢰'],
    publishedAt: '2026-06-15T11:10:00+09:00'
  }),
  fallbackArticle({
    id: 'article-004',
    title: '동네 상권에서 오래가는 매장의 공통점',
    slug: 'local-shops-long-run-factors',
    summary: '오래가는 매장은 위치보다 고객 관계, 반복 품질, 지역 내 평판을 꾸준히 관리합니다.',
    content: `지역 상권에서 오래 버티는 매장은 대체로 공통된 운영 기준을 갖고 있습니다.

첫째, 고객 응대가 일정합니다. 둘째, 서비스 품질의 편차가 작습니다. 셋째, 지역 내 평판을 단기 이벤트보다 장기 관계로 관리합니다.

상권 경쟁이 치열할수록 매장의 이야기를 정리하고 고객에게 전달하는 능력도 중요해집니다.`,
    categorySlug: 'local-business',
    tags: ['지역상권', '동네매장', '평판관리'],
    publishedAt: '2026-06-14T15:00:00+09:00'
  }),
  fallbackArticle({
    id: 'article-005',
    title: '지역 상권 홍보, 전단지보다 먼저 정리해야 할 기본 정보',
    slug: 'local-business-basic-information',
    summary: '업체명, 위치, 대표 서비스, 운영시간, 상담 채널 같은 기본 정보가 먼저 정리되어야 합니다.',
    content: `지역 상권 홍보에서 가장 먼저 점검해야 할 것은 화려한 광고 문구가 아니라 기본 정보입니다.

고객은 업체명, 위치, 운영시간, 서비스 범위, 예약 방법, 대표 메뉴 또는 상품을 빠르게 확인하고 싶어 합니다. 이 정보가 흩어져 있으면 광고비를 써도 전환이 떨어질 수 있습니다.

기본 정보가 정리된 뒤에야 인터뷰, 리뷰, 카드뉴스, 배너 광고가 효과를 낼 수 있습니다.`,
    categorySlug: 'local-business',
    tags: ['지역홍보', '상권마케팅', '기본정보'],
    publishedAt: '2026-06-13T10:40:00+09:00'
  }),
  fallbackArticle({
    id: 'article-006',
    title: '예약제 매장이 고객 이탈을 줄이는 상담 문구',
    slug: 'reservation-shop-consulting-copy',
    summary: '예약제 매장은 첫 문의 응대에서 절차, 시간, 준비사항을 명확히 안내해야 합니다.',
    content: `예약제 매장은 첫 상담에서 고객의 불안을 줄이는 것이 중요합니다.

방문 전 준비사항, 예상 소요 시간, 상담 절차, 변경 및 취소 기준을 명확하게 안내하면 고객 이탈을 줄일 수 있습니다. 특히 카카오톡이나 문자 상담에서는 짧고 구체적인 문구가 효과적입니다.

좋은 상담 문구는 고객을 설득하기보다 고객이 다음 행동을 쉽게 결정하도록 돕습니다.`,
    categorySlug: 'local-business',
    tags: ['예약제매장', '상담문구', '고객관리'],
    publishedAt: '2026-06-12T14:10:00+09:00'
  }),
  fallbackArticle({
    id: 'article-007',
    title: '학원 선택에서 학부모가 가장 먼저 보는 것은 무엇인가',
    slug: 'education-choice-criteria',
    summary: '학부모가 학원 선택 전 확인하는 신뢰 요소를 정리했습니다.',
    content: `학부모는 학원 선택 전 강사진, 커리큘럼, 상담 방식, 후기, 운영 철학을 확인합니다.

좋은 교육기관일수록 교육 철학과 학습 관리 방식이 분명하게 정리되어 있습니다. 단순히 성적 향상을 강조하기보다 학생을 어떻게 관찰하고 피드백하는지가 중요합니다.

학원 콘텐츠는 커리큘럼 소개와 함께 학부모 상담에서 자주 나오는 질문을 반영해야 합니다.`,
    categorySlug: 'education',
    tags: ['학원', '교육', '학부모'],
    publishedAt: '2026-06-11T13:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-008',
    title: '교육기관 소개 콘텐츠에 반드시 들어가야 할 네 가지',
    slug: 'education-content-four-points',
    summary: '교육기관은 강사진, 커리큘럼, 관리 시스템, 상담 원칙을 균형 있게 보여줘야 합니다.',
    content: `교육기관 소개 콘텐츠는 시설 사진만으로 충분하지 않습니다.

강사진의 전문성, 커리큘럼의 흐름, 학생 관리 시스템, 학부모 상담 원칙이 함께 설명되어야 합니다. 특히 신규 학부모는 수업 내용보다 관리 방식과 소통 방식을 궁금해합니다.

교육기관의 신뢰도는 결과를 과장하는 문구보다 과정을 설명하는 콘텐츠에서 만들어집니다.`,
    categorySlug: 'education',
    tags: ['교육기관', '커리큘럼', '학부모상담'],
    publishedAt: '2026-06-10T09:50:00+09:00'
  }),
  fallbackArticle({
    id: 'article-009',
    title: '소규모 학원이 대형 학원과 다르게 보여줘야 할 강점',
    slug: 'small-academy-brand-strengths',
    summary: '소규모 학원은 밀착 관리, 빠른 피드백, 원장 철학을 구체적으로 보여줄 필요가 있습니다.',
    content: `소규모 학원은 대형 학원과 같은 방식으로 홍보하면 차별성이 약해질 수 있습니다.

오히려 원장 직접 관리, 학생별 피드백, 학부모와의 빠른 소통, 유연한 학습 설계가 강점이 될 수 있습니다. 이런 장점은 짧은 광고 문구보다 인터뷰형 콘텐츠에서 잘 드러납니다.

고객이 알고 싶은 것은 규모가 아니라 우리 아이를 어떻게 봐줄 수 있는가입니다.`,
    categorySlug: 'education',
    tags: ['소규모학원', '교육마케팅', '브랜드인터뷰'],
    publishedAt: '2026-06-09T17:00:00+09:00'
  }),
  fallbackArticle({
    id: 'article-010',
    title: '요양센터 선택 전 보호자가 확인해야 할 7가지 기준',
    slug: 'senior-care-checklist',
    summary: '요양센터 선택 전 보호자가 확인하면 좋은 기준을 정리했습니다.',
    content: `요양센터를 선택할 때는 시설 환경, 상담 응대, 프로그램 구성, 보호자 소통 방식, 안전 관리 체계 등을 종합적으로 확인해야 합니다.

무엇보다 중요한 것은 가족이 안심할 수 있는 설명과 투명한 운영 방식입니다. 보호자는 비용뿐 아니라 어르신의 일상 관리 방식과 응급 상황 대응 절차를 궁금해합니다.

센터는 상담 과정에서 이 기준을 명확하게 안내할 필요가 있습니다.`,
    categorySlug: 'senior-care',
    tags: ['요양센터', '시니어', '보호자'],
    publishedAt: '2026-06-08T10:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-011',
    title: '방문요양센터가 보호자에게 신뢰를 주는 설명 방식',
    slug: 'home-care-trust-communication',
    summary: '방문요양 상담에서는 서비스 범위, 요양보호사 매칭, 보고 방식이 핵심입니다.',
    content: `방문요양센터는 보호자와 직접 대면하기 전 전화 상담에서 신뢰가 결정되는 경우가 많습니다.

상담 시 서비스 범위, 요양보호사 매칭 기준, 방문 일정 조율, 보호자 보고 방식을 구체적으로 설명해야 합니다. 막연히 친절하다고 말하기보다 실제 관리 체계를 보여주는 것이 중요합니다.

신뢰는 추상적 표현보다 반복 가능한 절차에서 생깁니다.`,
    categorySlug: 'senior-care',
    tags: ['방문요양', '보호자상담', '돌봄서비스'],
    publishedAt: '2026-06-07T12:00:00+09:00'
  }),
  fallbackArticle({
    id: 'article-012',
    title: '주야간보호센터 홍보에서 프로그램 소개가 중요한 이유',
    slug: 'day-care-center-program-content',
    summary: '프로그램 구성은 센터의 운영 철학과 돌봄 품질을 보여주는 핵심 콘텐츠입니다.',
    content: `주야간보호센터를 찾는 보호자는 하루 프로그램이 어떻게 구성되는지 궁금해합니다.

인지 활동, 신체 활동, 식사, 휴식, 송영, 보호자 소통 방식이 정리되어 있으면 센터의 운영 수준을 이해하기 쉽습니다. 사진과 함께 설명된 프로그램 콘텐츠는 상담 전 신뢰 형성에 도움이 됩니다.

센터 홍보는 시설 소개에서 끝나지 않고 일상 관리의 흐름을 보여줘야 합니다.`,
    categorySlug: 'senior-care',
    tags: ['주야간보호센터', '프로그램', '시니어케어'],
    publishedAt: '2026-06-06T15:20:00+09:00'
  }),
  fallbackArticle({
    id: 'article-013',
    title: '피부관리실이 고객 신뢰를 얻기 위해 준비해야 할 콘텐츠',
    slug: 'skin-care-shop-trust-content',
    summary: '뷰티 업종은 가격 이벤트보다 상담 기준, 위생 관리, 관리 절차 설명이 중요합니다.',
    content: `피부관리실은 시술이나 관리 효과를 과장하기보다 상담 과정과 관리 절차를 정확히 설명해야 합니다.

고객은 어떤 제품을 쓰는지, 위생 관리는 어떻게 하는지, 첫 방문 상담은 어떤 방식으로 진행되는지 확인하고 싶어 합니다. 이 정보가 정리되어 있으면 신규 고객의 심리적 장벽이 낮아집니다.

뷰티 콘텐츠는 감성 이미지와 함께 신뢰 정보를 담아야 합니다.`,
    categorySlug: 'health-beauty',
    tags: ['피부관리실', '뷰티', '고객신뢰'],
    publishedAt: '2026-06-05T11:45:00+09:00'
  }),
  fallbackArticle({
    id: 'article-014',
    title: '건강관리 서비스 홍보에서 피해야 할 과장 표현',
    slug: 'health-service-risky-ad-copy',
    summary: '건강 관련 서비스는 효과 보장, 최고 표현, 치료 오인 문구를 특히 주의해야 합니다.',
    content: `건강관리 서비스는 고객 관심도가 높은 만큼 표현 리스크도 큽니다.

효과를 보장하거나, 의학적 치료로 오인될 수 있는 표현, 객관적 근거 없이 최고라고 주장하는 표현은 피해야 합니다. 서비스 소개는 대상, 절차, 주의사항, 상담 기준 중심으로 구성하는 것이 안전합니다.

신뢰도는 강한 표현보다 정확한 설명에서 나옵니다.`,
    categorySlug: 'health-beauty',
    tags: ['건강관리', '광고표현', '컴플라이언스'],
    publishedAt: '2026-06-04T09:20:00+09:00'
  }),
  fallbackArticle({
    id: 'article-015',
    title: '뷰티샵 첫 방문 고객을 늘리는 소개문 구성법',
    slug: 'beauty-shop-intro-copy-structure',
    summary: '첫 방문 고객은 가격보다 위치, 예약, 상담, 관리 흐름을 먼저 확인합니다.',
    content: `뷰티샵 소개문은 예쁜 문장보다 고객이 궁금해하는 정보를 먼저 담아야 합니다.

위치, 예약 방법, 첫 방문 상담, 관리 시간, 주차 여부, 준비사항을 정리하면 문의 전환에 도움이 됩니다. 여기에 운영자의 철학과 고객 응대 기준을 더하면 브랜드 신뢰가 강화됩니다.

좋은 소개문은 고객의 질문을 미리 줄여주는 역할을 합니다.`,
    categorySlug: 'health-beauty',
    tags: ['뷰티샵', '소개문', '예약상담'],
    publishedAt: '2026-06-03T18:10:00+09:00'
  }),
  fallbackArticle({
    id: 'article-016',
    title: '창업 초기 브랜드가 온라인에서 신뢰를 쌓는 방법',
    slug: 'startup-brand-online-trust',
    summary: '초기 브랜드는 판매 문구보다 대표자 소개, 문제 해결 방식, 고객 사례를 먼저 정리해야 합니다.',
    content: `창업 초기 브랜드는 인지도가 낮기 때문에 고객이 신뢰할 근거를 충분히 제공해야 합니다.

대표자의 경험, 창업 배경, 고객 문제를 바라보는 관점, 서비스 절차, 초기 고객 사례를 정리하면 브랜드의 실체가 분명해집니다. 단순한 가격 할인보다 왜 이 브랜드를 선택해야 하는지 설명하는 콘텐츠가 필요합니다.

초기 브랜드에게 콘텐츠는 영업자료이자 신뢰자료입니다.`,
    categorySlug: 'startup-franchise',
    tags: ['창업', '브랜드', '온라인신뢰'],
    publishedAt: '2026-06-02T14:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-017',
    title: '프랜차이즈 가맹 상담 전 준비해야 할 콘텐츠',
    slug: 'franchise-consulting-content',
    summary: '가맹 상담에서는 수익보다 운영 구조, 교육, 지원 체계 설명이 중요합니다.',
    content: `프랜차이즈 홍보에서 예비 창업자는 예상 수익만 보는 것이 아닙니다.

본사의 교육 체계, 운영 매뉴얼, 물류 지원, 마케팅 지원, 초기 정착 지원이 어떻게 구성되어 있는지 확인합니다. 이 정보가 부족하면 상담 문의가 들어와도 전환이 어렵습니다.

가맹 콘텐츠는 숫자보다 구조를 먼저 설명해야 합니다.`,
    categorySlug: 'startup-franchise',
    tags: ['프랜차이즈', '가맹상담', '창업정보'],
    publishedAt: '2026-06-01T10:10:00+09:00'
  }),
  fallbackArticle({
    id: 'article-018',
    title: '1인 창업자가 브랜드 소개 페이지를 먼저 만들어야 하는 이유',
    slug: 'solo-founder-brand-page',
    summary: '1인 창업자는 자신이 누구인지, 무엇을 해결하는지, 어떻게 일하는지를 분명히 보여줘야 합니다.',
    content: `1인 창업자는 회사 규모보다 대표자의 전문성과 일하는 방식이 브랜드 신뢰의 핵심이 됩니다.

브랜드 소개 페이지에는 창업 배경, 서비스 대상, 작업 절차, 상담 방식, 포트폴리오가 정리되어야 합니다. 고객은 큰 회사인지보다 믿고 맡길 수 있는 사람인지 확인합니다.

이 때문에 1인 창업자에게 소개 콘텐츠는 가장 기본적인 영업 자산입니다.`,
    categorySlug: 'startup-franchise',
    tags: ['1인창업', '브랜드소개', '창업마케팅'],
    publishedAt: '2026-05-31T16:50:00+09:00'
  }),
  fallbackArticle({
    id: 'article-019',
    title: '브랜드 인터뷰: 지역에서 신뢰를 쌓아온 교육기관의 운영 철학',
    slug: 'brand-interview-education-sample',
    summary: '지역 교육기관의 운영 철학과 고객 신뢰 포인트를 담은 브랜드 인터뷰 샘플입니다.',
    content: `본 콘텐츠는 브랜드 인터뷰 샘플입니다.

지역에서 오래 운영되는 교육기관은 단순한 강의 제공을 넘어 학부모와 학생의 신뢰를 관리합니다. 대표자의 교육 철학, 상담 방식, 학습 관리 체계는 고객이 기관을 선택하는 중요한 기준이 됩니다.

생활경제저널은 브랜드 인터뷰를 통해 업체의 운영 철학과 현장의 이야기를 독자가 이해하기 쉬운 콘텐츠로 정리합니다.`,
    categorySlug: 'brand-interview',
    articleType: 'brand_interview',
    isSponsored: true,
    sponsoredNotice: '[브랜드 인터뷰 · 제휴 콘텐츠] 본 콘텐츠는 브랜드 인터뷰 샘플로 제작되었습니다.',
    tags: ['브랜드인터뷰', '교육기관', '제휴콘텐츠'],
    publishedAt: '2026-05-30T13:00:00+09:00'
  }),
  fallbackArticle({
    id: 'article-020',
    title: '브랜드 인터뷰: 보호자와의 소통을 중시하는 돌봄 서비스',
    slug: 'brand-interview-care-communication',
    summary: '돌봄 서비스에서 보호자 소통과 운영 투명성이 왜 중요한지 소개합니다.',
    content: `본 콘텐츠는 브랜드 인터뷰 샘플입니다.

돌봄 서비스는 서비스 제공자와 보호자 사이의 신뢰가 무엇보다 중요합니다. 상담 과정에서 서비스 범위와 보고 방식을 명확히 설명하는 업체는 보호자의 불안을 줄일 수 있습니다.

브랜드 인터뷰는 단순 홍보가 아니라 운영자가 어떤 기준으로 서비스를 제공하는지 보여주는 콘텐츠입니다.`,
    categorySlug: 'brand-interview',
    articleType: 'brand_interview',
    isSponsored: true,
    sponsoredNotice: '[브랜드 인터뷰 · 제휴 콘텐츠] 본 콘텐츠는 브랜드 인터뷰 샘플로 제작되었습니다.',
    tags: ['브랜드인터뷰', '돌봄서비스', '보호자소통'],
    publishedAt: '2026-05-29T09:40:00+09:00'
  }),
  fallbackArticle({
    id: 'article-021',
    title: '브랜드 인터뷰: 동네 매장이 단골을 만드는 방식',
    slug: 'brand-interview-local-shop-regulars',
    summary: '지역 매장이 단골 고객과 관계를 만들어가는 과정을 인터뷰 형식으로 정리했습니다.',
    content: `본 콘텐츠는 브랜드 인터뷰 샘플입니다.

동네 매장의 경쟁력은 위치나 가격만으로 설명되지 않습니다. 고객을 기억하고, 응대 기준을 유지하며, 지역 안에서 관계를 쌓는 과정이 브랜드 자산이 됩니다.

생활경제저널의 브랜드 인터뷰는 이런 현장의 이야기를 기사형 콘텐츠로 기록합니다.`,
    categorySlug: 'brand-interview',
    articleType: 'brand_interview',
    isSponsored: true,
    sponsoredNotice: '[브랜드 인터뷰 · 제휴 콘텐츠] 본 콘텐츠는 브랜드 인터뷰 샘플로 제작되었습니다.',
    tags: ['브랜드인터뷰', '지역상권', '단골고객'],
    publishedAt: '2026-05-28T15:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-022',
    title: '편집부 칼럼: 좋은 광고는 먼저 신뢰를 설명한다',
    slug: 'opinion-good-advertising-explains-trust',
    summary: '생활경제 업종에서 광고는 강한 문구보다 신뢰 형성 구조를 갖춰야 합니다.',
    content: `생활경제 업종의 광고는 소비자에게 즉각적인 선택을 요구하기보다 신뢰할 수 있는 근거를 제공해야 합니다.

고객은 가격, 위치, 후기, 상담 방식, 운영자의 태도를 함께 비교합니다. 이때 광고가 해야 할 일은 과장된 약속이 아니라 판단에 필요한 정보를 정리해주는 것입니다.

생활경제저널은 광고와 콘텐츠의 경계를 명확히 하면서도, 지역 사업자의 신뢰 형성에 필요한 정보를 전달하는 방식을 지향합니다.`,
    categorySlug: 'opinion',
    tags: ['오피니언', '광고', '신뢰'],
    publishedAt: '2026-05-27T11:00:00+09:00',
    author: '편집부'
  }),
  fallbackArticle({
    id: 'article-023',
    title: '편집부 칼럼: 생활경제 매체가 지역 브랜드를 다루는 방식',
    slug: 'opinion-local-brand-media-role',
    summary: '지역 브랜드 보도는 단순 소개를 넘어 소비자가 판단할 수 있는 정보를 제공해야 합니다.',
    content: `생활경제 매체가 지역 브랜드를 소개할 때 가장 중요한 기준은 독자의 이해입니다.

업체의 장점을 나열하는 데 그치지 않고, 어떤 고객에게 필요한 서비스인지, 선택 전 확인할 점은 무엇인지, 운영자의 철학은 무엇인지 정리해야 합니다.

지역 브랜드 콘텐츠는 광고성과 정보성을 구분하고, 독자가 오인하지 않도록 표시하는 원칙이 필요합니다.`,
    categorySlug: 'opinion',
    tags: ['오피니언', '지역브랜드', '매체운영'],
    publishedAt: '2026-05-26T14:20:00+09:00',
    author: '편집부'
  }),
  fallbackArticle({
    id: 'article-024',
    title: '기고: 1인 사업자에게 필요한 온라인 신뢰 자산',
    slug: 'opinion-solo-business-online-assets',
    summary: '1인 사업자는 소개문, 인터뷰, 후기, 포트폴리오를 일관되게 정리해야 합니다.',
    content: `1인 사업자에게 온라인 신뢰 자산은 선택이 아니라 기본 인프라입니다.

고객은 검색을 통해 사업자를 처음 만나고, 여러 채널의 정보를 비교한 뒤 문의 여부를 결정합니다. 소개문, 인터뷰, 후기, 포트폴리오가 서로 다른 말을 하고 있다면 신뢰가 약해집니다.

일관된 콘텐츠 정리는 작은 사업자일수록 더 큰 효과를 냅니다.`,
    categorySlug: 'opinion',
    tags: ['기고', '1인사업자', '온라인신뢰'],
    publishedAt: '2026-05-25T16:40:00+09:00',
    author: '외부기고'
  }),
  fallbackArticle({
    id: 'article-025',
    title: '알고파트너스, 생활경제 전문 매체 생활경제저널 운영 방향 공개',
    slug: 'press-release-algo-partners-everyday-economy-journal',
    summary: '알고파트너스는 생활경제저널을 통해 생활경제 현장과 브랜드 인터뷰 콘텐츠를 발행할 예정입니다.',
    content: `알고파트너스는 생활경제 전문 미디어 생활경제저널의 운영 방향을 공개했다.

생활경제저널은 지역상권, 교육, 시니어, 건강·뷰티, 창업 분야의 현장 정보와 브랜드 인터뷰 콘텐츠를 다룬다. 광고·협찬·제휴 콘텐츠는 독자가 식별할 수 있도록 별도 표시 기준을 적용할 예정이다.

알고파트너스는 매체 운영과 함께 광고대행, 콘텐츠 제작, AI 마케팅 컨설팅을 제공하는 구조로 서비스를 확장할 계획이다.`,
    categorySlug: 'press-release',
    articleType: 'press_release',
    tags: ['보도자료', '알고파트너스', '생활경제저널'],
    publishedAt: '2026-05-24T09:00:00+09:00'
  }),
  fallbackArticle({
    id: 'article-026',
    title: '생활경제저널, 브랜드 인터뷰 콘텐츠 운영 원칙 안내',
    slug: 'press-release-brand-interview-policy',
    summary: '생활경제저널은 브랜드 인터뷰와 제휴 콘텐츠의 표시 기준을 명확히 운영한다고 밝혔다.',
    content: `생활경제저널은 브랜드 인터뷰와 제휴 콘텐츠 운영 원칙을 안내했다.

브랜드 인터뷰는 업체 제공 자료와 인터뷰 내용을 바탕으로 제작되며, 광고 또는 제휴 목적의 콘텐츠일 경우 본문 상단에 관련 고지를 표시한다. 또한 허위·과장 표현을 줄이고 독자가 콘텐츠 성격을 이해할 수 있도록 표시 기준을 적용한다.

생활경제저널은 생활경제 현장의 정보를 다루는 매체로서 콘텐츠의 신뢰성과 광고 표시 투명성을 함께 관리할 계획이다.`,
    categorySlug: 'press-release',
    articleType: 'press_release',
    tags: ['보도자료', '브랜드인터뷰', '제휴콘텐츠'],
    publishedAt: '2026-05-23T10:30:00+09:00'
  }),
  fallbackArticle({
    id: 'article-027',
    title: 'MediaOffice, 1인 매체 운영을 위한 관리자 시스템으로 기획',
    slug: 'press-release-mediaoffice-admin-system',
    summary: 'MediaOffice는 기사 발행, 리드 관리, 고객 관리, 콘텐츠 제작을 통합하는 내부 운영툴로 기획되었습니다.',
    content: `MediaOffice는 1인 매체 운영자가 기사 발행과 광고 영업, 고객 관리, 콘텐츠 제작을 함께 처리할 수 있도록 기획된 관리자 시스템이다.

초기 버전은 기사 관리, 광고 문의 관리, 브랜드 인터뷰 신청 관리, AI 프롬프트 생성기, 컴플라이언스 체크리스트를 중심으로 구성된다. 향후 이메일 연동, 파일 업로드, 통계 대시보드 등을 추가할 계획이다.

MediaOffice는 생활경제저널의 내부 운영 효율을 높이기 위한 도구로 활용된다.`,
    categorySlug: 'press-release',
    articleType: 'press_release',
    tags: ['보도자료', 'MediaOffice', '운영툴'],
    publishedAt: '2026-05-22T13:10:00+09:00'
  })
];

const fallbackProducts: Product[] = [
  {
    id: 'product-brand-interview',
    name: '브랜드 인터뷰',
    slug: 'brand-interview',
    price: 490000,
    description: '대표자 인터뷰 기사와 홍보용 링크를 제공하는 기본 상품입니다.',
    features: ['대표자 인터뷰 기사', '업체 사진 반영', '사이트 내 발행', '홍보용 링크 제공'],
    is_active: true,
    sort_order: 1
  },
  {
    id: 'product-featured-brand-series',
    name: '우수 브랜드 기획전',
    slug: 'featured-brand-series',
    price: 890000,
    description: '브랜드 인터뷰와 기획전 노출, 블로그 재가공 원고를 포함합니다.',
    features: ['브랜드 인터뷰', '기획전 섹션 노출', '디지털 인증 이미지 문구', '블로그 재가공 원고'],
    is_active: true,
    sort_order: 2
  },
  {
    id: 'product-premium-ad-package',
    name: '프리미엄 광고 패키지',
    slug: 'premium-ad-package',
    price: 1490000,
    description: '인터뷰, 배너, 카드뉴스 문구, 플레이스 소개문까지 포함한 패키지입니다.',
    features: ['인터뷰 기사', '배너 광고 1개월', '카드뉴스 문구', '네이버 플레이스 소개문', '상패/인증서 문구'],
    is_active: true,
    sort_order: 3
  },
  {
    id: 'product-monthly-advertiser',
    name: '월 광고주 패키지',
    slug: 'monthly-advertiser',
    price: 390000,
    description: '월간 콘텐츠와 소식 문구를 제공하는 관리형 상품입니다.',
    features: ['월 1~2회 콘텐츠', '배너 노출', '이벤트/소식 문구', '블로그/SNS 재가공 콘텐츠'],
    is_active: true,
    sort_order: 4
  }
];

function mergeBySlug<T extends { slug: string }>(primary: T[], fallback: T[], limit?: number): T[] {
  const seen = new Set(primary.map((item) => item.slug));
  const merged = [...primary, ...fallback.filter((item) => !seen.has(item.slug))];
  return typeof limit === 'number' ? merged.slice(0, limit) : merged;
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('site_settings').select('*').limit(1).single();
    return (data as SiteSettings) ?? fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
    return mergeBySlug((data as Category[]) ?? [], fallbackCategories);
  } catch {
    return fallbackCategories;
  }
}

export async function getPublishedArticles(limit = 12): Promise<Article[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('articles')
      .select('*, categories(*)')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false })
      .limit(limit);
    return mergeBySlug((data as Article[]) ?? [], fallbackArticles, limit);
  } catch {
    return fallbackArticles.slice(0, limit);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('articles')
      .select('*, categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .maybeSingle();
    return (data as Article) ?? fallbackArticles.find((article) => article.slug === slug) ?? null;
  } catch {
    return fallbackArticles.find((article) => article.slug === slug) ?? null;
  }
}

export async function getArticlesByCategory(slug: string): Promise<Article[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('articles')
      .select('*, categories!inner(*)')
      .eq('categories.slug', slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false });
    const dbArticles = (data as Article[]) ?? [];
    const fallbackCategoryArticles = fallbackArticles.filter((article) => article.categories?.slug === slug);
    return mergeBySlug(dbArticles, fallbackCategoryArticles);
  } catch {
    return fallbackArticles.filter((article) => article.categories?.slug === slug);
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    return mergeBySlug((data as Product[]) ?? [], fallbackProducts);
  } catch {
    return fallbackProducts;
  }
}
