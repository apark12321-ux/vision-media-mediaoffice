import Link from 'next/link';
import { getWordPressAdminUrl } from '@/lib/data/public';

const wpControls = [
  ['기사 작성·수정·삭제', 'WordPress 글 관리에서 제목, 본문, 요약, 대표 이미지를 관리합니다.'],
  ['카테고리·태그 관리', 'WordPress 카테고리와 태그가 공개 사이트 메뉴와 기사 분류의 기준이 됩니다.'],
  ['대표 이미지 관리', 'WordPress 미디어 라이브러리에 등록한 대표 이미지가 홈·목록·상세 화면에 노출됩니다.'],
  ['발행 상태 관리', 'WordPress에서 공개한 글만 에듀저널 프론트에 우선 노출됩니다.'],
  ['작성자 관리', 'WordPress 사용자 계정의 작성자명이 기사 작성자 정보로 사용됩니다.'],
  ['고정 페이지 관리', '회사소개, 정책, 문의 페이지는 WordPress 페이지 또는 현재 Next.js 페이지 중 하나로 운영할 수 있습니다.']
];

const envItems = [
  ['WORDPRESS_SITE_URL', 'WordPress 사이트 주소. 예: https://cms.edujournal.kr'],
  ['WORDPRESS_API_URL', 'WordPress REST API 주소. 예: https://cms.edujournal.kr/wp-json/wp/v2'],
  ['WORDPRESS_ADMIN_URL', 'WordPress 관리자 주소. 예: https://cms.edujournal.kr/wp-admin/']
];

export default function AdminDashboardPage() {
  const adminUrl = getWordPressAdminUrl();

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">HEADLESS WORDPRESS ADMIN</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">에듀저널 관리자</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            에듀저널은 WordPress를 관리자 CMS로 사용하고, Next.js는 공개 프론트만 담당합니다. 기사 작성과 이미지 관리는 WordPress 관리자에서 처리합니다.
          </p>
          {adminUrl ? (
            <a href={adminUrl} className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white hover:bg-slate-800">
              WordPress 관리자 열기
            </a>
          ) : (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left text-sm leading-7 text-amber-900">
              WordPress 관리자 주소가 아직 설정되지 않았습니다. Vercel 환경변수에 WORDPRESS_SITE_URL 또는 WORDPRESS_ADMIN_URL을 등록하면 이 버튼이 WordPress 관리자 로그인으로 연결됩니다.
            </div>
          )}
          <div className="mt-6 flex justify-center gap-3 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-slate-950">공개 사이트</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-slate-950">전체 기사</Link>
            <span>/</span>
            <Link href="/admin/system" className="hover:text-slate-950">연동 구조</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-10 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">WordPress에서 하는 일</h2>
          <div className="mt-5 space-y-4">
            {wpControls.map(([title, desc]) => (
              <div key={title} className="border-t border-slate-100 pt-4">
                <p className="font-black">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Vercel 환경변수</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">아래 값이 설정되면 공개 프론트가 WordPress REST API의 글·카테고리·대표 이미지를 우선 읽습니다.</p>
          <div className="mt-5 space-y-4">
            {envItems.map(([key, desc]) => (
              <div key={key} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-mono text-sm font-black text-slate-950">{key}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm leading-7 text-white">
            공개 사이트는 WordPress 데이터가 있으면 WordPress 글을 우선 노출하고, 연결이 없거나 글이 없으면 기존 샘플 기사로 임시 표시됩니다.
          </div>
        </div>
      </section>
    </main>
  );
}
