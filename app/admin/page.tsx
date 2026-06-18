import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const quickModules = [
  { title: '기사 작성·발행', desc: '장문 기사, 대표 이미지, 중간 이미지, 제휴 고지, 예약 발행을 관리합니다.', href: '/admin/articles', badge: '편집국' },
  { title: '카테고리·섹션', desc: '생활경제, 지역상권, 교육, 시니어, 건강, 창업 등 매체 섹션을 정리합니다.', href: '/admin/categories', badge: '편성' },
  { title: '미디어 보관함', desc: '대표 이미지, 본문 삽입 이미지, 캡션, 출처, 라이선스 정보를 관리합니다.', href: '/admin/media', badge: '이미지' },
  { title: '보도자료 관리', desc: '외부 보도자료와 기관 자료를 접수하고 기사화 여부를 검수합니다.', href: '/admin/press', badge: '자료' },
  { title: '제보·문의', desc: '기사제보, 광고 문의, 브랜드 인터뷰 신청을 리드로 관리합니다.', href: '/admin/leads', badge: '접수' },
  { title: '광고·제휴 CRM', desc: '광고주, 상담 단계, 주문, 납품, 후속 연락을 추적합니다.', href: '/admin/clients', badge: '비즈니스' },
  { title: '컴플라이언스', desc: '기사형 광고 고지, 금지 표현, 저작권·초상권, 개인정보 노출을 점검합니다.', href: '/admin/compliance', badge: '검수' },
  { title: '애드센스 준비', desc: '승인 전 광고 미노출, ads.txt, 정책 페이지, 콘텐츠 품질 체크를 관리합니다.', href: '/admin/adsense', badge: '수익화' },
  { title: '사이트 설정', desc: '제호, 사업자 정보, 통신판매업, 인터넷신문 등록정보, 푸터 고지를 관리합니다.', href: '/admin/settings', badge: '설정' }
];

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const [leads, articles, clients, orders] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', '신규'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).in('status', ['draft', 'review']),
    supabase.from('clients').select('id', { count: 'exact', head: true }).in('status', ['관심 있음', '상담 완료', '결제 대기']),
    supabase.from('orders').select('amount,payment_status')
  ]);
  const paid = (orders.data ?? []).filter((o: any) => o.payment_status === 'paid').reduce((sum: number, o: any) => sum + (o.amount ?? 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-bold text-brand-blue">MediaOffice</p>
        <h1 className="mt-2 text-3xl font-black text-brand-navy">인터넷매체 운영 대시보드</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
          생활경제저널의 기사 발행, 이미지 관리, 제보 접수, 광고·제휴 영업, 컴플라이언스, 사이트 등록정보를 분리된 관리자에서 운영합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="신규 문의" value={leads.count ?? 0} />
        <StatCard label="작성·검수 기사" value={articles.count ?? 0} />
        <StatCard label="상담 진행 고객" value={clients.count ?? 0} />
        <StatCard label="결제 금액" value={`${paid.toLocaleString()}원`} />
      </div>

      <section className="rounded-2xl border bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-gray-950">주요 기능</h2>
            <p className="mt-1 text-sm text-gray-500">인터넷신문 운영에 필요한 관리자 기능을 모듈별로 분리했습니다.</p>
          </div>
          <Link href="/admin/system" className="rounded-full border px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">전체 운영 구조 보기</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {quickModules.map((module) => (
            <Link key={module.href} href={module.href} className="rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-sm">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-brand-blue">{module.badge}</span>
              <h3 className="mt-4 font-black text-gray-950">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{module.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 lg:col-span-2">
          <h2 className="font-black text-brand-navy">오늘 운영 체크리스트</h2>
          <ul className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
            <li className="rounded-xl bg-slate-50 p-4">신규 기사 초안의 제목, 본문 길이, 이미지 캡션을 확인합니다.</li>
            <li className="rounded-xl bg-slate-50 p-4">제휴 콘텐츠는 상단 고지와 광고성 표현을 검수합니다.</li>
            <li className="rounded-xl bg-slate-50 p-4">수신동의 없는 광고성 이메일·문자 발송을 제한합니다.</li>
            <li className="rounded-xl bg-slate-50 p-4">푸터 사업자 정보와 인터넷신문 등록 상태를 점검합니다.</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-black text-brand-navy">발행 원칙</h2>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            자동화는 초안 생성과 정리까지만 수행하고, 공개 발행은 운영자가 검수한 뒤 진행합니다. 이미지와 자료는 출처·권리 확인이 저장되어야 합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
