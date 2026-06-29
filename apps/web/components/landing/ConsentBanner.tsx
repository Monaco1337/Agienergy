'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const COOKIE = 'elo_consent';
const VERSION = '2026-06-29';
/** Custom-Event, das vom Footer-Link „Cookie-Einstellungen" ausgelöst wird */
export const CONSENT_REOPEN_EVENT = 'agi:consent:reopen';

type Decision = 'essential' | 'rejected';

function read(): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
  return m ? decodeURIComponent(m.split('=')[1] ?? '') : null;
}

function write(decision: Decision) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE}=${encodeURIComponent(`${VERSION}|${decision}`)}; max-age=${oneYear}; path=/; samesite=lax`;
}

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  useEffect(() => {
    const v = read();
    if (!v || !v.startsWith(VERSION)) setShow(true);
  }, []);

  useEffect(() => {
    if (isAdmin) return;
    const handler = () => setShow(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, handler);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, handler);
  }, [isAdmin]);

  useEffect(() => {
    if (show && !isAdmin) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [show, isAdmin]);

  if (isAdmin) return null;
  if (!show) return null;

  const accept = () => {
    write('essential');
    setShow(false);
  };
  const reject = () => {
    write('rejected');
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
    >
      <div className="absolute inset-0 bg-navy/75 backdrop-blur-[6px]" aria-hidden />

      <div
        className="relative w-full max-w-[36rem] rounded-eloLg border border-borderLight bg-card shadow-premium p-5 sm:p-7 animate-[consent-in_.28s_cubic-bezier(0.16,1,0.3,1)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
      >
        <div className="flex items-start gap-4">
          <span className="hidden sm:flex shrink-0 size-12 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen/15 to-premiumBlue/15 text-premiumBlue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
              <path d="M9.2 12.2l2 2 3.6-3.8" />
            </svg>
          </span>
          <div className="min-w-0">
            <h2
              id="consent-title"
              className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.01em] text-navy"
            >
              Datenschutz &amp; Cookies
            </h2>
            <p
              id="consent-desc"
              className="mt-2 text-[13.5px] sm:text-[14px] text-slate leading-relaxed"
            >
              Wir verwenden ausschließlich technisch notwendige Cookies und
              funktionale First-Party-Cookies zur Erfolgsmessung unserer eigenen
              Akquise (UTM-Quelle, Empfehlungscode). <strong>Kein externes
              Werbe-Tracking</strong>, kein Google Analytics, kein Meta Pixel.
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] text-slate/90">
              <li>· Essenziell: Session, Consent-Status</li>
              <li>· Funktional: UTM-First-Touch (30 Tage), Empfehlungscode (60 Tage)</li>
            </ul>
            <p className="mt-3 text-[13px] text-slate/80">
              Details in unseren{' '}
              <a
                href="/datenschutz"
                className="text-premiumBlue font-medium underline underline-offset-4"
              >
                Datenschutzhinweisen
              </a>
              . Sie können Ihre Auswahl jederzeit im Footer ändern.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={reject}
            className="inline-flex h-12 sm:h-11 items-center justify-center rounded-elo border border-borderLight px-5 text-[14px] font-medium text-navy transition-colors hover:bg-paper2"
          >
            Nur essenzielle
          </button>
          <a
            href="/datenschutz"
            className="inline-flex h-12 sm:h-11 items-center justify-center rounded-elo border border-borderLight px-5 text-[14px] font-medium text-navy transition-colors hover:bg-paper2"
          >
            Mehr erfahren
          </a>
          <button
            type="button"
            autoFocus
            onClick={accept}
            className="inline-flex h-12 sm:h-11 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-7 text-[15px] font-semibold text-white shadow-lift transition hover:shadow-premium active:scale-[0.99]"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>

      <style>{`@keyframes consent-in{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

/** Hilfsfunktion zum Re-Öffnen des Banners (z. B. via Footer-Link). */
export function reopenConsent() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT));
}
