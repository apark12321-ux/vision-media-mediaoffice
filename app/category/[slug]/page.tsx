import { ArticleCard } from '@/components/public/article-card';
import { getArticlesByCategory, getCategories } from '@/lib/data/public';

function CategoryBanner() {
  return (
    <div className="mb-8 border bg-slate-950 px-5 py-4 text-white">
      <p className="text-[11px] font-black tracking-[0.25em] text-amber-300">AD · EDU PARTNER</p>
      <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-black">평생교육·자격증 과정 안내 배너</h2>
          <p className="mt-1 text-xs leading-5 text-slate-300">교육기관, 원격교육, 직무교육 프로그램을 소개하는 임시 배너 영역입니다.</p>
        </div>
        <span className="inline-flex w-fit border border-white/30 px-3 py-1.5 text-xs font-black">문의 000-0000-0000</span>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [articles, categories] = await Promise.all([getArticlesByCategory(slug), getCategories()]);
  const category = categories.find((item) => item.slug === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <CategoryBanner />
      <div className="border-b-2 border-brand-navy pb-4">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Category</p>
        <h1 className="mt-2 text-4xl font-black text-brand-navy">{category?.name ?? '카테고리 기사'}</h1>
        <p className="mt-3 text-gray-600">{category?.description ?? '선택한 카테고리의 기사 목록입니다.'}</p>
      </div>

      {articles.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-sm border bg-gray-50 p-10 text-center text-sm text-gray-500">
          이 카테고리의 기사를 준비 중입니다.
        </div>
      )}
    </div>
  );
}
