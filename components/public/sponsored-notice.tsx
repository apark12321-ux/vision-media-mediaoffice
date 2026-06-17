export function SponsoredNotice({ notice }: { notice: string }) {
  return (
    <div className="my-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-7 text-amber-900">
      {notice}
    </div>
  );
}
