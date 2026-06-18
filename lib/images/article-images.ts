import type { Article } from '@/types/database';

export type ArticleImageDisplay = {
  url: string;
  caption: string;
  sourceName: string;
  sourceUrl?: string;
  license?: string;
  isFallback: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const categoryFallbackImages: Record<string, ArticleImageDisplay> = {
  'lifelong-education': {
    url: unsplash('photo-1524178232363-1fb2b075b655'),
    caption: '▲ 평생교육·HRD 관련 교육 현장 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'career-dev': {
    url: unsplash('photo-1434030216411-0b793f4b4173'),
    caption: '▲ 자격증·자기계발 관련 학습 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'senior-education': {
    url: unsplash('photo-1573497019940-1c28c88b4f3e'),
    caption: '▲ 시니어·실버교육 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'edutech-ai': {
    url: unsplash('photo-1488590528505-98d2b5aba04b'),
    caption: '▲ 에듀테크·AI 교육 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'wellness-life': {
    url: unsplash('photo-1516321318423-f06f85e504b3'),
    caption: '▲ 웰니스·인문학 교육 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'edu-institution': {
    url: unsplash('photo-1523050854058-8df90110c9f1'),
    caption: '▲ 교육기관 탐방 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'interview-people': {
    url: unsplash('photo-1551836022-d5d88e9218df'),
    caption: '▲ 교육 전문가 인터뷰 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  opinion: {
    url: unsplash('photo-1495020689067-958852a7765e'),
    caption: '▲ 오피니언·칼럼 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'press-release': {
    url: unsplash('photo-1557804506-669a67965ba0'),
    caption: '▲ 공지·보도자료 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  education: {
    url: unsplash('photo-1509062522246-3755977927d7'),
    caption: '▲ 교육 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  default: {
    url: unsplash('photo-1524178232363-1fb2b075b655'),
    caption: '▲ 에듀저널 기사 관련 교육 현장 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  }
};

function isUsableImageUrl(url?: string | null) {
  if (!url) return false;
  if (url.startsWith('http://')) return false;
  if (url.startsWith('https://images.unsplash.com/') || url.startsWith('https://images.pexels.com/')) return true;
  if (url.startsWith('https://') && url.includes('.supabase.co/')) return true;
  return false;
}

export function getFallbackArticleImage(categorySlug?: string | null, categoryName?: string | null): ArticleImageDisplay {
  if (categorySlug && categoryFallbackImages[categorySlug]) return categoryFallbackImages[categorySlug];

  const matchedByName = Object.entries(categoryFallbackImages).find(([, image]) => {
    if (!categoryName) return false;
    return image.caption.includes(categoryName.replace('·', '')) || image.caption.includes(categoryName);
  });

  return matchedByName?.[1] ?? categoryFallbackImages.default;
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
      isFallback: false
    };
  }

  return getFallbackArticleImage(article.categories?.slug, article.categories?.name);
}
