import { ArticleCard } from '@/components/public/article-card';
import { getArticlesByCategory, getCategories } from '@/lib/data/public';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [articles, categories] = await Promise.all([getArticlesByCategory(slug), getCategories()]);
  const category = categories.find((item) => item.slug === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="border-b-2 border-brand-navy pb-4">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-gold">Category</p>
        <h1 className="mt-2 text-4xl font-black text-brand-navy">{category?.name ?? '카테고리 기사'}</h1>
        <p className="mt-3 text-gray-600">{category?.description ?? '선택한 카테고리의 기사 목록입니다.'}</p>
      </div>

      <div className="mt-6 border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-[10px] font-black tracking-[0.2em] text-amber-700">PARTNER SAMPLE</p>
        <p className="mt-1 text-lg font-black text-slate-950">교육기관 소개 샘플 영역</p>
        <p className="mt-1 text-sm text-slate-600">강좌 안내와 교육원 소개를 배치할 수 있는 내부 검토용 영역입니다.</p>
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
