import { energyLandingContent } from '@/data/energyLandingContent';

type CardId = 'tarife' | 'zeit' | 'einschaetzung' | 'vertrauen';

function DocumentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M6 3.4h8.5l5.5 5.6V22a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.4V9h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5h9M8.5 17h7M8.5 20h5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13 7.6V13l3.6 2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="9.5" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.6 22c1.3-4 4.6-6 8.4-6s7.1 2 8.4 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M13 3l8.2 2.8v5.5c0 5-3.4 9.2-8.2 10.6-4.8-1.4-8.2-5.6-8.2-10.6V5.8L13 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 13l2.7 2.7L17.4 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CARD_ICONS: Record<CardId, () => React.JSX.Element> = {
  tarife: DocumentIcon,
  zeit: ClockIcon,
  einschaetzung: UserIcon,
  vertrauen: ShieldCheckIcon,
};

export function AntiScamSection() {
  const { eyebrow, title, cards } = energyLandingContent.antiScam;

  return (
    <section className="section-antiscam-dark relative isolate overflow-hidden">
      {/* Cyan-Lichtbogen rechts – atmosphärischer Premium-Akzent */}
      <div className="cyan-light-arc" aria-hidden />

      <div
        className="
          mx-auto w-full max-w-[1180px]
          px-5 sm:px-7 lg:px-8
          py-[76px] sm:py-[96px] lg:py-[120px]
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
              leading-[1.1] tracking-[-0.018em]
              text-[#f5f8fb]
            "
          >
            {title}
          </h2>
        </div>

        <div
          className="
            mt-12 sm:mt-16 lg:mt-[72px]
            grid gap-6 lg:gap-7
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          "
        >
          {cards.map((c) => {
            const Icon = CARD_ICONS[c.id];
            return (
              <article key={c.id} className="premium-glass-card group">
                <div className="premium-icon-frame">
                  <Icon />
                </div>

                <h3
                  className="
                    mt-[30px]
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
                    leading-[1.7]
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
