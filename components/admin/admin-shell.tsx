import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth/admin';

const adminNav = [
  ['대시보드', '/admin'],
  ['기사', '/admin/articles'],
  ['리드', '/admin/leads'],
  ['고객 CRM', '/admin/clients'],
  ['영업', '/admin/outreach'],
  ['상품', '/admin/products'],
  ['주문', '/admin/orders'],
  ['납품', '/admin/deliveries'],
  ['템플릿', '/admin/templates'],
  ['AI 작성도구', '/admin/ai-writer'],
  ['컴플라이언스', '/admin/compliance'],
  ['설정', '/admin/settings']
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 md:block">
        <Link href="/admin" className="block text-xl font-black text-brand-navy">MediaOffice</Link>
        <p className="mt-1 text-xs text-gray-500">1인 매체 AI 운영실</p>
        <nav className="mt-8 space-y-1">
          {adminNav.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-brand-blue">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-brand-navy">관리자</span>
            <span className="text-sm text-gray-500">{admin.email}</span>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
