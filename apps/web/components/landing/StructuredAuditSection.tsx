import { energyLandingContent } from '@/data/energyLandingContent';

type CardId = 'concierge' | 'gdpr' | 'segments';

function UsersIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <circle cx="10.5" cy="11" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 23c1-3.6 3.7-5.4 7-5.4s6 1.8 7 5.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="9.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19 17.6c1.5-.3 5 .2 7 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldLockIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M15 3.5l9 3v6.2c0 5.6-3.8 10.3-9 11.9-5.2-1.6-9-6.3-9-11.9V6.5l9-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <rect
        x="10.6"
        y="13.4"
        width="8.8"
        height="6.6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12.6 13.4v-1.8a2.4 2.4 0 0 1 4.8 0v1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="15" cy="16.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M5 25V7.5a1 1 0 0 1 1-1h9.5a1 1 0 0 1 1 1V25M16.5 25V13.5a1 1 0 0 1 1-1H24a1 1 0 0 1 1 1V25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11h2M8.5 14.5h2M8.5 18h2M8.5 21.5h2M19.5 16.5h2M19.5 20h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M3.6 25h22.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<CardId, () => React.JSX.Element> = {
  concierge: UsersIcon,
  gdpr: ShieldLockIcon,
  segments: BuildingIcon,
};

export function StructuredAuditSection() {
  const { eyebrow, title, cards } = energyLandingContent.structuredAudit;

  return (
    <section className="section-audit-dark relative isolate">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Header */}
        <div className="mx-auto max-w-[1100px] text-center">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]
              mb-[20px]
            "
          >
            {eyebrow}
          </p>
          <h2
            className="
              font-display font-semibold
              text-[34px] sm:text-[clamp(40px,5.2vw,56px)]
              lg:text-[clamp(44px,5vw,72px)]
              leading-[1.04] tracking-[-0.045em]
              text-[#f5f8fb]
              mb-11 sm:mb-16 lg:mb-[72px]
            "
          >
            {title}
          </h2>
        </div>

        {/* Feature Grid – die einzigen sichtbaren Komponenten */}
        <div
          className="
            grid gap-7
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          "
        >
          {cards.map((c) => {
            const Icon = ICONS[c.id as CardId];
            return (
              <article key={c.id} className="audit-card">
                <div className="audit-icon-frame">
                  <Icon />
                </div>

                <h3
                  className="
                    mt-[34px]
                    font-display font-semibold
                    text-[30px] sm:text-[34px] lg:text-[40px]
                    leading-[1.02] tracking-[-0.03em]
                    text-[#f7fbff]
                    mb-[26px]
                  "
                >
                  {c.title}
                </h3>

                <p
                  className="
                    text-[16px] sm:text-[17.5px] lg:text-[19px]
                    leading-[1.85]
                    text-[rgba(235,245,250,0.72)]
                    max-w-[95%]
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
