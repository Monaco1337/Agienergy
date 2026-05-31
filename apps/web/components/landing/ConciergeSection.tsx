'use client';

import Image from 'next/image';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';

function CheckGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.6 7.4l2.9 2.8L11.4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

export function ConciergeSection() {
  const { eyebrow, title, intro, bullets, cta, portraitAlt } = energyLandingContent.concierge;

  return (
    <section className="section-concierge-dark relative isolate">
      <div className="concierge-grid">
        {/* Portrait – frei integriert, ohne sichtbaren Container.
            Auf Mobile via flex order am Ende, auf Desktop links. */}
        <div className="concierge-portrait">
          <Image
            src="/people/concierge.png"
            alt={portraitAlt}
            fill
            priority={false}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="select-none pointer-events-none"
          />
        </div>

        {/* Content – flex-col damit Mobile-Reihenfolge per order steuerbar ist
            Mobile: eyebrow → headline → body → CTA → checklist
            Desktop: eyebrow → headline → body → checklist → CTA */}
        <div className="concierge-content flex flex-col">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]
              mb-[22px]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              font-display font-semibold
              text-[42px]
              sm:text-[clamp(48px,6vw,64px)]
              lg:text-[clamp(52px,5vw,82px)]
              leading-[1.02] sm:leading-[0.99] lg:leading-[0.98]
              tracking-[-0.055em]
              text-[#f7fbff]
              max-w-[720px]
              mb-[34px]
            "
          >
            {title}
          </h2>

          <p
            className="
              text-[17px] sm:text-[19px] lg:text-[22px]
              leading-[1.85]
              text-[rgba(235,245,250,0.72)]
              max-w-[720px]
              mb-10 lg:mb-[44px]
            "
          >
            {intro}
          </p>

          {/* CTA: Mobile vor Checklist, Desktop nach Checklist */}
          <div className="mb-10 lg:order-2 lg:mb-0 lg:mt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={scrollToEnergyForm}
              className="concierge-cta w-full sm:w-auto"
              aria-label={cta}
            >
              <span>{cta}</span>
              <ArrowRight />
            </button>
          </div>

          <ul className="space-y-[22px] max-w-[720px] lg:order-1 lg:mb-[44px]">
            {bullets.map((b) => (
              <li
                key={b}
                className="
                  flex items-center gap-4
                  text-[16px] sm:text-[17.5px] lg:text-[18px]
                  font-medium
                  text-[rgba(245,250,255,0.90)]
                  leading-[1.4]
                "
              >
                <span className="concierge-bullet-check">
                  <CheckGlyph />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
