import type { Article } from '@/types/database';

export type ArticleImageDisplay = {
  url: string;
  caption: string;
  sourceName: string;
  sourceUrl?: string;
  license?: string;
  isFallback: boolean;
};

const categoryFallbackImages: Record<string, ArticleImageDisplay> = {
  'life-economy': {
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 생활경제 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'local-business': {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 지역상권 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  education: {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 교육·학원 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'senior-care': {
    url: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 시니어·요양 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'health-beauty': {
    url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 건강·뷰티 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'startup-franchise': {
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 창업·프랜차이즈 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'brand-interview': {
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 브랜드 인터뷰 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  opinion: {
    url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 오피니언 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  'press-release': {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 보도자료 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  },
  default: {
    url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    caption: '▲ 생활경제저널 기사 관련 자료사진. 출처=Unsplash.',
    sourceName: 'Unsplash',
    sourceUrl: 'https://unsplash.com/',
    license: 'Unsplash License',
    isFallback: true
  }
};

export function getFallbackArticleImage(categorySlug?: string | null, categoryName?: string | null): ArticleImageDisplay {
  if (categorySlug && categoryFallbackImages[categorySlug]) return categoryFallbackImages[categorySlug];

  const matchedByName = Object.entries(categoryFallbackImages).find(([, image]) => {
    if (!categoryName) return false;
    return image.caption.includes(categoryName.replace('·', '')) || image.caption.includes(categoryName);
  });

  return matchedByName?.[1] ?? categoryFallbackImages.default;
}

export function getArticleImageForDisplay(article: Article): ArticleImageDisplay {
  if (article.thumbnail_url) {
    const sourceName = article.image_source_name || '생활경제저널 DB';
    return {
      url: article.thumbnail_url,
      caption: article.image_caption || `▲ ${article.title} 관련 자료사진. 출처=${sourceName}.`,
      sourceName,
      sourceUrl: article.image_source_url || undefined,
      license: article.image_license || undefined,
      isFallback: false
    };
  }

  return getFallbackArticleImage(article.categories?.slug, article.categories?.name);
}
