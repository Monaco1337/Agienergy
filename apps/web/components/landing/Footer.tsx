import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';

const linkCls =
  'inline-flex items-center text-[14px] text-[rgba(245,250,255,0.66)] hover:text-[#39d8e8] transition-colors duration-200';
const headingCls =
  'text-[11px] font-semibold uppercase tracking-[0.22em] text-[#39d8e8]';

function ArrowIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="ml-1.5 opacity-0 -translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
    >
      <path
        d="M3 7h8M8 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#04080d] text-[rgba(245,250,255,0.86)] border-t border-white/[0.06]">
      {/* Atmosphärische Tiefen-Layer – wie der Rest der Seite */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 size-[640px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(closest-side, rgba(57,216,232,0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 size-[520px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(closest-side, rgba(30,168,255,0.06), transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden
      />
      {/* Sehr feiner oberer Lichtreflex */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div
        className="
          relative mx-auto max-w-[1440px]
          px-5 sm:px-8 lg:px-12
          pt-20 sm:pt-24 lg:pt-[112px] pb-12
          grid gap-12 lg:gap-16
          sm:grid-cols-2 lg:grid-cols-12
        "
      >
        {/* Brand-Spalte */}
        <div className="sm:col-span-2 lg:col-span-5 max-w-md">
          <Logo variant="wordmark" size="lg" onDark />
          <p className="mt-6 text-[12px] uppercase tracking-[0.22em] font-medium text-[rgba(245,250,255,0.42)]">
            Persönlich. Transparent. Zukunftssicher.
          </p>
          <p className="mt-7 text-[15px] leading-[1.7] text-[rgba(235,245,250,0.62)] max-w-[420px]">
            Persönliche Energieprüfung für Strom, Gas, Solar und Gewerbe.
            Vertraulich, individuell und ohne automatische Tarifvermittlung.
          </p>
        </div>

        {/* Bereiche */}
        <nav aria-label="Bereiche" className="lg:col-span-3">
          <h4 className={headingCls}>Bereiche</h4>
          <ul className="mt-6 space-y-[14px]">
            <li>
              <Link className={`${linkCls} group`} href="/stromkosten-senken">
                Stromkosten senken
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link className={`${linkCls} group`} href="/gaskosten-senken">
                Gaskosten senken
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link className={`${linkCls} group`} href="/photovoltaik-beratung">
                Photovoltaik-Beratung
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link className={`${linkCls} group`} href="/gewerbe-energiecheck">
                Gewerbe-Energie-Check
                <ArrowIcon />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Service */}
        <nav aria-label="Service" className="lg:col-span-2">
          <h4 className={headingCls}>Service</h4>
          <ul className="mt-6 space-y-[14px]">
            <li>
              <Link className={`${linkCls} group`} href="/energiecheck">
                Energie-Check
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link
                className={`${linkCls} group`}
                href="/energieberatung-deutschland"
              >
                Energieberatung
                <ArrowIcon />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Rechtliches */}
        <nav aria-label="Rechtliches" className="lg:col-span-2">
          <h4 className={headingCls}>Rechtliches</h4>
          <ul className="mt-6 space-y-[14px]">
            <li>
              <Link className={`${linkCls} group`} href="/datenschutz">
                Datenschutz
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link className={`${linkCls} group`} href="/datenschutz/anfrage">
                Auskunft / Löschung
                <ArrowIcon />
              </Link>
            </li>
            <li>
              <Link className={`${linkCls} group`} href="/impressum">
                Impressum
                <ArrowIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom-Bar */}
      <div className="relative border-t border-white/[0.06]">
        <div
          className="
            mx-auto max-w-[1440px]
            px-5 sm:px-8 lg:px-12
            py-6
            flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between
            text-[12.5px] text-[rgba(245,250,255,0.40)]
          "
        >
          <span className="tracking-[0.005em]">
            © {new Date().getFullYear()} AGI Energy. Alle Rechte vorbehalten.
          </span>
          <span className="tracking-[0.005em]">
            Persönliche Energieprüfung · Keine automatische Tarifvermittlung
          </span>
        </div>
      </div>
    </footer>
  );
}
