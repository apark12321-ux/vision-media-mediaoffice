import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return <main className="px-4 py-10">기사를 찾을 수 없습니다.</main>;
  const body = (article.content ?? article.summary ?? '').split('\n').map((line) => line.trim()).filter(Boolean);

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-[820px] px-4 py-8">
        <p className="text-sm font-bold text-brand-blue">{article.categories?.name ?? '교육뉴스'}</p>
        <h1 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.05em] text-slate-950 md:text-[36px]">{article.title}</h1>
        {article.subtitle ? <p className="mt-4 text-lg leading-8 text-slate-600">{article.subtitle}</p> : null}
        <div className="mt-5 border-y border-slate-200 py-3 text-sm text-slate-500">
          <span>{article.author_name ?? '에듀저널 편집부'}</span>
          <span className="mx-2">·</span>
          <span>입력 {formatDate(article.published_at)}</span>
        </div>
        {article.thumbnail_url ? <img src={article.thumbnail_url} alt="" className="mt-6 aspect-video w-full rounded-2xl object-cover" /> : null}
        <div className="mt-8 space-y-5 text-[17px] leading-9 text-slate-800">
          {body.map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </article>
    </main>
  );
}
