import type { Metadata } from 'next';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MissingDataWarning } from '@/components/legal/MissingDataWarning';
import { COMPANY_INFO, displayField } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Widerrufsbelehrung',
  description:
    'Widerrufsrecht für Verbraucher nach § 312g Abs. 1 i.V.m. § 355 BGB.',
  alternates: { canonical: '/widerruf' },
  robots: { index: true, follow: true },
};

export default function WiderrufPage() {
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
            Widerrufs­belehrung
          </h1>
          <p className="mt-3 text-[13px] text-slate/70">
            Für Verbraucher · Stand: {c.lastUpdated}
          </p>

          <div className="mt-8 space-y-10 text-[15px] leading-[1.75] text-slate">
            <MissingDataWarning />

            <Section title="Widerrufsrecht">
              <p>
                Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen
                Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag
                des Vertragsabschlusses.
              </p>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
              </p>
              <div className="mt-3 rounded-elo bg-paper2 border border-borderLight p-4">
                <p className="text-navy">
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
              </div>
              <p className="mt-4">
                mittels einer eindeutigen Erklärung (z. B. ein mit der Post
                versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen
                Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende
                Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben
                ist.
              </p>
              <p>
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
                über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
                absenden.
              </p>
            </Section>

            <Section title="Folgen des Widerrufs">
              <p>
                Da unsere Hauptleistung (die persönliche Energieberatung) für Sie
                kostenfrei ist, entstehen Ihnen bei Widerruf keine Kosten.
              </p>
              <p>
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufs­frist
                beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen,
                der dem Anteil der bis zum Zeitpunkt, zu dem Sie uns von der Ausübung
                des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits
                erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im
                Vertrag vorgesehenen Dienstleistungen entspricht. Da die Beratung für
                Sie kostenfrei ist, fällt dieser Betrag bei {c.legalName} regelmäßig
                auf 0 €.
              </p>
            </Section>

            <Section title="Muster-Widerrufsformular">
              <p>
                Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
                Formular aus und senden Sie es zurück.
              </p>
              <div className="mt-4 rounded-elo bg-white border border-borderLight p-5 font-mono text-[13.5px] text-navy whitespace-pre-line leading-[1.85]">
{`An: ${c.legalName}
${c.responsiblePerson}
${displayField(c.street)}
${displayField(c.postalCity)}
${c.contactEmail}

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
Vertrag über die Erbringung der folgenden Dienstleistung (*):
___________________________________________________

Bestellt am (*) / erhalten am (*): __________________

Name des/der Verbraucher(s): _______________________

Anschrift des/der Verbraucher(s): __________________

Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
_____________________________________

Datum: __________________

(*) Unzutreffendes streichen.`}
              </div>
            </Section>

            <Section title="Ausschluss / vorzeitiges Erlöschen des Widerrufsrechts">
              <p>
                Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von
                Dienstleistungen vorzeitig, wenn die Dienstleistung vollständig
                erbracht worden ist und mit der Ausführung erst begonnen wurde,
                nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und
                gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr
                Widerrufsrecht bei vollständiger Vertragserfüllung verlieren.
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
