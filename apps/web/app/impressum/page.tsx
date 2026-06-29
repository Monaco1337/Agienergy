import type { Metadata } from 'next';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MissingDataWarning } from '@/components/legal/MissingDataWarning';
import { COMPANY_INFO, displayField, isPlaceholder } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Anbieterkennzeichnung nach § 5 TMG.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  const c = COMPANY_INFO;
  const hasHrb = !isPlaceholder(c.hrb);
  const hasVat = !isPlaceholder(c.vatId);

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-3xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Rechtliches
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-navy leading-[1.1] tracking-tight">
            Impressum
          </h1>
          <p className="mt-3 text-[13px] text-slate/70">
            Anbieterkennzeichnung nach § 5 TMG · Stand: {c.lastUpdated}
          </p>

          <div className="mt-8 space-y-10 text-[15px] leading-[1.75] text-slate">
            <MissingDataWarning />

            <Section title="Anbieter">
              <p className="text-navy font-medium">{c.legalName}</p>
              {c.tradingName !== c.legalName ? (
                <p>Geschäftsbezeichnung: {c.tradingName}</p>
              ) : null}
              <p>{displayField(c.street)}</p>
              <p>{displayField(c.postalCity)}</p>
              <p>{c.country}</p>
            </Section>

            <Section title="Vertretungsberechtigt">
              <p>{c.responsiblePerson}</p>
            </Section>

            <Section title="Kontakt">
              <p>
                E-Mail:{' '}
                <a
                  href={`mailto:${c.contactEmail}`}
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  {c.contactEmail}
                </a>
              </p>
              <p>Telefon: {displayField(c.contactPhone)}</p>
            </Section>

            {hasHrb ? (
              <Section title="Handelsregister">
                <p>Registergericht: {c.registerCourt}</p>
                <p>Registernummer: {c.hrb}</p>
              </Section>
            ) : null}

            {hasVat ? (
              <Section title="Umsatzsteuer-Identifikationsnummer">
                <p>nach § 27a Umsatzsteuergesetz: {c.vatId}</p>
              </Section>
            ) : null}

            <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
              <p>
                {c.pressResponsible}
                <br />
                {displayField(c.street)}
                <br />
                {displayField(c.postalCity)}
              </p>
            </Section>

            <Section title="EU-Streitschlichtung">
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </Section>

            <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </Section>

            <Section title="Haftung für Inhalte">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
                auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
                überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
                oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt.
              </p>
            </Section>

            <Section title="Haftung für Links">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
                fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                der Seiten verantwortlich.
              </p>
            </Section>

            <Section title="Urheberrecht">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers.
              </p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[18px] sm:text-[20px] font-semibold text-navy tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-1.5">{children}</div>
    </section>
  );
}
