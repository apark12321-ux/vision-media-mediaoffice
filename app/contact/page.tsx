export const metadata = { title: '문의' };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">문의</h1>
      <div className="mt-8 space-y-5 leading-8 text-gray-700">
        <p>에듀저널은 독자 의견, 기사 오류, 교육기관 소식과 관련한 문의를 접수합니다.</p>
        <p>문의 시 확인이 필요한 기사 제목, URL, 요청 내용을 함께 남겨주세요.</p>
        <p>기사제보는 기사제보 페이지를 이용해 주세요.</p>
      </div>
    </main>
  );
}
