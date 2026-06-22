export const metadata = { title: '서비스 이용약관' };

export default function TermsPage() {
  return <main className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-4xl font-black text-brand-navy">서비스 이용약관</h1><div className="mt-8 space-y-7 leading-8 text-gray-700"><p>본 약관은 에듀저널 웹사이트 이용에 관한 기본 사항을 안내합니다.</p><section><h2 className="text-xl font-black text-brand-navy">콘텐츠 이용</h2><p className="mt-2">사이트의 기사와 자료는 독자의 정보 확인을 돕기 위한 목적으로 제공됩니다. 무단 복제, 배포, 재가공은 제한됩니다.</p></section><section><h2 className="text-xl font-black text-brand-navy">정보 확인</h2><p className="mt-2">교육 과정, 비용, 일정, 제도는 변경될 수 있으므로 신청 전 공식 안내처에서 다시 확인해야 합니다.</p></section><section><h2 className="text-xl font-black text-brand-navy">문의</h2><p className="mt-2">오류 제보와 문의는 문의 페이지를 통해 접수할 수 있습니다.</p></section></div></main>;
}
