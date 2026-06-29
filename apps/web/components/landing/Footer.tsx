import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { CookieSettingsLink } from '@/components/landing/CookieSettingsLink';
import { COMPANY_INFO, displayField, isPlaceholder } from '@/data/companyInfo';

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
  const c = COMPANY_INFO;
  const phoneHref = isPlaceholder(c.contactPhone)
    ? undefined
    : `tel:${c.contactPhone.replace(/\s+/g, '')}`;

  return (
    <footer className="relative overflow-hidden bg-[#04080d] text-[rgba(245,250,255,0.86)] border-t border-white/[0.06]">
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      {/* Newsletter-CTA-Band */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-12 lg:py-14 grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#39d8e8]">
              Energie-Briefing
            </p>
            <h3 className="mt-3 font-display text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.15] tracking-tight text-white">
              Marktbewegungen verstehen. Bevor sie auf Ihrer Rechnung stehen.
            </h3>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.7] text-[rgba(235,245,250,0.62)] max-w-[520px]">
              Ein kompakter, persönlicher Briefing-Newsletter zu Strom-, Gas- und
              Solar-Themen. Maximal 2&nbsp;Mails pro Monat. Jederzeit abbestellbar.
              Keine Werbe-Hetze.
            </p>
            <ul className="mt-5 grid gap-2 text-[13.5px] text-[rgba(235,245,250,0.7)]">
              <FooterCheck>Marktbewegungen verständlich erklärt</FooterCheck>
              <FooterCheck>Aktuelle Spar-Hebel für Haushalt &amp; Gewerbe</FooterCheck>
              <FooterCheck>Kein externes Werbe-Tracking, kein Verkauf von Daten</FooterCheck>
            </ul>
          </div>
          <div className="rounded-eloLg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
            <NewsletterForm variant="inline" source="footer" />
          </div>
        </div>
      </div>

      <div
        className="
          relative mx-auto max-w-[1440px]
          px-5 sm:px-8 lg:px-12
          pt-16 sm:pt-20 lg:pt-[96px] pb-12
          grid gap-12 lg:gap-14
          sm:grid-cols-2 lg:grid-cols-12
        "
      >
        {/* Brand + Kontakt-Block */}
        <div className="sm:col-span-2 lg:col-span-4 max-w-md">
          <Logo variant="wordmark" size="lg" onDark />
          <p className="mt-6 text-[12px] uppercase tracking-[0.22em] font-medium text-[rgba(245,250,255,0.42)]">
            Persönlich. Transparent. Zukunftssicher.
          </p>
          <p className="mt-6 text-[15px] leading-[1.7] text-[rgba(235,245,250,0.62)] max-w-[420px]">
            Persönliche Energieprüfung für Strom, Gas, Solar und Gewerbe.
            Vertraulich, individuell und ohne automatische Tarifvermittlung.
          </p>

          <div className="mt-7 space-y-3 text-[14px]">
            <a
              href={`mailto:${c.contactEmail}`}
              className="group flex items-center gap-3 text-[rgba(245,250,255,0.78)] hover:text-[#39d8e8] transition-colors"
            >
              <span className="flex size-9 items-center justify-center rounded-elo bg-white/[0.04] border border-white/[0.06] text-[#39d8e8]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13C4.67 19 4 18.33 4 17.5v-11z" />
                  <path d="M4.5 6.5L12 12.5 19.5 6.5" />
                </svg>
              </span>
              <span>{c.contactEmail}</span>
            </a>
            {phoneHref ? (
              <a
                href={phoneHref}
                className="group flex items-center gap-3 text-[rgba(245,250,255,0.78)] hover:text-[#39d8e8] transition-colors"
              >
                <span className="flex size-9 items-center justify-center rounded-elo bg-white/[0.04] border border-white/[0.06] text-[#39d8e8]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>{displayField(c.contactPhone)}</span>
              </a>
            ) : (
              <div className="flex items-center gap-3 text-[rgba(245,250,255,0.55)]">
                <span className="flex size-9 items-center justify-center rounded-elo bg-white/[0.04] border border-white/[0.06] text-[#39d8e8]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-[13px]">{displayField(c.contactPhone)}</span>
              </div>
            )}
          </div>

          {/* Trust-Badges */}
          <ul className="mt-7 flex flex-wrap gap-2 text-[12px]">
            <TrustChip>DSGVO-konform</TrustChip>
            <TrustChip>EU-Hosting</TrustChip>
            <TrustChip>Kein Werbe-Tracking</TrustChip>
            <TrustChip>SSL/TLS verschlüsselt</TrustChip>
          </ul>
        </div>

        {/* Bereiche */}
        <nav aria-label="Bereiche" className="lg:col-span-2">
          <h4 className={headingCls}>Bereiche</h4>
          <ul className="mt-6 space-y-[14px]">
            <li><Link className={`${linkCls} group`} href="/stromkosten-senken">Stromkosten senken<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/gaskosten-senken">Gaskosten senken<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/photovoltaik-beratung">Photovoltaik-Beratung<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/gewerbe-energiecheck">Gewerbe-Energie-Check<ArrowIcon /></Link></li>
          </ul>
        </nav>

        {/* Schnellprüfung */}
        <nav aria-label="Schnellprüfung" className="lg:col-span-2">
          <h4 className={headingCls}>Schnellprüfung</h4>
          <ul className="mt-6 space-y-[14px]">
            <li><Link className={`${linkCls} group`} href="/jahresabrechnung-pruefen">Jahresabrechnung<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/stromvertrag-pruefen">Stromvertrag<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/gasvertrag-pruefen">Gasvertrag<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/anbieterwechsel-pruefen">Anbieterwechsel<ArrowIcon /></Link></li>
          </ul>
        </nav>

        {/* Wissen */}
        <nav aria-label="Wissen" className="lg:col-span-2">
          <h4 className={headingCls}>Wissen</h4>
          <ul className="mt-6 space-y-[14px]">
            <li><Link className={`${linkCls} group`} href="/ratgeber">Ratgeber<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/glossar">Glossar<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/fragen-antworten">Fragen &amp; Antworten<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/energieberatung">Städte-Übersicht<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/newsletter">Newsletter<ArrowIcon /></Link></li>
          </ul>
        </nav>

        {/* Service & Rechtliches */}
        <nav aria-label="Service & Rechtliches" className="lg:col-span-2">
          <h4 className={headingCls}>Service</h4>
          <ul className="mt-6 space-y-[14px]">
            <li><Link className={`${linkCls} group`} href="/kontakt">Kontakt<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/energiecheck">Energie-Check<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/energieberatung-deutschland">Energieberatung<ArrowIcon /></Link></li>
          </ul>

          <h4 className={`${headingCls} mt-10`}>Rechtliches</h4>
          <ul className="mt-6 space-y-[14px]">
            <li><Link className={`${linkCls} group`} href="/impressum">Impressum<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/datenschutz">Datenschutz<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/agb">AGB<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/widerruf">Widerrufsrecht<ArrowIcon /></Link></li>
            <li><Link className={`${linkCls} group`} href="/datenschutz/anfrage">Auskunft / Löschung<ArrowIcon /></Link></li>
            <li>
              <CookieSettingsLink className={`${linkCls} group cursor-pointer`}>
                Cookie-Einstellungen
                <ArrowIcon />
              </CookieSettingsLink>
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
            © {new Date().getFullYear()} {c.legalName}. Alle Rechte vorbehalten.
          </span>
          <span className="tracking-[0.005em]">
            Persönliche Energieprüfung · Keine automatische Tarifvermittlung
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCheck({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-1 shrink-0 text-[#39d8e8]"
        aria-hidden
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function TrustChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[rgba(235,245,250,0.62)]">
      <span className="size-1.5 rounded-full bg-[#39d8e8]" aria-hidden />
      {children}
    </li>
  );
}
