export const metadata = { title: '개인정보처리방침' };

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-4xl font-black text-brand-navy">개인정보처리방침</h1><div className="mt-8 space-y-7 leading-8 text-gray-700"><p>에듀저널은 문의 응대, 오류 제보 확인, 독자 의견 처리에 필요한 최소한의 개인정보를 수집합니다.</p><section><h2 className="text-xl font-black text-brand-navy">수집 항목</h2><p className="mt-2">이름, 이메일, 연락처, 문의 내용, 접속 로그 등 서비스 이용 과정에서 필요한 정보가 포함될 수 있습니다.</p></section><section><h2 className="text-xl font-black text-brand-navy">이용 목적</h2><p className="mt-2">문의 답변, 기사 오류 확인, 서비스 개선, 법령상 의무 이행을 위해 사용합니다.</p></section><section><h2 className="text-xl font-black text-brand-navy">보관 기간</h2><p className="mt-2">수집 목적이 달성되면 지체 없이 파기하며, 관계 법령에 따른 보관 의무가 있는 경우 해당 기간 동안 보관합니다.</p></section></div></main>;
}
