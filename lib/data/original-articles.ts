export type OriginalArticleSeed = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  content: string;
  categorySlug: string;
  articleType?: 'normal' | 'brand_interview' | 'sponsored' | 'advertorial' | 'press_release';
  isSponsored?: boolean;
  sponsoredNotice?: string;
  tags: string[];
  publishedAt: string;
  author?: string;
  thumbnailUrl: string;
  imageCaption: string;
  imageSourceName: string;
};

const img = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80';

export const originalArticleSeeds: OriginalArticleSeed[] = [
  {
    id: 'edu-main-001',
    title: '성인학습 수요 확대…교육 정보의 신뢰성이 중요해졌다',
    slug: 'adult-learning-trust-education-news',
    subtitle: '평생학습과 직무교육 수요가 늘면서 교육 전문 정보의 역할이 커지고 있다',
    summary: '성인학습과 직무교육 수요가 확대되면서 학습자는 과정명보다 운영 기준과 학습 지원 체계를 더 꼼꼼히 확인하고 있다.',
    content: `성인학습 수요가 확대되면서 교육 정보의 신뢰성이 중요한 기준으로 떠오르고 있다. 직무 전환, 자격증 준비, 디지털 역량 강화, 시니어 학습까지 교육 수요가 세분화되면서 학습자는 단순한 홍보 문구보다 실제 운영 기준을 확인하려는 경향을 보이고 있다.\n\n교육기관도 이 변화에 맞춰 과정 소개 방식을 다시 정비하고 있다. 수강료와 수료증만 안내하는 방식으로는 충분하지 않으며, 강사 전문성, 학습 목표, 상담 기준, 환불 안내, 사후 관리 체계를 함께 제시해야 신뢰를 얻을 수 있다는 분석이다.\n\n![성인학습 관련 교육 현장 자료사진.](${img} "Unsplash")\n\n전문가들은 평생교육 시장이 양적 확대에서 질적 검증 단계로 이동하고 있다고 본다. 온라인 교육과 원격 강의가 보편화되면서 누구나 교육 과정을 만들 수 있게 됐지만, 학습자는 더 이상 강의 수만으로 기관을 판단하지 않는다. 학습 경험과 운영 투명성이 함께 평가되는 구조가 강화되고 있다.\n\n에듀저널은 교육 정책과 자격증, 시니어 교육, 에듀테크, 교육기관 운영 사례를 지속적으로 기록하며 학습자에게 필요한 정보를 제공할 계획이다. 교육 콘텐츠를 단순 광고가 아니라 생활형 학습 정보로 정리하는 것이 교육 전문 매체의 중요한 역할이라는 판단이다.`,
    categorySlug: 'education',
    tags: ['교육', '평생학습', '성인학습'],
    publishedAt: '2026-06-18T09:20:00+09:00',
    thumbnailUrl: img,
    imageCaption: '성인학습 관련 교육 현장 자료사진.',
    imageSourceName: 'Unsplash'
  }
];
