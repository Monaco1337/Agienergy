'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@elo/ui';
import { Logo } from '@/components/brand/Logo';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import { energyLandingContent } from '@/data/energyLandingContent';

const NAV_LINKS = [
  { href: '/stromkosten-senken', label: 'Strom' },
  { href: '/gaskosten-senken', label: 'Gas' },
  { href: '/photovoltaik-beratung', label: 'Photovoltaik' },
  { href: '/gewerbe-energiecheck', label: 'Gewerbe' },
];

/** Voller Hero bis oben – transparenter Header; sonst Glas (heller Body) */
const HERO_FULLBLEED_PATHS = new Set([
  '/',
  '/stromkosten-senken',
  '/gaskosten-senken',
  '/photovoltaik-beratung',
  '/gewerbe-energiecheck',
  '/energieberatung-deutschland',
]);

export function Header() {
  const pathname = usePathname();
  const heroFullBleed = HERO_FULLBLEED_PATHS.has(pathname ?? '');
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const showGlassBar = scrolled || !heroFullBleed;
  const headerCtaLabel = energyLandingContent.hero.ctaPrimary;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 isolate transition-all duration-300 ease-out',
        'header-shell',
        showGlassBar ? 'header-shell--scrolled' : 'header-shell--at-top',
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {showGlassBar && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
          aria-hidden
        />
      )}

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-[68px] lg:h-[76px] flex items-center justify-between gap-4">
        <Link
          href="/"
          className="
            header-logo-treatment
            flex items-center group shrink-0 rounded-full
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
          "
          aria-label="AGI Energy – Startseite"
        >
          <Logo variant="wordmark" size="md" onDark />
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 text-[14px] font-medium"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link-dark"
            >
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={scrollToEnergyForm}
            className="header-cta hidden sm:inline-flex"
            aria-label={headerCtaLabel}
          >
            <span>{headerCtaLabel}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Mobile Trigger */}
          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'md:hidden inline-flex size-10 items-center justify-center rounded-full',
              'text-[rgba(245,250,255,0.92)] transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
              showGlassBar || open
                ? 'border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                : 'border border-transparent bg-transparent hover:bg-white/[0.06] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]',
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer – dunkles Glas, gleicher Look wie Desktop */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[460px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div className="mx-auto max-w-[1440px] px-5 pb-5 pt-2">
          <div
            className="
              rounded-2xl border border-white/10
              bg-[rgba(10,16,24,0.78)]
              [backdrop-filter:saturate(180%)_blur(22px)]
              [-webkit-backdrop-filter:saturate(180%)_blur(22px)]
              shadow-[0_18px_60px_rgba(0,0,0,0.45)]
              p-2
            "
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center justify-between
                      rounded-xl px-4 py-3.5
                      text-[15.5px] font-medium
                      text-[rgba(245,250,255,0.92)]
                      hover:bg-white/[0.05]
                      transition-colors
                    "
                  >
                    <span>{l.label}</span>
                    <span className="text-[rgba(245,250,255,0.40)]" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-2 pb-1.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  scrollToEnergyForm();
                }}
                className="header-cta w-full justify-center"
                aria-label={headerCtaLabel}
              >
                <span>{headerCtaLabel}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
