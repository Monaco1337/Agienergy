import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { COMPANY_INFO } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Impressum | AGI Energy',
  description:
    'Impressum von AGI Energy – Anbieterkennzeichnung, Kontakt, Verantwortlichkeit und rechtliche Hinweise gemäß § 5 DDG.',
  alternates: { canonical: 'https://www.agienergy.de/impressum' },
  robots: { index: true, follow: true },
};

const hasVatId = COMPANY_INFO.vatId.trim().length > 0;
const phoneHref = `tel:${COMPANY_INFO.contactPhone.replace(/\s+/g, '')}`;
const lastUpdatedDe = COMPANY_INFO.lastUpdated.split('-').reverse().join('.');

const legalSections = [
  { id: 'angaben', label: 'Angaben gemäß § 5 DDG' },
  { id: 'anbieterin', label: 'Anbieterin' },
  { id: 'verantwortliche', label: 'Inhaltlich Verantwortliche' },
  { id: 'leistungsbereich', label: 'Leistungsbereich' },
  { id: 'umsatzsteuer', label: 'Umsatzsteuer' },
  { id: 'technik', label: 'Technische Umsetzung' },
  { id: 'streitbeilegung', label: 'Verbraucherstreitbeilegung' },
  { id: 'haftung-inhalte', label: 'Haftung für Inhalte' },
  { id: 'haftung-links', label: 'Haftung für externe Links' },
  { id: 'urheberrecht', label: 'Urheberrecht und Schutzrechte' },
  { id: 'datenschutz', label: 'Datenschutz' },
  { id: 'rechtliche-hinweise', label: 'Kontakt bei rechtlichen Hinweisen' },
] as const;

const serviceScope = [
  'Strom',
  'Gas',
  'Photovoltaik',
  'Anbieterwechsel',
  'Jahresabrechnungen',
  'Verbrauchsoptimierung',
  'Gewerbeenergie',
] as const;

