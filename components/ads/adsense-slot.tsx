'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseSlotProps = {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

function adsenseEnabled() {
  return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT);
}

export function AdSenseSlot({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
}: AdSenseSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enabled = adsenseEnabled();

  useEffect(() => {
    if (!enabled || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense silently retries on later page interactions. Do not break rendering.
    }
  }, [enabled, slot]);

  if (!enabled || !client || !slot) return null;

  return (
    <div className={className} aria-label="광고">
      <div className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Advertisement</div>
      <ins
        className="adsbygoogle block"
        style={style ?? { display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
