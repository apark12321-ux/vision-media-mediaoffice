import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

const categoryLinks = [
  ['전체', '/articles'],
  ['평생교육', '/category/lifelong-education'],
  ['자격증', '/category/career-dev'],
  ['시니어교육', '/category/senior-education'],
  ['에듀테크', '/category/edutech-ai'],
  ['교육기관', '/category/edu-institution'],
  ['인터뷰', '/category/brand-interview'],
  ['오피니언', '/category/opinion'],
  ['보도자료', '/category/press-release']
] as const;

const sections = [
  ['평생교육·HRD', 'lifelong-education'],
  ['자격증·자기계발', 'career-dev'],
  ['시니어·실버교육', 'senior-education'],
  ['에듀테크·AI', 'edutech-ai'],
  ['교육기관 탐방', 'edu-institution'],
  ['오피니언', 'opinion']
] as const;

const image = '/media/edu-lifelong.svg';

type Article = Awaited<ReturnType<typeof getPublishedArticles>>[number];

function Thumb({ article, ratio = 'aspect-[4/3]' }: { article?: Article; ratio?: string }) {
  return <img src={article?.thumbnail_url || image} alt={article?.title || '에듀저널'} className={`${ratio} w-full bg-slate-100 object-cover`} />;
}

function PartnerBox({ title, desc, dark = false }: { title: string; desc: string; dark?: boolean }) {
  return (
    <div className={`${dark ? 'bg-slate-950 text-white' : 'bg-amber-50 text-slate-950'} border border-slate-200 p-4`}>
      <p className="text-[11px] font-black tracking-[0.22em] text-amber-500">PARTNER</p>
      <p className="mt-1 text-lg font-black leading-tight">{title}</p>
      <p className="mt-1 text-xs leading-5 opacity-70">{desc}</p>
      <p className="mt-2 text-[11px] font-bold opacity-60">문의 000-0000-0000</p>
    </div>
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
        {articles.slice(0, 6).map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="block py-2.5">
            <p className="line-clamp-1 text-[14px] font-bold leading-6 hover:text-amber-600">{article.title}</p>
            <p className="text-[11px] text-slate-500">{article.categories?.name || '교육뉴스'} · {formatDate(article.published_at)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionCard({ title, slug, articles }: { title: string; slug: string; articles: Article[] }) {
  const filtered = articles.filter((article) => article.categories?.slug === slug);
  const list = filtered.length ? filtered : articles.slice(0, 5);
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
            {list.slice(1, 5).map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-amber-600">· {article.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const articles = await getPublishedArticles(30);
  const hero = articles[0];
  const sub = articles.slice(1, 5);
  const latest = articles.slice(5, 14);
  const ranking = articles.slice(0, 10);

  return (
    <main className="bg-[#f4f4f4] text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-[1120px] justify-between px-4 py-2 text-[12px] text-slate-500">
          <span>2026년 06월 18일 목요일</span>
          <span>교육 전문 인터넷신문</span>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between">
          <Link href="/">
            <p className="text-[11px] font-bold tracking-[0.28em] text-slate-400">신속공정한 교육뉴스</p>
            <h1 className="mt-1 text-5xl font-black tracking-[-0.08em] text-slate-800">에듀저널</h1>
            <p className="mt-1 text-[11px] font-bold tracking-[0.36em] text-slate-400">EDU JOURNAL</p>
          </Link>
          <div className="w-full max-w-[520px] border border-amber-300 bg-amber-50 px-5 py-3 text-right">
            <p className="text-[11px] font-black tracking-[0.22em] text-amber-600">PARTNER AREA</p>
            <p className="text-lg font-black">평생교육·자격증 과정 안내</p>
            <p className="text-xs text-slate-500">기관 소식 · 교육과정 · 인터뷰 문의 000-0000-0000</p>
          </div>
        </div>
      </section>

      <nav className="border-y border-slate-900 bg-white">
        <div className="mx-auto flex max-w-[1120px] overflow-x-auto px-4">
          {categoryLinks.map(([label, href]) => (
            <Link key={href} href={href} className="shrink-0 border-r border-slate-200 px-4 py-3 text-[14px] font-black first:border-l hover:bg-slate-950 hover:text-white">{label}</Link>
          ))}
        </div>
      </nav>

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-[1120px] gap-3 px-4 py-2 text-[13px]">
          <span className="bg-slate-950 px-2 py-1 text-[11px] font-black text-white">속보</span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {articles.slice(0, 3).map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="hover:text-amber-600">{article.title}</Link>)}
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
            <NewsList title="편집국 추천" articles={articles.slice(2, 8)} />
          </div>
        </div>

        <aside className="col-span-12 space-y-5 lg:col-span-4">
          <PartnerBox dark title="교육기관 알림판" desc="기관 소식, 교육과정, 인터뷰를 한눈에 보여주는 우측 고정 영역입니다." />
          <section className="border bg-white">
            <div className="border-b border-slate-900 px-4 py-2"><h2 className="text-[16px] font-black">많이 본 뉴스</h2></div>
            <div className="divide-y px-4">
              {ranking.map((article, index) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="flex gap-3 py-2.5">
                  <span className="w-5 text-center text-[16px] font-black text-amber-600">{index + 1}</span>
                  <p className="line-clamp-2 text-[13px] font-bold leading-6 hover:text-amber-600">{article.title}</p>
                </Link>
              ))}
            </div>
          </section>
          <PartnerBox title="평생학습 안내 영역" desc="과정 소개, 기관 탐방, 교육 자료를 배치하는 보조 영역입니다." />
        </aside>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-5"><PartnerBox title="EDU JOURNAL NOTICE" desc="교육기관 소식과 평생학습 정보를 묶어 보여주는 중앙 안내 영역입니다." /></section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-10 md:grid-cols-2">
        {sections.map(([title, slug]) => <SectionCard key={slug} title={title} slug={slug} articles={articles} />)}
      </section>
    </main>
  );
}
