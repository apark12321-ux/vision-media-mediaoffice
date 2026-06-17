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
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
  return (data as Category[]) ?? [];
}

export async function getPublishedArticles(limit = 12): Promise<Article[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('articles')
    .select('*, categories(*)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .limit(limit);
  return (data as Article[]) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('articles')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .maybeSingle();
  return (data as Article) ?? null;
}

export async function getArticlesByCategory(slug: string): Promise<Article[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('articles')
    .select('*, categories!inner(*)')
    .eq('categories.slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false });
  return (data as Article[]) ?? [];
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('products').select('*').eq('is_active', true).order('sort_order', { ascending: true });
  return (data as Product[]) ?? [];
}
