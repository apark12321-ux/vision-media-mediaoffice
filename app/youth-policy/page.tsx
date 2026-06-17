export const metadata = { title: '청소년보호정책' };
export default function YouthPolicyPage() { return <Policy title="청소년보호정책"><p>생활경제저널은 청소년에게 유해한 정보가 노출되지 않도록 콘텐츠 관리 원칙을 준수합니다. 인터넷신문 등록 후에는 청소년보호책임자 정보를 표시합니다.</p></Policy>; }
function Policy({ title, children }: { title: string; children: React.ReactNode }) { return <main className="mx-auto max-w-3xl px-4 py-12"><h1 className="text-4xl font-black text-brand-navy">{title}</h1><div className="markdown-body mt-8 text-gray-700">{children}</div></main>; }
