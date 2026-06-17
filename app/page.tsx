import Link from 'next/link';
import { ArticleCard } from '@/components/public/article-card';
import { getCategories, getProducts, getPublishedArticles } from '@/lib/data/public';
import { formatKRW } from '@/lib/utils/format';

export default async function HomePage() {
  const [articles, categories, products] = await Promise.all([getPublishedArticles(6), getCategories(), getProducts()]);
  const brandArticles = articles.filter((article) => article.article_type === 'brand_interview').slice(0, 3);

  return (
    <div>
      <section className="border-b bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold">Everyday Economy Journal</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-brand-navy md:text-6xl">생활경제의 현장, 브랜드의 가치를 기록합니다.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">생활경제저널은 지역상권, 교육, 시니어, 건강, 뷰티, 창업 현장의 브랜드와 사람을 인터뷰와 기획 콘텐츠로 소개하는 생활경제 전문 미디어입니다.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/advertise" className="rounded-full bg-brand-navy px-6 py-3 font-bold text-white hover:bg-brand-blue">광고·제휴 문의</Link>
              <Link href="/apply" className="rounded-full border border-brand-navy px-6 py-3 font-bold text-brand-navy hover:bg-white">브랜드 인터뷰 신청</Link>
            </div>
          </div>
          <div className="rounded-3xl border bg-white p-6 shadow-xl">
            <h2 className="text-xl font-black text-brand-navy">MediaOffice 운영 구조</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-gray-700">
              <li>① 기사 기획·작성·발행 관리</li>
              <li>② 광고주 리드와 상담 상태 관리</li>
              <li>③ 제휴 콘텐츠 고지 자동화</li>
              <li>④ 금지 표현·수신동의 리스크 체크</li>
              <li>⑤ 납품물과 월관리 상품 전환 관리</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-black text-brand-navy">주요 카테고리</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="rounded-xl border bg-white p-4 font-bold text-brand-navy hover:border-brand-blue hover:text-brand-blue">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-black text-brand-navy">최신 기사</h2>
          <Link href="/articles" className="text-sm font-bold text-brand-blue">전체 보기</Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-black text-brand-navy">광고 상품</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <h3 className="font-black text-brand-navy">{product.name}</h3>
                <p className="mt-2 text-2xl font-black text-brand-blue">{formatKRW(product.price)}</p>
                <p className="mt-3 text-sm leading-6 text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-3xl font-black text-brand-navy">우리 업체도 소개하고 싶다면?</h2>
        <p className="mt-4 text-gray-600">브랜드 인터뷰, 제휴 콘텐츠, 배너 광고, 월관리 패키지를 신청할 수 있습니다.</p>
        <Link href="/apply" className="mt-7 inline-flex rounded-full bg-brand-gold px-7 py-3 font-black text-white">신청하기</Link>
      </section>
    </div>
  );
}
