import Link from 'next/link';
import { getArticleBySlug, getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function cleanLines(content: string) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && line.charAt(0) !== '!' && line.charAt(0) !== '(');
}

type Article = Awaited<ReturnType<typeof getPublishedArticles>>[number];

function ArticleImage({ article }: { article: Article }) {
  const src = article.thumbnail_url || '/media/edu-lifelong.svg';
  return (
    <figure className="mt-7">
      <img src={src} alt={article.title} className="aspect-[16/9] w-full rounded-sm bg-slate-100 object-cover" />
      <figcaption className="mt-2 border-l-2 border-slate-300 pl-3 text-[12px] leading-5 text-slate-500">
        {article.image_caption || `${article.categories?.name ?? '교육'} 관련 현장 자료사진.`}
      </figcaption>
    </figure>
  );
}

function SummaryBox({ article }: { article: Article }) {
  return (
    <section className="mt-8 border-y border-slate-900 bg-slate-50 px-5 py-5">
      <p className="text-[12px] font-black tracking-[0.18em] text-brand-blue">기사 요약</p>
      <ul className="mt-3 space-y-2 text-[15px] font-semibold leading-7 text-slate-800">
        <li>• {article.summary}</li>
        <li>• 과정 선택 시 운영 기준, 상담 체계, 수료 후 활용 가능성을 함께 확인해야 한다.</li>
        <li>• 교육기관은 단순 모집보다 검증 가능한 운영 정보를 꾸준히 공개하는 것이 중요하다.</li>
      </ul>
    </section>
  );
}

function BodyContent({ article }: { article: Article }) {
  const lines = cleanLines(article.content ?? article.summary ?? '');
  const headings = ['현장에서 달라진 점', '학습자가 확인할 기준', '교육기관의 과제', '주의할 대목', '정리'];

  return (
    <div className="mt-8 text-[17px] leading-9 text-slate-800">
      {lines.map((line, index) => {
        const heading = index > 0 && index <= headings.length ? headings[index - 1] : null;
        return (
          <section key={index} className={index === 0 ? '' : 'mt-8'}>
            {heading ? <h2 className="mb-3 border-l-4 border-brand-blue pl-3 text-[22px] font-black leading-tight text-slate-950">{heading}</h2> : null}
            <p>{line}</p>
          </section>
        );
      })}
    </div>
  );
}

function RelatedLinks({ title, articles }: { title: string; articles: Article[] }) {
  return (
    <section className="border border-slate-200 bg-white">
      <div className="border-b border-slate-900 px-4 py-2">
        <h2 className="text-[15px] font-black">{title}</h2>
      </div>
      <div className="divide-y divide-slate-100 px-4">
        {articles.slice(0, 6).map((item) => (
          <Link key={item.id} href={`/articles/${item.slug}`} className="block py-3 hover:text-brand-blue">
            <p className="line-clamp-2 text-[14px] font-bold leading-6">{item.title}</p>
            <p className="mt-1 text-[12px] text-slate-500">{item.categories?.name ?? '교육뉴스'} · {formatDate(item.published_at)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BottomNewsGrid({ articles }: { articles: Article[] }) {
  return (
    <section className="mt-14 border-t-2 border-slate-900 pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-black">함께 읽을 교육뉴스</h2>
        <Link href="/articles" className="text-[12px] font-bold text-brand-blue">전체기사 보기</Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {articles.slice(0, 8).map((item) => (
          <Link key={item.id} href={`/articles/${item.slug}`} className="group block">
            <img src={item.thumbnail_url || '/media/edu-lifelong.svg'} alt="" className="aspect-[4/3] w-full bg-slate-100 object-cover" />
            <p className="mt-2 line-clamp-2 text-[14px] font-black leading-6 group-hover:text-brand-blue">{item.title}</p>
            <p className="mt-1 text-[12px] text-slate-500">{formatDate(item.published_at)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const all = await getPublishedArticles();

  if (!article) return <main className="mx-auto max-w-[820px] px-4 py-10">기사를 찾을 수 없습니다.</main>;

  const related = all.filter((item) => item.slug !== article.slug && item.categories?.slug === article.categories?.slug);
  const popular = all.filter((item) => item.slug !== article.slug).slice(0, 10);
  const tags = Array.isArray(article.tags) ? article.tags : [];

  return (
    <main className="bg-white text-slate-950">
      <div className="mx-auto grid max-w-[1120px] gap-8 px-4 py-8 lg:grid-cols-[minmax(0,760px)_300px]">
        <article>
          <nav className="text-[13px] font-bold text-slate-500">
            <Link href="/" className="hover:text-brand-blue">에듀저널</Link>
            <span className="mx-2">/</span>
            <Link href="/articles" className="hover:text-brand-blue">전체기사</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{article.categories?.name ?? '교육뉴스'}</span>
          </nav>

          <header className="mt-8 border-b border-slate-200 pb-6">
            <p className="text-[13px] font-black text-brand-blue">{article.categories?.name ?? '교육뉴스'} · 일반기사</p>
            <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.05em] md:text-[44px]">{article.title}</h1>
            <p className="mt-4 text-[18px] font-semibold leading-8 text-slate-600">{article.subtitle || article.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-[13px] text-slate-500">
              <span><strong className="text-slate-900">{article.author_name ?? '에듀저널 편집부'}</strong> 기자</span>
              <span>입력 {formatDate(article.published_at)}</span>
              <span>수정 {formatDate(article.updated_at ?? article.published_at)}</span>
            </div>
          </header>

          <ArticleImage article={article} />
          <SummaryBox article={article} />
          <BodyContent article={article} />

          <section className="mt-10 border-y border-slate-200 py-5">
            <h2 className="text-[18px] font-black">기사 마무리</h2>
            <p className="mt-3 text-[16px] leading-8 text-slate-700">
              이번 사안은 단순한 교육과정 소개를 넘어 학습자가 어떤 기준으로 기관과 과정을 선택해야 하는지를 보여준다. 에듀저널은 앞으로도 관련 제도, 현장 사례, 학습자 관점의 확인 포인트를 함께 점검할 계획이다.
            </p>
          </section>

          {tags.length ? (
            <section className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-[13px] font-bold text-slate-600">#{tag}</span>)}
            </section>
          ) : null}

          <section className="mt-10 rounded-sm bg-slate-50 p-5">
            <p className="text-[14px] font-black text-slate-800">제보·정정 안내</p>
            <p className="mt-2 text-[14px] leading-6 text-slate-600">교육 현장 제보, 사실 정정 요청, 보도자료 접수는 기사제보 페이지를 통해 보낼 수 있습니다.</p>
            <Link href="/report" className="mt-3 inline-flex text-[13px] font-black text-brand-blue">기사제보 바로가기 ›</Link>
          </section>

          <BottomNewsGrid articles={popular} />
        </article>

        <aside className="hidden space-y-6 lg:block">
          <RelatedLinks title="관련 기사" articles={related.length ? related : popular} />
          <RelatedLinks title="많이 본 뉴스" articles={popular} />
        </aside>
      </div>
    </main>
  );
}
