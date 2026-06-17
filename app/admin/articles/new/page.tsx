'use client';

import { useState, useTransition } from 'react';
import { createArticle } from '../actions';

export default function NewArticlePage() {
  const [state, setState] = useState<{ ok?: boolean; message?: string }>({});
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-black text-brand-navy">기사 작성</h1>
      <form action={(formData) => startTransition(async () => setState(await createArticle(formData)))} className="mt-6 space-y-6 rounded-2xl border bg-white p-6">
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-black text-gray-950">기본 정보</h2>
          <input name="title" required placeholder="제목" className="w-full rounded-lg border px-3 py-2" />
          <input name="slug" placeholder="slug 미입력 시 제목 기반 자동 생성" className="w-full rounded-lg border px-3 py-2" />
          <input name="subtitle" placeholder="부제" className="w-full rounded-lg border px-3 py-2" />
          <textarea name="summary" rows={3} placeholder="요약" className="w-full rounded-lg border px-3 py-2" />
          <div className="grid gap-4 md:grid-cols-2">
            <select name="article_type" className="rounded-lg border px-3 py-2">
              <option value="normal">일반 기사</option>
              <option value="brand_interview">브랜드 인터뷰</option>
              <option value="sponsored">제휴 콘텐츠</option>
              <option value="advertorial">광고/제휴</option>
              <option value="press_release">보도자료</option>
            </select>
            <select name="status" className="rounded-lg border px-3 py-2">
              <option value="draft">임시저장</option>
              <option value="review">검수</option>
              <option value="published">발행</option>
            </select>
          </div>
          <input name="sponsored_notice" placeholder="제휴 고지문 직접 입력(선택)" className="w-full rounded-lg border px-3 py-2" />
        </section>

        <section className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div>
            <h2 className="text-lg font-black text-brand-navy">대표 이미지</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">기사 카드, 메인 편집판, 기사 상세 대표 이미지에 직접 노출됩니다. 텍스트 카드가 아니라 실제 이미지 URL 또는 업로드 이미지 URL을 넣어야 합니다.</p>
          </div>
          <input name="thumbnail_url" value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="대표 이미지 URL 또는 Supabase Storage URL" className="w-full rounded-lg border px-3 py-2" />
          {thumbnailUrl ? (
            <div className="overflow-hidden rounded-lg border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailUrl} alt="대표 이미지 미리보기" className="max-h-80 w-full object-contain" />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-white p-5 text-sm text-gray-500">대표 이미지가 없으면 공개 화면에서는 카테고리별 기본 무료 자료사진이 표시됩니다.</div>
          )}
          <input name="image_caption" placeholder="이미지 캡션 예: ▲ 기사 관련 자료사진. 출처=Unsplash." className="w-full rounded-lg border px-3 py-2" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="image_source_name" placeholder="출처명 예: Unsplash, Pexels, 광고주 제공" className="rounded-lg border px-3 py-2" />
            <input name="image_source_url" placeholder="원본 출처 URL" className="rounded-lg border px-3 py-2" />
            <input name="image_author" placeholder="저작자명(있으면 입력)" className="rounded-lg border px-3 py-2" />
            <input name="image_license" placeholder="라이선스명 예: Unsplash License" className="rounded-lg border px-3 py-2" />
            <input name="image_license_url" placeholder="라이선스 URL" className="rounded-lg border px-3 py-2 md:col-span-2" />
          </div>
          <label className="flex gap-2 text-sm font-bold text-gray-700">
            <input name="image_rights_confirmed" type="checkbox" value="true" />
            이미지 사용 권한, 출처, 라이선스를 확인했습니다.
          </label>
          <label className="flex gap-2 text-sm text-gray-700">
            <input name="image_contains_people_or_trademarks" type="checkbox" value="true" />
            인물 얼굴, 상표, 로고, 간판, 제품명이 뚜렷하게 포함되어 있습니다.
          </label>
        </section>

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-black text-gray-950">본문</h2>
          <textarea name="content" rows={15} required placeholder="본문" className="w-full rounded-lg border px-3 py-2" />
        </section>

        <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          발행 전 체크: 제휴 고지, 과장 표현, 자료 권리, 이미지 출처/라이선스, 개인정보 노출, 민감 업종 표현을 확인하세요.
        </div>
        {state.message && <p className={`rounded-lg p-3 text-sm ${state.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{state.message}</p>}
        <button disabled={isPending} className="rounded-xl bg-brand-navy px-5 py-3 font-black text-white">저장</button>
      </form>
    </div>
  );
}
