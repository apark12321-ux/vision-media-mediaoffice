import Link from 'next/link';
import { getProducts } from '@/lib/data/public';
import { formatKRW } from '@/lib/utils/format';

export const metadata = { title: '광고·제휴 문의' };

export default async function AdvertisePage() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">광고·제휴 문의</h1>
      <p className="mt-4 max-w-3xl leading-7 text-gray-600">생활경제저널은 브랜드 인터뷰, 제휴 콘텐츠, 배너 광고, 월관리 패키지를 제공합니다. 모든 유료 콘텐츠는 제휴/광고 성격을 명확히 표시합니다.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-brand-navy">{product.name}</h2>
            <p className="mt-3 text-2xl font-black text-brand-blue">{formatKRW(product.price)}</p>
            <p className="mt-4 text-sm leading-7 text-gray-600">{product.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {product.features?.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl bg-brand-navy p-8 text-white">
        <h2 className="text-2xl font-black">광고·제휴 콘텐츠 원칙</h2>
        <p className="mt-3 leading-7 text-blue-100">광고주가 비용을 지급한 콘텐츠는 일반 기사와 구분되도록 고지합니다. 허위·과장 표현, 보장성 표현, 등록 전 언론사 오인 표현은 제한됩니다.</p>
        <Link href="/apply" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-black text-brand-navy">문의하기</Link>
      </div>
    </div>
  );
}
