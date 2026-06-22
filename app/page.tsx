import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

const sections = [
  ['평생교육·HRD', 'lifelong-education'],
  ['자격증·자기계발', 'career-dev'],
  ['시니어·실버교육', 'senior-education'],
  ['에듀테크·AI', 'edutech-ai'],
  ['교육기관 탐방', 'edu-institution'],
  ['명사 인터뷰', 'interview-people'],
  ['오피니언', 'opinion'],
  ['정책·보도', 'press-release']
] as const;

const defaultImage = '/media/edu-lifelong.svg';

type Article = Awaited<ReturnType<typeof getPublishedArticles>>[number];

function Thumb({ article, ratio = 'aspect-[4/3]' }: { article?: Article; ratio?: string }) {
  return (
    <img
      src={article?.thumbnail_url || defaultImage}
      alt={article?.title || '에듀저널'}
      className={`${ratio} w-full bg-slate-100 object-cover`}
      loading="lazy"
    />
  );
}

function SectionHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-slate-950 pb-2">
      <h2 className="text-[19px] font-black tracking-[-0.04em] text-slate-950">{title}</h2>
      {href ? <Link href={href} className="text-[12px] font-black text-blue-700">더보기</Link> : null}
    </div>
  );
}

function MainFeature({ article }: { article?: Article }) {
  if (!article) return null;
  return (
    <article className="border border-slate-200 bg-white p-4">
      <Link href={`/articles/${article.slug}`} className="group block">
        <Thumb article={article} ratio="aspect-[16/9]" />
        <p className="mt-4 text-[12px] font-black tracking-[0.22em] text-blue-700">TOP STORY</p>
        <h1 className="mt-2 text-[34px] font-black leading-tight tracking-[-0.06em] group-hover:text-blue-700 md:text-[42px]">{article.title}</h1>
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-slate-600">{article.summary}</p>
        <p className="mt-4 text-[12px] font-bold text-slate-500">{article.categories?.name ?? '교육뉴스'} · {formatDate(article.published_at)}</p>
      </Link>
    </article>
  );
}

