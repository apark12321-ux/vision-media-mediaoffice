import Link from 'next/link';
import { getWordPressAdminUrl } from '@/lib/data/public';

export default function NewArticlePage() {
  const adminUrl = getWordPressAdminUrl();

  return (
    <main className="max-w-4xl rounded-3xl border bg-white p-8 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">WORDPRESS ONLY</p>
      <h1 className="mt-4 text-3xl font-black text-brand-navy">기사 작성은 WordPress에서 진행합니다</h1>
      <p className="mt-4 text-base leading-8 text-slate-700">
        에듀저널은 Headless WordPress 구조로 전환되었습니다. 기사 작성, 수정, 삭제, 카테고리, 대표 이미지, 태그, 작성자, 발행 상태는 WordPress 관리자에서 관리합니다. Next.js는 공개 프론트 렌더링만 담당합니다.
      </p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
        WordPress에 글을 발행하면 공개 사이트의 홈, 카테고리, 기사 상세가 WordPress REST API를 통해 해당 글을 우선 읽습니다. WordPress 연결이 없을 때만 기존 샘플 기사 데이터가 임시로 표시됩니다.
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {adminUrl ? (
          <a href={adminUrl} className="rounded-full bg-brand-navy px-5 py-3 text-sm font-black text-white">
            WordPress 관리자 열기
          </a>
        ) : (
          <span className="rounded-full bg-amber-100 px-5 py-3 text-sm font-black text-amber-900">
            WORDPRESS_ADMIN_URL 미설정
          </span>
        )}
        <Link href="/admin" className="rounded-full border px-5 py-3 text-sm font-black text-slate-700">
          관리자 안내로 돌아가기
        </Link>
      </div>
    </main>
  );
}
