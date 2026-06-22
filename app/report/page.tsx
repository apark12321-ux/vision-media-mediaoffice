export default function ReportPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-black text-brand-gold">REPORT</p>
      <h1 className="mt-2 text-4xl font-black text-brand-navy">기사제보</h1>
      <p className="mt-4 text-lg leading-8 text-gray-700">에듀저널은 평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 관련 소식을 접수합니다.</p>
      <section className="mt-10 border-t-2 border-brand-navy pt-6">
        <h2 className="text-xl font-black text-brand-navy">주요 분야</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {['평생교육', '자격증', '시니어 학습', '에듀테크', '교육기관', '강좌 일정', '학습 사례', '정정 요청'].map((item) => <div key={item} className="border bg-white p-4 text-sm font-bold text-gray-700">{item}</div>)}
        </div>
      </section>
      <section className="mt-10 border bg-gray-50 p-6">
        <h2 className="text-xl font-black text-brand-navy">이용 안내</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">내용 확인에 필요한 연락처와 출처를 함께 남겨주세요. 확인이 어려운 내용은 반영되지 않을 수 있습니다.</p>
      </section>
    </main>
  );
}
