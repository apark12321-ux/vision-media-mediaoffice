'use client';

import { useState, useTransition } from 'react';
import { ArticleWritingGuide } from '@/components/admin/article-writing-guide';
import { createArticle } from '../actions';

const articlePlaceholder = `생활경제 현장에서 체감되는 소비 부담이 커지면서 가계와 소상공인 모두 지출 구조를 다시 점검하고 있다. 외식비와 생필품 가격, 교육비 등 생활 필수 영역의 비용 부담이 이어지면서 소비자의 선택 기준도 이전보다 세분화되는 모습이다.

최근 지역 상권에서는 가격 비교와 후기 확인이 일상화되고 있다. 소비자는 단순히 가까운 매장을 찾는 데 그치지 않고, 서비스 범위와 운영자의 설명, 예약 절차, 사후 대응 방식까지 함께 확인하는 경향을 보이고 있다.

업계에서는 이러한 변화가 단기적인 소비 위축만으로 설명되기 어렵다고 본다. 온라인 검색과 지역 기반 평판이 결합되면서 생활서비스 업종에서도 정보의 투명성이 중요한 경쟁 요소로 떠올랐다는 분석이다.

다만 모든 사업자가 같은 방식으로 대응하기는 어렵다. 소규모 사업장일수록 콘텐츠 제작과 고객 응대를 동시에 수행해야 하는 부담이 크고, 비용을 들여 광고를 집행하더라도 기본 정보가 정리되어 있지 않으면 전환 효과가 제한될 수 있다.

전문가들은 하반기 생활경제의 핵심 변수가 물가 안정과 소비심리 회복 여부에 달려 있다고 보고 있다. 비용 부담이 계속되는 상황에서는 지역 사업자가 고객과의 접점을 세분화하고, 신뢰를 높이는 정보를 꾸준히 축적하는 전략이 필요하다는 지적이다.`;

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
          <textarea name="summary" rows={3} placeholder="요약: 기사 핵심, 배경, 독자 영향을 1~2문장으로 정리" className="w-full rounded-lg border px-3 py-2" />
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

        <ArticleWritingGuide />

        <section className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div>
            <h2 className="text-lg font-black text-brand-navy">대표 이미지</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">기사 카드와 기사 상세에 노출되는 실제 이미지 URL을 입력합니다. 이미지가 없으면 카테고리 기본 이미지가 표시됩니다.</p>
          </div>
          <input name="thumbnail_url" value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="대표 이미지 URL 또는 Supabase Storage URL" className="w-full rounded-lg border px-3 py-2" />
          {thumbnailUrl ? (
            <div className="overflow-hidden rounded-lg border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailUrl} alt="대표 이미지 미리보기" className="max-h-80 w-full object-contain" />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-white p-5 text-sm text-gray-500">대표 이미지가 없으면 공개 화면에서는 카테고리별 기본 이미지가 표시됩니다.</div>
          )}
          <input name="image_caption" placeholder="이미지 캡션" className="w-full rounded-lg border px-3 py-2" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="image_source_name" placeholder="출처명" className="rounded-lg border px-3 py-2" />
            <input name="image_source_url" placeholder="원본 출처 URL" className="rounded-lg border px-3 py-2" />
            <input name="image_author" placeholder="저작자명" className="rounded-lg border px-3 py-2" />
            <input name="image_license" placeholder="라이선스명" className="rounded-lg border px-3 py-2" />
            <input name="image_license_url" placeholder="라이선스 URL" className="rounded-lg border px-3 py-2 md:col-span-2" />
          </div>
          <label className="flex gap-2 text-sm font-bold text-gray-700">
            <input name="image_rights_confirmed" type="checkbox" value="true" />
            이미지 사용 권한과 출처를 확인했습니다.
          </label>
          <label className="flex gap-2 text-sm text-gray-700">
            <input name="image_contains_people_or_trademarks" type="checkbox" value="true" />
            추가 권리 검수가 필요한 이미지입니다.
          </label>
        </section>

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-black text-gray-950">기사 원고</h2>
          <textarea name="content" rows={26} required placeholder={articlePlaceholder} className="w-full rounded-lg border px-3 py-2 leading-7" />
        </section>

        <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          발행 전 체크: 기사 톤과 구조, 제휴 고지, 과장 표현, 자료 권리, 이미지 출처를 확인하세요.
        </div>
        {state.message && <p className={`rounded-lg p-3 text-sm ${state.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{state.message}</p>}
        <button disabled={isPending} className="rounded-xl bg-brand-navy px-5 py-3 font-black text-white">저장</button>
      </form>
    </div>
  );
}
