import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MissingDataWarning } from '@/components/legal/MissingDataWarning';
import { COMPANY_INFO, displayField } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzhinweise nach Art. 13 DSGVO: Verantwortlicher, Datenkategorien, Speicherdauer, Auftragsverarbeiter, Ihre Rechte.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
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
            Datenschutz­erklärung
          </h1>
          <p className="mt-3 text-[13px] text-slate/70">
            Hinweise nach Art. 13 DSGVO · Stand: {c.lastUpdated}
          </p>

          <div className="mt-8 space-y-10 text-[15px] leading-[1.75] text-slate">
            <MissingDataWarning />

            <Section title="1. Verantwortlicher">
              <p>
                Verantwortlich für die Verarbeitung personenbezogener Daten auf
                dieser Website im Sinne der DSGVO ist:
              </p>
              <p className="mt-3 text-navy">
                {c.legalName}
                <br />
                {c.responsiblePerson}
                <br />
                {displayField(c.street)}
                <br />
                {displayField(c.postalCity)}
                <br />
                E-Mail:{' '}
                <a
                  href={`mailto:${c.contactEmail}`}
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  {c.contactEmail}
                </a>
                <br />
                Telefon: {displayField(c.contactPhone)}
              </p>
            </Section>

            <Section title="2. Welche Daten wir verarbeiten">
              <p>
                Wir verarbeiten ausschließlich personenbezogene Daten, die Sie uns
                aktiv übermitteln oder die technisch zwingend zur Auslieferung
                dieser Website notwendig sind.
              </p>
              <h3 className="mt-5 font-semibold text-navy">2.1 Server-Logfiles</h3>
              <p>
                Beim Aufruf dieser Seite verarbeitet unser Hosting-Anbieter
                automatisch übermittelte Daten (IP-Adresse, Datum/Uhrzeit, abgerufene
                URL, Referrer, User-Agent). Diese werden gekürzt bzw. nach max.
                14 Tagen automatisch gelöscht. Zweck: Auslieferung, Stabilität,
                Abwehr von Angriffen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse).
              </p>
              <h3 className="mt-5 font-semibold text-navy">2.2 Energie-Check-Formulare</h3>
              <p>
                Wenn Sie den Energie-Check oder ein anderes Lead-Formular ausfüllen,
                verarbeiten wir: Name, E-Mail, Telefon, PLZ, Wohnort,
                Energie-Verbrauchsdaten und – sofern hochgeladen – Ihre
                Jahresabrechnung. Zweck: persönliche Auswertung Ihrer Anfrage,
                ggf. Vertragsanbahnung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
                (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung),
                je nach Sachlage.
              </p>
              <h3 className="mt-5 font-semibold text-navy">2.3 Newsletter (Double-Opt-In)</h3>
              <p>
                Bei Anmeldung zum Newsletter verarbeiten wir Ihre E-Mail-Adresse,
                optional Vorname und Postleitzahl, sowie einen gekürzten Hash Ihrer
                IP-Adresse zur Beweissicherung der Einwilligung. Sie erhalten eine
                Bestätigungsmail – ohne Klick auf den Bestätigungslink werden Sie
                nicht angeschrieben. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung). Widerruf jederzeit über den Abmelde-Link in jeder
                Newsletter-Mail oder per E-Mail an{' '}
                <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4">
                  {c.contactEmail}
                </a>
                .
              </p>
              <h3 className="mt-5 font-semibold text-navy">2.4 UTM-/Referrer-Tracking</h3>
              <p>
                Wir messen, über welchen Kanal Sie auf unsere Seite gekommen sind
                (z. B. <code className="font-mono text-[13px]">utm_source=linkedin</code>),
                indem wir diese Information in einem First-Party-Cookie für 30 Tage
                speichern. Es findet KEIN Profil-Tracking, KEINE Weitergabe an
                Werbenetzwerke und KEINE seitenübergreifende Beobachtung statt.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse
                an einer wirksamen Erfolgsmessung unserer eigenen Distribution.
                Widerspruch jederzeit möglich (siehe Abschnitt 8).
              </p>
              <h3 className="mt-5 font-semibold text-navy">2.5 Empfehlungs-Cookie</h3>
              <p>
                Wenn Sie über einen Empfehlungslink eines anderen Nutzers kommen
                (<code className="font-mono text-[13px]">/empfehlung/[code]</code>),
                speichern wir den Empfehlungscode für 60 Tage in einem
                First-Party-Cookie, damit der Empfehlende bei erfolgreicher
                Lead-Erstellung korrekt zugeordnet werden kann.
              </p>
            </Section>

            <Section title="3. Cookies im Detail">
              <div className="overflow-x-auto">
                <table className="w-full text-[13.5px] border border-borderLight rounded-elo overflow-hidden">
                  <thead className="bg-paper2 text-navy">
                    <tr>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold">Zweck</th>
                      <th className="text-left p-3 font-semibold">Laufzeit</th>
                      <th className="text-left p-3 font-semibold">Kategorie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderLight">
                    <Row n="elo_consent" p="Speichert Ihre Einwilligungs­auswahl." l="12 Monate" k="Essenziell" />
                    <Row n="elo_session" p="Authentifizierung im Admin-Bereich (nur bei eingeloggten Vertriebs­partnern)." l="Session" k="Essenziell" />
                    <Row n="agi_ref" p="Speichert den Empfehlungscode bei Klick auf Empfehlungslink." l="60 Tage" k="Funktional" />
                    <Row n="agi_utm_source" p="Speichert die ursprüngliche Akquise-Quelle (First-Touch)." l="30 Tage" k="Funktional" />
                    <Row n="agi_utm_medium" p="Speichert das Akquise-Medium (z. B. social, email)." l="30 Tage" k="Funktional" />
                    <Row n="agi_utm_campaign" p="Speichert die Akquise-Kampagne." l="30 Tage" k="Funktional" />
                    <Row n="agi_referrer" p="Speichert den Referrer-Hostname als Fallback." l="30 Tage" k="Funktional" />
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[13px] text-slate/80">
                Wir setzen KEINE Tracking-Cookies von Drittanbietern (kein Google
                Analytics, Meta Pixel, kein externes Marketing-Tracking).
              </p>
            </Section>

            <Section title="4. Auftragsverarbeiter">
              <p>
                Soweit wir personenbezogene Daten an externe Dienstleister
                übermitteln, geschieht dies ausschließlich auf Grundlage eines
                Vertrags zur Auftragsverarbeitung nach Art. 28 DSGVO:
              </p>
              <div className="mt-4 space-y-4">
                {c.processors.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-elo border border-borderLight bg-white p-4"
                  >
                    <p className="font-semibold text-navy">{p.name}</p>
                    <p className="mt-1 text-[13.5px] text-slate">Zweck: {p.purpose}</p>
                    <p className="mt-0.5 text-[13.5px] text-slate">Standort: {p.location}</p>
                    <p className="mt-0.5 text-[13.5px] text-slate">Rechtsgrundlage: {p.basis}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="5. Speicherdauer">
              <ul className="list-disc list-outside ml-5 space-y-2">
                <li>Lead-Daten: 36 Monate nach letztem Kontakt, danach Anonymisierung oder Löschung. Bei abgeschlossenen Verträgen: handels- und steuerrechtliche Aufbewahrungsfristen (i. d. R. 10 Jahre).</li>
                <li>Newsletter-Daten: bis Widerruf, anschließend Löschung der Inhalte und Sperrung der E-Mail-Adresse zum Schutz vor erneutem Versand.</li>
                <li>Server-Logfiles: 14 Tage.</li>
                <li>Funktionale Cookies: gemäß Tabelle unter Punkt 3.</li>
              </ul>
            </Section>

            <Section title="6. Empfänger">
              <p>
                Außerhalb der unter Punkt 4 genannten Auftragsverarbeiter geben wir
                Ihre Daten nicht an Dritte weiter. Eine Weitergabe an einen konkreten
                Energieversorger erfolgt ausschließlich dann, wenn Sie nach unserer
                Beratung einen Vertragsabschluss ausdrücklich beauftragen.
              </p>
            </Section>

            <Section title="7. Datenübermittlung in Drittländer">
              <p>
                Eine Übermittlung in Drittländer außerhalb der EU/EWR findet nur in
                begrenztem Umfang im Rahmen unserer Auftragsverarbeiter statt
                (s. Punkt 4). In diesen Fällen schützen wir Ihre Daten durch
                EU-Standardvertragsklauseln (Art. 46 DSGVO) und – sofern verfügbar –
                durch EU-Region-Selection.
              </p>
            </Section>

            <Section title="8. Ihre Rechte">
              <p>Sie haben das Recht auf:</p>
              <ul className="list-disc list-outside ml-5 mt-3 space-y-1.5">
                <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO), insbesondere bei Verarbeitung auf Grundlage berechtigter Interessen</li>
                <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p className="mt-4">
                Zur Wahrnehmung Ihrer Rechte genügt eine formlose Mitteilung an{' '}
                <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4">
                  {c.contactEmail}
                </a>
                . Alternativ steht Ihnen unser{' '}
                <Link
                  href="/datenschutz/anfrage"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  Anfrage-Formular
                </Link>{' '}
                zur Verfügung.
              </p>
            </Section>

            <Section title="9. Cookie-Einstellungen ändern">
              <p>
                Sie können Ihre Cookie-Einwilligung jederzeit zurückziehen. Klicken
                Sie dazu im Footer auf „Cookie-Einstellungen" – der Banner wird neu
                geladen und Sie können Ihre Auswahl ändern. Funktionale Cookies
                (siehe Punkt 3) sind technisch erforderlich und werden auch nach
                Ablehnung essentieller Cookies nicht gesetzt, wenn Sie die Seite
                nicht aktiv nutzen.
              </p>
            </Section>

            <Section title="10. Beschwerderecht bei der Aufsichtsbehörde">
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
                beschweren (Art. 77 DSGVO). Eine Liste der zuständigen Behörden
                finden Sie unter:{' '}
                <a
                  href="https://www.bfdi.bund.de/DE/Service/Anschriften/anschriften_table.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                >
                  bfdi.bund.de
                </a>
                .
              </p>
            </Section>

            <Section title="11. Änderungen dieser Datenschutzerklärung">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn
                sich die Rechtslage oder unsere Verarbeitungsprozesse ändern. Die
                jeweils aktuelle Fassung finden Sie stets unter dieser URL.
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
      <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function Row({ n, p, l, k }: { n: string; p: string; l: string; k: string }) {
  return (
    <tr>
      <td className="p-3 font-mono text-[12.5px] text-navy">{n}</td>
      <td className="p-3 text-slate">{p}</td>
      <td className="p-3 text-slate whitespace-nowrap">{l}</td>
      <td className="p-3 text-slate whitespace-nowrap">{k}</td>
    </tr>
  );
}
