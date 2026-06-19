import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return <main>기사를 찾을 수 없습니다.</main>;
  return <main className="mx-auto max-w-[820px] px-4 py-8"><h1 className="text-3xl font-black">{article.title}</h1></main>;
}
