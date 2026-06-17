import { getArticleWritingTemplate } from '@/lib/editorial/article-style';

export function ArticleWritingGuide() {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div>
        <h2 className="text-lg font-black text-gray-950">생활경제저널 기사 톤/구조</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          기사는 광고문이 아니라 독자가 상황을 이해하고 판단할 수 있게 돕는 기사체여야 합니다. 사실을 먼저 놓고, 배경과 영향을 이어 붙인 뒤 과장 없이 정리합니다.
        </p>
      </div>
      <div className="grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-3">
          <p className="font-black text-brand-navy">문체 원칙</p>
          <p className="mt-1">담백한 기사체, 설명 중심, 단정적 홍보 표현 금지, 독자 판단 기준 제시</p>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <p className="font-black text-brand-navy">문맥 흐름</p>
          <p className="mt-1">리드 → 배경 → 현장 맥락 → 독자 영향 → 전망과 과제</p>
        </div>
      </div>
      <textarea readOnly rows={12} value={getArticleWritingTemplate()} className="w-full rounded-lg border bg-white px-3 py-2 font-mono text-xs leading-5 text-gray-700" />
      <p className="text-xs leading-5 text-gray-500">위 구조를 복사해 본문에 붙여 넣고 각 섹션을 채우세요. 섹션 표지는 기사 상세 화면에서 문맥 블록으로 표시됩니다.</p>
    </section>
  );
}
