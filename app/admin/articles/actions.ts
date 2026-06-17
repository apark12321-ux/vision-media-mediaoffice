'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSlug } from '@/lib/utils/format';
import { detectForbiddenTerms } from '@/lib/forbidden-terms';

export async function createArticle(formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const content = String(formData.get('content') ?? '');
  const article_type = String(formData.get('article_type') ?? 'normal');
  const status = String(formData.get('status') ?? 'draft');
  const forbidden = detectForbiddenTerms(`${title}\n${content}`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('articles').insert({
    title,
    slug: createSlug(String(formData.get('slug') || title)) || crypto.randomUUID(),
    subtitle: String(formData.get('subtitle') ?? ''),
    summary: String(formData.get('summary') ?? ''),
    content,
    article_type,
    status,
    is_sponsored: ['brand_interview', 'sponsored', 'advertorial'].includes(article_type),
    sponsored_notice: String(formData.get('sponsored_notice') ?? ''),
    forbidden_terms_detected: forbidden,
    published_at: status === 'published' ? new Date().toISOString() : null
  });
  revalidatePath('/admin/articles');
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: forbidden.length ? `저장되었습니다. 금지 표현 경고: ${forbidden.join(', ')}` : '저장되었습니다.' };
}
