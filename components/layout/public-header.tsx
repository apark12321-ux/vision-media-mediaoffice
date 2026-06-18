import Link from 'next/link';

export function PublicHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-6 text-center">
        <Link href="/" className="inline-flex flex-col items-center">
          <span className="font-serif text-4xl font-black tracking-[0.18em] text-slate-950 md:text-5xl">에듀저널</span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">EDU JOURNAL</span>
        </Link>
      </div>
    </header>
  );
}
