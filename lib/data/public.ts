import { eduArticleSeeds } from '@/lib/data/edu-articles';
import type { Article, Category, Product, SiteSettings } from '@/types/database';

const fallbackSettings: SiteSettings = {
  id: 'fallback',
  site_name: '에듀저널',
  site_description: '평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 정보를 다루는 교육 전문 인터넷매체입니다.',
  operator_name: '알고파트너스',
  business_name: '알고파트너스',
  representative_name: '박예준',
  media_registration_status: 'preparing',
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

const categoryVisuals: Record<string, { label: string; palette: string[]; icon: string }> = {
  'lifelong-education': { label: '평생교육', palette: ['#0f766e', '#14b8a6', '#ccfbf1'], icon: 'book' },
  'career-dev': { label: '자격증', palette: ['#1d4ed8', '#60a5fa', '#dbeafe'], icon: 'certificate' },
  'senior-education': { label: '시니어교육', palette: ['#92400e', '#f59e0b', '#fef3c7'], icon: 'people' },
  'edutech-ai': { label: '에듀테크', palette: ['#312e81', '#8b5cf6', '#ede9fe'], icon: 'screen' },
  'wellness-life': { label: '웰니스', palette: ['#166534', '#22c55e', '#dcfce7'], icon: 'leaf' },
  'edu-institution': { label: '교육기관', palette: ['#334155', '#64748b', '#e2e8f0'], icon: 'building' },
  'interview-people': { label: '인터뷰', palette: ['#9f1239', '#fb7185', '#ffe4e6'], icon: 'mic' },
  opinion: { label: '오피니언', palette: ['#78350f', '#f97316', '#ffedd5'], icon: 'pen' },
  'press-release': { label: '보도자료', palette: ['#075985', '#38bdf8', '#e0f2fe'], icon: 'news' }
};

function category(slug: string) {
  return fallbackCategories.find((item) => item.slug === slug) ?? fallbackCategories[0]!;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function escapeSvgText(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function iconPath(icon: string) {
  if (icon === 'certificate') return '<rect x="78" y="70" width="154" height="178" rx="18" fill="white" opacity="0.92"/><path d="M108 120h92M108 154h72M108 188h104" stroke="#0f172a" stroke-width="12" stroke-linecap="round" opacity="0.38"/><circle cx="202" cy="214" r="26" fill="#f97316"/><path d="M188 240l-12 46 28-18 28 18-12-46" fill="#f97316" opacity="0.9"/>';
  if (icon === 'people') return '<circle cx="130" cy="130" r="36" fill="white" opacity="0.88"/><circle cx="205" cy="126" r="31" fill="white" opacity="0.72"/><path d="M72 240c18-48 96-48 114 0M160 240c14-38 80-38 94 0" fill="white" opacity="0.84"/>';
  if (icon === 'screen') return '<rect x="58" y="82" width="204" height="134" rx="18" fill="white" opacity="0.9"/><path d="M95 138h58M95 168h102M95 198h70" stroke="#312e81" stroke-width="12" stroke-linecap="round" opacity="0.36"/><path d="M126 256h68M160 216v40" stroke="white" stroke-width="14" stroke-linecap="round" opacity="0.9"/>';
  if (icon === 'leaf') return '<path d="M214 70C112 82 64 142 82 230c86 10 148-40 164-138 4-24-8-27-32-22Z" fill="white" opacity="0.84"/><path d="M106 226c52-42 88-78 112-128" stroke="#166534" stroke-width="12" stroke-linecap="round" opacity="0.35"/>';
  if (icon === 'building') return '<rect x="70" y="82" width="180" height="184" rx="14" fill="white" opacity="0.9"/><path d="M108 126h28M154 126h28M200 126h28M108 168h28M154 168h28M200 168h28M108 210h28M154 210h28M200 210h28" stroke="#334155" stroke-width="14" stroke-linecap="round" opacity="0.36"/>';
  if (icon === 'mic') return '<rect x="128" y="72" width="64" height="140" rx="32" fill="white" opacity="0.9"/><path d="M96 160c0 46 28 76 64 76s64-30 64-76M160 236v48M126 284h68" stroke="white" stroke-width="16" stroke-linecap="round" opacity="0.86"/>';
  if (icon === 'pen') return '<path d="M222 78 96 204l-22 66 66-22L266 122c10-10 10-26 0-36l-8-8c-10-10-26-10-36 0Z" fill="white" opacity="0.9"/><path d="M198 104l44 44" stroke="#78350f" stroke-width="12" stroke-linecap="round" opacity="0.35"/>';
  if (icon === 'news') return '<rect x="64" y="74" width="192" height="192" rx="18" fill="white" opacity="0.9"/><rect x="94" y="108" width="70" height="62" rx="8" fill="#075985" opacity="0.35"/><path d="M180 116h44M180 148h44M94 198h130M94 228h96" stroke="#075985" stroke-width="12" stroke-linecap="round" opacity="0.32"/>';
  return '<rect x="82" y="80" width="156" height="186" rx="20" fill="white" opacity="0.92"/><path d="M118 124h84M118 164h84M118 204h60" stroke="#0f766e" stroke-width="13" stroke-linecap="round" opacity="0.38"/><path d="M96 90c36-18 92-18 128 0" stroke="white" stroke-width="14" stroke-linecap="round" opacity="0.72"/>';
}

function stableArticleImage(categorySlug: string, articleId: string, title: string) {
  const visual = categoryVisuals[categorySlug] ?? categoryVisuals['lifelong-education'];
  const hash = hashString(`${categorySlug}-${articleId}-${title}`);
  const [deep, mid, pale] = visual.palette;
  const rotate = hash % 360;
  const accentX = 760 + (hash % 180);
  const label = escapeSvgText(visual.label);
  const safeTitle = escapeSvgText(title.length > 30 ? `${title.slice(0, 30)}…` : title);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${safeTitle}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${deep}"/><stop offset="0.56" stop-color="${mid}"/><stop offset="1" stop-color="${pale}"/></linearGradient><linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="rgba(15,23,42,0.72)"/><stop offset="1" stop-color="rgba(15,23,42,0.04)"/></linearGradient></defs><rect width="1200" height="800" fill="url(#bg)"/><circle cx="${accentX}" cy="180" r="230" fill="white" opacity="0.16"/><circle cx="1040" cy="600" r="260" fill="white" opacity="0.18"/><g transform="translate(760 210) scale(1.15)">${iconPath(visual.icon)}</g><rect x="0" y="0" width="1200" height="800" fill="url(#shade)"/><text x="78" y="112" font-family="Arial, sans-serif" font-size="28" font-weight="900" letter-spacing="6" fill="white" opacity="0.82">EDU JOURNAL</text><text x="78" y="186" font-family="Arial, sans-serif" font-size="42" font-weight="900" fill="white">${label}</text><text x="78" y="598" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="white">${safeTitle}</text><text x="80" y="670" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="white" opacity="0.76">교육 현장과 학습 정보를 전하는 에듀저널 자료 이미지</text><g transform="translate(${80 + (hash % 120)} 720) rotate(${rotate})"><rect width="92" height="12" rx="6" fill="white" opacity="0.45"/></g></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function text(summary: string) {
  return `${summary}\n\n교육기관과 학습자는 과정 선택 기준을 더 세밀하게 살펴보고 있다. 운영 기준, 상담 체계, 수료 이후 활용 가능성, 학습 관리 방식이 함께 검토된다.\n\n에듀저널은 교육 정책, 자격제도, 시니어 교육, 에듀테크와 교육기관 운영 사례를 지속적으로 다룬다.`;
}

function toArticle(seed: (typeof eduArticleSeeds)[number]) {
  const cat = category(seed.categorySlug);
  const photo = seed.thumbnailUrl || stableArticleImage(seed.categorySlug, seed.id, seed.title);
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
    image_source_name: seed.imageSourceName || '에듀저널 자료 이미지',
    image_source_url: photo,
    author_name: seed.author ?? '에듀저널 편집부',
    tags: seed.tags,
    published_at: seed.publishedAt,
    created_at: seed.publishedAt,
    updated_at: seed.publishedAt,
    categories: cat
  } as Article;
}

export const fallbackArticles = eduArticleSeeds.map(toArticle);

export async function getPublicSiteSettings(): Promise<SiteSettings> { return fallbackSettings; }
export async function getCategories(): Promise<Category[]> { return fallbackCategories; }
export async function getArticles(limit?: number): Promise<Article[]> { return fallbackArticles.slice(0, limit ?? fallbackArticles.length); }
export async function getPublishedArticles(limit?: number): Promise<Article[]> { return getArticles(limit); }
export async function getArticlesByCategory(slug: string, limit?: number): Promise<Article[]> {
  const items = fallbackArticles.filter((article) => article.categories?.slug === slug);
  return items.slice(0, limit ?? items.length);
}
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const direct = fallbackArticles.find((article) => article.slug === slug);
  if (direct) return direct;
  const legacySeed = eduArticleSeeds.find((seed) => seed.slug === slug || seed.id === slug);
  return legacySeed ? toArticle(legacySeed) : fallbackArticles[0] ?? null;
}
export async function getProducts(): Promise<Product[]> { return []; }
