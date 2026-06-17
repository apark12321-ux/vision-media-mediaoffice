'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSlug } from '@/lib/utils/format';
import { detectForbiddenTerms } from '@/lib/forbidden-terms';

function optionalText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();
  return value || null;
}

export async function createArticle(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const article_type = String(formData.get('article_type') ?? 'normal');
  const status = String(formData.get('status') ?? 'draft');
  const thumbnail_url = optionalText(formData, 'thumbnail_url');
  const image_source_name = optionalText(formData, 'image_source_name');
  const image_license = optionalText(formData, 'image_license');
  const imageRightsConfirmed = formData.get('image_rights_confirmed') === 'true';
  const hasImageRisk = formData.get('image_contains_people_or_trademarks') === 'true';
  const forbidden = detectForbiddenTerms(`${title}\n${content}`);

  const warnings: string[] = [];
  if (thumbnail_url && (!image_source_name || !image_license)) warnings.push('대표 이미지 출처/라이선스 확인 필요');
  if (thumbnail_url && !imageRightsConfirmed) warnings.push('이미지 권리 확인 체크 필요');
  if (hasImageRisk) warnings.push('인물/상표 포함 이미지 수동 검수 필요');

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('articles').insert({
    title,
    slug: createSlug(String(formData.get('slug') || title)) || crypto.randomUUID(),
    subtitle: optionalText(formData, 'subtitle'),
    summary: optionalText(formData, 'summary'),
    content,
    article_type,
    status,
    thumbnail_url,
    image_caption: optionalText(formData, 'image_caption'),
    image_source_name,
    image_source_url: optionalText(formData, 'image_source_url'),
    image_author: optionalText(formData, 'image_author'),
    image_license,
    image_license_url: optionalText(formData, 'image_license_url'),
    visual_mode: thumbnail_url ? 'photo' : 'auto',
    is_sponsored: ['brand_interview', 'sponsored', 'advertorial'].includes(article_type),
    sponsored_notice: optionalText(formData, 'sponsored_notice'),
    forbidden_terms_detected: [...forbidden, ...warnings],
    published_at: status === 'published' ? new Date().toISOString() : null
  });

  revalidatePath('/admin/articles');
  revalidatePath('/articles');

  if (error) return { ok: false, message: error.message };

  const notices = [...forbidden, ...warnings];
  return { ok: true, message: notices.length ? `저장되었습니다. 확인 필요: ${notices.join(', ')}` : '저장되었습니다.' };
}
