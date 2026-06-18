import Link from 'next/link';
import { getPublishedArticles } from '@/lib/data/public';
import { formatDate } from '@/lib/utils/format';

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

type AdPreset = {
  brand: string;
  kicker: string;
  headline: string;
  desc: string;
  cta: string;
  theme: 'blue' | 'red' | 'green' | 'navy' | 'orange';
  photo: string;
  wide?: boolean;
};

const adPresets: Record<string, AdPreset> = {
  daekyo: {
    brand: 'DAEKYO 대교',
    kicker: 'LIFELONG EDUCATION CONSULTING',
    headline: '평생교육·학습 컨설팅',
    desc: '개인·기관별 맞춤 교육 프로그램과 전문 컨설팅을 제공합니다.',
    cta: '지금 문의',
    theme: 'blue',
    wide: true,
    photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85'
  },
  megastudy: {
    brand: '메가스터디교육',
    kicker: '2026 수능·내신 집중관리',
    headline: '여름 집중반 모집',
    desc: '1:1 맞춤 학습, 내신·수능 대비, 체계적인 학습 관리',
    cta: '상담 신청',
    theme: 'blue',
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85'
  },
  hackers: {
    brand: '해커스',
    kicker: '자격증·어학·공무원',
    headline: '합격 전략 설명회',
    desc: '최신 시험 정보부터 과목별 전략, 맞춤 학습 플랜까지',
    cta: '무료 상담',
    theme: 'red',
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'
  },
  kyowon: {
    brand: '교원',
    kicker: '교육 상담',
    headline: '자녀 맞춤 프로그램',
    desc: '학습 수준과 성향을 분석해 맞춤 솔루션을 제안합니다.',
    cta: '무료 상담',
    theme: 'red',
    photo: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85'
  },
  fastcampus: {
    brand: '패스트캠퍼스',
    kicker: 'AI·데이터·마케팅',
    headline: '실무 스킬업',
    desc: '업계 전문가의 실무 노하우를 온라인으로 빠르게 학습하세요.',
    cta: '수강 신청',
    theme: 'navy',
    wide: true,
    photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85'
  },
  woongjin: {
    brand: '웅진씽크빅',
    kicker: 'AI 맞춤 학습',
    headline: '초중등 학습관리',
    desc: 'AI가 진단하고 맞춤 학습으로 스스로 공부하는 힘을 키웁니다.',
    cta: '무료 체험',
    theme: 'green',
    photo: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=900&q=85'
  }
};

function Thumb({ article, ratio = 'aspect-[4/3]' }: { article?: Article; ratio?: string }) {
  return <img src={article?.thumbnail_url || image} alt={article?.title || '에듀저널'} className={`${ratio} w-full bg-slate-100 object-cover`} />;
}

function resolveAd(src: string): AdPreset {
  if (src.includes('daekyo')) return adPresets.daekyo;
  if (src.includes('megastudy')) return adPresets.megastudy;
  if (src.includes('hackers')) return adPresets.hackers;
  if (src.includes('kyowon')) return adPresets.kyowon;
  if (src.includes('fastcampus')) return adPresets.fastcampus;
  if (src.includes('woongjin')) return adPresets.woongjin;
  return adPresets.daekyo;
}

function BannerAd({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ad = resolveAd(src);
  const isWide = ad.wide || className.includes('150') || className.includes('190') || className.includes('94');
  const theme = {
    blue: 'from-blue-950 via-blue-800 to-sky-600 text-white',
    red: 'from-red-700 via-white to-white text-slate-950',
    green: 'from-emerald-50 via-white to-blue-50 text-slate-950',
    navy: 'from-slate-950 via-indigo-950 to-violet-800 text-white',
    orange: 'from-orange-600 via-amber-100 to-white text-slate-950'
  }[ad.theme];

  if (isWide) {
    return (
      <aside className={`overflow-hidden border border-slate-200 bg-white shadow-sm ${className}`} aria-label={alt}>
        <div className={`flex h-full bg-gradient-to-r ${theme}`}>
          <div className="flex min-w-0 flex-1 flex-col justify-center px-6 py-4">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] opacity-80">AD MOCKUP · {ad.brand}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-4xl">{ad.headline}</h3>
            <p className="mt-2 max-w-[560px] text-sm font-semibold opacity-80">{ad.desc}</p>
          </div>
          <div className="relative hidden w-[34%] min-w-[260px] overflow-hidden md:block">
            <img src={ad.photo} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/10" />
          </div>
          <div className="flex w-[180px] shrink-0 items-center justify-center bg-slate-950/15 px-4">
            <span className="rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow">{ad.cta} ›</span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`overflow-hidden border border-slate-200 bg-white shadow-sm ${className}`} aria-label={alt}>
      <div className={`flex h-full flex-col bg-gradient-to-b ${theme}`}>
        <div className="px-5 py-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-75">AD MOCKUP</p>
          <p className="mt-1 text-lg font-black">{ad.brand}</p>
          <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em]">{ad.headline}</h3>
          <p className="mt-3 text-sm font-semibold leading-6 opacity-75">{ad.kicker}<br />{ad.desc}</p>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <img src={ad.photo} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-5 pb-5 pt-16">
            <span className="inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow">{ad.cta} ›</span>
          </div>
        </div>
      </div>
    </aside>
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
          <BannerAd src="/ads/daekyo-consulting.svg" alt="대교 평생교육 학습 컨설팅 광고" className="h-[94px] w-full max-w-[540px]" />
        </div>
      </section>

      <section className="border-y border-slate-900 bg-white">
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
          <BannerAd src="/ads/megastudy-summer.svg" alt="메가스터디교육 여름 집중반 광고" className="h-[540px]" />
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
          <BannerAd src="/ads/hackers-license.svg" alt="해커스 합격 전략 설명회 광고" className="h-[540px]" />
          <BannerAd src="/ads/kyowon-consulting.svg" alt="교원 교육 상담 광고" className="h-[540px]" />
        </aside>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-5">
        <BannerAd src="/ads/fastcampus-skillup.svg" alt="패스트캠퍼스 실무 스킬업 광고" className="h-[150px] md:h-[190px]" />
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-10 md:grid-cols-2">
        {sections.map(([title, slug], index) => (
          <div key={slug} className="space-y-5">
            <SectionCard title={title} slug={slug} articles={articles} />
            {index === 1 ? <BannerAd src="/ads/woongjin-ai.svg" alt="웅진씽크빅 AI 맞춤 학습 광고" className="h-[320px]" /> : null}
          </div>
        ))}
      </section>
    </main>
  );
}
