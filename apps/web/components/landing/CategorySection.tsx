'use client';

import Image from 'next/image';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import type { LeadCategory } from '@/types/lead';

type CatId = 'strom' | 'gas' | 'solar' | 'gewerbe';

const CATEGORY_IMAGES: Record<CatId, string> = {
  strom: '/categories/strom.png',
  gas: '/categories/gas.png',
  solar: '/categories/solar.png',
  gewerbe: '/categories/gewerbe.png',
};

const CATEGORY_ALT: Record<CatId, string> = {
  strom: 'Hochspannungsmast vor Gewitterhimmel – Symbolbild Strom',
  gas: 'Blaue Gasflamme auf einem Kochfeld – Symbolbild Gas',
  solar: 'Photovoltaikmodule im Sonnenuntergang – Symbolbild Solar',
  gewerbe: 'Modernes Bürogebäude bei Dämmerung – Symbolbild Gewerbe',
};

interface CategoryCardProps {
  id: CatId;
  title: string;
  text: string;
  ctaLabel: string;
  onActivate: () => void;
}

function CategoryCard({ id, title, text, ctaLabel, onActivate }: CategoryCardProps) {
  return (
    <article
      className="cat-card group"
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
      aria-label={`${ctaLabel}: ${title}`}
    >
      <Image
        src={CATEGORY_IMAGES[id]}
        alt={CATEGORY_ALT[id]}
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 82vw"
        className="cat-card-img select-none pointer-events-none"
        priority={false}
      />
      <div className="cat-card-overlay" aria-hidden />

      <div className="absolute inset-x-0 bottom-0 z-[2] px-6 pb-7 pt-12 lg:px-7 lg:pb-8 lg:pt-14">
        <h3
          className="
            cat-card-title
            font-display
            text-[24px] lg:text-[26px]
            font-semibold
            leading-[1.12]
            tracking-[-0.014em]
            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            cat-card-body
            mt-3.5
            text-[15px] lg:text-[15.5px]
            leading-[1.62]
            tracking-[0.003em]
            text-[rgba(245,250,255,0.80)]
            font-normal
            max-w-[96%]
          "
        >
          {text}
        </p>
      </div>
    </article>
  );
}

export function CategorySection() {
  const { eyebrow, title, cards, cta } = energyLandingContent.categories;

  function go(cat: LeadCategory) {
    scrollToEnergyForm();
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('agi-preset-category', { detail: cat }));
    }, 500);
  }

  return (
    <section className="section-category-dark relative isolate overflow-hidden">
      <div
        className="
          mx-auto w-full max-w-[1180px]
          px-5 sm:px-7 lg:px-8
          pt-[76px] sm:pt-[96px] lg:pt-[110px]
          pb-[76px] sm:pb-[96px] lg:pb-[130px]
        "
      >
        <div className="mx-auto max-w-[900px] text-center">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]/90
              mb-[18px]
            "
          >
            {eyebrow}
          </p>
          <h2
            className="
              font-display font-semibold
              text-[30px] sm:text-[38px] lg:text-[44px]
              leading-[1.08] tracking-[-0.018em]
              text-[#f5f8fb]
            "
          >
            {title}
          </h2>
        </div>

        {/* Desktop / Tablet Grid */}
        <div
          className="
            hidden sm:grid
            mt-14 lg:mt-[72px]
            grid-cols-2 lg:grid-cols-4
            gap-[22px] lg:gap-7
          "
        >
          {cards.map((card) => (
            <CategoryCard
              key={card.id}
              id={card.id as CatId}
              title={card.title}
              text={card.text}
              ctaLabel={cta}
              onActivate={() => go(card.id)}
            />
          ))}
        </div>

        {/* Mobile Snap-Scroll */}
        <div
          className="sm:hidden mt-12 cat-scroll scrollbar-none -mx-5 px-5"
          role="list"
          aria-label="Energie-Bereiche durchscrollen"
        >
          {cards.map((card) => (
            <CategoryCard
              key={card.id}
              id={card.id as CatId}
              title={card.title}
              text={card.text}
              ctaLabel={cta}
              onActivate={() => go(card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
