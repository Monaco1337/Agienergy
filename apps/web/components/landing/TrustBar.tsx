import { energyLandingContent } from '@/data/energyLandingContent';

type IconKind = 'user' | 'shield' | 'lock' | 'reply' | 'gdpr';

const TRUST_ICONS: IconKind[] = ['user', 'shield', 'lock', 'reply', 'gdpr'];

function TrustIcon({ kind }: { kind: IconKind }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };
  const sw = 1.7;
  switch (kind) {
    case 'user':
      return (
        <svg {...common}>
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth={sw} />
          <path
            d="M3.6 17c1.1-3 3.6-4.5 6.4-4.5s5.3 1.5 6.4 4.5"
            stroke="currentColor"
            strokeWidth={sw}
          />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path
            d="M10 2.5l6 2v5c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8v-5l6-2z"
            stroke="currentColor"
            strokeWidth={sw}
          />
          <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth={sw} />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="4" y="9" width="12" height="8" rx="1.6" stroke="currentColor" strokeWidth={sw} />
          <path d="M7 9V6.6a3 3 0 0 1 6 0V9" stroke="currentColor" strokeWidth={sw} />
          <circle cx="10" cy="13" r="1.1" fill="currentColor" />
        </svg>
      );
    case 'reply':
      return (
        <svg {...common}>
          <path
            d="M3.5 6.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7l-3.5 2.5v-2.5a2 2 0 0 1-2-2v-5"
            stroke="currentColor"
            strokeWidth={sw}
          />
          <path d="M6.5 10.5h6M6.5 13h4" stroke="currentColor" strokeWidth={sw} />
        </svg>
      );
    case 'gdpr':
      return (
        <svg {...common}>
          <path
            d="M10 2.6l6 2v4.4c0 4-2.6 6.7-6 7.9-3.4-1.2-6-3.9-6-7.9V4.6l6-2z"
            stroke="currentColor"
            strokeWidth={sw}
          />
          <path d="M10 7v2.6" stroke="currentColor" strokeWidth={sw + 0.1} />
          <circle cx="10" cy="12.5" r="0.8" fill="currentColor" />
        </svg>
      );
  }
}

export function TrustBar() {
  const { items } = energyLandingContent.trustBar;
  return (
    <div
      className="
        trust-integrated
        relative z-[2] mt-8 sm:mt-10
        lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:mt-0
      "
    >
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-5 sm:px-6 lg:px-12
          py-[16px] lg:py-[14px]
        "
      >
        <ul
          aria-label="Vertrauenssignale der persönlichen Energieprüfung"
          className="
            grid grid-cols-2
            gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-3
            lg:flex lg:flex-row lg:items-center lg:justify-between
            lg:gap-[44px]
          "
        >
          {items.map((label, i) => (
            <li
              key={label}
              className="group flex items-center gap-2.5"
            >
              <span
                className="
                  trust-icon
                  inline-flex h-[22px] w-[22px] items-center justify-center shrink-0
                  text-cyan
                  transition-[filter,transform] duration-300 ease-out
                  group-hover:-translate-y-px
                "
              >
                <TrustIcon kind={TRUST_ICONS[i] ?? 'shield'} />
              </span>
              <span
                className="
                  trust-text-shadow
                  text-[12.5px] sm:text-[13px] lg:text-[14px]
                  leading-[1.3] font-medium tracking-[0.005em]
                  text-[rgba(245,250,255,0.84)]
                  transition-colors duration-300
                  group-hover:text-[rgba(245,250,255,0.96)]
                "
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
