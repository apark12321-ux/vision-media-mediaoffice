export const metadata = { title: '회사소개' };
export default function AboutPage() {
  return <Policy title="회사소개"><p>생활경제저널은 알고파트너스가 운영하는 생활경제 전문 미디어입니다. 지역상권, 교육, 시니어, 건강, 뷰티, 창업 현장의 브랜드와 사람을 인터뷰와 기획 콘텐츠로 기록합니다.</p><p>알고파트너스는 인터넷 매체 운영을 기반으로 브랜드 인터뷰, 제휴 콘텐츠, 광고대행, 콘텐츠 제작, AI 마케팅 컨설팅을 함께 영위합니다.</p><p>등록 전에는 정식 인터넷신문·언론사로 오인될 표현을 사용하지 않고, 생활경제 콘텐츠 매체 및 브랜드 인터뷰 플랫폼으로 운영합니다.</p></Policy>;
}
function Policy({ title, children }: { title: string; children: React.ReactNode }) { return <main className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-4xl font-black text-brand-navy">{title}</h1><div className="markdown-body mt-8 text-gray-700">{children}</div></main>; }
