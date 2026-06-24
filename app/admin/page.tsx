import Link from 'next/link';

const stats = [
  ['오늘 발행 대기', '12건', '편집·검수'],
  ['전체 기사 DB', '540건+', '날짜별 보강'],
  ['이미지 자료', '기사별 연결', '실제 사진'],
  ['접수함', '제보·보도자료', '운영 창구']
];

const cmsModules = [
  {
    title: '기사 작성·편집 CMS',
    desc: '제목, 부제목, 리드문, 본문, 대표 이미지, 본문 이미지, 기자명, 태그, 예약 발행 상태를 관리합니다.',
    href: '/admin/articles',
    badge: '편집국'
  },
  {
    title: '기사 배치·섹션 편성',
    desc: '메인 톱뉴스, 최신뉴스, 랭킹뉴스, 카테고리 묶음, 인터뷰·오피니언 노출 순서를 관리합니다.',
    href: '/admin/categories',
    badge: '편성'
  },
  {
    title: '미디어 DB',
    desc: '기사 대표 사진, 캡션, 이미지 출처, 라이선스, 사용 위치를 함께 기록해 썸네일 깨짐과 권리 문제를 줄입니다.',
    href: '/admin/media',
    badge: '이미지'
  },
  {
    title: '보도자료·제보 접수',
    desc: '기관 보도자료, 독자 제보, 정정보도 요청, 반론보도 요청을 접수하고 처리 상태를 관리합니다.',
    href: '/admin/press',
    badge: '접수'
  },
  {
    title: '기자·운영자 권한',
    desc: '발행인, 편집인, 기자, 외부 필진, 운영자 역할을 분리해 기사 작성과 공개 권한을 구분합니다.',
    href: '/admin/system',
    badge: '권한'
  },
  {
    title: '엠바고·예약 발행',
    desc: '작성중, 검수중, 예약, 공개, 보류 상태를 나누고 지정 시각에 공개할 기사 흐름을 관리합니다.',
    href: '/admin/system',
    badge: '발행'
  },
  {
    title: '정책·등록정보 관리',
    desc: '제호, 운영사, 사업자등록번호, 통신판매업신고번호, 인터넷신문 등록번호, 발행인·편집인 정보를 관리합니다.',
    href: '/admin/settings',
    badge: '등록'
  },
  {
    title: '애드센스·광고 준비',
    desc: '승인 전 광고 미노출 상태, ads.txt, 정책 페이지, 광고 위치, 제휴 콘텐츠 고지를 점검합니다.',
    href: '/admin/adsense',
    badge: '수익화'
  },
  {
    title: '통계·운영 리포트',
    desc: '카테고리별 기사 수, 최근 발행량, 조회 지표, 제보 처리량, 이미지 누락 여부를 운영 지표로 확인합니다.',
    href: '/admin/system',
    badge: '통계'
  }
];

const workflow = [
  ['01', '기사 초안 작성', '제목·요약·본문·이미지·태그를 입력합니다.'],
  ['02', '편집 검수', '소제목 과다, 광고성 표현, 이미지 출처, 개인정보 노출을 확인합니다.'],
  ['03', '섹션 배치', '메인, 최신, 카테고리, 랭킹 영역 노출 여부를 결정합니다.'],
  ['04', '예약 또는 공개', '엠바고·예약 발행 또는 즉시 발행 상태로 전환합니다.'],
  ['05', '사후 관리', '정정 요청, 반론 요청, 썸네일 깨짐, 푸터 등록정보를 점검합니다.']
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <section className="border-b bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-amber-300">MEDIAOFFICE CMS</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-4xl">에듀저널 관리자</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              인터넷신문 운영에 필요한 기사 작성, 이미지 DB, 섹션 편성, 제보 접수, 등록정보, 정책 페이지, 광고 준비 기능을 한 화면에서 관리하는 백오피스입니다.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="rounded-full border border-slate-600 px-4 py-2 text-sm font-bold text-slate-200 hover:border-white">공개 사이트</Link>
            <Link href="/admin/articles" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-black text-slate-950">기사 관리</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map(([label, value, memo]) => (
            <article key={label} className="border bg-white p-5 shadow-sm">
              <p className="text-xs font-black text-slate-500">{label}</p>
              <strong className="mt-2 block text-2xl font-black text-slate-950">{value}</strong>
              <p className="mt-2 text-xs font-bold text-amber-600">{memo}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="border bg-white p-6 shadow-sm">
          <div className="flex items-end justify-between gap-3 border-b-2 border-slate-950 pb-3">
            <div>
              <p className="text-xs font-black tracking-[0.18em] text-amber-600">CMS MODULES</p>
              <h2 className="mt-1 text-2xl font-black">주요 관리 기능</h2>
            </div>
            <Link href="/admin/system" className="text-sm font-black text-slate-700 hover:text-amber-600">전체 구조 보기</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cmsModules.map((module) => (
              <Link key={module.title} href={module.href} className="group border border-slate-200 p-4 transition hover:border-amber-500 hover:bg-amber-50/40">
                <span className="inline-flex rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-black text-white">{module.badge}</span>
                <h3 className="mt-4 line-clamp-2 text-[16px] font-black leading-6 group-hover:text-amber-700">{module.title}</h3>
                <p className="mt-2 line-clamp-4 text-[13px] leading-6 text-slate-600">{module.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="border bg-white p-6 shadow-sm">
            <p className="text-xs font-black tracking-[0.18em] text-amber-600">PUBLISH FLOW</p>
            <h2 className="mt-1 text-xl font-black">운영 플로우</h2>
            <div className="mt-4 space-y-3">
              {workflow.map(([num, title, desc]) => (
                <div key={num} className="grid grid-cols-[36px_1fr] gap-3 border-b pb-3 last:border-b-0">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{num}</span>
                  <div>
                    <p className="text-sm font-black">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-xs font-black tracking-[0.18em] text-amber-300">REGISTRATION CHECK</p>
            <h2 className="mt-1 text-xl font-black">인터넷신문 신청용 점검</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              <li>• 카테고리별 기사 수와 최근 발행일 확인</li>
              <li>• 깨진 썸네일·빈 이미지 확인</li>
              <li>• 개인정보처리방침·청소년보호정책 연결 확인</li>
              <li>• 기사제보·정정보도·문의 창구 확인</li>
              <li>• 발행인·편집인·등록정보 표기 확인</li>
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
