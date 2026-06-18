import { eduArticleSeeds } from '@/lib/data/edu-articles';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings = {
  id: 'fallback', site_name: '에듀저널', site_description: '교육 전문 인터넷매체입니다.', operator_name: 'Algo Partners', business_name: '알고파트너스', representative_name: '박예준', media_registration_status: 'unregistered', contact_email: 'contact@example.com', contact_phone: '000-0000-0000'
} as SiteSettings;

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

const colors: Record<string, string> = { 'lifelong-education': 'dbeafe', 'career-dev': 'fef3c7', 'senior-education': 'd1fae5', 'edutech-ai': 'e0e7ff', 'wellness-life': 'ffe4e6', 'edu-institution': 'cffafe', 'interview-people': 'ede9fe', opinion: 'f1f5f9', 'press-release': 'ecfccb' };
function category(slug: string) { return fallbackCategories.find((item) => item.slug === slug) ?? fallbackCategories[0]!; }
function thumb(slug: string) { const bg = colors[slug] ?? 'f8fafc'; return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='960' height='640'%3E%3Crect width='960' height='640' fill='%23${bg}'/%3E%3Ccircle cx='210' cy='230' r='90' fill='%23ffffff' opacity='.8'/%3E%3Crect x='360' y='190' width='360' height='44' rx='22' fill='%230f172a' opacity='.85'/%3E%3Crect x='360' y='270' width='460' height='28' rx='14' fill='%23334155' opacity='.42'/%3E%3Crect x='360' y='330' width='320' height='28' rx='14' fill='%23334155' opacity='.25'/%3E%3C/svg%3E`; }
function text(summary: string) { return `${summary}\n\n교육기관과 학습자는 과정 선택 기준을 더 세밀하게 살펴보고 있다. 운영 기준, 상담 체계, 수료 이후 활용 가능성, 학습 관리 방식이 함께 검토된다.\n\n에듀저널은 교육 정책, 자격제도, 시니어 교육, 에듀테크와 교육기관 운영 사례를 지속적으로 다룬다.`; }
function toArticle(seed: (typeof eduArticleSeeds)[number]) { const cat = category(seed.categorySlug); return { id: seed.id, title: seed.title, slug: seed.slug, subtitle: seed.subtitle, summary: seed.summary, content: seed.content || text(seed.summary), article_type: seed.articleType ?? 'normal', status: 'published', thumbnail_url: thumb(seed.categorySlug), author_name: seed.author ?? '에듀저널 편집부', tags: seed.tags, published_at: seed.publishedAt, created_at: seed.publishedAt, updated_at: seed.publishedAt, categories: cat } as Article; }
export const fallbackArticles = eduArticleSeeds.map(toArticle);

export async function getPublicSiteSettings(): Promise<SiteSettings> { return fallbackSettings; }
export async function getCategories(): Promise<Category[]> { return fallbackCategories; }
export async function getArticles(limit?: number): Promise<Article[]> { return fallbackArticles.slice(0, limit ?? fallbackArticles.length); }
export async function getPublishedArticles(limit?: number): Promise<Article[]> { return getArticles(limit); }
export async function getArticlesByCategory(slug: string, limit?: number): Promise<Article[]> { const items = fallbackArticles.filter((article) => article.categories?.slug === slug); return items.slice(0, limit ?? items.length); }
export async function getArticleBySlug(slug: string): Promise<Article | null> { return fallbackArticles.find((article) => article.slug === slug) ?? fallbackArticles[0] ?? null; }
export async function getProducts(): Promise<Product[]> { return []; }