function SmallFeatureList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-3">
      {articles.slice(0, 4).map((article) => (
        <Link key={article.id} href={`/articles/${article.slug}`} className="grid grid-cols-[124px_1fr] gap-3 border border-slate-200 bg-white p-3 hover:border-blue-700">
          <Thumb article={article} />
          <div>
            <p className="text-[11px] font-black text-blue-700">{article.categories?.name ?? '교육뉴스'}</p>
            <h3 className="mt-1 line-clamp-2 text-[15px] font-black leading-6 text-slate-950">{article.title}</h3>
            <p className="mt-1 text-[12px] text-slate-500">{formatDate(article.published_at)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function TextNewsList({ title, articles, href }: { title: string; articles: Article[]; href?: string }) {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <SectionHead title={title} href={href} />
      <div className="mt-2 divide-y divide-slate-100">
        {articles.slice(0, 8).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="block py-2.5 hover:text-blue-700">
            <p className="line-clamp-1 text-[14px] font-bold leading-6">{article.title}</p>
            <p className="text-[11px] text-slate-500">{article.categories?.name ?? '교육뉴스'} · {formatDate(article.published_at)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RankingBox({ articles }: { articles: Article[] }) {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <SectionHead title="랭킹뉴스" />
      <div className="mt-2 divide-y divide-slate-100">
        {articles.slice(0, 10).map((article, index) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="flex gap-3 py-2.5 hover:text-blue-700">
            <span className="w-6 shrink-0 text-center text-[18px] font-black text-blue-700">{index + 1}</span>
            <div>
              <p className="line-clamp-2 text-[14px] font-black leading-6">{article.title}</p>
              <p className="mt-1 text-[11px] text-slate-500">{formatDate(article.published_at)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SpotlightSection({ title, articles, href }: { title: string; articles: Article[]; href?: string }) {
  const lead = articles[0];
  if (!lead) return null;
  return (
    <section className="border border-slate-200 bg-white p-4">
      <SectionHead title={title} href={href} />
      <Link href={`/articles/${lead.slug}`} className="group mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
        <Thumb article={lead} ratio="aspect-[16/10]" />
        <div>
          <p className="text-[12px] font-black text-blue-700">{lead.categories?.name ?? '교육뉴스'}</p>
          <h3 className="mt-1 line-clamp-2 text-[22px] font-black leading-8 tracking-[-0.04em] group-hover:text-blue-700">{lead.title}</h3>
          <p className="mt-2 line-clamp-3 text-[14px] leading-7 text-slate-600">{lead.summary}</p>
        </div>
      </Link>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {articles.slice(1, 5).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="border-t border-slate-100 pt-2 text-[14px] font-bold leading-6 hover:text-blue-700">· {article.title}</Link>
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ title, slug, articles }: { title: string; slug: string; articles: Article[] }) {
  const filtered = articles.filter((article) => article.categories?.slug === slug);
  const list = filtered.length ? filtered : articles.slice(0, 6);
  const lead = list[0];
  return (
    <section className="border border-slate-200 bg-white p-4">
      <SectionHead title={title} href={`/category/${slug}`} />
      {lead ? (
        <Link href={`/articles/${lead.slug}`} className="group mt-4 block">
          <Thumb article={lead} ratio="aspect-[16/10]" />
          <h3 className="mt-3 line-clamp-2 text-[18px] font-black leading-7 group-hover:text-blue-700">{lead.title}</h3>
        </Link>
      ) : null}
      <div className="mt-3 space-y-2">
        {list.slice(1, 5).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-blue-700">· {article.title}</Link>
        ))}
      </div>
    </section>
  );
}

function NewsletterBox() {
  return (
    <section className="border border-slate-200 bg-slate-950 p-5 text-white">
      <p className="text-[11px] font-black tracking-[0.22em] text-blue-300">EDU JOURNAL NOTE</p>
      <h2 className="mt-2 text-[20px] font-black tracking-[-0.04em]">교육 현장 브리핑</h2>
      <p className="mt-3 text-[13px] leading-6 text-slate-300">평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 소식을 한눈에 볼 수 있도록 정리합니다.</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-bold text-slate-200">
        <Link href="/report" className="border border-slate-600 px-3 py-2 text-center hover:border-white">기사제보</Link>
        <Link href="/press" className="border border-slate-600 px-3 py-2 text-center hover:border-white">보도자료 접수</Link>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const articles = await getPublishedArticles(120);
  const hero = articles[0];
  const topSide = articles.slice(1, 5);
  const latest = articles.slice(5, 15);
  const ranking = articles.slice(0, 10);
  const spotlight = articles.filter((article) => ['edutech-ai', 'edu-institution', 'lifelong-education'].includes(article.categories?.slug ?? '')).slice(0, 6);
  const interviews = articles.filter((article) => article.categories?.slug === 'interview-people').slice(0, 6);
  const policy = articles.filter((article) => ['press-release', 'career-dev', 'senior-education'].includes(article.categories?.slug ?? '')).slice(0, 8);

  return (
    <main className="bg-[#f4f5f7] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1120px] gap-3 px-4 py-2 text-[13px]">
          <span className="bg-blue-700 px-2 py-1 text-[11px] font-black text-white">속보</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {articles.slice(0, 4).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="font-bold hover:text-blue-700">{article.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-12 gap-5 px-4 py-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid gap-5 md:grid-cols-[1.45fr_1fr]">
            <MainFeature article={hero} />
            <SmallFeatureList articles={topSide} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <TextNewsList title="최신" articles={latest} href="/articles" />
            <TextNewsList title="정책·자격증" articles={policy.length ? policy : articles.slice(20, 28)} />
          </div>
        </div>
        <aside className="col-span-12 space-y-5 lg:col-span-4">
          <RankingBox articles={ranking} />
          <NewsletterBox />
        </aside>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-6 lg:grid-cols-[1fr_1fr]">
        <SpotlightSection title="스포트라이트" articles={spotlight.length ? spotlight : articles.slice(10, 16)} />
        <SpotlightSection title="인터뷰" articles={interviews.length ? interviews : articles.slice(16, 22)} href="/category/interview-people" />
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-10 md:grid-cols-2 lg:grid-cols-4">
        {sections.map(([title, slug]) => (
          <CategoryCard key={slug} title={title} slug={slug} articles={articles} />
        ))}
      </section>
    </main>
  );
}
