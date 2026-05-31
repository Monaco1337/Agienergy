'use client';

import * as React from 'react';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import type { LeadCategory } from '@/types/lead';
import { EnergyLeadForm } from './EnergyLeadForm';
import { TrustBar } from './TrustBar';
import { CinematicHeroBackdrop } from './CinematicHeroBackdrop';

const HERO_BG_DEFAULT = {
  desktop: '/hero/hero-desktop.png',
  mobile: '/hero/hero-mobile.png',
} as const;

const HERO_BG_STROM = {
  desktop: '/hero/hero-strom-desktop.png',
  mobile: '/hero/hero-strom-mobile.png',
} as const;

const HERO_BG_GAS = {
  desktop: '/hero/hero-gas-desktop.png',
  mobile: '/hero/hero-gas-mobile.png',
} as const;

function heroBgForCategory(category: LeadCategory | null) {
  if (category === 'strom') return HERO_BG_STROM;
  if (category === 'gas') return HERO_BG_GAS;
  return HERO_BG_DEFAULT;
}

interface EnergyHeroProps {
  headline: string;
  subline: string;
  defaultCategory?: LeadCategory | null;
  emphasizeForm?: boolean;
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EnergyHero({ headline, subline, defaultCategory, emphasizeForm }: EnergyHeroProps) {
  const h = energyLandingContent.hero;

  const [heroCategory, setHeroCategory] = React.useState<LeadCategory | null>(defaultCategory ?? null);

  React.useEffect(() => {
    setHeroCategory(defaultCategory ?? null);
  }, [defaultCategory]);

  React.useEffect(() => {
    const onPreset = (e: Event) => {
      const ce = e as CustomEvent<LeadCategory>;
      if (ce.detail) setHeroCategory(ce.detail);
    };
    window.addEventListener('agi-preset-category', onPreset as EventListener);
    return () => window.removeEventListener('agi-preset-category', onPreset as EventListener);
  }, []);

  React.useEffect(() => {
    if (!emphasizeForm) return;
    const t = window.setTimeout(() => {
      scrollToEnergyForm();
    }, 400);
    return () => window.clearTimeout(t);
  }, [emphasizeForm]);

  const bg = heroBgForCategory(heroCategory);

  return (
    <section
      className="
        hero-cinematic
        relative isolate overflow-hidden bg-[#02060c]
        flex flex-col
        min-h-svh
        lg:min-h-[100svh]
        agi-hero-bleed-under-nav
      "
    >
      <CinematicHeroBackdrop desktopSrc={bg.desktop} mobileSrc={bg.mobile} />

      {/* Content – z-index über Overlays */}
      <div
        className="
          relative z-[2] flex-1 w-full flex flex-col justify-center
          mx-auto max-w-[1480px]
          px-5 sm:px-8 lg:px-12
          pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+92px)]
          sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)]
          lg:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+120px)]
          pb-9 sm:pb-12 lg:pb-[120px]
        "
      >
        <div
          className="
            grid w-full
            grid-cols-1
            lg:grid-cols-[0.95fr_1.05fr]
            gap-9 sm:gap-12 lg:gap-[72px]
            items-center
          "
        >
          <div className="agi-fade-up">
            <h1
              className="
                font-display
                font-semibold
                tracking-[-0.055em]
                text-[#f7fbff]
                text-hero-display
                text-[44px] leading-[0.98]
                sm:text-[clamp(52px,6.5vw,64px)] sm:leading-[0.96]
                lg:text-[clamp(54px,5.2vw,76px)] lg:leading-[0.94]
                max-w-[660px]
              "
            >
              {headline}
            </h1>

            <p
              className="
                text-hero-body
                mt-6 sm:mt-7
                text-[17px] sm:text-[18px] lg:text-[20px]
                leading-[1.55]
                text-[rgba(235,245,250,0.78)]
                font-normal
                max-w-[600px]
              "
            >
              {subline}
            </p>

            <div className="mt-7 sm:mt-[34px] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={scrollToEnergyForm}
                className="cta-hero-cyan"
                aria-label={h.ctaPrimary}
              >
                <span>{h.ctaPrimary}</span>
                <ArrowRight />
              </button>

              <button
                type="button"
                aria-label="Zum Abschnitt: Ablauf der persönlichen Energieprüfung"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('ablauf');
                  if (!el) return;
                  const headerOffset = window.matchMedia('(min-width: 640px)').matches ? 88 : 80;
                  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                  window.scrollTo({ top, behavior: 'smooth' });
                  if (history.replaceState) {
                    history.replaceState(null, '', '#ablauf');
                  }
                }}
                className="
                  group inline-flex items-center gap-2
                  text-[14.5px] sm:text-[15px] font-medium
                  text-[rgba(245,250,255,0.74)] hover:text-cyan
                  transition-colors px-1 py-2
                  text-hero-fine
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70
                  focus-visible:ring-offset-2 focus-visible:ring-offset-[#02060c]
                  rounded-sm
                "
              >
                <span className="border-b border-white/25 group-hover:border-cyan transition-colors pb-0.5 whitespace-nowrap">
                  {h.ctaSecondary}
                </span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path
                    d="M2.5 5L7 9.5L11.5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative z-[2]">
            <div
              className="pointer-events-none absolute -inset-5 rounded-[40px] bg-gradient-to-br from-[#39d8e8]/10 via-transparent to-[#1ea8ff]/8 blur-2xl"
              aria-hidden
            />
            <EnergyLeadForm
              defaultCategory={defaultCategory ?? null}
              emphasize={emphasizeForm}
              onCategoryChange={setHeroCategory}
            />
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}
