import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function listTable(table: string, limit = 50) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from(table).select('*').limit(limit).order('created_at', { ascending: false });
  if (error) return [];
  return data ?? [];
}
