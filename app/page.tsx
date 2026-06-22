import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

const sections = [
  ['평생교육·HRD', 'lifelong-education'],
  ['자격증·자기계발', 'career-dev'],
  ['시니어·실버교육', 'senior-education'],
  ['에듀테크·AI', 'edutech-ai'],
  ['웰니스·인문학', 'wellness-life'],
  ['교육기관 탐방', 'edu-institution'],
  ['명사 인터뷰', 'interview-people'],
  ['오피니언', 'opinion'],
  ['공지·보도', 'press-release']
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

function NewsList({ title, articles }: { title: string; articles: Article[] }) {
  return (
    <section className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-900 px-4 py-2">
        <h2 className="text-[15px] font-black">{title}</h2>
        <span className="text-[11px] font-bold text-slate-400">MORE +</span>
      </div>
      <div className="divide-y divide-slate-100 px-4">
        {articles.slice(0, 7).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="block py-2.5">
            <p className="line-clamp-1 text-[14px] font-bold leading-6 hover:text-amber-600">{article.title}</p>
            <p className="text-[11px] text-slate-500">{article.categories?.name || '교육뉴스'} · {formatDate(article.published_at)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CompactNewsBox({ title, articles }: { title: string; articles: Article[] }) {
  return (
    <section className="border bg-white p-4">
      <h2 className="border-b border-slate-900 pb-2 text-[16px] font-black">{title}</h2>
      <div className="mt-2 space-y-2">
        {articles.slice(0, 7).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-amber-600">
            · {article.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionCard({ title, slug, articles }: { title: string; slug: string; articles: Article[] }) {
  const filtered = articles.filter((article) => article.categories?.slug === slug);
  const list = filtered.length ? filtered : articles.slice(0, 6);
  const lead = list[0];

  return (
    <section className="border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-900 px-4 py-2">
        <h2 className="text-[15px] font-black">{title}</h2>
        <Link href={`/category/${slug}`} className="text-[11px] font-bold text-amber-600">더보기 +</Link>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[150px_1fr]">
        <Link href={`/articles/${lead?.slug || ''}`}><Thumb article={lead} /></Link>
        <div>
          {lead ? (
            <Link href={`/articles/${lead.slug}`}>
              <h3 className="line-clamp-2 text-[17px] font-black leading-7 hover:text-amber-600">{lead.title}</h3>
              <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-slate-600">{lead.summary}</p>
            </Link>
          ) : null}
          <div className="mt-3 space-y-1.5">
            {list.slice(1, 6).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-amber-600">
                · {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaNotice() {
  return (
    <section className="border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-black tracking-[0.22em] text-amber-600">NOTICE</p>
      <h2 className="mt-2 text-xl font-black text-slate-950">에듀저널 안내</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        에듀저널은 평생교육, 자격증, 시니어 학습, 에듀테크, 교육기관 현장을 다루는 교육 전문 인터넷매체입니다.
      </p>
      <div className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
        <Link href="/about" className="hover:text-amber-600">회사소개</Link>
        <Link href="/report" className="hover:text-amber-600">기사제보</Link>
        <Link href="/contact" className="hover:text-amber-600">문의</Link>
        <Link href="/youth-policy" className="hover:text-amber-600">청소년보호정책</Link>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const articles = await getPublishedArticles(90);
  const hero = articles[0];
  const sub = articles.slice(1, 5);
  const latest = articles.slice(5, 15);
  const ranking = articles.slice(0, 10);
  const institution = articles.filter((article) => article.categories?.slug === 'edu-institution');
  const policy = articles.filter((article) => ['lifelong-education', 'career-dev', 'senior-education'].includes(article.categories?.slug ?? ''));

  return (
    <main className="bg-[#f4f4f4] text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-[1120px] justify-between px-4 py-2 text-[12px] text-slate-500">
          <span>2026년 06월 18일 목요일</span>
          <span>교육 전문 인터넷매체</span>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between">
          <Link href="/">
            <p className="text-[11px] font-bold tracking-[0.28em] text-slate-400">신속공정한 교육뉴스</p>
            <h1 className="mt-1 text-5xl font-black tracking-[-0.08em] text-slate-800">에듀저널</h1>
            <p className="mt-1 text-[11px] font-bold tracking-[0.36em] text-slate-400">EDU JOURNAL</p>
          </Link>
          <div className="w-full max-w-[520px] border-y-4 border-slate-900 px-1 py-3 text-right">
            <p className="text-[11px] font-black tracking-[0.24em] text-slate-500">EDUCATION MEDIA</p>
            <p className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-950">평생교육과 학습 현장을 기록합니다</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">기사제보 · 정정보도 요청 · 교육기관 소식 접수</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-900 bg-white">
        <div className="mx-auto flex max-w-[1120px] gap-3 px-4 py-2 text-[13px]">
          <span className="bg-slate-950 px-2 py-1 text-[11px] font-black text-white">속보</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {articles.slice(0, 3).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="hover:text-amber-600">{article.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-12 gap-5 px-4 py-5">
        <div className="col-span-12 lg:col-span-8">
          <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
            <article className="border bg-white p-4">
              {hero ? (
                <Link href={`/articles/${hero.slug}`} className="group block">
                  <Thumb article={hero} ratio="aspect-[16/10]" />
                  <p className="mt-4 text-[12px] font-black tracking-[0.2em] text-amber-600">TOP NEWS</p>
                  <h2 className="mt-1 text-[30px] font-black leading-tight tracking-[-0.05em] group-hover:text-amber-600">{hero.title}</h2>
                  <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-slate-600">{hero.summary}</p>
                  <p className="mt-3 text-[12px] text-slate-500">{hero.author_name} · {formatDate(hero.published_at)}</p>
                </Link>
              ) : null}
            </article>
            <div className="space-y-3">
              {sub.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="grid grid-cols-[116px_1fr] gap-3 border bg-white p-3 hover:border-amber-400">
                  <Thumb article={article} />
                  <div>
                    <p className="text-[11px] font-bold text-amber-600">{article.categories?.name || '교육뉴스'}</p>
                    <h3 className="line-clamp-2 text-[15px] font-black leading-6">{article.title}</h3>
                    <p className="mt-1 text-[12px] text-slate-500">{formatDate(article.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <NewsList title="최신 교육뉴스" articles={latest} />
            <NewsList title="편집국 추천" articles={articles.slice(15, 25)} />
          </div>
        </div>

        <aside className="col-span-12 space-y-4 lg:col-span-4">
          <MediaNotice />
          <CompactNewsBox title="많이 본 뉴스" articles={ranking} />
          <CompactNewsBox title="교육기관 뉴스" articles={institution.length ? institution : articles.slice(25, 32)} />
          <CompactNewsBox title="정책·자격증 뉴스" articles={policy.length ? policy : articles.slice(32, 39)} />
        </aside>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-10 md:grid-cols-2">
        {sections.map(([title, slug]) => (
          <SectionCard key={slug} title={title} slug={slug} articles={articles} />
        ))}
      </section>
    </main>
  );
}
