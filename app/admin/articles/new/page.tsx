'use client';

import { useState, useTransition } from 'react';
import { ArticleWritingGuide } from '@/components/admin/article-writing-guide';
import { createArticle } from '../actions';

const categories = [
  ['lifelong-education', '평생교육·HRD'],
  ['career-dev', '자격증·자기계발'],
  ['senior-education', '시니어·실버교육'],
  ['edutech-ai', '에듀테크·AI'],
  ['wellness-life', '웰니스·인문학'],
  ['edu-institution', '교육기관 탐방'],
  ['interview-people', '명사 인터뷰'],
  ['opinion', '오피니언'],
  ['press-release', '공지·보도']
];

const articlePlaceholder = `평생교육 현장에서 성인 학습자의 과정 선택 기준이 달라지고 있다. 단순한 수강료와 위치보다 운영 방식, 상담 체계, 수료 이후 활용 가능성, 학습 관리 수준을 함께 확인하는 흐름이 뚜렷하다.

교육기관 관계자들은 최근 상담 과정에서 학습자의 질문이 구체화됐다고 설명한다. 커리큘럼 구성, 강사 이력, 수료 기준, 사후 안내 체계까지 확인한 뒤 등록 여부를 결정하는 사례가 늘었다는 것이다.

이 같은 변화는 교육 수요가 줄었다기보다 선택 기준이 세밀해졌다는 해석으로 이어진다. 특히 자격증, 직무교육, 디지털 역량 교육처럼 결과 활용도가 중요한 분야에서는 정보 제공의 투명성이 기관 신뢰도와 연결된다.

다만 학습자는 과정 소개만으로 판단하기보다 실제 운영 일정, 상담 기록, 수료 이후 지원 범위를 함께 살펴볼 필요가 있다. 교육기관도 광고성 문구보다 구체적인 운영 자료와 학습자 안내 체계를 갖추는 것이 중요하다.

전문가들은 평생교육 시장에서 콘텐츠 품질과 운영 신뢰가 함께 평가되는 흐름이 이어질 것으로 보고 있다. 에듀저널은 관련 정책과 교육기관 운영 사례, 학습자 선택 기준을 지속적으로 점검할 계획이다.`;

export default function NewArticlePage() {
  const [state, setState] = useState<{ ok?: boolean; message?: string }>({});
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-black text-brand-navy">기사 작성</h1>
      <p className="mt-2 text-sm leading-6 text-gray-600">여기서 저장한 기사는 CMS 데이터베이스에 들어가며, 발행 상태가 published이면 공개 홈·카테고리·기사 상세에 바로 반영됩니다.</p>

      <form action={(formData) => startTransition(async () => setState(await createArticle(formData)))} className="mt-6 space-y-6 rounded-2xl border bg-white p-6">
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-lg font-black text-gray-950">기본 정보</h2>
          <input name="title" required placeholder="제목" className="w-full rounded-lg border px-3 py-2" />
          <input name="slug" placeholder="slug 미입력 시 제목 기반 자동 생성" className="w-full rounded-lg border px-3 py-2" />
          <input name="subtitle" placeholder="부제" className="w-full rounded-lg border px-3 py-2" />
          <textarea name="summary" rows={3} placeholder="요약: 기사 핵심, 배경, 독자 영향을 1~2문장으로 정리" className="w-full rounded-lg border px-3 py-2" />
          <div className="grid gap-4 md:grid-cols-3">
            <select name="category_slug" required className="rounded-lg border px-3 py-2">
              <option value="">카테고리 선택</option>
              {categories.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
            </select>
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
              <option value="published">즉시 발행</option>
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold text-gray-700">예약 발행 시각<input name="scheduled_at" type="datetime-local" className="mt-1 w-full rounded-lg border px-3 py-2 font-normal" /></label>
            <input name="sponsored_notice" placeholder="제휴 고지문 직접 입력(선택)" className="self-end rounded-lg border px-3 py-2" />
          </div>
        </section>

        <ArticleWritingGuide />

        <section className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div>
            <h2 className="text-lg font-black text-brand-navy">대표 이미지</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">공개 홈, 카테고리 목록, 기사 상세 대표 이미지에 동일하게 노출됩니다. 실제 운영 시 이미지 출처와 라이선스를 함께 기록하세요.</p>
          </div>
          <input name="thumbnail_url" value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="대표 이미지 URL 또는 Supabase Storage URL" className="w-full rounded-lg border px-3 py-2" />
          {thumbnailUrl ? (
            <div className="overflow-hidden rounded-lg border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnailUrl} alt="대표 이미지 미리보기" className="max-h-80 w-full object-contain" referrerPolicy="no-referrer" />
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
          <textarea name="source_urls" rows={3} placeholder="참고 출처 URL을 줄바꿈 또는 쉼표로 입력" className="w-full rounded-lg border px-3 py-2" />
          <label className="flex gap-2 text-sm font-bold text-gray-700"><input name="fact_checked" type="checkbox" value="true" />팩트체크와 표현 검수를 완료했습니다.</label>
        </section>

        <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          발행 전 체크: 기사 톤과 구조, 제휴 고지, 과장 표현, 자료 권리, 이미지 출처를 확인하세요. published 상태로 저장하면 공개 페이지에서 우선 노출됩니다.
        </div>
        {state.message && <p className={`rounded-lg p-3 text-sm ${state.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{state.message}</p>}
        <button disabled={isPending} className="rounded-xl bg-brand-navy px-5 py-3 font-black text-white">저장</button>
      </form>
    </div>
  );
}
