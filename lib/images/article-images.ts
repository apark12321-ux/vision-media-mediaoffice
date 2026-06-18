import type { Article } from '@/types/database';

export type ArticleImageDisplay = {
  url: string;
  caption: string;
  sourceName: string;
  sourceUrl?: string;
  license?: string;
  isFallback: boolean;
};

const LOCAL_EDU_IMAGE = '/media/edu-lifelong.svg';

const captions: Record<string, string> = {
  'lifelong-education': '▲ 평생교육·HRD 관련 교육 현장 자료사진.',
  'career-dev': '▲ 자격증·자기계발 관련 학습 자료사진.',
  'senior-education': '▲ 시니어·실버교육 관련 자료사진.',
  'edutech-ai': '▲ 에듀테크·AI 교육 관련 자료사진.',
  'wellness-life': '▲ 웰니스·인문학 교육 관련 자료사진.',
  'edu-institution': '▲ 교육기관 탐방 관련 자료사진.',
  'interview-people': '▲ 교육 전문가 인터뷰 관련 자료사진.',
  opinion: '▲ 오피니언·칼럼 관련 자료사진.',
  'press-release': '▲ 공지·보도자료 관련 자료사진.',
  education: '▲ 교육 관련 자료사진.',
  default: '▲ 에듀저널 기사 관련 교육 현장 자료사진.'
};

function fallbackImage(categorySlug?: string | null): ArticleImageDisplay {
  const caption = (categorySlug && captions[categorySlug]) || captions.default;
  return {
    url: LOCAL_EDU_IMAGE,
    caption,
    sourceName: '에듀저널 그래픽',
    sourceUrl: undefined,
    license: '자체 제작 이미지',
    isFallback: true
  };
}

function isUsableImageUrl(url?: string | null) {
  if (!url) return false;
  if (url.startsWith('/media/')) return true;
  if (url.startsWith('http://')) return false;
  if (url.startsWith('https://') && url.includes('.supabase.co/')) return true;
  return false;
}

export function getFallbackArticleImage(categorySlug?: string | null): ArticleImageDisplay {
  return fallbackImage(categorySlug);
}

export function getArticleImageForDisplay(article: Article): ArticleImageDisplay {
  if (isUsableImageUrl(article.thumbnail_url)) {
    const sourceName = article.image_source_name || '에듀저널 DB';
    return {
      url: article.thumbnail_url!,
      caption: article.image_caption || `▲ ${article.title} 관련 자료사진. 출처=${sourceName}.`,
      sourceName,
      sourceUrl: article.image_source_url || undefined,
      license: article.image_license || undefined,
      isFallback: article.thumbnail_url?.startsWith('/media/') ?? false
    };
  }

  return fallbackImage(article.categories?.slug);
}
