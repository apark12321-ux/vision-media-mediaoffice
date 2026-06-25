import { eduArticleSeeds } from '@/lib/data/edu-articles';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings: SiteSettings = {
  id: 'fallback',
  site_name: '에듀저널',
  site_description: '평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 정보를 다루는 교육 전문 인터넷매체입니다.',
  operator_name: '알고파트너스',
  business_name: '알고파트너스',
  representative_name: '박예준',
  business_registration_number: '450-07-03104',
  mail_order_registration_number: '제2025-인천서구-3321호',
  media_registration_status: 'preparing',
  media_registration_number: '등록 신청 예정',
  publisher_name: '박예준',
  editor_name: '박예준',
  youth_protection_manager: '박예준',
  privacy_manager: '박예준',
  address: '인천광역시 서구 청라커낼로 270, 커낼힐스빌 2층 2498호',
  contact_email: 'contact@edujournal.kr',
  contact_phone: '확인 후 표기'
};

export const fallbackCategories = [
  { id: 'cat-lifelong-education', name: '평생교육·HRD', slug: 'lifelong-education', description: '평생교육 정책과 성인학습 현장', sort_order: 1 },
  { id: 'cat-career-dev', name: '자격증·자기계발', slug: 'career-dev', description: '자격증과 직무역량 교육', sort_order: 2 },
  { id: 'cat-senior-education', name: '시니어·실버교육', slug: 'senior-education', description: '시니어 학습과 디지털 문해 교육', sort_order: 3 },
  { id: 'cat-edutech-ai', name: '에듀테크·AI', slug: 'edutech-ai', description: 'AI 교육과 원격교육 기술', sort_order: 4 },
  { id: 'cat-wellness-life', name: '웰니스·인문학', slug: 'wellness-life', description: '마음건강과 교양 교육', sort_order: 5 },
  { id: 'cat-edu-institution', name: '교육기관 탐방', slug: 'edu-institution', description: '교육기관 운영 사례', sort_order: 6 },
  { id: 'cat-interview-people', name: '명사 인터뷰', slug: 'interview-people', description: '교육 전문가 인터뷰', sort_order: 7 },
  { id: 'cat-opinion', name: '오피니언', slug: 'opinion', description: '교육 칼럼과 기고', sort_order: 8 },
  { id: 'cat-press-release', name: '공지·보도', slug: 'press-release', description: '교육 관련 공지와 보도자료', sort_order: 9 }
] as Category[];

type WpRendered = { rendered?: string };
type WpCategory = { id: number; name: string; slug: string; description?: string; count?: number };
type WpAuthor = { id: number; name?: string; slug?: string };
type WpMedia = { source_url?: string; alt_text?: string; caption?: WpRendered; media_details?: { sizes?: Record<string, { source_url?: string }> } };
type WpPost = {
  id: number;
  date?: string;
  modified?: string;
  slug: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  categories?: number[];
  author?: number;
  _embedded?: {
    author?: WpAuthor[];
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: Array<Array<WpCategory>>;
  };
};

function wordpressSiteUrl() {
  return (process.env.WORDPRESS_SITE_URL || process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || '').replace(/\/$/, '');
}

function wordpressApiBase() {
  const explicit = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const siteUrl = wordpressSiteUrl();
  return siteUrl ? `${siteUrl}/wp-json/wp/v2` : '';
}

function wordpressAdminUrl() {
  const explicit = process.env.WORDPRESS_ADMIN_URL || process.env.NEXT_PUBLIC_WORDPRESS_ADMIN_URL;
  if (explicit) return explicit;
  const siteUrl = wordpressSiteUrl();
  return siteUrl ? `${siteUrl}/wp-admin/` : '';
}

