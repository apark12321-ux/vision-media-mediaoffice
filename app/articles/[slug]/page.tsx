import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function parseBody(content: string) {
  const rows = content.split('\n').map((line) => line.trim()).filter(Boolean);
  const result: Array<{ type: 'text'; text: string } | { type: 'image'; alt: string; src: string }> = [];

  for (let index = 0; index < rows.length; index += 1) {
    const line = rows[index];
    if (!line) continue;
    if (line.startsWith('![')) {
      const altEnd = line.indexOf(']');
      const inlineStart = line.indexOf('](');
      const inlineEnd = line.indexOf(')', inlineStart + 2);
      const alt = altEnd > 1 ? line.slice(2, altEnd) : '기사 이미지';
      if (inlineStart > -1 && inlineEnd > inlineStart) {
        result.push({ type: 'image', alt, src: line.slice(inlineStart + 2, inlineEnd).split(' ')[0] });
        continue;
      }
      const next = rows[index + 1];
      if (next && next.charAt(0) === '(') {
        const end = next.indexOf(')');
        if (end > 1) result.push({ type: 'image', alt, src: next.slice(1, end).split(' ')[0] });
        index += 1;
      }
      continue;
    }
    if (line.charAt(0) === '(') continue;
    result.push({ type: 'text', text: line });
  }

  return result;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <main className="px-4 py-10">기사를 찾을 수 없습니다.</main>;
  }

  const blocks = parseBody(article.content ?? article.summary ?? '');

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
          {blocks.map((block, index) => block.type === 'image' ? (
            <figure key={index} className="my-8 overflow-hidden rounded-2xl border bg-slate-50">
              <img src={block.src} alt={block.alt} className="max-h-[520px] w-full object-cover" />
              {block.alt ? <figcaption className="px-4 py-3 text-sm text-slate-500">{block.alt}</figcaption> : null}
            </figure>
          ) : (
            <p key={index}>{block.text}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
