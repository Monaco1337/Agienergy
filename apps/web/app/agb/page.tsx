import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MissingDataWarning } from '@/components/legal/MissingDataWarning';
import { COMPANY_INFO } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description:
    'AGB für die kostenlose Energie-Beratungsleistung von AGI Energy: Leistungsumfang, Vertragsabschluss, Haftung, Widerruf.',
  alternates: { canonical: '/agb' },
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  const c = COMPANY_INFO;
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-3xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-20">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Rechtliches
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] font-semibold text-navy leading-[1.1] tracking-tight">
            Allgemeine Geschäfts­bedingungen
          </h1>
          <p className="mt-3 text-[13px] text-slate/70">Stand: {c.lastUpdated}</p>

          <div className="mt-8 space-y-10 text-[15px] leading-[1.75] text-slate">
            <MissingDataWarning />

            <Section title="§ 1 Geltungsbereich und Vertragsparteien">
              <p>
                Diese AGB gelten für alle Verträge zwischen {c.legalName} (nachfolgend
                „Anbieter") und Verbraucherinnen bzw. Verbrauchern oder Unternehmen
                (nachfolgend „Nutzer"), die über die Website agienergy.de zustande
                kommen.
              </p>
              <p>
                Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein
                Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer
                gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet
                werden können (§ 13 BGB).
              </p>
            </Section>

            <Section title="§ 2 Leistungsbeschreibung">
              <p>
                Der Anbieter erbringt eine <strong>persönliche, kostenfreie
                Energieberatung</strong> für Privathaushalte und Gewerbe in den
                Bereichen Strom, Gas, Photovoltaik und Heizung. Die Beratung umfasst:
              </p>
              <ul className="list-disc list-outside ml-5 mt-3 space-y-1.5">
                <li>Prüfung übermittelter Verbrauchs- und Vertragsdaten</li>
                <li>Ergebnisoffene Einschätzung des Einsparpotenzials</li>
                <li>Persönliche Rückmeldung per E-Mail oder Telefon</li>
                <li>Auf Wunsch: Vermittlung eines passenden Versorgervertrags</li>
              </ul>
              <p className="mt-4">
                Eine automatische Vertragsumstellung erfolgt <strong>nicht</strong>.
                Ein konkreter Anbieterwechsel wird ausschließlich auf ausdrückliche
                schriftliche oder elektronische Beauftragung durch den Nutzer hin
                durchgeführt.
              </p>
            </Section>

            <Section title="§ 3 Vertragsabschluss">
              <p>
                Mit dem Absenden eines Energie-Check-Formulars gibt der Nutzer ein
                Angebot zur Erbringung der kostenfreien Beratungsleistung ab. Der
                Anbieter nimmt dieses Angebot durch automatische Bestätigungsmail
                an. Hierdurch entsteht ein Auftragsverhältnis im Sinne der §§ 631 ff.
                BGB. Eine Zahlungspflicht des Nutzers entsteht <strong>nicht</strong>.
              </p>
            </Section>

            <Section title="§ 4 Vergütung des Anbieters">
              <p>
                Die Beratung ist für den Nutzer kostenfrei. Der Anbieter erhält bei
                erfolgreicher Vermittlung eines Versorgervertrags eine Provision vom
                Versorger. Diese Provision ist im Vertragspreis des Versorgers bereits
                enthalten und führt zu keiner finanziellen Mehrbelastung des Nutzers.
              </p>
            </Section>

            <Section title="§ 5 Pflichten des Nutzers">
              <p>
                Der Nutzer ist verpflichtet, alle für die Beratung erforderlichen
                Angaben wahrheitsgemäß und vollständig zu übermitteln. Insbesondere
                versichert der Nutzer, dass er zur Vorlage übermittelter Dokumente
                (z. B. Jahresabrechnungen) berechtigt ist.
              </p>
            </Section>

            <Section title="§ 6 Haftung">
              <p>
                Die Beratung des Anbieters ist eine{' '}
                <strong>unverbindliche Einschätzung</strong>, basierend auf den vom
                Nutzer übermittelten Daten. Der Anbieter haftet nur für Schäden, die
                auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung
                beruhen, sowie für Schäden aus der Verletzung des Lebens, des Körpers
                oder der Gesundheit.
              </p>
              <p>
                Bei der Verletzung wesentlicher Vertragspflichten (Kardinalpflichten)
                haftet der Anbieter auch für leichte Fahrlässigkeit, jedoch begrenzt
                auf den vertragstypischen, vorhersehbaren Schaden.
              </p>
              <p>
                Der Anbieter übernimmt keine Haftung für Schäden, die aus
                Vertragsentscheidungen des Nutzers gegenüber Dritten (z. B.
                Energieversorgern) entstehen.
              </p>
            </Section>

            <Section title="§ 7 Widerrufsrecht">
              <p>
                Verbraucher haben bei online geschlossenen Verträgen ein gesetzliches
                Widerrufsrecht. Einzelheiten dazu in der{' '}
                <Link
                  href="/widerruf"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  Widerrufsbelehrung
                </Link>
                . Da die Hauptleistung (Beratung) für den Nutzer kostenfrei ist,
                entstehen aus einem Widerruf keine Kosten.
              </p>
            </Section>

            <Section title="§ 8 Datenschutz">
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt nach Maßgabe der
                geltenden gesetzlichen Bestimmungen, insbesondere der
                Datenschutz-Grundverordnung (DSGVO). Details in der{' '}
                <Link
                  href="/datenschutz"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </Section>

            <Section title="§ 9 Streitbeilegung">
              <p>
                Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung
                bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  ec.europa.eu/consumers/odr/
                </a>
                . Der Anbieter ist nicht bereit oder verpflichtet, an
                Streitbeilegungs­verfahren vor einer Verbraucher­schlichtungsstelle
                teilzunehmen.
              </p>
            </Section>

            <Section title="§ 10 Schlussbestimmungen">
              <p>
                Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gegenüber
                Verbrauchern gilt diese Rechtswahl nur insoweit, als hierdurch nicht
                der durch zwingende Bestimmungen des Rechts des Staates, in dem der
                Verbraucher seinen gewöhnlichen Aufenthalt hat, gewährte Schutz
                entzogen wird.
              </p>
              <p>
                Sollte eine Bestimmung dieser AGB unwirksam sein, wird die Wirksamkeit
                der übrigen Bestimmungen davon nicht berührt.
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
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}
