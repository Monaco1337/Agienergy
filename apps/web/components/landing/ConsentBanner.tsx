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

  const accept = () => {
    write(`${VERSION}|essential`);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Hinweis zur Datenverarbeitung"
      className="fixed inset-x-3 z-[70] sm:inset-x-auto sm:left-auto sm:right-4 sm:max-w-md"
      style={{ bottom: 'max(env(safe-area-inset-bottom), 0.75rem)' }}
    >
      <div className="bg-card border border-borderLight rounded-eloLg shadow-premium p-4 sm:p-5">
        <p className="text-[13.5px] sm:text-[14px] text-navy leading-relaxed">
          Diese Seite verwendet ausschließlich technisch notwendige Cookies – keine externen
          Marketing-Tracker. Mehr in unseren{' '}
          <a href="/datenschutz" className="text-premiumBlue font-medium underline underline-offset-4">
            Datenschutzhinweisen
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="mt-4 h-12 w-full px-4 rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue text-white text-[15px] font-semibold shadow-lift hover:shadow-premium active:scale-[0.99] transition"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
