import { createSupabaseServerClient } from '@/lib/supabase/server';
import { originalArticleSeeds, type OriginalArticleSeed } from '@/lib/data/original-articles';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings: SiteSettings = {
  id: 'fallback',
  site_name: '생활경제저널',
  site_description: '생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 브랜드와 사람을 기록하는 생활경제 전문 미디어입니다.',
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

function fallbackArticle(input: OriginalArticleSeed): Article {
  const selectedCategory = category(input.categorySlug);

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
    author_name: input.author ?? '생활경제저널 편집부',
    client_id: null,
    is_sponsored: input.isSponsored ?? false,
    sponsored_notice: input.sponsoredNotice ?? null,
    tags: input.tags,
    seo_title: input.title,
    seo_description: input.summary,
    source_urls: [],
    source_note: '생활경제저널 편집부 자체 기획 기사. 외부 기사 본문을 크롤링하거나 복제하지 않음.',
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

export const fallbackArticles: Article[] = originalArticleSeeds.map(fallbackArticle);

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
  const fallbackSlugs = new Set(fallback.map((item) => item.slug));
  const merged = [...fallback, ...primary.filter((item) => !fallbackSlugs.has(item.slug))];
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
    const { data } = await supabase.from('categories').select('*').order('sort_order');
    return data?.length ? (data as Category[]) : fallbackCategories;
  } catch { return fallbackCategories; }
}

export async function getArticles(limit?: number): Promise<Article[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('articles').select('*, categories(*)').eq('status', 'published').order('published_at', { ascending: false }).limit(limit ?? 100);
    return data?.length ? mergeBySlug(data as Article[], fallbackArticles, limit) : fallbackArticles.slice(0, limit ?? fallbackArticles.length);
  } catch { return fallbackArticles.slice(0, limit ?? fallbackArticles.length); }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fallback = fallbackArticles.find((article) => article.slug === slug) ?? null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('articles').select('*, categories(*)').eq('slug', slug).single();
    return fallback ?? ((data as Article) || null);
  } catch { return fallback; }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order');
    return data?.length ? (data as Product[]) : fallbackProducts;
  } catch { return fallbackProducts; }
}
