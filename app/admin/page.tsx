import { StatCard } from '@/components/ui/stat-card';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [leads, articles, clients, orders] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', '신규'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'review'),
    supabase.from('clients').select('id', { count: 'exact', head: true }).in('status', ['관심 있음', '상담 완료', '결제 대기']),
    supabase.from('orders').select('amount,payment_status')
  ]);
  const paid = (orders.data ?? []).filter((o: any) => o.payment_status === 'paid').reduce((sum: number, o: any) => sum + (o.amount ?? 0), 0);
  return (
    <div>
      <h1 className="text-3xl font-black text-brand-navy">대시보드</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <StatCard label="신규 문의" value={leads.count ?? 0} />
        <StatCard label="발행 대기 기사" value={articles.count ?? 0} />
        <StatCard label="상담 진행 고객" value={clients.count ?? 0} />
        <StatCard label="결제 금액" value={`${paid.toLocaleString()}원`} />
      </div>
      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="font-black text-brand-navy">오늘 할 일</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>• 신규 리드 확인 및 고객 전환</li>
          <li>• 발행 대기 기사 컴플라이언스 체크</li>
          <li>• 수신동의 없는 광고성 연락 제한 확인</li>
          <li>• 납품 대기 건 검수</li>
        </ul>
      </div>
    </div>
  );
}
