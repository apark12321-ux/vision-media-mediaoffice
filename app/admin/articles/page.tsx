import Link from 'next/link';
import { SimpleTable } from '@/components/admin/simple-table';
import { listTable } from '@/lib/data/admin';

export default async function AdminArticlesPage() {
  const rows = await listTable('articles');
  return <div><div className="flex items-center justify-between"><h1 className="text-3xl font-black text-brand-navy">기사 관리</h1><Link href="/admin/articles/new" className="rounded-lg bg-brand-navy px-4 py-2 font-bold text-white">새 기사</Link></div><div className="mt-6"><SimpleTable rows={rows as any} /></div></div>;
}
