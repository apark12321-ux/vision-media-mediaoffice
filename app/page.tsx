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

function Thumb({ article, ratio = 'aspect-[4/3]' }: { article?: Article; ratio?: string }) {
  return <img src={article?.thumbnail_url || image} alt={article?.title || '에듀저널'} className={`${ratio} w-full bg-slate-100 object-cover`} />;
}

function BannerAd({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const isWide = className.includes('wide');
  const brand = src.includes('megastudy') ? '메가스터디교육' : src.includes('hackers') ? '해커스' : src.includes('kyowon') ? '교원' : src.includes('fastcampus') ? '패스트캠퍼스' : src.includes('woongjin') ? '웅진씽크빅' : '대교';
  const copy = src.includes('hackers') ? '자격증·어학 합격전략' : src.includes('fastcampus') ? 'AI·데이터 실무 스킬업' : src.includes('woongjin') ? 'AI 맞춤 학습 무료체험' : src.includes('kyowon') ? '자녀 맞춤 교육 상담' : src.includes('megastudy') ? '여름 집중반 모집' : '평생교육 컨설팅';
  return <aside className={`overflow-hidden border border-slate-200 bg-white shadow-sm ${className}`} aria-label={alt}><div className="flex h-full flex-col justify-center bg-slate-950 px-4 py-3 text-white"><p className="text-[10px] font-black tracking-[0.22em] text-amber-400">AD MOCKUP</p><p className="mt-1 text-sm font-black opacity-80">{brand}</p><h3 className={`${isWide ? 'text-2xl' : 'text-lg'} mt-1 font-black tracking-[-0.04em]`}>{copy}</h3><span className="mt-2 inline-flex w-fit rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-black text-white">상담 신청</span></div></aside>;
}

function NewsList({ title, articles }: { title: string; articles: Article[] }) {
  return <section className="border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-900 px-4 py-2"><h2 className="text-[15px] font-black">{title}</h2><span className="text-[11px] font-bold text-slate-400">MORE +</span></div><div className="divide-y divide-slate-100 px-4">{articles.slice(0, 7).map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="block py-2.5"><p className="line-clamp-1 text-[14px] font-bold leading-6 hover:text-amber-600">{article.title}</p><p className="text-[11px] text-slate-500">{article.categories?.name || '교육뉴스'} · {formatDate(article.published_at)}</p></Link>)}</div></section>;
}

function SectionCard({ title, slug, articles }: { title: string; slug: string; articles: Article[] }) {
  const filtered = articles.filter((article) => article.categories?.slug === slug);
  const list = filtered.length ? filtered : articles.slice(0, 6);
  const lead = list[0];
  return <section className="border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-900 px-4 py-2"><h2 className="text-[15px] font-black">{title}</h2><Link href={`/category/${slug}`} className="text-[11px] font-bold text-amber-600">더보기 +</Link></div><div className="grid gap-4 p-4 md:grid-cols-[150px_1fr]"><Link href={`/articles/${lead?.slug || ''}`}><Thumb article={lead} /></Link><div>{lead ? <Link href={`/articles/${lead.slug}`}><h3 className="line-clamp-2 text-[17px] font-black leading-7 hover:text-amber-600">{lead.title}</h3><p className="mt-2 line-clamp-2 text-[13px] leading-6 text-slate-600">{lead.summary}</p></Link> : null}<div className="mt-3 space-y-1.5">{list.slice(1, 6).map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-amber-600">· {article.title}</Link>)}</div></div></div></section>;
}

function CompactNewsBox({ title, articles }: { title: string; articles: Article[] }) {
  return <section className="border bg-white p-4"><h2 className="border-b border-slate-900 pb-2 text-[16px] font-black">{title}</h2><div className="mt-2 space-y-2">{articles.slice(0, 6).map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="block text-[13px] font-bold leading-6 hover:text-amber-600">· {article.title}</Link>)}</div></section>;
}

