'use client';

import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';

type TrustItemId = 'concierge' | 'confidential' | 'no-auto';

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.8 17c1-3 3.5-4.5 6.2-4.5s5.2 1.5 6.2 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.5l6 2v5c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8v-5l6-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 10l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoAutoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.4 5.4l9.2 9.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
    </svg>
  );
}

const TRUST_ICONS: Record<TrustItemId, () => React.JSX.Element> = {
  concierge: PersonIcon,
  confidential: ShieldIcon,
  'no-auto': NoAutoIcon,
};

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

export function FinalCta() {
  const f = energyLandingContent.finalCta;
  return (
    <section className="section-finalcta-dark relative isolate">
      <div className="finalcta-panel">
        <div
          className="
            relative
            px-6 py-11
            sm:px-12 sm:py-[60px]
            lg:px-[72px] lg:py-[72px]
            max-w-full
          "
        >
          <div className="max-w-[560px]">
            <p
              className="
                uppercase font-semibold
                text-[11.5px] sm:text-[12px]
                tracking-[0.18em]
                text-[#39d8e8]
                mb-[18px]
              "
            >
              {f.eyebrow}
            </p>

            <h2
              className="
                font-display font-semibold
                text-[30px] sm:text-[38px] lg:text-[46px]
                leading-[1.06] tracking-[-0.035em]
                text-[#f5f8fb]
                whitespace-pre-line
                mb-[22px]
              "
            >
              {f.title}
            </h2>

            <p
              className="
                text-[15.5px] sm:text-[16.5px] lg:text-[17px]
                leading-[1.7]
                text-[rgba(235,245,250,0.74)]
                max-w-[500px]
                mb-[34px]
              "
            >
              {f.text}
            </p>

            <div>
              <button
                type="button"
                onClick={scrollToEnergyForm}
                className="cta-cyan"
                aria-label={f.button}
              >
                <span>{f.button}</span>
                <ArrowRight />
              </button>
            </div>

            <ul
              className="
                mt-[34px]
                flex flex-wrap
                gap-x-7 gap-y-4
              "
              aria-label="Vertrauenssignale"
            >
              {f.trustItems.map((it) => {
                const Icon = TRUST_ICONS[it.id as TrustItemId];
                return (
                  <li key={it.id} className="finalcta-trust-item">
                    <span className="finalcta-trust-icon">
                      <Icon />
                    </span>
                    <span
                      className="
                        text-[14px] leading-[1.35]
                        font-medium
                        text-[rgba(245,250,255,0.82)]
                      "
                    >
                      {it.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
