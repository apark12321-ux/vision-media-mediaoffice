import { createSupabaseServerClient } from '@/lib/supabase/server';
import { eduArticleSeeds, type EduArticleSeed } from '@/lib/data/edu-articles';
import { originalArticleSeeds, type OriginalArticleSeed } from '@/lib/data/original-articles';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings: SiteSettings = {
  id: 'fallback',
  site_name: '에듀저널',
  site_description: '평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 현장을 다루는 교육 전문 인터넷매체입니다.',
  operator_name: 'Algo Partners',
  business_name: '알고파트너스',
  representative_name: '박예준',
  business_registration_number: '450-07-03104',
  mail_order_registration_number: '제2025-인천서구-3321호',
  media_registration_status: 'unregistered',
  publisher_name: '박예준',
  editor_name: '박예준',
  youth_protection_manager: '박예준',
  privacy_manager: '박예준',
  address: '인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호 (청라동)',
  contact_email: 'contact@example.com',
  contact_phone: '000-0000-0000'
};

export const fallbackCategories: Category[] = [
  { id: 'cat-lifelong-education', name: '평생교육·HRD', slug: 'lifelong-education', description: '평생교육 정책과 성인학습 현장', sort_order: 1 },
  { id: 'cat-career-dev', name: '자격증·자기계발', slug: 'career-dev', description: '자격증과 직무역량 교육', sort_order: 2 },
  { id: 'cat-senior-education', name: '시니어·실버교육', slug: 'senior-education', description: '시니어 학습과 디지털 문해 교육', sort_order: 3 },
  { id: 'cat-edutech-ai', name: '에듀테크·AI', slug: 'edutech-ai', description: 'AI 교육과 원격교육 기술', sort_order: 4 },
  { id: 'cat-wellness-life', name: '웰니스·인문학', slug: 'wellness-life', description: '마음건강과 교양 교육', sort_order: 5 },
  { id: 'cat-edu-institution', name: '교육기관 탐방', slug: 'edu-institution', description: '교육기관 운영 사례', sort_order: 6 },
  { id: 'cat-interview-people', name: '명사 인터뷰', slug: 'interview-people', description: '교육 전문가 인터뷰', sort_order: 7 },
  { id: 'cat-opinion', name: '오피니언', slug: 'opinion', description: '교육 칼럼과 기고', sort_order: 8 },
  { id: 'cat-press-release', name: '공지·보도', slug: 'press-release', description: '교육 관련 공지와 보도자료', sort_order: 9 }
];

type PublicArticleSeed = OriginalArticleSeed | EduArticleSeed;

function category(slug: string) {
  return fallbackCategories.find((item) => item.slug === slug) ?? fallbackCategories[0]!;
}

function hasOptionalFlag<T extends object, K extends PropertyKey>(input: T, key: K): input is T & Record<K, unknown> {
  return key in input;
}

function fallbackArticle(input: PublicArticleSeed): Article {
  const selectedCategory = category(input.categorySlug);
  const isSponsored = hasOptionalFlag(input, 'isSponsored') ? Boolean(input.isSponsored) : false;
  const sponsoredNotice = hasOptionalFlag(input, 'sponsoredNotice') ? String(input.sponsoredNotice ?? '') || null : null;

  return {
    id: input.id,
    title: input.title,
    slug: input.slug,
    subtitle: input.subtitle,
    summary: input.summary,
    content: input.content,
    category_id: selectedCategory.id,
    article_type: input.articleType ?? 'normal',
    status: 'published',
    editorial_status: 'published',
    thumbnail_url: input.thumbnailUrl,
    image_caption: input.imageCaption,
    image_source_name: input.imageSourceName,
    image_source_url: null,
    image_author: null,
    image_license: 'Unsplash License',
    image_license_url: 'https://unsplash.com/license',
    visual_mode: 'photo',
    author_name: input.author ?? '에듀저널 편집부',
    client_id: null,
    is_sponsored: isSponsored,
    sponsored_notice: sponsoredNotice,
    tags: input.tags,
    seo_title: input.title,
    seo_description: input.summary,
    source_urls: [],
    source_note: '에듀저널 편집부 자체 기획 기사.',
    fact_checked: true,
    is_imported_archive: false,
    archive_source_label: null,
    original_published_at: null,
    imported_at: null,
    scheduled_at: null,
    compliance_checked: true,
    forbidden_terms_detected: [],
    published_at: input.publishedAt,
    created_at: input.publishedAt,
    updated_at: input.publishedAt,
    categories: selectedCategory
  };
}

function uniqueSeedsBySlug(seeds: PublicArticleSeed[]) {
  const seen = new Set<string>();
  return seeds.filter((seed) => {
    if (seen.has(seed.slug)) return false;
    seen.add(seed.slug);
    return true;
  });
}

const publicArticleSeeds = uniqueSeedsBySlug([...eduArticleSeeds, ...originalArticleSeeds]);

export const fallbackArticles: Article[] = publicArticleSeeds.map(fallbackArticle);

const fallbackProducts: Product[] = [
  {
    id: 'product-edu-interview',
    name: '교육기관 인터뷰',
    slug: 'edu-institution-interview',
    price: 490000,
    description: '교육기관과 강사를 기사형 인터뷰로 소개하는 상품입니다.',
    features: ['인터뷰 기사', '기관 사진 반영', '교육 과정 소개', '기사 링크 제공'],
    is_active: true,
    sort_order: 1
  }
];

function mergeBySlug<T extends { slug: string }>(primary: T[], fallback: T[], limit?: number): T[] {
  const fallbackSlugs = new Set(fallback.map((item) => item.slug));
  const merged = [...fallback, ...primary.filter((item) => !fallbackSlugs.has(item.slug))];
  return typeof limit === 'number' ? merged.slice(0, limit) : merged;
}

function eduSettings(settings?: SiteSettings | null): SiteSettings {
  return {
    ...(settings ?? fallbackSettings),
    site_name: '에듀저널',
    site_description: fallbackSettings.site_description
  } as SiteSettings;
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('site_settings').select('*').limit(1).single();
    return eduSettings(data as SiteSettings | null);
  } catch {
    return fallbackSettings;
  }
}

export async function getCategories(): Promise<Category[]> {
  return fallbackCategories;
}

export async function getArticles(limit?: number): Promise<Article[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('articles').select('*, categories(*)').eq('status', 'published').order('published_at', { ascending: false }).limit(limit ?? 100);
    return data?.length ? mergeBySlug(data as Article[], fallbackArticles, limit) : fallbackArticles.slice(0, limit ?? fallbackArticles.length);
  } catch {
    return fallbackArticles.slice(0, limit ?? fallbackArticles.length);
  }
}

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  return getArticles(limit);
}

export async function getArticlesByCategory(slug: string, limit?: number): Promise<Article[]> {
  const articles = await getArticles();
  const filtered = articles.filter((article) => article.categories?.slug === slug);
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fallback = fallbackArticles.find((article) => article.slug === slug) ?? null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('articles').select('*, categories(*)').eq('slug', slug).single();
    return fallback ?? ((data as Article) || null);
  } catch {
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return fallbackProducts;
}