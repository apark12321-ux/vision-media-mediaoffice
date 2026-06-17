import { ArticleCard } from '@/components/public/article-card';
import { getPublishedArticles } from '@/lib/data/public';

export const metadata = { title: '전체기사' };

export default async function ArticlesPage() {
  const articles = await getPublishedArticles(100);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black text-brand-navy">전체기사</h1>
      <p className="mt-3 text-gray-600">생활경제저널의 최신 기사와 브랜드 인터뷰를 확인하세요.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}
