import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function bodyLines(content: string) {
  return content.split('\n').map((line) => line.trim()).filter((line) => line && line.charAt(0) !== '!' && line.charAt(0) !== '(');
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return <main>기사를 찾을 수 없습니다.</main>;
  const lines = bodyLines(article.content ?? article.summary ?? '');
  return (
    <main className="mx-auto max-w-[820px] px-4 py-8">
      <p className="text-sm font-bold text-brand-blue">{article.categories?.name ?? '교육뉴스'}</p>
      <h1 className="mt-3 text-3xl font-black leading-tight">{article.title}</h1>
      <p className="mt-4 text-sm text-slate-500">{article.author_name ?? '에듀저널 편집부'} · {formatDate(article.published_at)}</p>
      <img src={article.thumbnail_url || '/media/edu-lifelong.svg'} alt="" className="mt-6 aspect-video w-full rounded-2xl object-cover" />
      <div className="mt-8 space-y-5 text-[17px] leading-9 text-slate-800">
        {lines.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    </main>
  );
}
