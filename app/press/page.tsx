export const metadata = { title: '보도자료 접수' };

export default function PressPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">보도자료 접수</h1>
      <div className="mt-8 space-y-5 leading-8 text-gray-700">
        <p>에듀저널은 교육기관, 평생교육 과정, 자격증, 에듀테크, 시니어 학습 관련 보도자료를 접수합니다.</p>
        <p>자료를 보낼 때는 기관명, 담당자 연락처, 배포 희망일, 사진 사용 가능 여부를 함께 알려주세요.</p>
        <p>보도자료는 편집 기준에 따라 검토되며, 모든 자료가 기사화되는 것은 아닙니다.</p>
      </div>
    </main>
  );
}