export default function ImpressumPage() {
  const c = COMPANY_INFO;

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite text-navy">
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+56px)] sm:px-8 sm:pb-24 sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+76px)]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-slate/75">
            <Link href="/" className="underline-offset-4 hover:text-premiumBlue hover:underline">
              Startseite
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span>Impressum</span>
          </nav>

          <header className="mt-8 border-b border-borderLight pb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-energyGreen/90">
              Rechtliche Anbieterkennzeichnung
            </p>
            <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.08] tracking-tight text-navy sm:text-[42px]">
              Impressum
            </h1>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-slate">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz für das Internetangebot
              von AGI Energy, einem Angebot von {c.responsiblePerson}.
            </p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article className="space-y-10 text-[15.5px] leading-[1.78] text-slate">
              <LegalSection id="angaben" title="Angaben gemäß § 5 Digitale-Dienste-Gesetz">
                <AddressBlock>
                  <strong className="font-semibold text-navy">AGI Energy</strong>
                  <br />
                  ein Angebot von
                  <br />
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>

                <div className="mt-5 grid gap-3 rounded-elo border border-borderLight bg-white p-4 text-[14.5px] sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-navy">Telefon:</span>{' '}
                    <a
                      href={phoneHref}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactPhone}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-navy">E-Mail:</span>{' '}
                    <a
                      href={`mailto:${c.contactEmail}`}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactEmail}
                    </a>
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium text-navy">Website:</span>{' '}
                    <a
                      href="https://www.agienergy.de"
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      https://www.agienergy.de
                    </a>
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="anbieterin" title="Anbieterin dieses Internetangebots">
                <p>Anbieterin und Diensteanbieterin dieses Internetangebots ist:</p>
                <AddressBlock>
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>
              </LegalSection>

              <LegalSection
                id="verantwortliche"
                title="Inhaltlich Verantwortliche gemäß § 18 Abs. 2 MStV"
              >
                <p>
                  Verantwortlich für journalistisch-redaktionelle Inhalte, soweit
                  solche Inhalte auf dieser Website bereitgestellt werden:
                </p>
                <AddressBlock>
                  {c.pressResponsible}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>
              </LegalSection>

              <LegalSection id="leistungsbereich" title="Leistungsbereich">
                <p>
                  AGI Energy stellt Informationen und Kontaktmöglichkeiten im
                  Bereich persönlicher Energieprüfung bereit. Der Leistungsbereich
                  umfasst insbesondere Anfragen zu:
                </p>
                <ul className="mt-1 grid gap-2 sm:grid-cols-2">
                  {serviceScope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-energyGreen/70"
                      />
                      <span className="text-navy">{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Die Inhalte dieser Website dienen der ersten Information und
                  Kontaktaufnahme. Eine individuelle Prüfung, Empfehlung,
                  Vermittlung oder Angebotserstellung erfolgt erst auf Grundlage der
                  im Einzelfall bereitgestellten Angaben.
                </p>
                <p>
                  AGI Energy ist kein Energieversorgungsunternehmen, kein
                  Netzbetreiber und kein anonymes Tarifportal. Konkrete Angebote,
                  Einsparpotenziale, Verfügbarkeiten und Konditionen hängen vom
                  jeweiligen Einzelfall, insbesondere Standort, Verbrauchsprofil,
                  bestehendem Vertragsverhältnis, technischer Ausgangslage und den
                  jeweils verfügbaren Marktbedingungen ab.
                </p>
              </LegalSection>

              <LegalSection id="umsatzsteuer" title="Umsatzsteuer">
                {hasVatId ? (
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27a
                    Umsatzsteuergesetz: {c.vatId}
                  </p>
                ) : (
                  <>
                    <p>
                      Umsatzsteuer-Identifikationsnummer gemäß § 27a
                      Umsatzsteuergesetz: nicht angegeben
                    </p>
                    <p>
                      Eine Steuernummer wird aus Datenschutz- und
                      Sicherheitsgründen nicht im Impressum veröffentlicht.
                    </p>
                  </>
                )}
              </LegalSection>

              <LegalSection id="technik" title="Technische Umsetzung und Verwaltung">
                <p>
                  Die technische Umsetzung, Wartung, Weiterentwicklung und
                  Verwaltung dieser Website kann durch externe technische
                  Dienstleister erfolgen, insbesondere durch AGI Works / Nexcel AI.
                </p>
                <p>
                  Technische Dienstleister handeln nicht als Anbieter dieses
                  Internetangebots. Sie unterstützen ausschließlich bei der
                  technischen Bereitstellung, Systemverwaltung,
                  Formularverarbeitung, Leadverwaltung, Wartung und Weiterleitung
                  eingehender Anfragen nach Weisung der Anbieterin, soweit dies
                  datenschutzrechtlich erforderlich ist.
                </p>
                <p>
                  Die inhaltliche, geschäftliche und rechtliche Verantwortung für
                  dieses Internetangebot liegt bei {c.responsiblePerson}.
                </p>
              </LegalSection>

              <LegalSection id="streitbeilegung" title="Verbraucherstreitbeilegung">
                <p>
                  Wir sind nicht verpflichtet und nicht bereit, an
                  Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                  teilzunehmen.
                </p>
              </LegalSection>

              <LegalSection id="haftung-inhalte" title="Haftung für Inhalte">
                <p>
                  Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
                  erstellt. Dennoch übernehmen wir keine Gewähr für die Aktualität,
                  Vollständigkeit, Richtigkeit oder Verfügbarkeit der
                  bereitgestellten Informationen.
                </p>
                <p>
                  Als Diensteanbieterin ist {c.responsiblePerson} für eigene
                  Inhalte auf dieser Website nach den allgemeinen gesetzlichen
                  Vorschriften verantwortlich.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Bei Bekanntwerden konkreter Rechtsverletzungen werden
                  betroffene Inhalte unverzüglich geprüft und erforderlichenfalls
                  entfernt.
                </p>
              </LegalSection>

              <LegalSection id="haftung-links" title="Haftung für externe Links">
                <p>
                  Diese Website kann Links zu externen Websites Dritter enthalten.
                  Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                  verantwortlich.
                </p>
                <p>
                  Zum Zeitpunkt der Verlinkung wurden externe Inhalte auf
                  erkennbare Rechtsverstöße geprüft. Rechtswidrige Inhalte waren zu
                  diesem Zeitpunkt nicht erkennbar.
                </p>
                <p>
                  Eine permanente Kontrolle verlinkter Seiten ist ohne konkrete
                  Hinweise auf Rechtsverletzungen nicht zumutbar. Bei Bekanntwerden
                  entsprechender Rechtsverletzungen werden betroffene Links
                  unverzüglich entfernt.
                </p>
              </LegalSection>

              <LegalSection id="urheberrecht" title="Urheberrecht und Schutzrechte">
                <p>
                  Die auf dieser Website veröffentlichten Inhalte, Texte,
                  Strukturen, Designs, Grafiken, Markenbestandteile, Bildwelten,
                  Dokumente und sonstigen Werke unterliegen dem deutschen
                  Urheberrecht und sonstigen Schutzrechten.
                </p>
                <p>
                  Jede Nutzung, Vervielfältigung, Bearbeitung, öffentliche
                  Wiedergabe, Verbreitung oder sonstige Verwertung außerhalb der
                  gesetzlichen Grenzen bedarf der vorherigen schriftlichen
                  Zustimmung des jeweiligen Rechteinhabers.
                </p>
                <p>
                  Soweit Inhalte auf dieser Website nicht von der Anbieterin
                  erstellt wurden, werden Rechte Dritter beachtet und entsprechende
                  Inhalte gekennzeichnet. Sollten Sie auf eine mögliche
                  Rechtsverletzung aufmerksam werden, bitten wir um einen
                  entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                  werden betroffene Inhalte unverzüglich geprüft und
                  erforderlichenfalls entfernt.
                </p>
              </LegalSection>

              <LegalSection id="datenschutz" title="Datenschutz">
                <p>
                  Informationen zur Verarbeitung personenbezogener Daten finden Sie
                  in unserer{' '}
                  <Link
                    href="/datenschutz"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
                <p>
                  Ergänzende Informationen zu Cookies und vergleichbaren
                  Technologien finden Sie in unserer{' '}
                  <Link
                    href="/cookie-richtlinie"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Cookie-Richtlinie
                  </Link>
                  .
                </p>
              </LegalSection>

              <LegalSection id="rechtliche-hinweise" title="Kontakt bei rechtlichen Hinweisen">
                <p>
                  Bei rechtlichen Hinweisen zu dieser Website wenden Sie sich bitte
                  an:
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href={`mailto:${c.contactEmail}`}
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    {c.contactEmail}
                  </a>
                </p>
              </LegalSection>

              <p className="border-t border-borderLight pt-6 text-[12.5px] text-slate/60">
                Stand: {lastUpdatedDe}
              </p>
            </article>

            <aside className="lg:sticky lg:top-[calc(var(--agi-header-row)+2rem)]">
              <div className="rounded-eloLg border border-borderLight bg-white p-5 shadow-soft">
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Rechtliche Kurzangaben
                </h2>
                <dl className="mt-4 space-y-4 text-[13.5px] leading-relaxed">
                  <MetaItem label="Anbieterin">{c.responsiblePerson}</MetaItem>
                  <MetaItem label="Angebot">{c.legalName}</MetaItem>
                  <MetaItem label="Anschrift">
                    {c.street}
                    <br />
                    {c.postalCity}
                    <br />
                    {c.country}
                  </MetaItem>
                  <MetaItem label="Kontakt">
                    <a
                      href={phoneHref}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactPhone}
                    </a>
                    <br />
                    <a
                      href={`mailto:${c.contactEmail}`}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactEmail}
                    </a>
                  </MetaItem>
                </dl>
              </div>

              <nav
                aria-label="Abschnitte im Impressum"
                className="mt-4 rounded-eloLg border border-borderLight bg-white p-5 shadow-soft"
              >
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Auf dieser Seite
                </h2>
                <ul className="mt-4 space-y-2.5 text-[13.5px] leading-snug">
                  {legalSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-slate underline-offset-4 hover:text-premiumBlue hover:underline"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AddressBlock({ children }: { children: React.ReactNode }) {
  return <address className="not-italic text-navy">{children}</address>;
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2
        id={`${id}-title`}
        className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/65">
        {label}
      </dt>
      <dd className="mt-1 text-slate">{children}</dd>
    </div>
  );
}