export default async function HomePage() {
  const articles = await getPublishedArticles(60);
  const hero = articles[0];
  const sub = articles.slice(1, 5);
  const latest = articles.slice(5, 15);
  const ranking = articles.slice(0, 10);

  return <main className="bg-[#f4f4f4] text-slate-900"><section className="border-b bg-white"><div className="mx-auto flex max-w-[1120px] justify-between px-4 py-2 text-[12px] text-slate-500"><span>2026년 06월 18일 목요일</span><span>교육 전문 인터넷신문</span></div></section><section className="bg-white"><div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between"><Link href="/"><p className="text-[11px] font-bold tracking-[0.28em] text-slate-400">신속공정한 교육뉴스</p><h1 className="mt-1 text-5xl font-black tracking-[-0.08em] text-slate-800">에듀저널</h1><p className="mt-1 text-[11px] font-bold tracking-[0.36em] text-slate-400">EDU JOURNAL</p></Link><BannerAd src="/ads/daekyo-consulting.svg" alt="대교 평생교육 학습 컨설팅 광고" className="wide h-[80px] w-full max-w-[500px]" /></div></section><section className="border-y border-slate-900 bg-white"><div className="mx-auto flex max-w-[1120px] gap-3 px-4 py-2 text-[13px]"><span className="bg-slate-950 px-2 py-1 text-[11px] font-black text-white">속보</span><div className="flex flex-wrap gap-x-5 gap-y-1">{articles.slice(0, 3).map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="hover:text-amber-600">{article.title}</Link>)}</div></div></section><section className="mx-auto grid max-w-[1120px] grid-cols-12 gap-5 px-4 py-5"><div className="col-span-12 lg:col-span-8"><div className="grid gap-5 md:grid-cols-[1.35fr_1fr]"><article className="border bg-white p-4">{hero ? <Link href={`/articles/${hero.slug}`} className="group block"><Thumb article={hero} ratio="aspect-[16/10]" /><p className="mt-4 text-[12px] font-black tracking-[0.2em] text-amber-600">TOP NEWS</p><h2 className="mt-1 text-[30px] font-black leading-tight tracking-[-0.05em] group-hover:text-amber-600">{hero.title}</h2><p className="mt-3 line-clamp-3 text-[14px] leading-7 text-slate-600">{hero.summary}</p><p className="mt-3 text-[12px] text-slate-500">{hero.author_name} · {formatDate(hero.published_at)}</p></Link> : null}</article><div className="space-y-3">{sub.map((article) => <Link key={article.id} href={`/articles/${article.slug}`} className="grid grid-cols-[116px_1fr] gap-3 border bg-white p-3 hover:border-amber-400"><Thumb article={article} /><div><p className="text-[11px] font-bold text-amber-600">{article.categories?.name || '교육뉴스'}</p><h3 className="line-clamp-2 text-[15px] font-black leading-6">{article.title}</h3><p className="mt-1 text-[12px] text-slate-500">{formatDate(article.published_at)}</p></div></Link>)}</div></div><div className="mt-5 grid gap-5 md:grid-cols-2"><NewsList title="최신 교육뉴스" articles={latest} /><NewsList title="편집국 추천" articles={articles.slice(15, 25)} /></div></div><aside className="col-span-12 space-y-4 lg:col-span-4"><BannerAd src="/ads/megastudy-summer.svg" alt="메가스터디교육 여름 집중반 광고" className="h-[128px]" /><CompactNewsBox title="많이 본 뉴스" articles={ranking} /><BannerAd src="/ads/hackers-license.svg" alt="해커스 합격 전략 설명회 광고" className="h-[110px]" /><CompactNewsBox title="교육기관 뉴스" articles={articles.slice(25, 32)} /><BannerAd src="/ads/kyowon-consulting.svg" alt="교원 교육 상담 광고" className="h-[110px]" /></aside></section><section className="mx-auto max-w-[1120px] px-4 pb-5"><BannerAd src="/ads/fastcampus-skillup.svg" alt="패스트캠퍼스 실무 스킬업 광고" className="wide h-[96px] md:h-[110px]" /></section><section className="mx-auto grid max-w-[1120px] gap-5 px-4 pb-10 md:grid-cols-2">{sections.map(([title, slug], index) => <div key={slug} className="space-y-5"><SectionCard title={title} slug={slug} articles={articles} />{index === 1 ? <BannerAd src="/ads/woongjin-ai.svg" alt="웅진씽크빅 AI 맞춤 학습 광고" className="h-[120px]" /> : null}</div>)}</section></main>;
}
