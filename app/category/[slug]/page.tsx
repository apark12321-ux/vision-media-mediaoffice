import { ArticleCard } from '@/components/public/article-card';
import { getArticlesByCategory } from '@/lib/data/public';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticlesByCategory(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">카테고리 기사</h1>
      <p className="mt-3 text-gray-600">선택한 카테고리의 기사 목록입니다.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}
