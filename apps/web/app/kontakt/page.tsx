import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { COMPANY_INFO, displayField, isPlaceholder } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Kontakt – AGI Energy',
  description:
    'Persönlicher Kontakt zu AGI Energy. E-Mail, Telefon und Anschrift für Ihre Energieberatung.',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    type: 'website',
    title: 'Kontakt – AGI Energy',
    description: 'Persönlich erreichbar. Keine Hotline-Maschine.',
    url: '/kontakt',
  },
};

export default function KontaktPage() {
  const c = COMPANY_INFO;
  const phoneHref = isPlaceholder(c.contactPhone)
    ? undefined
    : `tel:${c.contactPhone.replace(/\s+/g, '')}`;

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-softWhite">
        <section className="mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Kontakt
          </p>
          <h1 className="mt-3 font-display text-[34px] sm:text-[44px] font-semibold text-navy leading-[1.05] tracking-tight">
            Persönlich erreichbar.<br />
            <span className="text-slate">Keine Hotline. Kein Skript.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Sie erreichen uns werktags 9 – 18 Uhr direkt – ohne Warteschleife.
            Schreiben Sie kurz Ihr Anliegen, wir melden uns spätestens innerhalb
            eines Werktags zurück.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13C4.67 19 4 18.33 4 17.5v-11z" />
                  <path d="M4.5 6.5L12 12.5 19.5 6.5" />
                </svg>
              }
              label="E-Mail"
              value={c.contactEmail}
              href={`mailto:${c.contactEmail}`}
              note="Antwort i. d. R. innerhalb 4 Std."
            />
            <Card
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.34 1.9.66 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.54 2.81.66A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              label="Telefon"
              value={displayField(c.contactPhone)}
              href={phoneHref}
              note="Mo – Fr · 9 – 18 Uhr"
            />
            <Card
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              label="Anschrift"
              value={`${displayField(c.street)}, ${displayField(c.postalCity)}`}
              note={c.country}
            />
          </div>

          <div className="mt-14 rounded-eloLg border border-borderLight bg-white p-6 sm:p-8 shadow-soft">
            <h2 className="font-display text-[22px] sm:text-[24px] font-semibold text-navy tracking-tight">
              Sie möchten Ihre Energiekosten prüfen lassen?
            </h2>
            <p className="mt-3 text-[15.5px] text-slate leading-[1.7] max-w-2xl">
              Schneller als E-Mail: Tragen Sie kurz Ihre Eckdaten in unseren
              Energie-Check ein. Wir melden uns persönlich mit einer verständlichen
              Einschätzung – keine automatische Tarifvermittlung.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#hero"
                className="inline-flex h-12 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-7 text-[15px] font-semibold text-white shadow-lift transition hover:shadow-premium active:scale-[0.99]"
              >
                Energie-Check starten
              </Link>
              <Link
                href="/fragen-antworten"
                className="inline-flex h-12 items-center justify-center rounded-elo border border-borderLight bg-white px-6 text-[15px] font-medium text-navy hover:bg-paper2 transition"
              >
                Häufige Fragen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Card({
  icon,
  label,
  value,
  href,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  const inner = (
    <>
      <div className="size-10 rounded-elo bg-gradient-to-br from-energyGreen/15 to-premiumBlue/15 text-premiumBlue flex items-center justify-center">
        {icon}
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate/70">
        {label}
      </p>
      <p className="mt-1 text-[16px] font-medium text-navy break-words">{value}</p>
      {note ? <p className="mt-1 text-[13px] text-slate/80">{note}</p> : null}
    </>
  );
  const cls =
    'block rounded-eloLg border border-borderLight bg-white p-5 transition hover:border-energyGreen/60 hover:shadow-soft';
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
