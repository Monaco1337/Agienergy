import { energyLandingContent } from '@/data/energyLandingContent';

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.2 20c1.1-3.6 4.2-5.4 7.8-5.4s6.7 1.8 7.8 5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MagnifyCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.2 11.2l2.1 2.1 4-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.8 15.8L20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldLockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7.5 2.6v5.2c0 4.6-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5-7.5-9.6V5.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="9" y="10.5" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.55" />
      <path
        d="M10.4 10.5V9.2a1.6 1.6 0 0 1 3.2 0v1.3"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9.5L5.5 20v-3.6A2 2 0 0 1 4 14.4V6.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 9.4h8M8 12.6h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = [PersonIcon, MagnifyCheckIcon, ShieldLockIcon, ChatIcon];

export function ProblemSection() {
  const { eyebrow, title, intro, cards } = energyLandingContent.problem;
  return (
    <section className="section-premium-dark relative isolate overflow-hidden">
      <div
        className="
          mx-auto w-full
          max-w-[1180px]
          px-5 sm:px-7 lg:px-8
          py-[72px] sm:py-[96px] lg:py-[120px]
        "
      >
        <div className="mx-auto max-w-[760px] text-center">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]/90
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-[18px]
              font-display font-semibold
              text-[32px] sm:text-[40px] lg:text-[48px]
              leading-[1.08] tracking-[-0.018em]
              text-[#f5f8fb]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-6
              text-[15.5px] sm:text-[16.5px] lg:text-[17px]
              leading-[1.7]
              text-[rgba(235,245,250,0.68)]
              max-w-[680px] mx-auto
            "
          >
            {intro}
          </p>
        </div>

        <div
          className="
            mt-12 sm:mt-16 lg:mt-[72px]
            grid gap-6 lg:gap-7
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          "
        >
          {cards.map((c, i) => {
            const Icon = ICONS[i] ?? PersonIcon;
            return (
              <article key={c.title} className="premium-glass-card group">
                <div className="premium-icon-frame">
                  <Icon />
                </div>

                <h3
                  className="
                    mt-7
                    text-[20px] sm:text-[22px] lg:text-[24px]
                    font-semibold
                    leading-[1.25]
                    text-white
                  "
                >
                  {c.title}
                </h3>

                <p
                  className="
                    mt-[18px]
                    text-[15px] sm:text-[15.5px] lg:text-[16px]
                    leading-[1.75]
                    text-[rgba(235,245,250,0.66)]
                  "
                >
                  {c.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
