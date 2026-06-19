import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

type Block = { kind: 'text'; value: string } | { kind: 'image'; value: string };

const fallbackImage = '/media/edu-lifelong.svg';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function normalizeImageUrl(value: string) {
  const url = value.replace('&amp;', '&').trim();
  return url || fallbackImage;
}

function firstToken(value: string) {
  return value.trim().split(' ')[0] || '';
}

function extractParenContent(value: string) {
  const close = value.lastIndexOf(')');
  return close > 0 ? value.slice(1, close) : '';
}

function parseBody(content: string): Block[] {
  const lines = content.split('\n').map((line) => line.trim()).filter(Boolean);
  const blocks: Block[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    if (line.startsWith('![')) {
      const start = line.indexOf('](');
      if (start > -1) {
        const inside = extractParenContent(line.slice(start + 1));
        blocks.push({ kind: 'image', value: normalizeImageUrl(firstToken(inside)) });
        continue;
      }
      const next = lines[i + 1];
      if (next && next.charAt(0) === '(') {
        const inside = extractParenContent(next);
        blocks.push({ kind: 'image', value: normalizeImageUrl(firstToken(inside)) });
        i += 1;
      }
      continue;
    }
    if (line.charAt(0) === '(') continue;
    blocks.push({ kind: 'text', value: line });
  }
  return blocks.filter((block) => block.value);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return <main className="px-4 py-10">기사를 찾을 수 없습니다.</main>;
  const body = parseBody(article.content ?? article.summary ?? '');
  const hasBodyImage = body.some((block) => block.kind === 'image');

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
        {!hasBodyImage ? <img src={article.thumbnail_url || fallbackImage} alt="" className="mt-6 aspect-video w-full rounded-2xl object-cover" /> : null}
        <div className="mt-8 space-y-5 text-[17px] leading-9 text-slate-800">
          {body.map((block, index) => block.kind === 'image' ? (
            <img key={index} src={block.value} alt="기사 이미지" className="my-8 max-h-[520px] w-full rounded-2xl object-cover" />
          ) : (
            <p key={index}>{block.value}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
