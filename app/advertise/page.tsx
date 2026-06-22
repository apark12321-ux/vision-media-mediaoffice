import Link from 'next/link';
import { getProducts } from '@/lib/data/public';
import { formatKRW } from '@/lib/utils/format';

export const metadata = { title: '광고·제휴 문의' };

export default async function AdvertisePage() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">광고·제휴 문의</h1>
      <p className="mt-4 max-w-3xl leading-7 text-gray-600">에듀저널은 교육기관, 학습 서비스, 자격증 과정, 에듀테크 브랜드의 소식을 독자에게 전달할 수 있는 안내 영역을 제공합니다.</p>
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
        <h2 className="text-2xl font-black">표시 원칙</h2>
        <p className="mt-3 leading-7 text-blue-100">유료 노출이나 협찬 성격이 있는 콘텐츠는 독자가 구분할 수 있도록 표시합니다. 허위·과장 표현은 제한합니다.</p>
        <Link href="/report" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-black text-brand-navy">문의하기</Link>
      </div>
    </div>
  );
}
