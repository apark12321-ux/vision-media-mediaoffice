'use client';

import { useState, useTransition } from 'react';
import { createArticle } from '../actions';

export default function NewArticlePage() {
  const [state, setState] = useState<{ ok?: boolean; message?: string }>({});
  const [isPending, startTransition] = useTransition();
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black text-brand-navy">기사 작성</h1>
      <form action={(formData) => startTransition(async () => setState(await createArticle(formData)))} className="mt-6 space-y-4 rounded-2xl border bg-white p-6">
        <input name="title" required placeholder="제목" className="w-full rounded-lg border px-3 py-2" />
        <input name="slug" placeholder="slug 미입력 시 제목 기반 자동 생성" className="w-full rounded-lg border px-3 py-2" />
        <input name="subtitle" placeholder="부제" className="w-full rounded-lg border px-3 py-2" />
        <textarea name="summary" rows={3} placeholder="요약" className="w-full rounded-lg border px-3 py-2" />
        <div className="grid gap-4 md:grid-cols-2">
          <select name="article_type" className="rounded-lg border px-3 py-2"><option value="normal">일반 기사</option><option value="brand_interview">브랜드 인터뷰</option><option value="sponsored">제휴 콘텐츠</option><option value="advertorial">광고/제휴</option><option value="press_release">보도자료</option></select>
          <select name="status" className="rounded-lg border px-3 py-2"><option value="draft">임시저장</option><option value="review">검수</option><option value="published">발행</option></select>
        </div>
        <input name="sponsored_notice" placeholder="제휴 고지문 직접 입력(선택)" className="w-full rounded-lg border px-3 py-2" />
        <textarea name="content" rows={15} required placeholder="본문" className="w-full rounded-lg border px-3 py-2" />
        <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">발행 전 체크: 제휴 고지, 과장 표현, 자료 권리, 개인정보 노출, 민감 업종 표현을 확인하세요.</div>
        {state.message && <p className={`rounded-lg p-3 text-sm ${state.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{state.message}</p>}
        <button disabled={isPending} className="rounded-xl bg-brand-navy px-5 py-3 font-black text-white">저장</button>
      </form>
    </div>
  );
}
