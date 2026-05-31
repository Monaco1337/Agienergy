'use client';

import { useId, useState } from 'react';
import { energyLandingContent } from '@/data/energyLandingContent';
import { FaqContactCta } from './FaqContactCta';

function ChevronDown() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="faq-chevron"
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FaqSection() {
  const { eyebrow, title, items } = energyLandingContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section
      className="section-faq-dark relative isolate"
      aria-labelledby={`${baseId}-faq-title`}
    >
      <div className="mx-auto w-full max-w-[1180px]">
        {/* Header */}
        <div className="mx-auto max-w-[980px] text-center">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]
              mb-[18px]
            "
          >
            {eyebrow}
          </p>
          <h2
            id={`${baseId}-faq-title`}
            className="
              font-display font-semibold
              text-[32px] sm:text-[40px] lg:text-[48px]
              leading-[1.08] tracking-[-0.035em]
              text-[#f5f8fb]
              mb-[56px]
            "
          >
            {title}
          </h2>
        </div>

        {/* Accordion – einzige sichtbare Komponente */}
        <div className="faq-accordion">
          {items.map((it, i) => {
            const isOpen = openIndex === i;
            const rowId = `${baseId}-row-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={it.q} className="faq-item">
                <button
                  id={rowId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className={`faq-row${isOpen ? ' open' : ''}`}
                >
                  <span className="flex items-center min-w-0 flex-1">
                    <span className="faq-plus" aria-hidden>
                      <span className="bar bar-h" />
                      <span className="bar bar-v" />
                    </span>
                    <span className="faq-question truncate-none">{it.q}</span>
                  </span>
                  <ChevronDown />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={rowId}
                  className={`faq-answer-wrap${isOpen ? ' open' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <FaqContactCta />
      </div>
    </section>
  );
}