function hasWordPressEnv() {
  return Boolean(wordpressApiBase());
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function stripHtml(value = '') {
  return decodeHtml(
    value
      .replace(/<\/?(p|div|section|article|h[1-6]|li|blockquote)[^>]*>/gi, '\n')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
  );
}

async function fetchWordPress<T>(path: string): Promise<T | null> {
  const base = wordpressApiBase();
  if (!base) return null;

  try {
    const separator = path.includes('?') ? '&' : '?';
    const response = await fetch(`${base}${path}${separator}_=${Date.now()}`, {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function category(slug: string) {
  return fallbackCategories.find((item) => item.slug === slug) ?? fallbackCategories[0]!;
}

function realPhotoThumbnail(articleId: string, categorySlug: string) {
  const seed = encodeURIComponent(`edujournal-photo-${categorySlug}-${articleId}`);
  return `https://picsum.photos/seed/${seed}/1600/900`;
}

function text(summary: string) {
  return `${summary}\n\n교육기관과 학습자는 과정 선택 기준을 더 세밀하게 살펴보고 있다. 운영 기준, 상담 체계, 수료 이후 활용 가능성, 학습 관리 방식이 함께 검토된다.\n\n에듀저널은 교육 정책, 자격제도, 시니어 교육, 에듀테크와 교육기관 운영 사례를 지속적으로 다룬다.`;
}

function toArticle(seed: (typeof eduArticleSeeds)[number]) {
  const cat = category(seed.categorySlug);
  const photo = realPhotoThumbnail(seed.id, seed.categorySlug);

  return {
    id: seed.id,
    title: seed.title,
    slug: seed.id,
    subtitle: seed.subtitle,
    summary: seed.summary,
    content: seed.content || text(seed.summary),
    article_type: seed.articleType ?? 'normal',
    status: 'published',
    thumbnail_url: photo,
    image_caption: seed.imageCaption || `${cat.name} 관련 교육 현장 자료사진.`,
    image_source_name: seed.imageSourceName || '공개 사진 자료',
    image_source_url: photo,
    author_name: seed.author ?? '에듀저널 편집부',
    is_sponsored: ['brand_interview', 'sponsored', 'advertorial'].includes(seed.articleType ?? 'normal'),
    tags: seed.tags,
    published_at: seed.publishedAt,
    created_at: seed.publishedAt,
    updated_at: seed.publishedAt,
    categories: cat
  } as Article;
}

export const fallbackArticles = eduArticleSeeds.map(toArticle);

function wpCategoryToCategory(item: WpCategory, index = 0): Category {
  return {
    id: `wp-cat-${item.id}`,
    name: decodeHtml(item.name),
    slug: item.slug,
    description: stripHtml(item.description ?? ''),
    sort_order: index + 1
  } as Category;
}

function embeddedPostCategory(post: WpPost, wpCategories: Category[]) {
  const termGroups = post._embedded?.['wp:term'] ?? [];
  const flatTerms = termGroups.flat();
  const firstEmbeddedCategory = flatTerms.find((term) => post.categories?.includes(term.id));

  if (firstEmbeddedCategory) {
    return wpCategoryToCategory(firstEmbeddedCategory);
  }

  const firstCategoryId = post.categories?.[0];
  if (firstCategoryId) {
    return wpCategories.find((item) => item.id === `wp-cat-${firstCategoryId}`) ?? null;
  }

  return null;
}

function featuredImage(post: WpPost) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return media?.media_details?.sizes?.large?.source_url || media?.media_details?.sizes?.medium_large?.source_url || media?.source_url || null;
}

function wpPostToArticle(post: WpPost, wpCategories: Category[]): Article {
  const categoryItem = embeddedPostCategory(post, wpCategories) ?? fallbackCategories[0]!;
  const imageUrl = featuredImage(post);
  const title = stripHtml(post.title?.rendered ?? '제목 없음');
  const summary = stripHtml(post.excerpt?.rendered ?? '').slice(0, 240) || title;
  const content = stripHtml(post.content?.rendered ?? post.excerpt?.rendered ?? summary);
  const publishedAt = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  const modifiedAt = post.modified ? new Date(post.modified).toISOString() : publishedAt;

  return {
    id: `wp-${post.id}`,
    title,
    slug: post.slug,
    subtitle: null,
    summary,
    content,
    article_type: 'normal',
    status: 'published',
    thumbnail_url: imageUrl || realPhotoThumbnail(`wp-${post.id}`, categoryItem.slug),
    image_caption: imageUrl ? `${categoryItem.name} 관련 대표 이미지.` : `${categoryItem.name} 관련 교육 현장 자료사진.`,
    image_source_name: imageUrl ? 'WordPress 미디어 라이브러리' : '공개 사진 자료',
    image_source_url: imageUrl,
    author_name: post._embedded?.author?.[0]?.name ?? '에듀저널 편집부',
    is_sponsored: false,
    tags: [],
    published_at: publishedAt,
    created_at: publishedAt,
    updated_at: modifiedAt,
    categories: categoryItem
  } as Article;
}

async function getWordPressCategories(): Promise<Category[] | null> {
  const items = await fetchWordPress<WpCategory[]>('/categories?per_page=100&orderby=id&order=asc');
  if (!items?.length) return null;
  return items.map(wpCategoryToCategory);
}

async function getWordPressPosts(limit?: number): Promise<Article[] | null> {
  const perPage = Math.min(Math.max(limit ?? 100, 1), 100);
  const categories = (await getWordPressCategories()) ?? fallbackCategories;
  const posts = await fetchWordPress<WpPost[]>(`/posts?per_page=${perPage}&status=publish&_embed=1&orderby=date&order=desc`);
  if (!posts?.length) return null;
  return posts.map((post) => wpPostToArticle(post, categories));
}

async function getWordPressPostsByCategory(slug: string, limit?: number): Promise<Article[] | null> {
  const wpCategories = await fetchWordPress<WpCategory[]>(`/categories?slug=${encodeURIComponent(slug)}&per_page=1`);
  const wpCategory = wpCategories?.[0];
  if (!wpCategory) return null;

  const categories = (await getWordPressCategories()) ?? fallbackCategories;
  const perPage = Math.min(Math.max(limit ?? 100, 1), 100);
  const posts = await fetchWordPress<WpPost[]>(`/posts?per_page=${perPage}&status=publish&categories=${wpCategory.id}&_embed=1&orderby=date&order=desc`);
  if (!posts?.length) return null;
  return posts.map((post) => wpPostToArticle(post, categories));
}

async function getWordPressPostBySlug(slug: string): Promise<Article | null> {
  const categories = (await getWordPressCategories()) ?? fallbackCategories;
  const posts = await fetchWordPress<WpPost[]>(`/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed=1`);
  if (!posts?.length) return null;
  return wpPostToArticle(posts[0]!, categories);
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  return {
    ...fallbackSettings,
    site_description: hasWordPressEnv()
      ? 'WordPress를 관리자 CMS로 사용하고 Next.js가 공개 프론트를 제공하는 교육 전문 인터넷매체입니다.'
      : fallbackSettings.site_description
  };
}

export async function getCategories(): Promise<Category[]> {
  return (await getWordPressCategories()) ?? fallbackCategories;
}

export async function getArticles(limit?: number): Promise<Article[]> {
  return (await getWordPressPosts(limit)) ?? fallbackArticles.slice(0, limit ?? fallbackArticles.length);
}

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  return (await getWordPressPosts(limit)) ?? fallbackArticles.slice(0, limit ?? fallbackArticles.length);
}

export async function getArticlesByCategory(slug: string, limit?: number): Promise<Article[]> {
  const wpItems = await getWordPressPostsByCategory(slug, limit);
  if (wpItems?.length) return wpItems;

  const items = fallbackArticles.filter((article) => article.categories?.slug === slug);
  return items.slice(0, limit ?? items.length);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const wpItem = await getWordPressPostBySlug(slug);
  if (wpItem) return wpItem;
  return fallbackArticles.find((article) => article.slug === slug || article.id === slug) ?? null;
}

export function getWordPressAdminUrl() {
  return wordpressAdminUrl();
}

export async function getProducts(): Promise<Product[]> { return []; }
