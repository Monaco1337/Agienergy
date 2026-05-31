'use client';

import * as React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { FinalCta } from '@/components/landing/FinalCta';
import { StickyMobileCta } from '@/components/landing/StickyMobileCta';
import { EnergyLeadForm } from '@/components/landing/EnergyLeadForm';
import { CinematicHeroBackdrop } from '@/components/landing/CinematicHeroBackdrop';
import { Button } from '@elo/ui';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import { energyLandingContent } from '@/data/energyLandingContent';
import type { LeadCategory } from '@/types/lead';

const TOPIC_CINEMATIC_ASSETS: Partial<
  Record<LeadCategory, { desktop: string; mobile: string }>
> = {
  strom: {
    desktop: '/hero/hero-strom-desktop.png',
    mobile: '/hero/hero-strom-mobile.png',
  },
  gas: {
    desktop: '/hero/hero-gas-desktop.png',
    mobile: '/hero/hero-gas-mobile.png',
  },
};

interface TopicLeadShellProps {
  eyebrow: string;
  h1: string;
  heroIntro: string;
  category: LeadCategory;
  children: React.ReactNode;
}

export function TopicLeadShell({ eyebrow, h1, heroIntro, category, children }: TopicLeadShellProps) {
  const cinematicAssets = TOPIC_CINEMATIC_ASSETS[category];

  return (
    <>
      <Header />
      <main>
        {cinematicAssets ? (
          <section className="relative isolate overflow-hidden bg-[#02060c] agi-hero-bleed-under-nav pb-20 sm:pb-24">
            <CinematicHeroBackdrop
              desktopSrc={cinematicAssets.desktop}
              mobileSrc={cinematicAssets.mobile}
            />
            <div className="relative z-[2] mx-auto max-w-6xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+112px)]">
              <p className="text-[11px] font-medium tracking-[0.22em] text-[rgba(245,250,255,0.82)] uppercase [text-shadow:0_1px_18px_rgba(0,0,0,0.55)]">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-[#f7fbff] leading-[1.08] tracking-tight max-w-3xl [text-shadow:0_2px_28px_rgba(0,0,0,0.5)]">
                {h1}
              </h1>
              <p className="mt-5 text-[16px] sm:text-[17px] text-[rgba(235,245,250,0.78)] leading-[1.7] max-w-2xl font-light [text-shadow:0_1px_16px_rgba(0,0,0,0.45)]">
                {heroIntro}
              </p>
              <button type="button" className="cta-hero-cyan mt-9" onClick={scrollToEnergyForm}>
                <span>{energyLandingContent.hero.ctaPrimary}</span>
                <span aria-hidden className="text-white/90">→</span>
              </button>
            </div>
          </section>
        ) : (
          <section className="relative overflow-hidden bg-premium-dark agi-hero-bleed-under-nav pb-16 sm:pb-20">
            <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
            <div
              className="pointer-events-none absolute -top-32 -left-24 size-[520px] rounded-full bg-warmAmber/10 blur-[120px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-1/3 -right-24 size-[420px] rounded-full bg-cyan/8 blur-[120px]"
              aria-hidden
            />
            <div className="relative mx-auto max-w-6xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+112px)]">
              <p className="text-[11px] font-medium tracking-[0.22em] text-warmAmber/85 uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-softWhite leading-[1.08] tracking-tight max-w-3xl">
                {h1}
              </h1>
              <p className="mt-5 text-[16px] sm:text-[17px] text-softWhite/72 leading-[1.7] max-w-2xl font-light">
                {heroIntro}
              </p>
              <Button type="button" variant="primary" size="lg" className="mt-9" onClick={scrollToEnergyForm}>
                {energyLandingContent.hero.ctaPrimary}
                <span aria-hidden className="ml-1 text-white/80">→</span>
              </Button>
            </div>
          </section>
        )}

        <div
          className={
            (cinematicAssets ? 'section-topic-below-hero-cine' : 'section-topic-below-hero-studio') +
            ' relative overflow-hidden border-b border-white/[0.06]'
          }
        >
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.16]" aria-hidden>
            <div className="h-full w-full grid-faint [mask-image:none] [-webkit-mask-image:none]" />
          </div>
          <div className="relative z-[2]">{children}</div>
        </div>

        <ProcessSection />

        <section
          className="
            section-topic-lead-form
            relative isolate overflow-hidden
            border-t border-white/[0.06]
            py-[72px] sm:py-[96px]
            scroll-mt-24 sm:scroll-mt-28
          "
          aria-label="Kontaktformular"
        >
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.2]"
            aria-hidden
          >
            <div className="h-full w-full grid-faint [mask-image:none] [-webkit-mask-image:none]" />
          </div>
          <div className="relative z-[2] mx-auto max-w-lg px-5 lg:px-8">
            <EnergyLeadForm defaultCategory={category} />
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
