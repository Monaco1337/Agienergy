'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const COOKIE = 'elo_consent';
const VERSION = '2025-01-01';

function read(): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
  return m ? decodeURIComponent(m.split('=')[1] ?? '') : null;
}

function write(value: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; max-age=${oneYear}; path=/; samesite=lax`;
}

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const v = read();
    if (!v || !v.startsWith(VERSION)) setShow(true);
  }, []);

  // Admin-Bereich ist ein internes Tool – kein Besucher-Consent-Banner.
  if (pathname?.startsWith('/admin')) return null;
  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Hinweis zur Datenverarbeitung"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50"
    >
      <div className="bg-card border border-borderLight rounded-eloLg shadow-premium p-5">
        <p className="text-[14px] text-navy leading-relaxed">
          Diese Seite verwendet ausschließlich technisch notwendige Cookies. Wir nutzen keine externen
          Marketing-Tracker. Mehr in unseren{' '}
          <a href="/datenschutz" className="text-premiumBlue font-medium underline underline-offset-4">
            Datenschutzhinweisen
          </a>
          .
        </p>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={() => {
              write(`${VERSION}|essential`);
              setShow(false);
            }}
            className="h-11 min-w-[100px] px-4 rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue text-white text-[14px] font-semibold shadow-lift hover:shadow-premium transition-shadow"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
