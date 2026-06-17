export default function ReportPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-black text-brand-gold">REPORT</p>
      <h1 className="mt-2 text-4xl font-black text-brand-navy">기사제보</h1>
      <p className="mt-4 text-lg leading-8 text-gray-700">생활경제저널은 생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 제보와 보도자료를 접수합니다.</p>
      <section className="mt-10 border-t-2 border-brand-navy pt-6">
        <h2 className="text-xl font-black text-brand-navy">제보 가능 분야</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {['생활경제 현장', '지역상권 소식', '교육·학원 이슈', '시니어·요양 서비스', '건강·뷰티 업계', '창업·프랜차이즈', '브랜드 인터뷰 제안', '보도자료 제공'].map((item) => <div key={item} className="border bg-white p-4 text-sm font-bold text-gray-700">{item}</div>)}
        </div>
      </section>
      <section className="mt-10 border bg-gray-50 p-6">
        <h2 className="text-xl font-black text-brand-navy">접수 안내</h2>
        <p className="mt-3 text-sm leading-7 text-gray-700">제보 내용에는 사실관계 확인을 위한 연락처, 자료 출처, 사진·문서 사용 권한 여부를 함께 남겨주세요. 허위 제보, 비방 목적의 제보, 권리관계가 불명확한 자료는 게재되지 않을 수 있습니다.</p>
      </section>
    </main>
  );
}
